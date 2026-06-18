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

const app = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/imed_crm";
const jwtSecret = process.env.JWT_SECRET || "imed-local-jwt-secret";
const adminSetupCode = process.env.ADMIN_SETUP_CODE || "909090";

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
const leadDocumentUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });
const leadDocumentDir = path.join(process.cwd(), "uploads", "lead-documents");
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
  role: { type: String, enum: ["superadmin", "admin", "counsellor"], default: "admin" },
}, { timestamps: true });

const centreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  city: { type: String, default: "" },
  manager: { type: String, default: "" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  code: { type: String, default: "" },
  fee: { type: Number, default: 0 },
  duration: { type: String, default: "" },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const batchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  centre: { type: String, default: "" },
  course: { type: String, default: "" },
  commenceDate: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
  type: { type: String, default: "note" },
  message: { type: String, required: true },
  by: { type: String, default: "Admin" },
  at: { type: Date, default: Date.now },
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
  source: { type: String, default: "Website" },
  centre: { type: String, default: "" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "Unassigned" },
  stage: {
    type: String,
    enum: ["New Lead", "Contacted", "Demo / Visit", "Counselling", "Enrolled", "In Training", "Placed", "Lost"],
    default: "New Lead",
  },
  priority: { type: String, enum: ["Hot", "Warm", "Cold"], default: "Warm" },
  city: { type: String, default: "" },
  expectedFee: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  nextFollowUp: { type: Date },
  notes: { type: String, default: "" },
  activities: [activitySchema],
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  mode: { type: String, default: "Cash" },
  note: { type: String, default: "" },
  paidAt: { type: Date, default: Date.now },
}, { _id: false });

const studentSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  parentMobile: { type: String, default: "", trim: true },
  email: { type: String, default: "", lowercase: true, trim: true },
  governmentProof: { type: documentFileSchema, default: undefined },
  highestQualificationCertificate: { type: documentFileSchema, default: undefined },
  centre: { type: String, default: "" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "Unassigned" },
  batch: { type: String, default: "" },
  batchCommenceDate: { type: Date },
  admissionNumber: { type: String, default: "" },
  discountAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["Enrolled", "In Training", "Course Completed", "Placed", "Dropped"], default: "Enrolled" },
  totalFee: { type: Number, default: 0 },
  paidAmount: { type: Number, default: 0 },
  emiEnabled: { type: Boolean, default: false },
  emiMonths: { type: Number, default: 0 },
  emiAmount: { type: Number, default: 0 },
  nextEmiDate: { type: Date },
  placementCompany: { type: String, default: "" },
  placementSalary: { type: Number, default: 0 },
  certificateNumber: { type: String, default: "" },
  certificateIssuedAt: { type: Date },
  certificateStatus: { type: String, enum: ["Not Issued", "Issued"], default: "Not Issued" },
  payments: [paymentSchema],
  activities: [activitySchema],
}, { timestamps: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
const Centre = mongoose.model("Centre", centreSchema);
const Course = mongoose.model("Course", courseSchema);
const Batch = mongoose.model("Batch", batchSchema);
const Lead = mongoose.model("Lead", leadSchema);
const Student = mongoose.model("Student", studentSchema);

async function seedBaseData() {
  const centres = [{ name: "Delhi", city: "Delhi" }, { name: "Kochi", city: "Kochi" }, { name: "Bangalore", city: "Bangalore" }];
  const courses = [
    { name: "Hospital Administration", code: "HA", fee: 55000, duration: "6 months" },
    { name: "Emergency Medical Technician", code: "EMT", fee: 45000, duration: "6 months" },
    { name: "General Duty Assistant", code: "GDA", fee: 35000, duration: "4 months" },
    { name: "OCHA", code: "OCHA", fee: 30000, duration: "Online" },
    { name: "ACHA", code: "ACHA", fee: 65000, duration: "6 months" },
  ];
  await Promise.all(centres.map((centre) => Centre.updateOne({ name: centre.name }, { $setOnInsert: centre }, { upsert: true })));
  await Promise.all(courses.map((course) => Course.updateOne({ name: course.name }, { $setOnInsert: course }, { upsert: true })));
}

function signToken(user) {
  return jwt.sign({ id: user._id.toString(), email: user.email, name: user.name, role: user.role }, jwtSecret, { expiresIn: "7d" });
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

function adminScopeFilter(query = {}) {
  const filter = {};
  if (query.centre) filter.centre = String(query.centre);
  if (query.counsellor) filter.counsellor = String(query.counsellor);
  return filter;
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

function requireSuperAdmin(req, res, next) {
  if (req.user?.role !== "superadmin") return sendError(res, 403, "Super admin access required");
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "imed-crm", mongo: mongoose.connection.readyState === 1 });
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, setupCode } = req.body || {};
  if (String(setupCode || "").trim() !== adminSetupCode) return sendError(res, 403, "Invalid admin setup code");
  if (!name || !email || !password) return sendError(res, 400, "Name, email, and password are required");
  if (String(password).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  const adminCount = await AdminUser.countDocuments();
  if (adminCount >= 3) return sendError(res, 403, "Admin account limit reached");
  const existing = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) return sendError(res, 409, "Account already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await AdminUser.create({ name, email, passwordHash, role: adminCount === 0 ? "superadmin" : "admin" });
  res.status(201).json({ ok: true, token: signToken(user), user: { name: user.name, email: user.email, role: user.role } });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return sendError(res, 400, "Email and password are required");
  const user = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (!user) return sendError(res, 401, "Invalid email or password");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return sendError(res, 401, "Invalid email or password");
  res.json({ ok: true, token: signToken(user), user: { name: user.name, email: user.email, role: user.role } });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: { name: req.user.name, email: req.user.email, role: req.user.role } });
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

app.get("/api/admin/counsellors", requireAuth, requireSuperAdmin, async (_req, res) => {
  const counsellors = await AdminUser.find({ role: "counsellor" }).select("name email role").sort({ name: 1 }).lean();
  res.json({ ok: true, data: counsellors });
});

app.post("/api/admin/counsellors", requireAuth, requireSuperAdmin, async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return sendError(res, 400, "Name, email, and password are required");
  if (String(password).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  const existing = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
  if (existing) return sendError(res, 409, "Counsellor account already exists");
  const passwordHash = await bcrypt.hash(password, 10);
  const counsellor = await AdminUser.create({ name, email, passwordHash, role: "counsellor" });
  res.status(201).json({ ok: true, data: { name: counsellor.name, email: counsellor.email, role: counsellor.role } });
});

app.get("/api/admin/dashboard/summary", requireAuth, async (req, res) => {
  const leadFilter = { ...adminScopeFilter(req.query), ...dateFilter(req.query) };
  const studentFilter = { ...dateFilter(req.query) };
  if (req.query.centre) studentFilter.centre = String(req.query.centre);
  if (req.query.counsellor) studentFilter.counsellor = String(req.query.counsellor);

  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [leadsThisMonth, totalLeads, enrolled, training, placed, lost, students, revenueAgg, pendingAgg] = await Promise.all([
    Lead.countDocuments(leadFilter.createdAt ? leadFilter : { ...leadFilter, createdAt: { $gte: startOfMonth } }),
    Lead.countDocuments(leadFilter),
    Lead.countDocuments({ ...leadFilter, stage: "Enrolled" }),
    Student.countDocuments({ ...studentFilter, status: "In Training" }),
    Student.countDocuments({ ...studentFilter, status: { $in: ["Course Completed", "Placed"] } }),
    Lead.countDocuments({ ...leadFilter, stage: "Lost" }),
    Student.countDocuments(studentFilter),
    Student.aggregate([{ $match: studentFilter }, { $group: { _id: null, total: { $sum: "$paidAmount" } } }]),
    Student.aggregate([{ $match: studentFilter }, { $group: { _id: null, total: { $sum: { $max: [{ $subtract: ["$totalFee", "$paidAmount"] }, 0] } } } }]),
  ]);

  const conversion = totalLeads ? Math.round(((enrolled + placed) / totalLeads) * 100) : 0;
  res.json({ ok: true, data: { leadsThisMonth, totalLeads, enrolled, training, placed, lost, students, conversion, revenue: revenueAgg[0]?.total || 0, pending: pendingAgg[0]?.total || 0 } });
});

app.get("/api/admin/dashboard/funnel", requireAuth, async (req, res) => {
  const leadFilter = { ...adminScopeFilter(req.query), ...dateFilter(req.query) };
  const studentFilter = { ...dateFilter(req.query) };
  if (req.query.centre) studentFilter.centre = String(req.query.centre);
  if (req.query.counsellor) studentFilter.counsellor = String(req.query.counsellor);

  const allStages = ["New Lead", "Contacted", "Demo / Visit", "Counselling", "Enrolled", "In Training", "Course Completed", "Placed", "Lost"];
  const leadGroups = await Lead.aggregate([{ $match: leadFilter }, { $group: { _id: "$stage", count: { $sum: 1 } } }]);
  const [studentTraining, studentCompleted, studentPlaced] = await Promise.all([
    Student.countDocuments({ ...studentFilter, status: "In Training" }),
    Student.countDocuments({ ...studentFilter, status: "Course Completed" }),
    Student.countDocuments({ ...studentFilter, status: "Placed" }),
  ]);
  const data = allStages.map((stage) => {
    if (stage === "In Training") return { stage, count: studentTraining };
    if (stage === "Course Completed") return { stage, count: studentCompleted };
    if (stage === "Placed") return { stage, count: studentPlaced };
    return { stage, count: leadGroups.find((item) => item._id === stage)?.count || 0 };
  });
  res.json({ ok: true, data });
});

app.get("/api/admin/dashboard/centres", requireAuth, async (req, res) => {
  const leadFilter = { ...adminScopeFilter(req.query), ...dateFilter(req.query) };
  const data = await Lead.aggregate([{ $match: leadFilter }, { $group: { _id: "$centre", leads: { $sum: 1 }, enrolled: { $sum: { $cond: [{ $in: ["$stage", ["Enrolled", "In Training", "Placed"]] }, 1, 0] } } } }, { $sort: { leads: -1 } }]);
  res.json({ ok: true, data: data.map((item) => ({ centre: item._id || "Unassigned", leads: item.leads, enrolled: item.enrolled })) });
});

app.get("/api/admin/leads", requireAuth, async (req, res) => {
  const { q = "", stage = "", centre = "", course = "", counsellor = "" } = req.query;
  const filter = { ...dateFilter(req.query) };
  if (stage) filter.stage = stage;
  if (centre) filter.centre = centre;
  if (course) filter.course = course;
  if (counsellor) filter.counsellor = counsellor;
  if (q) filter.$or = [{ fullName: { $regex: q, $options: "i" } }, { phone: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }];
  const leads = await Lead.find(filter).sort({ updatedAt: -1 }).limit(250).lean();
  res.json({ ok: true, data: leads });
});

app.post("/api/admin/leads", requireAuth, leadDocumentUpload.fields([
  { name: "governmentProof", maxCount: 1 },
  { name: "highestQualificationCertificate", maxCount: 1 },
]), async (req, res) => {
  const body = req.body || {};
  const files = req.files || {};
  if (!body.fullName || !body.phone) return sendError(res, 400, "Full name and phone are required");
  const lead = await Lead.create({
    fullName: body.fullName,
    phone: normalizePhone(body.phone),
    parentMobile: normalizePhone(body.parentMobile || ""),
    email: body.email || "",
    governmentProof: saveLeadDocument(files.governmentProof?.[0]),
    highestQualificationCertificate: saveLeadDocument(files.highestQualificationCertificate?.[0]),
    source: body.source || "Website",
    centre: body.centre || "",
    course: body.course || "",
    counsellor: body.counsellor || "Unassigned",
    stage: body.stage || "New Lead",
    priority: body.priority || "Warm",
    city: body.city || "",
    expectedFee: Number(body.expectedFee || 0),
    notes: body.notes || "",
    activities: [{ type: "created", message: "Lead created", by: req.user.name }],
  });
  res.status(201).json({ ok: true, data: lead });
});

app.patch("/api/admin/leads/:id", requireAuth, async (req, res) => {
  const allowedLeadUpdates = (({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, source, centre, course, counsellor, stage, priority, city, expectedFee, nextFollowUp, notes }) => ({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, source, centre, course, counsellor, stage, priority, city, expectedFee, nextFollowUp, notes }))(req.body || {});
  Object.keys(allowedLeadUpdates).forEach((key) => allowedLeadUpdates[key] === undefined && delete allowedLeadUpdates[key]);
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $set: allowedLeadUpdates }, { new: true, runValidators: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/activities", requireAuth, async (req, res) => {
  const { message, type = "note" } = req.body || {};
  if (!message) return sendError(res, 400, "Message is required");
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $push: { activities: { type, message, by: req.user.name } } }, { new: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/convert", requireAuth, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return sendError(res, 404, "Lead not found");
  const existing = await Student.findOne({ leadId: lead._id });
  if (existing) return res.json({ ok: true, data: existing });
  const admissionCount = await Student.countDocuments();
  const student = await Student.create({
    leadId: lead._id,
    fullName: lead.fullName,
    phone: lead.phone,
    parentMobile: lead.parentMobile,
    email: lead.email,
    governmentProof: lead.governmentProof,
    highestQualificationCertificate: lead.highestQualificationCertificate,
    centre: lead.centre,
    course: lead.course,
    counsellor: lead.counsellor || "Unassigned",
    admissionNumber: `IMED-${new Date().getFullYear()}-${String(admissionCount + 1).padStart(4, "0")}`,
    totalFee: Number(req.body?.totalFee || lead.expectedFee || 0),
    paidAmount: Number(req.body?.paidAmount || lead.paidAmount || 0),
    activities: [{ type: "converted", message: "Lead converted to student", by: req.user.name }],
  });
  lead.stage = "Enrolled";
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
  const record = await Model.findById(id).select(field).lean();
  const document = record?.[field];
  if (!document?.storedName) return sendError(res, 404, "Document not found");
  const filePath = path.join(leadDocumentDir, document.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Document not found");
  res.setHeader("Content-Type", document.mimeType || "application/octet-stream");
  res.download(filePath, document.originalName || "document");
});

app.get("/api/admin/students", requireAuth, async (req, res) => {
  const { q = "", status = "", centre = "", course = "", counsellor = "" } = req.query;
  const filter = { ...dateFilter(req.query) };
  if (status) filter.status = status;
  if (centre) filter.centre = centre;
  if (course) filter.course = course;
  if (counsellor) filter.counsellor = counsellor;
  if (q) filter.$or = [{ fullName: { $regex: q, $options: "i" } }, { phone: { $regex: q, $options: "i" } }, { email: { $regex: q, $options: "i" } }];
  const students = await Student.find(filter).sort({ updatedAt: -1 }).limit(250).lean();
  res.json({ ok: true, data: students });
});

app.patch("/api/admin/students/:id", requireAuth, async (req, res) => {
  const allowedStudentUpdates = (({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, centre, course, counsellor, batch, batchCommenceDate, admissionNumber, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementCompany, placementSalary, certificateNumber, certificateIssuedAt, certificateStatus }) => ({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, centre, course, counsellor, batch, batchCommenceDate, admissionNumber, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementCompany, placementSalary, certificateNumber, certificateIssuedAt, certificateStatus }))(req.body || {});
  Object.keys(allowedStudentUpdates).forEach((key) => allowedStudentUpdates[key] === undefined && delete allowedStudentUpdates[key]);
  const student = await Student.findByIdAndUpdate(req.params.id, { $set: allowedStudentUpdates }, { new: true, runValidators: true });
  if (!student) return sendError(res, 404, "Student not found");
  res.json({ ok: true, data: student });
});

app.post("/api/admin/students/:id/certificate", requireAuth, async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return sendError(res, 404, "Student not found");
  if (!["Course Completed", "Placed"].includes(student.status)) return sendError(res, 400, "Mark course as completed before issuing certificate");

  if (!student.certificateNumber) {
    const issuedCount = await Student.countDocuments({ certificateStatus: "Issued" });
    student.certificateNumber = `IMED-CERT-${new Date().getFullYear()}-${String(issuedCount + 1).padStart(4, "0")}`;
  }
  student.certificateIssuedAt = student.certificateIssuedAt || new Date();
  student.certificateStatus = "Issued";
  student.activities.push({ type: "certificate", message: `Certificate issued: ${student.certificateNumber}`, by: req.user.name });
  await student.save();

  res.json({ ok: true, data: student });
});

app.post("/api/admin/students/:id/payments", requireAuth, async (req, res) => {
  const amount = Number(req.body?.amount || 0);
  if (amount <= 0) return sendError(res, 400, "Payment amount is required");
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { $inc: { paidAmount: amount }, $push: { payments: { amount, mode: req.body?.mode || "Cash", note: req.body?.note || "" }, activities: { type: "payment", message: `Payment received: ${amount}`, by: req.user.name } } },
    { new: true },
  );
  if (!student) return sendError(res, 404, "Student not found");
  res.json({ ok: true, data: student });
});

app.get("/api/admin/centres", requireAuth, async (_req, res) => {
  const centres = await Centre.find({ active: true }).sort({ name: 1 }).lean();
  res.json({ ok: true, data: centres });
});

app.post("/api/admin/centres", requireAuth, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Centre name is required");
  const centre = await Centre.create(req.body);
  res.status(201).json({ ok: true, data: centre });
});

app.get("/api/admin/courses", requireAuth, async (_req, res) => {
  const courses = await Course.find({ active: true }).sort({ name: 1 }).lean();
  res.json({ ok: true, data: courses });
});

app.post("/api/admin/courses", requireAuth, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Course name is required");
  const course = await Course.create({ ...req.body, fee: Number(req.body.fee || 0) });
  res.status(201).json({ ok: true, data: course });
});

app.get("/api/admin/batches", requireAuth, async (_req, res) => {
  const batches = await Batch.find({ active: true }).sort({ commenceDate: -1, name: 1 }).lean();
  res.json({ ok: true, data: batches });
});

app.post("/api/admin/batches", requireAuth, requireSuperAdmin, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Batch name is required");
  if (!req.body?.commenceDate) return sendError(res, 400, "Batch commence date is required");
  const batch = await Batch.create({
    name: req.body.name,
    centre: req.body.centre || "",
    course: req.body.course || "",
    commenceDate: req.body.commenceDate,
  });
  res.status(201).json({ ok: true, data: batch });
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
    return res.status(400).json({ ok: false, message: "Document file size must be below 2 MB" });
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
