import { ChangeEvent, FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Toaster, toast } from "sonner";
import IMedCertificate from "./IMedCertificate";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BadgeIndianRupee,
  BarChart3,
  Bell,
  BookOpen,
  Boxes,
  Calendar,
  CalendarDays,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  Copy,
  CreditCard,
  Download,
  Eye,
  EyeOff,
  ExternalLink,
  FileText,
  GraduationCap,
  History,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Package,
  Pencil,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Stethoscope,
  Star,
  Tablet,
  TrendingUp,
  Trash2,
  UserPlus,
  UserRound,
  Users,
  Check,
  Clock,
  UserCheck,
  X,
} from "lucide-react";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");

const stages = ["New Lead", "Contacted", "Counselling", "Demo / Visit", "Admission", "Enrolled", "Alumni"];
const studentStatuses = ["Enrolled", "Admission Completed", "Fees Decided", "Fees Collected", "Active Student", "Classroom Complete", "Course Completed", "Alumni"];
const studentJourneyStages = ["Enrolled", "Admission Completed", "Fees Decided", "Fees Collected", "Active Student", "Classroom Complete", "Course Completed", "Alumni"];
const attendanceStatuses: AttendanceStatus[] = ["Present", "Absent", "Late", "Leave"];
const sources = ["Meta", "BTL", "College", "Referral"];
const leadDocumentAccept = ".pdf,.jpg,.jpeg,.png,.webp";
const leadDocumentHelpText = "PDF, JPG, PNG or WEBP. Max 2 MB.";
const leadDocumentMaxSize = 2 * 1024 * 1024;
const leadDocumentTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const paymentModes = ["Cash", "UPI", "Card", "Bank Transfer", "Loan Provider"];
const paymentPurposes = ["Seat Booking Amount", "Fees Installment"];
const partialEmiPaymentMode = "Partial + EMI";
const legacyPartialEmiPaymentMode = "Upfront + EMI";
const admissionPaymentModes = ["Full Payment", "EMI", partialEmiPaymentMode, "Loan Provider"];
const paymentNoteMaxLength = 250;
const paymentReferenceMaxLength = 80;
const leadFeedbackOptions = ["New", "Interested", "Qualified", "Follow-up", "RNR", "Not Interested", "Future Cohort", "On Hold", "Converted", "Lost", "Not Connected", "Busy Call later", "Invalid", "Junk"];
const leadPamphlets = [
  { key: "first-contact", label: "Course enquiry" },
  { key: "contacted-followup", label: "Called earlier" },
  { key: "hot-lead", label: "Hot lead" },
  { key: "rnr-dnp", label: "RNR / DNP" },
  { key: "fee-emi", label: "Fee / EMI" },
] as const;
const leadFollowUpTypes = ["Call", "WhatsApp", "Walk-in", "Demo", "Counselling", "Fee discussion", "Document collection", "Final confirmation"];
const leadFollowUpStatuses = ["Scheduled", "Completed", "No response", "Rescheduled", "Interested", "Not interested"];
const studentFeedbackTypes = ["Academic progress", "Attendance issue", "Fee / EMI discussion", "Placement discussion", "Parent conversation", "Complaint", "General follow-up"];
const studentFeedbackStatuses = ["Positive", "Needs follow-up", "Escalated", "Resolved", "No response"];
const classTypes = ["Regular Class", "One-time Class"];
const classNatures = ["Theoretical", "Practical"];
const classDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const topicStatuses = ["Not Started", "In Progress", "Covered"];
const practicalStatuses = ["Pending", "Completed", "Needs Repeat"];
const internshipStatuses = ["Assigned", "Active", "Completed", "Terminated"];
const internshipDurationUnits = ["days", "weeks", "months"];
const alumniPlacementStatuses = ["Not Placed", "Interview Scheduled", "Placed", "Self Placed"];
const referralStatuses = ["New", "Contacted", "Converted", "Lost"];
const fallbackCentres = ["Delhi", "Kochi", "Bangalore"];
const fallbackCourses = ["HA", "EMT", "GDA", "OCHA", "AHAP"];
const leadPriorityOptions = ["P0", "P1", "P2", "P3"];
const leadPriorityLabels: Record<string, string> = { P0: "P0 - Hot", P1: "P1 - High", P2: "P2 - Warm", P3: "P3 - Cold" };
const defaultPageSize = 25;
const GST_RATE = 0.18;
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
type ApiResult<T> = { ok: boolean; data?: T; meta?: PaginationMeta; message?: string; token?: string; user?: AdminUser; temporaryPassword?: string };
type AdminUser = { name: string; email: string; role: string; franchiseId?: string; googleCalendarConnected?: boolean; googleCalendarEmail?: string };
type GoogleCalendarStatus = { configured: boolean; connected: boolean; email?: string };
type DocumentFile = { originalName?: string; storedName?: string; mimeType?: string; size?: number; uploadedAt?: string };
type LeadFollowUp = { type?: string; status?: string; scheduledAt?: string; note?: string; by?: string; createdAt?: string };
type LeadActivity = { type: string; message: string; by?: string; at?: string };
type Lead = { _id: string; fullName: string; phone: string; parentMobile?: string; email?: string; governmentProof?: DocumentFile; highestQualificationCertificate?: DocumentFile; source?: string; centre?: string; franchiseId?: string; course?: string; counsellor?: string; stage: string; priority?: string; leadFeedback?: string; city?: string; studentLocation?: string; expectedFee?: number; nextFollowUp?: string; followUps?: LeadFollowUp[]; notes?: string; activities?: LeadActivity[]; ipAddress?: string; userAgent?: string; isSuspectedConsultancy?: boolean; consultancyFlagReason?: string; assignedAt?: string; assignedBy?: string; createdAt?: string; updatedAt?: string };
type CashDeposit = { amount?: number; bank?: string; referenceNumber?: string; note?: string; proof?: DocumentFile; depositedBy?: string; by?: string; depositedAt?: string; createdAt?: string };
type PaymentRecord = { amount?: number; mode?: string; paymentPurpose?: string; transactionId?: string; emiReference?: string; loanProviderName?: string; note?: string; proof?: DocumentFile; cashDeposits?: CashDeposit[]; by?: string; paidAt?: string };
type StudentFeedback = { type?: string; status?: string; note?: string; nextFollowUpDate?: string; by?: string; at?: string };
type InternshipAssignment = { _id?: string; facilityName?: string; facilityLocation?: string; supervisorName?: string; supervisorContact?: string; supervisorEmail?: string; facilityLatitude?: number; facilityLongitude?: number; allowedRadiusMeters?: number; startDate?: string; durationValue?: number; durationUnit?: string; expectedEndDate?: string; actualEndDate?: string; status?: string; departmentRotation?: string; assignedBy?: string; updatedAt?: string };
type InternshipLog = { _id: string; date?: string; loginAt?: string; logoutAt?: string; loginPhoto?: DocumentFile; logoutPhoto?: DocumentFile; loginGps?: string; logoutGps?: string; hours?: number; flagged?: boolean; flagReason?: string };
type LogbookEntry = { _id: string; date?: string; departmentArea?: string; activitiesPerformed?: string; keyLearnings?: string; challenges?: string; supervisorRemark?: string; verified?: boolean; verifiedBy?: string; verifiedAt?: string; createdAt?: string };
type KitDistribution = {
  idCardIssued?: boolean;
  idCardNumber?: string;
  idCardIssuedAt?: string;
  tshirtIssued?: boolean;
  tshirtSize?: string;
  tshirtQuantity?: number;
  tshirts?: { size: string; quantity: number }[];
  tshirtIssuedAt?: string;
  bagIssued?: boolean;
  bagIssuedAt?: string;
  tabletIssued?: boolean;
  tabletAssetId?: string;
  tabletSerialNumber?: string;
  tabletIssuedAt?: string;
  issuedBy?: string;
  notes?: string;
};
type Student = { _id: string; leadId?: string; fullName: string; phone: string; parentMobile?: string; email?: string; studentLocation?: string; centre?: string; franchiseId?: string; course?: string; counsellor?: string; teacher?: string; batch?: string; batchCommenceDate?: string; status: string; totalFee?: number; paidAmount?: number; admissionNumber?: string; lmsAccessEnabled?: boolean; lmsAccessGeneratedAt?: string; lmsAccessGeneratedBy?: string; admissionPaymentMode?: string; admissionUpfrontAmount?: number; admissionFinalizedAt?: string; admissionFinalizedBy?: string; discountAmount?: number; emiEnabled?: boolean; emiMonths?: number; emiAmount?: number; nextEmiDate?: string; certificateNumber?: string; certificateIssuedAt?: string; certificateStatus?: string; placementStatus?: string; placementCompany?: string; placementRole?: string; placementJoiningDate?: string; placementSalary?: number; placementHrContact?: string; placementOfferLetterUrl?: string; placementRemarks?: string; testimonialText?: string; testimonialVideoUrl?: string; testimonialRating?: number; testimonialApproved?: boolean; referralName?: string; referralPhone?: string; referralStatus?: string; payments?: PaymentRecord[]; feedbacks?: StudentFeedback[]; internshipAssignment?: InternshipAssignment | null; internshipLogs?: InternshipLog[]; logbookEntries?: LogbookEntry[]; kitDistribution?: KitDistribution; createdAt?: string; updatedAt?: string };
type Centre = { _id: string; name: string; type?: "branch" | "franchise"; city?: string; billingLegalName?: string; billingAddress?: string; billingGstin?: string; billingStateName?: string; billingStateCode?: string; billingEmail?: string; billingPhone?: string; bankAccountName?: string; bankName?: string; bankAccountNumber?: string; bankIfsc?: string; bankBranch?: string };
type Course = { _id: string; name: string; code?: string; fee?: number; duration?: string; franchiseId?: string };
type Counsellor = { _id?: string; name: string; email: string; role: string; franchiseId?: string };
type Batch = { _id: string; name: string; centre?: string; franchiseId?: string; course?: string; assignedFaculty?: string[]; commenceDate: string };
type Attendance = { _id?: string; classSessionId?: string; studentId: string; studentName?: string; date?: string; nature?: "Theoretical" | "Practical"; status: "Present" | "Absent" | "Late" | "Leave"; note?: string; centre?: string; franchiseId?: string; batch?: string; course?: string; counsellor?: string; teacher?: string; markedBy?: string };
type ClassSchedule = { _id: string; batchId: string; batchName: string; course?: string; centre?: string; franchiseId?: string; classType: string; nature: string; faculty: string; days?: string[]; startTime: string; endTime: string; startDate?: string; endDate?: string; note?: string };
type ClassSession = { _id: string; scheduleId?: string; batchId: string; batchName: string; course?: string; centre?: string; franchiseId?: string; classType: string; nature: string; faculty: string; date: string; startTime: string; endTime: string; studentCount?: number; attendanceMarked?: boolean; googleCalendarEventId?: string; note?: string };
type TopicProgress = { _id?: string; batchId: string; batchName?: string; course?: string; centre?: string; franchiseId?: string; module: string; topic: string; status: "Not Started" | "In Progress" | "Covered"; dateCovered?: string; faculty?: string; updatedBy?: string };
type PracticalRecord = { _id?: string; batchId: string; batchName?: string; course?: string; centre?: string; franchiseId?: string; practicalName: string; module?: string; studentId: string; studentName?: string; dateConducted?: string; status: "Pending" | "Completed" | "Needs Repeat"; remarks?: string; faculty?: string; updatedBy?: string };
type StudyNote = { _id: string; batchId: string; batchName?: string; course?: string; centre?: string; franchiseId?: string; title: string; module?: string; description?: string; file?: DocumentFile; referenceUrl?: string; resourceType?: "File" | "Video" | "Reference"; uploadedBy?: string; createdAt?: string };
type NpsTouchpoint = "mid_course" | "post_classroom" | "post_internship";
type NpsResponse = { _id: string; studentId?: Student | { _id?: string; fullName?: string; admissionNumber?: string; phone?: string } | string; batchId?: string; batchName?: string; courseCode?: string; centre?: string; touchpoint: NpsTouchpoint; npsScore: number; npsCategory: "promoter" | "passive" | "detractor"; attrTeachingQuality?: number; attrContentRelevance?: number; attrPracticalTraining?: number; attrSupportInfra?: number; attrPlacementAssistance?: number; openFeedback?: string; followUpStatus?: "Pending" | "In Progress" | "Resolved"; followUpNotes?: { note?: string; by?: string; at?: string }[]; submittedAt?: string };
type NpsDashboard = { total: number; promoters: number; passives: number; detractors: number | NpsResponse[]; nps: number; responseRate?: number; promoterPercent?: number; detractorPercent?: number; attributes?: Record<string, number>; trend?: { date: string; total: number; nps: number; promoters: number; passives: number; detractors: number }[]; alerts?: { tone: "good" | "warn" | "bad"; label: string; detail: string }[]; touchpoints?: { label: string; total: number; nps: number; promoters: number; passives: number; detractors: number }[]; batches?: { label: string; total: number; nps: number; promoters: number; passives: number; detractors: number }[]; detractorAlerts?: NpsResponse[] };
type AttendanceSummary = { studentId: string; studentName?: string; centre?: string; course?: string; batch?: string; counsellor?: string; teacher?: string; total: number; present: number; absent: number; late: number; leave: number; theoretical?: number; practical?: number; lastDate?: string };
type AttendanceDetailFilters = { dateFrom: string; dateTo: string; status: string; nature: string };
type Summary = { leadsThisMonth: number; totalLeads: number; enrolled: number; training: number; placed: number; lost: number; students: number; conversion: number; revenue: number; pending: number };
type AttendanceStatus = Attendance["status"];
type DatePreset = "all" | "today" | "yesterday" | "specific";
type InventorySummary = {
  idCards: number;
  bags: number;
  tshirts: {
    total: number;
    bySize: { S: number; M: number; L: number; XL: number; XXL: number };
  };
  tablets: {
    total: number;
    inStock: number;
    assigned: number;
    underRepair: number;
  };
  lowStockAlerts: { item: string; current: number; threshold: number }[];
  recentTransactions: InventoryTransaction[];
};
type InventoryItem = {
  _id: string;
  itemType: "id_card" | "tshirt" | "bag";
  size?: string;
  quantity: number;
  minThreshold: number;
  centre?: string;
  franchiseId?: string;
  updatedAt?: string;
};
type TabletAsset = {
  _id: string;
  assetId: string;
  serialNumber: string;
  brandModel: string;
  status: "In Stock" | "Assigned" | "Under Repair" | "Returned" | "Decommissioned";
  assignedStudentId?: string;
  assignedStudentName?: string;
  assignedStudentAdmissionNo?: string;
  assignedDate?: string;
  returnedDate?: string;
  centre?: string;
  remarks?: string;
};
type InventoryTransaction = {
  _id: string;
  type: "Stock In" | "Stock Out" | "Return" | "Adjustment";
  itemType: "id_card" | "tshirt" | "bag" | "tablet";
  size?: string;
  quantity: number;
  assetId?: string;
  serialNumber?: string;
  studentName?: string;
  vendorChallan?: string;
  handledBy?: string;
  date?: string;
  notes?: string;
};
type Panel = "dashboard" | "leads" | "addlead" | "admissions" | "batch" | "mystudents" | "attendance" | "logs" | "attdetail" | "allstudents" | "finance" | "emi" | "receipts" | "cert" | "alumni" | "internship" | "nps" | "inventory" | "settings" | "profile";
type AcademicTab = "batches" | "overview" | "students" | "timetable" | "attendance" | "markAttendance" | "topics" | "practicals" | "notes" | "logs" | "detail";
type RoleScope = "all" | string;
type ProfileTarget = { type: "lead"; data: Lead; mode?: "view" | "edit" } | { type: "student"; data: Student; mode?: "view" | "edit" } | null;
type ReceiptSelection = { type: "invoice" } | { type: "payment"; index: number };
type DeletePrompt = { title: string; message: string; confirmLabel?: string; tone?: "danger" | "logout"; onConfirm: () => Promise<void> };
type LogbookReviewPrompt = { student: Student; entry: LogbookEntry; verified: boolean; remark: string };
type LeadImportResult = { inserted: number; skipped?: { row: number; reason: string }[] };
type DocumentFieldName = "governmentProof" | "highestQualificationCertificate";
type DocumentPreviewRequest = { type: "lead" | "student"; id: string; field: DocumentFieldName; title: string; fileName?: string };
type DocumentPreviewState = { title: string; url: string; mimeType: string; fileName: string } | { title: string; loading: true } | null;

const documentUploaded = (doc?: DocumentFile) => Boolean(doc?.originalName || doc?.storedName);

function LeadDocumentRow({ label, doc, type, id, field, onPreview }: { label: string; doc?: DocumentFile; type: "lead" | "student"; id: string; field: DocumentFieldName; onPreview: (request: DocumentPreviewRequest) => void }) {
  const uploaded = documentUploaded(doc);
  return (
    <div className="kv-row">
      <span className="k">{label}</span>
      <span className="v document-actions">
        <span className={`badge ${uploaded ? "badge-green" : "badge-gray"}`}>{uploaded ? (doc?.originalName || "Uploaded") : "Not uploaded"}</span>
        {uploaded && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onPreview({ type, id, field, title: label, fileName: doc?.originalName || "document" })}>
            <Eye size={14} /> Preview
          </button>
        )}
      </span>
    </div>
  );
}

const navGroups: { group: string; items: { key: Panel; label: string; icon: ReactNode }[] }[] = [
  { group: "Overview", items: [{ key: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> }] },
  { group: "Admissions", items: [
    { key: "leads", label: "Leads", icon: <Users /> },
    { key: "addlead", label: "Add lead", icon: <UserPlus /> },
    { key: "admissions", label: "Admissions", icon: <ClipboardList /> },
  ] },
  { group: "Academics", items: [{ key: "batch", label: "Batches", icon: <BookOpen /> }] },
  { group: "Students", items: [
    { key: "mystudents", label: "My candidates", icon: <UserRound /> },
    { key: "allstudents", label: "All candidates", icon: <GraduationCap /> },
  ] },
  { group: "Attendance", items: [
    { key: "attendance", label: "Attendance", icon: <CheckCircle2 /> },
    { key: "logs", label: "Attendance logs", icon: <FileText /> },
  ] },
  { group: "Finance", items: [
    { key: "finance", label: "Finance", icon: <BadgeIndianRupee /> },
    { key: "emi", label: "EMI reminders", icon: <CalendarDays /> },
    { key: "receipts", label: "Receipts", icon: <ReceiptText /> },
  ] },
  { group: "Certification", items: [{ key: "cert", label: "Certificates", icon: <Award /> }] },
  { group: "Alumni", items: [{ key: "alumni", label: "Alumni", icon: <Star /> }] },
  { group: "Internship", items: [{ key: "internship", label: "Internship", icon: <Stethoscope /> }] },
  { group: "Operations", items: [{ key: "inventory", label: "Inventory & Kits", icon: <Package /> }] },
  { group: "Workspace", items: [
    { key: "settings", label: "Settings", icon: <ShieldCheck /> },
    { key: "profile", label: "Profile", icon: <UserRound /> },
  ] },
];

const panelTitles: Record<Panel, [string, string]> = {
  dashboard: ["Dashboard", "Overview across your scope"],
  leads: ["Leads", "Track and convert prospective students"],
  addlead: ["Add lead", "Create a new prospective student record"],
  admissions: ["Admissions", "Assign batches and enroll admission-ready leads"],
  batch: ["Batches", "Batch-wise timetable, attendance, topics and practicals"],
  mystudents: ["My candidates", "Candidates assigned to you"],
  attendance: ["Attendance", "Mark attendance for the selected date"],
  logs: ["Attendance logs", "Per-student attendance summary"],
  attdetail: ["Attendance detail", "Calendar view for one student"],
  allstudents: ["All candidates", "Every candidate across your scope"],
  finance: ["Finance", "Billing, collection and dues"],
  emi: ["EMI reminders", "Upcoming and overdue instalments"],
  receipts: ["Receipts", "Tax invoices and payment receipts"],
  cert: ["Certificates", "Issue and manage certificates"],
  alumni: ["Alumni", "Placement, testimonials and referrals"],
  internship: ["Internship", "Hospital posting logs and GPS review"],
  nps: ["NPS", "Student satisfaction and detractor follow-up"],
  inventory: ["Inventory & Kits", "Stock in, stock out, student kits, and tablet asset tracking"],
  settings: ["Settings", "Staff, branches, fees and security"],
  profile: ["Profile", "Lead and student details"],
};

function dateInputValue(value: Date | string | number = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
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

function dateInputValueFromDuration(startValue: string, durationValue: string | number, durationUnit = "months") {
  const startDate = new Date(startValue);
  const duration = Number(durationValue || 0);
  if (Number.isNaN(startDate.getTime()) || !duration || duration < 1) return "";
  const endDate = new Date(startDate);
  if (durationUnit === "days") endDate.setDate(endDate.getDate() + duration);
  else if (durationUnit === "weeks") endDate.setDate(endDate.getDate() + duration * 7);
  else endDate.setMonth(endDate.getMonth() + duration);
  return dateInputValue(endDate);
}

function getCourseDurationMonths(courseName: string | undefined, courses?: (Course | string)[]): number {
  if (!courseName) return 6;
  const match = (courses || []).find((c) => {
    if (!c) return false;
    if (typeof c === "string") return c.toLowerCase() === String(courseName).toLowerCase();
    return [c.name, c.code].some((v) => String(v || "").toLowerCase() === String(courseName || "").toLowerCase());
  });
  const duration = (typeof match === "object" && match?.duration) || courseDuration(courseName);
  // Parse strings like "6 months", "3 months", "4 months"
  const m = String(duration).match(/(\d+)\s*month/i);
  if (m) return Math.max(1, parseInt(m[1], 10));
  // Parse "X weeks" → convert to months roughly
  const w = String(duration).match(/(\d+)\s*week/i);
  if (w) return Math.max(1, Math.round(parseInt(w[1], 10) / 4));
  return 6; // default fallback
}

function formatCurrency(value = 0) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);
}

function formatInvoiceAmount(value = 0) {
  return new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value || 0);
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function formatLongDate(value?: string | Date) {
  if (!value) return "-";
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return "-";
    return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(d);
  } catch {
    return "-";
  }
}

function formatDateTime(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function parseGps(value?: string) {
  const match = String(value || "").match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!match) return null;
  const lat = Number(match[1]);
  const lng = Number(match[2]);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function gpsDistanceMeters(a?: string, b?: string) {
  const first = parseGps(a);
  const second = parseGps(b);
  if (!first || !second) return null;
  const toRad = (value: number) => (value * Math.PI) / 180;
  const earthRadius = 6371000;
  const dLat = toRad(second.lat - first.lat);
  const dLng = toRad(second.lng - first.lng);
  const lat1 = toRad(first.lat);
  const lat2 = toRad(second.lat);
  const haversine = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)));
}

function gpsMatchInfo(log: InternshipLog, assignment?: InternshipAssignment | null) {
  const hasFacilityGps = Number.isFinite(Number(assignment?.facilityLatitude)) && Number.isFinite(Number(assignment?.facilityLongitude));
  if (!log.loginGps && !log.logoutGps) return { label: "GPS not captured", detail: "Location permission was not available.", badge: "badge-gray" };
  if (hasFacilityGps) {
    const facilityGps = `${assignment?.facilityLatitude},${assignment?.facilityLongitude}`;
    const radius = Math.max(25, Number(assignment?.allowedRadiusMeters || 200));
    const loginDistance = log.loginGps ? gpsDistanceMeters(facilityGps, log.loginGps) : null;
    const logoutDistance = log.logoutGps ? gpsDistanceMeters(facilityGps, log.logoutGps) : null;
    const distances = [loginDistance, logoutDistance].filter((value): value is number => value !== null);
    if (!distances.length) return { label: "GPS needs review", detail: "Saved location format could not be compared.", badge: "badge-amber" };
    const maxDistance = Math.max(...distances);
    if (maxDistance <= radius) return { label: "Hospital matched", detail: `Within ${maxDistance}m of assigned hospital.`, badge: "badge-green" };
    return { label: "Hospital mismatch", detail: `About ${maxDistance}m from assigned hospital.`, badge: "badge-red" };
  }
  if (!log.loginGps || !log.logoutGps) return { label: "Waiting for GPS pair", detail: "One side location is captured.", badge: "badge-amber" };
  const distance = gpsDistanceMeters(log.loginGps, log.logoutGps);
  if (distance === null) return { label: "GPS needs review", detail: "Saved location format could not be compared.", badge: "badge-amber" };
  if (distance <= 250) return { label: "Same location range", detail: `Login and logout are within ${distance}m.`, badge: "badge-green" };
  return { label: "Location differs", detail: `Login and logout are about ${distance}m apart.`, badge: "badge-red" };
}

function followUpDueLabel(value?: string) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  if (startDate < startToday) return "Overdue";
  if (startDate === startToday) return "Today";
  return formatDate(value);
}

function followUpTagClass(value?: string) {
  if (!value) return "blue";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "blue";
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  if (startDate < startToday) return "red";
  if (startDate === startToday) return "amber";
  return "green";
}

function initials(name = "Admin") {
  return name.split(" ").filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "A";
}

type LeadPamphletKey = typeof leadPamphlets[number]["key"];

function leadPamphletMessage(lead: Lead, pamphlet: LeadPamphletKey) {
  const name = lead.fullName || "there";
  const course = lead.course ? courseShortCode(lead.course) : "healthcare course";
  const centre = lead.centre ? ` at our ${lead.centre} centre` : "";
  const counsellor = lead.counsellor ? `\nCounsellor: ${lead.counsellor}` : "";
  const fee = lead.expectedFee ? `\nExpected fee: ${formatCurrency(lead.expectedFee)}` : "";
  const signoff = "\n\nReply here or call us to continue your admission process.\nIMED Healthcare Academy";
  const messages: Record<LeadPamphletKey, string> = {
    "first-contact": `Hi ${name}, thank you for enquiring with IMED Healthcare Academy.\n\nWe offer job-oriented healthcare training programs including HA, EMT, GDA, OCHA and AHAP. Based on your enquiry, we can guide you for ${course}${centre}.\n\nWhat we help with:\n- Course guidance\n- Admission support\n- Practical training details\n- Placement support${counsellor}${signoff}`,
    "contacted-followup": `Hi ${name}, we contacted you earlier from IMED Healthcare Academy regarding your ${course} course enquiry.\n\nSharing the details again for your reference. Our team can help you choose the right healthcare course, explain the admission steps, and confirm the next available batch${centre}.${counsellor}${signoff}`,
    "hot-lead": `Hi ${name}, as discussed, your interest for ${course} is noted.\n\nThe upcoming batch seats are limited. We can help you complete admission, documents, fee planning, and batch confirmation${centre}.${fee}${counsellor}${signoff}`,
    "rnr-dnp": `Hi ${name}, we tried reaching you from IMED Healthcare Academy regarding your course enquiry.\n\nYou may be busy, so we are sharing the course details here. Reply with your preferred time and our counsellor will call you back for ${course} admission guidance${centre}.${counsellor}${signoff}`,
    "fee-emi": `Hi ${name}, sharing the fee and payment support details for ${course} from IMED Healthcare Academy.\n\nWe can guide you with total fee, payment schedule, EMI options where applicable, documents required, and batch confirmation${centre}.${fee}${counsellor}${signoff}`,
  };
  return messages[pamphlet];
}

function whatsappLeadUrl(phone = "", name = "", message?: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  const waNumber = digits.length === 10 ? `91${digits}` : digits;
  const text = encodeURIComponent(message || `Hi ${name || "there"}, this is IMED Healthcare Academy.`);
  return waNumber ? `https://api.whatsapp.com/send/?phone=${waNumber}&text=${text}` : "";
}

function openLeadPamphlet(lead: Lead, pamphlet: LeadPamphletKey) {
  const url = whatsappLeadUrl(lead.phone, lead.fullName, leadPamphletMessage(lead, pamphlet));
  if (!url) {
    toast.error("Lead phone number is missing");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function roleLabel(role = "") {
  return role === "superadmin" ? "Super Admin" : role === "admin" ? "Center Admin" : role === "operations_executive" ? "Operations Executive" : role === "franchise_operations_executive" ? "Franchise Operations Executive" : role === "teacher" ? "Teacher" : role === "franchise_superadmin" ? "Franchise Super Admin" : role === "franchise_counsellor" ? "Franchise Counsellor" : role === "franchise_teacher" ? "Franchise Teacher" : "Counsellor";
}

function attendanceStatusLabel(status: AttendanceStatus) {
  return status === "Leave" ? "Excused" : status;
}

function courseShortCode(course = "") {
  const normalized = course.trim().toUpperCase();
  if (!normalized) return "-";
  if (normalized === "AAHP") return "AHAP";
  if (["HA", "EMT", "GDA", "OCHA", "AHAP", "GCA"].includes(normalized)) return normalized;
  if (normalized.includes("EMERGENCY")) return "EMT";
  if (normalized.includes("GENERAL")) return "GDA";
  if (normalized.includes("HEALTHCARE") || normalized.includes("APPLY NOW") || normalized.includes("DEGREE") || normalized.includes("GRADUATE")) return "AHAP";
  if (normalized.includes("HOSPITAL")) return "HA";
  return course;
}

function certificateCourseName(course = "") {
  const normalized = course.trim().toUpperCase();
  const courseNames: Record<string, string> = {
    GDA: "General Duty Assistant (GDA)",
    EMT: "Emergency Medical Technician (EMT)",
    HA: "Hospital Administration (HA)",
    OCHA: "Online Certificate in Hospital Administration (OCHA)",
    AAHP: "Advanced Healthcare Administration Program (AHAP)",
    AHAP: "Advanced Healthcare Administration Program (AHAP)",
    GCA: "Geriatric Care Assistant (GCA)",
  };
  return courseNames[normalized] || course || "Healthcare Skill Development Course";
}

function courseDuration(course = "") {
  const normalized = course.toUpperCase();
  if (normalized.includes("GDA")) return "4 MONTHS";
  if (normalized.includes("GCA")) return "4 MONTHS";
  if (normalized.includes("OCHA")) return "6 MONTHS";
  if (normalized.includes("AAHP") || normalized.includes("AHAP")) return "6 MONTHS";
  return "6 MONTHS";
}

function centreKindLabel(centre?: Pick<Centre, "type">) {
  return centre?.type === "branch" ? "Branch" : "Franchise";
}

function isKochiCentre(centre = "") {
  return centre.trim().toLowerCase() === "kochi";
}

function uniqueOptions(options: string[]) {
  return Array.from(new Set(options.filter(Boolean)));
}

function courseOptionsForCentre(centre = "", options: string[] = fallbackCourses, isSuperAdmin = false) {
  return uniqueOptions(options);
}

function feeWithGst(baseFee = 0) {
  return Math.round((baseFee || 0) * (1 + GST_RATE));
}

function dueAmount(student: Student) {
  return Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0));
}

function studentStatusBlockReason(student: Student, nextStatus = "") {
  const currentStatus = normalizeStudentStatus(student.status);
  const normalizedNext = normalizeStudentStatus(nextStatus);
  if (normalizedNext === "Fees Collected" && dueAmount(student) > 0) {
    return "Collect the full pending fee before marking Fees Collected";
  }
  if (normalizedNext === "Course Completed" && currentStatus !== "Course Completed" && currentStatus !== "Classroom Complete") {
    return "Mark Classroom Complete before Course Completed";
  }
  if (normalizedNext === "Alumni" && currentStatus !== "Alumni") {
    if (currentStatus !== "Course Completed") return "Mark Course Completed before moving the candidate to Alumni";
    if (dueAmount(student) > 0) return "Clear full fee before moving the candidate to Alumni";
    if (!student.certificateNumber && student.certificateStatus !== "Issued") return "Issue the certificate before moving the candidate to Alumni";
  }
  return "";
}

function depositedCashAmount(payment: PaymentRecord) {
  return (payment.cashDeposits || []).reduce((sum, deposit) => sum + Number(deposit.amount || 0), 0);
}

function pendingCashDepositAmount(payment: PaymentRecord) {
  return Math.max(0, Number(payment.amount || 0) - depositedCashAmount(payment));
}

function billingEntityForStudent(student: Student, centres: Centre[]) {
  const centre = centres.find((item) => item._id === student.franchiseId) || centres.find((item) => item.name === student.centre);
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

function invoiceNumber(student: Student) {
  const year = new Date(student.createdAt || Date.now()).getFullYear();
  const suffix = String(student.admissionNumber || student._id || "0001").replace(/[^A-Z0-9]/gi, "").slice(-6).toUpperCase();
  return `INV/${year}/${suffix || "0001"}`;
}

function paymentReceiptNumber(student: Student, index: number) {
  const base = student.admissionNumber || student._id.slice(-6).toUpperCase();
  return `RCPT/${base}/${String(index + 1).padStart(3, "0")}`;
}

function normalizePaymentPurpose(purpose = "", mode = "") {
  if (purpose === "Seat Booking Amount" || purpose === "Upfront") return "Seat Booking Amount";
  if (purpose === "Fees Installment" || purpose === "EMI Installment" || purpose === "Fee Payment" || mode === "EMI") return "Fees Installment";
  return "Fees Installment";
}

function normalizeAdmissionPaymentMode(mode = "") {
  return mode === legacyPartialEmiPaymentMode ? partialEmiPaymentMode : mode;
}

function isPartialEmiPaymentMode(mode = "") {
  return normalizeAdmissionPaymentMode(mode) === partialEmiPaymentMode;
}

function normalizeStudentStatus(status = "") {
  if (status === "Admission") return "Admission Completed";
  if (status === "In Training") return "Active Student";
  if (status === "Course Complete") return "Course Completed";
  if (status === "Classroom Completed") return "Classroom Complete";
  if (status === "Placed") return "Alumni";
  return status;
}

function studentStatusLabel(status = "") {
  const normalized = normalizeStudentStatus(status);
  if (normalized === "Classroom Complete") return "Classroom Completed";
  if (normalized === "Course Complete") return "Course Completed";
  return normalized;
}

function cleanStaffAssignment(value = "") {
  const trimmed = String(value || "").trim();
  return trimmed && trimmed !== "Unassigned" ? trimmed : "";
}

function batchFacultyForStudent(student: Pick<Student, "batch" | "teacher">, batches: Batch[]) {
  const directTeacher = cleanStaffAssignment(student.teacher);
  if (directTeacher) return directTeacher;
  const batch = batches.find((item) => item.name === student.batch);
  return cleanStaffAssignment(batch?.assignedFaculty?.[0] || "");
}

function leadOwnerForDisplay(lead: Lead, students: Student[], batches: Batch[]) {
  const directCounsellor = cleanStaffAssignment(lead.counsellor);
  if (directCounsellor) return directCounsellor;
  const linkedStudent = students.find((student) => String(student.leadId || "") === String(lead._id));
  return cleanStaffAssignment(linkedStudent?.counsellor) || (linkedStudent ? batchFacultyForStudent(linkedStudent, batches) : "");
}

function emiReferenceNumber(student: Student) {
  const base = String(student.admissionNumber || student._id.slice(-6).toUpperCase()).replace(/[^A-Z0-9-]+/gi, "").toUpperCase() || "STUDENT";
  const nextInstallment = (student.payments || []).filter((payment) => normalizePaymentPurpose(payment.paymentPurpose, payment.mode) === "Fees Installment" && (payment.emiReference || payment.mode === "EMI")).length + 1;
  return `EMI-${base}-${String(nextInstallment).padStart(3, "0")}`;
}

function studentEmiBreakdown(student: Student) {
  const totalFee = Number(student.totalFee || 0);
  const discount = Number(student.discountAmount || 0);
  const netFee = Math.max(0, totalFee - discount);
  const totalPaid = Number(student.paidAmount || 0);
  const totalDue = Math.max(0, netFee - totalPaid);
  const baseEmi = Number(student.emiAmount || 0);
  const isEmi = Boolean(student.emiEnabled && baseEmi > 0);

  if (!isEmi || totalDue <= 0) {
    return {
      isEmi: false,
      baseEmi: 0,
      shortfall: 0,
      advanceCredit: 0,
      currentDue: totalDue,
      totalDue,
      installmentsPaidCount: 0,
      totalInstallmentsPaid: 0,
    };
  }

  const payments = student.payments || [];
  const installmentPayments = payments.filter(
    (p) => normalizePaymentPurpose(p.paymentPurpose, p.mode) === "Fees Installment"
  );
  const installmentPaid = installmentPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const k = installmentPayments.length;

  const expectedSoFar = k * baseEmi;
  const shortfall = Math.max(0, expectedSoFar - installmentPaid);
  const advanceCredit = Math.max(0, installmentPaid - expectedSoFar);

  const rawNextDue = baseEmi + shortfall - advanceCredit;
  const currentDue = Math.min(totalDue, Math.max(0, rawNextDue));

  return {
    isEmi: true,
    baseEmi,
    shortfall,
    advanceCredit,
    currentDue,
    totalDue,
    installmentsPaidCount: k,
    totalInstallmentsPaid: installmentPaid,
  };
}

function emiReminderMessage(student: Student): string {
  const breakdown = studentEmiBreakdown(student);
  const courseName = certificateCourseName(student.course);
  const dueDate = student.nextEmiDate ? formatLongDate(student.nextEmiDate) : "-";
  return [
    `Hi ${student.fullName},`,
    "",
    "This is a friendly EMI reminder from *iMED Healthcare Academy*.",
    "",
    `📚 *Course:* ${courseName}`,
    `💳 *Monthly EMI:* ${formatCurrency(breakdown.baseEmi)}`,
    ...(breakdown.shortfall > 0 ? [`⚠️ *Previous Shortfall (Arrears):* ${formatCurrency(breakdown.shortfall)}`] : []),
    `💰 *Amount Due:* ${formatCurrency(breakdown.currentDue)}`,
    `📅 *Due Date:* ${dueDate}`,
    `📌 *Total Pending Course Fee:* ${formatCurrency(breakdown.totalDue)}`,
    "",
    "Kindly clear the EMI on or before the due date to ensure uninterrupted access to your training and course services.",
    "",
    "If you have already made the payment, please ignore this message.",
    "",
    "Regards,",
    "*iMED Healthcare Academy*",
  ].join("\n");
}

function emiReminderWhatsAppUrl(student: Student) {
  const phone = studentWhatsAppNumber(student.phone);
  const message = emiReminderMessage(student);
  const encoded = encodeURIComponent(message);
  return phone ? `https://api.whatsapp.com/send/?phone=${phone}&text=${encoded}` : `https://api.whatsapp.com/send/?text=${encoded}`;
}

function paymentReferenceLabel(mode = "Cash") {
  if (mode === "UPI") return "UPI transaction ID";
  if (mode === "Card") return "Card transaction / auth ID";
  if (mode === "Bank Transfer") return "UTR / bank reference no.";
  if (mode === "Loan Provider") return "Loan reference number";
  return "Reference no.";
}

function classGoogleCalendarUrl(session: ClassSession) {
  const datePart = dateInputValue(session.date).replaceAll("-", "");
  const start = `${datePart}T${String(session.startTime || "00:00").replace(":", "")}00`;
  const end = `${datePart}T${String(session.endTime || "00:00").replace(":", "")}00`;
  const text = encodeURIComponent(`${session.batchName} - ${session.nature}`);
  const details = encodeURIComponent(`${session.classType}\nFaculty: ${session.faculty}\nStudents: ${session.studentCount || 0}\nCourse: ${courseShortCode(session.course || "")}`);
  const location = encodeURIComponent(session.centre || "iMED Academy");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

function receiptDocumentNumber(student: Student, selection: ReceiptSelection) {
  return selection.type === "payment" ? paymentReceiptNumber(student, selection.index) : invoiceNumber(student);
}

function receiptDocumentFileName(student: Student, selection: ReceiptSelection) {
  const safeName = String(student.fullName || "student").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const safeNumber = receiptDocumentNumber(student, selection).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return `${selection.type === "payment" ? "receipt" : "invoice"}-${safeName || "student"}-${safeNumber || "document"}.pdf`;
}

function receiptWhatsAppUrl(student: Student, selection: ReceiptSelection) {
  const phone = studentWhatsAppNumber(student.phone);
  const selectedPayment = selection.type === "payment" ? student.payments?.[selection.index] : undefined;
  const paidBefore = selection.type === "payment" ? (student.payments || []).slice(0, selection.index).reduce((sum, item) => sum + Number(item.amount || 0), 0) : 0;
  const balanceAfterPayment = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - paidBefore - Number(selectedPayment?.amount || 0));
  const message = selectedPayment
    ? [
        `Hi ${student.fullName}, your payment receipt from iMED Academy is ready.`,
        "",
        `Receipt No: ${paymentReceiptNumber(student, selection.index)}`,
        `Amount Paid: ${formatCurrency(Number(selectedPayment.amount || 0))}`,
        `Payment Mode: ${selectedPayment.mode || "Cash"}`,
        ...(selectedPayment.loanProviderName ? [`Loan Provider: ${selectedPayment.loanProviderName}`] : []),
        ...(selectedPayment.transactionId ? [`Reference: ${selectedPayment.transactionId}`] : []),
        `Balance: ${formatCurrency(balanceAfterPayment)}`,
        "",
        "Regards,",
        "iMED Academy",
      ].join("\n")
    : [
        `Hi ${student.fullName}, your tax invoice from iMED Academy is ready.`,
        "",
        `Invoice No: ${invoiceNumber(student)}`,
        `Course: ${certificateCourseName(student.course)}`,
        `Total Fee: ${formatCurrency(student.totalFee || 0)}`,
        `Paid: ${formatCurrency(student.paidAmount || 0)}`,
        `Due: ${formatCurrency(dueAmount(student))}`,
        "",
        "Regards,",
        "iMED Academy",
      ].join("\n");
  const encodedMessage = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
}

function certificateVerifyUrl(certificateNumber: string) {
  if (typeof window === "undefined") return `https://imedacademy.in/#verify=${encodeURIComponent(certificateNumber)}`;
  const configuredBase = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined) || "";
  const isLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  const baseUrl = configuredBase || (isLocal ? "https://imedacademy.in/" : `${window.location.origin}${window.location.pathname}`);
  return `${baseUrl.replace(/\/?$/, "")}/#verify=${encodeURIComponent(certificateNumber)}`;
}

function studentWhatsAppNumber(phone = "") {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits) return "";
  return digits.length === 10 ? `91${digits}` : digits;
}

function certificateWhatsAppUrl(student: Student, verifyUrl: string) {
  const phone = studentWhatsAppNumber(student.phone);
  const message = [
    `Hi ${student.fullName}, congratulations on completing ${certificateCourseName(student.course)} with iMED Academy.`,
    "",
    "Your certificate is ready.",
    `Certificate No: ${student.certificateNumber || "Not issued"}`,
    `Verify here: ${verifyUrl}`,
    "",
    "Regards,",
    "iMED Academy",
  ].join("\n");
  const encodedMessage = encodeURIComponent(message);
  return phone ? `https://wa.me/${phone}?text=${encodedMessage}` : `https://wa.me/?text=${encodedMessage}`;
}

function certificatePdfFileName(student: Student) {
  const safeName = String(student.fullName || "student").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  const safeCertificate = String(student.certificateNumber || "certificate").replace(/[^a-z0-9-]+/gi, "-");
  return `${safeName || "student"}-${safeCertificate}.pdf`;
}

function numberToIndianWords(value = 0) {
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const twoDigits = (num: number) => num < 20 ? ones[num] : `${tens[Math.floor(num / 10)]}${num % 10 ? ` ${ones[num % 10]}` : ""}`;
  const threeDigits = (num: number) => `${Math.floor(num / 100) ? `${ones[Math.floor(num / 100)]} Hundred` : ""}${Math.floor(num / 100) && num % 100 ? " " : ""}${num % 100 ? twoDigits(num % 100) : ""}`.trim();
  let amount = Math.round(Math.max(0, value || 0));
  if (!amount) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(amount / 10000000); amount %= 10000000;
  const lakh = Math.floor(amount / 100000); amount %= 100000;
  const thousand = Math.floor(amount / 1000); amount %= 1000;
  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (amount) parts.push(threeDigits(amount));
  return parts.join(" ");
}

function stageTag(stage = "") {
  if (stage.includes("Completed") || stage === "Alumni" || stage === "Placed" || stage === "Enrolled") return "green";
  if (stage === "Fees Collected") return "green";
  if (stage.includes("Training") || stage === "Active Student") return "purple";
  if (stage.includes("Counselling") || stage.includes("Demo") || stage === "Admission") return "amber";
  return "blue";
}

function priorityBadgeClass(priority = "") {
  const normalized = normalizeLeadPriority(priority);
  if (normalized === "P0") return "badge-red";
  if (normalized === "P1") return "badge-amber";
  if (normalized === "P3") return "badge-gray";
  return "badge-blue";
}

function normalizeLeadPriority(value = "") {
  const priority = String(value || "").trim().toUpperCase();
  const legacyMap: Record<string, string> = { HOT: "P0", WARM: "P2", COLD: "P3" };
  const normalized = legacyMap[priority] || priority || "P2";
  return leadPriorityOptions.includes(normalized) ? normalized : "P2";
}

function leadPriorityLabel(value = "") {
  const priority = normalizeLeadPriority(value);
  return leadPriorityLabels[priority] || priority;
}

function normalizeLeadFeedbackStatus(value = "") {
  const legacyMap: Record<string, string> = {
    "Hot lead": "Interested",
    "Warm lead": "Follow-up",
    "Cold lead": "Lost",
    DNP: "Not Connected",
    "Call back": "Busy Call later",
    "Invalid number": "Invalid",
    Spam: "Junk",
    Fake: "Junk",
    "Junk lead": "Junk",
    junk: "Junk",
    rnr: "RNR",
    "not interested": "Not Interested",
    "not intrested": "Not Interested",
    "Not intrested": "Not Interested",
    "future cohort": "Future Cohort",
    "Future cohort": "Future Cohort",
  };
  const status = legacyMap[value] || value || "New";
  return leadFeedbackOptions.includes(status) ? status : "New";
}

function leadFeedbackBadgeClass(feedback = "") {
  const normalized = normalizeLeadFeedbackStatus(feedback).toLowerCase();
  if (normalized.includes("junk")) return "badge-junk";
  if (normalized.includes("converted") || normalized.includes("qualified")) return "badge-green";
  if (normalized.includes("not interested")) return "badge-gray";
  if (normalized.includes("interested")) return "badge-red";
  if (normalized.includes("lost") || normalized.includes("invalid") || normalized.includes("not connected")) return "badge-gray";
  if (normalized === "rnr" || normalized.includes("rnr")) return "badge-amber";
  if (normalized.includes("future cohort") || normalized.includes("cohort")) return "badge-purple";
  if (normalized.includes("hold") || normalized.includes("busy")) return "badge-amber";
  if (normalized.includes("follow")) return "badge-blue";
  return "badge-green";
}

function leadFollowUpBadgeClass(status = "") {
  const normalized = status.toLowerCase();
  if (normalized.includes("not interested") || normalized.includes("no response")) return "badge-gray";
  if (normalized.includes("rescheduled") || normalized.includes("scheduled")) return "badge-amber";
  if (normalized.includes("completed") || normalized.includes("interested")) return "badge-green";
  return "badge-blue";
}

function studentFeedbackBadgeClass(status = "") {
  const normalized = status.toLowerCase();
  if (normalized.includes("escalated")) return "badge-red";
  if (normalized.includes("follow")) return "badge-amber";
  if (normalized.includes("resolved") || normalized.includes("positive")) return "badge-green";
  if (normalized.includes("response")) return "badge-gray";
  return "badge-blue";
}

function stageBadgeClass(stage = "") {
  if (stage.includes("Counselling")) return "badge-purple";
  if (stage.includes("Demo")) return "badge-amber";
  if (stage.includes("Contacted")) return "badge-blue";
  return "badge-gray";
}

const chartPalette = ["#4F6BFF", "#17A673", "#F5A524", "#8B5CF6", "#14B8A6", "#E5484D", "#EC4899"];
function paletteColor(index: number) {
  return chartPalette[index % chartPalette.length];
}

type DonutSlice = { label: string; value: number; color: string };

function DonutChart({ data, size = 168, thickness = 20, centerValue, centerLabel }: { data: DonutSlice[]; size?: number; thickness?: number; centerValue?: string; centerLabel?: string }) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <div className="donut-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--border-soft)" strokeWidth={thickness} />
          {total > 0 && data.filter((slice) => slice.value > 0).map((slice) => {
            const dash = (slice.value / total) * circumference;
            const el = <circle key={slice.label} cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={slice.color} strokeWidth={thickness} strokeDasharray={`${dash} ${circumference - dash}`} strokeDashoffset={-offset} />;
            offset += dash;
            return el;
          })}
        </g>
      </svg>
      <div className="donut-center"><strong>{centerValue ?? total}</strong>{centerLabel && <span>{centerLabel}</span>}</div>
    </div>
  );
}

function DonutLegend({ data, formatValue }: { data: DonutSlice[]; formatValue?: (value: number) => string }) {
  const visibleData = data.filter((slice) => slice.value > 0);
  const total = visibleData.reduce((sum, slice) => sum + slice.value, 0) || 1;
  return (
    <div className="donut-legend">
      {visibleData.map((slice) => (
        <div className="donut-legend-row" key={slice.label}>
          <span className="dot" style={{ background: slice.color }} />
          <span className="lbl">{slice.label}</span>
          <span className="val">{formatValue ? formatValue(slice.value) : slice.value}</span>
          <span className="pct">{Math.round((slice.value / total) * 100)}%</span>
        </div>
      ))}
      {!visibleData.length && <div className="empty-state">No data</div>}
    </div>
  );
}

function downloadExcelFile(headers: string[], rows: (string | number | undefined)[][], filename: string) {
  if (!rows.length) {
    toast.message("Nothing to download");
    return;
  }
  const esc = (value?: string | number) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const html = `<table><tr>${headers.map((header) => `<th>${esc(header)}</th>`).join("")}</tr>${rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</table>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}-${dateInputValue()}.xls`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AdminCrm() {
  const [token, setToken] = useState(localStorage.getItem("imed_crm_token") || "");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [panel, setPanel] = useState<Panel>("dashboard");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [funnel, setFunnel] = useState<{ stage: string; count: number }[]>([]);
  const [centreStats, setCentreStats] = useState<{ centre: string; leads: number; enrolled: number }[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [attendanceSummaries, setAttendanceSummaries] = useState<AttendanceSummary[]>([]);
  const [attendanceDetailLogs, setAttendanceDetailLogs] = useState<Attendance[]>([]);
  const [selectedAttendanceSummary, setSelectedAttendanceSummary] = useState<AttendanceSummary | null>(null);
  const [attendanceDetailFilters, setAttendanceDetailFilters] = useState<AttendanceDetailFilters>({ dateFrom: "", dateTo: "", status: "", nature: "" });
  const [attendanceDraft, setAttendanceDraft] = useState<Record<string, { status: AttendanceStatus; note: string }>>({});
  const [classSchedulesState, setClassSchedulesState] = useState<ClassSchedule[]>([]);
  const [classSessions, setClassSessions] = useState<ClassSession[]>([]);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [practicalRecords, setPracticalRecords] = useState<PracticalRecord[]>([]);
  const [studyNotes, setStudyNotes] = useState<StudyNote[]>([]);
  const [npsDashboard, setNpsDashboard] = useState<NpsDashboard | null>(null);
  const [npsResponses, setNpsResponses] = useState<NpsResponse[]>([]);
  const [npsMeta, setNpsMeta] = useState<PaginationMeta | null>(null);
  const [npsFilters, setNpsFilters] = useState({ q: "", touchpoint: "", course: "", batch: "", category: "" });
  const [npsPage, setNpsPage] = useState(1);
  const [inventorySummary, setInventorySummary] = useState<InventorySummary | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [tablets, setTablets] = useState<TabletAsset[]>([]);
  const [inventoryTransactions, setInventoryTransactions] = useState<InventoryTransaction[]>([]);
  const [inventoryTab, setInventoryTab] = useState<"overview" | "tablets" | "students" | "logs">("overview");
  const [stockInModalOpen, setStockInModalOpen] = useState(false);
  const [issueKitModalOpen, setIssueKitModalOpen] = useState(false);
  const [issueKitTargetStudent, setIssueKitTargetStudent] = useState<Student | null>(null);
  const [issueKitTargetTablet, setIssueKitTargetTablet] = useState<TabletAsset | null>(null);
  const [tabletSearchQuery, setTabletSearchQuery] = useState("");
  const [selectedClassSessionId, setSelectedClassSessionId] = useState("");
  const [classWeek, setClassWeek] = useState(dateInputValue(new Date()));
  const [classAttendanceDraft, setClassAttendanceDraft] = useState<Record<string, { status: AttendanceStatus; note: string }>>({});
  const [googleCalendarStatus, setGoogleCalendarStatus] = useState<GoogleCalendarStatus | null>(null);
  const [calendarSyncing, setCalendarSyncing] = useState(false);
  const [classesGenerating, setClassesGenerating] = useState(false);
  const [centres, setCentres] = useState<Centre[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [teachers, setTeachers] = useState<Counsellor[]>([]);
  const [leadMeta, setLeadMeta] = useState<PaginationMeta | null>(null);
  const [studentMeta, setStudentMeta] = useState<PaginationMeta | null>(null);
  const [admissionPendingCount, setAdmissionPendingCount] = useState(0);
  const [roleScope, setRoleScope] = useState<RoleScope>("all");
  const [datePreset, setDatePreset] = useState<DatePreset>("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceDateValue, setAttendanceDateValue] = useState(dateInputValue());
  const [leadPage, setLeadPage] = useState(1);
  const [studentPage, setStudentPage] = useState(1);
  const [filters, setFilters] = useState({ q: "", stage: "", centre: "", course: "", counsellor: "", leadFeedback: "" });
  const filtersRef = useRef(filters);
  filtersRef.current = filters;
  const leadPageRef = useRef(leadPage);
  leadPageRef.current = leadPage;
  const leadRequestIdRef = useRef(0);
  const [profile, setProfile] = useState<ProfileTarget>(null);
  const [profileReturnPanel, setProfileReturnPanel] = useState<Panel | "">("");
  const [leadDrawer, setLeadDrawer] = useState<Lead | null>(null);
  const [leadDrawerTab, setLeadDrawerTab] = useState<"info" | "follow" | "docs" | "act">("info");
  const [dedicatedFollowUps, setDedicatedFollowUps] = useState<Lead[]>([]);
  const [dedicatedAssignedLeads, setDedicatedAssignedLeads] = useState<Lead[]>([]);
  const [receiptStudent, setReceiptStudent] = useState<Student | null>(null);
  const [receiptSelection, setReceiptSelection] = useState<ReceiptSelection>({ type: "invoice" });
  const [deletePrompt, setDeletePrompt] = useState<DeletePrompt | null>(null);
  const [logbookReviewPrompt, setLogbookReviewPrompt] = useState<LogbookReviewPrompt | null>(null);
  const [documentPreview, setDocumentPreview] = useState<DocumentPreviewState>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [batchResumeTab, setBatchResumeTab] = useState<AcademicTab>("batches");
  const [loading, setLoading] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState<"assigned" | "followups">("assigned");
  const notifRef = useRef<HTMLDivElement>(null);

  const isHeadSuperAdmin = user?.role === "superadmin";
  const isHeadAdmin = user?.role === "superadmin" || user?.role === "admin";
  const isHeadBranchAdmin = user?.role === "admin";
  const isOperationsAccount = user?.role === "operations_executive" || user?.role === "franchise_operations_executive";
  const isFranchiseSuperAdmin = user?.role === "franchise_superadmin";
  const isFranchiseUser = user?.role === "franchise_superadmin" || user?.role === "franchise_counsellor" || user?.role === "franchise_teacher" || user?.role === "franchise_operations_executive";
  const isCounsellorAccount = user?.role === "counsellor" || user?.role === "franchise_counsellor";
  const isTeacherAccount = user?.role === "teacher" || user?.role === "franchise_teacher";
  const isStudentStaffAccount = isCounsellorAccount || isTeacherAccount;
  const canUseLeads = isHeadAdmin || isFranchiseSuperAdmin || isCounsellorAccount;
  const canUseAttendance = isHeadAdmin || isFranchiseSuperAdmin || isTeacherAccount || isOperationsAccount;
  const canUseAcademics = canUseAttendance;
  const canUseInternship = isHeadAdmin || isFranchiseSuperAdmin || isTeacherAccount || isOperationsAccount;
  const canManageSettings = isHeadAdmin || isFranchiseSuperAdmin;
  const canAssignCounsellors = isHeadAdmin || isFranchiseSuperAdmin;
  const canAssignTeachers = isHeadAdmin || isFranchiseSuperAdmin || isCounsellorAccount || isOperationsAccount;
  const canManageFees = isHeadAdmin || isFranchiseSuperAdmin || isOperationsAccount;
  const canManageCertificates = isHeadAdmin || isFranchiseSuperAdmin || isOperationsAccount;
  const canManageInternships = isHeadAdmin || isFranchiseSuperAdmin || isOperationsAccount;
  const canManageNps = isHeadAdmin || isFranchiseSuperAdmin || isOperationsAccount;
  const canManageInventory = isHeadAdmin || isFranchiseSuperAdmin || isOperationsAccount;
  const canDeleteRecords = isHeadAdmin || isFranchiseSuperAdmin;
  const canUseScopeFilter = isHeadSuperAdmin;
  const selectedFranchise = canUseScopeFilter && roleScope !== "all" ? centres.find((centre) => centre._id === roleScope) : undefined;
  const scopedFranchiseId = isFranchiseUser ? user?.franchiseId || "" : canUseScopeFilter ? selectedFranchise?._id || "" : "";
  const authedHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
  const centreOptions = centres.length ? centres.map((centre) => centre.name) : fallbackCentres;
  const courseOptions = courses.length ? courses.map((course) => course.code || course.name) : fallbackCourses;
  const teacherAssignedBatchNames = batches.filter((batch) => batch.assignedFaculty?.includes(user?.name || "")).map((batch) => batch.name);
  const visibleStudents = isOperationsAccount
    ? students
    : (panel === "mystudents" || (isStudentStaffAccount && ["attendance", "dashboard", "internship"].includes(panel)))
      ? students.filter((student) => !isStudentStaffAccount || (isCounsellorAccount ? student.counsellor === user?.name : teacherAssignedBatchNames.includes(student.batch || "") || student.teacher === user?.name))
      : students;
  const pendingLogbookReviewCount = visibleStudents.reduce((total, student) => total + (student.logbookEntries || []).filter((entry) => !entry.verified).length, 0);
  const [pageTitle, defaultPageSub] = panelTitles[panel];
  const pageSub = panel === "nps" && isTeacherAccount ? "Batch feedback summary" : defaultPageSub;
  const scopeFilterPanels: Panel[] = ["dashboard", "leads", "admissions", "allstudents", "mystudents", "finance", "emi", "receipts", "cert", "alumni", "attendance", "logs", "batch", "internship", "nps", "inventory"];
  const dateFilterPanels: Panel[] = ["dashboard", "leads", "admissions", "allstudents", "mystudents", "finance", "receipts", "cert", "alumni"];
  const searchPanels: Panel[] = ["dashboard", "leads", "admissions"];
  const showScopeFilter = scopeFilterPanels.includes(panel);
  const showDateFilter = dateFilterPanels.includes(panel);
  const showTopbarSearch = canUseLeads && searchPanels.includes(panel);
  const activeTopbarDate = showDateFilter ? selectedDate : "";
  const activeTopbarDateRef = useRef(activeTopbarDate);
  activeTopbarDateRef.current = activeTopbarDate;
  const scopedFranchiseIdRef = useRef(scopedFranchiseId);
  scopedFranchiseIdRef.current = scopedFranchiseId;

  const [dismissedAssignedIds, setDismissedAssignedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("imed_dismissed_assigned_leads") || "[]");
    } catch {
      return [];
    }
  });

  const dismissAssignedLead = (leadId: string) => {
    setDismissedAssignedIds((prev) => {
      const next = Array.from(new Set([...prev, leadId]));
      try {
        localStorage.setItem("imed_dismissed_assigned_leads", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const newAssignedLeads = useMemo(() => {
    const map = new Map<string, Lead>();
    leads.forEach((l) => map.set(l._id, l));
    dedicatedAssignedLeads.forEach((l) => map.set(l._id, l));
    const all = Array.from(map.values());
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    return all.filter((lead) => {
      if (dismissedAssignedIds.includes(lead._id)) return false;
      const hasAssignedActivity = lead.activities?.some((a) => a.type === "assigned" && new Date(a.at || 0).getTime() >= thirtyDaysAgo);
      const isAssignedRecent = Boolean(lead.assignedAt && new Date(lead.assignedAt).getTime() >= thirtyDaysAgo);
      const isNewRecent = (lead.stage === "New Lead" || !lead.stage) && new Date(lead.createdAt || 0).getTime() >= thirtyDaysAgo;
      const isWebsiteEnquiry = (lead.source === "Website Enquiry" || lead.source === "Website") && new Date(lead.createdAt || 0).getTime() >= thirtyDaysAgo;
      return Boolean(hasAssignedActivity || isAssignedRecent || isNewRecent || isWebsiteEnquiry);
    }).sort((a, b) => {
      const timeA = new Date(a.assignedAt || a.updatedAt || a.createdAt || 0).getTime();
      const timeB = new Date(b.assignedAt || b.updatedAt || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  }, [leads, dedicatedAssignedLeads, dismissedAssignedIds]);

  const followUpLeads = useMemo(() => {
    const map = new Map<string, Lead>();
    leads.forEach((lead) => {
      if (lead.nextFollowUp) map.set(lead._id, lead);
    });
    dedicatedFollowUps.forEach((lead) => {
      if (lead.nextFollowUp) map.set(lead._id, lead);
    });
    return Array.from(map.values()).sort(
      (a, b) => new Date(a.nextFollowUp || "").getTime() - new Date(b.nextFollowUp || "").getTime()
    );
  }, [leads, dedicatedFollowUps]);

  const dueFollowUpCount = useMemo(() => {
    const today = new Date();
    const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999).getTime();
    return followUpLeads.filter((lead) => new Date(lead.nextFollowUp || "").getTime() <= endToday).length;
  }, [followUpLeads]);

  const totalNotifCount = followUpLeads.length + newAssignedLeads.length;
  const urgentNotifCount = dueFollowUpCount + newAssignedLeads.length;

  useEffect(() => {
    if (!notifOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifOpen]);

  const closeDocumentPreview = () => {
    if (documentPreview && "url" in documentPreview) URL.revokeObjectURL(documentPreview.url);
    setDocumentPreview(null);
  };

  const openSecurePreview = async (path: string, title: string, fileName = "document") => {
    if (!token) return toast.error("Please sign in again to preview documents");
    if (documentPreview && "url" in documentPreview) URL.revokeObjectURL(documentPreview.url);
    setDocumentPreview({ title, loading: true });
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Unable to preview document");
      }
      const responseBlob = await response.blob();
      const mimeType = response.headers.get("Content-Type")?.split(";")[0] || responseBlob.type || "application/octet-stream";
      const blob = responseBlob.type === mimeType ? responseBlob : new Blob([responseBlob], { type: mimeType });
      setDocumentPreview({ title, url: URL.createObjectURL(blob), mimeType, fileName });
    } catch (error) {
      setDocumentPreview(null);
      toast.error(error instanceof Error ? error.message : "Unable to preview document");
    }
  };

  const openDocumentPreview = async ({ type, id, field, title, fileName = "document" }: DocumentPreviewRequest) => {
    await openSecurePreview(`/api/admin/documents/${type}/${id}/${field}`, title, fileName);
  };

  const openInternshipPhotoPreview = async (student: Student, log: InternshipLog, photoType: "login" | "logout") => {
    const photo = photoType === "login" ? log.loginPhoto : log.logoutPhoto;
    await openSecurePreview(
      `/api/admin/students/${student._id}/internship-logs/${log._id}/${photoType}`,
      `${photoType === "login" ? "Log in" : "Log out"} selfie - ${student.fullName}`,
      photo?.originalName || `${photoType}-selfie.jpg`,
    );
  };

  async function api<T>(path: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    const response = await fetch(`${API_BASE_URL}${path}`, options);
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.message || "Request failed");
    return result;
  }

  const queryString = (values: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString() ? `?${params.toString()}` : "";
  };

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

  const loadTeachers = async () => {
    if (!(canManageSettings || isCounsellorAccount)) {
      setTeachers([]);
      return;
    }
    const res = await api<Counsellor[]>("/api/admin/teachers", { headers: authedHeaders });
    setTeachers(res.data || []);
  };

  const loadDashboard = async () => {
    const suffix = queryString({ franchiseId: scopedFranchiseId, counsellor: isCounsellorAccount ? user?.name || "" : "", date: activeTopbarDate });
    const [summaryRes, funnelRes, centreRes] = await Promise.all([
      api<Summary>(`/api/admin/dashboard/summary${suffix}`, { headers: authedHeaders }),
      api<{ stage: string; count: number }[]>(`/api/admin/dashboard/funnel${suffix}`, { headers: authedHeaders }),
      api<{ centre: string; leads: number; enrolled: number }[]>(`/api/admin/dashboard/centres${suffix}`, { headers: authedHeaders }),
    ]);
    setSummary(summaryRes.data || null);
    setFunnel(funnelRes.data || []);
    setCentreStats(centreRes.data || []);
  };

  const loadLeads = async (page?: number) => {
    const targetPage = page !== undefined ? page : leadPageRef.current;
    const currentFilters = filtersRef.current;
    const currentFranchiseId = scopedFranchiseIdRef.current;
    const suffix = queryString({
      q: currentFilters.q,
      stage: currentFilters.stage,
      centre: currentFranchiseId ? "" : currentFilters.centre,
      course: currentFilters.course,
      franchiseId: currentFranchiseId,
      counsellor: isCounsellorAccount ? user?.name || "" : currentFilters.counsellor,
      leadFeedback: currentFilters.leadFeedback,
      date: activeTopbarDateRef.current,
      page: String(targetPage),
      limit: String(defaultPageSize),
    });
    const requestId = ++leadRequestIdRef.current;
    try {
      const res = await api<Lead[]>(`/api/admin/leads${suffix}`, { headers: authedHeaders });
      if (requestId !== leadRequestIdRef.current) return;
      setLeads(res.data || []);
      setLeadMeta(res.meta || null);
    } catch (error) {
      if (requestId !== leadRequestIdRef.current) return;
      console.error("Unable to load leads", error);
    }
  };

  const loadAdmissionPendingCount = async () => {
    if (!canUseLeads) {
      setAdmissionPendingCount(0);
      return;
    }
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<{ total: number }>(`/api/admin/admissions/pending-count${suffix}`, { headers: authedHeaders });
    setAdmissionPendingCount(res.data?.total || 0);
  };

  const loadFollowUps = async () => {
    if (!token || !canUseLeads) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseId });
      const res = await api<Lead[]>(`/api/admin/leads/followups${suffix}`, { headers: authedHeaders });
      if (res.data) setDedicatedFollowUps(res.data);
    } catch {
      // fallback silently
    }
  };

  const loadAssignedLeads = async () => {
    if (!token || !canUseLeads) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseIdRef.current, limit: "100" });
      let res = await api<Lead[]>(`/api/admin/leads/assigned${suffix}`, { headers: authedHeaders }).catch(() => null);
      if (!res?.data) {
        res = await api<Lead[]>(`/api/admin/leads${suffix}`, { headers: authedHeaders }).catch(() => null);
      }
      if (res?.data) setDedicatedAssignedLeads(res.data);
    } catch {
      // fallback silently
    }
  };

  const loadStudents = async (page = studentPage) => {
    const suffix = queryString({
      centre: "",
      franchiseId: scopedFranchiseId,
      counsellor: isCounsellorAccount ? user?.name || "" : "",
      date: activeTopbarDate,
      page: String(page),
      limit: String(defaultPageSize),
    });
    const res = await api<Student[]>(`/api/admin/students${suffix}`, { headers: authedHeaders });
    setStudents(res.data || []);
    setStudentMeta(res.meta || null);
  };

  const reviewLogbookEntry = async (student: Student, entry: LogbookEntry, verified = true, supervisorRemark?: string) => {
    if (supervisorRemark === undefined) {
      setLogbookReviewPrompt({
        student,
        entry,
        verified,
        remark: entry.supervisorRemark || (verified ? "Good progress" : ""),
      });
      return;
    }
    try {
      await api<LogbookEntry>(`/api/admin/students/${student._id}/logbook/${entry._id}`, {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify({ verified, supervisorRemark: supervisorRemark.trim() }),
      });
      toast.success(verified ? "Logbook entry verified" : "Logbook entry moved back to pending");
      await loadStudents();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update logbook entry");
    }
  };

  const loadAttendance = async () => {
    const suffix = queryString({ date: attendanceDateValue, franchiseId: scopedFranchiseId });
    const res = await api<Attendance[]>(`/api/admin/attendance${suffix}`, { headers: authedHeaders });
    const records = res.data || [];
    setAttendance(records);
    const byStudent = new Map(records.map((record) => [record.studentId, record]));
    setAttendanceDraft((current) => Object.fromEntries(visibleStudents.map((student) => {
      const saved = byStudent.get(student._id);
      return [student._id, { status: saved?.status || current[student._id]?.status || "Present", note: saved?.note || current[student._id]?.note || "" }];
    })));
  };

  const loadAttendanceLogs = async () => {
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<AttendanceSummary[]>(`/api/admin/attendance/summary${suffix}`, { headers: authedHeaders });
    setAttendanceSummaries(res.data || []);
  };

  const loadAttendanceDetail = async (summary = selectedAttendanceSummary, filtersOverride = attendanceDetailFilters) => {
    if (!summary) return;
    const suffix = queryString({
      studentId: summary.studentId,
      franchiseId: scopedFranchiseId,
      dateFrom: filtersOverride.dateFrom,
      dateTo: filtersOverride.dateTo,
      status: filtersOverride.status,
      nature: filtersOverride.nature,
      limit: "200",
    });
    const res = await api<Attendance[]>(`/api/admin/attendance/logs${suffix}`, { headers: authedHeaders });
    setAttendanceDetailLogs(res.data || []);
  };

  const loadClassSchedules = async () => {
    if (!canUseAcademics) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<ClassSchedule[]>(`/api/admin/class-schedules${suffix}`, { headers: authedHeaders });
    setClassSchedulesState(res.data || []);
  };

  const loadClassSessions = async () => {
    if (!canUseAcademics) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId, week: classWeek });
    const res = await api<ClassSession[]>(`/api/admin/class-sessions${suffix}`, { headers: authedHeaders });
    const sessions = res.data || [];
    setClassSessions(sessions);
    setSelectedClassSessionId((current) => current && sessions.some((session) => session._id === current) ? current : sessions[0]?._id || "");
  };

  const loadTopicProgress = async () => {
    if (!canUseAcademics) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<TopicProgress[]>(`/api/admin/topic-progress${suffix}`, { headers: authedHeaders });
    setTopicProgress(res.data || []);
  };

  const loadPracticalRecords = async () => {
    if (!canUseAcademics) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<PracticalRecord[]>(`/api/admin/practicals${suffix}`, { headers: authedHeaders });
    setPracticalRecords(res.data || []);
  };

  const loadStudyNotes = async () => {
    if (!canUseAcademics) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId });
    const res = await api<StudyNote[]>(`/api/admin/study-notes${suffix}`, { headers: authedHeaders });
    setStudyNotes(res.data || []);
  };

  const loadNps = async (page = npsPage) => {
    if (!(canManageNps || isTeacherAccount)) {
      setNpsDashboard(null);
      setNpsResponses([]);
      setNpsMeta(null);
      return;
    }
    const query = {
      franchiseId: scopedFranchiseId,
      q: npsFilters.q,
      touchpoint: npsFilters.touchpoint,
      course: npsFilters.course,
      batch: npsFilters.batch,
      category: npsFilters.category,
      page: String(page),
      limit: String(defaultPageSize),
    };
    const dashboardRes = await api<NpsDashboard>(`/api/nps/dashboard${queryString(query)}`, { headers: authedHeaders });
    const responseRes = canManageNps ? await api<NpsResponse[]>(`/api/nps/responses${queryString(query)}`, { headers: authedHeaders }) : { data: [], meta: null };
    setNpsDashboard(dashboardRes.data || null);
    setNpsResponses(responseRes.data || []);
    setNpsMeta(responseRes.meta || null);
  };

  const saveNpsFollowUp = async (id: string, status: string, note: string) => {
    try {
      await api<NpsResponse>(`/api/nps/responses/${id}/follow-up`, {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify({ status, note }),
      });
      toast.success("NPS follow-up updated");
      await loadNps();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update NPS follow-up");
    }
  };

  const exportNps = async () => {
    if (!token) return;
    const suffix = queryString({ franchiseId: scopedFranchiseId, touchpoint: npsFilters.touchpoint });
    const response = await fetch(`${API_BASE_URL}/api/nps/export${suffix}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) return toast.error("Unable to export NPS responses");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `imed-nps-${dateInputValue()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const loadGoogleCalendarStatus = async () => {
    if (!isTeacherAccount) {
      setGoogleCalendarStatus(null);
      return;
    }
    const res = await api<GoogleCalendarStatus>("/api/admin/google-calendar/status", { headers: authedHeaders });
    setGoogleCalendarStatus(res.data || null);
  };

  const loadInventorySummary = async () => {
    if (!canManageInventory) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseId });
      const res = await api<InventorySummary>(`/api/admin/inventory/summary${suffix}`, { headers: authedHeaders });
      if (res.data) setInventorySummary(res.data);
    } catch (error) {
      console.error("Unable to load inventory summary", error);
    }
  };

  const loadInventoryItems = async () => {
    if (!canManageInventory) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseId });
      const res = await api<InventoryItem[]>(`/api/admin/inventory/items${suffix}`, { headers: authedHeaders });
      if (res.data) setInventoryItems(res.data);
    } catch (error) {
      console.error("Unable to load inventory items", error);
    }
  };

  const loadTablets = async () => {
    if (!canManageInventory) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseId, q: tabletSearchQuery });
      const res = await api<TabletAsset[]>(`/api/admin/inventory/tablets${suffix}`, { headers: authedHeaders });
      if (res.data) setTablets(res.data);
    } catch (error) {
      console.error("Unable to load tablets", error);
    }
  };

  const loadInventoryTransactions = async () => {
    if (!canManageInventory) return;
    try {
      const suffix = queryString({ franchiseId: scopedFranchiseId });
      const res = await api<InventoryTransaction[]>(`/api/admin/inventory/transactions${suffix}`, { headers: authedHeaders });
      if (res.data) setInventoryTransactions(res.data);
    } catch (error) {
      console.error("Unable to load inventory transactions", error);
    }
  };

  const refreshInventory = async () => {
    await Promise.all([loadInventorySummary(), loadInventoryItems(), loadTablets(), loadInventoryTransactions()]);
  };

  const handleStockIn = async (payload: { itemType: string; size?: string; quantity?: number; vendorChallan?: string; notes?: string; tablets?: { assetId: string; serialNumber: string; brandModel: string; remarks?: string }[] }) => {
    try {
      const res = await api<{ message?: string }>("/api/admin/inventory/stock-in", {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({ ...payload, franchiseId: scopedFranchiseId }),
      });
      toast.success(res.message || "Stock added");
      setStockInModalOpen(false);
      await refreshInventory();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add stock");
      return false;
    }
  };

  const handleIssueKit = async (payload: {
    studentId: string;
    issueIdCard?: boolean;
    idCardNumber?: string;
    issueTshirt?: boolean;
    tshirtSize?: string;
    tshirtQuantity?: number;
    tshirts?: { size: string; quantity: number }[];
    issueBag?: boolean;
    issueTablet?: boolean;
    tabletId?: string;
    notes?: string;
  }) => {
    try {
      const res = await api<Student>("/api/admin/inventory/issue-kit", {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify(payload),
      });
      toast.success(res.message || "Kit issued to candidate");
      setIssueKitModalOpen(false);
      setIssueKitTargetStudent(null);
      setIssueKitTargetTablet(null);
      await Promise.all([refreshInventory(), loadStudents(studentPage)]);
      if (profile?.type === "student" && res.data && profile.data._id === res.data._id) {
        setProfile({ type: "student", data: res.data });
      }
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to issue kit");
      return false;
    }
  };

  const handleReturnTablet = (tablet: TabletAsset) => {
    setDeletePrompt({
      title: "Return tablet to stock",
      message: `Confirm return of Tablet ${tablet.assetId} (S/N: ${tablet.serialNumber}) assigned to ${tablet.assignedStudentName || "student"}?`,
      confirmLabel: "Return to stock",
      tone: "logout",
      onConfirm: async () => {
        try {
          const res = await api<TabletAsset>(`/api/admin/inventory/tablets/${tablet._id}/return`, {
            method: "POST",
            headers: authedHeaders,
            body: JSON.stringify({ notes: "Tablet returned to stock" }),
          });
          toast.success(res.message || "Tablet returned to stock");
          await Promise.all([refreshInventory(), loadStudents(studentPage)]);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to return tablet");
        }
      },
    });
  };

  const refreshAll = async () => {
    if (!token) return;
    try {
      await Promise.all([loadMeta(), loadDashboard(), canUseLeads ? Promise.all([loadLeads(1), loadAdmissionPendingCount(), loadFollowUps(), loadAssignedLeads()]) : Promise.resolve(), loadStudents(1), loadCounsellors(), loadTeachers(), isTeacherAccount ? loadGoogleCalendarStatus() : Promise.resolve(), canUseAcademics ? Promise.all([loadClassSchedules(), loadTopicProgress(), loadPracticalRecords(), loadStudyNotes()]) : Promise.resolve(), (canManageNps || isTeacherAccount) ? loadNps(1) : Promise.resolve(), canManageInventory ? refreshInventory() : Promise.resolve()]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to load CRM data");
    }
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

  useEffect(() => { void refreshAll(); }, [token, scopedFranchiseId, selectedDate, canUseLeads, isTeacherAccount]);
  useEffect(() => { if (token && canUseLeads) void loadLeads(leadPage); }, [leadPage, filters.stage, filters.centre, filters.course, filters.counsellor, filters.leadFeedback, canUseLeads]);
  useEffect(() => { if (token && canUseLeads) void loadAdmissionPendingCount(); }, [token, canUseLeads, scopedFranchiseId]);
  useEffect(() => { if (token && canUseLeads) void loadFollowUps(); }, [token, canUseLeads, scopedFranchiseId]);
  useEffect(() => { if (token && canUseLeads) void loadAssignedLeads(); }, [token, canUseLeads, scopedFranchiseId]);

  // Periodic polling every 20 seconds so center admin gets real-time notification when superadmin assigns leads
  useEffect(() => {
    if (!token || !canUseLeads) return;
    const interval = setInterval(() => {
      void loadAssignedLeads();
      void loadFollowUps();
      void loadAdmissionPendingCount();
    }, 20000);
    return () => clearInterval(interval);
  }, [token, canUseLeads, scopedFranchiseId]);

  // Refresh notifications immediately when window/tab regains focus
  useEffect(() => {
    if (!token || !canUseLeads) return;
    const onFocus = () => {
      void loadAssignedLeads();
      void loadFollowUps();
      void loadAdmissionPendingCount();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [token, canUseLeads, scopedFranchiseId]);
  useEffect(() => { if (token) void loadStudents(studentPage); }, [studentPage, panel]);
  useEffect(() => { if (token && canManageSettings) void loadCounsellors(); }, [token, canManageSettings]);
  useEffect(() => { if (token && (canManageSettings || isCounsellorAccount)) void loadTeachers(); }, [token, canManageSettings, isCounsellorAccount]);
  useEffect(() => { if (token && (panel === "attendance" || (isTeacherAccount && panel === "dashboard"))) void loadAttendance(); }, [panel, isTeacherAccount, attendanceDateValue, visibleStudents.length]);
  useEffect(() => { if (token && (panel === "batch" || (isTeacherAccount && panel === "dashboard"))) { void loadClassSchedules(); void loadClassSessions(); void loadAttendanceLogs(); void loadTopicProgress(); void loadPracticalRecords(); void loadStudyNotes(); } }, [token, panel, scopedFranchiseId, classWeek, canUseAcademics, isTeacherAccount]);
  useEffect(() => { if (token && panel === "nps" && (canManageNps || isTeacherAccount)) void loadNps(npsPage); }, [token, panel, canManageNps, isTeacherAccount, scopedFranchiseId, npsPage, npsFilters.q, npsFilters.touchpoint, npsFilters.course, npsFilters.batch, npsFilters.category]);
  useEffect(() => { if (token && panel === "logs") void loadAttendanceLogs(); }, [panel, scopedFranchiseId]);
  useEffect(() => { if (token && (panel === "attdetail" || panel === "batch") && selectedAttendanceSummary) void loadAttendanceDetail(); }, [panel, selectedAttendanceSummary?.studentId, attendanceDetailFilters.dateFrom, attendanceDetailFilters.dateTo, attendanceDetailFilters.status, attendanceDetailFilters.nature, scopedFranchiseId]);
  useEffect(() => { if (token && (panel === "inventory" || panel === "dashboard") && canManageInventory) void refreshInventory(); }, [token, panel, canManageInventory, scopedFranchiseId, tabletSearchQuery]);
  useEffect(() => {
    const session = classSessions.find((item) => item._id === selectedClassSessionId);
    if (!session) return;
    const sessionBatch = batches.find((batch) => batch.name === session.batchName || batch._id === String(session.batchId));
    const teacherOwnsBatch = !isTeacherAccount || sessionBatch?.assignedFaculty?.includes(user?.name || "");
    const sessionStudents = teacherOwnsBatch ? students.filter((student) => student.batch === session.batchName) : [];
    setClassAttendanceDraft((current) => Object.fromEntries(sessionStudents.map((student) => [student._id, current[student._id] || { status: "Present", note: "" }])));
  }, [selectedClassSessionId, classSessions.length, students.length, batches.length, isTeacherAccount, user?.name]);
  useEffect(() => {
    const counsellorPanels = ["dashboard", "leads", "addlead", "admissions", "mystudents", "profile"];
    const teacherPanels = ["dashboard", "batch", "mystudents", "alumni", "internship", "nps", "profile"];
    const operationsPanels = ["dashboard", "allstudents", "mystudents", "finance", "emi", "receipts", "cert", "alumni", "internship", "nps", "inventory", "profile"];
    if (isCounsellorAccount && !counsellorPanels.includes(panel)) setPanel("dashboard");
    if (isTeacherAccount && !teacherPanels.includes(panel)) setPanel("dashboard");
    if (isOperationsAccount && !operationsPanels.includes(panel)) setPanel("dashboard");
    if (!isTeacherAccount && !isOperationsAccount && panel === "batch") setPanel("dashboard");
    if (!canManageFees && ["finance", "emi", "receipts"].includes(panel)) setPanel("dashboard");
    if (!canManageCertificates && panel === "cert") setPanel("dashboard");
    if (!canUseInternship && panel === "internship") setPanel("dashboard");
    if (!(canManageNps || isTeacherAccount || isOperationsAccount) && panel === "nps") setPanel("dashboard");
    if (!canManageInventory && panel === "inventory") setPanel("dashboard");
  }, [panel, isCounsellorAccount, isTeacherAccount, isOperationsAccount, canManageFees, canManageCertificates, canUseInternship, canManageNps, canManageInventory]);

  const visibleNavGroups = useMemo(() => navGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => {
      if (isCounsellorAccount) return ["dashboard", "leads", "addlead", "admissions", "mystudents", "profile"].includes(item.key);
      if (isTeacherAccount) return ["dashboard", "batch", "alumni", "internship", "nps", "profile"].includes(item.key);
      if (isOperationsAccount) return ["dashboard", "allstudents", "finance", "emi", "receipts", "cert", "alumni", "internship", "nps", "inventory", "profile"].includes(item.key);
      if (item.key === "batch") return false;
      if (item.key === "attendance" || item.key === "logs") return false;
      if (item.key === "mystudents") return isStudentStaffAccount;
      if (item.key === "batch" && !canUseAcademics && isTeacherAccount) return false;
      if ((item.key === "attendance" || item.key === "logs") && !canUseAttendance) return false;
      if (["finance", "emi", "receipts"].includes(item.key) && !canManageFees) return false;
      if (item.key === "cert" && !canManageCertificates) return false;
      if (item.key === "internship") return canUseInternship;
      if (item.key === "nps") return canManageNps || isTeacherAccount;
      if (item.key === "inventory") return canManageInventory;
      if (item.key === "settings") return canManageSettings;
      return true;
    }),
  })).filter((group) => group.items.length), [isCounsellorAccount, isTeacherAccount, isOperationsAccount, isStudentStaffAccount, canUseAcademics, canUseAttendance, canManageSettings, canManageFees, canManageCertificates, canUseInternship, canManageNps, canManageInventory]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hashQuery = window.location.hash.includes("?") ? window.location.hash.slice(window.location.hash.indexOf("?") + 1) : "";
    const hashParams = new URLSearchParams(hashQuery);
    const tokenFromUrl = params.get("resetToken") || hashParams.get("resetToken") || "";
    if (tokenFromUrl) {
      setResetToken(tokenFromUrl);
      setResetEmail(params.get("email") || hashParams.get("email") || "");
      setToken("");
      setUser(null);
      localStorage.removeItem("imed_crm_token");
    }
  }, []);
  useEffect(() => {
    if (!token) return;
    const params = new URLSearchParams(window.location.search);
    const status = params.get("calendar");
    if (!status) return;
    if (status === "connected") {
      toast.success("Google Calendar connected");
      void loadGoogleCalendarStatus();
      void api<unknown>("/api/auth/me", { headers: authedHeaders }).then((res) => setUser(res.user || null)).catch(() => undefined);
    } else if (status === "error") {
      toast.error(params.get("message") || "Google Calendar connection failed");
    }
    params.delete("calendar");
    params.delete("message");
    const nextQuery = params.toString();
    window.history.replaceState({}, document.title, `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}`);
  }, [token]);

  const handleAuth = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    setLoading(true);
    try {
      const res = await api<unknown>("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.token) throw new Error("Login token missing");
      localStorage.setItem("imed_crm_token", res.token);
      setToken(res.token);
      setUser(res.user || null);
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!email) return toast.error("Enter your registered email");
    setLoading(true);
    try {
      await api<unknown>("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      form.reset();
      setForgotPasswordOpen(false);
      toast.success("If this email exists, a reset link has been sent");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to send reset link");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const newPassword = String(payload.newPassword || "");
    const confirmPassword = String(payload.confirmPassword || "");
    if (newPassword.length < 8) return toast.error("Password must be at least 8 characters");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");
    setLoading(true);
    try {
      await api<unknown>("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: resetToken, newPassword }) });
      setResetToken("");
      setResetEmail("");
      window.history.replaceState({}, "", `${window.location.pathname}#admin`);
      toast.success("Password reset successfully. Please sign in.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleDatePreset = (preset: DatePreset) => {
    setDatePreset(preset);
    if (preset === "all") setSelectedDate("");
    if (preset === "today") setSelectedDate(dateInputValueFromOffset(0));
    if (preset === "yesterday") setSelectedDate(dateInputValueFromOffset(-1));
    if (preset === "specific") setSelectedDate((current) => current || dateInputValueFromOffset(0));
  };

  const handleScopeChange = (scope: RoleScope) => {
    setRoleScope(scope);
    setLeadPage(1);
    setStudentPage(1);
  };

  const clearDateFilter = () => {
    setDatePreset("all");
    setSelectedDate("");
  };

  const confirmDeletePrompt = async () => {
    if (!deletePrompt) return;
    const action = deletePrompt.onConfirm;
    setDeletePrompt(null);
    await action();
  };

  const addLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const requiredTextFields = [
      ["fullName", "Full name"],
      ["phone", "Phone"],
      ["studentLocation", "Student location"],
      ["source", "Source"],
      ["centre", "Centre / franchise"],
    ];
    for (const [field, label] of requiredTextFields) {
      if (!String(formData.get(field) || "").trim()) {
        toast.error(`${label} is required`);
        return;
      }
    }
    const documentFields = ["governmentProof", "highestQualificationCertificate"];
    for (const field of documentFields) {
      const file = formData.get(field);
      if (!(file instanceof File) || !file.name) continue;
      const validType = leadDocumentTypes.includes(file.type) || /\.(pdf|jpe?g|png|webp)$/i.test(file.name);
      if (!validType) {
        toast.error("Upload PDF, JPG, PNG or WEBP documents only");
        return;
      }
      if (file.size > leadDocumentMaxSize) {
        toast.error("Document size must be under 2 MB");
        return;
      }
    }
    const course = String(formData.get("course") || "");
    const courseObj = courses.find((item) => [item.code, item.name].map(s => String(s || "").toLowerCase()).includes(course.toLowerCase()));
    const courseFee = courseObj?.fee || 0;
    formData.set("expectedFee", String(feeWithGst(courseFee)));
    formData.set("stage", "New Lead");
    formData.set("priority", "P2");
    try {
      await api<Lead>("/api/admin/leads", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      form.reset();
      toast.success("Lead saved to the system");
      setPanel("leads");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add lead");
    }
  };

  const importLeadExcel = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await api<LeadImportResult>("/api/admin/leads/import", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      const inserted = res.data?.inserted || 0;
      const skipped = res.data?.skipped?.length || 0;
      toast.success(`Imported ${inserted} leads${skipped ? `, skipped ${skipped}` : ""}`);
      setPanel("leads");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to import leads");
    }
  };

  const patchLead = async (id: string, updates: Partial<Lead>) => {
    try {
      if (updates.leadFeedback === "Junk" || updates.leadFeedback === "Not Interested") {
        updates.nextFollowUp = null as any;
      }
      const targetLead = leads.find((l) => l._id === id) || (leadDrawer?._id === id ? leadDrawer : null);
      const leadName = targetLead?.fullName || "Lead";
      const res = await api<Lead>(`/api/admin/leads/${id}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(updates) });
      if (profile?.type === "lead" && profile.data._id === id && res.data) setProfile({ type: "lead", data: res.data });
      if (leadDrawer?._id === id && res.data) setLeadDrawer(res.data);
      if (res.data) {
        setLeads((current) => current.map((l) => (l._id === res.data._id ? res.data : l)));
        setDedicatedFollowUps((current) => {
          const filtered = current.filter((l) => l._id !== res.data._id);
          return res.data.nextFollowUp ? [...filtered, res.data].sort((a, b) => new Date(a.nextFollowUp || "").getTime() - new Date(b.nextFollowUp || "").getTime()) : filtered;
        });
        setDedicatedAssignedLeads((current) => {
          const filtered = current.filter((l) => l._id !== res.data._id);
          return [res.data, ...filtered];
        });
      }
      if (updates.centre) {
        toast.success(`Lead "${leadName}" assigned to ${updates.centre} centre successfully!`);
      } else if (updates.counsellor) {
        toast.success(`Lead "${leadName}" assigned to counsellor ${updates.counsellor}`);
      } else {
        toast.success("Lead updated");
      }
      void loadDashboard();
      void loadAdmissionPendingCount();
      void loadFollowUps();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update lead");
    }
  };

  const addLeadActivity = async (leadId: string, message: string, type = "note") => {
    try {
      const res = await api<Lead>(`/api/admin/leads/${leadId}/activities`, {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({ message, type }),
      });
      if (res.data) {
        if (leadDrawer?._id === leadId) setLeadDrawer(res.data);
        if (profile?.type === "lead" && profile.data._id === leadId) setProfile({ type: "lead", data: res.data });
        setLeads((current) => current.map((l) => (l._id === leadId ? res.data : l)));
      }
      toast.success("Activity note added");
      void loadDashboard();
      void loadFollowUps();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add activity note");
    }
  };

  const addLeadFollowUp = async (event: FormEvent<HTMLFormElement>, lead: Lead) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await api<Lead>(`/api/admin/leads/${lead._id}/followups`, { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      if (res.data) {
        setLeadDrawer(res.data);
        if (profile?.type === "lead" && profile.data._id === lead._id) setProfile({ type: "lead", data: res.data });
        setLeads((current) => {
          const exists = current.some((l) => l._id === res.data._id);
          return exists ? current.map((l) => (l._id === res.data._id ? res.data : l)) : [res.data, ...current];
        });
        setDedicatedFollowUps((current) => {
          const filtered = current.filter((l) => l._id !== res.data._id);
          return res.data.nextFollowUp ? [...filtered, res.data].sort((a, b) => new Date(a.nextFollowUp || "").getTime() - new Date(b.nextFollowUp || "").getTime()) : filtered;
        });
      }
      form.reset();
      toast.success("Follow-up added");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add follow-up");
    }
  };

  const markLeadFollowUpDone = async (lead: Lead, note = "Follow-up completed") => {
    try {
      const res = await api<Lead>(`/api/admin/leads/${lead._id}/followups`, {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({
          type: "Call",
          status: "Completed",
          scheduledAt: new Date().toISOString(),
          note,
          clearReminder: true,
        }),
      });
      if (res.data) {
        if (leadDrawer?._id === lead._id) setLeadDrawer(res.data);
        if (profile?.type === "lead" && profile.data._id === lead._id) setProfile({ type: "lead", data: res.data });
        setLeads((current) => current.map((l) => (l._id === res.data._id ? res.data : l)));
        setDedicatedFollowUps((current) => current.filter((l) => l._id !== res.data._id));
      }
      toast.success("Follow-up marked as completed & reminder cleared");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to complete follow-up");
    }
  };

  const clearLeadReminder = async (lead: Lead) => {
    try {
      const res = await api<Lead>(`/api/admin/leads/${lead._id}`, {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify({ nextFollowUp: null }),
      });
      if (res.data) {
        if (leadDrawer?._id === lead._id) setLeadDrawer(res.data);
        if (profile?.type === "lead" && profile.data._id === lead._id) setProfile({ type: "lead", data: res.data });
        setLeads((current) => current.map((l) => (l._id === res.data._id ? res.data : l)));
        setDedicatedFollowUps((current) => current.filter((l) => l._id !== res.data._id));
      }
      toast.success("Follow-up reminder removed");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to clear reminder");
    }
  };

  const convertLead = async (lead: Lead, batch = "") => {
    try {
      const courseObj = courses.find((item) => [item.code, item.name].map(s => String(s || "").toLowerCase()).includes(String(lead.course || "").toLowerCase()));
      const dynamicCourseFee = courseObj ? feeWithGst(courseObj.fee || 0) : 0;
      await api<Student>(`/api/admin/leads/${lead._id}/convert`, { method: "POST", headers: authedHeaders, body: JSON.stringify({ totalFee: lead.expectedFee || dynamicCourseFee, batch }) });
      toast.success("Lead enrolled and assigned to batch");
      setPanel("allstudents");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to convert lead");
    }
  };

  const deleteLead = async (lead: Lead) => {
    setDeletePrompt({
      title: "Delete lead",
      message: `Delete "${lead.fullName}"? This cannot be undone.`,
      onConfirm: async () => {
        try {
          await api<Lead>(`/api/admin/leads/${lead._id}`, { method: "DELETE", headers: authedHeaders });
          if (profile?.type === "lead" && profile.data._id === lead._id) setProfile(null);
          if (leadDrawer?._id === lead._id) setLeadDrawer(null);
          toast.success("Lead deleted");
          await refreshAll();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to delete lead");
        }
      },
    });
  };

  const bulkAssignLeadCentre = async (ids: string[], centre: string) => {
    if (!ids.length || !centre) return;
    try {
      const res = await api<{ count: number; skipped?: number }>("/api/admin/leads/bulk-assign-centre", {
        method: "POST",
        headers: authedHeaders,
        body: JSON.stringify({ ids, centre }),
      });
      const count = res.data?.count ?? ids.length;
      toast.success(`${count} lead(s) assigned to ${centre} centre successfully!`);
      if (res.data?.skipped) {
        toast.info(`${res.data.skipped} lead(s) were skipped due to centre course restrictions.`);
      }
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to bulk assign centre");
      throw error;
    }
  };

  const bulkDeleteLeads = async (ids: string[], onSuccess?: () => void) => {
    if (!ids.length) return;
    setDeletePrompt({
      title: "Bulk delete leads",
      message: `Permanently delete ${ids.length} selected lead(s)? This action cannot be undone.`,
      tone: "danger",
      onConfirm: async () => {
        try {
          const res = await api<{ count: number }>("/api/admin/leads/bulk-delete", {
            method: "POST",
            headers: authedHeaders,
            body: JSON.stringify({ ids }),
          });
          const count = res.data?.count ?? ids.length;
          toast.success(`${count} lead(s) deleted successfully`);
          if (leadDrawer && ids.includes(leadDrawer._id)) setLeadDrawer(null);
          if (profile?.type === "lead" && ids.includes(profile.data._id)) setProfile(null);
          onSuccess?.();
          await refreshAll();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to delete selected leads");
        }
      },
    });
  };

  const patchStudent = async (id: string, updates: Partial<Student>) => {
    if (Object.prototype.hasOwnProperty.call(updates, "status")) {
      const currentStudent = profile?.type === "student" && profile.data._id === id ? profile.data : students.find((student) => student._id === id);
      const blocked = currentStudent ? studentStatusBlockReason(currentStudent, updates.status || "") : "";
      if (blocked) {
        toast.error(blocked);
        return;
      }
    }
    try {
      const res = await api<Student>(`/api/admin/students/${id}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(updates) });
      if (profile?.type === "student" && profile.data._id === id && res.data) setProfile({ type: "student", data: res.data });
      toast.success("Student updated");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update student");
    }
  };

  const generateStudentLmsAccess = async (student: Student) => {
    try {
      const res = await api<Student>(`/api/admin/students/${student._id}/lms-access`, { method: "POST", headers: authedHeaders });
      if (profile?.type === "student" && profile.data._id === student._id && res.data) setProfile({ type: "student", data: res.data });
      toast.success("Student LMS login generated");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to generate Student LMS login");
    }
  };

  const deleteStudent = async (student: Student) => {
    setDeletePrompt({
      title: "Delete student",
      message: `Delete "${student.fullName}"? Attendance and payment history for this record will also be removed.`,
      onConfirm: async () => {
        try {
          await api<Student>(`/api/admin/students/${student._id}`, { method: "DELETE", headers: authedHeaders });
          if (profile?.type === "student" && profile.data._id === student._id) setProfile(null);
          toast.success("Student deleted");
          await refreshAll();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to delete student");
        }
      },
    });
  };

  const saveStudentInternship = async (event: FormEvent<HTMLFormElement>, student: Student) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const facilityName = String(payload.facilityName || "").trim();
    const startDate = String(payload.startDate || "").trim();
    const expectedEndDate = String(payload.expectedEndDate || "").trim();
    const facilityLatitude = String(payload.facilityLatitude || "").trim();
    const facilityLongitude = String(payload.facilityLongitude || "").trim();
    if (!facilityName) return toast.error("Hospital/facility name is required");
    if ((facilityLatitude && !facilityLongitude) || (!facilityLatitude && facilityLongitude)) return toast.error("Enter both hospital latitude and longitude");
    if (facilityLatitude && (!Number.isFinite(Number(facilityLatitude)) || Number(facilityLatitude) < -90 || Number(facilityLatitude) > 90)) return toast.error("Enter a valid hospital latitude");
    if (facilityLongitude && (!Number.isFinite(Number(facilityLongitude)) || Number(facilityLongitude) < -180 || Number(facilityLongitude) > 180)) return toast.error("Enter a valid hospital longitude");
    if (!startDate) return toast.error("Start date is required");
    if (!expectedEndDate) return toast.error("Expected end date is required");
    if (new Date(expectedEndDate) < new Date(startDate)) return toast.error("Expected end date cannot be before start date");
    try {
      const res = await api<Student>(`/api/admin/students/${student._id}/internship`, {
        method: "PUT",
        headers: authedHeaders,
        body: JSON.stringify(payload),
      });
      if (profile?.type === "student" && profile.data._id === student._id && res.data) setProfile({ type: "student", data: res.data });
      toast.success(student.internshipAssignment ? "Internship assignment updated" : "Internship assigned");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save internship assignment");
    }
  };

  const deleteStudentInternship = async (student: Student) => {
    setDeletePrompt({
      title: "Remove internship",
      message: `Remove internship assignment for "${student.fullName}"? Student internship logs and logbook entries for this assignment will also be removed.`,
      onConfirm: async () => {
        try {
          const res = await api<Student>(`/api/admin/students/${student._id}/internship`, { method: "DELETE", headers: authedHeaders });
          if (profile?.type === "student" && profile.data._id === student._id && res.data) setProfile({ type: "student", data: res.data });
          toast.success("Internship assignment removed");
          await refreshAll();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to remove internship assignment");
        }
      },
    });
  };

  const addPayment = async (event: FormEvent<HTMLFormElement>, student: Student) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const amount = Number(formData.get("amount") || 0);
      const mode = String(formData.get("mode") || "Cash");
      const paymentPurpose = normalizePaymentPurpose(String(formData.get("paymentPurpose") || "Fees Installment"), mode);
      const transactionId = String(formData.get("transactionId") || "").trim();
      const emiReference = String(formData.get("emiReference") || "").trim();
      const loanProviderName = String(formData.get("loanProviderName") || "").trim();
      const note = String(formData.get("note") || "").trim();
      const pendingDue = dueAmount(student);
      if (pendingDue <= 0) throw new Error("Course fee is already fully paid");
      if (!Number.isFinite(amount) || amount <= 0) throw new Error("Enter a valid payment amount");
      if (amount > pendingDue) throw new Error(`Payment cannot exceed pending due of ${formatCurrency(pendingDue)}`);
      if (!paymentPurposes.includes(paymentPurpose)) throw new Error("Choose what this payment is for");
      if (!paymentModes.includes(mode)) throw new Error("Choose a valid payment mode");
      if (mode === "Loan Provider" && !loanProviderName) throw new Error("Loan provider name is required");
      if (loanProviderName.length > 100) throw new Error("Loan provider name cannot exceed 100 characters");
      if (mode !== "Cash" && !transactionId) throw new Error(`${paymentReferenceLabel(mode)} is required`);
      if (transactionId && transactionId.length > paymentReferenceMaxLength) throw new Error("Payment reference cannot exceed 80 characters");
      if (transactionId && !/^[A-Za-z0-9][A-Za-z0-9 ._/@:-]*$/.test(transactionId)) throw new Error("Payment reference has invalid characters");
      if (note.length > paymentNoteMaxLength) throw new Error("Payment note cannot exceed 250 characters");
      const proof = formData.get("paymentProof");
      if (proof instanceof File && proof.size > 0) {
        if (proof.size > leadDocumentMaxSize) throw new Error("Payment proof must be below 2 MB");
        if (!leadDocumentTypes.includes(proof.type) && !/\.(pdf|jpe?g|png|webp)$/i.test(proof.name)) throw new Error("Payment proof must be PDF, JPG, PNG or WEBP");
      } else {
        if (mode !== "Cash") throw new Error("Payment proof is required for non-cash payments");
        formData.delete("paymentProof");
      }
      formData.set("amount", String(amount));
      formData.set("paymentPurpose", paymentPurpose);
      formData.set("mode", mode);
      formData.set("transactionId", transactionId);
      formData.set("emiReference", paymentPurpose === "Fees Installment" && student.emiEnabled ? emiReference : "");
      formData.set("loanProviderName", mode === "Loan Provider" ? loanProviderName : "");
      formData.set("note", note);
      const res = await api<Student>(`/api/admin/students/${student._id}/payments`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      if (res.data) {
        const paymentIndex = Math.max(0, (res.data.payments || []).length - 1);
        setProfile({ type: "student", data: res.data });
        setReceiptStudent(res.data);
        setReceiptSelection({ type: "payment", index: paymentIndex });
      }
      form.reset();
      toast.success("Payment recorded. Generate receipt next.");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to record payment");
    }
  };

  const downloadPaymentProof = async (student: Student, payment: PaymentRecord, index: number) => {
    if (!payment.proof?.storedName) return toast.message("No payment proof uploaded");
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/students/${student._id}/payments/${index}/proof`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Unable to download payment proof");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = payment.proof.originalName || "payment-proof";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to download payment proof");
    }
  };

  const recordCashDeposit = async (event: FormEvent<HTMLFormElement>, student: Student, payment: PaymentRecord, paymentIndex: number) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      if ((payment.mode || "Cash") !== "Cash") throw new Error("Only cash payments can be deposited");
      const pendingDeposit = pendingCashDepositAmount(payment);
      if (pendingDeposit <= 0) throw new Error("This cash payment is already fully deposited");
      const formData = new FormData(form);
      const amount = Number(formData.get("amount") || 0);
      const bank = String(formData.get("bank") || "").trim();
      const referenceNumber = String(formData.get("referenceNumber") || "").trim();
      const depositedBy = String(formData.get("depositedBy") || user?.name || "").trim();
      const note = String(formData.get("note") || "").trim();
      if (!Number.isFinite(amount) || amount <= 0) throw new Error("Enter a valid deposit amount");
      if (amount > pendingDeposit) throw new Error(`Deposit cannot exceed pending cash of ${formatCurrency(pendingDeposit)}`);
      if (!bank) throw new Error("Deposit bank/account is required");
      if (bank.length > 100) throw new Error("Deposit bank/account cannot exceed 100 characters");
      if (!referenceNumber) throw new Error("Deposit reference/slip number is required");
      if (referenceNumber.length > paymentReferenceMaxLength) throw new Error("Deposit reference cannot exceed 80 characters");
      if (!/^[A-Za-z0-9][A-Za-z0-9 ._/@:-]*$/.test(referenceNumber)) throw new Error("Deposit reference has invalid characters");
      if (!depositedBy) throw new Error("Deposited by name is required");
      if (depositedBy.length > 80) throw new Error("Deposited by name cannot exceed 80 characters");
      if (note.length > paymentNoteMaxLength) throw new Error("Deposit note cannot exceed 250 characters");
      const proof = formData.get("depositProof");
      if (proof instanceof File && proof.size > 0) {
        if (proof.size > leadDocumentMaxSize) throw new Error("Deposit proof must be below 2 MB");
        if (!leadDocumentTypes.includes(proof.type) && !/\.(pdf|jpe?g|png|webp)$/i.test(proof.name)) throw new Error("Deposit proof must be PDF, JPG, PNG or WEBP");
      } else {
        throw new Error("Deposit proof is required");
      }
      formData.set("amount", String(amount));
      formData.set("bank", bank);
      formData.set("referenceNumber", referenceNumber);
      formData.set("depositedBy", depositedBy);
      formData.set("note", note);
      const res = await api<Student>(`/api/admin/students/${student._id}/payments/${paymentIndex}/cash-deposits`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      if (res.data && profile?.type === "student" && profile.data._id === student._id) setProfile({ type: "student", data: res.data });
      form.reset();
      toast.success("Cash deposit recorded");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to record cash deposit");
    }
  };

  const downloadCashDepositProof = async (student: Student, paymentIndex: number, deposit: CashDeposit, depositIndex: number) => {
    if (!deposit.proof?.storedName) return toast.message("No deposit proof uploaded");
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/students/${student._id}/payments/${paymentIndex}/cash-deposits/${depositIndex}/proof`, { headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message || "Unable to download deposit proof");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = deposit.proof.originalName || "cash-deposit-proof";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to download deposit proof");
    }
  };

  const addStudentFeedback = async (event: FormEvent<HTMLFormElement>, student: Student) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await api<Student>(`/api/admin/students/${student._id}/feedback`, { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      if (res.data) {
        setProfile({ type: "student", data: res.data });
        setStudents((current) => current.map((item) => item._id === res.data?._id ? res.data : item));
      }
      form.reset();
      toast.success("Student feedback saved");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save feedback");
    }
  };

  const issueCertificate = async (student: Student) => {
    if (!canManageCertificates) return toast.error("Certificate issuing is restricted to admin accounts");
    try {
      const res = await api<Student>(`/api/admin/students/${student._id}/certificate`, { method: "POST", headers: authedHeaders });
      if (res.data) setProfile({ type: "student", data: res.data });
      toast.success("Certificate issued");
      await refreshAll();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to issue certificate");
    }
  };

  const saveAttendance = async () => {
    try {
      const records = visibleStudents.map((student) => ({ studentId: student._id, status: attendanceDraft[student._id]?.status || "Present", note: attendanceDraft[student._id]?.note || "" }));
      const res = await api<Attendance[]>("/api/admin/attendance", { method: "POST", headers: authedHeaders, body: JSON.stringify({ date: attendanceDateValue, records }) });
      setAttendance(res.data || []);
      toast.success("Attendance saved");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save attendance");
    }
  };

  const createClassSchedule = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const days = classDays.filter((day) => formData.get(`day-${day}`));
      const payload = { ...Object.fromEntries(formData.entries()), days };
      classDays.forEach((day) => delete (payload as Record<string, unknown>)[`day-${day}`]);
      await api<ClassSchedule>("/api/admin/class-schedules", { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Class schedule created");
      await Promise.all([loadClassSchedules(), loadClassSessions()]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create class");
    }
  };

  const generateWeeklyRoster = async (batchId = "", weekOverride = classWeek) => {
    if (classesGenerating) return;
    setClassesGenerating(true);
    try {
      const res = await api<ClassSession[]>("/api/admin/class-sessions/generate-week", { method: "POST", headers: authedHeaders, body: JSON.stringify({ week: weekOverride, franchiseId: scopedFranchiseId, batchId }) });
      setClassSessions(res.data || []);
      setSelectedClassSessionId((res.data || [])[0]?._id || "");
      toast.success(res.message || "Weekly classes generated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to generate classes");
    } finally {
      setClassesGenerating(false);
    }
  };

  const connectGoogleCalendar = async () => {
    try {
      const res = await api<{ url: string }>("/api/admin/google-calendar/connect", { headers: authedHeaders });
      if (res.data?.url) window.location.href = res.data.url;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to connect Google Calendar");
    }
  };

  const disconnectGoogleCalendar = async () => {
    try {
      await api<unknown>("/api/admin/google-calendar", { method: "DELETE", headers: authedHeaders });
      await loadGoogleCalendarStatus();
      setUser((current) => current ? { ...current, googleCalendarConnected: false, googleCalendarEmail: "" } : current);
      toast.success("Google Calendar disconnected");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to disconnect Google Calendar");
    }
  };

  const syncGoogleCalendar = async () => {
    if (calendarSyncing) return;
    setCalendarSyncing(true);
    try {
      const res = await api<ClassSession[]>("/api/admin/google-calendar/sync", { method: "POST", headers: authedHeaders, body: JSON.stringify({}) });
      setClassSessions(res.data || []);
      toast.success(res.message || "Google Calendar synced");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sync Google Calendar");
    } finally {
      setCalendarSyncing(false);
    }
  };

  const saveClassAttendance = async (session: ClassSession, sessionStudents: Student[]) => {
    try {
      const records = sessionStudents.map((student) => ({ studentId: student._id, status: classAttendanceDraft[student._id]?.status || "Present", note: classAttendanceDraft[student._id]?.note || "" }));
      const res = await api<Attendance[]>(`/api/admin/class-sessions/${session._id}/attendance`, { method: "POST", headers: authedHeaders, body: JSON.stringify({ records }) });
      setAttendance(res.data || []);
      setClassSessions((current) => current.map((item) => item._id === session._id ? { ...item, attendanceMarked: true, studentCount: records.length } : item));
      toast.success(`${session.nature} attendance saved`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save class attendance");
    }
  };

  const resetClassAttendance = (session: ClassSession) => {
    setDeletePrompt({
      title: "Clear attendance",
      message: `Clear ${session.nature.toLowerCase()} attendance for ${session.batchName} on ${formatDate(session.date)}? Teacher can mark it again after clearing.`,
      confirmLabel: "Clear",
      tone: "danger",
      onConfirm: async () => {
        const res = await api<ClassSession>(`/api/admin/class-sessions/${session._id}/attendance`, { method: "DELETE", headers: authedHeaders });
        const updated = res.data || { ...session, attendanceMarked: false, studentCount: 0 };
        setClassSessions((current) => current.map((item) => item._id === session._id ? { ...item, ...updated, attendanceMarked: false, studentCount: 0 } : item));
        setAttendance((current) => current.filter((record) => record.classSessionId !== session._id));
        toast.success(res.message || "Attendance cleared");
      },
    });
  };

  const patchClassSession = async (session: ClassSession, updates: Partial<Pick<ClassSession, "startTime" | "endTime" | "faculty" | "note">>) => {
    try {
      const res = await api<ClassSession>(`/api/admin/class-sessions/${session._id}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(updates) });
      setClassSessions((current) => current.map((item) => item._id === session._id ? { ...item, ...res.data } : item));
      toast.success("Class updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update class");
    }
  };

  const updateTopicProgress = async (payload: { _id?: string; batchId: string; module: string; topic: string; status: string; faculty?: string }) => {
    try {
      const res = await api<TopicProgress>("/api/admin/topic-progress", { method: "PATCH", headers: authedHeaders, body: JSON.stringify(payload) });
      const saved = res.data;
      if (saved) {
        setTopicProgress((current) => {
          const key = `${saved.batchId}-${saved.module}-${saved.topic}`;
          const next = current.filter((row) => saved._id ? row._id !== saved._id : `${row.batchId}-${row.module}-${row.topic}` !== key);
          return [...next, saved];
        });
      }
      toast.success("Topic progress updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update topic");
    }
  };

  const deleteTopicProgress = (topic: TopicProgress) => {
    if (!topic._id) return;
    setDeletePrompt({
      title: "Delete topic",
      message: `Delete "${topic.topic}" from this batch? This cannot be undone.`,
      confirmLabel: "Delete",
      tone: "danger",
      onConfirm: async () => {
        await api<TopicProgress>(`/api/admin/topic-progress/${topic._id}`, { method: "DELETE", headers: authedHeaders });
        setTopicProgress((current) => current.filter((row) => row._id !== topic._id));
        toast.success("Topic deleted");
      },
    });
  };

  const uploadStudyNote = async (event: FormEvent<HTMLFormElement>, batch: Batch) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("batchId", batch._id);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/study-notes`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) throw new Error(result.message || "Unable to upload note");
      if (result.data) setStudyNotes((current) => [result.data, ...current.filter((note) => note._id !== result.data._id)]);
      form.reset();
      toast.success(result.message || "Study note uploaded");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to upload note");
    }
  };

  const downloadStudyNote = async (note: StudyNote) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/study-notes/${note._id}/download`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Unable to download note");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = note.file?.originalName || note.title || "study-note";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to download note");
    }
  };

  const deleteStudyNote = (note: StudyNote) => {
    setDeletePrompt({
      title: "Delete note",
      message: `Delete "${note.title}"? Students will no longer see this note.`,
      confirmLabel: "Delete",
      tone: "danger",
      onConfirm: async () => {
        await api<StudyNote>(`/api/admin/study-notes/${note._id}`, { method: "DELETE", headers: authedHeaders });
        setStudyNotes((current) => current.filter((item) => item._id !== note._id));
        toast.success("Study note deleted");
      },
    });
  };

  const updatePracticalRecord = async (payload: { batchId: string; studentId: string; practicalName: string; module?: string; status: string; remarks?: string; faculty?: string }) => {
    try {
      const res = await api<PracticalRecord>("/api/admin/practicals", { method: "PATCH", headers: authedHeaders, body: JSON.stringify(payload) });
      const saved = res.data;
      if (saved) {
        setPracticalRecords((current) => {
          const key = `${saved.batchId}-${saved.practicalName}-${saved.studentId}`;
          const next = current.filter((row) => `${row.batchId}-${row.practicalName}-${row.studentId}` !== key);
          return [...next, saved];
        });
      }
      toast.success("Practical status updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update practical");
    }
  };

  const createBatchPractical = async (payload: { batchId: string; students: Student[]; practicalName: string; module?: string; faculty?: string }) => {
    if (!payload.students.length) {
      toast.error("Assign candidates to this batch before adding a practical");
      return;
    }
    try {
      const savedRows = await Promise.all(payload.students.map((student) => api<PracticalRecord>("/api/admin/practicals", {
        method: "PATCH",
        headers: authedHeaders,
        body: JSON.stringify({
          batchId: payload.batchId,
          studentId: student._id,
          practicalName: payload.practicalName,
          module: payload.module || "",
          status: "Pending",
          remarks: "",
          faculty: student.teacher || payload.faculty || user?.name || "",
        }),
      })));
      const saved = savedRows.map((row) => row.data).filter(Boolean) as PracticalRecord[];
      setPracticalRecords((current) => {
        const keys = new Set(saved.map((row) => `${row.batchId}-${row.practicalName}-${row.studentId}`));
        return [...current.filter((row) => !keys.has(`${row.batchId}-${row.practicalName}-${row.studentId}`)), ...saved];
      });
      toast.success("Practical added for this batch");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add practical");
    }
  };

  const addCounsellor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api<Counsellor>("/api/admin/counsellors", { method: "POST", headers: authedHeaders, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      form.reset();
      toast.success("Staff account added");
      await loadCounsellors();
      await loadTeachers();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add staff");
      return false;
    }
  };

  const addCentreOrCourse = async (event: FormEvent<HTMLFormElement>, type: "centres" | "courses") => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api(`/api/admin/${type}`, { method: "POST", headers: authedHeaders, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      form.reset();
      toast.success(type === "centres" ? "Centre added" : "Course added");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save");
    }
  };

  const updateCentreBilling = async (event: FormEvent<HTMLFormElement>, centreId: string) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api<Centre>(`/api/admin/centres/${centreId}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      toast.success("Billing details updated");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update billing");
    }
  };

  const updateCourse = async (event: FormEvent<HTMLFormElement>, courseId: string) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      await api<Course>(`/api/admin/courses/${courseId}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      toast.success("Course updated");
      await loadMeta();
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update course");
      return false;
    }
  };

  const deleteCourse = async (course: Course) => {
    setDeletePrompt({
      title: "Delete course",
      message: `Delete "${course.name}"?`,
      onConfirm: async () => {
        try {
          await api<Course>(`/api/admin/courses/${course._id}`, { method: "DELETE", headers: authedHeaders });
          toast.success("Course deleted");
          await loadMeta();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to delete course");
        }
      },
    });
  };

  const addBatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const payload = { ...Object.fromEntries(formData.entries()), assignedFaculty: formData.getAll("assignedFaculty").map(String).filter(Boolean) };
      await api<Batch>("/api/admin/batches", { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Batch created");
      await loadMeta();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to create batch");
    }
  };

  const updateBatch = async (event: FormEvent<HTMLFormElement>, batchId: string) => {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const formData = new FormData(form);
      const payload = { ...Object.fromEntries(formData.entries()), assignedFaculty: formData.getAll("assignedFaculty").map(String).filter(Boolean) };
      const res = await api<Batch>(`/api/admin/batches/${batchId}`, { method: "PATCH", headers: authedHeaders, body: JSON.stringify(payload) });
      toast.success("Batch updated");
      await loadMeta();
      await loadStudents(studentPage);
      if (profile?.type === "student" && res.data) {
        const updatedBatch = res.data;
        const currentBatch = String(profile.data.batch || "").trim().toLowerCase();
        if (currentBatch === String(updatedBatch.name || "").trim().toLowerCase()) {
          setProfile((curr) => curr?.type === "student" ? { ...curr, data: { ...curr.data, batch: updatedBatch.name, batchCommenceDate: String(updatedBatch.commenceDate) } } : curr);
        }
      }
      return true;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update batch");
      return false;
    }
  };

  const deleteBatch = async (batch: Batch) => {
    setDeletePrompt({
      title: "Delete batch",
      message: `Delete "${batch.name}"?`,
      onConfirm: async () => {
        try {
          await api<Batch>(`/api/admin/batches/${batch._id}`, { method: "DELETE", headers: authedHeaders });
          toast.success("Batch deleted");
          await loadMeta();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Unable to delete batch");
        }
      },
    });
  };

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const newPassword = String(payload.newPassword || "");
    const confirmPassword = String(payload.confirmPassword || "");
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    try {
      await api<unknown>("/api/admin/me/password", { method: "PATCH", headers: authedHeaders, body: JSON.stringify({ currentPassword: payload.currentPassword, newPassword }) });
      form.reset();
      toast.success("Password updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update password");
    }
  };

  const performLogout = () => {
    localStorage.removeItem("imed_crm_token");
    setToken("");
    setUser(null);
    setProfile(null);
    setLeadDrawer(null);
  };

  const requestLogout = () => {
    setDeletePrompt({
      title: "Sign out",
      message: "Are you sure you want to logout from this admin account?",
      confirmLabel: "Sign out",
      tone: "logout",
      onConfirm: async () => performLogout(),
    });
  };

  const openLeadDrawer = (lead: Lead) => {
    setLeadDrawer(lead);
    setLeadDrawerTab("info");
  };

  const closeLeadDrawer = () => setLeadDrawer(null);
  const openProfile = (target: Exclude<ProfileTarget, null>, returnPanel: Panel) => {
    setProfileReturnPanel(returnPanel);
    setProfile(target);
    setPanel("profile");
  };
  const closeProfile = () => {
    const fallback: Panel = profile?.type === "lead" ? "leads" : isStudentStaffAccount ? "mystudents" : "allstudents";
    setPanel(profileReturnPanel || fallback);
    setProfile(null);
    setProfileReturnPanel("");
  };

  if (!token) {
    return (
      <main className="imed-admin-prototype">
        <CrmStyles />
        <Toaster richColors position="top-right" />
        <div id="authScreen">
          {resetToken ? <form className="auth-card" onSubmit={resetPassword} autoComplete="off">
            <div className="auth-logo"><div className="brand-mark"><img src="/imed-logo.svg" alt="iMED Academy" /></div><div><b>iMED Academy</b></div></div>
            <h1>Reset your password</h1>
            <p className="sub">{resetEmail ? `Set a new password for ${resetEmail}.` : "Set a new password for your admin account."}</p>
            <div className="field auth-password-field">
              <RequiredLabel required>New password</RequiredLabel>
              <div className="password-input-wrap">
                <input name="newPassword" type={showResetPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required />
                <button type="button" className="password-eye-btn" onClick={() => setShowResetPassword((value) => !value)} title={showResetPassword ? "Hide password" : "Show password"}>
                  {showResetPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="field"><RequiredLabel required>Confirm password</RequiredLabel><input name="confirmPassword" type={showResetPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required /></div>
            <button className="btn btn-primary" disabled={loading}>{loading ? "Saving..." : "Reset password"}</button>
          </form> : <form className="auth-card" onSubmit={handleAuth} autoComplete="off">
            <div className="auth-logo"><div className="brand-mark"><img src="/imed-logo.svg" alt="iMED Academy" /></div><div><b>iMED Academy</b></div></div>
            <h1>Sign in to your workspace</h1>
            <p className="sub">Use your admin CRM account to continue.</p>
            <div className="field"><RequiredLabel required>Email</RequiredLabel><input name="email" type="email" autoComplete="off" required /></div>
            <div className="field auth-password-field">
              <div className="auth-field-row"><RequiredLabel required>Password</RequiredLabel><button type="button" className="auth-link-btn" onClick={() => setForgotPasswordOpen(true)}>Forgot password?</button></div>
              <div className="password-input-wrap">
                <input name="password" type={showLoginPassword ? "text" : "password"} autoComplete="new-password" required />
                <button type="button" className="password-eye-btn" onClick={() => setShowLoginPassword((value) => !value)} title={showLoginPassword ? "Hide password" : "Show password"}>
                  {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button className="btn btn-primary" disabled={loading}>{loading ? "Checking..." : "Sign in"}</button>
          </form>}
        </div>
        <ForgotPasswordModal open={forgotPasswordOpen} loading={loading} onClose={() => setForgotPasswordOpen(false)} onSubmit={requestPasswordReset} />
      </main>
    );
  }

  return (
    <main className="imed-admin-prototype">
      <CrmStyles />
      <Toaster richColors position="top-right" />
      <div id="app" className="active">
        <aside className="sidebar">
          <div className="sidebar-brand"><div className="brand-mark"><img src="/imed-logo.svg" alt="iMED Academy" /></div><div className="brand-text"><b>iMED Academy</b></div></div>
          <div className="nav-scroll">
            {visibleNavGroups.map((group) => (
              <div key={group.group}>
                <div className="nav-group-label">{group.group}</div>
                {group.items.map((item) => (
                  <button key={item.key} className={`nav-item ${panel === item.key ? "active" : ""}`} onClick={() => { if (item.key === "profile") setProfile(null); setPanel(item.key); }}>
                    {item.icon}<span>{item.label}</span>
                    {item.key === "leads" && newAssignedLeads.length > 0 && <em className="nav-badge" style={{ background: "#4f46e5", color: "#ffffff", fontWeight: 800 }}>{newAssignedLeads.length}</em>}
                    {item.key === "admissions" && admissionPendingCount > 0 && <em className="nav-badge nav-badge-admission">{admissionPendingCount}</em>}
                    {item.key === "internship" && pendingLogbookReviewCount > 0 && <em className="nav-badge">{pendingLogbookReviewCount}</em>}
                  </button>
                ))}
              </div>
            ))}
            <button className="nav-item mobile-logout" onClick={requestLogout} title="Sign out">
              <LogOut size={16} /><span>Logout</span>
            </button>
          </div>
          <div className="sidebar-footer">
            <div className="role-pill">
              <div className="role-avatar">{initials(user?.name)}</div>
              <div className="role-meta"><b>{user?.name || "Admin"}</b><span>{roleLabel(user?.role)}</span></div>
              <button className="icon-btn" onClick={requestLogout} title="Sign out"><LogOut size={16} /></button>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <div><div className="page-title">{pageTitle}</div><div className="page-sub">{pageSub}</div></div>
            <div className="topbar-spacer" />
            {showScopeFilter && canUseScopeFilter && (
              <select className="scope-select" value={roleScope} onChange={(event) => handleScopeChange(event.target.value as RoleScope)}>
                <option value="all">All branches / franchises</option>
                {centres.map((centre) => <option key={centre._id} value={centre._id}>{centreKindLabel(centre)} - {centre.name}</option>)}
              </select>
            )}
            {showDateFilter && (
              <>
                <div className="date-filter">
                  {(["all", "today", "yesterday", "specific"] as DatePreset[]).map((preset) => (
                    <button key={preset} className={`df-btn ${datePreset === preset ? "active" : ""}`} onClick={() => handleDatePreset(preset)}>
                      {preset === "all" ? "All dates" : preset[0].toUpperCase() + preset.slice(1)}
                    </button>
                  ))}
                  <input className={`df-date ${datePreset === "specific" ? "show" : ""}`} type="date" value={selectedDate} onChange={(event) => { setSelectedDate(event.target.value); setDatePreset(event.target.value ? "specific" : "all"); }} />
                </div>
                {selectedDate && <button className="icon-btn" title="Clear date filter" onClick={clearDateFilter}>x</button>}
              </>
            )}
            {showTopbarSearch && <div className="search-box"><Search size={14} /><input value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} onKeyDown={(event) => { if (event.key === "Enter") void loadLeads(1); }} placeholder="Search leads..." /></div>}
            {canUseLeads && (
              <div className="notif-wrap" ref={notifRef}>
                <button
                  type="button"
                  className={`icon-btn notif-btn ${notifOpen ? "active" : ""}`}
                  onClick={() => setNotifOpen((prev) => !prev)}
                  title="Lead notifications & reminders"
                  aria-label="Lead notifications & reminders"
                >
                  <Bell size={15} />
                  {totalNotifCount > 0 && (
                    <span className={`notif-badge ${newAssignedLeads.length > 0 ? "urgent notif-pulse" : urgentNotifCount > 0 ? "urgent" : ""}`}>
                      {totalNotifCount > 99 ? "99+" : totalNotifCount}
                    </span>
                  )}
                </button>
                {notifOpen && (
                  <div className="notif-dropdown">
                    <div className="notif-header">
                      <div className="notif-title-row">
                        <div className="notif-title">
                          <Bell size={15} />
                          <span>Notifications</span>
                        </div>
                        <span className="notif-count-pill">{totalNotifCount} total</span>
                      </div>
                      <div className="notif-tabs" style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                        <button
                          type="button"
                          className={`btn ${notifTab === "assigned" ? "btn-primary" : "btn-ghost"}`}
                          style={{ flex: 1, padding: "5px 8px", fontSize: "11.5px", height: "auto" }}
                          onClick={() => setNotifTab("assigned")}
                        >
                          <UserCheck size={13} />
                          <span>Assign ({newAssignedLeads.length})</span>
                        </button>
                        <button
                          type="button"
                          className={`btn ${notifTab === "followups" ? "btn-primary" : "btn-ghost"}`}
                          style={{ flex: 1, padding: "5px 8px", fontSize: "11.5px", height: "auto" }}
                          onClick={() => setNotifTab("followups")}
                        >
                          <Clock size={13} />
                          <span>Follow-ups ({followUpLeads.length})</span>
                        </button>
                      </div>
                      {notifTab === "assigned" && newAssignedLeads.length > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", gap: "6px" }}>
                          <div className="notif-alert-banner" style={{ flex: 1, margin: 0, background: "#EEF2FF", borderColor: "#C7D2FE", color: "#3730A3" }}>
                            <UserCheck size={14} style={{ color: "#4F46E5" }} />
                            <span><strong>{newAssignedLeads.length}</strong> new assign lead{newAssignedLeads.length > 1 ? "s" : ""} in your centre!</span>
                          </div>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            style={{ fontSize: "11px", padding: "4px 8px", height: "auto", whiteSpace: "nowrap", color: "#4F46E5", fontWeight: 700 }}
                            title="Hide all assigned leads from notifications"
                            onClick={() => {
                              newAssignedLeads.forEach((l) => dismissAssignedLead(l._id));
                            }}
                          >
                            Hide all
                          </button>
                        </div>
                      )}
                      {notifTab === "followups" && dueFollowUpCount > 0 && (
                        <div className="notif-alert-banner">
                          <AlertTriangle size={14} />
                          <span><strong>{dueFollowUpCount}</strong> follow-up{dueFollowUpCount > 1 ? "s" : ""} due today or overdue!</span>
                        </div>
                      )}
                    </div>
                    <div className="notif-body">
                      {notifTab === "assigned" ? (
                        newAssignedLeads.length === 0 ? (
                          <div className="notif-empty">
                            <div className="notif-empty-icon"><UserCheck size={24} /></div>
                            <div className="notif-empty-text">No new assign leads</div>
                            <div className="notif-empty-sub">Leads assigned to your centre by super admin will appear here.</div>
                          </div>
                        ) : (
                          <div className="notif-list">
                            {newAssignedLeads.slice(0, 15).map((lead) => {
                              const assignActivity = lead.activities?.find((a) => a.type === "assigned");
                              return (
                                <div key={lead._id} className="notif-item-wrap">
                                  <button
                                    type="button"
                                    className="notif-item"
                                    onClick={() => {
                                      openLeadDrawer(lead);
                                      setNotifOpen(false);
                                    }}
                                  >
                                    <div className="notif-avatar" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                                      {initials(lead.fullName)}
                                    </div>
                                    <div className="notif-item-info">
                                      <div className="notif-item-top">
                                        <span className="notif-item-name">{lead.fullName}</span>
                                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                                          {lead.source && <span className="tag tag-gray" style={{ fontSize: "9.5px", padding: "1px 5px" }}>{lead.source}</span>}
                                          <span className="tag tag-blue" style={{ fontSize: "10.5px" }}>
                                            {lead.centre || "Assign"}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="notif-item-meta">
                                        <span>{courseShortCode(lead.course)}</span>
                                        {lead.counsellor && <span> • Counsellor: {lead.counsellor}</span>}
                                        {lead.phone && <span> • {lead.phone}</span>}
                                      </div>
                                      <div className="notif-item-time" style={{ color: "#4F46E5" }}>
                                        <UserCheck size={12} />
                                        <span>{assignActivity?.message || `Assigned to ${lead.centre || "centre"}`}</span>
                                      </div>
                                    </div>
                                  </button>
                                  <button
                                    type="button"
                                    className="notif-quick-done-btn"
                                    title="Dismiss from notifications"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      dismissAssignedLead(lead._id);
                                    }}
                                  >
                                    <Check size={14} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )
                      ) : (
                        followUpLeads.length === 0 ? (
                          <div className="notif-empty">
                            <div className="notif-empty-icon"><Bell size={24} /></div>
                            <div className="notif-empty-text">No upcoming lead follow-ups</div>
                            <div className="notif-empty-sub">Scheduled follow-up reminders for leads will appear here.</div>
                          </div>
                        ) : (
                          <div className="notif-list">
                            {followUpLeads.slice(0, 15).map((lead) => (
                              <div key={lead._id} className="notif-item-wrap">
                                <button
                                  type="button"
                                  className="notif-item"
                                  onClick={() => {
                                    openLeadDrawer(lead);
                                    setNotifOpen(false);
                                  }}
                                >
                                  <div className="notif-avatar">{initials(lead.fullName)}</div>
                                  <div className="notif-item-info">
                                    <div className="notif-item-top">
                                      <span className="notif-item-name">{lead.fullName}</span>
                                      <span className={`tag ${followUpTagClass(lead.nextFollowUp)}`}>
                                        {followUpDueLabel(lead.nextFollowUp)}
                                      </span>
                                    </div>
                                    <div className="notif-item-meta">
                                      <span>{courseShortCode(lead.course)}</span>
                                      {lead.centre && <span> • {lead.centre}</span>}
                                      {lead.phone && <span> • {lead.phone}</span>}
                                    </div>
                                    <div className="notif-item-time">
                                      <Calendar size={12} />
                                      <span>{formatDateTime(lead.nextFollowUp)}</span>
                                    </div>
                                  </div>
                                </button>
                                <button
                                  type="button"
                                  className="notif-quick-done-btn"
                                  title="Mark follow-up done & remove reminder"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    markLeadFollowUpDone(lead);
                                  }}
                                >
                                  <Check size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )
                      )}
                    </div>
                    <div className="notif-footer">
                      <button
                        type="button"
                        className="notif-view-all-btn"
                        onClick={() => {
                          setPanel("leads");
                          setNotifOpen(false);
                        }}
                      >
                        <span>View all leads</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </header>

          <section className="content">
            {panel === "dashboard" && (isCounsellorAccount ? <SalesCounsellorDashboardPanel leads={leads} students={visibleStudents} onOpenLead={openLeadDrawer} onGoLeads={() => setPanel("leads")} onGoAddLead={() => setPanel("addlead")} onGoAdmissions={() => setPanel("admissions")} onOpenStudent={(student) => openProfile({ type: "student", data: student }, "dashboard")} /> : isTeacherAccount ? <TeacherDashboardPanel batches={batches} students={visibleStudents} sessions={classSessions} schedules={classSchedulesState} topicProgress={topicProgress} practicalRecords={practicalRecords} user={user} googleCalendarStatus={googleCalendarStatus} calendarSyncing={calendarSyncing} onConnectCalendar={connectGoogleCalendar} onDisconnectCalendar={disconnectGoogleCalendar} onSyncCalendar={syncGoogleCalendar} onOpenStudent={(student) => openProfile({ type: "student", data: student }, "dashboard")} onOpenBatch={(batchId, sessionId) => { setSelectedBatchId(batchId); setSelectedClassSessionId(sessionId || ""); setPanel("batch"); }} /> : isOperationsAccount ? <OperationsDashboardPanel students={students} batches={batches} onOpenStudent={(student) => openProfile({ type: "student", data: student }, "dashboard")} onGoStudents={() => setPanel("allstudents")} onGoFinance={() => setPanel("finance")} onGoEmi={() => setPanel("emi")} onGoCert={() => setPanel("cert")} onGoInternship={() => setPanel("internship")} onGoInventory={() => setPanel("inventory")} inventorySummary={inventorySummary} /> : <DashboardPanel summary={summary} funnel={funnel} centreStats={centreStats} students={students} leads={leads} onOpenLead={openLeadDrawer} />)}
            {panel === "leads" && <LeadsPanel leads={leads} students={students} batches={batches} meta={leadMeta} filters={filters} setFilters={setFilters} centres={centreOptions} courses={courseOptions} canAssign={canAssignCounsellors} canDelete={canDeleteRecords} counsellors={counsellors} onSearch={() => loadLeads(1)} onPage={setLeadPage} onPatch={patchLead} onDelete={deleteLead} onEdit={(lead) => openProfile({ type: "lead", data: lead, mode: "edit" }, "leads")} onAddLead={() => setPanel("addlead")} onImportExcel={importLeadExcel} onOpen={openLeadDrawer} onBulkAssignCentre={bulkAssignLeadCentre} onBulkDelete={bulkDeleteLeads} />}
            {panel === "addlead" && <AddLeadPanel centres={centreOptions} courses={courseOptions} allCourses={courses} onSubmit={addLead} isSuperAdmin={isHeadSuperAdmin} />}
            {panel === "admissions" && <AdmissionsPanel leads={leads.filter((lead) => lead.stage === "Admission" && !students.some((student) => String(student.leadId || "") === String(lead._id)))} batches={batches} canAssign={canAssignCounsellors} counsellors={counsellors} centres={centreOptions} onPatch={patchLead} onConvert={convertLead} onOpen={openLeadDrawer} />}
            {panel === "batch" && <BatchPanel batches={batches} students={students} schedules={classSchedulesState} sessions={classSessions} topicProgress={topicProgress} practicalRecords={practicalRecords} studyNotes={studyNotes} npsDashboard={npsDashboard} teachers={teachers} user={user} classWeek={classWeek} setClassWeek={setClassWeek} selectedBatchId={selectedBatchId} setSelectedBatchId={setSelectedBatchId} selectedSessionId={selectedClassSessionId} setSelectedSessionId={setSelectedClassSessionId} initialTab={batchResumeTab} classesGenerating={classesGenerating} attendanceDraft={classAttendanceDraft} setAttendanceDraft={setClassAttendanceDraft} attendanceLogs={attendanceSummaries} selectedAttendanceSummary={selectedAttendanceSummary} attendanceDetailLogs={attendanceDetailLogs} attendanceDetailFilters={attendanceDetailFilters} setAttendanceDetailFilters={setAttendanceDetailFilters} onSelectAttendanceSummary={setSelectedAttendanceSummary} onCreateSchedule={createClassSchedule} onGenerateWeek={generateWeeklyRoster} onSaveAttendance={saveClassAttendance} onResetAttendance={resetClassAttendance} onEditSession={patchClassSession} onTopicProgress={updateTopicProgress} onDeleteTopic={deleteTopicProgress} onCreateBatchPractical={createBatchPractical} onPracticalRecord={updatePracticalRecord} onUploadStudyNote={uploadStudyNote} onDownloadStudyNote={downloadStudyNote} onDeleteStudyNote={deleteStudyNote} onOpen={(student) => { setBatchResumeTab("students"); openProfile({ type: "student", data: student }, "batch"); }} />}
            {panel === "mystudents" && <StudentsPanel title="My candidates" students={visibleStudents} meta={studentMeta} batches={batches} canAssign={canAssignTeachers} canDelete={canDeleteRecords} teachers={teachers} onPage={setStudentPage} onPatch={patchStudent} onDelete={deleteStudent} onEdit={(student) => openProfile({ type: "student", data: student, mode: "edit" }, "mystudents")} onOpen={(student) => openProfile({ type: "student", data: student }, "mystudents")} />}
            {panel === "allstudents" && <StudentsPanel title="All candidates" students={students} meta={studentMeta} batches={batches} canAssign={canAssignTeachers} canDelete={canDeleteRecords} teachers={teachers} onPage={setStudentPage} onPatch={patchStudent} onDelete={deleteStudent} onEdit={(student) => openProfile({ type: "student", data: student, mode: "edit" }, "allstudents")} onOpen={(student) => openProfile({ type: "student", data: student }, "allstudents")} />}
            {panel === "attendance" && <AttendancePanel students={visibleStudents} attendance={attendance} draft={attendanceDraft} setDraft={setAttendanceDraft} attendanceDate={attendanceDateValue} setAttendanceDate={setAttendanceDateValue} onRefresh={loadAttendance} onSave={saveAttendance} />}
            {panel === "logs" && <LogsPanel logs={attendanceSummaries} onSelect={(summary) => { setSelectedAttendanceSummary(summary); setPanel("attdetail"); }} />}
            {panel === "attdetail" && <AttendanceDetailPanel summary={selectedAttendanceSummary} logs={attendanceDetailLogs} filters={attendanceDetailFilters} setFilters={setAttendanceDetailFilters} onBack={() => setPanel("logs")} />}
            {panel === "internship" && canUseInternship && <InternshipPanel students={visibleStudents} user={user} onPreviewPhoto={openInternshipPhotoPreview} onReviewLogbook={reviewLogbookEntry} />}
            {panel === "nps" && (canManageNps || isTeacherAccount) && <NpsPanel dashboard={npsDashboard} responses={npsResponses} meta={npsMeta} filters={npsFilters} setFilters={(next) => { setNpsFilters(next); setNpsPage(1); }} courses={courseOptions} batches={batches} canManage={canManageNps} onPage={setNpsPage} onFollowUp={saveNpsFollowUp} onExport={exportNps} />}
            {panel === "alumni" && <AlumniPanel students={isTeacherAccount ? visibleStudents : students} meta={studentMeta} canManage={!isTeacherAccount && !isCounsellorAccount} onPage={setStudentPage} onPatch={patchStudent} onOpen={(student) => openProfile({ type: "student", data: student }, "alumni")} />}
            {panel === "finance" && <FinancePanel students={students} meta={studentMeta} user={user} onPage={setStudentPage} onOpen={(student) => openProfile({ type: "student", data: student }, "finance")} onCashDeposit={recordCashDeposit} onDownloadCashDepositProof={downloadCashDepositProof} />}
            {panel === "emi" && <EmiPanel students={students} meta={studentMeta} onPage={setStudentPage} onOpen={(student) => openProfile({ type: "student", data: student }, "emi")} />}
            {panel === "receipts" && canManageFees && <ReceiptsPanel students={visibleStudents} meta={studentMeta} onPage={setStudentPage} onOpen={(student) => { setReceiptStudent(student); setReceiptSelection({ type: "invoice" }); }} />}
            {panel === "cert" && canManageCertificates && <CertificatePanel students={students} meta={studentMeta} onPage={setStudentPage} onIssue={issueCertificate} onOpen={(student) => openProfile({ type: "student", data: student }, "cert")} />}
            {panel === "settings" && canManageSettings && <SettingsPanel isHeadSuperAdmin={isHeadSuperAdmin} isHeadBranchAdmin={isHeadBranchAdmin} isFranchiseSuperAdmin={isFranchiseSuperAdmin} centres={centres} courses={courses} batches={batches} counsellors={counsellors} teachers={teachers} user={user} centreOptions={centreOptions} courseOptions={courseOptions} onAddStaff={addCounsellor} onAddCentre={(event) => addCentreOrCourse(event, "centres")} onUpdateCentreBilling={updateCentreBilling} onAddCourse={(event) => addCentreOrCourse(event, "courses")} onUpdateCourse={updateCourse} onDeleteCourse={deleteCourse} onAddBatch={addBatch} onUpdateBatch={updateBatch} onDeleteBatch={deleteBatch} onUpdatePassword={updatePassword} />}
            {panel === "inventory" && canManageInventory && (
              <InventoryPanel
                summary={inventorySummary}
                items={inventoryItems}
                tablets={tablets}
                transactions={inventoryTransactions}
                students={students}
                activeTab={inventoryTab}
                setActiveTab={setInventoryTab}
                tabletSearch={tabletSearchQuery}
                setTabletSearch={setTabletSearchQuery}
                onStockInClick={() => setStockInModalOpen(true)}
                onIssueKitClick={(student, tablet) => {
                  setIssueKitTargetStudent(student || null);
                  setIssueKitTargetTablet(tablet || null);
                  setIssueKitModalOpen(true);
                }}
                onReturnTablet={handleReturnTablet}
                onOpenStudent={(student) => openProfile({ type: "student", data: student }, "inventory")}
              />
            )}
            {panel === "profile" && <ProfilePanel profile={profile} user={user} accessCount={visibleNavGroups.reduce((sum, group) => sum + group.items.length, 0)} canManageFees={canManageFees} canManageSettings={canManageSettings} canAssignTeachers={canAssignTeachers} canManageCertificates={canManageCertificates} canManageInternships={canManageInternships} canManageInventory={canManageInventory} onIssueKit={(st) => { setIssueKitTargetStudent(st); setIssueKitTargetTablet(null); setIssueKitModalOpen(true); }} centres={centreOptions} courses={courseOptions} allCourses={courses} batches={batches} teachers={teachers} onBack={closeProfile} onGoSettings={() => setPanel("settings")} onLeadPatch={patchLead} onStudentPatch={patchStudent} onGenerateStudentLmsAccess={generateStudentLmsAccess} onInternshipSave={saveStudentInternship} onInternshipDelete={deleteStudentInternship} onPayment={addPayment} onDownloadPaymentProof={downloadPaymentProof} onFeedback={addStudentFeedback} onIssue={issueCertificate} onPreviewDocument={openDocumentPreview} onPreviewInternshipPhoto={openInternshipPhotoPreview} />}
          </section>
        </div>
      </div>
      <LeadDrawer
        lead={leadDrawer}
        tab={leadDrawerTab}
        setTab={setLeadDrawerTab}
        canAssign={canAssignCounsellors}
        centres={centreOptions}
        courses={courses}
        counsellors={counsellors}
        onClose={closeLeadDrawer}
        onPatch={patchLead}
        onFollowUp={addLeadFollowUp}
        onMarkDone={markLeadFollowUpDone}
        onClearReminder={clearLeadReminder}
        onPreviewDocument={openDocumentPreview}
        onAddActivity={addLeadActivity}
      />
      <ReceiptDrawer
        student={receiptStudent}
        centres={centres}
        selection={receiptSelection}
        setSelection={setReceiptSelection}
        onClose={() => setReceiptStudent(null)}
      />
      <DocumentPreviewModal preview={documentPreview} onClose={closeDocumentPreview} />
      <DeleteConfirmModal prompt={deletePrompt} onCancel={() => setDeletePrompt(null)} onConfirm={confirmDeletePrompt} />
      <LogbookReviewModal
        prompt={logbookReviewPrompt}
        onRemarkChange={(remark) => setLogbookReviewPrompt((current) => current ? { ...current, remark } : current)}
        onCancel={() => setLogbookReviewPrompt(null)}
        onSubmit={async () => {
          if (!logbookReviewPrompt) return;
          const activePrompt = logbookReviewPrompt;
          setLogbookReviewPrompt(null);
          await reviewLogbookEntry(activePrompt.student, activePrompt.entry, activePrompt.verified, activePrompt.remark);
        }}
      />
      <StockInModal
        open={stockInModalOpen}
        onClose={() => setStockInModalOpen(false)}
        onSubmit={handleStockIn}
      />
      <IssueKitModal
        open={issueKitModalOpen}
        students={students}
        targetStudent={issueKitTargetStudent}
        targetTablet={issueKitTargetTablet}
        tablets={tablets}
        summary={inventorySummary}
        onClose={() => {
          setIssueKitModalOpen(false);
          setIssueKitTargetStudent(null);
          setIssueKitTargetTablet(null);
        }}
        onSubmit={handleIssueKit}
      />
    </main>
  );
}

const npsTouchpointLabels: Record<string, string> = {
  mid_course: "Mid-course",
  post_classroom: "Classroom complete",
  post_internship: "Internship complete",
};

const npsAttributeLabels: Record<string, string> = {
  attrTeachingQuality: "Teaching quality",
  attrContentRelevance: "Content relevance",
  attrPracticalTraining: "Practical training",
  attrSupportInfra: "Support & infra",
  attrPlacementAssistance: "Placement / internship",
};

function npsStudentName(response: NpsResponse) {
  const student = response.studentId;
  return typeof student === "object" && student ? student.fullName || "Student" : "Student";
}

function npsStudentSub(response: NpsResponse) {
  const student = response.studentId;
  return typeof student === "object" && student ? student.admissionNumber || student.phone || "" : "";
}

function npsLatestFollowUpNote(response: NpsResponse) {
  const notes = response.followUpNotes || [];
  return notes.length ? notes[notes.length - 1] : null;
}

function NpsPanel({ dashboard, responses, meta, filters, setFilters, courses, batches, canManage, onPage, onFollowUp, onExport }: { dashboard: NpsDashboard | null; responses: NpsResponse[]; meta: PaginationMeta | null; filters: { q: string; touchpoint: string; course: string; batch: string; category: string }; setFilters: (filters: { q: string; touchpoint: string; course: string; batch: string; category: string }) => void; courses: string[]; batches: Batch[]; canManage: boolean; onPage: (page: number) => void; onFollowUp: (id: string, status: string, note: string) => void; onExport: () => void }) {
  const [selected, setSelected] = useState<NpsResponse | null>(null);
  const [followStatus, setFollowStatus] = useState("In Progress");
  const [followNote, setFollowNote] = useState("");
  const scoreTone = (dashboard?.nps || 0) >= 50 ? "good" : (dashboard?.nps || 0) >= 0 ? "warn" : "bad";
  const detractorCount = typeof dashboard?.detractors === "number" ? dashboard.detractors : dashboard?.detractors?.length || 0;
  const detractorAlerts = dashboard?.detractorAlerts || (Array.isArray(dashboard?.detractors) ? dashboard.detractors : []);
  const visibleAttributes = Object.entries(npsAttributeLabels).filter(([key]) => Number(dashboard?.attributes?.[key] || 0) > 0);
  const npsValueColor = scoreTone === "good" ? "#17A673" : scoreTone === "warn" ? "#F5A524" : "#E5484D";
  const responseRate = Math.min(100, dashboard?.responseRate || 0);
  const openFollowUp = (response: NpsResponse) => {
    setSelected(response);
    setFollowStatus(response.followUpStatus || "In Progress");
    setFollowNote("");
  };
  const save = () => {
    if (!selected) return;
    onFollowUp(selected._id, followStatus, followNote);
    setSelected(null);
  };
  return (
    <>
      <div className="grid-metrics nps-metrics">
        <MetricCard label="NPS" value={dashboard ? dashboard.nps : 0} dot={npsValueColor} delta={`${dashboard?.total || 0} responses`} down={scoreTone === "bad"} valueColor={npsValueColor} />
        <MetricCard label="Promoters" value={dashboard?.promoters || 0} dot="#17A673" delta={`${dashboard?.promoterPercent || 0}%`} />
        <MetricCard label="Detractors" value={detractorCount} dot="#E5484D" delta={canManage ? `${dashboard?.detractorPercent || 0}% needs follow-up` : `${dashboard?.detractorPercent || 0}% low-score feedback`} down={detractorCount > 0} />
        <MetricCard label="Response rate" value={`${responseRate}%`} dot="#17A673" delta="active students" />
      </div>
      {canManage && <div className="filter-bar nps-filter-bar">
        {canManage && <div className="search-box"><Search size={14} /><input value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} placeholder="Search student, batch, feedback..." /></div>}
        <select className="fbtn" value={filters.touchpoint} onChange={(event) => setFilters({ ...filters, touchpoint: event.target.value })}><option value="">All touchpoints</option>{Object.entries(npsTouchpointLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
        <select className="fbtn" value={filters.course} onChange={(event) => setFilters({ ...filters, course: event.target.value })}><option value="">All courses</option>{courses.map((course) => <option key={course}>{course}</option>)}</select>
        <select className="fbtn" value={filters.batch} onChange={(event) => setFilters({ ...filters, batch: event.target.value })}><option value="">All batches</option>{batches.map((batch) => <option key={batch._id} value={batch.name}>{batch.name}</option>)}</select>
        {canManage && <select className="fbtn" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}><option value="">All categories</option><option value="promoter">Promoter</option><option value="passive">Passive</option><option value="detractor">Detractor</option></select>}
        {canManage && <button className="btn btn-ghost" onClick={onExport}><Download size={15} /> Export</button>}
      </div>}
      <div className="two-col nps-insight-grid">
        <section className="card">
          <div className="card-head"><div><h3>NPS trend</h3><p>Daily submitted feedback score</p></div></div>
          <div className="card-body nps-trend">
            {(dashboard?.trend || []).map((item) => {
              const height = Math.max(10, Math.min(100, item.nps + 100) / 2);
              return <div className="nps-trend-day" key={item.date}><div className="nps-trend-bar"><i style={{ height: `${height}%` }} /></div><b>{item.nps}</b><span>{new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span></div>;
            })}
            {!(dashboard?.trend || []).length && <div className="empty-state">No trend data yet</div>}
          </div>
        </section>
        <section className="card">
          <div className="card-head"><div><h3>NPS alerts</h3><p>Response and follow-up checks</p></div></div>
          <div className="card-body nps-alert-list">
            {(dashboard?.alerts || []).map((alert) => <div className={`nps-alert ${alert.tone}`} key={`${alert.label}-${alert.detail}`}><span /> <div><b>{alert.label}</b><p>{alert.detail}</p></div></div>)}
            {!(dashboard?.alerts || []).length && <div className="empty-state">No NPS alerts right now</div>}
          </div>
        </section>
      </div>
      <div className="two-col">
        <section className="card">
          <div className="card-head"><div><h3>Attribute heatmap</h3><p>Average star rating across responses</p></div></div>
          <div className="card-body nps-heatmap">
            {visibleAttributes.map(([key, label]) => {
              const value = dashboard?.attributes?.[key] || 0;
              return <div className="nps-heat-row" key={key}><span>{label}</span><div><i style={{ width: `${(value / 5) * 100}%` }} /></div><b>{value ? value.toFixed(1) : "-"}</b></div>;
            })}
            {!visibleAttributes.length && <div className="empty-state">No attribute ratings yet</div>}
          </div>
        </section>
        {canManage ? <section className="card">
          <div className="card-head"><div><h3>Detractor alerts</h3><p>0-6 ratings needing closure</p></div></div>
          <div className="card-body row-list">
            {detractorAlerts.map((item) => <div className="crow" key={item._id}><div className="who"><span className="mini">{initials(npsStudentName(item))}</span><div><b>{npsStudentName(item)}</b><p className="cell-sub">{npsTouchpointLabels[item.touchpoint]} | Score {item.npsScore}</p></div></div><button className="btn btn-primary btn-sm" onClick={() => openFollowUp(item)}>Follow up</button></div>)}
            {!detractorAlerts.length && <div className="empty-state">No open detractor alerts</div>}
          </div>
        </section> : <section className="card">
          <div className="card-head"><div><h3>Touchpoint summary</h3><p>NPS split by feedback stage</p></div></div>
          <div className="card-body nps-summary-grid">
            {(dashboard?.touchpoints || []).map((item) => <div className="nps-summary-card" key={item.label}><b>{item.label}</b><strong>{item.nps}</strong><span>{item.total} responses</span></div>)}
            {!(dashboard?.touchpoints || []).length && <div className="empty-state">No touchpoint NPS yet</div>}
          </div>
        </section>}
      </div>
      {canManage && <section className="card nps-responses-card">
        <div className="card-head"><div><h3>NPS responses</h3><p>Student feedback responses with follow-up status</p></div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Student</th><th>Touchpoint</th><th>Score</th><th>Attributes</th><th>Feedback</th><th>Follow-up</th><th>Date</th><th></th></tr></thead>
            <tbody>{responses.map((row) => <tr key={row._id}>
              <td><div className="cell-name">{npsStudentName(row)}</div><div className="cell-sub">{npsStudentSub(row)} | {row.batchName || "-"}</div></td>
              <td>{npsTouchpointLabels[row.touchpoint] || row.touchpoint}</td>
              <td><span className={`badge nps-${row.npsCategory}`}>{row.npsScore}/10</span></td>
              <td><span className="cell-sub">{[row.attrTeachingQuality, row.attrContentRelevance, row.attrPracticalTraining, row.attrSupportInfra, row.attrPlacementAssistance].filter(Boolean).join(" / ")}</span></td>
              <td><span className="cell-sub">{row.openFeedback || "-"}</span></td>
              <td><span className={`badge ${row.followUpStatus === "Resolved" ? "badge-green" : row.followUpStatus === "In Progress" ? "badge-yellow" : "badge-red"}`}>{row.followUpStatus || "Pending"}</span><div className="cell-sub">{npsLatestFollowUpNote(row)?.note || "No note yet"}</div></td>
              <td>{formatDate(row.submittedAt)}</td>
              <td>{row.npsCategory === "detractor" && <button className="action-icon-btn action-icon-primary" title="Update follow-up" aria-label="Update follow-up" onClick={() => openFollowUp(row)}><Pencil size={14} /></button>}</td>
            </tr>)}</tbody>
          </table>
        </div>
        {meta && <Pager meta={meta} label="responses" onPage={onPage} />}
      </section>}
      <section className="card nps-summary-section">
        <div className="card-head"><div><h3>Batch summary</h3><p>Overall NPS score by batch</p></div></div>
        <div className="card-body nps-summary-grid">
          {(dashboard?.batches || []).map((batch) => <div className="nps-summary-card" key={batch.label}><b>{batch.label}</b><strong>{batch.nps}</strong><span>{batch.total} responses</span></div>)}
          {!(dashboard?.batches || []).length && <div className="empty-state">No batch NPS yet</div>}
        </div>
      </section>
      {canManage && selected && <div className="modal-overlay show"><div className="modal logbook-review-modal"><div className="modal-head"><h3>NPS follow-up</h3><button className="icon-btn" onClick={() => setSelected(null)}>x</button></div><div className="modal-body"><div className="review-entry-snapshot"><b>{npsStudentName(selected)} | {selected.npsScore}/10</b><span>{selected.openFeedback || "No written feedback"}</span></div>{Boolean(selected.followUpNotes?.length) && <div className="nps-note-history"><b>Previous notes</b>{selected.followUpNotes?.map((note, index) => <div key={`${note.at || index}-${index}`}><p>{note.note}</p><span>{note.by || "Admin"} - {formatDateTime(note.at)}</span></div>)}</div>}<div className="field"><label>Status</label><select value={followStatus} onChange={(event) => setFollowStatus(event.target.value)}><option>Pending</option><option>In Progress</option><option>Resolved</option></select></div><div className="field"><label>Internal note</label><textarea value={followNote} onChange={(event) => setFollowNote(event.target.value)} placeholder="Add action taken or follow-up note" /></div></div><div className="modal-foot"><button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save follow-up</button></div></div></div>}
    </>
  );
}

function OperationsDashboardPanel({ students, batches, onOpenStudent, onGoStudents, onGoFinance, onGoEmi, onGoCert, onGoInternship, onGoInventory, inventorySummary }: { students: Student[]; batches: Batch[]; onOpenStudent: (student: Student) => void; onGoStudents: () => void; onGoFinance: () => void; onGoEmi: () => void; onGoCert: () => void; onGoInternship: () => void; onGoInventory?: () => void; inventorySummary?: InventorySummary | null }) {
  const todayKey = dateInputValue();
  const enrolledCount = students.length;
  const activeStudents = students.filter((s) => ["Admission Completed", "Fees Decided", "Fees Collected", "Active Student"].includes(normalizeStudentStatus(s.status)));
  const totalCollected = students.reduce((sum, s) => sum + (s.paidAmount || 0), 0);
  const totalPendingDue = students.reduce((sum, s) => sum + dueAmount(s), 0);
  const lmsPending = students.filter((s) => !s.lmsAccessEnabled && ["Fees Decided", "Fees Collected", "Active Student"].includes(normalizeStudentStatus(s.status)));
  const emiDueStudents = students.filter((s) => s.emiEnabled && s.nextEmiDate && dateInputValue(s.nextEmiDate) <= dateInputValueFromOffset(7));
  const certPending = students.filter((s) => ["Course Completed", "Classroom Complete"].includes(normalizeStudentStatus(s.status)) && !s.certificateNumber);
  const internshipActive = students.filter((s) => s.internshipAssignment?.facilityName);
  const recentAdmissions = students.filter((s) => ["Enrolled", "Admission Completed"].includes(normalizeStudentStatus(s.status))).slice(0, 6);

  // Chart 1: Fee collection vs Pending Dues
  const collectionTotal = totalCollected + totalPendingDue;
  const collectionSlices: DonutSlice[] = [
    { label: "Collected", value: totalCollected, color: "#17A673" },
    { label: "Pending Due", value: totalPendingDue, color: "#E5484D" },
  ];
  const collectionPct = collectionTotal > 0 ? Math.round((totalCollected / collectionTotal) * 100) : 0;

  // Chart 2: Candidate Progression / Training Stages
  const stageCategories = [
    { key: "New Admission", label: "New Admission", color: "#4F6BFF", test: (st: string) => ["Enrolled", "Admission Completed"].includes(st) },
    { key: "Fees Finalized", label: "Fees Finalized", color: "#14B8A6", test: (st: string) => ["Fees Decided", "Fees Collected"].includes(st) },
    { key: "In Training", label: "In Training", color: "#8B5CF6", test: (st: string) => st === "Active Student" },
    { key: "Course Complete", label: "Course Complete", color: "#17A673", test: (st: string) => ["Classroom Complete", "Course Completed"].includes(st) },
    { key: "Alumni / Placed", label: "Alumni / Placed", color: "#F5A524", test: (st: string) => st === "Alumni" },
  ];
  const lifecycleSlices: DonutSlice[] = stageCategories.map((cat) => ({
    label: cat.label,
    value: students.filter((s) => cat.test(normalizeStudentStatus(s.status))).length,
    color: cat.color,
  })).filter((slice) => slice.value > 0);

  // If no students yet, default empty slice so chart renders cleanly
  const displayLifecycleSlices: DonutSlice[] = lifecycleSlices.length
    ? lifecycleSlices
    : [{ label: "No candidates", value: 1, color: "var(--border-soft)" }];

  return (
    <>
      <div className="grid-metrics">
        <MetricCard label="Total candidates" value={enrolledCount} dot="#4F6BFF" delta="all candidates" />
        <MetricCard label="Active in training" value={activeStudents.length} dot="#17A673" delta="active students" />
        <MetricCard label="Total collected" value={formatCurrency(totalCollected)} dot="#14B8A6" delta="fees received" />
        <MetricCard label="Pending dues" value={formatCurrency(totalPendingDue)} dot="#E5484D" delta="to collect" down={totalPendingDue > 0} />
        <MetricCard label="LMS to generate" value={lmsPending.length} dot="#8B5CF6" delta="ready for login" down={lmsPending.length > 0} />
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Fee collection status</h3>
              <div className="sub">Collected vs pending dues across candidates</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onGoFinance}>Open finance</button>
          </div>
          <div className="card-body chart-body">
            <DonutChart data={collectionSlices} centerValue={`${collectionPct}%`} centerLabel="Collected" />
            <DonutLegend data={collectionSlices} formatValue={formatCurrency} />
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3>Candidate training progression</h3>
              <div className="sub">Share of candidates across learning stages</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={onGoStudents}>Candidates</button>
          </div>
          <div className="card-body chart-body">
            <DonutChart data={displayLifecycleSlices} centerValue={String(enrolledCount)} centerLabel="Candidates" />
            <DonutLegend data={displayLifecycleSlices} formatValue={(val) => `${val} student${val === 1 ? "" : "s"}`} />
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><div><h3>LMS access needed</h3><div className="sub">Candidates with fees planned waiting for LMS login</div></div><button className="btn btn-ghost btn-sm" onClick={onGoStudents}>Candidates</button></div>
          <div className="card-body row-list">
            {lmsPending.slice(0, 6).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} | {student.batch || "No batch"} | {formatCurrency(student.paidAmount || 0)} paid</div></div></div><span className="tag purple">Generate LMS</span></button>)}
            {!lmsPending.length && <div className="empty-state">All active candidates have LMS login generated</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Upcoming & overdue EMIs</h3><div className="sub">Instalments due in next 7 days</div></div><button className="btn btn-ghost btn-sm" onClick={onGoEmi}>EMI tracker</button></div>
          <div className="card-body row-list">
            {emiDueStudents.slice(0, 6).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} | EMI {formatCurrency(student.emiAmount || 0)} | Due: {student.nextEmiDate ? formatDate(student.nextEmiDate) : "-"}</div></div></div><span className={`tag ${dateInputValue(student.nextEmiDate) <= todayKey ? "red" : "amber"}`}>{dateInputValue(student.nextEmiDate) <= todayKey ? "Overdue" : "Due soon"}</span></button>)}
            {!emiDueStudents.length && <div className="empty-state">No upcoming EMI dues in the next 7 days</div>}
          </div>
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-head"><div><h3>New admissions to onboard</h3><div className="sub">Recent candidates for batch allocation and fee planning</div></div><button className="btn btn-ghost btn-sm" onClick={onGoStudents}>All candidates</button></div>
          <div className="card-body row-list">
            {recentAdmissions.map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} | {student.centre || "-"} | Batch: {student.batch || "Unassigned"}</div></div></div><span className={`tag ${stageTag(student.status)}`}>{student.status}</span></button>)}
            {!recentAdmissions.length && <div className="empty-state">No new admissions needing onboarding</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Certifications & internships</h3><div className="sub">Course completion and hospital postings</div></div><button className="btn btn-ghost btn-sm" onClick={onGoCert}>Certificates</button></div>
          <div className="card-body row-list">
            {certPending.slice(0, 3).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">CR</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - Ready for certificate issue</div></div></div><span className="tag green">Issue cert</span></button>)}
            {internshipActive.slice(0, 3).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">IN</span><div><div className="nm">{student.fullName}</div><div className="mt">{student.internshipAssignment?.facilityName} | {courseShortCode(student.course)}</div></div></div><span className="tag blue">Internship</span></button>)}
            {!certPending.length && !internshipActive.length && <div className="empty-state">No pending certificates or active internships</div>}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div>
            <h3>Inventory & Student Kits</h3>
            <div className="sub">Stock balance for ID cards, T-shirts, bags, and tablets</div>
          </div>
          {onGoInventory && <button className="btn btn-ghost btn-sm" onClick={onGoInventory}>Manage Inventory →</button>}
        </div>
        <div className="card-body">
          <div className="inventory-dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <div style={{ background: "var(--bg-subtle)", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <CreditCard size={14} color="#4F6BFF" /> ID Cards Available
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#4F6BFF" }}>{inventorySummary?.idCards ?? 0}</div>
              <div style={{ fontSize: 11, color: (inventorySummary?.idCards ?? 0) <= 5 ? "#EF4444" : "var(--text-muted)", marginTop: 2 }}>
                {(inventorySummary?.idCards ?? 0) <= 5 ? "Low stock" : "Ready for issuance"}
              </div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Shirt size={14} color="#14B8A6" /> T-Shirts in Stock
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#14B8A6" }}>{inventorySummary?.tshirts?.total ?? 0}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                S:{inventorySummary?.tshirts?.bySize?.S ?? 0} M:{inventorySummary?.tshirts?.bySize?.M ?? 0} L:{inventorySummary?.tshirts?.bySize?.L ?? 0} XL:{inventorySummary?.tshirts?.bySize?.XL ?? 0}
              </div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <ShoppingBag size={14} color="#8B5CF6" /> Bags in Stock
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#8B5CF6" }}>{inventorySummary?.bags ?? 0}</div>
              <div style={{ fontSize: 11, color: (inventorySummary?.bags ?? 0) <= 5 ? "#EF4444" : "var(--text-muted)", marginTop: 2 }}>
                {(inventorySummary?.bags ?? 0) <= 5 ? "Low stock" : "Ready for student kits"}
              </div>
            </div>
            <div style={{ background: "var(--bg-subtle)", padding: 12, borderRadius: 10, border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <Tablet size={14} color="#F5A524" /> Tablets (In Stock / Total)
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#F5A524" }}>
                {inventorySummary?.tablets?.inStock ?? 0} / {inventorySummary?.tablets?.total ?? 0}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                {inventorySummary?.tablets?.assigned ?? 0} assigned to candidates
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardPanel({ summary, funnel, centreStats, students, leads, onOpenLead }: { summary: Summary | null; funnel: { stage: string; count: number }[]; centreStats: { centre: string; leads: number; enrolled: number }[]; students: Student[]; leads: Lead[]; onOpenLead: (lead: Lead) => void }) {
  const activeLeads = summary?.totalLeads || leads.length;
  const enrolled = summary?.enrolled || students.length;
  const conversion = summary?.conversion || (activeLeads ? Math.round((enrolled / Math.max(activeLeads, 1)) * 100) : 0);
  const collected = summary?.revenue || students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
  const due = summary?.pending || students.reduce((sum, student) => sum + dueAmount(student), 0);
  const funnelRows = stages.map((stage) => ({ stage, count: funnel.find((item) => item.stage === stage)?.count || (stage === "Enrolled" ? enrolled : 0) }));
  const maxCount = Math.max(...funnelRows.map((item) => item.count), 1);
  return (
    <>
      <div className="grid-metrics">
        <MetricCard label="Active leads" value={activeLeads} dot="#4F6BFF" delta="this month" />
        <MetricCard label="Enrolled" value={enrolled} dot="#17A673" delta={`+${enrolled} total`} />
        <MetricCard label="Conversion" value={`${conversion}%`} dot="#8B5CF6" delta="lead -> student" />
        <MetricCard label="Collected" value={formatCurrency(collected)} dot="#14B8A6" delta={`across ${students.length} students`} />
        <MetricCard label="Due" value={formatCurrency(due)} dot="#E5484D" delta="pending collection" down />
      </div>
      <div className="two-col">
        <div className="card"><div className="card-head"><div><h3>Admissions funnel</h3><div className="sub">New Lead {"->"} Alumni, current scope</div></div></div><div className="card-body funnel-wrap">
          {funnelRows.map((item) => <div className="funnel-row" key={item.stage}><div className="flabel">{item.stage}</div><div className="funnel-bar-track"><div className="funnel-bar-fill" style={{ width: `${Math.max((item.count / maxCount) * 100, 6)}%` }}><span>{item.count}</span></div></div><div className="fval">{item.count} nos.</div></div>)}
        </div></div>
        <div className="card"><div className="card-head"><div><h3>Performance by centre</h3><div className="sub">Share of enrolled students</div></div></div><div className="card-body chart-body">
          {(() => {
            const centreSlices: DonutSlice[] = centreStats.filter((item) => item.enrolled > 0).map((item, index) => ({ label: item.centre, value: item.enrolled, color: paletteColor(index) }));
            const totalEnrolled = centreSlices.reduce((sum, slice) => sum + slice.value, 0);
            return <><DonutChart data={centreSlices} centerValue={String(totalEnrolled)} centerLabel="Enrolled" /><DonutLegend data={centreSlices} /></>;
          })()}
          {!centreStats.some((item) => item.enrolled > 0) && <div className="empty-state">No centre data</div>}
        </div></div>
      </div>
      <div className="two-col lower-grid">
        <RecentAdmissions students={students} />
        <LeadFollowUps leads={leads} onOpen={onOpenLead} />
        <CollectionStatus students={students} />
      </div>
    </>
  );
}

function SalesCounsellorDashboardPanel({ leads, students, onOpenLead, onGoLeads, onGoAddLead, onGoAdmissions, onOpenStudent }: { leads: Lead[]; students: Student[]; onOpenLead: (lead: Lead) => void; onGoLeads: () => void; onGoAddLead: () => void; onGoAdmissions: () => void; onOpenStudent: (student: Student) => void }) {
  const todayKey = dateInputValue();
  const activeLeads = leads.filter((lead) => !["Enrolled", "Alumni"].includes(lead.stage));
  const hotLeads = leads.filter((lead) => lead.priority === "P0");
  const admissionReady = leads.filter((lead) => lead.stage === "Admission");
  const convertedCandidates = students.filter((student) => student.status);
  const todaysFollowUps = leads
    .filter((lead) => lead.nextFollowUp && dateInputValue(lead.nextFollowUp) <= todayKey)
    .sort((a, b) => new Date(a.nextFollowUp || "").getTime() - new Date(b.nextFollowUp || "").getTime());
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0).getTime() - new Date(a.updatedAt || a.createdAt || 0).getTime())
    .slice(0, 6);
  const stageRows = stages.slice(0, 5).map((stage) => ({ stage, count: leads.filter((lead) => lead.stage === stage).length }));
  const maxStageCount = Math.max(...stageRows.map((item) => item.count), 1);

  return (
    <>
      <div className="grid-metrics">
        <MetricCard label="My leads" value={leads.length} dot="#4F6BFF" delta="assigned to me" />
        <MetricCard label="Active pipeline" value={activeLeads.length} dot="#17A673" delta="open lead stages" />
        <MetricCard label="Followups due" value={todaysFollowUps.length} dot="#F5A524" delta="today / overdue" down={todaysFollowUps.length > 0} />
        <MetricCard label="Admission ready" value={admissionReady.length} dot="#8B5CF6" delta="ready to enroll" />
        <MetricCard label="P0 hot leads" value={hotLeads.length} dot="#E5484D" delta="highest priority" down={hotLeads.length > 0} />
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-head"><div><h3>Lead followups</h3><div className="sub">Calls and WhatsApp due now</div></div><button className="btn btn-primary btn-sm" onClick={onGoLeads}>Open leads</button></div>
          <div className="card-body row-list">
            {todaysFollowUps.slice(0, 7).map((lead) => <button className="crow row-button" key={lead._id} onClick={() => onOpenLead(lead)}><div className="who"><span className="mini">{initials(lead.fullName)}</span><div><div className="nm">{lead.fullName}</div><div className="mt">{lead.phone} - {formatDateTime(lead.nextFollowUp)}</div></div></div><span className={`tag ${followUpTagClass(lead.nextFollowUp)}`}>{followUpDueLabel(lead.nextFollowUp)}</span></button>)}
            {!todaysFollowUps.length && <div className="empty-state">No lead followups due today</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Admission actions</h3><div className="sub">Move converted leads into batches</div></div><button className="btn btn-ghost btn-sm" onClick={onGoAdmissions}>Admissions</button></div>
          <div className="card-body row-list">
            {admissionReady.slice(0, 7).map((lead) => <button className="crow row-button" key={lead._id} onClick={() => onOpenLead(lead)}><div className="who"><span className="mini">{initials(lead.fullName)}</span><div><div className="nm">{lead.fullName}</div><div className="mt">{courseShortCode(lead.course)} - {lead.centre || "-"}</div></div></div><span className="tag purple">Admission</span></button>)}
            {!admissionReady.length && <div className="empty-state">No leads waiting for admission</div>}
          </div>
        </div>
      </div>
      <div className="two-col lower-grid">
        <div className="card">
          <div className="card-head"><div><h3>Lead status split</h3><div className="sub">Current sales pipeline</div></div><button className="btn btn-ghost btn-sm" onClick={onGoAddLead}>Add lead</button></div>
          <div className="card-body funnel-wrap">
            {stageRows.map((item) => <div className="funnel-row" key={item.stage}><div className="flabel">{item.stage}</div><div className="funnel-bar-track"><div className="funnel-bar-fill" style={{ width: `${Math.max((item.count / maxStageCount) * 100, 6)}%` }}><span>{item.count}</span></div></div><div className="fval">{item.count} nos.</div></div>)}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Recently updated</h3><div className="sub">Latest lead and candidate activity</div></div></div>
          <div className="card-body row-list">
            {recentLeads.slice(0, 4).map((lead) => <button className="crow row-button" key={lead._id} onClick={() => onOpenLead(lead)}><div className="who"><span className="mini">{initials(lead.fullName)}</span><div><div className="nm">{lead.fullName}</div><div className="mt">{lead.leadFeedback || "New"} - {leadPriorityLabel(lead.priority)}</div></div></div><span className={`tag ${stageTag(lead.stage)}`}>{lead.stage}</span></button>)}
            {convertedCandidates.slice(0, Math.max(0, 6 - Math.min(recentLeads.length, 4))).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - {student.batch || "No batch"}</div></div></div><span className={`tag ${stageTag(student.status)}`}>{student.status}</span></button>)}
            {!recentLeads.length && !convertedCandidates.length && <div className="empty-state">No assigned activity yet</div>}
          </div>
        </div>
      </div>
    </>
  );
}

function MetricCard({ label, value, dot, delta, down = false, valueColor }: { label: string; value: string | number; dot: string; delta: string; down?: boolean; valueColor?: string }) {
  return <div className="metric-card"><div className="m-label"><span className="m-dot" style={{ background: dot }} />{label}</div><div className="m-value" style={valueColor ? { color: valueColor } : undefined}>{value}</div><div className={`m-delta ${down ? "down" : "up"}`}>{delta}</div></div>;
}

function TeacherDashboardPanel({ batches, students, sessions, schedules, topicProgress, practicalRecords, user, googleCalendarStatus, calendarSyncing, onConnectCalendar, onDisconnectCalendar, onSyncCalendar, onOpenStudent, onOpenBatch }: { batches: Batch[]; students: Student[]; sessions: ClassSession[]; schedules: ClassSchedule[]; topicProgress: TopicProgress[]; practicalRecords: PracticalRecord[]; user: AdminUser | null; googleCalendarStatus: GoogleCalendarStatus | null; calendarSyncing: boolean; onConnectCalendar: () => void; onDisconnectCalendar: () => void; onSyncCalendar: () => void; onOpenStudent: (student: Student) => void; onOpenBatch: (batchId: string, sessionId?: string) => void }) {
  const teacherName = user?.name || "";
  const today = dateInputValue();
  const todayDay = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date());
  const assignedBatches = batches.filter((batch) => batch.assignedFaculty?.includes(teacherName) || schedules.some((schedule) => schedule.faculty === teacherName && (String(schedule.batchId) === batch._id || schedule.batchName === batch.name)));
  const assignedBatchNames = assignedBatches.map((batch) => batch.name);
  const todaySessions = sessions
    .filter((session) => assignedBatchNames.includes(session.batchName) && dateInputValue(session.date) === today)
    .sort((a, b) => `${a.startTime}-${a.batchName}`.localeCompare(`${b.startTime}-${b.batchName}`));
  const todaySchedulePreview = schedules
    .filter((schedule) => assignedBatchNames.includes(schedule.batchName) && schedule.classType === "Regular Class" && schedule.days?.includes(todayDay))
    .filter((schedule) => !todaySessions.some((session) => String(session.scheduleId || "") === schedule._id || (session.batchName === schedule.batchName && session.startTime === schedule.startTime)))
    .sort((a, b) => `${a.startTime}-${a.batchName}`.localeCompare(`${b.startTime}-${b.batchName}`));
  const pendingAttendance = todaySessions.filter((session) => !session.attendanceMarked);
  const pendingTopics = topicProgress.filter((topic) => assignedBatchNames.includes(topic.batchName || "") && topic.status !== "Covered");
  const pendingPracticals = practicalRecords.filter((record) => assignedBatchNames.includes(record.batchName || "") && record.status !== "Completed");
  const activeStudents = students.filter((student) => assignedBatchNames.includes(student.batch || ""));

  return (
    <>
      <div className="grid-metrics">
        <MetricCard label="Assigned batches" value={assignedBatches.length} dot="#4F6BFF" delta="linked to my faculty account" />
        <MetricCard label="Today classes" value={todaySessions.length + todaySchedulePreview.length} dot="#17A673" delta={formatDate(today)} />
        <MetricCard label="Attendance pending" value={pendingAttendance.length} dot="#F5A524" delta="classes not marked" down={pendingAttendance.length > 0} />
        <MetricCard label="Topics pending" value={pendingTopics.length} dot="#8B5CF6" delta="not covered yet" down={pendingTopics.length > 0} />
        <MetricCard label="Practicals pending" value={pendingPracticals.length} dot="#14B8A6" delta="student records" down={pendingPracticals.length > 0} />
      </div>

      <div className="card calendar-connect-card">
        <div>
          <h3>Google Calendar</h3>
          <div className="sub">
            {!googleCalendarStatus?.configured
              ? "Google Calendar API credentials are not configured."
              : googleCalendarStatus.connected
                ? `Connected${googleCalendarStatus.email ? ` as ${googleCalendarStatus.email}` : ""}. Generated classes sync automatically.`
                : "Connect once to sync generated class dates to your calendar."}
          </div>
        </div>
        {googleCalendarStatus?.configured && (
          googleCalendarStatus.connected
            ? <div className="calendar-connect-actions"><button type="button" className="btn btn-primary btn-sm" disabled={calendarSyncing} onClick={onSyncCalendar}>{calendarSyncing ? <RefreshCw size={14} className="spin-icon" /> : <CalendarDays size={14} />} {calendarSyncing ? "Syncing..." : "Sync classes"}</button><button type="button" className="btn btn-ghost btn-sm" disabled={calendarSyncing} onClick={onDisconnectCalendar}>Disconnect</button></div>
            : <button type="button" className="btn btn-primary btn-sm" onClick={onConnectCalendar}><CalendarDays size={14} /> Connect calendar</button>
        )}
      </div>

      <div className="card teacher-batches-card">
        <div className="card-head"><div><h3>My batches</h3><div className="sub">Assigned batches from admin settings</div></div></div>
        <div className="card-body batch-card-grid teacher-batch-grid">
          {assignedBatches.map((batch) => {
            const studentCount = activeStudents.filter((student) => student.batch === batch.name).length;
            const batchPendingTopics = pendingTopics.filter((topic) => topic.batchName === batch.name).length;
            const batchPendingPracticals = pendingPracticals.filter((record) => record.batchName === batch.name).length;
            return (
              <button type="button" key={batch._id} className="batch-select-card" onClick={() => onOpenBatch(batch._id)}>
                <div className="batch-select-top"><span className="tag blue">{courseShortCode(batch.course)}</span><span className="cell-sub">{batch.centre || "-"}</span></div>
                <h3>{batch.name}</h3>
                <div className="cell-sub">Open batch detail for timetable, attendance and progress</div>
                <div className="batch-select-stats">
                  <span><b>{studentCount}</b> students</span>
                  <span><b>{batchPendingTopics}</b> topics</span>
                  <span><b>{batchPendingPracticals}</b> practicals</span>
                </div>
              </button>
            );
          })}
          {!assignedBatches.length && <div className="batch-empty-card"><div className="empty-state"><h4>No assigned batches</h4><p>Ask admin to assign faculty in batch settings.</p></div></div>}
        </div>
      </div>

      <div className="two-col teacher-action-grid">
        <div className="card">
          <div className="card-head"><div><h3>Today's classes</h3><div className="sub">Quick attendance actions for assigned batches</div></div></div>
          <div className="card-body row-list teacher-row-list">
            {todaySessions.map((session) => {
              const batch = assignedBatches.find((item) => item.name === session.batchName || item._id === String(session.batchId));
              return (
                <button className="crow row-button" key={session._id} onClick={() => batch && onOpenBatch(batch._id, session._id)}>
                  <div className="who"><span className="mini">{courseShortCode(session.course)}</span><div><div className="nm">{session.batchName}</div><div className="mt">{session.startTime} - {session.endTime} | {session.nature}{session.note ? ` | ${session.note}` : ""}</div></div></div>
                  <span className={`tag ${session.attendanceMarked ? "green" : "amber"}`}>{session.attendanceMarked ? "Marked" : "Mark now"}</span>
                </button>
              );
            })}
            {todaySchedulePreview.map((schedule) => {
              const batch = assignedBatches.find((item) => item.name === schedule.batchName || item._id === String(schedule.batchId));
              return (
                <button className="crow row-button" key={schedule._id} onClick={() => batch && onOpenBatch(batch._id)}>
                  <div className="who"><span className="mini">{courseShortCode(schedule.course)}</span><div><div className="nm">{schedule.batchName}</div><div className="mt">{schedule.startTime} - {schedule.endTime} | {schedule.nature}{schedule.note ? ` | ${schedule.note}` : ""}</div></div></div>
                  <span className="tag blue">Generate class</span>
                </button>
              );
            })}
            {!todaySessions.length && !todaySchedulePreview.length && <div className="empty-state">No classes scheduled today</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Pending academic updates</h3><div className="sub">Topics and practicals needing action</div></div></div>
          <div className="card-body row-list teacher-row-list">
            {pendingTopics.slice(0, 4).map((topic) => {
              const batch = assignedBatches.find((item) => item.name === topic.batchName || item._id === String(topic.batchId));
              return <button className="crow row-button" key={`${topic.batchId}-${topic.module}-${topic.topic}`} onClick={() => batch && onOpenBatch(batch._id)}><div className="who"><span className="mini">TP</span><div><div className="nm">{topic.topic}</div><div className="mt">{topic.batchName} | {topic.module}</div></div></div><span className="tag purple teacher-update-tag">{topic.status}</span></button>;
            })}
            {pendingPracticals.slice(0, 4).map((record) => {
              const student = activeStudents.find((item) => item._id === String(record.studentId));
              const batch = assignedBatches.find((item) => item.name === record.batchName || item._id === String(record.batchId));
              return <button className="crow row-button" key={`${record.batchId}-${record.practicalName}-${record.studentId}`} onClick={() => batch && onOpenBatch(batch._id)}><div className="who"><span className="mini">PR</span><div><div className="nm">{record.practicalName}</div><div className="mt">{student?.fullName || record.studentName || "Student"} | {record.batchName}</div></div></div><span className="tag amber teacher-update-tag">{record.status}</span></button>;
            })}
            {!pendingTopics.length && !pendingPracticals.length && <div className="empty-state">All topics and practicals are up to date</div>}
          </div>
        </div>
      </div>

      <div className="two-col lower-grid">
        <div className="card">
          <div className="card-head"><div><h3>My students</h3><div className="sub">Students in assigned batches</div></div></div>
          <div className="card-body row-list">
            {activeStudents.slice(0, 6).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} | {student.batch || "No batch"}</div></div></div><span className={`tag ${stageTag(student.status)}`}>{student.status}</span></button>)}
            {!activeStudents.length && <div className="empty-state">No students in assigned batches</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Internship logbook review</h3><div className="sub">Phase 3 LMS flow</div></div></div>
          <div className="card-body"><div className="empty-state">Will appear after internship assignment and student logbook module is added</div></div>
        </div>
      </div>
    </>
  );
}

function CounsellorDashboardPanel({ students, attendance, attendanceDate, onOpenStudent, onGoAttendance, onGoStudents }: { students: Student[]; attendance: Attendance[]; attendanceDate: string; onOpenStudent: (student: Student) => void; onGoAttendance: () => void; onGoStudents: () => void }) {
  const todayKey = dateInputValue();
  const activeStudents = students.filter((student) => ["Admission Completed", "Fees Decided", "Fees Collected", "Active Student"].includes(normalizeStudentStatus(student.status)));
  const completedStudents = students.filter((student) => ["Course Completed", "Alumni"].includes(student.status));
  const attendanceMarkedIds = new Set(attendance.filter((record) => dateInputValue(record.date || attendanceDate) === attendanceDate).map((record) => String(record.studentId)));
  const attendancePending = activeStudents.filter((student) => !attendanceMarkedIds.has(student._id));
  const feedbackPending = activeStudents.filter((student) => {
    const latest = (student.feedbacks || [])[0];
    if (!latest?.at) return true;
    const latestDate = new Date(latest.at);
    if (Number.isNaN(latestDate.getTime())) return true;
    const diffDays = Math.floor((Date.now() - latestDate.getTime()) / 86400000);
    return diffDays >= 7;
  });
  const recentFeedbackStudents = [...students]
    .sort((a, b) => new Date((b.feedbacks || [])[0]?.at || b.updatedAt || b.createdAt || 0).getTime() - new Date((a.feedbacks || [])[0]?.at || a.updatedAt || a.createdAt || 0).getTime())
    .slice(0, 6);

  return (
    <>
      <div className="grid-metrics">
        <MetricCard label="My candidates" value={students.length} dot="#4F6BFF" delta="assigned to me" />
        <MetricCard label="Active students" value={activeStudents.length} dot="#17A673" delta="admission / active student" />
        <MetricCard label="Attendance pending" value={attendancePending.length} dot="#F5A524" delta={attendanceDate === todayKey ? "today" : formatDate(attendanceDate)} down={attendancePending.length > 0} />
        <MetricCard label="Feedback pending" value={feedbackPending.length} dot="#8B5CF6" delta="no recent conversation" down={feedbackPending.length > 0} />
        <MetricCard label="Completed" value={completedStudents.length} dot="#14B8A6" delta="course completed / alumni" />
      </div>
      <div className="two-col">
        <div className="card">
          <div className="card-head"><div><h3>Attendance action</h3><div className="sub">Candidates not marked for selected date</div></div><button className="btn btn-primary btn-sm" onClick={onGoAttendance}>Mark attendance</button></div>
          <div className="card-body row-list">
            {attendancePending.slice(0, 7).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - {student.batch || "No batch"}</div></div></div><span className="tag amber">Pending</span></button>)}
            {!attendancePending.length && <div className="empty-state">Attendance is clear for selected date</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Feedback conversations</h3><div className="sub">Candidates needing a fresh update</div></div><button className="btn btn-ghost btn-sm" onClick={onGoStudents}>Open candidates</button></div>
          <div className="card-body row-list">
            {feedbackPending.slice(0, 7).map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{student.feedbacks?.[0]?.at ? `Last: ${formatDate(student.feedbacks[0].at)}` : "No feedback yet"}</div></div></div><span className="tag purple">Update</span></button>)}
            {!feedbackPending.length && <div className="empty-state">All active candidates have recent feedback</div>}
          </div>
        </div>
      </div>
      <div className="two-col lower-grid">
        <div className="card">
          <div className="card-head"><div><h3>My candidate status</h3><div className="sub">Current assigned candidate split</div></div></div>
          <div className="card-body funnel-wrap">
            {studentStatuses.map((status) => {
              const count = students.filter((student) => normalizeStudentStatus(student.status) === status).length;
              const max = Math.max(...studentStatuses.map((item) => students.filter((student) => normalizeStudentStatus(student.status) === item).length), 1);
              return <div className="funnel-row" key={status}><div className="flabel">{studentStatusLabel(status)}</div><div className="funnel-bar-track"><div className="funnel-bar-fill" style={{ width: `${Math.max((count / max) * 100, 6)}%` }}><span>{count}</span></div></div><div className="fval">{count} nos.</div></div>;
            })}
          </div>
        </div>
        <div className="card">
          <div className="card-head"><div><h3>Recently updated candidates</h3><div className="sub">Latest profile or feedback activity</div></div></div>
          <div className="card-body row-list">
            {recentFeedbackStudents.map((student) => <button className="crow row-button" key={student._id} onClick={() => onOpenStudent(student)}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - {student.feedbacks?.[0]?.status || student.status}</div></div></div><span className={`tag ${stageTag(student.status)}`}>{student.status}</span></button>)}
            {!recentFeedbackStudents.length && <div className="empty-state">No candidates assigned yet</div>}
          </div>
        </div>
      </div>
    </>
  );
}

function RecentAdmissions({ students }: { students: Student[] }) {
  return <div className="card"><div className="card-head"><div><h3>Recent admissions</h3><div className="sub">Latest enrolled students</div></div></div><div className="card-body row-list">{students.slice(0, 6).map((student) => <div className="crow" key={student._id}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{courseShortCode(student.course)} - {student.centre || "-"}</div></div></div><span className={`tag ${stageTag(student.status)}`}>{student.status}</span></div>)}{!students.length && <div className="empty-state">No recent admissions</div>}</div></div>;
}

function LeadFollowUps({ leads, onOpen }: { leads: Lead[]; onOpen: (lead: Lead) => void }) {
  const followUps = leads
    .filter((lead) => lead.nextFollowUp)
    .sort((a, b) => new Date(a.nextFollowUp || "").getTime() - new Date(b.nextFollowUp || "").getTime())
    .slice(0, 6);
  return <div className="card"><div className="card-head"><div><h3>Lead follow-ups</h3><div className="sub">Upcoming lead follow-up dates</div></div></div><div className="card-body row-list">{followUps.map((lead) => <button className="crow row-button" key={lead._id} onClick={() => onOpen(lead)}><div className="who"><span className="mini">{initials(lead.fullName)}</span><div><div className="nm">{lead.fullName}</div><div className="mt">{courseShortCode(lead.course)} - {formatDateTime(lead.nextFollowUp)}</div></div></div><span className={`tag ${followUpTagClass(lead.nextFollowUp)}`}>{followUpDueLabel(lead.nextFollowUp)}</span></button>)}{!followUps.length && <div className="empty-state">No lead follow-ups</div>}</div></div>;
}

function CollectionStatus({ students }: { students: Student[] }) {
  const paid = students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
  const due = students.reduce((sum, student) => sum + dueAmount(student), 0);
  const slices: DonutSlice[] = [
    { label: "Collected", value: paid, color: "#17A673" },
    { label: "Due", value: due, color: "#E5484D" },
  ];
  const collectedPct = paid + due > 0 ? Math.round((paid / (paid + due)) * 100) : 0;
  return <div className="card"><div className="card-head"><div><h3>Collection status</h3><div className="sub">Paid vs due, this scope</div></div></div><div className="card-body chart-body">
    <DonutChart data={slices} centerValue={`${collectedPct}%`} centerLabel="Collected" />
    <DonutLegend data={slices} formatValue={formatCurrency} />
  </div></div>;
}

function InternshipPanel({ students, user, onPreviewPhoto, onReviewLogbook }: { students: Student[]; user: AdminUser | null; onPreviewPhoto: (student: Student, log: InternshipLog, photoType: "login" | "logout") => void; onReviewLogbook: (student: Student, entry: LogbookEntry, verified?: boolean, supervisorRemark?: string) => void }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState(dateInputValue());
  const [logbookStatus, setLogbookStatus] = useState("pending");
  const [internshipTab, setInternshipTab] = useState<"logs" | "logbook">("logs");
  const todayKey = dateInputValue();
  const assignedStudents = students.filter((student) => student.internshipAssignment);
  const rows = assignedStudents.flatMap((student) => (student.internshipLogs || []).map((log) => ({ student, log, gps: gpsMatchInfo(log, student.internshipAssignment) })));
  const logbookRows = assignedStudents.flatMap((student) => (student.logbookEntries || []).map((entry) => ({ student, entry })));
  const todayRows = rows.filter(({ log }) => dateInputValue(log.date) === todayKey);
  const filteredRows = rows.filter(({ student, log, gps }) => {
    const text = `${student.fullName} ${student.admissionNumber || ""} ${student.batch || ""} ${student.centre || ""} ${student.internshipAssignment?.facilityName || ""}`.toLowerCase();
    const logState = log.loginAt && log.logoutAt ? "completed" : log.loginAt ? "pendingLogout" : "pendingLogin";
    return (!query || text.includes(query.toLowerCase())) && (!date || dateInputValue(log.date) === date) && (status === "all" || status === logState || (status === "gpsReview" && ["Location differs", "GPS needs review"].includes(gps.label)));
  });
  const pendingLogout = todayRows.filter(({ log }) => log.loginAt && !log.logoutAt).length;
  const completedToday = todayRows.filter(({ log }) => log.loginAt && log.logoutAt).length;
  const gpsReview = rows.filter(({ gps }) => ["Location differs", "GPS needs review"].includes(gps.label)).length;
  const pendingLogbooks = logbookRows.filter(({ entry }) => !entry.verified).length;
  const filteredLogbooks = logbookRows.filter(({ student, entry }) => {
    const text = `${student.fullName} ${student.admissionNumber || ""} ${student.batch || ""} ${entry.departmentArea || ""}`.toLowerCase();
    return (!query || text.includes(query.toLowerCase())) && (logbookStatus === "all" || (logbookStatus === "pending" ? !entry.verified : Boolean(entry.verified)));
  });
  const scopeCopy = user?.role?.includes("teacher") ? "assigned students only" : user?.role === "superadmin" ? "all centres" : "current centre scope";

  return (
    <div className="internship-panel">
      <div className="grid-metrics internship-metrics">
        <MetricCard label="Assigned internships" value={assignedStudents.length} dot="#4F6BFF" delta={scopeCopy} />
        <MetricCard label="Logged in today" value={todayRows.filter(({ log }) => log.loginAt).length} dot="#14B8A6" delta="duty started" />
        <MetricCard label="Pending logout" value={pendingLogout} dot="#F5A524" delta="logout pending" down={pendingLogout > 0} />
        <MetricCard label="GPS review" value={gpsReview} dot="#E5484D" delta="needs check" down={gpsReview > 0} />
        <MetricCard label="Logbook review" value={pendingLogbooks} dot="#8B5CF6" delta="pending faculty review" down={pendingLogbooks > 0} />
      </div>
      <div className="pill-tabs internship-tabs">
        <button type="button" className={`pill-tab ${internshipTab === "logs" ? "active" : ""}`} onClick={() => setInternshipTab("logs")}>Attendance logs</button>
        <button type="button" className={`pill-tab ${internshipTab === "logbook" ? "active" : ""}`} onClick={() => setInternshipTab("logbook")}>Logbook review {pendingLogbooks > 0 && <em className="tab-badge">{pendingLogbooks}</em>}</button>
      </div>
      {internshipTab === "logs" && <div className="card internship-monitor-card">
        <div className="card-head">
          <div><h3>Internship monitoring</h3><div className="sub">{completedToday} completed today</div></div>
          <span className="badge badge-blue">{filteredRows.length} records</span>
        </div>
        <div className="card-body internship-monitor-body">
          <div className="filter-bar internship-filter-bar">
            <div className="fbtn internship-search-field"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search student, batch, hospital..." /></div>
            <input className="fbtn internship-date-input" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            <select className="fbtn" value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All logs</option>
              <option value="completed">Completed</option>
              <option value="pendingLogout">Pending logout</option>
              <option value="pendingLogin">Pending login</option>
              <option value="gpsReview">GPS review</option>
            </select>
          </div>
          <div className="table-wrap internship-monitor-table-wrap">
            <table className="internship-monitor-table">
              <thead><tr><th>Student</th><th>Hospital</th><th>Date</th><th>Log in</th><th>Log out</th><th>Hours</th><th>Selfies</th><th>GPS</th></tr></thead>
              <tbody>
                {filteredRows.map(({ student, log, gps }) => (
                  <tr key={`${student._id}-${log._id}`}>
                    <td><div className="lead-name-cell internship-student-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || "-"} | {student.batch || "No batch"}</div></div></div></td>
                    <td className="internship-hospital-cell">{student.internshipAssignment?.facilityName || "-"}<div className="cell-sub">{student.internshipAssignment?.facilityLocation || student.centre || "-"}</div></td>
                    <td className="mono">{formatDate(log.date)}</td>
                    <td className="mono">{formatDateTime(log.loginAt)}</td>
                    <td className="mono">{formatDateTime(log.logoutAt)}</td>
                    <td className="mono">{log.hours ? `${log.hours}h` : "-"}</td>
                    <td><div className="action-icons">{log.loginPhoto?.storedName && <button type="button" className="action-icon-btn action-icon-primary" title="View login selfie" onClick={() => onPreviewPhoto(student, log, "login")}><Eye size={14} /></button>}{log.logoutPhoto?.storedName && <button type="button" className="action-icon-btn action-icon-primary" title="View logout selfie" onClick={() => onPreviewPhoto(student, log, "logout")}><Eye size={14} /></button>}{!log.loginPhoto?.storedName && !log.logoutPhoto?.storedName && <span className="cell-sub">Missing</span>}</div></td>
                    <td className="internship-gps-status"><span className={`badge ${gps.badge}`}>{gps.label}</span><div className="cell-sub">{gps.detail}</div></td>
                  </tr>
                ))}
                {!filteredRows.length && <tr><td colSpan={8}><div className="empty-state"><h4>No internship logs found</h4><p>Logs will appear here after students start internship attendance.</p></div></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      {internshipTab === "logbook" && <div className="card internship-logbook-card">
        <div className="card-head">
          <div><h3>Logbook review</h3><div className="sub">{user?.role?.includes("teacher") ? "Assigned students only" : "Student internship entries"}</div></div>
          <div className="segmented tiny">
            <button type="button" className={logbookStatus === "pending" ? "active" : ""} onClick={() => setLogbookStatus("pending")}>Pending</button>
            <button type="button" className={logbookStatus === "verified" ? "active" : ""} onClick={() => setLogbookStatus("verified")}>Verified</button>
            <button type="button" className={logbookStatus === "all" ? "active" : ""} onClick={() => setLogbookStatus("all")}>All</button>
          </div>
        </div>
        <div className="card-body internship-logbook-list">
          {filteredLogbooks.map(({ student, entry }) => (
            <article className="internship-logbook-item" key={`${student._id}-${entry._id}`}>
              <div className="lead-name-cell internship-student-cell">
                <span className="avatar lead-avatar">{initials(student.fullName)}</span>
                <div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || "-"} | {student.batch || "No batch"}</div></div>
              </div>
              <div className="internship-logbook-content">
                <div className="internship-logbook-top"><b>{entry.departmentArea || "Internship entry"}</b><span>{formatDate(entry.date)}</span></div>
                <div className="internship-logbook-notes">
                  <div><span>Activities</span><p>{entry.activitiesPerformed || "-"}</p></div>
                  <div><span>Key learnings</span><p>{entry.keyLearnings || "-"}</p></div>
                  {entry.challenges && <div><span>Questions</span><p>{entry.challenges}</p></div>}
                </div>
              </div>
              <div className="internship-logbook-actions">
                <span className={`badge ${entry.verified ? "badge-green" : "badge-amber"}`}>{entry.verified ? "Verified" : "Pending Review"}</span>
                {entry.verified ? (
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => onReviewLogbook(student, entry, false)}><RefreshCw size={14} /> Reopen</button>
                ) : (
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => onReviewLogbook(student, entry, true)}><CheckCircle2 size={14} /> Verify</button>
                )}
              </div>
            </article>
          ))}
          {!filteredLogbooks.length && <div className="empty-state"><h4>No logbook entries found</h4><p>Student logbook entries will appear here after internship starts.</p></div>}
        </div>
      </div>}
    </div>
  );
}

type LeadFilters = { q: string; stage: string; centre: string; course: string; counsellor: string; leadFeedback: string };

function LeadsPanel(props: {
  leads: Lead[];
  students: Student[];
  batches: Batch[];
  meta: PaginationMeta | null;
  filters: LeadFilters;
  setFilters: (filters: LeadFilters) => void;
  centres: string[];
  courses: string[];
  canAssign: boolean;
  canDelete: boolean;
  counsellors: Counsellor[];
  onSearch: () => void;
  onPage: (page: number) => void;
  onPatch: (id: string, updates: Partial<Lead>) => void;
  onDelete: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onAddLead: () => void;
  onImportExcel: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpen: (lead: Lead) => void;
  onBulkAssignCentre?: (ids: string[], centre: string) => Promise<void>;
  onBulkDelete?: (ids: string[], onSuccess?: () => void) => void;
}) {
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [bulkCentre, setBulkCentre] = useState("");
  const [isBulkAssigning, setIsBulkAssigning] = useState(false);

  const counsellorNames = (props.counsellors.length
    ? props.counsellors.map((counsellor) => counsellor.name)
    : (Array.from(new Set(props.leads.map((lead) => lead.counsellor).filter(Boolean))) as string[])
  ).filter((name) => name && name !== "Unassigned");

  const filteredLeads = useMemo(() => {
    return props.leads.filter((lead) => {
      if (props.filters.stage && lead.stage !== props.filters.stage) return false;
      if (props.filters.leadFeedback && normalizeLeadFeedbackStatus(lead.leadFeedback) !== normalizeLeadFeedbackStatus(props.filters.leadFeedback)) return false;
      if (props.filters.centre && lead.centre !== props.filters.centre) return false;
      if (props.filters.counsellor) {
        const owner = leadOwnerForDisplay(lead, props.students, props.batches) || lead.counsellor;
        if (props.filters.counsellor === "Unassigned") {
          if (owner && owner !== "Unassigned") return false;
        } else if (owner !== props.filters.counsellor) {
          return false;
        }
      }
      if (props.filters.q) {
        const query = props.filters.q.trim().toLowerCase();
        const matches = [lead.fullName, lead.phone, lead.email, lead.course, lead.centre, lead.counsellor, lead.studentLocation, lead.city].some((v) => String(v || "").toLowerCase().includes(query));
        if (!matches) return false;
      }
      return true;
    });
  }, [props.leads, props.filters.stage, props.filters.leadFeedback, props.filters.centre, props.filters.counsellor, props.filters.q, props.students, props.batches]);

  const handleToggleSelect = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    const visibleIds = filteredLeads.map((l) => l._id);
    const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedLeadIds.includes(id));
    if (allSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedLeadIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const handleExecuteBulkAssign = async () => {
    if (!selectedLeadIds.length || !bulkCentre || !props.onBulkAssignCentre) return;
    setIsBulkAssigning(true);
    try {
      await props.onBulkAssignCentre(selectedLeadIds, bulkCentre);
      setSelectedLeadIds([]);
      setBulkCentre("");
    } catch {
      // toast shown in bulkAssignLeadCentre
    } finally {
      setIsBulkAssigning(false);
    }
  };

  const handleExecuteBulkDelete = () => {
    if (!selectedLeadIds.length || !props.onBulkDelete) return;
    props.onBulkDelete(selectedLeadIds, () => setSelectedLeadIds([]));
  };

  return (
    <div className="leads-prototype">
      <div className="filter-bar leads-filter-bar">
        <input className="fbtn lead-search-input" value={props.filters.q} onChange={(event) => { props.setFilters({ ...props.filters, q: event.target.value }); props.onPage(1); }} onKeyDown={(event) => { if (event.key === "Enter") props.onSearch(); }} placeholder="Search leads..." />
        <select className="fbtn" value={props.filters.stage} onChange={(event) => { props.setFilters({ ...props.filters, stage: event.target.value }); props.onPage(1); }}><option value="">All stages</option>{stages.slice(0, 4).map((stage) => <option key={stage}>{stage}</option>)}</select>
        <select className="fbtn" value={props.filters.leadFeedback} onChange={(event) => { props.setFilters({ ...props.filters, leadFeedback: event.target.value }); props.onPage(1); }}><option value="">All statuses</option>{leadFeedbackOptions.map((feedback) => <option key={feedback}>{feedback}</option>)}</select>
        <select className="fbtn" value={props.filters.centre} onChange={(event) => { props.setFilters({ ...props.filters, centre: event.target.value }); props.onPage(1); }}><option value="">All centres</option>{props.centres.map((centre) => <option key={centre}>{centre}</option>)}</select>
        <select className="fbtn" value={props.filters.counsellor} onChange={(event) => { props.setFilters({ ...props.filters, counsellor: event.target.value }); props.onPage(1); }}>
          <option value="">All counsellors</option>
          <option value="Unassigned">Unassigned</option>
          {counsellorNames.map((name) => <option key={name} value={name}>{name}</option>)}
        </select>
        <div className="filter-spacer" />
        <button className="btn btn-ghost" onClick={() => downloadExcelFile(["Lead", "Contact", "Course", "Source", "Centre", "Counsellor", "Stage", "Priority", "Next follow-up"], filteredLeads.map((lead) => [lead.fullName, lead.phone, lead.course, lead.source, lead.centre, leadOwnerForDisplay(lead, props.students, props.batches) || "Unassigned", lead.stage, leadPriorityLabel(lead.priority), formatDate(lead.updatedAt || lead.createdAt)]), "imed-leads")}><Download size={15} /> Download Excel</button>
        <label className="btn btn-ghost file-upload-btn">Upload Excel<input type="file" accept=".xlsx,.xls,.csv" onChange={props.onImportExcel} /></label>
        <button className="btn btn-primary" onClick={props.onAddLead}><Plus size={15} /> Add lead</button>
      </div>

      {selectedLeadIds.length > 0 && (
        <div className="leads-bulk-bar">
          <div className="leads-bulk-count">
            <CheckSquare size={16} />
            <span><strong>{selectedLeadIds.length}</strong> lead{selectedLeadIds.length > 1 ? "s" : ""} selected</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setSelectedLeadIds([])}>Clear</button>
          <div className="leads-bulk-actions">
            {props.canAssign && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <select
                  className="fbtn mini-select"
                  value={bulkCentre}
                  onChange={(e) => setBulkCentre(e.target.value)}
                  style={{ height: 32, minWidth: 150 }}
                >
                  <option value="">Bulk assign centre...</option>
                  {props.centres.map((centre) => (
                    <option key={centre} value={centre}>{centre}</option>
                  ))}
                </select>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={!bulkCentre || isBulkAssigning}
                  onClick={handleExecuteBulkAssign}
                >
                  {isBulkAssigning ? "Assigning..." : "Assign Centre"}
                </button>
              </div>
            )}
            {props.canDelete && (
              <button
                className="btn btn-danger btn-sm"
                onClick={handleExecuteBulkDelete}
              >
                <Trash2 size={14} />
                <span>Delete selected ({selectedLeadIds.length})</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="card leads-card">
        <LeadTable
          {...props}
          leads={filteredLeads}
          showAction={false}
          selectedLeadIds={selectedLeadIds}
          onToggleSelect={handleToggleSelect}
          onToggleSelectAll={handleToggleSelectAll}
        />
      </div>
      <Pager meta={props.meta} label="leads" onPage={props.onPage} />
    </div>
  );
}

function AdmissionsPanel(props: { leads: Lead[]; batches: Batch[]; canAssign: boolean; counsellors: Counsellor[]; centres: string[]; onPatch: (id: string, updates: Partial<Lead>) => void; onConvert: (lead: Lead, batch?: string) => void; onOpen: (lead: Lead) => void }) {
  const [batchDrafts, setBatchDrafts] = useState<Record<string, string>>({});
  return (
    <div className="admissions-prototype">
      <div className="pill-tabs admissions-tabs">
        <button className="pill-tab active">Ready for admission ({props.leads.length})</button>
      </div>
      <div className="card admissions-card">
        <div className="table-wrap admissions-table-wrap">
          <table className="admissions-table">
            <thead><tr><th>Lead</th><th>Course</th><th>Centre</th><th>Counsellor</th><th>Stage</th><th>Expected fee</th><th>Batch</th><th /></tr></thead>
            <tbody>
              {props.leads.map((lead) => {
                const batchOptions = props.batches.filter((batch) => {
                  const centreMatches = !lead.centre || !batch.centre || batch.centre === lead.centre;
                  const courseMatches = !lead.course || !batch.course || String(batch.course).toUpperCase() === String(lead.course).toUpperCase();
                  return centreMatches && courseMatches;
                });
                const sameCourseBatches = props.batches.filter((batch) => !lead.course || !batch.course || String(batch.course).toUpperCase() === String(lead.course).toUpperCase());
                const sameCentreBatches = props.batches.filter((batch) => !lead.centre || !batch.centre || batch.centre === lead.centre);
                const batchMismatchHint = !sameCourseBatches.length
                  ? "Course mismatch with existing batches"
                  : !sameCentreBatches.length
                    ? "Centre mismatch with existing batches"
                    : "Check batch course and centre";
                const selectedBatch = batchDrafts[lead._id] || "";
                return (
                  <tr key={lead._id} className="clickable" onClick={() => props.onOpen(lead)}>
                    <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(lead.fullName)}</span><div><div className="cell-name">{lead.fullName}</div><div className="cell-sub">{lead.phone}</div></div></div></td>
                    <td>{courseShortCode(lead.course)}</td>
                    <td>{lead.centre || "-"}</td>
                    <td>{lead.counsellor || "-"}</td>
                    <td><span className={`badge ${stageBadgeClass(lead.stage)}`}>{lead.stage}</span></td>
                    <td className="mono">{formatCurrency(lead.expectedFee || 0)}</td>
                    <td onClick={(event) => event.stopPropagation()}>
                      <div className="admission-batch-cell">
                        <select className="fbtn student-mini-select" value={selectedBatch} onChange={(event) => setBatchDrafts((drafts) => ({ ...drafts, [lead._id]: event.target.value }))}><option value="">Assign batch</option>{batchOptions.map((batch) => <option key={batch._id} value={batch.name}>{batch.name} - {formatDate(batch.commenceDate)}</option>)}</select>
                        {!batchOptions.length && <div className="cell-sub admission-batch-hint"><b>No batch for {courseShortCode(lead.course) || "this course"} - {lead.centre || "this centre"}</b><span>{batchMismatchHint}</span></div>}
                      </div>
                    </td>
                    <td className="admission-action-cell" onClick={(event) => event.stopPropagation()}><button className="btn btn-primary btn-sm" disabled={!selectedBatch} onClick={() => props.onConvert(lead, selectedBatch)}>Enroll {"->"}</button></td>
                  </tr>
                );
              })}
              {!props.leads.length && (
                <tr><td colSpan={8}><div className="empty-state"><h4>No admissions pending</h4><p>Move a lead to Admission, then assign a batch to enroll.</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeadPamphletSelect({ lead, compact = false }: { lead: Lead; compact?: boolean }) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pamphlet = event.target.value as LeadPamphletKey;
    event.currentTarget.value = "";
    if (pamphlet) openLeadPamphlet(lead, pamphlet);
  };
  return (
    <select className={compact ? "pamphlet-select compact" : "pamphlet-select"} defaultValue="" onChange={handleChange} title="Send pamphlet">
      <option value="">Pamphlet</option>
      {leadPamphlets.map((pamphlet) => <option key={pamphlet.key} value={pamphlet.key}>{pamphlet.label}</option>)}
    </select>
  );
}

function LeadTable({
  leads,
  students,
  batches,
  canAssign,
  canDelete = false,
  counsellors,
  centres,
  onPatch,
  onDelete,
  onEdit,
  onOpen,
  showAction,
  selectedLeadIds = [],
  onToggleSelect,
  onToggleSelectAll,
}: {
  leads: Lead[];
  students: Student[];
  batches: Batch[];
  canAssign: boolean;
  canDelete?: boolean;
  counsellors: Counsellor[];
  centres: string[];
  onPatch: (id: string, updates: Partial<Lead>) => void;
  onDelete?: (lead: Lead) => void;
  onEdit?: (lead: Lead) => void;
  onOpen: (lead: Lead) => void;
  showAction: boolean;
  selectedLeadIds?: string[];
  onToggleSelect?: (id: string) => void;
  onToggleSelectAll?: () => void;
}) {
  const leadStages = stages;
  const isJunkOrLost = (lead: Lead) => {
    const fb = String(lead.leadFeedback || "").trim().toLowerCase();
    const stg = String(lead.stage || "").trim().toLowerCase();
    return fb === "junk" || fb === "lost" || fb === "invalid" || fb === "not interested" || stg === "lost";
  };
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const aJunk = isJunkOrLost(a) ? 1 : 0;
      const bJunk = isJunkOrLost(b) ? 1 : 0;
      if (aJunk !== bJunk) return aJunk - bJunk;
      const bTime = new Date(b.createdAt || b.updatedAt || 0).getTime();
      const aTime = new Date(a.createdAt || a.updatedAt || 0).getTime();
      return bTime - aTime;
    });
  }, [leads]);

  const visibleIds = sortedLeads.map((lead) => lead._id);
  const allSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedLeadIds.includes(id));
  const isIndeterminate = !allSelected && visibleIds.some((id) => selectedLeadIds.includes(id));

  return (
    <div className="table-wrap leads-table-wrap">
      <table className="leads-table">
        <thead>
          <tr>
            <th className="col-select" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                className="lead-checkbox"
                checked={allSelected}
                ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                onChange={onToggleSelectAll}
                title={allSelected ? "Deselect all" : "Select all on this page"}
              />
            </th>
            <th>Lead</th>
            <th>Contact</th>
            <th>Course</th>
            <th>Source</th>
            <th>Centre</th>
            <th>Counsellor</th>
            <th>Stage</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Next follow-up</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => {
            const displayOwner = leadOwnerForDisplay(lead, students, batches);
            const hasCounsellorOption = !displayOwner || counsellors.some((counsellor) => counsellor.name === displayOwner);
            const isSelected = selectedLeadIds.includes(lead._id);
            return (
            <tr key={lead._id} className={`clickable ${isSelected ? "row-selected" : ""}`} onClick={() => onOpen(lead)}>
              <td className="col-select" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  className="lead-checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelect && onToggleSelect(lead._id)}
                />
              </td>
              <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(lead.fullName)}</span><div><div className="cell-name">{lead.fullName}{lead.isSuspectedConsultancy && <span title={lead.consultancyFlagReason || "Suspected Consultancy / Bulk Upload from same IP"} style={{ background: "#fee2e2", color: "#dc2626", border: "1px solid #f87171", fontSize: "10px", fontWeight: "bold", padding: "1px 5px", borderRadius: "4px", marginLeft: "6px", display: "inline-block", verticalAlign: "middle" }}>⚠️ Suspected Consultancy</span>}</div><div className="cell-sub">{lead._id.slice(-8).toUpperCase()}</div></div></div></td>
              <td>{lead.phone}<div className="cell-sub">{lead.studentLocation || lead.city || lead.email || "-"}</div></td>
              <td>{courseShortCode(lead.course)}</td>
              <td><span className="badge badge-gray">{lead.source || "-"}</span></td>
              <td>{canAssign ? <select className="mini-select" value={lead.centre || ""} onClick={(e) => e.stopPropagation()} onChange={(event) => onPatch(lead._id, { centre: event.target.value })}><option value="">Assign centre</option>{centres.map((centre) => <option key={centre}>{centre}</option>)}</select> : lead.centre || "-"}</td>
              <td>{canAssign ? <select className="mini-select" value={displayOwner} onClick={(e) => e.stopPropagation()} onChange={(event) => onPatch(lead._id, { counsellor: event.target.value })}><option value="">Unassigned</option>{!hasCounsellorOption && <option value={displayOwner}>{displayOwner}</option>}{counsellors.map((counsellor) => <option key={counsellor.email}>{counsellor.name}</option>)}</select> : displayOwner || "-"}</td>
              <td onClick={(event) => event.stopPropagation()}><select className="fbtn stage-select" value={leadStages.includes(lead.stage) ? lead.stage : "New Lead"} onChange={(event) => onPatch(lead._id, { stage: event.target.value })}>{leadStages.map((stage) => <option key={stage}>{stage}</option>)}</select></td>
              <td onClick={(event) => event.stopPropagation()}><select className={`fbtn stage-select feedback-select ${leadFeedbackBadgeClass(lead.leadFeedback)}`} value={normalizeLeadFeedbackStatus(lead.leadFeedback)} onChange={(event) => onPatch(lead._id, { leadFeedback: event.target.value })}>{leadFeedbackOptions.map((feedback) => <option key={feedback}>{feedback}</option>)}</select></td>
              <td><span className={`badge ${priorityBadgeClass(lead.priority)}`}>{leadPriorityLabel(lead.priority)}</span></td>
              <td>{formatDateTime(lead.nextFollowUp)}</td>
              <td onClick={(event) => event.stopPropagation()}><div className="action-icons">
                <LeadPamphletSelect lead={lead} compact />
                <button className="action-icon-btn" title="View" onClick={() => onOpen(lead)}><Eye size={14} /></button>
                {whatsappLeadUrl(lead.phone, lead.fullName) && <a className="action-icon-btn action-icon-whatsapp" title="WhatsApp lead" href={whatsappLeadUrl(lead.phone, lead.fullName)} target="_blank" rel="noreferrer"><MessageCircle size={14} /></a>}
                <button className="action-icon-btn action-icon-primary" title={showAction ? "Open admissions to enroll" : "Update lead"} onClick={() => onEdit ? onEdit(lead) : onOpen(lead)}>{showAction ? <Eye size={14} /> : <Pencil size={14} />}</button>
                {canDelete && onDelete && <button className="action-icon-btn action-icon-danger" title="Delete lead" onClick={() => onDelete(lead)}><Trash2 size={14} /></button>}
              </div></td>
            </tr>
            );
          })}
          {!leads.length && <tr><td colSpan={12}><div className="empty-state"><h4>No leads found</h4><p>Try clearing filters or add a new lead.</p></div></td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function AddLeadPanel({ centres, courses, allCourses = [], onSubmit, isSuperAdmin = false }: { centres: string[]; courses: string[]; allCourses?: Course[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void; isSuperAdmin?: boolean }) {
  const [centreDraft, setCentreDraft] = useState("");
  const [courseDraft, setCourseDraft] = useState("");
  const availableCourses = courseOptionsForCentre(centreDraft, courses, isSuperAdmin);
  const selectedCourseObj = allCourses.find((c) => [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(courseDraft.toLowerCase()));
  const selectedCoursePayable = selectedCourseObj ? feeWithGst(selectedCourseObj.fee || 0) : 0;
  return (
    <div className="card">
      <div className="card-head"><div><h3>Add new lead</h3><div className="sub">Create a prospective student record</div></div></div>
      <form className="card-body field-grid" onSubmit={onSubmit}>
        <div className="field"><RequiredLabel required>Full name</RequiredLabel><input name="fullName" required minLength={2} /></div>
        <div className="field"><RequiredLabel required>Phone</RequiredLabel><input name="phone" required inputMode="tel" pattern="[0-9+()\\-\\s]{8,15}" title="Enter a valid phone number" /></div>
        <div className="field"><RequiredLabel>Parent mobile no.</RequiredLabel><input name="parentMobile" inputMode="tel" pattern="[0-9+()\\-\\s]{8,15}" title="Enter a valid parent mobile number" /></div>
        <Field name="email" label="Email" type="email" />
        <Field name="studentLocation" label="Student location" required />
        <div className="field"><RequiredLabel required>Source</RequiredLabel><select name="source" required defaultValue=""><option value="" disabled>Select source</option>{sources.map((source) => <option key={source}>{source}</option>)}</select></div>
        <SelectField name="leadFeedback" label="Status" options={leadFeedbackOptions} defaultValue="New" />
        <div className="field"><RequiredLabel required>Centre / franchise</RequiredLabel><select name="centre" required value={centreDraft} onChange={(event) => { setCentreDraft(event.target.value); setCourseDraft(""); }}><option value="" disabled>Select centre</option>{centres.map((centre) => <option key={centre}>{centre}</option>)}</select></div>
        <div className="field">
          <RequiredLabel>Course</RequiredLabel>
          <select name="course" value={courseDraft} onChange={(event) => setCourseDraft(event.target.value)}>
            <option value="">Select course</option>
            {availableCourses.map((course) => <option key={course}>{course}</option>)}
          </select>
          {selectedCoursePayable > 0 && (
            <span className="field-help" style={{ color: "var(--primary, #4F6BFF)", fontWeight: 600 }}>
              Course fee: {formatCurrency(selectedCoursePayable)} ({formatCurrency(selectedCourseObj?.fee || 0)} base + 18% GST)
            </span>
          )}
        </div>
        <Field name="city" label="City" />
        <div className="field"><RequiredLabel>Any government proof</RequiredLabel><input name="governmentProof" type="file" accept={leadDocumentAccept} /><span className="field-help">{leadDocumentHelpText}</span></div>
        <div className="field"><RequiredLabel>Highest educational qualification</RequiredLabel><input name="highestQualificationCertificate" type="file" accept={leadDocumentAccept} /><span className="field-help">{leadDocumentHelpText}</span></div>
        <div className="field full"><label>Notes</label><textarea name="notes" /></div>
        <button className="btn btn-primary">Save lead</button>
      </form>
    </div>
  );
}

function StudentsPanel({ title, students, meta, batches = [], canAssign = false, canDelete = false, teachers = [], onPage, onPatch, onDelete, onEdit, onOpen }: { title: string; students: Student[]; meta: PaginationMeta | null; batches?: Batch[]; canAssign?: boolean; canDelete?: boolean; teachers?: Counsellor[]; onPage: (page: number) => void; onPatch: (id: string, updates: Partial<Student>) => void; onDelete: (student: Student) => void; onEdit: (student: Student) => void; onOpen: (student: Student) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const normalized = search.trim().toLowerCase();
  const filteredStudents = students.filter((student) => {
    const matchesSearch = !normalized || [student.fullName, student.admissionNumber, student.phone, student.studentLocation, student.course, student.centre, student.batch].some((value) => String(value || "").toLowerCase().includes(normalized));
    const matchesStatus = !statusFilter || normalizeStudentStatus(student.status) === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="students-prototype">
      <div className="filter-bar students-filter-bar">
        <input className="fbtn" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={title === "My candidates" ? "Search my candidates..." : "Search all candidates..."} />
        {canAssign && <select className="fbtn" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{studentStatuses.map((status) => <option key={status} value={status}>{studentStatusLabel(status)}</option>)}</select>}
        <div className="filter-spacer" />
        <button className="btn btn-ghost" onClick={() => downloadExcelFile(["Candidate", "Course", "Centre", "Batch", "Counsellor", "Teacher", "Fee", "Paid", "Status"], filteredStudents.map((student) => [student.fullName, student.course, student.centre, student.batch, student.counsellor, batchFacultyForStudent(student, batches) || "Unassigned", student.totalFee, student.paidAmount, studentStatusLabel(student.status)]), "imed-candidates")}><Download size={15} /> Download Excel</button>
      </div>
      <div className="card students-card">
        <div className="card-body students-table-body">
          <StudentPrototypeTable students={filteredStudents} batches={batches} canAssign={canAssign} canDelete={canDelete} teachers={teachers} onPatch={onPatch} onDelete={onDelete} onEdit={onEdit} onOpen={onOpen} />
        </div>
        <Pager meta={meta} label="students" onPage={onPage} />
      </div>
    </div>
  );
}

function StudentPrototypeTable({ students, batches, canAssign, canDelete, teachers, onPatch, onDelete, onEdit, onOpen }: { students: Student[]; batches: Batch[]; canAssign: boolean; canDelete: boolean; teachers: Counsellor[]; onPatch: (id: string, updates: Partial<Student>) => void; onDelete: (student: Student) => void; onEdit: (student: Student) => void; onOpen: (student: Student) => void }) {
  return (
    <div className="table-wrap students-table-wrap">
      <table className="students-table">
        <thead><tr><th>Candidate</th><th>Course</th><th>Centre</th><th>Batch</th><th>Teacher</th><th>Fee</th><th>Paid</th><th>Status</th><th /></tr></thead>
        <tbody>
          {students.map((student) => {
            const netFee = Math.max(1, (student.totalFee || 0) - (student.discountAmount || 0));
            const paidPct = Math.min(100, Math.round(((student.paidAmount || 0) / netFee) * 100));
            const displayTeacher = batchFacultyForStudent(student, batches);
            const hasTeacherOption = !displayTeacher || teachers.some((teacher) => teacher.name === displayTeacher);
            return (
              <tr className="clickable" key={student._id} onClick={() => onOpen(student)}>
                <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.studentLocation || student.phone}</div></div></div></td>
                <td>{courseShortCode(student.course)}</td>
                <td>{student.centre || "-"}</td>
                <td>{student.batch || <span className="cell-sub">Unassigned</span>}</td>
                <td onClick={(event) => event.stopPropagation()}>{canAssign ? <select className="fbtn student-mini-select" value={displayTeacher} onChange={(event) => onPatch(student._id, { teacher: event.target.value })}><option value="">Unassigned</option>{!hasTeacherOption && <option value={displayTeacher}>{displayTeacher}</option>}{teachers.map((teacher) => <option key={teacher.email}>{teacher.name}</option>)}</select> : displayTeacher || "-"}</td>
                <td className="mono">{formatCurrency(student.totalFee || 0)}</td>
                <td><span className="progress-track"><span className="progress-fill" style={{ width: `${paidPct}%` }} /></span> <span className="cell-sub">{paidPct}%</span></td>
                <td onClick={(event) => event.stopPropagation()}><select className="fbtn student-mini-select" value={normalizeStudentStatus(student.status)} onChange={(event) => { const reason = studentStatusBlockReason(student, event.target.value); if (reason) { toast.error(reason); return; } onPatch(student._id, { status: event.target.value }); }}>{studentStatuses.map((status) => <option key={status} value={status}>{studentStatusLabel(status)}</option>)}</select></td>
                <td onClick={(event) => event.stopPropagation()}><div className="action-icons">
                  <button className="action-icon-btn" title="View" onClick={() => onOpen(student)}><Eye size={14} /></button>
                  <button className="action-icon-btn action-icon-primary" title="Update student" onClick={() => onEdit(student)}><Pencil size={14} /></button>
                  {canDelete && <button className="action-icon-btn action-icon-danger" title="Delete student" onClick={() => onDelete(student)}><Trash2 size={14} /></button>}
                </div></td>
              </tr>
            );
          })}
          {!students.length && <tr><td colSpan={9}><div className="empty-state"><h4>No candidates found</h4><p>Adjust filters or check back later.</p></div></td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function AlumniPanel({ students, meta, canManage, onPage, onPatch, onOpen }: { students: Student[]; meta: PaginationMeta | null; canManage: boolean; onPage: (page: number) => void; onPatch: (id: string, updates: Partial<Student>) => void; onOpen: (student: Student) => void }) {
  const [search, setSearch] = useState("");
  const [placementFilter, setPlacementFilter] = useState("");
  const [editing, setEditing] = useState<Student | null>(null);
  const alumni = students.filter((student) => normalizeStudentStatus(student.status) === "Alumni");
  const normalized = search.trim().toLowerCase();
  const filtered = alumni.filter((student) => {
    const matchesSearch = !normalized || [student.fullName, student.admissionNumber, student.course, student.batch, student.centre, student.placementCompany, student.placementRole].some((value) => String(value || "").toLowerCase().includes(normalized));
    const matchesPlacement = !placementFilter || (student.placementStatus || "Not Placed") === placementFilter;
    return matchesSearch && matchesPlacement;
  });
  const placedCount = alumni.filter((student) => ["Placed", "Self Placed"].includes(student.placementStatus || "")).length;
  const testimonialCount = alumni.filter((student) => student.testimonialText || student.testimonialVideoUrl).length;
  const referralCount = alumni.filter((student) => student.referralName || student.referralPhone).length;
  const placementPct = alumni.length ? Math.round((placedCount / alumni.length) * 100) : 0;
  const saveAlumni = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    onPatch(editing._id, {
      placementStatus: String(form.placementStatus || "Not Placed"),
      placementCompany: String(form.placementCompany || ""),
      placementRole: String(form.placementRole || ""),
      placementJoiningDate: String(form.placementJoiningDate || ""),
      placementSalary: Number(form.placementSalary || 0),
      placementHrContact: String(form.placementHrContact || ""),
      placementOfferLetterUrl: String(form.placementOfferLetterUrl || ""),
      placementRemarks: String(form.placementRemarks || ""),
      testimonialText: String(form.testimonialText || ""),
      testimonialVideoUrl: String(form.testimonialVideoUrl || ""),
      testimonialRating: Number(form.testimonialRating || 0),
      testimonialApproved: form.testimonialApproved === "on",
      referralName: String(form.referralName || ""),
      referralPhone: String(form.referralPhone || ""),
      referralStatus: String(form.referralStatus || "New"),
    });
    setEditing(null);
  };

  return (
    <div className="alumni-panel">
      <div className="grid-metrics alumni-metrics">
        <MetricCard label="Alumni" value={alumni.length} dot="#4F6BFF" delta="completed candidates" />
        <MetricCard label="Placed" value={placedCount} dot="#17A673" delta={`${placementPct}% placement`} />
        <MetricCard label="Testimonials" value={testimonialCount} dot="#F5A524" delta="collected feedback" />
        <MetricCard label="Referrals" value={referralCount} dot="#8B5CF6" delta="alumni referrals" />
      </div>
      <div className="filter-bar alumni-filter-bar">
        <input className="fbtn" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search alumni, batch, company..." />
        <select className="fbtn" value={placementFilter} onChange={(event) => setPlacementFilter(event.target.value)}><option value="">All placement status</option>{alumniPlacementStatuses.map((status) => <option key={status}>{status}</option>)}</select>
        <div className="filter-spacer" />
        <button className="btn btn-ghost" onClick={() => downloadExcelFile(["Alumni", "Admission no.", "Course", "Batch", "Centre", "Placement", "Company", "Role", "Salary"], filtered.map((student) => [student.fullName, student.admissionNumber, student.course, student.batch, student.centre, student.placementStatus || "Not Placed", student.placementCompany, student.placementRole, student.placementSalary || 0]), "imed-alumni")}><Download size={15} /> Export</button>
      </div>
      <div className="card alumni-card">
        <div className="table-wrap alumni-table-wrap">
          <table className="alumni-table">
            <thead><tr><th>Alumni</th><th>Course</th><th>Batch</th><th>Certificate</th><th>Placement</th><th>Testimonial</th><th>Referral</th><th /></tr></thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student._id} className="clickable" onClick={() => onOpen(student)}>
                  <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div></td>
                  <td>{courseShortCode(student.course)}<div className="cell-sub">{student.centre || "-"}</div></td>
                  <td>{student.batch || "-"}<div className="cell-sub">Completed {formatDate(student.updatedAt)}</div></td>
                  <td><span className={`badge ${student.certificateStatus === "Issued" ? "badge-green" : "badge-amber"}`}>{student.certificateStatus || "Not Issued"}</span><div className="cell-sub">{student.certificateNumber || "-"}</div></td>
                  <td><span className={`badge ${["Placed", "Self Placed"].includes(student.placementStatus || "") ? "badge-green" : student.placementStatus === "Interview Scheduled" ? "badge-amber" : "badge-gray"}`}>{student.placementStatus || "Not Placed"}</span><div className="cell-sub">{[student.placementCompany, student.placementRole].filter(Boolean).join(" - ") || "Placement pending"}</div></td>
                  <td><span className={`badge ${student.testimonialApproved ? "badge-green" : student.testimonialText || student.testimonialVideoUrl ? "badge-amber" : "badge-gray"}`}>{student.testimonialApproved ? "Approved" : student.testimonialText || student.testimonialVideoUrl ? "Collected" : "Pending"}</span></td>
                  <td><span className={`badge ${student.referralName || student.referralPhone ? "badge-blue" : "badge-gray"}`}>{student.referralStatus || (student.referralName || student.referralPhone ? "New" : "No referral")}</span></td>
                  <td onClick={(event) => event.stopPropagation()}><div className="action-icons"><button className="action-icon-btn" title="View profile" onClick={() => onOpen(student)}><Eye size={14} /></button>{canManage && <button className="action-icon-btn action-icon-primary" title="Update alumni" onClick={() => setEditing(student)}><Pencil size={14} /></button>}</div></td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={8}><div className="empty-state"><h4>No alumni found</h4><p>Move eligible course-completed candidates to Alumni to start placement and referral tracking.</p></div></td></tr>}
            </tbody>
          </table>
        </div>
        <Pager meta={meta} label="alumni" onPage={onPage} />
      </div>
      {canManage && editing && <div className="modal-overlay show"><div className="modal alumni-modal"><div className="modal-head"><h3>Update alumni</h3><button className="icon-btn" onClick={() => setEditing(null)}>x</button></div><form onSubmit={saveAlumni}><div className="modal-body alumni-form field-grid">
        <div className="field"><label>Placement status</label><select name="placementStatus" defaultValue={editing.placementStatus || "Not Placed"}>{alumniPlacementStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>
        <EditField name="placementCompany" label="Hospital / company" defaultValue={editing.placementCompany} />
        <EditField name="placementRole" label="Job role" defaultValue={editing.placementRole} />
        <EditField name="placementJoiningDate" label="Joining date" type="date" defaultValue={dateInputValue(editing.placementJoiningDate || "")} />
        <EditField name="placementSalary" label="Monthly salary" type="number" defaultValue={String(editing.placementSalary || "")} />
        <EditField name="placementHrContact" label="HR / contact person" defaultValue={editing.placementHrContact} />
        <EditField name="placementOfferLetterUrl" label="Offer letter link" defaultValue={editing.placementOfferLetterUrl} />
        <div className="field"><label>Placement remarks</label><textarea name="placementRemarks" defaultValue={editing.placementRemarks || ""} /></div>
        <div className="field"><label>Testimonial</label><textarea name="testimonialText" defaultValue={editing.testimonialText || ""} /></div>
        <EditField name="testimonialVideoUrl" label="Video testimonial link" defaultValue={editing.testimonialVideoUrl} />
        <EditField name="testimonialRating" label="Rating" type="number" defaultValue={String(editing.testimonialRating || "")} />
        <div className="field alumni-check"><label><input name="testimonialApproved" type="checkbox" defaultChecked={Boolean(editing.testimonialApproved)} /> Approved for website</label></div>
        <EditField name="referralName" label="Referral name" defaultValue={editing.referralName} />
        <EditField name="referralPhone" label="Referral phone" defaultValue={editing.referralPhone} />
        <div className="field"><label>Referral status</label><select name="referralStatus" defaultValue={editing.referralStatus || "New"}>{referralStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>
      </div><div className="modal-foot"><button type="button" className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button><button className="btn btn-primary"><Pencil size={15} /> Save alumni</button></div></form></div></div>}
    </div>
  );
}

function BatchPanel({ batches, students, schedules, sessions, topicProgress, practicalRecords, studyNotes, npsDashboard, teachers, user, classWeek, setClassWeek, selectedBatchId, setSelectedBatchId, selectedSessionId, setSelectedSessionId, initialTab, classesGenerating, attendanceDraft, setAttendanceDraft, attendanceLogs, selectedAttendanceSummary, attendanceDetailLogs, attendanceDetailFilters, setAttendanceDetailFilters, onSelectAttendanceSummary, onCreateSchedule, onGenerateWeek, onSaveAttendance, onResetAttendance, onEditSession, onTopicProgress, onDeleteTopic, onCreateBatchPractical, onPracticalRecord, onUploadStudyNote, onDownloadStudyNote, onDeleteStudyNote, onOpen }: { batches: Batch[]; students: Student[]; schedules: ClassSchedule[]; sessions: ClassSession[]; topicProgress: TopicProgress[]; practicalRecords: PracticalRecord[]; studyNotes: StudyNote[]; npsDashboard: NpsDashboard | null; teachers: Counsellor[]; user: AdminUser | null; classWeek: string; setClassWeek: (value: string) => void; selectedBatchId: string; setSelectedBatchId: (id: string) => void; selectedSessionId: string; setSelectedSessionId: (id: string) => void; initialTab?: AcademicTab; classesGenerating: boolean; attendanceDraft: Record<string, { status: AttendanceStatus; note: string }>; setAttendanceDraft: (value: Record<string, { status: AttendanceStatus; note: string }>) => void; attendanceLogs: AttendanceSummary[]; selectedAttendanceSummary: AttendanceSummary | null; attendanceDetailLogs: Attendance[]; attendanceDetailFilters: AttendanceDetailFilters; setAttendanceDetailFilters: (filters: AttendanceDetailFilters) => void; onSelectAttendanceSummary: (summary: AttendanceSummary | null) => void; onCreateSchedule: (event: FormEvent<HTMLFormElement>) => void | Promise<void>; onGenerateWeek: (batchId?: string, weekOverride?: string) => void; onSaveAttendance: (session: ClassSession, sessionStudents: Student[]) => void; onResetAttendance: (session: ClassSession) => void; onEditSession: (session: ClassSession, updates: Partial<Pick<ClassSession, "startTime" | "endTime" | "faculty" | "note">>) => void; onTopicProgress: (payload: { _id?: string; batchId: string; module: string; topic: string; status: string; faculty?: string }) => void; onDeleteTopic: (topic: TopicProgress) => void; onCreateBatchPractical: (payload: { batchId: string; students: Student[]; practicalName: string; module?: string; faculty?: string }) => void; onPracticalRecord: (payload: { batchId: string; studentId: string; practicalName: string; module?: string; status: string; remarks?: string; faculty?: string }) => void; onUploadStudyNote: (event: FormEvent<HTMLFormElement>, batch: Batch) => void; onDownloadStudyNote: (note: StudyNote) => void; onDeleteStudyNote: (note: StudyNote) => void; onOpen: (student: Student) => void }) {
  const [academicTab, setAcademicTab] = useState<AcademicTab>(initialTab || "batches");
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showPracticalForm, setShowPracticalForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<TopicProgress | null>(null);
  const [practicalRemarkDrafts, setPracticalRemarkDrafts] = useState<Record<string, string>>({});
  const [progressTab, setProgressTab] = useState<"topics" | "practicals">("topics");
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState<AttendanceStatus | "All">("All");
  const [autoWeekBatchId, setAutoWeekBatchId] = useState("");
  const isTeacher = user?.role === "teacher" || user?.role === "franchise_teacher";
  const canManageAcademicMasters = !isTeacher;
  const canCreateTopics = true;
  const canCreatePracticals = true;
  const activeBatch = batches.find((batch) => batch._id === selectedBatchId);
  const activeBatchId = activeBatch?._id || "";
  const selectedBatchNps = activeBatch ? npsDashboard?.batches?.find((batch) => batch.label === activeBatch.name) : undefined;
  const teacherOwnsActiveBatch = !isTeacher || activeBatch?.assignedFaculty?.includes(user?.name || "");
  const selectedStudents = activeBatch && teacherOwnsActiveBatch ? students.filter((student) => student.batch === activeBatch.name) : [];
  const selectedSchedules = activeBatch ? schedules.filter((schedule) => schedule.batchName === activeBatch.name || String(schedule.batchId) === activeBatch._id) : [];
  const batchTopicProgress = activeBatch ? topicProgress.filter((row) => String(row.batchId) === activeBatch._id || row.batchName === activeBatch.name).sort((a, b) => `${a.module}-${a.topic}`.localeCompare(`${b.module}-${b.topic}`)) : [];
  const batchPracticalRecords = activeBatch ? practicalRecords.filter((row) => String(row.batchId) === activeBatch._id || row.batchName === activeBatch.name) : [];
  const batchStudyNotes = activeBatch ? studyNotes.filter((note) => String(note.batchId) === activeBatch._id || note.batchName === activeBatch.name) : [];
  const selectedSession = sessions.find((session) => session._id === selectedSessionId);
  const selectedSessionBatch = selectedSession ? batches.find((batch) => batch.name === selectedSession.batchName || batch._id === String(selectedSession.batchId)) : undefined;
  const teacherOwnsSelectedSessionBatch = !isTeacher || selectedSessionBatch?.assignedFaculty?.includes(user?.name || "");
  const selectedSessionStudents = selectedSession && teacherOwnsSelectedSessionBatch ? students.filter((student) => student.batch === selectedSession.batchName) : [];
  const filteredSessionStudents = selectedSessionStudents.filter((student) => {
    const row = attendanceDraft[student._id] || { status: "Present" as AttendanceStatus, note: "" };
    const search = attendanceSearch.trim().toLowerCase();
    const matchesSearch = !search || [student.fullName, student.admissionNumber, student.phone, student.course, student.centre].some((value) => String(value || "").toLowerCase().includes(search));
    const matchesStatus = attendanceStatusFilter === "All" || row.status === attendanceStatusFilter;
    return matchesSearch && matchesStatus;
  });
  const markAllSelectedSessionPresent = () => {
    setAttendanceDraft(Object.fromEntries(selectedSessionStudents.map((student) => [student._id, { status: "Present" as AttendanceStatus, note: attendanceDraft[student._id]?.note || "" }])));
  };
  const updateDraft = (studentId: string, updates: Partial<{ status: AttendanceStatus; note: string }>) => setAttendanceDraft({ ...attendanceDraft, [studentId]: { status: updates.status || attendanceDraft[studentId]?.status || "Present", note: updates.note ?? attendanceDraft[studentId]?.note ?? "" } });
  const openClassAttendance = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    setAcademicTab("markAttendance");
  };
  const dayFromDate = (value?: string) => value ? new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(new Date(value)) : "";
  const inputDate = (value = "") => {
    const [year, month, day] = value.slice(0, 10).split("-").map(Number);
    if (!year || !month || !day) return null;
    return new Date(year, month - 1, day);
  };
  const weekStartDate = (value = classWeek) => {
    const base = inputDate(value) || new Date();
    const day = base.getDay();
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const start = new Date(base);
    start.setDate(base.getDate() + mondayOffset);
    start.setHours(0, 0, 0, 0);
    return start;
  };
  const weekDateForDay = (day: string, value = classWeek) => {
    const index = classDays.indexOf(day);
    const date = weekStartDate(value);
    date.setDate(date.getDate() + Math.max(index, 0));
    return date;
  };
  const scheduleActiveOn = (schedule: ClassSchedule, date: Date) => {
    const start = schedule.startDate ? inputDate(schedule.startDate) : null;
    const end = schedule.endDate ? inputDate(schedule.endDate) : null;
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  };
  const firstGenerateWeek = () => {
    const start = weekStartDate(classWeek);
    for (let offset = 0; offset < 28; offset += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + offset);
      const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
      if (selectedSchedules.some((schedule) => schedule.days?.includes(day) && scheduleActiveOn(schedule, date))) return dateInputValue(date);
    }
    return classWeek;
  };
  const firstBatchClassWeek = (batch: Batch) => {
    const batchSchedules = schedules.filter((schedule) => schedule.batchName === batch.name || String(schedule.batchId) === batch._id);
    const start = weekStartDate(classWeek);
    for (let offset = 0; offset < 84; offset += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + offset);
      const day = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
      if (batchSchedules.some((schedule) => {
        if (schedule.classType === "One-time Class") return dateInputValue(schedule.startDate || "") === dateInputValue(date);
        return schedule.days?.includes(day) && scheduleActiveOn(schedule, date);
      })) return dateInputValue(date);
    }
    return classWeek;
  };
  const selectAcademicBatch = (batchId: string, tab: typeof academicTab = "overview") => {
    const batch = batches.find((item) => item._id === batchId);
    if (batch) {
      const nextWeek = firstBatchClassWeek(batch);
      if (nextWeek !== classWeek) setClassWeek(nextWeek);
      setAutoWeekBatchId(batchId);
    }
    setSelectedBatchId(batchId);
    setSelectedSessionId("");
    setAcademicTab(tab);
  };
  const generateSelectedWeek = () => {
    const nextWeek = firstGenerateWeek();
    if (nextWeek !== classWeek) setClassWeek(nextWeek);
    onGenerateWeek(activeBatch?._id || "", nextWeek);
  };
  const batchesWithCounts = batches.map((batch) => ({
    batch,
    students: students.filter((student) => student.batch === batch.name).length,
    classes: schedules.filter((schedule) => schedule.batchName === batch.name || String(schedule.batchId) === batch._id).length,
  }));
  const batchAttendanceLogs = activeBatch ? attendanceLogs.filter((log) => log.batch === activeBatch.name) : attendanceLogs;
  const openAttendanceDetail = (summary: AttendanceSummary) => {
    onSelectAttendanceSummary(summary);
    setAcademicTab("detail");
  };
  useEffect(() => {
    if (activeBatch && academicTab === "batches") setAcademicTab(selectedSessionId ? "attendance" : "overview");
  }, [activeBatchId, selectedSessionId]);
  useEffect(() => {
    if (!activeBatch || autoWeekBatchId === activeBatch._id || !selectedSchedules.length) return;
    const currentWeekHasSchedule = selectedSchedules.some((schedule) => classDays.some((day) => {
      const date = weekDateForDay(day);
      if (schedule.classType === "One-time Class") return dateInputValue(schedule.startDate || "") === dateInputValue(date);
      return schedule.days?.includes(day) && scheduleActiveOn(schedule, date);
    }));
    if (!currentWeekHasSchedule) {
      const nextWeek = firstBatchClassWeek(activeBatch);
      if (nextWeek !== classWeek) setClassWeek(nextWeek);
    }
    setAutoWeekBatchId(activeBatch._id);
  }, [activeBatchId, selectedSchedules.length]);
  useEffect(() => {
    setAttendanceSearch("");
    setAttendanceStatusFilter("All");
  }, [selectedSessionId]);

  return (
    <div className="academic-shell">
      {activeBatch && (
        <>
          <div className="selected-batch-head academic-selected-head">
            <div>
              <h3>{activeBatch.name}</h3>
              <div className="sub">{courseShortCode(activeBatch.course)} | {activeBatch.centre || "-"} | faculty: {activeBatch.assignedFaculty?.length ? activeBatch.assignedFaculty.join(", ") : "Unassigned"}</div>
            </div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAcademicTab("batches"); setSelectedBatchId(""); setSelectedSessionId(""); }}>Change batch</button>
          </div>
          <div className="academic-tabs">
            <button type="button" className={`academic-tab ${academicTab === "overview" ? "active" : ""}`} onClick={() => setAcademicTab("overview")}>Overview</button>
            <button type="button" className={`academic-tab ${academicTab === "students" ? "active" : ""}`} onClick={() => setAcademicTab("students")}>Students</button>
            <button type="button" className={`academic-tab ${academicTab === "attendance" || academicTab === "timetable" || academicTab === "markAttendance" ? "active" : ""}`} onClick={() => setAcademicTab("attendance")}>Classes</button>
            <button type="button" className={`academic-tab ${academicTab === "topics" || academicTab === "practicals" ? "active" : ""}`} onClick={() => { setAcademicTab(progressTab === "practicals" ? "practicals" : "topics"); setShowTopicForm(false); setShowPracticalForm(false); }}>Progress</button>
            <button type="button" className={`academic-tab ${academicTab === "notes" ? "active" : ""}`} onClick={() => setAcademicTab("notes")}>Notes</button>
            <button type="button" className={`academic-tab ${academicTab === "logs" || academicTab === "detail" ? "active" : ""}`} onClick={() => setAcademicTab("logs")}>Logs</button>
          </div>
        </>
      )}

      {academicTab === "batches" ? (
        <div className="batch-card-grid">
          {batchesWithCounts.map(({ batch, students: studentCount, classes }) => (
            <button type="button" key={batch._id} className="batch-select-card" onClick={() => selectAcademicBatch(batch._id)}>
              <div className="batch-select-top"><span className="tag blue">{courseShortCode(batch.course)}</span><span className="cell-sub">{batch.centre || "-"}</span></div>
              <h3>{batch.name}</h3>
              <div className="cell-sub">{isTeacher ? "Assigned academic batch" : "Batch detail and academic controls"}</div>
              <div className="batch-select-stats">
                <span><b>{studentCount}</b> students</span>
                <span><b>{classes}</b> classes</span>
                <span><b>{formatDate(batch.commenceDate)}</b> start</span>
              </div>
            </button>
          ))}
          {!batches.length && <div className="card batch-empty-card"><div className="empty-state"><h4>No assigned batches</h4><p>{isTeacher ? "Ask admin to assign you to a batch or class." : "Create a batch from Settings."}</p></div></div>}
        </div>
      ) : academicTab === "overview" ? (
        <div className="card academic-card">
          <div className="card-head">
            <div><h3>{activeBatch?.name || "Batch overview"}</h3><div className="sub">{activeBatch ? `${courseShortCode(activeBatch.course)} | ${activeBatch.centre || "-"} | starts ${formatDate(activeBatch.commenceDate)} | faculty: ${activeBatch.assignedFaculty?.length ? activeBatch.assignedFaculty.join(", ") : "Unassigned"}` : "Select a batch"}</div></div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAcademicTab("batches"); setSelectedBatchId(""); setSelectedSessionId(""); }}>Change batch</button>
          </div>
          <div className="card-body academic-overview-grid">
            <div className="metric-card"><span className="dot blue" /><div className="m-label">Students</div><div className="m-value">{selectedStudents.length}</div><div className="m-delta">assigned to this batch</div></div>
            <div className="metric-card"><span className="dot green" /><div className="m-label">Timetable slots</div><div className="m-value">{selectedSchedules.length}</div><div className="m-delta">regular / one-time classes</div></div>
            <div className="metric-card"><span className="dot amber" /><div className="m-label">Topics covered</div><div className="m-value">{batchTopicProgress.filter((row) => row.status === "Covered").length}</div><div className="m-delta">{batchTopicProgress.length} total topics</div></div>
            <div className="metric-card"><span className="dot teal" /><div className="m-label">Practicals completed</div><div className="m-value">{batchPracticalRecords.filter((row) => row.status === "Completed").length}</div><div className="m-delta">{batchPracticalRecords.length} student records</div></div>
            <div className="metric-card"><span className="dot blue" /><div className="m-label">Batch NPS</div><div className="m-value">{selectedBatchNps ? selectedBatchNps.nps : "-"}</div><div className="m-delta">{selectedBatchNps ? `${selectedBatchNps.total} aggregate responses` : "No feedback yet"}</div></div>
          </div>
        </div>
      ) : academicTab === "students" ? (
        <div className="card batch-card">
          <div className="card-head"><div><h3>Batch students</h3><div className="sub">{selectedStudents.length} candidates assigned</div></div></div>
          <div className="table-wrap">
            <table className="batch-roster-table">
              <thead><tr><th>Student</th><th>Admission No.</th><th>Teacher</th><th>Status</th></tr></thead>
              <tbody>
                {selectedStudents.map((student) => (
                  <tr key={student._id} className="clickable" onClick={() => onOpen(student)}>
                    <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.phone}</div></div></div></td>
                    <td className="mono">{student.admissionNumber || "-"}</td>
                    <td>{activeBatch?.assignedFaculty?.join(", ") || student.teacher || "Unassigned"}</td>
                    <td><span className={`badge ${student.status === "Enrolled" ? "badge-green" : stageBadgeClass(student.status)}`}>{student.status}</span></td>
                  </tr>
                ))}
                {!selectedStudents.length && <tr><td colSpan={4}><div className="empty-state"><h4>No students yet</h4></div></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      ) : academicTab === "timetable" ? (
        <div className="card academic-card">
          <div className="card-head">
            <div><h3>{activeBatch ? `${activeBatch.name} timetable` : "Timetable"}</h3><div className="sub">Recurring and one-time sessions for this batch</div></div>
            <button type="button" className="btn btn-primary btn-sm" disabled={!activeBatch} onClick={() => setClassModalOpen(true)}><Plus size={14} /> Create class</button>
          </div>
          <div className="class-list">
            {selectedSchedules.map((schedule) => (
              <div className="class-list-item" key={schedule._id}>
                <div>
                  <span className={`badge ${schedule.classType === "One-time Class" ? "badge-red" : "badge-purple"}`}>{schedule.classType === "One-time Class" ? "One-time" : "Regular"}</span>
                  <span className={`badge ${schedule.nature === "Practical" ? "badge-amber" : "badge-blue"}`}>{schedule.nature === "Practical" ? "Practical" : "Theory"}</span>
                  <span className="class-list-meta">{schedule.classType === "One-time Class" ? formatDate(schedule.startDate) : (schedule.days || []).join(", ")} | {schedule.startTime} - {schedule.endTime}</span>
                </div>
                <span className="class-faculty">{schedule.faculty}</span>
              </div>
            ))}
            {!selectedSchedules.length && <div className="empty-state"><h4>No classes yet</h4><p>Create one to get started.</p></div>}
          </div>
        </div>
      ) : academicTab === "attendance" ? (
        <>
          <div className="academic-banner">
            <div className="academic-banner-copy">
              <span>Generate this week's classes from the batch schedule.</span>
              <div className="class-color-legend" aria-label="Class color legend">
                <span><i className="theory" /> Theory class</span>
                <span><i className="practical" /> Practical class</span>
              </div>
            </div>
            <div className="academic-banner-actions">
              <button type="button" className="btn btn-ghost btn-sm" disabled={!activeBatch} onClick={() => setClassModalOpen(true)}><Plus size={14} /> Create class</button>
              <input className="fbtn" type="date" value={classWeek} onChange={(event) => setClassWeek(event.target.value)} />
              <button type="button" className="btn btn-primary btn-sm" disabled={!activeBatch || classesGenerating} onClick={generateSelectedWeek}>{classesGenerating ? <RefreshCw size={14} className="spin-icon" /> : <CalendarDays size={14} />} {classesGenerating ? "Generating..." : "Generate classes"}</button>
            </div>
          </div>
          <div className="card academic-card">
            <div className="table-wrap">
              <table className="academic-roster-table">
                <thead><tr><th>Batch</th>{classDays.map((day) => <th key={day}>{day}</th>)}</tr></thead>
                <tbody>
                  {(activeBatch ? [activeBatch] : []).map((batch) => (
                    <tr key={batch._id}>
                      <td><div className="cell-name">{batch.name}</div><div className="cell-sub">{courseShortCode(batch.course)}</div></td>
                      {classDays.map((day) => {
                        const daySessions = sessions.filter((session) => (session.batchName === batch.name || String(session.batchId) === batch._id) && dayFromDate(session.date) === day);
                        const dayDate = weekDateForDay(day);
                        const previewSchedules = schedules.filter((schedule) => (schedule.batchName === batch.name || String(schedule.batchId) === batch._id) && schedule.classType === "Regular Class" && schedule.days?.includes(day) && scheduleActiveOn(schedule, dayDate));
                        const theorySessions = daySessions.filter((session) => session.nature !== "Practical");
                        const practicalSessions = daySessions.filter((session) => session.nature === "Practical");
                        const theoryPreviews = theorySessions.length ? [] : previewSchedules.filter((schedule) => schedule.nature !== "Practical");
                        const practicalPreviews = practicalSessions.length ? [] : previewSchedules.filter((schedule) => schedule.nature === "Practical");
                        const hasRosterItems = theorySessions.length || practicalSessions.length || theoryPreviews.length || practicalPreviews.length;
                        return (
                          <td key={day}>
                            {hasRosterItems ? (
                              <div className="roster-lanes">
                                <div className="roster-lane">
                                  {theorySessions.map((session) => (
                                    <div key={session._id} className={`roster-slot-wrap ${selectedSessionId === session._id ? "selected" : ""}`}>
                                      <button type="button" className={`roster-slot ${selectedSessionId === session._id ? "selected" : ""}`} onClick={() => openClassAttendance(session._id)}>
                                        <strong>{session.startTime} - {session.endTime}</strong>
                                        <span>{session.faculty}</span>
                                        <span className="roster-date">{formatDate(session.date)}</span>
                                        <em>{session.googleCalendarEventId ? "Calendar synced" : session.attendanceMarked ? "Marked" : "Attendance pending"}</em>
                                      </button>
                                      <button type="button" className="roster-edit-btn" title="Edit class" onClick={(e) => { e.stopPropagation(); setEditingSession(session); }}><Pencil size={12} /></button>
                                    </div>
                                  ))}
                                  {theoryPreviews.map((schedule) => (
                                    <div key={schedule._id} className="roster-slot preview">
                                      <strong>{schedule.startTime} - {schedule.endTime}</strong>
                                      <span>{schedule.faculty}</span>
                                      <span className="roster-date">{formatDate(dayDate.toISOString())}</span>
                                      <em>Not generated</em>
                                    </div>
                                  ))}
                                </div>
                                <div className="roster-lane">
                                  {practicalSessions.map((session) => (
                                    <div key={session._id} className={`roster-slot-wrap ${selectedSessionId === session._id ? "selected" : ""}`}>
                                      <button type="button" className={`roster-slot practical ${selectedSessionId === session._id ? "selected" : ""}`} onClick={() => openClassAttendance(session._id)}>
                                        <strong>{session.startTime} - {session.endTime}</strong>
                                        <span>{session.faculty}</span>
                                        <span className="roster-date">{formatDate(session.date)}</span>
                                        <em>{session.googleCalendarEventId ? "Calendar synced" : session.attendanceMarked ? "Marked" : "Attendance pending"}</em>
                                      </button>
                                      <button type="button" className="roster-edit-btn" title="Edit class" onClick={(e) => { e.stopPropagation(); setEditingSession(session); }}><Pencil size={12} /></button>
                                    </div>
                                  ))}
                                  {practicalPreviews.map((schedule) => (
                                    <div key={schedule._id} className="roster-slot preview practical">
                                      <strong>{schedule.startTime} - {schedule.endTime}</strong>
                                      <span>{schedule.faculty}</span>
                                      <span className="roster-date">{formatDate(dayDate.toISOString())}</span>
                                      <em>Not generated</em>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : <span className="roster-empty">-</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {!activeBatch && <tr><td colSpan={8}><div className="empty-state"><h4>Select a batch first</h4></div></td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : academicTab === "markAttendance" ? (
        <div className="card class-card class-attendance-screen">
          <div className="card-head">
            <div><h3>{selectedSession?.batchName || "Class attendance"}</h3><div className="sub">{selectedSession ? `${selectedSession.nature} | ${formatDate(selectedSession.date)} | ${selectedSession.startTime} - ${selectedSession.endTime} | ${selectedSessionStudents.length} students` : "Select a class from the weekly schedule to mark attendance"}</div></div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setAcademicTab("attendance")}>Back to classes</button>
          </div>
          <div className="card-body">
            {selectedSession ? (
              <div className="class-attendance-shell">
                <div className="class-attendance-tools">
                  <button type="button" className="btn btn-soft btn-sm" disabled={!selectedSessionStudents.length} onClick={markAllSelectedSessionPresent}><CheckCircle2 size={14} /> Mark all present</button>
                  <div className="search-box class-attendance-search"><Search size={14} /><input value={attendanceSearch} onChange={(event) => setAttendanceSearch(event.target.value)} placeholder="Search candidate..." /></div>
                  <div className="pill-tabs class-attendance-filters">
                    <button type="button" className={`pill-tab ${attendanceStatusFilter === "All" ? "active" : ""}`} onClick={() => setAttendanceStatusFilter("All")}>All</button>
                    {attendanceStatuses.map((status) => <button type="button" key={status} className={`pill-tab ${attendanceStatusFilter === status ? "active" : ""}`} onClick={() => setAttendanceStatusFilter(status)}>{attendanceStatusLabel(status)}</button>)}
                  </div>
                </div>
                <div className="att-grid class-att-grid">
                  <div className="att-row att-head"><div /><div>Student</div>{attendanceStatuses.map((status) => <div key={status}>{attendanceStatusLabel(status)}</div>)}<div>Note</div></div>
                  {filteredSessionStudents.map((student) => {
                    const fullIndex = selectedSessionStudents.findIndex((item) => item._id === student._id);
                    const row = attendanceDraft[student._id] || { status: "Present" as AttendanceStatus, note: "" };
                    return (
                      <div className="att-row" key={student._id}>
                        <div className="cell-sub">{fullIndex + 1}</div>
                        <div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div>
                        {attendanceStatuses.map((status) => <button key={status} className={`att-status-btn ${row.status === status ? `sel-${status.toLowerCase()}` : ""}`} onClick={() => updateDraft(student._id, { status })}>{attendanceStatusLabel(status)}</button>)}
                        <input className="fbtn att-note" value={row.note} onChange={(event) => updateDraft(student._id, { note: event.target.value })} placeholder="Optional note" />
                      </div>
                    );
                  })}
                  {!selectedSessionStudents.length && <div className="empty-state"><h4>No students mapped to this batch/faculty</h4></div>}
                  {!!selectedSessionStudents.length && !filteredSessionStudents.length && <div className="empty-state"><h4>No candidates found</h4><p>Try another search or status filter.</p></div>}
                </div>
                {!!selectedSessionStudents.length && (
                  <div className="class-attendance-save">
                    <span>Showing {filteredSessionStudents.length} of {selectedSessionStudents.length} candidates</span>
                    <div className="class-attendance-actions">
                      {selectedSession.attendanceMarked && <button type="button" className="btn btn-ghost btn-danger-soft" onClick={() => onResetAttendance(selectedSession)}><Trash2 size={14} /> Clear attendance</button>}
                      <button className="btn btn-primary" disabled={selectedSession.attendanceMarked} onClick={() => onSaveAttendance(selectedSession, selectedSessionStudents)}>{selectedSession.attendanceMarked ? "Attendance saved" : `Save ${selectedSession.nature} attendance`}</button>
                    </div>
                  </div>
                )}
              </div>
            ) : <div className="empty-state"><h4>Select a class</h4><p>Go back to classes and choose a generated class.</p></div>}
          </div>
        </div>
      ) : academicTab === "topics" && !activeBatch ? (
        <div className="batch-card-grid">
          {batchesWithCounts.map(({ batch, students: studentCount, classes }) => {
            const topicCount = topicProgress.filter((row) => String(row.batchId) === batch._id || row.batchName === batch.name).length;
            return (
              <button type="button" key={batch._id} className="batch-select-card" onClick={() => selectAcademicBatch(batch._id, "topics")}>
                <div className="batch-select-top"><span className="tag blue">{courseShortCode(batch.course)}</span><span className="cell-sub">{batch.centre || "-"}</span></div>
                <h3>{batch.name}</h3>
                <div className="cell-sub">Select this batch to manage syllabus topics</div>
                <div className="batch-select-stats">
                  <span><b>{studentCount}</b> candidates</span>
                  <span><b>{classes}</b> classes</span>
                  <span><b>{topicCount}</b> topics</span>
                </div>
              </button>
            );
          })}
          {!batches.length && <div className="card batch-empty-card"><div className="empty-state"><h4>No batches available</h4></div></div>}
        </div>
      ) : academicTab === "topics" ? (
        <div className="card academic-card">
          <div className="card-head">
            <div><h3>{activeBatch ? `${activeBatch.name} syllabus tracker` : "Syllabus tracker"}</h3><div className="sub">Teachers can create topics for this batch and update coverage</div></div>
            <div className="academic-head-actions">
              <div className="pill-tabs academic-progress-tabs">
                <button type="button" className="pill-tab active">Topics</button>
                <button type="button" className="pill-tab" onClick={() => { setProgressTab("practicals"); setAcademicTab("practicals"); }}>Practicals</button>
              </div>
              <span className="tag blue">{batchTopicProgress.filter((row) => row.status === "Covered").length} covered</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAcademicTab("batches"); setSelectedBatchId(""); setShowTopicForm(false); }}>Change batch</button>
              {canCreateTopics && <button type="button" className="btn btn-primary btn-sm" disabled={!activeBatch} onClick={() => setShowTopicForm((value) => !value)}><Plus size={14} /> Add topic</button>}
            </div>
          </div>
          {showTopicForm && activeBatch && (
            <form className="academic-topic-form" onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const formData = new FormData(form);
              onTopicProgress({
                batchId: activeBatch._id,
                module: String(formData.get("module") || ""),
                topic: String(formData.get("topic") || ""),
                status: String(formData.get("status") || "Not Started"),
                faculty: user?.name || "",
              });
              form.reset();
              setShowTopicForm(false);
            }}>
              <div className="field"><RequiredLabel required>Module</RequiredLabel><input name="module" placeholder="Module 1: Healthcare Operations" required /></div>
              <div className="field"><RequiredLabel required>Topic</RequiredLabel><input name="topic" placeholder="Patient registration workflow" required /></div>
              <SelectField name="status" label="Status" options={topicStatuses} defaultValue="Not Started" />
              <button className="btn btn-primary">Save topic</button>
            </form>
          )}
          <div className="academic-tracker-list">
            {batchTopicProgress.map((item) => {
              const status = item.status || "Not Started";
              return (
                <div className="academic-tracker-row" key={`${item.module}-${item.topic}`}>
                  <div>
                    <div className="cell-name">{item.topic}</div>
                    <div className="cell-sub">{item.module}{item.faculty ? ` | ${item.faculty}` : ""}{item.dateCovered ? ` | covered ${formatDate(item.dateCovered)}` : ""}</div>
                  </div>
                  <select className={`tracker-select tracker-${status.toLowerCase().replace(/\s+/g, "-")}`} value={status} disabled={!activeBatch} onChange={(event) => activeBatch && onTopicProgress({ _id: item._id, batchId: activeBatch._id, module: item.module, topic: item.topic, status: event.target.value, faculty: user?.name || "" })}>
                    {topicStatuses.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  {canManageAcademicMasters && <div className="action-icons">
                    <button type="button" className="action-icon-btn action-icon-primary" title="Edit topic" onClick={() => setEditingTopic(item)}><Pencil size={14} /></button>
                    <button type="button" className="action-icon-btn action-icon-danger" title="Delete topic" onClick={() => onDeleteTopic(item)}><Trash2 size={14} /></button>
                  </div>}
                </div>
              );
            })}
            {!activeBatch && <div className="empty-state"><h4>Select a batch to update syllabus progress</h4></div>}
            {activeBatch && !batchTopicProgress.length && <div className="empty-state"><h4>No topics created yet</h4><p>Add the first topic for this batch.</p></div>}
          </div>
        </div>
      ) : academicTab === "practicals" && !activeBatch ? (
        <div className="batch-card-grid">
          {batchesWithCounts.map(({ batch, students: studentCount, classes }) => {
            const batchRows = practicalRecords.filter((row) => String(row.batchId) === batch._id || row.batchName === batch.name);
            const completed = batchRows.filter((row) => row.status === "Completed").length;
            return (
              <button type="button" key={batch._id} className="batch-select-card" onClick={() => selectAcademicBatch(batch._id, "practicals")}>
                <div className="batch-select-top"><span className="tag blue">{courseShortCode(batch.course)}</span><span className="cell-sub">{batch.centre || "-"}</span></div>
                <h3>{batch.name}</h3>
                <div className="cell-sub">Select this batch to manage practical completion</div>
                <div className="batch-select-stats">
                  <span><b>{studentCount}</b> candidates</span>
                  <span><b>{classes}</b> classes</span>
                  <span><b>{completed}</b> completed</span>
                </div>
              </button>
            );
          })}
          {!batches.length && <div className="card batch-empty-card"><div className="empty-state"><h4>No batches available</h4></div></div>}
        </div>
      ) : academicTab === "practicals" ? (
        <div className="card academic-card">
          <div className="card-head">
            <div><h3>{activeBatch ? `${activeBatch.name} practical tracker` : "Practical tracker"}</h3><div className="sub">Per-candidate skill/practical completion</div></div>
            <div className="academic-head-actions">
              <div className="pill-tabs academic-progress-tabs">
                <button type="button" className="pill-tab" onClick={() => { setProgressTab("topics"); setAcademicTab("topics"); }}>Topics</button>
                <button type="button" className="pill-tab active">Practicals</button>
              </div>
              <span className="tag green">{batchPracticalRecords.filter((row) => row.status === "Completed").length} completed</span>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAcademicTab("batches"); setSelectedBatchId(""); setShowPracticalForm(false); }}>Change batch</button>
              {canCreatePracticals && <button type="button" className="btn btn-primary btn-sm" disabled={!activeBatch} onClick={() => setShowPracticalForm((value) => !value)}><Plus size={14} /> Add practical</button>}
            </div>
          </div>
          {showPracticalForm && activeBatch && (
            <form className="academic-topic-form" onSubmit={(event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const formData = new FormData(form);
              onCreateBatchPractical({
                batchId: activeBatch._id,
                students: selectedStudents,
                practicalName: String(formData.get("practicalName") || ""),
                module: String(formData.get("module") || ""),
                faculty: user?.name || "",
              });
              form.reset();
              setShowPracticalForm(false);
            }}>
              <div className="field"><RequiredLabel required>Practical</RequiredLabel><input name="practicalName" placeholder="Front office workflow simulation" required /></div>
              <div className="field"><RequiredLabel>Module</RequiredLabel><input name="module" placeholder="Healthcare Operations" /></div>
              <button className="btn btn-primary">Save practical</button>
            </form>
          )}
          <div className="table-wrap">
            <table className="practical-table">
              <thead><tr><th>Practical</th><th>Candidate</th><th>Status</th><th>Remarks</th><th>Action</th></tr></thead>
              <tbody>
                {activeBatch && batchPracticalRecords.map((record) => {
                  const student = selectedStudents.find((item) => item._id === String(record.studentId)) || students.find((item) => item._id === String(record.studentId));
                  const status = record.status || "Pending";
                  const rowKey = record._id || `${record.batchId}-${record.practicalName}-${record.studentId}`;
                  const remarkValue = Object.prototype.hasOwnProperty.call(practicalRemarkDrafts, rowKey) ? practicalRemarkDrafts[rowKey] : (record.remarks || "");
                  const savePracticalRow = (nextStatus = status, nextRemarks = remarkValue) => activeBatch && onPracticalRecord({ batchId: activeBatch._id, studentId: String(record.studentId), practicalName: record.practicalName, module: record.module || "", status: nextStatus, remarks: nextRemarks, faculty: record.faculty || student?.teacher || user?.name || "" });
                  return (
                    <tr key={rowKey}>
                      <td><div className="cell-name">{record.practicalName}</div><div className="cell-sub">{record.module || "-"}{record.dateConducted ? ` | ${formatDate(record.dateConducted)}` : ""}</div></td>
                      <td>
                        {student ? (
                          <button type="button" className="lead-name-cell row-button compact-row-button" onClick={() => onOpen(student)}>
                            <span className="avatar lead-avatar">{initials(student.fullName)}</span>
                            <span><span className="cell-name">{student.fullName}</span><span className="cell-sub">{student.admissionNumber || student.phone}</span></span>
                          </button>
                        ) : (
                          <div className="cell-sub">Candidate not found</div>
                        )}
                      </td>
                      <td>
                        <select className={`tracker-select tracker-${status.toLowerCase().replace(/\s+/g, "-")}`} value={status} onChange={(event) => savePracticalRow(event.target.value, remarkValue)}>
                          {practicalStatuses.map((option) => <option key={option}>{option}</option>)}
                        </select>
                      </td>
                      <td><input className="fbtn practical-note" value={remarkValue} placeholder="Faculty remarks" onChange={(event) => setPracticalRemarkDrafts((current) => ({ ...current, [rowKey]: event.target.value }))} /></td>
                      <td><button type="button" className="action-icon-btn action-icon-primary" title="Save remarks" onClick={() => savePracticalRow()}><CheckCircle2 size={14} /></button></td>
                    </tr>
                  );
                })}
                {activeBatch && !batchPracticalRecords.length && <tr><td colSpan={5}><div className="empty-state"><h4>No practicals created yet</h4><p>Add the first practical for this batch.</p></div></td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      ) : academicTab === "notes" ? (
        <div className="card academic-card study-notes-card">
          <div className="card-head">
            <div><h3>{activeBatch ? `${activeBatch.name} notes` : "Study notes"}</h3><div className="sub">Upload notes and study files for students in this batch</div></div>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setAcademicTab("batches"); setSelectedBatchId(""); }}>Change batch</button>
          </div>
          {activeBatch && (
            <form className="academic-topic-form study-note-form" onSubmit={(event) => onUploadStudyNote(event, activeBatch)}>
              <div className="field"><RequiredLabel required>Title</RequiredLabel><input name="title" placeholder="Module 1 notes" required /></div>
              <div className="field"><RequiredLabel>Module</RequiredLabel><input name="module" placeholder="Healthcare Operations" /></div>
              <div className="field"><RequiredLabel>File</RequiredLabel><input name="file" type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.txt" /></div>
              <div className="field"><RequiredLabel>Video / reference URL</RequiredLabel><input name="referenceUrl" type="url" placeholder="https://youtube.com/..." /></div>
              <div className="field full"><RequiredLabel>Description</RequiredLabel><input name="description" placeholder="Short message for students" /></div>
              <button className="btn btn-primary"><Plus size={14} /> Share resource</button>
            </form>
          )}
          <div className="study-note-list">
            {batchStudyNotes.map((note) => (
              <article className="study-note-row" key={note._id}>
                <span className="study-note-icon"><FileText size={16} /></span>
                <div>
                  <b>{note.title}</b>
                  <p>{note.module || "General"} | {note.resourceType || (note.referenceUrl ? "Reference" : "File")} | {note.file?.originalName || note.referenceUrl || "Study resource"} | {formatDate(note.createdAt)}{note.uploadedBy ? ` | ${note.uploadedBy}` : ""}</p>
                  {note.description && <small>{note.description}</small>}
                </div>
                <div className="action-icons">
                  {note.file?.storedName && <button type="button" className="action-icon-btn action-icon-primary" title="Download note" onClick={() => onDownloadStudyNote(note)}><Download size={14} /></button>}
                  {note.referenceUrl && <button type="button" className="action-icon-btn action-icon-primary" title="Open reference" onClick={() => window.open(note.referenceUrl, "_blank", "noopener,noreferrer")}><ExternalLink size={14} /></button>}
                  <button type="button" className="action-icon-btn action-icon-danger" title="Delete note" onClick={() => onDeleteStudyNote(note)}><Trash2 size={14} /></button>
                </div>
              </article>
            ))}
            {activeBatch && !batchStudyNotes.length && <div className="empty-state"><h4>No notes uploaded yet</h4><p>Upload notes once, and students in this batch can download them from LMS.</p></div>}
            {!activeBatch && <div className="empty-state"><h4>Select a batch to manage notes</h4></div>}
          </div>
        </div>
      ) : academicTab === "logs" ? (
        <div className="academic-log-shell">
          <div className="academic-log-head">
            <div><h3>{activeBatch ? `${activeBatch.name} attendance logs` : "Attendance logs"}</h3><div className="sub">Per-candidate attendance summary inside this batch</div></div>
          </div>
          <LogsPanel logs={batchAttendanceLogs} onSelect={openAttendanceDetail} />
        </div>
      ) : (
        <AttendanceDetailPanel
          summary={selectedAttendanceSummary}
          logs={attendanceDetailLogs}
          filters={attendanceDetailFilters}
          setFilters={setAttendanceDetailFilters}
          onBack={() => setAcademicTab("logs")}
        />
      )}

      <ClassCreateModal
        open={classModalOpen}
        batch={activeBatch}
        teachers={teachers}
        user={user}
        onClose={() => setClassModalOpen(false)}
        onCreateSchedule={onCreateSchedule}
      />
      <div className={`modal-overlay ${editingTopic ? "show" : ""}`} onClick={() => setEditingTopic(null)}>
        {editingTopic && activeBatch && (
          <div className="modal topic-edit-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-head"><h3>Edit topic</h3><button className="close-x" onClick={() => setEditingTopic(null)}>x</button></div>
            <form onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              onTopicProgress({
                _id: editingTopic._id,
                batchId: activeBatch._id,
                module: String(formData.get("module") || ""),
                topic: String(formData.get("topic") || ""),
                status: String(formData.get("status") || editingTopic.status || "Not Started"),
                faculty: user?.name || editingTopic.faculty || "",
              });
              setEditingTopic(null);
            }}>
              <div className="modal-body field-grid topic-edit-body">
                <Field name="module" label="Module" defaultValue={editingTopic.module} required />
                <Field name="topic" label="Topic" defaultValue={editingTopic.topic} required />
                <SelectField name="status" label="Status" options={topicStatuses} defaultValue={editingTopic.status || "Not Started"} />
              </div>
              <div className="modal-actions topic-edit-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditingTopic(null)}>Cancel</button><button className="btn btn-primary">Update topic</button></div>
            </form>
          </div>
        )}
      </div>
      {editingSession && (
        <div className="modal-overlay show" onClick={() => setEditingSession(null)}>
          <div className="modal class-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <h3>Edit class</h3>
                <div className="sub">{editingSession.batchName} &mdash; {formatDate(editingSession.date)} &mdash; {editingSession.nature}</div>
              </div>
              <button className="close-x" onClick={() => setEditingSession(null)}>x</button>
            </div>
            <form onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              onEditSession(editingSession, {
                startTime: String(formData.get("startTime") || editingSession.startTime),
                endTime: String(formData.get("endTime") || editingSession.endTime),
                faculty: String(formData.get("faculty") || editingSession.faculty),
                note: String(formData.get("note") || ""),
              });
              setEditingSession(null);
            }}>
              <div className="modal-body field-grid class-edit-body">
                <div className="field">
                  <label>Start time</label>
                  <input name="startTime" type="time" defaultValue={editingSession.startTime} required />
                </div>
                <div className="field">
                  <label>End time</label>
                  <input name="endTime" type="time" defaultValue={editingSession.endTime} required />
                </div>
                <div className="field full">
                  <label>Faculty</label>
                  <input name="faculty" defaultValue={editingSession.faculty} placeholder="Faculty name" />
                </div>
                <div className="field full">
                  <label>Note <span className="field-help">(optional)</span></label>
                  <input name="note" defaultValue={editingSession.note || ""} placeholder="e.g. Rescheduled, special class, etc." />
                </div>
              </div>
              <div className="modal-foot">
                <button type="button" className="btn btn-ghost" onClick={() => setEditingSession(null)}>Cancel</button>
                <button className="btn btn-primary"><Pencil size={14} /> Save changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ClassCreateModal({ open, batch, teachers, user, onClose, onCreateSchedule }: { open: boolean; batch?: Batch; teachers: Counsellor[]; user: AdminUser | null; onClose: () => void; onCreateSchedule: (event: FormEvent<HTMLFormElement>) => void | Promise<void> }) {
  const [step, setStep] = useState(1);
  const [classType, setClassType] = useState("Regular Class");
  const [nature, setNature] = useState("Theoretical");
  const [faculty, setFaculty] = useState(user?.name || "");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");
  const isTeacher = user?.role === "teacher" || user?.role === "franchise_teacher";
  const assignedFaculty = batch?.assignedFaculty || [];
  const batchTeachers = assignedFaculty.length ? teachers.filter((teacher) => assignedFaculty.includes(teacher.name)) : teachers;
  const teacherOptions = isTeacher ? [{ name: user?.name || "Teacher", email: "", role: user?.role || "teacher" }] : batchTeachers;
  const defaultFaculty = faculty || teacherOptions[0]?.name || user?.name || "";
  const toggleDay = (day: string) => setSelectedDays((current) => current.includes(day) ? current.filter((item) => item !== day) : [...current, day]);
  const typeOptions = [
    { value: "Regular Class", title: "Regular", text: "Repeats on selected class days", icon: CalendarDays },
    { value: "One-time Class", title: "One-time", text: "Single extra or special session", icon: Plus },
  ];
  const natureOptions = [
    { value: "Theoretical", title: "Theory", text: "Concepts, discussion, classroom learning", icon: BookOpen },
    { value: "Practical", title: "Practical", text: "Hands-on skills and lab practice", icon: ClipboardList },
  ];
  const resetModal = () => {
    setStep(1);
    setStartTime("");
    setEndTime("");
    setStartDate("");
  };
  const close = () => { resetModal(); onClose(); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    await onCreateSchedule(event);
    resetModal();
    onClose();
  };
  const next = () => {
    if (step === 2 && !startDate) return toast.error("Choose class start date");
    if (step === 2 && classType === "Regular Class" && !selectedDays.length) return toast.error("Pick at least one day");
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className={`modal-overlay ${open ? "show" : ""}`}>
      <form className="modal academic-modal" onSubmit={submit}>
        <div className="modal-head"><div><h3>Create class</h3><div className="sub">Step {step} of 3</div></div><button type="button" className="icon-btn" onClick={close}>x</button></div>
        <div className="modal-body">
          <div className="class-context">
            <span className="choice-icon"><GraduationCap size={17} /></span>
            <div><strong>{batch?.name || "Select batch"}</strong><em>{batch?.course || "Course"} batch class setup</em></div>
          </div>
          <div className="academic-steps">
            {["Class", "Schedule", "Review"].map((label, index) => {
              const item = index + 1;
              return <button type="button" key={label} className={item === step ? "active" : item < step ? "done" : ""} onClick={() => item < step && setStep(item)}><span>{item}</span><em>{label}</em></button>;
            })}
          </div>
          <input type="hidden" name="batchId" value={batch?._id || ""} />
          <input type="hidden" name="classType" value={classType} />
          <input type="hidden" name="nature" value={nature} />
          <input type="hidden" name="faculty" value={defaultFaculty} />
          <input type="hidden" name="startTime" value={startTime} />
          <input type="hidden" name="endTime" value={endTime} />
          <input type="hidden" name="startDate" value={startDate} />
          <input type="hidden" name="note" value={note} />
          {selectedDays.map((day) => <input key={day} type="hidden" name={`day-${day}`} value={day} />)}

          {step === 1 && (
            <>
              <div className="academic-choice-section">
                <div>
                  <div className="mini-label">Class type</div>
                  <div className="academic-choice-grid">
                    {typeOptions.map((option) => {
                      const Icon = option.icon;
                      const active = classType === option.value;
                      return (
                        <button type="button" key={option.value} className={`academic-choice ${active ? "active" : ""}`} onClick={() => setClassType(option.value)}>
                          <span className="choice-icon"><Icon size={17} /></span>
                          <span><strong>{option.title}</strong><em>{option.text}</em></span>
                          <small>{option.value === "Regular Class" ? "Weekly" : "Single day"}</small>
                          <CheckCircle2 className="choice-check" size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="mini-label">Nature</div>
                  <div className="academic-choice-grid">
                    {natureOptions.map((option) => {
                      const Icon = option.icon;
                      const active = nature === option.value;
                      return (
                        <button type="button" key={option.value} className={`academic-choice ${active ? "active" : ""}`} onClick={() => setNature(option.value)}>
                          <span className="choice-icon"><Icon size={17} /></span>
                          <span><strong>{option.title}</strong><em>{option.text}</em></span>
                          <small>{option.value === "Theoretical" ? "Classroom" : "Hands-on"}</small>
                          <CheckCircle2 className="choice-check" size={16} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="field"><RequiredLabel required>Faculty</RequiredLabel><select value={defaultFaculty} onChange={(event) => setFaculty(event.target.value)}>{teacherOptions.map((teacher) => <option key={`${teacher.name}-${teacher.email}`} value={teacher.name}>{teacher.name}</option>)}</select></div>
              <div className="field"><RequiredLabel required>{classType === "One-time Class" ? "Class date" : "Start date"}</RequiredLabel><input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required /></div>
              {classType === "Regular Class" ? (
                <div className="field"><RequiredLabel required>Days</RequiredLabel><div className="day-picker">{classDays.map((day) => <button type="button" key={day} className={`academic-day ${selectedDays.includes(day) ? "on" : ""}`} onClick={() => toggleDay(day)}>{day}</button>)}</div></div>
              ) : null}
            </>
          )}
          {step === 3 && (
            <>
              <div className="row2">
                <div className="field"><RequiredLabel required>Start time</RequiredLabel><input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} required /></div>
                <div className="field"><RequiredLabel required>End time</RequiredLabel><input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} required /></div>
              </div>
              <div className="field"><label>Module / subject</label><input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Topic, module, room, or internal note" /></div>
              <div className="empty-state academic-review"><h4>{batch?.name || "Batch"} | {classType === "Regular Class" ? "Regular" : "One-time"} | {nature}</h4><p>{defaultFaculty} | starts {startDate ? formatDate(startDate) : "Choose start date"} | {classType === "Regular Class" ? selectedDays.join(", ") : "One-time"} | {startTime && endTime ? `${startTime} - ${endTime}` : "Choose time"}</p></div>
            </>
          )}
        </div>
        <div className="modal-foot">
          <button type="button" className="btn btn-ghost" onClick={step === 1 ? close : () => setStep(step - 1)}>{step === 1 ? "Cancel" : "Back"}</button>
          {step < 3 ? <button type="button" className="btn btn-primary" onClick={next}>Next</button> : <button className="btn btn-primary">Create class</button>}
        </div>
      </form>
    </div>
  );
}

function AttendancePanel({ students, draft, setDraft, attendanceDate, setAttendanceDate, onRefresh, onSave }: { students: Student[]; attendance: Attendance[]; draft: Record<string, { status: AttendanceStatus; note: string }>; setDraft: (value: Record<string, { status: AttendanceStatus; note: string }>) => void; attendanceDate: string; setAttendanceDate: (date: string) => void; onRefresh: () => void; onSave: () => void }) {
  const counts = attendanceStatuses.reduce((acc, status) => {
    acc[status] = students.filter((student) => (draft[student._id]?.status || "Present") === status).length;
    return acc;
  }, {} as Record<AttendanceStatus, number>);
  const updateDraft = (studentId: string, updates: Partial<{ status: AttendanceStatus; note: string }>) => setDraft({ ...draft, [studentId]: { status: updates.status || draft[studentId]?.status || "Present", note: updates.note ?? draft[studentId]?.note ?? "" } });

  return (
    <div className="attendance-prototype">
      <div className="filter-bar attendance-filter-bar">
        <input type="date" className="fbtn" value={attendanceDate} onChange={(event) => setAttendanceDate(event.target.value)} />
        <button className="btn btn-ghost" onClick={onRefresh}><RefreshCw size={15} /> Refresh</button>
        <div className="filter-spacer" />
        <div className="badge badge-teal">Present {counts.Present || 0}</div>
        <div className="badge badge-red">Absent {counts.Absent || 0}</div>
        <div className="badge badge-amber">Late {counts.Late || 0}</div>
        <div className="badge badge-purple">Excused {counts.Leave || 0}</div>
        <button className="btn btn-primary" onClick={onSave}>Save attendance</button>
      </div>
      <div className="card attendance-card">
        <div className="card-body">
          <div className="att-grid">
            <div className="att-row att-head">
              <div /><div>Student</div>{attendanceStatuses.map((status) => <div key={status}>{attendanceStatusLabel(status)}</div>)}<div>Note</div>
            </div>
            {students.map((student, index) => {
              const row = draft[student._id] || { status: "Present" as AttendanceStatus, note: "" };
              return (
                <div className="att-row" key={student._id}>
                  <div className="cell-sub">{index + 1}</div>
                  <div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div>
                  {attendanceStatuses.map((status) => (
                    <button key={status} className={`att-status-btn ${row.status === status ? `sel-${status.toLowerCase()}` : ""}`} onClick={() => updateDraft(student._id, { status })}>{attendanceStatusLabel(status)}</button>
                  ))}
                  <input className="fbtn att-note" value={row.note} onChange={(event) => updateDraft(student._id, { note: event.target.value })} placeholder="Optional note" />
                </div>
              );
            })}
            {!students.length && <div className="empty-state"><h4>No assigned students found</h4></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function LogsPanel({ logs, onSelect }: { logs: AttendanceSummary[]; onSelect: (summary: AttendanceSummary) => void }) {
  const [search, setSearch] = useState("");
  const normalized = search.trim().toLowerCase();
  const filteredLogs = normalized
    ? logs.filter((log) => [log.studentName, log.studentId, log.course, log.batch].some((value) => String(value || "").toLowerCase().includes(normalized)))
    : logs;

  return (
    <div className="logs-prototype">
      <div className="filter-bar logs-filter-bar">
        <input className="fbtn" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search student..." />
        <div className="filter-spacer" />
        <button className="btn btn-ghost" onClick={() => downloadExcelFile(["Student", "Theory", "Practical", "Present", "Absent", "Late", "Leave", "Total"], filteredLogs.map((log) => [log.studentName || log.studentId, log.theoretical || 0, log.practical || 0, log.present, log.absent, log.late, log.leave, log.total]), "imed-attendance-logs")}><Download size={15} /> Download Excel</button>
      </div>
      <div className="card logs-card">
        <div className="table-wrap logs-table-wrap">
          <table className="logs-table">
            <thead><tr><th>Student</th><th>Theory</th><th>Practical</th><th>Present</th><th>Absent</th><th>Late</th><th>Leave</th><th>Total</th><th /></tr></thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.studentId} className="clickable">
                  <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(log.studentName || log.studentId)}</span><div><div className="cell-name">{log.studentName || log.studentId}</div><div className="cell-sub">{[log.course, log.batch].filter(Boolean).join(" - ") || "Attendance summary"}</div></div></div></td>
                  <td><span className="badge badge-blue">{log.theoretical || 0}</span></td>
                  <td><span className="badge badge-amber">{log.practical || 0}</span></td>
                  <td><span className="badge badge-teal">{log.present}</span></td>
                  <td><span className="badge badge-red">{log.absent}</span></td>
                  <td><span className="badge badge-amber">{log.late}</span></td>
                  <td><span className="badge badge-purple">{log.leave}</span></td>
                  <td className="mono">{log.total}</td>
                  <td><button className="btn btn-sm btn-soft" onClick={() => onSelect(log)}>View detail</button></td>
                </tr>
              ))}
              {!filteredLogs.length && <tr><td colSpan={9}><div className="empty-state"><h4>No attendance logs found</h4></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AttendanceDetailPanel({ summary, logs, filters, setFilters, onBack }: { summary: AttendanceSummary | null; logs: Attendance[]; filters: AttendanceDetailFilters; setFilters: (filters: AttendanceDetailFilters) => void; onBack: () => void }) {
  const baseDate = logs[0]?.date ? new Date(logs[0].date) : new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const monthName = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(baseDate);
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const byDay = new Map(logs.map((record) => [new Date(record.date || "").getDate(), record]));
  const cells = [
    ...Array.from({ length: firstDay }, (_, index) => ({ key: `blank-${index}`, day: 0, status: "" })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return { key: `day-${day}`, day, status: byDay.get(day)?.status || "" };
    }),
  ];
  const counts = attendanceStatuses.reduce((acc, status) => {
    acc[status] = logs.filter((record) => record.status === status).length;
    return acc;
  }, {} as Record<AttendanceStatus, number>);
  const natureCounts = {
    theoretical: logs.filter((record) => (record.nature || "Theoretical") === "Theoretical").length,
    practical: logs.filter((record) => record.nature === "Practical").length,
  };
  const total = logs.length || summary?.total || 0;
  const presentPercent = total ? Math.round(((counts.Present || summary?.present || 0) / total) * 1000) / 10 : 0;

  return (
    <div className="attdetail-prototype">
      <button className="btn btn-ghost attdetail-back" onClick={onBack}>{"<-"} Back to logs</button>
      <div className="two-col attdetail-grid">
        <div className="card attdetail-card">
          <div className="card-head"><div><h3>{summary?.studentName || "Student"} - {monthName}</h3><div className="sub">{[summary?.course, summary?.batch].filter(Boolean).join(" - ") || "Attendance calendar"}</div></div></div>
          <div className="card-body">
            <div className="cal-grid">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <div className="cal-dow" key={`${day}-${index}`}>{day}</div>)}
              {cells.map((cell) => <div className={`cal-cell ${cell.day ? cell.status.toLowerCase() : "blank"}`} key={cell.key}>{cell.day || ""}</div>)}
            </div>
            <div className="legend">
              <span><i style={{ background: "var(--teal-500)" }} />Present</span>
              <span><i style={{ background: "var(--red-500)" }} />Absent</span>
              <span><i style={{ background: "var(--amber-500)" }} />Late</span>
              <span><i style={{ background: "var(--purple-500)" }} />Leave</span>
            </div>
          </div>
        </div>
        <div className="card attdetail-card">
          <div className="card-head"><div><h3>Filters & stats</h3></div></div>
          <div className="card-body">
            <div className="field"><label>Date range</label><div className="date-range-row"><input type="date" className="fbtn" value={filters.dateFrom} onChange={(event) => setFilters({ ...filters, dateFrom: event.target.value })} /><input type="date" className="fbtn" value={filters.dateTo} onChange={(event) => setFilters({ ...filters, dateTo: event.target.value })} /></div></div>
            <div className="field"><label>Status</label><select className="fbtn attdetail-status" value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}><option value="">All</option>{attendanceStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <div className="field"><label>Class nature</label><select className="fbtn attdetail-status" value={filters.nature} onChange={(event) => setFilters({ ...filters, nature: event.target.value })}><option value="">All</option><option>Theoretical</option><option>Practical</option></select></div>
            <div className="kv-row"><span className="k">Theory classes</span><span className="v">{natureCounts.theoretical || summary?.theoretical || 0}</span></div>
            <div className="kv-row"><span className="k">Practical classes</span><span className="v">{natureCounts.practical || summary?.practical || 0}</span></div>
            <div className="kv-row"><span className="k">Present days</span><span className="v">{counts.Present || summary?.present || 0}</span></div>
            <div className="kv-row"><span className="k">Absent days</span><span className="v">{counts.Absent || summary?.absent || 0}</span></div>
            <div className="kv-row"><span className="k">Late days</span><span className="v">{counts.Late || summary?.late || 0}</span></div>
            <div className="kv-row"><span className="k">Leave days</span><span className="v">{counts.Leave || summary?.leave || 0}</span></div>
            <div className="kv-row"><span className="k">Attendance %</span><span className="v">{presentPercent}%</span></div>
            <button className="btn btn-ghost attdetail-download" onClick={() => downloadExcelFile(["Date", "Nature", "Status", "Note"], logs.map((record) => [formatDate(record.date), record.nature || "Theoretical", record.status, record.note]), "imed-attendance-detail")}><Download size={15} /> Download day-wise Excel</button>
          </div>
        </div>
      </div>
      <div className="card attdetail-card">
        <div className="card-head"><div><h3>Day-wise class logs</h3><div className="sub">Theory and practical records for this candidate</div></div></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Nature</th><th>Status</th><th>Note</th></tr></thead>
            <tbody>
              {logs.map((record) => <tr key={`${record.date}-${record.nature}-${record.status}`}><td className="mono">{formatDate(record.date)}</td><td><span className={`badge ${record.nature === "Practical" ? "badge-amber" : "badge-blue"}`}>{record.nature === "Practical" ? "Practical" : "Theory"}</span></td><td><span className={`badge ${record.status === "Present" ? "badge-green" : record.status === "Absent" ? "badge-red" : record.status === "Late" ? "badge-amber" : "badge-purple"}`}>{record.status}</span></td><td>{record.note || "-"}</td></tr>)}
              {!logs.length && <tr><td colSpan={4}><div className="empty-state"><h4>No day-wise logs found</h4></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FinancePanel({ students, meta, user, onPage, onOpen, onCashDeposit, onDownloadCashDepositProof }: { students: Student[]; meta: PaginationMeta | null; user: AdminUser | null; onPage: (page: number) => void; onOpen: (student: Student) => void; onCashDeposit: (event: FormEvent<HTMLFormElement>, student: Student, payment: PaymentRecord, paymentIndex: number) => void; onDownloadCashDepositProof: (student: Student, paymentIndex: number, deposit: CashDeposit, depositIndex: number) => void }) {
  const billed = students.reduce((sum, student) => sum + (student.totalFee || 0), 0);
  const collected = students.reduce((sum, student) => sum + (student.paidAmount || 0), 0);
  const discount = students.reduce((sum, student) => sum + (student.discountAmount || 0), 0);
  const due = students.reduce((sum, student) => sum + dueAmount(student), 0);
  const cashItems = students.flatMap((student) => (student.payments || []).map((payment, index) => ({ student, payment, index })).filter(({ payment }) => (payment.mode || "Cash") === "Cash"));
  const cashCollected = cashItems.reduce((sum, item) => sum + Number(item.payment.amount || 0), 0);
  const cashDeposited = cashItems.reduce((sum, item) => sum + depositedCashAmount(item.payment), 0);
  const pendingCash = Math.max(0, cashCollected - cashDeposited);
  const slices: DonutSlice[] = [
    { label: "Collected", value: collected, color: "#4F6BFF" },
    { label: "Outstanding", value: due, color: "#F5A524" },
  ];
  return (
    <>
      <div className="grid-metrics finance-metrics">
        <MetricCard label="Total billed (incl. GST)" value={formatCurrency(billed)} dot="#4F6BFF" delta="" />
        <MetricCard label="Collected" value={formatCurrency(collected)} dot="#17A673" delta="" />
        <MetricCard label="Cash pending deposit" value={formatCurrency(pendingCash)} dot="#F5A524" delta="" down />
        <MetricCard label="Cash deposited" value={formatCurrency(cashDeposited)} dot="#14B8A6" delta="" />
      </div>
      <div className="card finance-card cash-deposit-card">
        <div className="card-head"><div><h3>Cash collected - deposit</h3><div className="sub">Track cash in hand and bank deposits</div></div></div>
        <div className="table-wrap finance-table-wrap cash-deposit-wrap">
          <table className="finance-table cash-deposit-table">
            <thead><tr><th>Student</th><th>Collected</th><th>Deposited</th><th>Pending</th><th>Deposit details</th><th>Proof</th></tr></thead>
            <tbody>
              {cashItems.map(({ student, payment, index }) => {
                const deposited = depositedCashAmount(payment);
                const pending = pendingCashDepositAmount(payment);
                return (
                  <tr key={`${student._id}-${index}`}>
                    <td><button type="button" className="row-button" onClick={() => onOpen(student)}><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{paymentReceiptNumber(student, index)} | {formatDate(payment.paidAt)}</div></div></div></button></td>
                    <td className="mono">{formatCurrency(payment.amount || 0)}</td>
                    <td className="mono">{formatCurrency(deposited)}</td>
                    <td><span className={`tag ${pending <= 0 ? "green" : "amber"}`}>{pending <= 0 ? "Deposited" : formatCurrency(pending)}</span></td>
                    <td>
                      {pending <= 0 ? <div className="cash-deposit-history">{(payment.cashDeposits || []).map((deposit, depositIndex) => <div key={`${deposit.referenceNumber || depositIndex}-${deposit.amount || 0}`}><b>{formatCurrency(deposit.amount || 0)}</b><span>{deposit.bank || "-"} | {deposit.referenceNumber || "-"} | {formatDate(deposit.depositedAt)} | By {deposit.depositedBy || deposit.by || "-"}</span></div>)}</div> : (
                        <form className="cash-deposit-form" onSubmit={(event) => onCashDeposit(event, student, payment, index)}>
                          <input name="amount" type="number" min="1" max={pending} step="1" required placeholder="Amount" />
                          <input name="depositedAt" type="date" defaultValue={dateInputValue()} required />
                          <input name="bank" required maxLength={100} placeholder="Bank / account" />
                          <input name="referenceNumber" required maxLength={paymentReferenceMaxLength} pattern="[A-Za-z0-9][A-Za-z0-9 ._/@:-]*" placeholder="Slip / reference no." />
                          <input name="depositedBy" required maxLength={80} defaultValue={user?.name || ""} placeholder="Deposited by" />
                          <input name="note" maxLength={paymentNoteMaxLength} placeholder="Note" />
                          <input name="depositProof" type="file" accept={leadDocumentAccept} required />
                          <button className="btn btn-primary btn-sm">Deposit</button>
                        </form>
                      )}
                    </td>
                    <td>{(payment.cashDeposits || []).some((deposit) => deposit.proof?.storedName) ? <div className="action-icons">{(payment.cashDeposits || []).map((deposit, depositIndex) => deposit.proof?.storedName ? <button key={`${deposit.proof.storedName}-${depositIndex}`} type="button" className="action-icon-btn action-icon-primary" title={deposit.proof.originalName || "Download deposit proof"} onClick={() => onDownloadCashDepositProof(student, index, deposit, depositIndex)}><Download size={14} /></button> : null)}</div> : <span className="cell-sub">Missing</span>}</td>
                  </tr>
                );
              })}
              {!cashItems.length && <tr><td colSpan={6}><div className="empty-state"><h4>No cash collections</h4><p>Cash payments will appear here after recording.</p></div></td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="two-col finance-grid">
        <div className="card finance-card">
          <div className="card-head"><div><h3>Fee ledger</h3><div className="sub">Per-student billing summary</div></div></div>
          <div className="table-wrap finance-table-wrap">
            <table className="finance-table">
              <thead><tr><th>Student</th><th>Centre</th><th>Course</th><th>Fee (incl. GST)</th><th>Paid</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {students.map((student) => {
                  const due = dueAmount(student);
                  const status = due <= 0 ? "Paid" : (student.paidAmount || 0) > 0 ? "Partial" : "Due";
                  return (
                    <tr className="clickable" key={student._id} onClick={() => onOpen(student)}>
                      <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div></td>
                      <td>{student.centre || "-"}</td>
                      <td>{courseShortCode(student.course)}</td>
                      <td className="mono">{formatCurrency(student.totalFee || 0)}</td>
                      <td className="mono">{formatCurrency(student.paidAmount || 0)}</td>
                      <td className="mono">{formatCurrency(due)}</td>
                      <td><span className={`tag ${status === "Paid" ? "green" : status === "Partial" ? "amber" : "red"}`}>{status}</span></td>
                    </tr>
                  );
                })}
                {!students.length && <tr><td colSpan={7}><div className="empty-state"><h4>No finance records</h4><p>Students will appear here after admission.</p></div></td></tr>}
              </tbody>
            </table>
          </div>
          <Pager meta={meta} label="students" onPage={onPage} />
        </div>
        <div className="card finance-card">
          <div className="card-head"><div><h3>Billed vs collected</h3><div className="sub">Paid against outstanding</div></div></div>
          <div className="card-body finance-chart-body">
            <DonutChart data={slices} size={200} thickness={34} centerValue={formatCurrency(Math.max(billed - discount, 0))} centerLabel="Net billed" />
            <DonutLegend data={slices} formatValue={formatCurrency} />
          </div>
        </div>
      </div>
    </>
  );
}

function EmiPanel({ students, meta, onPage, onOpen }: { students: Student[]; meta: PaginationMeta | null; onPage: (page: number) => void; onOpen: (student: Student) => void }) {
  const today = dateInputValue();
  const month = today.slice(0, 7);
  const emiStudents = students
    .filter((student) => student.emiEnabled || student.nextEmiDate || dueAmount(student) > 0)
    .map((student) => {
      const breakdown = studentEmiBreakdown(student);
      const overdue = Boolean(student.nextEmiDate && student.nextEmiDate < today);
      const amount = breakdown.isEmi ? breakdown.currentDue : dueAmount(student);
      return {
        student,
        overdue,
        breakdown,
        amount,
      };
    })
    .sort((a, b) => Number(b.overdue || b.breakdown.shortfall > 0) - Number(a.overdue || a.breakdown.shortfall > 0));
  const overdueCount = emiStudents.filter((item) => item.overdue || item.breakdown.shortfall > 0).length;
  const upcomingThisMonth = emiStudents.filter((item) => !item.overdue && item.breakdown.shortfall <= 0 && (item.student.nextEmiDate || "").startsWith(month)).length;
  const totalDue = emiStudents.reduce((sum, item) => sum + item.amount, 0);
  return (
    <>
      <div className="grid-metrics emi-metrics">
        <MetricCard label="Due / overdue" value={overdueCount} dot="#E5484D" delta="" down />
        <MetricCard label="Upcoming this month" value={upcomingThisMonth} dot="#F59E0B" delta="" />
        <MetricCard label="Total due amount" value={formatCurrency(totalDue)} dot="#4F6BFF" delta="" />
      </div>
      <div className="filter-bar emi-filter-bar">
        <div className="filter-spacer" />
        <button className="btn btn-ghost" onClick={() => downloadExcelFile(["Student", "Course", "Next EMI date", "Amount due", "Shortfall", "Status"], emiStudents.map(({ student, overdue, breakdown, amount }) => [student.fullName, student.course, formatDate(student.nextEmiDate), amount, breakdown.shortfall || 0, overdue ? "Overdue" : breakdown.shortfall > 0 ? "Shortfall" : "Due"]), "imed-emi-reminders")}><Download size={15} /> Download Excel</button>
      </div>
      <div className="card emi-card">
        <div className="table-wrap emi-table-wrap">
          <table className="emi-table">
            <thead><tr><th>Student</th><th>Course</th><th>Next EMI date</th><th>Amount due</th><th>Status</th><th /></tr></thead>
            <tbody>
              {emiStudents.map(({ student, overdue, breakdown, amount }) => (
                <tr className="clickable" key={student._id} onClick={() => onOpen(student)}>
                  <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div></td>
                  <td>{courseShortCode(student.course)}</td>
                  <td className="mono">{formatDate(student.nextEmiDate)}</td>
                  <td className="mono">
                    <b>{formatCurrency(amount)}</b>
                    {breakdown.shortfall > 0 && <div className="cell-sub" style={{ color: "#EF4444" }}>Includes {formatCurrency(breakdown.shortfall)} shortfall</div>}
                  </td>
                  <td>
                    {overdue ? <span className="tag red">Overdue</span> : breakdown.shortfall > 0 ? <span className="tag amber">Shortfall carried</span> : <span className="tag blue">Upcoming</span>}
                  </td>
                  <td onClick={(event) => event.stopPropagation()}>
                    <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                      <button className="btn btn-sm btn-green" onClick={() => {
                        const url = emiReminderWhatsAppUrl(student);
                        if (url) window.open(url, "_blank", "noopener,noreferrer");
                        else toast.error("Student phone number missing");
                      }}><MessageCircle size={14} /> WhatsApp reminder</button>
                      <button className="btn btn-sm btn-ghost" title="Copy reminder text" onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(emiReminderMessage(student));
                          toast.success("EMI reminder copied with emojis!");
                        } catch {
                          toast.error("Failed to copy reminder");
                        }
                      }}><Copy size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!emiStudents.length && <tr><td colSpan={6}><div className="empty-state"><h4>No pending EMIs</h4></div></td></tr>}
            </tbody>
          </table>
        </div>
        <Pager meta={meta} label="students" onPage={onPage} />
      </div>
    </>
  );
}

function ReceiptsPanel({ students, meta, onPage, onOpen }: { students: Student[]; meta: PaginationMeta | null; onPage: (page: number) => void; onOpen: (student: Student) => void }) {
  const [query, setQuery] = useState("");
  const filteredStudents = students.filter((student) => {
    const haystack = `${student.fullName} ${student.admissionNumber || ""} ${student.course || ""}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });
  return (
    <>
      <div className="filter-bar receipts-filter-bar">
        <input className="fbtn" placeholder="Search student / admission no..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="filter-spacer" />
      </div>
      <div className="card receipts-card">
        <div className="table-wrap receipts-table-wrap">
          <table className="receipts-table">
            <thead><tr><th>Student</th><th>Admission No.</th><th>Course</th><th>Receipts</th><th>Paid / Due</th><th /></tr></thead>
            <tbody>
              {filteredStudents.map((student) => {
                const due = dueAmount(student);
                return (
                  <tr className="clickable" key={student._id} onClick={() => onOpen(student)}>
                    <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.phone || "-"}</div></div></div></td>
                    <td className="mono">{student.admissionNumber || "-"}</td>
                    <td>{courseShortCode(student.course)}</td>
                    <td className="mono">{student.payments?.length || 0}</td>
                    <td className="mono">{formatCurrency(student.paidAmount || 0)} / {formatCurrency(due)}</td>
                    <td><button className="btn btn-sm btn-soft" onClick={(event) => { event.stopPropagation(); onOpen(student); }}>View receipts</button></td>
                  </tr>
                );
              })}
              {!filteredStudents.length && <tr><td colSpan={6}><div className="empty-state"><h4>No receipts found</h4></div></td></tr>}
            </tbody>
          </table>
        </div>
        <Pager meta={meta} label="students" onPage={onPage} />
      </div>
    </>
  );
}

function InventoryPanel({
  summary,
  items,
  tablets,
  transactions,
  students,
  activeTab,
  setActiveTab,
  tabletSearch,
  setTabletSearch,
  onStockInClick,
  onIssueKitClick,
  onReturnTablet,
  onOpenStudent,
}: {
  summary: InventorySummary | null;
  items: InventoryItem[];
  tablets: TabletAsset[];
  transactions: InventoryTransaction[];
  students: Student[];
  activeTab: "overview" | "tablets" | "students" | "logs";
  setActiveTab: (tab: "overview" | "tablets" | "students" | "logs") => void;
  tabletSearch: string;
  setTabletSearch: (q: string) => void;
  onStockInClick: () => void;
  onIssueKitClick: (student?: Student | null, tablet?: TabletAsset | null) => void;
  onReturnTablet: (tablet: TabletAsset) => void;
  onOpenStudent: (student: Student) => void;
}) {
  const idCardsCount = summary?.idCards ?? 0;
  const tshirtsTotal = summary?.tshirts?.total ?? 0;
  const tshirtsBySize = summary?.tshirts?.bySize || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
  const bagsCount = summary?.bags ?? 0;
  const tabletsTotal = summary?.tablets?.total ?? 0;
  const tabletsInStock = summary?.tablets?.inStock ?? 0;
  const tabletsAssigned = summary?.tablets?.assigned ?? 0;
  const [tshirtsExpanded, setTshirtsExpanded] = useState(false);
  const tshirtSizesList = ["S", "M", "L", "XL", "XXL"] as const;
  const emptySizesCount = tshirtSizesList.filter((s) => (tshirtsBySize[s] || 0) === 0).length;
  const lowSizesCount = tshirtSizesList.filter((s) => {
    const q = tshirtsBySize[s] || 0;
    return q > 0 && q <= 5;
  }).length;

  const lowStockAlerts = summary?.lowStockAlerts || [];

  const filteredTablets = tablets.filter((t) => {
    if (!tabletSearch.trim()) return true;
    const q = tabletSearch.toLowerCase();
    return (
      t.assetId.toLowerCase().includes(q) ||
      t.serialNumber.toLowerCase().includes(q) ||
      (t.assignedStudentName || "").toLowerCase().includes(q) ||
      (t.brandModel || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="inventory-prototype">
      <div className="grid-metrics inventory-metrics-grid">
        <MetricCard
          label="ID cards available"
          value={idCardsCount}
          dot="#4F6BFF"
          delta={idCardsCount === 0 ? "out of stock (threshold: 10)" : idCardsCount <= 10 ? "low stock (≤ 10)" : "ready for issue"}
          down={idCardsCount <= 10}
        />
        <MetricCard
          label="T-shirts in stock"
          value={tshirtsTotal}
          dot="#14B8A6"
          delta={`S:${tshirtsBySize.S} M:${tshirtsBySize.M} L:${tshirtsBySize.L} XL:${tshirtsBySize.XL} XXL:${tshirtsBySize.XXL}`}
          down={tshirtsTotal <= 10}
        />
        <MetricCard
          label="Bags in stock"
          value={bagsCount}
          dot="#8B5CF6"
          delta={bagsCount === 0 ? "out of stock (threshold: 5)" : bagsCount <= 5 ? "low stock (≤ 5)" : "student backpacks"}
          down={bagsCount <= 5}
        />
        <MetricCard
          label="Tablets"
          value={`${tabletsInStock} / ${tabletsTotal}`}
          dot="#F5A524"
          delta={tabletsInStock === 0 && tabletsTotal > 0 ? "all assigned (0 available)" : `${tabletsAssigned} assigned to students`}
          down={tabletsInStock === 0}
        />
      </div>

      {lowStockAlerts.length > 0 && (
        <div className="academic-banner inventory-alert-banner" style={{ marginBottom: 16, background: "#FFF8EB", borderColor: "#F5DFB5", color: "#92400E" }}>
          <div className="academic-banner-copy">
            <div>
              <strong>Low Stock Warning</strong>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                The following items are running low:{" "}
                {lowStockAlerts.map((a) => `${a.item} (${a.current} left)`).join(", ")}. Please order replenishment soon.
              </div>
            </div>
          </div>
          <button className="btn btn-sm btn-primary" onClick={onStockInClick}>
            <Plus size={14} /> Stock In
          </button>
        </div>
      )}

      <div className="inventory-filter-bar">
        <div className="inventory-pill-tabs pill-tabs">
          <button
            type="button"
            className={`pill-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Boxes size={15} /> Current Stock
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === "tablets" ? "active" : ""}`}
            onClick={() => setActiveTab("tablets")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Tablet size={15} /> Tablets ({tabletsTotal})
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === "students" ? "active" : ""}`}
            onClick={() => setActiveTab("students")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <GraduationCap size={15} /> Candidate Kit Checklist
          </button>
          <button
            type="button"
            className={`pill-tab ${activeTab === "logs" ? "active" : ""}`}
            onClick={() => setActiveTab("logs")}
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <History size={15} /> Movement Log
          </button>
        </div>

        <div className="inventory-action-group">
          <button type="button" className="btn btn-ghost" onClick={onStockInClick}>
            <Plus size={15} /> Stock In
          </button>
          <button type="button" className="btn btn-primary" onClick={() => onIssueKitClick(null)}>
            <Package size={15} /> Issue Kit to Student
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Current Inventory Stock</h3>
              <div className="sub">Real-time stock balance across candidate kits & assets</div>
            </div>
          </div>
          <div className="table-wrap inventory-table-wrap">
            <table className="inventory-overview-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Variant / Size</th>
                  <th>Current Stock</th>
                  <th>Min Threshold</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ background: "#EEF2FF", color: "#4F6BFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <CreditCard size={18} />
                      </div>
                      <div>
                        <div className="nm">Student ID Cards</div>
                        <div className="mt">iMED branded student cards</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-gray">Standard</span></td>
                  <td><b style={{ fontSize: 15 }}>{idCardsCount}</b> nos</td>
                  <td>10</td>
                  <td>
                    {idCardsCount === 0 ? (
                      <span className="tag red">Out of Stock</span>
                    ) : idCardsCount <= 10 ? (
                      <span className="tag amber">Low Stock</span>
                    ) : (
                      <span className="tag green">In Stock</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-sm btn-ghost" onClick={onStockInClick}>
                      + Stock In
                    </button>
                  </td>
                </tr>

                <tr style={{ background: tshirtsExpanded ? "#F8FAFC" : undefined, transition: "background 0.2s" }}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ background: "#E6F4EA", color: "#137333", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Shirt size={18} />
                      </div>
                      <div>
                        <div className="nm">iMED Academy T-Shirt</div>
                        <div className="mt">Student Uniform Polo / Tee (5 Sizes)</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-xs"
                      onClick={() => setTshirtsExpanded((v) => !v)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        fontWeight: 600,
                        background: tshirtsExpanded ? "#E0F2FE" : "#F1F5F9",
                        color: tshirtsExpanded ? "#0369A1" : "#334155",
                        border: "1px solid",
                        borderColor: tshirtsExpanded ? "#BAE6FD" : "#CBD5E1",
                        borderRadius: 6,
                        padding: "3px 8px",
                        cursor: "pointer",
                      }}
                      title="Click to view/hide individual size breakdown"
                    >
                      <span>5 Sizes</span>
                      {tshirtsExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </td>
                  <td><b style={{ fontSize: 15 }}>{tshirtsTotal}</b> nos</td>
                  <td>5 / size</td>
                  <td>
                    {tshirtsTotal === 0 ? (
                      <span className="tag red">Out of Stock</span>
                    ) : emptySizesCount > 0 ? (
                      <span className="tag amber">{emptySizesCount} Sizes Empty</span>
                    ) : lowSizesCount > 0 ? (
                      <span className="tag amber">Low Stock</span>
                    ) : (
                      <span className="tag green">In Stock</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-sm btn-ghost" onClick={onStockInClick}>
                      + Stock In
                    </button>
                  </td>
                </tr>

                {tshirtsExpanded && (
                  <tr style={{ background: "#F8FAFC" }}>
                    <td colSpan={6} style={{ padding: "6px 16px 14px 44px", borderTop: "none" }}>
                      <div
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid var(--border-soft)",
                          borderRadius: 10,
                          padding: "12px 16px",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                        }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-600)", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span>Size Breakdown ({tshirtsTotal} nos total in inventory)</span>
                          <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-400)" }}>Min threshold: 5 nos per size</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
                          {(["S", "M", "L", "XL", "XXL"] as const).map((size) => {
                            const qty = tshirtsBySize[size] || 0;
                            const isOut = qty === 0;
                            const isLow = qty > 0 && qty <= 5;
                            return (
                              <div
                                key={`breakdown-${size}`}
                                style={{
                                  border: "1px solid",
                                  borderColor: isOut ? "#FECACA" : isLow ? "#FDE68A" : "#E2E8F0",
                                  background: isOut ? "#FFF5F5" : isLow ? "#FFFBEB" : "#F8FAFC",
                                  borderRadius: 8,
                                  padding: "8px 12px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 4,
                                }}
                              >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <span className="badge badge-teal" style={{ fontWeight: 700, fontSize: 11 }}>Size {size}</span>
                                  {isOut ? (
                                    <span className="tag red" style={{ fontSize: 10, padding: "2px 5px", height: "auto", lineHeight: "1.2" }}>Out</span>
                                  ) : isLow ? (
                                    <span className="tag amber" style={{ fontSize: 10, padding: "2px 5px", height: "auto", lineHeight: "1.2" }}>Low</span>
                                  ) : (
                                    <span className="tag green" style={{ fontSize: 10, padding: "2px 5px", height: "auto", lineHeight: "1.2" }}>In Stock</span>
                                  )}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: isOut ? "#DC2626" : "#1E293B", marginTop: 2 }}>
                                  {qty} <span style={{ fontSize: 11, fontWeight: 500, color: "#64748B" }}>nos</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ background: "#F3E8FF", color: "#8B5CF6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <div className="nm">iMED Student Bags</div>
                        <div className="mt">Academy backpacks</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-gray">Standard</span></td>
                  <td><b style={{ fontSize: 15 }}>{bagsCount}</b> nos</td>
                  <td>5</td>
                  <td>
                    {bagsCount === 0 ? (
                      <span className="tag red">Out of Stock</span>
                    ) : bagsCount <= 5 ? (
                      <span className="tag amber">Low Stock</span>
                    ) : (
                      <span className="tag green">In Stock</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-sm btn-ghost" onClick={onStockInClick}>
                      + Stock In
                    </button>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="avatar" style={{ background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Tablet size={18} />
                      </div>
                      <div>
                        <div className="nm">Tablets (Asset Registry)</div>
                        <div className="mt">Serialized digital learning devices</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge badge-purple">{tabletsTotal} Total Assets</span></td>
                  <td>
                    <b style={{ fontSize: 15, color: "#137333" }}>{tabletsInStock} available</b>
                    <div className="mt">{tabletsAssigned} assigned to students</div>
                  </td>
                  <td>-</td>
                  <td>
                    {tabletsTotal === 0 ? (
                      <span className="tag gray">No Assets</span>
                    ) : tabletsInStock === 0 ? (
                      <span className="tag red">0 In Stock</span>
                    ) : (
                      <span className="tag blue">{tabletsInStock} In Stock</span>
                    )}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn btn-sm btn-ghost" onClick={() => setActiveTab("tablets")}>
                      View Registry
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "tablets" && (
        <div className="card">
          <div className="card-head inventory-search-head">
            <div>
              <h3>Tablets Asset Registry</h3>
              <div className="sub">Serialized hardware devices with asset tracking</div>
            </div>
            <div className="inventory-search-controls">
              <input
                className="fbtn"
                placeholder="Search Asset ID, S/N, Student..."
                value={tabletSearch}
                onChange={(e) => setTabletSearch(e.target.value)}
                style={{ width: 240, maxWidth: "100%" }}
              />
              <button className="btn btn-sm btn-primary" onClick={onStockInClick}>
                <Plus size={14} /> Add Tablet
              </button>
            </div>
          </div>
          <div className="table-wrap inventory-table-wrap">
            <table className="inventory-tablets-table">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Serial Number</th>
                  <th>Brand / Model</th>
                  <th>Status</th>
                  <th>Assigned Student</th>
                  <th>Handover Date</th>
                  <th>Remarks</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTablets.map((t) => (
                  <tr key={t._id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Tablet size={16} color="#4F6BFF" />
                        <b className="mono">{t.assetId}</b>
                      </div>
                    </td>
                    <td className="mono" style={{ color: "#475569" }}>
                      {t.serialNumber}
                    </td>
                    <td>{t.brandModel || "Android Tablet"}</td>
                    <td>
                      {t.status === "In Stock" && <span className="tag green">In Stock</span>}
                      {t.status === "Assigned" && <span className="tag purple">Assigned</span>}
                      {t.status === "Under Repair" && <span className="tag amber">Under Repair</span>}
                      {t.status === "Returned" && <span className="tag blue">Returned</span>}
                      {t.status === "Decommissioned" && <span className="tag red">Decommissioned</span>}
                    </td>
                    <td>
                      {t.assignedStudentName ? (
                        <div>
                          <div className="nm">{t.assignedStudentName}</div>
                          <div className="mt mono">{t.assignedStudentAdmissionNo || "-"}</div>
                        </div>
                      ) : (
                        <span style={{ color: "#94A3B8" }}>Unassigned</span>
                      )}
                    </td>
                    <td>{t.assignedDate ? formatDate(t.assignedDate) : "-"}</td>
                    <td><span className="cell-sub">{t.remarks || "-"}</span></td>
                    <td style={{ textAlign: "right" }}>
                      {t.status === "Assigned" ? (
                        <button
                          className="btn btn-sm btn-ghost"
                          onClick={() => onReturnTablet(t)}
                        >
                          Return to stock
                        </button>
                      ) : t.status === "In Stock" ? (
                        <button
                          className="btn btn-sm btn-soft"
                          onClick={() => onIssueKitClick(null, t)}
                        >
                          Assign
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}
                {!filteredTablets.length && (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">
                        <h4>No tablets found</h4>
                        <p>Click "Add Tablet" or "Stock In" to register new devices.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "students" && (
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Candidate Kit Distribution Checklist</h3>
              <div className="sub">Track items delivered to each candidate</div>
            </div>
          </div>
          <div className="table-wrap inventory-table-wrap">
            <table className="inventory-checklist-table">
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Admission No.</th>
                  <th>Course & Batch</th>
                  <th><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><CreditCard size={14} color="#4F6BFF" /> ID Card</span></th>
                  <th><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Shirt size={14} color="#14B8A6" /> T-Shirt</span></th>
                  <th><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><ShoppingBag size={14} color="#8B5CF6" /> Bag</span></th>
                  <th><span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><Tablet size={14} color="#F5A524" /> Tablet</span></th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const kd = student.kitDistribution || {};
                  return (
                    <tr key={student._id}>
                      <td>
                        <div
                          className="lead-name-cell clickable"
                          onClick={() => onOpenStudent(student)}
                        >
                          <span className="avatar lead-avatar">{initials(student.fullName)}</span>
                          <div>
                            <div className="cell-name">{student.fullName}</div>
                            <div className="cell-sub">{student.phone || "-"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="mono">{student.admissionNumber || "-"}</td>
                      <td>
                        <div>
                          <div>{courseShortCode(student.course)}</div>
                          <div className="mt">{student.batch || "Unassigned"}</div>
                        </div>
                      </td>
                      <td>
                        {kd.idCardIssued ? (
                          <span className="tag green">Issued {kd.idCardNumber ? `(${kd.idCardNumber})` : ""}</span>
                        ) : (
                          <span className="tag amber">Pending</span>
                        )}
                      </td>
                      <td>
                        {kd.tshirtIssued ? (
                          <span className="tag green">Size {kd.tshirtSize || "-"}</span>
                        ) : (
                          <span className="tag amber">Pending</span>
                        )}
                      </td>
                      <td>
                        {kd.bagIssued ? (
                          <span className="tag green">Issued</span>
                        ) : (
                          <span className="tag amber">Pending</span>
                        )}
                      </td>
                      <td>
                        {kd.tabletIssued ? (
                          <span className="tag purple mono">
                            {kd.tabletAssetId || "Assigned"}
                          </span>
                        ) : (
                          <span className="tag gray">Not Assigned</span>
                        )}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => onIssueKitClick(student)}
                        >
                          Issue / Edit Kit
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {!students.length && (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">
                        <h4>No candidates found</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Stock Movement History</h3>
              <div className="sub">Complete audit log of Inward (Stock In) and Outward (Stock Out / Returns)</div>
            </div>
          </div>
          <div className="table-wrap inventory-table-wrap">
            <table className="inventory-logs-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Item Details</th>
                  <th>Quantity</th>
                  <th>Candidate / Vendor</th>
                  <th>Handled By</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tr) => (
                  <tr key={tr._id}>
                    <td className="cell-sub">{tr.date ? formatDateTime(tr.date) : "-"}</td>
                    <td>
                      {tr.type === "Stock In" && <span className="tag green">Stock In</span>}
                      {tr.type === "Stock Out" && <span className="tag blue">Stock Out</span>}
                      {tr.type === "Return" && <span className="tag amber">Return</span>}
                      {tr.type === "Adjustment" && <span className="tag gray">Adjustment</span>}
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {tr.itemType === "id_card" && <CreditCard size={15} color="#4F6BFF" />}
                        {tr.itemType === "tshirt" && <Shirt size={15} color="#14B8A6" />}
                        {tr.itemType === "bag" && <ShoppingBag size={15} color="#8B5CF6" />}
                        {tr.itemType === "tablet" && <Tablet size={15} color="#F5A524" />}
                        <div>
                          <b>
                            {tr.itemType === "id_card" && "ID Card"}
                            {tr.itemType === "tshirt" && `T-Shirt (${tr.size || "Standard"})`}
                            {tr.itemType === "bag" && "Student Bag"}
                            {tr.itemType === "tablet" && `Tablet ${tr.assetId ? `(${tr.assetId})` : ""}`}
                          </b>
                          {tr.serialNumber && <div className="mt mono">S/N: {tr.serialNumber}</div>}
                        </div>
                      </div>
                    </td>
                    <td><b>{tr.quantity}</b> nos</td>
                    <td>
                      {tr.studentName ? (
                        <div>
                          <div className="nm">{tr.studentName}</div>
                          <div className="mt">Candidate Issue</div>
                        </div>
                      ) : tr.vendorChallan ? (
                        <div>
                          <div className="nm">Challan: {tr.vendorChallan}</div>
                          <div className="mt">Vendor Shipment</div>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>{tr.handledBy || "Operations"}</td>
                    <td><span className="cell-sub">{tr.notes || "-"}</span></td>
                  </tr>
                ))}
                {!transactions.length && (
                  <tr>
                    <td colSpan={7}>
                      <div className="empty-state">
                        <h4>No inventory transactions yet</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StockInModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<boolean>;
}) {
  const [itemType, setItemType] = useState<"id_card" | "tshirt" | "bag" | "tablet">("tshirt");
  const [tshirtSize, setTshirtSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("L");
  const [quantity, setQuantity] = useState("10");
  const [vendorChallan, setVendorChallan] = useState("");
  const [notes, setNotes] = useState("");
  const [assetId, setAssetId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [brandModel, setBrandModel] = useState("Samsung Galaxy Tab A9");
  const [challanError, setChallanError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const cleanChallan = vendorChallan.trim().toUpperCase();
    if (cleanChallan.length > 0 && cleanChallan.length < 3) {
      setChallanError("Reference must be at least 3 characters (or leave empty)");
      return;
    }
    setChallanError("");
    setSubmitting(true);
    let ok = false;
    if (itemType === "tablet") {
      ok = await onSubmit({
        itemType: "tablet",
        tablets: [{ assetId: assetId.trim(), serialNumber: serialNumber.trim(), brandModel: brandModel.trim(), remarks: notes.trim() }],
        vendorChallan: cleanChallan,
        notes: notes.trim(),
      });
    } else {
      ok = await onSubmit({
        itemType,
        size: itemType === "tshirt" ? tshirtSize : "NA",
        quantity: Number(quantity) || 1,
        vendorChallan: cleanChallan,
        notes: notes.trim(),
      });
    }
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay show">
      <div
        className="modal inventory-modal"
        style={{
          maxWidth: 520,
          display: "flex",
          flexDirection: "column",
          maxHeight: "88vh",
          overflow: "hidden",
        }}
      >
        <div className="modal-head" style={{ flex: "0 0 auto", padding: "12px 18px", borderBottom: "1px solid var(--border-soft)" }}>
          <h3 style={{ fontSize: 15 }}>Stock In (Inward Stock)</h3>
          <button className="icon-btn" onClick={onClose}>x</button>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", flex: "1 1 auto", minHeight: 0, overflow: "hidden" }}
        >
          <div
            className="modal-body"
            style={{
              display: "grid",
              gap: 12,
              padding: "14px 20px",
              overflowY: "auto",
              flex: "1 1 auto",
            }}
          >
            <div className="field" style={{ margin: 0 }}>
              <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Select Item to Receive</label>
              <div className="inventory-type-grid">
                {[
                  { key: "tshirt", label: "T-Shirt", icon: <Shirt size={16} /> },
                  { key: "bag", label: "Bag", icon: <ShoppingBag size={16} /> },
                  { key: "id_card", label: "ID Card", icon: <CreditCard size={16} /> },
                  { key: "tablet", label: "Tablet", icon: <Tablet size={16} /> },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`df-btn ${itemType === item.key ? "active" : ""}`}
                    style={{ border: "1px solid var(--border)", textAlign: "center", padding: "10px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
                    onClick={() => setItemType(item.key as any)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {itemType === "tshirt" && (
              <div className="field" style={{ margin: 0 }}>
                <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>T-Shirt Size</label>
                <div className="inventory-size-tabs">
                  {(["S", "M", "L", "XL", "XXL"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`pill-tab ${tshirtSize === s ? "active" : ""}`}
                      style={{ border: "1px solid var(--border)", minWidth: 44, textAlign: "center" }}
                      onClick={() => setTshirtSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {itemType !== "tablet" ? (
              <div className="field" style={{ margin: 0 }}>
                <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Quantity Received</label>
                <input
                  type="number"
                  min="1"
                  className="fbtn"
                  style={{ height: 34 }}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div style={{ display: "grid", gap: 8, background: "#F8FAFC", padding: 12, borderRadius: 10, border: "1px solid var(--border-soft)" }}>
                <div className="field" style={{ margin: 0 }}>
                  <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Unique Tablet Asset ID (e.g., TAB-001)</label>
                  <input
                    type="text"
                    className="fbtn mono"
                    style={{ height: 34 }}
                    placeholder="TAB-001"
                    value={assetId}
                    onChange={(e) => setAssetId(e.target.value)}
                    required
                  />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Hardware Serial Number (S/N or IMEI)</label>
                  <input
                    type="text"
                    className="fbtn mono"
                    style={{ height: 34 }}
                    placeholder="SN-R52N..."
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="field" style={{ margin: 0 }}>
                  <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Make / Model</label>
                  <input
                    type="text"
                    className="fbtn"
                    style={{ height: 34 }}
                    value={brandModel}
                    onChange={(e) => setBrandModel(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="field" style={{ margin: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <label style={{ margin: 0, fontSize: 12, fontWeight: 700 }}>Delivery Challan / Invoice Reference</label>
                <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>(Optional)</span>
              </div>
              <input
                type="text"
                className="fbtn mono"
                style={{
                  height: 34,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  borderColor: challanError ? "#EF4444" : undefined,
                  background: challanError ? "#FEF2F2" : undefined,
                }}
                placeholder="e.g., DC-2026-091 or HO-SHIP-04"
                value={vendorChallan}
                onChange={(e) => {
                  const val = e.target.value.toUpperCase();
                  setVendorChallan(val);
                  if (val.trim().length > 0 && val.trim().length < 3) {
                    setChallanError("Reference must be at least 3 characters if provided (or leave empty)");
                  } else {
                    setChallanError("");
                  }
                }}
              />
              {challanError && (
                <div style={{ fontSize: 11, color: "#DC2626", marginTop: 4, fontWeight: 500 }}>
                  {challanError}
                </div>
              )}
            </div>

            <div className="field" style={{ margin: 0 }}>
              <label style={{ marginBottom: 4, fontSize: 12, fontWeight: 700 }}>Notes / Condition</label>
              <input
                type="text"
                className="fbtn"
                style={{ height: 34 }}
                placeholder="Remarks about shipment or packing condition"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-foot" style={{ flex: "0 0 auto", padding: "12px 20px", borderTop: "1px solid var(--border-soft)", background: "#fff" }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Adding..." : "Confirm Stock In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function IssueKitModal({
  open,
  students,
  targetStudent,
  targetTablet,
  tablets,
  summary,
  onClose,
  onSubmit,
}: {
  open: boolean;
  students: Student[];
  targetStudent: Student | null;
  targetTablet?: TabletAsset | null;
  tablets: TabletAsset[];
  summary: InventorySummary | null;
  onClose: () => void;
  onSubmit: (payload: any) => Promise<boolean>;
}) {
  const [selectedStudentId, setSelectedStudentId] = useState(targetStudent?._id || students[0]?._id || "");
  const [issueIdCard, setIssueIdCard] = useState(false);
  const [idCardNumber, setIdCardNumber] = useState("");
  type TshirtSize = "S" | "M" | "L" | "XL" | "XXL";
  interface TshirtSelection {
    size: TshirtSize;
    quantity: number;
  }

  const [issueTshirt, setIssueTshirt] = useState(false);
  const [tshirtSelections, setTshirtSelections] = useState<TshirtSelection[]>([
    { size: "L", quantity: 1 },
  ]);
  const [issueBag, setIssueBag] = useState(false);
  const [issueTablet, setIssueTablet] = useState(false);
  const [selectedTabletId, setSelectedTabletId] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const availableTablets = tablets.filter((t) => t.status === "In Stock");

  useEffect(() => {
    if (targetStudent) {
      setSelectedStudentId(targetStudent._id);
      setIdCardNumber(targetStudent.admissionNumber || "");
      const kd = targetStudent.kitDistribution || {};
      setIssueIdCard(!kd.idCardIssued);
      setIssueTshirt(!kd.tshirtIssued);
      if (Array.isArray(kd.tshirts) && kd.tshirts.length > 0) {
        setTshirtSelections(kd.tshirts.map((t) => ({ size: (t.size as TshirtSize) || "L", quantity: t.quantity || 1 })));
      } else if (kd.tshirtSize && ["S", "M", "L", "XL", "XXL"].includes(kd.tshirtSize as any)) {
        setTshirtSelections([{ size: kd.tshirtSize as TshirtSize, quantity: kd.tshirtQuantity || 1 }]);
      } else {
        setTshirtSelections([{ size: "L", quantity: 1 }]);
      }
      setIssueBag(!kd.bagIssued);
      setIssueTablet(!kd.tabletIssued);
    } else if (students.length) {
      setSelectedStudentId(students[0]._id);
      setIdCardNumber(students[0].admissionNumber || "");
    }

    if (targetTablet && targetTablet.status === "In Stock") {
      setSelectedTabletId(targetTablet._id);
      setIssueTablet(true);
    } else if (availableTablets.length) {
      const isValid = availableTablets.some((t) => t._id === selectedTabletId);
      if (!isValid) {
        setSelectedTabletId(availableTablets[0]._id);
      }
    } else {
      setSelectedTabletId("");
    }
  }, [targetStudent, targetTablet, students.length, availableTablets.length]);

  if (!open) return null;

  const tshirtsBySize = summary?.tshirts?.bySize || { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
  const tshirtsTotal = summary?.tshirts?.total ?? 0;

  const handleTshirtSizeChange = (index: number, newSize: TshirtSize) => {
    setTshirtSelections((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], size: newSize };
      return next;
    });
  };

  const handleTshirtQtyChange = (index: number, newQty: number) => {
    setTshirtSelections((prev) => {
      const next = [...prev];
      const maxAvailable = tshirtsBySize[next[index].size] || 1;
      const validQty = Math.max(1, Math.min(newQty, Math.max(1, maxAvailable)));
      next[index] = { ...next[index], quantity: validQty };
      return next;
    });
  };

  const addTshirtSelection = () => {
    const usedSizes = new Set(tshirtSelections.map((s) => s.size));
    const allSizes: TshirtSize[] = ["S", "M", "L", "XL", "XXL"];
    const nextSize = allSizes.find((s) => !usedSizes.has(s) && (tshirtsBySize[s] || 0) > 0)
      || allSizes.find((s) => !usedSizes.has(s))
      || "L";
    setTshirtSelections((prev) => [...prev, { size: nextSize, quantity: 1 }]);
  };

  const removeTshirtSelection = (index: number) => {
    if (tshirtSelections.length <= 1) return;
    setTshirtSelections((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return toast.error("Select a candidate");
    if (!issueIdCard && !issueTshirt && !issueBag && !issueTablet) {
      return toast.error("Select at least one item to issue");
    }
    const finalTabletId = availableTablets.some((t) => t._id === selectedTabletId)
      ? selectedTabletId
      : (availableTablets[0]?._id || selectedTabletId);

    if (issueTablet && !finalTabletId) {
      return toast.error("Select an available tablet to assign");
    }
    if (issueTshirt) {
      const totalTshirts = tshirtSelections.reduce((sum, t) => sum + (t.quantity || 0), 0);
      if (totalTshirts < 1) {
        return toast.error("Please enter at least 1 T-Shirt to issue");
      }
      for (const t of tshirtSelections) {
        const available = tshirtsBySize[t.size] || 0;
        if (available < t.quantity) {
          return toast.error(`Not enough stock for Size ${t.size} (${available} in stock, requested ${t.quantity})`);
        }
      }
    }
    setSubmitting(true);
    const totalTshirts = tshirtSelections.reduce((sum, t) => sum + (t.quantity || 0), 0);
    const sizeSummary = tshirtSelections
      .map((t) => (t.quantity > 1 ? `${t.size} (×${t.quantity})` : t.size))
      .join(", ");
    const ok = await onSubmit({
      studentId: selectedStudentId,
      issueIdCard,
      idCardNumber,
      issueTshirt,
      tshirtSize: sizeSummary,
      tshirtQuantity: totalTshirts,
      tshirts: tshirtSelections,
      issueBag,
      issueTablet,
      tabletId: finalTabletId,
      notes,
    });
    setSubmitting(false);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay show">
      <div
        className="modal inventory-modal"
        style={{
          maxWidth: 560,
          display: "flex",
          flexDirection: "column",
          maxHeight: "88vh",
          overflow: "hidden",
        }}
      >
        <div className="modal-head" style={{ flex: "0 0 auto", padding: "12px 18px", borderBottom: "1px solid var(--border-soft)" }}>
          <h3 style={{ fontSize: 15 }}>Issue Kit & Assets to Candidate</h3>
          <button className="icon-btn" onClick={onClose}>x</button>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", flex: "1 1 auto", minHeight: 0, overflow: "hidden", margin: 0 }}
        >
          <div
            className="modal-body"
            style={{
              display: "grid",
              gap: 8,
              padding: "12px 18px",
              overflowY: "auto",
              overflowX: "hidden",
              flex: "1 1 auto",
              minHeight: 0,
            }}
          >
            <div className="field" style={{ margin: 0, width: "100%", maxWidth: "100%" }}>
              <label style={{ marginBottom: 3, fontSize: 11.5, fontWeight: 700 }}>Select Candidate</label>
              <select
                className="fbtn"
                style={{ height: 34, fontSize: 12, width: "100%", maxWidth: "100%", minWidth: 0 }}
                value={selectedStudentId}
                onChange={(e) => {
                  const id = e.target.value;
                  setSelectedStudentId(id);
                  const st = students.find((s) => s._id === id);
                  if (st) setIdCardNumber(st.admissionNumber || "");
                }}
                required
              >
                {students.map((st) => (
                  <option key={st._id} value={st._id}>
                    {st.fullName} ({courseShortCode(st.course)} - {st.batch || "No batch"} - {st.admissionNumber || st.phone})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gap: 6, border: "1px solid var(--border)", borderRadius: 10, padding: "10px 14px", background: "#FBFBFE", width: "100%", boxSizing: "border-box" }}>
              <div style={{ fontWeight: 700, fontSize: 11.5, color: "#1E293B", marginBottom: 2 }}>
                Select Items to Hand Over:
              </div>

              {/* ID Card */}
              <div className="inventory-issue-row">
                <label className="inventory-issue-label">
                  <div className="inventory-issue-title">
                    <input
                      type="checkbox"
                      checked={issueIdCard}
                      onChange={(e) => setIssueIdCard(e.target.checked)}
                    />
                    <CreditCard size={15} color="#4F6BFF" />
                    <span>Student ID Card</span>
                  </div>
                  <div className="inventory-issue-stock">
                    <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 7px", whiteSpace: "nowrap" }}>
                      {summary?.idCards || 0} in stock
                    </span>
                  </div>
                </label>
                <div className={`inventory-issue-controls ${!issueIdCard ? "unselected" : ""}`}>
                  {issueIdCard ? (
                    <input
                      className="fbtn inventory-item-input"
                      style={{ width: "100%", height: 32, fontSize: 12 }}
                      placeholder="Card / Roll No"
                      value={idCardNumber}
                      onChange={(e) => setIdCardNumber(e.target.value)}
                    />
                  ) : (
                    <span className="inventory-unselected-text">Not selected</span>
                  )}
                </div>
              </div>

              {/* T-Shirt */}
              <div className="inventory-issue-row" style={{ alignItems: "flex-start" }}>
                <label className="inventory-issue-label" style={{ margin: "4px 0 0 0" }}>
                  <div className="inventory-issue-title">
                    <input
                      type="checkbox"
                      checked={issueTshirt}
                      onChange={(e) => setIssueTshirt(e.target.checked)}
                    />
                    <Shirt size={15} color="#14B8A6" />
                    <span>iMED T-Shirt</span>
                  </div>
                  <div className="inventory-issue-stock" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 7px", whiteSpace: "nowrap" }}>
                      {tshirtsTotal} in stock
                    </span>
                    {issueTshirt && tshirtSelections.reduce((sum, t) => sum + (t.quantity || 0), 0) > 1 && (
                      <span style={{ fontSize: 10, color: "var(--indigo-600)", fontWeight: 700 }}>
                        {tshirtSelections.reduce((sum, t) => sum + (t.quantity || 0), 0)} pcs total
                      </span>
                    )}
                  </div>
                </label>
                <div className={`inventory-issue-controls ${!issueTshirt ? "unselected" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "stretch" }}>
                  {issueTshirt ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                      {tshirtSelections.map((sel, idx) => {
                        const available = tshirtsBySize[sel.size] || 0;
                        return (
                          <div key={`tshirt-sel-${idx}`} style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                            <select
                              className="fbtn inventory-item-input"
                              style={{ flex: "1 1 auto", height: 32, fontSize: 12, minWidth: 0, padding: "4px 8px" }}
                              value={sel.size}
                              onChange={(e) => handleTshirtSizeChange(idx, e.target.value as TshirtSize)}
                            >
                              {(["S", "M", "L", "XL", "XXL"] as const).map((s) => (
                                <option key={s} value={s}>
                                  Size {s} ({tshirtsBySize[s] || 0})
                                </option>
                              ))}
                            </select>
                            <input
                              type="number"
                              min={1}
                              max={Math.max(1, available)}
                              className="fbtn"
                              style={{ width: 50, height: 32, fontSize: 12, textAlign: "center", padding: "2px 4px", flexShrink: 0 }}
                              value={sel.quantity}
                              onChange={(e) => handleTshirtQtyChange(idx, parseInt(e.target.value, 10) || 1)}
                              title="Quantity to issue"
                            />
                            {tshirtSelections.length > 1 && (
                              <button
                                type="button"
                                className="icon-btn"
                                onClick={() => removeTshirtSelection(idx)}
                                style={{ width: 24, height: 24, color: "#EF4444", fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                                title="Remove size"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        );
                      })}
                      {tshirtSelections.length < 5 && (
                        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                          <button
                            type="button"
                            onClick={addTshirtSelection}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--indigo-600)",
                              fontSize: 11.5,
                              fontWeight: 600,
                              cursor: "pointer",
                              padding: "2px 0",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            + Add another size
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="inventory-unselected-text">Not selected</span>
                  )}
                </div>
              </div>

              {/* Bag */}
              <div className="inventory-issue-row">
                <label className="inventory-issue-label">
                  <div className="inventory-issue-title">
                    <input
                      type="checkbox"
                      checked={issueBag}
                      onChange={(e) => setIssueBag(e.target.checked)}
                    />
                    <ShoppingBag size={15} color="#8B5CF6" />
                    <span>Student Backpack</span>
                  </div>
                  <div className="inventory-issue-stock">
                    <span className="badge badge-gray" style={{ fontSize: 10, padding: "2px 7px", whiteSpace: "nowrap" }}>
                      {summary?.bags || 0} in stock
                    </span>
                  </div>
                </label>
                <div className={`inventory-issue-controls ${!issueBag ? "unselected" : ""}`}>
                  {issueBag ? (
                    <span className="badge badge-teal" style={{ fontSize: 11, padding: "3px 8px", fontWeight: 600 }}>
                      Standard Pack
                    </span>
                  ) : (
                    <span className="inventory-unselected-text">Not selected</span>
                  )}
                </div>
              </div>

              {/* Tablet */}
              <div className="inventory-issue-row" style={{ borderBottom: 0 }}>
                <label className="inventory-issue-label">
                  <div className="inventory-issue-title">
                    <input
                      type="checkbox"
                      checked={issueTablet}
                      onChange={(e) => setIssueTablet(e.target.checked)}
                    />
                    <Tablet size={15} color="#F5A524" />
                    <span>Learning Tablet</span>
                  </div>
                  <div className="inventory-issue-stock">
                    <span className="badge badge-purple" style={{ fontSize: 10, padding: "2px 7px", whiteSpace: "nowrap" }}>
                      {availableTablets.length} available
                    </span>
                  </div>
                </label>
                <div className={`inventory-issue-controls ${!issueTablet ? "unselected" : ""}`}>
                  {issueTablet ? (
                    availableTablets.length ? (
                      <select
                        className="fbtn inventory-item-input"
                        style={{ width: "100%", height: 32, fontSize: 11.5 }}
                        value={availableTablets.some((tb) => tb._id === selectedTabletId) ? selectedTabletId : (availableTablets[0]?._id || "")}
                        onChange={(e) => setSelectedTabletId(e.target.value)}
                        required
                      >
                        {availableTablets.map((tb) => (
                          <option key={tb._id} value={tb._id}>
                            Asset: {tb.assetId} - {tb.brandModel}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="tag red" style={{ fontSize: 10.5, padding: "2px 6px" }}>0 In Stock</span>
                    )
                  ) : (
                    <span className="inventory-unselected-text">Not selected</span>
                  )}
                </div>
              </div>
            </div>

            <div className="field" style={{ margin: 0, width: "100%", maxWidth: "100%" }}>
              <label style={{ marginBottom: 3, fontSize: 11.5, fontWeight: 700 }}>Delivery Remarks / Signature Note</label>
              <input
                type="text"
                className="fbtn"
                style={{ height: 32, fontSize: 12, width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
                placeholder="e.g. Received in person by student"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-foot" style={{ flex: "0 0 auto", padding: "10px 18px", borderTop: "1px solid var(--border-soft)", background: "#fff" }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Issuing..." : "Confirm & Issue Kit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ReceiptDrawer({ student, centres, selection, setSelection, onClose }: { student: Student | null; centres: Centre[]; selection: ReceiptSelection; setSelection: (selection: ReceiptSelection) => void; onClose: () => void }) {
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const payments = student?.payments || [];
  const selectedPayment = selection.type === "payment" ? payments[selection.index] : undefined;
  const createReceiptPdfBlob = async () => {
    if (!student || !receiptRef.current) throw new Error("Receipt is not ready");
    const invoiceNode = receiptRef.current.querySelector(".tax-invoice") as HTMLElement | null;
    if (!invoiceNode) throw new Error("Receipt is not ready");
    let printNode: HTMLElement | null = null;
    try {
      await document.fonts?.ready;
      printNode = invoiceNode.cloneNode(true) as HTMLElement;
      printNode.style.width = "820px";
      printNode.style.maxWidth = "none";
      printNode.style.minWidth = "820px";
      printNode.style.position = "absolute";
      printNode.style.left = "-10000px";
      printNode.style.top = "0";
      document.body.appendChild(printNode);
      const canvas = await html2canvas(printNode, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        windowWidth: printNode.scrollWidth,
        windowHeight: printNode.scrollHeight,
      });
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 18;
      const maxWidth = pageWidth - margin * 2;
      const maxHeight = pageHeight - margin * 2;
      const imageRatio = canvas.height / canvas.width;
      const renderWidth = Math.min(maxWidth, maxHeight / imageRatio);
      const renderHeight = renderWidth * imageRatio;
      const x = (pageWidth - renderWidth) / 2;
      const y = margin;
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");
      return { blob: pdf.output("blob"), fileName: receiptDocumentFileName(student, selection) };
    } finally {
      printNode?.remove();
    }
  };
  const printReceiptPdf = async () => {
    if (!student) return;
    const toastId = toast.loading("Preparing PDF...");
    try {
      const { blob, fileName } = await createReceiptPdfBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      toast.success("PDF saved", { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save PDF", { id: toastId });
    }
  };
  const shareReceiptPdf = async () => {
    if (!student) return;
    const toastId = toast.loading("Preparing PDF...");
    try {
      const { blob, fileName } = await createReceiptPdfBlob();
      const file = new File([blob], fileName, { type: "application/pdf" });
      const shareText = selection.type === "payment"
        ? `Payment receipt for ${student.fullName}`
        : `Tax invoice for ${student.fullName}`;
      const shareData = { title: fileName.replace(/\.pdf$/i, ""), text: shareText, files: [file] };
      const shareNavigator = navigator as Navigator & { canShare?: (data: typeof shareData) => boolean };
      if (navigator.share && (!shareNavigator.canShare || shareNavigator.canShare(shareData))) {
        await navigator.share(shareData);
        toast.success("PDF ready to share", { id: toastId });
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      toast.success("PDF saved. Opening WhatsApp message.", { id: toastId });
      window.open(receiptWhatsAppUrl(student, selection), "_blank", "noopener,noreferrer");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.dismiss(toastId);
        return;
      }
      toast.error(error instanceof Error ? error.message : "Unable to share PDF", { id: toastId });
    }
  };

  return (
    <>
      <div className={`drawer-overlay ${student ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer receipt-drawer ${student ? "show" : ""}`}>
        {student && (
          <>
            <div className="drawer-head">
              <span className="avatar drawer-avatar">{initials(student.fullName)}</span>
              <div className="drawer-title"><h3>{student.fullName}</h3><div className="cell-sub mono">{student.admissionNumber || student.phone}</div></div>
              <button className="close-x" onClick={onClose}>x</button>
            </div>
            <div className="dtabs receipt-tabs">
              <button className={`dtab ${selection.type === "invoice" ? "active" : ""}`} onClick={() => setSelection({ type: "invoice" })}>Tax invoice</button>
              {payments.map((payment, index) => (
                <button className={`dtab ${selection.type === "payment" && selection.index === index ? "active" : ""}`} key={`${payment.paidAt || index}-${index}`} onClick={() => setSelection({ type: "payment", index })}>
                  {payment.mode === "EMI" ? "EMI receipt" : "Payment receipt"} {index + 1}
                </button>
              ))}
            </div>
            <div className="drawer-body receipt-drawer-body">
              <div ref={receiptRef} className="invoice-card receipt-print-target">
                {selectedPayment ? <PaymentReceipt student={student} payment={selectedPayment} paymentIndex={selection.type === "payment" ? selection.index : 0} centres={centres} /> : <TaxInvoice student={student} paymentMode={payments[payments.length - 1]?.mode || "Cash"} centres={centres} />}
              </div>
              <div className="invoice-actions">
                <button className="btn btn-ghost" onClick={shareReceiptPdf}><MessageCircle size={15} /> Share WhatsApp</button>
                <button className="btn btn-primary" onClick={printReceiptPdf}><Download size={15} /> Print / Save PDF</button>
              </div>
              {!payments.length && selection.type !== "invoice" && <div className="empty-state"><h4>No payment receipts yet</h4></div>}
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function TaxInvoice({ student, paymentMode, centres }: { student: Student; paymentMode: string; centres: Centre[] }) {
  const billing = billingEntityForStudent(student, centres);
  const lastPayment = student.payments?.[student.payments.length - 1];
  const totalFee = student.totalFee || 0;
  const discount = student.discountAmount || 0;
  const netFee = Math.max(0, totalFee - discount);
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
        <div className="invoice-seller"><strong>{billing.legalName}</strong><span>{billing.address}</span><span><b>GSTIN/UIN:</b> {billing.gstin}</span><span><b>State Name:</b> {billing.stateName}, Code : {billing.stateCode}</span><span><b>E-Mail:</b> {billing.email}{billing.phone ? ` | Phone: ${billing.phone}` : ""}</span><span><b>Consignee (Ship To)</b></span><strong>{student.fullName}</strong><span>{student.centre || "Delhi"}</span><span><b>State Name:</b> {placeOfSupply}</span></div>
        <div className="invoice-meta-grid"><div><span>Invoice No.</span><b>{invoiceNumber(student)}</b></div><div><span>Dated</span><b>{invoiceDate}</b></div><div><span>Delivery Note</span><b>{paymentMode}</b></div><div><span>Mode/Terms of Payment</span><b>{paymentMode}</b></div><div><span>Reference No. & Date.</span><b>{student.admissionNumber || "-"}</b></div><div><span>Received By</span><b>{lastPayment?.by || "-"}</b></div><div><span>Buyer's Order No.</span><b>-</b></div><div><span>Dated</span><b>-</b></div><div><span>Dispatch Doc No.</span><b>-</b></div><div><span>Delivery Note Date</span><b>-</b></div><div><span>Dispatched through</span><b>-</b></div><div><span>Destination</span><b>{student.centre || "-"}</b></div><div className="invoice-terms"><span>Terms of Delivery</span><b>Course admission fee</b></div></div>
      </div>
      <div className="invoice-buyer"><span>Buyer (Bill to)</span><strong>{student.fullName}</strong><span>{student.centre || "Delhi"}</span><span><b>Phone:</b> {student.phone}</span><span><b>State Name:</b> {placeOfSupply}</span></div>
      <table className="invoice-items"><colgroup><col className="invoice-col-sl" /><col className="invoice-col-particulars" /><col className="invoice-col-hsn" /><col className="invoice-col-qty" /><col className="invoice-col-rate" /><col className="invoice-col-per" /><col className="invoice-col-amount" /></colgroup><thead><tr><th>Sl No</th><th>Particulars</th><th>HSN/SAC</th><th>Quantity</th><th>Rate</th><th>per</th><th>Amount</th></tr></thead><tbody><tr><td>1</td><td><b>Course Fees</b><small>{courseName}</small></td><td>999294</td><td></td><td></td><td></td><td>{formatInvoiceAmount(taxableCourseFee)}</td></tr>{taxableDiscount > 0 && <tr><td></td><td><b>Less : Discount Allowed</b><small>Discount amount: {formatCurrency(discount)}</small></td><td></td><td></td><td></td><td></td><td>(-) {formatInvoiceAmount(taxableDiscount)}</td></tr>}<tr><td></td><td className="tax-line">Output CGST @9%</td><td></td><td></td><td>9%</td><td></td><td>{formatInvoiceAmount(cgst)}</td></tr><tr><td></td><td className="tax-line">Output SGST @9%</td><td></td><td></td><td>9%</td><td></td><td>{formatInvoiceAmount(sgst)}</td></tr><tr className="invoice-total-row"><td colSpan={6}>Total</td><td>Rs. {formatInvoiceAmount(invoiceTotal)}</td></tr></tbody></table>
      <div className="amount-words"><span>Amount Chargeable (in words)</span><b>INR {numberToIndianWords(invoiceTotal)} Only</b><em>E. & O.E</em></div>
      <table className="gst-summary"><colgroup><col className="gst-col-hsn" /><col className="gst-col-taxable" /><col className="gst-col-rate" /><col className="gst-col-amount" /><col className="gst-col-rate" /><col className="gst-col-amount" /><col className="gst-col-total" /></colgroup><thead><tr><th>HSN/SAC</th><th>Taxable Value</th><th>CGST Rate</th><th>CGST Amount</th><th>SGST/UTGST Rate</th><th>SGST/UTGST Amount</th><th>Total Tax Amount</th></tr></thead><tbody><tr><td>999294</td><td>{formatInvoiceAmount(taxableValue)}</td><td>9%</td><td>{formatInvoiceAmount(cgst)}</td><td>9%</td><td>{formatInvoiceAmount(sgst)}</td><td>{formatInvoiceAmount(cgst + sgst)}</td></tr><tr><td><b>Total</b></td><td><b>{formatInvoiceAmount(taxableValue)}</b></td><td></td><td><b>{formatInvoiceAmount(cgst)}</b></td><td></td><td><b>{formatInvoiceAmount(sgst)}</b></td><td><b>{formatInvoiceAmount(cgst + sgst)}</b></td></tr></tbody></table>
      <div className="tax-words"><span>Tax Amount (in words) :</span><b>INR {numberToIndianWords(cgst + sgst)} Only</b></div>
      <div className="invoice-bottom"><div><span><b>Remarks:</b></span><span>Being invoice raised against fees received from Student.</span><span>Course Fee: {formatCurrency(totalFee)} | Discount: {formatCurrency(discount)} | Final Payable: {formatCurrency(netFee)}</span><span className="paid-due">Paid: {formatCurrency(paid)} | Balance: {formatCurrency(due)}</span></div><div className="bank-details"><strong>Company's Bank Details</strong><span><b>A/c Holder's Name:</b> {billing.bankAccountName}</span><span><b>Bank Name:</b> {billing.bankName}</span><span><b>A/c No.:</b> {billing.bankAccountNumber}</span><span><b>Branch & IFS Code:</b> {billing.bankBranch} & {billing.bankIfsc}</span><b>for {billing.legalName}</b><em>Authorised Signatory</em></div></div>
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
  const paymentPurpose = normalizePaymentPurpose(payment.paymentPurpose, payment.mode);
  const isEmiPayment = paymentPurpose === "Fees Installment" && Boolean(payment.emiReference || payment.mode === "EMI");
  const receiptDate = formatDate(payment.paidAt || new Date().toISOString());
  const courseName = certificateCourseName(student.course);
  const placeOfSupply = student.centre === "Kochi" ? "Kerala, Code : 32" : student.centre === "Bangalore" ? "Karnataka, Code : 29" : "Delhi, Code : 07";
  return (
    <div className="tax-invoice payment-invoice">
      <div className="tax-title">{isEmiPayment ? "EMI Payment Receipt" : "Payment Receipt"}</div>
      <div className="invoice-top-grid"><div className="invoice-seller"><strong>{billing.legalName}</strong><span>{billing.address}</span><span><b>GSTIN/UIN:</b> {billing.gstin}</span><span><b>State Name:</b> {billing.stateName}, Code : {billing.stateCode}</span><span><b>E-Mail:</b> {billing.email}{billing.phone ? ` | Phone: ${billing.phone}` : ""}</span><span><b>Received From</b></span><strong>{student.fullName}</strong><span>{student.centre || "Delhi"}</span><span><b>Phone:</b> {student.phone}</span><span><b>State Name:</b> {placeOfSupply}</span></div><div className="invoice-meta-grid"><div><span>Receipt No.</span><b>{paymentReceiptNumber(student, paymentIndex)}</b></div><div><span>Dated</span><b>{receiptDate}</b></div><div><span>Payment For</span><b>{paymentPurpose}</b></div><div><span>Mode/Terms of Payment</span><b>{payment.mode || "Cash"}</b></div>{payment.emiReference && <div><span>EMI Reference</span><b>{payment.emiReference}</b></div>}<div><span>Admission No.</span><b>{student.admissionNumber || "-"}</b></div><div><span>Recorded By</span><b>{payment.by || "-"}</b></div><div><span>Course</span><b>{courseShortCode(student.course)}</b></div><div><span>Centre</span><b>{student.centre || "-"}</b></div>{payment.loanProviderName && <div><span>Loan Provider</span><b>{payment.loanProviderName}</b></div>}<div><span>{paymentReferenceLabel(payment.mode)}</span><b>{payment.transactionId || "-"}</b></div><div><span>Installment No.</span><b>{String(paymentIndex + 1).padStart(2, "0")}</b></div><div><span>Balance Status</span><b>{balanceAfter <= 0 ? "Paid" : "Partial"}</b></div><div className="invoice-terms"><span>Terms of Receipt</span><b>Receipt issued against split payment collected for course fee.</b></div></div></div>
      <div className="invoice-buyer"><span>Student (Receipt to)</span><strong>{student.fullName}</strong><span>{courseName}</span><span><b>Phone:</b> {student.phone}</span><span><b>Admission No.:</b> {student.admissionNumber || "Admission pending"}</span></div>
      <table className="invoice-items payment-items"><thead><tr><th>Sl No</th><th>Particulars</th><th>Receipt Ref</th><th>Payment Mode</th><th>Amount</th></tr></thead><tbody><tr><td>1</td><td><b>{paymentPurpose} Received</b><small>{courseName}</small></td><td>{payment.emiReference || paymentReceiptNumber(student, paymentIndex)}</td><td>{payment.mode || "Cash"}</td><td>{formatInvoiceAmount(Number(payment.amount || 0))}</td></tr><tr><td></td><td className="tax-line">Total Course Fee</td><td></td><td></td><td>{formatInvoiceAmount(netFee)}</td></tr><tr><td></td><td className="tax-line">Paid Before This Receipt</td><td></td><td></td><td>{formatInvoiceAmount(paidBefore)}</td></tr><tr><td></td><td className="tax-line">Paid Till Date</td><td></td><td></td><td>{formatInvoiceAmount(paidTillDate)}</td></tr><tr className="invoice-total-row"><td colSpan={4}>Balance After This Payment</td><td>Rs. {formatInvoiceAmount(balanceAfter)}</td></tr></tbody></table>
      <div className="amount-words"><span>Amount Received (in words)</span><b>INR {numberToIndianWords(Number(payment.amount || 0))} Only</b><em>E. & O.E</em></div>
      <table className="gst-summary payment-summary"><thead><tr><th>Total Fee</th><th>Previous Paid</th><th>This Payment</th><th>Paid Till Date</th><th>Balance</th></tr></thead><tbody><tr><td>{formatInvoiceAmount(netFee)}</td><td>{formatInvoiceAmount(paidBefore)}</td><td>{formatInvoiceAmount(Number(payment.amount || 0))}</td><td>{formatInvoiceAmount(paidTillDate)}</td><td>{formatInvoiceAmount(balanceAfter)}</td></tr></tbody></table>
      {payment.note && <div className="tax-words"><span>Note :</span><b>{payment.note}</b></div>}
      <div className="invoice-bottom"><div><span><b>Remarks:</b></span><span>This receipt acknowledges payment received against the student's course fee.</span><span className="paid-due">Payment: {formatCurrency(payment.amount || 0)} | Paid Till Date: {formatCurrency(paidTillDate)} | Balance: {formatCurrency(balanceAfter)}</span></div><div className="bank-details"><strong>Company's Bank Details</strong><span><b>A/c Holder's Name:</b> {billing.bankAccountName}</span><span><b>Bank Name:</b> {billing.bankName}</span><span><b>A/c No.:</b> {billing.bankAccountNumber}</span><span><b>Branch & IFS Code:</b> {billing.bankBranch} & {billing.bankIfsc}</span><b>for {billing.legalName}</b><em>Authorised Signatory</em></div></div>
      <div className="invoice-footer">This is a Computer Generated Receipt</div>
    </div>
  );
}

function CertificatePanel({ students, meta, onPage, onIssue }: { students: Student[]; meta: PaginationMeta | null; onPage: (page: number) => void; onIssue: (student: Student) => void; onOpen: (student: Student) => void }) {
  const [query, setQuery] = useState("");
  const [previewStudent, setPreviewStudent] = useState<Student | null>(null);
  const filteredStudents = students.filter((student) => `${student.fullName} ${student.admissionNumber || ""} ${student.course || ""}`.toLowerCase().includes(query.toLowerCase()));
  return (
    <>
      <div className="filter-bar cert-filter-bar">
        <input className="fbtn" placeholder="Search student..." value={query} onChange={(event) => setQuery(event.target.value)} />
        <div className="filter-spacer" />
      </div>
      <div className="card cert-card-table">
        <div className="table-wrap cert-table-wrap">
          <table className="cert-table">
            <thead><tr><th>Student</th><th>Course</th><th>Status</th><th>Certificate No.</th><th>Issue date</th><th /></tr></thead>
            <tbody>
              {filteredStudents.map((student) => {
                const issued = Boolean(student.certificateNumber);
                const eligible = ["Course Completed", "Alumni", "Placed"].includes(student.status) || student.certificateStatus === "Issued";
                const label = issued ? "Issued" : eligible ? "Ready" : "Not ready";
                return (
                  <tr key={student._id}>
                    <td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(student.fullName)}</span><div><div className="cell-name">{student.fullName}</div><div className="cell-sub">{student.admissionNumber || student.phone}</div></div></div></td>
                    <td>{courseShortCode(student.course)}</td>
                    <td><span className={`tag ${issued ? "green" : eligible ? "amber" : "blue"}`}>{label}</span></td>
                    <td className="mono">{student.certificateNumber || "-"}</td>
                    <td className="mono">{formatDate(student.certificateIssuedAt)}</td>
                    <td>{issued ? <button className="btn btn-sm btn-soft" onClick={() => setPreviewStudent(student)}>View</button> : eligible ? <button className="btn btn-sm btn-primary" onClick={() => onIssue(student)}>Issue certificate</button> : <button className="btn btn-sm btn-ghost" onClick={() => toast.message(`${student.fullName} has not completed the course yet - current status: ${student.status}.`)}>Why not?</button>}</td>
                  </tr>
                );
              })}
              {!filteredStudents.length && <tr><td colSpan={6}><div className="empty-state"><h4>No certificate records</h4></div></td></tr>}
            </tbody>
          </table>
        </div>
        <Pager meta={meta} label="students" onPage={onPage} />
      </div>
      <CertificateModal student={previewStudent} onClose={() => setPreviewStudent(null)} />
    </>
  );
}

function CertificateModal({ student, onClose }: { student: Student | null; onClose: () => void }) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const verifyUrl = student?.certificateNumber ? certificateVerifyUrl(student.certificateNumber) : "";
  const createCertificatePdfBlob = async () => {
    if (!student || !certificateRef.current) throw new Error("Certificate is not ready");
    const certificateNode = certificateRef.current.querySelector(".imed-certificate-exact-frame > div") as HTMLElement | null;
    if (!certificateNode) throw new Error("Certificate is not ready");
    let printNode: HTMLElement | null = null;
    try {
      await document.fonts?.ready;
      printNode = certificateNode.cloneNode(true) as HTMLElement;
      printNode.style.width = "3508px";
      printNode.style.height = "2480px";
      printNode.style.maxWidth = "none";
      printNode.style.transform = "none";
      printNode.style.transformOrigin = "top left";
      printNode.style.position = "absolute";
      printNode.style.left = "-10000px";
      printNode.style.top = "0";
      printNode.style.margin = "0";
      printNode.style.overflow = "hidden";
      document.body.appendChild(printNode);
      const canvas = await html2canvas(printNode, {
        backgroundColor: "#ffffff",
        scale: 1,
        useCORS: true,
        windowWidth: 3508,
        windowHeight: 2480,
      });
      const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, pageWidth, pageHeight, undefined, "FAST");
      return { blob: pdf.output("blob"), fileName: certificatePdfFileName(student) };
    } finally {
      printNode?.remove();
    }
  };
  const printCertificatePdf = async () => {
    if (!student) return;
    const toastId = toast.loading("Preparing certificate PDF...");
    try {
      const { blob, fileName } = await createCertificatePdfBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      toast.success("Certificate PDF saved", { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save certificate PDF", { id: toastId });
    }
  };
  const shareCertificatePdf = async () => {
    if (!student) return;
    const toastId = toast.loading("Preparing certificate PDF...");
    try {
      const { blob, fileName } = await createCertificatePdfBlob();
      const file = new File([blob], fileName, { type: "application/pdf" });
      const shareData = {
        title: fileName.replace(/\.pdf$/i, ""),
        text: `Certificate for ${student.fullName}`,
        files: [file],
      };
      const shareNavigator = navigator as Navigator & { canShare?: (data: typeof shareData) => boolean };
      if (navigator.share && (!shareNavigator.canShare || shareNavigator.canShare(shareData))) {
        await navigator.share(shareData);
        toast.success("Certificate ready to share", { id: toastId });
        return;
      }
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = fileName;
      anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
      toast.success("Certificate saved. Opening WhatsApp message.", { id: toastId });
      window.open(certificateWhatsAppUrl(student, verifyUrl), "_blank", "noopener,noreferrer");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        toast.dismiss(toastId);
        return;
      }
      toast.error(error instanceof Error ? error.message : "Unable to share certificate PDF", { id: toastId });
    }
  };

  return (
    <div className={`modal-overlay ${student ? "show" : ""}`} onClick={onClose}>
      <div className="modal cert-modal" onClick={(event) => event.stopPropagation()}>
        {student && (
          <>
            <div className="modal-head"><h3>Certificate preview</h3><button className="close-x" onClick={onClose}>x</button></div>
            <div className="modal-body">
              <div ref={certificateRef} className="certificate-export-target">
                <CertificatePreview student={student} verifyUrl={verifyUrl} />
              </div>
              <div className="field cert-verify-field"><label>Verification link</label><input readOnly className="mono" value={verifyUrl} /></div>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={shareCertificatePdf}><MessageCircle size={15} /> Share WhatsApp</button>
              <button className="btn btn-primary" onClick={printCertificatePdf}><Download size={15} /> Print / Save PDF</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CertificatePreview({ student, verifyUrl = "" }: { student: Student; verifyUrl?: string }) {
  return (
    <section className="certificate-card certificate-preview-shell">
      <IMedCertificate
        studentName={student.fullName}
        courseName={certificateCourseName(student.course)}
        certificateNumber={student.certificateNumber || "Not issued"}
        duration={courseDuration(student.course)}
        issueDate={formatDate(student.certificateIssuedAt)}
        verifyUrl={verifyUrl || "Not issued"}
      />
    </section>
  );
}

function LeadDrawer({
  lead,
  tab,
  setTab,
  canAssign = false,
  centres = [],
  courses = [],
  counsellors = [],
  onClose,
  onPatch,
  onFollowUp,
  onMarkDone,
  onClearReminder,
  onPreviewDocument,
  onAddActivity,
}: {
  lead: Lead | null;
  tab: "info" | "follow" | "docs" | "act";
  setTab: (tab: "info" | "follow" | "docs" | "act") => void;
  canAssign?: boolean;
  centres?: string[];
  courses?: Course[];
  counsellors?: Counsellor[];
  onClose: () => void;
  onPatch: (id: string, updates: Partial<Lead>) => void;
  onFollowUp: (event: FormEvent<HTMLFormElement>, lead: Lead) => void;
  onMarkDone: (lead: Lead, note?: string) => Promise<void>;
  onClearReminder: (lead: Lead) => Promise<void>;
  onPreviewDocument: (request: DocumentPreviewRequest) => void;
  onAddActivity?: (leadId: string, message: string, type?: string) => Promise<void>;
}) {
  const followUps = lead?.followUps || [];
  const activities = lead?.activities || [];
  const leadCourseObj = courses.find((c) => [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(String(lead?.course || "").toLowerCase()));
  const dynamicLeadFee = leadCourseObj ? feeWithGst(leadCourseObj.fee || 0) : 0;
  const [formStatus, setFormStatus] = useState("Scheduled");
  const [newNote, setNewNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  const saveNotes = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lead) return;
    const notes = String(new FormData(event.currentTarget).get("notes") || "");
    onPatch(lead._id, { notes });
  };

  const handlePostNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!lead || !newNote.trim() || !onAddActivity) return;
    setAddingNote(true);
    try {
      await onAddActivity(lead._id, newNote.trim(), "note");
      setNewNote("");
    } finally {
      setAddingNote(false);
    }
  };

  return (
    <>
      <div className={`drawer-overlay ${lead ? "show" : ""}`} onClick={onClose} />
      <aside className={`drawer ${lead ? "show" : ""}`} aria-hidden={!lead}>
        {lead && (
          <>
            <div className="drawer-head">
              <div className="avatar drawer-avatar">{initials(lead.fullName)}</div>
              <div className="drawer-title">
                <h3>{lead.fullName}</h3>
                <div className="cell-sub">{lead._id.slice(-8).toUpperCase()} - {courseShortCode(lead.course)} - <span className={`badge ${priorityBadgeClass(lead.stage)}`}>{lead.stage}</span></div>
              </div>
              <button className="close-x" onClick={onClose}>x</button>
            </div>
            <div className="dtabs">
              <button className={`dtab ${tab === "info" ? "active" : ""}`} onClick={() => setTab("info")}>Details</button>
              <button className={`dtab ${tab === "follow" ? "active" : ""}`} onClick={() => setTab("follow")}>Follow-ups</button>
              <button className={`dtab ${tab === "docs" ? "active" : ""}`} onClick={() => setTab("docs")}>Documents</button>
              <button className={`dtab ${tab === "act" ? "active" : ""}`} onClick={() => setTab("act")}>Activity ({activities.length})</button>
            </div>
            <div className="drawer-body">
              <div className={`dpane ${tab === "info" ? "active" : ""}`}>
                <div className="kv-row"><span className="k">Phone</span><span className="v">{lead.phone || "-"}</span></div>
                {whatsappLeadUrl(lead.phone, lead.fullName) && <div className="kv-row"><span className="k">WhatsApp</span><span className="v"><a className="btn btn-whatsapp" href={whatsappLeadUrl(lead.phone, lead.fullName)} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Message lead</a></span></div>}
                <div className="kv-row"><span className="k">Pamphlet</span><span className="v"><LeadPamphletSelect lead={lead} /></span></div>
                <div className="kv-row"><span className="k">Parent mobile</span><span className="v">{lead.parentMobile || "-"}</span></div>
                <div className="kv-row"><span className="k">Email</span><span className="v">{lead.email || "-"}</span></div>
                <div className="kv-row"><span className="k">Source</span><span className="v">{lead.source || "-"}</span></div>
                <div className="kv-row">
                  <span className="k">Centre</span>
                  <span className="v">
                    {canAssign ? (
                      <select
                        style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "6px", border: "1px solid var(--border)" }}
                        value={lead.centre || ""}
                        onChange={(e) => onPatch(lead._id, { centre: e.target.value })}
                      >
                        <option value="">Unassigned</option>
                        {centres.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    ) : (
                      lead.centre || "-"
                    )}
                  </span>
                </div>
                <div className="kv-row">
                  <span className="k">Counsellor</span>
                  <span className="v">
                    {canAssign ? (
                      <select
                        style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "6px", border: "1px solid var(--border)" }}
                        value={lead.counsellor || ""}
                        onChange={(e) => onPatch(lead._id, { counsellor: e.target.value })}
                      >
                        <option value="">Unassigned</option>
                        {counsellors.map((c) => (
                          <option key={c._id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    ) : (
                      lead.counsellor || "-"
                    )}
                  </span>
                </div>
                {lead.isSuspectedConsultancy && (
                  <div style={{ background: "#fef2f2", border: "1px solid #f87171", borderRadius: "8px", padding: "10px 12px", margin: "10px 0", color: "#991b1b" }}>
                    <div style={{ fontWeight: "700", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <span>⚠️ Suspected Consultancy / Bulk Upload</span>
                    </div>
                    <div style={{ fontSize: "12px", marginTop: "4px", lineHeight: "1.4", color: "#7f1d1d" }}>
                      {lead.consultancyFlagReason || "Multiple applications detected from the same IP address in a short time."}
                    </div>
                    {lead.ipAddress && (
                      <div style={{ fontSize: "11px", marginTop: "6px", color: "#b91c1c", fontWeight: "600" }}>
                        Submitter IP: {lead.ipAddress}
                      </div>
                    )}
                  </div>
                )}
                <div className="kv-row"><span className="k">Status</span><span className="v"><span className={`badge ${leadFeedbackBadgeClass(lead.leadFeedback)}`}>{normalizeLeadFeedbackStatus(lead.leadFeedback)}</span></span></div>
                <div className="kv-row"><span className="k">Student location</span><span className="v">{lead.studentLocation || "-"}</span></div>
                <div className="kv-row"><span className="k">City</span><span className="v">{lead.city || "-"}</span></div>
                {lead.ipAddress && (
                  <div className="kv-row"><span className="k">Submitter IP</span><span className="v" style={{ fontFamily: "monospace", fontSize: "12px" }}>{lead.ipAddress}</span></div>
                )}
                <div className="kv-row"><span className="k">Expected fee</span><span className="v">{formatCurrency(lead.expectedFee || dynamicLeadFee || 0)}{leadCourseObj && !lead.expectedFee ? <span className="cell-sub"> (Dynamic from course)</span> : ""}</span></div>
                <div className="kv-row">
                  <span className="k">Next follow-up</span>
                  <span className="v">
                    {lead.nextFollowUp ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                        <span>{formatDateTime(lead.nextFollowUp)}</span>
                        <button
                          type="button"
                          className="btn-followup-clear"
                          style={{ padding: "2px 7px", fontSize: "11px" }}
                          onClick={() => onClearReminder(lead)}
                          title="Clear this reminder"
                        >
                          Clear
                        </button>
                      </span>
                    ) : (
                      <span style={{ color: "var(--text-400)" }}>None / Completed</span>
                    )}
                  </span>
                </div>
                <form onSubmit={saveNotes}>
                  <div className="field drawer-notes"><label>Notes</label><textarea name="notes" rows={3} defaultValue={lead.notes || ""} /></div>
                  <button className="btn btn-primary drawer-full-btn">Save changes</button>
                </form>
              </div>
              <div className={`dpane ${tab === "follow" ? "active" : ""}`}>
                {lead.nextFollowUp && (
                  <div className="active-followup-banner">
                    <div className="active-followup-main">
                      <div className="active-followup-icon">
                        <Bell size={16} />
                      </div>
                      <div>
                        <div className="active-followup-title">Active Follow-up Reminder</div>
                        <div className="active-followup-meta">
                          <Calendar size={12} />
                          <span>{formatDateTime(lead.nextFollowUp)}</span>
                          <span className={`tag ${followUpTagClass(lead.nextFollowUp)}`}>
                            {followUpDueLabel(lead.nextFollowUp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="active-followup-btns">
                      <button
                        type="button"
                        className="btn-followup-done"
                        onClick={() => onMarkDone(lead)}
                        title="Mark this follow-up as completed and clear reminder"
                      >
                        <CheckCircle2 size={13} /> Mark Done
                      </button>
                      <button
                        type="button"
                        className="btn-followup-clear"
                        onClick={() => onClearReminder(lead)}
                        title="Remove this reminder without logging note"
                      >
                        <X size={13} /> Clear
                      </button>
                    </div>
                  </div>
                )}

                <form
                  className="field-grid feedback-form"
                  onSubmit={(event) => {
                    onFollowUp(event, lead);
                    setFormStatus("Scheduled");
                  }}
                >
                  <SelectField name="type" label="Follow-up type" options={leadFollowUpTypes} />
                  <div className="field">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                    >
                      {leadFollowUpStatuses.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  {formStatus === "Completed" ? (
                    <div className="field">
                      <label>Next follow-up date (optional)</label>
                      <input name="nextScheduledAt" type="datetime-local" placeholder="Leave empty if none" />
                      <span className="field-help" style={{ color: "#059669", fontWeight: 600 }}>
                        ✓ Marking completed clears the reminder unless a new date is set.
                      </span>
                    </div>
                  ) : (
                    <Field name="scheduledAt" label="Follow-up date" type="datetime-local" required />
                  )}
                  <div className="field full"><label>Follow-up note</label><textarea name="note" rows={3} placeholder="Call discussion, next step, commitment..." /></div>
                  <div className="profile-edit-actions"><button className="btn btn-primary"><Plus size={15} /> Add follow-up</button></div>
                </form>

                <div className="feedback-timeline">
                  {followUps.map((item, index) => (
                    <div className="feedback-item" key={`${item.createdAt || index}-${item.scheduledAt || ""}`}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className={`badge ${leadFollowUpBadgeClass(item.status)}`}>{item.status || "Scheduled"}</span>
                          <b>{item.type || "Follow-up"}</b>
                        </div>
                        {item.status === "Scheduled" && (
                          <button
                            type="button"
                            className="btn-timeline-done"
                            onClick={() => onMarkDone(lead, `Completed scheduled ${item.type || "call"}`)}
                            title="Mark this scheduled follow-up as done"
                          >
                            <CheckCircle2 size={12} /> Mark Done
                          </button>
                        )}
                      </div>
                      <p>{item.note || "No note added"}</p>
                      <div className="cell-sub">{formatDateTime(item.scheduledAt)} by {item.by || "Admin"}</div>
                    </div>
                  ))}
                  {!followUps.length && <div className="empty-state"><h4>No follow-ups yet</h4><p>Schedule the first lead follow-up.</p></div>}
                </div>
              </div>
              <div className={`dpane ${tab === "docs" ? "active" : ""}`}>
                <LeadDocumentRow label="Government proof" doc={lead.governmentProof} type="lead" id={lead._id} field="governmentProof" onPreview={onPreviewDocument} />
                <LeadDocumentRow label="Qualification certificate" doc={lead.highestQualificationCertificate} type="lead" id={lead._id} field="highestQualificationCertificate" onPreview={onPreviewDocument} />
              </div>
              <div className={`dpane ${tab === "act" ? "active" : ""}`}>
                <div style={{ marginBottom: "14px" }}>
                  <div className="kv-row"><span className="k">Lead created</span><span className="v">{formatDateTime(lead.createdAt)}</span></div>
                  <div className="kv-row"><span className="k">Stage</span><span className="v">{"->"} {lead.stage}</span></div>
                  <div className="kv-row"><span className="k">Last updated</span><span className="v">{formatDateTime(lead.updatedAt || lead.createdAt)}</span></div>
                </div>

                {onAddActivity && (
                  <form onSubmit={handlePostNote} style={{ marginBottom: "16px", background: "#FAFBFD", padding: "12px", borderRadius: "10px", border: "1px solid var(--border-soft)" }}>
                    <label style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "var(--text-700)", marginBottom: "6px" }}>Add Note / Activity</label>
                    <textarea
                      rows={2}
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Write internal note, call summary, or assignment remark..."
                      style={{ width: "100%", padding: "8px 10px", fontSize: "12px", borderRadius: "8px", border: "1px solid var(--border)" }}
                    />
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                      <button type="submit" disabled={addingNote || !newNote.trim()} className="btn btn-primary" style={{ padding: "5px 12px", fontSize: "12px" }}>
                        <Plus size={13} /> {addingNote ? "Saving..." : "Post Activity"}
                      </button>
                    </div>
                  </form>
                )}

                <div className="feedback-timeline">
                  {activities.map((act, index) => (
                    <div className="feedback-item" key={`${act.at || index}-${index}`}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span className={`badge ${act.type === "assigned" ? "badge-blue" : "badge-gray"}`} style={{ fontSize: "10px", textTransform: "capitalize" }}>
                            {act.type || "activity"}
                          </span>
                          <b>{act.by || "Admin"}</b>
                        </div>
                        <span className="cell-sub" style={{ fontSize: "10.5px" }}>{formatDateTime(act.at || lead.createdAt)}</span>
                      </div>
                      <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-800)" }}>{act.message}</p>
                    </div>
                  ))}
                  {activities.length === 0 && (
                    <div className="empty-state" style={{ padding: "20px 10px" }}>
                      <p>No activity logged yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function SettingsPanel({ isHeadSuperAdmin, isHeadBranchAdmin, isFranchiseSuperAdmin, centres, courses, batches, counsellors, teachers, user, centreOptions, courseOptions, onAddStaff, onAddCentre, onUpdateCentreBilling, onAddCourse, onUpdateCourse, onDeleteCourse, onAddBatch, onUpdateBatch, onDeleteBatch, onUpdatePassword }: { isHeadSuperAdmin: boolean; isHeadBranchAdmin: boolean; isFranchiseSuperAdmin: boolean; centres: Centre[]; courses: Course[]; batches: Batch[]; counsellors: Counsellor[]; teachers: Counsellor[]; user: AdminUser | null; centreOptions: string[]; courseOptions: string[]; onAddStaff: (event: FormEvent<HTMLFormElement>) => Promise<boolean>; onAddCentre: (event: FormEvent<HTMLFormElement>) => void; onUpdateCentreBilling: (event: FormEvent<HTMLFormElement>, centreId: string) => void; onAddCourse: (event: FormEvent<HTMLFormElement>) => void; onUpdateCourse: (event: FormEvent<HTMLFormElement>, courseId: string) => Promise<boolean>; onDeleteCourse: (course: Course) => void; onAddBatch: (event: FormEvent<HTMLFormElement>) => void; onUpdateBatch: (event: FormEvent<HTMLFormElement>, batchId: string) => Promise<boolean>; onDeleteBatch: (batch: Batch) => void; onUpdatePassword: (event: FormEvent<HTMLFormElement>) => void }) {
  const [active, setActive] = useState<"staff" | "billing" | "fees" | "batches" | "security">("staff");
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [billingCentre, setBillingCentre] = useState<Centre | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [batchCentreDraft, setBatchCentreDraft] = useState("");
  const [batchCourseDraft, setBatchCourseDraft] = useState("");
  const [editingBatchCentreDraft, setEditingBatchCentreDraft] = useState("");
  const [editingBatchCourseDraft, setEditingBatchCourseDraft] = useState("");
  const branchOptions = centres.filter((centre) => centre.type === "branch");
  const franchiseOptions = centres.filter((centre) => centre.type !== "branch");
  const staffRoleOptions = [
    ...(isHeadSuperAdmin ? [{ value: "superadmin", label: "Head super admin" }] : []),
    ...(isHeadSuperAdmin || isHeadBranchAdmin ? [
      { value: "admin", label: "Center admin" },
      { value: "operations_executive", label: "Operations Executive" },
      { value: "counsellor", label: "Counsellor" },
      { value: "teacher", label: "Teacher" },
    ] : []),
    ...(isHeadSuperAdmin ? [{ value: "franchise_superadmin", label: "Franchise super admin" }] : []),
    ...(isHeadSuperAdmin || isFranchiseSuperAdmin ? [
      { value: "franchise_operations_executive", label: "Franchise Operations Executive" },
      { value: "franchise_counsellor", label: "Franchise counsellor" },
      { value: "franchise_teacher", label: "Franchise teacher" },
    ] : []),
  ];
  const [staffRole, setStaffRole] = useState(isFranchiseSuperAdmin ? "franchise_counsellor" : isHeadSuperAdmin ? "franchise_superadmin" : staffRoleOptions[0]?.value || "counsellor");
  useEffect(() => {
    if (!staffRoleOptions.some((role) => role.value === staffRole)) setStaffRole(staffRoleOptions[0]?.value || "counsellor");
  }, [staffRole, staffRoleOptions]);
  const staffNeedsLocation = ["admin", "counsellor", "teacher", "operations_executive", "franchise_superadmin", "franchise_counsellor", "franchise_teacher", "franchise_operations_executive"].includes(staffRole);
  const staffLocationOptions = ["admin", "counsellor", "teacher", "operations_executive"].includes(staffRole) ? branchOptions : franchiseOptions;
  const staffLocationLabel = ["admin", "counsellor", "teacher", "operations_executive"].includes(staffRole) ? "Branch" : "Franchise";
  useEffect(() => {
    setEditingBatchCentreDraft(editingBatch?.centre || "");
    setEditingBatchCourseDraft(editingBatch?.course || "");
  }, [editingBatch?._id]);
  const batchCourseOptions = courseOptionsForCentre(batchCentreDraft, courseOptions, isHeadSuperAdmin);
  const editingBatchCourseOptions = courseOptionsForCentre(editingBatchCentreDraft, courseOptions, isHeadSuperAdmin);
  const tabs = [
    ["staff", "Staff access"],
    ["billing", "Branch / franchise billing"],
    ["fees", "Course fees"],
    ["batches", "Batches"],
    ["security", "Security"],
  ] as const;
  return (
    <div className="settings-shell settings-prototype-shell">
      <div className="settings-nav">
        {tabs.map(([key, label]) => <button key={key} className={active === key ? "active" : ""} onClick={() => setActive(key)}>{label}</button>)}
      </div>
      <div className="settings-pane-wrap">
        {active === "staff" && <div className="spane active">
          <div className="card settings-card">
            <div className="card-head"><div><h3>Staff directory</h3><div className="sub">{counsellors.length} accounts</div></div><button className="btn btn-primary btn-sm" onClick={() => setShowStaffModal(true)}><Plus size={14} /> Add staff</button></div>
            <div className="table-wrap settings-table-wrap"><table className="settings-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Branch / franchise</th></tr></thead><tbody>{counsellors.map((staff) => <tr key={staff.email}><td><div className="lead-name-cell"><span className="avatar lead-avatar">{initials(staff.name)}</span><div><div className="cell-name">{staff.name}</div><div className="cell-sub">{staff.email}</div></div></div></td><td>{staff.email}</td><td><span className="tag blue">{roleLabel(staff.role)}</span></td><td>{centres.find((centre) => centre._id === staff.franchiseId)?.name || (staff.franchiseId || "Head office")}</td></tr>)}{!counsellors.length && <tr><td colSpan={4}><div className="empty-state"><h4>No staff accounts</h4></div></td></tr>}</tbody></table></div>
          </div>
        </div>}
        {active === "billing" && <div className="spane active">
          <div className="card settings-card">
            <div className="card-head"><div><h3>Branch / franchise billing entities</h3><div className="sub">Saved billing details reflect in invoices and receipts</div></div><button className="btn btn-primary btn-sm" onClick={() => setShowAddLocation((value) => !value)}><Plus size={14} /> Add location</button></div>
            {showAddLocation && <form className="card-body field-grid settings-add-form" onSubmit={onAddCentre}><Field name="name" label="Name" required /><Field name="city" label="City" /><SelectField name="type" label="Type" options={["branch", "franchise"]} /><Field name="billingLegalName" label="Billing legal name" /><Field name="billingGstin" label="GST No." /><Field name="billingEmail" label="Billing email" type="email" /><Field name="billingPhone" label="Mobile no." /><Field name="bankAccountName" label="Account holder name" /><Field name="bankName" label="Bank name" /><Field name="bankAccountNumber" label="Account no." /><Field name="bankIfsc" label="IFSC" /><div className="field full"><label>Billing address</label><textarea name="billingAddress" /></div><button className="btn btn-primary">Add location</button></form>}
            <div className="card-body settings-search-body"><input className="fbtn" placeholder="Search location..." /></div>
            <div className="table-wrap settings-table-wrap"><table className="settings-table"><thead><tr><th>Location</th><th>Type</th><th>City</th><th>Email / Mobile</th><th>GSTIN</th><th>Bank</th><th /></tr></thead><tbody>{centres.map((centre) => <tr key={centre._id}><td className="cell-name">{centre.name}<div className="cell-sub">{centre.billingLegalName || defaultBillingEntity.legalName}</div></td><td><span className={`tag ${centre.type === "franchise" ? "green" : "blue"}`}>{centreKindLabel(centre)}</span></td><td>{centre.city || "-"}</td><td>{centre.billingEmail || defaultBillingEntity.email}<div className="cell-sub">{centre.billingPhone || defaultBillingEntity.phone || "-"}</div></td><td className="mono">{centre.billingGstin || "- (default)"}</td><td className="mono">{centre.bankAccountNumber || "-"}<div className="cell-sub">{centre.bankIfsc || "-"}</div></td><td><button className="btn btn-sm btn-soft" onClick={() => setBillingCentre(centre)}>Edit</button></td></tr>)}{!centres.length && <tr><td colSpan={7}><div className="empty-state"><h4>No locations</h4></div></td></tr>}</tbody></table></div>
          </div>
        </div>}
        {active === "fees" && <div className="spane active">
          <div className="card settings-card">
            <div className="card-head"><div><h3>Course fees</h3><div className="sub">Base fee before GST - global or location-specific</div></div><button className="btn btn-primary btn-sm" onClick={() => setShowAddCourse((value) => !value)}><Plus size={14} /> Add course</button></div>
            {showAddCourse && <form className="card-body field-grid settings-add-form" onSubmit={onAddCourse}><Field name="name" label="Course name" required /><Field name="code" label="Code" /><Field name="fee" label="Base fee" type="number" /><button className="btn btn-primary">Add course</button></form>}
            <div className="table-wrap settings-table-wrap"><table className="settings-table"><thead><tr><th>Code</th><th>Course</th><th>Base fee</th><th>GST (18%)</th><th>Payable</th><th /></tr></thead><tbody>{courses.map((course) => <tr key={course._id}><td className="mono cell-name">{course.code || courseShortCode(course.name)}</td><td>{course.name}<div className="cell-sub">{course.duration || "-"}</div></td><td className="mono">{formatCurrency(course.fee || 0)}</td><td className="mono">{formatCurrency(Math.round((course.fee || 0) * GST_RATE))}</td><td className="mono">{formatCurrency(feeWithGst(course.fee || 0))}</td><td><div className="action-icons"><button className="action-icon-btn action-icon-primary" title="Edit course" onClick={() => setEditingCourse(course)}><Pencil size={14} /></button><button className="action-icon-btn action-icon-danger" title="Delete course" onClick={() => onDeleteCourse(course)}><Trash2 size={14} /></button></div></td></tr>)}{!courses.length && <tr><td colSpan={6}><div className="empty-state"><h4>No courses</h4></div></td></tr>}</tbody></table></div>
          </div>
        </div>}
        {active === "batches" && <div className="spane active">
          <div className="card settings-card">
            <div className="card-head"><div><h3>Batches</h3></div><button className="btn btn-primary btn-sm" onClick={() => setShowAddBatch((value) => !value)}><Plus size={14} /> Add batch</button></div>
            {showAddBatch && <form className="card-body field-grid settings-add-form" onSubmit={onAddBatch}><Field name="name" label="Batch name" required /><div className="field"><label>Centre</label><select name="centre" value={batchCentreDraft} onChange={(event) => { setBatchCentreDraft(event.target.value); if (!isHeadSuperAdmin) setBatchCourseDraft(""); }}><option value="">Unassigned</option>{centreOptions.map((centre) => <option key={centre}>{centre}</option>)}</select></div><div className="field"><label>Course</label><select name="course" value={batchCourseDraft} onChange={(event) => setBatchCourseDraft(event.target.value)}><option value="">Unassigned</option>{batchCourseOptions.map((course) => <option key={course}>{course}</option>)}</select></div><Field name="commenceDate" label="Commence date" type="date" required /><div className="field full"><RequiredLabel required>Assigned faculty</RequiredLabel><select name="assignedFaculty" multiple required size={Math.min(Math.max(teachers.length, 2), 5)}>{teachers.map((teacher) => <option key={teacher.email} value={teacher.name}>{teacher.name}</option>)}</select><span className="field-help">Hold Ctrl to select more than one teacher.</span></div><button className="btn btn-primary">Add batch</button></form>}
            <div className="table-wrap settings-table-wrap"><table className="settings-table"><thead><tr><th>Batch name</th><th>Centre</th><th>Course</th><th>Assigned faculty</th><th>Commence date</th><th /></tr></thead><tbody>{batches.map((batch) => <tr key={batch._id}><td className="cell-name">{batch.name}</td><td>{batch.centre || "-"}</td><td>{courseShortCode(batch.course)}</td><td>{batch.assignedFaculty?.length ? batch.assignedFaculty.join(", ") : "-"}</td><td className="mono">{formatDate(batch.commenceDate)}</td><td><div className="action-icons"><button className="action-icon-btn action-icon-primary" title="Edit batch" onClick={() => setEditingBatch(batch)}><Pencil size={14} /></button><button className="action-icon-btn action-icon-danger" title="Delete batch" onClick={() => onDeleteBatch(batch)}><Trash2 size={14} /></button></div></td></tr>)}{!batches.length && <tr><td colSpan={6}><div className="empty-state"><h4>No batches</h4></div></td></tr>}</tbody></table></div>
          </div>
        </div>}
        {active === "security" && <div className="spane active"><div className="card settings-card settings-security-card"><div className="card-head"><div><h3>Change password</h3><div className="sub">{user?.email || "Current account"}</div></div></div><form className="card-body" onSubmit={onUpdatePassword}><div className="field"><RequiredLabel required>Current password</RequiredLabel><input name="currentPassword" type="password" autoComplete="current-password" required /></div><div className="field"><RequiredLabel required>New password</RequiredLabel><input name="newPassword" type="password" autoComplete="new-password" minLength={8} required /></div><div className="field"><RequiredLabel required>Confirm new password</RequiredLabel><input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></div><button className="btn btn-primary">Update password</button></form></div></div>}
      </div>
      <div className={`modal-overlay ${showStaffModal ? "show" : ""}`} onClick={() => setShowStaffModal(false)}>
        <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head"><h3>Add staff</h3><button className="close-x" onClick={() => setShowStaffModal(false)}>x</button></div>
          <form onSubmit={async (event) => { const saved = await onAddStaff(event); if (saved) setShowStaffModal(false); }}>
            <div className="modal-body field-grid">
              <Field name="name" label="Name" required />
              <Field name="email" label="Email" type="email" required />
              <div className="field"><RequiredLabel required>Role</RequiredLabel><select name="role" value={staffRole} onChange={(event) => setStaffRole(event.target.value)}>{staffRoleOptions.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select></div>
              {isHeadSuperAdmin ? <div className="field"><RequiredLabel required={staffNeedsLocation}>Branch / franchise</RequiredLabel>{staffNeedsLocation ? <select key={staffRole} name="franchiseId" required defaultValue=""><option value="" disabled>Select {staffLocationLabel.toLowerCase()}</option>{staffLocationOptions.length ? staffLocationOptions.map((centre) => <option key={centre._id} value={centre._id}>{centre.name}</option>) : <option value="" disabled>No {staffLocationLabel.toLowerCase()} found</option>}</select> : <><select disabled><option>All branches / franchises</option></select><input type="hidden" name="franchiseId" value="" /></>}</div> : staffNeedsLocation ? <input type="hidden" name="franchiseId" value={user?.franchiseId || ""} /> : <input type="hidden" name="franchiseId" value="" />}
              <Field name="password" label="Password" type="password" required />
              <div className="field full staff-role-note"><label>Access scope</label><div>{staffNeedsLocation ? `${roleLabel(staffRole)} will be limited to the selected ${staffLocationLabel.toLowerCase()}.` : "Super admin gets head-office access across all branches and franchises."}</div></div>
            </div>
            <div className="modal-foot"><button type="button" className="btn btn-ghost" onClick={() => setShowStaffModal(false)}>Cancel</button><button className="btn btn-primary">Add staff</button></div>
          </form>
        </div>
      </div>
      <div className={`modal-overlay ${billingCentre ? "show" : ""}`} onClick={() => setBillingCentre(null)}>
        {billingCentre && <div className="modal billing-modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head"><h3>Edit billing</h3><button className="close-x" onClick={() => setBillingCentre(null)}>x</button></div>
          <form onSubmit={(event) => { onUpdateCentreBilling(event, billingCentre._id); setBillingCentre(null); }}>
            <div className="modal-body field-grid">
              <Field name="name" label="Location name" defaultValue={billingCentre.name} required />
              <Field name="city" label="City" defaultValue={billingCentre.city || ""} />
              {isHeadSuperAdmin ? <SelectField name="type" label="Type" options={["branch", "franchise"]} defaultValue={billingCentre.type || "franchise"} /> : <input type="hidden" name="type" value={billingCentre.type || "franchise"} />}
              <Field name="billingLegalName" label="Billing legal name" defaultValue={billingCentre.billingLegalName || ""} />
              <Field name="billingGstin" label="GST No." defaultValue={billingCentre.billingGstin || ""} />
              <Field name="billingStateName" label="State name" defaultValue={billingCentre.billingStateName || ""} />
              <Field name="billingStateCode" label="State code" defaultValue={billingCentre.billingStateCode || ""} />
              <Field name="billingEmail" label="Billing email" type="email" defaultValue={billingCentre.billingEmail || ""} />
              <Field name="billingPhone" label="Mobile no." defaultValue={billingCentre.billingPhone || ""} />
              <Field name="bankAccountName" label="Account holder name" defaultValue={billingCentre.bankAccountName || ""} />
              <Field name="bankName" label="Bank name" defaultValue={billingCentre.bankName || ""} />
              <Field name="bankAccountNumber" label="Account no." defaultValue={billingCentre.bankAccountNumber || ""} />
              <Field name="bankIfsc" label="IFSC" defaultValue={billingCentre.bankIfsc || ""} />
              <Field name="bankBranch" label="Bank branch" defaultValue={billingCentre.bankBranch || ""} />
              <div className="field full"><label>Billing address</label><textarea name="billingAddress" defaultValue={billingCentre.billingAddress || ""} /></div>
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setBillingCentre(null)}>Cancel</button><button className="btn btn-primary">Save billing</button></div>
          </form>
        </div>}
      </div>
      <div className={`modal-overlay ${editingCourse ? "show" : ""}`} onClick={() => setEditingCourse(null)}>
        {/* {editingCourse && <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head"><h3>Edit course</h3><button className="close-x" onClick={() => setEditingCourse(null)}>x</button></div>
          <form onSubmit={async (event) => { const saved = await onUpdateCourse(event, editingCourse._id); if (saved) setEditingCourse(null); }}>
            <div className="modal-body field-grid">
              <Field name="name" label="Course name" defaultValue={editingCourse.name} required />
              <Field name="code" label="Code" defaultValue={editingCourse.code || ""} />
              <Field name="fee" label="Base fee" type="number" defaultValue={editingCourse.fee || 0} />
              <Field name="duration" label="Duration" defaultValue={editingCourse.duration || ""} />
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditingCourse(null)}>Cancel</button><button className="btn btn-primary">Save course</button></div>
          </form>
        </div>} */}

          {editingCourse && <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head"><h3>Edit course</h3><button className="close-x" onClick={() => setEditingCourse(null)}>x</button></div>
          <form onSubmit={async (event) => { const saved = await onUpdateCourse(event, editingCourse._id); if (saved) setEditingCourse(null); }}>
            <div className="modal-body field-grid">
              <Field name="name" label="Course name" defaultValue={editingCourse.name} required />
              <Field name="code" label="Code" defaultValue={editingCourse.code || ""} />
              <Field name="fee" label="Base fee" type="number" defaultValue={editingCourse.fee || 0} />
              <Field name="duration" label="Duration" defaultValue={editingCourse.duration || ""} />
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditingCourse(null)}>Cancel</button><button className="btn btn-primary">Save course</button></div>
          </form>
        </div>}
      </div>
      <div className={`modal-overlay ${editingBatch ? "show" : ""}`} onClick={() => setEditingBatch(null)}>
        {editingBatch && <div className="modal" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head"><h3>Edit batch</h3><button className="close-x" onClick={() => setEditingBatch(null)}>x</button></div>
          <form onSubmit={async (event) => { const saved = await onUpdateBatch(event, editingBatch._id); if (saved) setEditingBatch(null); }}>
            <div className="modal-body field-grid">
              <Field name="name" label="Batch name" defaultValue={editingBatch.name} required />
              <div className="field"><label>Centre</label><select name="centre" value={editingBatchCentreDraft} onChange={(event) => { const centre = event.target.value; setEditingBatchCentreDraft(centre); }}><option value="">Unassigned</option>{centreOptions.map((centre) => <option key={centre}>{centre}</option>)}</select></div>
              <div className="field"><label>Course</label><select name="course" value={editingBatchCourseDraft} onChange={(event) => setEditingBatchCourseDraft(event.target.value)}><option value="">Unassigned</option>{editingBatchCourseOptions.map((course) => <option key={course}>{course}</option>)}</select></div>
              <Field name="commenceDate" label="Commence date" type="date" defaultValue={dateInputValue(editingBatch.commenceDate)} required />
              <div className="field full"><RequiredLabel required>Assigned faculty</RequiredLabel><select name="assignedFaculty" multiple required size={Math.min(Math.max(teachers.length, 2), 5)} defaultValue={editingBatch.assignedFaculty || []}>{teachers.map((teacher) => <option key={teacher.email} value={teacher.name}>{teacher.name}</option>)}</select><span className="field-help">Hold Ctrl to select more than one teacher.</span></div>
            </div>
            <div className="modal-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditingBatch(null)}>Cancel</button><button className="btn btn-primary">Save batch</button></div>
          </form>
        </div>}
      </div>
    </div>
  );
}

function ProfilePanel({ profile, user, accessCount, canManageFees, canManageSettings, canAssignTeachers, canManageCertificates, canManageInternships, canManageInventory, onIssueKit, centres, courses, allCourses = [], batches, teachers, onBack, onGoSettings, onLeadPatch, onStudentPatch, onGenerateStudentLmsAccess, onInternshipSave, onInternshipDelete, onPayment, onDownloadPaymentProof, onFeedback, onIssue, onPreviewDocument, onPreviewInternshipPhoto }: { profile: ProfileTarget; user: AdminUser | null; accessCount: number; canManageFees: boolean; canManageSettings: boolean; canAssignTeachers: boolean; canManageCertificates: boolean; canManageInternships: boolean; canManageInventory?: boolean; onIssueKit?: (student: Student) => void; centres: string[]; courses: string[]; allCourses?: Course[]; batches: Batch[]; teachers: Counsellor[]; onBack: () => void; onGoSettings: () => void; onLeadPatch: (id: string, updates: Partial<Lead>) => void; onStudentPatch: (id: string, updates: Partial<Student>) => void; onGenerateStudentLmsAccess: (student: Student) => void; onInternshipSave: (event: FormEvent<HTMLFormElement>, student: Student) => void; onInternshipDelete: (student: Student) => void; onPayment: (event: FormEvent<HTMLFormElement>, student: Student) => void; onDownloadPaymentProof: (student: Student, payment: PaymentRecord, index: number) => void; onFeedback: (event: FormEvent<HTMLFormElement>, student: Student) => void; onIssue: (student: Student) => void; onPreviewDocument: (request: DocumentPreviewRequest) => void; onPreviewInternshipPhoto: (student: Student, log: InternshipLog, photoType: "login" | "logout") => void }) {
  const isSuperAdmin = user?.role === "superadmin";
  const currentCourse = profile?.type === "student" ? (profile.data.course || "") : (profile?.type === "lead" ? (profile.data.course || "") : "");
  const studentCourseObj = allCourses.find((c) =>
    [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(String(currentCourse || "").toLowerCase())
  );
  const dynamicCoursePayable = studentCourseObj ? feeWithGst(studentCourseObj.fee || 0) : 0;
  const [studentTab, setStudentTab] = useState<"sum" | "journey" | "admission" | "pay" | "emi" | "internship" | "feedback" | "cert">("sum");
  const [leadTab, setLeadTab] = useState<"info" | "docs" | "act">("info");
  const [editMode, setEditMode] = useState(profile?.mode === "edit");
  const [paymentModeDraft, setPaymentModeDraft] = useState("Cash");
  const [paymentPurposeDraft, setPaymentPurposeDraft] = useState("Fees Installment");
  const profileStudent = profile?.type === "student" ? profile.data : null;
  const profileNetFee = profileStudent ? Math.max(0, (profileStudent.totalFee || 0) - (profileStudent.discountAmount || 0)) : 0;
  const profileDue = profileStudent ? dueAmount(profileStudent) : 0;
  const [admissionPaymentModeDraft, setAdmissionPaymentModeDraft] = useState("Full Payment");
  const [admissionTotalFeeDraft, setAdmissionTotalFeeDraft] = useState("0");
  const [admissionDiscountDraft, setAdmissionDiscountDraft] = useState("0");
  const [admissionUpfrontDraft, setAdmissionUpfrontDraft] = useState("0");
  const [admissionEmiMonthsDraft, setAdmissionEmiMonthsDraft] = useState("6");
  const [admissionEmiAmountDraft, setAdmissionEmiAmountDraft] = useState("0");
  const [admissionNextEmiDateDraft, setAdmissionNextEmiDateDraft] = useState("");
  const [emiMonthsDraft, setEmiMonthsDraft] = useState("6");
  const [emiAmountDraft, setEmiAmountDraft] = useState("0");
  const [editCourseDraft, setEditCourseDraft] = useState("");
  const [editCentreDraft, setEditCentreDraft] = useState("");
  const [editBatchDraft, setEditBatchDraft] = useState("");
  const [editTotalFeeDraft, setEditTotalFeeDraft] = useState("0");
  const [editExpectedFeeDraft, setEditExpectedFeeDraft] = useState("0");
  const [internshipStartDraft, setInternshipStartDraft] = useState(dateInputValue());
  const [internshipEndDraft, setInternshipEndDraft] = useState(dateInputValueFromDuration(dateInputValue(), 3, "months"));
  const [internshipDurationDraft, setInternshipDurationDraft] = useState("3");
  const [internshipDurationUnitDraft, setInternshipDurationUnitDraft] = useState("months");
  const profileId = profile?.data._id;
  useEffect(() => {
    setStudentTab("sum");
    setLeadTab("info");
    setEditMode(profile?.mode === "edit");
    const initCourse = profile ? profile.data.course || "" : "";
    setEditCourseDraft(initCourse);
    setEditCentreDraft(profile ? profile.data.centre || "" : "");
    setEditBatchDraft(profile?.type === "student" ? profile.data.batch || "" : "");
    const initCourseObj = allCourses.find((c) => [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(initCourse.toLowerCase()));
    const initCourseFee = initCourseObj ? feeWithGst(initCourseObj.fee || 0) : 0;
    setEditTotalFeeDraft(String(profile?.type === "student" ? (profile.data.totalFee || initCourseFee || 0) : 0));
    setEditExpectedFeeDraft(String(profile?.type === "lead" ? (profile.data.expectedFee || initCourseFee || 0) : 0));
    setPaymentModeDraft("Cash");
    setPaymentPurposeDraft("Fees Installment");
  }, [profileId, profile?.mode]);
  useEffect(() => {
    if (!profileStudent) return;
    const courseDurationMonths = Math.max(1, getCourseDurationMonths(profileStudent.course, courses));
    const months = Math.max(1, (profileStudent.emiMonths && profileStudent.emiMonths > 0) ? profileStudent.emiMonths : courseDurationMonths);
    const baseAmount = profileDue || profileNetFee || 0;
    setEmiMonthsDraft(String(months));
    setEmiAmountDraft(String(profileStudent.emiAmount && profileStudent.emiAmount <= baseAmount ? profileStudent.emiAmount : (months > 0 ? Math.floor(baseAmount / months) : 0)));
    setPaymentPurposeDraft(Number(profileStudent.paidAmount || 0) <= 0 ? "Seat Booking Amount" : "Fees Installment");
  }, [profileId]);
  useEffect(() => {
    if (!profileStudent) return;
    const savedMode = normalizeAdmissionPaymentMode(profileStudent.admissionPaymentMode || "");
    const mode = admissionPaymentModes.includes(savedMode) ? savedMode || "Full Payment" : profileStudent.emiEnabled ? "EMI" : "Full Payment";
    // Auto-calculate months from course duration (locked — not editable by user)
    const courseDurationMonths = Math.max(1, getCourseDurationMonths(profileStudent.course, courses));
    const months = Math.max(1, (profileStudent.emiMonths && profileStudent.emiMonths > 0) ? profileStudent.emiMonths : courseDurationMonths);
    const upfront = isPartialEmiPaymentMode(mode) ? Math.max(0, profileStudent.admissionUpfrontAmount || 0) : 0;
    const initialTotal = profileStudent.totalFee || dynamicCoursePayable || 0;
    const initialDiscount = profileStudent.discountAmount || 0;
    const net = Math.max(0, initialTotal - initialDiscount);
    const emiBalance = isPartialEmiPaymentMode(mode) ? Math.max(0, net - Math.max(profileStudent.paidAmount || 0, upfront)) : (profileDue || profileNetFee || 0);
    const calculatedEmi = months > 0 ? Math.floor(emiBalance / months) : 0;
    const isEmi = mode === "EMI" || isPartialEmiPaymentMode(mode);
    setAdmissionPaymentModeDraft(mode);
    setAdmissionTotalFeeDraft(String(initialTotal));
    setAdmissionDiscountDraft(String(initialDiscount));
    setAdmissionUpfrontDraft(String(profileStudent.admissionUpfrontAmount || 0));
    setAdmissionEmiMonthsDraft(String(months));
    setAdmissionEmiAmountDraft(isEmi ? String(calculatedEmi) : "0");
    setAdmissionNextEmiDateDraft(profileStudent.nextEmiDate ? dateInputValue(profileStudent.nextEmiDate) : dateInputValueFromOffset(12));
  }, [profileId]);
  useEffect(() => {
    if (!profileStudent) return;
    const assignment = profileStudent.internshipAssignment;
    const start = assignment?.startDate ? dateInputValue(assignment.startDate) : dateInputValue();
    const duration = String(assignment?.durationValue || 3);
    const unit = assignment?.durationUnit || "months";
    setInternshipStartDraft(start);
    setInternshipDurationDraft(duration);
    setInternshipDurationUnitDraft(unit);
    setInternshipEndDraft(assignment?.expectedEndDate ? dateInputValue(assignment.expectedEndDate) : (dateInputValueFromDuration(start, duration, unit) || dateInputValueFromOffset(90)));
  }, [profileId]);

  if (!profile) {
    return (
      <div className="card profile-own-card">
        <div className="card-head profile-own-head">
          <div className="avatar profile-own-avatar">{initials(user?.name)}</div>
          <div><h3>{user?.name || "Admin"}</h3><div className="sub">{roleLabel(user?.role)} - scope: current</div></div>
        </div>
        <div className="card-body">
          <div className="kv-row"><span className="k">Role</span><span className="v">{user?.role || "-"}</span></div>
          <div className="kv-row"><span className="k">Email</span><span className="v">{user?.email || "admin@imedacademy.in"}</span></div>
          <div className="kv-row"><span className="k">Access</span><span className="v">{accessCount} panels</span></div>
          {canManageSettings && <button className="btn btn-primary profile-security-btn" onClick={onGoSettings}>Go to security settings</button>}
        </div>
      </div>
    );
  }

  if (profile.type === "lead" && editMode) {
    const lead = profile.data;
    const leadCourseOptions = courseOptionsForCentre(editCentreDraft, courses, isSuperAdmin);
    const saveLeadEdit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = Object.fromEntries(new FormData(event.currentTarget).entries());
      const updates: Partial<Lead> = {
        fullName: String(form.fullName || ""),
        phone: String(form.phone || ""),
        parentMobile: String(form.parentMobile || ""),
        email: String(form.email || ""),
        source: String(form.source || ""),
        centre: String(form.centre || ""),
        course: String(form.course || ""),
        stage: String(form.stage || lead.stage),
        priority: String(form.priority || ""),
        leadFeedback: String(form.leadFeedback || ""),
        city: String(form.city || ""),
        studentLocation: String(form.studentLocation || ""),
        notes: String(form.notes || ""),
      };
      if (canManageSettings) updates.counsellor = String(form.counsellor || "");
      if (canManageFees) updates.expectedFee = Number(form.expectedFee || 0);
      onLeadPatch(lead._id, updates);
      setEditMode(false);
    };
    return (
      <div className="card profile-shell">
        <div className="profile-head">
          <div className="avatar drawer-avatar">{initials(lead.fullName)}</div>
          <div className="profile-title"><h3>Edit lead</h3><div className="cell-sub">{lead.fullName} - {courseShortCode(lead.course)}</div></div>
          <button className="close-x" onClick={onBack}>x</button>
        </div>
        <form className="card-body field-grid profile-edit-form" onSubmit={saveLeadEdit}>
          <EditField name="fullName" label="Full name" defaultValue={lead.fullName} required />
          <EditField name="phone" label="Phone" defaultValue={lead.phone} required />
          <EditField name="parentMobile" label="Parent mobile" defaultValue={lead.parentMobile} />
          <EditField name="email" label="Email" type="email" defaultValue={lead.email} />
          <EditField name="source" label="Source" defaultValue={lead.source} />
          <div className="field"><label>Centre</label><select name="centre" value={editCentreDraft} onChange={(event) => { const centre = event.target.value; setEditCentreDraft(centre); }}><option value="">Unassigned</option>{centres.map((centre) => <option key={centre}>{centre}</option>)}</select></div>
          <div className="field"><label>Course</label><select name="course" value={editCourseDraft} onChange={(event) => {
            const nextCourse = event.target.value;
            setEditCourseDraft(nextCourse);
            const matched = allCourses.find((c) => [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(nextCourse.toLowerCase()));
            if (matched?.fee) {
              setEditExpectedFeeDraft(String(feeWithGst(matched.fee)));
            }
          }}><option value="">Unassigned</option>{leadCourseOptions.map((course) => <option key={course}>{course}</option>)}</select></div>
          {canManageSettings && <EditField name="counsellor" label="Counsellor" defaultValue={lead.counsellor} />}
          <div className="field"><label>Stage</label><select name="stage" defaultValue={lead.stage}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></div>
          <div className="field"><label>Priority</label><select name="priority" defaultValue={normalizeLeadPriority(lead.priority)}>{leadPriorityOptions.map((priority) => <option key={priority} value={priority}>{leadPriorityLabel(priority)}</option>)}</select><span className="field-help">P0 is hottest, P3 is lowest.</span></div>
          <div className="field"><label>Status</label><select name="leadFeedback" defaultValue={normalizeLeadFeedbackStatus(lead.leadFeedback)}>{leadFeedbackOptions.map((feedback) => <option key={feedback}>{feedback}</option>)}</select></div>
          <EditField name="studentLocation" label="Student location" defaultValue={lead.studentLocation} />
          <EditField name="city" label="City" defaultValue={lead.city} />
          {canManageFees && <EditField name="expectedFee" label="Expected fee" type="number" value={editExpectedFeeDraft} onChange={(e) => setEditExpectedFeeDraft((e.target as HTMLInputElement).value)} />}
          <div className="field full"><label>Notes</label><textarea name="notes" defaultValue={lead.notes || ""} /></div>
          <div className="profile-edit-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button><button className="btn btn-primary"><Pencil size={15} /> Save update</button></div>
        </form>
      </div>
    );
  }

  if (profile.type === "lead") {
    const lead = profile.data;
    const leadTabs: { key: "info" | "docs" | "act"; label: string }[] = [{ key: "info", label: "Details" }, { key: "docs", label: "Documents" }, { key: "act", label: "Activity" }];
    return (
      <div className="card profile-shell">
        <div className="profile-head">
          <div className="avatar drawer-avatar">{initials(lead.fullName)}</div>
          <div className="profile-title"><h3>{lead.fullName}</h3><div className="cell-sub">{lead.phone} - {courseShortCode(lead.course)} - <span className={`badge ${stageBadgeClass(lead.stage)}`}>{lead.stage}</span></div></div>
          <button className="close-x" onClick={onBack}>x</button>
        </div>
        <div className="dtabs profile-tabs">{leadTabs.map((tab) => <button type="button" key={tab.key} className={`dtab ${leadTab === tab.key ? "active" : ""}`} onClick={() => setLeadTab(tab.key)}>{tab.label}</button>)}</div>
        <div className="drawer-body profile-drawer-body">
          {leadTab === "info" && <div className="dpane active">
            <div className="kv-row"><span className="k">Phone</span><span className="v">{lead.phone || "-"}</span></div>
            <div className="kv-row"><span className="k">Parent mobile</span><span className="v">{lead.parentMobile || "-"}</span></div>
            <div className="kv-row"><span className="k">Email</span><span className="v">{lead.email || "-"}</span></div>
            <div className="kv-row"><span className="k">Source</span><span className="v">{lead.source || "-"}</span></div>
            <div className="kv-row"><span className="k">Centre</span><span className="v">{lead.centre || "-"}</span></div>
            <div className="kv-row"><span className="k">Counsellor</span><span className="v">{lead.counsellor || "-"}</span></div>
            <div className="kv-row"><span className="k">Status</span><span className="v"><span className={`badge ${leadFeedbackBadgeClass(lead.leadFeedback)}`}>{normalizeLeadFeedbackStatus(lead.leadFeedback)}</span></span></div>
            <div className="kv-row"><span className="k">Student location</span><span className="v">{lead.studentLocation || "-"}</span></div>
            <div className="kv-row"><span className="k">City</span><span className="v">{lead.city || "-"}</span></div>
            <div className="kv-row"><span className="k">Expected fee</span><span className="v">{formatCurrency(lead.expectedFee || 0)}</span></div>
            <div className="field drawer-notes"><label>Stage</label><select value={lead.stage} onChange={(event) => onLeadPatch(lead._id, { stage: event.target.value })}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></div>
            <div className="field drawer-notes"><label>Notes</label><textarea value={lead.notes || ""} onChange={(event) => onLeadPatch(lead._id, { notes: event.target.value })} /></div>
          </div>}
          {leadTab === "docs" && <div className="dpane active">
            <LeadDocumentRow label="Government proof" doc={lead.governmentProof} type="lead" id={lead._id} field="governmentProof" onPreview={onPreviewDocument} />
            <LeadDocumentRow label="Qualification certificate" doc={lead.highestQualificationCertificate} type="lead" id={lead._id} field="highestQualificationCertificate" onPreview={onPreviewDocument} />
          </div>}
          {leadTab === "act" && <div className="dpane active">
            <div style={{ marginBottom: "14px" }}>
              <div className="kv-row"><span className="k">Lead created</span><span className="v">{formatDateTime(lead.createdAt)}</span></div>
              <div className="kv-row"><span className="k">Stage changed</span><span className="v">{"->"} {lead.stage}</span></div>
              <div className="kv-row"><span className="k">Last updated</span><span className="v">{formatDateTime(lead.updatedAt || lead.createdAt)}</span></div>
            </div>
            <div className="feedback-timeline">
              {(lead.activities || []).map((act, index) => (
                <div className="feedback-item" key={`${act.at || index}-${index}`}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className={`badge ${act.type === "assigned" ? "badge-blue" : "badge-gray"}`} style={{ fontSize: "10px", textTransform: "capitalize" }}>
                        {act.type || "activity"}
                      </span>
                      <b>{act.by || "Admin"}</b>
                    </div>
                    <span className="cell-sub" style={{ fontSize: "10.5px" }}>{formatDateTime(act.at || lead.createdAt)}</span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--text-800)" }}>{act.message}</p>
                </div>
              ))}
              {(!lead.activities || lead.activities.length === 0) && (
                <div className="empty-state" style={{ padding: "20px 10px" }}>
                  <p>No activity logged yet.</p>
                </div>
              )}
            </div>
          </div>}
        </div>
      </div>
    );
  }

  const student = profile.data;
  const netFee = profileNetFee;
  const due = profileDue;
  const paidPct = netFee ? Math.min(100, Math.round(((student.paidAmount || 0) / netFee) * 100)) : 0;
  const eligible = ["Course Completed", "Alumni", "Placed"].includes(student.status) || student.certificateStatus === "Issued";
  const payments = student.payments || [];
  const hasEmi = student.emiEnabled || student.emiMonths || student.nextEmiDate;
  const emiBreakdown = studentEmiBreakdown(student);
  const assignedBatch = batches.find((b) => String(b.name || "").trim().toLowerCase() === String(student.batch || "").trim().toLowerCase());
  const batchStartDate = assignedBatch?.commenceDate || student.batchCommenceDate || "";
  const courseDurationMonths = getCourseDurationMonths(student.course, courses);
  const batchEndDate = batchStartDate ? (dateInputValueFromDuration(dateInputValue(batchStartDate), courseDurationMonths, "months") || "") : "";
  const feedbacks = student.feedbacks || [];
  const normalizedStatus = normalizeStudentStatus(student.status);
  const canDecideFees = normalizedStatus !== "Enrolled";
  const feesReady = ["Fees Decided", "Fees Collected", "Active Student", "Course Completed", "Alumni"].includes(normalizedStatus);
  const admissionPlanReady = Boolean(feesReady && student.admissionPaymentMode && netFee > 0);
  const lmsAccessBlockReason = !feesReady
    ? "Decide fees first"
    : !admissionPlanReady
      ? "Save final fee and payment plan"
    : !student.admissionNumber
      ? "Admission number required"
      : !student.phone
        ? "Registered phone required"
        : !student.batch
          ? "Batch assignment required"
          : "";
  const lmsAccessReady = !lmsAccessBlockReason;
  const admissionTotalFee = Math.max(0, Number(admissionTotalFeeDraft || 0));
  const admissionDiscount = Math.max(0, Number(admissionDiscountDraft || 0));
  const admissionNetFee = Math.max(0, admissionTotalFee - admissionDiscount);
  const admissionDue = Math.max(0, admissionNetFee - (student.paidAmount || 0));
  const isAdmissionPartialEmiPlan = isPartialEmiPaymentMode(admissionPaymentModeDraft);
  const isAdmissionEmiPlan = admissionPaymentModeDraft === "EMI" || isAdmissionPartialEmiPlan;
  const admissionUpfrontAmount = isAdmissionPartialEmiPlan ? Math.max(0, Number(admissionUpfrontDraft || 0)) : 0;
  const admissionEmiBalance = Math.max(0, admissionNetFee - Math.max(student.paidAmount || 0, admissionUpfrontAmount));
  const internshipAssignment = student.internshipAssignment || null;
  const tabs: { key: "sum" | "journey" | "admission" | "pay" | "emi" | "internship" | "feedback" | "cert"; label: string }[] = [
    { key: "sum", label: "Summary" },
    { key: "journey", label: "Journey" },
    ...(canManageFees ? [{ key: "admission" as const, label: "Admission" }, { key: "pay" as const, label: "Payments" }, { key: "emi" as const, label: "EMI" }] : []),
    ...(canManageInternships ? [{ key: "internship" as const, label: "Internship" }] : []),
  ];
  const activeStudentTab = tabs.some((tab) => tab.key === studentTab) ? studentTab : "sum";
  const recalculateEmiAmount = (monthsValue: string) => {
    const months = Math.max(1, Number(monthsValue || 0));
    return String(Math.floor((due || netFee || 0) / months));
  };
  const changeEmiMonths = (event: ChangeEvent<HTMLInputElement>) => {
    const monthsValue = event.target.value;
    setEmiMonthsDraft(monthsValue);
    setEmiAmountDraft(monthsValue ? recalculateEmiAmount(monthsValue) : "0");
  };
  const changeAdmissionEmiMonths = (event: ChangeEvent<HTMLInputElement>) => {
    // EMI months is locked to course duration — this handler kept for potential future use
    const monthsValue = event.target.value;
    const months = Math.max(1, Number(monthsValue || 0));
    setAdmissionEmiMonthsDraft(monthsValue);
    const baseAmount = isPartialEmiPaymentMode(admissionPaymentModeDraft) ? admissionEmiBalance : admissionDue || admissionNetFee || 0;
    setAdmissionEmiAmountDraft(monthsValue ? String(Math.floor(baseAmount / months)) : "0");
  };
  // Recalculate EMI amount dynamically (months are locked to course duration)
  const updateAdmissionEmi = (
    newTotal = admissionTotalFeeDraft,
    newDiscount = admissionDiscountDraft,
    newUpfront = admissionUpfrontDraft,
    newMode = admissionPaymentModeDraft,
    newMonths = admissionEmiMonthsDraft
  ) => {
    const isPartial = isPartialEmiPaymentMode(newMode);
    const isEmi = newMode === "EMI" || isPartial;
    if (!isEmi) {
      setAdmissionEmiAmountDraft("0");
      return;
    }
    const resolvedCourseMonths = Math.max(1, getCourseDurationMonths(student.course, courses));
    const parsedMonths = Number(newMonths || admissionEmiMonthsDraft || 0);
    const months = parsedMonths > 0 ? parsedMonths : resolvedCourseMonths;
    if (!admissionEmiMonthsDraft || Number(admissionEmiMonthsDraft) <= 0 || admissionEmiMonthsDraft !== String(months)) {
      setAdmissionEmiMonthsDraft(String(months));
    }
    const total = Math.max(0, Number(newTotal || 0));
    const disc = Math.max(0, Number(newDiscount || 0));
    const net = Math.max(0, total - disc);
    const upfront = isPartial ? Math.max(0, Number(newUpfront || 0)) : 0;
    const balance = Math.max(0, net - Math.max(student.paidAmount || 0, upfront));
    const emiAmt = months > 0 ? Math.floor(balance / months) : 0;
    setAdmissionEmiAmountDraft(String(emiAmt));
  };
  const recalcEmiOnModeChange = (newMode: string) => {
    setAdmissionPaymentModeDraft(newMode);
    const resolvedCourseMonths = Math.max(1, getCourseDurationMonths(student.course, courses));
    const currentMonths = Number(admissionEmiMonthsDraft || 0) || resolvedCourseMonths;
    setAdmissionEmiMonthsDraft(String(currentMonths));
    updateAdmissionEmi(admissionTotalFeeDraft, admissionDiscountDraft, admissionUpfrontDraft, newMode, String(currentMonths));
  };
  const updateInternshipDuration = (start: string, duration: string, unit: string) => {
    const nextEndDate = dateInputValueFromDuration(start, duration, unit);
    if (nextEndDate) setInternshipEndDraft(nextEndDate);
  };
  const changeInternshipStart = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInternshipStartDraft(value);
    updateInternshipDuration(value, internshipDurationDraft, internshipDurationUnitDraft);
  };
  const changeInternshipDuration = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInternshipDurationDraft(value);
    updateInternshipDuration(internshipStartDraft, value, internshipDurationUnitDraft);
  };
  const changeInternshipDurationUnit = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setInternshipDurationUnitDraft(value);
    updateInternshipDuration(internshipStartDraft, internshipDurationDraft, value);
  };
  const saveAdmissionPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (normalizeStudentStatus(student.status) === "Enrolled") return toast.error("Mark admission completed before deciding fees");
    const totalFee = Number(admissionTotalFeeDraft || 0);
    const discountAmount = Number(admissionDiscountDraft || 0);
    const paymentMode = normalizeAdmissionPaymentMode(admissionPaymentModeDraft || "Full Payment");
    const isPartial = isPartialEmiPaymentMode(paymentMode);
    const isEmi = paymentMode === "EMI" || isPartial;
    const upfrontAmount = isPartial ? Number(admissionUpfrontDraft || 0) : 0;
    const resolvedCourseMonths = Math.max(1, getCourseDurationMonths(student.course, courses));
    const months = Math.max(1, Number(admissionEmiMonthsDraft || 0) || resolvedCourseMonths);
    const netFee = Math.max(0, totalFee - discountAmount);
    const emiBalance = isPartial
      ? Math.max(0, netFee - Math.max(student.paidAmount || 0, upfrontAmount))
      : Math.max(0, netFee - (student.paidAmount || 0));
    const calculatedMonthlyEmi = months > 0 ? Math.floor(emiBalance / months) : 0;
    const amount = isEmi ? (Number(admissionEmiAmountDraft || 0) || calculatedMonthlyEmi) : 0;
    if (totalFee <= 0) return toast.error("Final fee is required");
    if (discountAmount < 0) return toast.error("Discount cannot be negative");
    if (discountAmount > totalFee) return toast.error("Discount cannot exceed final fee");
    if (!admissionPaymentModes.includes(paymentMode)) return toast.error("Choose a valid admission payment plan");
    if (student.paidAmount && student.paidAmount > totalFee - discountAmount) return toast.error("Paid amount cannot exceed final payable fee");
    if (isPartial) {
      if (upfrontAmount <= 0) return toast.error("Partial amount is required");
      if (upfrontAmount >= totalFee - discountAmount) return toast.error("Partial amount must be less than final payable fee");
    }
    if (isEmi) {
      if (emiBalance <= 0) return toast.error("Cannot enable EMI when there is no pending EMI balance");
      if (months < 1 || months > 60) return toast.error("EMI months must be between 1 and 60");
      if (amount <= 0) return toast.error("Monthly EMI amount is required");
      if (amount > emiBalance) return toast.error(`Monthly EMI cannot exceed EMI balance of ${formatCurrency(emiBalance)}`);
      if (!admissionNextEmiDateDraft) return toast.error("Next EMI date is required");
    }
    onStudentPatch(student._id, {
      totalFee,
      discountAmount,
      admissionPaymentMode: paymentMode,
      admissionUpfrontAmount: upfrontAmount,
      emiEnabled: isEmi,
      emiMonths: isEmi ? months : 0,
      emiAmount: isEmi ? amount : 0,
      nextEmiDate: isEmi ? admissionNextEmiDateDraft : "",
      status: ["Enrolled", "Admission Completed", "Admission"].includes(student.status) ? "Fees Decided" : normalizeStudentStatus(student.status),
    });
  };
  const completeAdmission = () => {
    onStudentPatch(student._id, { status: "Admission Completed" });
  };
  const saveEmiPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    const months = Number(form.emiMonths || 0);
    const amount = Number(form.emiAmount || 0) || Number(recalculateEmiAmount(String(months)));
    if (due <= 0) return toast.error("Cannot save EMI plan because fee is fully paid");
    if (amount <= 0) return toast.error("Monthly EMI amount is required");
    if (amount > due) return toast.error(`Monthly EMI cannot exceed pending due of ${formatCurrency(due)}`);
    onStudentPatch(student._id, {
      emiEnabled: true,
      emiMonths: months,
      emiAmount: amount,
      nextEmiDate: String(form.nextEmiDate || ""),
    });
  };
  const closeEmiPlan = () => {
    onStudentPatch(student._id, { emiEnabled: false, emiMonths: 0, emiAmount: 0, nextEmiDate: "" });
  };

  if (editMode) {
    const studentCourseOptions = courseOptionsForCentre(editCentreDraft, courses, isSuperAdmin);
    const batchOptions = batches.filter((batch) => {
      const courseMatches = !editCourseDraft || !batch.course || courseShortCode(batch.course) === courseShortCode(editCourseDraft);
      const centreMatches = !editCentreDraft || !batch.centre || batch.centre === editCentreDraft;
      return courseMatches && centreMatches;
    });
    const saveStudentEdit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = Object.fromEntries(new FormData(event.currentTarget).entries());
      const totalFee = Number(form.totalFee || 0);
      const discountAmount = Number(form.discountAmount || 0);
      const paidAmount = Number(form.paidAmount || 0);
      const editDue = Math.max(0, totalFee - discountAmount - paidAmount);
      const emiEnabled = form.emiEnabled === "true";
      const emiAmount = Number(form.emiAmount || 0);
      if (canManageFees) {
        if (paidAmount > Math.max(0, totalFee - discountAmount)) return toast.error("Paid amount cannot exceed net course fee");
        if (emiEnabled && editDue <= 0) return toast.error("Cannot enable EMI when fee is fully paid");
        if (emiAmount > editDue && editDue > 0) return toast.error(`Monthly EMI cannot exceed pending due of ${formatCurrency(editDue)}`);
      }
      const nextStatus = String(form.status || student.status);
      const statusReason = studentStatusBlockReason({ ...student, totalFee, discountAmount, paidAmount }, nextStatus);
      if (statusReason) return toast.error(statusReason);
      const updates: Partial<Student> = {
        fullName: String(form.fullName || ""),
        phone: String(form.phone || ""),
        parentMobile: String(form.parentMobile || ""),
        email: String(form.email || ""),
        studentLocation: String(form.studentLocation || ""),
        admissionNumber: String(form.admissionNumber || ""),
        course: String(form.course || ""),
        centre: String(form.centre || ""),
        batch: String(form.batch || ""),
        batchCommenceDate: String(form.batchCommenceDate || ""),
        status: nextStatus,
        ...(canManageSettings ? { counsellor: String(form.counsellor || "") } : {}),
        ...(canAssignTeachers ? { teacher: String(form.teacher || "") } : {}),
      };
      const editCourseMonths = Math.max(1, getCourseDurationMonths(String(form.course || student.course), courses));
      const editEmiMonths = emiEnabled ? Math.max(1, Number(form.emiMonths || 0) || editCourseMonths) : 0;
      if (canManageFees) Object.assign(updates, {
        totalFee,
        discountAmount,
        paidAmount,
        emiEnabled,
        emiMonths: editEmiMonths,
        emiAmount,
        nextEmiDate: String(form.nextEmiDate || ""),
      });
      onStudentPatch(student._id, updates);
      setEditMode(false);
    };
    return (
      <div className="card profile-shell">
        <div className="profile-head">
          <div className="avatar drawer-avatar">{initials(student.fullName)}</div>
          <div className="profile-title"><h3>Edit student</h3><div className="cell-sub mono">{student.admissionNumber || student.phone}</div></div>
          <button className="close-x" onClick={onBack}>x</button>
        </div>
        <form className="card-body field-grid profile-edit-form" onSubmit={saveStudentEdit}>
          <EditField name="fullName" label="Full name" defaultValue={student.fullName} required />
          <EditField name="phone" label="Phone" defaultValue={student.phone} required />
          <EditField name="parentMobile" label="Parent mobile" defaultValue={student.parentMobile} />
          <EditField name="email" label="Email" type="email" defaultValue={student.email} />
          <EditField name="studentLocation" label="Student location" defaultValue={student.studentLocation} />
          <EditField name="admissionNumber" label="Admission no." defaultValue={student.admissionNumber} />
          <div className="field"><label>Course</label><select name="course" value={editCourseDraft} onChange={(event) => {
            const nextCourse = event.target.value;
            setEditCourseDraft(nextCourse);
            const matched = allCourses.find((c) => [c.code, c.name].map((s) => String(s || "").toLowerCase()).includes(nextCourse.toLowerCase()));
            if (matched?.fee) {
              setEditTotalFeeDraft(String(feeWithGst(matched.fee)));
            }
          }}><option value="">Unassigned</option>{studentCourseOptions.map((course) => <option key={course}>{course}</option>)}</select></div>
          <div className="field"><label>Centre</label><select name="centre" value={editCentreDraft} onChange={(event) => { const centre = event.target.value; setEditCentreDraft(centre); }}><option value="">Unassigned</option>{centres.map((centre) => <option key={centre}>{centre}</option>)}</select></div>
          <div className="field"><label>Batch</label><select name="batch" value={editBatchDraft} onChange={(event) => setEditBatchDraft(event.target.value)}><option value="">Unassigned</option>{editBatchDraft && !batchOptions.some((batch) => batch.name === editBatchDraft) && <option value={editBatchDraft}>{editBatchDraft} - current</option>}{batchOptions.map((batch) => <option key={batch._id} value={batch.name}>{batch.name} - {courseShortCode(batch.course)}{batch.centre ? ` - ${batch.centre}` : ""}</option>)}</select>{!batchOptions.length && <span className="field-help">No matching batch. Create one in Settings - Batches.</span>}</div>
          <EditField name="batchCommenceDate" label="Batch start date" type="date" defaultValue={dateInputValue(batchOptions.find((b) => b.name === (editBatchDraft || student.batch))?.commenceDate || student.batchCommenceDate || "")} />
          {canManageSettings && <EditField name="counsellor" label="Counsellor" defaultValue={student.counsellor} />}
          {canAssignTeachers && <div className="field"><label>Teacher</label><select name="teacher" defaultValue={student.teacher || ""}><option value="">Unassigned</option>{teachers.map((teacher) => <option key={teacher.email}>{teacher.name}</option>)}</select></div>}
          <div className="field"><label>Status</label><select name="status" defaultValue={normalizeStudentStatus(student.status)}>{studentStatuses.map((status) => <option key={status} value={status}>{studentStatusLabel(status)}</option>)}</select><span className="field-help">Alumni is available only after fee clearance and certificate issue.</span></div>
          {canManageFees && <>
            <EditField name="totalFee" label="Total fee" type="number" value={editTotalFeeDraft} onChange={(e) => setEditTotalFeeDraft((e.target as HTMLInputElement).value)} />
            <EditField name="discountAmount" label="Discount" type="number" defaultValue={String(student.discountAmount || 0)} />
            <EditField name="paidAmount" label="Paid amount" type="number" defaultValue={String(student.paidAmount || 0)} />
            <div className="field"><label>EMI enabled</label><select name="emiEnabled" defaultValue={student.emiEnabled ? "true" : ""}><option value="">No</option><option value="true">Yes</option></select></div>
            <EditField name="emiMonths" label="EMI months" type="number" defaultValue={String(student.emiMonths || courseDurationMonths)} />
            <EditField name="emiAmount" label="Monthly EMI" type="number" defaultValue={String(student.emiAmount || 0)} />
            <EditField name="nextEmiDate" label="Next EMI date" type="date" defaultValue={student.nextEmiDate ? dateInputValue(new Date(student.nextEmiDate)) : ""} />
          </>}
          <div className="profile-edit-actions"><button type="button" className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button><button className="btn btn-primary"><Pencil size={15} /> Save update</button></div>
        </form>
      </div>
    );
  }

  return (
    <div className="card profile-shell">
      <div className="profile-head">
        <div className="avatar drawer-avatar">{initials(student.fullName)}</div>
        <div className="profile-title"><h3>{student.fullName}</h3><div className="cell-sub mono">{student.admissionNumber || student.phone} - <span className={`badge badge-${stageTag(normalizedStatus)}`}>{studentStatusLabel(normalizedStatus)}</span></div></div>
        <button className="close-x" onClick={onBack}>x</button>
      </div>
      <div className="dtabs profile-tabs">{tabs.map((tab) => <button type="button" key={tab.key} className={`dtab ${activeStudentTab === tab.key ? "active" : ""}`} onClick={() => setStudentTab(tab.key)}>{tab.label}</button>)}</div>
      <div className="drawer-body profile-drawer-body">
        {activeStudentTab === "sum" && <div className="dpane active">
          <div className="grid-metrics profile-metrics">
            <MetricCard
              label="Total fee"
              value={formatCurrency(student.totalFee || dynamicCoursePayable || 0)}
              dot="#4F6BFF"
              delta={student.totalFee && dynamicCoursePayable && student.totalFee !== dynamicCoursePayable ? `Standard: ${formatCurrency(dynamicCoursePayable)}` : (studentCourseObj ? `Base: ${formatCurrency(studentCourseObj.fee || 0)} + 18% GST` : "")}
            />
            <MetricCard label="Paid" value={formatCurrency(student.paidAmount || 0)} dot="#17A673" delta="" />
          </div>
          <div className="kv-row"><span className="k">Progress</span><span className="v"><span className="progress-track profile-progress"><span className="progress-fill" style={{ width: `${paidPct}%` }} /></span> {paidPct}%</span></div>
          <div className="kv-row"><span className="k">Due</span><span className="v">{formatCurrency(due || Math.max(0, (student.totalFee || dynamicCoursePayable || 0) - (student.discountAmount || 0) - (student.paidAmount || 0)))}</span></div>
          <div className="kv-row"><span className="k">Discount</span><span className="v">{formatCurrency(student.discountAmount || 0)}</span></div>
          <div className="kv-row"><span className="k">Course</span><span className="v">{courseShortCode(student.course)}</span></div>
          <div className="kv-row"><span className="k">Centre</span><span className="v">{student.centre || "-"}</span></div>
          <div className="kv-row"><span className="k">Phone</span><span className="v">{student.phone || "-"}</span></div>
          <div className="kv-row"><span className="k">Email</span><span className="v">{student.email || "-"}</span></div>
          <div className="kv-row"><span className="k">Student location</span><span className="v">{student.studentLocation || "-"}</span></div>
          <div className="kv-row"><span className="k">Batch</span><span className="v">{student.batch || "Unassigned"}</span></div>
          <div className="kv-row"><span className="k">Batch start date</span><span className="v mono">{batchStartDate ? formatDate(batchStartDate) : "Not set"}</span></div>
          <div className="kv-row"><span className="k">Batch end date</span><span className="v mono">{batchEndDate ? <>{formatDate(batchEndDate)} <span className="cell-sub">({courseDurationMonths} months duration)</span></> : "Not set"}</span></div>
          <div className="kv-row"><span className="k">Counsellor</span><span className="v">{student.counsellor || "-"}</span></div>
          <div className="kv-row"><span className="k">Teacher</span><span className="v">{student.teacher || "Unassigned"}</span></div>
          <div className="kv-row"><span className="k">LMS access</span><span className="v">{student.lmsAccessEnabled ? <span className="badge badge-green">Enabled</span> : <span className="badge badge-gray">Not generated</span>}</span></div>
          <div className="field drawer-notes"><label>Status</label><select value={normalizedStatus} onChange={(event) => { const reason = studentStatusBlockReason(student, event.target.value); if (reason) { toast.error(reason); return; } onStudentPatch(student._id, { status: event.target.value }); }}>{studentStatuses.map((status) => <option key={status} value={status}>{studentStatusLabel(status)}</option>)}</select></div>

          <div style={{ marginTop: 18, borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-strong)", display: "flex", alignItems: "center", gap: 6 }}>
                <Package size={15} color="#4F6BFF" /> Student Kit & Tablet Distribution
              </div>
              {canManageInventory && onIssueKit && (
                <button type="button" className="btn btn-sm btn-soft" onClick={() => onIssueKit(student)}>
                  <Package size={13} /> {student.kitDistribution?.issuedAt ? "Update Kit" : "Issue Kit"}
                </button>
              )}
            </div>
            <div className="kv-row">
              <span className="k" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><CreditCard size={14} color="#4F6BFF" /> ID Card</span>
              <span className="v">{student.kitDistribution?.idCardIssued ? <span className="badge badge-green">Issued {student.kitDistribution.idCardNumber ? `(${student.kitDistribution.idCardNumber})` : ""}</span> : <span className="badge badge-gray">Pending</span>}</span>
            </div>
            <div className="kv-row">
              <span className="k" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Shirt size={14} color="#14B8A6" /> T-Shirt</span>
              <span className="v">{student.kitDistribution?.tshirtIssued ? <span className="badge badge-green">Issued {student.kitDistribution.tshirtSize ? `(Size ${student.kitDistribution.tshirtSize})` : ""}</span> : <span className="badge badge-gray">Pending</span>}</span>
            </div>
            <div className="kv-row">
              <span className="k" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><ShoppingBag size={14} color="#8B5CF6" /> Bag</span>
              <span className="v">{student.kitDistribution?.bagIssued ? <span className="badge badge-green">Issued</span> : <span className="badge badge-gray">Pending</span>}</span>
            </div>
            <div className="kv-row">
              <span className="k" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Tablet size={14} color="#F5A524" /> Tablet</span>
              <span className="v">
                {student.kitDistribution?.tabletIssued ? (
                  <div>
                    <span className="badge badge-green">Assigned ({student.kitDistribution.tabletAssetId || "Tablet"})</span>
                    {student.kitDistribution.tabletSerialNumber && (
                      <div className="cell-sub mono">S/N: {student.kitDistribution.tabletSerialNumber}</div>
                    )}
                  </div>
                ) : (
                  <span className="badge badge-gray">Not Assigned</span>
                )}
              </span>
            </div>
            {student.kitDistribution?.issuedAt && (
              <div className="kv-row">
                <span className="k">Issued Details</span>
                <span className="v cell-sub">{formatDate(student.kitDistribution.issuedAt)} {student.kitDistribution.issuedBy ? `by ${student.kitDistribution.issuedBy}` : ""}</span>
              </div>
            )}
          </div>
        </div>}
        {activeStudentTab === "journey" && <div className="dpane active">{studentJourneyStages.map((stage) => {
          const currentIndex = studentJourneyStages.indexOf(normalizedStatus);
          const done = currentIndex >= 0 && studentJourneyStages.indexOf(stage) <= currentIndex;
          return <div className="kv-row" key={stage}><span className="k">{studentStatusLabel(stage)}</span><span className="v">{done ? <span className="badge badge-green">Done</span> : <span className="badge badge-gray">Awaiting</span>}</span></div>;
        })}</div>}
        {activeStudentTab === "admission" && <div className="dpane active">
          {normalizedStatus === "Enrolled" && <div className="empty-state paid-empty"><h4>Admission not completed</h4><p>Complete admission details first, then decide fees.</p><button type="button" className="btn btn-primary" onClick={completeAdmission}><CheckCircle2 size={15} /> Mark admission completed</button></div>}
          <div className="grid-metrics profile-metrics">
            <MetricCard label="Final payable" value={formatCurrency(admissionNetFee)} dot="#4F6BFF" delta={`discount ${formatCurrency(admissionDiscount)}`} />
            <MetricCard label={isAdmissionPartialEmiPlan ? "EMI balance" : "Pending due"} value={formatCurrency(isAdmissionPartialEmiPlan ? admissionEmiBalance : admissionDue)} dot="#EF4444" delta={isAdmissionPartialEmiPlan ? `partial ${formatCurrency(admissionUpfrontAmount)}` : `paid ${formatCurrency(student.paidAmount || 0)}`} />
          </div>
          <form className="field-grid feedback-form emi-plan-form" onSubmit={saveAdmissionPlan}>
            <div className="field">
              <RequiredLabel required>Final fee</RequiredLabel>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  name="totalFee"
                  type="number"
                  min="1"
                  step="1"
                  required
                  disabled={!canDecideFees}
                  value={admissionTotalFeeDraft}
                  onChange={(event) => {
                    const val = event.target.value;
                    setAdmissionTotalFeeDraft(val);
                    updateAdmissionEmi(val, admissionDiscountDraft, admissionUpfrontDraft, admissionPaymentModeDraft);
                  }}
                  style={{ flex: 1 }}
                />
                {dynamicCoursePayable > 0 && canDecideFees && (
                  <button
                    type="button"
                    className="btn btn-sm btn-soft"
                    style={{ whiteSpace: "nowrap" }}
                    title="Set to standard course fee"
                    onClick={() => {
                      const val = String(dynamicCoursePayable);
                      setAdmissionTotalFeeDraft(val);
                      updateAdmissionEmi(val, admissionDiscountDraft, admissionUpfrontDraft, admissionPaymentModeDraft);
                    }}
                  >
                    Reset ({formatCurrency(dynamicCoursePayable)})
                  </button>
                )}
              </div>
              {studentCourseObj && (
                <span className="field-help">
                  Standard course fee: {formatCurrency(studentCourseObj.fee || 0)} base + 18% GST = {formatCurrency(dynamicCoursePayable)}
                </span>
              )}
            </div>
            <div className="field"><RequiredLabel>Discount</RequiredLabel><input name="discountAmount" type="number" min="0" max={admissionTotalFee || undefined} step="1" disabled={!canDecideFees} value={admissionDiscountDraft} onChange={(event) => { const val = event.target.value; setAdmissionDiscountDraft(val); updateAdmissionEmi(admissionTotalFeeDraft, val, admissionUpfrontDraft, admissionPaymentModeDraft); }} /></div>
            <div className="field"><RequiredLabel required>Fee payment plan</RequiredLabel><select name="admissionPaymentMode" required disabled={!canDecideFees} value={admissionPaymentModeDraft} onChange={(event) => recalcEmiOnModeChange(event.target.value)}>{admissionPaymentModes.map((mode) => <option key={mode}>{mode}</option>)}</select></div>
            {isAdmissionPartialEmiPlan && <div className="field"><RequiredLabel required>Upfront / partial amount</RequiredLabel><input name="admissionUpfrontAmount" type="number" min="1" max={admissionNetFee ? admissionNetFee - 1 : undefined} required disabled={!canDecideFees} value={admissionUpfrontDraft} onChange={(event) => { const value = event.target.value; setAdmissionUpfrontDraft(value); updateAdmissionEmi(admissionTotalFeeDraft, admissionDiscountDraft, value, admissionPaymentModeDraft); }} /><span className="field-help">Record this actual payment from the Payments tab after saving admission.</span></div>}
            {isAdmissionEmiPlan && <>
              <div className="field"><RequiredLabel required>EMI months</RequiredLabel><input name="emiMonths" type="number" required readOnly disabled value={admissionEmiMonthsDraft} style={{ background: "var(--surface-2, #f3f4f6)", cursor: "not-allowed" }} /><span className="field-help">Auto-set from course duration ({admissionEmiMonthsDraft} months) — not editable</span></div>
              <div className="field"><RequiredLabel required>Monthly EMI (auto-calculated)</RequiredLabel><input name="emiAmount" type="number" required readOnly disabled value={admissionEmiAmountDraft} style={{ background: "var(--surface-2, #f3f4f6)", cursor: "not-allowed" }} /><span className="field-help">{isAdmissionPartialEmiPlan ? "EMI balance" : "Pending due"}: {formatCurrency(isAdmissionPartialEmiPlan ? admissionEmiBalance : admissionDue)} / {admissionEmiMonthsDraft} months — auto-calculated (not editable){(isAdmissionPartialEmiPlan ? admissionEmiBalance : admissionDue) - (Number(admissionEmiAmountDraft || 0) * Number(admissionEmiMonthsDraft || 1)) > 0 ? ` (₹${(isAdmissionPartialEmiPlan ? admissionEmiBalance : admissionDue) - (Number(admissionEmiAmountDraft || 0) * Number(admissionEmiMonthsDraft || 1))} adjusted in final month)` : ""}</span></div>
              <div className="field"><RequiredLabel required>Next EMI date</RequiredLabel><input name="nextEmiDate" type="date" required disabled={!canDecideFees} value={admissionNextEmiDateDraft} onChange={(event) => setAdmissionNextEmiDateDraft(event.target.value)} /></div>
            </>}
            <div className="profile-edit-actions"><button className="btn btn-primary" disabled={!canDecideFees}><CheckCircle2 size={15} /> Save fees decided</button></div>
          </form>
          <div className="kv-row"><span className="k">Admission finalized</span><span className="v">{student.admissionFinalizedAt ? `${formatDate(student.admissionFinalizedAt)} by ${student.admissionFinalizedBy || "Admin"}` : "Not yet"}</span></div>
          <div className="empty-state paid-empty lms-access-card">
            <h4>Student LMS login</h4>
            {student.lmsAccessEnabled ? (
              <>
                <p>Enabled for this student. Login with admission number and registered phone.</p>
                <div className="kv-row"><span className="k">Admission no.</span><span className="v mono">{student.admissionNumber || "-"}</span></div>
                <div className="kv-row"><span className="k">Phone</span><span className="v mono">{student.phone || "-"}</span></div>
                <div className="kv-row"><span className="k">Generated</span><span className="v">{student.lmsAccessGeneratedAt ? `${formatDate(student.lmsAccessGeneratedAt)} by ${student.lmsAccessGeneratedBy || "Admin"}` : "Enabled"}</span></div>
              </>
            ) : (
              <>
                <p>{lmsAccessReady ? "Generate access after confirming admission, fees, and batch assignment." : lmsAccessBlockReason}</p>
                {canManageFees && <button type="button" className="btn btn-primary" disabled={!lmsAccessReady} onClick={() => onGenerateStudentLmsAccess(student)}><CheckCircle2 size={15} /> Generate LMS login</button>}
              </>
            )}
          </div>
        </div>}
        {activeStudentTab === "pay" && <div className="dpane active">
          <div className="table-wrap"><table><thead><tr><th>#</th><th>Date</th><th>Payment for</th><th>Mode</th><th>Reference</th><th>Amount</th><th>Recorded by</th><th>Receipt</th><th>Proof</th></tr></thead><tbody>{payments.map((payment, index) => <tr key={`${payment.paidAt || index}-${payment.amount || 0}`}><td>{index + 1}</td><td className="mono">{formatDate(payment.paidAt)}</td><td>{normalizePaymentPurpose(payment.paymentPurpose, payment.mode)}{payment.emiReference && <div className="cell-sub mono">{payment.emiReference}</div>}</td><td>{payment.mode || "-"}</td><td className="mono">{payment.transactionId || "-"}{payment.loanProviderName && <div className="cell-sub">{payment.loanProviderName}</div>}</td><td className="mono">{formatCurrency(payment.amount || 0)}</td><td>{payment.by || "-"}</td><td className="mono">{paymentReceiptNumber(student, index)}</td><td>{payment.proof?.storedName ? <button type="button" className="action-icon-btn action-icon-primary" title={payment.proof.originalName || "Download proof"} onClick={() => onDownloadPaymentProof(student, payment, index)}><Download size={14} /></button> : <span className="cell-sub">Missing</span>}</td></tr>)}{!payments.length && <tr><td colSpan={9}><div className="empty-state"><h4>No payments yet</h4></div></td></tr>}</tbody></table></div>
          {canManageFees && (!admissionPlanReady ? <div className="empty-state"><h4>Complete admission first</h4><p>Finalize the fee and payment plan in the Admission tab before recording payments.</p><button type="button" className="btn btn-primary" onClick={() => setStudentTab("admission")}>Open admission</button></div> : due <= 0 ? <div className="empty-state paid-empty"><h4>Fully paid</h4><p>No pending due for this student.</p></div> : <form className="payment-form profile-payment-form" onSubmit={(event) => onPayment(event, student)}>
            <div className="field"><RequiredLabel required>Payment amount</RequiredLabel><input name="amount" type="number" min="1" max={due} step="1" required defaultValue={paymentPurposeDraft === "Fees Installment" && emiBreakdown.isEmi ? emiBreakdown.currentDue : ""} key={`${student._id}-${paymentPurposeDraft}`} /><span className="field-help">{paymentPurposeDraft === "Fees Installment" && emiBreakdown.isEmi ? `Expected this cycle: ${formatCurrency(emiBreakdown.currentDue)} ${emiBreakdown.shortfall > 0 ? `(${formatCurrency(emiBreakdown.baseEmi)} EMI + ${formatCurrency(emiBreakdown.shortfall)} shortfall)` : ""} | ` : ""}Pending due: {formatCurrency(due)}</span></div>
            <div className="field"><RequiredLabel required>Payment for</RequiredLabel><select name="paymentPurpose" value={paymentPurposeDraft} required onChange={(event) => setPaymentPurposeDraft(event.target.value)}>{paymentPurposes.map((purpose) => <option key={purpose}>{purpose}</option>)}</select>{paymentPurposeDraft === "Seat Booking Amount" && <span className="field-help">Use this for the first booking/token amount.</span>}</div>
            <div className="field"><RequiredLabel required>Mode</RequiredLabel><select name="mode" value={paymentModeDraft} required onChange={(event) => setPaymentModeDraft(event.target.value)}>{paymentModes.map((mode) => <option key={mode}>{mode}</option>)}</select></div>
            {paymentModeDraft === "Loan Provider" && <div className="field"><RequiredLabel required>Loan provider name</RequiredLabel><input name="loanProviderName" required maxLength={100} /></div>}
            {paymentPurposeDraft === "Fees Installment" && student.emiEnabled && <div className="field"><RequiredLabel>EMI reference no.</RequiredLabel><input name="emiReference" value={emiReferenceNumber(student)} readOnly maxLength={paymentReferenceMaxLength} /><span className="field-help">Auto generated for this EMI installment.</span></div>}
            {paymentModeDraft !== "Cash" && <div className="field"><RequiredLabel required>{paymentReferenceLabel(paymentModeDraft)}</RequiredLabel><input name="transactionId" required maxLength={paymentReferenceMaxLength} pattern="[A-Za-z0-9][A-Za-z0-9 ._/@:-]*" /><span className="field-help">Required for {paymentModeDraft} payments.</span></div>}
            <div className="field"><label>Note</label><input name="note" maxLength={paymentNoteMaxLength} /></div>
            {paymentModeDraft !== "Cash" && <div className="field"><RequiredLabel required>Payment proof</RequiredLabel><input name="paymentProof" type="file" accept={leadDocumentAccept} required /><span className="field-help">{leadDocumentHelpText}</span></div>}
            <div className="payment-form-actions"><button className="btn btn-primary">Record payment</button></div>
          </form>)}
        </div>}
        {activeStudentTab === "emi" && <div className="dpane active">
          {hasEmi && <>
            <div className="kv-row"><span className="k">Plan tenure</span><span className="v">{student.emiMonths || "-"} months</span></div>
            <div className="kv-row"><span className="k">Scheduled monthly EMI</span><span className="v">{formatCurrency(student.emiAmount || 0)}</span></div>
            {emiBreakdown.shortfall > 0 && <div className="kv-row"><span className="k">Previous shortfall (arrears)</span><span className="v"><span className="badge badge-red">{formatCurrency(emiBreakdown.shortfall)}</span></span></div>}
            <div className="kv-row"><span className="k">Total due this cycle</span><span className="v"><strong>{formatCurrency(emiBreakdown.currentDue)}</strong></span></div>
            <div className="kv-row"><span className="k">Next EMI date</span><span className="v">{formatDate(student.nextEmiDate)}</span></div>
            <div style={{ marginTop: "10px", marginBottom: "14px", display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-sm btn-green"
                onClick={() => {
                  const url = emiReminderWhatsAppUrl(student);
                  if (url) window.open(url, "_blank", "noopener,noreferrer");
                  else toast.error("Student phone number missing");
                }}
              >
                <MessageCircle size={14} /> Send WhatsApp reminder
              </button>
              <button
                type="button"
                className="btn btn-sm btn-ghost"
                title="Copy reminder text"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(emiReminderMessage(student));
                    toast.success("EMI reminder copied with emojis!");
                  } catch {
                    toast.error("Failed to copy reminder");
                  }
                }}
              >
                <Copy size={14} /> Copy reminder
              </button>
            </div>
          </>}
          {canManageFees ? (!admissionPlanReady ? <div className="empty-state"><h4>Complete admission first</h4><p>EMI terms must be decided in the Admission tab before updating EMI reminders.</p><button type="button" className="btn btn-primary" onClick={() => setStudentTab("admission")}>Open admission</button></div> : due <= 0 ? <div className="empty-state paid-empty"><h4>Fully paid</h4><p>EMI plan is not needed because there is no pending due.</p>{hasEmi && <button type="button" className="btn btn-ghost" onClick={closeEmiPlan}>Close EMI plan</button>}</div> : <form className="field-grid feedback-form emi-plan-form" onSubmit={saveEmiPlan}>
            <div className="field"><RequiredLabel required>EMI months</RequiredLabel><input name="emiMonths" type="number" required readOnly disabled value={emiMonthsDraft} style={{ background: "var(--surface-2, #f3f4f6)", cursor: "not-allowed" }} /><span className="field-help">Auto-set from course duration ({emiMonthsDraft} months) — not editable</span></div>
            <div className="field"><RequiredLabel required>Monthly EMI (auto-calculated)</RequiredLabel><input name="emiAmount" type="number" required readOnly disabled value={emiAmountDraft} style={{ background: "var(--surface-2, #f3f4f6)", cursor: "not-allowed" }} /><span className="field-help">Pending due: {formatCurrency(due)} / {emiMonthsDraft} months — auto-calculated (not editable){due - (Number(emiAmountDraft || 0) * Number(emiMonthsDraft || 1)) > 0 ? ` (₹${due - (Number(emiAmountDraft || 0) * Number(emiMonthsDraft || 1))} adjusted in final month)` : ""}</span></div>
            <Field name="nextEmiDate" label="Next EMI date" type="date" defaultValue={student.nextEmiDate ? dateInputValue(student.nextEmiDate) : dateInputValueFromOffset(12)} required />
            <div className="profile-edit-actions"><button className="btn btn-primary"><CalendarDays size={15} /> {hasEmi ? "Update EMI plan" : "Save EMI plan"}</button>{hasEmi && <button type="button" className="btn btn-ghost" onClick={closeEmiPlan}>Close EMI plan</button>}</div>
          </form>) : <div className="empty-state"><h4>EMI updates restricted</h4><p>Admin access is required to manage EMI plans.</p></div>}
        </div>}
        {activeStudentTab === "internship" && <div className="dpane active">
          <div className={`internship-status-card ${internshipAssignment ? "assigned" : ""}`}>
            <div>
              <span className={`badge ${internshipAssignment ? "badge-green" : "badge-amber"}`}>{internshipAssignment?.status || "Not assigned"}</span>
              <h4>{internshipAssignment?.facilityName || "Internship not assigned yet"}</h4>
              <p>{internshipAssignment ? `${formatDate(internshipAssignment.startDate)} to ${formatDate(internshipAssignment.expectedEndDate)}` : "Assign hospital posting details to unlock internship and logbook in the Student LMS."}</p>
            </div>
            {internshipAssignment && <button type="button" className="btn btn-ghost btn-sm" onClick={() => onInternshipDelete(student)}><Trash2 size={14} /> Remove</button>}
          </div>
          <form className="field-grid feedback-form internship-form" onSubmit={(event) => onInternshipSave(event, student)}>
            <div className="field"><RequiredLabel required>Hospital / facility name</RequiredLabel><input name="facilityName" required defaultValue={internshipAssignment?.facilityName || ""} /></div>
            <div className="field"><label>Facility location</label><input name="facilityLocation" defaultValue={internshipAssignment?.facilityLocation || student.centre || ""} /></div>
            <div className="field"><label>Supervisor name</label><input name="supervisorName" defaultValue={internshipAssignment?.supervisorName || ""} /></div>
            <div className="field"><label>Supervisor contact</label><input name="supervisorContact" defaultValue={internshipAssignment?.supervisorContact || ""} /></div>
            <div className="field"><label>Supervisor email</label><input name="supervisorEmail" type="email" defaultValue={internshipAssignment?.supervisorEmail || ""} placeholder="supervisor@hospital.com" /></div>
            <div className="field"><label>Hospital latitude</label><input name="facilityLatitude" type="number" step="any" min="-90" max="90" defaultValue={internshipAssignment?.facilityLatitude ?? ""} placeholder="9.931233" /><span className="field-help">From Google Maps hospital pin.</span></div>
            <div className="field"><label>Hospital longitude</label><input name="facilityLongitude" type="number" step="any" min="-180" max="180" defaultValue={internshipAssignment?.facilityLongitude ?? ""} placeholder="76.267304" /><span className="field-help">Enter both latitude and longitude for GPS matching.</span></div>
            <div className="field"><label>Allowed radius (meters)</label><input name="allowedRadiusMeters" type="number" min="25" step="1" defaultValue={internshipAssignment?.allowedRadiusMeters || 200} /><span className="field-help">Example: 200m around hospital.</span></div>
            <div className="field"><RequiredLabel required>Start date</RequiredLabel><input name="startDate" type="date" required value={internshipStartDraft} onChange={changeInternshipStart} /></div>
            <div className="field"><RequiredLabel required>Expected end date</RequiredLabel><input name="expectedEndDate" type="date" required value={internshipEndDraft} onChange={(event) => setInternshipEndDraft(event.target.value)} /></div>
            <div className="field"><RequiredLabel required>Duration value</RequiredLabel><input name="durationValue" type="number" min="1" required value={internshipDurationDraft} onChange={changeInternshipDuration} /></div>
            <div className="field"><RequiredLabel required>Duration unit</RequiredLabel><select name="durationUnit" required value={internshipDurationUnitDraft} onChange={changeInternshipDurationUnit}>{internshipDurationUnits.map((unit) => <option key={unit} value={unit}>{unit}</option>)}</select></div>
            <div className="field"><RequiredLabel required>Status</RequiredLabel><select name="status" required defaultValue={internshipAssignment?.status || "Assigned"}>{internshipStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>
            <div className="field"><label>Department rotation</label><input name="departmentRotation" defaultValue={internshipAssignment?.departmentRotation || ""} placeholder="Front office, billing, ward, OPD..." /></div>
            <div className="profile-edit-actions"><button className="btn btn-primary"><CheckCircle2 size={15} /> {internshipAssignment ? "Update internship" : "Assign internship"}</button></div>
          </form>
          {internshipAssignment && <div className="kv-row"><span className="k">Last updated</span><span className="v">{formatDate(internshipAssignment.updatedAt)} by {internshipAssignment.assignedBy || "Admin"}</span></div>}
        </div>}
        {activeStudentTab === "feedback" && <div className="dpane active">
          <form className="field-grid feedback-form" onSubmit={(event) => onFeedback(event, student)}>
            <SelectField name="type" label="Feedback type" options={studentFeedbackTypes} />
            <SelectField name="status" label="Conversation status" options={studentFeedbackStatuses} />
            <Field name="nextFollowUpDate" label="Next follow-up date" type="date" />
            <div className="field full"><RequiredLabel required>Conversation note</RequiredLabel><textarea name="note" required /></div>
            <div className="profile-edit-actions"><button className="btn btn-primary"><Plus size={15} /> Add feedback</button></div>
          </form>
          <div className="feedback-timeline">
            {feedbacks.map((item, index) => <div className="feedback-item" key={`${item.at || index}-${item.note || ""}`}><div><span className={`badge ${studentFeedbackBadgeClass(item.status)}`}>{item.status || "General"}</span><b>{item.type || "Conversation"}</b></div><p>{item.note || "-"}</p><div className="cell-sub">{formatDate(item.at)} by {item.by || "Admin"}{item.nextFollowUpDate ? ` - follow-up ${formatDate(item.nextFollowUpDate)}` : ""}</div></div>)}
            {!feedbacks.length && <div className="empty-state"><h4>No feedback conversations yet</h4><p>Add the first student conversation note.</p></div>}
          </div>
        </div>}
        {activeStudentTab === "cert" && <div className="dpane active">{student.certificateNumber ? <CertificatePreview student={student} /> : <><div className="empty-state"><h4>Not ready</h4><p>Current status: {student.status}</p></div><button className="btn btn-primary drawer-full-btn" disabled={!eligible} onClick={() => onIssue(student)}>Issue certificate</button></>}</div>}
      </div>
    </div>
  );
}

function RequiredLabel({ children, required = false }: { children: ReactNode; required?: boolean }) {
  return <label>{children}{required && <span className="required-star" aria-hidden="true">*</span>}</label>;
}

function Field({ name, label, type = "text", required = false, defaultValue = "" }: { name: string; label: string; type?: string; required?: boolean; defaultValue?: string | number }) {
  return <div className="field"><RequiredLabel required={required}>{label}</RequiredLabel><input name={name} type={type} required={required} defaultValue={defaultValue} /></div>;
}

function EditField({ name, label, type = "text", defaultValue = "", value, onChange, required = false }: { name: string; label: string; type?: string; defaultValue?: string | number; value?: string | number; onChange?: (e: ChangeEvent<HTMLInputElement>) => void; required?: boolean }) {
  return <div className="field"><RequiredLabel required={required}>{label}</RequiredLabel><input name={name} type={type} {...(value !== undefined ? { value, onChange } : { defaultValue: defaultValue || "" })} required={required} /></div>;
}

function SelectField({ name, label, options, defaultValue = "" }: { name: string; label: string; options: string[]; defaultValue?: string }) {
  return <div className="field"><label>{label}</label><select name={name} defaultValue={defaultValue}>{options.map((option) => <option key={option} value={option}>{option || "Unassigned"}</option>)}</select></div>;
}

function DocumentPreviewModal({ preview, onClose }: { preview: DocumentPreviewState; onClose: () => void }) {
  const isLoaded = Boolean(preview && "url" in preview);
  return (
    <div className={`modal-overlay ${preview ? "show" : ""}`} onClick={onClose}>
      {preview && <div className="modal document-preview-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head document-preview-head">
          <h3>{preview.title}</h3>
          <div className="document-preview-actions">
            {isLoaded && <a className="btn btn-ghost btn-sm" href={(preview as Extract<DocumentPreviewState, { url: string }>).url} download={(preview as Extract<DocumentPreviewState, { url: string }>).fileName}><Download size={14} /> Download</a>}
            <button className="close-x" onClick={onClose}>x</button>
          </div>
        </div>
        <div className="document-preview-body">
          {"loading" in preview ? <div className="empty-state"><h4>Loading document...</h4></div> : preview.mimeType === "application/pdf" ? (
            <iframe title={preview.title} className="document-preview-frame" src={preview.url} />
          ) : preview.mimeType.startsWith("image/") ? (
            <img className="document-preview-image" src={preview.url} alt={preview.title} />
          ) : (
            <div className="empty-state"><h4>Preview not available</h4><p>Download this document to view it.</p></div>
          )}
        </div>
      </div>}
    </div>
  );
}

function DeleteConfirmModal({ prompt, onCancel, onConfirm }: { prompt: DeletePrompt | null; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className={`modal-overlay ${prompt ? "show" : ""}`} onClick={onCancel}>
      {prompt && <div className="modal delete-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head"><h3>{prompt.title}</h3><button className="close-x" onClick={onCancel}>x</button></div>
        <div className="modal-body delete-modal-body">
          <div className={`delete-icon ${prompt.tone === "logout" ? "logout-icon" : ""}`}>{prompt.tone === "logout" ? <LogOut size={20} /> : <Trash2 size={20} />}</div>
          <p>{prompt.message}</p>
        </div>
        <div className="modal-actions delete-modal-actions"><button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button><button type="button" className={prompt.tone === "logout" ? "btn btn-primary" : "btn btn-danger"} onClick={onConfirm}>{prompt.confirmLabel || "Delete"}</button></div>
      </div>}
    </div>
  );
}

function LogbookReviewModal({ prompt, onRemarkChange, onCancel, onSubmit }: { prompt: LogbookReviewPrompt | null; onRemarkChange: (remark: string) => void; onCancel: () => void; onSubmit: () => void }) {
  return (
    <div className={`modal-overlay ${prompt ? "show" : ""}`} onClick={onCancel}>
      {prompt && <div className="modal logbook-review-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head"><h3>{prompt.verified ? "Verify logbook" : "Reopen logbook"}</h3><button className="close-x" onClick={onCancel}>x</button></div>
        <div className="modal-body logbook-review-body">
          <div className="delete-icon logout-icon"><MessageCircle size={20} /></div>
          <div className="logbook-review-copy">
            <p>{prompt.verified ? "Add a review remark before verifying this logbook entry." : "Add a reason before moving this logbook entry back to pending."}</p>
            <div className="review-entry-snapshot">
              <b>{prompt.student.fullName}</b>
              <span>{prompt.entry.departmentArea || "Internship entry"} · {formatDate(prompt.entry.date)}</span>
            </div>
            <label className="field">
              <span>Review remark</span>
              <textarea value={prompt.remark} onChange={(event) => onRemarkChange(event.target.value)} rows={4} placeholder="Type faculty review remark..." autoFocus />
            </label>
          </div>
        </div>
        <div className="modal-actions delete-modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="button" className={prompt.verified ? "btn btn-primary" : "btn btn-danger"} onClick={onSubmit}>{prompt.verified ? "Verify logbook" : "Reopen entry"}</button>
        </div>
      </div>}
    </div>
  );
}

function ForgotPasswordModal({ open, loading, onClose, onSubmit }: { open: boolean; loading: boolean; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <div className={`modal-overlay ${open ? "show" : ""}`} onClick={onClose}>
      {open && <form className="modal forgot-modal" onSubmit={onSubmit} onClick={(event) => event.stopPropagation()}>
        <div className="modal-head"><h3>Forgot password</h3><button className="close-x" onClick={onClose}>x</button></div>
        <div className="modal-body forgot-modal-body">
          <div className="delete-icon logout-icon"><ShieldCheck size={20} /></div>
          <div>
            <p>Enter your registered admin email. We will send a secure reset link to that address.</p>
            <div className="field forgot-email-field"><RequiredLabel required>Email</RequiredLabel><input name="email" type="email" autoComplete="email" required /></div>
          </div>
        </div>
        <div className="modal-actions delete-modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
          <button className="btn btn-primary" disabled={loading}>{loading ? "Sending..." : "Send reset link"}</button>
        </div>
      </form>}
    </div>
  );
}

function Pager({ meta, label, onPage }: { meta: PaginationMeta | null; label: string; onPage: (page: number) => void }) {
  if (!meta) return null;
  return <div className="pager"><span>Showing {meta.total ? (meta.page - 1) * meta.limit + 1 : 0}-{Math.min(meta.total, meta.page * meta.limit)} of {meta.total} {label}</span><div className="pager-btns"><button disabled={!meta.hasPrev} onClick={() => onPage(meta.page - 1)}>Prev</button><button className="active">{meta.page}</button><button disabled={!meta.hasNext} onClick={() => onPage(meta.page + 1)}>Next</button></div></div>;
}

function CrmStyles() {
  return (
    <style>{`
      @keyframes imed-spin{to{transform:rotate(360deg)}}.spin-icon{animation:imed-spin .8s linear infinite}
      html, body, #root, .imed-admin-prototype{max-width:100vw;overflow-x:hidden}
      .imed-admin-prototype{--navy-950:#0A0E1D;--navy-900:#0F1428;--navy-800:#1B2340;--navy-line:#242C4D;--indigo-500:#4F6BFF;--indigo-600:#3E56E0;--indigo-100:#EAEEFF;--bg:#F3F5FA;--card:#FFFFFF;--border:#E5E9F2;--border-soft:#EEF1F7;--text-900:#161B33;--text-700:#333A56;--text-600:#5B6478;--text-400:#99A1B3;--green-50:#EAFBF3;--green-500:#17A673;--green-700:#0E7A54;--amber-50:#FFF7E8;--amber-500:#F59E0B;--amber-700:#B4750B;--red-50:#FDEEEE;--red-100:#FCE1E1;--red-500:#E5484D;--red-700:#B3282C;--purple-50:#F4F0FE;--purple-500:#8B5CF6;--purple-700:#6B37D6;--teal-50:#E7FAF7;--teal-100:#CFF5EF;--teal-500:#14B8A6;--teal-700:#0F766E;--blue-50:#EEF3FF;font-family:Inter,system-ui,sans-serif;background:var(--bg);color:var(--text-900);font-size:13.5px;min-height:100vh;width:100%;max-width:100vw;overflow-x:hidden}
      .imed-admin-prototype *{box-sizing:border-box}.imed-admin-prototype button{font-family:inherit;cursor:pointer}.imed-admin-prototype #app{display:flex;height:100vh;width:100%;max-width:100vw;overflow-x:hidden}.imed-admin-prototype #authScreen{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--bg)}
      .auth-card{width:min(420px,92vw);background:#fff;border:1px solid var(--border);border-radius:16px;padding:30px 28px 28px;box-shadow:0 12px 32px rgba(16,20,40,.14);display:grid;gap:0}.auth-logo{display:flex;gap:10px;align-items:center;margin-bottom:24px}.auth-logo div:last-child b{display:block;font-size:13px;line-height:1.15}.auth-logo div:last-child div{font-size:10.5px;color:var(--text-400);letter-spacing:.5px;text-transform:uppercase;margin-top:2px}.auth-card h1{font-size:22px;font-weight:500;line-height:1.25;margin:0 0 8px}.auth-card .sub{color:var(--text-400);margin:0 0 22px;font-size:14px}.auth-card .field{margin-bottom:12px}.auth-card .field label{margin-bottom:7px}.auth-card .field input{height:38px}.auth-field-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}.auth-field-row label{margin:0!important}.auth-link-btn{border:0;background:transparent;color:var(--indigo-600);font-size:11.5px;font-weight:700;padding:0}.auth-link-btn:hover{text-decoration:underline}.password-input-wrap{position:relative}.password-input-wrap input{padding-right:42px!important}.password-eye-btn{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:28px;height:28px;border:0;background:transparent;color:var(--text-400);display:flex;align-items:center;justify-content:center;border-radius:7px}.password-eye-btn:hover{background:var(--blue-50);color:var(--indigo-600)}.auth-card .btn-primary{width:100%;height:38px;justify-content:center;margin-top:2px}
.sidebar{width:236px;flex:0 0 236px;background:linear-gradient(180deg,var(--navy-950),var(--navy-900));color:#C9CFE6;display:flex;flex-direction:column;height:100vh;border-right:1px solid var(--navy-line)}.sidebar-brand{display:flex;align-items:center;gap:10px;padding:18px 18px 14px 20px;border-bottom:1px solid var(--navy-line)}.brand-mark{width:32px;height:32px;border-radius:9px;background:#fff;display:flex;align-items:center;justify-content:center;flex:0 0 32px;box-shadow:0 4px 10px rgba(15,23,42,.18);overflow:hidden}.brand-mark img{width:23px;height:29px;display:block;object-fit:contain}.brand-text b{display:block;font-size:14px;color:#fff}.brand-text span{display:block;font-size:10.5px;color:#8189A8;letter-spacing:.6px;text-transform:uppercase;margin-top:2px}
      .nav-scroll{flex:1;overflow-y:auto;padding:12px 10px}.nav-group-label{font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:#5D6588;padding:14px 10px 6px}.nav-item{position:relative;width:100%;border:0;display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;margin-bottom:2px;background:transparent;color:#AEB4CE;font-size:13px;font-weight:500;text-align:left}.nav-item svg{width:16px;height:16px}.nav-item:hover{background:var(--navy-800);color:#fff}.nav-item.active{background:var(--indigo-500);color:#fff;box-shadow:0 4px 12px rgba(79,107,255,.35)}.nav-badge{margin-left:auto;min-width:19px;height:19px;border-radius:999px;background:var(--amber-500);color:#fff;display:inline-grid;place-items:center;padding:0 6px;font-size:10.5px;font-style:normal;font-weight:800;line-height:1;box-shadow:0 4px 10px rgba(245,158,11,.28)}.nav-badge-admission{min-width:24px;height:20px;background:#EAFBF3;color:#0E7A54;border:1px solid rgba(23,166,115,.28);box-shadow:0 0 0 3px rgba(23,166,115,.08);font-size:10px}.nav-item.active .nav-badge-admission{background:#fff;color:var(--indigo-600);border-color:rgba(255,255,255,.65);box-shadow:none}.mobile-logout{display:none}
      .sidebar-footer{padding:12px;border-top:1px solid var(--navy-line)}.role-pill{display:flex;align-items:center;gap:9px;background:var(--navy-800);border:1px solid var(--navy-line);border-radius:10px;padding:8px 10px}.role-avatar{width:28px;height:28px;border-radius:8px;background:linear-gradient(135deg,#F5A524,#E5484D);display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:12px}.role-meta{line-height:1.2;overflow:hidden}.role-meta b{font-size:12px;color:#fff;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.role-meta span{font-size:10.5px;color:#8A91B0}.role-pill .icon-btn{margin-left:auto;background:transparent;border:0;color:#8A91B0}
      .main{flex:1;display:flex;flex-direction:column;height:100vh;overflow:hidden;width:100%;max-width:100%;min-width:0;box-sizing:border-box}.topbar{height:60px;flex:0 0 60px;background:#fff;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px;padding:0 22px;width:100%;max-width:100%;min-width:0;box-sizing:border-box;position:relative;z-index:40;overflow:visible}.page-title{font-size:16px;font-weight:700}.page-sub{font-size:11.5px;color:var(--text-400);margin-top:1px}.topbar-spacer{flex:1}.scope-select,.df-select,.fbtn{border:1px solid var(--border);background:#fff;border-radius:8px;padding:7px 10px;font-size:12.5px;color:var(--text-700);font-weight:500;font-family:inherit}.scope-select{height:36px;box-sizing:border-box;display:inline-flex;align-items:center;padding:0 12px;flex-shrink:0}.scope-select-locked{background:var(--bg);color:var(--text-400)}.date-filter{display:inline-flex;align-items:center;gap:4px;background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:3px;height:36px;box-sizing:border-box;flex-shrink:0}.df-btn{border:none;background:transparent;padding:0 11px;height:28px;border-radius:7px;font-size:12px;font-weight:600;color:var(--text-600);white-space:nowrap;display:inline-flex;align-items:center;justify-content:center;line-height:1;flex-shrink:0}.df-btn.active{background:#fff;color:var(--indigo-600);box-shadow:0 1px 2px rgba(16,20,40,.05)}.df-date{border:1px solid var(--border);border-radius:7px;padding:5px 8px;font-size:12px;display:none;height:28px;box-sizing:border-box}.df-date.show{display:inline-block}.icon-btn{width:36px;height:36px;border-radius:9px;border:1px solid var(--border);background:#fff;display:inline-flex;align-items:center;justify-content:center;color:var(--text-600);box-sizing:border-box;flex-shrink:0}.search-box{display:flex;align-items:center;gap:7px;background:var(--bg);border:1px solid var(--border);border-radius:9px;padding:0 12px;width:230px;height:36px;box-sizing:border-box;flex-shrink:0}.search-box input{border:none;background:transparent;outline:none;font-size:12.5px;width:100%;color:var(--text-900);padding:0}
      .content{flex:1;overflow-y:auto;overflow-x:hidden;padding:22px;width:100%;max-width:100%;min-width:0;box-sizing:border-box}.grid-metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:18px}.metric-card,.card{background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 1px 2px rgba(16,20,40,.05)}.metric-card{padding:16px 18px;position:relative;overflow:hidden}.m-label{font-size:11.5px;color:var(--text-600);font-weight:600;display:flex;align-items:center;gap:6px}.m-value{font-size:24px;font-weight:800;margin-top:8px;color:#061633;font-family:JetBrains Mono,monospace}.m-delta{font-size:11px;font-weight:600;margin-top:6px}.m-delta.up{color:var(--green-700)}.m-delta.down{color:var(--red-700)}.m-dot{width:9px;height:9px;border-radius:3px;display:inline-block}.two-col{display:grid;grid-template-columns:1.3fr 1fr;gap:16px;margin-bottom:16px}.lower-grid{grid-template-columns:1fr 1fr .75fr}.card-head{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid var(--border-soft)}.card-head h3{font-size:13.5px;font-weight:700;margin:0}.card-head .sub{font-size:11px;color:var(--text-400);margin-top:2px}.card-head button,.card-head input{margin-left:auto}.card-body{padding:16px 18px}.funnel-wrap{display:flex;flex-direction:column;gap:6px}.funnel-row{display:grid;grid-template-columns:120px 1fr 90px;align-items:center;gap:10px}.flabel{font-size:12px;font-weight:600;color:var(--text-600)}.funnel-bar-track{background:var(--border-soft);border-radius:6px;height:22px;overflow:hidden}.funnel-bar-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,var(--indigo-500),#8A6BFF);display:flex;align-items:center;justify-content:flex-end;padding-right:8px}.funnel-bar-fill span{color:#fff;font-size:10.5px;font-weight:700}.fval{font-size:12px;color:var(--text-400);text-align:right;font-family:JetBrains Mono,monospace}
      .filter-bar{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px}.btn{border:none;border-radius:8px;padding:8px 14px;font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;gap:6px;text-decoration:none}.btn-primary{background:var(--indigo-500);color:#fff;box-shadow:0 4px 10px rgba(79,107,255,.28)}.btn-ghost{background:#fff;border:1px solid var(--border);color:var(--text-700)}.btn-soft{background:var(--indigo-100);color:var(--indigo-600)}.btn-whatsapp{background:#e8f8ef;color:#047a43}.btn-danger{background:var(--red-700);color:#fff;box-shadow:0 4px 10px rgba(229,72,77,.22)}.btn-sm{padding:5px 10px;font-size:11.5px;border-radius:7px}.btn:disabled{opacity:.55;cursor:not-allowed}.file-upload-btn{position:relative;overflow:hidden;cursor:pointer}.file-upload-btn input{position:absolute;inset:0;opacity:0;cursor:pointer}.action-icons{display:flex;align-items:center;gap:6px}.action-icon-btn{width:30px;height:30px;border:1px solid var(--border);border-radius:8px;background:#fff;color:var(--text-600);display:inline-flex;align-items:center;justify-content:center}.action-icon-btn:hover{background:var(--bg);color:var(--text-900)}.action-icon-primary{background:var(--indigo-100);border-color:#dbe2ff;color:var(--indigo-600)}.action-icon-danger{background:var(--red-50);border-color:#f7d7d7;color:var(--red-700)}.action-icon-whatsapp{background:#e8f8ef;border-color:#c8eed9;color:#047a43}.delete-modal,.forgot-modal{width:390px;max-width:92vw;overflow:hidden}.delete-modal .modal-head,.forgot-modal .modal-head{padding:18px 18px 16px}.delete-modal-body,.forgot-modal-body{display:flex;gap:14px;align-items:center;padding:20px 18px}.delete-modal-body p,.forgot-modal-body p{margin:0;color:var(--text-700);line-height:1.45;min-width:0}.forgot-email-field{margin-top:12px}.forgot-email-field input{height:38px}.delete-icon{width:38px;height:38px;border-radius:10px;background:var(--red-50);color:var(--red-700);display:flex;align-items:center;justify-content:center;flex:0 0 38px}.logout-icon{background:var(--indigo-100);color:var(--indigo-600)}.delete-modal-actions{display:flex;justify-content:flex-end;gap:10px;padding:0 18px 18px}.delete-modal-actions .btn{min-width:66px;justify-content:center}.pamphlet-select{height:32px;border:1px solid #dbe2ff;border-radius:8px;background:var(--indigo-100);color:var(--indigo-600);font-size:11.5px;font-weight:700;padding:0 8px;max-width:150px}.pamphlet-select.compact{width:92px;height:30px;padding:0 6px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:12.5px}thead th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.4px;color:var(--text-400);font-weight:700;padding:10px 12px;border-bottom:1px solid var(--border);white-space:nowrap;background:#FAFBFD}tbody td{padding:11px 12px;border-bottom:1px solid var(--border-soft);color:var(--text-700);white-space:nowrap}tbody tr:hover{background:#F8F9FD}.clickable{cursor:pointer}.cell-name,.nm{font-weight:700;color:var(--text-900)}.cell-sub,.mt{font-size:11px;color:var(--text-400)}.mini-select,.mini-input{max-width:160px;border:1px solid var(--border);border-radius:7px;padding:5px 7px;background:#fff}.tag{font-size:12px;border-radius:999px;padding:6px 10px;font-weight:700}.tag.green{background:var(--green-50);color:var(--green-700)}.tag.purple{background:var(--purple-50);color:var(--purple-700)}.tag.amber{background:var(--amber-50);color:var(--amber-700)}.tag.blue{background:var(--blue-50);color:var(--indigo-600)}.tag.red{background:var(--red-50);color:var(--red-700)}
      .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap}.badge-gray{background:#f1f2f6;color:var(--text-600)}.badge-amber{background:var(--amber-50);color:var(--amber-700)}.badge-red{background:var(--red-50);color:var(--red-700)}.badge-green{background:var(--green-50);color:var(--green-700)}.badge-blue{background:var(--blue-50);color:var(--indigo-600)}.badge-purple{background:var(--purple-50);color:var(--purple-700)}.badge-junk{background:#fee2e2;color:#991b1b;border:1px solid #fecaca}.btn-green{background:var(--green-50);color:var(--green-700)}.leads-filter-bar{gap:10px;margin-bottom:14px}.leads-filter-bar .fbtn{height:34px}.leads-filter-bar .lead-search-input{width:200px}.leads-filter-bar .filter-spacer{flex:1}.leads-card{border-radius:14px;overflow:hidden}.leads-table-wrap{overflow-x:auto}.leads-table{min-width:1220px}.leads-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.leads-table tbody td{height:58px;padding:10px 12px;color:#333a56}.leads-table tbody tr:hover{background:#f8f9fd}.lead-name-cell{display:flex;align-items:center;gap:9px}.avatar{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:11.5px;flex:0 0 30px}.lead-avatar{background:#eef3ff;color:#4f6bff;border-radius:8px}.leads-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.leads-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.leads-table .mini-select,.leads-table .stage-select{height:29px;max-width:150px;border:1px solid var(--border);border-radius:7px;background:#fff;padding:5px 8px;font-size:11.5px;color:var(--text-700)}.leads-table .stage-select{max-width:118px}.leads-table .feedback-select{max-width:132px;font-weight:700;border-radius:999px}.feedback-select.badge-red{background:var(--red-50);color:var(--red-700);border-color:#f7d7d7}.feedback-select.badge-gray{background:#f1f2f6;color:var(--text-600)}.feedback-select.badge-amber{background:var(--amber-50);color:var(--amber-700);border-color:#f5dfaf}.feedback-select.badge-blue{background:var(--blue-50);color:var(--indigo-600);border-color:#dbe2ff}.feedback-select.badge-green{background:var(--green-50);color:var(--green-700);border-color:#caefdf}.feedback-select.badge-purple{background:var(--purple-50);color:var(--purple-700);border-color:#ded2fb}.feedback-select.badge-junk{background:#fee2e2;color:#991b1b;border-color:#fecaca}.leads-table .btn-soft{background:var(--indigo-100);color:var(--indigo-600);box-shadow:none}.leads-table .empty-state h4{margin:0 0 4px;color:var(--text-600);font-size:13px}.leads-table .empty-state p{margin:0;font-size:12px;color:var(--text-400)}.pill-tabs{display:flex;gap:4px;background:var(--bg);border:1px solid var(--border);border-radius:999px;padding:3px}.pill-tab{padding:7px 14px;border-radius:999px;font-size:12px;font-weight:600;color:var(--text-600);background:transparent;border:none}.pill-tab.active{background:#fff;color:var(--indigo-600);box-shadow:0 1px 3px rgba(16,20,40,.08)}.admissions-tabs{width:max-content;margin-bottom:16px}.admissions-card{border-radius:14px;overflow:hidden}.admissions-table{width:100%;min-width:980px;border-collapse:collapse}.admissions-table thead th{height:42px;padding:11px 16px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px;font-weight:700;white-space:nowrap;border-bottom:1px solid var(--border)}.admissions-table thead th:last-child{text-align:right}.admissions-table tbody td{height:70px;padding:12px 16px;color:#333a56;vertical-align:middle;border-bottom:1px solid var(--border-soft)}.admissions-table tbody tr:hover{background:#f8f9fd}.admissions-table th:nth-child(1),.admissions-table td:nth-child(1){width:24%;min-width:200px}.admissions-table th:nth-child(2),.admissions-table td:nth-child(2){width:10%;min-width:85px}.admissions-table th:nth-child(3),.admissions-table td:nth-child(3){width:12%;min-width:100px}.admissions-table th:nth-child(4),.admissions-table td:nth-child(4){width:13%;min-width:110px}.admissions-table th:nth-child(5),.admissions-table td:nth-child(5){width:11%;min-width:100px}.admissions-table th:nth-child(6),.admissions-table td:nth-child(6){width:12%;min-width:110px}.admissions-table th:nth-child(7),.admissions-table td:nth-child(7){width:18%;min-width:180px}.admissions-table th:nth-child(8),.admissions-table td:nth-child(8){width:8%;min-width:85px;text-align:right}.admissions-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.admissions-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.admission-batch-cell{display:grid;align-content:center;gap:5px;max-width:220px}.admissions-table .student-mini-select{width:100%;max-width:180px;height:32px}.admission-batch-hint{display:grid;gap:1px;max-width:220px;color:var(--text-400);margin-top:0}.admission-batch-hint b{color:var(--amber-700);font-size:10.5px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.admission-batch-hint span{font-size:10px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.admission-action-cell{text-align:right}.admission-action-cell .btn{height:32px;min-width:82px;justify-content:center}.mono{font-family:JetBrains Mono,monospace}.admissions-table .btn-primary{box-shadow:0 4px 10px rgba(79,107,255,.22)}.admissions-table .empty-state{padding:54px 20px;text-align:center}.admissions-table .empty-state h4{margin:0 0 6px;color:var(--text-600);font-size:14px;font-weight:700}.admissions-table .empty-state p{margin:0;font-size:12.5px;color:var(--text-400)}
      .leads-bulk-bar{display:flex;align-items:center;gap:12px;padding:10px 16px;background:linear-gradient(90deg,#eef3ff,#f8faff);border:1px solid #c7d7fe;border-radius:10px;margin-bottom:14px;box-shadow:0 2px 8px rgba(79,107,255,.08);flex-wrap:wrap}.leads-bulk-count{font-weight:700;color:var(--indigo-600);font-size:12.5px;display:inline-flex;align-items:center;gap:6px}.leads-bulk-actions{display:inline-flex;align-items:center;gap:8px;margin-left:auto;flex-wrap:wrap}.leads-table th.col-select,.leads-table td.col-select{width:42px;min-width:42px;text-align:center;padding:0 8px}.lead-checkbox{width:16px;height:16px;cursor:pointer;accent-color:var(--indigo-500);border-radius:4px;vertical-align:middle}.leads-table tbody tr.row-selected{background:#eef3ff!important}.leads-table tbody tr.row-selected:hover{background:#e4ebff!important}
      .drawer-overlay{position:fixed;inset:0;background:rgba(10,14,29,.45);display:none;z-index:200}.drawer-overlay.show{display:block}.drawer{position:fixed;top:0;right:0;height:100vh;width:520px;max-width:94vw;background:#fff;box-shadow:-14px 0 40px rgba(10,14,29,.25);transform:translateX(100%);transition:transform .22s ease;z-index:201;display:flex;flex-direction:column}.drawer.show{transform:translateX(0)}.drawer-head{padding:20px 22px;border-bottom:1px solid var(--border-soft);display:flex;align-items:flex-start;gap:14px}.drawer-avatar{width:44px;height:44px;font-size:14px;background:linear-gradient(135deg,var(--indigo-500),#8A6BFF)}.drawer-title{flex:1;min-width:0}.drawer-title h3{margin:0;font-size:15px;line-height:1.25;color:var(--text-900)}.drawer-title .cell-sub{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px}.close-x{width:30px;height:30px;border-radius:8px;border:none;background:var(--bg);color:var(--text-600);font-size:15px}.drawer-body{flex:1;overflow-y:auto;padding:0 0 30px}.dtabs{display:flex;gap:2px;padding:0 22px;border-bottom:1px solid var(--border-soft)}.dtab{padding:12px 12px;font-size:12px;font-weight:700;color:var(--text-400);border:0;background:transparent;border-bottom:2px solid transparent}.dtab.active{color:var(--indigo-600);border-color:var(--indigo-500)}.dpane{display:none;padding:18px 22px}.dpane.active{display:block}.kv-row{display:flex;justify-content:space-between;gap:18px;padding:9px 0;border-bottom:1px solid var(--border-soft);font-size:12.5px}.kv-row .k{color:var(--text-400)}.kv-row .v{font-weight:600;color:var(--text-900);text-align:right;overflow-wrap:anywhere}.drawer-notes{margin-top:14px}.drawer-full-btn{width:100%;justify-content:center;margin-top:12px}.drawer-admit-btn{margin-top:8px}
      .batch-metrics{grid-template-columns:repeat(3,1fr);margin-bottom:18px}.batch-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.batch-select-card{border:1px solid var(--border);background:#fff;border-radius:14px;padding:18px;text-align:left;box-shadow:0 1px 2px rgba(16,20,40,.05);cursor:pointer;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}.batch-select-card:hover{transform:translateY(-2px);border-color:#b9c5ff;box-shadow:0 14px 30px rgba(79,107,255,.12)}.batch-select-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.batch-select-card h3{margin:0 0 6px;font-size:16px;color:#061633}.batch-select-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:18px}.batch-select-stats span{border:1px solid var(--border-soft);border-radius:9px;padding:9px 8px;color:var(--text-400);font-size:11px}.batch-select-stats b{display:block;color:#061633;font-size:15px}.calendar-connect-card{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 18px;margin-bottom:16px}.calendar-connect-card h3{margin:0 0 4px;font-size:15px;color:#061633}.calendar-connect-card .sub{font-size:12px;color:var(--text-400)}.calendar-connect-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}.teacher-batches-card{margin-bottom:16px}.teacher-batches-card .card-body{padding:16px 18px}.teacher-batch-grid{grid-template-columns:repeat(auto-fit,minmax(280px,340px));align-items:stretch}.teacher-batch-grid .batch-select-card{min-height:176px;display:flex;flex-direction:column}.teacher-batch-grid .batch-select-stats{margin-top:auto;padding-top:18px}.teacher-action-grid{align-items:stretch}.teacher-action-grid>.card{min-height:258px}.teacher-row-list .crow{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:16px;min-height:72px}.teacher-row-list .who{min-width:0}.teacher-row-list .who>div{min-width:0}.teacher-row-list .nm,.teacher-row-list .mt{overflow:hidden;text-overflow:ellipsis;display:block}.teacher-row-list .nm{line-height:1.35}.teacher-row-list .mt{white-space:nowrap}.teacher-update-tag{min-width:78px;max-width:96px;justify-content:center;text-align:center;white-space:normal;line-height:1.2;padding:8px 10px}.selected-batch-head{margin-bottom:16px}.batch-grid{grid-template-columns:1.2fr .9fr;gap:16px}.batch-grid-single{display:grid;grid-template-columns:1fr;gap:16px}.batch-card{border-radius:14px;overflow:hidden}.batch-card .card-head{min-height:64px}.batch-table,.batch-roster-table{min-width:100%}.batch-table thead th,.batch-roster-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.batch-table tbody td,.batch-roster-table tbody td{height:56px;padding:11px 12px;color:#333a56}.batch-table tbody tr:hover,.batch-roster-table tbody tr:hover{background:#f8f9fd}.batch-table .selected-row{background:#f8f9fd}.batch-table .cell-name{font-weight:700;color:#161b33}.batch-roster-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.batch-roster-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}
      .academic-shell{display:grid;gap:16px}.academic-selected-head{display:flex;align-items:center;justify-content:space-between;gap:14px;background:#fff;border:1px solid var(--border);border-radius:14px;padding:15px 18px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.academic-selected-head h3{margin:0;font-size:17px;color:#061633}.academic-tabs{display:flex;gap:6px;width:max-content;max-width:100%;overflow-x:auto;background:#fff;border:1px solid var(--border);border-radius:10px;padding:4px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.academic-tab{border:0;background:transparent;color:var(--text-600);border-radius:8px;padding:8px 13px;font-size:12.5px;font-weight:700;white-space:nowrap}.academic-tab.active{background:var(--indigo-500);color:#fff;box-shadow:0 4px 12px rgba(79,107,255,.25)}.academic-tab:disabled{opacity:.38;cursor:not-allowed}.batch-switch{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px}.batch-pill{flex:0 0 178px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:11px 14px;text-align:left;cursor:pointer;box-shadow:0 1px 2px rgba(16,20,40,.04)}.batch-pill.selected{border-color:var(--indigo-500);box-shadow:0 0 0 1px var(--indigo-500) inset}.batch-pill span{display:block}.batch-pill .course{font-size:10.5px;color:var(--indigo-600);font-weight:800;text-transform:uppercase;letter-spacing:.04em}.batch-pill .nm{font-weight:800;color:#061633;font-size:13.5px;margin:3px 0}.batch-pill .meta{font-size:11px;color:var(--text-400)}.academic-card{border-radius:14px;overflow:hidden}.academic-overview-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.class-list{padding:0 18px 4px}.class-list-item{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:1px solid var(--border-soft)}.class-list-item:last-child{border-bottom:0}.class-list-item .badge+.badge{margin-left:6px}.class-list-meta{margin-left:8px;color:var(--text-600);font-size:12px}.class-faculty{color:var(--text-400);font-size:12px;font-weight:700;white-space:nowrap}.academic-banner{display:flex;align-items:center;justify-content:space-between;gap:14px;background:var(--indigo-100);border:1px solid #cfd7ff;border-radius:12px;padding:13px 16px;color:var(--indigo-600);font-weight:700}.academic-banner-copy{display:grid;gap:8px}.class-color-legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.class-color-legend span{display:inline-flex;align-items:center;gap:6px;color:var(--text-600);font-size:11.5px;font-weight:800}.class-color-legend i{width:12px;height:12px;border-radius:4px;border:1px solid var(--indigo-500);background:var(--indigo-100);box-shadow:0 1px 2px rgba(16,20,40,.05)}.class-color-legend i.practical{border-color:#f2bd62;background:var(--amber-50)}.academic-banner-actions,.academic-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.academic-banner .fbtn{height:34px;background:#fff}.academic-log-shell{display:grid;gap:12px}.academic-log-head{display:flex;align-items:center;justify-content:space-between}.academic-log-head h3{margin:0;font-size:15px;color:#061633}.academic-log-head .sub{font-size:12px;color:var(--text-400);margin-top:3px}.academic-roster-table{min-width:920px;width:100%;border-collapse:collapse}.academic-roster-table th{height:38px;padding:10px 8px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px;text-align:left}.academic-roster-table td{vertical-align:top;min-width:112px;padding:8px;border-bottom:1px solid var(--border-soft);color:#333a56}.academic-roster-table td:first-child{min-width:150px}.roster-slot{display:block;width:100%;border:1px solid var(--indigo-500);background:var(--indigo-100);color:var(--text-700);border-radius:9px;padding:7px 8px;text-align:left;margin-bottom:5px;font-size:11px}.roster-slot.practical{border-color:#f2bd62;background:var(--amber-50)}.roster-slot.selected{box-shadow:0 0 0 2px rgba(79,107,255,.22)}.roster-slot.preview{border-style:dashed;opacity:.55;filter:saturate(.6);pointer-events:none}.roster-slot strong,.roster-slot span,.roster-slot em{display:block}.roster-slot strong{font-size:11.5px;color:#061633}.roster-slot.preview strong{color:var(--text-600)}.roster-slot span{color:var(--text-600);margin-top:2px}.roster-slot em{font-style:normal;color:var(--text-400);font-size:10.5px;margin-top:3px}.roster-empty{color:var(--text-400);font-size:12px}.academic-topic-form{display:grid;grid-template-columns:1fr 1.2fr auto;gap:12px;align-items:end;padding:16px 18px;border-top:1px solid var(--border-soft);background:#fbfcff}.academic-topic-form .field{margin:0}.academic-tracker-list{padding:6px 18px 14px}.academic-tracker-row{display:grid;grid-template-columns:minmax(0,1fr) 172px 78px;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--border-soft)}.academic-tracker-row:last-child{border-bottom:0}.tracker-select{height:36px;border:1px solid var(--border);border-radius:9px;background:#fff;padding:0 10px;color:#061633;font-size:12px;font-weight:800}.tracker-covered,.tracker-completed{background:var(--teal-50);border-color:#b8eee7;color:var(--teal-700)}.tracker-in-progress,.tracker-needs-repeat{background:var(--amber-50);border-color:#f5dfaf;color:var(--amber-700)}.tracker-not-started,.tracker-pending{background:#f8f9fd;color:var(--text-600)}.topic-edit-modal{width:600px;max-width:calc(100vw - 24px);overflow:hidden}.topic-edit-body{grid-template-columns:repeat(2,minmax(0,1fr));padding:20px 22px 10px}.topic-edit-body .field:last-child{grid-column:1 / 2}.topic-edit-actions{display:flex;justify-content:flex-end;gap:10px;padding:12px 22px 22px}.topic-edit-actions .btn{min-width:104px;justify-content:center}.practical-table{min-width:860px;width:100%;border-collapse:collapse}.practical-table th{height:38px;padding:10px 14px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px;text-align:left}.practical-table td{padding:12px 14px;border-bottom:1px solid var(--border-soft);vertical-align:middle}.compact-row-button{border:0;background:transparent;padding:0;text-align:left}.compact-row-button span span{display:block}.practical-note{width:100%;height:34px}.academic-modal{width:650px;max-width:calc(100vw - 24px);overflow:hidden;background:#f8f9fd}.academic-modal .modal-head{position:static;padding:18px 22px;background:#fff}.academic-modal .modal-body{padding:18px 22px 20px;background:#f8f9fd}.academic-modal .modal-foot{padding:16px 22px;background:#fff}.class-context{display:flex;align-items:center;gap:11px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:12px 14px;margin-bottom:14px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.class-context strong,.class-context em{display:block}.class-context strong{font-size:13.5px;color:#061633;font-weight:900}.class-context em{font-style:normal;color:var(--text-400);font-size:11.5px;margin-top:2px}.academic-steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:0 0 20px}.academic-steps button{position:relative;display:flex;align-items:center;gap:8px;border:1px solid var(--border);background:#fff;border-radius:10px;padding:9px 10px;text-align:left;color:var(--text-400);font-weight:800;cursor:default}.academic-steps button.done{cursor:pointer}.academic-steps button span{width:22px;height:22px;border-radius:999px;display:grid;place-items:center;background:#eef1f8;color:#6c7487;font-size:11px}.academic-steps button em{font-style:normal;font-size:12px}.academic-steps button.active{border-color:var(--indigo-500);color:var(--indigo-600);box-shadow:0 0 0 1px rgba(79,107,255,.15) inset}.academic-steps button.active span,.academic-steps button.done span{background:var(--indigo-500);color:#fff}.academic-steps button.done{color:#061633}.academic-modal .field{margin-bottom:18px}.academic-modal .field label{margin-bottom:9px}.academic-choice-section{display:grid;gap:20px}.mini-label{font-size:11px;font-weight:900;color:var(--text-400);text-transform:uppercase;letter-spacing:.04em;margin-bottom:9px}.academic-choice-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.academic-choice{position:relative;display:grid;grid-template-columns:auto 1fr;align-items:start;gap:12px;min-height:112px;border:1px solid var(--border);background:#fff;border-radius:14px;padding:15px 42px 36px 15px;text-align:left;color:#061633;box-shadow:0 2px 7px rgba(16,20,40,.04);cursor:pointer;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease,background .18s ease}.academic-choice:hover{border-color:#bdc8ff;box-shadow:0 12px 28px rgba(79,107,255,.13);transform:translateY(-2px)}.academic-choice.active{border-color:var(--indigo-500);background:linear-gradient(180deg,#fff,#f4f6ff);box-shadow:0 0 0 1px rgba(79,107,255,.22) inset,0 14px 32px rgba(79,107,255,.16)}.academic-choice.active:before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:4px;border-radius:0 999px 999px 0;background:var(--indigo-500)}.choice-icon{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;background:var(--indigo-100);color:var(--indigo-600)}.academic-choice.active .choice-icon{background:var(--indigo-500);color:#fff}.academic-choice strong,.academic-choice em{display:block}.academic-choice strong{font-size:14px;font-weight:900}.academic-choice em{font-style:normal;color:var(--text-400);font-size:11.5px;line-height:1.4;margin-top:5px}.academic-choice small{position:absolute;left:15px;bottom:12px;display:inline-flex;align-items:center;height:22px;border-radius:999px;background:#f2f4fb;color:var(--text-600);font-size:10.5px;font-weight:900;padding:0 9px}.academic-choice.active small{background:#e8fff5;color:var(--teal-700)}.choice-check{position:absolute;right:13px;top:13px;color:#c3c9d8}.academic-choice.active .choice-check{color:var(--teal-600)}.academic-seg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.academic-chip,.academic-day{border:1px solid var(--border);background:#fff;color:var(--text-600);border-radius:999px;padding:10px 12px;font-size:12px;font-weight:800;cursor:pointer;min-height:36px}.academic-chip.on,.academic-day.on{border-color:var(--indigo-500);background:var(--indigo-100);color:var(--indigo-600)}.academic-day{width:42px;padding:8px 0}.academic-review{border:1px dashed var(--border);border-radius:10px;padding:14px;text-align:left;background:#fff}@media (max-width:1100px){.academic-overview-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (max-width:900px){.academic-topic-form{grid-template-columns:1fr 1fr}.academic-topic-form .btn{height:38px}}@media (max-width:640px){.academic-selected-head{align-items:flex-start;flex-direction:column}.academic-banner{align-items:flex-start;flex-direction:column}.academic-choice-grid,.academic-overview-grid{grid-template-columns:1fr}.academic-topic-form,.topic-edit-body{grid-template-columns:1fr}.topic-edit-body .field:last-child{grid-column:auto}.topic-edit-actions{padding:10px 16px 18px}.academic-tracker-row{grid-template-columns:1fr}.academic-modal{width:calc(100vw - 18px)}.academic-steps button{padding:8px 7px}.academic-steps button em{font-size:11px}}
      .students-filter-bar{gap:10px;margin-bottom:14px}.students-filter-bar .fbtn{height:34px;width:220px}.students-filter-bar .filter-spacer{flex:1}.students-card{border-radius:14px;overflow:hidden}.students-table-body{padding:0}.students-table-wrap{overflow-x:auto}.students-table{min-width:1080px}.students-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.students-table tbody td{height:58px;padding:10px 12px;color:#333a56}.students-table tbody tr:hover{background:#f8f9fd}.students-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.students-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.student-mini-select{height:29px;max-width:150px;border:1px solid var(--border);border-radius:7px;background:#fff;padding:5px 8px;font-size:11.5px;color:var(--text-700)}.progress-track{width:70px;height:6px;background:var(--border-soft);border-radius:10px;overflow:hidden;display:inline-block;vertical-align:middle}.progress-fill{height:100%;background:var(--green-500);border-radius:10px;display:block}.students-table .btn-soft{background:var(--indigo-100);color:var(--indigo-600);box-shadow:none}.students-table .empty-state h4{margin:0 0 4px;color:var(--text-600);font-size:13px}.students-table .empty-state p{margin:0;font-size:12px;color:var(--text-400)}
      .alumni-panel{display:grid;gap:16px}.alumni-metrics{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.alumni-filter-bar{margin-bottom:0}.alumni-filter-bar .fbtn{height:36px;width:240px}.alumni-filter-bar .filter-spacer{flex:1}.alumni-card{border-radius:14px;overflow:hidden}.alumni-table{min-width:1120px;table-layout:fixed}.alumni-table th:nth-child(1){width:220px}.alumni-table th:nth-child(2){width:140px}.alumni-table th:nth-child(3){width:210px}.alumni-table th:nth-child(4){width:190px}.alumni-table th:nth-child(5){width:230px}.alumni-table th:nth-child(6){width:130px}.alumni-table th:nth-child(7){width:130px}.alumni-table th:nth-child(8){width:86px}.alumni-table tbody td{vertical-align:middle}.alumni-modal{width:760px;max-width:calc(100vw - 24px);overflow:hidden}.alumni-form{padding:20px 22px 12px;max-height:70vh;overflow:auto}.alumni-form textarea{min-height:74px}.alumni-check label{display:flex!important;align-items:center;gap:8px;height:40px;border:1px solid var(--border);border-radius:9px;background:#fff;padding:0 12px}.alumni-check input{width:auto!important}.alumni-modal .modal-foot{padding:14px 22px 20px}@media(max-width:900px){.alumni-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.alumni-filter-bar .fbtn{width:100%}.alumni-filter-bar .btn{width:100%;justify-content:center}}@media(max-width:620px){.alumni-metrics{grid-template-columns:1fr}.alumni-form{grid-template-columns:1fr;max-height:72vh}.alumni-modal .modal-foot{display:grid;grid-template-columns:1fr 1fr;gap:10px}.alumni-modal .modal-foot .btn{justify-content:center}}
      .badge-teal{background:var(--teal-50);color:var(--teal-700)}.attendance-filter-bar{gap:10px;margin-bottom:14px}.attendance-filter-bar .fbtn{height:34px}.attendance-filter-bar .filter-spacer{flex:1}.attendance-card{border-radius:14px;overflow:hidden}.attendance-card .card-body{padding:16px 18px}.att-grid{display:flex;flex-direction:column;gap:8px}.att-row{display:grid;grid-template-columns:32px minmax(180px,1.6fr) repeat(4,64px) minmax(160px,1fr);align-items:center;gap:10px;padding:9px 12px;border:1px solid var(--border-soft);border-radius:9px}.att-head{border:none;padding:0 12px 6px;color:var(--text-400);font-size:10.5px;font-weight:700;text-transform:uppercase}.att-head>div:nth-child(n+3):nth-child(-n+6){text-align:center}.att-status-btn{height:30px;border:1px solid var(--border);background:#fff;border-radius:8px;color:var(--text-600);font-size:11.5px;font-weight:700}.att-status-btn.sel-present{background:var(--teal-50);border-color:#b8eee7;color:var(--teal-700)}.att-status-btn.sel-absent{background:var(--red-50);border-color:#f6cccc;color:var(--red-700)}.att-status-btn.sel-late{background:var(--amber-50);border-color:#f5dfaf;color:var(--amber-700)}.att-status-btn.sel-leave{background:var(--purple-50);border-color:#ded2fb;color:var(--purple-700)}.att-note{width:100%;height:32px;font-size:11.5px;padding:6px 8px}.attendance-card .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.attendance-card .cell-sub{font-size:11px;color:#99a1b3}
      .logs-filter-bar{gap:10px;margin-bottom:14px}.logs-filter-bar .fbtn{height:34px;width:220px}.logs-filter-bar .filter-spacer{flex:1}.logs-card{border-radius:14px;overflow:hidden}.logs-table-wrap{overflow-x:auto}.logs-table{min-width:820px}.logs-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.logs-table tbody td{height:58px;padding:10px 12px;color:#333a56}.logs-table tbody tr:hover{background:#f8f9fd}.logs-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.logs-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.logs-table .btn-soft{background:var(--indigo-100);color:var(--indigo-600);box-shadow:none}.logs-table .empty-state h4{margin:0;color:var(--text-600);font-size:13px}
      .study-note-form{grid-template-columns:1fr 1fr 240px 1fr auto}.study-note-form .field.full{grid-column:1 / -2}.study-note-list{display:grid;gap:10px;padding:14px 18px 18px}.study-note-row{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;border:1px solid var(--border-soft);border-radius:12px;background:#fff;padding:12px 14px}.study-note-icon{width:42px;height:42px;border-radius:12px;background:var(--indigo-100);color:var(--indigo-600);display:grid;place-items:center}.study-note-row b{display:block;font-size:13px;color:var(--text-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.study-note-row p{margin:4px 0 0;color:var(--text-400);font-size:11.5px;line-height:1.35}.study-note-row small{display:block;margin-top:5px;color:var(--text-600);font-size:11.5px;line-height:1.35}.study-notes-card .empty-state{border:1px dashed var(--border);border-radius:12px;background:#fbfcff}
      .attdetail-back{margin-bottom:14px}.attdetail-grid{grid-template-columns:1.2fr .8fr;gap:16px}.attdetail-card{border-radius:14px;overflow:hidden}.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.cal-dow{text-align:center;font-size:10.5px;font-weight:800;color:var(--text-400);padding:0 0 4px}.cal-cell{aspect-ratio:1;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;border:1px solid var(--border-soft);color:var(--text-600);background:#fff}.cal-cell.present{background:var(--teal-100);color:var(--teal-700);border-color:#8ee8dc}.cal-cell.absent{background:var(--red-100);color:var(--red-700);border-color:#f7b7b9}.cal-cell.late{background:var(--amber-50);color:var(--amber-700);border-color:#f5dfaf}.cal-cell.leave{background:var(--purple-50);color:var(--purple-700);border-color:#ded2fb}.cal-cell.blank{background:transparent;border-color:transparent}.legend{display:flex;gap:14px;font-size:11.5px;color:var(--text-600);margin-top:12px;flex-wrap:wrap}.legend span{display:inline-flex;align-items:center;gap:6px}.legend i{width:9px;height:9px;border-radius:3px;display:inline-block}.date-range-row{display:flex;gap:8px}.date-range-row .fbtn{flex:1;min-width:0}.attdetail-status{width:100%}.attdetail-download{width:100%;justify-content:center;margin-top:14px}
      .finance-metrics{grid-template-columns:repeat(4,1fr)}.finance-grid{grid-template-columns:1.35fr .75fr}.finance-card{border-radius:14px;overflow:hidden}.finance-table-wrap{overflow-x:auto}.finance-table{min-width:920px}.finance-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.finance-table tbody td{height:58px;padding:10px 12px;color:#333a56}.finance-table tbody tr:hover{background:#f8f9fd}.finance-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.finance-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.finance-chart-body{display:flex;flex-direction:column;align-items:center;gap:18px}.finance-chart-body .donut-legend{width:100%;min-width:0}
      .emi-metrics{grid-template-columns:repeat(3,1fr)}.emi-filter-bar{gap:10px;margin-bottom:14px}.emi-filter-bar .filter-spacer{flex:1}.emi-card{border-radius:14px;overflow:hidden}.emi-table-wrap{overflow-x:auto}.emi-table{min-width:880px}.emi-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.emi-table tbody td{height:58px;padding:10px 12px;color:#333a56}.emi-table tbody tr:hover{background:#f8f9fd}.emi-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.emi-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.emi-table .btn-green{white-space:nowrap}
      .receipts-filter-bar{gap:10px;margin-bottom:14px}.receipts-filter-bar .fbtn{height:34px;width:240px}.receipts-filter-bar .filter-spacer{flex:1}.receipts-card{border-radius:14px;overflow:hidden}.receipts-table-wrap{overflow-x:auto}.receipts-table{min-width:900px}.receipts-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.receipts-table tbody td{height:58px;padding:10px 12px;color:#333a56}.receipts-table tbody tr:hover{background:#f8f9fd}.receipts-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.receipts-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.receipt-drawer{width:720px;max-width:96vw}.receipt-tabs{overflow-x:auto}.receipt-tabs .dtab{white-space:nowrap}.receipt-drawer-body{padding:18px 0 28px;background:#fff}.invoice-card{background:#fff!important;border:0!important;box-shadow:none!important;border-radius:0!important;padding:0 18px!important;overflow:auto!important}.invoice-actions{width:min(820px,100%);margin:14px auto 0;display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap}.tax-invoice{width:820px;max-width:none;margin:0 auto;background:#fff;color:#111;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.32;border:1px solid #555}.tax-title{text-align:center;font-weight:700;padding:8px 0;border-bottom:1px solid #555}.invoice-top-grid{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid #555}.invoice-seller{padding:8px;display:grid;gap:2px;border-right:1px solid #555;min-height:190px}.invoice-seller strong,.invoice-buyer strong{font-size:12px}.invoice-meta-grid{display:grid;grid-template-columns:1fr 1fr}.invoice-meta-grid>div{min-height:31px;padding:5px 6px;border-right:1px solid #777;border-bottom:1px solid #777;display:grid;align-content:start;gap:2px}.invoice-meta-grid>div:nth-child(2n){border-right:0}.invoice-meta-grid span,.invoice-buyer>span:first-child,.amount-words span,.tax-words span{font-size:10px}.invoice-meta-grid b{font-size:10.5px}.invoice-terms{grid-column:1/-1;min-height:58px!important;border-bottom:0!important}.invoice-buyer{padding:8px;display:grid;gap:2px;border-bottom:1px solid #555;min-height:95px}.invoice-items,.gst-summary{width:100%;border-collapse:collapse;table-layout:fixed}.invoice-items th,.invoice-items td,.gst-summary th,.gst-summary td{border-right:1px solid #777;border-bottom:1px solid #777;padding:5px 6px;vertical-align:top;line-height:1.28}.invoice-items th:last-child,.invoice-items td:last-child,.gst-summary th:last-child,.gst-summary td:last-child{border-right:0;text-align:right}.invoice-items th{font-weight:400;text-align:center;vertical-align:middle;height:24px}.invoice-items td:nth-child(1){width:42px;text-align:center}.invoice-items td:nth-child(2){width:38%}.invoice-items td:nth-child(3),.invoice-items td:nth-child(4),.invoice-items td:nth-child(5),.invoice-items td:nth-child(6){text-align:center}.payment-items td:nth-child(2){width:42%;text-align:left}.payment-items td:nth-child(3),.payment-items td:nth-child(4){text-align:center}.payment-items td:nth-child(5){text-align:right}.payment-summary th,.payment-summary td{text-align:right!important}.payment-summary th:first-child,.payment-summary td:first-child{text-align:left!important}.invoice-items tbody tr:not(.invoice-total-row){height:32px}.invoice-items small{display:block;font-size:10px;margin-top:2px;line-height:1.25}.tax-line{text-align:right;font-weight:700}.invoice-total-row td{font-weight:700;border-top:1px solid #555}.invoice-total-row td:first-child{text-align:right}.amount-words{position:relative;padding:6px 8px;border-bottom:1px solid #555;display:grid;gap:2px}.amount-words em{position:absolute;right:8px;top:6px;font-style:normal;font-size:10px}.gst-summary th{font-size:10px;font-weight:400;text-align:center;vertical-align:middle}.gst-summary td{text-align:right}.gst-summary td:first-child{text-align:left}.tax-words{padding:6px 8px;border-bottom:1px solid #555;display:flex;gap:8px}.invoice-bottom{display:grid;grid-template-columns:1.1fr .9fr;min-height:112px}.invoice-bottom>div{padding:8px;display:grid;align-content:start;gap:3px}.bank-details{border-left:1px solid #555}.bank-details>b{margin-top:10px;text-align:right}.bank-details em{text-align:right;font-style:normal;margin-top:20px}.paid-due{margin-top:8px;font-weight:700}.invoice-footer{text-align:center;font-size:10px;padding:5px;border-top:1px solid #555}
      .tax-invoice th,.tax-invoice td{white-space:normal;overflow-wrap:anywhere}.tax-invoice td:last-child,.tax-invoice .invoice-total-row td:last-child,.tax-invoice .gst-summary td:not(:first-child){white-space:nowrap}.invoice-col-sl{width:46px}.invoice-col-particulars{width:31%}.invoice-col-hsn{width:84px}.invoice-col-qty{width:76px}.invoice-col-rate{width:70px}.invoice-col-per{width:64px}.invoice-col-amount{width:126px}.gst-col-hsn{width:98px}.gst-col-taxable{width:116px}.gst-col-rate{width:94px}.gst-col-amount{width:112px}.gst-col-total{width:124px}
      .cert-filter-bar{gap:10px;margin-bottom:14px}.cert-filter-bar .fbtn{height:34px;width:240px}.cert-filter-bar .filter-spacer{flex:1}.cert-card-table{border-radius:14px;overflow:hidden}.cert-table-wrap{overflow-x:auto}.cert-table{min-width:880px}.cert-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.cert-table tbody td{height:58px;padding:10px 12px;color:#333a56}.cert-table tbody tr:hover{background:#f8f9fd}.cert-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.cert-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.modal-overlay{position:fixed;inset:0;background:rgba(10,14,29,.45);display:none;align-items:center;justify-content:center;z-index:220;padding:18px}.modal-overlay.show{display:flex}
      .inventory-prototype{display:grid;gap:14px;width:100%;max-width:100%;min-width:0;overflow-x:hidden}
      .inventory-prototype>*{min-width:0!important;max-width:100%!important}
      .inventory-metrics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:0;width:100%;max-width:100%;min-width:0}
      .inventory-metrics-grid .metric-card{min-width:0;overflow:hidden}
      .inventory-metrics-grid .m-delta{overflow-wrap:break-word;word-break:break-word}
      .inventory-filter-bar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap;width:100%;max-width:100%;min-width:0}
      .inventory-pill-tabs{display:flex;gap:6px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:2px;max-width:100%;width:100%;min-width:0}
      .inventory-pill-tabs::-webkit-scrollbar{display:none}
      .inventory-pill-tabs .pill-tab{white-space:nowrap;flex:0 0 auto}
      .inventory-action-group{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
      .inventory-alert-banner{max-width:100%!important;min-width:0!important;box-sizing:border-box!important}
      .inventory-alert-banner .academic-banner-copy{min-width:0!important;overflow-wrap:anywhere!important}
      .inventory-table-wrap{width:100%!important;max-width:100%!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;box-sizing:border-box!important}
      .inventory-overview-table{min-width:620px}
      .inventory-tablets-table{min-width:780px}
      .inventory-checklist-table{min-width:760px}
      .inventory-logs-table{min-width:740px}
      .inventory-search-head{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;width:100%;max-width:100%}
      .inventory-search-controls{display:flex;gap:8px;align-items:center;max-width:100%;min-width:0}
      .inventory-modal{width:560px;max-width:calc(100vw - 20px);max-height:88vh;display:flex!important;flex-direction:column!important;overflow:hidden!important;padding:0;border-radius:16px}
      .inventory-modal form{display:flex;flex-direction:column;flex:1 1 auto;min-height:0;overflow:hidden;margin:0}
      .inventory-modal .modal-body{flex:1 1 auto;overflow-y:auto;min-height:0;scrollbar-width:thin}
      .inventory-modal .modal-body::-webkit-scrollbar{width:5px}
      .inventory-modal .modal-body::-webkit-scrollbar-thumb{background:rgba(100,116,139,.25);border-radius:4px}
      .inventory-modal .modal-foot{flex:0 0 auto;border-top:1px solid var(--border-soft);background:#fff;display:flex;justify-content:flex-end;gap:10px}
      .inventory-issue-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--border-soft);min-height:38px}
      .inventory-issue-row:last-child{border-bottom:0}
      .inventory-issue-label{display:flex;align-items:center;gap:10px;flex:1 1 auto;min-width:0;cursor:pointer;margin:0}
      .inventory-issue-title{display:flex;align-items:center;gap:7px;width:195px;flex-shrink:0;font-weight:600;font-size:12.5px;color:#1E293B;white-space:nowrap}
      .inventory-issue-stock{width:85px;flex-shrink:0}
      .inventory-issue-controls{width:190px;flex-shrink:0;display:flex;justify-content:flex-end;align-items:center}
      .inventory-unselected-text{font-size:11.5px;color:#94A3B8;font-style:italic}
      .inventory-type-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
      .inventory-size-tabs{display:flex;gap:8px}
      @media(max-width:820px){
        .inventory-filter-bar{flex-direction:column;align-items:stretch;gap:10px;width:100%;max-width:100%}
        .inventory-pill-tabs{width:100%;max-width:100%}
        .inventory-action-group{width:100%;display:flex}
        .inventory-action-group .btn{flex:1;justify-content:center}
        .inventory-search-head{flex-direction:column;align-items:stretch;gap:10px}
        .inventory-search-controls{width:100%;display:flex}
        .inventory-search-controls input{flex:1 1 0%!important;min-width:0!important;width:100%!important;max-width:100%!important}
      }
      @media(max-width:640px){
        .inventory-metrics-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        .inventory-metrics-grid .metric-card{padding:12px 14px}
        .inventory-metrics-grid .m-value{font-size:20px}
        .inventory-dashboard-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        .inventory-alert-banner{flex-direction:column;align-items:stretch!important;gap:8px}
        .inventory-alert-banner .btn{width:100%;justify-content:center}
      }
      @media(max-width:540px){
        .inventory-action-group{flex-direction:column!important;align-items:stretch!important;gap:8px!important}
        .inventory-action-group .btn{width:100%!important}
        .inventory-modal{width:100%!important;max-width:calc(100vw - 16px)!important;max-height:92vh!important;border-radius:14px!important}
        .inventory-modal .modal-head{padding:12px 14px!important}
        .inventory-modal .modal-body{padding:12px 14px!important;gap:10px!important;overflow-x:hidden!important}
        .inventory-modal .modal-foot{padding:10px 14px!important}
        .inventory-modal .modal-foot .btn{flex:1;justify-content:center;height:38px;font-size:12.5px}
        .inventory-issue-row{flex-direction:column!important;align-items:stretch!important;gap:8px!important;padding:8px 0!important;min-height:auto!important}
        .inventory-issue-label{width:100%!important;justify-content:space-between!important;gap:8px!important}
        .inventory-issue-title{width:auto!important;flex:1 1 auto!important;min-width:0!important;font-size:12.5px!important}
        .inventory-issue-stock{width:auto!important;flex:0 0 auto!important;margin-left:auto!important}
        .inventory-issue-controls{width:100%!important;max-width:100%!important;justify-content:stretch!important;align-items:stretch!important;padding-left:24px!important;box-sizing:border-box!important}
        .inventory-issue-controls.unselected,.inventory-unselected-text{display:none!important}
        .inventory-item-input{width:100%!important;height:34px!important;font-size:12px!important}
        .inventory-type-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:6px!important}
        .inventory-type-grid button{padding:8px 2px!important;font-size:10.5px!important}
        .inventory-size-tabs{display:flex;gap:6px;width:100%}
        .inventory-size-tabs button{flex:1!important;min-width:0!important;padding:0 4px!important;height:34px!important}
      }
      @media(max-width:420px){
        .inventory-metrics-grid{grid-template-columns:1fr!important}
        .inventory-dashboard-grid{grid-template-columns:1fr!important}
        .inventory-search-controls{flex-direction:column!important;align-items:stretch!important}
        .inventory-search-controls input{width:100%!important}
        .inventory-search-controls .btn{width:100%!important;justify-content:center}
      }
      .modal{background:#fff;border-radius:16px;width:600px;max-width:92vw;max-height:88vh;overflow-y:auto;box-shadow:0 18px 48px rgba(10,14,29,.28)}.cert-modal{width:min(1280px,96vw)}.modal-head{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--border-soft);position:sticky;top:0;background:#fff;z-index:2}.modal-head h3{margin:0;font-size:15px;font-weight:700}.modal-body{padding:20px 22px}.modal-foot{display:flex;justify-content:flex-end;gap:10px;padding:16px 22px;border-top:1px solid var(--border-soft)}.logbook-review-modal{width:520px;max-width:calc(100vw - 24px);overflow:hidden}.logbook-review-body{display:grid;grid-template-columns:38px minmax(0,1fr);gap:14px;align-items:start;padding:20px 22px 14px}.logbook-review-copy p{margin:0 0 12px;color:var(--text-700);font-size:13px;line-height:1.45}.review-entry-snapshot{display:grid;gap:3px;background:#f8f9fd;border:1px solid var(--border-soft);border-radius:11px;padding:10px 12px;margin-bottom:14px}.review-entry-snapshot b{font-size:13px;color:var(--text-900)}.review-entry-snapshot span{font-size:11.5px;color:var(--text-400);font-weight:700}.logbook-review-copy .field{margin:0}.logbook-review-copy .field span{display:block;margin-bottom:7px;color:var(--text-600);font-size:12px;font-weight:800}.logbook-review-copy textarea{width:100%;resize:vertical;border:1px solid var(--border);border-radius:10px;padding:10px 12px;font:inherit;color:var(--text-900);outline:none}.logbook-review-copy textarea:focus{border-color:var(--indigo-500);box-shadow:0 0 0 3px rgba(79,107,255,.12)}.document-preview-modal{width:min(1040px,96vw);height:min(820px,92vh);max-height:92vh;display:flex;flex-direction:column;overflow:hidden}.document-preview-head{position:relative;top:auto;flex:0 0 auto}.document-preview-actions{display:flex;align-items:center;gap:8px}.document-preview-body{flex:1;min-height:0;background:#eef2f8;display:grid;place-items:center;padding:12px;overflow:auto}.document-preview-frame{width:100%;height:100%;border:0;background:#fff;border-radius:10px}.document-preview-image{display:block;max-width:100%;max-height:100%;object-fit:contain;background:#fff;border-radius:10px;box-shadow:0 12px 34px rgba(15,23,42,.16)}.certificate-card{background:#fff;border:1px solid var(--border);border-radius:13px;padding:22px;display:grid;gap:16px;overflow:auto}.certificate-preview-shell{padding:10px}.imed-certificate-exact-frame{width:1220px;height:862.49px;max-width:none;margin:0 auto;overflow:hidden;background:#fff;box-shadow:0 18px 44px rgba(17,33,61,.08)}.imed-certificate-exact-frame>div{width:3508px;height:2480px;transform:scale(.3477765);transform-origin:top left}.cert-verify-field{margin-top:14px}
      .document-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;min-width:0}.document-actions .badge{max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.document-actions .btn{height:30px;padding:0 10px;gap:6px;white-space:nowrap}
      @media print{@page certificate-page{size:A4 landscape;margin:0}@page receipt-page{size:A4 portrait;margin:8mm}html,body{background:#fff!important;overflow:visible!important}body.imed-print-certificate{width:297mm;height:210mm;overflow:hidden!important}body.imed-print-certificate *{visibility:hidden!important}body.imed-print-certificate .certificate-export-target,body.imed-print-certificate .certificate-export-target *{visibility:visible!important}body.imed-print-certificate .certificate-export-target{page:certificate-page;position:fixed!important;inset:0!important;width:297mm!important;height:210mm!important;margin:0!important;background:#fff!important;overflow:hidden!important}body.imed-print-certificate .certificate-export-target .certificate-card{border:0!important;border-radius:0!important;padding:0!important;box-shadow:none!important;width:297mm!important;height:210mm!important;overflow:hidden!important}body.imed-print-certificate .certificate-export-target .imed-certificate-exact-frame{width:297mm!important;height:210mm!important;margin:0!important;box-shadow:none!important;border-radius:0!important;overflow:hidden!important}body.imed-print-certificate .certificate-export-target .imed-certificate-exact-frame>div{width:3508px!important;height:2480px!important;transform:scale(.32)!important;transform-origin:top left!important}body.imed-print-receipt *{visibility:hidden!important}body.imed-print-receipt .receipt-print-target,body.imed-print-receipt .receipt-print-target *{visibility:visible!important}body.imed-print-receipt .receipt-print-target{page:receipt-page;position:absolute!important;left:0!important;top:0!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:#fff!important;overflow:visible!important}body.imed-print-receipt .receipt-print-target .tax-invoice{width:100%!important;min-width:0!important;margin:0!important;box-shadow:none!important}}
       .crow{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid var(--border-soft)}.crow:last-child{border-bottom:0}.who{display:flex;align-items:center;gap:11px}.mini{width:32px;height:32px;border-radius:999px;background:var(--blue-50);color:var(--indigo-600);display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800}.row-list{display:grid}.row-button{width:100%;border:0;background:transparent;text-align:left}.collection-box{display:grid;gap:8px}.collection-box strong{font-size:23px;color:#061633}.collection-box span{color:var(--text-400)}.nps-metrics{grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;margin-bottom:18px}.nps-metrics .metric-card{min-height:118px;padding:18px 20px;border-radius:14px;background:linear-gradient(180deg,#fff 0%,#fbfcff 100%)}.nps-metrics .m-label{font-size:12px;font-weight:800;color:#405070}.nps-metrics .m-value{font-size:28px;line-height:34px;font-weight:900;letter-spacing:0;color:#061633;margin-top:8px}.nps-metrics .m-delta{font-size:11.5px;font-weight:800;margin-top:8px}.nps-filter-bar{display:grid;grid-template-columns:minmax(220px,1.35fr) repeat(4,minmax(130px,.72fr)) auto;gap:10px;align-items:center;margin-bottom:18px}.nps-filter-bar .search-box{width:100%;height:36px}.nps-filter-bar .fbtn,.nps-filter-bar .btn{height:36px;border-radius:9px;font-size:12px}.nps-insight-grid{margin-bottom:18px;align-items:stretch}.nps-insight-grid>.card{min-height:264px;border-radius:14px;overflow:hidden}.nps-insight-grid .card-head h3,.nps-insight-grid .card-head p,.card-head h3,.card-head p{letter-spacing:0}.nps-insight-grid .card-head h3{font-size:14px;font-weight:900;color:#061633}.nps-insight-grid .card-head p{font-size:12px;color:var(--text-400);margin-top:3px}.nps-trend{height:190px;display:flex;align-items:end;gap:16px;overflow-x:auto;padding:24px 18px 18px}.nps-trend-day{min-width:58px;height:142px;display:grid;grid-template-rows:1fr auto auto;gap:6px;align-items:end;text-align:center}.nps-trend-bar{width:48px;height:110px;margin:0 auto;border-radius:999px;background:#edf2fb;display:flex;align-items:end;overflow:hidden;box-shadow:inset 0 0 0 1px rgba(215,223,239,.7)}.nps-trend-bar i{display:block;width:100%;min-height:8px;border-radius:999px;background:linear-gradient(180deg,#4f6bff 0%,#17a673 100%)}.nps-trend-day b{font-size:13px;font-weight:900;color:#061633}.nps-trend-day span{font-size:11px;font-weight:700;color:var(--text-400);white-space:nowrap}.nps-alert-list{display:grid;gap:12px;align-content:start;padding:18px}.nps-alert{display:flex;align-items:flex-start;gap:13px;border:1px solid var(--border-soft);border-radius:14px;background:#fff;padding:14px 16px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.nps-alert>span{width:10px;height:10px;border-radius:999px;margin-top:5px;flex:0 0 auto}.nps-alert.warn>span{background:#f5a524}.nps-alert.bad>span{background:#e5484d}.nps-alert.good>span{background:#17a673}.nps-alert b{font-size:13px;font-weight:900;color:#061633}.nps-alert p{margin:4px 0 0;color:var(--text-400);font-size:12px;line-height:17px}.nps-heatmap{display:grid;gap:14px;padding:18px}.nps-heat-row{display:grid;grid-template-columns:180px minmax(0,1fr) 44px;gap:14px;align-items:center}.nps-heat-row span{font-size:12px;font-weight:900;color:#405070}.nps-heat-row div{height:10px;border-radius:999px;background:#e9edf5;overflow:hidden}.nps-heat-row i{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--indigo-500),var(--teal-500))}.nps-heat-row b{text-align:right;color:#061633;font-weight:900}.nps-promoter{background:#ddfbef;color:#008060}.nps-passive{background:#fff4da;color:#b77900}.nps-detractor{background:#ffe8e8;color:#c62828}.nps-note-history{display:grid;gap:8px;border:1px solid var(--border-soft);border-radius:12px;background:#fbfcff;padding:12px}.nps-note-history>b{font-size:12px;color:#061633}.nps-note-history div{border-top:1px solid var(--border-soft);padding-top:8px}.nps-note-history div:first-of-type{border-top:0;padding-top:0}.nps-note-history p{margin:0;color:#2f3954;font-size:12.5px;line-height:18px}.nps-note-history span{display:block;margin-top:4px;color:var(--text-400);font-size:11px}.nps-responses-card{margin-bottom:18px}.nps-summary-section{margin-top:0}.nps-summary-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;padding:16px}.nps-summary-card{border:1px solid var(--border-soft);border-radius:14px;background:linear-gradient(135deg,#fff 0%,#f8fbff 100%);padding:18px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 14px;align-items:center}.nps-summary-card b{font-size:13px;font-weight:900;color:#061633;text-transform:uppercase}.nps-summary-card strong{font-size:30px;line-height:34px;color:var(--indigo-600);font-weight:900}.nps-summary-card span{grid-column:1/-1;font-size:12px;font-weight:700;color:var(--text-400)}@media(max-width:1100px){.nps-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.nps-filter-bar{grid-template-columns:repeat(2,minmax(0,1fr))}.nps-filter-bar .search-box{grid-column:1/-1}.nps-filter-bar .btn{justify-content:center}}@media(max-width:680px){.nps-metrics{grid-template-columns:1fr}.nps-filter-bar{grid-template-columns:1fr}.nps-insight-grid{grid-template-columns:1fr}.nps-heat-row{grid-template-columns:1fr 54px}.nps-heat-row div{grid-column:1/-1;grid-row:2}.nps-trend{padding:18px 14px}.nps-summary-card{grid-template-columns:1fr}.nps-summary-card strong{font-size:26px}.nps-responses-card{margin-bottom:14px}}.cash-deposit-card{margin-bottom:16px}.cash-deposit-table{min-width:980px}.cash-deposit-form{display:grid;grid-template-columns:90px 132px 150px 150px 130px 120px 150px auto;gap:8px;align-items:center}.cash-deposit-form input{height:34px;border:1px solid var(--border);border-radius:8px;padding:7px 9px;font-size:11.5px;font-family:inherit;color:var(--text-900);background:#fff;min-width:0}.cash-deposit-form input[type=file]{padding:6px;background:#fff}.cash-deposit-history{display:grid;gap:5px}.cash-deposit-history div{display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center}.cash-deposit-history b{font-size:12px}.cash-deposit-history span{font-size:11px;color:var(--text-400)}.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.field{margin-bottom:0}.field.full{grid-column:1/-1}.field label{display:block;font-size:11.5px;font-weight:700;color:var(--text-600);margin-bottom:6px}.required-star{color:var(--red-500);font-weight:800;margin-left:3px}.field input,.field select,.field textarea{width:100%;border:1px solid var(--border);border-radius:8px;padding:9px 11px;font-size:12.5px;font-family:inherit;color:var(--text-900);background:#fff}.field input[type=file]{padding:7px 9px}.field textarea{min-height:70px}.field-help{display:block;margin-top:5px;font-size:10.5px;color:var(--text-400)}.day-picker{display:flex;flex-wrap:wrap;gap:8px}.day-picker label{display:flex!important;align-items:center;gap:6px;border:1px solid var(--border);border-radius:999px;padding:7px 10px;background:#fff;margin:0!important}.class-card{margin-bottom:16px}.class-att-grid .att-row{min-width:760px}.pager{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-top:1px solid var(--border-soft);font-size:12px;color:var(--text-400)}.pager-btns{display:flex;gap:6px}.pager-btns button{min-width:40px;height:28px;border-radius:7px;border:1px solid var(--border);background:#fff;font-size:12px;color:var(--text-600)}.pager-btns button.active{background:var(--indigo-500);color:#fff;border-color:var(--indigo-500)}.empty-state{text-align:center;padding:34px 20px;color:var(--text-400)}.settings-shell{display:grid;grid-template-columns:1fr 1fr;gap:16px}.settings-prototype-shell{grid-template-columns:220px minmax(0,1fr);align-items:start}.settings-nav{background:#fff;border:1px solid var(--border);border-radius:14px;padding:10px;display:grid;gap:4px;box-shadow:0 1px 2px rgba(16,20,40,.05)}.settings-nav button{border:0;background:transparent;color:var(--text-600);border-radius:9px;padding:10px 12px;text-align:left;font-size:12.5px;font-weight:700}.settings-nav button.active{background:var(--indigo-500);color:#fff;box-shadow:0 4px 12px rgba(79,107,255,.28)}.settings-pane-wrap{min-width:0}.settings-card{border-radius:14px;overflow:hidden}.settings-card .card-head button{margin-left:auto}.settings-table-wrap{overflow-x:auto}.settings-table{min-width:760px}.settings-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.settings-table tbody td{height:58px;padding:10px 12px;color:#333a56}.settings-table tbody tr:hover{background:#f8f9fd}.settings-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.settings-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.settings-search-body{padding-bottom:0}.settings-search-body .fbtn{width:260px;height:34px}.settings-add-form{border-bottom:1px solid var(--border-soft);background:#fafbfd}.settings-security-card{max-width:420px}.settings-security-card .card-body{display:grid;gap:14px}.staff-role-note>div{border:1px solid var(--border-soft);border-radius:8px;background:#fafbfd;color:var(--text-600);font-size:12px;line-height:1.4;padding:10px 11px}.pill-list{display:flex;flex-wrap:wrap;gap:10px;padding:0 18px 18px}.pill-list span{padding:8px 12px;border-radius:999px;background:var(--blue-50);color:var(--indigo-600);font-weight:700}.profile-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.profile-grid b{display:block;color:var(--text-400);font-size:11px;text-transform:uppercase;margin-bottom:5px}.profile-grid p{margin:0;font-weight:700}.payment-form{grid-column:1/-1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;align-items:start}.payment-form-actions{grid-column:1/-1;display:flex;justify-content:flex-end;padding-top:2px}.payment-form-actions .btn{min-width:150px}.profile-own-card{max-width:520px;border-radius:14px;overflow:hidden}.profile-own-head{gap:14px}.profile-own-avatar{width:46px;height:46px;font-size:15px;background:linear-gradient(135deg,var(--indigo-500),#8A6BFF);color:#fff}.profile-security-btn{margin-top:16px}.profile-shell{max-width:760px;border-radius:14px;overflow:hidden}.profile-head{padding:20px 22px;border-bottom:1px solid var(--border-soft);display:flex;align-items:flex-start;gap:14px}.profile-title{flex:1;min-width:0}.profile-title h3{margin:0;font-size:15px;line-height:1.25}.profile-title .cell-sub{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px}.profile-tabs{padding:0 22px;overflow-x:auto}.profile-drawer-body{padding-bottom:18px}.profile-metrics{grid-template-columns:1fr 1fr;margin-bottom:10px}.profile-metrics .metric-card{padding:14px}.profile-metrics .m-value{font-size:21px}.profile-metrics .m-delta:empty{display:none}.profile-progress{width:100px}.profile-payment-form{margin-top:12px;grid-template-columns:repeat(2,minmax(0,1fr))}.profile-payment-form .btn{height:38px;justify-content:center}.profile-edit-form{padding:18px 22px}.profile-edit-actions{grid-column:1/-1;display:flex;justify-content:flex-end;gap:10px;border-top:1px solid var(--border-soft);padding-top:14px}.feedback-form{padding-bottom:16px;border-bottom:1px solid var(--border-soft)}.feedback-timeline{display:grid;gap:10px;margin-top:16px}.feedback-item{border:1px solid var(--border-soft);border-radius:10px;padding:12px;background:#fff}.feedback-item>div:first-child{display:flex;align-items:center;justify-content:space-between;gap:10px}.feedback-item b{font-size:12.5px}.feedback-item p{margin:8px 0;color:var(--text-700);line-height:1.45}.profile-shell .table-wrap{border:1px solid var(--border-soft);border-radius:10px;overflow:auto}.profile-shell table thead th{background:#fafbfd}.profile-shell .certificate-card{border-radius:10px}
      .internship-status-card{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:14px;border:1px solid var(--border-soft);border-radius:12px;background:linear-gradient(135deg,#fff 0%,#fff9ef 100%);padding:14px}.internship-status-card.assigned{background:linear-gradient(135deg,#fff 0%,#effdf7 100%)}.internship-status-card h4{margin:8px 0 4px;font-size:14px;color:var(--text-900)}.internship-status-card p{margin:0;color:var(--text-400);font-size:11.5px;line-height:1.45}.internship-form{margin-top:0}.internship-form .profile-edit-actions{padding-top:14px}.internship-panel{display:grid;gap:16px}.internship-metrics{grid-template-columns:repeat(4,1fr)}.internship-monitor-card{border-radius:14px;overflow:hidden}.internship-monitor-body{padding:14px 18px 18px}.internship-filter-bar{margin-bottom:14px}.internship-filter-bar .fbtn{height:34px}.internship-search-field{width:280px;display:flex;align-items:center;gap:8px;padding:0 11px}.internship-search-field svg{flex:0 0 14px}.internship-filter-bar .internship-search-field input{height:auto;width:100%;min-width:0;border:0;background:transparent;outline:0;padding:0;font-size:12.5px;color:var(--text-900);font-family:inherit}.internship-date-input{width:156px}.internship-monitor-table{min-width:1120px;table-layout:fixed}.internship-monitor-table thead th{height:38px;padding:10px 12px;background:#fafbfd;color:#99a1b3;font-size:10.5px;letter-spacing:.4px}.internship-monitor-table tbody td{height:62px;padding:10px 12px;color:#333a56;vertical-align:middle;overflow:hidden}.internship-monitor-table th:nth-child(1){width:250px}.internship-monitor-table th:nth-child(2){width:160px}.internship-monitor-table th:nth-child(3){width:104px}.internship-monitor-table th:nth-child(4),.internship-monitor-table th:nth-child(5){width:160px}.internship-monitor-table th:nth-child(6){width:72px}.internship-monitor-table th:nth-child(7){width:86px}.internship-monitor-table th:nth-child(8){width:228px}.internship-monitor-table tbody tr:hover{background:#f8f9fd}.internship-monitor-table .cell-name{font-size:12.5px;font-weight:700;color:#161b33}.internship-monitor-table .cell-sub{font-size:11px;color:#99a1b3;margin-top:3px}.internship-student-cell{min-width:0}.internship-student-cell>div{min-width:0}.internship-student-cell .cell-name,.internship-student-cell .cell-sub,.internship-hospital-cell,.internship-hospital-cell .cell-sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.internship-monitor-table td.mono{font-size:11px;white-space:nowrap}.internship-gps-status{overflow:visible!important}.internship-gps-status .badge{max-width:100%;overflow:hidden;text-overflow:ellipsis}.internship-gps-status .cell-sub{white-space:normal;line-height:1.35}
      .internship-metrics{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}.internship-tabs{width:max-content;max-width:100%;margin:0;overflow-x:auto}.internship-tabs .pill-tab{white-space:nowrap;display:inline-flex;align-items:center;gap:7px}.tab-badge{min-width:18px;height:18px;border-radius:999px;background:var(--amber-500);color:#fff;display:inline-grid;place-items:center;padding:0 6px;font-size:10px;font-style:normal;font-weight:800}.internship-logbook-card{border-radius:14px;overflow:hidden}.internship-logbook-card .segmented.tiny{margin-left:auto}.internship-logbook-card .segmented.tiny button{height:30px;padding:0 10px;font-size:11.5px}.internship-logbook-list{display:grid;gap:10px;background:#fbfcff}.internship-logbook-item{display:grid;grid-template-columns:230px minmax(0,1fr) 142px;gap:14px;align-items:start;background:#fff;border:1px solid var(--border-soft);border-radius:12px;padding:12px}.internship-logbook-content{min-width:0}.internship-logbook-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.internship-logbook-top b{font-size:13px;color:var(--text-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.internship-logbook-top span{font-size:11px;color:var(--text-400);font-weight:700;white-space:nowrap}.internship-logbook-notes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.internship-logbook-notes>div{border:1px solid var(--border-soft);border-radius:10px;background:#fafbfd;padding:9px 10px}.internship-logbook-notes>div:nth-child(3){grid-column:1/-1}.internship-logbook-notes span{display:block;color:var(--indigo-600);font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.35px}.internship-logbook-notes p{margin:5px 0 0;color:var(--text-700);font-size:12px;line-height:1.45;white-space:normal}.internship-logbook-actions{display:grid;justify-items:end;align-content:start;gap:10px}.internship-logbook-actions .btn{white-space:nowrap}.internship-logbook-list .empty-state{background:#fff;border:1px dashed var(--border);border-radius:12px}@media(max-width:1100px){.internship-logbook-item{grid-template-columns:1fr}.internship-logbook-actions{justify-items:start;display:flex;align-items:center;justify-content:space-between}.internship-logbook-card .segmented.tiny{margin-left:0}}@media(max-width:900px){.study-note-form{grid-template-columns:1fr 1fr}.study-note-form .field.full{grid-column:1/-1}.study-note-form .btn{justify-content:center}}@media(max-width:700px){.internship-tabs{width:100%}.internship-tabs .pill-tab{flex:1;justify-content:center}.internship-logbook-notes{grid-template-columns:1fr}.internship-logbook-actions{align-items:flex-start;flex-direction:column}.internship-logbook-top{align-items:flex-start;flex-direction:column;gap:4px}.study-note-form{grid-template-columns:1fr}.study-note-row{grid-template-columns:38px minmax(0,1fr);align-items:start}.study-note-row .action-icons{grid-column:1/-1;justify-content:flex-end}.study-note-icon{width:38px;height:38px}}
      .chart-body{display:flex;align-items:center;gap:22px;flex-wrap:wrap}.donut-wrap{position:relative;flex:0 0 auto;display:flex;align-items:center;justify-content:center}.donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none}.donut-center strong{font-size:19px;font-weight:800;color:#061633;font-family:JetBrains Mono,monospace;line-height:1.1}.donut-center span{font-size:10px;color:var(--text-400);font-weight:600;text-transform:uppercase;letter-spacing:.3px;margin-top:2px}.donut-legend{flex:1;min-width:160px;display:flex;flex-direction:column;gap:9px}.donut-legend-row{display:grid;grid-template-columns:9px 1fr auto auto;align-items:center;gap:9px;font-size:12px}.donut-legend-row .dot{width:9px;height:9px;border-radius:3px}.donut-legend-row .lbl{color:var(--text-700);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.donut-legend-row .val{color:var(--text-400);font-family:JetBrains Mono,monospace;font-size:11px}.donut-legend-row .pct{color:var(--text-900);font-weight:700;min-width:34px;text-align:right}
      .main,.content,.card,.metric-card,.table-wrap,.settings-pane-wrap,.profile-title,.drawer-title{min-width:0}.card{max-width:100%!important;min-width:0!important;overflow:hidden!important;box-sizing:border-box!important}.table-wrap{max-width:100%!important;width:100%!important;overflow-x:auto!important;box-sizing:border-box!important}.filter-bar{display:flex;align-items:center;flex-wrap:wrap;gap:10px}.filter-bar .fbtn,.filter-bar select,.filter-bar input{max-width:100%}.drawer{max-width:96vw}.drawer-body{overflow-x:hidden}.att-grid{overflow-x:auto;padding-bottom:2px}.att-row{min-width:760px}.modal-body,.card-body{min-width:0}.invoice-card,.certificate-card{max-width:100%}.date-filter,.dtabs,.settings-nav,.pager-btns,.nav-scroll,.table-wrap,.att-grid,.invoice-card,.certificate-card,.certificate-preview-shell{scrollbar-width:none;-ms-overflow-style:none}.date-filter::-webkit-scrollbar,.dtabs::-webkit-scrollbar,.settings-nav::-webkit-scrollbar,.pager-btns::-webkit-scrollbar,.nav-scroll::-webkit-scrollbar,.table-wrap::-webkit-scrollbar,.att-grid::-webkit-scrollbar,.invoice-card::-webkit-scrollbar,.certificate-card::-webkit-scrollbar,.certificate-preview-shell::-webkit-scrollbar{display:none}
      .roster-lanes{display:grid;grid-template-rows:minmax(92px,auto) minmax(92px,auto);gap:5px}.roster-lane{min-height:92px}.roster-lane .roster-slot{position:relative;min-height:87px;margin-bottom:0}.roster-slot .roster-date{color:var(--indigo-600);font-size:10.5px;font-weight:700}.roster-slot.practical .roster-date{color:var(--amber-700)}.roster-slot.selected{border-width:2px!important;background:#fff!important;box-shadow:0 0 0 3px rgba(79,107,255,.16),0 10px 24px rgba(79,107,255,.18)!important;transform:translateY(-1px)}.roster-slot.practical.selected{box-shadow:0 0 0 3px rgba(245,158,11,.18),0 10px 24px rgba(245,158,11,.18)!important}.roster-slot-wrap{position:relative;margin-bottom:5px}.roster-slot-wrap .roster-slot{margin-bottom:0}.roster-edit-btn{position:absolute;top:5px;right:5px;width:22px;height:22px;border-radius:6px;border:1px solid var(--indigo-500);background:#fff;color:var(--indigo-600);display:grid;place-items:center;opacity:0;transform:scale(.8);transition:opacity .15s,transform .15s;pointer-events:none;z-index:2}.roster-slot-wrap:hover .roster-edit-btn{opacity:1;transform:scale(1);pointer-events:auto}.roster-slot-wrap:hover .roster-edit-btn:hover{background:var(--indigo-500);color:#fff}.roster-slot-wrap .roster-slot.practical~.roster-edit-btn{border-color:#f2bd62;color:var(--amber-700)}.roster-slot-wrap .roster-slot.practical~.roster-edit-btn:hover{background:var(--amber-500);color:#fff}.class-edit-modal{width:500px;max-width:calc(100vw - 24px)}.class-edit-body{grid-template-columns:1fr 1fr;padding:20px 22px 10px}
      .class-attendance-shell{display:grid;gap:12px}.class-attendance-tools{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding-bottom:2px}.class-attendance-search{width:260px;height:34px;background:#fff}.class-attendance-filters{overflow-x:auto}.class-attendance-save{position:sticky;bottom:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:12px;margin:4px -18px -16px;padding:12px 18px;background:rgba(255,255,255,.96);border-top:1px solid var(--border-soft);box-shadow:0 -8px 22px rgba(16,20,40,.06)}.class-attendance-save span{color:var(--text-400);font-size:12px;font-weight:700}.class-attendance-save .btn{white-space:nowrap}.class-attendance-actions{display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap}.btn-danger-soft{background:var(--red-50);border-color:#f7d7d7;color:var(--red-700)}.notif-wrap{position:relative;display:inline-flex;align-items:center}.notif-btn{position:relative;cursor:pointer;transition:all .15s ease}.notif-btn:hover,.notif-btn.active{background:var(--bg);color:var(--indigo-600);border-color:var(--indigo-500)}.notif-badge{position:absolute;top:-4px;right:-4px;min-width:18px;height:18px;border-radius:999px;background:var(--indigo-600);color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px;line-height:1;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.15)}.notif-badge.urgent{background:#E5484D;animation:notif-pulse 2s infinite}@keyframes notif-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}.notif-dropdown{position:absolute;top:calc(100% + 10px);right:0;width:360px;max-width:calc(100vw - 24px);background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 12px 36px rgba(15,23,42,.18);z-index:100;overflow:hidden;animation:notif-fade-in .15s ease-out}@keyframes notif-fade-in{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}@media(max-width:600px){.notif-dropdown{position:fixed;top:66px;left:10px;right:10px;width:auto;max-width:none;max-height:calc(100vh - 84px)}}.notif-header{padding:14px 16px;border-bottom:1px solid var(--border-soft);background:#FAFBFD}.notif-title-row{display:flex;align-items:center;justify-content:space-between}.notif-title{display:flex;align-items:center;gap:7px;font-weight:700;font-size:13.5px;color:var(--text-900)}.notif-count-pill{font-size:11px;font-weight:700;background:var(--indigo-100);color:var(--indigo-600);padding:3px 8px;border-radius:999px}.notif-alert-banner{margin-top:8px;padding:7px 10px;background:#FFF4F4;border:1px solid #FCD4D4;border-radius:8px;color:#C92A2A;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:7px;line-height:1.35}.notif-alert-banner svg{flex:0 0 14px;color:#E5484D}.notif-body{max-height:380px;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent}.notif-body::-webkit-scrollbar{width:6px}.notif-body::-webkit-scrollbar-track{background:transparent}.notif-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}.notif-body::-webkit-scrollbar-thumb:hover{background:#94a3b8}.notif-empty{padding:36px 20px;text-align:center}.notif-empty-icon{width:46px;height:46px;border-radius:12px;background:var(--indigo-100);color:var(--indigo-600);display:flex;align-items:center;justify-content:center;margin:0 auto 10px}.notif-empty-text{font-size:13px;font-weight:700;color:var(--text-800)}.notif-empty-sub{font-size:11.5px;color:var(--text-400);margin-top:4px}.notif-list{display:flex;flex-direction:column}.notif-item{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border:none;background:transparent;border-bottom:1px solid var(--border-soft);text-align:left;width:100%;cursor:pointer;transition:background .12s ease;font-family:inherit}.notif-item:hover{background:#F8F9FD}.notif-item:last-child{border-bottom:none}.notif-avatar{width:32px;height:32px;border-radius:8px;background:var(--indigo-100);color:var(--indigo-600);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11.5px;flex:0 0 32px;margin-top:2px}.notif-item-info{flex:1;min-width:0}.notif-item-top{display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:3px}.notif-item-name{font-size:12.5px;font-weight:700;color:var(--text-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.notif-item-meta{font-size:11px;color:var(--text-400);margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.notif-item-time{font-size:11px;font-weight:600;color:var(--indigo-600);display:flex;align-items:center;gap:5px}.notif-item-time svg{flex:0 0 12px;color:var(--indigo-500)}.notif-footer{padding:10px 14px;border-top:1px solid var(--border-soft);background:#FAFBFD;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}.notif-more-hint{font-size:11px;color:var(--text-400);font-weight:600}.notif-view-all-btn{border:none;background:transparent;color:var(--indigo-600);font-size:12px;font-weight:700;cursor:pointer;padding:4px 8px;border-radius:6px;font-family:inherit;display:inline-flex;align-items:center;gap:5px}.notif-view-all-btn:hover{text-decoration:underline}.notif-item-wrap{display:flex;align-items:center;width:100%;border-bottom:1px solid var(--border-soft);transition:background .12s ease}.notif-item-wrap:hover{background:#F8F9FD}.notif-item-wrap:last-child{border-bottom:none}.notif-item{display:flex;align-items:flex-start;gap:10px;padding:12px 14px;border:none;background:transparent;border-bottom:none;text-align:left;flex:1;min-width:0;cursor:pointer;transition:none;font-family:inherit}.notif-quick-done-btn{width:28px;height:28px;border-radius:8px;border:1px solid #d1fae5;background:#ecfdf5;color:#059669;display:flex;align-items:center;justify-content:center;margin-right:12px;cursor:pointer;flex:0 0 28px;transition:all .15s ease}.notif-quick-done-btn:hover{background:#059669;color:#fff;border-color:#059669;transform:scale(1.08)}.active-followup-banner{display:flex;align-items:center;justify-content:space-between;gap:10px;background:linear-gradient(135deg,#FFF9F0 0%,#FFF 100%);border:1px solid #FED7AA;border-radius:12px;padding:12px 14px;margin-bottom:16px;box-shadow:0 1px 3px rgba(245,158,11,.08)}.active-followup-main{display:flex;align-items:center;gap:10px;min-width:0}.active-followup-icon{width:32px;height:32px;border-radius:8px;background:#FFEDD5;color:#EA580C;display:flex;align-items:center;justify-content:center;flex:0 0 32px}.active-followup-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.35px;color:#C2410C}.active-followup-meta{display:flex;align-items:center;gap:6px;font-size:12px;color:#334155;font-weight:600;margin-top:2px;flex-wrap:wrap}.active-followup-meta svg{color:#64748B}.active-followup-btns{display:flex;align-items:center;gap:6px;flex-shrink:0}.btn-followup-done{background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;font-size:11.5px;font-weight:700;padding:6px 10px;border-radius:8px;display:inline-flex;align-items:center;gap:5px;cursor:pointer;transition:all .15s ease}.btn-followup-done:hover{background:#059669;color:#fff;border-color:#059669}.btn-followup-clear{background:#F8FAFC;color:#64748B;border:1px solid #E2E8F0;font-size:11.5px;font-weight:600;padding:6px 9px;border-radius:8px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:all .15s ease}.btn-followup-clear:hover{background:#FEE2E2;color:#DC2626;border-color:#FECACA}.btn-timeline-done{background:#ECFDF5;color:#059669;border:1px solid #A7F3D0;font-size:11px;font-weight:700;padding:3px 7px;border-radius:6px;display:inline-flex;align-items:center;gap:4px;cursor:pointer;transition:all .15s ease}.btn-timeline-done:hover{background:#059669;color:#fff;border-color:#059669}
      // @media(max-width:1200px){.lower-grid{grid-template-columns:1fr 1fr}.finance-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.finance-grid,.attdetail-grid{grid-template-columns:1fr}.settings-prototype-shell{grid-template-columns:190px minmax(0,1fr)}}
      // @media(max-width:1100px){.sidebar{width:74px;flex-basis:74px}.brand-text,.nav-group-label,.nav-item span,.role-meta{display:none}.sidebar-brand,.nav-item{justify-content:center}.nav-badge{position:absolute;right:12px;top:7px;margin:0;min-width:17px;height:17px;padding:0 5px;font-size:9.5px}.two-col,.settings-shell,.lower-grid,.batch-grid{grid-template-columns:1fr}.batch-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.topbar{height:auto;min-height:0;flex:0 0 auto;display:grid;grid-template-columns:1fr;align-items:stretch;padding:14px;gap:10px}.topbar-spacer{display:none}.search-box{width:100%}.date-filter{flex-wrap:wrap}.field-grid,.profile-grid,.payment-form{grid-template-columns:1fr}.card-head{align-items:flex-start;flex-wrap:wrap}.card-head button,.card-head input{margin-left:0}.settings-prototype-shell{grid-template-columns:1fr}.settings-nav{display:flex;overflow-x:auto;white-space:nowrap}.settings-nav button{flex:0 0 auto}.batch-metrics,.emi-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}}
            @media(max-width:1100px){.sidebar{width:74px;flex-basis:74px}.brand-text,.nav-group-label,.nav-item span,.role-meta{display:none}.sidebar-brand,.nav-item{justify-content:center}.sidebar-brand .brand-full-logo{width:42px;height:42px;max-width:42px;object-fit:contain;object-position:left center}.nav-badge{position:absolute;right:12px;top:7px;margin:0;min-width:17px;height:17px;padding:0 5px;font-size:9.5px}.two-col,.settings-shell,.lower-grid,.batch-grid{grid-template-columns:1fr}.batch-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.topbar{height:auto;min-height:0;flex:0 0 auto;display:grid;grid-template-columns:1fr;align-items:stretch;padding:14px;gap:10px}.topbar-spacer{display:none}.search-box{width:100%}.date-filter{flex-wrap:wrap}.field-grid,.profile-grid,.payment-form{grid-template-columns:1fr}.card-head{align-items:flex-start;flex-wrap:wrap}.card-head button,.card-head input{margin-left:0}.settings-prototype-shell{grid-template-columns:1fr}.settings-nav{display:flex;overflow-x:auto;white-space:nowrap}.settings-nav button{flex:0 0 auto}.batch-metrics,.emi-metrics{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:800px){.topbar{display:flex;flex-direction:column;align-items:stretch;gap:8px;width:100%!important;max-width:100vw!important;overflow:visible!important;box-sizing:border-box}.scope-select{width:100%;height:36px}.date-filter{width:100%;overflow-x:auto;justify-content:flex-start;flex-wrap:nowrap}.df-btn{flex:0 0 auto}.df-date.show{width:100%}.topbar>.icon-btn{align-self:flex-end;flex:0 0 34px}.search-box{width:100%;min-height:38px;flex:0 0 auto}.filter-bar{align-items:stretch}.filter-bar .fbtn,.filter-bar select,.filter-bar input,.logs-filter-bar .fbtn,.receipts-filter-bar .fbtn,.cert-filter-bar .fbtn{width:100%;min-width:0}.filter-spacer{display:none}.drawer{width:100vw!important;max-width:100vw;border-radius:0}.receipt-drawer{width:100vw;max-width:100vw}.drawer-head{padding:16px}.drawer-body{padding:14px}.receipt-drawer-body{padding:14px 0 24px}.invoice-card{padding:0 10px!important}.tax-invoice{min-width:720px}.invoice-actions{padding:0 10px}.profile-shell{max-width:none}.modal{width:100%;max-width:100%;border-radius:14px}.delete-modal{width:390px;max-width:calc(100vw - 20px)}.modal-overlay{padding:10px}.modal-body,.modal-head,.modal-foot{padding-left:16px;padding-right:16px}.modal-foot{flex-wrap:wrap}.modal-foot .btn,.modal-actions .btn{flex:1;justify-content:center}.delete-modal-actions .btn{flex:0 0 auto}.date-range-row{flex-direction:column}.finance-metrics,.batch-metrics,.emi-metrics{grid-template-columns:1fr}.chart-body{flex-direction:column;align-items:stretch}.donut-wrap{align-self:center}.donut-legend{width:100%}.pager{align-items:flex-start;gap:10px;flex-direction:column}.pager-btns{width:100%;overflow-x:auto}.profile-edit-actions{justify-content:stretch;flex-wrap:wrap}.profile-edit-actions .btn{flex:1;justify-content:center}}
      @media(max-width:700px){.imed-admin-prototype #app{display:block;min-height:100vh;height:100vh;overflow:hidden;width:100%!important;max-width:100vw!important}.sidebar{position:fixed;left:0;right:0;bottom:0;top:auto;width:100%!important;max-width:100vw!important;height:76px;z-index:20;display:flex;flex-direction:row;border-right:0;border-top:1px solid var(--navy-line);box-sizing:border-box}.sidebar-brand,.sidebar-footer{display:none}.nav-scroll{display:flex;overflow-x:auto;overflow-y:hidden;padding:0;scrollbar-width:none}.nav-scroll::-webkit-scrollbar{display:none}.nav-scroll>div{display:contents}.nav-item{min-width:72px;height:76px;border-radius:0;display:grid;place-items:center;gap:5px;font-size:10px;margin:0;padding:8px 6px}.nav-item svg{width:17px;height:17px}.nav-item span{display:block;max-width:64px;text-align:center;line-height:1.15;white-space:normal}.mobile-logout{display:grid;color:#FCA5A5}.mobile-logout:hover{background:var(--navy-800);color:#fff}.main{height:calc(100vh - 76px);width:100%!important;max-width:100vw!important;overflow:hidden!important;box-sizing:border-box}.content{padding:12px 10px 18px;width:100%!important;max-width:100vw!important;overflow-x:hidden!important;box-sizing:border-box}.grid-metrics,.batch-card-grid{grid-template-columns:1fr;gap:10px}.metric-card{padding:14px}.m-value{font-size:21px}.funnel-row{grid-template-columns:88px minmax(0,1fr) 56px}.topbar{position:sticky;top:0;z-index:40;box-shadow:0 1px 0 var(--border);width:100%!important;max-width:100vw!important;overflow:visible!important;box-sizing:border-box}.page-title{font-size:15px}.page-sub{font-size:11px}.field-grid,.profile-grid,.payment-form{grid-template-columns:1fr}.card-head,.card-body{padding-left:14px;padding-right:14px}.attendance-card .card-body{padding:14px 10px}.att-row{min-width:700px}.cal-grid{gap:4px}.cal-cell{font-size:11px;border-radius:7px}.profile-head{padding:16px 14px}.profile-tabs{padding:0 14px}.dtabs{overflow-x:auto}.dtab{white-space:nowrap}.certificate-preview-shell{padding:0;overflow-x:auto}.imed-certificate-exact-frame{transform:scale(.48);transform-origin:top left;margin:0;width:1220px}.cert-modal .certificate-card{padding:10px;overflow:auto}}
      @media(max-width:420px){.content{padding-left:8px;padding-right:8px;width:100%!important;max-width:100vw!important;overflow-x:hidden!important;box-sizing:border-box}.auth-card{padding:22px 18px}.topbar{padding:12px 10px;width:100%!important;max-width:100vw!important;overflow:visible!important;box-sizing:border-box}.date-filter{padding:3px}.df-btn{padding:6px 8px}.metric-card,.card{border-radius:12px}.card-head,.card-body{padding-left:12px;padding-right:12px}.funnel-row{grid-template-columns:76px minmax(0,1fr) 48px;gap:7px}.flabel,.fval{font-size:11px}.invoice-card{padding:0 6px!important}.tax-invoice{min-width:680px;font-size:10px}.drawer-head{padding:14px 12px}.drawer-body{padding:12px}.modal-overlay{padding:6px}.modal-head,.modal-body,.modal-foot{padding-left:12px;padding-right:12px}.settings-nav{border-radius:12px}.nav-item{min-width:68px}.att-row{min-width:660px}.profile-metrics{grid-template-columns:1fr}.crow{align-items:flex-start}.who{min-width:0}.who>div{min-width:0}.who .cell-name,.who .cell-sub{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.collection-box strong{font-size:21px}}
    `}</style>
  );
}
