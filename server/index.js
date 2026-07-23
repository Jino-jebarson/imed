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
const emptyObjectId = new mongoose.Types.ObjectId("000000000000000000000000");

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
  role: { type: String, enum: ["superadmin", "admin", "counsellor", "franchise_superadmin", "franchise_counsellor"], default: "admin" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
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
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "Unassigned" },
  stage: {
    type: String,
    enum: ["New Lead", "Contacted", "Demo / Visit", "Counselling", "Enrolled", "In Training", "Course Completed", "Placed", "Lost"],
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
  by: { type: String, default: "" },
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
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
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

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  studentName: { type: String, default: "" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent", "Late", "Leave"], required: true },
  note: { type: String, default: "" },
  centre: { type: String, default: "" },
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre" },
  batch: { type: String, default: "" },
  course: { type: String, default: "" },
  counsellor: { type: String, default: "" },
  markedBy: { type: String, default: "" },
}, { timestamps: true });
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
const Centre = mongoose.model("Centre", centreSchema);
const Course = mongoose.model("Course", courseSchema);
const Batch = mongoose.model("Batch", batchSchema);
const Lead = mongoose.model("Lead", leadSchema);
const Student = mongoose.model("Student", studentSchema);
const Attendance = mongoose.model("Attendance", attendanceSchema);

async function seedBaseData() {
  await Promise.all([
    Course.collection.dropIndex("name_1").catch(() => undefined),
    Batch.collection.dropIndex("name_1").catch(() => undefined),
  ]);
  const centres = [{ name: "Delhi", city: "Delhi" }, { name: "Kochi", city: "Kochi" }, { name: "Bangalore", city: "Bangalore" }];
  const courses = [
    { name: "Hospital Administration", code: "HA", fee: 55000, duration: "6 months" },
    { name: "Emergency Medical Technician", code: "EMT", fee: 45000, duration: "6 months" },
    { name: "General Duty Assistant", code: "GDA", fee: 35000, duration: "4 months" },
    { name: "OCHA", code: "OCHA", fee: 30000, duration: "Online" },
    { name: "ACHA", code: "ACHA", fee: 65000, duration: "6 months" },
    { name: "Medical Laboratory Technician", code: "MLT", fee: 55000, duration: "6 months" },
    { name: "Radiology X-Ray Technician", code: "RADIOLOGY", fee: 55000, duration: "6 months" },
  ];
  await Promise.all(centres.map((centre) => Centre.updateOne({ name: centre.name }, { $set: { type: "branch" }, $setOnInsert: centre }, { upsert: true })));
  await Centre.updateMany({ name: { $nin: centres.map((centre) => centre.name) }, type: { $exists: false } }, { $set: { type: "franchise" } });
  await Promise.all(courses.map((course) => Course.updateOne({ name: course.name }, { $setOnInsert: course }, { upsert: true })));
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
  return ["franchise_superadmin", "franchise_counsellor"].includes(user?.role);
}

function isFranchiseSuperAdmin(user) {
  return user?.role === "franchise_superadmin";
}

function isCounsellorAccount(user) {
  return ["counsellor", "franchise_counsellor"].includes(user?.role);
}

function canManageFees(user) {
  return isHeadAdmin(user) || isFranchiseSuperAdmin(user) || isCounsellorAccount(user);
}

function isHeadBranchScoped(user) {
  return ["admin", "counsellor"].includes(user?.role);
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
  if (isFranchiseUser(req.user)) {
    return Boolean(req.user.franchiseId && record?.franchiseId && String(record.franchiseId) === String(req.user.franchiseId));
  }
  if (isHeadBranchScoped(req.user)) {
    const branchScope = await headOfficeBranchScope(req.user);
    const recordFranchiseId = record?.franchiseId ? String(record.franchiseId) : "";
    return branchScope.ids.some((id) => String(id) === recordFranchiseId) || branchScope.names.includes(String(record?.centre || ""));
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
  return { name: user.name, email: user.email, role: user.role, franchiseId: user.franchiseId?.toString() || "" };
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
  const parts = String(value).split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [year, month, day] = parts;
  return new Date(Date.UTC(year, month - 1, day));
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

app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ ok: true, user: staffResponse(req.user) });
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
    ? { role: "franchise_counsellor", franchiseId: req.user.franchiseId || emptyObjectId }
    : isHeadBranchAdmin(req.user)
      ? { role: { $in: ["admin", "counsellor"] }, ...(req.user.franchiseId ? { franchiseId: req.user.franchiseId } : {}) }
      : { role: { $in: ["superadmin", "admin", "counsellor", "franchise_superadmin", "franchise_counsellor"] } };
  const counsellors = await AdminUser.find(filter).select("name email role franchiseId").sort({ name: 1 }).lean();
  res.json({ ok: true, data: counsellors });
});

app.post("/api/admin/counsellors", requireAuth, requireFranchiseManager, async (req, res) => {
  const { name, email, password, role = "counsellor", franchiseId = "" } = req.body || {};
  if (!name || !email || !password) return sendError(res, 400, "Name, email, and password are required");
  if (String(password).length < 8) return sendError(res, 400, "Password must be at least 8 characters");
  if (!["superadmin", "admin", "counsellor", "franchise_superadmin", "franchise_counsellor"].includes(role)) return sendError(res, 400, "Invalid staff role");
  if (isFranchiseSuperAdmin(req.user) && role !== "franchise_counsellor") return sendError(res, 403, "Franchise super admin can create only franchise counsellors");
  if (isHeadBranchAdmin(req.user) && !["admin", "counsellor"].includes(role)) return sendError(res, 403, "Head admin can create only head office staff");
  if (role === "superadmin" && !isHeadSuperAdmin(req.user)) return sendError(res, 403, "Head super admin access required");
  if (!isHeadAdmin(req.user) && ["superadmin", "admin", "counsellor", "franchise_superadmin"].includes(role)) return sendError(res, 403, "Head admin access required");
  const assignedFranchiseId = isFranchiseSuperAdmin(req.user) || isHeadBranchAdmin(req.user) ? req.user.franchiseId : franchiseId;
  const needsAssignedCentre = ["admin", "counsellor", "franchise_superadmin", "franchise_counsellor"].includes(role);
  if (needsAssignedCentre && !mongoose.isValidObjectId(String(assignedFranchiseId || ""))) return sendError(res, 400, ["admin", "counsellor"].includes(role) ? "Branch is required" : "Franchise is required");
  if (needsAssignedCentre) {
    const expectedType = ["admin", "counsellor"].includes(role) ? "branch" : "franchise";
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
  const leadFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
  const studentFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };

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
  const leadFilter = { ...(await scopedDataFilter(req, req.query)), ...dateFilter(req.query) };
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

app.post("/api/admin/leads", requireAuth, leadDocumentUpload.fields([
  { name: "governmentProof", maxCount: 1 },
  { name: "highestQualificationCertificate", maxCount: 1 },
]), async (req, res) => {
  const body = req.body || {};
  const files = req.files || {};
  if (!body.fullName || !body.phone) return sendError(res, 400, "Full name and phone are required");
  const franchise = await resolveFranchiseFromRequest(req, body.centre || "");
  if (isFranchiseUser(req.user) && !franchise) return sendError(res, 403, "Franchise account is not assigned");
  const lead = await Lead.create({
    fullName: body.fullName,
    phone: normalizePhone(body.phone),
    parentMobile: normalizePhone(body.parentMobile || ""),
    email: body.email || "",
    governmentProof: saveLeadDocument(files.governmentProof?.[0]),
    highestQualificationCertificate: saveLeadDocument(files.highestQualificationCertificate?.[0]),
    source: body.source || "Website",
    centre: franchise?.name || body.centre || "",
    franchiseId: franchise?._id,
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
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  if (isFranchiseUser(req.user)) delete allowedLeadUpdates.centre;
  if (allowedLeadUpdates.centre && !isFranchiseUser(req.user)) {
    const franchise = await resolveFranchiseFromRequest(req, allowedLeadUpdates.centre);
    if (franchise) allowedLeadUpdates.franchiseId = franchise._id;
  }
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $set: allowedLeadUpdates }, { new: true, runValidators: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/activities", requireAuth, async (req, res) => {
  const { message, type = "note" } = req.body || {};
  if (!message) return sendError(res, 400, "Message is required");
  const existingLead = await Lead.findById(req.params.id).lean();
  if (!existingLead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, existingLead))) return sendError(res, 403, "You can access only permitted records");
  const lead = await Lead.findByIdAndUpdate(req.params.id, { $push: { activities: { type, message, by: req.user.name } } }, { new: true });
  if (!lead) return sendError(res, 404, "Lead not found");
  res.json({ ok: true, data: lead });
});

app.post("/api/admin/leads/:id/convert", requireAuth, async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return sendError(res, 404, "Lead not found");
  if (!(await canAccessRecord(req, lead))) return sendError(res, 403, "You can access only permitted records");
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
    franchiseId: lead.franchiseId,
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
  const record = await Model.findById(id).select(`${field} franchiseId`).lean();
  if (!record) return sendError(res, 404, "Document not found");
  if (!(await canAccessRecord(req, record))) return sendError(res, 403, "You can access only permitted records");
  const document = record?.[field];
  if (!document?.storedName) return sendError(res, 404, "Document not found");
  const filePath = path.join(leadDocumentDir, document.storedName);
  if (!filePath.startsWith(leadDocumentDir) || !fs.existsSync(filePath)) return sendError(res, 404, "Document not found");
  res.setHeader("Content-Type", document.mimeType || "application/octet-stream");
  res.download(filePath, document.originalName || "document");
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
  res.json({ ok: true, data: students, meta: paginationMeta(total, page, limit) });
});

app.get("/api/admin/attendance", requireAuth, async (req, res) => {
  const day = attendanceDate(req.query.date || "");
  if (!day) return sendError(res, 400, "Attendance date is required");
  const filter = { ...(await scopedDataFilter(req, req.query)), date: day };
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (isCounsellorAccount(req.user)) filter.counsellor = req.user.name;
  const attendance = await Attendance.find(filter).sort({ studentName: 1 }).lean();
  res.json({ ok: true, data: attendance });
});

app.get("/api/admin/attendance/logs", requireAuth, async (req, res) => {
  const filter = { ...(await scopedDataFilter(req, req.query)), ...attendanceRangeFilter(req.query) };
  if (req.query.status) filter.status = String(req.query.status);
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (req.query.studentId && mongoose.isValidObjectId(String(req.query.studentId))) filter.studentId = new mongoose.Types.ObjectId(String(req.query.studentId));
  if (req.query.student) filter.studentName = { $regex: String(req.query.student), $options: "i" };
  if (isCounsellorAccount(req.user)) filter.counsellor = req.user.name;
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
  if (req.query.batch) filter.batch = String(req.query.batch);
  if (req.query.course) filter.course = String(req.query.course);
  if (req.query.student) filter.studentName = { $regex: String(req.query.student), $options: "i" };
  if (isCounsellorAccount(req.user)) filter.counsellor = req.user.name;
  const { page, limit, skip } = paginationFromQuery(req.query);
  const groupStage = {
    _id: "$studentId",
    studentName: { $first: "$studentName" },
    centre: { $first: "$centre" },
    course: { $first: "$course" },
    batch: { $first: "$batch" },
    counsellor: { $first: "$counsellor" },
    total: { $sum: 1 },
    present: { $sum: { $cond: [{ $eq: ["$status", "Present"] }, 1, 0] } },
    absent: { $sum: { $cond: [{ $eq: ["$status", "Absent"] }, 1, 0] } },
    late: { $sum: { $cond: [{ $eq: ["$status", "Late"] }, 1, 0] } },
    leave: { $sum: { $cond: [{ $eq: ["$status", "Leave"] }, 1, 0] } },
    lastDate: { $max: "$date" },
  };
  const [countResult, summaries] = await Promise.all([
    Attendance.aggregate([{ $match: filter }, { $group: groupStage }, { $count: "total" }]),
    Attendance.aggregate([{ $match: filter }, { $group: groupStage }, { $sort: { studentName: 1 } }, { $skip: skip }, { $limit: limit }]),
  ]);
  const total = countResult[0]?.total || 0;
  res.json({ ok: true, data: summaries.map((item) => ({ ...item, studentId: item._id })), meta: paginationMeta(total, page, limit) });
});

app.post("/api/admin/attendance", requireAuth, async (req, res) => {
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
    if (isCounsellorAccount(req.user) && student.counsellor !== req.user.name) return sendError(res, 403, "Counsellors can mark only assigned students");
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
  const allowedStudentUpdates = (({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, centre, course, counsellor, batch, batchCommenceDate, admissionNumber, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementCompany, placementSalary, certificateNumber, certificateIssuedAt, certificateStatus }) => ({ fullName, phone, parentMobile, email, governmentProof, highestQualificationCertificate, centre, course, counsellor, batch, batchCommenceDate, admissionNumber, discountAmount, status, totalFee, paidAmount, emiEnabled, emiMonths, emiAmount, nextEmiDate, placementCompany, placementSalary, certificateNumber, certificateIssuedAt, certificateStatus }))(req.body || {});
  Object.keys(allowedStudentUpdates).forEach((key) => allowedStudentUpdates[key] === undefined && delete allowedStudentUpdates[key]);
  const feeFields = ["discountAmount", "totalFee", "paidAmount", "emiEnabled", "emiMonths", "emiAmount", "nextEmiDate"];
  if (!canManageFees(req.user) && feeFields.some((field) => Object.prototype.hasOwnProperty.call(allowedStudentUpdates, field))) {
    return sendError(res, 403, "Fee and payment updates are restricted to admin accounts");
  }
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  if (isFranchiseUser(req.user)) delete allowedStudentUpdates.centre;
  if (allowedStudentUpdates.centre && !isFranchiseUser(req.user)) {
    const franchise = await resolveFranchiseFromRequest(req, allowedStudentUpdates.centre);
    if (franchise) allowedStudentUpdates.franchiseId = franchise._id;
  }
  const student = await Student.findByIdAndUpdate(req.params.id, { $set: allowedStudentUpdates }, { new: true, runValidators: true });
  if (!student) return sendError(res, 404, "Student not found");
  res.json({ ok: true, data: student });
});

app.post("/api/admin/students/:id/certificate", requireAuth, async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, student))) return sendError(res, 403, "You can access only permitted records");
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
  if (!canManageFees(req.user)) return sendError(res, 403, "Fee and payment updates are restricted to admin accounts");
  const amount = Number(req.body?.amount || 0);
  if (amount <= 0) return sendError(res, 400, "Payment amount is required");
  const existingStudent = await Student.findById(req.params.id).lean();
  if (!existingStudent) return sendError(res, 404, "Student not found");
  if (!(await canAccessRecord(req, existingStudent))) return sendError(res, 403, "You can access only permitted records");
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    { $inc: { paidAmount: amount }, $push: { payments: { amount, mode: req.body?.mode || "Cash", note: req.body?.note || "", by: req.user.name }, activities: { type: "payment", message: `Payment received: ${amount}`, by: req.user.name } } },
    { new: true },
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
  const fee = Number(req.body?.fee || 0);
  if (fee < 0) return sendError(res, 400, "Course fee cannot be negative");
  const existingCourse = await Course.findById(req.params.id).lean();
  if (!existingCourse) return sendError(res, 404, "Course not found");
  if (isFranchiseUser(req.user) && existingCourse.franchiseId && String(existingCourse.franchiseId) !== String(req.user.franchiseId)) return sendError(res, 403, "You can update only your franchise course fees");
  if (isFranchiseUser(req.user) && !existingCourse.franchiseId) {
    const override = await Course.findOneAndUpdate(
      { code: existingCourse.code, name: existingCourse.name, franchiseId: req.user.franchiseId },
      { $set: { fee, duration: existingCourse.duration, active: true } },
      { new: true, upsert: true, runValidators: true },
    );
    return res.json({ ok: true, data: override });
  }
  const course = await Course.findByIdAndUpdate(req.params.id, { $set: { fee } }, { new: true, runValidators: true });
  res.json({ ok: true, data: course });
});

app.get("/api/admin/batches", requireAuth, async (req, res) => {
  const branchScope = isHeadBranchScoped(req.user) ? await headOfficeBranchScope(req.user) : null;
  const filter = isFranchiseUser(req.user)
    ? { active: true, franchiseId: req.user.franchiseId || emptyObjectId }
    : isHeadBranchScoped(req.user)
      ? { active: true, $or: [{ franchiseId: { $in: branchScope.ids } }, { centre: { $in: branchScope.names } }] }
      : { active: true };
  const batches = await Batch.find(filter).sort({ commenceDate: -1, name: 1 }).lean();
  res.json({ ok: true, data: batches });
});

app.post("/api/admin/batches", requireAuth, requireFranchiseManager, async (req, res) => {
  if (!req.body?.name) return sendError(res, 400, "Batch name is required");
  if (!req.body?.commenceDate) return sendError(res, 400, "Batch commence date is required");
  const franchise = await resolveFranchiseFromRequest(req, req.body.centre || "");
  if (isFranchiseUser(req.user) && !franchise) return sendError(res, 403, "Franchise account is not assigned");
  const batch = await Batch.create({
    name: req.body.name,
    centre: franchise?.name || req.body.centre || "",
    franchiseId: franchise?._id,
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
