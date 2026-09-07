import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import multer from "multer";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import XLSX from "xlsx";

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/imed_crm";
const jwtSecret = process.env.JWT_SECRET || "imed-local-jwt-secret";
const adminSetupCode = process.env.ADMIN_SETUP_CODE || "909090";
const emptyObjectId = new mongoose.Types.ObjectId("000000000000000000000000");
const googleCalendarClientId = process.env.GOOGLE_CALENDAR_CLIENT_ID || "";
const googleCalendarClientSecret = process.env.GOOGLE_CALENDAR_CLIENT_SECRET || "";
const googleCalendarRedirectUri = process.env.GOOGLE_CALENDAR_REDIRECT_URI || "";
const googleCalendarTimeZone = process.env.GOOGLE_CALENDAR_TIME_ZONE || "Asia/Kolkata";

const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://127.0.0.1:5173,https://imedacademy.in,https://www.imedacademy.in")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    const isLocalDev = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    if (!origin || allowedOrigins.includes(origin) || isLocalDev) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.options("*", cors());
app.use(compression());
app.use(express.json({ limit: "2mb" }));

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const leadDocumentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    const validMime = ["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.mimetype || "");
    const validName = /\.(pdf|jpe?g|png|webp)$/i.test(file.originalname || "");
    callback(validMime || validName ? null : new Error("Only PDF, JPG, PNG or WEBP documents are allowed"), validMime || validName);
  },
});
const studyNoteUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(_req, file, callback) {
    const validName = /\.(pdf|docx?|pptx?|xlsx?|csv|jpe?g|png|webp|txt)$/i.test(file.originalname || "");
    callback(validName ? null : new Error("Only PDF, Word, PPT, Excel, image, CSV or TXT notes are allowed"), validName);
  },
});
const leadDocumentDir = path.join(process.cwd(), "uploads", "lead-documents");
const GST_RATE = 0.18;
const paymentModes = ["Cash", "UPI", "Card", "Bank Transfer", "Loan Provider"];
const paymentPurposes = ["Seat Booking Amount", "Fees Installment"];
const legacyPaymentPurposes = ["Fee Payment", "Upfront", "EMI Installment"];
const partialEmiPaymentMode = "Partial + EMI";
const legacyPartialEmiPaymentMode = "Upfront + EMI";
const admissionPaymentModes = ["Full Payment", "EMI", partialEmiPaymentMode, "Loan Provider"];
const admissionPaymentModeValues = [...admissionPaymentModes, legacyPartialEmiPaymentMode];
const paymentNoteMaxLength = 250;
const paymentReferenceMaxLength = 80;
const kochiCourseOptions = ["AHAP", "GCA"];
const leadFeedbackOptions = ["New", "Interested", "Qualified", "Follow-up", "On Hold", "Converted", "Lost", "Not Connected", "Busy Call later", "Invalid"];
const leadPriorityOptions = ["P0", "P1", "P2", "P3"];
const leadStageOptions = ["New Lead", "Contacted", "Counselling", "Demo / Visit", "Admission", "Enrolled", "Alumni", "Lost"];
const leadCreateStageOptions = ["New Lead", "Contacted", "Counselling", "Demo / Visit", "Admission", "Lost"];
const npsTouchpoints = ["mid_course", "post_classroom", "post_internship"];
const npsTouchpointLabels = {
  mid_course: "Mid-course feedback",
  post_classroom: "Classroom completion feedback",
  post_internship: "Internship completion feedback",
};
fs.mkdirSync(leadDocumentDir, { recursive: true });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
const toAddress = process.env.MAIL_TO || process.env.SMTP_USER;

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePhone(value = "") {
  return String(value).replace(/\s+/g, " ").trim();
}

function isKochiCentre(centre = "") {
  return String(centre || "").trim().toLowerCase() === "kochi";
}

function isCourseAllowedForCentre(centre = "", course = "") {
  if (!isKochiCentre(centre) || !course) return true;
  return kochiCourseOptions.includes(normalizeCourseCode(course));
}

function normalizeCourseCode(course = "") {
  const normalized = String(course || "").trim().toUpperCase();
  return normalized === "AAHP" ? "AHAP" : normalized;
}

function normalizeAdmissionPaymentMode(mode = "") {
  return mode === legacyPartialEmiPaymentMode ? partialEmiPaymentMode : mode;
}

function isPartialEmiPaymentMode(mode = "") {
  return normalizeAdmissionPaymentMode(mode) === partialEmiPaymentMode;
}

function normalizePaymentPurpose(purpose = "", mode = "") {
  if (purpose === "Seat Booking Amount" || purpose === "Upfront") return "Seat Booking Amount";
  if (purpose === "Fees Installment" || purpose === "EMI Installment" || purpose === "Fee Payment" || mode === "EMI") return "Fees Installment";
  return "Fees Installment";
}

function normalizeStudentStatus(status = "") {
  if (status === "Admission") return "Admission Completed";
  if (status === "In Training") return "Active Student";
  if (status === "Placed") return "Alumni";
  return status;
}

function studentStatusRank(status = "") {
  return ["Enrolled", "Admission Completed", "Fees Decided", "Fees Collected", "Active Student", "Classroom Complete", "Course Completed", "Alumni"].indexOf(normalizeStudentStatus(status));
}

function isStudentStatusAtLeast(status = "", milestone = "") {
  const current = studentStatusRank(status);
  const target = studentStatusRank(milestone);
  return current >= 0 && target >= 0 && current >= target;
}

function npsCategory(score = 0) {
  const value = Number(score);
  if (value <= 6) return "detractor";
  if (value <= 8) return "passive";
  return "promoter";
}

function netStudentFee(student = {}) {
  return Math.max(0, Number(student.totalFee || 0) - Number(student.discountAmount || 0));
}

function studentDueAmount(student = {}) {
  return Math.max(0, netStudentFee(student) - Number(student.paidAmount || 0));
}

function saveLeadDocument(file) {
  if (!file) return undefined;
  const safeOriginalName = String(file.originalname || "document").replace(/[^\w.\- ]+/g, "").trim() || "document";
  const storedName = `${Date.now()}-${crypto.randomUUID()}-${safeOriginalName}`;
  fs.writeFileSync(path.join(leadDocumentDir, storedName), file.buffer);
  return {
    originalName: safeOriginalName,
    storedName,
    mimeType: file.mimetype || "application/octet-stream",
    size: file.size || 0,
    uploadedAt: new Date(),
  };
}

function sendError(res, status, message) {
  return res.status(status).json({ ok: false, message });
}

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin", "counsellor", "teacher", "franchise_superadmin", "franchise_counsellor", "franchise_teacher"], default: "admin" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  passwordResetTokenHash: { type: String, default: "" },
  passwordResetExpiresAt: { type: Date },
  googleCalendarRefreshToken: { type: String, default: "", select: false },
  googleCalendarEmail: { type: String, default: "" },
  googleCalendarConnectedAt: { type: Date },
}, { timestamps: true });

const counterSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  seq: { type: Number, default: 0 },
}, { timestamps: true });

const centreSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ["branch", "franchise"], default: "franchise" },
  city: { type: String, default: "" },
  manager: { type: String, default: "" },
  billingLegalName: { type: String, default: "" },
  billingAddress: { type: String, default: "" },
  billingGstin: { type: String, default: "" },
  billingStateName: { type: String, default: "" },
  billingStateCode: { type: String, default: "" },
  billingEmail: { type: String, default: "" },
  billingPhone: { type: String, default: "" },
  bankAccountName: { type: String, default: "" },
  bankName: { type: String, default: "" },
  bankAccountNumber: { type: String, default: "" },
  bankIfsc: { type: String, default: "" },
  bankBranch: { type: String, default: "" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, default: "" },
  fee: { type: Number, default: 0 },
  duration: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  course: { type: String, default: "" },
  assignedFaculty: [{ type: String, trim: true }],
  commenceDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  type: { type: String, default: "note" },
  message: { type: String, required: true },
  by: { type: String, default: "Admin" },
  at: { type: Date, default: Date.now },
}, { _id: false });

const leadFollowUpSchema = new mongoose.Schema({
  type: { type: String, enum: ["Call", "WhatsApp", "Walk-in", "Demo", "Counselling", "Fee discussion", "Document collection", "Final confirmation"], default: "Call" },
  status: { type: String, enum: ["Scheduled", "Completed", "No response", "Rescheduled", "Interested", "Not interested"], default: "Scheduled" },
  scheduledAt: { type: Date, required: true },
  note: { type: String, default: "", trim: true },
  by: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const documentFileSchema = new mongoose.Schema({
  originalName: { type: String, default: "" },
  storedName: { type: String, default: "" },
  mimeType: { type: String, default: "" },
  size: { type: Number, default: 0 },
  uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const leadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  parentMobile: { type: String, default: "", trim: true },
  email: { type: String, default: "", lowercase: true, trim: true },
  governmentProof: { type: documentFileSchema, default: undefined },
  highestQualificationCertificate: { type: documentFileSchema, default: undefined },
  studentLocation: { type: String, default: "", trim: true },
  source: { type: String, default: "Website" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "Unassigned" },
  leadFeedback: { type: String, enum: leadFeedbackOptions, default: "New" },
  stage: {
    type: String,
    enum: leadStageOptions,
    default: "New Lead",
  },
  priority: { type: String, enum: leadPriorityOptions, default: "P2" },
  city: { type: String, default: "" },
  expectedFee: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  nextFollowUp: { type: Date },
  followUps: [leadFollowUpSchema],
  notes: { type: String, default: "" },
  activities: [activitySchema],
}, { timestamps: true });

const cashDepositSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  bank: { type: String, required: true, trim: true },
  referenceNumber: { type: String, default: "", trim: true },
  note: { type: String, default: "" },
  proof: { type: documentFileSchema, default: undefined },
  depositedBy: { type: String, default: "", trim: true },
  by: { type: String, default: "" },
  depositedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  mode: { type: String, default: "Cash" },
  paymentPurpose: { type: String, enum: [...paymentPurposes, ...legacyPaymentPurposes, ""], default: "Fees Installment" },
  transactionId: { type: String, default: "", trim: true },
  emiReference: { type: String, default: "", trim: true },
  loanProviderName: { type: String, default: "", trim: true },
  note: { type: String, default: "" },
  proof: { type: documentFileSchema, default: undefined },
  cashDeposits: [cashDepositSchema],
  by: { type: String, default: "" },
  paidAt: { type: Date, default: Date.now },
}, { _id: false });

const studentFeedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ["Academic progress", "Attendance issue", "Fee / EMI discussion", "Placement discussion", "Parent conversation", "Complaint", "General follow-up"], default: "General follow-up" },
  status: { type: String, enum: ["Positive", "Needs follow-up", "Escalated", "Resolved", "No response"], default: "Needs follow-up" },
  note: { type: String, required: true, trim: true },
  nextFollowUpDate: { type: Date },
  by: { type: String, default: "Admin" },
  at: { type: Date, default: Date.now },
}, { _id: false });

const studentSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  parentMobile: { type: String, default: "", trim: true },
  email: { type: String, default: "", lowercase: true, trim: true },
  governmentProof: { type: documentFileSchema, default: undefined },
  highestQualificationCertificate: { type: documentFileSchema, default: undefined },
  studentLocation: { type: String, default: "", trim: true },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "Unassigned" },
  teacher: { type: String, default: "Unassigned" },
  batch: { type: String, default: "" },
  batchCommenceDate: { type: Date },
  admissionNumber: { type: String, default: "" },
  lmsAccessEnabled: { type: Boolean, default: false },
  lmsAccessGeneratedAt: { type: Date },
  lmsAccessGeneratedBy: { type: String, default: "" },
  admissionPaymentMode: { type: String, enum: [...admissionPaymentModeValues, ""], default: "" },
  admissionUpfrontAmount: { type: Number, default: 0 },
  admissionFinalizedAt: { type: Date },
  admissionFinalizedBy: { type: String, default: "" },
  discountAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["Enrolled", "Admission", "Admission Completed", "Fees Decided", "Fees Collected", "Active Student", "Classroom Complete", "In Training", "Course Completed", "Alumni", "Placed", "Dropped"], default: "Enrolled" },
  totalFee: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  emiEnabled: { type: Boolean, default: false },
  emiMonths: { type: Number, default: 0 },
  emiAmount: { type: Number, default: 0 },
  nextEmiDate: { type: Date },
  placementStatus: { type: String, enum: ["Not Placed", "Interview Scheduled", "Placed", "Self Placed", ""], default: "Not Placed" },
  placementCompany: { type: String, default: "" },
  placementRole: { type: String, default: "" },
  placementJoiningDate: { type: Date },
  placementSalary: { type: Number, default: 0 },
  placementHrContact: { type: String, default: "" },
  placementOfferLetterUrl: { type: String, default: "" },
  placementRemarks: { type: String, default: "" },
  testimonialText: { type: String, default: "" },
  testimonialVideoUrl: { type: String, default: "" },
  testimonialRating: { type: Number, default: 0 },
  testimonialApproved: { type: Boolean, default: false },
  referralName: { type: String, default: "" },
  referralPhone: { type: String, default: "" },
  referralStatus: { type: String, enum: ["New", "Contacted", "Converted", "Lost", ""], default: "New" },
  certificateNumber: { type: String, default: "" },
  certificateIssuedAt: { type: Date },
  certificateStatus: { type: String, enum: ["Not Issued", "Issued"], default: "Not Issued" },
  payments: [paymentSchema],
  feedbacks: [studentFeedbackSchema],
  activities: [activitySchema],
}, { timestamps: true });
studentSchema.index({ leadId: 1 }, { unique: true, partialFilterExpression: { leadId: { $type: "objectId" } } });
studentSchema.index({ admissionNumber: 1 }, { unique: true, partialFilterExpression: { admissionNumber: { $type: "string", $gt: "" } } });
studentSchema.index({ certificateNumber: 1 }, { unique: true, partialFilterExpression: { certificateNumber: { $type: "string", $gt: "" } } });

const attendanceSchema = new mongoose.Schema({
  classSessionId: { type: mongoose.Schema.Types.ObjectId, ref: "ClassSession" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String, default: "" },
  date: { type: Date, required: true },
  nature: { type: String, enum: ["Theoretical", "Practical"], default: "Theoretical" },
  status: { type: String, enum: ["Present", "Absent", "Late", "Leave"], required: true },
  note: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  batch: { type: String, default: "" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "" },
  teacher: { type: String, default: "" },
  markedBy: { type: String, default: "" },
}, { timestamps: true });
attendanceSchema.index({ studentId: 1, date: 1, nature: 1, classSessionId: 1 }, { unique: true });

const classScheduleSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  batchName: { type: String, required: true, trim: true },
  course: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  classType: { type: String, enum: ["Regular Class", "One-time Class"], default: "Regular Class" },
  nature: { type: String, enum: ["Theoretical", "Practical"], default: "Theoretical" },
  faculty: { type: String, required: true, trim: true },
  days: [{ type: String, enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }],
  startTime: { type: String, required: true, trim: true },
  endTime: { type: String, required: true, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  note: { type: String, default: "" },
  active: { type: Boolean, default: true },
  createdBy: { type: String, default: "" },
}, { timestamps: true });

const classSessionSchema = new mongoose.Schema({
  scheduleId: { type: mongoose.Schema.Types.ObjectId, ref: "ClassSchedule" },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  batchName: { type: String, required: true, trim: true },
  course: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  classType: { type: String, enum: ["Regular Class", "One-time Class"], default: "Regular Class" },
  nature: { type: String, enum: ["Theoretical", "Practical"], default: "Theoretical" },
  faculty: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true, trim: true },
  endTime: { type: String, required: true, trim: true },
  studentCount: { type: Number, default: 0 },
  attendanceMarked: { type: Boolean, default: false },
  googleCalendarEventId: { type: String, default: "" },
  note: { type: String, default: "" },
  createdBy: { type: String, default: "" },
}, { timestamps: true });
classSessionSchema.index({ scheduleId: 1, date: 1, startTime: 1 }, { unique: true, partialFilterExpression: { scheduleId: { $type: "objectId" } } });

const topicProgressSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  batchName: { type: String, required: true, trim: true },
  course: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  module: { type: String, required: true, trim: true },
  topic: { type: String, required: true, trim: true },
  status: { type: String, enum: ["Not Started", "In Progress", "Covered"], default: "Not Started" },
  dateCovered: { type: Date },
  faculty: { type: String, default: "" },
  updatedBy: { type: String, default: "" },
}, { timestamps: true });
topicProgressSchema.index({ batchId: 1, module: 1, topic: 1 }, { unique: true });

const practicalRecordSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  batchName: { type: String, required: true, trim: true },
  course: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  practicalName: { type: String, required: true, trim: true },
  module: { type: String, default: "" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String, default: "" },
  dateConducted: { type: Date },
  status: { type: String, enum: ["Pending", "Completed", "Needs Repeat"], default: "Pending" },
  remarks: { type: String, default: "" },
  faculty: { type: String, default: "" },
  updatedBy: { type: String, default: "" },
}, { timestamps: true });
practicalRecordSchema.index({ batchId: 1, practicalName: 1, studentId: 1 }, { unique: true });

const studyNoteSchema = new mongoose.Schema({
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch", required: true },
  batchName: { type: String, required: true, trim: true },
  course: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  title: { type: String, required: true, trim: true },
  module: { type: String, default: "", trim: true },
  description: { type: String, default: "", trim: true },
  file: { type: documentFileSchema, default: undefined },
  referenceUrl: { type: String, default: "", trim: true },
  resourceType: { type: String, enum: ["File", "Video", "Reference"], default: "File" },
  uploadedBy: { type: String, default: "" },
}, { timestamps: true });

const internshipAssignmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true, unique: true },
  facilityName: { type: String, required: true, trim: true },
  facilityLocation: { type: String, default: "", trim: true },
  supervisorName: { type: String, default: "", trim: true },
  supervisorContact: { type: String, default: "", trim: true },
  supervisorEmail: { type: String, default: "", trim: true, lowercase: true },
  facilityLatitude: { type: Number },
  facilityLongitude: { type: Number },
  allowedRadiusMeters: { type: Number, default: 200 },
  startDate: { type: Date, required: true },
  durationValue: { type: Number, default: 3 },
  durationUnit: { type: String, enum: ["days", "weeks", "months"], default: "months" },
  expectedEndDate: { type: Date, required: true },
  actualEndDate: { type: Date },
  status: { type: String, enum: ["Assigned", "Active", "Completed", "Terminated"], default: "Assigned" },
  departmentRotation: { type: String, default: "", trim: true },
  assignedBy: { type: String, default: "" },
}, { timestamps: true });

const internshipLogSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "InternshipAssignment", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, required: true },
  loginAt: { type: Date },
  loginPhoto: { type: documentFileSchema, default: undefined },
  loginGps: { type: String, default: "" },
  logoutAt: { type: Date },
  logoutPhoto: { type: documentFileSchema, default: undefined },
  logoutGps: { type: String, default: "" },
  hours: { type: Number, default: 0 },
  flagged: { type: Boolean, default: false },
  flagReason: { type: String, default: "" },
}, { timestamps: true });
internshipLogSchema.index({ assignmentId: 1, studentId: 1, date: 1 }, { unique: true });

const logbookEntrySchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "InternshipAssignment", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  date: { type: Date, required: true },
  departmentArea: { type: String, required: true, trim: true },
  activitiesPerformed: { type: String, required: true, trim: true },
  keyLearnings: { type: String, required: true, trim: true },
  challenges: { type: String, default: "", trim: true },
  supervisorRemark: { type: String, default: "", trim: true },
  verified: { type: Boolean, default: false },
  verifiedBy: { type: String, default: "" },
  verifiedAt: { type: Date },
}, { timestamps: true });
logbookEntrySchema.index({ assignmentId: 1, studentId: 1, date: 1 }, { unique: true });

const npsResponseSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  batchId: { type: mongoose.Schema.Types.ObjectId, ref: "Batch" },
  batchName: { type: String, default: "" },
  courseCode: { type: String, default: "" },
  collegeId: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  touchpoint: { type: String, enum: npsTouchpoints, required: true },
  npsScore: { type: Number, required: true, min: 0, max: 10 },
  npsCategory: { type: String, enum: ["promoter", "passive", "detractor"], required: true },
  attrTeachingQuality: { type: Number, required: true, min: 1, max: 5 },
  attrContentRelevance: { type: Number, required: true, min: 1, max: 5 },
  attrPracticalTraining: { type: Number, min: 1, max: 5 },
  attrSupportInfra: { type: Number, required: true, min: 1, max: 5 },
  attrPlacementAssistance: { type: Number, min: 1, max: 5 },
  openFeedback: { type: String, default: "", trim: true, maxlength: 500 },
  followUpStatus: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  followUpNotes: [{
    note: { type: String, default: "", trim: true },
    by: { type: String, default: "" },
    at: { type: Date, default: Date.now },
  }],
  active: { type: Boolean, default: true },
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });
npsResponseSchema.index({ studentId: 1, touchpoint: 1 }, { unique: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
const Counter = mongoose.model("Counter", counterSchema);
const Centre = mongoose.model("Centre", centreSchema);
const Course = mongoose.model("Course", courseSchema);
const Batch = mongoose.model("Batch", batchSchema);
const Lead = mongoose.model("Lead", leadSchema);
const Student = mongoose.model("Student", studentSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);
const ClassSchedule = mongoose.model("ClassSchedule", classScheduleSchema);
const ClassSession = mongoose.model("ClassSession", classSessionSchema);
const TopicProgress = mongoose.model("TopicProgress", topicProgressSchema);
const PracticalRecord = mongoose.model("PracticalRecord", practicalRecordSchema);
const StudyNote = mongoose.model("StudyNote", studyNoteSchema);
const InternshipAssignment = mongoose.model("InternshipAssignment", internshipAssignmentSchema);
const InternshipLog = mongoose.model("InternshipLog", internshipLogSchema);
const LogbookEntry = mongoose.model("LogbookEntry", logbookEntrySchema);
const NpsResponse = mongoose.model("NpsResponse", npsResponseSchema);

async function seedBaseData() {
  await Promise.all([
    Course.collection.dropIndex("name_1").catch(() => undefined),
    Batch.collection.dropIndex("name_1").catch(() => undefined),
    Attendance.collection.dropIndex("studentId_1_date_1").catch(() => undefined),
  ]);
  const centres = [{ name: "Delhi", city: "Delhi" }, { name: "Kochi", city: "Kochi" }, { name: "Bangalore", city: "Bangalore" }];
  const courses = [
    { name: "Hospital Administration", code: "HA", fee: 55000, duration: "6 months" },
    { name: "Emergency Medical Technician", code: "EMT", fee: 45000, duration: "6 months" },
    { name: "General Duty Assistant", code: "GDA", fee: 35000, duration: "4 months" },
    { name: "OCHA", code: "OCHA", fee: 30000, duration: "Online" },
    { name: "Advanced Healthcare Administration Program", code: "AHAP", fee: 65000, duration: "6 months" },
    { name: "Geriatric Care Assistant", code: "GCA", fee: 35000, duration: "4 months" },
    { name: "Medical Laboratory Technician", code: "MLT", fee: 55000, duration: "6 months" },
    { name: "Radiology X-Ray Technician", code: "RADIOLOGY", fee: 55000, duration: "6 months" },
  ];
  await Promise.all(centres.map((centre) => Centre.updateOne({ name: centre.name }, { $set: { type: "branch" }, $setOnInsert: centre }, { upsert: true })));
  await Centre.updateMany({ name: { $nin: centres.map((centre) => centre.name) }, type: { $exists: false } }, { $set: { type: "franchise" } });
  await Course.updateMany({ code: "AAHP" }, { $set: { code: "AHAP", name: "Advanced Healthcare Administration Program", fee: 65000, duration: "6 months" } });
  await Promise.all([
    Lead.updateMany({ course: "AAHP" }, { $set: { course: "AHAP" } }),
    Student.updateMany({ course: "AAHP" }, { $set: { course: "AHAP" } }),
    Batch.updateMany({ course: "AAHP" }, { $set: { course: "AHAP" } }),
  ]);
  await Course.updateMany({ code: "AHAP" }, { $set: { name: "Advanced Healthcare Administration Program", fee: 65000, duration: "6 months" } });
  await Promise.all(courses.map((course) => Course.updateOne({ code: course.code }, { $setOnInsert: course }, { upsert: true })));
  const ahapCourses = await Course.find({ code: "AHAP", $or: [{ franchiseId: { $exists: false } }, { franchiseId: null }] }).sort({ _id: 1 }).select("_id").lean();
  if (ahapCourses.length > 1) {
    await Course.deleteMany({ _id: { $in: ahapCourses.slice(1).map((course) => course._id) } });
  }
  const savedCentres = await Centre.find({ active: true }).select("_id name").lean();
  await Promise.all(savedCentres.map((centre) => Promise.all([
    Lead.updateMany({ centre: centre.name, franchiseId: { $exists: false } }, { $set: { franchiseId: centre._id } }),
    Student.updateMany({ centre: centre.name, franchiseId: { $exists: false } }, { $set: { franchiseId: centre._id } }),
    Batch.updateMany({ centre: centre.name, franchiseId: { $exists: false } }, { $set: { franchiseId: centre._id } }),
  ])));
}

function signToken(user) {
  return jwt.sign({ id: user._id.toString(), email: user.email, name: user.name, role: user.role, franchiseId: user.franchiseId?.toString() || "" }, jwtSecret, { expiresIn: "7d" });
}

function signStudentToken(student) {
  return jwt.sign({ studentId: student._id.toString(), purpose: "student-lms" }, jwtSecret, { expiresIn: "30d" });
}

function publicAppBaseUrl(req) {
  const configured = process.env.APP_BASE_URL || process.env.PUBLIC_APP_URL || "";
  if (configured) return configured.replace(/\/$/, "");
  const origin = req.get("origin") || `${req.protocol}://${req.get("host")}`;
  return origin.replace(/\/$/, "");
}

function googleCalendarReady() {
  return Boolean(googleCalendarClientId && googleCalendarClientSecret && googleCalendarRedirectUri);
}

function googleCalendarTokenKey() {
  return crypto.createHash("sha256").update(jwtSecret).digest();
}

function encryptGoogleToken(value = "") {
  if (!value) return "";
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", googleCalendarTokenKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  return `${iv.toString("base64")}.${cipher.getAuthTag().toString("base64")}.${encrypted.toString("base64")}`;
}

function decryptGoogleToken(value = "") {
  if (!value) return "";
  const [iv, tag, encrypted] = String(value).split(".");
  if (!iv || !tag || !encrypted) return "";
  const decipher = crypto.createDecipheriv("aes-256-gcm", googleCalendarTokenKey(), Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64")), decipher.final()]).toString("utf8");
}

async function googleCalendarFetch(pathname, options = {}) {
  const response = await fetch(`https://www.googleapis.com${pathname}`, options);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error?.message || result.error_description || "Google Calendar request failed");
  return result;
}

async function googleOAuthFetch(url, options = {}) {
  const response = await fetch(url, options);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error?.message || result.error_description || "Google authorization request failed");
  return result;
}

async function googleAccessTokenForTeacher(teacher) {
  if (!teacher?.googleCalendarRefreshToken || !googleCalendarReady()) return "";
  const refreshToken = decryptGoogleToken(teacher.googleCalendarRefreshToken);
  if (!refreshToken) return "";
  const body = new URLSearchParams({
    client_id: googleCalendarClientId,
    client_secret: googleCalendarClientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
  const result = await googleOAuthFetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return result.access_token || "";
}

function sessionDateKey(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function calendarEventBody(session) {
  const date = sessionDateKey(session.date);
  return {
    summary: `${session.batchName} - ${session.nature}`,
    location: session.centre || "iMED Academy",
    description: `${session.classType}\nFaculty: ${session.faculty}\nStudents: ${session.studentCount || 0}\nCourse: ${session.course || ""}`,
    start: { dateTime: `${date}T${session.startTime || "00:00"}:00`, timeZone: googleCalendarTimeZone },
    end: { dateTime: `${date}T${session.endTime || "00:00"}:00`, timeZone: googleCalendarTimeZone },
  };
}

async function syncClassSessionsToGoogleCalendar(sessions = [], options = {}) {
  if (!googleCalendarReady() || !sessions.length) return { synced: 0, skipped: sessions.length };
  let synced = 0;
  let skipped = 0;
  const errors = new Map();
  const noteError = (message = "Unknown sync error") => {
    const clean = String(message || "Unknown sync error").slice(0, 160);
    errors.set(clean, (errors.get(clean) || 0) + 1);
  };
  const teacherCache = new Map();
  const connectedTeacher = options.teacher || null;
  for (const session of sessions) {
    try {
      if (!session?._id || !session.faculty) {
        skipped += 1;
        noteError("Class session is missing faculty");
        continue;
      }
      let teacher = connectedTeacher;
      if (!teacher) {
        const cacheKey = session.faculty;
        teacher = teacherCache.get(cacheKey);
        if (teacher === undefined) {
          teacher = await AdminUser.findOne({ name: session.faculty, role: { $in: ["teacher", "franchise_teacher"] } }).select("+googleCalendarRefreshToken name email googleCalendarEmail").lean();
          teacherCache.set(cacheKey, teacher || null);
        }
      }
      if (!teacher?.googleCalendarRefreshToken) {
        skipped += 1;
        noteError("Teacher has not connected Google Calendar");
        continue;
      }
      const accessToken = await googleAccessTokenForTeacher(teacher);
      if (!accessToken) {
        skipped += 1;
        noteError("Unable to refresh Google access token");
        continue;
      }
      const existingEventId = session.googleCalendarEventId || "";
      const event = await googleCalendarFetch(existingEventId ? `/calendar/v3/calendars/primary/events/${encodeURIComponent(existingEventId)}` : "/calendar/v3/calendars/primary/events", {
        method: existingEventId ? "PATCH" : "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(calendarEventBody(session)),
      });
      if (event.id && event.id !== existingEventId) await ClassSession.findByIdAndUpdate(session._id, { $set: { googleCalendarEventId: event.id } });
      synced += 1;
    } catch (error) {
      console.warn("Google Calendar sync skipped:", error.message);
      skipped += 1;
      noteError(error.message);
    }
  }
  return { synced, skipped, errors: [...errors.entries()].map(([message, count]) => ({ message, count })) };
}

function passwordResetHash(token = "") {
  return crypto.createHash("sha256").update(String(token)).digest("hex");
}

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return sendError(res, 401, "Login required");
    const payload = jwt.verify(token, jwtSecret);
    const user = await AdminUser.findById(payload.id).lean();
    if (!user) return sendError(res, 401, "Invalid login session");
    req.user = user;
    next();  
  } catch {
    return sendError(res, 401, "Invalid login session");
  }
}

async function requireStudentAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return sendError(res, 401, "Student login required");
    const payload = jwt.verify(token, jwtSecret);
    if (payload.purpose !== "student-lms" || !mongoose.isValidObjectId(String(payload.studentId || ""))) return sendError(res, 401, "Invalid student session");
    const student = await Student.findById(payload.studentId).lean();
    if (!student) return sendError(res, 401, "Invalid student session");
    if (!student.lmsAccessEnabled) return sendError(res, 403, "Student LMS access is not generated yet");
    req.student = student;
    next();
  } catch {
    return sendError(res, 401, "Invalid student session");
  }
}

function adminScopeFilter(query = {}) {
  const filter = {};
  if (query.centre) filter.centre = String(query.centre);
  if (query.franchiseId && mongoose.isValidObjectId(String(query.franchiseId))) filter.franchiseId = new mongoose.Types.ObjectId(String(query.franchiseId));
  if (query.counsellor) filter.counsellor = String(query.counsellor);
  return filter;
}

function isHeadAdmin(user) {
  return ["superadmin", "admin"].includes(user?.role);
}

function isHeadSuperAdmin(user) {
  return user?.role === "superadmin";
}

function isHeadBranchAdmin(user) {
  return user?.role === "admin";
}

function isFranchiseUser(user) {
  return ["franchise_superadmin", "franchise_counsellor", "franchise_teacher"].includes(user?.role);
}

function isFranchiseSuperAdmin(user) {
  return user?.role === "franchise_superadmin";
}

function isCounsellorAccount(user) {
  return ["counsellor", "franchise_counsellor"].includes(user?.role);
}

function isTeacherAccount(user) {
  return ["teacher", "franchise_teacher"].includes(user?.role);
}

function isStudentStaffAccount(user) {
  return isCounsellorAccount(user) || isTeacherAccount(user);
}

function canManageFees(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canManageCertificates(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canManageInternships(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canManageNps(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canManageAlumni(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canUseLeads(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user) || isCounsellorAccount(user);
}

function canAssignStaff(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function canManageStudentLmsAccess(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user);
}

function studentLmsAccessBlockReason(student = {}) {
  const status = normalizeStudentStatus(student.status);
  const readyStatus = ["Fees Decided", "Fees Collected", "Active Student", "Course Completed", "Alumni"].includes(status);
  if (!readyStatus) return "Decide fees before generating Student LMS login";
  if (Math.max(0, Number(student.totalFee || 0) - Number(student.discountAmount || 0)) <= 0 || !student.admissionPaymentMode) return "Save final fee and payment plan before generating Student LMS login";
  if (!student.admissionNumber) return "Admission number is required before generating Student LMS login";
  if (!student.phone) return "Registered phone number is required before generating Student LMS login";
  if (!student.batch) return "Assign a batch before generating Student LMS login";
  return "";
}

function canUseAttendance(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user) || isTeacherAccount(user);
}

async function teacherAcademicBatchScope(user) {
  if (!isTeacherAccount(user)) return null;
  const [studentRows, scheduleRows] = await Promise.all([
    Student.find({ teacher: user.name, batch: { $nin: ["", null] } }).select("batch").lean(),
    ClassSchedule.find({ active: true, faculty: user.name }).select("batchId batchName").lean(),
  ]);
  const assignedBatchRows = await Batch.find({ active: true, assignedFaculty: user.name }).select("_id name").lean();
  const batchNames = [...new Set([...studentRows.map((row) => row.batch).filter(Boolean), ...scheduleRows.map((row) => row.batchName).filter(Boolean), ...assignedBatchRows.map((row) => row.name).filter(Boolean)])];
  const batchIds = [...new Set(scheduleRows.map((row) => String(row.batchId || "")).filter((id) => mongoose.isValidObjectId(id)))].map((id) => new mongoose.Types.ObjectId(id));
  assignedBatchRows.forEach((row) => batchIds.push(row._id));
  return { batchNames, batchIds };
}

async function teacherCanAccessBatch(user, batch) {
  if (!isTeacherAccount(user)) return true;
  const scope = await teacherAcademicBatchScope(user);
  return scope.batchIds.some((id) => String(id) === String(batch?._id || "")) || scope.batchNames.includes(String(batch?.name || ""));
}

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function maxStudentNumberSuffix(field, prefix) {
  const regex = new RegExp(`^${escapeRegex(prefix)}(\\d+)$`);
  const rows = await Student.find({ [field]: { $regex: regex } }).select(field).lean();
  return rows.reduce((max, row) => {
    const match = String(row?.[field] || "").match(regex);
    const value = match ? Number(match[1]) : 0;
    return Number.isFinite(value) ? Math.max(max, value) : max;
  }, 0);
}

async function nextCounterValue(key, floor = 0) {
  const existing = await Counter.findOne({ key }).select("seq").lean();
  if (!existing) {
    await Counter.create({ key, seq: floor }).catch((error) => {
      if (error?.code !== 11000) throw error;
    });
  } else if (Number(existing.seq || 0) < floor) {
    await Counter.updateOne({ key, seq: { $lt: floor } }, { $set: { seq: floor } });
  }
  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
  ).lean();
  return counter.seq;
}

function priorityFromLeadFeedback(feedback = "") {
  const normalized = String(feedback || "").toLowerCase();
  if (normalized.includes("qualified") || normalized.includes("converted")) return "P0";
  if (normalized.includes("interested")) return "P1";
  if (normalized.includes("lost") || normalized.includes("invalid") || normalized.includes("not connected")) return "P3";
  if (normalized) return "P2";
  return "";
}

function normalizeLeadPriority(value = "") {
  const normalized = String(value || "").trim();
  const legacyMap = { Hot: "P0", Warm: "P2", Cold: "P3" };
  const priority = legacyMap[normalized] || normalized.toUpperCase() || "P2";
  return leadPriorityOptions.includes(priority) ? priority : "P2";
}

function normalizeLeadFeedbackStatus(value = "") {
  const legacyMap = {
    "Hot lead": "Interested",
    "Warm lead": "Follow-up",
    "Cold lead": "Lost",
    RNR: "Not Connected",
    DNP: "Not Connected",
    "Call back": "Busy Call later",
    "Not interested": "Lost",
    "Invalid number": "Invalid",
  };
  const status = legacyMap[value] || value || "New";
  return leadFeedbackOptions.includes(status) ? status : "New";
}

function feeWithGst(baseFee = 0) {
  return Math.round(Number(baseFee || 0) * (1 + GST_RATE));
}

function normalizeExcelKey(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function excelCell(row, aliases = []) {
  const normalizedAliases = aliases.map(normalizeExcelKey);
  for (const [key, value] of Object.entries(row || {})) {
    if (normalizedAliases.includes(normalizeExcelKey(key))) return value;
  }
  return "";
}

function excelString(row, aliases = []) {
  return String(excelCell(row, aliases) ?? "").trim();
}

function excelNumber(row, aliases = []) {
  const raw = excelString(row, aliases).replace(/[₹,\s]/g, "");
  const value = Number(raw || 0);
  return Number.isFinite(value) ? value : 0;
}

function isHeadBranchScoped(user) {
  return ["admin", "counsellor", "teacher"].includes(user?.role);
}

async function headOfficeBranchScope(user) {
  const assignedBranchId = isHeadBranchScoped(user) && user?.franchiseId ? String(user.franchiseId) : "";
  const branches = await Centre.find({
    active: true,
    type: "branch",
    ...(assignedBranchId ? { _id: assignedBranchId } : {}),
  }).select("_id name").lean();
  return {
    ids: branches.map((branch) => branch._id),
    names: branches.map((branch) => branch.name),
  };
}

function requireHeadAdmin(req, res, next) {
  if (!isHeadAdmin(req.user)) return sendError(res, 403, "Head admin access required");
  next();
}

function requireFranchiseManager(req, res, next) {
  if (!isHeadAdmin(req.user) && !isFranchiseSuperAdmin(req.user)) return sendError(res, 403, "Franchise manager access required");
  next();
}

async function scopedDataFilter(req, query = {}) {
  const filter = { ...adminScopeFilter(query) };
  if (isFranchiseUser(req.user)) {
    if (!req.user.franchiseId) return { ...filter, franchiseId: emptyObjectId };
    filter.franchiseId = req.user.franchiseId;
  } else if (isHeadBranchScoped(req.user)) {
    const branchScope = await headOfficeBranchScope(req.user);
    filter.$or = [
      { franchiseId: { $in: branchScope.ids } },
      { centre: { $in: branchScope.names } },
    ];
  }
  return filter;
}

async function canAccessRecord(req, record) {
  const rawRecord = typeof record?.toObject === "function" ? record.toObject() : record;
  const hasCounsellorOwner = rawRecord && Object.prototype.hasOwnProperty.call(rawRecord, "counsellor");
  const hasTeacherOwner = rawRecord && Object.prototype.hasOwnProperty.call(rawRecord, "teacher");
  const counsellorOwner = String(rawRecord?.counsellor || "");
  const teacherOwner = String(rawRecord?.teacher || "");
  const recordBatchName = String(rawRecord?.batch || rawRecord?.batchName || rawRecord?.name || "");
  if (isFranchiseUser(req.user)) {
    const inFranchise = Boolean(req.user.franchiseId && record?.franchiseId && String(record.franchiseId) === String(req.user.franchiseId));
    if (!inFranchise) return false;
    if (isCounsellorAccount(req.user) && hasCounsellorOwner) return counsellorOwner === req.user.name;
    if (isTeacherAccount(req.user)) {
      if (hasTeacherOwner && teacherOwner === req.user.name) return true;
      const teacherScope = await teacherAcademicBatchScope(req.user);
      return teacherScope.batchNames.includes(recordBatchName);
    }
    return true;
  }
  if (isHeadBranchScoped(req.user)) {
    const branchScope = await headOfficeBranchScope(req.user);
    const recordFranchiseId = record?.franchiseId ? String(record.franchiseId) : "";
    const inBranch = branchScope.ids.some((id) => String(id) === recordFranchiseId) || branchScope.names.includes(String(record?.centre || ""));
    if (!inBranch) return false;
    if (isCounsellorAccount(req.user) && hasCounsellorOwner) return counsellorOwner === req.user.name;
    if (isTeacherAccount(req.user)) {
      if (hasTeacherOwner && teacherOwner === req.user.name) return true;
      const teacherScope = await teacherAcademicBatchScope(req.user);
      return teacherScope.batchNames.includes(recordBatchName);
    }
    return true;
  }
  return true;
}

async function resolveFranchiseFromRequest(req, centreName = "") {
  if (isFranchiseUser(req.user)) {
    if (!req.user.franchiseId) return null;
    return Centre.findById(req.user.franchiseId).lean();
  }
  const assignedBranchFilter = isHeadBranchScoped(req.user) && req.user.franchiseId ? { _id: req.user.franchiseId, type: "branch" } : {};
  const bodyFranchiseId = req.body?.franchiseId || req.query?.franchiseId;
  if (bodyFranchiseId && mongoose.isValidObjectId(String(bodyFranchiseId))) {
    const centre = await Centre.findOne({ _id: bodyFranchiseId, ...(isHeadBranchScoped(req.user) ? { type: "branch" } : {}), ...assignedBranchFilter }).lean();
    if (centre) return centre;
  }
  if (centreName) return Centre.findOne({ name: centreName, ...(isHeadBranchScoped(req.user) ? { type: "branch" } : {}), ...assignedBranchFilter }).lean();
  return null;
}

function staffResponse(user) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    franchiseId: user.franchiseId?.toString() || "",
    googleCalendarConnected: Boolean(user.googleCalendarConnectedAt || user.googleCalendarEmail),
    googleCalendarEmail: user.googleCalendarEmail || "",
  };
}

function dateFilter(query = {}) {
  if (!query.date) return {};
  const parts = String(query.date).split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return {};
  const [year, month, day] = parts;
  const start = new Date(year, month - 1, day, 0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { createdAt: { $gte: start, $lt: end } };
}

function attendanceDate(value = "") {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  }
  const parts = String(value).split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  return new Date(Date.UTC(year, month - 1, day));
}

function weekRangeFromDate(value = "") {
  const base = attendanceDate(value) || new Date();
  const day = base.getUTCDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const start = new Date(base);
  start.setUTCDate(base.getUTCDate() + mondayOffset);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 6);
  end.setUTCHours(23, 59, 59, 999);
  return { start, end };
}

function dayCode(date) {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getUTCDay()];
}

function attendanceRangeFilter(query = {}) {
  const day = attendanceDate(query.date || "");
  if (day) return { date: day };
  const from = attendanceDate(query.dateFrom || "");
  const to = attendanceDate(query.dateTo || "");
  if (!from && !to) return {};
  const range = {};
  if (from) range.$gte = from;
  if (to) {
    const end = new Date(to);
    end.setUTCDate(end.getUTCDate() + 1);
    range.$lt = end;
  }
  return { date: range };
}

function paginationFromQuery(query = {}) {
  const page = Math.max(1, Number.parseInt(String(query.page || "1"), 10) || 1);
  const limit = Math.min(100, Math.max(10, Number.parseInt(String(query.limit || "25"), 10) || 25));
  return { page, limit, skip: (page - 1) * limit };
}

function paginationMeta(total, page, limit) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return { page, limit, total, pages, hasPrev: page > 1, hasNext: page < pages };
}

function requireSuperAdmin(req, res, next) {
  if (!isHeadAdmin(req.user)) return sendError(res, 403, "Head admin access required");
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "imed-crm", mongo: mongoose.connection.readyState === 1 });
});

function studentAdminResponse(student = {}) {
  const data = typeof student.toObject === "function" ? student.toObject() : { ...student };
  return data;
}

async function studentAdminWithInternshipResponse(student = {}) {
  const data = studentAdminResponse(student);
  if (!data?._id) return data;
  data.internshipAssignment = await InternshipAssignment.findOne({ studentId: data._id }).lean();
  data.internshipLogs = data.internshipAssignment
    ? await InternshipLog.find({ assignmentId: data.internshipAssignment._id, studentId: data._id }).sort({ date: -1 }).limit(60).lean()
    : [];
  return data;
}

async function npsResponsesForStudent(studentId) {
  return NpsResponse.find({ studentId, active: true }).sort({ submittedAt: -1 }).lean();
}

function npsAttributeList(touchpoint) {
  const common = ["attrTeachingQuality", "attrContentRelevance", "attrSupportInfra"];
  if (touchpoint === "post_internship") return [...common, "attrPlacementAssistance"];
  return [...common, "attrPracticalTraining"];
}

function publicNpsResponse(row = {}) {
  return {
    _id: row._id,
    touchpoint: row.touchpoint,
    label: npsTouchpointLabels[row.touchpoint] || row.touchpoint,
    npsScore: row.npsScore,
    npsCategory: row.npsCategory,
    attrTeachingQuality: row.attrTeachingQuality,
    attrContentRelevance: row.attrContentRelevance,
    attrPracticalTraining: row.attrPracticalTraining,
    attrSupportInfra: row.attrSupportInfra,
    attrPlacementAssistance: row.attrPlacementAssistance,
    openFeedback: row.openFeedback || "",
    submittedAt: row.submittedAt,
  };
}

function buildNpsEligibility({ student = {}, topics = [], internship = null, responses = [] }) {
  const responseMap = new Map(responses.map((row) => [row.touchpoint, row]));
  const coveredTopics = topics.filter((row) => row.status === "Covered").length;
  const topicPercent = topics.length ? Math.round((coveredTopics / topics.length) * 100) : 0;
  const internshipComplete = internship?.status === "Completed";
  const items = npsTouchpoints.map((touchpoint) => {
    let eligible = false;
    let reason = "";
    if (touchpoint === "mid_course") {
      eligible = topics.length > 0 && topicPercent >= 50;
      reason = eligible ? "50% syllabus is completed" : "Available after 50% syllabus completion";
    } else if (touchpoint === "post_classroom") {
      eligible = isStudentStatusAtLeast(student.status, "Classroom Complete");
      reason = eligible ? "Classroom is marked complete" : "Available after classroom completion";
    } else {
      eligible = internshipComplete;
      reason = eligible ? "Internship is marked complete" : "Available after internship completion";
    }
    const response = responseMap.get(touchpoint);
    return {
      touchpoint,
      label: npsTouchpointLabels[touchpoint],
      eligible,
      submitted: Boolean(response),
      required: eligible && !response,
      reason,
      availableSince: eligible ? (touchpoint === "post_internship" ? internship?.actualEndDate || internship?.updatedAt : new Date()) : null,
      response: response ? publicNpsResponse(response) : null,
    };
  });
  return {
    items,
    pending: items.find((item) => item.required) || null,
  };
}

async function npsEligibilityForStudent(student = {}, extra = {}) {
  const batch = extra.batch !== undefined ? extra.batch : (student.batch ? await Batch.findOne({ name: student.batch, active: true }).lean() : null);
  const batchFilter = batch ? { $or: [{ batchId: batch._id }, { batchName: batch.name }] } : { batchName: student.batch || "" };
  const [topics, internship, responses] = await Promise.all([
    extra.topics !== undefined ? Promise.resolve(extra.topics) : (batch ? TopicProgress.find(batchFilter).lean() : Promise.resolve([])),
    extra.internship !== undefined ? Promise.resolve(extra.internship) : InternshipAssignment.findOne({ studentId: student._id }).lean(),
    extra.responses !== undefined ? Promise.resolve(extra.responses) : npsResponsesForStudent(student._id),
  ]);
  return buildNpsEligibility({ student, topics, internship, responses });
}

function npsScopedFilter(req, query = {}) {
  return scopedDataFilter(req, query);
}

function computeNps(rows = []) {
  const activeRows = rows.filter((row) => row.active !== false);
  const total = activeRows.length;
  const promoters = activeRows.filter((row) => row.npsCategory === "promoter").length;
  const passives = activeRows.filter((row) => row.npsCategory === "passive").length;
  const detractors = activeRows.filter((row) => row.npsCategory === "detractor").length;
  return {
    total,
    promoters,
    passives,
    detractors,
    nps: total ? Math.round((promoters / total) * 100 - (detractors / total) * 100) : 0,
    promoterPercent: total ? Math.round((promoters / total) * 100) : 0,
    detractorPercent: total ? Math.round((detractors / total) * 100) : 0,
  };
}

function internshipExpectedEndDate(startDate, durationValue = 3, durationUnit = "months") {
  const end = new Date(startDate);
  if (durationUnit === "days") end.setUTCDate(end.getUTCDate() + Number(durationValue || 0));
  else if (durationUnit === "weeks") end.setUTCDate(end.getUTCDate() + (Number(durationValue || 0) * 7));
  else end.setUTCMonth(end.getUTCMonth() + Number(durationValue || 0));
  return end;
}

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, setupCode } = req.body || {};
  if (String(setupCode || "").trim() !== adminSetupCode) return sendError(res, 403, "Invalid admin setup code");
  if (!name || !email || !password) return sendError(res, 400, "Name, email, and password are required");
  if (String(password).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  const adminCount = await AdminUser.countDocuments();
  if (adminCount >= 4) return sendError(res, 403, "Admin account limit reached");
  const existing = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) return sendError(res, 409, "Account already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await AdminUser.create({ name, email, passwordHash, role: adminCount === 0 ? "superadmin" : "admin" });
  res.status(201).json({ ok: true, token: signToken(user), user: staffResponse(user) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return sendError(res, 400, "Email and password are required");
  const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (!user) return sendError(res, 401, "Invalid email or password");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return sendError(res, 401, "Invalid email or password");
  res.json({ ok: true, token: signToken(user), user: staffResponse(user) });
});

app.post("/api/auth/forgot-password", async (req, res) => {
  const email = String(req.body?.email || "").toLowerCase().trim();
  if (!email) return sendError(res, 400, "Email is required");
  const user = await AdminUser.findOne({ email });
  const genericMessage = "If this email exists, a password reset link has been sent";
  if (!user) return res.json({ ok: true, message: genericMessage });

  const token = crypto.randomBytes(32).toString("hex");
  user.passwordResetTokenHash = passwordResetHash(token);
  user.passwordResetExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = `${publicAppBaseUrl(req)}/?resetToken=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}#admin`;
  try {
    await transporter.sendMail({
      from: `iMED Academy Admin <${process.env.SMTP_USER}>`,
      to: user.email,
      subject: "Reset your iMED Admin CRM password",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#16213d">
          <h2>Password reset request</h2>
          <p>Hi ${escapeHtml(user.name || "Admin")},</p>
          <p>Use the secure link below to reset your Admin CRM password. This link expires in 1 hour.</p>
          <p><a href="${escapeHtml(resetUrl)}" style="display:inline-block;background:#4F6BFF;color:#fff;text-decoration:none;padding:10px 14px;border-radius:8px">Reset password</a></p>
          <p>If you did not request this, you can ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Password reset email failed", error);
    return sendError(res, 500, "Unable to send reset email right now");
  }
  res.json({ ok: true, message: genericMessage });
});

app.post("/api/auth/reset-password", async (req, res) => {
  const token = String(req.body?.token || "").trim();
  const newPassword = String(req.body?.newPassword || "");
  if (!token || !newPassword) return sendError(res, 400, "Reset token and new password are required");
  if (newPassword.length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  const user = await AdminUser.findOne({
    passwordResetTokenHash: passwordResetHash(token),
    passwordResetExpiresAt: { $gt: new Date() },
  });
  if (!user) return sendError(res, 400, "Reset link is invalid or expired");
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  user.passwordResetTokenHash = "";
  user.passwordResetExpiresAt = undefined;
  await user.save();
  res.json({ ok: true, message: "Password reset successfully" });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: staffResponse(req.user) });
});

app.post("/api/student/auth/login", async (req, res) => {
  const identifier = String(req.body?.identifier || "").trim();
  const phone = normalizePhone(req.body?.phone || "");
  if (!identifier || !phone) return sendError(res, 400, "Admission number and phone are required");
  const student = await Student.findOne({
    $or: [
      { admissionNumber: identifier },
      { email: identifier.toLowerCase() },
    ],
  });
  if (!student) return sendError(res, 401, "Invalid admission number or phone");
  if (!student.lmsAccessEnabled) return sendError(res, 403, "Student LMS access is not generated yet");
  const normalizedStudentPhone = normalizePhone(student.phone || "").replace(/\D/g, "");
  const normalizedInputPhone = phone.replace(/\D/g, "");
  if (!normalizedStudentPhone || !normalizedInputPhone || !normalizedStudentPhone.endsWith(normalizedInputPhone.slice(-10))) {
    return sendError(res, 401, "Invalid admission number or phone");
  }
  res.json({ ok: true, token: signStudentToken(student), student: studentAdminResponse(student) });
});

app.get("/api/student/me", requireStudentAuth, async (req, res) => {
  const student = req.student;
  const batch = student.batch ? await Batch.findOne({ name: student.batch, active: true }).lean() : null;
  const batchFilter = batch ? { $or: [{ batchId: batch._id }, { batchName: batch.name }] } : { batchName: student.batch || "" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const classVisibleFrom = new Date(today);
  [student.lmsAccessGeneratedAt, student.admissionFinalizedAt, student.batchCommenceDate].forEach((value) => {
    if (!value) return;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return;
    date.setHours(0, 0, 0, 0);
    if (date > classVisibleFrom) classVisibleFrom.setTime(date.getTime());
  });
  const [sessions, attendance, topics, practicals, studyNotes, internship, logbookEntries, npsResponses] = await Promise.all([
    student.batch ? ClassSession.find({ ...(batch ? batchFilter : { batchName: student.batch }), date: { $gte: classVisibleFrom } }).sort({ date: 1, startTime: 1 }).limit(90).lean() : [],
    Attendance.find({ studentId: student._id }).sort({ date: -1 }).limit(180).lean(),
    batch ? TopicProgress.find(batchFilter).sort({ module: 1, topic: 1 }).lean() : [],
    batch ? PracticalRecord.find({ ...batchFilter, studentId: student._id }).sort({ module: 1, practicalName: 1 }).lean() : [],
    batch ? StudyNote.find(batchFilter).sort({ createdAt: -1 }).lean() : [],
    InternshipAssignment.findOne({ studentId: student._id }).lean(),
    LogbookEntry.find({ studentId: student._id }).sort({ date: -1 }).limit(60).lean(),
    npsResponsesForStudent(student._id),
  ]);
  const internshipLogs = internship ? await InternshipLog.find({ assignmentId: internship._id, studentId: student._id }).sort({ date: -1 }).limit(60).lean() : [];
  const attendanceHeld = attendance.length;
  const attended = attendance.filter((row) => ["Present", "Late"].includes(row.status)).length;
  const attendancePercent = attendanceHeld ? Math.round((attended / attendanceHeld) * 100) : 0;
  const coveredTopics = topics.filter((row) => row.status === "Covered").length;
  const completedPracticals = practicals.filter((row) => row.status === "Completed").length;
  const nextClass = sessions.find((session) => new Date(session.date) >= today && !session.attendanceMarked) || null;
  res.json({
    ok: true,
    data: {
      student: studentAdminResponse(student),
      batch,
      phase: internship && ["Assigned", "Active"].includes(internship.status) ? "Internship" : "Classroom",
      summary: {
        attendanceHeld,
        attended,
        attendancePercent,
        topicTotal: topics.length,
        coveredTopics,
        topicPercent: topics.length ? Math.round((coveredTopics / topics.length) * 100) : 0,
        practicalTotal: practicals.length,
        completedPracticals,
        practicalPercent: practicals.length ? Math.round((completedPracticals / practicals.length) * 100) : 0,
        nextClass,
      },
      sessions,
      attendance,
      topics,
      practicals,
      studyNotes,
      internship,
      internshipLogs,
      logbookEntries,
      nps: buildNpsEligibility({ student, topics, internship, responses: npsResponses }),
      npsResponses: npsResponses.map(publicNpsResponse),
    },
  });
});

app.post("/api/nps/submit", requireStudentAuth, async (req, res) => {
  const touchpoint = String(req.body?.touchpoint || "").trim();
  if (!npsTouchpoints.includes(touchpoint)) return sendError(res, 400, "Choose a valid NPS touchpoint");
  const score = Number(req.body?.npsScore);
  if (!Number.isInteger(score) || score < 0 || score > 10) return sendError(res, 400, "Choose an NPS score from 0 to 10");
  const eligibility = await npsEligibilityForStudent(req.student);
  const item = eligibility.items.find((row) => row.touchpoint === touchpoint);
  if (!item?.eligible) return sendError(res, 400, item?.reason || "This feedback is not available yet");
  if (item.submitted) return sendError(res, 409, "This feedback has already been submitted");
  const attributes = npsAttributeList(touchpoint);
  const payload = {};
  for (const field of attributes) {
    const value = Number(req.body?.[field]);
    if (!Number.isInteger(value) || value < 1 || value > 5) return sendError(res, 400, "All star ratings are required");
    payload[field] = value;
  }
  const openFeedback = String(req.body?.openFeedback || "").trim();
  if (openFeedback.length > 500) return sendError(res, 400, "Feedback cannot exceed 500 characters");
  const batch = req.student.batch ? await Batch.findOne({ name: req.student.batch, active: true }).lean() : null;
  try {
    const response = await NpsResponse.create({
      studentId: req.student._id,
      batchId: batch?._id,
      batchName: batch?.name || req.student.batch || "",
      courseCode: normalizeCourseCode(req.student.course || ""),
      centre: req.student.centre || "",
      franchiseId: req.student.franchiseId,
      touchpoint,
      npsScore: score,
      npsCategory: npsCategory(score),
      ...payload,
      openFeedback,
      submittedAt: new Date(),
    });
    if (response.npsCategory === "detractor" && toAddress) {
      transporter.sendMail({
        from: `iMED Academy LMS <${process.env.SMTP_USER}>`,
        to: toAddress,
        subject: `Detractor NPS alert - ${req.student.fullName}`,
        html: `<p>${escapeHtml(req.student.fullName)} submitted ${score}/10 for ${escapeHtml(npsTouchpointLabels[touchpoint])}.</p><p>${escapeHtml(openFeedback || "No comment added.")}</p>`,
      }).catch(() => undefined);
    }
    res.status(201).json({ ok: true, data: publicNpsResponse(response), message: "Thank you for your feedback" });
  } catch (error) {
    if (error?.code === 11000) return sendError(res, 409, "This feedback has already been submitted");
    throw error;
  }
});

app.get("/api/nps/my-responses", requireStudentAuth, async (req, res) => {
  const rows = await npsResponsesForStudent(req.student._id);
  res.json({ ok: true, data: rows.map(publicNpsResponse) });
});

app.post("/api/student/internship/log", requireStudentAuth, leadDocumentUpload.single("photo"), async (req, res) => {
  const type = String(req.body?.type || "").trim();
  if (!["login", "logout"].includes(type)) return sendError(res, 400, "Choose log in or log out");
  if (!req.file) return sendError(res, 400, "Photo is required");
  const assignment = await InternshipAssignment.findOne({ studentId: req.student._id, status: { $in: ["Assigned", "Active"] } });
  if (!assignment) return sendError(res, 400, "No active internship assignment found");
  const day = attendanceDate(new Date());
  if (!day) return sendError(res, 400, "Invalid internship log date");
  const now = new Date();
  const startDay = attendanceDate(assignment.startDate);
  const endDay = attendanceDate(assignment.expectedEndDate);
  if ((startDay && day < startDay) || (endDay && day > endDay)) return sendError(res, 400, "Internship attendance is allowed only during assigned dates");
  const photo = saveLeadDocument(req.file);
  const gps = String(req.body?.gps || "").trim();
  const existing = await InternshipLog.findOne({ assignmentId: assignment._id, studentId: req.student._id, date: day });
  if (type === "login" && existing?.loginAt) return sendError(res, 400, existing.logoutAt ? "Today internship attendance is already completed" : "Already logged in today");
  if (type === "logout" && !existing?.loginAt) return sendError(res, 400, "Log in before logging out");
  if (type === "logout" && existing?.logoutAt) return sendError(res, 400, "Today internship attendance is already completed");
  const update = type === "login"
    ? { loginAt: now, loginPhoto: photo, loginGps: gps }
    : { logoutAt: now, logoutPhoto: photo, logoutGps: gps, hours: Math.max(0, Number(((now.getTime() - new Date(existing.loginAt).getTime()) / 36e5).toFixed(2))) };
  const log = await InternshipLog.findOneAndUpdate(
    { assignmentId: assignment._id, studentId: req.student._id, date: day },
    { $set: update, $setOnInsert: { assignmentId: assignment._id, studentId: req.student._id, date: day } },
    { returnDocument: "after", upsert: true, runValidators: true },
  );
  if (assignment.status === "Assigned") {
    assignment.status = "Active";
    await assignment.save();
  }
  res.json({ ok: true, data: log });
});

app.get("/api/student/internship/logs", requireStudentAuth, async (req, res) => {
  const assignment = await InternshipAssignment.findOne({ studentId: req.student._id }).lean();
  if (!assignment) return res.json({ ok: true, data: [], meta: paginationMeta(0, 1, 10) });
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(30, Math.max(1, Number(req.query.limit || 10)));
  const filter = { assignmentId: assignment._id, studentId: req.student._id };
  const [total, logs] = await Promise.all([
    InternshipLog.countDocuments(filter),
    InternshipLog.find(filter).sort({ date: -1 }).skip((page - 1) * limit).limit(limit).lean(),
  ]);
  res.json({ ok: true, data: logs, meta: paginationMeta(total, page, limit) });
});

app.post("/api/student/logbook", requireStudentAuth, async (req, res) => {
  const assignment = await InternshipAssignment.findOne({ studentId: req.student._id, status: { $in: ["Assigned", "Active"] } }).lean();
  if (!assignment) return sendError(res, 400, "No active internship assignment found");
  const day = attendanceDate(req.body?.date || new Date());
  const today = attendanceDate(new Date());
  if (!day || !today || day.getTime() !== today.getTime()) return sendError(res, 400, "Logbook can be submitted only for today");
  const attendanceLog = await InternshipLog.findOne({ assignmentId: assignment._id, studentId: req.student._id, date: day }).lean();
  if (!attendanceLog?.loginAt || !attendanceLog?.logoutAt) return sendError(res, 400, "Complete internship log in and log out before submitting logbook");
  const departmentArea = String(req.body?.departmentArea || "").trim();
  const activitiesPerformed = String(req.body?.activitiesPerformed || "").trim();
  const keyLearnings = String(req.body?.keyLearnings || "").trim();
  if (!departmentArea || !activitiesPerformed || !keyLearnings) return sendError(res, 400, "Department, activities, and key learnings are required");
  const existing = await LogbookEntry.findOne({ assignmentId: assignment._id, studentId: req.student._id, date: day });
  if (existing && Date.now() - new Date(existing.createdAt).getTime() > 24 * 60 * 60 * 1000) return sendError(res, 400, "This logbook entry is locked after 24 hours");
  const entry = await LogbookEntry.findOneAndUpdate(
    { assignmentId: assignment._id, studentId: req.student._id, date: day },
    {
      $set: {
        assignmentId: assignment._id,
        studentId: req.student._id,
        date: day,
        departmentArea,
        activitiesPerformed,
        keyLearnings,
        challenges: String(req.body?.challenges || "").trim(),
      },
    },
    { new: true, upsert: true, runValidators: true },
  );
  res.json({ ok: true, data: entry });
});

app.patch("/api/admin/students/:id/logbook/:entryId", requireAuth, async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const entry = await LogbookEntry.findOne({ _id: req.params.entryId, studentId: student._id });
  if (!entry) return sendError(res, 404, "Logbook entry not found");
  const verified = Boolean(req.body?.verified);
  entry.verified = verified;
  entry.supervisorRemark = String(req.body?.supervisorRemark || "").trim();
  entry.verifiedBy = verified ? (req.user.name || req.user.email || "Admin") : "";
  entry.verifiedAt = verified ? new Date() : undefined;
  await entry.save();
  res.json({ ok: true, data: entry });
});

app.get("/api/admin/google-calendar/status", requireAuth, async (req, res) => {
  if (!isTeacherAccount(req.user)) return sendError(res, 403, "Google Calendar is available for teacher accounts");
  const user = await AdminUser.findById(req.user._id).select("googleCalendarEmail googleCalendarConnectedAt").lean();
  res.json({ ok: true, data: { configured: googleCalendarReady(), connected: Boolean(user?.googleCalendarConnectedAt || user?.googleCalendarEmail), email: user?.googleCalendarEmail || "" } });
});

app.get("/api/admin/google-calendar/connect", requireAuth, (req, res) => {
  if (!isTeacherAccount(req.user)) return sendError(res, 403, "Google Calendar is available for teacher accounts");
  if (!googleCalendarReady()) return sendError(res, 400, "Google Calendar API is not configured");
  const state = jwt.sign({ id: req.user._id.toString(), purpose: "google-calendar" }, jwtSecret, { expiresIn: "10m" });
  const params = new URLSearchParams({
    client_id: googleCalendarClientId,
    redirect_uri: googleCalendarRedirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    prompt: "consent",
    include_granted_scopes: "false",
    state,
  });
  res.json({ ok: true, data: { url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` } });
});

app.get("/api/admin/google-calendar/callback", async (req, res) => {
  const redirectBase = publicAppBaseUrl(req);
  try {
    if (!googleCalendarReady()) throw new Error("Google Calendar API is not configured");
    const code = String(req.query.code || "");
    const state = String(req.query.state || "");
    if (!code || !state) throw new Error("Missing Google Calendar authorization details");
    const payload = jwt.verify(state, jwtSecret);
    if (payload.purpose !== "google-calendar" || !mongoose.isValidObjectId(String(payload.id || ""))) throw new Error("Invalid Google Calendar authorization");
    const tokenResult = await googleOAuthFetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: googleCalendarClientId,
        client_secret: googleCalendarClientSecret,
        redirect_uri: googleCalendarRedirectUri,
        grant_type: "authorization_code",
      }),
    });
    if (!tokenResult.refresh_token) throw new Error("Google did not return a refresh token. Disconnect and try again with consent.");
    const accessToken = tokenResult.access_token || "";
    const profile = accessToken ? await googleCalendarFetch("/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${accessToken}` } }).catch(() => ({})) : {};
    await AdminUser.findByIdAndUpdate(payload.id, {
      $set: {
        googleCalendarRefreshToken: encryptGoogleToken(tokenResult.refresh_token),
        googleCalendarEmail: profile.email || "",
        googleCalendarConnectedAt: new Date(),
      },
    });
    res.redirect(`${redirectBase}/?calendar=connected#admin`);
  } catch (error) {
    res.redirect(`${redirectBase}/?calendar=error&message=${encodeURIComponent(error.message || "Google Calendar connection failed")}#admin`);
  }
});

app.delete("/api/admin/google-calendar", requireAuth, async (req, res) => {
  if (!isTeacherAccount(req.user)) return sendError(res, 403, "Google Calendar is available for teacher accounts");
  await AdminUser.findByIdAndUpdate(req.user._id, { $unset: { googleCalendarRefreshToken: "", googleCalendarConnectedAt: "" }, $set: { googleCalendarEmail: "" } });
  res.json({ ok: true, message: "Google Calendar disconnected" });
});

app.post("/api/admin/google-calendar/sync", requireAuth, async (req, res) => {
  if (!isTeacherAccount(req.user)) return sendError(res, 403, "Google Calendar sync is available for teacher accounts");
  if (!googleCalendarReady()) return sendError(res, 400, "Google Calendar API is not configured");
  const connectedUser = await AdminUser.findById(req.user._id).select("+googleCalendarRefreshToken googleCalendarEmail googleCalendarConnectedAt").lean();
  if (!connectedUser?.googleCalendarRefreshToken) return sendError(res, 400, "Connect Google Calendar first");
  const scope = await teacherAcademicBatchScope(req.user);
  if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [], message: "No assigned class sessions to sync" });
  const range = req.body?.week ? weekRangeFromDate(req.body.week) : (() => {
    const start = new Date();
    start.setUTCDate(start.getUTCDate() - 7);
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCDate(start.getUTCDate() + 120);
    end.setUTCHours(23, 59, 59, 999);
    return { start, end };
  })();
  const filter = {
    date: { $gte: range.start, $lte: range.end },
    $or: [{ faculty: req.user.name }, { batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }],
  };
  const sessions = await ClassSession.find(filter).sort({ date: 1, startTime: 1 }).lean();
  if (!sessions.length) return res.json({ ok: true, data: [], message: "No generated class sessions found to sync" });
  const calendar = await syncClassSessionsToGoogleCalendar(sessions, { teacher: connectedUser });
  const syncedSessions = await ClassSession.find(filter).sort({ date: 1, startTime: 1 }).lean();
  const reason = calendar.errors?.[0]?.message ? ` (${calendar.errors[0].message})` : "";
  res.json({ ok: true, data: syncedSessions, message: `${calendar.synced} classes synced to Google Calendar${calendar.skipped ? `, ${calendar.skipped} skipped${reason}` : ""}` });
});

app.get("/api/certificates/verify/:certificateNumber", async (req, res) => {
  const certificateNumber = String(req.params.certificateNumber || "").trim();
  if (!certificateNumber) return sendError(res, 400, "Certificate number is required");
  const student = await Student.findOne({ certificateNumber, certificateStatus: "Issued" })
    .select("fullName course centre batch batchCommenceDate certificateNumber certificateIssuedAt certificateStatus")
    .lean();
  if (!student) return sendError(res, 404, "Certificate not found");
  res.json({ ok: true, data: student });
});

app.get("/api/centres", async (_req, res) => {
  const centres = await Centre.find({ active: true })
    .select("name city type")
    .sort({ type: 1, name: 1 })
    .lean();
  res.json({ ok: true, data: centres });
});

app.get("/api/admin/counsellors", requireAuth, requireFranchiseManager, async (req, res) => {
  const filter = isFranchiseSuperAdmin(req.user)
    ? { role: { $in: ["franchise_counsellor", "franchise_teacher"] }, franchiseId: req.user.franchiseId || emptyObjectId }
    : isHeadBranchAdmin(req.user)
      ? { role: { $in: ["admin", "counsellor", "teacher"] }, ...(req.user.franchiseId ? { franchiseId: req.user.franchiseId } : {}) }
      : { role: { $in: ["superadmin", "admin", "counsellor", "teacher", "franchise_superadmin", "franchise_counsellor", "franchise_teacher"] } };
  const counsellors = await AdminUser.find(filter).select("name email role franchiseId").sort({ name: 1 }).lean();
  res.json({ ok: true, data: counsellors });
});

app.get("/api/admin/teachers", requireAuth, async (req, res) => {
  if (!(isHeadAdmin(req.user) || isFranchiseSuperAdmin(req.user) || isCounsellorAccount(req.user))) return sendError(res, 403, "Teacher list is restricted to admin and counsellor accounts");
  let filter = { role: { $in: ["teacher", "franchise_teacher"] } };
  if (isFranchiseUser(req.user)) {
    filter = { ...filter, franchiseId: req.user.franchiseId || emptyObjectId };
  } else if (isHeadBranchScoped(req.user)) {
    filter = { ...filter, franchiseId: req.user.franchiseId || emptyObjectId };
  }
  const teachers = await AdminUser.find(filter).select("name email role franchiseId").sort({ name: 1 }).lean();
  res.json({ ok: true, data: teachers });
});

app.post("/api/admin/counsellors", requireAuth, requireFranchiseManager, async (req, res) => {
  const { name, email, password, role = "counsellor", franchiseId = "" } = req.body || {};
  if (!name || !email || !password) return sendError(res, 400, "Name, email, and password are required");
  if (String(password).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  if (!["superadmin", "admin", "counsellor", "teacher", "franchise_superadmin", "franchise_counsellor", "franchise_teacher"].includes(role)) return sendError(res, 400, "Invalid staff role");
  if (isFranchiseSuperAdmin(req.user) && !["franchise_counsellor", "franchise_teacher"].includes(role)) return sendError(res, 403, "Franchise super admin can create only franchise staff");
  if (isHeadBranchAdmin(req.user) && !["admin", "counsellor", "teacher"].includes(role)) return sendError(res, 403, "Head admin can create only head office staff");
  if (role === "superadmin" && !isHeadSuperAdmin(req.user)) return sendError(res, 403, "Head super admin access required");
  if (!isHeadAdmin(req.user) && ["superadmin", "admin", "counsellor", "teacher", "franchise_superadmin"].includes(role)) return sendError(res, 403, "Head admin access required");
  const assignedFranchiseId = isFranchiseSuperAdmin(req.user) || isHeadBranchAdmin(req.user) ? req.user.franchiseId : franchiseId;
  const needsAssignedCentre = ["admin", "counsellor", "teacher", "franchise_superadmin", "franchise_counsellor", "franchise_teacher"].includes(role);
  if (needsAssignedCentre && !mongoose.isValidObjectId(String(assignedFranchiseId || ""))) return sendError(res, 400, ["admin", "counsellor", "teacher"].includes(role) ? "Branch is required" : "Franchise is required");
  if (needsAssignedCentre) {
    const expectedType = ["admin", "counsellor", "teacher"].includes(role) ? "branch" : "franchise";
    const centre = await Centre.findOne({ _id: assignedFranchiseId, type: expectedType }).lean();
    if (!centre) return sendError(res, 404, expectedType === "branch" ? "Branch not found" : "Franchise not found");
  }
  const existing = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) return sendError(res, 409, "Staff account already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const counsellor = await AdminUser.create({
    name,
    email,
    passwordHash,
    role,
    franchiseId: needsAssignedCentre ? assignedFranchiseId : undefined,
  });
  res.status(201).json({ ok: true, data: staffResponse(counsellor) });
});

app.patch("/api/admin/me/password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  if (!currentPassword || !newPassword) return sendError(res, 400, "Current and new password are required");
  if (String(newPassword).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  const user = await AdminUser.findById(req.user._id);
  if (!user) return sendError(res, 404, "Account not found");
  const valid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!valid) return sendError(res, 401, "Current password is incorrect");
  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ ok: true, message: "Password updated" });
});

app.get("/api/admin/dashboard/summary", requireAuth, async (req, res) => {
  const leadFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
  const studentFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [leadsThisMonth, totalLeads, enrolled, training, placed, lost, students, revenueAgg, pendingAgg] = await Promise.all([
    Lead.countDocuments(leadFilter.createdAt ? leadFilter : { ...leadFilter, createdAt: { $gte: startOfMonth } }),
    Lead.countDocuments(leadFilter),
    Lead.countDocuments({ ...leadFilter, stage: "Enrolled" }),
    Student.countDocuments({ ...studentFilter, status: { $in: ["Admission", "Admission Completed", "Fees Decided", "Fees Collected", "Active Student", "In Training"] } }),
    Student.countDocuments({ ...studentFilter, status: { $in: ["Course Completed", "Alumni", "Placed"] } }),
    Lead.countDocuments({ ...leadFilter, stage: "Lost" }),
    Student.countDocuments(studentFilter),
    Student.aggregate([{ $match: studentFilter }, { $group: { _id: null, total: { $sum: "$paidAmount" } } }]),
    Student.aggregate([{ $match: studentFilter }, { $group: { _id: null, total: { $sum: { $max: [{ $subtract: [{ $subtract: ["$totalFee", { $ifNull: ["$discountAmount", 0] }] }, "$paidAmount"] }, 0] } } } }]),
  ]);

  const conversion = totalLeads ? Math.round(((enrolled + placed) / totalLeads) * 100) : 0;
  res.json({ ok: true, data: { leadsThisMonth, totalLeads, enrolled, training, placed, lost, students, conversion, revenue: revenueAgg[0]?.total || 0, pending: pendingAgg[0]?.total || 0 } });
});

app.get("/api/admin/dashboard/funnel", requireAuth, async (req, res) => {
  const leadFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
  const studentFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };

  const allStages = ["New Lead", "Contacted", "Counselling", "Demo / Visit", "Admission", "Enrolled", "Alumni"];
  const leadGroups = await Lead.aggregate([{ $match: leadFilter }, { $group: { _id: "$stage", count: { $sum: 1 } } }]);
  const [studentTraining, studentCompleted, studentAlumni] = await Promise.all([
    Student.countDocuments({ ...studentFilter, status: { $in: ["Fees Decided", "Fees Collected", "Active Student", "In Training"] } }),
    Student.countDocuments({ ...studentFilter, status: "Course Completed" }),
    Student.countDocuments({ ...studentFilter, status: "Alumni" }),
  ]);
  const data = allStages.map((stage) => {
    if (stage === "Active Student") return { stage, count: studentTraining };
    if (stage === "Course Completed") return { stage, count: studentCompleted };
    if (stage === "Alumni") return { stage, count: studentAlumni };
    return { stage, count: leadGroups.find((item) => item._id === stage)?.count || 0 };
  });
  res.json({ ok: true, data });
});

app.get("/api/admin/dashboard/centres", requireAuth, async (req, res) => {
  const leadFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
  const studentFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
  if (!leadFilter.centre) leadFilter.centre = { $nin: ["", null] };
  if (!studentFilter.centre) studentFilter.centre = { $nin: ["", null] };
  const [leadGroups, studentGroups] = await Promise.all([
    Lead.aggregate([{ $match: leadFilter }, { $group: { _id: "$centre", leads: { $sum: 1 } } }]),
    Student.aggregate([
      { $match: studentFilter },
      { $group: { _id: "$centre", enrolled: { $sum: 1 } } },
      { $match: { enrolled: { $gt: 0 } } },
      { $sort: { enrolled: -1 } },
    ]),
  ]);
  const leadCounts = new Map(leadGroups.map((item) => [item._id || "Unassigned", item.leads]));
  const data = studentGroups.map((item) => {
    const centre = item._id || "Unassigned";
    return { _id: centre, leads: leadCounts.get(centre) || item.enrolled, enrolled: item.enrolled };
  });
  res.json({ ok: true, data: data.map((item) => ({ centre: item._id || "Unassigned", leads: item.leads, enrolled: item.enrolled })) });
});

app.get("/api/admin/leads", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead access is restricted to counsellor and admin accounts");
  const { q = "", stage = "", centre = "", course = "", counsellor = "", leadFeedback = "" } = req.query;
  const filter = { ...dateFilter(req.query) };
  if (stage) filter.stage = stage;
  if (leadFeedback) filter.leadFeedback = leadFeedback;
  if (centre) filter.centre = centre;
  if (course) filter.course = course;
  if (counsellor) filter.counsellor = counsellor;
  if (isCounsellorAccount(req.user)) filter.counsellor = req.user.name;
  Object.assign(filter, await scopedDataFilter(req, req.query));
  if (q) {
    const searchFilter = [{ fullName: { $regex: q, $options: "i" } }, { phone: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }];
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchFilter }];
      delete filter.$or;
    } else {
      filter.$or = searchFilter;
    }
  }
  const { page, limit, skip } = paginationFromQuery(req.query);
  const [total, leads] = await Promise.all([
    Lead.countDocuments(filter),
    Lead.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
  ]);
  res.json({ ok: true, data: leads, meta: paginationMeta(total, page, limit) });
});

app.get("/api/admin/admissions/pending-count", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead access is restricted to counsellor and admin accounts");
  const leadFilter = { stage: "Admission" };
  Object.assign(leadFilter, await scopedDataFilter(req, req.query));
  if (isCounsellorAccount(req.user)) leadFilter.counsellor = req.user.name;

  const studentFilter = { leadId: { $exists: true, $ne: null } };
  Object.assign(studentFilter, await scopedDataFilter(req, req.query));
  if (isCounsellorAccount(req.user)) studentFilter.counsellor = req.user.name;

  const convertedLeadIds = await Student.distinct("leadId", studentFilter);
  const total = await Lead.countDocuments({ ...leadFilter, _id: { $nin: convertedLeadIds } });
  res.json({ ok: true, data: { total } });
});

app.post("/api/admin/leads", requireAuth, leadDocumentUpload.fields([
  { name: "governmentProof", maxCount: 1 },
  { name: "highestQualificationCertificate", maxCount: 1 },
]), async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead creation is restricted to counsellor and admin accounts");
  const body = req.body || {};
  const files = req.files || {};
  if (!body.fullName || !body.phone || !body.studentLocation || !body.source || !body.centre) {
    return sendError(res, 400, "Full name, phone, student location, source and centre are required");
  }
  const franchise = await resolveFranchiseFromRequest(req, body.centre || "");
  if (isFranchiseUser(req.user) && !franchise) return sendError(res, 403, "Franchise account is not assigned");
  const centreName = franchise?.name || body.centre || "";
  if (!centreName) return sendError(res, 400, "Centre is required");
  if (!isCourseAllowedForCentre(centreName, body.course || "")) return sendError(res, 400, "Kochi centre allows only AHAP and GCA courses");
  const leadFeedback = normalizeLeadFeedbackStatus(body.leadFeedback);
  const requestedStage = String(body.stage || "New Lead").trim();
  if (!leadCreateStageOptions.includes(requestedStage)) return sendError(res, 400, "Use Admission and batch assignment before enrolling a lead");
  const lead = await Lead.create({
    fullName: body.fullName,
    phone: normalizePhone(body.phone),
    parentMobile: normalizePhone(body.parentMobile || ""),
    email: body.email || "",
    governmentProof: saveLeadDocument(files.governmentProof?.[0]),
    highestQualificationCertificate: saveLeadDocument(files.highestQualificationCertificate?.[0]),
    studentLocation: body.studentLocation || "",
    source: body.source || "Website",
    centre: centreName,
    franchiseId: franchise?._id,
    course: body.course || "",
    counsellor: isCounsellorAccount(req.user) ? req.user.name : body.counsellor || "Unassigned",
    leadFeedback,
    stage: requestedStage,
    priority: priorityFromLeadFeedback(leadFeedback) || normalizeLeadPriority(body.priority),
    city: body.city || "",
    expectedFee: canManageFees(req.user) ? Number(body.expectedFee || 0) : feeWithGst((await Course.findOne({ $or: [{ code: body.course }, { name: body.course }], active: true }).lean())?.fee || 0),
    notes: body.notes || "",
    activities: [{ type: "created", message: "Lead created", by: req.user.name }],
  });
  res.status(201).json({ ok: true, data: lead });
});

app.post("/api/admin/leads/import", requireAuth, upload.single("file"), async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead import is restricted to counsellor and admin accounts");
  if (!req.file) return sendError(res, 400, "Excel file is required");
  const extension = path.extname(req.file.originalname || "").toLowerCase();
  if (![".xlsx", ".xls", ".csv"].includes(extension)) return sendError(res, 400, "Upload .xlsx, .xls or .csv file");

  let rows = [];
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer", cellDates: true });
    const firstSheetName = workbook.SheetNames[0];
    rows = firstSheetName ? XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], { defval: "" }) : [];
  } catch {
    return sendError(res, 400, "Unable to read Excel file");
  }

  if (!rows.length) return sendError(res, 400, "Excel file has no lead rows");

  const courses = await Course.find({ active: true }).lean();
  const docs = [];
  const skipped = [];

  for (const [index, row] of rows.entries()) {
    const rowNumber = index + 2;
    const fullName = excelString(row, ["Full Name", "Name", "Student Name", "Lead Name", "Lead"]);
    const phone = normalizePhone(excelString(row, ["Phone", "Mobile", "Contact", "Contact No", "Mobile No", "Phone Number", "Contact Number"]));
    if (!fullName || !phone) {
      skipped.push({ row: rowNumber, reason: "Missing full name or phone" });
      continue;
    }

    const centreInput = excelString(row, ["Centre", "Center", "Branch", "Franchise", "Location"]);
    let franchise = await resolveFranchiseFromRequest(req, centreInput);
    if (!franchise && isHeadBranchScoped(req.user) && req.user.franchiseId) {
      franchise = await Centre.findOne({ _id: req.user.franchiseId, type: "branch", active: true }).lean();
    }
    if (isFranchiseUser(req.user) && !franchise) {
      skipped.push({ row: rowNumber, reason: "Franchise account is not assigned" });
      continue;
    }

    const courseInput = excelString(row, ["Course", "Program", "Course Code"]);
    const matchedCourse = courses.find((course) => [course.code, course.name].map((value) => String(value || "").toLowerCase()).includes(courseInput.toLowerCase()));
    const centreName = franchise?.name || centreInput || "";
    if (!centreName) {
      skipped.push({ row: rowNumber, reason: "Centre is required" });
      continue;
    }
    const courseValue = courseInput || matchedCourse?.code || matchedCourse?.name || "";
    if (!isCourseAllowedForCentre(centreName, courseValue)) {
      skipped.push({ row: rowNumber, reason: "Kochi centre allows only AHAP and GCA courses" });
      continue;
    }
    const rawLeadFeedback = excelString(row, ["Lead Status", "Status", "Lead Feedback", "Feedback", "Status Feedback"]) || "New";
    const leadFeedback = normalizeLeadFeedbackStatus(rawLeadFeedback);
    const rawStage = excelString(row, ["Stage", "Lead Stage"]) || "New Lead";
    const stage = leadCreateStageOptions.includes(rawStage) ? rawStage : "New Lead";
    const rawPriority = excelString(row, ["Priority"]);
    const priority = leadPriorityOptions.includes(String(rawPriority || "").toUpperCase()) || ["Hot", "Warm", "Cold"].includes(rawPriority) ? normalizeLeadPriority(rawPriority) : priorityFromLeadFeedback(leadFeedback) || "P2";
    const expectedFee = canManageFees(req.user)
      ? excelNumber(row, ["Expected Fee", "Fee", "Total Fee", "Course Fee"]) || feeWithGst(matchedCourse?.fee || 25000)
      : feeWithGst(matchedCourse?.fee || 25000);

    docs.push({
      fullName,
      phone,
      parentMobile: normalizePhone(excelString(row, ["Parent Mobile", "Parent Phone", "Parent Contact"])),
      email: excelString(row, ["Email", "Email Id"]),
      studentLocation: excelString(row, ["Student Location", "Student Place", "Address"]),
      source: excelString(row, ["Source", "Lead Source"]) || "Excel import",
      centre: centreName,
      franchiseId: franchise?._id,
      course: courseValue,
      counsellor: isCounsellorAccount(req.user) ? req.user.name : excelString(row, ["Counsellor", "Counselor", "Assigned To"]) || "Unassigned",
      leadFeedback,
      stage,
      priority,
      city: excelString(row, ["City"]),
      expectedFee,
      notes: excelString(row, ["Notes", "Remark", "Remarks"]),
      activities: [{ type: "created", message: "Lead imported from Excel", by: req.user.name }],
    });
  }

  if (!docs.length) {
    const headers = rows[0] ? Object.keys(rows[0]).filter(Boolean).join(", ") : "";
    return sendError(res, 400, `${skipped[0]?.reason || "No valid leads found in Excel"}${headers ? `. Found columns: ${headers}` : ""}`);
  }

  const created = await Lead.insertMany(docs, { ordered: false });
  res.status(201).json({ ok: true, data: { inserted: created.length, skipped } });
});

app.patch("/api/admin/leads/:id", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead updates are restricted to counsellor and admin accounts");
  const allowedLeadUpdates = (({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, studentLocation, source, centre, course, counsellor, leadFeedback, stage, priority, city, expectedFee, nextFollowUp, notes }) => ({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, studentLocation, source, centre, course, counsellor, leadFeedback, stage, priority, city, expectedFee, nextFollowUp, notes }))(req.body || {});
  Object.keys(allowedLeadUpdates).forEach((key) => allowedLeadUpdates[key] === undefined && delete allowedLeadUpdates[key]);
  if (!canManageFees(req.user) && Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "expectedFee")) {
    return sendError(res, 403, "Fee updates are restricted to admin accounts");
  }
  if (!canAssignStaff(req.user)) delete allowedLeadUpdates.counsellor;
  if (Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "leadFeedback")) allowedLeadUpdates.leadFeedback = normalizeLeadFeedbackStatus(allowedLeadUpdates.leadFeedback);
  if (allowedLeadUpdates.leadFeedback) allowedLeadUpdates.priority = priorityFromLeadFeedback(allowedLeadUpdates.leadFeedback) || allowedLeadUpdates.priority;
  if (Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "priority")) allowedLeadUpdates.priority = normalizeLeadPriority(allowedLeadUpdates.priority);
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  if (isFranchiseUser(req.user)) delete allowedLeadUpdates.centre;
  if (allowedLeadUpdates.centre && !isFranchiseUser(req.user)) {
    const franchise = await resolveFranchiseFromRequest(req, allowedLeadUpdates.centre);
    if (franchise) {
      allowedLeadUpdates.centre = franchise.name;
      allowedLeadUpdates.franchiseId = franchise._id;
    }
  }
  const nextLeadCentre = Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "centre") ? allowedLeadUpdates.centre : existingLead.centre;
  const nextLeadCourse = Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "course") ? allowedLeadUpdates.course : existingLead.course;
  if (!isCourseAllowedForCentre(nextLeadCentre, nextLeadCourse)) return sendError(res, 400, "Kochi centre allows only AHAP and GCA courses");
  if (["Enrolled", "Alumni"].includes(allowedLeadUpdates.stage)) {
    const linkedStudent = await Student.findOne({ leadId: existingLead._id }).select("_id").lean();
    if (!linkedStudent) return sendError(res, 400, "Use Admission stage and assign a batch before enrolling this lead");
  }
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $set: allowedLeadUpdates }, { new: true, runValidators: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  const studentSyncUpdates = {};
  ["fullName", "phone", "parentMobile", "email", "governmentProof", "highestQualificationCertificate", "studentLocation", "centre", "franchiseId", "course", "counsellor"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(allowedLeadUpdates, field)) studentSyncUpdates[field] = lead[field];
  });
  if (Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "expectedFee")) studentSyncUpdates.totalFee = lead.expectedFee;
  if (Object.prototype.hasOwnProperty.call(allowedLeadUpdates, "stage") && ["Enrolled", "Alumni"].includes(lead.stage)) {
    studentSyncUpdates.status = lead.stage;
  }
  if (Object.keys(studentSyncUpdates).length) {
    const linkedStudents = await Student.find({ leadId: lead._id }).select("_id").lean();
    const linkedStudentIds = linkedStudents.map((student) => student._id);
    await Promise.all([
      Student.updateMany({ _id: { $in: linkedStudentIds } }, { $set: studentSyncUpdates }),
      linkedStudentIds.length ? Attendance.updateMany({ studentId: { $in: linkedStudentIds } }, { $set: {
        ...(studentSyncUpdates.fullName ? { studentName: studentSyncUpdates.fullName } : {}),
        ...(studentSyncUpdates.centre ? { centre: studentSyncUpdates.centre } : {}),
        ...(studentSyncUpdates.franchiseId ? { franchiseId: studentSyncUpdates.franchiseId } : {}),
        ...(studentSyncUpdates.course ? { course: studentSyncUpdates.course } : {}),
        ...(studentSyncUpdates.counsellor ? { counsellor: studentSyncUpdates.counsellor } : {}),
      } }) : Promise.resolve(),
    ]);
  }
  res.json({ ok: true, data: lead });
});

app.delete("/api/admin/leads/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ ok: true, data: existingLead });
});

app.post("/api/admin/leads/:id/activities", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead activities are restricted to counsellor and admin accounts");
  const { message, type = "note" } = req.body || {};
  if (!message) return sendError(res, 400, "Message is required");
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $push: { activities: { type, message, by: req.user.name } } }, { new: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/followups", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead follow-ups are restricted to counsellor and admin accounts");
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  const scheduledAt = req.body?.scheduledAt ? new Date(req.body.scheduledAt) : null;
  if (!scheduledAt || Number.isNaN(scheduledAt.getTime())) return sendError(res, 400, "Follow-up date is required");
  const followUp = {
    type: req.body?.type || "Call",
    status: req.body?.status || "Scheduled",
    scheduledAt,
    note: String(req.body?.note || "").trim(),
    by: req.user.name,
  };
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    {
      $set: { nextFollowUp: scheduledAt },
      $push: {
        followUps: { $each: [followUp], $position: 0 },
        activities: { type: "follow-up", message: `${followUp.status}: ${followUp.type} on ${scheduledAt.toLocaleDateString("en-IN")}`, by: req.user.name },
      },
    },
    { new: true, runValidators: true },
  );
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/convert", requireAuth, async (req, res) => {
  if (!canUseLeads(req.user)) return sendError(res, 403, "Lead conversion is restricted to counsellor and admin accounts");
  const lead = await Lead.findById(req.params.id);
  if (!lead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, lead))) return sendError(res, 403, "You can access only permitted records");
  const existing = await Student.findOne({ leadId: lead._id });
  if (existing) return res.json({ ok: true, data: existing });
  if (lead.stage !== "Admission") return sendError(res, 400, "Move lead to Admission before enrolling");
  const batchName = String(req.body?.batch || "").trim();
  if (!batchName) return sendError(res, 400, "Assign a batch before enrolling");
  const batch = await Batch.findOne({
    active: true,
    name: batchName,
    ...(lead.franchiseId ? { franchiseId: lead.franchiseId } : {}),
  }).lean();
  if (!batch) return sendError(res, 400, "Selected batch was not found");
  if (lead.centre && batch.centre && batch.centre !== lead.centre) return sendError(res, 400, "Batch centre must match the lead centre");
  if (lead.course && batch.course && String(batch.course).toUpperCase() !== String(lead.course).toUpperCase()) return sendError(res, 400, "Batch course must match the lead course");
  const assignedTeacher = Array.isArray(batch.assignedFaculty) && batch.assignedFaculty.length ? String(batch.assignedFaculty[0] || "").trim() : "";
  const assignedCounsellor = String(lead.counsellor || "").trim() && String(lead.counsellor || "").trim() !== "Unassigned"
    ? String(lead.counsellor || "").trim()
    : isCounsellorAccount(req.user)
      ? req.user.name
      : "";
  const admissionYear = new Date().getFullYear();
  const admissionPrefix = `IMED-${admissionYear}-`;
  const admissionSeq = await nextCounterValue(`admission:${admissionYear}`, await maxStudentNumberSuffix("admissionNumber", admissionPrefix));
  const student = await Student.create({
    leadId: lead._id,
    fullName: lead.fullName,
    phone: lead.phone,
    parentMobile: lead.parentMobile,
    email: lead.email,
    governmentProof: lead.governmentProof,
    highestQualificationCertificate: lead.highestQualificationCertificate,
    studentLocation: lead.studentLocation,
    centre: lead.centre,
    franchiseId: lead.franchiseId,
    course: lead.course,
    counsellor: assignedCounsellor || "Unassigned",
    teacher: assignedTeacher || "Unassigned",
    batch: batch.name,
    batchCommenceDate: batch.commenceDate,
    admissionNumber: `${admissionPrefix}${String(admissionSeq).padStart(4, "0")}`,
    status: "Enrolled",
    totalFee: canManageFees(req.user) ? Number(req.body?.totalFee || lead.expectedFee || 0) : Number(lead.expectedFee || 0),
    paidAmount: canManageFees(req.user) ? Number(req.body?.paidAmount || lead.paidAmount || 0) : Number(lead.paidAmount || 0),
    activities: [{ type: "converted", message: "Lead converted to student", by: req.user.name }],
  }).catch(async (error) => {
    if (error?.code === 11000) {
      const linkedStudent = await Student.findOne({ leadId: lead._id });
      if (linkedStudent) return linkedStudent;
    }
    throw error;
  });
  if (String(student.leadId || "") === String(lead._id) && lead.stage === "Enrolled") {
    return res.json({ ok: true, data: student });
  }
  lead.stage = "Enrolled";
  if (assignedCounsellor) lead.counsellor = assignedCounsellor;
  lead.leadFeedback = normalizeLeadFeedbackStatus(lead.leadFeedback);
  lead.priority = priorityFromLeadFeedback(lead.leadFeedback) || normalizeLeadPriority(lead.priority);
  lead.activities.push({ type: "converted", message: "Converted to student", by: req.user.name });
  await lead.save();
  res.status(201).json({ ok: true, data: student });
});

app.get("/api/admin/documents/:type/:id/:field", requireAuth, async (req, res) => {
  const { type, id, field } = req.params;
  if (!["lead", "student"].includes(type) || !["governmentProof", "highestQualificationCertificate"].includes(field)) {
    return sendError(res, 400, "Invalid document request");
  }
  const Model = type === "lead" ? Lead : Student;
  const record = await Model.findById(id).select(`${field} franchiseId`).lean();
  if (!record) return sendError(res, 404, "Document not found");
  if (!(await canAccessRecord(req, record))) return sendError(res, 403, "You can access only permitted records");
  const document = record?.[field];
  if (!document?.storedName) return sendError(res, 404, "Document not found");
  const filePath = path.join(leadDocumentDir, document.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Document not found");
  const fileName = String(document.originalName || "document").replace(/[\r\n"]/g, "");
  res.setHeader("Content-Type", document.mimeType || "application/octet-stream");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`);
  res.sendFile(filePath);
});

app.get("/api/admin/students", requireAuth, async (req, res) => {
  const { q = "", status = "", centre = "", course = "", counsellor = "", emiOnly = "" } = req.query;
  const filter = { ...dateFilter(req.query) };
  if (status) filter.status = status;
  if (centre) filter.centre = centre;
  if (course) filter.course = course;
  if (counsellor) filter.counsellor = counsellor;
  if (String(emiOnly) === "true") {
    filter.emiEnabled = true;
    filter.nextEmiDate = { $exists: true, $ne: null };
  }
  Object.assign(filter, await scopedDataFilter(req, req.query));
  if (isCounsellorAccount(req.user)) filter.counsellor = req.user.name;
  if (isTeacherAccount(req.user)) {
    const teacherScope = await teacherAcademicBatchScope(req.user);
    const teacherFilter = { $or: [{ teacher: req.user.name }, { batch: { $in: teacherScope.batchNames } }] };
    if (filter.$or) {
      filter.$and = [...(filter.$and || []), { $or: filter.$or }, teacherFilter];
      delete filter.$or;
    } else {
      filter.$and = [...(filter.$and || []), teacherFilter];
    }
  }
  if (q) {
    const searchFilter = [{ fullName: { $regex: q, $options: "i" } }, { phone: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }];
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { $or: searchFilter }];
      delete filter.$or;
    } else {
      filter.$or = searchFilter;
    }
  }
  const { page, limit, skip } = paginationFromQuery(req.query);
  const [total, students] = await Promise.all([
    Student.countDocuments(filter),
    Student.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit).lean(),
  ]);
  const internshipRows = await InternshipAssignment.find({ studentId: { $in: students.map((student) => student._id) } }).lean();
  const internshipByStudent = new Map(internshipRows.map((row) => [String(row.studentId), row]));
  const internshipLogs = internshipRows.length ? await InternshipLog.find({ assignmentId: { $in: internshipRows.map((row) => row._id) } }).sort({ date: -1 }).limit(300).lean() : [];
  const logbookEntries = internshipRows.length ? await LogbookEntry.find({ assignmentId: { $in: internshipRows.map((row) => row._id) } }).sort({ date: -1 }).limit(300).lean() : [];
  const logsByStudent = new Map();
  for (const log of internshipLogs) {
    const key = String(log.studentId);
    const existing = logsByStudent.get(key) || [];
    if (existing.length < 20) existing.push(log);
    logsByStudent.set(key, existing);
  }
  const logbookByStudent = new Map();
  for (const entry of logbookEntries) {
    const key = String(entry.studentId);
    const existing = logbookByStudent.get(key) || [];
    if (existing.length < 20) existing.push(entry);
    logbookByStudent.set(key, existing);
  }
  res.json({
    ok: true,
    data: students.map((student) => ({
      ...student,
      internshipAssignment: internshipByStudent.get(String(student._id)) || null,
      internshipLogs: logsByStudent.get(String(student._id)) || [],
      logbookEntries: logbookByStudent.get(String(student._id)) || [],
    })),
    meta: paginationMeta(total, page, limit),
  });
});

app.get("/api/admin/students/:id/internship-logs/:logId/:photoType", requireAuth, async (req, res) => {
  if (!["login", "logout"].includes(req.params.photoType)) return sendError(res, 400, "Invalid internship photo request");
  const student = await Student.findById(req.params.id).select("franchiseId centre teacher batch").lean();
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const log = await InternshipLog.findOne({ _id: req.params.logId, studentId: student._id }).lean();
  if (!log) return sendError(res, 404, "Internship log not found");
  const photo = req.params.photoType === "login" ? log.loginPhoto : log.logoutPhoto;
  if (!photo?.storedName) return sendError(res, 404, "Internship selfie not found");
  const filePath = path.join(leadDocumentDir, photo.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Internship selfie not found");
  const fileName = String(photo.originalName || `${req.params.photoType}-selfie.jpg`).replace(/[\r\n"]/g, "");
  res.setHeader("Content-Type", photo.mimeType || "image/jpeg");
  res.setHeader("Content-Disposition", `inline; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`);
  res.sendFile(filePath);
});

app.patch("/api/admin/students/:id/logbook/:entryId", requireAuth, async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const verified = req.body?.verified !== false;
  const entry = await LogbookEntry.findOneAndUpdate(
    { _id: req.params.entryId, studentId: student._id },
    { $set: { verified, verifiedBy: req.user.name, verifiedAt: verified ? new Date() : null, supervisorRemark: String(req.body?.supervisorRemark || "").trim() } },
    { new: true, runValidators: true },
  ).lean();
  if (!entry) return sendError(res, 404, "Logbook entry not found");
  res.json({ ok: true, data: entry });
});

app.get("/api/admin/attendance", requireAuth, async (req, res) => {
  const day = attendanceDate(req.query.date || "");
  if (!day) return sendError(res, 400, "Attendance date is required");
  const filter = { ...(await scopedDataFilter(req, req.query)), date: day };
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (isTeacherAccount(req.user)) filter.teacher = req.user.name;
  const attendance = await Attendance.find(filter).sort({ studentName: 1 }).lean();
  res.json({ ok: true, data: attendance });
});

app.get("/api/admin/attendance/logs", requireAuth, async (req, res) => {
  const filter = { ...(await scopedDataFilter(req, req.query)), ...attendanceRangeFilter(req.query) };
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.nature) filter.nature = String(req.query.nature);
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (req.query.studentId && mongoose.isValidObjectId(String(req.query.studentId))) filter.studentId = new mongoose.Types.ObjectId(String(req.query.studentId));
  if (req.query.student) filter.studentName = { $regex: String(req.query.student), $options: "i" };
  if (isTeacherAccount(req.user)) filter.teacher = req.user.name;
  const { page, limit, skip } = paginationFromQuery(req.query);
  const [total, attendance] = await Promise.all([
    Attendance.countDocuments(filter),
    Attendance.find(filter).sort({ date: -1, studentName: 1 }).skip(skip).limit(limit).lean(),
  ]);
  res.json({ ok: true, data: attendance, meta: paginationMeta(total, page, limit) });
});

app.get("/api/admin/attendance/summary", requireAuth, async (req, res) => {
  const filter = { ...(await scopedDataFilter(req, req.query)), ...attendanceRangeFilter(req.query) };
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.nature) filter.nature = String(req.query.nature);
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (req.query.student) filter.studentName = { $regex: String(req.query.student), $options: "i" };
  if (isTeacherAccount(req.user)) filter.teacher = req.user.name;
  const { page, limit, skip } = paginationFromQuery(req.query);
  const groupStage = {
    _id: "$studentId",
    studentName: { $first: "$studentName" },
    centre: { $first: "$centre" },
    course: { $first: "$course" },
    batch: { $first: "$batch" },
    counsellor: { $first: "$counsellor" },
    teacher: { $first: "$teacher" },
    total: { $sum: 1 },
    present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
    absent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
    late: { $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] } },
    leave: { $sum: { $cond: [{ $eq: ["$status", "Leave"] }, 1, 0] } },
    theoretical: { $sum: { $cond: [{ $eq: ["$nature", "Theoretical"] }, 1, 0] } },
    practical: { $sum: { $cond: [{ $eq: ["$nature", "Practical"] }, 1, 0] } },
    lastDate: { $max: "$date" },
  };
  const [countResult, summaries] = await Promise.all([
    Attendance.aggregate([{ $match: filter }, { $group: groupStage }, { $count: "total" }]),
    Attendance.aggregate([{ $match: filter }, { $group: groupStage }, { $sort: { studentName: 1 } }, { $skip: skip }, { $limit: limit }]),
  ]);
  const total = countResult[0]?.total || 0;
  res.json({ ok: true, data: summaries.map((item) => ({ ...item, studentId: item._id })), meta: paginationMeta(total, page, limit) });
});

app.get("/api/nps/dashboard", requireAuth, async (req, res) => {
  if (!(canManageNps(req.user) || isTeacherAccount(req.user))) return sendError(res, 403, "NPS dashboard is restricted");
  const filter = { active: true, ...(await npsScopedFilter(req, req.query)) };
  if (req.query.touchpoint) filter.touchpoint = String(req.query.touchpoint);
  if (req.query.course) filter.courseCode = normalizeCourseCode(req.query.course);
  if (req.query.batch) filter.batchName = String(req.query.batch);
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (req.query.dateFrom || req.query.dateTo) {
    const from = attendanceDate(req.query.dateFrom || "");
    const to = attendanceDate(req.query.dateTo || "");
    filter.submittedAt = {};
    if (from) filter.submittedAt.$gte = from;
    if (to) {
      const end = new Date(to);
      end.setUTCDate(end.getUTCDate() + 1);
      filter.submittedAt.$lt = end;
    }
  }
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: { ...computeNps([]), attributes: {}, touchpoints: [], batches: [], detractorAlerts: [] } });
    filter.$or = [{ batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
  }
  const rows = await NpsResponse.find(filter).sort({ submittedAt: -1 }).lean();
  const counts = computeNps(rows);
  const attributeFields = ["attrTeachingQuality", "attrContentRelevance", "attrPracticalTraining", "attrSupportInfra", "attrPlacementAssistance"];
  const attributes = Object.fromEntries(attributeFields.map((field) => {
    const values = rows.map((row) => Number(row[field] || 0)).filter(Boolean);
    return [field, values.length ? Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)) : 0];
  }));
  const grouped = (key) => Array.from(rows.reduce((map, row) => {
    const label = String(row[key] || "Unassigned");
    const list = map.get(label) || [];
    list.push(row);
    map.set(label, list);
    return map;
  }, new Map()).entries()).map(([label, items]) => ({ label, ...computeNps(items) }));
  const totalActiveStudents = await Student.countDocuments({ ...(await scopedDataFilter(req, req.query)), status: { $nin: ["Dropped"] } });
  const detractors = isTeacherAccount(req.user) ? [] : rows
    .filter((row) => row.npsCategory === "detractor" && row.followUpStatus !== "Resolved")
    .slice(0, 8);
  const responseRate = totalActiveStudents ? Math.round((counts.total / totalActiveStudents) * 100) : 0;
  const trend = Array.from(rows.reduce((map, row) => {
    const date = new Date(row.submittedAt || row.createdAt || Date.now()).toISOString().slice(0, 10);
    const list = map.get(date) || [];
    list.push(row);
    map.set(date, list);
    return map;
  }, new Map()).entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-14)
    .map(([date, items]) => ({ date, ...computeNps(items) }));
  const alerts = [];
  if (totalActiveStudents && responseRate < 50) alerts.push({ tone: "warn", label: "Low response rate", detail: `${responseRate}% response rate across ${totalActiveStudents} active candidates` });
  if (!isTeacherAccount(req.user) && detractors.length) alerts.push({ tone: "bad", label: "Detractor follow-up", detail: `${detractors.length} unresolved low-score responses need follow-up` });
  res.json({
    ok: true,
    data: {
      ...counts,
      responseRate,
      attributes,
      trend,
      alerts,
      touchpoints: grouped("touchpoint").map((item) => ({ ...item, label: npsTouchpointLabels[item.label] || item.label })),
      batches: grouped("batchName"),
      detractorAlerts: detractors,
    },
  });
});

app.get("/api/nps/responses", requireAuth, async (req, res) => {
  if (!canManageNps(req.user)) return sendError(res, 403, "NPS responses are restricted to admin accounts");
  const { page, limit, skip } = paginationFromQuery(req.query);
  const filter = { active: true, ...(await npsScopedFilter(req, req.query)) };
  if (req.query.touchpoint) filter.touchpoint = String(req.query.touchpoint);
  if (req.query.course) filter.courseCode = normalizeCourseCode(req.query.course);
  if (req.query.batch) filter.batchName = String(req.query.batch);
  if (req.query.category) filter.npsCategory = String(req.query.category);
  if (req.query.q) {
    const regex = new RegExp(escapeRegex(String(req.query.q)), "i");
    const students = await Student.find({ fullName: regex }).select("_id").lean();
    filter.$or = [{ openFeedback: regex }, { batchName: regex }, { studentId: { $in: students.map((student) => student._id) } }];
  }
  const [total, rows] = await Promise.all([
    NpsResponse.countDocuments(filter),
    NpsResponse.find(filter).populate("studentId", "fullName admissionNumber phone").sort({ submittedAt: -1 }).skip(skip).limit(limit).lean(),
  ]);
  res.json({ ok: true, data: rows, meta: paginationMeta(total, page, limit) });
});

app.patch("/api/nps/responses/:id/follow-up", requireAuth, async (req, res) => {
  if (!canManageNps(req.user)) return sendError(res, 403, "NPS follow-up is restricted to admin accounts");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid NPS response");
  const status = String(req.body?.status || "Pending").trim();
  const note = String(req.body?.note || "").trim();
  if (!["Pending", "In Progress", "Resolved"].includes(status)) return sendError(res, 400, "Choose a valid follow-up status");
  const row = await NpsResponse.findById(req.params.id).lean();
  if (!row) return sendError(res, 404, "NPS response not found");
  if (!(await canAccessRecord(req, row))) return sendError(res, 403, "You can access only permitted records");
  const update = { $set: { followUpStatus: status } };
  if (note) update.$push = { followUpNotes: { note, by: req.user.name || req.user.email || "Admin", at: new Date() } };
  const updated = await NpsResponse.findByIdAndUpdate(req.params.id, update, { returnDocument: "after" }).lean();
  res.json({ ok: true, data: updated });
});

app.get("/api/nps/export", requireAuth, async (req, res) => {
  if (!canManageNps(req.user)) return sendError(res, 403, "NPS export is restricted to admin accounts");
  const filter = { active: true, ...(await npsScopedFilter(req, req.query)) };
  if (req.query.touchpoint) filter.touchpoint = String(req.query.touchpoint);
  const rows = await NpsResponse.find(filter).populate("studentId", "fullName admissionNumber phone").sort({ submittedAt: -1 }).lean();
  const headers = ["Student", "Admission No", "Course", "Batch", "Centre", "Touchpoint", "Score", "Category", "Teaching", "Content", "Practical", "Support", "Placement", "Feedback", "Follow-up", "Submitted At"];
  const csv = [
    headers.join(","),
    ...rows.map((row) => [
      row.studentId?.fullName || "",
      row.studentId?.admissionNumber || "",
      row.courseCode || "",
      row.batchName || "",
      row.centre || "",
      npsTouchpointLabels[row.touchpoint] || row.touchpoint,
      row.npsScore,
      row.npsCategory,
      row.attrTeachingQuality || "",
      row.attrContentRelevance || "",
      row.attrPracticalTraining || "",
      row.attrSupportInfra || "",
      row.attrPlacementAssistance || "",
      row.openFeedback || "",
      row.followUpStatus || "",
      row.submittedAt ? new Date(row.submittedAt).toISOString() : "",
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")),
  ].join("\n");
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="imed-nps-${Date.now()}.csv"`);
  res.send(csv);
});

app.post("/api/admin/attendance", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Attendance is restricted to teacher and admin accounts");
  const day = attendanceDate(req.body?.date || "");
  const records = Array.isArray(req.body?.records) ? req.body.records : [];
  if (!day) return sendError(res, 400, "Attendance date is required");
  if (!records.length) return sendError(res, 400, "Select at least one student");
  const statuses = new Set(["Present", "Absent", "Late", "Leave"]);
  const studentIds = records.map((record) => String(record.studentId || "")).filter((id) => mongoose.isValidObjectId(id));
  const students = await Student.find({ _id: { $in: studentIds } }).lean();
  const studentsById = new Map(students.map((student) => [String(student._id), student]));
  const operations = [];

  for (const record of records) {
    const student = studentsById.get(String(record.studentId || ""));
    const status = String(record.status || "");
    if (!student || !statuses.has(status)) continue;
    if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
    if (isTeacherAccount(req.user)) {
      const studentBatch = await Batch.findOne({ active: true, name: student.batch }).lean();
      if (!(await teacherCanAccessBatch(req.user, studentBatch))) return sendError(res, 403, "Teachers can mark only assigned batch students");
    }
    operations.push({
      updateOne: {
        filter: { studentId: student._id, date: day },
        update: {
          $set: {
            studentId: student._id,
            studentName: student.fullName,
            date: day,
            status,
            note: String(record.note || ""),
            centre: student.centre || "",
            franchiseId: student.franchiseId,
            batch: student.batch || "",
            course: student.course || "",
            counsellor: student.counsellor || "",
            teacher: isTeacherAccount(req.user) ? req.user.name : (student.teacher || ""),
            markedBy: req.user.name,
          },
        },
        upsert: true,
      },
    });
  }

  if (!operations.length) return sendError(res, 400, "No valid attendance records");
  await Attendance.bulkWrite(operations);
  const saved = await Attendance.find({ studentId: { $in: studentIds }, date: day }).sort({ studentName: 1 }).lean();
  res.json({ ok: true, data: saved });
});

app.patch("/api/admin/students/:id", requireAuth, async (req, res) => {
  const allowedStudentUpdates = (({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, studentLocation, centre, course, counsellor, teacher, batch, batchCommenceDate, admissionNumber, admissionPaymentMode, admissionUpfrontAmount, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementStatus, placementCompany, placementRole, placementJoiningDate, placementSalary, placementHrContact, placementOfferLetterUrl, placementRemarks, testimonialText, testimonialVideoUrl, testimonialRating, testimonialApproved, referralName, referralPhone, referralStatus, certificateNumber, certificateIssuedAt, certificateStatus }) => ({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, studentLocation, centre, course, counsellor, teacher, batch, batchCommenceDate, admissionNumber, admissionPaymentMode, admissionUpfrontAmount, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementStatus, placementCompany, placementRole, placementJoiningDate, placementSalary, placementHrContact, placementOfferLetterUrl, placementRemarks, testimonialText, testimonialVideoUrl, testimonialRating, testimonialApproved, referralName, referralPhone, referralStatus, certificateNumber, certificateIssuedAt, certificateStatus }))(req.body || {});
  Object.keys(allowedStudentUpdates).forEach((key) => allowedStudentUpdates[key] === undefined && delete allowedStudentUpdates[key]);
  const feeFields = ["admissionPaymentMode", "admissionUpfrontAmount", "discountAmount", "totalFee", "paidAmount", "emiEnabled", "emiMonths", "emiAmount", "nextEmiDate"];
  if (!canManageFees(req.user) && feeFields.some((field) => Object.prototype.hasOwnProperty.call(allowedStudentUpdates, field))) {
    return sendError(res, 403, "Fee and payment updates are restricted to admin accounts");
  }
  const alumniFields = ["placementStatus", "placementCompany", "placementRole", "placementJoiningDate", "placementSalary", "placementHrContact", "placementOfferLetterUrl", "placementRemarks", "testimonialText", "testimonialVideoUrl", "testimonialRating", "testimonialApproved", "referralName", "referralPhone", "referralStatus"];
  if (!canManageAlumni(req.user) && alumniFields.some((field) => Object.prototype.hasOwnProperty.call(allowedStudentUpdates, field))) {
    return sendError(res, 403, "Alumni placement and referral updates are restricted to admin accounts");
  }
  if (!canAssignStaff(req.user)) delete allowedStudentUpdates.counsellor;
  if (!(canAssignStaff(req.user) || isCounsellorAccount(req.user))) delete allowedStudentUpdates.teacher;
  ["admissionUpfrontAmount", "discountAmount", "totalFee", "paidAmount", "emiMonths", "emiAmount", "placementSalary", "testimonialRating"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, field)) allowedStudentUpdates[field] = Number(allowedStudentUpdates[field] || 0);
  });
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "testimonialApproved")) {
    allowedStudentUpdates.testimonialApproved = allowedStudentUpdates.testimonialApproved === true || allowedStudentUpdates.testimonialApproved === "true";
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "emiEnabled")) {
    allowedStudentUpdates.emiEnabled = allowedStudentUpdates.emiEnabled === true || allowedStudentUpdates.emiEnabled === "true";
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionPaymentMode")) {
    allowedStudentUpdates.admissionPaymentMode = normalizeAdmissionPaymentMode(String(allowedStudentUpdates.admissionPaymentMode || ""));
    if (!admissionPaymentModes.includes(allowedStudentUpdates.admissionPaymentMode)) return sendError(res, 400, "Choose a valid admission payment plan");
  }
  ["nextEmiDate", "batchCommenceDate", "certificateIssuedAt", "placementJoiningDate"].forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, field) && !allowedStudentUpdates[field]) allowedStudentUpdates[field] = null;
  });
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "teacher") && allowedStudentUpdates.teacher) {
    const teacherFilter = { name: allowedStudentUpdates.teacher, role: { $in: ["teacher", "franchise_teacher"] } };
    if (existingStudent.franchiseId) teacherFilter.franchiseId = existingStudent.franchiseId;
    const teacher = await AdminUser.findOne(teacherFilter).select("_id").lean();
    if (!teacher) return sendError(res, 400, "Select a valid teacher for this branch or franchise");
  }
  if (isFranchiseUser(req.user)) delete allowedStudentUpdates.centre;
  if (allowedStudentUpdates.centre && !isFranchiseUser(req.user)) {
    const franchise = await resolveFranchiseFromRequest(req, allowedStudentUpdates.centre);
    if (franchise) {
      allowedStudentUpdates.centre = franchise.name;
      allowedStudentUpdates.franchiseId = franchise._id;
    }
  }
  const nextStudentCentre = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "centre") ? allowedStudentUpdates.centre : existingStudent.centre;
  const nextStudentCourse = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "course") ? allowedStudentUpdates.course : existingStudent.course;
  const nextStudentStatus = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") ? allowedStudentUpdates.status : existingStudent.status;
  const nextStudentBatch = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "batch") ? allowedStudentUpdates.batch : existingStudent.batch;
  if (!isCourseAllowedForCentre(nextStudentCentre, nextStudentCourse)) return sendError(res, 400, "Kochi centre allows only AHAP and GCA courses");
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && nextStudentStatus === "Active Student" && !nextStudentBatch) return sendError(res, 400, "Assign a batch before marking student as active");
  const nextTotalFee = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "totalFee") ? Number(allowedStudentUpdates.totalFee || 0) : Number(existingStudent.totalFee || 0);
  const nextDiscount = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "discountAmount") ? Number(allowedStudentUpdates.discountAmount || 0) : Number(existingStudent.discountAmount || 0);
  const nextPaid = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "paidAmount") ? Number(allowedStudentUpdates.paidAmount || 0) : Number(existingStudent.paidAmount || 0);
  const nextAdmissionPaymentMode = normalizeAdmissionPaymentMode(Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionPaymentMode") ? allowedStudentUpdates.admissionPaymentMode : existingStudent.admissionPaymentMode);
  const nextNetFee = Math.max(0, nextTotalFee - nextDiscount);
  const nextAdmissionUpfront = Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionUpfrontAmount") ? Number(allowedStudentUpdates.admissionUpfrontAmount || 0) : Number(existingStudent.admissionUpfrontAmount || 0);
  const nextDue = Math.max(0, nextNetFee - nextPaid);
  const isPartialEmiPlan = isPartialEmiPaymentMode(nextAdmissionPaymentMode);
  const isEmiAdmissionPlan = nextAdmissionPaymentMode === "EMI" || isPartialEmiPlan;
  const nextEmiBalance = isPartialEmiPlan ? Math.max(0, nextNetFee - Math.max(nextPaid, nextAdmissionUpfront)) : nextDue;
  const currentNormalizedStatus = normalizeStudentStatus(existingStudent.status);
  const nextNormalizedStatus = normalizeStudentStatus(nextStudentStatus);
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && nextNormalizedStatus === "Fees Collected" && nextDue > 0) {
    return sendError(res, 400, "Collect the full pending fee before marking Fees Collected");
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && nextNormalizedStatus === "Classroom Complete" && currentNormalizedStatus !== "Classroom Complete" && !isStudentStatusAtLeast(currentNormalizedStatus, "Active Student")) {
    return sendError(res, 400, "Move the candidate to Active Student before marking Classroom Complete");
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && nextNormalizedStatus === "Course Completed" && currentNormalizedStatus !== "Course Completed") {
    if (!isStudentStatusAtLeast(currentNormalizedStatus, "Classroom Complete")) return sendError(res, 400, "Mark Classroom Complete before Course Completed");
    const nps = await npsEligibilityForStudent(existingStudent);
    const postClassroom = nps.items.find((item) => item.touchpoint === "post_classroom");
    const postInternship = nps.items.find((item) => item.touchpoint === "post_internship");
    if (postClassroom?.eligible && !postClassroom.submitted) return sendError(res, 400, "Student must submit classroom completion NPS before Course Completed");
    if (postInternship?.eligible && !postInternship.submitted) return sendError(res, 400, "Student must submit internship completion NPS before Course Completed");
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && nextNormalizedStatus === "Alumni" && currentNormalizedStatus !== "Alumni") {
    if (currentNormalizedStatus !== "Course Completed") return sendError(res, 400, "Mark Course Completed before moving the candidate to Alumni");
    if (nextDue > 0) return sendError(res, 400, "Clear full fee before moving the candidate to Alumni");
    if (!existingStudent.certificateNumber && existingStudent.certificateStatus !== "Issued") return sendError(res, 400, "Issue the certificate before moving the candidate to Alumni");
  }
  if (nextDiscount > nextTotalFee) return sendError(res, 400, "Discount cannot exceed final fee");
  if (nextPaid > nextNetFee) return sendError(res, 400, "Paid amount cannot exceed net course fee");
  if (isPartialEmiPlan) {
    if (nextAdmissionUpfront <= 0) return sendError(res, 400, "Partial amount is required");
    if (nextAdmissionUpfront >= nextNetFee) return sendError(res, 400, "Partial amount must be less than final payable fee");
  } else if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionPaymentMode")) {
    allowedStudentUpdates.admissionUpfrontAmount = 0;
  }
  if (allowedStudentUpdates.emiEnabled && !nextAdmissionPaymentMode) return sendError(res, 400, "Complete admission before enabling EMI");
  if (allowedStudentUpdates.emiEnabled && !isEmiAdmissionPlan) return sendError(res, 400, "Choose EMI or Partial + EMI admission plan before enabling EMI");
  if (allowedStudentUpdates.emiEnabled && nextDue <= 0) return sendError(res, 400, "Cannot enable EMI when fee is fully paid");
  if (isEmiAdmissionPlan && Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionPaymentMode")) {
    if (!allowedStudentUpdates.emiEnabled) return sendError(res, 400, "Enable EMI for EMI admission plan");
    if (Number(allowedStudentUpdates.emiMonths || 0) < 2 || Number(allowedStudentUpdates.emiMonths || 0) > 12) return sendError(res, 400, "EMI months must be between 2 and 12");
    if (Number(allowedStudentUpdates.emiAmount || 0) <= 0) return sendError(res, 400, "Monthly EMI amount is required");
    if (!allowedStudentUpdates.nextEmiDate) return sendError(res, 400, "Next EMI date is required");
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "emiAmount") && Number(allowedStudentUpdates.emiAmount || 0) > nextEmiBalance && nextEmiBalance > 0) {
    return sendError(res, 400, `Monthly EMI cannot exceed EMI balance of ${nextEmiBalance}`);
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "admissionPaymentMode")) {
    allowedStudentUpdates.admissionFinalizedAt = new Date();
    allowedStudentUpdates.admissionFinalizedBy = req.user.name || req.user.email || "Admin";
  }
  const student = await Student.findByIdAndUpdate(req.params.id, { $set: allowedStudentUpdates }, { new: true, runValidators: true });
  if (!student) return sendError(res, 404, "Student not found");
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "teacher")) {
    await Attendance.updateMany({ studentId: student._id }, { $set: { teacher: student.teacher || "" } });
  }
  if (Object.prototype.hasOwnProperty.call(allowedStudentUpdates, "status") && student.leadId && ["Enrolled", "Alumni"].includes(student.status)) {
    await Lead.findByIdAndUpdate(student.leadId, { $set: { stage: student.status }, $push: { activities: { type: "stage", message: `Student status synced to ${student.status}`, by: req.user.name } } });
  }
  res.json({ ok: true, data: await studentAdminWithInternshipResponse(student) });
});

app.post("/api/admin/students/:id/lms-access", requireAuth, async (req, res) => {
  if (!canManageStudentLmsAccess(req.user)) return sendError(res, 403, "Student LMS access can be generated only by admin accounts");
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const blocked = studentLmsAccessBlockReason(existingStudent);
  if (blocked) return sendError(res, 400, blocked);
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        lmsAccessEnabled: true,
        lmsAccessGeneratedAt: new Date(),
        lmsAccessGeneratedBy: req.user.name || req.user.email || "Admin",
      },
      $push: {
        activities: {
          type: "lms",
          message: "Student LMS login generated",
          by: req.user.name || req.user.email || "Admin",
        },
      },
    },
    { new: true, runValidators: true }
  );
  res.json({ ok: true, data: await studentAdminWithInternshipResponse(student) });
});

app.put("/api/admin/students/:id/internship", requireAuth, async (req, res) => {
  if (!canManageInternships(req.user)) return sendError(res, 403, "Internship assignment is restricted to admin accounts");
  const student = await Student.findById(req.params.id).lean();
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const facilityName = String(req.body?.facilityName || "").trim();
  const facilityLocation = String(req.body?.facilityLocation || "").trim();
  const supervisorName = String(req.body?.supervisorName || "").trim();
  const supervisorContact = String(req.body?.supervisorContact || "").trim();
  const supervisorEmail = String(req.body?.supervisorEmail || "").trim().toLowerCase();
  const facilityLatitude = req.body?.facilityLatitude === "" || req.body?.facilityLatitude === undefined ? undefined : Number(req.body.facilityLatitude);
  const facilityLongitude = req.body?.facilityLongitude === "" || req.body?.facilityLongitude === undefined ? undefined : Number(req.body.facilityLongitude);
  const radiusInput = Number(req.body?.allowedRadiusMeters || 200);
  const allowedRadiusMeters = Number.isFinite(radiusInput) ? Math.max(25, radiusInput) : 200;
  const startDate = attendanceDate(req.body?.startDate || "");
  const durationValue = Math.max(1, Number(req.body?.durationValue || 3));
  const durationUnit = String(req.body?.durationUnit || "months").trim();
  const expectedEndDate = attendanceDate(req.body?.expectedEndDate || "") || (startDate ? internshipExpectedEndDate(startDate, durationValue, durationUnit) : null);
  const status = String(req.body?.status || "Assigned").trim();
  if (!facilityName) return sendError(res, 400, "Hospital/facility name is required");
  if (supervisorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supervisorEmail)) return sendError(res, 400, "Enter a valid supervisor email");
  if (facilityLatitude !== undefined && (!Number.isFinite(facilityLatitude) || facilityLatitude < -90 || facilityLatitude > 90)) return sendError(res, 400, "Enter a valid hospital latitude");
  if (facilityLongitude !== undefined && (!Number.isFinite(facilityLongitude) || facilityLongitude < -180 || facilityLongitude > 180)) return sendError(res, 400, "Enter a valid hospital longitude");
  if ((facilityLatitude === undefined) !== (facilityLongitude === undefined)) return sendError(res, 400, "Enter both hospital latitude and longitude");
  if (!startDate) return sendError(res, 400, "Start date is required");
  if (!expectedEndDate) return sendError(res, 400, "Expected end date is required");
  if (!["days", "weeks", "months"].includes(durationUnit)) return sendError(res, 400, "Choose a valid duration unit");
  if (!["Assigned", "Active", "Completed", "Terminated"].includes(status)) return sendError(res, 400, "Choose a valid internship status");
  if (expectedEndDate < startDate) return sendError(res, 400, "Expected end date cannot be before start date");
  if (["Assigned", "Active"].includes(status)) {
    if (!isStudentStatusAtLeast(student.status, "Classroom Complete")) return sendError(res, 400, "Mark Classroom Complete before assigning internship");
    const nps = await npsEligibilityForStudent(student);
    const postClassroom = nps.items.find((item) => item.touchpoint === "post_classroom");
    if (postClassroom?.eligible && !postClassroom.submitted) return sendError(res, 400, "Student must submit classroom completion NPS before internship starts");
  }
  const internshipSet = {
    studentId: student._id,
    facilityName,
    facilityLocation,
    supervisorName,
    supervisorContact,
    supervisorEmail,
    facilityLatitude,
    facilityLongitude,
    allowedRadiusMeters,
    startDate,
    durationValue,
    durationUnit,
    expectedEndDate,
    status,
    departmentRotation: String(req.body?.departmentRotation || "").trim(),
    assignedBy: req.user.name || req.user.email || "Admin",
  };
  if (status === "Completed") internshipSet.actualEndDate = attendanceDate(req.body?.actualEndDate || "") || new Date();
  const assignment = await InternshipAssignment.findOneAndUpdate(
    { studentId: student._id },
    status === "Completed" ? { $set: internshipSet } : { $set: internshipSet, $unset: { actualEndDate: "" } },
    { returnDocument: "after", upsert: true, runValidators: true },
  );
  res.json({ ok: true, data: { ...(await studentAdminWithInternshipResponse(student)), internshipAssignment: assignment } });
});

app.delete("/api/admin/students/:id/internship", requireAuth, async (req, res) => {
  if (!canManageInternships(req.user)) return sendError(res, 403, "Internship assignment is restricted to admin accounts");
  const student = await Student.findById(req.params.id).lean();
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const assignment = await InternshipAssignment.findOne({ studentId: student._id }).lean();
  if (assignment) {
    await Promise.all([
      InternshipAssignment.deleteOne({ _id: assignment._id }),
      InternshipLog.deleteMany({ assignmentId: assignment._id }),
      LogbookEntry.deleteMany({ assignmentId: assignment._id }),
    ]);
  }
  res.json({ ok: true, data: await studentAdminWithInternshipResponse(student) });
});

app.delete("/api/admin/students/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  await Promise.all([
    Student.findByIdAndDelete(req.params.id),
    Attendance.deleteMany({ studentId: existingStudent._id }),
  ]);
  res.json({ ok: true, data: existingStudent });
});

app.post("/api/admin/students/:id/certificate", requireAuth, async (req, res) => {
  if (!canManageCertificates(req.user)) return sendError(res, 403, "Certificate issuing is restricted to admin accounts");
  const student = await Student.findById(req.params.id);
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  if (!["Course Completed", "Alumni", "Placed"].includes(student.status)) return sendError(res, 400, "Mark course as completed before issuing certificate");
  const nps = await npsEligibilityForStudent(student);
  const postInternship = nps.items.find((item) => item.touchpoint === "post_internship");
  if (postInternship?.eligible && !postInternship.submitted) return sendError(res, 400, "Student must submit internship completion NPS before certificate generation");

  if (!student.certificateNumber) {
    const certificateYear = new Date().getFullYear();
    const certificatePrefix = `IMED-CERT-${certificateYear}-`;
    const certificateSeq = await nextCounterValue(`certificate:${certificateYear}`, await maxStudentNumberSuffix("certificateNumber", certificatePrefix));
    student.certificateNumber = `${certificatePrefix}${String(certificateSeq).padStart(4, "0")}`;
  }
  student.certificateIssuedAt = student.certificateIssuedAt || new Date();
  student.certificateStatus = "Issued";
  student.activities.push({ type: "certificate", message: `Certificate issued: ${student.certificateNumber}`, by: req.user.name });
  await student.save();

  res.json({ ok: true, data: student });
});

app.post("/api/admin/students/:id/payments", requireAuth, leadDocumentUpload.single("paymentProof"), async (req, res) => {
  if (!canManageFees(req.user)) return sendError(res, 403, "Fee and payment updates are restricted to admin accounts");
  const amount = Number(req.body?.amount || 0);
  const mode = String(req.body?.mode || "Cash").trim();
  const paymentPurpose = normalizePaymentPurpose(String(req.body?.paymentPurpose || "Fees Installment").trim(), mode);
  let transactionId = String(req.body?.transactionId || "").trim();
  let emiReference = String(req.body?.emiReference || "").trim();
  const loanProviderName = String(req.body?.loanProviderName || "").trim();
  const note = String(req.body?.note || "").trim();
  if (!Number.isFinite(amount) || amount <= 0) return sendError(res, 400, "Enter a valid payment amount");
  if (!paymentPurposes.includes(paymentPurpose)) return sendError(res, 400, "Choose what this payment is for");
  if (!paymentModes.includes(mode)) return sendError(res, 400, "Choose a valid payment mode");
  if (loanProviderName.length > 100) return sendError(res, 400, "Loan provider name cannot exceed 100 characters");
  if (transactionId.length > paymentReferenceMaxLength) return sendError(res, 400, "Payment reference cannot exceed 80 characters");
  if (transactionId && !/^[A-Za-z0-9][A-Za-z0-9 ._/@:-]*$/.test(transactionId)) return sendError(res, 400, "Payment reference has invalid characters");
  if (note.length > paymentNoteMaxLength) return sendError(res, 400, "Payment note cannot exceed 250 characters");
  if (mode === "Loan Provider" && !loanProviderName) return sendError(res, 400, "Loan provider name is required");
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const finalPayable = Math.max(0, Number(existingStudent.totalFee || 0) - Number(existingStudent.discountAmount || 0));
  const paymentAllowedStatuses = ["Fees Decided", "Fees Collected", "Active Student", "Course Completed", "Alumni"];
  if (!paymentAllowedStatuses.includes(normalizeStudentStatus(existingStudent.status))) return sendError(res, 400, "Decide fees before recording payment");
  if (!existingStudent.admissionPaymentMode || finalPayable <= 0) return sendError(res, 400, "Complete admission and final fee before recording payment");
  const pendingDue = Math.max(0, finalPayable - Number(existingStudent.paidAmount || 0));
  if (pendingDue <= 0) return sendError(res, 400, "Course fee is already fully paid");
  if (amount > pendingDue) return sendError(res, 400, `Payment cannot exceed pending due of ${pendingDue}`);
  if (paymentPurpose === "Fees Installment" && existingStudent.emiEnabled && !emiReference) {
    const base = String(existingStudent.admissionNumber || existingStudent._id.toString().slice(-6).toUpperCase()).replace(/[^A-Z0-9-]+/gi, "").toUpperCase() || "STUDENT";
    const nextInstallment = (existingStudent.payments || []).filter((payment) => normalizePaymentPurpose(payment.paymentPurpose, payment.mode) === "Fees Installment" && (payment.emiReference || payment.mode === "EMI")).length + 1;
    emiReference = `EMI-${base}-${String(nextInstallment).padStart(3, "0")}`;
  }
  if (mode !== "Cash" && !transactionId) return sendError(res, 400, "Transaction/reference number is required for non-cash payments");
  const proof = saveLeadDocument(req.file);
  if (mode !== "Cash" && !proof?.storedName) return sendError(res, 400, "Payment proof is required for non-cash payments");
  const remainingAfterPayment = pendingDue - amount;
  const paymentUpdate = {
    $inc: { paidAmount: amount },
    $push: {
      payments: { amount, paymentPurpose, mode, transactionId, emiReference, loanProviderName, note, proof, by: req.user.name },
      activities: { type: "payment", message: `${paymentPurpose} received: ${amount}${proof ? " with proof" : ""}`, by: req.user.name },
    },
  };
  if (paymentPurpose === "Fees Installment" && existingStudent.emiEnabled) {
    const setAfterPayment = remainingAfterPayment <= 0
      ? { emiEnabled: false, nextEmiDate: null }
      : { nextEmiDate: (() => { const date = existingStudent.nextEmiDate ? new Date(existingStudent.nextEmiDate) : new Date(); date.setMonth(date.getMonth() + 1); return date; })() };
    paymentUpdate.$set = setAfterPayment;
  }
  if (remainingAfterPayment <= 0 && normalizeStudentStatus(existingStudent.status) === "Fees Decided") {
    paymentUpdate.$set = { ...(paymentUpdate.$set || {}), status: "Fees Collected" };
    paymentUpdate.$push.activities.message = `${paymentPurpose} received: ${amount}${proof ? " with proof" : ""}. Status moved to Fees Collected`;
  }
  const student = await Student.findOneAndUpdate(
    {
      _id: req.params.id,
      $expr: {
        $gte: [
          { $subtract: [{ $subtract: ["$totalFee", { $ifNull: ["$discountAmount", 0] }] }, "$paidAmount"] },
          amount,
        ],
      },
    },
    paymentUpdate,
    { new: true, runValidators: true },
  );
  if (!student) return sendError(res, 400, "Payment cannot exceed current pending due");
  res.json({ ok: true, data: await studentAdminWithInternshipResponse(student) });
});

app.get("/api/admin/students/:id/payments/:index/proof", requireAuth, async (req, res) => {
  const existingStudent = await Student.findById(req.params.id).select("payments franchiseId").lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const index = Number(req.params.index);
  if (!Number.isInteger(index) || index < 0) return sendError(res, 400, "Invalid payment proof request");
  const proof = existingStudent.payments?.[index]?.proof;
  if (!proof?.storedName) return sendError(res, 404, "Payment proof not found");
  const filePath = path.join(leadDocumentDir, proof.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Payment proof not found");
  res.setHeader("Content-Type", proof.mimeType || "application/octet-stream");
  res.download(filePath, proof.originalName || "payment-proof");
});

app.post("/api/admin/students/:id/payments/:index/cash-deposits", requireAuth, leadDocumentUpload.single("depositProof"), async (req, res) => {
  if (!canManageFees(req.user)) return sendError(res, 403, "Cash deposit updates are restricted to admin accounts");
  const paymentIndex = Number(req.params.index);
  const amount = Number(req.body?.amount || 0);
  const bank = String(req.body?.bank || "").trim();
  const referenceNumber = String(req.body?.referenceNumber || "").trim();
  const depositedBy = String(req.body?.depositedBy || req.user.name || "").trim();
  const note = String(req.body?.note || "").trim();
  const depositedAt = req.body?.depositedAt ? new Date(req.body.depositedAt) : new Date();
  if (!Number.isInteger(paymentIndex) || paymentIndex < 0) return sendError(res, 400, "Invalid payment selected");
  if (!Number.isFinite(amount) || amount <= 0) return sendError(res, 400, "Enter a valid deposit amount");
  if (!bank) return sendError(res, 400, "Deposit bank/account is required");
  if (bank.length > 100) return sendError(res, 400, "Deposit bank/account cannot exceed 100 characters");
  if (!referenceNumber) return sendError(res, 400, "Deposit reference/slip number is required");
  if (referenceNumber.length > paymentReferenceMaxLength) return sendError(res, 400, "Deposit reference cannot exceed 80 characters");
  if (!/^[A-Za-z0-9][A-Za-z0-9 ._/@:-]*$/.test(referenceNumber)) return sendError(res, 400, "Deposit reference has invalid characters");
  if (!depositedBy) return sendError(res, 400, "Deposited by name is required");
  if (depositedBy.length > 80) return sendError(res, 400, "Deposited by name cannot exceed 80 characters");
  if (note.length > paymentNoteMaxLength) return sendError(res, 400, "Deposit note cannot exceed 250 characters");
  if (Number.isNaN(depositedAt.getTime())) return sendError(res, 400, "Choose a valid deposit date");
  if (!req.file) return sendError(res, 400, "Deposit proof is required");

  const student = await Student.findById(req.params.id);
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  const payment = student.payments?.[paymentIndex];
  if (!payment) return sendError(res, 404, "Payment not found");
  if ((payment.mode || "Cash") !== "Cash") return sendError(res, 400, "Only cash payments can be deposited");
  const deposited = (payment.cashDeposits || []).reduce((sum, deposit) => sum + Number(deposit.amount || 0), 0);
  const pendingDeposit = Math.max(0, Number(payment.amount || 0) - deposited);
  if (pendingDeposit <= 0) return sendError(res, 400, "This cash payment is already fully deposited");
  if (amount > pendingDeposit) return sendError(res, 400, `Deposit cannot exceed pending cash of ${pendingDeposit}`);

  const proof = saveLeadDocument(req.file);
  const updatedStudent = await Student.findOneAndUpdate(
    {
      _id: req.params.id,
      [`payments.${paymentIndex}`]: { $exists: true },
      $or: [
        { [`payments.${paymentIndex}.mode`]: "Cash" },
        { [`payments.${paymentIndex}.mode`]: { $exists: false } },
      ],
      $expr: {
        $gte: [
          {
            $subtract: [
              { $ifNull: [{ $arrayElemAt: ["$payments.amount", paymentIndex] }, 0] },
              {
                $sum: {
                  $map: {
                    input: { $ifNull: [{ $arrayElemAt: ["$payments.cashDeposits", paymentIndex] }, []] },
                    as: "deposit",
                    in: { $ifNull: ["$$deposit.amount", 0] },
                  },
                },
              },
            ],
          },
          amount,
        ],
      },
    },
    {
      $push: {
        [`payments.${paymentIndex}.cashDeposits`]: { amount, bank, referenceNumber, note, proof, depositedBy, by: req.user.name, depositedAt },
        activities: { type: "payment", message: `Cash deposited: ${amount} by ${depositedBy} against payment #${paymentIndex + 1}${proof ? " with proof" : ""}`, by: req.user.name },
      },
    },
    { new: true, runValidators: true },
  );
  if (!updatedStudent) return sendError(res, 400, "Deposit cannot exceed current pending cash");
  res.json({ ok: true, data: updatedStudent });
});

app.get("/api/admin/students/:id/payments/:paymentIndex/cash-deposits/:depositIndex/proof", requireAuth, async (req, res) => {
  const existingStudent = await Student.findById(req.params.id).select("payments franchiseId").lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const paymentIndex = Number(req.params.paymentIndex);
  const depositIndex = Number(req.params.depositIndex);
  if (!Number.isInteger(paymentIndex) || paymentIndex < 0 || !Number.isInteger(depositIndex) || depositIndex < 0) return sendError(res, 400, "Invalid deposit proof request");
  const proof = existingStudent.payments?.[paymentIndex]?.cashDeposits?.[depositIndex]?.proof;
  if (!proof?.storedName) return sendError(res, 404, "Deposit proof not found");
  const filePath = path.join(leadDocumentDir, proof.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Deposit proof not found");
  res.setHeader("Content-Type", proof.mimeType || "application/octet-stream");
  res.download(filePath, proof.originalName || "cash-deposit-proof");
});

app.post("/api/admin/students/:id/feedback", requireAuth, async (req, res) => {
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const note = String(req.body?.note || "").trim();
  if (!note) return sendError(res, 400, "Conversation note is required");
  const feedback = {
    type: req.body?.type || "General follow-up",
    status: req.body?.status || "Needs follow-up",
    note,
    nextFollowUpDate: req.body?.nextFollowUpDate || undefined,
    by: req.user.name,
  };
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { $push: { feedbacks: { $each: [feedback], $position: 0 }, activities: { type: "feedback", message: `${feedback.status}: ${note}`, by: req.user.name } } },
    { new: true, runValidators: true },
  );
  if (!student) return sendError(res, 404, "Student not found");
  res.json({ ok: true, data: student });
});

app.get("/api/admin/centres", requireAuth, async (req, res) => {
  const branchScope = isHeadBranchScoped(req.user) ? await headOfficeBranchScope(req.user) : null;
  const filter = isFranchiseUser(req.user)
    ? { active: true, _id: req.user.franchiseId || emptyObjectId }
    : isHeadBranchScoped(req.user)
      ? { active: true, type: "branch", _id: { $in: branchScope.ids } }
      : { active: true };
  const centres = await Centre.find(filter).sort({ name: 1 }).lean();
  res.json({ ok: true, data: centres });
});

app.post("/api/admin/centres", requireAuth, requireHeadAdmin, async (req, res) => {
  const name = String(req.body?.name || "").trim();
  if (!name) return sendError(res, 400, "Centre name is required");
  const type = isHeadBranchAdmin(req.user) ? "branch" : req.body?.type === "branch" ? "branch" : "franchise";
  const existing = await Centre.findOne({ name }).lean();
  if (existing) return sendError(res, 409, "Branch or franchise already exists with this name");
  try {
    const centre = await Centre.create({ ...req.body, name, type });
    res.status(201).json({ ok: true, data: centre });
  } catch (error) {
    if (error?.code === 11000) return sendError(res, 409, "Branch or franchise already exists with this name");
    throw error;
  }
});

app.patch("/api/admin/centres/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid centre");
  if (isFranchiseSuperAdmin(req.user) && String(req.params.id) !== String(req.user.franchiseId || "")) return sendError(res, 403, "You can update only your franchise billing details");
  const existingCentre = await Centre.findById(req.params.id).lean();
  if (!existingCentre) return sendError(res, 404, "Centre not found");
  const allowedCentreUpdates = (({ name, type, city, manager, billingLegalName, billingAddress, billingGstin, billingStateName, billingStateCode, billingEmail, billingPhone, bankAccountName, bankName, bankAccountNumber, bankIfsc, bankBranch }) => ({ name, type, city, manager, billingLegalName, billingAddress, billingGstin, billingStateName, billingStateCode, billingEmail, billingPhone, bankAccountName, bankName, bankAccountNumber, bankIfsc, bankBranch }))(req.body || {});
  Object.keys(allowedCentreUpdates).forEach((key) => allowedCentreUpdates[key] === undefined && delete allowedCentreUpdates[key]);
  if (!isHeadAdmin(req.user)) delete allowedCentreUpdates.name;
  if (allowedCentreUpdates.name !== undefined) {
    allowedCentreUpdates.name = String(allowedCentreUpdates.name || "").trim();
    if (!allowedCentreUpdates.name) return sendError(res, 400, "Centre name is required");
    const duplicate = await Centre.findOne({ _id: { $ne: req.params.id }, name: allowedCentreUpdates.name }).lean();
    if (duplicate) return sendError(res, 409, "Branch or franchise already exists with this name");
  }
  if (isHeadBranchAdmin(req.user) || isFranchiseSuperAdmin(req.user)) delete allowedCentreUpdates.type;
  if (allowedCentreUpdates.type && !["branch", "franchise"].includes(allowedCentreUpdates.type)) delete allowedCentreUpdates.type;
  const centre = await Centre.findByIdAndUpdate(req.params.id, { $set: allowedCentreUpdates }, { new: true, runValidators: true });
  if (!centre) return sendError(res, 404, "Centre not found");
  if (allowedCentreUpdates.name && allowedCentreUpdates.name !== existingCentre.name) {
    await Promise.all([
      Lead.updateMany({ franchiseId: centre._id }, { $set: { centre: centre.name } }),
      Student.updateMany({ franchiseId: centre._id }, { $set: { centre: centre.name } }),
      Batch.updateMany({ franchiseId: centre._id }, { $set: { centre: centre.name } }),
      Attendance.updateMany({ franchiseId: centre._id }, { $set: { centre: centre.name } }),
    ]);
  }
  res.json({ ok: true, data: centre });
});

app.get("/api/admin/courses", requireAuth, async (req, res) => {
  const branchScope = isHeadBranchScoped(req.user) ? await headOfficeBranchScope(req.user) : null;
  const filter = isFranchiseUser(req.user)
    ? { active: true, $or: [{ franchiseId: req.user.franchiseId || emptyObjectId }, { franchiseId: { $exists: false } }, { franchiseId: null }] }
    : isHeadBranchScoped(req.user)
      ? { active: true, $or: [{ franchiseId: { $in: branchScope.ids } }, { franchiseId: { $exists: false } }, { franchiseId: null }] }
      : { active: true };
  const courses = await Course.find(filter).sort({ franchiseId: -1, name: 1 }).lean();
  res.json({ ok: true, data: courses });
});

app.post("/api/admin/courses", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Course name is required");
  const course = await Course.create({
    ...req.body,
    fee: Number(req.body.fee || 0),
    franchiseId: isFranchiseUser(req.user) || isHeadBranchAdmin(req.user) ? req.user.franchiseId : req.body.franchiseId || undefined,
  });
  res.status(201).json({ ok: true, data: course });
});

app.patch("/api/admin/courses/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid course");
  const existingCourse = await Course.findById(req.params.id).lean();
  if (!existingCourse) return sendError(res, 404, "Course not found");
  if (isFranchiseUser(req.user) && existingCourse.franchiseId && String(existingCourse.franchiseId) !== String(req.user.franchiseId)) return sendError(res, 403, "You can update only your franchise course fees");
  const updates = (({ name, code, fee, duration, franchiseId }) => ({ name, code, fee, duration, franchiseId }))(req.body || {});
  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);
  if (updates.name !== undefined) updates.name = String(updates.name || "").trim();
  if (updates.code !== undefined) updates.code = String(updates.code || "").trim();
  if (updates.duration !== undefined) updates.duration = String(updates.duration || "").trim();
  if (updates.fee !== undefined) updates.fee = Number(updates.fee || 0);
  if (updates.fee < 0) return sendError(res, 400, "Course fee cannot be negative");
  if (updates.name !== undefined && !updates.name) return sendError(res, 400, "Course name is required");
  if (isFranchiseUser(req.user) || isHeadBranchAdmin(req.user)) delete updates.franchiseId;
  if (updates.franchiseId === "") delete updates.franchiseId;
  if (isFranchiseUser(req.user) && !existingCourse.franchiseId) {
    const override = await Course.findOneAndUpdate(
      { code: existingCourse.code, name: existingCourse.name, franchiseId: req.user.franchiseId },
      { $set: { ...updates, name: existingCourse.name, code: existingCourse.code, duration: updates.duration || existingCourse.duration, active: true } },
      { new: true, upsert: true, runValidators: true },
    );
    return res.json({ ok: true, data: override });
  }
  const course = await Course.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
  res.json({ ok: true, data: course });
});

app.delete("/api/admin/courses/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid course");
  const existingCourse = await Course.findById(req.params.id).lean();
  if (!existingCourse) return sendError(res, 404, "Course not found");
  if (isFranchiseUser(req.user) && String(existingCourse.franchiseId || "") !== String(req.user.franchiseId || "")) return sendError(res, 403, "You can delete only your franchise courses");
  const course = await Course.findByIdAndUpdate(req.params.id, { $set: { active: false } }, { new: true });
  res.json({ ok: true, data: course });
});

app.get("/api/admin/batches", requireAuth, async (req, res) => {
  const branchScope = isHeadBranchScoped(req.user) ? await headOfficeBranchScope(req.user) : null;
  const filter = isFranchiseUser(req.user)
    ? { active: true, franchiseId: req.user.franchiseId || emptyObjectId }
    : isHeadBranchScoped(req.user)
      ? { active: true, $or: [{ franchiseId: { $in: branchScope.ids } }, { centre: { $in: branchScope.names } }] }
      : { active: true };
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    filter.$and = [{ $or: [{ _id: { $in: scope.batchIds } }, { name: { $in: scope.batchNames } }] }];
  }
  const batches = await Batch.find(filter).sort({ commenceDate: -1, name: 1 }).lean();
  res.json({ ok: true, data: batches });
});

app.post("/api/admin/batches", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Batch name is required");
  if (!req.body?.commenceDate) return sendError(res, 400, "Batch commence date is required");
  const franchise = await resolveFranchiseFromRequest(req, req.body.centre || "");
  if (isFranchiseUser(req.user) && !franchise) return sendError(res, 403, "Franchise account is not assigned");
  const centreName = franchise?.name || req.body.centre || "";
  if (!isCourseAllowedForCentre(centreName, req.body.course || "")) return sendError(res, 400, "Kochi centre allows only AHAP and GCA courses");
  const assignedFaculty = Array.isArray(req.body?.assignedFaculty)
    ? req.body.assignedFaculty
    : String(req.body?.assignedFaculty || "").split(",");
  const cleanFaculty = [...new Set(assignedFaculty.map((name) => String(name || "").trim()).filter(Boolean))];
  const batch = await Batch.create({
    name: req.body.name,
    centre: centreName,
    franchiseId: franchise?._id,
    course: req.body.course || "",
    assignedFaculty: cleanFaculty,
    commenceDate: req.body.commenceDate,
  });
  res.status(201).json({ ok: true, data: batch });
});

app.patch("/api/admin/batches/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid batch");
  const existingBatch = await Batch.findById(req.params.id).lean();
  if (!existingBatch) return sendError(res, 404, "Batch not found");
  if (isFranchiseUser(req.user) && String(existingBatch.franchiseId || "") !== String(req.user.franchiseId || "")) return sendError(res, 403, "You can update only your franchise batches");
  const updates = (({ name, centre, course, commenceDate, assignedFaculty }) => ({ name, centre, course, commenceDate, assignedFaculty }))(req.body || {});
  Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);
  if (updates.name !== undefined) updates.name = String(updates.name || "").trim();
  if (updates.name !== undefined && !updates.name) return sendError(res, 400, "Batch name is required");
  if (updates.assignedFaculty !== undefined) {
    const faculty = Array.isArray(updates.assignedFaculty) ? updates.assignedFaculty : String(updates.assignedFaculty || "").split(",");
    updates.assignedFaculty = [...new Set(faculty.map((name) => String(name || "").trim()).filter(Boolean))];
  }
  if (updates.centre !== undefined) {
    const franchise = await resolveFranchiseFromRequest(req, updates.centre || "");
    if (isFranchiseUser(req.user) && !franchise) return sendError(res, 403, "Franchise account is not assigned");
    updates.centre = franchise?.name || updates.centre || "";
    updates.franchiseId = franchise?._id;
  }
  const nextBatchCentre = Object.prototype.hasOwnProperty.call(updates, "centre") ? updates.centre : existingBatch.centre;
  const nextBatchCourse = Object.prototype.hasOwnProperty.call(updates, "course") ? updates.course : existingBatch.course;
  if (!isCourseAllowedForCentre(nextBatchCentre, nextBatchCourse)) return sendError(res, 400, "Kochi centre allows only AHAP and GCA courses");
  const batch = await Batch.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
  res.json({ ok: true, data: batch });
});

app.delete("/api/admin/batches/:id", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid batch");
  const existingBatch = await Batch.findById(req.params.id).lean();
  if (!existingBatch) return sendError(res, 404, "Batch not found");
  if (isFranchiseUser(req.user) && String(existingBatch.franchiseId || "") !== String(req.user.franchiseId || "")) return sendError(res, 403, "You can delete only your franchise batches");
  const batch = await Batch.findByIdAndUpdate(req.params.id, { $set: { active: false } }, { new: true });
  res.json({ ok: true, data: batch });
});

app.get("/api/admin/class-schedules", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Classes are restricted to academic staff");
  const filter = { active: true, ...(await scopedDataFilter(req, req.query)) };
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [] });
    if (filter.batchId) {
      const allowedBatch = scope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [] });
    } else {
      filter.$or = [{ faculty: req.user.name }, { batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
    }
  }
  const schedules = await ClassSchedule.find(filter).sort({ batchName: 1, faculty: 1, startTime: 1 }).lean();
  res.json({ ok: true, data: schedules });
});

app.post("/api/admin/class-schedules", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Classes are restricted to academic staff");
  const batchId = String(req.body?.batchId || "");
  if (!mongoose.isValidObjectId(batchId)) return sendError(res, 400, "Select a valid batch");
  const batch = await Batch.findById(batchId).lean();
  if (!batch || !batch.active) return sendError(res, 404, "Batch not found");
  if (!(await canAccessRecord(req, batch))) return sendError(res, 403, "You can access only permitted records");
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can create classes only for assigned batches");
  const classType = String(req.body?.classType || "Regular Class");
  const nature = String(req.body?.nature || "Theoretical");
  const faculty = String(req.body?.faculty || req.user.name || "").trim();
  const days = Array.isArray(req.body?.days) ? req.body.days.map(String) : String(req.body?.days || "").split(",");
  const cleanDays = days.map((day) => day.trim()).filter(Boolean);
  const startTime = String(req.body?.startTime || "").trim();
  const endTime = String(req.body?.endTime || "").trim();
  const startDate = req.body?.startDate ? attendanceDate(req.body.startDate) : undefined;
  const endDate = req.body?.endDate ? attendanceDate(req.body.endDate) : undefined;
  const allowedDays = new Set(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
  if (!["Regular Class", "One-time Class"].includes(classType)) return sendError(res, 400, "Choose a valid class type");
  if (!["Theoretical", "Practical"].includes(nature)) return sendError(res, 400, "Choose class nature");
  if (!faculty) return sendError(res, 400, "Faculty is required");
  if (isTeacherAccount(req.user) && faculty !== req.user.name) return sendError(res, 403, "Teachers can create only their own classes");
  if (classType === "Regular Class" && (!cleanDays.length || cleanDays.some((day) => !allowedDays.has(day)))) return sendError(res, 400, "Choose class days");
  if (classType === "One-time Class" && !startDate) return sendError(res, 400, "Choose one-time class date");
  if (!startTime || !endTime) return sendError(res, 400, "Class start and end time are required");
  const schedule = await ClassSchedule.create({
    batchId: batch._id,
    batchName: batch.name,
    course: batch.course || "",
    centre: batch.centre || "",
    franchiseId: batch.franchiseId,
    classType,
    nature,
    faculty,
    days: classType === "Regular Class" ? cleanDays : [dayCode(startDate)],
    startTime,
    endTime,
    startDate,
    endDate,
    note: String(req.body?.note || ""),
    createdBy: req.user.name,
  });
  res.status(201).json({ ok: true, data: schedule });
});

app.get("/api/admin/class-sessions", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Classes are restricted to academic staff");
  const filter = { ...(await scopedDataFilter(req, req.query)), ...attendanceRangeFilter(req.query) };
  if (!filter.date) {
    const week = weekRangeFromDate(req.query.week || "");
    filter.date = { $gte: week.start, $lte: week.end };
  }
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (req.query.nature) filter.nature = String(req.query.nature);
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [] });
    if (filter.batchId) {
      const allowedBatch = scope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [] });
    } else {
      filter.$or = [{ faculty: req.user.name }, { batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
    }
  }
  const sessions = await ClassSession.find(filter).sort({ date: 1, startTime: 1, batchName: 1 }).lean();
  res.json({ ok: true, data: sessions });
});

app.post("/api/admin/class-sessions/generate-week", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Classes are restricted to academic staff");
  const week = weekRangeFromDate(req.body?.week || "");
  const filter = { active: true, ...(await scopedDataFilter(req, req.body || {})) };
  if (req.body?.batchId && mongoose.isValidObjectId(String(req.body.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.body.batchId));
  let teacherScope = null;
  if (isTeacherAccount(req.user)) {
    teacherScope = await teacherAcademicBatchScope(req.user);
    if (!teacherScope.batchIds.length && !teacherScope.batchNames.length) return res.json({ ok: true, data: [], message: "0 classes created for the week" });
    if (filter.batchId) {
      const allowedBatch = teacherScope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [], message: "0 classes created for the week" });
    } else {
      filter.$or = [{ faculty: req.user.name }, { batchId: { $in: teacherScope.batchIds } }, { batchName: { $in: teacherScope.batchNames } }];
    }
  }
  const schedules = await ClassSchedule.find(filter).lean();
  let created = 0;
  for (const schedule of schedules) {
    for (let date = new Date(week.start); date <= week.end; date.setUTCDate(date.getUTCDate() + 1)) {
      const sessionDate = new Date(date);
      const code = dayCode(sessionDate);
      if (!schedule.days?.includes(code)) continue;
      if (schedule.startDate && sessionDate < schedule.startDate) continue;
      if (schedule.endDate && sessionDate > schedule.endDate) continue;
      const studentCount = await Student.countDocuments({ batch: schedule.batchName, status: { $nin: ["Dropped"] } });
      const result = await ClassSession.updateOne(
        { scheduleId: schedule._id, date: sessionDate, startTime: schedule.startTime },
        {
          $setOnInsert: {
            scheduleId: schedule._id,
            batchId: schedule.batchId,
            batchName: schedule.batchName,
            course: schedule.course,
            centre: schedule.centre,
            franchiseId: schedule.franchiseId,
            classType: schedule.classType,
            nature: schedule.nature,
            faculty: schedule.faculty,
            date: sessionDate,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            studentCount,
            note: schedule.note,
            createdBy: req.user.name,
          },
        },
        { upsert: true },
      );
      if (result.upsertedCount) created += 1;
    }
  }
  const sessionFilter = { ...(await scopedDataFilter(req, req.body || {})), date: { $gte: week.start, $lte: week.end } };
  if (req.body?.batchId && mongoose.isValidObjectId(String(req.body.batchId))) sessionFilter.batchId = new mongoose.Types.ObjectId(String(req.body.batchId));
  if (isTeacherAccount(req.user) && teacherScope) {
    if (!sessionFilter.batchId) sessionFilter.$or = [{ faculty: req.user.name }, { batchId: { $in: teacherScope.batchIds } }, { batchName: { $in: teacherScope.batchNames } }];
  }
  const sessions = await ClassSession.find(sessionFilter).sort({ date: 1, startTime: 1 }).lean();
  const calendar = await syncClassSessionsToGoogleCalendar(sessions);
  const syncedSessions = calendar.synced ? await ClassSession.find(sessionFilter).sort({ date: 1, startTime: 1 }).lean() : sessions;
  const calendarMessage = googleCalendarReady()
    ? calendar.synced
      ? `, ${calendar.synced} synced to Google Calendar`
      : ", Google Calendar not connected"
    : "";
  res.json({ ok: true, data: syncedSessions, message: `${created} classes created for the week${calendarMessage}` });
});

app.patch("/api/admin/class-sessions/:id", requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid class session ID");
  const session = await ClassSession.findById(req.params.id).lean();
  if (!session) return sendError(res, 404, "Class session not found");
  const allowed = ["startTime", "endTime", "faculty", "note"];
  const updates = {};
  for (const key of allowed) {
    if (req.body[key] !== undefined) updates[key] = String(req.body[key] || "");
  }
  if (!Object.keys(updates).length) return sendError(res, 400, "No valid fields to update");
  const updated = await ClassSession.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true }).lean();
  res.json({ ok: true, data: updated, message: "Class updated" });
});

app.post("/api/admin/class-sessions/:id/attendance", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Attendance is restricted to teacher and admin accounts");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid class session");
  const session = await ClassSession.findById(req.params.id).lean();
  if (!session) return sendError(res, 404, "Class session not found");
  if (!(await canAccessRecord(req, session))) return sendError(res, 403, "You can access only permitted records");
  const sessionBatch = isTeacherAccount(req.user) ? await Batch.findById(session.batchId).lean() : null;
  if (isTeacherAccount(req.user) && session.faculty !== req.user.name && !(await teacherCanAccessBatch(req.user, sessionBatch))) return sendError(res, 403, "Teachers can mark only assigned batch classes");
  const records = Array.isArray(req.body?.records) ? req.body.records : [];
  if (!records.length) return sendError(res, 400, "Select at least one student");
  const statuses = new Set(["Present", "Absent", "Late", "Leave"]);
  const studentIds = records.map((record) => String(record.studentId || "")).filter((id) => mongoose.isValidObjectId(id));
  const students = await Student.find({ _id: { $in: studentIds }, batch: session.batchName }).lean();
  const studentsById = new Map(students.map((student) => [String(student._id), student]));
  const operations = [];
  for (const record of records) {
    const student = studentsById.get(String(record.studentId || ""));
    const status = String(record.status || "");
    if (!student || !statuses.has(status)) continue;
    operations.push({
      updateOne: {
        filter: { studentId: student._id, date: session.date, nature: session.nature, classSessionId: session._id },
        update: {
          $set: {
            classSessionId: session._id,
            studentId: student._id,
            studentName: student.fullName,
            date: session.date,
            nature: session.nature,
            status,
            note: String(record.note || ""),
            centre: student.centre || "",
            franchiseId: student.franchiseId,
            batch: student.batch || "",
            course: student.course || "",
            counsellor: student.counsellor || "",
            teacher: session.faculty || student.teacher || "",
            markedBy: req.user.name,
          },
        },
        upsert: true,
      },
    });
  }
  if (!operations.length) return sendError(res, 400, "No valid attendance records");
  await Attendance.bulkWrite(operations);
  await ClassSession.findByIdAndUpdate(session._id, { $set: { attendanceMarked: true, studentCount: operations.length } });
  const saved = await Attendance.find({ classSessionId: session._id }).sort({ studentName: 1 }).lean();
  res.json({ ok: true, data: saved });
});

app.delete("/api/admin/class-sessions/:id/attendance", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Attendance is restricted to teacher and admin accounts");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid class session");
  const session = await ClassSession.findById(req.params.id).lean();
  if (!session) return sendError(res, 404, "Class session not found");
  if (!(await canAccessRecord(req, session))) return sendError(res, 403, "You can access only permitted records");
  const sessionBatch = isTeacherAccount(req.user) ? await Batch.findById(session.batchId).lean() : null;
  if (isTeacherAccount(req.user) && session.faculty !== req.user.name && !(await teacherCanAccessBatch(req.user, sessionBatch))) return sendError(res, 403, "Teachers can clear only assigned batch classes");
  await Attendance.deleteMany({ classSessionId: session._id });
  const updated = await ClassSession.findByIdAndUpdate(session._id, { $set: { attendanceMarked: false, studentCount: 0 } }, { returnDocument: "after" }).lean();
  res.json({ ok: true, data: updated, message: "Attendance cleared" });
});

app.get("/api/admin/topic-progress", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Topic tracker is restricted to academic staff");
  const filter = { ...(await scopedDataFilter(req, req.query)) };
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [] });
    if (filter.batchId) {
      const allowedBatch = scope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [] });
    } else {
      filter.$or = [{ batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
    }
  }
  const rows = await TopicProgress.find(filter).sort({ batchName: 1, module: 1, topic: 1 }).lean();
  res.json({ ok: true, data: rows });
});

app.patch("/api/admin/topic-progress", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Topic tracker is restricted to academic staff");
  const batchId = String(req.body?.batchId || "");
  if (!mongoose.isValidObjectId(batchId)) return sendError(res, 400, "Select a valid batch");
  const batch = await Batch.findById(batchId).lean();
  if (!batch || !batch.active) return sendError(res, 404, "Batch not found");
  if (!(await canAccessRecord(req, batch))) return sendError(res, 403, "You can access only permitted records");
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can update only assigned batches");
  const module = String(req.body?.module || "").trim();
  const topic = String(req.body?.topic || "").trim();
  const status = String(req.body?.status || "Not Started");
  const faculty = String(req.body?.faculty || req.user.name || "").trim();
  if (!module || !topic) return sendError(res, 400, "Module and topic are required");
  if (!["Not Started", "In Progress", "Covered"].includes(status)) return sendError(res, 400, "Choose a valid topic status");
  if (isTeacherAccount(req.user) && faculty && faculty !== req.user.name) return sendError(res, 403, "Teachers can update only their own topic coverage");
  const topicId = String(req.body?._id || req.body?.id || "");
  const existingTopic = mongoose.isValidObjectId(topicId)
    ? await TopicProgress.findById(topicId).lean()
    : await TopicProgress.findOne({ batchId: batch._id, module, topic }).lean();
  if (topicId && !existingTopic) return sendError(res, 404, "Topic not found");
  if (existingTopic && !(await canAccessRecord(req, existingTopic))) return sendError(res, 403, "You can access only permitted records");
  if (existingTopic && String(existingTopic.batchId || "") !== String(batch._id)) return sendError(res, 400, "Topic does not belong to this batch");
  const dateCovered = req.body?.dateCovered ? attendanceDate(req.body.dateCovered) : (status === "Covered" ? new Date() : undefined);
  const row = await TopicProgress.findOneAndUpdate(
    existingTopic ? { _id: existingTopic._id } : { batchId: batch._id, module, topic },
    {
      $set: {
        batchId: batch._id,
        batchName: batch.name,
        course: batch.course || "",
        centre: batch.centre || "",
        franchiseId: batch.franchiseId,
        module,
        topic,
        status,
        dateCovered: status === "Covered" ? dateCovered : undefined,
        faculty,
        updatedBy: req.user.name,
      },
    },
    { new: true, upsert: true, runValidators: true },
  );
  res.json({ ok: true, data: row });
});

app.delete("/api/admin/topic-progress/:id", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Topic tracker is restricted to academic staff");
  if (isTeacherAccount(req.user)) return sendError(res, 403, "Teachers cannot delete syllabus topics");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid topic");
  const topic = await TopicProgress.findById(req.params.id).lean();
  if (!topic) return sendError(res, 404, "Topic not found");
  if (!(await canAccessRecord(req, topic))) return sendError(res, 403, "You can access only permitted records");
  await TopicProgress.findByIdAndDelete(req.params.id);
  res.json({ ok: true, data: topic });
});

app.get("/api/admin/practicals", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Practicals are restricted to academic staff");
  const filter = { ...(await scopedDataFilter(req, req.query)) };
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (req.query.studentId && mongoose.isValidObjectId(String(req.query.studentId))) filter.studentId = new mongoose.Types.ObjectId(String(req.query.studentId));
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [] });
    if (filter.batchId) {
      const allowedBatch = scope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [] });
    } else if (req.query.batch) {
      if (!scope.batchNames.includes(String(req.query.batch))) return res.json({ ok: true, data: [] });
    } else {
      filter.$or = [{ batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
    }
    const studentFilter = { batch: { $in: scope.batchNames } };
    if (filter.studentId) studentFilter._id = filter.studentId;
    const assignedStudents = await Student.find(studentFilter).select("_id").lean();
    const studentIds = assignedStudents.map((student) => student._id);
    if (!studentIds.length) return res.json({ ok: true, data: [] });
    if (filter.studentId) {
      const allowedStudent = studentIds.some((id) => String(id) === String(filter.studentId));
      if (!allowedStudent) return res.json({ ok: true, data: [] });
    } else {
      filter.studentId = { $in: studentIds };
    }
  }
  const rows = await PracticalRecord.find(filter).sort({ batchName: 1, practicalName: 1, studentName: 1 }).lean();
  res.json({ ok: true, data: rows });
});

app.patch("/api/admin/practicals", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Practicals are restricted to academic staff");
  const batchId = String(req.body?.batchId || "");
  const studentId = String(req.body?.studentId || "");
  if (!mongoose.isValidObjectId(batchId)) return sendError(res, 400, "Select a valid batch");
  if (!mongoose.isValidObjectId(studentId)) return sendError(res, 400, "Select a valid student");
  const [batch, student] = await Promise.all([Batch.findById(batchId).lean(), Student.findById(studentId).lean()]);
  if (!batch || !batch.active) return sendError(res, 404, "Batch not found");
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, batch)) || !(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
  if (student.batch !== batch.name) return sendError(res, 400, "Student is not assigned to this batch");
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can update only assigned batch practicals");
  const practicalName = String(req.body?.practicalName || "").trim();
  const module = String(req.body?.module || "").trim();
  const status = String(req.body?.status || "Pending");
  if (!practicalName) return sendError(res, 400, "Practical name is required");
  if (!["Pending", "Completed", "Needs Repeat"].includes(status)) return sendError(res, 400, "Choose a valid practical status");
  const dateConducted = req.body?.dateConducted ? attendanceDate(req.body.dateConducted) : (status === "Completed" ? new Date() : undefined);
  const row = await PracticalRecord.findOneAndUpdate(
    { batchId: batch._id, practicalName, studentId: student._id },
    {
      $set: {
        batchId: batch._id,
        batchName: batch.name,
        course: batch.course || "",
        centre: batch.centre || "",
        franchiseId: batch.franchiseId,
        practicalName,
        module,
        studentId: student._id,
        studentName: student.fullName,
        dateConducted: status === "Completed" ? dateConducted : undefined,
        status,
        remarks: String(req.body?.remarks || ""),
        faculty: String(req.body?.faculty || student.teacher || req.user.name || ""),
        updatedBy: req.user.name,
      },
    },
    { new: true, upsert: true, runValidators: true },
  );
  res.json({ ok: true, data: row });
});

app.get("/api/admin/study-notes", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Study notes are restricted to academic staff");
  const filter = { ...(await scopedDataFilter(req, req.query)) };
  if (req.query.batchId && mongoose.isValidObjectId(String(req.query.batchId))) filter.batchId = new mongoose.Types.ObjectId(String(req.query.batchId));
  if (isTeacherAccount(req.user)) {
    const scope = await teacherAcademicBatchScope(req.user);
    if (!scope.batchIds.length && !scope.batchNames.length) return res.json({ ok: true, data: [] });
    if (filter.batchId) {
      const allowedBatch = scope.batchIds.some((id) => String(id) === String(filter.batchId));
      if (!allowedBatch) return res.json({ ok: true, data: [] });
    } else {
      filter.$or = [{ batchId: { $in: scope.batchIds } }, { batchName: { $in: scope.batchNames } }];
    }
  }
  const notes = await StudyNote.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ ok: true, data: notes });
});

app.post("/api/admin/study-notes", requireAuth, studyNoteUpload.single("file"), async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Study notes are restricted to academic staff");
  const batchId = String(req.body?.batchId || "");
  if (!mongoose.isValidObjectId(batchId)) return sendError(res, 400, "Select a valid batch");
  const batch = await Batch.findById(batchId).lean();
  if (!batch || !batch.active) return sendError(res, 404, "Batch not found");
  if (!(await canAccessRecord(req, batch))) return sendError(res, 403, "You can access only permitted records");
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can upload notes only for assigned batches");
  const title = String(req.body?.title || "").trim();
  const referenceUrl = String(req.body?.referenceUrl || "").trim();
  if (!title) return sendError(res, 400, "Note title is required");
  if (!req.file && !referenceUrl) return sendError(res, 400, "Upload a file or add a reference URL");
  if (referenceUrl && !/^https?:\/\/\S+$/i.test(referenceUrl)) return sendError(res, 400, "Enter a valid reference URL starting with http or https");
  const resourceType = referenceUrl && /(youtube\.com|youtu\.be|vimeo\.com|video)/i.test(referenceUrl) ? "Video" : req.file ? "File" : "Reference";
  const note = await StudyNote.create({
    batchId: batch._id,
    batchName: batch.name,
    course: batch.course || "",
    centre: batch.centre || "",
    franchiseId: batch.franchiseId,
    title,
    module: String(req.body?.module || "").trim(),
    description: String(req.body?.description || "").trim(),
    file: req.file ? saveLeadDocument(req.file) : undefined,
    referenceUrl,
    resourceType,
    uploadedBy: req.user.name || req.user.email || "Faculty",
  });
  res.status(201).json({ ok: true, data: note, message: "Study resource shared" });
});

app.get("/api/admin/study-notes/:id/download", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Study notes are restricted to academic staff");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid note");
  const note = await StudyNote.findById(req.params.id).lean();
  if (!note) return sendError(res, 404, "Note not found");
  if (!(await canAccessRecord(req, note))) return sendError(res, 403, "You can access only permitted records");
  const batch = isTeacherAccount(req.user) ? await Batch.findById(note.batchId).lean() : null;
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can download notes only for assigned batches");
  const filePath = path.join(leadDocumentDir, note.file?.storedName || "");
  if (!note.file?.storedName || !filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Note file not found");
  res.download(filePath, note.file.originalName || "study-note");
});

app.delete("/api/admin/study-notes/:id", requireAuth, async (req, res) => {
  if (!canUseAttendance(req.user)) return sendError(res, 403, "Study notes are restricted to academic staff");
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid note");
  const note = await StudyNote.findById(req.params.id).lean();
  if (!note) return sendError(res, 404, "Note not found");
  if (!(await canAccessRecord(req, note))) return sendError(res, 403, "You can access only permitted records");
  const batch = isTeacherAccount(req.user) ? await Batch.findById(note.batchId).lean() : null;
  if (isTeacherAccount(req.user) && !(await teacherCanAccessBatch(req.user, batch))) return sendError(res, 403, "Teachers can delete notes only for assigned batches");
  await StudyNote.findByIdAndDelete(note._id);
  res.json({ ok: true, data: note, message: "Note deleted" });
});

app.get("/api/student/study-notes/:id/download", requireStudentAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return sendError(res, 400, "Invalid note");
  const note = await StudyNote.findById(req.params.id).lean();
  if (!note) return sendError(res, 404, "Note not found");
  const studentBatch = String(req.student.batch || "");
  if (!studentBatch || note.batchName !== studentBatch) return sendError(res, 403, "You can access only your batch notes");
  const filePath = path.join(leadDocumentDir, note.file?.storedName || "");
  if (!note.file?.storedName || !filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Note file not found");
  res.download(filePath, note.file.originalName || "study-note");
});

app.post("/api/contact", async (req, res) => {
  const { fullName, phone, email, preferredProgram, message } = req.body || {};
  if (!fullName || !phone || !preferredProgram) return sendError(res, 400, "Full name, phone, and preferred program are required.");
  try {
    await transporter.sendMail({
      from: `iMED Academy <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email || process.env.SMTP_USER,
      subject: `New iMED enquiry - ${preferredProgram}`,
      html: `<h2>New iMED Academy Enquiry</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;"><tr><th align="left">Full Name</th><td>${escapeHtml(fullName)}</td></tr><tr><th align="left">Phone</th><td>${escapeHtml(phone)}</td></tr><tr><th align="left">Email</th><td>${escapeHtml(email || "Not provided")}</td></tr><tr><th align="left">Preferred Program</th><td>${escapeHtml(preferredProgram)}</td></tr><tr><th align="left">Message</th><td>${escapeHtml(message || "Not provided")}</td></tr></table>`,
    });
    await Lead.create({ fullName, phone: normalizePhone(phone), email: email || "", source: "Website Enquiry", course: preferredProgram, notes: message || "", activities: [{ type: "website", message: "Created from website enquiry", by: "Website" }] });
    res.json({ ok: true, message: "Enquiry submitted successfully." });
  } catch (error) {
    console.error("Contact form mail error:", error);
    sendError(res, 500, "Unable to send enquiry right now. Please try again later.");
  }
});

app.post("/api/careers", upload.single("resume"), async (req, res) => {
  const { name, mobile, email, interestedRole, message } = req.body || {};
  if (!name || !mobile || !email || !interestedRole) return sendError(res, 400, "Name, mobile, email, and interested role are required.");
  try {
    const attachments = req.file ? [{ filename: req.file.originalname, content: req.file.buffer, contentType: req.file.mimetype }] : [];
    await transporter.sendMail({
      from: `iMED Academy Careers <${process.env.SMTP_USER}>`,
      to: toAddress,
      replyTo: email,
      subject: `New career application - ${interestedRole}`,
      html: `<h2>New Career Application</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:Arial,sans-serif;"><tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr><tr><th align="left">Mobile</th><td>${escapeHtml(mobile)}</td></tr><tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr><tr><th align="left">Interested Role</th><td>${escapeHtml(interestedRole)}</td></tr><tr><th align="left">Message</th><td>${escapeHtml(message || "Not provided")}</td></tr><tr><th align="left">Resume</th><td>${req.file ? escapeHtml(req.file.originalname) : "Not attached"}</td></tr></table>`,
      attachments,
    });
    res.json({ ok: true, message: "Application submitted successfully." });
  } catch (error) {
    console.error("Career form mail error:", error);
    sendError(res, 500, "Unable to submit application right now. Please try again later.");
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ ok: false, message: error.field === "file" ? "Study note file size must be below 10 MB" : "Document file size must be below 2 MB" });
  }
  if (error?.message === "Only PDF, JPG, PNG or WEBP documents are allowed" || error?.message === "Only PDF, Word, PPT, Excel, image, CSV or TXT notes are allowed") {
    return res.status(400).json({ ok: false, message: error.message });
  }
  console.error("API error:", error);
  res.status(500).json({ ok: false, message: "Server error" });
});

mongoose.connect(mongoUri)
  .then(async () => {
    await seedBaseData();
    app.listen(port, () => console.log(`iMED CRM API running on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
