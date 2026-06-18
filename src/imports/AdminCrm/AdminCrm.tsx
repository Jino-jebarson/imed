import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import imedLogo from "../Ocha/36b610493eb683f0e81e17848fd143c365f117fd.png";
import IMedCertificate from "./IMedCertificate";
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
  ChevronRight,
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
  UserRound,
  UserPlus,
  Users,
} from "lucide-react";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");
const stages = ["New Lead", "Contacted", "Demo / Visit", "Counselling", "Enrolled", "In Training", "Course Completed", "Placed"];
const studentStatuses = ["Enrolled", "In Training", "Course Completed", "Placed"];
const sources = ["Meta", "BTL", "College", "Referral"];
const courseFees: Record<string, number> = { HA: 35000, EMT: 35000, GDA: 18000, OCHA: 30000, ACHA: 25000 };
const osCentres = ["Delhi", "Kochi", "Bangalore"];
const osCourses = ["HA", "EMT", "GDA", "OCHA", "ACHA"];
const leadDocumentMaxSize = 2 * 1024 * 1024;
const leadDocumentHelpText = "Supported: PDF, JPG, JPEG, PNG, WEBP. Max 2 MB.";

type ApiResult<T> = { ok: boolean; data?: T; message?: string; token?: string; user?: AdminUser };
type AdminUser = { name: string; email: string; role: string };
type DocumentFile = { originalName?: string; storedName?: string; mimeType?: string; size?: number; uploadedAt?: string };
type Lead = { _id: string; fullName: string; phone: string; parentMobile?: string; email?: string; governmentProof?: DocumentFile; highestQualificationCertificate?: DocumentFile; source?: string; centre?: string; course?: string; counsellor?: string; stage: string; priority?: string; city?: string; expectedFee?: number; notes?: string; createdAt?: string; updatedAt?: string };
type Student = { _id: string; fullName: string; phone: string; parentMobile?: string; email?: string; governmentProof?: DocumentFile; highestQualificationCertificate?: DocumentFile; centre?: string; course?: string; counsellor?: string; batch?: string; batchCommenceDate?: string; status: string; totalFee?: number; paidAmount?: number; admissionNumber?: string; discountAmount?: number; emiEnabled?: boolean; emiMonths?: number; emiAmount?: number; nextEmiDate?: string; certificateNumber?: string; certificateIssuedAt?: string; certificateStatus?: string; createdAt?: string; updatedAt?: string };
type Centre = { _id: string; name: string; city?: string };
type Course = { _id: string; name: string; fee?: number; duration?: string };
type Counsellor = { _id?: string; name: string; email: string; role: string };
type Batch = { _id: string; name: string; centre?: string; course?: string; commenceDate: string };
type Summary = { leadsThisMonth: number; totalLeads: number; enrolled: number; training: number; placed: number; lost: number; students: number; conversion: number; revenue: number; pending: number };
type Panel = "dashboard" | "leads" | "add" | "admissions" | "students" | "batchStrength" | "finance" | "emi" | "receipts" | "certificates" | "settings" | "profile";
type RoleScope = "admin" | "delhi" | "kochi" | "bangalore";
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

function documentLabel(document?: DocumentFile) {
  return document?.originalName || "Not uploaded";
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
  const [roleScope, setRoleScope] = useState<RoleScope>("admin");
  const [profile, setProfile] = useState<ProfileTarget>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [funnel, setFunnel] = useState<{ stage: string; count: number }[]>([]);
  const [centreStats, setCentreStats] = useState<{ centre: string; leads: number; enrolled: number }[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [centres, setCentres] = useState<Centre[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [filters, setFilters] = useState({ q: "", stage: "", centre: "", course: "" });
  const [selectedDate, setSelectedDate] = useState("");
  const isSuperAdmin = user?.role === "superadmin";
  const authedHeaders = useMemo(() => ({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }), [token]);
  const scopedCentre = roleScope === "delhi" ? "Delhi" : roleScope === "kochi" ? "Kochi" : roleScope === "bangalore" ? "Bangalore" : "";
  const scopedCounsellor = "";
  const roleLabel = roleScope === "admin" ? "Admin - all centres" : `Centre Head - ${scopedCentre}`;

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
    if (!isSuperAdmin) {
      setCounsellors([]);
      return;
    }
    const res = await api<Counsellor[]>("/api/admin/counsellors", { headers: authedHeaders });
    setCounsellors(res.data || []);
  };

  const loadDashboard = async () => {
    const query = { centre: scopedCentre, counsellor: scopedCounsellor, date: selectedDate };
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
  const loadLeads = async () => {
    const query = { ...filters, centre: scopedCentre || filters.centre, counsellor: scopedCounsellor, date: selectedDate };
    const params = new URLSearchParams(Object.entries(query).filter(([, value]) => value));
    const res = await api<Lead[]>(`/api/admin/leads?${params.toString()}`, { headers: authedHeaders });
    setLeads(res.data || []);
  };

  const loadStudents = async () => {
    const params = new URLSearchParams(Object.entries({ centre: scopedCentre, counsellor: scopedCounsellor, date: selectedDate }).filter(([, value]) => value));
    const res = await api<Student[]>(`/api/admin/students?${params.toString()}`, { headers: authedHeaders });
    setStudents(res.data || []);
  };

  const refreshAll = async () => {
    if (!token) return;
    try {
      await Promise.all([loadMeta(), loadDashboard(), loadLeads(), loadStudents(), loadCounsellors()]);
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

  useEffect(() => { void refreshAll(); }, [token]);
  useEffect(() => { if (token) void refreshAll(); }, [roleScope, selectedDate]);
  useEffect(() => { if (token && isSuperAdmin) void loadCounsellors(); }, [token, isSuperAdmin]);
  useEffect(() => { if (token) void loadLeads(); }, [filters.stage, filters.centre, filters.course]);

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
    formData.set("expectedFee", String(courseFees[course] || 25000));
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
        body: JSON.stringify({ totalFee: lead.expectedFee || courseFees[lead.course || ""] || 25000 }),
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

  const addCounsellor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      await api<Counsellor>("/api/admin/counsellors", { method: "POST", headers: authedHeaders, body: JSON.stringify(payload) });
      form.reset();
      toast.success("Counsellor added");
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

  const logout = () => {
    localStorage.removeItem("imed_crm_token");
    setToken("");
    setUser(null);
  };

  const openProfile = (target: ProfileTarget) => {
    if (!target) return;
    setProfile(target);
    setPreviousPanel(panel);
    setPanel("profile");
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
        <button className="sidebar-toggle" type="button" aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} onClick={() => setSidebarCollapsed((collapsed) => !collapsed)}>
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <div className="brand-block">
          <div className="imed-navbar-brand sidebar-brand-logo" aria-label="iMED Academy">
            <img src={imedLogo} alt="" />
            <span><b>iMED</b> <strong>Academy</strong></span>
          </div>
        </div>
        <nav className="crm-nav">
          {navGroups.map((group) => (
            <div className="nav-section" key={group.group}>
              <p className="nav-group-label">{group.group}</p>
              {group.items.filter((item) => item.key !== "settings" || isSuperAdmin).map((item) => (
                <button key={item.key} className={panel === item.key ? "active" : ""} onClick={() => setPanel(item.key)}>
                  {item.icon}<span>{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button onClick={logout}><LogOut size={17} /> <span>Logout</span></button>
        </div>
      </aside>

      <section className="crm-main">
        <header className="crm-topbar">
          <div>
            
            <h1>{panelLabel(panel)}</h1>
            <span className="subline">{roleLabel}</span>
          </div>
          <div className="top-actions">
            <select className="scope-select" value={roleScope} onChange={(event) => setRoleScope(event.target.value as RoleScope)}>
              <option value="admin">Admin (all centres)</option>
              <option value="delhi">Centre Head - Delhi</option>
              <option value="kochi">Centre Head - Kochi</option>
              <option value="bangalore">Centre Head - Bangalore</option>
            </select>
            <input className="top-date-filter" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} aria-label="Filter by date" />
            {selectedDate && <button className="date-clear-btn" onClick={() => setSelectedDate("")}>Clear</button>}
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
                <div className="panel"><h3>Performance by centre</h3>{osCentres.map((centre) => {
                  const centreLeads = leads.filter((lead) => lead.centre === centre);
                  const centreEnrolled = centreLeads.filter((lead) => ["Enrolled", "In Training", "Placed"].includes(lead.stage)).length + students.filter((student) => student.centre === centre).length;
                  const percent = centreLeads.length ? Math.round((centreEnrolled / centreLeads.length) * 100) : 0;
                  return <div className="crow" key={centre}><div><div className="nm">{centre}</div><div className="mt">{centreLeads.length} leads - {centreEnrolled} enrolled</div></div><span className="pct">{percent}%</span></div>;
                })}</div>
                <div className="panel"><h3>Recent admissions</h3>{students.slice(0, 5).map((student) => <div className="crow" key={student._id}><div className="who"><span className="mini">{initials(student.fullName)}</span><div><div className="nm">{student.fullName}</div><div className="mt">{student.course || "-"} - {student.centre || "-"}</div></div></div><span className={`tag ${tagClass(student.status)}`}>{student.status}</span></div>)}{!students.length && <p className="empty-state">No recent admissions</p>}</div>
              </div>
            </div>
          );
        })()}
        {panel === "leads" && (
          <div className="panel-stack">
            <div className="toolbar"><div className="search"><Search size={17} /><input value={filters.q} onChange={(event) => setFilters({ ...filters, q: event.target.value })} onKeyDown={(event) => { if (event.key === "Enter") void loadLeads(); }} placeholder="Search leads..." /></div><div className="toolbar-actions"><button className="btn secondary-btn" onClick={() => downloadLeadsExcel(leads)}><Download size={17} /> Download Excel</button><button className="btn" onClick={() => setPanel("add")}><Plus size={17} /> Add lead</button></div></div>
            <section className="card-table-wrap">
              <LeadTable leads={leads} onStage={patchLead} onConvert={convertLead} onOpen={(lead) => openProfile({ type: "lead", data: lead })} isSuperAdmin={isSuperAdmin} counsellors={counsellors} onAssignCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })} />
            </section>
            <p className="table-foot">Showing {leads.length} leads - click a row to open profile</p>
          </div>
        )}
        {panel === "add" && (
          <section className="crm-card">
            <div className="ok-banner"><CheckCircle2 size={18} /> Lead saved to the system</div>
            <h2><Plus size={21} /> Add new lead</h2>
            <LeadForm onSubmit={addLead} />
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
              onAssignCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })}
              showAction
            />
          </section>
        )}

        {panel === "batchStrength" && (
          <section className="crm-card">
            <h2><Users size={21} /> Batch strength</h2>
            <p className="card-note">Check how many students are assigned to each batch. Select a batch to view the student names.</p>
            <BatchStrengthPanel batches={batches} students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
          </section>
        )}

        {panel === "students" && <section className="crm-card"><div className="section-head compact-head"><h2><GraduationCap size={21} /> All students</h2><button className="btn secondary-btn" onClick={() => downloadStudentsExcel(students)}><Download size={17} /> Download Excel</button></div><StudentTable students={students} onStatus={patchStudent} onOpen={(student) => openProfile({ type: "student", data: student })} /></section>}

        {panel === "finance" && (
          <section className="crm-card"><h2><BadgeIndianRupee size={21} /> Finance</h2><FinancePanel students={students} /></section>
        )}

        {panel === "emi" && (
          <section className="crm-card">
            <div className="section-head compact-head"><h2><CalendarDays size={21} /> EMI reminders</h2><button className="btn secondary-btn" onClick={() => downloadEmiRemindersExcel(students)}><Download size={17} /> Download Excel</button></div>
            <p className="card-note">Students whose EMI date is today or already overdue are shown first. Click Send reminder to open WhatsApp with the payment reminder.</p>
            <EmiReminderList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
          </section>
        )}

        {panel === "receipts" && (
          <section className="crm-card">
            <h2><ReceiptText size={21} /> Receipts</h2>
            <p className="card-note">Open a student profile and print/save the receipt from the profile view.</p>
            <ReceiptList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} />
          </section>
        )}

        {panel === "certificates" && (
          <section className="crm-card">
            <h2><Award size={21} /> Certificates</h2>
            <p className="card-note">Issue certificates for students whose course is completed, then print/save PDF or send a WhatsApp message.</p>
            <CertificateList students={students} onOpen={(student) => openProfile({ type: "student", data: student })} onIssue={issueCertificate} />
          </section>
        )}

        {panel === "profile" && (
          <ProfilePanel profile={profile} previousPanel={previousPanel} setPanel={setPanel} onConvert={convertLead} onIssueCertificate={issueCertificate} onPayment={addPayment} onUpdateStudent={patchStudent} isSuperAdmin={isSuperAdmin} counsellors={counsellors} batches={batches} onAssignCounsellor={assignStudentCounsellor} onAssignLeadCounsellor={(leadId, counsellor) => patchLead(leadId, { counsellor })} onAssignBatch={assignStudentBatch} onPrint={() => window.print()} />
        )}

        {panel === "settings" && isSuperAdmin && (
          <div className="crm-grid two">
            <section className="crm-card">
              <h2><UserPlus size={21} /> Counsellors</h2>
              <form className="inline-form counsellor-form" onSubmit={addCounsellor}>
                <input name="name" placeholder="Counsellor name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" minLength={8} required />
                <button>Add</button>
              </form>
              <div className="pill-list">{counsellors.map((item) => <span key={item.email}>{item.name}</span>)}{!counsellors.length && <p className="empty-state">No counsellors added yet.</p>}</div>
            </section>
            <section className="crm-card"><h2><Building2 size={21} /> Centres</h2><form className="inline-form" onSubmit={(event) => addCentreOrCourse(event, "centres")}><input name="name" placeholder="Centre name" required /><input name="city" placeholder="City" /><button>Add</button></form><div className="pill-list">{centres.map((item) => <span key={item._id}>{item.name}</span>)}</div></section>
            <section className="crm-card"><h2><BookOpen size={21} /> Courses</h2><form className="inline-form" onSubmit={(event) => addCentreOrCourse(event, "courses")}><input name="name" placeholder="Course name" required /><input name="fee" type="number" min="0" placeholder="Fee" /><button>Add</button></form><div className="pill-list">{courses.map((item) => <span key={item._id}>{item.name}</span>)}</div></section>
            <section className="crm-card">
              <h2><CalendarDays size={21} /> Batches</h2>
              <form className="inline-form counsellor-form" onSubmit={addBatch}>
                <input name="name" placeholder="Batch name" required />
                <select name="centre"><option value="">Centre</option>{osCentres.map((centre) => <option key={centre}>{centre}</option>)}</select>
                <select name="course"><option value="">Course</option>{osCourses.map((course) => <option key={course}>{course}</option>)}</select>
                <input name="commenceDate" type="date" required />
                <button>Add</button>
              </form>
              <div className="pill-list">{batches.map((item) => <span key={item._id}>{item.name} - {formatDate(item.commenceDate)}</span>)}{!batches.length && <p className="empty-state">No batches created yet.</p>}</div>
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

function LeadForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form className="lead-form os-form" onSubmit={onSubmit}>
      <label><span>Full name</span><input name="fullName" placeholder="Student name" required /></label>
      <label><span>Phone</span><input name="phone" placeholder="+91" required /></label>
      <label><span>Parent mobile no.</span><input name="parentMobile" placeholder="+91" /></label>
      <label className="file-field"><span>Any government proof</span><input name="governmentProof" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" /><small className="file-help">{leadDocumentHelpText}</small></label>
      <label className="file-field"><span>Highest educational qualification certificate</span><input name="highestQualificationCertificate" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" /><small className="file-help">{leadDocumentHelpText}</small></label>
      <label><span>Source</span><select name="source">{sources.map((source) => <option key={source}>{source}</option>)}</select></label>
      <label><span>Centre</span><select name="centre">{osCentres.map((centre) => <option key={centre}>{centre}</option>)}</select></label>
      <label><span>Course</span><select name="course">{osCourses.map((course) => <option key={course}>{course}</option>)}</select></label>
      <button><Plus size={17} /> Save lead</button>
    </form>
  );
}

function Filters({ filters, setFilters, onSearch }: { filters: { q: string; stage: string; centre: string; course: string }; setFilters: (filters: { q: string; stage: string; centre: string; course: string }) => void; centres: Centre[]; courses: Course[]; onSearch: () => void }) {
  return <div className="filters"><label><Search size={16} /><input value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} onKeyDown={(e) => { if (e.key === "Enter") onSearch(); }} placeholder="Search leads..." /></label><select value={filters.stage} onChange={(e) => setFilters({ ...filters, stage: e.target.value })}><option value="">All stages</option>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select><select value={filters.centre} onChange={(e) => setFilters({ ...filters, centre: e.target.value })}><option value="">All centres</option>{osCentres.map((centre) => <option key={centre}>{centre}</option>)}</select><select value={filters.course} onChange={(e) => setFilters({ ...filters, course: e.target.value })}><option value="">All courses</option>{osCourses.map((course) => <option key={course}>{course}</option>)}</select><button onClick={onSearch}>Search</button></div>;
}

function LeadTable({ leads, onStage, onConvert, onOpen, isSuperAdmin = false, counsellors = [], onAssignCounsellor, showAction = false }: { leads: Lead[]; onStage: (id: string, updates: Partial<Lead>) => void; onConvert: (lead: Lead) => void; onOpen: (lead: Lead) => void; compact?: boolean; isSuperAdmin?: boolean; counsellors?: Counsellor[]; onAssignCounsellor?: (leadId: string, counsellor: string) => void; showAction?: boolean }) {
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
          <span>{lead.centre || "-"}</span>
          <span>{lead.course || "-"}</span>
          {isSuperAdmin && <span><select value={lead.counsellor || ""} onClick={(e) => e.stopPropagation()} onChange={(e) => onAssignCounsellor?.(lead._id, e.target.value)}><option value="">Unassigned</option>{counsellors.map((counsellor) => <option key={counsellor.email} value={counsellor.name}>{counsellor.name}</option>)}</select></span>}
          <span><select value={lead.stage} onClick={(e) => e.stopPropagation()} onChange={(e) => onStage(lead._id, { stage: e.target.value })}>{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></span>
          {showAction && <span><button className="mini-btn" onClick={(e) => { e.stopPropagation(); onConvert(lead); }}>Admit <ArrowRight size={15} /></button></span>}
        </div>
      ))}
      {!leads.length && <p className="empty-state">No leads found yet.</p>}
    </div>
  );
}

function StudentTable({ students, onStatus, onOpen }: { students: Student[]; onStatus: (id: string, updates: Partial<Student>) => void; onOpen: (student: Student) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="crm-table"><div className="table-row student-row head"><span>Student</span><span>Admission</span><span>Course</span><span>Centre</span><span>Paid</span><span>Due</span><span>Status</span></div>{filteredStudents.map((student) => {
    const due = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0));
    return <div className="table-row student-row clickable-row" key={student._id} onClick={() => onOpen(student)}><span><strong>{student.fullName}</strong></span><span>{student.admissionNumber || student.phone}</span><span>{student.course || "-"}</span><span>{student.centre || "-"}</span><span>{formatCurrency(student.paidAmount || 0)}</span><span>{formatCurrency(due)}</span><span><select value={student.status} onClick={(e) => e.stopPropagation()} onChange={(e) => onStatus(student._id, { status: e.target.value })}>{studentStatuses.map((status) => <option key={status}>{status}</option>)}</select></span></div>;
  })}{!students.length && <p className="empty-state">No students yet</p>}{Boolean(students.length && !filteredStudents.length) && <p className="empty-state">No students match this search.</p>}</div>
  </div>;
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
              <span>{batch.course || "-"} / {batch.centre || "-"}</span>
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
              <span>{student.admissionNumber || student.phone} | {student.course || "-"} | {student.status}</span>
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
  return <div className="panel-stack"><div className="metric-grid"><Metric icon={<BadgeIndianRupee />} label="Total billed" value={formatCurrency(billed)} /><Metric icon={<CircleDollarSign />} label="Collected" value={formatCurrency(collected)} /><Metric icon={<ReceiptText />} label="Pending due" value={formatCurrency(due)} /><Metric icon={<GraduationCap />} label="Students" value={students.length} /></div><div className="section-title"><CircleDollarSign size={18} /> Fee collection</div><div className="crm-table"><div className="table-row finance-table-row head"><span>Student</span><span>Centre</span><span>Course</span><span>Fee</span><span>Paid</span><span>Due</span><span>Status</span></div>{students.map((student) => { const rowDue = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0) - (student.paidAmount || 0)); return <div className="table-row finance-table-row" key={student._id}><span>{student.fullName}</span><span>{student.centre || "-"}</span><span>{student.course || "-"}</span><span>{formatCurrency(student.totalFee || 0)}</span><span>{formatCurrency(student.paidAmount || 0)}</span><span>{formatCurrency(rowDue)}</span><span>{rowDue <= 0 ? "Paid" : "Partial"}</span></div>; })}{!students.length && <p className="empty-state">No students yet</p>}</div></div>;
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
  const activeEmis = students
    .filter((student) => student.emiEnabled && student.nextEmiDate && studentDueAmount(student) > 0)
    .map((student) => ({ student, due: studentDueAmount(student), emiDue: studentEmiDueAmount(student), days: daysBetweenToday(student.nextEmiDate) }))
    .sort((a, b) => a.days - b.days || a.student.fullName.localeCompare(b.student.fullName));
  const dueNow = activeEmis.filter((item) => item.days <= 0);
  const upcoming = activeEmis.filter((item) => item.days > 0 && item.days <= 7);
  return [...dueNow, ...upcoming];
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
        <Metric icon={<MessageCircle />} label="Upcoming 7 days" value={upcoming.length} />
      </div>
      <div className="finance-list">
        {rows.map(({ student, due, emiDue, days }) => (
          <div className="finance-row emi-reminder-row" key={student._id}>
            <button className="emi-student-link" onClick={() => onOpen(student)}>
              <strong>{student.fullName}</strong>
              <span>{student.phone} | {student.course || "-"} | {student.centre || "-"}</span>
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
        {!rows.length && <p className="empty-state">No EMI reminders due today. Upcoming reminders will appear here 7 days before the EMI date.</p>}
      </div>
    </div>
  );
}

function ReceiptList({ students, onOpen }: { students: Student[]; onOpen: (student: Student) => void }) {
  return <div className="finance-list">{students.map((student) => {
    const netFee = Math.max(0, (student.totalFee || 0) - (student.discountAmount || 0));
    const due = Math.max(0, netFee - (student.paidAmount || 0));
    return <div className="finance-row receipt-row" key={student._id}><div><strong>{student.fullName}</strong><span>{student.admissionNumber || "Admission pending"} - {student.course || "-"}</span></div><div><span>Paid {formatCurrency(student.paidAmount || 0)}</span><b>{due > 0 ? `Due ${formatCurrency(due)}` : "Paid in full"}</b></div><button className="mini-btn" onClick={() => onOpen(student)}><FileText size={15} /> View receipt</button></div>;
  })}{!students.length && <p className="empty-state">No receipts yet. Admit a lead first.</p>}</div>;
}

function CertificateList({ students, onOpen, onIssue }: { students: Student[]; onOpen: (student: Student) => void; onIssue: (student: Student) => void }) {
  const eligibleStudents = students.filter((student) => ["Course Completed", "Placed"].includes(student.status) || student.certificateStatus === "Issued");
  return <div className="finance-list">{eligibleStudents.map((student) => {
    const issued = student.certificateStatus === "Issued";
    return <div className="finance-row certificate-row" key={student._id}><div><strong>{student.fullName}</strong><span>{student.admissionNumber || "Admission pending"} - {student.course || "-"}</span></div><div><span>{issued ? student.certificateNumber : "Ready to issue"}</span><b>{issued ? `Issued ${formatDate(student.certificateIssuedAt)}` : student.status}</b></div><div className="row-actions"><button className="mini-btn ghost-mini" onClick={() => onOpen(student)}><FileText size={15} /> View</button>{issued ? <a className="mini-btn whatsapp-btn" href={whatsappWebUrl(student)} target="_blank" rel="noreferrer">WhatsApp Web</a> : <button className="mini-btn" onClick={() => onIssue(student)}><Award size={15} /> Issue</button>}</div></div>;
  })}{!eligibleStudents.length && <p className="empty-state">No completed students yet. Mark a student as Course Completed to issue a certificate.</p>}</div>;
}

function ProfilePanel({ profile, previousPanel, setPanel, onConvert, onIssueCertificate, onPayment, onUpdateStudent, isSuperAdmin, counsellors, batches, onAssignCounsellor, onAssignLeadCounsellor, onAssignBatch, onPrint }: { profile: ProfileTarget; previousPanel: Panel; setPanel: (panel: Panel) => void; onConvert: (lead: Lead) => void; onIssueCertificate: (student: Student) => void; onPayment: (event: FormEvent<HTMLFormElement>, studentId: string, sendWhatsapp?: boolean) => void; onUpdateStudent: (id: string, updates: Partial<Student>) => void; isSuperAdmin: boolean; counsellors: Counsellor[]; batches: Batch[]; onAssignCounsellor: (studentId: string, counsellor: string) => void; onAssignLeadCounsellor: (leadId: string, counsellor: string) => void; onAssignBatch: (studentId: string, batchName: string) => void; onPrint: () => void }) {
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [emiMonthsDraft, setEmiMonthsDraft] = useState("");
  const profileKey = profile ? `${profile.type}-${profile.data._id}` : "";

  useEffect(() => {
    setPaymentMode(profile?.type === "student" && profile.data.emiEnabled ? "EMI" : "Cash");
    setEmiMonthsDraft(profile?.type === "student" && profile.data.emiMonths ? String(profile.data.emiMonths) : "");
  }, [profileKey, profile]);

  if (!profile) return <section className="crm-card"><p className="empty-state">No profile selected.</p></section>;
  const isStudent = profile.type === "student";
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
  const handleEmiPlan = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isStudent) return;
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

  return (
    <div className="panel-stack">
      <section className="profile-card">
        <button className="mini-btn ghost-mini no-print" onClick={() => setPanel(previousPanel === "profile" ? "dashboard" : previousPanel)}>Back</button>
        <div className="profile-avatar">{initials(person.fullName)}</div>
        <div>
          <p className="eyebrow">{isStudent ? "Student profile" : "Lead profile"}</p>
          <h2>{person.fullName}</h2>
          <span>{person.course || "-"} | {person.centre || "-"} | {person.phone}</span>
        </div>
        <strong className="status-pill">{stage}</strong>
      </section>

      {isStudent ? (
        <div className="metric-grid three">
          <Metric icon={<BadgeIndianRupee />} label="Total fee" value={formatCurrency(totalFee)} />
          <Metric icon={<CircleDollarSign />} label="Paid" value={formatCurrency(paid)} />
          <Metric icon={<ReceiptText />} label="Pending due" value={formatCurrency(due)} />
        </div>
      ) : (
        <div className="metric-grid three">
          <Metric icon={<PhoneCall />} label="Source" value={profile.data.source || "-"} />
          <Metric icon={<UserRound />} label="Owner" value={ownerLabel(profile.data)} />
          <Metric icon={<BadgeIndianRupee />} label="Expected fee" value={formatCurrency(profile.data.expectedFee || 0)} />
        </div>
      )}

      <section className="crm-card">
        <h2><Sparkles size={21} /> Journey</h2>
        <Journey current={stage} />
      </section>

      <section className="crm-card">
        <h2><ClipboardList size={21} /> Lead documents</h2>
        <div className="lead-doc-grid">
          <div><span>Parent mobile no.</span><strong>{person.parentMobile || "-"}</strong></div>
          <div><span>Government proof</span><strong>{documentLabel(person.governmentProof)}</strong>{person.governmentProof?.storedName && <button className="mini-btn ghost-mini" onClick={() => handleDocumentDownload("governmentProof")}>Download</button>}</div>
          <div><span>Highest qualification certificate</span><strong>{documentLabel(person.highestQualificationCertificate)}</strong>{person.highestQualificationCertificate?.storedName && <button className="mini-btn ghost-mini" onClick={() => handleDocumentDownload("highestQualificationCertificate")}>Download</button>}</div>
        </div>
      </section>

      {isStudent && isSuperAdmin && (
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

      {isStudent && (
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

      {isStudent ? (
        <section className="receipt-card">
          <div className="receipt-head">
            <div><strong>iMED Academy</strong><span>Healthcare Skill Development</span></div>
            <div><b>RECEIPT</b><span>{profile.data.admissionNumber || "IMED-ADMISSION"}</span></div>
          </div>
          <div className="receipt-body">
            <p><b>Student:</b> {profile.data.fullName}</p>
            <p><b>Course:</b> {profile.data.course || "-"}</p>
            <p><b>Centre:</b> {profile.data.centre || "-"}</p>
            <p><b>Batch:</b> {profile.data.batch || "-"}{profile.data.batchCommenceDate ? ` | Commence: ${formatDate(profile.data.batchCommenceDate)}` : ""}</p>
            <div className="receipt-total"><span>Course fee</span><b>{formatCurrency(totalFee)}</b></div>
            <div className="receipt-total"><span>Discount</span><b>{formatCurrency(discount)}</b></div>
            <div className="receipt-total"><span>Paid</span><b>{formatCurrency(paid)}</b></div>
            <div className="receipt-grand"><span>{due > 0 ? "Balance due" : "Paid in full"}</span><b>{formatCurrency(due > 0 ? due : paid)}</b></div>
            {paymentMode === "EMI" && <div className="emi-plan no-print">
              <div className="emi-plan-head">
                <div>
                  <strong>{profile.data.emiEnabled ? "EMI plan is active" : "Set up EMI plan"}</strong>
                  <span>{profile.data.emiEnabled ? `${activeEmiMonths || 0} installment${(activeEmiMonths || 0) === 1 ? "" : "s"} planned from the current balance. Next reminder: ${profile.data.nextEmiDate ? formatDate(profile.data.nextEmiDate) : "date not set"}.` : "First record any upfront payment below, then split the remaining balance into monthly installments."}</span>
                </div>
                <div className="emi-plan-summary">
                  <span>Balance for EMI</span>
                  <b>{formatCurrency(due)}</b>
                </div>
              </div>
              <div className="emi-flow">
                <div><b>1</b><span>Course fee after discount</span><strong>{formatCurrency(netFee)}</strong></div>
                <div><b>2</b><span>Already paid upfront</span><strong>{formatCurrency(paid)}</strong></div>
                <div><b>3</b><span>Balance to split</span><strong>{formatCurrency(due)}</strong></div>
                <div><b>4</b><span>Monthly EMI</span><strong>{activeEmiMonths > 0 ? `${formatCurrency(displayEmiAmount)} x ${activeEmiMonths}` : "Enter months"}</strong></div>
              </div>
              <div className="emi-example">
                <strong>Example</strong>
                <span>If course fee is Rs.18,000 and student paid Rs.8,000 first, EMI balance is Rs.10,000. For 5 months, monthly EMI becomes Rs.2,000.</span>
              </div>
              <form className="emi-plan-form" onSubmit={handleEmiPlan}>
                <label><span>How many months?</span><input name="emiMonths" type="number" min="1" placeholder="Example: 5" value={emiMonthsDraft} onChange={(event) => setEmiMonthsDraft(event.target.value)} disabled={due <= 0} required /></label>
                <label><span>Monthly EMI to pay</span><input name="emiAmount" type="number" min="1" placeholder="Auto calculated" value={displayEmiAmount || ""} readOnly required /></label>
                <label><span>Next payment due on</span><input name="nextEmiDate" type="date" defaultValue={profile.data.nextEmiDate ? profile.data.nextEmiDate.slice(0, 10) : ""} disabled={due <= 0} /></label>
                <button className="mini-btn" type="submit" disabled={due <= 0}>Save EMI plan</button>
                {profile.data.emiEnabled && <button className="mini-btn ghost-mini" type="button" onClick={() => onUpdateStudent(profile.data._id, { emiEnabled: false, emiMonths: 0, emiAmount: 0, nextEmiDate: "" })}>Close EMI plan</button>}
              </form>
              {!paid && <p className="emi-warning">If the student paid an upfront amount, record that payment first using the form below. Then select EMI again so the balance is correct.</p>}
              {profile.data.emiEnabled && !savedEmiIsCurrent && activeEmiMonths > 0 && <p className="emi-warning">The balance or months changed. Save the EMI plan again to update the monthly EMI to {formatCurrency(displayEmiAmount)}.</p>}
              <p className="emi-help">Each month, record the payment below as an EMI installment. Students with due or overdue dates appear in EMI reminders.</p>
            </div>}
            <form className="payment-update-form no-print" onSubmit={(event) => onPayment(event, profile.data._id, true)}>
              <label><span>Amount paying</span><input name="amount" type="number" min="1" max={due || undefined} placeholder="Enter amount" required /></label>
              <label><span>Payment type</span><select name="mode" value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}><option>Cash</option><option>UPI</option><option>Card</option><option>Bank Transfer</option><option value="EMI">EMI installment / plan</option></select></label>
              <label><span>Note</span><input name="note" placeholder="Receipt note" /></label>
              <button className="mini-btn whatsapp-btn"><MessageCircle size={15} /> Update & WhatsApp</button>
            </form>
            <button className="mini-btn no-print" onClick={onPrint}><Printer size={15} /> Print / Save PDF</button>
          </div>
        </section>
      ) : (
        <section className="crm-card">
          <h2><ClipboardList size={21} /> Admission action</h2>
          <p className="card-note">Admitting this lead creates a student record and moves them into the student journey.</p>
          <button className="mini-btn" onClick={() => onConvert(profile.data)}>Admit this lead <ArrowRight size={15} /></button>
        </section>
      )}

      {isStudent && certificateReady && (
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
    .whatsapp-btn{background:#128c7e!important;color:#fff!important;text-decoration:none!important}
    .top-date-filter{height:34px;border:2px solid #111827;border-radius:9px;background:#fff;color:#061633;padding:0 10px;font:inherit;min-width:150px}
    .date-clear-btn{height:34px;border:1px solid #dfe6f0!important;border-radius:9px!important;background:#fff!important;color:#061633!important;padding:0 12px!important;font-weight:800!important}
    .lead-row-action{grid-template-columns:1.1fr .9fr .75fr .75fr .75fr .9fr auto!important}
    .lead-row-assigned{grid-template-columns:1.05fr .82fr .7fr .7fr .7fr .9fr .86fr!important}
    .lead-row-assigned-action{grid-template-columns:1.05fr .82fr .7fr .7fr .7fr .9fr .86fr auto!important}
    .counsellor-form{flex-wrap:wrap}
    .assignment-row{display:grid;grid-template-columns:1fr minmax(220px,320px);gap:14px;align-items:end}
    .assignment-row div{display:grid;gap:4px}
    .assignment-row span{color:#66728a}
    .assignment-row select{height:44px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);padding:0 12px}
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
    .emi-plan-form input{width:100%;height:44px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:0 12px;color:var(--ink);outline:none}
    .emi-plan-form input[readonly]{background:#f8fafc;color:#34415a}
    .emi-plan-form input:disabled{background:#f1f5f9;color:#94a3b8}
    .emi-plan-form input:focus{border-color:#0d6efd;box-shadow:0 0 0 3px rgba(13,110,253,.12)}
    .emi-warning{margin:0;border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px 12px;font-size:13px;line-height:1.45}
    .emi-help{margin:0;color:#66728a;font-size:13px;line-height:1.45}
    .payment-update-form{display:grid;grid-template-columns:1fr 150px 1fr auto;gap:10px;align-items:end;border-top:1px solid var(--line);margin-top:8px;padding-top:16px}
    .payment-update-form label{display:grid;gap:6px}
    .payment-update-form label span{font-size:12.5px;font-weight:800;color:#34415a}
    .payment-update-form input,.payment-update-form select{width:100%;height:44px;border:1px solid var(--line);background:#fff;border-radius:10px;padding:0 12px;color:var(--ink);outline:none}
    .payment-update-form input:focus,.payment-update-form select:focus{border-color:#0d6efd;box-shadow:0 0 0 3px rgba(13,110,253,.12)}
    .certificate-row{grid-template-columns:1.2fr 1fr auto}
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
    .secondary-btn{background:#fff!important;color:#0d6efd!important;border:1px solid #bfd3f4!important}
    .compact-head{align-items:center;margin-bottom:16px}
    .compact-head h2{margin:0!important}
    .lead-form.os-form{align-items:start}
    .lead-form.os-form label{grid-template-rows:16px 44px 16px;min-width:0}
    .lead-form.os-form input,.lead-form.os-form select{height:44px;width:100%;min-width:0;box-sizing:border-box}
    .lead-form.os-form input[type=file]{display:flex;align-items:center;padding:9px 12px}
    .lead-form.os-form button{height:44px;align-self:end;margin-top:22px}
    .file-help{color:#66728a;font-size:11.5px;line-height:1.35;margin-top:-2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .sidebar-toggle{position:absolute;right:-14px;top:22px;z-index:60;width:30px;height:30px;border:1px solid #dfe6f0;background:#fff;color:#0d6efd;border-radius:999px;display:grid;place-items:center;padding:0;box-shadow:0 10px 24px rgba(17,33,61,.16)}
    .crm-sidebar,.crm-main{transition:width .18s ease,margin-left .18s ease}
    .sidebar-collapsed .crm-sidebar{width:74px!important}
    .sidebar-collapsed .crm-main{margin-left:74px!important}
    .sidebar-collapsed .brand-block{justify-content:center!important;padding:0!important}
    .sidebar-collapsed .sidebar-brand-logo span,.sidebar-collapsed .nav-group-label,.sidebar-collapsed .crm-nav button span,.sidebar-collapsed .sidebar-bottom button span{display:none!important}
    .sidebar-collapsed .crm-nav button,.sidebar-collapsed .sidebar-bottom button{justify-content:center!important;padding:13px!important}
    .sidebar-collapsed .sidebar-brand-logo img{width:34px!important;height:34px!important}
    @media print{@page{size:A4 landscape;margin:0}.certificate-card{box-shadow:none;border:0;padding:0;overflow:visible}.imed-certificate-exact-frame{box-shadow:none;break-inside:avoid}body.print-certificate-only{background:#fff!important}body.print-certificate-only .crm-sidebar,body.print-certificate-only .crm-topbar,body.print-certificate-only .no-print,body.print-certificate-only .profile-card,body.print-certificate-only .metric-grid,body.print-certificate-only .crm-card,body.print-certificate-only .receipt-card{display:none!important}body.print-certificate-only .crm-main{margin:0!important;padding:0!important;background:#fff!important}body.print-certificate-only .panel-stack{display:block!important;padding:0!important}body.print-certificate-only .certificate-card{display:block!important;margin:0!important;padding:0!important;border:0!important;overflow:visible!important}body.print-certificate-only .imed-certificate-exact-frame{width:1220px!important;height:862.49px!important;margin:0!important;box-shadow:none!important}}
    @media(max-width:960px){.payment-update-form{grid-template-columns:1fr 1fr}.payment-update-form button{grid-column:1/-1}.emi-flow{grid-template-columns:repeat(2,minmax(0,1fr))}.emi-plan-form{grid-template-columns:1fr 1fr}.emi-plan-form button{grid-column:span 1}.batch-strength-grid{grid-template-columns:1fr}.batch-count-list{overflow:auto}}
    @media(max-width:760px){.certificate-row,.assignment-row,.emi-reminder-row{grid-template-columns:1fr!important}.certificate-card{padding:12px}.imed-certificate-exact-frame{margin:0}.batch-picker{display:grid}.toolbar-actions{justify-content:stretch}.toolbar-actions .btn,.compact-head .btn{width:100%}.compact-head{display:grid!important}}
    @media(max-width:620px){.payment-update-form,.emi-plan-form,.emi-plan-head,.emi-flow{grid-template-columns:1fr}.emi-plan-form button{grid-column:auto}.emi-example{display:grid}}
  `}</style>
  </>
}


























