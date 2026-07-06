import { Dispatch, FormEvent, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";
import Lottie from "lottie-react";
import { Toaster, toast } from "sonner";
import imedLogo from "../Ocha/36b610493eb683f0e81e17848fd143c365f117fd.png";
import IMedCertificate from "./IMedCertificate";
import courseIncompleteAnimation from "./courseIncompleteLottie.json";
import {
  ArrowRight,
  Award,
  BadgeIndianRupee,
  BarChart3,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  CircleDollarSign,
  Download,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  PhoneCall,
  Plus,
  Printer,
  ReceiptText,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  UserPlus,
  Users,
} from "lucide-react";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");
const stages = ["New Lead", "Contacted", "Demo / Visit", "Counselling", "Enrolled", "In Training", "Course Completed", "Placed"];
const studentStatuses = ["Enrolled", "In Training", "Course Completed", "Placed"];
const attendanceStatuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Leave"];
const sources = ["Meta", "BTL", "College", "Referral"];
const courseFees: Record<string, number> = { HA: 35000, EMT: 35000, GDA: 18000, OCHA: 30000, ACHA: 25000 };
const GST_RATE = 0.18;
const osCentres = ["Delhi", "Kochi", "Bangalore"];
const osCourses = ["HA", "EMT", "GDA", "OCHA", "ACHA"];
const leadDocumentMaxSize = 2 * 1024 * 1024;
const leadDocumentHelpText = "Supported: PDF, JPG, JPEG, PNG, WEBP. Max 2 MB.";
const defaultPageSize = 25;
const defaultBillingEntity = {
  legalName: "IMED HEALTHCARE ACADEMY LLP",
  address: "PLOT NO. J-143, BLK-N, SECTOR-3, DSIDC CITY, Bawana Police Station, BAWANA, New Delhi, North West Delhi, Delhi, 110039",
  gstin: "07AALFI7868F1ZT",
  stateName: "Delhi",
  stateCode: "07",
  email: "contact@imedacademy.in",
  phone: "",
  bankAccountName: "IMED HEALTHCARE ACADEMY LLP",
  bankName: "IDFC FIRST Bank",
  bankAccountNumber: "102699073151",
  bankIfsc: "IDFB0020130",
  bankBranch: "TWA Delhi Mayur Vihar Branch",
};

type PaginationMeta = { page: number; limit: number; total: number; pages: number; hasPrev: boolean; hasNext: boolean };
type ApiResult<T> = { ok: boolean; data?: T; meta?: PaginationMeta; message?: string; token?: string; user?: AdminUser };
type AdminUser = { name: string; email: string; role: string; franchiseId?: string };
type DocumentFile = { originalName?: string; storedName?: string; mimeType?: string; size?: number; uploadedAt?: string };
type Lead = { _id: string; fullName: string; phone: string; parentMobile?: string; email?: string; governmentProof?: DocumentFile; highestQualificationCertificate?: DocumentFile; source?: string; centre?: string; franchiseId?: string; course?: string; counsellor?: string; stage: string; priority?: string; city?: string; expectedFee?: number; notes?: string; createdAt?: string; updatedAt?: string };
type PaymentRecord = { amount?: number; mode?: string; note?: string; by?: string; paidAt?: string };
type ReceiptSelection = { type: "invoice" } | { type: "payment"; index: number };
type Student = { _id: string; fullName: string; phone: string; parentMobile?: string; email?: string; governmentProof?: DocumentFile; highestQualificationCertificate?: DocumentFile; centre?: string; franchiseId?: string; course?: string; counsellor?: string; batch?: string; batchCommenceDate?: string; status: string; totalFee?: number; paidAmount?: number; admissionNumber?: string; discountAmount?: number; emiEnabled?: boolean; emiMonths?: number; emiAmount?: number; nextEmiDate?: string; certificateNumber?: string; certificateIssuedAt?: string; certificateStatus?: string; payments?: PaymentRecord[]; createdAt?: string; updatedAt?: string };
type Centre = {
  _id: string;
  name: string;
  type?: "branch" | "franchise";
  city?: string;
  billingLegalName?: string;
  billingAddress?: string;
  billingGstin?: string;
  billingStateName?: string;
  billingStateCode?: string;
  billingEmail?: string;
  billingPhone?: string;
  bankAccountName?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankIfsc?: string;
  bankBranch?: string;
};
type Course = { _id: string; name: string; code?: string; fee?: number; duration?: string; franchiseId?: string };
type Counsellor = { _id?: string; name: string; email: string; role: string; franchiseId?: string };
type Batch = { _id: string; name: string; centre?: string; franchiseId?: string; course?: string; commenceDate: string };
type Attendance = { _id?: string; studentId: string; studentName?: string; date?: string; status: "Present" | "Absent" | "Late" | "Leave"; note?: string; centre?: string; franchiseId?: string; batch?: string; course?: string; counsellor?: string; markedBy?: string };
type AttendanceSummary = { studentId: string; studentName?: string; centre?: string; course?: string; batch?: string; counsellor?: string; total: number; present: number; absent: number; late: number; leave: number; lastDate?: string };
type Summary = { leadsThisMonth: number; totalLeads: number; enrolled: number; training: number; placed: number; lost: number; students: number; conversion: number; revenue: number; pending: number };
type AttendanceStatus = Attendance["status"];
type Panel = "dashboard" | "leads" | "add" | "admissions" | "students" | "myStudents" | "attendance" | "attendanceLogs" | "attendanceDetail" | "batchStrength" | "finance" | "emi" | "receipts" | "certificates" | "settings" | "profile";
type RoleScope = "all" | string;
type DatePreset = "all" | "today" | "yesterday" | "specific";
type ProfileTarget = { type: "lead"; data: Lead } | { type: "student"; data: Student } | null;

const navGroups: { group: string; items: { key: Panel; label: string; icon: ReactNode }[] }[] = [
  {
    group: "Admissions",
    items: [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
      { key: "leads", label: "Leads", icon: <PhoneCall size={18} /> },
      { key: "add", label: "Add lead", icon: <Plus size={18} /> },
      { key: "admissions", label: "Admissions", icon: <ClipboardList size={18} /> },
      { key: "batchStrength", label: "Batch strength", icon: <Users size={18} /> },
    ],
  },
  {
    group: "Students",
    items: [
      { key: "myStudents", label: "My students", icon: <UserRound size={18} /> },
      { key: "attendance", label: "Attendance", icon: <CheckCircle2 size={18} /> },
      { key: "attendanceLogs", label: "Attendance logs", icon: <FileText size={18} /> },
      { key: "students", label: "All students", icon: <GraduationCap size={18} /> },
      { key: "receipts", label: "Receipts", icon: <ReceiptText size={18} /> },
      { key: "certificates", label: "Certificates", icon: <Award size={18} /> },
    ],
  },
  {
    group: "Finance",
    items: [
      { key: "finance", label: "Finance", icon: <BadgeIndianRupee size={18} /> },
      { key: "emi", label: "EMI reminders", icon: <CalendarDays size={18} /> },
      { key: "settings", label: "Settings", icon: <ShieldCheck size={18} /> },
    ],
  },
];

function formatCurrency(value = 0) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function formatInvoiceAmount(value = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0);
}

function normalizeCourseKey(value = "") {
  return String(value).trim().toUpperCase();
}

function dateInputValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateInputValueFromOffset(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return dateInputValue(date);
}

function courseMatchesSelection(course: Course, selectedCourse = "") {
  const selected = normalizeCourseKey(selectedCourse);
  const code = normalizeCourseKey(course.code);
  const name = normalizeCourseKey(course.name);
  return code === selected || name === selected || name.includes(`(${selected})`);
}

function courseFeeFromCatalog(courses: Course[], selectedCourse = "") {
  const course = courses.find((item) => courseMatchesSelection(item, selectedCourse));
  if (course?.fee && course.fee > 0) return course.fee;
  return courseFees[normalizeCourseKey(selectedCourse)];
}

function feeWithGst(baseFee = 0) {
  return Math.round((baseFee || 0) * (1 + GST_RATE));
}

function courseFeeWithGst(courses: Course[], selectedCourse = "") {
  return feeWithGst(courseFeeFromCatalog(courses, selectedCourse) || 0);
}

function courseShortCode(course = "") {
  const normalized = normalizeCourseKey(course);
  if (!normalized) return "-";
  if (["HA", "EMT", "GDA", "OCHA", "ACHA"].includes(normalized)) return normalized;
  if (normalized.includes("EMERGENCY MEDICAL TECHNICIAN")) return "EMT";
  if (normalized.includes("GENERAL DUTY")) return "GDA";
  if (normalized.includes("ONLINE") && normalized.includes("HOSPITAL ADMINISTRATION")) return "OCHA";
  if (normalized.includes("ADVANCE") || normalized.includes("ADVANCED")) return "ACHA";
  if (normalized.includes("HOSPITAL ADMINISTRATION")) return "HA";
  return course;
}

function billingEntityForStudent(student: Student, centres: Centre[]) {
  const centre = centres.find((item) => item.name === student.centre);
  return {
    legalName: centre?.billingLegalName || defaultBillingEntity.legalName,
    address: centre?.billingAddress || defaultBillingEntity.address,
    gstin: centre?.billingGstin || defaultBillingEntity.gstin,
    stateName: centre?.billingStateName || defaultBillingEntity.stateName,
    stateCode: centre?.billingStateCode || defaultBillingEntity.stateCode,
    email: centre?.billingEmail || defaultBillingEntity.email,
    phone: centre?.billingPhone || defaultBillingEntity.phone,
    bankAccountName: centre?.bankAccountName || defaultBillingEntity.bankAccountName,
    bankName: centre?.bankName || defaultBillingEntity.bankName,
    bankAccountNumber: centre?.bankAccountNumber || defaultBillingEntity.bankAccountNumber,
    bankIfsc: centre?.bankIfsc || defaultBillingEntity.bankIfsc,
    bankBranch: centre?.bankBranch || defaultBillingEntity.bankBranch,
  };
}

function centreKindLabel(centre?: Pick<Centre, "type">) {
  return centre?.type === "branch" ? "Branch" : "Franchise";
}

function staffRoleLabel(role = "") {
  return role === "superadmin" ? "Head Super Admin" : role === "admin" ? "Head Admin" : role === "franchise_superadmin" ? "Franchise Super Admin" : role === "franchise_counsellor" ? "Franchise Counsellor" : "Counsellor";
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function certificateMessage(student: Student) {
  const certNo = student.certificateNumber || "pending";
  const issuedAt = formatDate(student.certificateIssuedAt);
  const verify = student.certificateNumber ? certificateVerifyUrl(student.certificateNumber) : "";
  return `Congratulations ${student.fullName}! Your iMED Academy certificate for ${student.course || "your course"} has been issued. Certificate No: ${certNo}. Issued on: ${issuedAt}.${verify ? ` Verify here: ${verify}` : ""}`;
}

function whatsappUrlFor(phone: string, message: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  const phoneNumber = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function whatsappWebUrlFor(phone: string, message: string) {
  const digits = String(phone || "").replace(/\D/g, "");
  const phoneNumber = digits.length === 10 ? `91${digits}` : digits;
  return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
}

function whatsappWebUrl(student: Student) {
  return whatsappWebUrlFor(student.phone, certificateMessage(student));
}

function certificateVerifyUrl(certificateNumber: string) {
  const baseUrl = typeof window === "undefined" ? "https://imedacademy.in/" : `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}#verify=${encodeURIComponent(certificateNumber)}`;
}

function isCertificateEligible(student: Student) {
  return ["Course Completed", "Placed"].includes(student.status) || student.certificateStatus === "Issued";
}

function documentLabel(document?: DocumentFile) {
  return document?.originalName || "Not uploaded";
}

function invoiceNumber(student: Student) {
  const year = new Date(student.createdAt || Date.now()).getFullYear();
  const suffix = String(student.admissionNumber || student._id || "0001").replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase();
  return `INV/${year}/${suffix || "0001"}`;
}

function numberToIndianWords(value = 0) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const twoDigits = (num: number) => {
    if (num < 20) return ones[num];
    return `${tens[Math.floor(num / 10)]}${num % 10 ? ` ${ones[num % 10]}` : ""}`;
  };
  const threeDigits = (num: number) => {
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    return `${hundred ? `${ones[hundred]} Hundred` : ""}${hundred && rest ? " " : ""}${rest ? twoDigits(rest) : ""}`.trim();
  };
  let amount = Math.round(Math.max(0, value || 0));
  if (!amount) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(amount / 10000000);
  amount %= 10000000;
  const lakh = Math.floor(amount / 100000);
  amount %= 100000;
  const thousand = Math.floor(amount / 1000);
  amount %= 1000;
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (amount) parts.push(threeDigits(amount));
  return parts.join(" ");
}

function printInvoiceOnly() {
  const cleanup = () => {
    document.body.classList.remove("print-invoice-only");
    window.removeEventListener("afterprint", cleanup);
  };
  document.body.classList.add("print-invoice-only");
  window.addEventListener("afterprint", cleanup);
  window.print();
  window.setTimeout(cleanup, 1200);
}

function excelText(value?: string | number) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadExcelFile(headers: string[], rows: (string | number | undefined)[][], filename: string, emptyMessage: string) {
  if (!rows.length) {
    toast.message(emptyMessage);
    return;
  }

  const tableRows = [
    `<tr>${headers.map((header) => `<th>${excelText(header)}</th>`).join("")}</tr>`,
    ...rows.map((row) => `<tr>${row.map((cell) => `<td>${excelText(cell)}</td>`).join("")}</tr>`),
  ].join("");
  const html = `<!doctype html><html><head><meta charset="utf-8" /></head><body><table>${tableRows}</table></body></html>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `${filename}-${date}.xls`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadLeadsExcel(leads: Lead[]) {
  downloadExcelFile(
    ["Full Name", "Phone", "Parent Mobile No.", "Email", "Government Proof", "Highest Educational Qualification Certificate", "Source", "Centre", "Course", "Counsellor", "Stage", "Priority", "City", "Expected Fee", "Notes", "Created At"],
    leads.map((lead) => [
      lead.fullName,
      lead.phone,
      lead.parentMobile,
      lead.email,
      documentLabel(lead.governmentProof),
      documentLabel(lead.highestQualificationCertificate),
      lead.source,
      lead.centre,
      lead.course,
      ownerLabel(lead),
      lead.stage,
      lead.priority,
      lead.city,
      lead.expectedFee,
      lead.notes,
      lead.createdAt ? formatDate(lead.createdAt) : "",
    ]),
    "imed-leads",
    "No leads available to download",
  );
}

function normalizeImportHeader(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function parseDelimitedRows(text: string, delimiter: "," | "\t") {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        cell += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
      continue;
    }

    if (!quoted && char === delimiter) {
      row.push(cell.trim());
      cell = "";
      continue;
    }

    if (!quoted && (char === "\n" || char === "\r")) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += char;
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function parseLeadImportRows(fileText: string, filename = "") {
  const trimmed = fileText.trim();
  let rows: string[][] = [];

  if (/^\s*</.test(trimmed)) {
    const document = new DOMParser().parseFromString(fileText, "text/html");
    rows = Array.from(document.querySelectorAll("tr")).map((row) =>
      Array.from(row.querySelectorAll("th,td")).map((cell) => cell.textContent?.trim() || ""),
    );
  } else {
    const delimiter = filename.toLowerCase().endsWith(".tsv") || fileText.includes("\t") ? "\t" : ",";
    rows = parseDelimitedRows(fileText, delimiter);
  }

  const [headerRow, ...dataRows] = rows.filter((row) => row.some((cell) => String(cell || "").trim()));
  if (!headerRow) return [];

  const headerIndex = new Map(headerRow.map((header, index) => [normalizeImportHeader(header), index]));
  const read = (row: string[], labels: string[]) => {
    for (const label of labels) {
      const index = headerIndex.get(normalizeImportHeader(label));
      if (index !== undefined) return row[index]?.trim() || "";
    }
    return "";
  };

  return dataRows
    .map((row, index): Lead => {
      const expectedFee = Number(read(row, ["Expected Fee", "Fee"]).replace(/[^\d.-]/g, ""));
      return {
        _id: `excel-${Date.now()}-${index}`,
        fullName: read(row, ["Full Name", "Name", "Student Name"]) || "Imported lead",
        phone: read(row, ["Phone", "Mobile", "Phone Number"]),
        parentMobile: read(row, ["Parent Mobile No.", "Parent Mobile", "Parent Phone"]),
        email: read(row, ["Email", "Email Address"]),
        governmentProof: read(row, ["Government Proof"]) ? { originalName: read(row, ["Government Proof"]) } : undefined,
        highestQualificationCertificate: read(row, ["Highest Educational Qualification Certificate", "Qualification Certificate"]) ? { originalName: read(row, ["Highest Educational Qualification Certificate", "Qualification Certificate"]) } : undefined,
        source: read(row, ["Source"]),
        centre: read(row, ["Centre", "Center"]),
        course: read(row, ["Course"]),
        counsellor: read(row, ["Counsellor", "Counselor"]),
        stage: read(row, ["Stage"]) || "New Lead",
        priority: read(row, ["Priority"]),
        city: read(row, ["City"]),
        expectedFee: Number.isFinite(expectedFee) ? expectedFee : undefined,
        notes: read(row, ["Notes", "Note"]),
        createdAt: read(row, ["Created At", "Created"]),
      };
    })
    .filter((lead) => lead.fullName || lead.phone || lead.email);
}

async function parseLeadImportFile(file: File) {
  if (file.name.toLowerCase().endsWith(".xlsx")) {
    const XLSX = await import("xlsx");
    const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
    const firstSheet = workbook.SheetNames[0];
    if (!firstSheet) return [];
    const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[firstSheet]);
    return parseLeadImportRows(csv, `${file.name}.csv`);
  }

  return parseLeadImportRows(await file.text(), file.name);
}

function leadImportFormData(lead: Lead) {
  const formData = new FormData();
  const fields: (keyof Lead)[] = ["fullName", "phone", "parentMobile", "email", "source", "centre", "course", "counsellor", "stage", "priority", "city", "expectedFee", "notes"];

  fields.forEach((field) => {
    const value = lead[field];
    if (value !== undefined && value !== null) formData.set(field, String(value));
  });

  if (!formData.get("source")) formData.set("source", "Excel Import");
  if (!formData.get("stage")) formData.set("stage", "New Lead");
  if (!formData.get("priority")) formData.set("priority", "Warm");
  if (!formData.get("counsellor")) formData.set("counsellor", "Unassigned");
  return formData;
}

function downloadStudentsExcel(students: Student[]) {
  downloadExcelFile(
    ["Student Name", "Admission No.", "Phone", "Parent Mobile No.", "Email", "Government Proof", "Highest Educational Qualification Certificate", "Course", "Centre", "Counsellor", "Batch", "Status", "Total Fee", "Discount", "Paid", "Due", "EMI Enabled", "EMI Months", "EMI Amount", "Next EMI Date", "Certificate No.", "Certificate Status", "Created At"],
    students.map((student) => {
      const due = studentDueAmount(student);
      return [
        student.fullName,
        student.admissionNumber,
        student.phone,
        student.parentMobile,
        student.email,
        documentLabel(student.governmentProof),
        documentLabel(student.highestQualificationCertificate),
        student.course,
        student.centre,
        ownerLabel(student),
        student.batch,
        student.status,
        student.totalFee,
        student.discountAmount,
        student.paidAmount,
        due,
        student.emiEnabled ? "Yes" : "No",
        student.emiMonths,
        student.emiAmount,
        student.nextEmiDate ? formatDate(student.nextEmiDate) : "",
        student.certificateNumber,
        student.certificateStatus,
        student.createdAt ? formatDate(student.createdAt) : "",
      ];
    }),
    "imed-students",
    "No students available to download",
  );
}

function downloadAttendanceExcel(records: Attendance[]) {
  downloadExcelFile(
    ["Date", "Student", "Status", "Course", "Batch", "Centre", "Counsellor", "Marked By", "Note"],
    records.map((record) => [
      formatDate(record.date),
      record.studentName,
      record.status,
      courseShortCode(record.course),
      record.batch,
      record.centre,
      record.counsellor,
      record.markedBy,
      record.note,
    ]),
    "attendance-logs.xls",
    "No attendance logs to export",
  );
}

function attendanceStatusShort(status?: AttendanceStatus) {
  const labels: Record<AttendanceStatus, string> = { Present: "P", Absent: "A", Late: "L", Leave: "LV" };
  return status ? labels[status] : "";
}

function downloadEmiRemindersExcel(students: Student[]) {
  const rows = getEmiReminderRows(students);
  downloadExcelFile(
    ["Student Name", "Phone", "Course", "Centre", "Counsellor", "Monthly EMI Due", "Total Balance", "Next Due Date", "Reminder Status"],
    rows.map(({ student, due, emiDue, days }) => [
      student.fullName,
      student.phone,
      student.course,
      student.centre,
      ownerLabel(student),
      emiDue,
      due,
      student.nextEmiDate ? formatDate(student.nextEmiDate) : "",
      emiStatusLabel(days),
    ]),
    "imed-emi-reminders",
    "No EMI reminders available to download",
  );
}

function ownerLabel(person: Pick<Lead | Student, "counsellor" | "centre">) {
  if (person.counsellor === "Priya") return person.centre || "Bangalore";
  return person.counsellor || "Unassigned";
}

async function downloadDocument(type: "lead" | "student", id: string, field: "governmentProof" | "highestQualificationCertificate", filename = "document") {
  const token = localStorage.getItem("imed_crm_token") || "";
  const response = await fetch(`${API_BASE_URL}/api/admin/documents/${type}/${id}/${field}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Unable to download document");
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function paymentMessage(student: Student, amount: number, mode = "Cash") {
  const totalFee = student.totalFee || 0;
  const discount = student.discountAmount || 0;
  const paid = student.paidAmount || 0;
  const due = Math.max(0, totalFee - discount - paid);
  const remainingText = due > 0 ? `Remaining balance: ${formatCurrency(due)}.` : "Your fee is paid in full.";
  const modeText = mode === "EMI" ? "EMI payment" : "payment";
  const nextEmiText = mode === "EMI" && student.nextEmiDate ? ` Next EMI due date: ${formatDate(student.nextEmiDate)}.` : "";
  return `Dear ${student.fullName}, iMED Academy has received your ${modeText} of ${formatCurrency(amount)} for ${student.course || "your course"}. Total paid: ${formatCurrency(paid)}. ${remainingText}${nextEmiText} Thank you.`;
}

function studentDueAmount(student: Student) {
  return Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0));
}

function studentEmiDueAmount(student: Student) {
  const due = studentDueAmount(student);
  const plannedEmi = student.emiAmount || due;
  return Math.max(0, Math.min(plannedEmi, due));
}

function localDateKey(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function daysBetweenToday(value?: string) {
  const key = localDateKey(value);
  if (!key) return 9999;
  const [year, month, day] = key.split("-").map(Number);
  const dueDate = new Date(year, month - 1, day).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((dueDate - today) / 86400000);
}

function emiReminderMessage(student: Student) {
  const due = studentDueAmount(student);
  const emiAmount = studentEmiDueAmount(student);
  const dateText = student.nextEmiDate ? formatDate(student.nextEmiDate) : "today";
  return `Dear ${student.fullName}, this is a reminder from iMED Academy. Your EMI installment of ${formatCurrency(emiAmount)} for ${student.course || "your course"} is due on ${dateText}. Total remaining balance: ${formatCurrency(due)}. Please complete the payment. Thank you.`;
}

function printCertificateOnly() {
  const cleanup = () => {
    document.body.classList.remove("print-certificate-only");
    window.removeEventListener("afterprint", cleanup);
  };
  document.body.classList.add("print-certificate-only");
  window.addEventListener("afterprint", cleanup);
  window.print();
  window.setTimeout(cleanup, 1200);
}

async function createCertificatePdf(student: Student) {
  const certificateFrame = document.querySelector(".imed-certificate-exact-frame") as HTMLElement | null;
  const certificateSource = certificateFrame?.firstElementChild as HTMLElement | null;
  if (!certificateFrame || !certificateSource) throw new Error("Open the certificate preview before sharing");

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  await document.fonts?.ready;
  await Promise.all(
    Array.from(certificateFrame.querySelectorAll("img")).map((img) => {
      if (img.complete) return Promise.resolve();
      return img.decode?.().catch(() => undefined) || Promise.resolve();
    }),
  );

  const certificateWidth = 3508;
  const certificateHeight = 2480;
  const renderHost = document.createElement("div");
  const certificateClone = certificateSource.cloneNode(true) as HTMLElement;
  renderHost.style.position = "fixed";
  renderHost.style.left = "-10000px";
  renderHost.style.top = "0";
  renderHost.style.width = `${certificateWidth}px`;
  renderHost.style.height = `${certificateHeight}px`;
  renderHost.style.overflow = "hidden";
  renderHost.style.background = "#ffffff";
  renderHost.style.pointerEvents = "none";
  renderHost.style.zIndex = "-1";
  certificateClone.style.width = `${certificateWidth}px`;
  certificateClone.style.height = `${certificateHeight}px`;
  certificateClone.style.maxWidth = "none";
  certificateClone.style.margin = "0";
  certificateClone.style.transform = "none";
  certificateClone.style.transformOrigin = "top left";
  renderHost.appendChild(certificateClone);
  document.body.appendChild(renderHost);

  try {
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    makeHtml2CanvasSafeColors(renderHost);
    const canvas = await html2canvas(renderHost, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      width: certificateWidth,
      height: certificateHeight,
      windowWidth: certificateWidth,
      windowHeight: certificateHeight,
    });
    const image = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [certificateWidth, certificateHeight],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(image, "PNG", 0, 0, certificateWidth, certificateHeight);
    const filename = `${(student.certificateNumber || student.fullName || "imed-certificate").replace(/[^\w-]+/g, "-")}.pdf`;
    return { blob: pdf.output("blob"), filename };
  } finally {
    renderHost.remove();
  }
}

async function createVisibleReceiptPdf(filenameBase = "imed-receipt") {
  const receiptElement = document.querySelector(".invoice-card .tax-invoice") as HTMLElement | null;
  if (!receiptElement) throw new Error("Open the receipt before sharing");

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  await document.fonts?.ready;
  const width = Math.ceil(receiptElement.scrollWidth || receiptElement.offsetWidth || 820);
  const height = Math.ceil(receiptElement.scrollHeight || receiptElement.offsetHeight || 1120);
  const renderHost = document.createElement("div");
  const clone = receiptElement.cloneNode(true) as HTMLElement;
  renderHost.style.position = "fixed";
  renderHost.style.left = "-10000px";
  renderHost.style.top = "0";
  renderHost.style.width = `${width}px`;
  renderHost.style.minHeight = `${height}px`;
  renderHost.style.background = "#ffffff";
  renderHost.style.pointerEvents = "none";
  renderHost.style.zIndex = "-1";
  clone.style.width = `${width}px`;
  clone.style.maxWidth = "none";
  clone.style.margin = "0";
  renderHost.appendChild(clone);
  document.body.appendChild(renderHost);

  try {
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    makeHtml2CanvasSafeColors(renderHost);
    const canvas = await html2canvas(renderHost, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      logging: false,
      width,
      height,
      windowWidth: width,
      windowHeight: height,
    });
    const pdf = new jsPDF({
      orientation: width > height ? "landscape" : "portrait",
      unit: "px",
      format: [width, height],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, width, height);
    const filename = `${filenameBase.replace(/[^\w-]+/g, "-")}.pdf`;
    return { blob: pdf.output("blob"), filename };
  } finally {
    renderHost.remove();
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function shareReceiptPdf(student: Student, message: string, filenameBase: string) {
  const { blob, filename } = await createVisibleReceiptPdf(filenameBase);
  const file = new File([blob], filename, { type: "application/pdf" });
  const navigatorWithShare = navigator as Navigator & {
    canShare?: (data: ShareData) => boolean;
  };

  if (navigator.share && (!navigatorWithShare.canShare || navigatorWithShare.canShare({ files: [file] }))) {
    await navigator.share({ files: [file], title: filename.replace(/\.pdf$/i, ""), text: message });
    return;
  }

  downloadBlob(blob, filename);
  window.open(whatsappUrlFor(student.phone, `${message}\n\nPDF downloaded. Please attach the downloaded receipt PDF in this chat.`), "_blank", "noopener,noreferrer");
  toast.message("Receipt PDF downloaded. Attach it in the WhatsApp chat that opened.");
}

function makeHtml2CanvasSafeColors(root: HTMLElement) {
  const fallbackByProperty: Record<string, string> = {
    color: "#061633",
    backgroundColor: "#ffffff",
    borderColor: "rgba(0, 0, 0, 0)",
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderRightColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderLeftColor: "rgba(0, 0, 0, 0)",
    outlineColor: "rgba(0, 0, 0, 0)",
    textDecorationColor: "#061633",
    caretColor: "#061633",
    fill: "#061633",
    stroke: "#061633",
  };
  const colorProperties = Object.keys(fallbackByProperty);
  const cssName = (property: string) => property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
  const nodes = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  nodes.forEach((node) => {
    const computed = window.getComputedStyle(node);
    colorProperties.forEach((property) => {
      const value = String(computed.getPropertyValue(cssName(property)) || "");
      if (!value || value === "none") return;
      const safeValue = /oklch|lab\(|lch\(|color\(/i.test(value) ? fallbackByProperty[String(property)] : value;
      node.style.setProperty(cssName(property), safeValue);
    });
  });
}

async function shareCertificatePdf(student: Student) {
  window.open(whatsappWebUrl(student), "_blank", "noopener,noreferrer");
  toast.message("WhatsApp Web opened. Use Print / Save PDF only when you need to download the certificate.");
}

function courseDuration(course = "") {
  const normalized = course.toUpperCase();
  if (normalized.includes("GDA")) return "4 MONTHS";
  if (normalized.includes("OCHA")) return "6 MONTHS";
  if (normalized.includes("ACHA")) return "6 MONTHS";
  return "6 MONTHS";
}

function certificateCourseName(course = "") {
  const normalized = course.trim().toUpperCase();
  const courseNames: Record<string, string> = {
    GDA: "General Duty Assistance (GDA)",
    EMT: "Emergency Medical Technician (EMT)",
    HA: "Hospital Administration (HA)",
    OCHA: "Online Certificate in Hospital Administration (OCHA)",
    ACHA: "Advance Certification in Hospital Administration (ACHA)",
  };
  if (courseNames[normalized]) return courseNames[normalized];
  if (!course) return "Healthcare Skill Development Course";
  return course;
}

export default function AdminCrm() {
  const [token, setToken] = useState(localStorage.getItem("imed_crm_token") || "");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [panel, setPanel] = useState<Panel>("dashboard");
  const [previousPanel, setPreviousPanel] = useState<Panel>("dashboard");
  const [roleScope, setRoleScope] = useState<RoleScope>("all");
  const [profile, setProfile] = useState<ProfileTarget>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [funnel, setFunnel] = useState<{ stage: string; count: number }[]>([]);
  const [centreStats, setCentreStats] = useState<{ centre: string; leads: number; enrolled: number }[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [attendanceDateValue, setAttendanceDateValue] = useState(dateInputValue());
  const [attendanceDraft, setAttendanceDraft] = useState<Record<string, { status: AttendanceStatus; note: string }>>({});
  const [attendanceLogs, setAttendanceLogs] = useState<Attendance[]>([]);
  const [attendanceSummaries, setAttendanceSummaries] = useState<AttendanceSummary[]>([]);
  const [selectedAttendanceStudent, setSelectedAttendanceStudent] = useState<AttendanceSummary | null>(null);
  const [attendanceLogMeta, setAttendanceLogMeta] = useState<PaginationMeta | null>(null);
  const [attendanceLogPage, setAttendanceLogPage] = useState(1);
  const [attendanceLogFilters, setAttendanceLogFilters] = useState({ dateFrom: "", dateTo: "", status: "", student: "", course: "", batch: "" });
  const [attendanceDetailFilters, setAttendanceDetailFilters] = useState({ dateFrom: "", dateTo: "", status: "" });
  const [leadPage, setLeadPage] = useState(1);
  const [studentPage, setStudentPage] = useState(1);
  const [leadMeta, setLeadMeta] = useState<PaginationMeta | null>(null);
  const [studentMeta, setStudentMeta] = useState<PaginationMeta | null>(null);
  const [centres, setCentres] = useState<Centre[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [filters, setFilters] = useState({ q: "", stage: "", centre: "", course: "" });
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [staffSearch, setStaffSearch] = useState("");
  const [billingSearch, setBillingSearch] = useState("");
  const [selectedBillingCentreId, setSelectedBillingCentreId] = useState("");
  const isHeadAdmin = user?.role === "superadmin" || user?.role === "admin";
  const isHeadSuperAdmin = user?.role === "superadmin";
  const isHeadBranchAdmin = user?.role === "admin";
  const isSuperAdmin = isHeadAdmin;
  const isFranchiseSuperAdmin = user?.role === "franchise_superadmin";
  const isFranchiseUser = user?.role === "franchise_superadmin" || user?.role === "franchise_counsellor";
  const isCounsellorAccount = user?.role === "counsellor" || user?.role === "franchise_counsellor";
  const canUseAttendance = isHeadAdmin || isFranchiseSuperAdmin || isCounsellorAccount;
  const canManageSettings = isHeadAdmin || isFranchiseSuperAdmin;
  const canAssignCounsellors = isHeadAdmin || isFranchiseSuperAdmin;
  const canManageFees = isHeadAdmin || isFranchiseSuperAdmin || isCounsellorAccount;
  const authedHeaders = useMemo(() => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }), [token]);
  const selectedFranchise = isHeadSuperAdmin && roleScope !== "all" ? centres.find((centre) => centre._id === roleScope) : undefined;
  const scopedCentre = "";
  const scopedCounsellor = "";
  const activeFranchise = centres.find((centre) => centre._id === user?.franchiseId) || centres[0];
  const centreOptions = centres.length ? centres.map((centre) => centre.name) : osCentres;
  const selectedBillingCentre = centres.find((centre) => centre._id === selectedBillingCentreId) || centres[0];
  const filteredBillingCentres = centres.filter((centre) => {
    const search = billingSearch.trim().toLowerCase();
    if (!search) return true;
    return [centre.name, centre.city, centre.type, centre.billingLegalName, centre.billingGstin].some((value) => String(value || "").toLowerCase().includes(search));
  });
  const visibleBillingCentres = filteredBillingCentres.length ? filteredBillingCentres : selectedBillingCentre ? [selectedBillingCentre] : [];
  const filteredCounsellors = counsellors.filter((item) => {
    const search = staffSearch.trim().toLowerCase();
    if (!search) return true;
    const centre = centres.find((entry) => entry._id === item.franchiseId);
    return [item.name, item.email, item.role, centre?.name].some((value) => String(value || "").toLowerCase().includes(search));
  });
  const scopedFranchiseId = isFranchiseUser ? user?.franchiseId || "" : isHeadSuperAdmin ? selectedFranchise?._id || "" : "";
  const studentCounsellorScope = isCounsellorAccount && (panel === "myStudents" || panel === "attendance" || panel === "receipts") ? user?.name || "" : scopedCounsellor;
  const allowedCounsellorPanels = new Set<Panel>(["dashboard", "myStudents", "attendance", "attendanceLogs", "receipts"]);
  const hiddenForCounsellor = new Set<Panel>(["students", "batchStrength", "finance", "emi", "certificates", "settings"]);

  async function api<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) throw new Error(data.message || "Request failed");
    return data;
  }

  const loadMeta = async () => {
    const [centreRes, courseRes, batchRes] = await Promise.all([
      api<Centre[]>("/api/admin/centres", { headers: authedHeaders }),
      api<Course[]>("/api/admin/courses", { headers: authedHeaders }),
      api<Batch[]>("/api/admin/batches", { headers: authedHeaders }),
    ]);
    setCentres(centreRes.data || []);
    setCourses(courseRes.data || []);
    setBatches(batchRes.data || []);
  };

  const loadCounsellors = async () => {
    if (!canManageSettings) {
      setCounsellors([]);
      return;
    }
    const res = await api<Counsellor[]>("/api/admin/counsellors", { headers: authedHeaders });
    setCounsellors(res.data || []);
  };

  const loadDashboard = async () => {
    const query = { centre: scopedCentre, franchiseId: scopedFranchiseId, counsellor: isCounsellorAccount ? user?.name || "" : scopedCounsellor, date: selectedDate };
    const params = new URLSearchParams(Object.entries(query).filter(([, value]) => value));
    const suffix = params.toString() ? `?${params.toString()}` : "";
    const [summaryRes, funnelRes, centreRes] = await Promise.all([
      api<Summary>(`/api/admin/dashboard/summary${suffix}`, { headers: authedHeaders }),
      api<{ stage: string; count: number }[]>(`/api/admin/dashboard/funnel${suffix}`, { headers: authedHeaders }),
      api<{ centre: string; leads: number; enrolled: number }[]>(`/api/admin/dashboard/centres${suffix}`, { headers: authedHeaders }),
    ]);
    setSummary(summaryRes.data || null);
    setFunnel(funnelRes.data || []);
    setCentreStats(centreRes.data || []);
  };
  const loadLeads = async (pageOverride = leadPage, filtersOverride = filters) => {
    const query = { ...filtersOverride, centre: scopedFranchiseId ? "" : filtersOverride.centre, franchiseId: scopedFranchiseId, counsellor: scopedCounsellor, date: selectedDate, page: String(pageOverride), limit: String(defaultPageSize) };
    const params = new URLSearchParams(Object.entries(query).filter(([, value]) => value));
    const res = await api<Lead[]>(`/api/admin/leads?${params.toString()}`, { headers: authedHeaders });
    setLeads(res.data || []);
    setLeadMeta(res.meta || null);
  };

  const uploadLeadsExcel = async (file?: File | null) => {
    if (!file) return;

    try {
      const importedLeads = await parseLeadImportFile(file);
      if (!importedLeads.length) throw new Error("No lead rows found in this file");
      const missingPhone = importedLeads.findIndex((lead) => !lead.phone?.trim());
      if (missingPhone >= 0) throw new Error(`Row ${missingPhone + 2} is missing a phone number`);

      const importedCount = importedLeads.length;
      toast.message(`Importing ${importedCount} leads...`);
      const createdLeads: Lead[] = [];
      for (const lead of importedLeads) {
        const res = await api<Lead>("/api/admin/leads", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: leadImportFormData(lead),
        });
        if (res.data) createdLeads.push(res.data);
      }

      setLeadPage(1);
      const clearedFilters = { q: "", stage: "", centre: "", course: "" };
      setFilters(clearedFilters);
      setLeads(createdLeads);
      await Promise.all([loadDashboard(), loadLeads(1, clearedFilters)]);
      toast.success(`${createdLeads.length} leads imported and saved`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to import this Excel file");
    }
  };

  const loadStudents = async () => {
    const isEmiPanel = panel === "emi";
    const params = new URLSearchParams(Object.entries({
      centre: scopedCentre,
      franchiseId: scopedFranchiseId,
      counsellor: studentCounsellorScope,
      date: isEmiPanel ? "" : selectedDate,
      emiOnly: isEmiPanel ? "true" : "",
      page: isEmiPanel ? "1" : String(studentPage),
      limit: isEmiPanel ? "100" : String(defaultPageSize),
    }).filter(([, value]) => value));
    const res = await api<Student[]>(`/api/admin/students?${params.toString()}`, { headers: authedHeaders });
    setStudents(res.data || []);
    setStudentMeta(res.meta || null);
  };

  const loadAttendance = async () => {
    const params = new URLSearchParams(Object.entries({ date: attendanceDateValue, franchiseId: scopedFranchiseId, counsellor: isCounsellorAccount ? user?.name || "" : scopedCounsellor }).filter(([, value]) => value));
    const res = await api<Attendance[]>(`/api/admin/attendance?${params.toString()}`, { headers: authedHeaders });
    const records = res.data || [];
    setAttendance(records);
    const byStudent = new Map(records.map((record) => [record.studentId, record]));
    setAttendanceDraft((current) => {
      const next: Record<string, { status: AttendanceStatus; note: string }> = {};
      students.forEach((student) => {
        const saved = byStudent.get(student._id);
        next[student._id] = {
          status: saved?.status || current[student._id]?.status || "Present",
          note: saved?.note || current[student._id]?.note || "",
        };
      });
      return next;
    });
  };

  const loadAttendanceLogs = async () => {
    const params = new URLSearchParams(Object.entries({
      ...attendanceLogFilters,
      franchiseId: scopedFranchiseId,
      counsellor: isCounsellorAccount ? user?.name || "" : scopedCounsellor,
      page: String(attendanceLogPage),
      limit: String(defaultPageSize),
    }).filter(([, value]) => value));
    const res = await api<AttendanceSummary[]>(`/api/admin/attendance/summary?${params.toString()}`, { headers: authedHeaders });
    setAttendanceSummaries(res.data || []);
    setAttendanceLogMeta(res.meta || null);
  };

  const loadAttendanceStudentLogs = async (summary = selectedAttendanceStudent, filtersOverride = attendanceDetailFilters) => {
    if (!summary) return;
    const params = new URLSearchParams(Object.entries({
      dateFrom: filtersOverride.dateFrom,
      dateTo: filtersOverride.dateTo,
      status: filtersOverride.status,
      studentId: summary.studentId,
      franchiseId: scopedFranchiseId,
      counsellor: isCounsellorAccount ? user?.name || "" : scopedCounsellor,
      page: "1",
      limit: "100",
    }).filter(([, value]) => value));
    const res = await api<Attendance[]>(`/api/admin/attendance/logs?${params.toString()}`, { headers: authedHeaders });
    setSelectedAttendanceStudent(summary);
    setAttendanceLogs(res.data || []);
  };

  const openAttendanceDetail = (summary: AttendanceSummary) => {
    setSelectedAttendanceStudent(summary);
    setAttendanceDetailFilters({
      dateFrom: "",
      dateTo: "",
      status: "",
    });
    setAttendanceLogs([]);
    setPanel("attendanceDetail");
  };

  const refreshAll = async () => {
    if (!token) return;
    try {
      await Promise.all([loadMeta(), loadDashboard(), loadLeads(), loadStudents(), loadCounsellors()]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load CRM data");
    }
  };

  const clearCrmData = () => {
    setSummary(null);
    setFunnel([]);
    setCentreStats([]);
    setLeads([]);
    setStudents([]);
    setAttendance([]);
    setAttendanceDraft({});
    setAttendanceLogs([]);
    setAttendanceSummaries([]);
    setSelectedAttendanceStudent(null);
    setAttendanceLogMeta(null);
    setLeadMeta(null);
    setStudentMeta(null);
    setCentres([]);
    setCourses([]);
    setBatches([]);
    setCounsellors([]);
    setProfile(null);
    setPanel("dashboard");
    setPreviousPanel("dashboard");
  };

  useEffect(() => {
    if (!token) return;
    api<unknown>("/api/auth/me", { headers: authedHeaders })
      .then((res) => setUser(res.user || null))
      .catch(() => {
        localStorage.removeItem("imed_crm_token");
        setToken("");
      });
  }, [token]);

  useEffect(() => { void refreshAll(); }, [token]);
  useEffect(() => { if (token) void refreshAll(); }, [roleScope, selectedDate, scopedFranchiseId]);
  useEffect(() => { if (token && canManageSettings) void loadCounsellors(); }, [token, canManageSettings]);
  useEffect(() => { if (token) void loadLeads(); }, [filters.stage, filters.centre, filters.course]);
  useEffect(() => { if (token) void loadLeads(); }, [leadPage]);
  useEffect(() => { if (token) void loadStudents(); }, [studentPage, panel]);
  useEffect(() => { if (token && panel === "attendance") void loadAttendance(); }, [panel, attendanceDateValue, students.length, scopedFranchiseId]);
  useEffect(() => { if (token && panel === "attendanceLogs") void loadAttendanceLogs(); }, [panel, attendanceLogPage, attendanceLogFilters.dateFrom, attendanceLogFilters.dateTo, attendanceLogFilters.status, attendanceLogFilters.student, attendanceLogFilters.course, attendanceLogFilters.batch, scopedFranchiseId]);
  useEffect(() => { if (token && panel === "attendanceDetail" && selectedAttendanceStudent) void loadAttendanceStudentLogs(); }, [panel, selectedAttendanceStudent?.studentId, attendanceDetailFilters.dateFrom, attendanceDetailFilters.dateTo, attendanceDetailFilters.status, scopedFranchiseId]);
  useEffect(() => {
    if (!centres.length) {
      if (selectedBillingCentreId) setSelectedBillingCentreId("");
      return;
    }
    if (!selectedBillingCentreId || !centres.some((centre) => centre._id === selectedBillingCentreId)) {
      setSelectedBillingCentreId(centres[0]._id);
    }
  }, [centres, selectedBillingCentreId]);
  useEffect(() => {
    setLeadPage(1);
    setStudentPage(1);
  }, [roleScope, selectedDate, scopedFranchiseId, filters.stage, filters.centre, filters.course, panel]);
  useEffect(() => {
    setAttendanceLogPage(1);
    if (panel !== "attendanceDetail") {
      setSelectedAttendanceStudent(null);
      setAttendanceLogs([]);
    }
  }, [attendanceLogFilters.dateFrom, attendanceLogFilters.dateTo, attendanceLogFilters.status, attendanceLogFilters.student, attendanceLogFilters.course, attendanceLogFilters.batch, scopedFranchiseId]);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setLoading(true);
    try {
      const res = await api<unknown>(`/api/auth/${authMode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.token) throw new Error("Login token missing");
      clearCrmData();
      localStorage.setItem("imed_crm_token", res.token);
      setToken(res.token);
      setUser(res.user || null);
      toast.success(authMode === "signup" ? "Admin account created" : "Logged in successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const addLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    for (const field of ["governmentProof", "highestQualificationCertificate"]) {
      const file = formData.get(field);
      if (file instanceof File && file.size > leadDocumentMaxSize) {
        toast.error("Each document must be below 2 MB");
        return;
      }
    }
    const course = String(formData.get("course") || "");
    const centre = String(formData.get("centre") || "");
    formData.set("expectedFee", String(courseFeeWithGst(courses, course) || feeWithGst(25000)));
    formData.set("stage", "New Lead");
    formData.set("priority", "Warm");
    formData.set("counsellor", centre || "Unassigned");
    try {
      await api<Lead>("/api/admin/leads", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      form.reset();
      toast.success("Lead saved to the system");
      await refreshAll();
      setPanel("leads");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add lead");
    }
  };
  const patchLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const res = await api<Lead>(`/api/admin/leads/${id}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(updates) });
      if (profile?.type === "lead" && profile.data._id === id && res.data) setProfile({ type: "lead", data: res.data });
      toast.success("Lead updated");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update lead");
    }
  };

  const convertLead = async (lead: Lead) => {
    try {
      await api<Student>(`/api/admin/leads/${lead._id}/convert`, {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({ totalFee: courseFeeWithGst(courses, lead.course || "") || lead.expectedFee || feeWithGst(25000) }),
      });
      toast.success("Lead converted to student");
      setPanel("students");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to convert lead");
    }
  };

  const patchStudent = async (id: string, updates: Partial<Student>) => {
    try {
      const res = await api<Student>(`/api/admin/students/${id}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(updates) });
      if (profile?.type === "student" && profile.data._id === id && res.data) setProfile({ type: "student", data: res.data });
      toast.success("Student updated");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update student");
    }
  };

  const issueCertificate = async (student: Student) => {
    try {
      const res = await api<Student>(`/api/admin/students/${student._id}/certificate`, { method: "POST", headers: authedHeaders });
      if (res.data) setProfile({ type: "student", data: res.data });
      toast.success("Certificate issued");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to issue certificate");
    }
  };

  const addPayment = async (event: FormEvent<HTMLFormElement>, studentId: string, sendWhatsapp = false) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const paidNow = Number(payload.amount || 0);
    const paymentMode = String(payload.mode || "Cash");
    try {
      const res = await api<Student>(`/api/admin/students/${studentId}/payments`, { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      if (res.data) {
        if (profile?.type === "student" && profile.data._id === studentId) setProfile({ type: "student", data: res.data });
        if (sendWhatsapp) window.open(whatsappUrlFor(res.data.phone, paymentMessage(res.data, paidNow, paymentMode)), "_blank", "noopener,noreferrer");
      }
      form.reset();
      toast.success(sendWhatsapp ? "Payment recorded and WhatsApp opened" : "Payment recorded");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to record payment");
    }
  };

  const saveAttendance = async () => {
    const records = students.map((student) => ({
      studentId: student._id,
      status: attendanceDraft[student._id]?.status || "Present",
      note: attendanceDraft[student._id]?.note || "",
    }));
    try {
      const res = await api<Attendance[]>("/api/admin/attendance", {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({ date: attendanceDateValue, records }),
      });
      setAttendance(res.data || []);
      toast.success("Attendance saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save attendance");
    }
  };

  const addCounsellor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await api<Counsellor>("/api/admin/counsellors", { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Staff account added");
      await loadCounsellors();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add counsellor");
    }
  };

  const assignStudentCounsellor = async (studentId: string, counsellor: string) => {
    try {
      const res = await api<Student>(`/api/admin/students/${studentId}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify({ counsellor }) });
      if (profile?.type === "student" && profile.data._id === studentId && res.data) setProfile({ type: "student", data: res.data });
      toast.success("Counsellor assigned");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to assign counsellor");
    }
  };

  const addBatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await api<Batch>("/api/admin/batches", { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Batch created");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create batch");
    }
  };

  const assignStudentBatch = (studentId: string, batchName: string) => {
    const batch = batches.find((item) => item.name === batchName);
    void patchStudent(studentId, {
      batch: batchName,
      batchCommenceDate: batch?.commenceDate || "",
    });
  };

  const addCentreOrCourse = async (event: FormEvent<HTMLFormElement>, type: "centres" | "courses") => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await api(`/api/admin/${type}`, { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success(type === "centres" ? "Centre added" : "Course added");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save");
    }
  };

  const updateCentreBilling = async (event: FormEvent<HTMLFormElement>, centre: Centre) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await api<Centre>(`/api/admin/centres/${centre._id}`, {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify(payload),
      });
      toast.success("Centre billing details updated");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update billing details");
    }
  };

  const updateCourseFee = async (event: FormEvent<HTMLFormElement>, course: Course) => {
    event.preventDefault();
    const fee = Number(new FormData(event.currentTarget).get("fee") || 0);
    try {
      await api<Course>(`/api/admin/courses/${course._id}`, {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify({ fee }),
      });
      toast.success("Course fee updated");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update course fee");
    }
  };

  const changePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await api("/api/admin/me/password", { method: "PATCH", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Password updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update password");
    }
  };

  const logout = () => {
    localStorage.removeItem("imed_crm_token");
    clearCrmData();
    setToken("");
    setUser(null);
  };

  const openProfile = (target: ProfileTarget) => {
    if (!target) return;
    setProfile(target);
    setPreviousPanel(panel);
    setPanel("profile");
  };

  const handleDatePresetChange = (preset: DatePreset) => {
    setDatePreset(preset);
    if (preset === "all") {
      setSelectedDate("");
      return;
    }
    if (preset === "today") {
      setSelectedDate(dateInputValueFromOffset(0));
      return;
    }
    if (preset === "yesterday") {
      setSelectedDate(dateInputValueFromOffset(-1));
      return;
    }
    setSelectedDate((current) => current || dateInputValueFromOffset(0));
  };

  const clearDateFilter = () => {
    setDatePreset("all");
    setSelectedDate("");
  };

  if (!token) {
    return (
      <main className="imed-crm auth-shell">
        <CrmStyles />
        <Toaster richColors position="top-right" />
        <section className="auth-card">
          <div className="imed-navbar-brand auth-brand-logo" aria-label="iMED Academy">
            <img src={imedLogo} alt="" />
            <span><b>iMED</b> <strong>Academy</strong></span>
          </div>
          {/* <p className="eyebrow">iMED OS</p> */}
          <h1>{authMode === "signup" ? "Request Admin Access" : "Admin Access"}</h1>
          <p className="muted">Manage admissions, students, fees, and receipts.</p>
          <form onSubmit={handleAuth} className="auth-form">
            {authMode === "signup" && <input name="name" placeholder="Admin full name" required />}
            <input name="email" type="email" placeholder="Official email address" required />
            <label className="password-field">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" required minLength={8} />
              <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((visible) => !visible)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>
            {authMode === "signup" && <input name="setupCode" placeholder="Admin setup passcode" required />}
            <button disabled={loading}>{loading ? "Checking..." : authMode === "signup" ? "Request Admin Access" : "Sign in"} <ArrowRight size={18} /></button>
          </form>
          <button className="ghost-link" onClick={() => setAuthMode(authMode === "signup" ? "login" : "signup")}>
            {authMode === "signup" ? "Open sign in" : "Request Admin Access"}
          </button>
          <p className="login-foot">Delhi - Kochi - Bangalore</p>
          <button className="ghost-link" onClick={() => (window.location.hash = "")}>Back to website</button>
        </section>
      </main>
    );
  }

  return (
    <main className={`imed-crm crm-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <CrmStyles />
      <Toaster richColors position="top-right" />
      <aside className="crm-sidebar">
        <div className="brand-block">
          <div className="imed-navbar-brand sidebar-brand-logo" aria-label="iMED Academy">
            <img src={imedLogo} alt="" />
            <span><b>iMED</b> <strong>Academy</strong></span>
          </div>
        </div>
        <nav className="crm-nav">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter((item) => {
                if (isCounsellorAccount) return allowedCounsellorPanels.has(item.key);
                if (item.key === "myStudents") return isCounsellorAccount;
                if ((item.key === "attendance" || item.key === "attendanceLogs") && !canUseAttendance) return false;
                if (isCounsellorAccount && hiddenForCounsellor.has(item.key)) return false;
                if (item.key === "settings") return canManageSettings;
                return true;
              });
            if (!visibleItems.length) return null;
            return (
            <div className="nav-section" key={group.group}>
              <p className="nav-group-label">{group.group}</p>
              {visibleItems.map((item) => (
                <button key={item.key} className={panel === item.key ? "active" : ""} onClick={() => setPanel(item.key)}>
                  {item.icon}<span>{item.label}</span>
                </button>
              ))}
            </div>
          );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button onClick={logout}><LogOut size={17} /> <span>Logout</span></button>
        </div>
      </aside>

      <section className="crm-main">
        <header className="crm-topbar">
          <div>
            
            <h1>{panelLabel(panel)}</h1>
          </div>
          <div className="top-actions">
            {isHeadSuperAdmin && (
              <select className="scope-select" value={roleScope} onChange={(event) => setRoleScope(event.target.value as RoleScope)}>
                <option value="all">All branches & franchises</option>
                {centres.map((centre) => (
                  <option key={centre._id} value={centre._id}>{centreKindLabel(centre)} - {centre.name}</option>
                ))}
              </select>
            )}
            <div className="date-filter-group" aria-label="Date filter">
              <CalendarDays size={16} />
              <select className="date-preset-select" value={datePreset} onChange={(event) => handleDatePresetChange(event.target.value as DatePreset)}>
                <option value="all">All dates</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="specific">Specific date</option>
              </select>
              <input
                className="top-date-filter"
                type="date"
                value={selectedDate}
                onChange={(event) => {
                  setSelectedDate(event.target.value);
                  setDatePreset(event.target.value ? "specific" : "all");
                }}
                aria-label="Choose specific date"
              />
            </div>
            {selectedDate && <button className="date-clear-btn" onClick={clearDateFilter}>Clear</button>}
            <div className="top-user"><span>{initials(user?.name || "Ravi Admin")}</span></div>
          </div>
        </header>

        {panel === "dashboard" && (() => {
          const activeLeads = summary?.totalLeads || leads.length;
          const enrolledCount = summary?.enrolled || leads.filter((lead) => ["Enrolled", "In Training", "Placed"].includes(lead.stage)).length;
          const conversion = summary?.conversion || (activeLeads ? Math.round((enrolledCount / activeLeads) * 100) : 0);
          const collected = summary?.revenue || students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
          const due = summary?.pending || students.reduce((sum, student) => sum + Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0)), 0);
          const stageRows = stages.map((stage) => ({ stage, count: funnel.find((item) => item.stage === stage)?.count || 0 }));
          return (
            <div className="os-stack">
              <div className="metrics">
                <div className="metric"><div className="label"><span className="ico-chip blue"><Users size={17} /></span>Active leads</div><div className="val">{activeLeads}</div><div className="sub up">this month</div></div>
                <div className="metric"><div className="label"><span className="ico-chip green"><CheckCircle2 size={17} /></span>Enrolled</div><div className="val">{enrolledCount}</div><div className="sub up">+{enrolledCount} total</div></div>
                <div className="metric"><div className="label"><span className="ico-chip amber"><BarChart3 size={17} /></span>Conversion</div><div className="val">{conversion}%</div><div className="sub flat">target 30%</div></div>
                <div className="metric"><div className="label"><span className="ico-chip green"><CircleDollarSign size={17} /></span>Collected</div><div className="val">{formatCurrency(collected)}</div><div className="sub up">due {formatCurrency(due)}</div></div>
              </div>

              <div className="section-title"><BarChart3 size={17} /> Funnel pipeline</div>
              <div className="funnel">
                {stageRows.map((item) => <div className="stage" key={item.stage}><div className="n">{item.count}</div><div className="s">{item.stage.replace(" / Visit", "")}</div></div>)}
              </div>

              <div className="two-col">
                <div className="panel"><h3>Performance by centre</h3>{centreOptions.map((centre) => {
                  const centreLeads = leads.filter((lead) => lead.centre === centre);
                  const centreEnrolled = centreLeads.filter((lead) => ["Enrolled", "In Training", "Placed"].includes(lead.stage)).length + students.filter((student) => student.centre === centre).length;
                  const percent = centreLeads.length ? Math.round((centreEnrolled / centreLeads.length) * 100) : 0;
                  return <div className="crow" key={centre}><div><div className="nm">{centre}</div><div className="mt">{centreLeads.length} leads - {centreEnrolled} enrolled</div></div><span className="pct">{percent}%</span></div>;
                })}</div>
                <div className="panel"><h3>Recent admissions</h3>{students.slice(0, 5).map((student) => <div className="crow" key={student._id}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - {student.centre || "-"}</div></div></div><span className={`tag ${tagClass(student.status)}`}>{student.status}</span></div>)}{!students.length && <p className="empty-state">No recent admissions</p>}</div>
              </div>
            </div>
          );
        })()}
        {panel === "leads" && (
          <div className="panel-stack">
            <div className="toolbar"><div className="search"><Search size={17} /><input value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} onKeyDown={(event) => { if (event.key === "Enter") { setLeadPage(1); if (leadPage === 1) void loadLeads(); } }} placeholder="Search leads..." /></div><div className="toolbar-actions"><label className="btn secondary-btn excel-upload-btn"><Upload size={17} /> Upload Excel<input type="file" accept=".xls,.xlsx,.csv,.tsv,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={(event) => { void uploadLeadsExcel(event.target.files?.[0]); event.target.value = ""; }} /></label><button className="btn secondary-btn" onClick={() => downloadLeadsExcel(leads)}><Download size={17} /> Download Excel</button><button className="btn" onClick={() => setPanel("add")}><Plus size={17} /> Add lead</button></div></div>
            <section className="card-table-wrap">
              <LeadTable leads={leads} onStage={patchLead} onConvert={convertLead} onOpen={(lead) => openProfile({ type: "lead", data: lead })} isSuperAdmin={isSuperAdmin} counsellors={counsellors} centreOptions={centreOptions} onAssignCentre={(leadId, centre) => patchLead(leadId, { centre })} onAssignCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })} />
            </section>
            <PaginationControls meta={leadMeta} label="leads" onPage={setLeadPage} />
            <p className="table-foot">Click a row to open profile</p>
          </div>
        )}
        {panel === "add" && (
          <section className="crm-card">
            <div className="ok-banner"><CheckCircle2 size={18} /> Lead saved to the system</div>
            <h2><Plus size={21} /> Add new lead</h2>
            <LeadForm onSubmit={addLead} centres={centreOptions} />
          </section>
        )}

        {panel === "admissions" && (
          <section className="crm-card">
            <h2><ClipboardList size={21} /> Admissions</h2>
            <p className="card-note">Leads ready to convert into admitted students. Admitting creates a student record and lets you generate a receipt.</p>
            <LeadTable
              leads={leads.filter((lead) => ["Contacted", "Demo / Visit", "Counselling"].includes(lead.stage))}
              onStage={patchLead}
              onConvert={convertLead}
              onOpen={(lead) => openProfile({ type: "lead", data: lead })}
              isSuperAdmin={isSuperAdmin}
              counsellors={counsellors}
              centreOptions={centreOptions}
              onAssignCentre={(leadId, centre) => patchLead(leadId, { centre })}
              onAssignCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })}
              showAction
            />
            <PaginationControls meta={leadMeta} label="leads" onPage={setLeadPage} />
          </section>
        )}

        {panel === "batchStrength" && (
          <section className="crm-card">
            <h2><Users size={21} /> Batch strength</h2>
            <p className="card-note">Check how many students are assigned to each batch. Select a batch to view the student names.</p>
            <BatchStrengthPanel batches={batches} students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
          </section>
        )}

        {panel === "myStudents" && <section className="crm-card"><div className="section-head compact-head"><h2><UserRound size={21} /> My students</h2><button className="btn secondary-btn" onClick={() => downloadStudentsExcel(students)}><Download size={17} /> Download Excel</button></div><StudentTable students={students} onStatus={patchStudent} onOpen={(student) => openProfile({ type: "student", data: student })} /><PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} /></section>}

        {panel === "attendance" && (
          <section className="crm-card">
            <div className="section-head compact-head">
              <h2><CheckCircle2 size={21} /> Attendance</h2>
              <div className="toolbar-actions">
                <input className="top-date-filter attendance-date-input" type="date" value={attendanceDateValue} onChange={(event) => setAttendanceDateValue(event.target.value)} />
                <button className="btn secondary-btn" onClick={() => void loadAttendance()}><RefreshCw size={17} /> Refresh</button>
                <button className="btn" onClick={saveAttendance} disabled={!students.length}><CheckCircle2 size={17} /> Save attendance</button>
              </div>
            </div>
            <AttendancePanel students={students} attendance={attendance} draft={attendanceDraft} setDraft={setAttendanceDraft} onOpen={(student) => openProfile({ type: "student", data: student })} />
            <PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} />
          </section>
        )}

        {panel === "attendanceLogs" && (
          <section className="crm-card">
            <div className="section-head compact-head attendance-logs-head">
              <h2><FileText size={21} /> Attendance logs</h2>
            </div>
            <AttendanceLogsPanel
              summaries={attendanceSummaries}
              filters={attendanceLogFilters}
              setFilters={setAttendanceLogFilters}
              onSelectStudent={openAttendanceDetail}
            />
            <PaginationControls meta={attendanceLogMeta} label="students" onPage={setAttendanceLogPage} />
          </section>
        )}

        {panel === "attendanceDetail" && (
          <section className="crm-card attendance-detail-page">
            <AttendanceDetailPanel
              student={selectedAttendanceStudent}
              logs={attendanceLogs}
              filters={attendanceDetailFilters}
              setFilters={setAttendanceDetailFilters}
              onBack={() => setPanel("attendanceLogs")}
              onDownload={() => downloadAttendanceExcel(attendanceLogs)}
            />
          </section>
        )}

        {panel === "students" && <section className="crm-card"><div className="section-head compact-head"><h2><GraduationCap size={21} /> All students</h2><button className="btn secondary-btn" onClick={() => downloadStudentsExcel(students)}><Download size={17} /> Download Excel</button></div><StudentTable students={students} onStatus={patchStudent} onOpen={(student) => openProfile({ type: "student", data: student })} canAssignCounsellors={canAssignCounsellors} counsellors={counsellors} onAssignCounsellor={assignStudentCounsellor} /><PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} /></section>}

        {panel === "finance" && (
          <section className="crm-card"><h2><BadgeIndianRupee size={21} /> Finance</h2><FinancePanel students={students} /><PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} /></section>
        )}

        {panel === "emi" && (
          <section className="crm-card">
            <div className="section-head compact-head"><h2><CalendarDays size={21} /> EMI reminders</h2><button className="btn secondary-btn" onClick={() => downloadEmiRemindersExcel(students)}><Download size={17} /> Download Excel</button></div>
            <p className="card-note">Students whose EMI date is today or already overdue are shown first. Click Send reminder to open WhatsApp with the payment reminder.</p>
            <EmiReminderList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
            <PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} />
          </section>
        )}

        {panel === "receipts" && (
          <section className="crm-card">
            <h2><ReceiptText size={21} /> Receipts</h2>
            <p className="card-note">Open a student profile and print/save the receipt from the profile view.</p>
            <ReceiptList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
            <PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} />
          </section>
        )}

        {panel === "certificates" && (
          <section className="crm-card">
            <h2><Award size={21} /> Certificates</h2>
            <p className="card-note">Issue certificates for students whose course is completed, then print/save PDF or send a WhatsApp message.</p>
            <CertificateList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} onIssue={issueCertificate} />
            <PaginationControls meta={studentMeta} label="students" onPage={setStudentPage} />
          </section>
        )}

        {panel === "profile" && (
          <ProfilePanel profile={profile} previousPanel={previousPanel} setPanel={setPanel} onConvert={convertLead} onIssueCertificate={issueCertificate} onPayment={addPayment} onUpdateStudent={patchStudent} isSuperAdmin={canAssignCounsellors} canManageFees={canManageFees} counsellors={counsellors} centres={centres} batches={batches} onAssignCounsellor={assignStudentCounsellor} onAssignLeadCentre={(leadId, centre) => patchLead(leadId, { centre })} onAssignLeadCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })} onAssignBatch={assignStudentBatch} onPrint={printInvoiceOnly} />
        )}

        {panel === "settings" && canManageSettings && (
          <div className="crm-grid two settings-grid settings-premium-grid">
            <section className="crm-card settings-card settings-staff-card">
              <div className="settings-card-head">
                <div>
                  <h2><UserPlus size={21} /> Staff Access</h2>
                  <span>Create secure CRM access for admins and counsellors.</span>
                </div>
                <strong>{counsellors.length} staff</strong>
              </div>
              <form className="inline-form counsellor-form" onSubmit={addCounsellor}>
                <input name="name" placeholder="Staff name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" minLength={8} required />
                <select name="role" defaultValue={isFranchiseSuperAdmin ? "franchise_counsellor" : "counsellor"} required>
                  {isHeadSuperAdmin && <option value="superadmin">Head super admin</option>}
                  {isHeadAdmin && <option value="admin">Head admin</option>}
                  {isHeadAdmin && <option value="counsellor">Head office counsellor</option>}
                  {isHeadSuperAdmin && <option value="franchise_superadmin">Franchise super admin</option>}
                  {(isHeadSuperAdmin || isFranchiseSuperAdmin) && <option value="franchise_counsellor">Franchise counsellor</option>}
                </select>
                {isHeadSuperAdmin ? (
                  <select name="franchiseId">
                    <option value="">Assign franchise</option>
                    {centres.filter((centre) => centre.type !== "branch").map((centre) => <option key={centre._id} value={centre._id}>{centre.name}</option>)}
                  </select>
                ) : isHeadBranchAdmin ? (
                  <input type="hidden" name="franchiseId" value="" />
                ) : (
                  <>
                    <input value={activeFranchise?.name || "Assigned franchise"} disabled aria-label="Assigned franchise" />
                    <input type="hidden" name="franchiseId" value={user?.franchiseId || ""} />
                  </>
                )}
                <button>Add staff</button>
              </form>
              <details className="settings-directory">
                <summary>View staff directory</summary>
                <div className="settings-directory-body">
                  <input value={staffSearch} onChange={(event) => setStaffSearch(event.target.value)} placeholder="Search staff" />
                  <div className="settings-mini-table">
                    <div className="settings-mini-row head"><span>Name</span><span>Role</span><span>Location</span></div>
                    {filteredCounsellors.map((item) => {
                      const centre = centres.find((entry) => entry._id === item.franchiseId);
                      return (
                        <div className="settings-mini-row" key={item.email}>
                          <span><strong>{item.name}</strong><small>{item.email}</small></span>
                          <span>{staffRoleLabel(item.role)}</span>
                          <span>{centre?.name || "Head office"}</span>
                        </div>
                      );
                    })}
                    {!filteredCounsellors.length && <p className="empty-state">No staff found.</p>}
                  </div>
                </div>
              </details>
            </section>
            {(isHeadAdmin || isFranchiseSuperAdmin) && <section className="crm-card settings-card billing-card">
              <div className="settings-card-head">
                <div>
                  <h2><Building2 size={21} /> {isFranchiseSuperAdmin ? "Company Billing Details" : "Branches & Franchise Billing"}</h2>
                  <span>{isFranchiseSuperAdmin ? "Update GST, invoice address, and bank details for your franchise." : "Add locations and edit billing details one at a time."}</span>
                </div>
                <strong>{centres.length} locations</strong>
              </div>
              <div className="settings-split">
                {isHeadAdmin ? (
                  <form className="inline-form settings-add-location" onSubmit={(event) => addCentreOrCourse(event, "centres")}>
                    <input name="name" placeholder="Branch / franchise name" required />
                    <input name="city" placeholder="City" />
                    {isHeadSuperAdmin ? (
                      <select name="type" defaultValue="franchise">
                        <option value="franchise">Franchise</option>
                        <option value="branch">iMED branch</option>
                      </select>
                    ) : <input type="hidden" name="type" value="branch" />}
                    <button>Add location</button>
                  </form>
                ) : (
                  <div className="settings-add-location billing-info-panel">
                    <strong>{selectedBillingCentre?.name || "Assigned franchise"}</strong>
                    <span>These details print on franchise invoices and receipts.</span>
                  </div>
                )}
                <div className="billing-selector">
                  <input value={billingSearch} onChange={(event) => setBillingSearch(event.target.value)} placeholder="Search branch / franchise" />
                  <select value={selectedBillingCentre?._id || ""} onChange={(event) => setSelectedBillingCentreId(event.target.value)} disabled={!centres.length}>
                    {!centres.length && <option value="">No locations added</option>}
                    {visibleBillingCentres.map((centre) => <option key={centre._id} value={centre._id}>{centreKindLabel(centre)} - {centre.name}</option>)}
                  </select>
                </div>
              </div>
              {selectedBillingCentre ? (
                <form className="billing-row billing-editor" key={selectedBillingCentre._id} onSubmit={(event) => updateCentreBilling(event, selectedBillingCentre)}>
                  <div className="billing-row-head">
                    <strong>{selectedBillingCentre.name}</strong>
                    <span>{centreKindLabel(selectedBillingCentre)} | {selectedBillingCentre.city || "No city"} | blank fields use iMED invoice defaults</span>
                  </div>
                  {isHeadSuperAdmin ? (
                    <select name="type" defaultValue={selectedBillingCentre.type || "franchise"}>
                      <option value="franchise">Franchise</option>
                      <option value="branch">iMED branch</option>
                    </select>
                  ) : <input type="hidden" name="type" value={selectedBillingCentre.type || "branch"} />}
                  <input name="billingLegalName" placeholder="Company legal name" defaultValue={selectedBillingCentre.billingLegalName || ""} />
                  <input name="billingGstin" placeholder="GSTIN" defaultValue={selectedBillingCentre.billingGstin || ""} />
                  <input name="billingStateName" placeholder="State name" defaultValue={selectedBillingCentre.billingStateName || ""} />
                  <input name="billingStateCode" placeholder="State code" defaultValue={selectedBillingCentre.billingStateCode || ""} />
                  <input name="billingEmail" placeholder="Billing email" defaultValue={selectedBillingCentre.billingEmail || ""} />
                  <input name="billingPhone" placeholder="Billing phone" defaultValue={selectedBillingCentre.billingPhone || ""} />
                  <textarea name="billingAddress" placeholder="Billing address" defaultValue={selectedBillingCentre.billingAddress || ""} />
                  <input name="bankAccountName" placeholder="Account holder name" defaultValue={selectedBillingCentre.bankAccountName || ""} />
                  <input name="bankName" placeholder="Bank name" defaultValue={selectedBillingCentre.bankName || ""} />
                  <input name="bankAccountNumber" placeholder="Account number" defaultValue={selectedBillingCentre.bankAccountNumber || ""} />
                  <input name="bankIfsc" placeholder="IFSC" defaultValue={selectedBillingCentre.bankIfsc || ""} />
                  <input name="bankBranch" placeholder="Branch" defaultValue={selectedBillingCentre.bankBranch || ""} />
                  <button>Save billing</button>
                </form>
              ) : <p className="empty-state">Add a branch or franchise to configure billing.</p>}
            </section>}
            <section className="crm-card settings-card">
              <h2><BookOpen size={21} /> Course Fees</h2>
              <form className="inline-form" onSubmit={(event) => addCentreOrCourse(event, "courses")}>
                <input name="name" placeholder="Course name" required />
                <input name="code" placeholder="Code" />
                <input name="fee" type="number" min="0" placeholder="Base fee before GST" />
                {isHeadSuperAdmin && (
                  <select name="franchiseId">
                    <option value="">Global course fee</option>
                    {centres.map((centre) => <option key={centre._id} value={centre._id}>{centreKindLabel(centre)} - {centre.name}</option>)}
                  </select>
                )}
                <button>Add</button>
              </form>
              <div className="course-fee-list">
                {courses.map((item) => (
                  <form className="course-fee-row" key={item._id} onSubmit={(event) => updateCourseFee(event, item)}>
                    {(() => {
                      const feeCentre = centres.find((centre) => centre._id === item.franchiseId);
                      return (
                    <div>
                      <strong>{item.name}</strong>
                      <span>Base {formatCurrency(item.fee || 0)} - GST 18% - Payable {formatCurrency(feeWithGst(item.fee || 0))}</span>
                      <span>{item.code || "No code"} - {item.franchiseId ? `${centreKindLabel(feeCentre)} fee - ${feeCentre?.name || "Selected location"}` : "Global fee"}</span>
                    </div>
                      );
                    })()}
                    <input name="fee" type="number" min="0" defaultValue={item.fee || 0} aria-label={`${item.name} base fee before GST`} />
                    <button>Save</button>
                  </form>
                ))}
                {!courses.length && <p className="empty-state">No courses added yet.</p>}
              </div>
            </section>
            <section className="crm-card settings-card">
              <h2><CalendarDays size={21} /> Batches</h2>
              <form className="inline-form counsellor-form" onSubmit={addBatch}>
                <input name="name" placeholder="Batch name" required />
                <select name="centre"><option value="">Centre</option>{centreOptions.map((centre) => <option key={centre}>{centre}</option>)}</select>
                <select name="course"><option value="">Course</option>{osCourses.map((course) => <option key={course}>{course}</option>)}</select>
                <input name="commenceDate" type="date" required />
                <button>Add</button>
              </form>
              <div className="pill-list">{batches.map((item) => <span key={item._id}>{item.name} - {formatDate(item.commenceDate)}</span>)}{!batches.length && <p className="empty-state">No batches created yet.</p>}</div>
            </section>
            <section className="crm-card settings-card compact-settings-card">
              <h2><ShieldCheck size={21} /> Security</h2>
              <form className="inline-form counsellor-form" onSubmit={changePassword}>
                <input name="currentPassword" type="password" placeholder="Current password" required />
                <input name="newPassword" type="password" placeholder="New password" minLength={8} required />
                <button>Change password</button>
              </form>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}

function panelLabel(panel: Panel) {
  return {
    dashboard: "Dashboard",
    leads: "Leads",
    add: "Add lead",
    admissions: "Admissions",
    batchStrength: "Batch Strength",
    myStudents: "My Students",
    attendance: "Attendance",
    attendanceLogs: "Attendance Logs",
    attendanceDetail: "Attendance Detail",
    students: "All students",
    finance: "Finance Desk",
    emi: "EMI Reminders",
    receipts: "Receipts",
    certificates: "Certificates",
    settings: "Centres & Courses",
    profile: "Profile",
  }[panel];
}

function Metric({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return <div className="metric-card"><div className="metric-icon">{icon}</div><span>{label}</span><strong>{value}</strong></div>;
}

function LeadForm({ onSubmit, centres }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void; centres: string[] }) {
  return (
    <form className="lead-form os-form" onSubmit={onSubmit}>
      <label><span>Full name</span><input name="fullName" placeholder="Student name" required /></label>
      <label><span>Phone</span><input name="phone" placeholder="+91" required /></label>
      <label><span>Parent mobile no.</span><input name="parentMobile" placeholder="+91" /></label>
      <label className="file-field"><span>Any government proof</span><input name="governmentProof" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" /><small className="file-help">{leadDocumentHelpText}</small></label>
      <label className="file-field"><span>Highest educational qualification certificate</span><input name="highestQualificationCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" /><small className="file-help">{leadDocumentHelpText}</small></label>
      <label><span>Source</span><select name="source">{sources.map((source) => <option key={source}>{source}</option>)}</select></label>
      <label><span>Centre</span><select name="centre">{centres.map((centre) => <option key={centre}>{centre}</option>)}</select></label>
      <label><span>Course</span><select name="course">{osCourses.map((course) => <option key={course}>{course}</option>)}</select></label>
      <button><Plus size={17} /> Save lead</button>
    </form>
  );
}

function Filters({ filters, setFilters, centres, onSearch }: { filters: { q: string; stage: string; centre: string; course: string }; setFilters: (filters: { q: string; stage: string; centre: string; course: string }) => void; centres: Centre[]; courses: Course[]; onSearch: () => void }) {
  const centreNames = centres.length ? centres.map((centre) => centre.name) : osCentres;
  return <div className="filters"><label><Search size={16} /><input value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") onSearch(); }} placeholder="Search leads..." /></label><select value={filters.stage} onChange={(e) => setFilters({ ...filters, stage: e.target.value })}><option value="">All stages</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><select value={filters.centre} onChange={(e) => setFilters({ ...filters, centre: e.target.value })}><option value="">All centres</option>{centreNames.map((centre) => <option key={centre}>{centre}</option>)}</select><select value={filters.course} onChange={(e) => setFilters({ ...filters, course: e.target.value })}><option value="">All courses</option>{osCourses.map((course) => <option key={course}>{course}</option>)}</select><button onClick={onSearch}>Search</button></div>;
}

function PaginationControls({ meta, label, onPage }: { meta: PaginationMeta | null; label: string; onPage: (page: number) => void }) {
  if (!meta) return null;
  const start = meta.total ? (meta.page - 1) * meta.limit + 1 : 0;
  const end = Math.min(meta.total, meta.page * meta.limit);
  return (
    <div className="pagination-bar">
      <span>Showing {start}-{end} of {meta.total} {label}</span>
      <div>
        <button className="ghost-mini" disabled={!meta.hasPrev} onClick={() => onPage(meta.page - 1)}>Previous</button>
        <strong>Page {meta.page} of {meta.pages}</strong>
        <button className="ghost-mini" disabled={!meta.hasNext} onClick={() => onPage(meta.page + 1)}>Next</button>
      </div>
    </div>
  );
}

function LeadTable({ leads, onStage, onConvert, onOpen, isSuperAdmin = false, counsellors = [], centreOptions = osCentres, onAssignCentre, onAssignCounsellor, showAction = false }: { leads: Lead[]; onStage: (id: string, updates: Partial<Lead>) => void; onConvert: (lead: Lead) => void; onOpen: (lead: Lead) => void; compact?: boolean; isSuperAdmin?: boolean; counsellors?: Counsellor[]; centreOptions?: string[]; onAssignCentre?: (leadId: string, centre: string) => void; onAssignCounsellor?: (leadId: string, counsellor: string) => void; showAction?: boolean }) {
  const rowClass = `table-row ${isSuperAdmin ? (showAction ? "lead-row-assigned-action" : "lead-row-assigned") : (showAction ? "lead-row-action" : "lead-row")}`;
  return (
    <div className="crm-table">
      <div className={`${rowClass} head`}>
        <span>Name</span><span>Phone</span><span>Source</span><span>Centre</span><span>Course</span>
        {isSuperAdmin && <span>Counsellor</span>}
        <span>Stage</span>{showAction && <span>Action</span>}
      </div>
      {leads.map((lead) => (
        <div className={`${rowClass} clickable-row`} key={lead._id} onClick={() => onOpen(lead)}>
          <span><strong>{lead.fullName}</strong></span>
          <span>{lead.phone}</span>
          <span>{lead.source || "-"}</span>
          <span>{onAssignCentre ? <select value={lead.centre || ""} onClick={(e) => e.stopPropagation()} onChange={(e) => onAssignCentre(lead._id, e.target.value)}><option value="">Assign centre</option>{centreOptions.map((centre) => <option key={centre} value={centre}>{centre}</option>)}</select> : lead.centre || "-"}</span>
          <span>{courseShortCode(lead.course)}</span>
          {isSuperAdmin && <span><select value={lead.counsellor || ""} onClick={(e) => e.stopPropagation()} onChange={(e) => onAssignCounsellor?.(lead._id, e.target.value)}><option value="">Unassigned</option>{counsellors.map((counsellor) => <option key={counsellor.email} value={counsellor.name}>{counsellor.name}</option>)}</select></span>}
          <span><select value={lead.stage} onClick={(e) => e.stopPropagation()} onChange={(e) => onStage(lead._id, { stage: e.target.value })}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></span>
          {showAction && <span><button className="mini-btn" onClick={(e) => { e.stopPropagation(); onConvert(lead); }}>Admit <ArrowRight size={15} /></button></span>}
        </div>
      ))}
      {!leads.length && <p className="empty-state">No leads found yet.</p>}
    </div>
  );
}

function StudentTable({ students, onStatus, onOpen, canAssignCounsellors = false, counsellors = [], onAssignCounsellor }: { students: Student[]; onStatus: (id: string, updates: Partial<Student>) => void; onOpen: (student: Student) => void; canAssignCounsellors?: boolean; counsellors?: Counsellor[]; onAssignCounsellor?: (studentId: string, counsellor: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const rowClass = `table-row ${canAssignCounsellors ? "student-row-assigned" : "student-row"}`;
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredStudents = normalizedSearch
    ? students.filter((student) => {
      const due = studentDueAmount(student);
      return [
        student.fullName,
        student.phone,
        student.email,
        student.admissionNumber,
        student.course,
        student.centre,
        student.counsellor,
        student.batch,
        student.status,
        formatCurrency(student.paidAmount || 0),
        formatCurrency(due),
        String(student.paidAmount || 0),
        String(due),
      ].some((value) => String(value || "").toLowerCase().includes(normalizedSearch));
    })
    : students;

  return <div className="student-table-stack">
    <div className="toolbar student-toolbar">
      <div className="search">
        <Search size={17} />
        <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search students..." />
      </div>
      <p className="table-foot">Showing {filteredStudents.length} of {students.length} students</p>
    </div>
    <div className="crm-table"><div className={`${rowClass} head`}><span>Student</span><span>Admission</span><span>Course</span><span>Centre</span>{canAssignCounsellors && <span>Counsellor</span>}<span>Paid</span><span>Due</span><span>Status</span></div>{filteredStudents.map((student) => {
    const due = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0));
    return <div className={`${rowClass} clickable-row`} key={student._id} onClick={() => onOpen(student)}><span><strong>{student.fullName}</strong></span><span>{student.admissionNumber || student.phone}</span><span>{courseShortCode(student.course)}</span><span>{student.centre || "-"}</span>{canAssignCounsellors && <span><select value={student.counsellor || ""} onClick={(e) => e.stopPropagation()} onChange={(e) => onAssignCounsellor?.(student._id, e.target.value)}><option value="">Unassigned</option>{counsellors.map((counsellor) => <option key={counsellor.email} value={counsellor.name}>{counsellor.name}</option>)}</select></span>}<span>{formatCurrency(student.paidAmount || 0)}</span><span>{formatCurrency(due)}</span><span><select value={student.status} onClick={(e) => e.stopPropagation()} onChange={(e) => onStatus(student._id, { status: e.target.value })}>{studentStatuses.map((status) => <option key={status}>{status}</option>)}</select></span></div>;
  })}{!students.length && <p className="empty-state">No students yet</p>}{Boolean(students.length && !filteredStudents.length) && <p className="empty-state">No students match this search.</p>}</div>
  </div>;
}

function AttendancePanel({ students, attendance, draft, setDraft, onOpen }: { students: Student[]; attendance: Attendance[]; draft: Record<string, { status: AttendanceStatus; note: string }>; setDraft: Dispatch<SetStateAction<Record<string, { status: AttendanceStatus; note: string }>>>; onOpen: (student: Student) => void }) {
  const savedByStudent = new Map(attendance.map((record) => [record.studentId, record]));
  const counts = attendanceStatuses.reduce((acc, status) => {
    acc[status] = students.filter((student) => (draft[student._id]?.status || "Present") === status).length;
    return acc;
  }, {} as Record<AttendanceStatus, number>);
  const updateDraft = (studentId: string, updates: Partial<{ status: AttendanceStatus; note: string }>) => {
    setDraft((current) => ({
      ...current,
      [studentId]: {
        status: updates.status || current[studentId]?.status || "Present",
        note: updates.note ?? current[studentId]?.note ?? "",
      },
    }));
  };

  return (
    <div className="attendance-stack">
      <div className="attendance-summary">
        {attendanceStatuses.map((status) => <div key={status}><span>{status}</span><strong>{counts[status] || 0}</strong></div>)}
      </div>
      <div className="crm-table">
        <div className="table-row attendance-row head"><span>Student</span><span>Course</span><span>Batch</span><span>Status</span><span>Note</span><span>Saved</span></div>
        {students.map((student) => {
          const row = draft[student._id] || { status: "Present" as AttendanceStatus, note: "" };
          const saved = savedByStudent.get(student._id);
          return (
            <div className="table-row attendance-row clickable-row" key={student._id} onClick={() => onOpen(student)}>
              <span><strong>{student.fullName}</strong><small>{student.admissionNumber || student.phone}</small></span>
              <span>{courseShortCode(student.course)}</span>
              <span>{student.batch || "-"}</span>
              <span><select value={row.status} onClick={(event) => event.stopPropagation()} onChange={(event) => updateDraft(student._id, { status: event.target.value as AttendanceStatus })}>{attendanceStatuses.map((status) => <option key={status}>{status}</option>)}</select></span>
              <span><input value={row.note} onClick={(event) => event.stopPropagation()} onChange={(event) => updateDraft(student._id, { note: event.target.value })} placeholder="Optional note" /></span>
              <span>{saved ? `${saved.status} by ${saved.markedBy || "-"}` : "Not saved"}</span>
            </div>
          );
        })}
        {!students.length && <p className="empty-state">No assigned students found for attendance.</p>}
      </div>
    </div>
  );
}

function AttendanceCalendar({ logs }: { logs: Attendance[] }) {
  const base = logs[0]?.date ? new Date(logs[0].date) : new Date();
  const year = base.getFullYear();
  const month = base.getMonth();
  const monthName = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(base);
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay.getDay();
  const byDay = new Map(logs.map((record) => [new Date(record.date || "").getDate(), record]));
  const cells = Array.from({ length: Math.ceil((startOffset + daysInMonth) / 7) * 7 }, (_, index) => {
    const day = index - startOffset + 1;
    return day >= 1 && day <= daysInMonth ? day : 0;
  });

  return (
    <div className="attendance-calendar-wrap">
      <div className="attendance-calendar">
        <div className="calendar-head"><button className="mini-btn ghost-mini" disabled>Prev</button><strong>{monthName}</strong><button className="mini-btn ghost-mini" disabled>Next</button></div>
        <div className="calendar-weekdays">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day}>{day}</span>)}</div>
        <div className="calendar-grid">
          {cells.map((day, index) => {
            const record = day ? byDay.get(day) : undefined;
            return (
              <div className={`calendar-cell ${record ? `status-${record.status.toLowerCase()}` : ""}`} key={`${day}-${index}`}>
                {day ? <><b>{day}</b>{record && <span>{attendanceStatusShort(record.status)}</span>}</> : null}
              </div>
            );
          })}
        </div>
      </div>
      <div className="attendance-legend">
        <strong>Legends</strong>
        {attendanceStatuses.map((status) => <span key={status}><i className={`status-${status.toLowerCase()}`} /> {status}</span>)}
        <span><i /> Not marked</span>
      </div>
    </div>
  );
}

function AttendanceLogsPanel({ summaries, filters, setFilters, onSelectStudent }: { summaries: AttendanceSummary[]; filters: { dateFrom: string; dateTo: string; status: string; student: string; course: string; batch: string }; setFilters: Dispatch<SetStateAction<{ dateFrom: string; dateTo: string; status: string; student: string; course: string; batch: string }>>; onSelectStudent: (summary: AttendanceSummary) => void }) {
  return (
    <div className="attendance-stack">
      <div className="attendance-log-filters">
        <input value={filters.student} onChange={(event) => setFilters((current) => ({ ...current, student: event.target.value }))} placeholder="Search student" />
        <button className="mini-btn ghost-mini" onClick={() => setFilters({ dateFrom: "", dateTo: "", status: "", student: "", course: "", batch: "" })}>Clear</button>
      </div>
      <div className="crm-table">
        <div className="table-row attendance-summary-row head"><span>Student</span><span>Course</span><span>Batch</span><span>Present</span><span>Absent</span><span>Late</span><span>Leave</span><span>Total</span><span>Action</span></div>
        {summaries.map((summary) => (
          <div className="table-row attendance-summary-row" key={summary.studentId}>
            <span><strong>{summary.studentName || "-"}</strong><small>{summary.centre || "-"}</small></span>
            <span>{courseShortCode(summary.course)}</span>
            <span>{summary.batch || "-"}</span>
            <span>{summary.present || 0}</span>
            <span>{summary.absent || 0}</span>
            <span>{summary.late || 0}</span>
            <span>{summary.leave || 0}</span>
            <span>{summary.total || 0}</span>
            <span><button className="mini-btn ghost-mini" onClick={() => onSelectStudent(summary)}>View</button></span>
          </div>
        ))}
        {!summaries.length && <p className="empty-state">No attendance logs found.</p>}
      </div>
    </div>
  );
}

function AttendanceDetailPanel({ student, logs, filters, setFilters, onBack, onDownload }: { student: AttendanceSummary | null; logs: Attendance[]; filters: { dateFrom: string; dateTo: string; status: string }; setFilters: Dispatch<SetStateAction<{ dateFrom: string; dateTo: string; status: string }>>; onBack: () => void; onDownload: () => void }) {
  if (!student) {
    return (
      <div className="attendance-detail-empty">
        <button className="mini-btn ghost-mini" onClick={onBack}><ChevronLeft size={15} /> Back</button>
        <p className="empty-state">Select a student from Attendance logs to view day-wise attendance.</p>
      </div>
    );
  }

  return (
    <div className="attendance-detail-view">
      <div className="section-head compact-head">
        <div className="attendance-detail-title">
          <button className="btn secondary-btn attendance-back-btn" onClick={onBack}><ChevronLeft size={17} /> Back</button>
          <h2><UserRound size={21} /> <span>{student.studentName || "Student attendance"}</span></h2>
          <p>{courseShortCode(student.course)} - {student.batch || "No batch"} - {student.centre || "No centre"}</p>
        </div>
        <div className="toolbar-actions">
          <button className="btn secondary-btn" onClick={onDownload} disabled={!logs.length}><Download size={17} /> Download</button>
        </div>
      </div>

      <div className="attendance-detail-layout">
        <div className="attendance-calendar-panel">
          <AttendanceCalendar logs={logs} />
        </div>
        <aside className="attendance-detail-side">
          <div className="attendance-filter-card">
            <strong>Filters</strong>
            <label><span>From</span><input type="date" value={filters.dateFrom} onChange={(event) => setFilters((current) => ({ ...current, dateFrom: event.target.value }))} /></label>
            <label><span>To</span><input type="date" value={filters.dateTo} onChange={(event) => setFilters((current) => ({ ...current, dateTo: event.target.value }))} /></label>
            <label><span>Status</span><select value={filters.status} onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}><option value="">All statuses</option>{attendanceStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <button className="mini-btn ghost-mini" onClick={() => setFilters({ dateFrom: "", dateTo: "", status: "" })}>Clear filters</button>
          </div>
          <div className="attendance-stat-card">
            <span>Present <b>{logs.filter((record) => record.status === "Present").length}</b></span>
            <span>Absent <b>{logs.filter((record) => record.status === "Absent").length}</b></span>
            <span>Late <b>{logs.filter((record) => record.status === "Late").length}</b></span>
            <span>Leave <b>{logs.filter((record) => record.status === "Leave").length}</b></span>
          </div>
        </aside>
      </div>

      <div className="crm-table attendance-day-table">
        <div className="table-row attendance-detail-row head"><span>Date</span><span>Status</span><span>Course</span><span>Batch</span><span>Marked by</span><span>Note</span></div>
        {logs.map((record) => (
          <div className="table-row attendance-detail-row" key={record._id || `${record.studentId}-${record.date}`}>
            <span>{formatDate(record.date)}</span>
            <span>{record.status}</span>
            <span>{courseShortCode(record.course)}</span>
            <span>{record.batch || "-"}</span>
            <span>{record.markedBy || record.counsellor || "-"}</span>
            <span>{record.note || "-"}</span>
          </div>
        ))}
        {!logs.length && <p className="empty-state">No day-wise attendance found for this student.</p>}
      </div>
    </div>
  );
}

function BatchStrengthPanel({ batches, students, onOpen }: { batches: Batch[]; students: Student[]; onOpen: (student: Student) => void }) {
  const [selectedBatch, setSelectedBatch] = useState("");
  const batchRows = batches.map((batch) => {
    const batchStudents = students.filter((student) => student.batch === batch.name);
    return { batch, count: batchStudents.length };
  });
  const assignedCount = students.filter((student) => student.batch).length;
  const unassignedCount = students.length - assignedCount;
  const selectedStudents = selectedBatch ? students.filter((student) => student.batch === selectedBatch) : [];

  return (
    <div className="panel-stack batch-strength-stack">
      <div className="metric-grid three">
        <Metric icon={<Users />} label="Students in batches" value={assignedCount} />
        <Metric icon={<CalendarDays />} label="Total batches" value={batches.length} />
        <Metric icon={<GraduationCap />} label="No batch assigned" value={unassignedCount} />
      </div>
      <div className="batch-picker">
        <label>
          <span>Select specific batch</span>
          <select value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
            <option value="">Choose batch</option>
            {batches.map((batch) => <option key={batch._id} value={batch.name}>{batch.name}</option>)}
          </select>
        </label>
        {selectedBatch && <strong>{selectedStudents.length} student{selectedStudents.length === 1 ? "" : "s"} in {selectedBatch}</strong>}
      </div>
      <div className="batch-strength-grid">
        <div className="batch-count-list">
          <div className="batch-count-row head"><span>Batch</span><span>Course / centre</span><span>Start date</span><span>Students</span><span>Action</span></div>
          {batchRows.map(({ batch, count }) => (
            <div className="batch-count-row" key={batch._id}>
              <span><strong>{batch.name}</strong></span>
              <span>{courseShortCode(batch.course)} / {batch.centre || "-"}</span>
              <span>{formatDate(batch.commenceDate)}</span>
              <span><b>{count}</b></span>
              <button className="mini-btn ghost-mini" onClick={() => setSelectedBatch(batch.name)}>View</button>
            </div>
          ))}
          {!batchRows.length && <p className="empty-state">No batches created yet. Create batches from Settings.</p>}
        </div>
        <div className="selected-batch-list">
          <div className="section-title"><Users size={18} /> {selectedBatch || "Selected batch"}</div>
          {selectedStudents.map((student) => (
            <button className="batch-student-row" key={student._id} onClick={() => onOpen(student)}>
              <strong>{student.fullName}</strong>
              <span>{student.admissionNumber || student.phone} | {courseShortCode(student.course)} | {student.status}</span>
            </button>
          ))}
          {!selectedBatch && <p className="empty-state">Select a batch to see its students.</p>}
          {selectedBatch && !selectedStudents.length && <p className="empty-state">No students assigned to this batch yet.</p>}
        </div>
      </div>
    </div>
  );
}

function FinancePanel({ students }: { students: Student[] }) {
  const billed = students.reduce((sum, student) => sum + (student.totalFee || 0), 0);
  const collected = students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
  const due = students.reduce((sum, student) => sum + Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0)), 0);
  return <div className="panel-stack"><div className="metric-grid"><Metric icon={<BadgeIndianRupee />} label="Total billed incl. GST" value={formatCurrency(billed)} /><Metric icon={<CircleDollarSign />} label="Collected" value={formatCurrency(collected)} /><Metric icon={<ReceiptText />} label="Pending due" value={formatCurrency(due)} /><Metric icon={<GraduationCap />} label="Students" value={students.length} /></div><div className="section-title"><CircleDollarSign size={18} /> Fee collection</div><div className="crm-table"><div className="table-row finance-table-row head"><span>Student</span><span>Centre</span><span>Course</span><span>Fee incl. GST</span><span>Paid</span><span>Due</span><span>Status</span></div>{students.map((student) => { const rowDue = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0)); return <div className="table-row finance-table-row" key={student._id}><span>{student.fullName}</span><span>{student.centre || "-"}</span><span>{courseShortCode(student.course)}</span><span>{formatCurrency(student.totalFee || 0)}</span><span>{formatCurrency(student.paidAmount || 0)}</span><span>{formatCurrency(rowDue)}</span><span>{rowDue <= 0 ? "Paid" : "Partial"}</span></div>; })}{!students.length && <p className="empty-state">No students yet</p>}</div></div>;
}

function emiStatusLabel(days: number) {
  if (days < 0) return `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`;
  if (days === 0) return "Due today";
  return `Due in ${days} day${days === 1 ? "" : "s"}`;
}

function emiTagClass(days: number) {
  if (days < 0) return "amber";
  if (days === 0) return "blue";
  return "green";
}

function getEmiReminderRows(students: Student[]) {
  return students
    .filter((student) => student.emiEnabled && student.nextEmiDate && studentDueAmount(student) > 0)
    .map((student) => ({ student, due: studentDueAmount(student), emiDue: studentEmiDueAmount(student), days: daysBetweenToday(student.nextEmiDate) }))
    .sort((a, b) => a.days - b.days || a.student.fullName.localeCompare(b.student.fullName));
}

function EmiReminderList({ students, onOpen }: { students: Student[]; onOpen: (student: Student) => void }) {
  const rows = getEmiReminderRows(students);
  const dueNow = rows.filter((item) => item.days <= 0);
  const upcoming = rows.filter((item) => item.days > 0);

  return (
    <div className="panel-stack emi-reminder-stack">
      <div className="metric-grid three">
        <Metric icon={<CalendarDays />} label="Due / overdue" value={dueNow.length} />
        <Metric icon={<BadgeIndianRupee />} label="EMI due now" value={formatCurrency(dueNow.reduce((sum, item) => sum + item.emiDue, 0))} />
        <Metric icon={<MessageCircle />} label="Upcoming EMI" value={upcoming.length} />
      </div>
      <div className="finance-list">
        {rows.map(({ student, due, emiDue, days }) => (
          <div className="finance-row emi-reminder-row" key={student._id}>
            <button className="emi-student-link" onClick={() => onOpen(student)}>
              <strong>{student.fullName}</strong>
              <span>{student.phone} | {courseShortCode(student.course)} | {student.centre || "-"}</span>
            </button>
            <div>
              <span>Monthly EMI due</span>
              <b>{formatCurrency(emiDue)}</b>
              <small>Total balance {formatCurrency(due)}</small>
            </div>
            <div>
              <span>Next due date</span>
              <b>{formatDate(student.nextEmiDate)}</b>
              <small className={`tag ${emiTagClass(days)}`}>{emiStatusLabel(days)}</small>
            </div>
            <a className="mini-btn whatsapp-btn" href={whatsappUrlFor(student.phone, emiReminderMessage(student))} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> Send reminder
            </a>
          </div>
        ))}
        {!rows.length && <p className="empty-state">No active EMI plans found. Save an EMI plan from a student payment profile to show it here.</p>}
      </div>
    </div>
  );
}

function ReceiptList({ students, onOpen }: { students: Student[]; onOpen: (student: Student) => void }) {
  return <div className="finance-list">{students.map((student) => {
    const netFee = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0));
    const due = Math.max(0, netFee - (student.paidAmount || 0));
    const paymentCount = student.payments?.length || 0;
    return <div className="finance-row receipt-row" key={student._id}><div><strong>{student.fullName}</strong><span>{student.admissionNumber || "Admission pending"} - {courseShortCode(student.course)} - {paymentCount} payment receipt{paymentCount === 1 ? "" : "s"}</span></div><div><span>Paid {formatCurrency(student.paidAmount || 0)}</span><b>{due > 0 ? `Due ${formatCurrency(due)}` : "Paid in full"}</b></div><button className="mini-btn" onClick={() => onOpen(student)}><FileText size={15} /> View receipts</button></div>;
  })}{!students.length && <p className="empty-state">No receipts yet. Admit a lead first.</p>}</div>;
}

function CertificateList({ students, onOpen, onIssue }: { students: Student[]; onOpen: (student: Student) => void; onIssue: (student: Student) => void }) {
  return <div className="finance-list">{students.map((student) => {
    const issued = student.certificateStatus === "Issued";
    const ready = isCertificateEligible(student);
    return <div className={`finance-row certificate-row ${ready ? "" : "certificate-row-pending"}`} key={student._id}><div><strong>{student.fullName}</strong><span>{student.admissionNumber || "Admission pending"} - {courseShortCode(student.course)}</span></div><div><span>{issued ? student.certificateNumber : ready ? "Ready to issue" : "Course not completed"}</span><b>{issued ? `Issued ${formatDate(student.certificateIssuedAt)}` : student.status}</b></div><div className="row-actions"><button className="mini-btn ghost-mini" onClick={() => onOpen(student)}><FileText size={15} /> View</button>{issued ? <a className="mini-btn whatsapp-btn" href={whatsappWebUrl(student)} target="_blank" rel="noreferrer">WhatsApp Web</a> : ready ? <button className="mini-btn" onClick={() => onIssue(student)}><Award size={15} /> Issue</button> : <span className="mini-status">Not ready</span>}</div></div>;
  })}{!students.length && <p className="empty-state">No students available for certificate review yet.</p>}</div>;
}

function invoiceShareMessage(student: Student) {
  const total = student.totalFee || 0;
  const discount = student.discountAmount || 0;
  const paid = student.paidAmount || 0;
  const due = Math.max(0, total - discount - paid);
  return `Dear ${student.fullName}, your iMED Academy tax invoice ${invoiceNumber(student)} for ${courseShortCode(student.course)} is ready. Invoice amount: ${formatCurrency(Math.max(0, total - discount))}. Paid: ${formatCurrency(paid)}. Balance: ${formatCurrency(due)}.`;
}

function paymentReceiptNumber(student: Student, index: number) {
  const base = student.admissionNumber || student._id.slice(-6).toUpperCase();
  return `RCPT/${base}/${String(index + 1).padStart(3, "0")}`;
}

function paymentReceiptShareMessage(student: Student, payment: PaymentRecord, index: number) {
  return `Dear ${student.fullName}, your iMED Academy payment receipt ${paymentReceiptNumber(student, index)} for ${formatCurrency(payment.amount || 0)} is ready. Payment mode: ${payment.mode || "Cash"}. Date: ${formatDate(payment.paidAt)}.`;
}

function TaxInvoice({ student, paymentMode, centres }: { student: Student; paymentMode: string; centres: Centre[] }) {
  const billing = billingEntityForStudent(student, centres);
  const lastPayment = student.payments?.[student.payments.length - 1];
  const totalFee = student.totalFee || 0;
  const discount = student.discountAmount || 0;
  const paid = student.paidAmount || 0;
  const taxableCourseFee = Math.round(totalFee / (1 + GST_RATE));
  const taxableDiscount = Math.round(discount / (1 + GST_RATE));
  const taxableValue = Math.max(0, taxableCourseFee - taxableDiscount);
  const cgst = Math.round(taxableValue * 0.09);
  const sgst = Math.round(taxableValue * 0.09);
  const invoiceTotal = taxableValue + cgst + sgst;
  const due = Math.max(0, invoiceTotal - paid);
  const invoiceDate = formatDate(student.createdAt || new Date().toISOString());
  const courseName = certificateCourseName(student.course);
  const placeOfSupply = student.centre === "Kochi" ? "Kerala, Code : 32" : student.centre === "Bangalore" ? "Karnataka, Code : 29" : "Delhi, Code : 07";

  return (
    <div className="tax-invoice">
      <div className="tax-title">Tax Invoice</div>
      <div className="invoice-top-grid">
        <div className="invoice-seller">
          <strong>{billing.legalName}</strong>
          <span>{billing.address}</span>
          <span><b>GSTIN/UIN:</b> {billing.gstin}</span>
          <span><b>State Name:</b> {billing.stateName}, Code : {billing.stateCode}</span>
          <span><b>E-Mail:</b> {billing.email}{billing.phone ? ` | Phone: ${billing.phone}` : ""}</span>
          <span><b>Consignee (Ship To)</b></span>
          <strong>{student.fullName}</strong>
          <span>{student.centre || "Delhi"}</span>
          <span><b>State Name:</b> {placeOfSupply}</span>
        </div>
        <div className="invoice-meta-grid">
          <div><span>Invoice No.</span><b>{invoiceNumber(student)}</b></div>
          <div><span>Dated</span><b>{invoiceDate}</b></div>
          <div><span>Delivery Note</span><b>{paymentMode}</b></div>
          <div><span>Mode/Terms of Payment</span><b>{paymentMode}</b></div>
          <div><span>Reference No. & Date.</span><b>{student.admissionNumber || "-"}</b></div>
          <div><span>Received By</span><b>{lastPayment?.by || "-"}</b></div>
          <div><span>Buyer&apos;s Order No.</span><b>-</b></div>
          <div><span>Dated</span><b>-</b></div>
          <div><span>Dispatch Doc No.</span><b>-</b></div>
          <div><span>Delivery Note Date</span><b>-</b></div>
          <div><span>Dispatched through</span><b>-</b></div>
          <div><span>Destination</span><b>{student.centre || "-"}</b></div>
          <div className="invoice-terms"><span>Terms of Delivery</span><b>Course admission fee</b></div>
        </div>
      </div>
      <div className="invoice-buyer">
        <span>Buyer (Bill to)</span>
        <strong>{student.fullName}</strong>
        <span>{student.centre || "Delhi"}</span>
        <span><b>Phone:</b> {student.phone}</span>
        <span><b>State Name:</b> {placeOfSupply}</span>
      </div>
      <table className="invoice-items">
        <thead>
          <tr><th>Sl No</th><th>Particulars</th><th>HSN/SAC</th><th>Quantity</th><th>Rate</th><th>per</th><th>Amount</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><b>Course Fees</b><small>{courseName}</small></td>
            <td>999294</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{formatInvoiceAmount(taxableCourseFee)}</td>
          </tr>
          {taxableDiscount > 0 && <tr>
            <td></td>
            <td><b>Less : Discount Allowed</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>(-) {formatInvoiceAmount(taxableDiscount)}</td>
          </tr>}
          <tr><td></td><td className="tax-line">Output CGST @9%</td><td></td><td></td><td>9%</td><td></td><td>{formatInvoiceAmount(cgst)}</td></tr>
          <tr><td></td><td className="tax-line">Output SGST @9%</td><td></td><td></td><td>9%</td><td></td><td>{formatInvoiceAmount(sgst)}</td></tr>
          <tr className="invoice-total-row"><td colSpan={6}>Total</td><td>Rs. {formatInvoiceAmount(invoiceTotal)}</td></tr>
        </tbody>
      </table>
      <div className="amount-words"><span>Amount Chargeable (in words)</span><b>INR {numberToIndianWords(invoiceTotal)} Only</b><em>E. & O.E</em></div>
      <table className="gst-summary">
        <thead><tr><th>HSN/SAC</th><th>Taxable Value</th><th>CGST Rate</th><th>CGST Amount</th><th>SGST/UTGST Rate</th><th>SGST/UTGST Amount</th><th>Total Tax Amount</th></tr></thead>
        <tbody>
          <tr><td>999294</td><td>{formatInvoiceAmount(taxableValue)}</td><td>9%</td><td>{formatInvoiceAmount(cgst)}</td><td>9%</td><td>{formatInvoiceAmount(sgst)}</td><td>{formatInvoiceAmount(cgst + sgst)}</td></tr>
          <tr><td><b>Total</b></td><td><b>{formatInvoiceAmount(taxableValue)}</b></td><td></td><td><b>{formatInvoiceAmount(cgst)}</b></td><td></td><td><b>{formatInvoiceAmount(sgst)}</b></td><td><b>{formatInvoiceAmount(cgst + sgst)}</b></td></tr>
        </tbody>
      </table>
      <div className="tax-words"><span>Tax Amount (in words) :</span><b>INR {numberToIndianWords(cgst + sgst)} Only</b></div>
      <div className="invoice-bottom">
        <div>
          <span><b>Remarks:</b></span>
          <span>Being invoice raised against fees received from Student.</span>
          <span className="paid-due">Paid: {formatCurrency(paid)} | Balance: {formatCurrency(due)}</span>
        </div>
        <div className="bank-details">
          <strong>Company&apos;s Bank Details</strong>
          <span><b>A/c Holder&apos;s Name:</b> {billing.bankAccountName}</span>
          <span><b>Bank Name:</b> {billing.bankName}</span>
          <span><b>A/c No.:</b> {billing.bankAccountNumber}</span>
          <span><b>Branch & IFS Code:</b> {billing.bankBranch} & {billing.bankIfsc}</span>
          <b>for {billing.legalName}</b>
          <em>Authorised Signatory</em>
        </div>
      </div>
      <div className="invoice-footer">This is a Computer Generated Invoice</div>
    </div>
  );
}

function PaymentReceipt({ student, payment, paymentIndex, centres }: { student: Student; payment: PaymentRecord; paymentIndex: number; centres: Centre[] }) {
  const billing = billingEntityForStudent(student, centres);
  const netFee = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0));
  const paidBefore = student.payments?.slice(0, paymentIndex).reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0;
  const paidTillDate = student.payments?.slice(0, paymentIndex + 1).reduce((sum, item) => sum + Number(item.amount || 0), 0) || Number(payment.amount || 0);
  const balanceAfter = Math.max(0, netFee - paidTillDate);
  const isEmiPayment = payment.mode === "EMI";
  const receiptDate = formatDate(payment.paidAt || new Date().toISOString());
  const courseName = certificateCourseName(student.course);
  const placeOfSupply = student.centre === "Kochi" ? "Kerala, Code : 32" : student.centre === "Bangalore" ? "Karnataka, Code : 29" : "Delhi, Code : 07";

  return (
    <div className="tax-invoice payment-invoice">
      <div className="tax-title">{isEmiPayment ? "EMI Payment Receipt" : "Payment Receipt"}</div>
      <div className="invoice-top-grid">
        <div className="invoice-seller">
          <strong>{billing.legalName}</strong>
          <span>{billing.address}</span>
          <span><b>GSTIN/UIN:</b> {billing.gstin}</span>
          <span><b>State Name:</b> {billing.stateName}, Code : {billing.stateCode}</span>
          <span><b>E-Mail:</b> {billing.email}{billing.phone ? ` | Phone: ${billing.phone}` : ""}</span>
          <span><b>Received From</b></span>
          <strong>{student.fullName}</strong>
          <span>{student.centre || "Delhi"}</span>
          <span><b>Phone:</b> {student.phone}</span>
          <span><b>State Name:</b> {placeOfSupply}</span>
        </div>
        <div className="invoice-meta-grid">
          <div><span>Receipt No.</span><b>{paymentReceiptNumber(student, paymentIndex)}</b></div>
          <div><span>Dated</span><b>{receiptDate}</b></div>
          <div><span>Payment Type</span><b>{isEmiPayment ? "EMI Installment" : "Course Fee Payment"}</b></div>
          <div><span>Mode/Terms of Payment</span><b>{payment.mode || "Cash"}</b></div>
          <div><span>Admission No.</span><b>{student.admissionNumber || "-"}</b></div>
          <div><span>Received By</span><b>{payment.by || "-"}</b></div>
          <div><span>Course</span><b>{courseShortCode(student.course)}</b></div>
          <div><span>Centre</span><b>{student.centre || "-"}</b></div>
          <div><span>Installment No.</span><b>{String(paymentIndex + 1).padStart(2, "0")}</b></div>
          <div><span>Balance Status</span><b>{balanceAfter <= 0 ? "Paid" : "Partial"}</b></div>
          <div className="invoice-terms"><span>Terms of Receipt</span><b>Receipt issued against split payment collected for course fee.</b></div>
        </div>
      </div>
      <div className="invoice-buyer">
        <span>Student (Receipt to)</span>
        <strong>{student.fullName}</strong>
        <span>{courseName}</span>
        <span><b>Phone:</b> {student.phone}</span>
        <span><b>Admission No.:</b> {student.admissionNumber || "Admission pending"}</span>
      </div>
      <table className="invoice-items payment-items">
        <thead>
          <tr><th>Sl No</th><th>Particulars</th><th>Receipt Ref</th><th>Payment Mode</th><th>Amount</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><b>{isEmiPayment ? "EMI Installment Received" : "Course Fee Payment Received"}</b><small>{courseName}</small></td>
            <td>{paymentReceiptNumber(student, paymentIndex)}</td>
            <td>{payment.mode || "Cash"}</td>
            <td>{formatInvoiceAmount(Number(payment.amount || 0))}</td>
          </tr>
          <tr><td></td><td className="tax-line">Total Course Fee</td><td></td><td></td><td>{formatInvoiceAmount(netFee)}</td></tr>
          <tr><td></td><td className="tax-line">Paid Before This Receipt</td><td></td><td></td><td>{formatInvoiceAmount(paidBefore)}</td></tr>
          <tr><td></td><td className="tax-line">Paid Till Date</td><td></td><td></td><td>{formatInvoiceAmount(paidTillDate)}</td></tr>
          <tr className="invoice-total-row"><td colSpan={4}>Balance After This Payment</td><td>Rs. {formatInvoiceAmount(balanceAfter)}</td></tr>
        </tbody>
      </table>
      <div className="amount-words"><span>Amount Received (in words)</span><b>INR {numberToIndianWords(Number(payment.amount || 0))} Only</b><em>E. & O.E</em></div>
      <table className="gst-summary payment-summary">
        <thead><tr><th>Total Fee</th><th>Previous Paid</th><th>This Payment</th><th>Paid Till Date</th><th>Balance</th></tr></thead>
        <tbody>
          <tr><td>{formatInvoiceAmount(netFee)}</td><td>{formatInvoiceAmount(paidBefore)}</td><td>{formatInvoiceAmount(Number(payment.amount || 0))}</td><td>{formatInvoiceAmount(paidTillDate)}</td><td>{formatInvoiceAmount(balanceAfter)}</td></tr>
        </tbody>
      </table>
      {payment.note && <div className="tax-words"><span>Note :</span><b>{payment.note}</b></div>}
      <div className="invoice-bottom">
        <div>
          <span><b>Remarks:</b></span>
          <span>This receipt acknowledges payment received against the student&apos;s course fee.</span>
          <span className="paid-due">Payment: {formatCurrency(payment.amount || 0)} | Paid Till Date: {formatCurrency(paidTillDate)} | Balance: {formatCurrency(balanceAfter)}</span>
        </div>
        <div className="bank-details">
          <strong>Company&apos;s Bank Details</strong>
          <span><b>A/c Holder&apos;s Name:</b> {billing.bankAccountName}</span>
          <span><b>Bank Name:</b> {billing.bankName}</span>
          <span><b>A/c No.:</b> {billing.bankAccountNumber}</span>
          <span><b>Branch & IFS Code:</b> {billing.bankBranch} & {billing.bankIfsc}</span>
          <b>for {billing.legalName}</b>
          <em>Authorised Signatory</em>
        </div>
      </div>
      <div className="invoice-footer">This is a Computer Generated Receipt</div>
    </div>
  );
}

function ProfilePanel({ profile, previousPanel, setPanel, onConvert, onIssueCertificate, onPayment, onUpdateStudent, isSuperAdmin, canManageFees, counsellors, centres, batches, onAssignCounsellor, onAssignLeadCentre, onAssignLeadCounsellor, onAssignBatch, onPrint }: { profile: ProfileTarget; previousPanel: Panel; setPanel: (panel: Panel) => void; onConvert: (lead: Lead) => void; onIssueCertificate: (student: Student) => void; onPayment: (event: FormEvent<HTMLFormElement>, studentId: string, sendWhatsapp?: boolean) => void; onUpdateStudent: (id: string, updates: Partial<Student>) => void; isSuperAdmin: boolean; canManageFees: boolean; counsellors: Counsellor[]; centres: Centre[]; batches: Batch[]; onAssignCounsellor: (studentId: string, counsellor: string) => void; onAssignLeadCentre: (leadId: string, centre: string) => void; onAssignLeadCounsellor: (leadId: string, counsellor: string) => void; onAssignBatch: (studentId: string, batchName: string) => void; onPrint: () => void }) {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [emiMonthsDraft, setEmiMonthsDraft] = useState("");
  const [receiptSelection, setReceiptSelection] = useState<ReceiptSelection>({ type: "invoice" });
  const profileKey = profile ? `${profile.type}-${profile.data._id}` : "";

  useEffect(() => {
    setPaymentMode(profile?.type === "student" && profile.data.emiEnabled ? "EMI" : "Cash");
    setEmiMonthsDraft(profile?.type === "student" && profile.data.emiMonths ? String(profile.data.emiMonths) : "");
    setReceiptSelection({ type: "invoice" });
  }, [profileKey, profile]);

  if (!profile) return <section className="crm-card"><p className="empty-state">No profile selected.</p></section>;
  const isStudent = profile.type === "student";
  const showReceiptInvoice = isStudent && previousPanel === "receipts";
  const showCertificateBlockedState = isStudent && previousPanel === "certificates" && !isCertificateEligible(profile.data);
  const person = profile.data;
  const stage = isStudent ? profile.data.status : profile.data.stage;
  const totalFee = isStudent ? profile.data.totalFee || 0 : profile.data.expectedFee || 0;
  const discount = isStudent ? profile.data.discountAmount || 0 : 0;
  const paid = isStudent ? profile.data.paidAmount || 0 : 0;
  const netFee = Math.max(0, totalFee - discount);
  const due = Math.max(0, netFee - paid);
  const certificateIssued = isStudent && profile.data.certificateStatus === "Issued";
  const certificateReady = isStudent && ["Course Completed", "Placed"].includes(profile.data.status);
  const activeEmiMonths = Math.max(0, Number(emiMonthsDraft || 0));
  const calculatedEmiAmount = due > 0 && activeEmiMonths > 0 ? Math.ceil(due / activeEmiMonths) : 0;
  const savedEmiIsCurrent = Boolean(isStudent && profile.data.emiMonths && profile.data.emiMonths === activeEmiMonths && profile.data.emiAmount === calculatedEmiAmount);
  const displayEmiAmount = calculatedEmiAmount || (isStudent ? profile.data.emiAmount || 0 : 0);
  const selectedPayment = isStudent && receiptSelection.type === "payment" ? profile.data.payments?.[receiptSelection.index] : undefined;
  const handleEmiPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isStudent || !canManageFees) return;
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    const months = Number(payload.emiMonths || 0);
    if (due <= 0) {
      toast.message("No pending balance to split into EMI");
      return;
    }
    if (months <= 0) {
      toast.error("Enter the number of installments");
      return;
    }
    const autoEmiAmount = months > 0 && due > 0 ? Math.ceil(due / months) : 0;
    onUpdateStudent(profile.data._id, {
      emiEnabled: true,
      emiMonths: months,
      emiAmount: autoEmiAmount,
      nextEmiDate: String(payload.nextEmiDate || ""),
    });
  };

  const handleCertificateShare = async () => {
    if (!isStudent) return;
    try {
      await shareCertificatePdf(profile.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create certificate PDF");
    }
  };
  const handleDocumentDownload = async (field: "governmentProof" | "highestQualificationCertificate") => {
    const documentFile = person[field];
    if (!documentFile?.storedName) return;
    try {
      await downloadDocument(isStudent ? "student" : "lead", person._id, field, documentFile.originalName || "document");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to download document");
    }
  };
  const handleReceiptShare = async () => {
    if (!isStudent) return;
    const isPaymentReceipt = receiptSelection.type === "payment" && selectedPayment;
    const receiptIndex = isPaymentReceipt ? receiptSelection.index : 0;
    const message = isPaymentReceipt ? paymentReceiptShareMessage(profile.data, selectedPayment, receiptIndex) : invoiceShareMessage(profile.data);
    const filenameBase = isPaymentReceipt ? paymentReceiptNumber(profile.data, receiptIndex) : invoiceNumber(profile.data);
    try {
      await shareReceiptPdf(profile.data, message, filenameBase);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create receipt PDF");
    }
  };

  if (showCertificateBlockedState && isStudent) {
    return (
      <div className="panel-stack">
        <section className="certificate-blocked-card">
          <button className="mini-btn ghost-mini no-print" onClick={() => setPanel("certificates")}>Back</button>
          <div className="certificate-blocked-animation" aria-hidden="true">
            <Lottie animationData={courseIncompleteAnimation} loop autoplay style={{ width: "100%", height: "100%" }} />
            <div className="certificate-css-animation">
              <div className="certificate-css-paper">
                <span />
                <span />
                <span />
              </div>
              <div className="certificate-css-badge" />
              <div className="certificate-css-clock">
                <i />
              </div>
            </div>
          </div>
          <div className="certificate-blocked-copy">
            <p className="eyebrow">Certificate not ready</p>
            <h2>{profile.data.fullName} has not completed the course yet</h2>
            <p>
              Certificates can be generated only after the student status is marked as Course Completed or Placed.
              Current status: <strong>{profile.data.status}</strong>.
            </p>
            <div className="certificate-blocked-meta">
              <span>{courseShortCode(profile.data.course)}</span>
              <span>{profile.data.admissionNumber || profile.data.phone}</span>
              <span>{profile.data.centre || "Centre not assigned"}</span>
            </div>
            <button className="mini-btn" onClick={() => setPanel("students")}>Go to students</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="panel-stack">
      <section className="profile-card">
        <button className="mini-btn ghost-mini no-print" onClick={() => setPanel(previousPanel === "profile" ? "dashboard" : previousPanel)}>Back</button>
        <div className="profile-avatar">{initials(person.fullName)}</div>
        <div>
          <p className="eyebrow">{isStudent ? "Student profile" : "Lead profile"}</p>
          <h2>{person.fullName}</h2>
          <span>{courseShortCode(person.course)} | {person.centre || "-"} | {person.phone}</span>
        </div>
        <strong className="status-pill">{stage}</strong>
      </section>

      {isStudent ? (
        <div className="metric-grid three">
          <Metric icon={<BadgeIndianRupee />} label="Total fee incl. GST" value={formatCurrency(totalFee)} />
          <Metric icon={<CircleDollarSign />} label="Paid" value={formatCurrency(paid)} />
          <Metric icon={<ReceiptText />} label="Pending due" value={formatCurrency(due)} />
        </div>
      ) : (
        <div className="metric-grid three">
          <Metric icon={<PhoneCall />} label="Source" value={profile.data.source || "-"} />
          <Metric icon={<UserRound />} label="Owner" value={ownerLabel(profile.data)} />
          <Metric icon={<BadgeIndianRupee />} label="Expected fee incl. GST" value={formatCurrency(profile.data.expectedFee || 0)} />
        </div>
      )}

      {!showReceiptInvoice && <section className="crm-card">
        <h2><Sparkles size={21} /> Journey</h2>
        <Journey current={stage} />
      </section>}

      {!showReceiptInvoice && <section className="crm-card">
        <h2><ClipboardList size={21} /> Lead documents</h2>
        <div className="lead-doc-grid">
          <div><span>Parent mobile no.</span><strong>{person.parentMobile || "-"}</strong></div>
          <div><span>Government proof</span><strong>{documentLabel(person.governmentProof)}</strong>{person.governmentProof?.storedName && <button className="mini-btn ghost-mini" onClick={() => handleDocumentDownload("governmentProof")}>Download</button>}</div>
          <div><span>Highest qualification certificate</span><strong>{documentLabel(person.highestQualificationCertificate)}</strong>{person.highestQualificationCertificate?.storedName && <button className="mini-btn ghost-mini" onClick={() => handleDocumentDownload("highestQualificationCertificate")}>Download</button>}</div>
        </div>
      </section>}

      {!isStudent && (
        <section className="crm-card no-print">
          <h2><Building2 size={21} /> Centre assignment</h2>
          <div className="assignment-row">
            <div><strong>{profile.data.centre || "No centre assigned"}</strong><span>Assign website enquiries to a centre</span></div>
            <select value={profile.data.centre || ""} onChange={(event) => onAssignLeadCentre(profile.data._id, event.target.value)}>
              <option value="">Unassigned</option>
              {centres.map((centre) => <option key={centre._id} value={centre.name}>{centre.name}</option>)}
            </select>
          </div>
        </section>
      )}

      {!isStudent && isSuperAdmin && (
        <section className="crm-card no-print">
          <h2><UserRound size={21} /> Counsellor assignment</h2>
          <div className="assignment-row">
            <div><strong>Current counsellor</strong><span>{ownerLabel(profile.data)}</span></div>
            <select value={profile.data.counsellor || ""} onChange={(event) => onAssignLeadCounsellor(profile.data._id, event.target.value)}>
              <option value="">Unassigned</option>
              {counsellors.map((counsellor) => <option key={counsellor.email} value={counsellor.name}>{counsellor.name}</option>)}
            </select>
          </div>
        </section>
      )}

      {isStudent && !showReceiptInvoice && isSuperAdmin && (
        <section className="crm-card no-print">
          <h2><UserRound size={21} /> Counsellor assignment</h2>
          <div className="assignment-row">
            <div><strong>Current counsellor</strong><span>{ownerLabel(profile.data)}</span></div>
            <select value={profile.data.counsellor || ""} onChange={(event) => onAssignCounsellor(profile.data._id, event.target.value)}>
              <option value="">Unassigned</option>
              {counsellors.map((counsellor) => <option key={counsellor.email} value={counsellor.name}>{counsellor.name}</option>)}
            </select>
          </div>
        </section>
      )}

      {isStudent && !showReceiptInvoice && (
        <section className="crm-card no-print">
          <h2><CalendarDays size={21} /> Batch assignment</h2>
          <div className="assignment-row">
            <div><strong>{profile.data.batch || "No batch assigned"}</strong><span>{profile.data.batchCommenceDate ? `Commences ${formatDate(profile.data.batchCommenceDate)}` : "Select a batch to add commence date"}</span></div>
            <select value={profile.data.batch || ""} onChange={(event) => onAssignBatch(profile.data._id, event.target.value)}>
              <option value="">Unassigned</option>
              {batches.map((batch) => <option key={batch._id} value={batch.name}>{batch.name} - {formatDate(batch.commenceDate)}</option>)}
            </select>
          </div>
        </section>
      )}

      {isStudent && !showReceiptInvoice && canManageFees && (
        <section className="crm-card no-print">
          <h2><ReceiptText size={21} /> Payment</h2>
          <div className="emi-flow">
            <div><b>1</b><span>Total fee</span><strong>{formatCurrency(totalFee)}</strong></div>
            <div><b>2</b><span>Discount</span><strong>{formatCurrency(discount)}</strong></div>
            <div><b>3</b><span>Paid</span><strong>{formatCurrency(paid)}</strong></div>
            <div><b>4</b><span>Pending due</span><strong>{formatCurrency(due)}</strong></div>
          </div>
          <form className="payment-update-form no-print" onSubmit={(event) => {
            const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
            onPayment(event, profile.data._id, submitter?.dataset.whatsapp === "true");
          }}>
            <label><span>Amount paying</span><input name="amount" type="number" min="1" max={due || undefined} placeholder="Enter amount" required /></label>
            <label><span>Payment type</span><select name="mode" value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option><option value="EMI">EMI installment / plan</option></select></label>
            <label><span>Note</span><input name="note" placeholder="Receipt note" /></label>
            <div className="payment-action-buttons">
              <button className="mini-btn" type="submit">Update</button>
              <button className="mini-btn whatsapp-btn" type="submit" data-whatsapp="true"><MessageCircle size={15} /> WhatsApp</button>
            </div>
          </form>
          {paymentMode === "EMI" && (
            <form className="emi-plan" onSubmit={handleEmiPlan}>
              <div className="emi-plan-head">
                <div>
                  <strong>EMI plan</strong>
                  <span>Choose the number of installments. Monthly EMI is calculated from the current pending due.</span>
                </div>
                <div className="emi-plan-summary">
                  <span>Monthly EMI</span>
                  <b>{formatCurrency(displayEmiAmount)}</b>
                </div>
              </div>
              <div className="emi-plan-form">
                <label>
                  <span>Months</span>
                  <select name="emiMonths" value={emiMonthsDraft} onChange={(event) => setEmiMonthsDraft(event.target.value)} required disabled={due <= 0}>
                    <option value="">Choose months</option>
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => <option key={month} value={month}>{month} months</option>)}
                  </select>
                </label>
                <label><span>Next EMI date</span><input name="nextEmiDate" type="date" defaultValue={profile.data.nextEmiDate ? profile.data.nextEmiDate.slice(0, 10) : dateInputValueFromOffset(30)} disabled={due <= 0} /></label>
                <label><span>Calculated EMI</span><input value={formatCurrency(calculatedEmiAmount)} readOnly /></label>
                <button className="mini-btn" type="submit" disabled={due <= 0}>Save EMI plan</button>
                {profile.data.emiEnabled && <button className="mini-btn ghost-mini" type="button" onClick={() => onUpdateStudent(profile.data._id, { emiEnabled: false, emiMonths: 0, emiAmount: 0, nextEmiDate: "" })}>Close EMI</button>}
              </div>
              {profile.data.emiEnabled && !savedEmiIsCurrent && activeEmiMonths > 0 && <p className="emi-warning">Save the EMI plan again to update the monthly EMI to {formatCurrency(calculatedEmiAmount)}.</p>}
            </form>
          )}
        </section>
      )}

      {showReceiptInvoice ? (
        <section className="receipt-card invoice-card">
          <div className="receipt-switch no-print">
            <button className={receiptSelection.type === "invoice" ? "active" : ""} onClick={() => setReceiptSelection({ type: "invoice" })}>Tax Invoice</button>
            {profile.data.payments?.map((payment, index) => (
              <button className={receiptSelection.type === "payment" && receiptSelection.index === index ? "active" : ""} key={`${payment.paidAt || index}-${index}`} onClick={() => setReceiptSelection({ type: "payment", index })}>
                {payment.mode === "EMI" ? "EMI Receipt" : "Payment Receipt"} {index + 1}
              </button>
            ))}
          </div>
          {receiptSelection.type === "invoice" || !selectedPayment ? (
            <TaxInvoice student={profile.data} paymentMode={paymentMode} centres={centres} />
          ) : (
            <PaymentReceipt student={profile.data} payment={selectedPayment} paymentIndex={receiptSelection.index} centres={centres} />
          )}
          <div className="invoice-actions no-print">
            <button className="mini-btn" onClick={onPrint}><Download size={15} /> Download PDF</button>
            <button className="mini-btn whatsapp-btn" onClick={handleReceiptShare}><MessageCircle size={15} /> Share PDF to WhatsApp</button>
          </div>
        </section>
      ) : !isStudent ? (
        <section className="crm-card">
          <h2><ClipboardList size={21} /> Admission action</h2>
          <p className="card-note">Admitting this lead creates a student record and moves them into the student journey.</p>
          <button className="mini-btn" onClick={() => onConvert(profile.data)}>Admit this lead <ArrowRight size={15} /></button>
        </section>
      ) : (
        null
      )}

      {isStudent && !showReceiptInvoice && certificateReady && (
        <section className="certificate-card">
          <IMedCertificate
            studentName={profile.data.fullName}
            courseName={certificateCourseName(profile.data.course)}
            certificateNumber={profile.data.certificateNumber || "Not issued"}
            duration={courseDuration(profile.data.course)}
            issueDate={formatDate(profile.data.certificateIssuedAt)}
            verifyUrl={profile.data.certificateNumber ? certificateVerifyUrl(profile.data.certificateNumber) : "Not issued"}
          />
          <div className="certificate-actions no-print">
            {!certificateIssued ? <button className="mini-btn" onClick={() => onIssueCertificate(profile.data)}><Award size={15} /> Generate certificate</button> : <button className="mini-btn" onClick={printCertificateOnly}><Printer size={15} /> Print / Save PDF</button>}
            {certificateIssued && <button className="mini-btn whatsapp-btn" onClick={handleCertificateShare}>Open WhatsApp Web</button>}
          </div>
        </section>
      )}
    </div>
  );
}

function Journey({ current }: { current: string }) {
  const steps = ["New Lead", "Demo / Visit", "Enrolled", "In Training", "Course Completed", "Placed"];
  const aliases: Record<string, string> = { New: "New Lead", Demo: "Demo / Visit", Training: "In Training", Contacted: "New Lead", Counselling: "Demo / Visit" };
  const normalized = aliases[current] || current;
  const currentIndex = Math.max(0, steps.indexOf(normalized));
  return <div className="journey">{steps.map((step, index) => <span key={step} className={index < currentIndex ? "done" : index === currentIndex ? "now" : "todo"}>{step.replace(" / Visit", "")}</span>)}</div>;
}

function tagClass(status = "") {
  return status === "Placed" || status === "Enrolled" || status === "Course Completed" ? "green" : status === "In Training" ? "purple" : status === "Demo / Visit" || status === "Counselling" ? "amber" : "blue";
}

function initials(name = "") {
  return name.split(" ").map((part) => part[0] || "").join("").slice(0, 2).toUpperCase() || "IM";
}

function CrmStyles() {
  return <>
  <style>{`
    .imed-crm{--blue:#1f3471;--blue2:#152657;--green:#25a88d;--greenSoft:#e4f7f3;--ink:#101828;--muted:#4a5565;--paper:#f8fbff;--line:#dbe7f4;min-height:100vh;background:radial-gradient(circle at top left,rgba(37,168,141,.16),transparent 34%),linear-gradient(135deg,#f8fbff 0%,#eef7ff 42%,#f5fffc 100%);color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif}.auth-shell{display:grid;place-items:center;padding:24px}.auth-card{width:min(480px,92vw);background:rgba(255,255,255,.9);border:1px solid rgba(11,77,143,.16);border-radius:32px;padding:36px;box-shadow:0 28px 90px rgba(40,53,147,.18);text-align:left;backdrop-filter:blur(18px)}.auth-logo{display:inline-flex;align-items:center;gap:12px;background:#eef7ff;color:var(--blue);padding:12px 16px;border-radius:999px;font-weight:900;margin-bottom:18px}.auth-logo span{font-size:24px;letter-spacing:-.04em}.brand-logo-wrap img{display:block;width:118px;height:auto;object-fit:contain}.auth-logo.brand-logo-wrap{background:#eef7ff;padding:12px 18px}.sidebar-logo img{width:132px;filter:brightness(0) invert(1)}.eyebrow{margin:0;color:var(--green);text-transform:uppercase;font-size:12px;font-weight:900;letter-spacing:.18em}.auth-card h1,.crm-topbar h1,.crm-card h2{letter-spacing:-.045em}.auth-card h1{font-size:44px;line-height:1;margin:12px 0}.muted,.subline{color:var(--muted)}.auth-form,.lead-form{display:grid;gap:12px;margin-top:22px}.auth-form input,.password-field,.lead-form input,.lead-form select,.lead-form textarea,.filters input,.filters select,.crm-table select,.inline-form input,.finance-row input,.finance-row select,.scope-select{border:1px solid var(--line);background:#fff;border-radius:16px;padding:13px 14px;color:var(--ink);outline:none;box-shadow:0 1px 0 rgba(40,53,147,.04)}.auth-form input:focus,.password-field:focus-within,.lead-form input:focus,.lead-form select:focus,.lead-form textarea:focus,.filters input:focus,.filters select:focus,.scope-select:focus{border-color:var(--blue);box-shadow:0 0 0 4px rgba(11,77,143,.12)}.password-field{display:flex!important;align-items:center!important;padding:0 10px 0 14px!important}.password-field input{border:0!important;box-shadow:none!important;border-radius:0!important;padding:13px 0!important;flex:1;background:transparent!important}.password-field button{width:38px!important;height:38px!important;border:0!important;background:transparent!important;color:#66728a!important;border-radius:12px!important;padding:0!important;display:grid!important;place-items:center!important}.auth-form button,.lead-form button,.inline-form button,.finance-row button,.mini-btn,.top-actions button,.filters button{border:0;background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;border-radius:999px;padding:13px 18px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;gap:8px}.ghost-link{display:block;width:100%;border:0;background:transparent;padding:10px;color:var(--blue);font-weight:800}.crm-shell{display:block}.crm-sidebar{position:fixed;left:0;top:0;z-index:50;width:292px;height:100vh;background:linear-gradient(180deg,#1f3471,#1f3471 66%,#25a88d);color:#fff;padding:24px;display:flex;flex-direction:column;gap:18px;box-shadow:18px 0 60px rgba(40,53,147,.18)}.brand-block{display:flex;align-items:center;gap:12px;padding:6px 4px 18px}.brand-icon{width:48px;height:48px;border-radius:16px;background:rgba(255,255,255,.14);display:grid;place-items:center}.brand-block span{display:block;font-size:32px;font-weight:950;letter-spacing:-.06em}.brand-block small{color:#d8ecff;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.crm-nav{display:grid;gap:10px}.crm-nav button,.sidebar-bottom button{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);color:#eef7ff;border-radius:18px;padding:14px 16px;text-align:left;font-weight:850;display:flex;align-items:center;gap:12px}.crm-nav button.active{background:#fff;color:var(--blue);border-color:#fff;box-shadow:0 18px 40px rgba(0,0,0,.16)}.sidebar-bottom{margin-top:auto;display:grid;gap:10px}.crm-main{margin-left:292px;padding:30px;overflow:hidden;min-width:0}.crm-topbar{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;gap:20px}.crm-topbar h1{font-size:52px;line-height:1;margin:6px 0;color:#1f3471}.top-actions{display:flex;align-items:center;gap:12px}.top-user{background:#fff;border:1px solid var(--line);border-radius:18px;padding:12px 16px;display:grid;min-width:150px}.top-user span{font-weight:900}.top-user small{color:var(--muted)}.panel-stack{display:grid;gap:20px}.hero-strip{display:flex;justify-content:space-between;align-items:center;gap:18px;background:linear-gradient(135deg,#1f3471,#003e9c);color:#fff;border-radius:30px;padding:26px;box-shadow:0 24px 70px rgba(40,53,147,.22)}.hero-strip p{margin:0;color:#bfe0ff;font-weight:800;text-transform:uppercase;letter-spacing:.14em}.hero-strip h2{font-size:32px;margin:6px 0 0}.hero-chip{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.15);padding:12px 16px;border-radius:999px;font-weight:900}.metric-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.metric-grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}.metric-card,.crm-card,.profile-card,.receipt-card{background:rgba(255,255,255,.88);border:1px solid var(--line);border-radius:26px;box-shadow:0 18px 50px rgba(40,53,147,.08);backdrop-filter:blur(12px)}.metric-card{padding:22px;position:relative;overflow:hidden}.metric-card:after{content:"";position:absolute;right:-24px;top:-24px;width:90px;height:90px;border-radius:999px;background:rgba(37,168,141,.15)}.metric-icon{width:42px;height:42px;border-radius:14px;background:#eef7ff;color:var(--blue);display:grid;place-items:center;margin-bottom:18px}.metric-icon svg{width:21px}.metric-card span{color:var(--muted);font-weight:800}.metric-card strong{display:block;font-size:32px;margin-top:8px;color:#1f3471}.crm-card{padding:22px}.crm-card h2{font-size:26px;margin:0 0 16px;color:#1f3471;display:flex;align-items:center;gap:10px}.card-note{color:var(--muted);margin:-8px 0 16px}.crm-grid.two{display:grid;grid-template-columns:1fr 1fr;gap:20px}.funnel-list{display:grid;gap:12px}.funnel-list div{display:grid;grid-template-columns:120px 48px 1fr;align-items:center;gap:10px}.funnel-list i{height:10px;border-radius:99px;background:linear-gradient(90deg,var(--green),#8ee2d2);display:block}.table-like{display:grid;gap:10px}.table-like div{display:grid;grid-template-columns:1fr auto auto;gap:16px;padding:14px;border-radius:16px;background:#f8fbff;border:1px solid #dbe7f4}.lead-form{grid-template-columns:repeat(3,minmax(0,1fr))}.lead-form textarea{grid-column:span 2;min-height:48px}.section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px}.filters{display:flex;gap:10px;flex-wrap:wrap}.filters label{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--line);border-radius:16px;padding-left:12px}.filters label input{border:0;padding-left:0}.crm-table{display:grid;gap:8px;overflow:auto}.table-row{display:grid;grid-template-columns:1.3fr 1fr .8fr .8fr .75fr;gap:12px;align-items:center;padding:14px;border-radius:18px;background:#ffffff;border:1px solid #dbe7f4;min-width:840px}.table-row.head{background:#1f3471;color:#fff;font-weight:900}.clickable-row{cursor:pointer;transition:.15s}.clickable-row:hover{transform:translateY(-1px);box-shadow:0 10px 26px rgba(40,53,147,.08);border-color:#c8eee6}.table-row span{display:grid;gap:3px}.table-row small{color:var(--muted)}.empty-state{padding:22px;color:var(--muted)}.finance-list{display:grid;gap:12px}.finance-row{display:grid;grid-template-columns:1.2fr .9fr 1fr;gap:14px;align-items:center;border:1px solid #dbe7f4;background:#ffffff;border-radius:18px;padding:14px}.receipt-row{grid-template-columns:1.2fr .9fr auto}.finance-row form,.inline-form{display:flex;gap:10px}.pill-list{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px}.pill-list span{padding:10px 14px;border-radius:999px;background:#eef7ff;border:1px solid #c8eee6;font-weight:850;color:#1f3471}.profile-card{display:flex;align-items:center;gap:18px;padding:24px}.profile-card h2{font-size:34px;line-height:1;margin:4px 0;color:#1f3471}.profile-card span{color:var(--muted)}.profile-avatar{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;background:#1f3471;color:#fff;font-size:20px;font-weight:900}.status-pill{margin-left:auto;background:#e4f7f3;color:#16876f;border-radius:999px;padding:9px 14px}.ghost-mini{background:#fff!important;color:#1f3471!important;border:1px solid var(--line)!important}.journey{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.journey span{text-align:center;padding:13px 8px;border-radius:16px;font-weight:900;font-size:13px}.journey .done{background:#e3f6ee;color:#1aa06d}.journey .now{background:#eef7ff;color:#1f3471;border:1px solid #c8d7f0}.journey .todo{background:#fff;color:var(--muted);border:1px solid var(--line)}.receipt-card{overflow:hidden}.receipt-head{display:flex;justify-content:space-between;gap:18px;background:#1f3471;color:#fff;padding:22px}.receipt-head div{display:grid}.receipt-head span{color:#d8ecff;font-size:12px}.receipt-body{padding:22px;display:grid;gap:10px}.receipt-total,.receipt-grand{display:flex;justify-content:space-between;gap:14px}.receipt-grand{border-top:2px solid #1f3471;margin-top:8px;padding-top:12px;font-size:18px;color:#1f3471}@media print{.crm-sidebar,.crm-topbar,.no-print{display:none!important}.crm-shell{display:block}.crm-main{padding:0}.receipt-card{box-shadow:none;border:0}}@media(max-width:1180px){.crm-main{margin-left:86px!important;padding:20px!important;min-width:0!important}.crm-sidebar{position:fixed!important;left:0!important;top:0!important;width:86px!important;height:100vh!important;padding:18px 12px!important;overflow:visible!important;box-shadow:12px 0 34px rgba(40,53,147,.16)!important}.brand-block{justify-content:center!important;padding:0 0 12px!important}.brand-block div:last-child{display:none!important}.brand-icon{width:48px!important;height:48px!important}.crm-nav{grid-template-columns:1fr!important;gap:10px!important}.crm-nav button,.sidebar-bottom button{justify-content:center!important;padding:13px!important;border-radius:18px!important;font-size:0!important}.crm-nav button span{display:none!important}.crm-nav button svg,.sidebar-bottom button svg{width:20px!important;height:20px!important}.sidebar-bottom{margin-top:auto!important;grid-template-columns:1fr!important}.metric-grid,.metric-grid.three{grid-template-columns:repeat(2,minmax(0,1fr))!important}.crm-grid.two{grid-template-columns:1fr!important}.lead-form{grid-template-columns:repeat(2,minmax(0,1fr))!important}.crm-topbar{display:grid!important;grid-template-columns:1fr!important}.top-actions{display:flex!important;flex-wrap:wrap!important}.scope-select{max-width:100%!important}}@media(max-width:760px){.crm-main{margin-left:68px!important;padding:14px!important}.crm-sidebar{width:68px!important;padding:14px 8px!important}.brand-icon{width:42px!important;height:42px!important}.crm-nav button,.sidebar-bottom button{padding:11px!important;border-radius:15px!important}.auth-card{padding:24px!important}.crm-topbar h1{font-size:30px!important}.hero-strip,.section-head,.profile-card{display:grid!important}.hero-strip{padding:18px!important}.metric-grid,.metric-grid.three,.lead-form,.finance-row,.receipt-row{grid-template-columns:1fr!important}.journey{grid-template-columns:1fr!important}.table-row{min-width:760px!important}.top-actions{display:grid!important;grid-template-columns:1fr!important}.filters{display:grid!important;grid-template-columns:1fr!important}.filters label{width:100%!important}}.os-stack{display:grid;gap:24px}.metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.metric{background:#fff;border:1px solid #dfe6f0;border-radius:13px;padding:22px 20px;min-height:132px}.metric .label{font-size:12.5px;color:#66728a;display:flex;align-items:center;gap:8px;margin-bottom:14px;font-weight:500}.metric .val{font-size:28px;font-weight:800;letter-spacing:-.6px;color:#061633}.metric .sub{font-size:12px;margin-top:8px}.sub.up{color:#009c73}.sub.flat{color:#66728a}.ico-chip{width:30px;height:30px;border-radius:9px;display:inline-flex;align-items:center;justify-content:center}.ico-chip.blue{background:#eaf2ff;color:#0d6efd}.ico-chip.green{background:#dff8ee;color:#009c73}.ico-chip.amber{background:#fff1d8;color:#f59e0b}.section-title{display:flex;align-items:center;gap:8px;margin:2px 0 0;font-size:16px;font-weight:800;color:#061633}.funnel{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px}.stage{background:#fff;border:1px solid #dfe6f0;border-radius:10px;padding:17px 8px;text-align:center}.stage .n{font-size:24px;font-weight:800;color:#0649be}.stage .s{font-size:12px;color:#66728a;margin-top:8px}.two-col{display:grid;grid-template-columns:1fr 1fr;gap:18px}.panel{background:#fff;border:1px solid #dfe6f0;border-radius:13px;padding:20px}.panel h3{font-size:16px;margin:0 0 18px;color:#061633}.crow{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid #eef2f7}.crow:last-child{border-bottom:0}.nm{font-weight:800;color:#061633}.mt{font-size:13px;color:#66728a;margin-top:3px}.pct{font-weight:800;color:#009c73}.who{display:flex;align-items:center;gap:11px}.mini{width:32px;height:32px;border-radius:999px;background:#eaf2ff;color:#0d6efd;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}.tag{font-size:12px;border-radius:999px;padding:6px 10px;font-weight:700}.tag.green{background:#dff8ee;color:#009c73}.tag.purple{background:#eee7ff;color:#6d4fd8}.tag.amber{background:#fff1d8;color:#a16207}.tag.blue{background:#eaf2ff;color:#0d6efd}.toolbar{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:18px}.search{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #dfe6f0;border-radius:10px;padding:0 12px;min-width:280px}.search input{height:42px;border:0;outline:0;background:transparent;color:#061633}.btn{border:0;background:#0d6efd;color:#fff;border-radius:10px;padding:11px 15px;font-weight:800;display:inline-flex;align-items:center;gap:8px}.card-table-wrap{background:#fff;border:1px solid #dfe6f0;border-radius:13px;overflow:hidden}.table-foot{font-size:12px;color:#66728a;margin:12px 0 0}.os-form label{display:grid;gap:6px}.os-form label span{font-size:12.5px;font-weight:700;color:#34415a}.ok-banner{display:none;align-items:center;gap:9px;background:#dff8ee;color:#007a5f;border:1px solid #bdf0db;border-radius:10px;padding:12px 14px;margin-bottom:16px;font-weight:800}.brand-version{font-size:10px;color:#8fa0bf;font-style:normal}.nav-section{display:grid}.nav-group-label{font-size:10.5px;text-transform:uppercase;letter-spacing:.7px;color:#7182a5;padding:16px 22px 7px;margin:0;font-weight:700}.lead-row{grid-template-columns:1.1fr .9fr .75fr .75fr .75fr .9fr!important}.student-row,.finance-table-row{grid-template-columns:1.1fr 1fr .75fr .75fr .75fr .75fr .8fr!important}.imed-crm{--blue:#0d6efd!important;--green:#009c73!important;--ink:#061633!important;--muted:#66728a!important;--line:#dfe6f0!important;background:#f4f7fb!important}.crm-sidebar{background:#11213d!important;width:240px!important;box-shadow:none!important;padding:0!important}.crm-main{margin-left:240px!important;padding:0!important;background:#f4f7fb!important;min-height:100vh}.brand-block{height:88px!important;padding:0 22px!important;gap:10px!important}.brand-icon{width:30px!important;height:30px!important;border-radius:8px!important;background:#0d6efd!important}.brand-block span{font-size:20px!important;letter-spacing:-.03em!important}.brand-block small{display:none!important}.brand-block .sidebar-logo{background:transparent!important;padding:0!important}.brand-block .sidebar-logo img{width:126px!important;filter:brightness(0) invert(1)}.crm-nav{gap:0!important}.crm-nav button,.sidebar-bottom button{border:0!important;background:transparent!important;color:#c8d3e8!important;border-radius:0!important;padding:12px 22px!important;font-size:14px!important;font-weight:600!important;text-align:left!important}.crm-nav button.active{background:#17366e!important;color:#fff!important;border-left:3px solid #0d6efd!important;box-shadow:none!important}.sidebar-bottom{padding-bottom:18px}.crm-topbar{height:70px;background:#fff;border-bottom:1px solid #dfe6f0;margin:0!important;padding:0 26px;display:flex!important}.crm-topbar h1{font-size:20px!important;margin:0 0 4px!important;color:#061633!important;letter-spacing:-.02em!important}.subline{font-size:13px;color:#66728a!important}.top-actions{display:flex!important}.scope-select{height:34px;border:2px solid #111827!important;border-radius:9px!important;padding:0 12px!important;background:#fff!important}.top-user{width:34px!important;height:34px!important;min-width:34px!important;padding:0!important;border:0!important;border-radius:999px!important;background:#2563eb!important;color:#fff!important;display:grid!important;place-items:center!important}.top-user small{display:none}.top-user span{font-size:12px}.panel-stack,.os-stack{padding:24px 26px}.crm-card{border-radius:13px!important;border-color:#dfe6f0!important;box-shadow:none!important;background:#fff!important}.crm-card h2{font-size:16px!important;letter-spacing:0!important}.table-row{border-radius:0!important;border-left:0!important;border-right:0!important;min-width:900px}.table-row.head{background:#fff!important;color:#66728a!important;border-top:0!important;text-transform:none!important}.table-row.head span{font-weight:800;color:#66728a}.crm-table{gap:0!important;background:#fff}.crm-table select{border:0!important;background:transparent!important;padding:0!important}.auth-card{border-radius:14px!important}.login-foot{color:#66728a;text-align:center;font-size:12px}@media(max-width:960px){.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.funnel{grid-template-columns:repeat(2,minmax(0,1fr))}.two-col{grid-template-columns:1fr}.crm-sidebar{width:70px!important}.crm-main{margin-left:70px!important}.brand-block div:last-child,.nav-group-label,.crm-nav button span,.sidebar-bottom button span{display:none!important}.crm-nav button,.sidebar-bottom button{justify-content:center!important;padding:13px!important}.brand-block{justify-content:center!important;padding:0!important}.crm-topbar{display:grid!important;height:auto;padding:16px}.top-actions{display:grid!important}.panel-stack,.os-stack{padding:16px}.search{min-width:0;width:100%}.toolbar{display:grid}}@media(max-width:620px){.metrics{grid-template-columns:1fr}.funnel{grid-template-columns:1fr}.crm-topbar h1{font-size:22px!important}}.imed-navbar-brand{display:inline-flex!important;align-items:center!important;gap:8px!important;width:max-content!important;line-height:1!important;white-space:nowrap!important}.imed-navbar-brand img{display:block!important;width:36px!important;height:36px!important;object-fit:contain!important;filter:none!important}.imed-navbar-brand span{display:inline-flex!important;align-items:baseline!important;gap:5px!important;font-size:22px!important;font-weight:900!important;letter-spacing:-.04em!important}.imed-navbar-brand b{color:#1f3471!important;font-weight:900!important}.imed-navbar-brand strong{color:#25a88d!important;font-weight:900!important}.auth-brand-logo{background:#fff!important;border:0!important;border-radius:0!important;padding:0!important;margin-bottom:22px!important}.sidebar-brand-logo{background:transparent!important;padding:0!important}.sidebar-brand-logo b,.sidebar-brand-logo strong{color:#fff!important}.sidebar-brand-logo img{width:34px!important;height:34px!important}.brand-block .sidebar-brand-logo span{display:inline-flex!important;font-size:20px!important;letter-spacing:-.03em!important}.brand-block .sidebar-brand-logo strong{color:#25e0bd!important}  `}</style>
  <style>{`
    .row-actions,.certificate-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
    .settings-premium-grid{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px!important;align-items:start}
    .settings-card{margin:0!important;padding:20px!important;border-radius:16px!important;background:linear-gradient(180deg,#fff,#fbfdff)!important;border-color:#dfe8f5!important;box-shadow:0 16px 42px rgba(15,35,80,.05)!important;display:grid;gap:16px}
    .settings-staff-card,.compact-settings-card{grid-column:1/-1}
    .settings-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;border-bottom:1px solid #edf2f8;padding-bottom:14px}
    .settings-card-head h2{margin:0 0 5px!important}
    .settings-card-head span{color:#66728a;font-size:13px}
    .settings-card-head strong{flex:0 0 auto;border:1px solid #dbe7f6;background:#f5f9ff;color:#0d6efd;border-radius:999px;padding:7px 11px;font-size:12px}
    .compact-settings-card{display:grid;gap:12px}
    .settings-grid .inline-form{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin:0}
    .settings-grid .inline-form input,.settings-grid .inline-form select,.settings-grid .inline-form textarea,.billing-selector input,.billing-selector select,.settings-directory input,.billing-editor input,.billing-editor select,.billing-editor textarea{height:42px;min-width:0!important;width:100%;flex:none!important;border:1px solid #d9e5f4!important;background:#fff!important;color:#061633!important;border-radius:12px!important;padding:0 12px!important;box-shadow:none!important}
    .settings-grid .inline-form textarea,.billing-editor textarea{height:76px!important;padding:10px 12px!important;resize:vertical}
    .settings-grid .inline-form button,.billing-editor button{height:42px;border-radius:12px!important;padding:0 16px!important;justify-self:start}
    .settings-grid .counsellor-form{grid-template-columns:repeat(2,minmax(0,1fr))}
    .settings-grid .counsellor-form button{grid-column:1/-1}
    .settings-staff-card .counsellor-form{grid-template-columns:repeat(3,minmax(0,1fr))}
    .settings-staff-card .counsellor-form button{grid-column:auto;justify-self:stretch!important}
    .compact-settings-card .counsellor-form{grid-template-columns:repeat(3,minmax(0,1fr))}
    .compact-settings-card .counsellor-form button{grid-column:auto;justify-self:start}
    .settings-directory{border:1px solid #e2ebf7;background:#f8fbff;border-radius:14px;overflow:hidden}
    .settings-directory summary{cursor:pointer;padding:13px 14px;font-weight:900;color:#0d336f;list-style:none}
    .settings-directory summary::-webkit-details-marker{display:none}
    .settings-directory-body{display:grid;gap:10px;border-top:1px solid #e2ebf7;padding:12px}
    .settings-mini-table{display:grid;border:1px solid #e4ecf7;border-radius:12px;overflow:hidden;background:#fff;max-height:300px;overflow-y:auto}
    .settings-mini-row{display:grid;grid-template-columns:1.2fr .9fr .9fr;gap:10px;padding:11px 12px;border-bottom:1px solid #edf2f8;align-items:center}
    .settings-mini-row:last-child{border-bottom:0}
    .settings-mini-row.head{background:#f8fbff;color:#66728a;font-weight:900;font-size:12px}
    .settings-mini-row span{display:grid;gap:3px;min-width:0;overflow-wrap:anywhere}
    .settings-mini-row small{color:#66728a}
    .billing-card{grid-column:1/-1}
    .settings-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,360px);gap:14px;align-items:start}
    .settings-add-location{background:#f8fbff;border:1px solid #e3ebf7;border-radius:14px;padding:12px}
    .settings-add-location button{justify-self:stretch!important}
    .billing-info-panel{display:grid;gap:5px;color:#66728a}
    .billing-info-panel strong{color:#061633}
    .billing-selector{background:#f8fbff;border:1px solid #e3ebf7;border-radius:14px;padding:12px;display:grid;gap:10px}
    .billing-editor{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;background:#fff;border:1px solid #e2ebf7;border-radius:16px;padding:14px}
    .billing-editor .billing-row-head{grid-column:1/-1;background:#f8fbff;border:1px solid #e6eef8;border-radius:13px;padding:12px;display:grid;gap:4px}
    .billing-editor textarea{grid-column:span 2}
    .billing-editor button{grid-column:1/-1;justify-self:end!important}
    @media(max-width:1180px){.settings-premium-grid{grid-template-columns:1fr!important}.settings-split{grid-template-columns:1fr}.billing-editor{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:700px){.settings-grid .inline-form,.settings-grid .counsellor-form,.settings-add-location,.billing-editor,.settings-mini-row{grid-template-columns:1fr!important}.billing-editor textarea{grid-column:auto}.billing-editor button{justify-self:stretch!important}.settings-card-head{display:grid}.settings-card-head strong{justify-self:start}}
    .pagination-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;background:#fff;border:1px solid #dfe6f0;border-radius:12px;padding:10px 12px;color:#66728a;font-size:13px}
    .pagination-bar>div{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .pagination-bar strong{color:#061633}
    .pagination-bar button{height:34px;padding:0 12px!important;border-radius:9px!important;font-weight:800!important}
    .pagination-bar button:disabled{opacity:.45;cursor:not-allowed}
    .student-row-assigned{grid-template-columns:1.05fr .9fr .72fr .7fr .9fr .7fr .7fr .8fr!important}
    .attendance-stack{display:grid;gap:14px}
    .attendance-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
    .attendance-summary div{border:1px solid #dfe6f0;background:#f8fbff;border-radius:10px;padding:12px;display:grid;gap:4px}
    .attendance-summary span{font-size:12px;color:#66728a;font-weight:800}
    .attendance-summary strong{font-size:22px;color:#061633}
    .attendance-row{grid-template-columns:1.2fr .75fr .8fr .75fr 1fr .9fr!important}
    .attendance-row input{height:34px;border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);padding:0 10px;min-width:0;width:100%}
    .attendance-logs-head{margin-bottom:12px!important}
    .attendance-log-filters{display:grid;grid-template-columns:minmax(240px,380px) auto;gap:10px;align-items:center;justify-content:start;margin-bottom:14px}
    .attendance-log-filters label{display:grid;gap:4px}
    .attendance-log-filters label span{font-size:11px;color:#66728a;font-weight:800}
    .attendance-log-filters input,.attendance-log-filters select{height:38px;border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);padding:0 10px;min-width:0;width:100%}
    .attendance-log-filters .mini-btn{height:38px!important;padding:0 18px!important;border-radius:999px!important}
    .attendance-summary-row{grid-template-columns:1.2fr .7fr .85fr .55fr .55fr .5fr .5fr .5fr .65fr!important}
    .attendance-detail-page{display:grid;gap:16px;background:linear-gradient(180deg,#fff 0%,#f8fbff 100%)!important}
    .attendance-detail-view{display:grid;gap:20px}
    .attendance-detail-empty{display:grid;gap:12px;justify-items:start}
    .attendance-detail-view>.compact-head{border:1px solid #e4ecf8;background:#fff;border-radius:16px;padding:14px 16px;margin-bottom:0!important;box-shadow:0 12px 32px rgba(15,35,80,.05)}
    .attendance-detail-title{display:grid;grid-template-columns:auto minmax(0,1fr);gap:5px 12px;align-items:center;min-width:0}
    .attendance-back-btn{height:40px!important;border-radius:12px!important;grid-row:1/3;align-self:start}
    .attendance-detail-title h2{display:flex!important;align-items:center!important;gap:8px!important;margin:0!important;line-height:1.2!important}
    .attendance-detail-title h2 svg{flex:0 0 auto}
    .attendance-detail-title h2 span{min-width:0;overflow-wrap:anywhere}
    .attendance-detail-title p{margin:0;color:#66728a;font-size:15px;line-height:1.35;grid-column:2}
    .attendance-detail-view>.compact-head .toolbar-actions .btn{height:40px;border-radius:12px!important}
    .attendance-detail-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(250px,300px);gap:16px;align-items:start}
    .attendance-calendar-panel{min-width:0}
    .attendance-detail-side{display:grid;gap:12px;min-width:0}
    .attendance-filter-card,.attendance-stat-card{border:1px solid #e0e9f6;background:rgba(255,255,255,.92);border-radius:16px;padding:15px;display:grid;gap:12px;box-shadow:0 14px 34px rgba(15,35,80,.05)}
    .attendance-filter-card strong{color:#061633;font-size:15px}
    .attendance-filter-card label{display:grid;gap:5px}
    .attendance-filter-card label span{font-size:11px;color:#66728a;font-weight:800}
    .attendance-filter-card input,.attendance-filter-card select{height:40px;border:1px solid #d8e4f3;border-radius:11px;background:#fff;color:var(--ink);padding:0 11px;min-width:0;width:100%}
    .attendance-filter-card .mini-btn{height:40px!important;border-radius:999px!important}
    .attendance-stat-card{grid-template-columns:repeat(2,minmax(0,1fr))}
    .attendance-stat-card span{border:1px solid #e6edf6;background:linear-gradient(180deg,#fff,#f8fbff);border-radius:12px;padding:11px;display:grid;gap:4px;color:#66728a;font-size:12px;font-weight:800}
    .attendance-stat-card b{color:#061633;font-size:22px}
    .attendance-day-table{margin-top:2px}
    .attendance-detail-row{grid-template-columns:.8fr .7fr .75fr .9fr .9fr 1.2fr!important}
    .attendance-log-row{grid-template-columns:.75fr 1.15fr .7fr .7fr .9fr 1fr 1.1fr!important}
    .attendance-calendar-wrap{display:grid;grid-template-columns:minmax(0,1fr) 160px;gap:14px;align-items:start}
    .attendance-calendar{border:1px solid #dde8f6;background:#fff;border-radius:18px;padding:14px;box-shadow:0 16px 42px rgba(15,35,80,.06);overflow:hidden}
    .calendar-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
    .calendar-head strong{font-size:17px;color:#061633}
    .calendar-head .mini-btn{height:38px!important;border-radius:999px!important;padding:0 18px!important}
    .calendar-weekdays,.calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr))}
    .calendar-weekdays span{text-align:center;color:#66728a;font-weight:800;font-size:12px;padding:8px}
    .calendar-cell{height:72px;border:1px solid #edf2f8;display:grid;align-content:start;gap:6px;padding:8px;background:#fff;position:relative}
    .calendar-cell.status-present{background:linear-gradient(180deg,#fff,#f2fffb)}
    .calendar-cell.status-absent{background:linear-gradient(180deg,#fff,#fff5f6)}
    .calendar-cell.status-late{background:linear-gradient(180deg,#fff,#fffaf0)}
    .calendar-cell.status-leave{background:linear-gradient(180deg,#fff,#f4f8ff)}
    .calendar-cell b{font-size:12px;color:#061633}
    .calendar-cell span{width:30px;height:22px;border-radius:999px;display:grid;place-items:center;font-size:11px;font-weight:900}
    .status-present span,.attendance-legend .status-present{background:#dff8ee;color:#009c73}
    .status-absent span,.attendance-legend .status-absent{background:#ffe4e6;color:#dc2626}
    .status-late span,.attendance-legend .status-late{background:#fff1d8;color:#a16207}
    .status-leave span,.attendance-legend .status-leave{background:#eaf2ff;color:#0d6efd}
    .attendance-legend{background:#f3f6fb;border:1px solid #e3ebf6;border-radius:16px;padding:14px;display:grid;gap:10px;color:#34415a;box-shadow:0 12px 30px rgba(15,35,80,.04)}
    .attendance-legend strong{color:#061633}
    .attendance-legend span{display:flex;align-items:center;gap:8px;font-size:12px}
    .attendance-legend i{width:12px;height:12px;border-radius:999px;background:#fff;border:1px solid #dfe6f0;display:inline-block}
    .attendance-date-input{border:1px solid #dfe6f0!important;border-radius:9px!important;padding:0 10px!important}
    .whatsapp-btn{background:#128c7e!important;color:#fff!important;text-decoration:none!important}
    .invoice-card{background:#fff!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:18px!important;overflow:auto!important}
    .receipt-switch{width:min(820px,100%);margin:0 auto 14px;display:flex;gap:8px;flex-wrap:wrap}
    .receipt-switch button{border:1px solid #d7e4f4;background:#fff;color:#0d336f;border-radius:999px;height:38px;padding:0 14px;font-weight:900}
    .receipt-switch button.active{background:#0d6efd;color:#fff;border-color:#0d6efd}
    .invoice-actions{width:min(820px,100%);margin:14px auto 0;display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}
    .tax-invoice{width:min(820px,100%);margin:0 auto;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.2;border:1px solid #555}
    .tax-title{text-align:center;font-weight:700;padding:8px 0;border-bottom:1px solid #555}
    .invoice-top-grid{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #555}
    .invoice-seller{padding:8px;display:grid;gap:2px;border-right:1px solid #555;min-height:190px}
    .invoice-seller strong,.invoice-buyer strong{font-size:12px}
    .invoice-meta-grid{display:grid;grid-template-columns:1fr 1fr}
    .invoice-meta-grid>div{min-height:31px;padding:5px 6px;border-right:1px solid #777;border-bottom:1px solid #777;display:grid;align-content:start;gap:2px}
    .invoice-meta-grid>div:nth-child(2n){border-right:0}
    .invoice-meta-grid span,.invoice-buyer>span:first-child,.amount-words span,.tax-words span{font-size:10px}
    .invoice-meta-grid b{font-size:10.5px}
    .invoice-terms{grid-column:1/-1;min-height:58px!important;border-bottom:0!important}
    .invoice-buyer{padding:8px;display:grid;gap:2px;border-bottom:1px solid #555;min-height:95px}
    .invoice-items,.gst-summary{width:100%;border-collapse:collapse}
    .invoice-items th,.invoice-items td,.gst-summary th,.gst-summary td{border-right:1px solid #777;border-bottom:1px solid #777;padding:4px 5px;vertical-align:top}
    .invoice-items th:last-child,.invoice-items td:last-child,.gst-summary th:last-child,.gst-summary td:last-child{border-right:0;text-align:right}
    .invoice-items th{font-weight:400;text-align:center}
    .invoice-items td:nth-child(1){width:42px;text-align:center}
    .invoice-items td:nth-child(2){width:38%}
    .invoice-items td:nth-child(3),.invoice-items td:nth-child(4),.invoice-items td:nth-child(5),.invoice-items td:nth-child(6){text-align:center}
    .payment-items td:nth-child(2){width:42%;text-align:left}
    .payment-items td:nth-child(3),.payment-items td:nth-child(4){text-align:center}
    .payment-items td:nth-child(5){text-align:right}
    .payment-summary th,.payment-summary td{text-align:right!important}
    .payment-summary th:first-child,.payment-summary td:first-child{text-align:left!important}
    .invoice-items tbody tr:not(.invoice-total-row){height:28px}
    .invoice-items small{display:block;font-size:10px;margin-top:2px}
    .tax-line{text-align:right;font-weight:700}
    .invoice-total-row td{font-weight:700;border-top:1px solid #555}
    .invoice-total-row td:first-child{text-align:right}
    .amount-words{position:relative;padding:6px 8px;border-bottom:1px solid #555;display:grid;gap:2px}
    .amount-words em{position:absolute;right:8px;top:6px;font-style:normal;font-size:10px}
    .gst-summary th{font-size:10px;font-weight:400;text-align:center}
    .gst-summary td{text-align:right}
    .gst-summary td:first-child{text-align:left}
    .tax-words{padding:6px 8px;border-bottom:1px solid #555;display:flex;gap:8px}
    .invoice-bottom{display:grid;grid-template-columns:1.1fr .9fr;min-height:112px}
    .invoice-bottom>div{padding:8px;display:grid;align-content:start;gap:3px}
    .bank-details{border-left:1px solid #555}
    .bank-details>b{margin-top:10px;text-align:right}
    .bank-details em{text-align:right;font-style:normal;margin-top:20px}
    .paid-due{margin-top:8px;font-weight:700}
    .invoice-footer{text-align:center;font-size:10px;padding:5px;border-top:1px solid #555}
    .payment-receipt{width:min(820px,100%);margin:0 auto;background:#fff;color:#061633;border:1px solid #d8e4f3;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;box-shadow:0 14px 42px rgba(15,35,80,.08)}
    .payment-receipt-head{display:grid;grid-template-columns:1fr 220px;gap:16px;background:#0d336f;color:#fff;padding:18px}
    .payment-receipt-head div{display:grid;gap:4px}
    .payment-receipt-head span,.payment-receipt-head small{color:#dbeafe}
    .payment-receipt-head b{font-size:22px}
    .payment-receipt-party,.payment-receipt-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;border-bottom:1px solid #d8e4f3}
    .payment-receipt-party>div,.payment-receipt-grid>div{display:grid;gap:4px;padding:14px;border-right:1px solid #d8e4f3}
    .payment-receipt-party>div:last-child,.payment-receipt-grid>div:last-child{border-right:0}
    .payment-receipt-party span,.payment-receipt-grid span,.payment-receipt-note span{font-size:11px;color:#66728a;font-weight:900;text-transform:uppercase}
    .payment-receipt-party strong,.payment-receipt-grid b{font-size:15px;color:#061633}
    .payment-receipt-party small{color:#66728a}
    .payment-receipt-amount{display:grid;justify-items:center;gap:6px;padding:24px;border-bottom:1px solid #d8e4f3;background:#f8fbff}
    .payment-receipt-amount span{color:#66728a;font-weight:900;text-transform:uppercase;font-size:12px}
    .payment-receipt-amount strong{font-size:34px;color:#0d336f}
    .payment-receipt-amount small{color:#34415a;font-weight:800}
    .payment-receipt-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
    .payment-receipt-note{display:grid;gap:4px;padding:14px;border-bottom:1px solid #d8e4f3}
    .payment-receipt-bottom{display:flex;align-items:end;justify-content:space-between;gap:18px;padding:18px;color:#66728a}
    .payment-receipt-bottom b{color:#061633;border-top:1px solid #061633;padding-top:18px;min-width:180px;text-align:center}
    .date-filter-group{height:34px;display:flex;align-items:center;gap:8px;border:2px solid #111827;border-radius:9px;background:#fff;color:#061633;padding:0 8px;min-width:0}
    .date-filter-group svg{color:#0d6efd;flex:0 0 auto}
    .date-preset-select,.top-date-filter{height:30px;border:0;background:#fff;color:#061633;font:inherit;outline:0;min-width:0}
    .date-preset-select{width:118px;font-weight:700}
    .top-date-filter{width:142px;padding:0}
    .date-clear-btn{height:34px;border:1px solid #dfe6f0!important;border-radius:9px!important;background:#fff!important;color:#061633!important;padding:0 12px!important;font-weight:800!important}
    .lead-row-action{grid-template-columns:1.1fr .9fr .75fr .75fr .75fr .9fr auto!important}
    .lead-row-assigned{grid-template-columns:1.05fr .82fr .7fr .7fr .7fr .9fr .86fr!important}
    .lead-row-assigned-action{grid-template-columns:1.05fr .82fr .7fr .7fr .7fr .9fr .86fr auto!important}
    .counsellor-form{flex-wrap:wrap}
    .assignment-row{display:grid;grid-template-columns:1fr minmax(220px,320px);gap:14px;align-items:end}
    .assignment-row div{display:grid;gap:4px}
    .assignment-row span{color:#66728a}
    .assignment-row select{height:44px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:0 12px}
    .course-fee-list{display:grid;gap:8px;margin-top:12px}
    .course-fee-row{display:grid;grid-template-columns:minmax(0,1fr) minmax(110px,150px) auto;gap:10px;align-items:center;border:1px solid #dfe6f0;background:#f8fbff;border-radius:10px;padding:10px}
    .course-fee-row div{display:grid;gap:4px;min-width:0}
    .course-fee-row strong{color:#061633;overflow-wrap:anywhere}
    .course-fee-row span{color:#66728a;font-size:12.5px}
    .course-fee-row span + span{display:none}
    .course-fee-row input{height:40px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:0 12px;min-width:0}
    .course-fee-row input:focus{border-color:#0d6efd;box-shadow:0 0 0 3px rgba(13,110,253,.12);outline:0}
    .course-fee-row button{height:40px;border:0;border-radius:10px;background:#0d6efd;color:#fff;font-weight:800;padding:0 14px}
    .billing-list{display:grid;gap:10px;margin-top:12px}
    .billing-row{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;border:1px solid #dfe6f0;background:#f8fbff;border-radius:10px;padding:12px}
    .billing-row-head{grid-column:1/-1;display:grid;gap:3px}
    .billing-row-head strong{color:#061633}
    .billing-row-head span{font-size:12px;color:#66728a}
    .billing-row input,.billing-row select,.billing-row textarea{height:38px;border:1px solid var(--line);border-radius:9px;background:#fff;color:var(--ink);padding:0 10px;min-width:0}
    .billing-row textarea{grid-column:1/-1;height:68px;padding:10px 12px;resize:vertical}
    .billing-row button{height:38px;border:0;border-radius:9px;background:#0d6efd;color:#fff;font-weight:800;padding:0 14px;justify-self:start}
    .batch-strength-stack{padding:0}
    .batch-picker{display:flex;align-items:end;justify-content:space-between;gap:14px;flex-wrap:wrap}
    .batch-picker label{display:grid;gap:6px;min-width:min(320px,100%)}
    .batch-picker label span{font-size:12.5px;font-weight:800;color:#34415a}
    .batch-picker select{height:44px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:0 12px}
    .batch-picker strong{color:#061633}
    .batch-strength-grid{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(280px,.8fr);gap:16px;align-items:start}
    .batch-count-list,.selected-batch-list{display:grid;gap:8px}
    .batch-count-row{display:grid;grid-template-columns:1.1fr .9fr .7fr .45fr auto;gap:10px;align-items:center;border:1px solid #dfe6f0;background:#fff;border-radius:12px;padding:12px;min-width:760px}
    .batch-count-row.head{background:#f8fafc;color:#66728a;font-weight:900}
    .batch-count-row b{color:#061633}
    .selected-batch-list{border:1px solid #dfe6f0;background:#f8fbff;border-radius:13px;padding:14px}
    .batch-student-row{border:1px solid #dfe6f0;background:#fff;border-radius:12px;padding:12px;text-align:left;display:grid;gap:4px;color:#061633;cursor:pointer}
    .batch-student-row span{color:#66728a;font-size:13px}
    .lead-doc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .lead-doc-grid div{border:1px solid #dfe6f0;background:#f8fbff;border-radius:12px;padding:13px 14px;display:grid;gap:5px;min-width:0}
    .lead-doc-grid span{font-size:12.5px;font-weight:800;color:#66728a}
    .lead-doc-grid strong{color:#061633;overflow-wrap:anywhere}
    .lead-doc-grid button{justify-self:start;padding:9px 12px;font-size:12px}
    .emi-plan{display:grid;gap:14px;border-top:1px solid var(--line);margin-top:8px;padding-top:16px}
    .emi-plan span{color:#66728a}
    .emi-plan-head{display:grid;grid-template-columns:1fr minmax(150px,190px);gap:12px;align-items:center}
    .emi-plan-head>div:first-child{display:grid;gap:4px}
    .emi-plan-summary{border:1px solid var(--line);background:#f8fafc;border-radius:10px;padding:10px 12px;display:grid;gap:3px}
    .emi-plan-summary span{font-size:12px;font-weight:800;text-transform:uppercase;color:#66728a}
    .emi-plan-summary b{font-size:18px;color:var(--ink)}
    .emi-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
    .emi-flow div{display:grid;grid-template-columns:auto 1fr;gap:3px 9px;align-items:center;border:1px solid #dfe6f0;background:#f8fbff;border-radius:12px;padding:11px 12px;min-width:0}
    .emi-flow b{width:24px;height:24px;border-radius:999px;background:#0d6efd;color:#fff;display:grid;place-items:center;font-size:12px;grid-row:span 2}
    .emi-flow span{font-size:12px;font-weight:800;color:#66728a}
    .emi-flow strong{font-size:14px;color:#061633;overflow-wrap:anywhere}
    .emi-example{display:flex;align-items:flex-start;gap:10px;border:1px solid #bfdbfe;background:#eff6ff;color:#1e3a8a;border-radius:12px;padding:11px 12px;font-size:13px;line-height:1.45}
    .emi-example strong{white-space:nowrap;color:#0d47a1}
    .emi-plan-form{display:grid;grid-template-columns:minmax(150px,1fr) minmax(170px,1fr) minmax(170px,1fr) auto auto;gap:10px;align-items:end}
    .emi-plan-form label{display:grid;gap:6px}
    .emi-plan-form label span{font-size:12.5px;font-weight:800;color:#34415a}
    .emi-plan-form input,.emi-plan-form select{width:100%;height:44px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:0 12px;color:var(--ink);outline:none}
    .emi-plan-form input[readonly]{background:#f8fafc;color:#34415a}
    .emi-plan-form input:disabled,.emi-plan-form select:disabled{background:#f1f5f9;color:#94a3b8}
    .emi-plan-form input:focus,.emi-plan-form select:focus{border-color:#0d6efd;box-shadow:0 0 0 3px rgba(13,110,253,.12)}
    .emi-warning{margin:0;border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.45}
    .emi-help{margin:0;color:#66728a;font-size:13px;line-height:1.45}
    .payment-update-form{display:grid;grid-template-columns:1fr 150px 1fr auto;gap:10px;align-items:end;border-top:1px solid var(--line);margin-top:8px;padding-top:16px}
    .payment-update-form label{display:grid;gap:6px}
    .payment-update-form label span{font-size:12.5px;font-weight:800;color:#34415a}
    .payment-update-form input,.payment-update-form select{width:100%;height:44px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:0 12px;color:var(--ink);outline:none}
    .payment-update-form input:focus,.payment-update-form select:focus{border-color:#0d6efd;box-shadow:0 0 0 3px rgba(13,110,253,.12)}
    .payment-action-buttons{display:flex;align-items:center;gap:8px;align-self:end}
    .payment-action-buttons .mini-btn{height:44px;white-space:nowrap}
    .certificate-row{grid-template-columns:1.2fr 1fr auto}
    .certificate-row-pending{background:#f8fbff;border-color:#dbe7f5}
    .mini-status{display:inline-flex;align-items:center;justify-content:center;min-height:34px;border-radius:999px;background:#eef4fb;color:#52627a;font-weight:900;font-size:12px;padding:0 13px}
    .certificate-blocked-card{position:relative;display:grid;grid-template-columns:minmax(220px,.72fr) minmax(0,1fr);gap:28px;align-items:center;background:#fff;border:1px solid var(--line);border-radius:18px;padding:28px;min-height:460px;overflow:hidden;box-shadow:0 20px 50px rgba(17,33,61,.08)}
    .certificate-blocked-card>.mini-btn{position:absolute;left:22px;top:22px;z-index:2}
    .certificate-blocked-animation{position:relative;width:min(320px,100%);height:230px;justify-self:center;margin-top:18px}
    .certificate-blocked-animation>div:first-child{position:absolute;inset:0}
    .certificate-css-animation{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none}
    .certificate-css-animation::before{content:"";position:absolute;width:210px;height:210px;border-radius:999px;background:#e1f4ff;animation:certificatePulse 2.4s ease-in-out infinite}
    .certificate-css-paper{position:relative;z-index:1;width:172px;height:116px;border:5px solid #16b99d;border-radius:14px;background:#fff;box-shadow:0 20px 40px rgba(17,33,61,.16);display:grid;align-content:center;gap:13px;padding:0 28px;animation:certificateFloat 2.4s ease-in-out infinite}
    .certificate-css-paper span{display:block;height:8px;border-radius:999px;background:#bccce2}
    .certificate-css-paper span:nth-child(1){width:82px}
    .certificate-css-paper span:nth-child(2){width:116px}
    .certificate-css-paper span:nth-child(3){width:68px}
    .certificate-css-badge{position:absolute;z-index:2;right:58px;bottom:48px;width:54px;height:54px;border-radius:999px;background:#1f3471;border:8px solid #fff;box-shadow:0 12px 28px rgba(17,33,61,.2);animation:certificateBadge 2.4s ease-in-out infinite}
    .certificate-css-badge::after{content:"";position:absolute;left:15px;top:10px;width:13px;height:24px;border:solid #fff;border-width:0 5px 5px 0;transform:rotate(42deg)}
    .certificate-css-clock{position:absolute;z-index:3;right:42px;top:44px;width:48px;height:48px;border-radius:999px;border:6px solid #1f3471;background:#fff;box-shadow:0 12px 26px rgba(17,33,61,.14)}
    .certificate-css-clock i{position:absolute;left:50%;top:50%;width:4px;height:17px;background:#16b99d;border-radius:999px;transform-origin:50% 0;animation:certificateClock 1.6s linear infinite}
    @keyframes certificateFloat{0%,100%{transform:translateY(10px) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
    @keyframes certificatePulse{0%,100%{transform:scale(.9);opacity:.78}50%{transform:scale(1.06);opacity:1}}
    @keyframes certificateBadge{0%,100%{transform:scale(.92)}50%{transform:scale(1.08)}}
    @keyframes certificateClock{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    .certificate-blocked-copy{display:grid;gap:14px;max-width:640px}
    .certificate-blocked-copy h2{font-size:34px;line-height:1.08;color:#061633;margin:0;letter-spacing:0}
    .certificate-blocked-copy p{color:#66728a;line-height:1.7;margin:0;font-size:15px}
    .certificate-blocked-copy p strong{color:#17213a}
    .certificate-blocked-copy .mini-btn{justify-self:start;margin-top:4px}
    .certificate-blocked-meta{display:flex;gap:10px;flex-wrap:wrap}
    .certificate-blocked-meta span{border:1px solid #dbe7f5;background:#f8fbff;border-radius:999px;color:#34415a;font-weight:800;font-size:12px;padding:8px 12px}
    .certificate-card{background:#fff;border:1px solid var(--line);border-radius:13px;padding:22px;display:grid;gap:16px;overflow:auto}
    .imed-certificate-exact-frame{width:1220px;height:862.49px;max-width:none;margin:0 auto;overflow:hidden;background:#fff;box-shadow:0 18px 44px rgba(17,33,61,.08)}
    .imed-certificate-exact-frame>div{width:3508px;height:2480px;transform:scale(.3477765);transform-origin:top left}
    .imed-certificate{position:relative;isolation:isolate;aspect-ratio:3508/2480;width:min(100%,1220px);min-width:980px;margin:0 auto;overflow:hidden;background:#fff;color:#4a5565;box-shadow:0 18px 44px rgba(17,33,61,.08);font-family:Inter,ui-sans-serif,system-ui,sans-serif}
    .imed-certificate img{display:block;max-width:none;pointer-events:none;user-select:none}
    .cert-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2}
    .cert-left-ornament{position:absolute;left:8.1%;top:2.5%;width:10.2%;height:34.8%;object-fit:cover;object-position:center;opacity:.96;z-index:-1}
    .cert-crest-art{position:absolute;left:5.4%;top:8.8%;width:16%;height:22%;object-fit:cover;opacity:.88;z-index:-1}
    .cert-brand-row{position:absolute;left:22%;right:6.5%;top:5.7%;display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:3%;color:#1f3471}
    .cert-logo-lockup{display:flex;align-items:center;gap:18px}
    .cert-logo-lockup img{width:58px;height:70px;object-fit:contain}
    .cert-logo-lockup div{display:grid;gap:3px;font-family:Poppins,Inter,sans-serif;line-height:1}
    .cert-logo-lockup strong{font-size:36px;color:#1f3471}
    .cert-logo-lockup span{font-size:29px;font-weight:800;color:#25a88d}
    .cert-brand-row>p{font-family:"Cormorant Garamond",serif;font-style:italic;font-weight:700;font-size:19px;line-height:1.2;color:#111;margin:0;text-align:center;white-space:normal;overflow:hidden;text-overflow:ellipsis}
    .cert-partner-logos{display:flex;align-items:center;gap:22px}
    .cert-partner-logos img:first-child{width:150px;height:auto}
    .cert-partner-logos img:last-child{width:70px;height:auto}
    .cert-authorised{position:absolute;left:36%;right:25%;top:18.7%;font-family:Poppins,Inter,sans-serif;font-size:15px;font-weight:700;letter-spacing:3px;color:#1f3471;text-align:center;text-transform:uppercase}
    .cert-main-title{position:absolute;left:26%;right:8.5%;top:23%;display:grid;justify-items:center;text-align:center}
    .cert-main-title h2{font-family:"GFS Didot",Georgia,serif;font-size:66px;line-height:1;color:#1f3471;letter-spacing:18px;margin:0}
    .cert-main-title img{width:140px;height:18px;object-fit:cover;margin:20px 0 8px}
    .cert-main-title span{font-family:"GFS Didot",Georgia,serif;font-size:31px;line-height:1;color:#ac7c20;letter-spacing:8px}
    .cert-facts{position:absolute;left:6.8%;top:45.2%;width:20%;display:grid;gap:30px}
    .cert-facts div{display:grid;gap:7px;padding-left:58px;position:relative}
    .cert-facts i{position:absolute;left:0;top:3px;width:38px;height:38px;border-radius:11px;background:#031627;color:#fff;display:grid;place-items:center}
    .cert-facts b{font-size:13px;font-weight:700;color:#4a5565}
    .cert-facts span{font-size:22px;line-height:1.2;font-weight:800;color:#25a88d;overflow-wrap:anywhere}
    .cert-body{position:absolute;left:25.8%;right:21.5%;top:38.8%;display:grid;justify-items:center;text-align:center}
    .cert-body p{font-size:20px;line-height:1.35;color:#4a5565;margin:0}
    .cert-body h3{font-family:Italianno,cursive;font-size:98px;line-height:.82;font-weight:400;color:#1f3471;margin:20px 0 0;max-width:100%;overflow-wrap:anywhere}
    .cert-body img{width:54%;height:18px;object-fit:cover;margin:2px 0 18px}
    .cert-body h4{font-size:27px;line-height:1.15;font-weight:800;color:#25a88d;margin:22px 0 22px;max-width:100%;overflow-wrap:anywhere}
    .cert-award{position:absolute;left:29%;right:25%;bottom:23.8%;display:flex;align-items:center;justify-content:center;gap:24px}
    .cert-award img{width:34px;height:72px;object-fit:cover}
    .cert-award img:last-child{transform:scaleX(-1)}
    .cert-award p{font-family:"Cormorant Garamond",serif;font-style:italic;font-weight:700;font-size:21px;line-height:1.12;text-align:center;color:#ac7c20;margin:0}
    .cert-signatures{position:absolute;left:23.5%;right:22%;bottom:6.1%;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7%}
    .cert-signatures div{display:grid;justify-items:center;text-align:center;color:#4a5565}
    .cert-signatures img{height:43px;width:100%;object-fit:contain;margin-bottom:9px}
    .cert-signatures span{height:2px;background:#ac7c20;width:100%;border-radius:99px;margin-bottom:9px}
    .cert-signatures b{font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#4a5565}
    .cert-signatures small{font-size:12px;text-transform:uppercase;letter-spacing:1.2px;color:#4a5565;margin-top:4px}
    .cert-verify{position:absolute;right:6.2%;bottom:6.5%;width:12.5%;display:grid;justify-items:center;gap:6px;text-align:center}
    .cert-verify b{font-size:13px;color:#4a5565}
    .cert-verify span{font-size:12px;color:#4a5565}
    .cert-verify strong{font-size:12px;color:#25a88d;overflow-wrap:anywhere}
    .cert-qr{width:92px;height:92px;background:#fff;border:2px solid #cc932f;border-radius:4px;padding:7px;display:grid;grid-template-columns:repeat(15,1fr);gap:1px}
    .cert-qr span{background:#fff}
    .cert-qr span.filled{background:#031627}
    .cert-barcode{width:92px;height:20px;display:flex;align-items:stretch;justify-content:center;gap:2px;margin-top:1px}
    .cert-barcode span{display:block;background:#031627;width:2px}
    .cert-barcode span:nth-child(3n){width:4px}
    .cert-barcode span:nth-child(4n){height:70%;align-self:flex-end}
    .emi-reminder-stack{padding:0}
    .emi-reminder-row{grid-template-columns:1.3fr .72fr .72fr auto!important}
    .emi-student-link{border:0;background:transparent;color:var(--ink);padding:0;text-align:left;display:grid;gap:4px;cursor:pointer;font:inherit}
    .emi-student-link span,.emi-reminder-row small{color:#66728a}
    .emi-reminder-row>div{display:grid;gap:4px}
    .emi-reminder-row>div span{color:#66728a;font-size:12.5px;font-weight:800}
    .emi-reminder-row>div b{color:#061633}
    .mini-btn:disabled{opacity:.55;cursor:not-allowed}
    .toolbar-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:flex-end}
    .excel-upload-btn{cursor:pointer;position:relative;overflow:hidden}
    .excel-upload-btn input{position:absolute;inset:0;opacity:0;pointer-events:none}
    .secondary-btn{background:#fff!important;color:#0d6efd!important;border:1px solid #bfd3f4!important}
    .compact-head{align-items:center;margin-bottom:16px}
    .compact-head h2{margin:0!important}
    .lead-form.os-form{align-items:start}
    .lead-form.os-form label{grid-template-rows:16px 44px 16px;min-width:0}
    .lead-form.os-form input,.lead-form.os-form select{height:44px;width:100%;min-width:0;box-sizing:border-box}
    .lead-form.os-form input[type=file]{display:flex;align-items:center;padding:9px 12px}
    .lead-form.os-form button{height:44px;align-self:end;margin-top:22px}
    .file-help{color:#66728a;font-size:11.5px;line-height:1.35;margin-top:-2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .crm-sidebar,.crm-main{transition:width .18s ease,margin-left .18s ease}
    .sidebar-collapsed .crm-sidebar{width:74px!important}
    .sidebar-collapsed .crm-main{margin-left:74px!important}
    .sidebar-collapsed .brand-block{justify-content:center!important;padding:0!important}
    .sidebar-collapsed .sidebar-brand-logo span,.sidebar-collapsed .nav-group-label,.sidebar-collapsed .crm-nav button span,.sidebar-collapsed .sidebar-bottom button span{display:none!important}
    .sidebar-collapsed .crm-nav button,.sidebar-collapsed .sidebar-bottom button{justify-content:center!important;padding:13px!important}
    .sidebar-collapsed .sidebar-brand-logo img{width:34px!important;height:34px!important}
    html,body,#root{max-width:100%;overflow-x:hidden}
    .imed-crm,.crm-shell{width:100%;max-width:100%;overflow-x:hidden}
    .imed-crm *{box-sizing:border-box}
    .crm-main{width:calc(100% - 240px)!important;max-width:calc(100vw - 240px)!important;overflow-x:hidden!important}
    .sidebar-collapsed .crm-main{width:calc(100% - 74px)!important;max-width:calc(100vw - 74px)!important}
    .panel-stack,.os-stack,.crm-grid,.crm-card,.profile-card,.receipt-card,.metric-grid,.metrics,.two-col,.panel,.section-head,.toolbar,.crm-table{min-width:0;max-width:100%}
    .crm-table{overflow-x:auto!important;overflow-y:visible;-webkit-overflow-scrolling:touch}
    .table-row{width:max-content;max-width:none}
    .inline-form{flex-wrap:wrap}
    .inline-form input,.inline-form select{min-width:min(180px,100%);flex:1 1 170px}
    .inline-form button{flex:0 0 auto}
    .top-actions{min-width:0;flex-wrap:wrap}
    .top-actions>*{max-width:100%}
    .search{min-width:0}
    .lead-form.os-form{grid-template-columns:repeat(auto-fit,minmax(190px,1fr))!important}
    .lead-doc-grid{grid-template-columns:repeat(auto-fit,minmax(180px,1fr))}
    @media(max-width:1180px){.crm-sidebar{width:74px!important}.crm-main{margin-left:74px!important;width:calc(100% - 74px)!important;max-width:calc(100vw - 74px)!important}.crm-topbar{height:auto!important;min-height:70px;display:grid!important;grid-template-columns:1fr!important;align-items:start!important;gap:12px;padding:14px 18px!important}.top-actions{display:flex!important}.panel-stack,.os-stack{padding:18px!important}.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.funnel{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:760px){.crm-sidebar{width:64px!important}.crm-main{margin-left:64px!important;width:calc(100% - 64px)!important;max-width:calc(100vw - 64px)!important}.panel-stack,.os-stack{padding:12px!important}.metrics,.metric-grid,.metric-grid.three,.two-col,.crm-grid.two{grid-template-columns:1fr!important}.funnel{grid-template-columns:1fr}.inline-form,.toolbar,.top-actions{display:grid!important;grid-template-columns:1fr!important}.inline-form button,.toolbar-actions .btn,.compact-head .btn{width:100%}.lead-doc-grid{grid-template-columns:1fr}.table-row{min-width:720px!important}.certificate-card{padding:10px!important}}
    @media(max-width:520px){.crm-sidebar{width:56px!important}.crm-main{margin-left:56px!important;width:calc(100% - 56px)!important;max-width:calc(100vw - 56px)!important}.crm-topbar{padding:12px!important}.panel-stack,.os-stack{padding:10px!important}.crm-card{padding:16px!important}.table-row{min-width:660px!important}.date-filter-group,.date-clear-btn,.scope-select{width:100%;min-width:0}.date-filter-group{height:auto;padding:7px 8px;display:grid;grid-template-columns:auto 1fr;align-items:center}.date-filter-group .top-date-filter{grid-column:2}.date-preset-select,.top-date-filter{width:100%}.course-fee-row{grid-template-columns:1fr!important}}
    @media print{@page{size:A4;margin:10mm}.certificate-card{box-shadow:none;border:0;padding:0;overflow:visible}.imed-certificate-exact-frame{box-shadow:none;break-inside:avoid}body.print-certificate-only{background:#fff!important}body.print-certificate-only .crm-sidebar,body.print-certificate-only .crm-topbar,body.print-certificate-only .no-print,body.print-certificate-only .profile-card,body.print-certificate-only .metric-grid,body.print-certificate-only .crm-card,body.print-certificate-only .receipt-card{display:none!important}body.print-certificate-only .crm-main{margin:0!important;padding:0!important;background:#fff!important}body.print-certificate-only .panel-stack{display:block!important;padding:0!important}body.print-certificate-only .certificate-card{display:block!important;margin:0!important;padding:0!important;border:0!important;overflow:visible!important}body.print-certificate-only .imed-certificate-exact-frame{width:1220px!important;height:862.49px!important;margin:0!important;box-shadow:none!important}body.print-invoice-only{background:#fff!important}body.print-invoice-only .crm-sidebar,body.print-invoice-only .crm-topbar,body.print-invoice-only .no-print,body.print-invoice-only .profile-card,body.print-invoice-only .metric-grid,body.print-invoice-only .crm-card:not(.invoice-card),body.print-invoice-only .certificate-card{display:none!important}body.print-invoice-only .crm-main{margin:0!important;padding:0!important;background:#fff!important;width:100%!important;max-width:100%!important}body.print-invoice-only .panel-stack{display:block!important;padding:0!important}body.print-invoice-only .invoice-card{display:block!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;overflow:visible!important}body.print-invoice-only .tax-invoice,body.print-invoice-only .payment-receipt{width:100%!important;max-width:100%!important;margin:0!important;font-size:10px!important;box-shadow:none!important}}
    @media(max-width:960px){.payment-update-form{grid-template-columns:1fr 1fr}.payment-action-buttons{grid-column:1/-1}.payment-action-buttons .mini-btn{flex:1}.emi-flow{grid-template-columns:repeat(2,minmax(0,1fr))}.emi-plan-form{grid-template-columns:1fr 1fr}.emi-plan-form button{grid-column:span 1}.batch-strength-grid{grid-template-columns:1fr}.batch-count-list{overflow:auto}}
    @media(max-width:760px){.certificate-row,.assignment-row,.emi-reminder-row{grid-template-columns:1fr!important}.certificate-card{padding:12px}.imed-certificate-exact-frame{margin:0}.batch-picker{display:grid}.toolbar-actions{justify-content:stretch}.toolbar-actions .btn,.compact-head .btn{width:100%}.compact-head{display:grid!important}}
    @media(max-width:760px){.certificate-blocked-card{grid-template-columns:1fr;padding:74px 18px 22px;gap:12px}.certificate-blocked-copy h2{font-size:25px}.certificate-blocked-animation{width:min(250px,100%);height:190px}.certificate-css-animation{transform:scale(.82)}.certificate-blocked-copy .mini-btn{width:100%}}
    @media(max-width:620px){.payment-update-form,.emi-plan-form,.emi-plan-head,.emi-flow,.course-fee-row,.billing-row{grid-template-columns:1fr}.payment-action-buttons{display:grid;grid-template-columns:1fr}.emi-plan-form button{grid-column:auto}.emi-example{display:grid}}
    @media(max-width:1180px){.crm-sidebar{width:74px!important}.crm-main{margin-left:74px!important;width:calc(100% - 74px)!important;max-width:calc(100vw - 74px)!important}}
    @media(max-width:760px){.crm-sidebar{width:64px!important}.crm-main{margin-left:64px!important;width:calc(100% - 64px)!important;max-width:calc(100vw - 64px)!important}.table-row{min-width:720px!important}}
    @media(max-width:520px){.crm-sidebar{width:56px!important}.crm-main{margin-left:56px!important;width:calc(100% - 56px)!important;max-width:calc(100vw - 56px)!important}.table-row{min-width:660px!important}}
    .crm-sidebar{overflow-y:auto!important;overflow-x:hidden!important;scrollbar-width:thin}
    .crm-sidebar::-webkit-scrollbar{width:6px}
    .crm-sidebar::-webkit-scrollbar-thumb{background:rgba(255,255,255,.25);border-radius:999px}
    .sidebar-bottom{margin-top:0!important}
    .crm-table{width:100%;overflow-x:hidden!important;border-radius:13px}
    .table-row{width:100%!important;min-width:0!important;max-width:100%!important;gap:10px!important}
    .table-row>span,.table-row strong,.table-row small{min-width:0;overflow-wrap:anywhere}
    .crm-table select{width:100%!important;min-width:0!important;max-width:100%!important;overflow:hidden;text-overflow:ellipsis}
    .lead-row{grid-template-columns:minmax(120px,1.05fr) minmax(105px,.8fr) minmax(105px,.75fr) minmax(85px,.65fr) minmax(90px,.65fr) minmax(120px,.8fr)!important}
    .lead-row-action{grid-template-columns:minmax(120px,1.05fr) minmax(105px,.8fr) minmax(105px,.75fr) minmax(85px,.65fr) minmax(90px,.65fr) minmax(120px,.8fr) minmax(86px,auto)!important}
    .lead-row-assigned{grid-template-columns:minmax(120px,1fr) minmax(105px,.78fr) minmax(105px,.75fr) minmax(85px,.62fr) minmax(90px,.65fr) minmax(130px,.92fr) minmax(120px,.82fr)!important}
    .lead-row-assigned-action{grid-template-columns:minmax(120px,1fr) minmax(105px,.78fr) minmax(105px,.75fr) minmax(85px,.62fr) minmax(90px,.65fr) minmax(130px,.92fr) minmax(120px,.82fr) minmax(86px,auto)!important}
    .student-row,.finance-table-row{grid-template-columns:minmax(130px,1.05fr) minmax(120px,.9fr) minmax(110px,.8fr) minmax(90px,.65fr) minmax(90px,.62fr) minmax(95px,.68fr) minmax(130px,.82fr)!important}
    .batch-strength-grid{grid-template-columns:minmax(0,1fr) minmax(260px,380px)!important}
    .batch-count-list,.selected-batch-list{min-width:0;max-width:100%}
    .batch-count-row{width:100%;min-width:0!important;grid-template-columns:minmax(110px,1fr) minmax(120px,.9fr) minmax(100px,.72fr) minmax(70px,.45fr) minmax(78px,auto)!important}
    .lead-form.os-form{grid-template-columns:repeat(6,minmax(0,1fr))!important;gap:16px 10px!important;align-items:start!important;margin-top:20px!important}
    .lead-form.os-form label{grid-template-rows:18px 40px 16px!important;gap:5px!important;min-width:0!important}
    .lead-form.os-form label>span{display:block;height:18px;line-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px!important;font-weight:800!important;color:#061633!important}
    .lead-form.os-form input,.lead-form.os-form select{height:40px!important;border-radius:13px!important;padding:0 14px!important}
    .lead-form.os-form input[type=file]{height:40px!important;padding:8px 10px!important;font-size:13px!important}
    .lead-form.os-form .file-help{height:16px!important;line-height:16px!important;margin:0!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:10.5px!important}
    .lead-form.os-form button{height:40px!important;margin-top:23px!important;align-self:start!important;border-radius:999px!important;white-space:nowrap}
    @media(max-width:1180px){.crm-table{overflow-x:auto!important}.table-row{min-width:860px!important;width:max-content!important}.batch-strength-grid{grid-template-columns:1fr!important}.batch-count-list{overflow-x:auto}.batch-count-row{min-width:680px!important}.attendance-detail-layout{grid-template-columns:1fr}.sidebar-bottom{margin-top:0!important}}
    @media(max-width:1280px){.lead-form.os-form{grid-template-columns:repeat(4,minmax(0,1fr))!important}}
    @media(max-width:920px){.lead-form.os-form{grid-template-columns:repeat(2,minmax(0,1fr))!important}.lead-form.os-form button{width:100%}}
    @media(max-width:560px){.lead-form.os-form{grid-template-columns:1fr!important}.lead-form.os-form button{margin-top:0!important}}
    @media(max-width:700px){
      html,body,#root{width:100%;max-width:100%;overflow-x:hidden}
      .imed-crm{min-height:100svh;padding-bottom:78px!important;overflow-x:hidden!important}
      .crm-main,.sidebar-collapsed .crm-main{margin-left:0!important;width:100%!important;max-width:100vw!important;min-height:100svh!important;padding:0!important}
      .crm-sidebar,.sidebar-collapsed .crm-sidebar{position:fixed!important;left:0!important;right:0!important;top:auto!important;bottom:0!important;width:100%!important;height:auto!important;max-height:78px!important;padding:0!important;display:grid!important;grid-template-columns:1fr auto!important;gap:0!important;background:#11213d!important;border-top:1px solid rgba(255,255,255,.12)!important;box-shadow:0 -12px 34px rgba(15,23,42,.2)!important;overflow:hidden!important;z-index:80!important}
      .brand-block{display:none!important}
      .crm-nav{display:flex!important;align-items:stretch!important;gap:0!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;scrollbar-width:none}
      .crm-nav::-webkit-scrollbar{display:none}
      .nav-section{display:contents!important}
      .nav-group-label{display:none!important}
      .crm-nav button,.sidebar-bottom button,.sidebar-collapsed .crm-nav button,.sidebar-collapsed .sidebar-bottom button{min-width:66px!important;height:64px!important;padding:8px 10px!important;border:0!important;border-radius:0!important;display:grid!important;place-items:center!important;gap:4px!important;font-size:10px!important;line-height:1.1!important;text-align:center!important;scroll-snap-align:start;color:#d7e3f5!important;background:transparent!important}
      .crm-nav button span{display:block!important;max-width:58px!important;white-space:normal!important;overflow:hidden!important;text-overflow:ellipsis!important}
      .sidebar-bottom{display:flex!important;align-items:stretch!important;margin:0!important;padding:0!important;border-left:1px solid rgba(255,255,255,.12)!important;background:#0d1a31!important}
      .sidebar-bottom button span{display:none!important}
      .crm-nav button.active{background:#17366e!important;color:#fff!important;border-left:0!important;border-top:3px solid #0d6efd!important}
      .crm-topbar{position:sticky!important;top:0!important;z-index:40!important;display:grid!important;grid-template-columns:1fr!important;gap:10px!important;height:auto!important;min-height:0!important;padding:12px!important}
      .crm-topbar h1{font-size:20px!important;line-height:1.15!important;overflow-wrap:anywhere}
      .top-actions,.toolbar,.section-head,.compact-head{display:grid!important;grid-template-columns:1fr!important;align-items:stretch!important;justify-content:stretch!important;gap:10px!important}
      .top-actions button,.toolbar .btn,.toolbar-actions .btn,.compact-head .btn,.filters button,.inline-form button,.lead-form.os-form button,.payment-action-buttons .mini-btn{width:100%!important}
      .scope-select,.date-filter-group,.date-preset-select,.top-date-filter,.date-clear-btn,.search,.search input,.filters label,.filters select,.filters input{width:100%!important;min-width:0!important;max-width:100%!important}
      .date-filter-group{height:auto!important;min-height:38px!important;display:grid!important;grid-template-columns:auto minmax(0,1fr)!important;gap:8px!important;padding:6px 8px!important}
      .date-filter-group .top-date-filter{grid-column:2!important}
      .panel-stack,.os-stack{padding:12px!important;gap:14px!important}
      .crm-card,.panel,.metric,.metric-card,.profile-card,.receipt-card{border-radius:12px!important;padding:14px!important;max-width:100%!important}
      .crm-card h2{font-size:15px!important;line-height:1.25!important;align-items:flex-start!important}
      .metrics,.metric-grid,.metric-grid.three,.two-col,.crm-grid.two,.settings-premium-grid,.settings-split,.billing-row,.lead-doc-grid,.assignment-row,.batch-strength-grid,.payment-receipt-head,.payment-receipt-party,.payment-receipt-grid{grid-template-columns:1fr!important}
      .metric{min-height:0!important}
      .metric .val,.metric-card strong{font-size:24px!important}
      .hero-strip,.profile-card,.receipt-head,.payment-receipt-bottom{display:grid!important;gap:12px!important}
      .hero-strip h2,.profile-card h2{font-size:24px!important;line-height:1.1!important}
      .status-pill{margin-left:0!important;justify-self:start!important}
      .filters,.inline-form,.finance-row form,.payment-action-buttons{display:grid!important;grid-template-columns:1fr!important}
      .inline-form input,.inline-form select,.finance-row input,.finance-row select,.settings-grid .inline-form input,.settings-grid .inline-form select,.settings-grid .inline-form textarea{width:100%!important;min-width:0!important}
      .crm-table,.batch-count-list,.certificate-card,.invoice-card{width:100%!important;max-width:100%!important;overflow-x:auto!important;overflow-y:visible!important;-webkit-overflow-scrolling:touch!important}
      .table-row{min-width:760px!important;width:max-content!important;max-width:none!important}
      .batch-count-row{min-width:680px!important;width:max-content!important}
      .crm-table select{min-height:34px!important;padding:6px 8px!important;border:1px solid #dfe6f0!important;border-radius:8px!important;background:#fff!important}
      .pagination-bar,.pagination-bar>div{display:grid!important;grid-template-columns:1fr!important;justify-items:stretch!important}
      .pagination-bar button{width:100%!important}
      .lead-form.os-form{grid-template-columns:1fr!important;gap:12px!important}
      .lead-form.os-form label{grid-template-rows:auto auto auto!important}
      .lead-form.os-form label>span{height:auto!important;white-space:normal!important;line-height:1.25!important}
      .file-help{white-space:normal!important;height:auto!important;line-height:1.35!important}
      .payment-receipt{min-width:640px!important}
      .payment-receipt-party>div,.payment-receipt-grid>div{border-right:0!important;border-bottom:1px solid #d8e4f3!important}
      .tax-invoice{min-width:760px!important}
      .imed-certificate-exact-frame{width:1220px!important;max-width:none!important}
    }
    @media(max-height:720px){.brand-block{height:66px!important}.nav-group-label{padding-top:10px!important}.crm-nav button,.sidebar-bottom button{padding-top:10px!important;padding-bottom:10px!important}}
  `}</style>
  </>
}


























