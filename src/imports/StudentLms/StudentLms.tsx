import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { Bell, BookOpen, CalendarDays, Camera, CheckCircle2, ChevronLeft, ChevronRight, Clock, Download, ExternalLink, Eye, EyeOff, FileText, IndianRupee, LayoutDashboard, Lightbulb, LogOut, MessageSquareText, NotebookPen, Star, Stethoscope, UserRound, X } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Toaster, toast } from "sonner";

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");

type Student = { _id: string; fullName: string; phone?: string; email?: string; admissionNumber?: string; course?: string; centre?: string; batch?: string; status?: string; totalFee?: number; paidAmount?: number; discountAmount?: number };
type Batch = { _id: string; name: string; course?: string; centre?: string; assignedFaculty?: string[]; commenceDate?: string };
type ClassSession = { _id: string; batchName: string; nature: "Theoretical" | "Practical"; faculty?: string; date: string; startTime: string; endTime: string; attendanceMarked?: boolean };
type Attendance = { _id: string; date: string; nature?: string; status: "Present" | "Absent" | "Late" | "Leave"; note?: string };
type Topic = { _id: string; module: string; topic: string; status: "Not Started" | "In Progress" | "Covered"; dateCovered?: string; faculty?: string };
type Practical = { _id: string; module?: string; practicalName: string; status: "Pending" | "Completed" | "Needs Repeat"; remarks?: string; dateConducted?: string; faculty?: string };
type StudyNote = { _id: string; batchId?: string; batchName?: string; title: string; module?: string; description?: string; file?: { originalName?: string; mimeType?: string; size?: number; uploadedAt?: string }; referenceUrl?: string; resourceType?: "File" | "Video" | "Reference"; uploadedBy?: string; createdAt?: string };
type Internship = { _id: string; facilityName: string; facilityLocation?: string; supervisorName?: string; supervisorContact?: string; supervisorEmail?: string; facilityLatitude?: number; facilityLongitude?: number; allowedRadiusMeters?: number; startDate: string; expectedEndDate: string; status: string; departmentRotation?: string };
type InternshipLog = { _id: string; date: string; loginAt?: string; logoutAt?: string; loginGps?: string; logoutGps?: string; hours?: number; flagged?: boolean };
type LogbookEntry = { _id: string; date: string; departmentArea: string; activitiesPerformed: string; keyLearnings: string; challenges?: string; supervisorRemark?: string; verified?: boolean; verifiedBy?: string; verifiedAt?: string; createdAt?: string };
type NpsTouchpoint = "mid_course" | "post_classroom" | "post_internship";
type NpsResponse = { _id?: string; touchpoint: NpsTouchpoint; label?: string; npsScore: number; npsCategory?: string; attrTeachingQuality?: number; attrContentRelevance?: number; attrPracticalTraining?: number; attrSupportInfra?: number; attrPlacementAssistance?: number; openFeedback?: string; submittedAt?: string };
type NpsEligibilityItem = { touchpoint: NpsTouchpoint; label: string; eligible: boolean; submitted: boolean; required: boolean; reason?: string; availableSince?: string; response?: NpsResponse | null };
type NpsState = { pending?: NpsEligibilityItem | null; items?: NpsEligibilityItem[] };
type LmsData = { student: Student; batch?: Batch | null; phase: string; summary: { attendanceHeld: number; attended: number; attendancePercent: number; topicTotal: number; coveredTopics: number; topicPercent: number; practicalTotal: number; completedPracticals: number; practicalPercent: number; nextClass?: ClassSession | null }; sessions: ClassSession[]; attendance: Attendance[]; topics: Topic[]; practicals: Practical[]; studyNotes: StudyNote[]; internship?: Internship | null; internshipLogs: InternshipLog[]; logbookEntries: LogbookEntry[]; nps?: NpsState; npsResponses?: NpsResponse[] };
type PaginationMeta = { total?: number; page?: number; limit?: number; pages?: number; totalPages?: number };
type Tab = "dashboard" | "timetable" | "attendance" | "progress" | "notes" | "feedback" | "internship" | "logbook";

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new Error(json.message || "Request failed");
  return json.data !== undefined ? json.data : json;
}

async function apiEnvelope<T>(path: string, options: RequestInit = {}): Promise<{ data: T; meta?: PaginationMeta }> {
  const res = await fetch(`${API_BASE_URL}${path}`, options);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.ok === false) throw new Error(json.message || "Request failed");
  return { data: json.data, meta: json.meta };
}

function studentLoginToastMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid admission number") || normalized.includes("invalid email") || normalized.includes("invalid credentials")) {
    return "Invalid credentials. Check the admission number and registered phone.";
  }
  if (normalized.includes("admission number and phone")) {
    return "Enter admission number and registered phone.";
  }
  if (normalized.includes("student lms access is not generated")) {
    return "Student LMS access is not generated yet. Please contact admin.";
  }
  if (normalized.includes("invalid student session") || normalized.includes("student login required")) {
    return "Your session expired. Please sign in again.";
  }
  return message || "Unable to login";
}

function formatDate(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function formatDateTime(value?: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatDateParts(value?: string) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return { day: "-", month: "-", weekday: "-" };
  return {
    day: new Intl.DateTimeFormat("en-IN", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-IN", { month: "short" }).format(date),
    weekday: new Intl.DateTimeFormat("en-IN", { weekday: "short" }).format(date),
  };
}

function dateInputKey(value: string | Date = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatRunningTime(totalSeconds: number) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${remainingSeconds}`;
}

function hasFaceLikeFrame(video: HTMLVideoElement) {
  if (!video.videoWidth || !video.videoHeight) return false;
  const canvas = document.createElement("canvas");
  const width = 128;
  const height = 128;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return false;
  context.drawImage(video, 0, 0, width, height);
  const data = context.getImageData(0, 0, width, height).data;
  let facePixels = 0;
  let faceSum = 0;
  let faceSquares = 0;
  let skinLike = 0;
  let darkEyeBand = 0;
  let leftSum = 0;
  let rightSum = 0;
  let leftCount = 0;
  let rightCount = 0;
  let backgroundSum = 0;
  let backgroundCount = 0;

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const brightness = (r + g + b) / 3;
      const nx = (x - 64) / 34;
      const ny = (y - 66) / 46;
      const insideFaceOval = nx * nx + ny * ny <= 1;
      if (!insideFaceOval) {
        if ((x < 22 || x > 106) && (y < 28 || y > 100)) {
          backgroundSum += brightness;
          backgroundCount += 1;
        }
        continue;
      }
      facePixels += 1;
      faceSum += brightness;
      faceSquares += brightness * brightness;
      if (x < 64) {
        leftSum += brightness;
        leftCount += 1;
      } else {
        rightSum += brightness;
        rightCount += 1;
      }
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (r > 30 && g > 22 && b > 16 && r >= g * 0.78 && r >= b * 0.98 && max - min > 8) skinLike += 1;
      if (y >= 46 && y <= 68 && x >= 36 && x <= 92 && brightness < 82) darkEyeBand += 1;
    }
  }

  if (!facePixels) return false;
  const average = faceSum / facePixels;
  const variance = faceSquares / facePixels - average * average;
  const skinRatio = skinLike / facePixels;
  const eyeDarkRatio = darkEyeBand / Math.max(1, facePixels * 0.24);
  const backgroundAverage = backgroundCount ? backgroundSum / backgroundCount : average;
  const leftAverage = leftCount ? leftSum / leftCount : average;
  const rightAverage = rightCount ? rightSum / rightCount : average;
  const symmetricEnough = Math.abs(leftAverage - rightAverage) < 42;
  const separatedFromBackground = Math.abs(backgroundAverage - average) > 7 || variance > 260;
  const hasFacialTexture = variance > 150 && (skinRatio > 0.035 || eyeDarkRatio > 0.16);
  return symmetricEnough && separatedFromBackground && hasFacialTexture;
}

function getOptionalLocation() {
  return new Promise<string>((resolve) => {
    if (!navigator.geolocation) {
      resolve("");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve(`${latitude.toFixed(6)},${longitude.toFixed(6)}${Number.isFinite(accuracy) ? `; accuracy ${Math.round(accuracy)}m` : ""}`);
      },
      () => resolve(""),
      { enableHighAccuracy: true, timeout: 3500, maximumAge: 60000 },
    );
  });
}

function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "ST";
}

function groupedTopics(topics: Topic[]) {
  return topics.reduce<Record<string, Topic[]>>((groups, topic) => {
    const module = topic.module || "General";
    groups[module] = [...(groups[module] || []), topic];
    return groups;
  }, {});
}

const internshipPendingAnimation = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 90,
  w: 240,
  h: 240,
  nm: "Internship pending",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Pulse",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [120, 120, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 1, k: [{ t: 0, s: [88, 88, 100], e: [108, 108, 100] }, { t: 45, s: [108, 108, 100], e: [88, 88, 100] }, { t: 90, s: [88, 88, 100] }] },
      },
      ao: 0,
      shapes: [{ ty: "gr", it: [{ ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [145, 145] } }, { ty: "fl", c: { a: 0, k: [0.325, 0.419, 1, 1] }, o: { a: 0, k: 18 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] }],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Badge",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 1, k: [{ t: 0, s: [120, 118, 0], e: [120, 110, 0] }, { t: 45, s: [120, 110, 0], e: [120, 118, 0] }, { t: 90, s: [120, 118, 0] }] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        { ty: "gr", it: [{ ty: "rc", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [108, 118] }, r: { a: 0, k: 18 } }, { ty: "fl", c: { a: 0, k: [1, 1, 1, 1] }, o: { a: 0, k: 100 } }, { ty: "st", c: { a: 0, k: [0.86, 0.89, 0.95, 1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] },
        { ty: "gr", it: [{ ty: "rc", p: { a: 0, k: [0, -18] }, s: { a: 0, k: [68, 10] }, r: { a: 0, k: 5 } }, { ty: "fl", c: { a: 0, k: [0.325, 0.419, 1, 1] }, o: { a: 0, k: 100 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] },
        { ty: "gr", it: [{ ty: "rc", p: { a: 0, k: [0, 8] }, s: { a: 0, k: [54, 8] }, r: { a: 0, k: 4 } }, { ty: "fl", c: { a: 0, k: [0.094, 0.659, 0.537, 1] }, o: { a: 0, k: 100 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] },
        { ty: "gr", it: [{ ty: "rc", p: { a: 0, k: [0, 31] }, s: { a: 0, k: [36, 8] }, r: { a: 0, k: 4 } }, { ty: "fl", c: { a: 0, k: [0.96, 0.65, 0.14, 1] }, o: { a: 0, k: 100 } }, { ty: "tr", p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }] },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

function StatusPill({ value }: { value: string }) {
  const key = value.toLowerCase().replace(/\s+/g, "-");
  return <span className={`slms-pill ${key}`}>{value}</span>;
}

type StudentNotification = { id: string; title: string; message: string; tone: "blue" | "green" | "amber" | "red"; meta: string };
type InternshipDuty = { status: "login" | "logout" | "logbook"; title: string; message: string; cta: string };
type NotificationStore = { read: string[]; dismissed: string[] };

function money(value: number) {
  return `Rs ${new Intl.NumberFormat("en-IN").format(Math.max(0, Math.round(value || 0)))}`;
}

function internshipDutyForToday(data: LmsData): InternshipDuty | null {
  if (!data.internship || !["Assigned", "Active"].includes(data.internship.status)) return null;
  const todayKey = dateInputKey();
  const startKey = dateInputKey(data.internship.startDate);
  const endKey = dateInputKey(data.internship.expectedEndDate);
  if ((startKey && todayKey < startKey) || (endKey && todayKey > endKey)) return null;
  const todayLog = data.internshipLogs.find((log) => dateInputKey(log.date) === todayKey);
  const todayLogbook = data.logbookEntries.find((entry) => dateInputKey(entry.date) === todayKey);
  if (!todayLog?.loginAt) {
    return {
      status: "login",
      title: "Today's internship attendance is required",
      message: "Start your hospital duty with a live selfie check-in.",
      cta: "Go to Log In",
    };
  }
  if (!todayLog.logoutAt) {
    return {
      status: "logout",
      title: "Internship logout is pending",
      message: "You are currently logged in. Complete logout with selfie after duty.",
      cta: "Go to Log Out",
    };
  }
  if (!todayLogbook) {
    return {
      status: "logbook",
      title: "Today's logbook is required",
      message: "Submit today's activities and key learnings to complete your internship day.",
      cta: "Submit Logbook",
    };
  }
  return null;
}

function studyNoteNotification(note: StudyNote): StudentNotification {
  return {
    id: `study-note-${note._id}`,
    title: note.resourceType === "Video" ? "New video shared" : note.resourceType === "Reference" ? "New reference shared" : "New study note shared",
    message: `${note.title}${note.module ? ` for ${note.module}` : ""}`,
    tone: "blue",
    meta: note.uploadedBy ? `By ${note.uploadedBy}` : "Study material",
  };
}

function buildNotifications(data: LmsData): StudentNotification[] {
  const notifications: StudentNotification[] = [];
  const todayKey = dateInputKey();
  const nextClass = data.summary.nextClass;
  const finalFee = Math.max(0, Number(data.student.totalFee || 0) - Number(data.student.discountAmount || 0));
  const paidFee = Number(data.student.paidAmount || 0);
  const balance = Math.max(0, finalFee - paidFee);
  const todayInternshipLog = data.internshipLogs.find((log) => dateInputKey(log.date) === todayKey);
  const todayLogbook = data.logbookEntries.find((entry) => dateInputKey(entry.date) === todayKey);
  const internshipDuty = internshipDutyForToday(data);
  const pendingLogbookCount = data.logbookEntries.filter((entry) => !entry.verified).length;
  if (data.nps?.pending) {
    notifications.push({
      id: `nps-${data.nps.pending.touchpoint}`,
      title: "Feedback required",
      message: `${data.nps.pending.label} is ready. Submit it to continue your learning journey.`,
      tone: "amber",
      meta: "Required",
    });
  }

  if (nextClass) {
    notifications.push({
      id: `class-${nextClass._id}`,
      title: "Upcoming class",
      message: `${nextClass.nature} class on ${formatDate(nextClass.date)} from ${nextClass.startTime} to ${nextClass.endTime}.`,
      tone: "blue",
      meta: nextClass.faculty ? `Faculty: ${nextClass.faculty}` : "Classroom",
    });
  }

  (data.studyNotes || []).slice(0, 3).forEach((note) => {
    notifications.push(studyNoteNotification(note));
  });

  if (balance > 0) {
    notifications.push({
      id: "fees-balance",
      title: "Fee balance pending",
      message: `${money(balance)} is pending from your final payable fee.`,
      tone: "amber",
      meta: `${money(paidFee)} paid`,
    });
  } else if (finalFee > 0) {
    notifications.push({
      id: "fees-complete",
      title: "Fees completed",
      message: "Your fee payment is fully paid in the LMS.",
      tone: "green",
      meta: money(finalFee),
    });
  }

  if (data.internship) {
    if (internshipDuty?.status === "login") {
      notifications.push({
        id: "internship-login-required",
        title: internshipDuty.title,
        message: internshipDuty.message,
        tone: "amber",
        meta: "Required today",
      });
    } else if (todayInternshipLog?.loginAt && !todayInternshipLog.logoutAt) {
      notifications.push({
        id: "internship-logout",
        title: "Internship logout pending",
        message: "You are logged in for internship today. Complete logout with selfie after duty.",
        tone: "amber",
        meta: "Action needed",
      });
    } else if (todayInternshipLog?.loginAt && todayInternshipLog.logoutAt && !todayLogbook) {
      notifications.push({
        id: "today-logbook-pending",
        title: "Today's logbook pending",
        message: "Submit today's internship logbook to complete your hospital duty record.",
        tone: "amber",
        meta: "Required today",
      });
    } else if (!todayInternshipLog?.loginAt) {
      notifications.push({
        id: "internship-checkin",
        title: "Internship check-in",
        message: `Check in when you reach ${data.internship.facilityName}.`,
        tone: "blue",
        meta: data.internship.status || "Assigned",
      });
    }
  }

  if (pendingLogbookCount > 0) {
    notifications.push({
      id: "logbook-review",
      title: "Logbook under review",
      message: `${pendingLogbookCount} logbook ${pendingLogbookCount === 1 ? "entry is" : "entries are"} waiting for faculty review.`,
      tone: "amber",
      meta: "Pending review",
    });
  }

  const pendingTopics = data.topics.filter((topic) => topic.status !== "Covered").length;
  if (pendingTopics > 0) {
    notifications.push({
      id: "topics-progress",
      title: "Syllabus progress",
      message: `${pendingTopics} topic${pendingTopics === 1 ? "" : "s"} still pending in your batch coverage.`,
      tone: "blue",
      meta: `${data.summary.topicPercent}% covered`,
    });
  }

  return notifications.slice(0, 8);
}

const NOTIFICATION_STORE_PREFIX = "imed_student_notifications:";

function notificationStorageKey(studentId?: string) {
  return `${NOTIFICATION_STORE_PREFIX}${studentId || "guest"}`;
}

function notificationKey(item: StudentNotification) {
  return [item.id, item.title, item.message, item.meta].join("::");
}

function readNotificationStore(key: string): NotificationStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "{}") as Partial<NotificationStore>;
    return {
      read: Array.isArray(parsed.read) ? parsed.read.filter(Boolean) : [],
      dismissed: Array.isArray(parsed.dismissed) ? parsed.dismissed.filter(Boolean) : [],
    };
  } catch {
    return { read: [], dismissed: [] };
  }
}

export default function StudentLms() {
  const [token, setToken] = useState(() => localStorage.getItem("imed_student_token") || "");
  const [data, setData] = useState<LmsData | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [loading, setLoading] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationTab, setNotificationTab] = useState<"unread" | "all">("unread");
  const [notificationStore, setNotificationStore] = useState<NotificationStore>({ read: [], dismissed: [] });
  const [notificationStoreLoadedKey, setNotificationStoreLoadedKey] = useState("");
  const [dutyPromptDismissedKey, setDutyPromptDismissedKey] = useState("");
  const notificationStoreKey = notificationStorageKey(data?.student?._id);

  const load = async (nextToken = token) => {
    if (!nextToken) return;
    setLoading(true);
    try {
      const response = await api<LmsData>("/api/student/me", { headers: { Authorization: `Bearer ${nextToken}` } });
      setData(response);
    } catch (error) {
      toast.error(studentLoginToastMessage(error));
      localStorage.removeItem("imed_student_token");
      setToken("");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void load(); }, []);

  useEffect(() => {
    setNotificationStore(readNotificationStore(notificationStoreKey));
    setNotificationStoreLoadedKey(notificationStoreKey);
  }, [notificationStoreKey]);

  useEffect(() => {
    if (notificationStoreLoadedKey !== notificationStoreKey) return;
    localStorage.setItem(notificationStoreKey, JSON.stringify(notificationStore));
  }, [notificationStore, notificationStoreKey, notificationStoreLoadedKey]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setLoading(true);
    try {
      const response = await api<{ token: string; student: Student }>("/api/student/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: formData.get("identifier"), phone: formData.get("phone") }),
      });
      localStorage.setItem("imed_student_token", response.token);
      setToken(response.token);
      await load(response.token);
    } catch (error) {
      toast.error(studentLoginToastMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("imed_student_token");
    setToken("");
    setData(null);
    setLogoutConfirmOpen(false);
    setSidebarOpen(false);
  };

  const changeTab = (nextTab: Tab) => {
    if (nextTab === "notes" && data?.studyNotes?.length) {
      const noteKeys = data.studyNotes.map((note) => notificationKey(studyNoteNotification(note)));
      setNotificationStore((current) => ({ ...current, read: Array.from(new Set([...current.read, ...noteKeys])) }));
    }
    setTab(nextTab);
    setSidebarOpen(false);
  };

  if (!token || !data) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <main className="slms-page slms-login-page">
          <StudentLmsStyles />
          <form className="slms-login-card" onSubmit={login}>
            <div className="slms-brand">
              <div className="brand-mark"><img src="/imed-logo.svg" alt="iMED Academy" /></div>
              <div className="brand-text"><b>iMED Academy</b></div>
            </div>
            <h1>Sign in to your classroom</h1>
            <p>Use your admission number and registered phone number.</p>
            <label>Admission number or email<input name="identifier" required placeholder="IMED-2026-0001" /></label>
            <label>Registered phone<input name="phone" required inputMode="tel" placeholder="10 digit mobile number" /></label>
            <button disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
          </form>
        </main>
      </>
    );
  }

  const modules = groupedTopics(data.topics);
  const student = data.student;
  const nextClass = data.summary.nextClass;
  const notifications = buildNotifications(data);
  const internshipDuty = internshipDutyForToday(data);
  const internshipDutyKey = internshipDuty ? `${dateInputKey()}-${internshipDuty.status}` : "";
  const readNotificationKeys = new Set(notificationStore.read);
  const dismissedNotificationKeys = new Set(notificationStore.dismissed);
  const activeNotifications = notifications.filter((item) => !dismissedNotificationKeys.has(notificationKey(item)));
  const unreadNotifications = activeNotifications.filter((item) => !readNotificationKeys.has(notificationKey(item)));
  const visibleNotifications = notificationTab === "unread" ? unreadNotifications : activeNotifications;
  const unreadNotificationCount = unreadNotifications.length;
  const unreadNotesCount = (data.studyNotes || []).filter((note) => !readNotificationKeys.has(notificationKey(studyNoteNotification(note))) && !dismissedNotificationKeys.has(notificationKey(studyNoteNotification(note)))).length;
  const pendingNps = data.nps?.pending || null;
  const hasUnseenNotifications = unreadNotificationCount > 0;
  const showDutyPrompt = Boolean(internshipDuty && tab !== "internship" && dutyPromptDismissedKey !== internshipDutyKey);

  const toggleNotifications = () => {
    setNotificationsOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) {
        const keys = activeNotifications.map(notificationKey);
        setNotificationStore((current) => ({ ...current, read: Array.from(new Set([...current.read, ...keys])) }));
        setNotificationTab("all");
      }
      return nextOpen;
    });
  };

  const markAllNotificationsRead = () => {
    const keys = activeNotifications.map(notificationKey);
    setNotificationStore((current) => ({ ...current, read: Array.from(new Set([...current.read, ...keys])) }));
    setNotificationTab("all");
  };

  const dismissNotification = (item: StudentNotification) => {
    const key = notificationKey(item);
    setNotificationStore((current) => ({
      read: Array.from(new Set([...current.read, key])),
      dismissed: Array.from(new Set([...current.dismissed, key])),
    }));
  };

  const goToInternshipDuty = () => {
    setTab(internshipDuty?.status === "logbook" ? "logbook" : "internship");
    setSidebarOpen(false);
    if (internshipDutyKey) setDutyPromptDismissedKey(internshipDutyKey);
  };

  return (
    <>
      <Toaster richColors position="top-right" />
      <main className="slms-page">
      <StudentLmsStyles />
      {sidebarOpen && <button type="button" className="slms-sidebar-backdrop" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}
      <aside className={`slms-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="slms-brand">
          <div className="brand-mark"><img src="/imed-logo.svg" alt="iMED Academy" /></div>
          <div className="brand-text"><b>iMED Academy</b></div>
          <button type="button" className="slms-sidebar-close" aria-label="Close menu" onClick={() => setSidebarOpen(false)}><X size={17} /></button>
        </div>
        <nav className="slms-nav-groups">
          <div className="slms-nav-group"><p>Overview</p><button className={tab === "dashboard" ? "active" : ""} onClick={() => changeTab("dashboard")}><LayoutDashboard size={17} /> Dashboard</button></div>
          <div className="slms-nav-group"><p>Classroom</p><button className={tab === "timetable" ? "active" : ""} onClick={() => changeTab("timetable")}><CalendarDays size={17} /> Timetable</button><button className={tab === "attendance" ? "active" : ""} onClick={() => changeTab("attendance")}><CheckCircle2 size={17} /> Attendance</button><button className={tab === "progress" ? "active" : ""} onClick={() => changeTab("progress")}><BookOpen size={17} /> Progress</button><button className={tab === "notes" ? "active" : ""} onClick={() => changeTab("notes")}><NotebookPen size={17} /> Notes{unreadNotesCount > 0 && <em className="slms-nav-badge">{unreadNotesCount > 9 ? "9+" : unreadNotesCount}</em>}</button><button className={tab === "feedback" ? "active" : ""} onClick={() => changeTab("feedback")}><Star size={17} /> Feedback{pendingNps && <em className="slms-nav-badge slms-nav-dot" aria-label="Feedback required" />}</button></div>
          <div className="slms-nav-group"><p>Internship</p><button className={tab === "internship" ? "active" : ""} onClick={() => changeTab("internship")}><Stethoscope size={17} /> Internship{internshipDuty && internshipDuty.status !== "logbook" && <em className="slms-nav-badge slms-nav-dot" aria-label="Action required" />}</button><button className={tab === "logbook" ? "active" : ""} onClick={() => changeTab("logbook")}><FileText size={17} /> Logbook{internshipDuty?.status === "logbook" && <em className="slms-nav-badge slms-nav-dot" aria-label="Action required" />}</button></div>
        </nav>
        <div className="slms-user-card"><span className="slms-avatar"><UserRound size={21} /></span><div><b>{student.fullName}</b><small>Student</small></div><button type="button" title="Logout" onClick={() => setLogoutConfirmOpen(true)}><LogOut size={16} /></button></div>
      </aside>

      <section className="slms-content">
        <header className="slms-topbar">
          <button type="button" className="slms-mobile-menu" aria-label="Open menu" onClick={() => setSidebarOpen(true)}><span /><span /><span /></button>
          <div><small>{data.phase}</small><h1>{tab === "dashboard" ? "Dashboard" : tab[0].toUpperCase() + tab.slice(1)}</h1><p>{student.course || "-"} | {student.batch || "Batch not assigned"}</p></div>
          <div className="slms-topbar-actions">
            <div className="slms-notification-wrap">
              <button type="button" className="slms-notification-button" aria-label="Open notifications" onClick={toggleNotifications}>
                <Bell size={17} />
                {hasUnseenNotifications && <span>{unreadNotificationCount}</span>}
              </button>
              {notificationsOpen && (
                <div className="slms-notification-popover">
                  <div className="slms-notification-head">
                    <div><b>Notifications</b><p>{activeNotifications.length ? "Classroom and internship updates" : "No alerts right now"}</p></div>
                    <div className="slms-notification-head-actions">{unreadNotificationCount > 0 && <span>{unreadNotificationCount}</span>}<button type="button" aria-label="Close notifications" onClick={() => setNotificationsOpen(false)}><X size={15} /></button></div>
                  </div>
                  <div className="slms-notification-tabs">
                    <button type="button" className={notificationTab === "unread" ? "active" : ""} onClick={() => setNotificationTab("unread")}>Unread <span>{unreadNotificationCount}</span></button>
                    <button type="button" className={notificationTab === "all" ? "active" : ""} onClick={() => setNotificationTab("all")}>All <span>{activeNotifications.length}</span></button>
                    {unreadNotificationCount > 0 && <button type="button" className="slms-notification-read" onClick={markAllNotificationsRead}>Mark read</button>}
                  </div>
                  {visibleNotifications.length ? visibleNotifications.map((item) => (
                    <article className={`slms-notification-item ${item.tone}`} key={notificationKey(item)}>
                      <i />
                      <div><b>{item.title}</b><p>{item.message}</p><small>{item.meta}</small></div>
                      <button type="button" className="slms-notification-dismiss" aria-label="Dismiss notification" onClick={() => dismissNotification(item)}><X size={13} /></button>
                    </article>
                  )) : <div className="slms-notification-empty">You are all caught up.</div>}
                </div>
              )}
            </div>
          </div>
        </header>

        {tab === "dashboard" && <Dashboard data={data} internshipDuty={internshipDuty} onGoInternship={goToInternshipDuty} />}
        {tab === "timetable" && <Timetable sessions={data.sessions} />}
        {tab === "attendance" && <AttendanceView rows={data.attendance} percent={data.summary.attendancePercent} />}
        {tab === "progress" && <Progress modules={modules} topics={data.topics} practicals={data.practicals} data={data} />}
        {tab === "notes" && <StudyNotes notes={data.studyNotes || []} token={token} />}
        {tab === "feedback" && <NpsHistory data={data} />}
        {tab === "internship" && <InternshipView data={data} token={token} onDone={() => load()} />}
        {tab === "logbook" && <Logbook data={data} token={token} onDone={() => load()} />}
      </section>
      {logoutConfirmOpen && (
        <div className="slms-modal-overlay" onClick={() => setLogoutConfirmOpen(false)}>
          <div className="slms-confirm-modal" onClick={(event) => event.stopPropagation()}>
            <div className="slms-confirm-head"><h2>Logout</h2><button type="button" onClick={() => setLogoutConfirmOpen(false)}>x</button></div>
            <div className="slms-confirm-body"><span><LogOut size={18} /></span><p>Are you sure you want to logout from Student LMS?</p></div>
            <div className="slms-confirm-actions"><button type="button" className="ghost" onClick={() => setLogoutConfirmOpen(false)}>Cancel</button><button type="button" className="danger" onClick={logout}>Logout</button></div>
          </div>
        </div>
      )}
      {showDutyPrompt && internshipDuty && (
        <div className="slms-modal-overlay" onClick={() => setDutyPromptDismissedKey(internshipDutyKey)}>
          <div className="slms-duty-modal" onClick={(event) => event.stopPropagation()}>
            <div className="slms-duty-icon"><Stethoscope size={22} /></div>
            <div>
              <small>Required today</small>
              <h2>{internshipDuty.title}</h2>
              <p>{internshipDuty.message}</p>
            </div>
            <div className="slms-duty-actions">
              <button type="button" className="ghost" onClick={() => setDutyPromptDismissedKey(internshipDutyKey)}>Later</button>
              <button type="button" onClick={goToInternshipDuty}>{internshipDuty.cta}</button>
            </div>
          </div>
        </div>
      )}
      {pendingNps && <NpsSurveyModal item={pendingNps} token={token} onDone={() => load()} />}
      </main>
    </>
  );
}

function Dashboard({ data, internshipDuty, onGoInternship }: { data: LmsData; internshipDuty: InternshipDuty | null; onGoInternship: () => void }) {
  const [feesVisible, setFeesVisible] = useState(false);
  const nextClass = data.summary.nextClass;
  const finalFee = Math.max(0, Number(data.student.totalFee || 0) - Number(data.student.discountAmount || 0));
  const paidFee = Number(data.student.paidAmount || 0);
  const feePercent = finalFee ? Math.min(100, Math.round((paidFee / finalFee) * 100)) : 0;
  const recentAttendance = data.attendance.slice(0, 4);
  const activeTopics = data.topics.filter((topic) => topic.status !== "Covered").slice(0, 4);
  const pendingPracticals = data.practicals.filter((item) => item.status !== "Completed").slice(0, 4);
  const latestLogbook = data.logbookEntries[0];
  return <div className="slms-dashboard">
    {internshipDuty && (
      <section className="slms-card slms-duty-card">
        <span><Stethoscope size={18} /></span>
        <div><small>Required today</small><b>{internshipDuty.title}</b><p>{internshipDuty.message}</p></div>
        <button type="button" onClick={onGoInternship}>{internshipDuty.cta}</button>
      </section>
    )}
    <div className="slms-chart-grid">
      <DonutMetric title="Attendance" value={data.summary.attendancePercent} completed={data.summary.attended} total={data.summary.attendanceHeld} color="#4f6bff" sub="classes attended" />
      <DonutMetric title="Syllabus" value={data.summary.topicPercent} completed={data.summary.coveredTopics} total={data.summary.topicTotal} color="#18a889" sub="topics covered" />
      <DonutMetric title="Practicals" value={data.summary.practicalPercent} completed={data.summary.completedPracticals} total={data.summary.practicalTotal} color="#f5a623" sub="skills completed" />
    </div>
    <div className="slms-grid">
      <section className="slms-card slms-wide slms-panel-card">
        <div className="slms-card-head"><div><h2>Next class</h2><p>Upcoming batch session</p></div>{nextClass && <StatusPill value={nextClass.nature} />}</div>
        {nextClass ? <div className="slms-next-class-body">
          <span className="slms-icon-tile"><Clock size={18} /></span>
          <div className="slms-next-main"><b>{nextClass.startTime} - {nextClass.endTime}</b><p>{formatDate(nextClass.date)}</p><small>{nextClass.batchName}</small></div>
          <div className="slms-next-meta"><span>Faculty</span><b>{nextClass.faculty || "-"}</b></div>
        </div> : <div className="slms-empty">No upcoming class scheduled</div>}
      </section>
      <section className="slms-card slms-panel-card">
        <div className="slms-card-head">
          <div><h2>Fees</h2><p>Payment progress</p></div>
          <button type="button" className="slms-eye-btn" title={feesVisible ? "Hide fee details" : "Show fee details"} onClick={() => setFeesVisible((visible) => !visible)}>
            {feesVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className={`slms-fee-body ${feesVisible ? "show" : "masked"}`}>
          <div><span>Paid</span>{feesVisible ? <b>Rs {new Intl.NumberFormat("en-IN").format(paidFee)}</b> : <i className="slms-fee-secret" aria-label="Paid amount hidden"><IndianRupee size={13} strokeWidth={2.4} /><strong>•••••</strong></i>}</div>
          <div><span>Balance</span>{feesVisible ? <b>Rs {new Intl.NumberFormat("en-IN").format(Math.max(0, finalFee - paidFee))}</b> : <i className="slms-fee-secret" aria-label="Balance amount hidden"><IndianRupee size={13} strokeWidth={2.4} /><strong>•••••</strong></i>}</div>
          {feesVisible ? <div className="slms-fee-bar"><span style={{ width: `${feePercent}%` }} /></div> : <div className="slms-fee-mask-line" />}
          <small>{feesVisible ? `Final payable Rs ${new Intl.NumberFormat("en-IN").format(finalFee)} | ${feePercent}% paid` : "Tap the eye icon to view fee details"}</small>
        </div>
      </section>
    </div>
    <div className="slms-grid slms-dashboard-bottom">
      <section className="slms-card slms-insight-card">
        <div className="slms-card-head compact"><div><h2>Recent attendance</h2><p>Latest classroom records</p></div></div>
        <div className="slms-mini-list">{recentAttendance.map((row) => <div className="slms-mini-row" key={row._id}><div><b>{formatDate(row.date)}</b><span>{row.nature || "Classroom"}</span></div><StatusPill value={row.status === "Leave" ? "Excused" : row.status} /></div>)}{!recentAttendance.length && <div className="slms-empty small">No attendance records yet</div>}</div>
      </section>
      <section className="slms-card slms-insight-card">
        <div className="slms-card-head compact"><div><h2>Syllabus focus</h2><p>Topics still pending</p></div></div>
        <div className="slms-mini-list">{activeTopics.map((topic) => <div className="slms-mini-row" key={topic._id}><div><b>{topic.topic}</b><span>{topic.module}</span></div><StatusPill value={topic.status} /></div>)}{!activeTopics.length && <div className="slms-empty small">{data.topics.length ? "All topics are covered" : "No topics updated yet"}</div>}</div>
      </section>
      <section className="slms-card slms-insight-card">
        <div className="slms-card-head compact"><div><h2>Action status</h2><p>Practicals and internship</p></div></div>
        <div className="slms-mini-list">
          {pendingPracticals.slice(0, 3).map((item) => <div className="slms-mini-row" key={item._id}><div><b>{item.practicalName}</b><span>{item.module || "Practical"}</span></div><StatusPill value={item.status} /></div>)}
          {data.internship ? <div className="slms-mini-row"><div><b>{data.internship.facilityName}</b><span>{latestLogbook ? `Last logbook ${formatDate(latestLogbook.date)}` : "Logbook not started"}</span></div><StatusPill value={data.internship.status} /></div> : null}
          {!pendingPracticals.length && !data.internship && <div className="slms-empty small">No pending practicals or internship yet</div>}
        </div>
      </section>
    </div>
  </div>;
}

function DonutMetric({ title, value, completed, total, color, sub }: { title: string; value: number; completed: number; total: number; color: string; sub: string }) {
  const safeValue = Math.max(0, Math.min(100, Number(value || 0)));
  const chartData = [
    { name: "done", value: safeValue },
    { name: "left", value: Math.max(0, 100 - safeValue) },
  ];
  return (
    <section className="slms-card slms-donut-card">
      <div>
        <small><i style={{ background: color }} />{title}</small>
        <b>{safeValue}%</b>
        <p>{completed}/{total} {sub}</p>
      </div>
      <div className="slms-donut">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" innerRadius={27} outerRadius={38} startAngle={90} endAngle={-270} stroke="none">
              <Cell fill={color} />
              <Cell fill="#e8edf6" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <span>{safeValue}%</span>
      </div>
    </section>
  );
}

const npsAttributeLabels: Record<string, string> = {
  attrTeachingQuality: "Teaching quality",
  attrContentRelevance: "Content relevance",
  attrPracticalTraining: "Practical training",
  attrSupportInfra: "Support & infrastructure",
  attrPlacementAssistance: "Placement / internship assistance",
};

const internshipNpsAttributeLabels: Record<string, string> = {
  attrTeachingQuality: "Internship guidance quality",
  attrContentRelevance: "Practical exposure relevance",
  attrSupportInfra: "Support & coordination",
  attrPlacementAssistance: "Placement / internship assistance",
};

function npsAttributeLabel(field: string, touchpoint: NpsTouchpoint) {
  if (touchpoint === "post_internship") return internshipNpsAttributeLabels[field] || npsAttributeLabels[field] || field;
  return npsAttributeLabels[field] || field;
}

function npsOpenPrompt(score: number | null) {
  if (score === null) return "Share any feedback you want us to know.";
  if (score <= 6) return "What could we improve to serve you better?";
  if (score <= 8) return "What would make you rate us higher?";
  return "What did you value most about your experience?";
}

function npsAttributesForTouchpoint(touchpoint: NpsTouchpoint) {
  const common = ["attrTeachingQuality", "attrContentRelevance", "attrSupportInfra"];
  return touchpoint === "post_internship" ? [...common, "attrPlacementAssistance"] : [...common, "attrPracticalTraining"];
}

function NpsSurveyModal({ item, token, onDone }: { item: NpsEligibilityItem; token: string; onDone: () => void }) {
  const [score, setScore] = useState<number | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [openFeedback, setOpenFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const attributes = npsAttributesForTouchpoint(item.touchpoint);
  const complete = score !== null && attributes.every((field) => ratings[field]);
  const submit = async () => {
    if (!complete) return toast.error("Choose score and all star ratings");
    setSaving(true);
    try {
      await api<NpsResponse>("/api/nps/submit", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ touchpoint: item.touchpoint, npsScore: score, ...ratings, openFeedback }),
      });
      toast.success("Thank you for your feedback");
      onDone();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to submit feedback");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="slms-modal-overlay slms-nps-overlay">
      <section className="slms-nps-modal" role="dialog" aria-modal="true">
        <div className="slms-nps-head">
          <div>
            <small>Required feedback</small>
            <h2>{item.label}</h2>
            <p>How likely are you to recommend iMED Academy to a friend or colleague?</p>
          </div>
          <span>{score === null ? "0-10" : `${score}/10`}</span>
        </div>
        <div className="slms-nps-score-wrap">
          <div className="slms-nps-score-grid">{Array.from({ length: 11 }, (_, value) => <button key={value} type="button" className={`${score === value ? "active" : ""} ${value <= 6 ? "low" : value <= 8 ? "mid" : "high"}`} onClick={() => setScore(value)}>{value}</button>)}</div>
          <div className="slms-nps-scale"><span>Needs improvement</span><span>Excellent</span></div>
        </div>
        <div className="slms-nps-section-title"><b>Rate your experience</b><span>{Object.keys(ratings).length}/{attributes.length} completed</span></div>
        <div className="slms-nps-stars">{attributes.map((field) => {
          const label = npsAttributeLabel(field, item.touchpoint);
          return <div key={field}><span>{label}</span><div>{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" aria-label={`${label} ${star} star`} className={star <= (ratings[field] || 0) ? "active" : ""} onClick={() => setRatings({ ...ratings, [field]: star })}><Star size={18} fill="currentColor" /></button>)}</div></div>;
        })}</div>
        <label className="slms-nps-text"><span>{npsOpenPrompt(score)}<b>{openFeedback.length}/500</b></span><textarea maxLength={500} value={openFeedback} onChange={(event) => setOpenFeedback(event.target.value)} placeholder="Optional feedback" /></label>
        <div className="slms-nps-actions"><button type="button" className="slms-nps-submit" disabled={!complete || saving} onClick={submit}>{saving ? "Submitting..." : "Submit feedback"}</button></div>
      </section>
    </div>
  );
}

function NpsHistory({ data }: { data: LmsData }) {
  const responses = data.npsResponses || [];
  const items = data.nps?.items || [];
  return (
    <div className="slms-grid">
      <section className="slms-card slms-wide">
        <div className="slms-card-head"><div><h2>My feedback</h2><p>Your submitted feedback history</p></div></div>
        <div className="slms-list">
          {responses.map((row) => <div className="slms-row" key={row._id || row.touchpoint}><div><b>{row.label || items.find((item) => item.touchpoint === row.touchpoint)?.label || row.touchpoint}</b><p>{formatDate(row.submittedAt)} | Score {row.npsScore}/10</p></div><StatusPill value="Submitted" /></div>)}
          {!responses.length && <div className="slms-empty">No feedback submitted yet</div>}
        </div>
      </section>
      <section className="slms-card">
        <div className="slms-card-head"><div><h2>Feedback status</h2><p>Survey checkpoints</p></div></div>
        <div className="slms-list">
          {items.map((item) => <div className="slms-row compact" key={item.touchpoint}><div><b>{item.label}</b><p>{item.submitted ? "Completed" : item.reason}</p></div><StatusPill value={item.submitted ? "Done" : item.required ? "Required" : "Awaiting"} /></div>)}
        </div>
      </section>
    </div>
  );
}

function Timetable({ sessions }: { sessions: ClassSession[] }) {
  const completed = sessions.filter((session) => session.attendanceMarked).length;
  const theoretical = sessions.filter((session) => session.nature === "Theoretical").length;
  const practical = sessions.filter((session) => session.nature === "Practical").length;
  const nextSession = sessions.find((session) => !session.attendanceMarked) || sessions[0];
  const groupedSessions = sessions.reduce<Array<{ date: string; items: ClassSession[] }>>((groups, session) => {
    const existing = groups.find((group) => group.date === session.date);
    if (existing) existing.items.push(session);
    else groups.push({ date: session.date, items: [session] });
    return groups;
  }, []);
  return (
    <section className="slms-card slms-timetable-modern">
      <div className="slms-timetable-title">
        <div>
          <h2>My timetable</h2>
          <p>Batch classes and attendance status</p>
        </div>
        <span>{sessions.length} classes</span>
      </div>
      <div className="slms-timetable-spotlight">
        <div className="slms-next-strip">
          <span><CalendarDays size={19} /></span>
          <div>
            <small>Next class</small>
            <b>{nextSession ? `${nextSession.startTime} - ${nextSession.endTime}` : "Not scheduled"}</b>
            <p>{nextSession ? `${formatDate(nextSession.date)} | ${nextSession.nature}` : "Class timetable will appear here"}</p>
          </div>
        </div>
        <div className="slms-timetable-metrics">
          <div><b>{completed}</b><span>Completed</span></div>
          <div><b>{theoretical}</b><span>Theory</span></div>
          <div><b>{practical}</b><span>Practical</span></div>
        </div>
      </div>
      <div className="slms-day-schedule">
        {groupedSessions.map((group) => {
          const date = formatDateParts(group.date);
          return (
            <article className="slms-day-card" key={group.date}>
              <div className="slms-day-badge">
                <b>{date.day}</b>
                <span>{date.month}</span>
                <small>{date.weekday}</small>
              </div>
              <div className="slms-day-classes">
                {group.items.map((session) => {
                  const status = session.attendanceMarked ? "Completed" : "Upcoming";
                  return (
                    <div className={`slms-class-slot ${session.nature.toLowerCase()}`} key={session._id}>
                      <div>
                        <h3>{session.nature} class</h3>
                        <p>{session.batchName}</p>
                        <span><Clock size={14} /> {session.startTime} - {session.endTime}</span>
                      </div>
                      <div className="slms-slot-side">
                        <small>{session.faculty || "-"}</small>
                        <StatusPill value={status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
        {!sessions.length && <div className="slms-empty">No classes created for your batch yet</div>}
      </div>
    </section>
  );
}

function AttendanceView({ rows, percent }: { rows: Attendance[]; percent: number }) {
  const presentCount = rows.filter((row) => row.status === "Present").length;
  const absentCount = rows.filter((row) => row.status === "Absent").length;
  const lateCount = rows.filter((row) => row.status === "Late").length;
  const leaveCount = rows.filter((row) => row.status === "Leave").length;
  const standing = percent >= 85 ? "Good standing" : percent >= 75 ? "Needs attention" : "Below required";
  return (
    <section className="slms-attendance-page">
      <div className="slms-attendance-hero">
        <div>
          <small>Attendance overview</small>
          <h2>{percent}%</h2>
          <p>{rows.length ? `${presentCount}/${rows.length} classes attended` : "No classroom records yet"}</p>
        </div>
        <div className="slms-attendance-ring" style={{ "--attendance-percent": `${percent}%`, "--attendance-color": percent >= 85 ? "#18a889" : percent >= 75 ? "#f5a623" : "#e5484d" } as CSSProperties}>
          <b>{percent}%</b>
        </div>
        <StatusPill value={standing} />
      </div>
      <div className="slms-attendance-stats">
        <div><b>{presentCount}</b><span>Present</span></div>
        <div><b>{absentCount}</b><span>Absent</span></div>
        <div><b>{lateCount}</b><span>Late</span></div>
        <div><b>{leaveCount}</b><span>Excused</span></div>
      </div>
      <div className="slms-card slms-attendance-records">
        <div className="slms-card-head">
          <div><h2>Class records</h2><p>Latest attendance marked by faculty</p></div>
          <span className="slms-mini-chip">{rows.length} records</span>
        </div>
        <div className="slms-attendance-list">
          {rows.map((row) => {
            const date = formatDateParts(row.date);
            return (
              <article className={`slms-attendance-item ${row.status.toLowerCase()}`} key={row._id}>
                <div className="slms-att-date"><b>{date.day}</b><span>{date.month}</span><small>{date.weekday}</small></div>
                <div>
                  <h3>{formatDate(row.date)}</h3>
                  <p>{row.nature || "Classroom"}{row.note ? ` | ${row.note}` : ""}</p>
                </div>
                <StatusPill value={row.status === "Leave" ? "Excused" : row.status} />
              </article>
            );
          })}
          {!rows.length && <div className="slms-empty">No attendance records yet</div>}
        </div>
      </div>
    </section>
  );
}

function Progress({ modules, practicals, data }: { modules: Record<string, Topic[]>; topics: Topic[]; practicals: Practical[]; data: LmsData }) {
  const moduleEntries = Object.entries(modules);
  const pendingTopics = data.summary.topicTotal - data.summary.coveredTopics;
  const pendingPracticals = data.summary.practicalTotal - data.summary.completedPracticals;
  return (
    <section className="slms-progress-page">
      <div className="slms-progress-hero">
        <div>
          <small>Learning progress</small>
          <h2>{data.summary.topicPercent}%</h2>
          <p>{data.summary.coveredTopics}/{data.summary.topicTotal} syllabus topics covered</p>
        </div>
        <div className="slms-progress-ring" style={{ "--progress-percent": `${data.summary.topicPercent}%` } as CSSProperties}>
          <b>{data.summary.topicPercent}%</b>
        </div>
        <div className="slms-progress-summary">
          <div><b>{pendingTopics}</b><span>Topics pending</span></div>
          <div><b>{pendingPracticals}</b><span>Practicals pending</span></div>
        </div>
      </div>
      <div className="slms-progress-layout">
        <section className="slms-card slms-progress-modules">
          <div className="slms-card-head">
            <div><h2>Syllabus modules</h2><p>Coverage updated by faculty</p></div>
            <span className="slms-mini-chip">{moduleEntries.length} modules</span>
          </div>
          <div className="slms-module-grid">
            {moduleEntries.map(([module, topics]) => {
              const covered = topics.filter((topic) => topic.status === "Covered").length;
              const pct = topics.length ? Math.round((covered / topics.length) * 100) : 0;
              return (
                <article className="slms-module-card" key={module}>
                  <div className="slms-module-top">
                    <div><h3>{module}</h3><p>{covered}/{topics.length} topics covered</p></div>
                    <b>{pct}%</b>
                  </div>
                  <div className="slms-module-bar"><span style={{ width: `${pct}%` }} /></div>
                  <div className="slms-topic-list">
                    {topics.map((topic) => (
                      <div className="slms-topic-row" key={topic._id}>
                        <div><b>{topic.topic}</b><p>{topic.faculty || "Faculty update pending"}</p></div>
                        <StatusPill value={topic.status} />
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
            {!data.topics.length && <div className="slms-empty">No syllabus topics updated yet</div>}
          </div>
        </section>
        <section className="slms-card slms-progress-practicals">
          <div className="slms-card-head">
            <div><h2>Practicals</h2><p>Skill completion status</p></div>
            <span className="slms-mini-chip">{data.summary.practicalPercent}%</span>
          </div>
          <div className="slms-practical-meter">
            <div className="slms-progress-ring practical" style={{ "--progress-percent": `${data.summary.practicalPercent}%` } as CSSProperties}>
              <b>{data.summary.practicalPercent}%</b>
            </div>
            <p>{data.summary.completedPracticals}/{data.summary.practicalTotal} skills completed</p>
          </div>
          <div className="slms-practical-list">
            {practicals.map((item) => (
              <article className="slms-practical-item" key={item._id}>
                <div><h3>{item.practicalName}</h3><p>{item.module || "-"}{item.remarks ? ` | ${item.remarks}` : ""}</p></div>
                <StatusPill value={item.status} />
              </article>
            ))}
            {!practicals.length && <div className="slms-empty">No practical records yet</div>}
          </div>
        </section>
      </div>
    </section>
  );
}

function fileSizeLabel(size?: number) {
  if (!size) return "";
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(size > 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

async function downloadStudentNote(note: StudyNote, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/student/study-notes/${note._id}/download`, {
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
}

function StudyNotes({ notes, token }: { notes: StudyNote[]; token: string }) {
  const modules = Array.from(new Set(notes.map((note) => note.module || "General")));
  return (
    <section className="slms-notes-page">
      <div className="slms-notes-hero">
        <div>
          <small>Study materials</small>
          <h2>{notes.length} notes shared</h2>
          <p>Download the files uploaded by your faculty for this batch.</p>
        </div>
        <span>{modules.length} modules</span>
      </div>
      <div className="slms-notes-grid">
        {notes.map((note) => (
          <article className="slms-note-card" key={note._id}>
            <span className="slms-note-icon"><FileText size={20} /></span>
              <div className="slms-note-body">
                <small>{note.module || "General"}</small>
                <h3>{note.title}</h3>
                {note.description && <p>{note.description}</p>}
              <div>{note.resourceType || (note.referenceUrl ? "Reference" : "File")} | {note.file?.originalName || note.referenceUrl || "Study resource"}{note.file?.size ? ` | ${fileSizeLabel(note.file.size)}` : ""}{note.uploadedBy ? ` | ${note.uploadedBy}` : ""}</div>
            </div>
            <div className="slms-note-actions">
              {note.file && <button type="button" onClick={() => downloadStudentNote(note, token)}><Download size={15} /> Download</button>}
              {note.referenceUrl && <button type="button" onClick={() => window.open(note.referenceUrl, "_blank", "noopener,noreferrer")}><ExternalLink size={15} /> {note.resourceType === "Video" ? "Open video" : "Open link"}</button>}
            </div>
          </article>
        ))}
        {!notes.length && (
          <div className="slms-card slms-notes-empty">
            <span><NotebookPen size={22} /></span>
            <h2>No notes uploaded yet</h2>
            <p>Your faculty notes, PDFs, and class files will appear here once uploaded.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function InternshipView({ data, token, onDone }: { data: LmsData; token: string; onDone: () => void }) {
  const [busy, setBusy] = useState("");
  const [tick, setTick] = useState(Date.now());
  const [pendingType, setPendingType] = useState<"login" | "logout">("login");
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState("");
  const [faceDetected, setFaceDetected] = useState(false);
  const [faceDetectorReady, setFaceDetectorReady] = useState(false);
  const [logsCalendarOpen, setLogsCalendarOpen] = useState(false);
  const [logPage, setLogPage] = useState(1);
  const [pagedLogs, setPagedLogs] = useState<InternshipLog[]>(data.internshipLogs.slice(0, 10));
  const [logMeta, setLogMeta] = useState<PaginationMeta>({ total: data.internshipLogs.length, page: 1, limit: 10 });
  const [logMonth, setLogMonth] = useState(dateInputKey().slice(0, 7));
  const [selectedLogKey, setSelectedLogKey] = useState(dateInputKey());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const faceStableRef = useRef(0);
  const autoCapturedRef = useRef(false);
  const todayKey = dateInputKey();
  const todayLog = data.internshipLogs.find((log) => dateInputKey(log.date) === todayKey);
  const todayLogbook = data.logbookEntries.find((entry) => dateInputKey(entry.date) === todayKey);
  const isLoggedIn = Boolean(todayLog?.loginAt && !todayLog?.logoutAt);
  const isCompleted = Boolean(todayLog?.loginAt && todayLog?.logoutAt);
  const isDayComplete = Boolean(isCompleted && todayLogbook);
  const actionType: "login" | "logout" = isLoggedIn ? "logout" : "login";
  const elapsedSeconds = todayLog?.loginAt
    ? ((todayLog.logoutAt ? new Date(todayLog.logoutAt).getTime() : tick) - new Date(todayLog.loginAt).getTime()) / 1000
    : 0;
  const logsPerPage = 10;
  const totalLogCount = Number(logMeta.total ?? data.internshipLogs.length);
  const totalLogPages = Math.max(1, Number(logMeta.pages ?? logMeta.totalPages ?? Math.ceil(totalLogCount / logsPerPage)));
  const currentLogPage = Math.min(logPage, totalLogPages);
  const recentLogs = pagedLogs.length || data.internshipLogs.length > logsPerPage ? pagedLogs : data.internshipLogs.slice(0, logsPerPage);
  const logsByDate = new Map(data.internshipLogs.map((log) => [dateInputKey(log.date), log]));
  const logbooksByDate = new Map(data.logbookEntries.map((entry) => [dateInputKey(entry.date), entry]));
  const selectedLog = logsByDate.get(selectedLogKey);
  const selectedLogbook = logbooksByDate.get(selectedLogKey);
  const [logYear, logMonthNumber] = logMonth.split("-").map(Number);
  const monthStart = new Date(logYear || new Date().getFullYear(), (logMonthNumber || 1) - 1, 1);
  const monthTitle = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(monthStart);
  const monthLeadingDays = monthStart.getDay();
  const monthTotalDays = new Date(logYear || new Date().getFullYear(), logMonthNumber || 1, 0).getDate();
  const calendarDays = Array.from({ length: monthLeadingDays + monthTotalDays }, (_, index) => {
    if (index < monthLeadingDays) return null;
    const day = index - monthLeadingDays + 1;
    const key = `${String(logYear).padStart(4, "0")}-${String(logMonthNumber).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { day, key, log: logsByDate.get(key), logbook: logbooksByDate.get(key) };
  });

  useEffect(() => {
    if (!isLoggedIn) return undefined;
    const timer = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!data.internship) return undefined;
    let cancelled = false;
    apiEnvelope<InternshipLog[]>(`/api/student/internship/logs?page=${currentLogPage}&limit=${logsPerPage}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        if (cancelled) return;
        setPagedLogs(response.data || []);
        setLogMeta(response.meta || { total: response.data?.length || 0, page: currentLogPage, limit: logsPerPage });
      })
      .catch(() => {
        if (!cancelled) {
          setPagedLogs(data.internshipLogs.slice((currentLogPage - 1) * logsPerPage, currentLogPage * logsPerPage));
          setLogMeta({ total: data.internshipLogs.length, page: currentLogPage, limit: logsPerPage });
        }
      });
    return () => { cancelled = true; };
  }, [token, data.internship?._id, data.internshipLogs.length, currentLogPage]);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(() => undefined);
    }
  }, [cameraStream]);

  useEffect(() => () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
  }, [cameraStream]);

  const closeCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
    setCameraOpen(false);
    setCameraError("");
    setFaceDetected(false);
    setFaceDetectorReady(false);
    faceStableRef.current = 0;
    autoCapturedRef.current = false;
  };

  const openSelfieCapture = async () => {
    if (isCompleted || busy) return;
    setPendingType(actionType);
    setCameraError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Live camera is required for internship attendance.");
      setCameraOpen(true);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      autoCapturedRef.current = false;
      faceStableRef.current = 0;
      setCameraStream(stream);
      setCameraOpen(true);
    } catch {
      setCameraError("Camera access was blocked. Please allow camera permission and try again.");
      setCameraOpen(true);
    }
  };

  const shiftLogMonth = (offset: number) => {
    const next = new Date(logYear || new Date().getFullYear(), (logMonthNumber || 1) - 1 + offset, 1);
    setLogMonth(dateInputKey(next).slice(0, 7));
    setSelectedLogKey(dateInputKey(next));
  };

  const submitLog = async (file?: File | null) => {
    if (!file) return;
    const formData = new FormData();
    formData.set("photo", file);
    formData.set("date", todayKey);
    formData.set("type", pendingType);
    setBusy(pendingType);
    try {
      const gps = await getOptionalLocation();
      if (gps) formData.set("gps", gps);
      await api("/api/student/internship/log", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData });
      onDone();
    } finally {
      setBusy("");
    }
  };

  const captureSelfie = (faceVerified = false) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    if (!faceVerified && !faceDetected) {
      setCameraError("Face is required before capture.");
      return;
    }
    const width = video.videoWidth || 720;
    const height = video.videoHeight || 960;
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, width, height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `internship-${pendingType}-${todayKey}.jpg`, { type: "image/jpeg" });
      closeCamera();
      submitLog(file);
    }, "image/jpeg", 0.86);
  };

  useEffect(() => {
    if (!cameraOpen || !cameraStream) return undefined;
    const FaceDetectorCtor = (window as unknown as { FaceDetector?: new (options?: { fastMode?: boolean; maxDetectedFaces?: number }) => { detect: (source: HTMLVideoElement) => Promise<unknown[]> } }).FaceDetector;
    const detector = FaceDetectorCtor ? new FaceDetectorCtor({ fastMode: true, maxDetectedFaces: 1 }) : null;
    setFaceDetectorReady(true);
    let cancelled = false;
    const interval = window.setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.readyState < 2 || busy || autoCapturedRef.current) return;
      try {
        const detected = detector ? (await detector.detect(video)).length > 0 : hasFaceLikeFrame(video);
        if (cancelled) return;
        setFaceDetected(detected);
        faceStableRef.current = detected ? faceStableRef.current + 1 : 0;
        if (faceStableRef.current >= 5) {
          autoCapturedRef.current = true;
          captureSelfie(true);
        }
      } catch {
        const detected = hasFaceLikeFrame(video);
        setFaceDetected(detected);
        faceStableRef.current = detected ? faceStableRef.current + 1 : 0;
        if (faceStableRef.current >= 5) {
          autoCapturedRef.current = true;
          captureSelfie(true);
        }
      }
    }, 450);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [cameraOpen, cameraStream, busy]);
  if (!data.internship) return (
    <section className="slms-card slms-internship-empty-card">
      <div className="slms-internship-empty">
        <div className="slms-real-hourglass" aria-hidden="true">
          <svg className="slms-hourglass-svg" viewBox="0 0 240 220" role="img">
            <defs>
              <linearGradient id="slmsGlass" x1="55" y1="36" x2="185" y2="184" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="0.48" stopColor="#e7efff" stopOpacity="0.46" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.82" />
              </linearGradient>
              <linearGradient id="slmsBlue" x1="58" y1="22" x2="182" y2="198" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#7d90ff" />
                <stop offset="0.55" stopColor="#536bff" />
                <stop offset="1" stopColor="#2f50df" />
              </linearGradient>
              <linearGradient id="slmsSand" x1="82" y1="60" x2="158" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffd979" />
                <stop offset="0.58" stopColor="#f5a623" />
                <stop offset="1" stopColor="#d88900" />
              </linearGradient>
              <filter id="slmsSoftShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#22335f" floodOpacity="0.18" />
              </filter>
            </defs>
            <ellipse className="slms-hourglass-floor" cx="120" cy="195" rx="58" ry="11" />
            <g className="slms-hourglass-body" filter="url(#slmsSoftShadow)">
              <rect x="54" y="22" width="132" height="16" rx="8" fill="url(#slmsBlue)" />
              <rect x="54" y="182" width="132" height="16" rx="8" fill="url(#slmsBlue)" />
              <rect x="64" y="36" width="5" height="148" rx="3" fill="#6f83ff" opacity="0.95" />
              <rect x="171" y="36" width="5" height="148" rx="3" fill="#6f83ff" opacity="0.95" />
              <path d="M78 42 H162 C156 69 142 90 126 105 C142 120 156 145 162 178 H78 C84 145 98 120 114 105 C98 90 84 69 78 42Z" fill="url(#slmsGlass)" stroke="#536bff" strokeOpacity="0.55" strokeWidth="4" strokeLinejoin="round" />
              <path className="slms-hourglass-highlight" d="M91 51 C99 75 107 90 118 101 M119 119 C106 132 96 151 91 169" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.76" />
              <g className="slms-top-sand">
                <path d="M86 56 H154 L122 102 H118 Z" fill="url(#slmsSand)" />
              </g>
              <g className="slms-bottom-sand">
                <path d="M120 118 L155 173 H85 Z" fill="url(#slmsSand)" />
              </g>
              <rect className="slms-sand-stream-svg" x="117.5" y="96" width="5" height="39" rx="3" fill="url(#slmsSand)" />
              <circle className="slms-sand-dot dot-one" cx="115" cy="111" r="3.2" fill="#f5a623" />
              <circle className="slms-sand-dot dot-two" cx="126" cy="103" r="2.7" fill="#f5a623" />
              <circle className="slms-sand-dot dot-three" cx="121" cy="121" r="2.4" fill="#d88900" />
            </g>
          </svg>
        </div>
        <div>
          <small>Internship status</small>
          <h2>Internship assignment is pending</h2>
          <p>Your hospital posting, supervisor details, attendance check-in, and daily logbook access will appear here once the academic team confirms your internship.</p>
          <span>Awaiting academic team update</span>
        </div>
      </div>
    </section>
  );
  return (
    <div className="slms-internship-page">
      <section className="slms-card slms-internship-home">
        <div>
          <small>Internship home</small>
          <h2>{data.internship.facilityName}</h2>
          <p>{data.internship.facilityLocation || "Hospital posting"}</p>
        </div>
        <StatusPill value={data.internship.status} />
        <div className="slms-internship-facts">
          <div><span>Supervisor</span><b>{data.internship.supervisorName || "-"}</b></div>
          <div><span>Supervisor email</span><b>{data.internship.supervisorEmail || "-"}</b></div>
          <div><span>Duration</span><b>{formatDate(data.internship.startDate)} to {formatDate(data.internship.expectedEndDate)}</b></div>
          <div><span>Department</span><b>{data.internship.departmentRotation || "General posting"}</b></div>
        </div>
      </section>

      <section className="slms-card slms-daily-log-card">
        <div className="slms-card-head compact">
          <div>
            <h2>Daily internship attendance</h2>
            <p>One selfie starts and ends your hospital duty timer</p>
          </div>
        </div>
        <div className="slms-one-check">
          {cameraError && <div className="slms-camera-error">{cameraError}</div>}
          <button className={isLoggedIn ? "running" : isCompleted ? "complete" : ""} type="button" disabled={Boolean(busy) || isCompleted} onClick={openSelfieCapture}>
            <Camera size={19} />
            <span>
              <b className={isCompleted ? "done" : ""}>
                {busy && busy !== "logbook" ? "Saving..." : isCompleted ? (
                  <>
                    <span>Attendance done</span>
                    <strong>{formatRunningTime(elapsedSeconds)}</strong>
                  </>
                ) : isLoggedIn ? formatRunningTime(elapsedSeconds) : "Log In"}
              </b>
              {!isCompleted && <small>{isLoggedIn ? "Tap to Log Out with selfie" : "Tap to take selfie and start"}</small>}
            </span>
          </button>
          <p>{isLoggedIn ? `Logged in at ${formatDateTime(todayLog?.loginAt)}` : isCompleted ? `Logged out at ${formatDateTime(todayLog?.logoutAt)}` : "Selfie is mandatory for internship attendance."}</p>
        </div>
      </section>
      {isDayComplete && (
        <section className="slms-card slms-day-complete-card">
          <CheckCircle2 size={18} />
          <div><b>Today&apos;s internship day is complete</b><p>Attendance and logbook are submitted for faculty review.</p></div>
        </section>
      )}
      {cameraOpen && (
        <div className="slms-modal-overlay slms-camera-overlay" onClick={closeCamera}>
          <div className="slms-camera-modal" onClick={(event) => event.stopPropagation()}>
            <div className="slms-camera-head">
              <div>
                <h2>{pendingType === "login" ? "Log In selfie" : "Log Out selfie"}</h2>
                <p>Keep your face clear and capture a live photo.</p>
              </div>
              <button type="button" onClick={closeCamera}><X size={17} /></button>
            </div>
            <div className="slms-camera-preview">
              <video ref={videoRef} playsInline muted />
              <div className={`slms-face-guide ${faceDetected ? "detected" : ""}`}>
                <span />
              </div>
              <div className={`slms-face-status ${faceDetected ? "detected" : ""}`}>
                <i />
                {faceDetected ? "Face ready - auto capturing" : faceDetectorReady ? "Place your face inside the circle" : "Checking camera"}
              </div>
              <canvas ref={canvasRef} />
            </div>
            <div className="slms-camera-actions">
              <button type="button" className="primary" disabled={Boolean(busy) || !faceDetected} onClick={() => captureSelfie()}><Camera size={16} /> Capture & {pendingType === "login" ? "Log In" : "Log Out"}</button>
            </div>
          </div>
        </div>
      )}

      <section className="slms-card slms-internship-logs-card">
        <div className="slms-card-head compact">
          <div>
            <h2>Recent internship logs</h2>
            <p>Daily check-in and check-out history</p>
          </div>
          <div className="slms-log-head-actions">
            <span className="slms-mini-chip">{totalLogCount} logs</span>
            {data.internshipLogs.length > 0 && <button type="button" onClick={() => setLogsCalendarOpen(true)}><CalendarDays size={15} /> View calendar</button>}
          </div>
        </div>
        <div className="slms-internship-log-list">
          {recentLogs.map((log) => (
            <article className="slms-internship-log-item" key={log._id}>
              <span><Clock size={16} /></span>
              <div>
                <b>{formatDate(log.date)}</b>
                <p>In {formatDateTime(log.loginAt)} | Out {formatDateTime(log.logoutAt)}{logbooksByDate.get(dateInputKey(log.date)) ? " | Logbook submitted" : " | Logbook pending"}</p>
              </div>
              <StatusPill value={`${log.hours || 0} hrs`} />
            </article>
          ))}
          {!recentLogs.length && (
            <div className="slms-internship-log-empty">
              <CheckCircle2 size={22} />
              <b>No internship logs yet</b>
              <p>Your daily check-in records will appear here after your first log in.</p>
            </div>
          )}
        </div>
        {totalLogCount > logsPerPage && (
          <div className="slms-log-pagination">
            <button type="button" disabled={currentLogPage === 1} onClick={() => setLogPage((page) => Math.max(1, page - 1))}><ChevronLeft size={15} /> Prev</button>
            <span>Page {currentLogPage} of {totalLogPages}</span>
            <button type="button" disabled={currentLogPage === totalLogPages} onClick={() => setLogPage((page) => Math.min(totalLogPages, page + 1))}>Next <ChevronRight size={15} /></button>
          </div>
        )}
      </section>
      {logsCalendarOpen && (
        <div className="slms-modal-overlay" onClick={() => setLogsCalendarOpen(false)}>
          <div className="slms-log-calendar-modal" onClick={(event) => event.stopPropagation()}>
            <div className="slms-log-calendar-head">
              <div><small>Internship attendance</small><h2>Calendar view</h2><p>Track daily hospital duty logs by date.</p></div>
              <button type="button" onClick={() => setLogsCalendarOpen(false)}><X size={17} /></button>
            </div>
            <div className="slms-log-calendar-summary">
              <div><span>Total logs</span><b>{data.internshipLogs.length}</b></div>
              <div><span>Completed</span><b>{data.internshipLogs.filter((log) => log.loginAt && log.logoutAt && logbooksByDate.get(dateInputKey(log.date))).length}</b></div>
              <div><span>Pending</span><b>{data.internshipLogs.filter((log) => log.loginAt && (!log.logoutAt || !logbooksByDate.get(dateInputKey(log.date)))).length}</b></div>
            </div>
            <div className="slms-log-calendar-toolbar">
              <button type="button" aria-label="Previous month" onClick={() => shiftLogMonth(-1)}><ChevronLeft size={18} /></button>
              <b>{monthTitle}</b>
              <button type="button" aria-label="Next month" onClick={() => shiftLogMonth(1)}><ChevronRight size={18} /></button>
            </div>
            <div className="slms-log-calendar-legend"><span><i className="done" /> Complete</span><span><i className="pending" /> Action pending</span><span><i /> No log</span></div>
            <div className="slms-log-calendar-grid">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day} className="slms-log-calendar-day">{day}</span>)}
              {calendarDays.map((cell, index) => cell ? (
                <button
                  type="button"
                  key={cell.key}
                  className={`slms-log-calendar-cell ${cell.log?.loginAt && cell.log?.logoutAt && cell.logbook ? "completed" : cell.log?.loginAt ? "pending" : ""} ${selectedLogKey === cell.key ? "selected" : ""}`}
                  onClick={() => setSelectedLogKey(cell.key)}
                >
                  <b>{cell.day}</b>
                  <span />
                </button>
              ) : <i key={`blank-${index}`} />)}
            </div>
            <div className="slms-log-calendar-detail">
              <div>
                <small>Selected date</small>
                <b>{formatDate(selectedLogKey)}</b>
              </div>
              {selectedLog ? (
                <div className="slms-log-detail-grid">
                  <div><span>Log in</span><b>{formatDateTime(selectedLog.loginAt)}</b></div>
                  <div><span>Log out</span><b>{formatDateTime(selectedLog.logoutAt)}</b></div>
                  <div><span>Total hours</span><b>{selectedLog.hours || 0} hrs</b></div>
                  <div><span>Logbook</span><b>{selectedLogbook ? "Submitted" : "Pending"}</b></div>
                </div>
              ) : <p>No internship attendance recorded on this date.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LogbookEmptyState({ type, title, caption }: { type: "locked" | "write"; title: string; caption: string }) {
  return (
    <div className={`slms-logbook-empty-state ${type}`}>
      <svg className="slms-logbook-art" viewBox="0 0 180 130" role="img" aria-label={title}>
        <ellipse cx="90" cy="112" rx="54" ry="9" fill="#dfe7f5" opacity="0.7" />
        <g className="logbook-book">
          <rect x="44" y="28" width="74" height="72" rx="14" fill="#ffffff" stroke="#dbe4f4" strokeWidth="2" />
          <path d="M58 28 H70 V100 H58 C50.3 100 44 93.7 44 86 V42 C44 34.3 50.3 28 58 28Z" fill="#eef2ff" />
          <path d="M77 49 H104 M77 62 H101 M77 75 H96" className="logbook-line" fill="none" stroke="#536bff" strokeWidth="4" strokeLinecap="round" />
          <path d="M60 45 V84" fill="none" stroke="#536bff" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </g>
        {type === "locked" ? (
          <g className="logbook-lock">
            <rect x="104" y="68" width="38" height="30" rx="10" fill="#18a889" />
            <path d="M113 69 V60 C113 54 117 50 123 50 C129 50 133 54 133 60 V69" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <circle cx="123" cy="82" r="3" fill="#ffffff" />
            <path d="M123 84 V90" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : (
          <g className="logbook-pen">
            <path d="M115 87 L143 59" stroke="#f5a623" strokeWidth="10" strokeLinecap="round" />
            <path d="M112 90 L119 73 L132 86 Z" fill="#fff4da" stroke="#f5a623" strokeWidth="2" />
            <path d="M143 59 L149 53" stroke="#536bff" strokeWidth="10" strokeLinecap="round" />
            <path d="M105 95 C117 101 133 102 145 96" className="logbook-writing-line" fill="none" stroke="#18a889" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}
        <circle className="logbook-dot one" cx="132" cy="31" r="5" fill="#18a889" />
        <circle className="logbook-dot two" cx="148" cy="43" r="3.5" fill="#f5a623" />
      </svg>
      <div>
        <b>{title}</b>
        <p>{caption}</p>
      </div>
    </div>
  );
}

function Logbook({ data, token, onDone }: { data: LmsData; token: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [logbookTab, setLogbookTab] = useState<"entries" | "new">("entries");
  const todayKey = dateInputKey();
  const todayInternshipLog = data.internshipLogs.find((log) => dateInputKey(log.date) === todayKey);
  const todayLogbook = data.logbookEntries.find((entry) => dateInputKey(entry.date) === todayKey);
  const isTodayLogbookRequired = Boolean(todayInternshipLog?.loginAt && todayInternshipLog.logoutAt && !todayLogbook);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const form = event.currentTarget;
    try {
      await api("/api/student/logbook", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form).entries())) });
      form.reset();
      setLogbookTab("entries");
      onDone();
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="slms-logbook-shell">
      <div className="slms-logbook-tabs">
        <button type="button" className={logbookTab === "entries" ? "active" : ""} onClick={() => setLogbookTab("entries")}><FileText size={15} /> My Entries</button>
        <button type="button" className={logbookTab === "new" ? "active" : ""} onClick={() => setLogbookTab("new")}><NotebookPen size={15} /> New Entry{isTodayLogbookRequired && <span className="slms-tab-alert">Required</span>}</button>
      </div>
      {logbookTab === "new" && <section className="slms-card slms-logbook-compose-card">
        <div className="slms-card-head compact">
          <div>
            <h2>New logbook entry</h2>
            <p>Record today's hospital learning</p>
          </div>
        </div>
        {!data.internship ? (
          <LogbookEmptyState
            type="locked"
            title="Internship logbook is locked for now"
            caption="Once your internship posting is assigned, you can record daily work, learnings, and supervisor updates here."
          />
        ) : (
          <form className="slms-form" onSubmit={submit}>
            <div className="slms-logbook-form-row">
              <label>Date<input name="date" type="date" value={dateInputKey()} readOnly required /></label>
              <label>Department / Area<input name="departmentArea" placeholder="ICU, front office, billing..." required /></label>
            </div>
            <label>Activities performed<textarea name="activitiesPerformed" placeholder="What work did you observe or perform today?" required /></label>
            <label>Key learnings<textarea name="keyLearnings" placeholder="What did you understand better today?" required /></label>
            <label>Challenges / Questions<textarea name="challenges" placeholder="Any doubts, blockers, or questions for faculty?" /></label>
            <button disabled={busy}><NotebookPen size={16} /> {busy ? "Saving..." : "Submit logbook"}</button>
          </form>
        )}
      </section>}
      {logbookTab === "entries" && <section className="slms-card slms-logbook-list-card">
        <div className="slms-card-head compact">
          <div>
            <h2>My logbook</h2>
            <p>{data.logbookEntries.length} submitted entries</p>
          </div>
          {data.logbookEntries.length > 0 && <span className="slms-mini-chip">{data.logbookEntries.filter((entry) => entry.verified).length} verified</span>}
        </div>
        <div className="slms-logbook-timeline">
          {data.logbookEntries.map((entry) => (
            <article className="slms-logbook-entry" key={entry._id}>
              <div className="slms-logbook-date">
                <span>{new Intl.DateTimeFormat("en-IN", { day: "2-digit" }).format(new Date(entry.date))}</span>
                <small>{new Intl.DateTimeFormat("en-IN", { month: "short" }).format(new Date(entry.date))}</small>
              </div>
              <div className="slms-logbook-entry-body">
                <div className="slms-logbook-entry-head">
                  <div>
                    <h3>{entry.departmentArea}</h3>
                    <p>{formatDate(entry.date)}</p>
                  </div>
                  <StatusPill value={entry.verified ? "Verified" : "Pending Review"} />
                </div>
                <div className="slms-logbook-note-grid">
                  <div><MessageSquareText size={15} /><span>Activities</span><p>{entry.activitiesPerformed}</p></div>
                  <div><Lightbulb size={15} /><span>Key learnings</span><p>{entry.keyLearnings}</p></div>
                  {entry.challenges && <div><FileText size={15} /><span>Questions</span><p>{entry.challenges}</p></div>}
                  {(entry.supervisorRemark || entry.verifiedBy) && <div><CheckCircle2 size={15} /><span>Faculty review</span><p>{entry.supervisorRemark || "Reviewed"}{entry.verifiedBy ? ` | ${entry.verifiedBy}` : ""}</p></div>}
                </div>
              </div>
            </article>
          ))}
        </div>
        {!data.logbookEntries.length && (
          <LogbookEmptyState
            type={data.internship ? "write" : "locked"}
            title={data.internship ? "No logbook entries submitted yet" : "Your submitted logbook will appear here"}
            caption={data.internship ? "Add your first entry after completing an internship day so faculty can review your progress." : "After your internship starts, every entry you submit will be listed here with review status."}
          />
        )}
      </section>}
    </div>
  );
}

function StudentLmsStyles() {
  return <style>{`
    .slms-page{min-height:100vh;background:#eef2f8;color:#071833;font-family:Inter,Arial,sans-serif;display:grid;grid-template-columns:260px 1fr}.slms-login-page{display:grid;place-items:center;grid-template-columns:1fr}.slms-login-card{width:min(440px,calc(100vw - 28px));background:#fff;border:1px solid #dce3f0;border-radius:20px;padding:30px;box-shadow:0 24px 80px rgba(24,35,70,.13)}.slms-brand{display:flex;align-items:center;gap:10px}.slms-brand b,.slms-brand small{display:block}.slms-brand small,.slms-login-card p,.slms-topbar p,.slms-row p,.slms-card small{color:#7c86a1}.slms-login-card h1{margin:28px 0 8px;font-size:28px}.slms-login-card label,.slms-form label{display:grid;gap:7px;font-size:13px;font-weight:800;color:#47516b;margin-top:14px}.slms-login-card input,.slms-form input,.slms-form textarea,.slms-upload input{border:1px solid #dbe3f1;border-radius:10px;height:42px;padding:0 12px;font:inherit}.slms-form textarea{height:88px;padding:10px 12px;resize:vertical}.slms-login-card button,.slms-form button,.slms-upload button{border:0;background:#4f6bff;color:#fff;border-radius:10px;height:42px;padding:0 16px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 10px 22px rgba(79,107,255,.24)}.slms-login-card button{width:100%;margin-top:18px}.slms-error{background:#fff1f2;color:#be123c;border:1px solid #fecdd3;border-radius:10px;padding:10px 12px;margin-top:12px}.slms-sidebar{background:#10192f;color:#fff;padding:22px 16px;display:flex;flex-direction:column;gap:18px;min-height:100vh;position:sticky;top:0}.slms-sidebar .slms-brand small{color:#9aa7c7}.slms-student-mini{background:#172341;border:1px solid #25345a;border-radius:16px;padding:16px;display:grid;gap:6px}.slms-student-mini span{width:48px;height:48px;border-radius:15px;background:#243faf;display:grid;place-items:center;font-weight:900}.slms-student-mini b,.slms-student-mini small{display:block}.slms-student-mini small{color:#9aa7c7}.slms-sidebar nav{display:grid;gap:7px}.slms-sidebar nav button,.slms-logout{border:0;background:transparent;color:#c4cce1;border-radius:11px;height:42px;padding:0 12px;text-align:left;font-weight:800;display:flex;align-items:center;gap:10px}.slms-sidebar nav button.active{background:#4f6bff;color:#fff}.slms-logout{margin-top:auto;color:#fecdd3}.slms-content{padding:24px;display:grid;gap:18px;align-content:start}.slms-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;background:#fff;border:1px solid #dce3f0;border-radius:18px;padding:18px 20px}.slms-topbar h1{margin:2px 0 3px;font-size:28px}.slms-topbar small{font-weight:900;color:#4f6bff;text-transform:uppercase;letter-spacing:.06em}.slms-dashboard{display:grid;gap:16px}.slms-hero-card{display:flex;align-items:center;justify-content:space-between;gap:18px;min-height:150px;border-radius:20px;padding:24px;background:linear-gradient(135deg,#10192f 0%,#213b94 55%,#18a889 140%);color:#fff;box-shadow:0 18px 45px rgba(20,31,70,.18);overflow:hidden}.slms-hero-card small{color:#bfd0ff;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-hero-card h2{font-size:34px;margin:8px 0 6px}.slms-hero-card p{margin:0;color:#dce5ff}.slms-hero-student{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:12px 14px;min-width:230px}.slms-hero-student span{width:52px;height:52px;border-radius:16px;background:#fff;color:#213b94;display:grid;place-items:center;font-weight:900}.slms-hero-student b,.slms-hero-student small{display:block}.slms-hero-student small{color:#dce5ff}.slms-chart-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.slms-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.slms-card{background:#fff;border:1px solid #dce3f0;border-radius:18px;padding:18px;box-shadow:0 2px 8px rgba(16,24,40,.04)}.slms-card h2{margin:0 0 14px;font-size:16px}.slms-wide{grid-column:span 2}.slms-donut-card{min-height:158px;display:flex;align-items:center;justify-content:space-between;gap:14px}.slms-donut-card small{font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-donut-card b{display:block;font-size:34px;margin:8px 0 4px}.slms-donut-card p{margin:0;color:#7c86a1}.slms-donut{position:relative;width:116px;height:116px;flex:0 0 116px}.slms-donut span{position:absolute;inset:0;display:grid;place-items:center;font-weight:900;color:#071833}.slms-money{font-size:28px}.slms-profile,.slms-class-row{display:flex;align-items:center;gap:12px}.slms-profile span{width:54px;height:54px;border-radius:17px;background:#e8edff;color:#3157f6;display:grid;place-items:center;font-weight:900}.slms-list{display:grid}.slms-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:13px 0;border-bottom:1px solid #edf1f7}.slms-row:last-child{border-bottom:0}.slms-row.compact{padding:9px 0}.slms-pill{display:inline-flex;align-items:center;border-radius:999px;background:#eef2f8;color:#52607a;padding:7px 11px;font-size:12px;font-weight:900;white-space:nowrap}.slms-pill.present,.slms-pill.completed,.slms-pill.covered,.slms-pill.verified{background:#ddfbef;color:#008060}.slms-pill.absent,.slms-pill.needs-repeat{background:#ffe8e8;color:#c62828}.slms-pill.late,.slms-pill.in-progress,.slms-pill.pending-review{background:#fff4da;color:#b77900}.slms-pill.not-started,.slms-pill.pending{background:#f1eaff;color:#6d35c2}.slms-att-head{display:flex;align-items:center;gap:12px;margin-bottom:12px}.slms-att-head b{font-size:38px}.slms-progress{height:8px;border-radius:999px;background:#e9edf5;overflow:hidden;margin-bottom:12px}.slms-progress span{display:block;height:100%;background:#4f6bff}.slms-module{border-top:1px solid #edf1f7;padding:12px 0}.slms-module summary{display:flex;justify-content:space-between;cursor:pointer}.slms-kv{display:grid;grid-template-columns:130px 1fr;gap:10px}.slms-kv span{color:#7c86a1}.slms-upload{display:grid;gap:10px;margin-bottom:12px}.slms-upload button{width:max-content}.slms-logbook{border-top:1px solid #edf1f7;padding:14px 0}.slms-logbook div{display:flex;align-items:center;justify-content:space-between;gap:10px}.slms-logbook p{margin:9px 0 5px}.slms-empty{min-height:110px;display:grid;place-items:center;color:#8d96ad;text-align:center}.spin{animation:slms-spin 1s linear infinite}@keyframes slms-spin{to{transform:rotate(360deg)}}@media(max-width:1120px){.slms-chart-grid,.slms-grid{grid-template-columns:1fr 1fr}.slms-wide{grid-column:span 2}}@media(max-width:980px){.slms-page{grid-template-columns:1fr}.slms-sidebar{position:static;min-height:auto}.slms-sidebar nav{grid-template-columns:repeat(3,1fr)}.slms-logout{margin-top:0}}@media(max-width:700px){.slms-chart-grid,.slms-grid{grid-template-columns:1fr}.slms-wide{grid-column:auto}.slms-hero-card{align-items:flex-start;flex-direction:column}.slms-hero-card h2{font-size:28px}.slms-hero-student{width:100%;min-width:0}.slms-donut-card{min-height:140px}.slms-content{padding:12px}.slms-topbar{align-items:flex-start;flex-direction:column}.slms-sidebar nav{grid-template-columns:1fr 1fr}.slms-row{align-items:flex-start;flex-direction:column}.slms-kv{grid-template-columns:1fr}.slms-logbook div{align-items:flex-start;flex-direction:column}}
    .slms-page{background:#f2f5fb;color:#061633;font-size:13px}.slms-content{padding:0 20px 22px;gap:16px}.slms-topbar{margin:0 -20px;border-radius:0;border-left:0;border-right:0;border-top:0;padding:12px 20px;min-height:62px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-topbar h1{font-size:18px;line-height:22px;margin:0 0 2px}.slms-topbar p{font-size:12px;margin:0}.slms-topbar small{font-size:10.5px;letter-spacing:0;color:#8c93ab;text-transform:none}.slms-refresh{height:34px;border-radius:8px;font-size:12px;padding:0 12px;box-shadow:0 4px 12px rgba(79,107,255,.18)}.slms-dashboard{gap:16px}.slms-hero-card{min-height:82px;background:#fff;color:#061633;border:1px solid #dce3f0;border-radius:14px;padding:14px 18px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-hero-card small{color:#98a0b8;font-size:11px;letter-spacing:0;text-transform:none}.slms-hero-card h2{font-size:18px;line-height:23px;margin:4px 0 2px}.slms-hero-card p{color:#061633;font-size:12.5px}.slms-hero-student{min-width:210px;background:#f7f9fe;border-color:#e4e9f3;border-radius:12px;padding:9px 11px}.slms-hero-student span{width:38px;height:38px;border-radius:10px;background:#edf1ff;color:#3157f6;font-size:12px}.slms-hero-student b{font-size:13px}.slms-hero-student small{color:#8c93ab;font-size:11.5px}.slms-chart-grid,.slms-grid{gap:14px}.slms-card{border-radius:14px;padding:16px 18px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-card h2{font-size:14.5px;line-height:19px;margin-bottom:10px}.slms-donut-card{display:grid;grid-template-columns:minmax(0,1fr) 82px;align-items:center;min-height:104px;padding:14px 18px;column-gap:14px;overflow:hidden}.slms-donut-card>div:first-child{min-width:0}.slms-donut-card small{display:block;font-size:11px;letter-spacing:0;color:#56607a;text-transform:none;white-space:nowrap}.slms-donut-card b{display:block;font-size:24px;line-height:30px;margin:6px 0 2px;white-space:nowrap}.slms-donut-card p{font-size:11.5px;margin:0;color:#7c86a1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-donut{width:78px;height:78px;min-width:78px;justify-self:end}.slms-donut span{font-size:11.5px}.slms-money{font-size:24px;line-height:30px}.slms-row{padding:11px 0}.slms-row b,.slms-kv b,.slms-logbook b{font-size:13px}.slms-row p,.slms-row small,.slms-logbook p,.slms-logbook small{font-size:11.5px}.slms-pill{border-radius:999px;font-size:11px;padding:6px 10px}.slms-sidebar{width:260px}.slms-sidebar nav button,.slms-logout{height:39px;border-radius:8px;font-size:13px}.slms-student-mini{border-radius:12px;padding:13px}.slms-student-mini span{width:42px;height:42px;border-radius:11px}.slms-empty{min-height:92px;font-size:13px}.slms-logbook-empty-state{min-height:148px;display:grid;place-items:center;text-align:center;color:#8f98b2;padding:12px;gap:10px}.slms-logbook-empty-state b{display:block;color:#061633;font-size:13.5px;line-height:18px;margin-bottom:4px}.slms-logbook-empty-state p{margin:0 auto;max-width:360px;color:#8f98b2;font-size:12px;line-height:1.45}.slms-logbook-art{width:138px;height:100px;overflow:visible}.slms-logbook-art .logbook-book{animation:slms-logbook-float 3s ease-in-out infinite}.slms-logbook-art .logbook-lock{animation:slms-logbook-pulse 2.1s ease-in-out infinite;transform-origin:123px 76px}.slms-logbook-art .logbook-pen{animation:slms-logbook-write 2.4s ease-in-out infinite;transform-origin:124px 78px}.slms-logbook-art .logbook-line{stroke-dasharray:32;stroke-dashoffset:32;animation:slms-logbook-line 2.5s ease-in-out infinite}.slms-logbook-art .logbook-writing-line{stroke-dasharray:44;stroke-dashoffset:44;animation:slms-logbook-writing-line 2.5s ease-in-out infinite}.slms-logbook-art .logbook-dot{animation:slms-logbook-dot 1.8s ease-in-out infinite;transform-origin:center}.slms-logbook-art .logbook-dot.two{animation-delay:.25s}@keyframes slms-logbook-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}@keyframes slms-logbook-pulse{0%,100%{transform:scale(1);opacity:.92}50%{transform:scale(1.05);opacity:1}}@keyframes slms-logbook-write{0%,100%{transform:translate(0,0) rotate(-3deg)}50%{transform:translate(-7px,5px) rotate(-9deg)}}@keyframes slms-logbook-line{0%{stroke-dashoffset:32;opacity:.35}45%,82%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:.45}}@keyframes slms-logbook-writing-line{0%{stroke-dashoffset:44;opacity:.2}48%,82%{stroke-dashoffset:0;opacity:1}100%{stroke-dashoffset:0;opacity:.4}}@keyframes slms-logbook-dot{0%,100%{opacity:.28;transform:translateY(0) scale(.92)}50%{opacity:1;transform:translateY(-4px) scale(1)}}.slms-att-head b{font-size:28px}.slms-login-card{border-radius:16px}.slms-login-card h1{font-size:23px}.slms-login-card input,.slms-form input,.slms-form textarea,.slms-upload input{border-radius:9px;font-size:13px}.slms-form label,.slms-login-card label{font-size:12px}.slms-progress{height:7px}.slms-logbook-shell{display:grid;gap:14px;align-items:start}.slms-logbook-tabs{width:max-content;max-width:100%;display:flex;gap:4px;background:#fff;border:1px solid #dce3f0;border-radius:12px;padding:4px;box-shadow:0 1px 2px rgba(16,20,40,.04);overflow-x:auto}.slms-logbook-tabs button{height:36px;border:0;border-radius:9px;background:transparent;color:#56607a;padding:0 14px;font-size:12.5px;font-weight:900;display:inline-flex;align-items:center;gap:7px;white-space:nowrap}.slms-logbook-tabs button.active{background:#4f6bff;color:#fff;box-shadow:0 8px 18px rgba(79,107,255,.24)}.slms-tab-alert{height:20px;border-radius:999px;background:#fff4da;color:#b77900;padding:0 8px;display:inline-flex;align-items:center;font-size:10px;font-weight:900;line-height:1}.slms-logbook-tabs button.active .slms-tab-alert{background:rgba(255,255,255,.18);color:#fff}.slms-card-head.compact{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.slms-card-head.compact h2{margin:0}.slms-card-head.compact p{margin:3px 0 0;color:#8c93ab;font-size:11.5px}.slms-logbook-compose-card,.slms-logbook-list-card{padding:0;overflow:hidden}.slms-logbook-compose-card .slms-card-head,.slms-logbook-list-card .slms-card-head{padding:16px 18px;margin:0;border-bottom:1px solid #edf1f7}.slms-logbook-compose-card .slms-form{padding:16px 18px 18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.slms-logbook-compose-card .slms-form label{margin-top:0}.slms-logbook-compose-card .slms-form label:nth-child(n+2){grid-column:1/-1}.slms-logbook-form-row{display:contents}.slms-logbook-compose-card textarea{min-height:86px}.slms-logbook-compose-card button{grid-column:1/-1;width:max-content;justify-self:end;margin-top:2px}.slms-mini-chip{display:inline-flex;align-items:center;border-radius:999px;background:#eef2ff;color:#3157f6;padding:7px 11px;font-size:11px;font-weight:900}.slms-logbook-timeline{display:grid;padding:14px 18px 18px;gap:12px}.slms-logbook-entry{display:grid;grid-template-columns:54px minmax(0,1fr);gap:12px;align-items:start;border:1px solid #edf1f7;border-radius:14px;padding:12px;background:#fff}.slms-logbook-date{width:48px;height:58px;border-radius:14px;background:#eef2ff;color:#3157f6;display:grid;place-items:center;align-content:center;font-weight:900}.slms-logbook-date span{font-size:18px;line-height:20px}.slms-logbook-date small{font-size:10px;color:#6f7dff;text-transform:uppercase}.slms-logbook-entry-body{min-width:0}.slms-logbook-entry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}.slms-logbook-entry-head h3{margin:0;font-size:14px;line-height:18px}.slms-logbook-entry-head p{margin:2px 0 0;color:#8c93ab;font-size:11.5px}.slms-logbook-note-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.slms-logbook-note-grid>div{border:1px solid #edf1f7;border-radius:12px;background:#fbfcff;padding:10px 11px}.slms-logbook-note-grid>div:nth-child(3){grid-column:1/-1}.slms-logbook-note-grid span{display:inline-flex;align-items:center;gap:6px;color:#536bff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.04em}.slms-logbook-note-grid svg{vertical-align:-3px;margin-right:5px}.slms-logbook-note-grid p{margin:6px 0 0;color:#27324a;font-size:12.5px;line-height:1.45;white-space:pre-wrap}.slms-logbook-list-card>.slms-logbook-empty-state{margin:14px 18px 18px}@media(max-width:1180px){.slms-donut-card{grid-template-columns:minmax(0,1fr) 82px}.slms-donut{justify-self:end;margin-top:0}}@media(max-width:700px){.slms-content{padding:0 12px 16px}.slms-topbar{margin:0 -12px;padding:10px 12px}.slms-hero-card{gap:12px}.slms-hero-card h2{font-size:17px}.slms-donut-card{min-height:104px;grid-template-columns:minmax(0,1fr) 82px}.slms-sidebar{width:auto}.slms-logbook-tabs{width:100%}.slms-logbook-tabs button{flex:1;justify-content:center;padding:0 10px}.slms-tab-alert{padding:0 6px;font-size:9.5px}.slms-logbook-empty-state{min-height:134px;padding:10px}.slms-logbook-art{width:118px;height:86px}.slms-logbook-compose-card .slms-form{grid-template-columns:1fr;padding:14px}.slms-logbook-compose-card .slms-form label{grid-column:auto!important}.slms-logbook-compose-card button{width:100%;justify-self:stretch}.slms-logbook-entry{grid-template-columns:1fr}.slms-logbook-date{width:100%;height:42px;display:flex;gap:5px}.slms-logbook-entry-head{align-items:flex-start;flex-direction:column}.slms-logbook-note-grid{grid-template-columns:1fr}.slms-logbook-timeline{padding:14px}}
    .slms-content{background:linear-gradient(180deg,#f7f9fe 0,#eef2f8 220px)}.slms-hero-card{position:relative;background:linear-gradient(180deg,#fff,#fbfcff);border-color:#d9e1ee}.slms-hero-card:before{content:"";position:absolute;left:0;top:14px;bottom:14px;width:4px;border-radius:0 999px 999px 0;background:#4f6bff}.slms-hero-card>div:first-child{padding-left:6px}.slms-hero-card small{font-weight:800;color:#8f98b2}.slms-chart-grid{grid-template-columns:repeat(3,minmax(240px,1fr))}.slms-donut-card{background:linear-gradient(180deg,#fff,#fbfcff);border-color:#d9e1ee}.slms-donut-card small{display:flex;align-items:center;gap:7px;font-weight:800;color:#405070}.slms-donut-card small i{display:inline-block;width:8px;height:8px;border-radius:3px}.slms-donut-card b{color:#061633;font-size:25px}.slms-donut{filter:drop-shadow(0 4px 8px rgba(36,54,92,.06))}.slms-panel-card{padding:0;overflow:hidden}.slms-card-head{min-height:58px;padding:14px 18px;border-bottom:1px solid #edf1f7;display:flex;align-items:center;justify-content:space-between;gap:12px}.slms-card-head h2{margin:0;font-size:14.5px}.slms-card-head p{margin:3px 0 0;color:#8f98b2;font-size:11.5px}.slms-panel-card>.slms-class-row,.slms-panel-card>.slms-empty{padding:18px}.slms-class-row{align-items:flex-start}.slms-icon-tile{width:38px;height:38px;border-radius:10px;background:#eef2ff;color:#3157f6;display:grid;place-items:center;flex:0 0 38px}.slms-class-row b{font-size:14px}.slms-class-row p{margin:4px 0 2px;font-size:12.5px;color:#061633}.slms-class-row small{font-size:11.5px}.slms-panel-card>.slms-money,.slms-panel-card>p,.slms-panel-card>.slms-fee-bar,.slms-panel-card>small{margin-left:18px;margin-right:18px}.slms-panel-card>.slms-money{display:block;margin-top:16px}.slms-panel-card>p{margin-top:2px;margin-bottom:10px;color:#061633}.slms-fee-bar{height:7px;border-radius:999px;background:#e9edf5;overflow:hidden;margin-bottom:8px}.slms-fee-bar span{display:block;height:100%;border-radius:inherit;background:#18a889}.slms-mini-chip{height:26px;border-radius:999px;background:#eef2ff;color:#3157f6;display:inline-flex;align-items:center;padding:0 10px;font-size:11px;font-weight:900}@media(max-width:1120px){.slms-chart-grid{grid-template-columns:1fr 1fr}}@media(max-width:700px){.slms-chart-grid{grid-template-columns:1fr}.slms-panel-card>.slms-money,.slms-panel-card>p,.slms-panel-card>.slms-fee-bar,.slms-panel-card>small{margin-left:16px;margin-right:16px}}
    .slms-next-class-body{display:grid;grid-template-columns:42px minmax(0,1fr) 140px;align-items:center;gap:14px;padding:18px}.slms-next-main b{display:block;font-size:18px;line-height:24px;color:#061633}.slms-next-main p{margin:3px 0;color:#3157f6;font-size:12px;font-weight:800}.slms-next-main small{color:#8f98b2;font-size:11.5px}.slms-next-meta{justify-self:end;min-width:120px;border-left:1px solid #edf1f7;padding-left:16px}.slms-next-meta span,.slms-fee-body span{display:block;color:#8f98b2;font-size:11px;font-weight:800}.slms-next-meta b{display:block;margin-top:5px;font-size:13px;color:#061633}.slms-eye-btn{width:34px;height:34px;border:1px solid #dce3f0;border-radius:10px;background:#f7f9fe;color:#3157f6;display:grid;place-items:center;cursor:pointer}.slms-eye-btn:hover{background:#eef2ff;border-color:#cbd6ff}.slms-fee-body{display:grid;gap:10px;padding:16px 18px}.slms-fee-body>div:not(.slms-fee-bar):not(.slms-fee-mask-line){display:flex;align-items:center;justify-content:space-between;gap:12px}.slms-fee-body b{font-size:17px;color:#061633}.slms-fee-body>div:first-child b{font-size:21px}.slms-fee-secret{font-style:normal;display:inline-flex;align-items:center;gap:7px;height:28px;border-radius:999px;background:#f4f6fb;border:1px solid #e3e9f5;padding:0 11px;color:#8f98b2}.slms-fee-secret svg{color:#a4adc2;flex:0 0 auto}.slms-fee-secret strong{font-size:18px;line-height:1;letter-spacing:2px;color:#7f8aa5}.slms-fee-body small{color:#8f98b2}.slms-fee-body .slms-fee-bar{margin:0}.slms-fee-body .slms-fee-bar span{background:linear-gradient(90deg,#4f6bff,#18a889)}.slms-fee-mask-line{height:7px;border-radius:999px;background:linear-gradient(90deg,#edf1f7,#f8faff,#edf1f7);overflow:hidden}.slms-fee-mask-line:before{content:"";display:block;width:36%;height:100%;border-radius:inherit;background:#dfe6f4}@media(max-width:700px){.slms-next-class-body{grid-template-columns:42px 1fr}.slms-next-meta{grid-column:2;justify-self:start;border-left:0;padding-left:0}}
    .slms-dashboard-bottom{align-items:start}.slms-insight-card{padding:0;overflow:hidden}.slms-card-head.compact{min-height:54px;padding:13px 18px}.slms-card-head.compact h2{font-size:14px}.slms-mini-list{padding:6px 18px 12px}.slms-mini-row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:11px 0;border-bottom:1px solid #edf1f7}.slms-mini-row:last-child{border-bottom:0}.slms-mini-row b,.slms-mini-row span{display:block}.slms-mini-row b{font-size:12.5px;color:#061633;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.slms-mini-row span{font-size:11px;color:#8f98b2;margin-top:3px;max-width:190px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.slms-empty.small{min-height:84px;font-size:12.5px}
    .slms-dashboard-bottom{align-items:stretch}.slms-dashboard-bottom .slms-insight-card{min-height:146px}.slms-insight-card .slms-mini-list{min-height:92px;display:grid;align-content:start}.slms-insight-card .slms-mini-row{min-height:66px;padding:10px 0;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center}.slms-insight-card .slms-mini-row b,.slms-insight-card .slms-mini-row span{max-width:none}.slms-insight-card .slms-empty.small{min-height:92px;display:grid;place-items:center;padding:0;text-align:center}
    .slms-timetable-card{padding:0;overflow:hidden}.slms-timetable-summary{display:grid;grid-template-columns:minmax(280px,1fr) repeat(3,130px);gap:12px;padding:16px 18px;background:linear-gradient(180deg,#fbfcff,#f6f8fe);border-bottom:1px solid #edf1f7}.slms-schedule-hero{min-height:88px;border:1px solid #dfe6f4;border-radius:13px;background:#fff;display:flex;align-items:center;gap:13px;padding:14px}.slms-schedule-hero>span{width:42px;height:42px;border-radius:12px;background:#eef2ff;color:#536bff;display:grid;place-items:center;flex:0 0 42px}.slms-schedule-hero small,.slms-schedule-main small,.slms-timetable-stat span{display:block;color:#8f98b2;font-size:11.5px}.slms-schedule-hero b{display:block;font-size:18px;line-height:23px;margin:4px 0;color:#061633}.slms-schedule-hero p{margin:0;color:#405070;font-size:12px}.slms-timetable-stat{border:1px solid #dfe6f4;border-radius:13px;background:#fff;padding:14px;display:grid;align-content:center}.slms-timetable-stat b{font-size:24px;line-height:28px;color:#061633}.slms-schedule-list{display:grid;gap:12px;padding:16px 18px}.slms-schedule-card{display:grid;grid-template-columns:68px minmax(0,1fr) auto;align-items:center;gap:14px;border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:13px 14px;box-shadow:0 1px 2px rgba(16,20,40,.03);position:relative;overflow:hidden}.slms-schedule-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#536bff}.slms-schedule-card.practical:before{background:#f5a623}.slms-date-tile{width:60px;height:66px;border-radius:13px;background:#eef2ff;color:#536bff;display:grid;place-items:center;align-content:center;gap:1px}.slms-schedule-card.practical .slms-date-tile{background:#fff4dc;color:#b77900}.slms-date-tile b{font-size:20px;line-height:22px}.slms-date-tile span{font-size:11px;font-weight:900;text-transform:uppercase}.slms-date-tile small{font-size:10px;color:inherit;opacity:.75}.slms-schedule-main{min-width:0;display:grid;gap:7px}.slms-schedule-main h3{margin:0;font-size:14px;line-height:18px;color:#061633}.slms-schedule-main p{margin:2px 0 0;color:#8f98b2;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-schedule-time{display:inline-flex;align-items:center;gap:6px;color:#061633}.slms-schedule-time svg{color:#536bff}.slms-schedule-card.practical .slms-schedule-time svg{color:#f5a623}.slms-schedule-time b{font-size:13px}@media(max-width:1120px){.slms-timetable-summary{grid-template-columns:1fr 1fr}.slms-schedule-hero{grid-column:span 2}}@media(max-width:700px){.slms-timetable-summary{grid-template-columns:1fr;padding:12px}.slms-schedule-hero{grid-column:auto}.slms-schedule-list{padding:12px}.slms-schedule-card{grid-template-columns:56px minmax(0,1fr);align-items:start}.slms-schedule-card>.slms-pill{grid-column:2;justify-self:start}.slms-date-tile{width:52px;height:60px}.slms-date-tile b{font-size:18px}}
    .slms-timetable-card{max-height:calc(100vh - 96px);display:flex;flex-direction:column}.slms-timetable-card>.slms-card-head,.slms-timetable-summary{flex:0 0 auto}.slms-schedule-list{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;align-content:start;grid-auto-rows:minmax(116px,max-content)}.slms-schedule-card{min-height:116px}.slms-schedule-list::-webkit-scrollbar{width:7px}.slms-schedule-list::-webkit-scrollbar-thumb{background:#c8d2e5;border-radius:999px}.slms-schedule-list::-webkit-scrollbar-track{background:transparent}@media(max-width:980px){.slms-timetable-card{max-height:none}.slms-schedule-list{overflow:visible;grid-auto-rows:auto}.slms-schedule-card{min-height:0}}
    .slms-timetable-modern{padding:0;overflow:hidden;max-height:calc(100vh - 98px);display:flex;flex-direction:column}.slms-timetable-title{min-height:72px;padding:16px 18px;border-bottom:1px solid #edf1f7;display:flex;align-items:center;justify-content:space-between;gap:12px}.slms-timetable-title h2{margin:0 0 4px;font-size:15px;line-height:20px}.slms-timetable-title p{margin:0;color:#8f98b2;font-size:11.5px}.slms-timetable-title>span{height:28px;border-radius:999px;background:#eef2ff;color:#3157f6;display:inline-flex;align-items:center;padding:0 11px;font-size:11px;font-weight:900;white-space:nowrap}.slms-timetable-spotlight{flex:0 0 auto;display:grid;grid-template-columns:minmax(260px,1fr) 390px;gap:12px;padding:14px 18px;background:#f7f9fe;border-bottom:1px solid #edf1f7}.slms-next-strip{min-height:78px;border:1px solid #dfe6f4;border-radius:14px;background:#fff;display:flex;align-items:center;gap:13px;padding:13px 14px}.slms-next-strip>span{width:40px;height:40px;border-radius:12px;background:#eef2ff;color:#536bff;display:grid;place-items:center;flex:0 0 40px}.slms-next-strip small,.slms-timetable-metrics span{display:block;color:#8f98b2;font-size:11.5px}.slms-next-strip b{display:block;color:#061633;font-size:18px;line-height:22px;margin:3px 0}.slms-next-strip p{margin:0;color:#405070;font-size:12px}.slms-timetable-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.slms-timetable-metrics div{border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:13px;display:grid;align-content:center}.slms-timetable-metrics b{font-size:24px;line-height:28px;color:#061633}.slms-day-schedule{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;padding:16px 18px;display:grid;gap:14px;align-content:start}.slms-day-card{display:grid;grid-template-columns:74px minmax(0,1fr);gap:14px}.slms-day-badge{position:sticky;top:0;width:64px;height:76px;border-radius:15px;background:#eef2ff;color:#536bff;display:grid;place-items:center;align-content:center;gap:1px}.slms-day-badge b{font-size:21px;line-height:22px}.slms-day-badge span{font-size:11px;font-weight:900;text-transform:uppercase}.slms-day-badge small{font-size:10px;color:inherit;opacity:.75}.slms-day-classes{display:grid;gap:10px;min-width:0}.slms-class-slot{position:relative;border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:13px 14px 13px 18px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;min-height:82px;box-shadow:0 1px 2px rgba(16,20,40,.03);overflow:hidden}.slms-class-slot:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#536bff}.slms-class-slot.practical:before{background:#f5a623}.slms-class-slot h3{margin:0;font-size:14px;line-height:18px;color:#061633}.slms-class-slot p{margin:3px 0 7px;color:#8f98b2;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-class-slot span{display:inline-flex;align-items:center;gap:6px;color:#061633;font-weight:900;font-size:13px}.slms-class-slot span svg{color:#536bff}.slms-class-slot.practical span svg{color:#f5a623}.slms-slot-side{display:grid;justify-items:end;gap:8px}.slms-slot-side small{color:#8f98b2;font-size:11.5px}.slms-day-schedule::-webkit-scrollbar{width:7px}.slms-day-schedule::-webkit-scrollbar-thumb{background:#c8d2e5;border-radius:999px}.slms-day-schedule::-webkit-scrollbar-track{background:transparent}@media(max-width:1120px){.slms-timetable-spotlight{grid-template-columns:1fr}.slms-timetable-metrics{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:980px){.slms-timetable-modern{max-height:none}.slms-day-schedule{overflow:visible}}@media(max-width:700px){.slms-timetable-title{min-height:62px;padding:14px 14px}.slms-timetable-spotlight{padding:12px;gap:10px}.slms-next-strip{min-height:72px}.slms-next-strip b{font-size:16px}.slms-timetable-metrics{grid-template-columns:repeat(3,1fr);gap:8px}.slms-timetable-metrics div{padding:10px}.slms-timetable-metrics b{font-size:20px;line-height:24px}.slms-day-schedule{padding:12px;gap:12px}.slms-day-card{grid-template-columns:1fr;gap:8px}.slms-day-badge{position:static;width:100%;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:flex-start;padding:0 12px;gap:6px}.slms-day-badge b{font-size:16px}.slms-class-slot{grid-template-columns:1fr;align-items:start;gap:10px;min-height:0;padding:12px 12px 12px 16px}.slms-slot-side{display:flex;justify-content:space-between;align-items:center;justify-items:stretch}.slms-class-slot p{white-space:normal}.slms-timetable-title>span{height:26px;padding:0 9px}}
    .slms-attendance-page{display:grid;gap:14px}.slms-attendance-hero{position:relative;overflow:hidden;min-height:150px;border:1px solid #dce3f0;border-radius:16px;background:linear-gradient(135deg,#10192f 0%,#1d347d 58%,#18a889 135%);color:#fff;padding:20px;display:grid;grid-template-columns:minmax(0,1fr) 116px auto;align-items:center;gap:18px;box-shadow:0 12px 34px rgba(16,24,40,.1)}.slms-attendance-hero:after{content:"";position:absolute;right:-52px;top:-64px;width:190px;height:190px;border-radius:999px;background:rgba(255,255,255,.08)}.slms-attendance-hero small{display:block;color:#bfd0ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-attendance-hero h2{margin:8px 0 4px;font-size:42px;line-height:46px}.slms-attendance-hero p{margin:0;color:#dce5ff}.slms-attendance-hero .slms-pill{position:relative;z-index:1;background:rgba(255,255,255,.14);color:#fff;border:1px solid rgba(255,255,255,.18)}.slms-attendance-ring{position:relative;width:104px;height:104px}.slms-attendance-ring b{position:absolute;inset:0;display:grid;place-items:center;font-size:17px;color:#fff}.slms-attendance-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.slms-attendance-stats div{min-height:82px;border:1px solid #dce3f0;border-radius:14px;background:#fff;padding:14px;display:grid;align-content:center;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-attendance-stats b{font-size:24px;line-height:28px;color:#061633}.slms-attendance-stats span{color:#8f98b2;font-size:11.5px}.slms-attendance-records{padding:0;overflow:hidden}.slms-attendance-list{display:grid;padding:8px 18px 14px}.slms-attendance-item{position:relative;display:grid;grid-template-columns:62px minmax(0,1fr) auto;align-items:center;gap:13px;min-height:82px;padding:12px 0;border-bottom:1px solid #edf1f7}.slms-attendance-item:last-child{border-bottom:0}.slms-attendance-item:before{content:"";position:absolute;left:30px;top:0;bottom:0;width:1px;background:#edf1f7}.slms-att-date{position:relative;z-index:1;width:56px;height:62px;border-radius:14px;background:#eef2ff;color:#536bff;display:grid;place-items:center;align-content:center;gap:1px}.slms-att-date b{font-size:18px;line-height:20px}.slms-att-date span{font-size:10.5px;font-weight:900;text-transform:uppercase}.slms-att-date small{font-size:10px;color:inherit;opacity:.75}.slms-attendance-item.present .slms-att-date{background:#ddfbef;color:#008060}.slms-attendance-item.absent .slms-att-date{background:#ffe8e8;color:#c62828}.slms-attendance-item.late .slms-att-date{background:#fff4da;color:#b77900}.slms-attendance-item.leave .slms-att-date{background:#f1eaff;color:#6d35c2}.slms-attendance-item h3{margin:0 0 4px;font-size:14px;color:#061633}.slms-attendance-item p{margin:0;color:#8f98b2;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}@media(max-width:900px){.slms-attendance-hero{grid-template-columns:1fr 104px}.slms-attendance-hero>.slms-pill{grid-column:1 / -1;justify-self:start}.slms-attendance-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.slms-attendance-hero{grid-template-columns:1fr;min-height:0;padding:16px}.slms-attendance-ring{width:92px;height:92px}.slms-attendance-hero h2{font-size:34px;line-height:38px}.slms-attendance-stats{gap:10px}.slms-attendance-stats div{min-height:72px;padding:12px}.slms-attendance-list{padding:6px 14px 12px}.slms-attendance-item{grid-template-columns:54px minmax(0,1fr);align-items:start;gap:11px}.slms-attendance-item>.slms-pill{grid-column:2;justify-self:start}.slms-attendance-item:before{left:27px}.slms-att-date{width:50px;height:58px}.slms-attendance-item p{white-space:normal}}
    @media(max-width:520px){.slms-attendance-page{gap:12px}.slms-attendance-hero{border-radius:14px;padding:14px;grid-template-columns:minmax(0,1fr) 84px;align-items:center;gap:10px}.slms-attendance-hero:after{width:130px;height:130px;right:-48px;top:-52px}.slms-attendance-hero small{font-size:10px;letter-spacing:.04em}.slms-attendance-hero h2{font-size:30px;line-height:34px;margin:6px 0 2px}.slms-attendance-hero p{font-size:11.5px;line-height:16px}.slms-attendance-ring{width:76px;height:76px;justify-self:end}.slms-attendance-ring b{font-size:13px}.slms-attendance-hero>.slms-pill{grid-column:1 / -1;width:max-content;max-width:100%;justify-self:start}.slms-attendance-stats{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.slms-attendance-stats div{min-height:64px;border-radius:12px;padding:10px 12px}.slms-attendance-stats b{font-size:20px;line-height:24px}.slms-attendance-stats span{font-size:10.5px}.slms-attendance-records .slms-card-head{padding:12px 14px;min-height:56px}.slms-attendance-records .slms-card-head h2{font-size:13.5px}.slms-attendance-records .slms-card-head p{font-size:11px}.slms-attendance-records .slms-mini-chip{height:24px;font-size:10.5px;padding:0 8px}.slms-attendance-list{padding:4px 12px 10px}.slms-attendance-item{grid-template-columns:48px minmax(0,1fr);gap:10px;min-height:78px;padding:11px 0}.slms-attendance-item:before{left:24px}.slms-att-date{width:46px;height:54px;border-radius:12px}.slms-att-date b{font-size:16px;line-height:18px}.slms-att-date span,.slms-att-date small{font-size:9.5px}.slms-attendance-item h3{font-size:13px;line-height:17px}.slms-attendance-item p{font-size:11px;line-height:16px}.slms-attendance-item>.slms-pill{grid-column:2;margin-top:-2px}}
    @media(max-width:380px){.slms-attendance-hero{grid-template-columns:1fr}.slms-attendance-ring{justify-self:start}.slms-attendance-stats{grid-template-columns:1fr 1fr}.slms-attendance-records .slms-card-head{align-items:flex-start;flex-direction:column}.slms-attendance-records .slms-mini-chip{align-self:flex-start}}
    .slms-attendance-ring{border-radius:999px;background:conic-gradient(var(--attendance-color) var(--attendance-percent),rgba(255,255,255,.22) 0);display:grid;place-items:center;padding:10px;isolation:isolate}.slms-attendance-ring:before{content:"";grid-area:1/1;width:100%;height:100%;border-radius:999px;background:#152b67}.slms-attendance-ring b{position:relative!important;inset:auto!important;grid-area:1/1;z-index:1;display:grid;place-items:center}
    .slms-progress-page{display:grid;gap:14px}.slms-progress-hero{position:relative;overflow:hidden;border:1px solid #dce3f0;border-radius:16px;background:linear-gradient(135deg,#fff 0%,#f8fbff 52%,#eef7ff 100%);min-height:150px;padding:20px;display:grid;grid-template-columns:minmax(0,1fr) 116px 290px;align-items:center;gap:18px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-progress-hero:before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 999px 999px 0;background:#536bff}.slms-progress-hero small{display:block;color:#536bff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-progress-hero h2{margin:8px 0 4px;font-size:42px;line-height:46px;color:#061633}.slms-progress-hero p{margin:0;color:#7c86a1}.slms-progress-ring{width:104px;height:104px;border-radius:999px;background:conic-gradient(#18a889 var(--progress-percent),#e8edf6 0);display:grid;place-items:center;padding:10px;justify-self:center;isolation:isolate}.slms-progress-ring.practical{background:conic-gradient(#f5a623 var(--progress-percent),#e8edf6 0)}.slms-progress-ring:before{content:"";grid-area:1/1;width:100%;height:100%;border-radius:999px;background:#fff}.slms-progress-ring b{grid-area:1/1;z-index:1;color:#061633;font-size:15px}.slms-progress-summary{display:grid;grid-template-columns:1fr 1fr;gap:10px}.slms-progress-summary div{min-height:76px;border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:13px;display:grid;align-content:center}.slms-progress-summary b{font-size:24px;line-height:28px;color:#061633}.slms-progress-summary span{color:#8f98b2;font-size:11.5px}.slms-progress-layout{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:14px;align-items:start}.slms-progress-modules,.slms-progress-practicals{padding:0;overflow:hidden}.slms-module-grid{display:grid;gap:12px;padding:16px 18px}.slms-module-card{border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:14px;display:grid;gap:12px}.slms-module-top{display:flex;justify-content:space-between;gap:12px;align-items:flex-start}.slms-module-top h3,.slms-practical-item h3{margin:0;font-size:14px;line-height:18px;color:#061633}.slms-module-top p,.slms-practical-item p{margin:4px 0 0;color:#8f98b2;font-size:11.5px}.slms-module-top b{font-size:18px;color:#061633}.slms-module-bar{height:8px;border-radius:999px;background:#e9edf5;overflow:hidden}.slms-module-bar span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#536bff,#18a889)}.slms-topic-list{display:grid}.slms-topic-row{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;padding:10px 0;border-top:1px solid #edf1f7}.slms-topic-row b{display:block;font-size:12.5px;color:#061633;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-topic-row p{margin:3px 0 0;color:#8f98b2;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-practical-meter{display:grid;place-items:center;gap:10px;padding:18px;border-bottom:1px solid #edf1f7}.slms-practical-meter p{margin:0;color:#8f98b2;font-size:12px}.slms-practical-list{display:grid;padding:8px 18px 14px}.slms-practical-item{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #edf1f7}.slms-practical-item:last-child{border-bottom:0}@media(max-width:1120px){.slms-progress-hero{grid-template-columns:minmax(0,1fr) 104px}.slms-progress-summary{grid-column:1 / -1}.slms-progress-layout{grid-template-columns:1fr}}@media(max-width:700px){.slms-progress-hero{grid-template-columns:minmax(0,1fr) 86px;min-height:0;border-radius:14px;padding:16px;gap:12px}.slms-progress-hero h2{font-size:34px;line-height:38px}.slms-progress-hero p{font-size:11.5px;line-height:16px}.slms-progress-ring{width:78px;height:78px;padding:8px}.slms-progress-ring b{font-size:12.5px}.slms-progress-summary{grid-template-columns:1fr 1fr;gap:8px}.slms-progress-summary div{min-height:64px;padding:11px}.slms-progress-summary b{font-size:20px;line-height:24px}.slms-module-grid{padding:12px;gap:10px}.slms-module-card{padding:12px}.slms-topic-row,.slms-practical-item{grid-template-columns:1fr;justify-items:start;gap:8px}.slms-topic-row b,.slms-topic-row p{white-space:normal}.slms-practical-meter{padding:14px}.slms-practical-list{padding:4px 14px 12px}.slms-progress-practicals .slms-card-head,.slms-progress-modules .slms-card-head{padding:12px 14px;min-height:56px}}@media(max-width:420px){.slms-progress-hero{grid-template-columns:1fr}.slms-progress-ring{justify-self:start}.slms-progress-summary{grid-template-columns:1fr}.slms-module-top{display:grid}.slms-module-top b{font-size:16px}}
    .slms-internship-empty-card{padding:0;overflow:hidden}.slms-internship-empty{min-height:260px;display:grid;grid-template-columns:250px minmax(0,1fr);align-items:center;gap:24px;padding:24px 34px;background:linear-gradient(135deg,#fff 0%,#f7f9ff 58%,#eef7ff 100%);position:relative}.slms-internship-empty:before{content:"";position:absolute;left:0;top:24px;bottom:24px;width:4px;border-radius:0 999px 999px 0;background:#536bff}.slms-internship-lottie{width:220px;height:220px;justify-self:center}.slms-internship-empty small{display:block;color:#536bff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-internship-empty h2{margin:8px 0 8px;color:#061633;font-size:24px;line-height:30px}.slms-internship-empty p{margin:0;max-width:560px;color:#7c86a1;font-size:13px;line-height:1.55}.slms-internship-empty span{width:max-content;max-width:100%;display:inline-flex;align-items:center;margin-top:16px;border-radius:999px;background:#eef2ff;color:#3157f6;padding:8px 12px;font-size:12px;font-weight:900}@media(max-width:760px){.slms-internship-empty{grid-template-columns:1fr;text-align:center;padding:20px 18px;gap:8px}.slms-internship-empty:before{top:18px;bottom:auto;left:18px;right:18px;width:auto;height:4px;border-radius:999px}.slms-internship-lottie{width:180px;height:180px}.slms-internship-empty h2{font-size:20px;line-height:25px}.slms-internship-empty p{font-size:12px}.slms-internship-empty span{justify-self:center}}
    .slms-internship-lottie{width:250px;height:220px;justify-self:center;display:grid;place-items:center;border-radius:28px;background:linear-gradient(180deg,#f8fbff 0%,#edf4ff 100%);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(83,107,255,.12)}
    .slms-internship-lottie>div{width:100%!important;height:100%!important}
    .slms-internship-lottie svg{animation:slms-hourglass-rotate 4s ease-in-out infinite;transform-origin:center;transform-box:fill-box}
    @keyframes slms-hourglass-rotate{0%,34%{transform:rotate(0deg)}50%,84%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}
    @media(max-width:760px){.slms-internship-lottie{width:200px;height:180px;border-radius:22px}}
    .slms-real-hourglass{width:250px;height:220px;justify-self:center;position:relative;display:grid;place-items:center;border-radius:28px;background:radial-gradient(circle at 42% 38%,#fff 0 18%,#f7faff 19% 45%,#edf4ff 78%);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(83,107,255,.12)}
    .slms-real-hourglass:before{content:"";position:absolute;inset:18px;border-radius:24px;background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(255,255,255,0));opacity:.8}
    .slms-hourglass-shadow{position:absolute;left:64px;right:64px;bottom:29px;height:18px;border-radius:999px;background:rgba(40,58,112,.12);filter:blur(5px);animation:slms-hourglass-shadow 4s ease-in-out infinite}
    .slms-hourglass-flip{position:relative;width:132px;height:172px;transform-style:preserve-3d;animation:slms-hourglass-flip 4s ease-in-out infinite}
    .slms-hourglass-cap{position:absolute;left:8px;right:8px;height:16px;border-radius:999px;background:linear-gradient(180deg,#6f83ff,#455fff);box-shadow:0 7px 14px rgba(69,95,255,.22),inset 0 2px 2px rgba(255,255,255,.32)}
    .slms-hourglass-cap.top{top:2px}.slms-hourglass-cap.bottom{bottom:2px}
    .slms-hourglass-post{position:absolute;top:17px;bottom:17px;width:4px;border-radius:999px;background:linear-gradient(180deg,#7d90ff,#4c66ff);box-shadow:0 0 0 1px rgba(255,255,255,.35)}
    .slms-hourglass-post.left{left:18px}.slms-hourglass-post.right{right:18px}
    .slms-hourglass-glass{position:absolute;left:31px;right:31px;height:70px;background:linear-gradient(110deg,rgba(255,255,255,.8),rgba(226,237,255,.42) 48%,rgba(255,255,255,.72));border:2px solid rgba(94,116,255,.42);box-shadow:inset 12px 0 18px rgba(255,255,255,.58),inset -9px 0 14px rgba(83,107,255,.09);backdrop-filter:blur(3px)}
    .slms-hourglass-glass.top{top:20px;clip-path:polygon(0 0,100% 0,55% 100%,45% 100%);border-radius:16px 16px 8px 8px}
    .slms-hourglass-glass.bottom{bottom:20px;clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);border-radius:8px 8px 16px 16px}
    .slms-hourglass-sand{position:absolute;left:39px;right:39px;background:linear-gradient(180deg,#ffd46f,#f5a623 68%,#d98800);filter:drop-shadow(0 4px 5px rgba(184,122,0,.18))}
    .slms-hourglass-sand.top{top:36px;height:42px;clip-path:polygon(0 0,100% 0,54% 100%,46% 100%);animation:slms-sand-top 4s ease-in-out infinite}
    .slms-hourglass-sand.bottom{bottom:35px;height:45px;clip-path:polygon(48% 0,52% 0,100% 100%,0 100%);animation:slms-sand-bottom 4s ease-in-out infinite}
    .slms-hourglass-stream{position:absolute;left:50%;top:76px;width:5px;height:49px;border-radius:999px;background:linear-gradient(180deg,#ffd46f,#f5a623);transform:translateX(-50%);box-shadow:0 0 9px rgba(245,166,35,.45);animation:slms-sand-stream 4s linear infinite}
    .slms-hourglass-grain{position:absolute;width:5px;height:5px;border-radius:999px;background:#f5a623;left:50%;top:86px;box-shadow:0 0 7px rgba(245,166,35,.4);animation:slms-sand-grain 1.4s linear infinite}
    .slms-hourglass-grain.one{margin-left:-9px;animation-delay:.1s}.slms-hourglass-grain.two{margin-left:7px;animation-delay:.48s}.slms-hourglass-grain.three{margin-left:0;animation-delay:.86s}
    @keyframes slms-hourglass-flip{0%,38%{transform:rotateZ(0deg) rotateY(0deg)}50%,88%{transform:rotateZ(180deg) rotateY(0deg)}100%{transform:rotateZ(360deg) rotateY(0deg)}}
    @keyframes slms-hourglass-shadow{0%,38%,88%,100%{transform:scaleX(1);opacity:.9}50%{transform:scaleX(.72);opacity:.5}}
    @keyframes slms-sand-top{0%,38%{transform:scaleY(1);transform-origin:50% 0}50%,88%{transform:scaleY(.42);transform-origin:50% 0}100%{transform:scaleY(1);transform-origin:50% 0}}
    @keyframes slms-sand-bottom{0%,38%{transform:scaleY(.46);transform-origin:50% 100%}50%,88%{transform:scaleY(1);transform-origin:50% 100%}100%{transform:scaleY(.46);transform-origin:50% 100%}}
    @keyframes slms-sand-stream{0%,40%,90%,100%{opacity:1}48%,55%{opacity:.15}}
    @keyframes slms-sand-grain{0%{transform:translate(-50%,0) scale(.75);opacity:0}18%{opacity:1}100%{transform:translate(-50%,48px) scale(1.05);opacity:0}}
    @media(max-width:760px){.slms-real-hourglass{width:200px;height:180px;border-radius:22px}.slms-hourglass-flip{transform:scale(.82);animation:slms-hourglass-flip-mobile 4s ease-in-out infinite}@keyframes slms-hourglass-flip-mobile{0%,38%{transform:scale(.82) rotateZ(0deg)}50%,88%{transform:scale(.82) rotateZ(180deg)}100%{transform:scale(.82) rotateZ(360deg)}}}
    .slms-real-hourglass{background:radial-gradient(circle at 42% 34%,#ffffff 0 18%,#f8fbff 19% 45%,#edf4ff 80%);box-shadow:inset 0 0 0 1px rgba(83,107,255,.14),0 14px 28px rgba(37,57,126,.08)}
    .slms-hourglass-flip{animation:slms-hourglass-idle 3.2s ease-in-out infinite!important;transform-origin:center}
    .slms-hourglass-cap{height:15px;left:10px;right:10px;background:linear-gradient(180deg,#6f83ff 0%,#4f6bff 56%,#304fe0 100%);box-shadow:0 8px 18px rgba(49,87,246,.23),inset 0 2px 2px rgba(255,255,255,.35)}
    .slms-hourglass-post{top:18px;bottom:18px;width:5px;background:linear-gradient(180deg,#7f91ff,#3655f0);opacity:.95}
    .slms-hourglass-post.left{left:21px}.slms-hourglass-post.right{right:21px}
    .slms-hourglass-glass{left:36px;right:36px;height:70px;border:2px solid rgba(83,107,255,.58);background:linear-gradient(115deg,rgba(255,255,255,.88) 0%,rgba(223,235,255,.52) 45%,rgba(255,255,255,.82) 100%);box-shadow:inset 10px 0 16px rgba(255,255,255,.65),inset -8px 0 16px rgba(83,107,255,.12),0 4px 12px rgba(83,107,255,.08)}
    .slms-hourglass-glass.top{top:22px}.slms-hourglass-glass.bottom{bottom:22px}
    .slms-hourglass-sand{left:45px;right:45px;background:linear-gradient(180deg,#ffd87a 0%,#f6ad2f 64%,#d88900 100%);filter:drop-shadow(0 4px 5px rgba(184,122,0,.2))}
    .slms-hourglass-sand.top{top:39px}.slms-hourglass-sand.bottom{bottom:38px}
    .slms-hourglass-stream{top:78px;height:48px;width:4px;background:linear-gradient(180deg,#ffd87a,#f6ad2f,#d88900)}
    .slms-hourglass-grain{background:#f6ad2f}
    .slms-hourglass-shadow{background:rgba(37,57,126,.16);opacity:.9}
    @keyframes slms-hourglass-idle{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-4px) rotate(1deg)}}
    @media(max-width:760px){.slms-hourglass-flip{animation:slms-hourglass-idle-mobile 3.2s ease-in-out infinite!important}@keyframes slms-hourglass-idle-mobile{0%,100%{transform:scale(.82) translateY(0) rotate(-1deg)}50%{transform:scale(.82) translateY(-4px) rotate(1deg)}}}
    .slms-real-hourglass{width:250px;height:220px;justify-self:center;display:grid;place-items:center;border-radius:28px;background:radial-gradient(circle at 44% 34%,#fff 0 17%,#f9fbff 18% 46%,#edf4ff 82%);overflow:hidden;box-shadow:inset 0 0 0 1px rgba(83,107,255,.14),0 14px 28px rgba(37,57,126,.08)}
    .slms-hourglass-svg{width:224px;height:204px;display:block;overflow:visible}
    .slms-hourglass-body{transform-origin:120px 110px;animation:slms-hourglass-svg-idle 3.6s ease-in-out infinite}
    .slms-hourglass-floor{fill:#24386b;opacity:.13;filter:blur(3px);transform-origin:center;animation:slms-hourglass-floor 3.6s ease-in-out infinite}
    .slms-top-sand{transform-origin:120px 56px;animation:slms-svg-top-sand 3.2s ease-in-out infinite}
    .slms-bottom-sand{transform-origin:120px 173px;animation:slms-svg-bottom-sand 3.2s ease-in-out infinite}
    .slms-sand-stream-svg{animation:slms-svg-stream 1.1s ease-in-out infinite}
    .slms-sand-dot{animation:slms-svg-grain 1.25s linear infinite;transform-origin:center;opacity:0}
    .slms-sand-dot.dot-two{animation-delay:.38s}.slms-sand-dot.dot-three{animation-delay:.74s}
    .slms-hourglass-highlight{animation:slms-svg-shine 3.6s ease-in-out infinite}
    @keyframes slms-hourglass-svg-idle{0%,100%{transform:translateY(0) rotate(-.8deg)}50%{transform:translateY(-3px) rotate(.8deg)}}
    @keyframes slms-hourglass-floor{0%,100%{transform:scaleX(1);opacity:.13}50%{transform:scaleX(.86);opacity:.09}}
    @keyframes slms-svg-top-sand{0%,18%{transform:scaleY(1)}72%,100%{transform:scaleY(.42)}}
    @keyframes slms-svg-bottom-sand{0%,18%{transform:scaleY(.48)}72%,100%{transform:scaleY(1)}}
    @keyframes slms-svg-stream{0%,100%{opacity:.9;transform:scaleY(1)}50%{opacity:.45;transform:scaleY(.72)}}
    @keyframes slms-svg-grain{0%{opacity:0;transform:translateY(-4px) scale(.7)}20%{opacity:1}100%{opacity:0;transform:translateY(36px) scale(1.05)}}
    @keyframes slms-svg-shine{0%,100%{opacity:.52}50%{opacity:.88}}
    @media(max-width:760px){.slms-real-hourglass{width:200px;height:180px;border-radius:22px}.slms-hourglass-svg{width:188px;height:170px}}
    .slms-internship-page{display:grid;grid-template-columns:minmax(0,1fr) 356px;gap:14px;align-items:start}.slms-internship-home{position:relative;overflow:hidden;min-height:186px;padding:20px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:18px;background:linear-gradient(135deg,#fff 0%,#f8fbff 62%,#eef7ff 100%)}.slms-internship-home:before{content:"";position:absolute;left:0;top:18px;bottom:18px;width:4px;border-radius:0 999px 999px 0;background:#536bff}.slms-internship-home small{display:block;color:#536bff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-internship-home h2{margin:8px 0 5px;color:#061633;font-size:24px;line-height:30px}.slms-internship-home p{margin:0;color:#7c86a1;font-size:12.5px}.slms-internship-home>.slms-pill{justify-self:end}.slms-internship-facts{grid-column:1 / -1;display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px}.slms-internship-facts div{min-height:72px;border:1px solid #dfe6f4;border-radius:13px;background:#fff;padding:13px;display:grid;align-content:center;box-shadow:0 1px 2px rgba(16,20,40,.03)}.slms-internship-facts span{display:block;color:#8f98b2;font-size:11px;font-weight:800}.slms-internship-facts b{margin-top:5px;color:#061633;font-size:13.5px;line-height:18px;word-break:break-word}.slms-daily-log-card{padding:0;overflow:hidden}.slms-check-actions{display:grid;gap:12px;padding:16px 18px}.slms-check-form{border:1px solid #dfe6f4;border-radius:14px;background:#fff;padding:12px;display:grid;gap:11px}.slms-check-form label{min-height:52px;border:1px dashed #cfd8ea;border-radius:12px;background:#f8fbff;padding:10px 12px;display:grid;grid-template-columns:18px minmax(0,1fr);align-items:center;gap:10px;color:#405070;font-size:12px;font-weight:800;cursor:pointer}.slms-check-form label svg{color:#536bff}.slms-check-form.logout label svg{color:#f5a623}.slms-check-form input{grid-column:1 / -1;width:100%;font-size:12px;color:#7c86a1}.slms-check-form button{width:max-content;height:42px;border:0;border-radius:10px;background:#536bff;color:#fff;padding:0 16px;display:inline-flex;align-items:center;gap:8px;font-weight:900;box-shadow:0 10px 22px rgba(83,107,255,.25)}.slms-check-form.logout button{background:#18a889;box-shadow:0 10px 22px rgba(24,168,137,.22)}.slms-check-form button:disabled{opacity:.65;cursor:not-allowed}.slms-internship-logs-card{grid-column:1 / -1;padding:0;overflow:hidden}.slms-internship-log-list{display:grid;padding:8px 18px 16px}.slms-internship-log-item{min-height:72px;display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:12px;border-bottom:1px solid #edf1f7;padding:12px 0}.slms-internship-log-item:last-child{border-bottom:0}.slms-internship-log-item>span{width:40px;height:40px;border-radius:12px;background:#eef2ff;color:#536bff;display:grid;place-items:center}.slms-internship-log-item b{display:block;color:#061633;font-size:13.5px}.slms-internship-log-item p{margin:4px 0 0;color:#8f98b2;font-size:11.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-internship-log-empty{min-height:150px;display:grid;place-items:center;text-align:center;align-content:center;gap:7px;color:#8f98b2}.slms-internship-log-empty svg{color:#18a889}.slms-internship-log-empty b{color:#061633;font-size:14px}.slms-internship-log-empty p{margin:0;max-width:340px;font-size:12px;line-height:18px}@media(max-width:1120px){.slms-internship-page{grid-template-columns:1fr}.slms-daily-log-card{grid-row:auto}.slms-check-actions{grid-template-columns:1fr 1fr}.slms-internship-logs-card{grid-column:auto}}@media(max-width:760px){.slms-internship-home{min-height:0;padding:16px;border-radius:14px}.slms-internship-facts{grid-template-columns:1fr}.slms-check-actions{grid-template-columns:1fr;padding:14px}.slms-internship-log-list{padding:6px 14px 14px}.slms-internship-log-item{grid-template-columns:40px minmax(0,1fr);align-items:start}.slms-internship-log-item>.slms-pill{grid-column:2;justify-self:start}.slms-internship-log-item p{white-space:normal}.slms-internship-home h2{font-size:21px;line-height:26px}}@media(max-width:460px){.slms-internship-home{grid-template-columns:1fr}.slms-internship-home>.slms-pill{justify-self:start}.slms-check-form button{width:100%;justify-content:center}.slms-check-form label{grid-template-columns:18px 1fr}.slms-internship-log-empty{min-height:132px;padding:16px}}
    .slms-internship-page{grid-template-columns:minmax(0,1fr) 356px;gap:14px;align-items:start}.slms-internship-home{min-height:210px;padding:18px 20px;grid-template-columns:minmax(0,1fr) max-content;align-content:start;row-gap:16px}.slms-internship-home>.slms-pill{place-self:start end;width:auto!important;height:28px!important;min-width:0!important;min-height:0!important;padding:0 12px!important;border-radius:999px!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;background:#eef2f8!important;color:#405070!important;font-size:11px!important;line-height:1!important}.slms-internship-facts{align-self:end}.slms-internship-facts div{min-height:72px;padding:12px 13px}.slms-daily-log-card .slms-card-head.compact{min-height:56px;padding:13px 18px}.slms-check-actions{gap:10px;padding:12px 18px 16px}.slms-check-form{padding:10px 12px;gap:10px;border-radius:13px}.slms-check-form label{min-height:48px;padding:9px 12px}.slms-check-form input{height:22px;padding:0;border:0;background:transparent}.slms-check-form button{height:38px;border-radius:9px;padding:0 15px}.slms-internship-logs-card{margin-top:0}.slms-internship-log-list{padding:0 18px 14px}.slms-internship-log-empty{min-height:112px;padding:14px}.slms-internship-log-empty svg{margin-bottom:2px}@media(max-width:1120px){.slms-internship-page{grid-template-columns:1fr}.slms-check-actions{grid-template-columns:1fr 1fr}.slms-internship-home{min-height:0}}@media(max-width:760px){.slms-internship-home{grid-template-columns:1fr;gap:12px;padding:16px}.slms-internship-home>.slms-pill{place-self:start}.slms-internship-facts{align-self:auto}.slms-check-actions{grid-template-columns:1fr;padding:12px 14px 14px}.slms-internship-log-empty{min-height:118px}}
    .slms-one-check{padding:16px 18px 18px;display:grid;gap:10px}.slms-one-check>input{position:absolute;opacity:0;pointer-events:none;width:1px;height:1px}.slms-one-check button{width:100%;min-height:118px;border:0;border-radius:16px;background:linear-gradient(135deg,#536bff,#3157f6);color:#fff;display:grid;grid-template-columns:48px minmax(0,1fr);align-items:center;gap:16px;padding:18px;text-align:left;box-shadow:0 16px 34px rgba(83,107,255,.25);cursor:pointer}.slms-one-check button svg{width:48px;height:48px;border-radius:15px;background:rgba(255,255,255,.14);padding:12px;justify-self:start}.slms-one-check button span{display:grid;gap:5px;min-width:0;align-content:center}.slms-one-check button b{font-size:27px;line-height:32px;letter-spacing:.02em;max-width:100%;overflow-wrap:anywhere}.slms-one-check button b.done{display:grid;gap:0;font-size:0;line-height:1}.slms-one-check button b.done span{display:block!important;font-size:23px!important;line-height:26px!important;font-weight:900;white-space:nowrap}.slms-one-check button b.done strong{display:block!important;font-size:29px!important;line-height:32px!important;font-weight:900;color:#fff;white-space:nowrap}.slms-one-check button small{color:#eef4ff;font-size:12px;font-weight:900;line-height:16px;max-width:230px}.slms-one-check button.running{background:linear-gradient(135deg,#10192f,#213b94)}.slms-one-check button.complete{background:linear-gradient(135deg,#18a889,#0f8069);box-shadow:0 16px 34px rgba(24,168,137,.2);cursor:not-allowed}.slms-one-check button.complete span{gap:0}.slms-one-check button:disabled{opacity:.92}.slms-one-check p{margin:0;color:#7c86a1;font-size:11.5px;line-height:17px}.slms-daily-log-card .slms-card-head.compact h2{margin-bottom:2px}@media(max-width:760px){.slms-one-check{padding:14px}.slms-one-check button{min-height:104px;grid-template-columns:42px minmax(0,1fr);gap:13px;padding:15px}.slms-one-check button b{font-size:23px;line-height:28px}.slms-one-check button b.done span{font-size:21px!important;line-height:24px!important}.slms-one-check button b.done strong{font-size:28px!important;line-height:31px!important}.slms-one-check button svg{width:42px;height:42px;padding:10px}.slms-one-check button small{font-size:11.5px;line-height:15px;max-width:none}}@media(max-width:420px){.slms-one-check button{grid-template-columns:40px minmax(0,1fr);gap:11px}.slms-one-check button b{font-size:21px;line-height:25px}.slms-one-check button b.done span{font-size:20px!important;line-height:23px!important}.slms-one-check button b.done strong{font-size:27px!important;line-height:30px!important}}
    .slms-camera-error{border:1px solid #fed7aa;background:#fff7ed;color:#b45309;border-radius:10px;padding:9px 11px;font-size:11.5px;font-weight:800}.slms-camera-overlay{z-index:950}.slms-camera-modal{width:min(440px,calc(100vw - 28px));background:#fff;border:1px solid #dce3f0;border-radius:16px;overflow:hidden;box-shadow:0 26px 80px rgba(6,15,40,.3)}.slms-camera-head{min-height:62px;padding:14px 16px;border-bottom:1px solid #edf1f7;display:flex;align-items:center;justify-content:space-between;gap:12px}.slms-camera-head h2{margin:0;font-size:15px;line-height:19px}.slms-camera-head p{margin:3px 0 0;color:#8f98b2;font-size:11.5px}.slms-camera-head button{width:32px;height:32px;border:0;border-radius:9px;background:#f4f6fb;color:#56607a;display:grid;place-items:center}.slms-camera-preview{background:#081127;position:relative;aspect-ratio:3/4;max-height:min(64vh,560px);display:grid;place-items:center;overflow:hidden}.slms-camera-preview video{width:100%;height:100%;object-fit:cover;transform:scaleX(-1)}.slms-camera-preview canvas{display:none}.slms-camera-actions{display:flex;justify-content:flex-end;gap:10px;padding:13px 16px 16px}.slms-camera-actions button{height:38px;border-radius:9px;border:1px solid #dce3f0;background:#fff;color:#405070;padding:0 14px;font-weight:900}.slms-camera-actions .primary{border:0;background:#536bff;color:#fff;display:inline-flex;align-items:center;gap:8px;box-shadow:0 10px 22px rgba(83,107,255,.24)}@media(max-width:520px){.slms-camera-modal{width:calc(100vw - 22px);border-radius:14px}.slms-camera-preview{max-height:58vh}.slms-camera-actions{display:grid;grid-template-columns:1fr}.slms-camera-actions button{width:100%;justify-content:center}}
    .slms-camera-modal{width:min(470px,calc(100vw - 28px));border-radius:18px}.slms-camera-head{padding:15px 18px}.slms-camera-head h2{font-size:16px}.slms-camera-preview{margin:14px 18px 0;border-radius:18px;aspect-ratio:1/1;max-height:min(58vh,420px);background:linear-gradient(135deg,#0b1226,#172441);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);isolation:isolate}.slms-camera-preview:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at center,transparent 0 33%,rgba(8,17,39,.18) 34%,rgba(8,17,39,.58) 100%);z-index:2;pointer-events:none}.slms-face-guide{position:absolute;z-index:3;left:50%;top:50%;width:min(62%,245px);aspect-ratio:1;border:4px solid #ef4444;border-radius:999px;transform:translate(-50%,-50%);box-shadow:0 0 0 999px rgba(8,17,39,.06),0 0 22px rgba(239,68,68,.3);transition:border-color .18s ease,box-shadow .18s ease}.slms-face-guide.detected{border-color:#18a889;box-shadow:0 0 0 999px rgba(8,17,39,.04),0 0 26px rgba(24,168,137,.38)}.slms-face-guide span{position:absolute;left:50%;bottom:-36px;transform:translateX(-50%);width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 7px rgba(239,68,68,.16)}.slms-face-guide.detected span{background:#18a889;box-shadow:0 0 0 7px rgba(24,168,137,.16)}.slms-face-status{position:absolute;z-index:4;left:14px;right:14px;bottom:14px;min-height:36px;border-radius:999px;background:rgba(8,17,39,.78);backdrop-filter:blur(8px);color:#fff;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 12px;font-size:11.5px;font-weight:900;text-align:center}.slms-face-status i{width:10px;height:10px;border-radius:999px;background:#ef4444;box-shadow:0 0 0 5px rgba(239,68,68,.16);flex:0 0 10px}.slms-face-status.detected i{background:#18a889;box-shadow:0 0 0 5px rgba(24,168,137,.18)}.slms-camera-actions{padding:14px 18px 18px}.slms-camera-actions .primary{background:#536bff}@media(max-width:520px){.slms-camera-preview{margin:12px 14px 0;border-radius:16px;max-height:54vh}.slms-face-guide{width:68%;border-width:3px}.slms-face-status{left:10px;right:10px;bottom:10px;border-radius:14px;min-height:34px;font-size:10.8px}.slms-camera-actions{padding:12px 14px 16px}}
    .slms-brand{display:flex;align-items:center;gap:10px}.brand-mark{width:32px;height:32px;border-radius:9px;background:#fff;display:flex;align-items:center;justify-content:center;flex:0 0 32px;box-shadow:0 4px 10px rgba(15,23,42,.18);overflow:hidden}.brand-mark img{width:23px;height:29px;display:block;object-fit:contain}.brand-text b{display:block;font-size:14px;font-weight:700;line-height:1.2}.slms-sidebar>.slms-brand .brand-text b{color:#fff}.slms-login-card .slms-brand .brand-text b{color:#071833;font-size:16px}.slms-sidebar{gap:16px}.slms-student-mini{display:flex!important;align-items:center;gap:12px;background:linear-gradient(180deg,#172441,#141f38);border-color:#293b66;border-radius:14px;padding:14px!important;min-height:94px}.slms-student-mini .slms-avatar{position:relative;width:50px!important;height:50px!important;border-radius:999px!important;background:linear-gradient(135deg,#f8fbff,#dfe7ff)!important;color:#3157f6!important;box-shadow:inset 0 0 0 1px rgba(79,107,255,.08),0 8px 18px rgba(0,0,0,.14);flex:0 0 50px}.slms-avatar i{position:absolute;right:-2px;bottom:-2px;width:18px;height:18px;border-radius:999px;background:#4f6bff;color:#fff;border:2px solid #172441;display:grid;place-items:center;font-style:normal;font-size:10px;font-weight:900}.slms-student-mini div{min-width:0;display:grid;gap:3px}.slms-student-mini b{font-size:13.5px;line-height:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-student-mini small{font-size:11.5px;line-height:15px}.slms-student-mini em{width:max-content;max-width:100%;display:inline-flex;margin-top:4px;border-radius:999px;background:rgba(79,107,255,.2);color:#dce4ff;padding:4px 8px;font-style:normal;font-size:10.5px;font-weight:800;line-height:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.slms-sidebar nav{gap:6px}.slms-sidebar nav button{padding-left:13px}
    .slms-page:not(.slms-login-page){height:100vh;min-height:0;overflow:hidden}.slms-page:not(.slms-login-page) .slms-sidebar{height:100vh;min-height:0;position:sticky;top:0;overflow-y:auto;overscroll-behavior:contain}.slms-page:not(.slms-login-page) .slms-content{height:100vh;min-height:0;overflow-y:auto;overscroll-behavior:contain}.slms-sidebar::-webkit-scrollbar,.slms-content::-webkit-scrollbar{width:8px}.slms-sidebar::-webkit-scrollbar-thumb,.slms-content::-webkit-scrollbar-thumb{background:#c8d2e5;border-radius:999px}.slms-sidebar::-webkit-scrollbar-track,.slms-content::-webkit-scrollbar-track{background:transparent}@media(max-width:980px){.slms-page:not(.slms-login-page){height:auto;overflow:visible}.slms-page:not(.slms-login-page) .slms-sidebar,.slms-page:not(.slms-login-page) .slms-content{height:auto;overflow:visible}}
    .slms-page:not(.slms-login-page){grid-template-columns:228px 1fr!important}.slms-sidebar{width:228px!important;background:#0b1124!important;border-right:1px solid #26314d;padding:0!important;gap:0!important}.slms-sidebar>.slms-brand{height:66px;padding:0 14px;border-bottom:1px solid #26314d;gap:10px}.slms-sidebar>.slms-brand .brand-text b{font-size:14px;font-weight:700;color:#fff}.slms-nav-groups{display:grid!important;gap:18px!important;padding:18px 10px 14px}.slms-nav-group{display:grid;gap:4px}.slms-nav-group p{margin:0 0 7px 2px;color:#8190bf;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}.slms-nav-group button{height:38px!important;border-radius:8px!important;color:#cfdaff!important;background:transparent!important;padding:0 11px!important;font-size:13.5px!important;font-weight:600!important;line-height:1!important;box-shadow:none!important;display:flex!important;align-items:center!important;gap:10px!important}.slms-nav-group button svg{width:16px;height:16px;stroke-width:1.9;flex:0 0 16px}.slms-nav-group button.active{background:#536bff!important;color:#fff!important;box-shadow:0 8px 20px rgba(83,107,255,.25)!important}.slms-user-card{position:relative;margin:auto 10px 12px;background:#1a2545;border:1px solid #303d63;border-radius:9px;padding:9px 10px;min-height:58px;display:grid;grid-template-columns:36px minmax(0,1fr) 26px;align-items:center;gap:9px}.slms-user-card:before{content:"";position:absolute;left:-10px;right:-10px;top:-14px;height:1px;background:#26314d}.slms-user-card .slms-avatar{width:36px!important;height:36px!important;border-radius:999px!important;background:linear-gradient(135deg,#f7fbff,#dfe8ff)!important;color:#3157f6!important;box-shadow:inset 0 0 0 1px rgba(79,107,255,.1);display:grid!important;place-items:center!important;overflow:hidden}.slms-user-card .slms-avatar svg{display:block;width:21px;height:21px;stroke-width:2}.slms-user-card b{display:block;color:#fff;font-size:12px;font-weight:700;line-height:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-user-card small{display:block;color:#96a2ca;font-size:10.5px;line-height:13px;margin-top:2px}.slms-user-card button{width:26px;height:26px;border:0;background:transparent;color:#aeb9df;display:grid;place-items:center;border-radius:7px;justify-self:end}.slms-user-card button:hover{background:#25345c;color:#fff}@media(max-width:980px){.slms-page:not(.slms-login-page){grid-template-columns:1fr!important}.slms-sidebar{width:auto!important}.slms-nav-groups{grid-template-columns:1fr!important}.slms-user-card{margin:0 10px 12px}.slms-user-card:before{display:none}}
    .slms-modal-overlay{position:fixed;inset:0;z-index:800;background:rgba(9,16,34,.52);backdrop-filter:blur(4px);display:grid;place-items:center;padding:16px}.slms-confirm-modal{width:min(380px,calc(100vw - 28px));background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 24px 80px rgba(6,15,40,.28);border:1px solid #dce3f0}.slms-confirm-head{height:56px;padding:0 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #edf1f7}.slms-confirm-head h2{font-size:15px;margin:0}.slms-confirm-head button{width:32px;height:32px;border:0;border-radius:9px;background:#f4f6fb;color:#56607a;font-weight:800}.slms-confirm-body{display:flex;gap:12px;align-items:flex-start;padding:18px 16px;color:#405070}.slms-confirm-body span{width:38px;height:38px;border-radius:10px;background:#fff1f2;color:#dc2626;display:grid;place-items:center;flex:0 0 38px}.slms-confirm-body p{margin:0;font-size:13px;line-height:1.45}.slms-confirm-actions{display:flex;justify-content:flex-end;gap:10px;padding:12px 16px 16px}.slms-confirm-actions button{height:36px;border-radius:9px;padding:0 14px;font-weight:800;border:1px solid #dce3f0;background:#fff}.slms-confirm-actions .danger{background:#dc2626;color:#fff;border-color:#dc2626}
    .slms-mobile-menu,.slms-sidebar-close,.slms-sidebar-backdrop{display:none}.slms-sidebar>.slms-brand{position:relative}.slms-sidebar-close{margin-left:auto;width:30px;height:30px;border:0;border-radius:8px;background:#172341;color:#cfdaff;place-items:center}@media(max-width:980px){.slms-mobile-menu{display:flex;width:36px;height:36px;align-items:flex-start;justify-content:center;flex-direction:column;gap:5px;border:0;border-radius:8px;background:transparent;box-shadow:none;flex:0 0 36px;padding-left:6px}.slms-mobile-menu span{display:block;width:24px;height:2px;border-radius:999px;background:#536bff}.slms-mobile-menu span:nth-child(2){width:16px}.slms-mobile-menu:active{transform:translateY(1px);background:#eef2ff}.slms-topbar{display:grid!important;grid-template-columns:36px minmax(0,1fr);align-items:center!important}.slms-sidebar-backdrop{display:block;position:fixed;inset:0;z-index:690;border:0;background:rgba(6,12,28,.5);backdrop-filter:blur(2px)}.slms-page:not(.slms-login-page) .slms-sidebar{position:fixed!important;left:0;top:0;bottom:0;z-index:700;width:228px!important;height:100vh!important;overflow-y:auto!important;transform:translateX(-104%);transition:transform .22s ease;box-shadow:18px 0 46px rgba(6,12,28,.28)}.slms-page:not(.slms-login-page) .slms-sidebar.open{transform:translateX(0)}.slms-sidebar-close{display:grid!important}.slms-sidebar>.slms-brand{padding-right:10px!important}.slms-content{height:auto!important;min-height:100vh!important;overflow:visible!important}}@media(max-width:700px){.slms-topbar{grid-template-columns:36px minmax(0,1fr)!important;align-items:center!important}.slms-topbar>div{min-width:0}.slms-topbar h1,.slms-topbar p{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
    .slms-topbar-actions{margin-left:auto;display:flex;align-items:center;gap:10px}.slms-notification-wrap{position:relative}.slms-notification-button{position:relative;width:38px;height:38px;border:1px solid #dce3f0;border-radius:11px;background:#fff;color:#405070;display:grid;place-items:center;box-shadow:0 1px 2px rgba(16,20,40,.04);cursor:pointer}.slms-notification-button:hover{background:#f8fbff;color:#3157f6;border-color:#cfd8ea}.slms-notification-button>span{position:absolute;right:-5px;top:-5px;min-width:18px;height:18px;border-radius:999px;background:#536bff;color:#fff;border:2px solid #fff;font-size:10px;font-weight:900;display:grid;place-items:center;padding:0 4px}.slms-notification-popover{position:absolute;right:0;top:48px;width:min(360px,calc(100vw - 28px));max-height:430px;overflow:auto;background:#fff;border:1px solid #dce3f0;border-radius:15px;box-shadow:0 24px 70px rgba(12,22,50,.18);z-index:60;padding:8px}.slms-notification-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:9px 10px 11px;border-bottom:1px solid #edf1f7}.slms-notification-head>div:first-child{min-width:0}.slms-notification-head b{display:block;color:#061633;font-size:14px}.slms-notification-head p{margin:2px 0 0!important;color:#8f98b2!important;font-size:11.5px!important;white-space:normal!important;overflow:visible!important;text-overflow:clip!important}.slms-notification-head-actions{display:flex;align-items:center;gap:7px;flex:0 0 auto}.slms-notification-head-actions span{min-width:26px;height:26px;border-radius:999px;background:#eef2ff;color:#3157f6;display:grid;place-items:center;font-size:11px;font-weight:900}.slms-notification-head-actions button{width:30px;height:30px;border:0;border-radius:9px;background:#f4f6fb;color:#56607a;display:grid;place-items:center;cursor:pointer}.slms-notification-head-actions button:hover{background:#eef2ff;color:#3157f6}.slms-notification-item{display:grid;grid-template-columns:10px minmax(0,1fr);gap:10px;padding:12px 10px;border-bottom:1px solid #f0f3f8}.slms-notification-item:last-child{border-bottom:0}.slms-notification-item i{width:8px;height:8px;border-radius:999px;margin-top:5px;background:#536bff;box-shadow:0 0 0 5px #eef2ff}.slms-notification-item.green i{background:#18a889;box-shadow:0 0 0 5px #ddfbef}.slms-notification-item.amber i{background:#f5a623;box-shadow:0 0 0 5px #fff4da}.slms-notification-item.red i{background:#ef4444;box-shadow:0 0 0 5px #ffe8e8}.slms-notification-item b{display:block;color:#061633;font-size:13px;line-height:17px}.slms-notification-item p{margin:4px 0 6px!important;color:#52607a!important;font-size:12px!important;line-height:17px!important}.slms-notification-item small{color:#8f98b2;font-size:11px;font-weight:800}.slms-notification-empty{min-height:94px;display:grid;place-items:center;text-align:center;color:#8f98b2;font-size:12.5px}@media(max-width:980px){.slms-topbar{grid-template-columns:36px minmax(0,1fr) auto!important}.slms-topbar-actions{align-self:center}.slms-notification-popover{position:fixed;top:68px;right:12px}}@media(max-width:520px){.slms-internship-empty-card{border-radius:14px}.slms-internship-empty{min-height:0!important;display:grid!important;grid-template-columns:1fr!important;justify-items:center!important;align-items:start!important;gap:10px!important;padding:34px 18px 22px!important;text-align:center!important}.slms-internship-empty:before{top:16px!important;left:18px!important;right:18px!important;width:auto!important;height:4px!important;border-radius:999px!important}.slms-real-hourglass{width:172px!important;height:150px!important;border-radius:20px!important;margin:0 auto!important}.slms-hourglass-svg{width:160px!important;height:146px!important}.slms-internship-empty small{font-size:10.5px!important;letter-spacing:.05em!important;margin-top:2px!important}.slms-internship-empty h2{max-width:260px!important;margin:5px auto 6px!important;font-size:22px!important;line-height:27px!important}.slms-internship-empty p{max-width:280px!important;margin:0 auto!important;font-size:12px!important;line-height:18px!important}.slms-internship-empty span{justify-self:center!important;margin-top:12px!important;max-width:280px!important;padding:8px 12px!important;font-size:11.5px!important;line-height:15px!important;white-space:normal!important;text-align:center!important}.slms-notification-button{width:36px;height:36px}.slms-notification-popover{top:64px;left:8px;right:8px;width:auto;max-height:calc(100vh - 82px);border-radius:14px;padding:7px}.slms-notification-head{padding:10px 9px 12px;align-items:flex-start}.slms-notification-head-actions button{width:32px;height:32px}.slms-notification-item{grid-template-columns:9px minmax(0,1fr);padding:12px 9px}.slms-notification-item p{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden!important}}
    .slms-internship-logs-card .slms-card-head.compact{align-items:center}.slms-internship-log-list{padding:0!important}.slms-internship-log-item{min-height:72px!important;display:grid!important;grid-template-columns:42px minmax(0,1fr) 78px!important;align-items:center!important;gap:12px!important;padding:14px 18px!important}.slms-internship-log-item>span:first-child{width:38px!important;height:38px!important;border-radius:11px!important}.slms-internship-log-item>div{min-width:0}.slms-internship-log-item b{font-size:13.5px!important;line-height:18px}.slms-internship-log-item p{max-width:680px!important;margin-top:5px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}.slms-internship-log-item>.slms-pill{justify-self:end;width:64px;min-width:64px;height:38px;justify-content:center;padding:0 8px!important;text-align:center;line-height:1.1}@media(max-width:700px){.slms-internship-log-item{grid-template-columns:38px minmax(0,1fr)!important;padding:13px 14px!important;align-items:start!important}.slms-internship-log-item>.slms-pill{grid-column:2!important;justify-self:start;width:auto;min-width:0;height:28px;margin-top:8px;padding:0 10px!important}.slms-internship-log-item p{white-space:normal!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}}
    .slms-log-head-actions{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:flex-end}.slms-log-head-actions button{height:32px;border:1px solid #dce3f0;border-radius:9px;background:#fff;color:#405070;padding:0 11px;font-size:12px;font-weight:900;display:inline-flex;align-items:center;gap:7px}.slms-log-head-actions button:hover{background:#eef2ff;color:#3157f6}.slms-log-calendar-modal{width:min(780px,calc(100vw - 28px));max-height:calc(100vh - 32px);overflow:auto;background:#f8fbff;border:1px solid #dce3f0;border-radius:18px;box-shadow:0 28px 90px rgba(6,15,40,.3)}.slms-log-calendar-head{min-height:86px;padding:18px 20px;border-bottom:1px solid #e3e9f5;display:flex;align-items:center;justify-content:space-between;gap:14px;background:linear-gradient(135deg,#fff 0%,#eef4ff 100%)}.slms-log-calendar-head small{display:block;color:#536bff;font-size:10.5px;font-weight:900;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}.slms-log-calendar-head h2{margin:0;font-size:22px;line-height:27px;color:#061633}.slms-log-calendar-head p{margin:4px 0 0;color:#7c86a1;font-size:12.5px}.slms-log-calendar-head button{width:36px;height:36px;border:0;border-radius:11px;background:#fff;color:#56607a;display:grid;place-items:center;box-shadow:0 1px 2px rgba(16,20,40,.06)}.slms-log-calendar-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;padding:14px 18px 0}.slms-log-calendar-summary div{min-height:58px;border:1px solid #e1e8f5;border-radius:14px;background:#fff;padding:11px 13px;display:grid;align-content:center;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-log-calendar-summary span{color:#8f98b2;font-size:11px;font-weight:900}.slms-log-calendar-summary b{margin-top:4px;color:#061633;font-size:20px;line-height:24px}.slms-log-calendar-toolbar{display:grid;grid-template-columns:86px minmax(0,1fr) 86px;align-items:center;gap:10px;padding:14px 18px 8px}.slms-log-calendar-toolbar b{text-align:center;font-size:16px;color:#061633}.slms-log-calendar-toolbar button{height:36px;border:1px solid #dce3f0;border-radius:10px;background:#fff;color:#405070;font-weight:900}.slms-log-calendar-legend{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 18px 14px;color:#7c86a1;font-size:11.5px;font-weight:800}.slms-log-calendar-legend span{display:inline-flex;align-items:center;gap:6px}.slms-log-calendar-legend i{width:9px;height:9px;border-radius:4px;background:#eef2f8;border:1px solid #dce3f0}.slms-log-calendar-legend i.done{background:#18a889;border-color:#18a889}.slms-log-calendar-legend i.pending{background:#f5a623;border-color:#f5a623}.slms-log-calendar-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:8px;padding:0 18px 16px}.slms-log-calendar-day{height:24px;display:grid;place-items:center;color:#8f98b2;font-size:11px;font-weight:900}.slms-log-calendar-grid i{min-height:62px}.slms-log-calendar-cell{min-height:62px;border:1px solid #e4eaf5;border-radius:14px;background:#fff;color:#405070;padding:8px;display:grid;align-content:space-between;text-align:left;box-shadow:0 1px 2px rgba(16,20,40,.035)}.slms-log-calendar-cell b{font-size:13px}.slms-log-calendar-cell span{width:max-content;max-width:100%;border-radius:999px;background:#f1f4fa;color:#8f98b2;padding:3px 7px;font-size:9.5px;font-weight:900}.slms-log-calendar-cell.completed{background:#effdf7;border-color:#bcebd8;color:#0e7a54}.slms-log-calendar-cell.completed span{background:#d8f8ea;color:#0e7a54}.slms-log-calendar-cell.pending{background:#fff8eb;border-color:#f8dfaa;color:#b4750b}.slms-log-calendar-cell.pending span{background:#ffedc2;color:#b4750b}.slms-log-calendar-cell.selected{box-shadow:0 0 0 2px #536bff,0 10px 24px rgba(83,107,255,.16);border-color:#536bff}.slms-log-calendar-detail{margin:0 18px 18px;border:1px solid #dfe7f4;border-radius:16px;background:#fff;padding:15px;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-log-calendar-detail>div:first-child{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px}.slms-log-calendar-detail small,.slms-log-detail-grid span{display:block;color:#8f98b2;font-size:11px;font-weight:900}.slms-log-calendar-detail b{color:#061633}.slms-log-calendar-detail p{margin:0;color:#8f98b2;text-align:center;padding:18px 8px}.slms-log-detail-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.slms-log-detail-grid div{border:1px solid #edf1f7;border-radius:12px;background:#fbfcff;padding:11px}.slms-log-detail-grid b{display:block;margin-top:5px;font-size:12.5px;line-height:17px;word-break:break-word}@media(max-width:700px){.slms-log-head-actions{width:100%;justify-content:space-between}.slms-log-head-actions button{flex:1;justify-content:center}.slms-log-calendar-modal{width:calc(100vw - 18px);max-height:calc(100vh - 18px);border-radius:15px}.slms-log-calendar-head{min-height:78px;padding:15px}.slms-log-calendar-head h2{font-size:19px;line-height:24px}.slms-log-calendar-head p{font-size:11.5px}.slms-log-calendar-summary{grid-template-columns:repeat(3,1fr);gap:7px;padding:12px 14px 0}.slms-log-calendar-summary div{min-height:52px;border-radius:12px;padding:9px}.slms-log-calendar-summary b{font-size:17px}.slms-log-calendar-toolbar{padding:12px 14px 8px;grid-template-columns:64px minmax(0,1fr) 64px}.slms-log-calendar-toolbar button{height:32px}.slms-log-calendar-legend{justify-content:flex-start;gap:10px;padding:0 14px 12px}.slms-log-calendar-grid{gap:5px;padding:0 14px 14px}.slms-log-calendar-grid i{min-height:50px}.slms-log-calendar-cell{min-height:50px;border-radius:11px;padding:6px}.slms-log-calendar-cell b{font-size:12px}.slms-log-calendar-cell span{font-size:9px;padding:2px 5px}.slms-log-calendar-detail{margin:0 14px 14px;padding:12px}.slms-log-detail-grid{grid-template-columns:1fr 1fr}}
    @media(max-width:760px){.slms-internship-page{display:flex!important;flex-direction:column;width:100%}.slms-daily-log-card{order:1;width:100%}.slms-internship-home{order:2;width:100%;max-width:none}.slms-internship-logs-card{order:3;width:100%}.slms-one-check{padding:14px!important}.slms-one-check button{min-height:92px!important;border-radius:14px!important;padding:14px!important;align-items:center!important}.slms-one-check button svg{width:38px!important;height:38px!important;flex:0 0 38px!important;border-radius:12px!important;padding:10px!important}.slms-one-check button span{gap:3px!important}.slms-one-check button b{font-size:23px!important;line-height:27px!important;word-break:break-word}.slms-one-check button small{font-size:11.5px!important;line-height:15px!important}.slms-one-check p{padding:0 2px;font-size:11px!important}.slms-internship-home{grid-template-columns:1fr!important}.slms-internship-home>.slms-pill{justify-self:start!important}}
    @media(max-width:420px){.slms-one-check button{min-height:86px!important;gap:10px!important}.slms-one-check button b{font-size:20px!important;line-height:25px!important}.slms-one-check button svg{width:36px!important;height:36px!important;flex-basis:36px!important}.slms-internship-home h2{font-size:21px!important;line-height:26px!important}}
    .slms-log-calendar-modal{width:min(820px,calc(100vw - 24px))}.slms-log-calendar-toolbar{grid-template-columns:40px minmax(0,1fr) 40px;padding:14px 22px 8px}.slms-log-calendar-toolbar button{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;padding:0;color:#536bff;background:#fff;box-shadow:0 1px 2px rgba(16,20,40,.05)}.slms-log-calendar-toolbar button:hover{background:#eef2ff;border-color:#cdd7ff}.slms-log-calendar-toolbar b{font-size:17px}.slms-log-calendar-legend{padding-bottom:12px}.slms-log-calendar-grid{gap:6px;padding:0 22px 16px}.slms-log-calendar-day{height:20px;font-size:10.5px}.slms-log-calendar-grid i{min-height:52px}.slms-log-calendar-cell{min-height:52px;border-radius:12px;padding:7px;position:relative;overflow:hidden}.slms-log-calendar-cell:after{content:"";position:absolute;left:8px;bottom:7px;width:13px;height:4px;border-radius:999px;background:#eef2f8}.slms-log-calendar-cell.completed:after{background:#18a889}.slms-log-calendar-cell.pending:after{background:#f5a623}.slms-log-calendar-cell b{font-size:12.5px}.slms-log-calendar-cell span{align-self:end;justify-self:start;font-size:9px;padding:3px 7px;margin-bottom:4px}.slms-log-calendar-cell:not(.completed):not(.pending) span:empty{display:none}.slms-log-calendar-cell.selected{transform:translateY(-1px)}@media(max-width:760px){.slms-log-calendar-modal{width:calc(100vw - 12px);max-height:calc(100vh - 12px);border-radius:16px}.slms-log-calendar-summary{grid-template-columns:1fr 1fr 1fr}.slms-log-calendar-summary span{font-size:10px}.slms-log-calendar-summary b{font-size:16px}.slms-log-calendar-toolbar{grid-template-columns:36px minmax(0,1fr) 36px;padding:12px 12px 7px}.slms-log-calendar-toolbar button{width:36px;height:36px;border-radius:10px}.slms-log-calendar-toolbar b{font-size:14px}.slms-log-calendar-legend{justify-content:center;gap:8px;padding:0 10px 10px;font-size:10.5px}.slms-log-calendar-grid{gap:4px;padding:0 10px 12px}.slms-log-calendar-day{font-size:9.5px;height:18px}.slms-log-calendar-grid i{min-height:42px}.slms-log-calendar-cell{min-height:42px;border-radius:10px;padding:5px}.slms-log-calendar-cell b{font-size:11px}.slms-log-calendar-cell span{font-size:0;padding:0;width:7px;height:7px;border-radius:999px;margin:0}.slms-log-calendar-cell:after{display:none}.slms-log-calendar-detail{margin:0 10px 10px}.slms-log-detail-grid{gap:7px}}@media(max-width:390px){.slms-log-calendar-summary{grid-template-columns:1fr}.slms-log-calendar-summary div{min-height:42px}.slms-log-calendar-grid{gap:3px}.slms-log-calendar-cell{min-height:38px;border-radius:8px}.slms-log-calendar-cell b{font-size:10.5px}.slms-log-detail-grid{grid-template-columns:1fr}}
    .slms-day-complete-card{grid-column:1 / -1;display:flex;align-items:center;gap:12px;border-color:#c7efdf;background:#effdf7;color:#0e7a54}.slms-day-complete-card>svg{width:38px;height:38px;border-radius:12px;background:#d8f8ea;padding:9px;flex:0 0 38px}.slms-day-complete-card b{display:block;color:#061633}.slms-day-complete-card p{margin:4px 0 0;color:#0e7a54;font-size:12px}@media(max-width:760px){.slms-internship-home{order:3!important}.slms-internship-logs-card{order:4!important}.slms-day-complete-card{order:2;align-items:flex-start;padding:14px}}
    .slms-log-pagination{border-top:1px solid #edf1f7;padding:12px 18px 14px;display:flex;align-items:center;justify-content:flex-end;gap:10px}.slms-log-pagination span{color:#7c86a1;font-size:12px;font-weight:900}.slms-log-pagination button{height:32px;border:1px solid #dce3f0;border-radius:9px;background:#fff;color:#405070;padding:0 11px;font-size:12px;font-weight:900;display:inline-flex;align-items:center;gap:6px}.slms-log-pagination button:hover:not(:disabled){background:#eef2ff;color:#3157f6}.slms-log-pagination button:disabled{opacity:.45;cursor:not-allowed}@media(max-width:620px){.slms-log-pagination{justify-content:space-between;padding:12px 14px}.slms-log-pagination button{flex:1;justify-content:center}.slms-log-pagination span{font-size:11px;white-space:nowrap}}
    .slms-notification-tabs{display:flex;align-items:center;gap:7px;padding:8px 8px 6px;border-bottom:1px solid #f0f3f8}.slms-notification-tabs button{height:30px;border:1px solid #dce3f0;border-radius:9px;background:#fff;color:#405070;padding:0 9px;font-size:11.5px;font-weight:900;display:inline-flex;align-items:center;gap:6px;cursor:pointer}.slms-notification-tabs button.active{background:#eef2ff;border-color:#cdd7ff;color:#3157f6}.slms-notification-tabs button span{min-width:18px;height:18px;border-radius:999px;background:#f1f4fa;color:#536bff;display:grid;place-items:center;font-size:10px}.slms-notification-tabs .slms-notification-read{margin-left:auto;background:#f8fbff;color:#18a889;border-color:#d9efe8}.slms-notification-item{position:relative;padding-right:42px!important}.slms-notification-dismiss{position:absolute;right:8px;top:10px;width:28px;height:28px;border:0;border-radius:9px;background:#f4f6fb;color:#7c86a1;display:grid;place-items:center;cursor:pointer}.slms-notification-dismiss:hover{background:#fff0f0;color:#ef4444}.slms-notification-empty{border-top:0!important}@media(max-width:520px){.slms-notification-tabs{padding:7px 7px 5px;gap:6px;overflow-x:auto}.slms-notification-tabs button{flex:0 0 auto}.slms-notification-tabs .slms-notification-read{margin-left:0}.slms-notification-item{padding-right:39px!important}.slms-notification-dismiss{right:6px;top:9px}}
    .slms-nav-badge{margin-left:auto;min-width:22px;height:22px;border-radius:999px;background:#eef2ff;color:#3157f6;border:1px solid rgba(126,148,255,.38);display:grid;place-items:center;padding:0 7px;font-size:10.5px;font-style:normal;font-weight:900;box-shadow:0 6px 14px rgba(83,107,255,.16)}.slms-nav-dot{position:relative;min-width:10px;width:10px;height:10px;padding:0;border:0;background:#18a889;box-shadow:0 0 0 4px rgba(24,168,137,.13),0 8px 16px rgba(24,168,137,.24)}.slms-nav-dot:after{content:"";position:absolute;inset:-4px;border-radius:999px;border:1px solid rgba(24,168,137,.35);animation:slms-nav-pulse 1.8s ease-out infinite}@keyframes slms-nav-pulse{0%{transform:scale(.7);opacity:.8}70%,100%{transform:scale(1.8);opacity:0}}.slms-duty-card{display:grid;grid-template-columns:42px minmax(0,1fr) auto;align-items:center;gap:14px;border-color:#f2d49a;background:linear-gradient(135deg,#fff 0%,#fff7e8 100%);padding:14px 16px}.slms-duty-card>span{width:42px;height:42px;border-radius:13px;background:#fff1cf;color:#b4750b;display:grid;place-items:center}.slms-duty-card small,.slms-duty-modal small{display:block;color:#536bff;font-size:10.5px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-duty-card b{display:block;color:#061633;font-size:14.5px;line-height:19px;margin-top:3px}.slms-duty-card p{margin:4px 0 0;color:#7c86a1;font-size:12px}.slms-duty-card button,.slms-duty-actions button:last-child{height:38px;border:0;border-radius:10px;background:#536bff;color:#fff;padding:0 14px;font-weight:900;box-shadow:0 10px 22px rgba(83,107,255,.22)}.slms-duty-modal{width:min(430px,calc(100vw - 28px));background:#fff;border:1px solid #dce3f0;border-radius:18px;box-shadow:0 28px 90px rgba(6,15,40,.3);padding:22px;display:grid;gap:14px}.slms-duty-icon{width:52px;height:52px;border-radius:16px;background:#fff7e8;color:#b4750b;display:grid;place-items:center}.slms-duty-modal h2{margin:5px 0 0;color:#061633;font-size:22px;line-height:28px}.slms-duty-modal p{margin:7px 0 0;color:#7c86a1;font-size:13px;line-height:19px}.slms-duty-actions{display:flex;justify-content:flex-end;gap:10px;padding-top:4px}.slms-duty-actions .ghost{height:38px;border:1px solid #dce3f0;border-radius:10px;background:#fff;color:#405070;padding:0 14px;font-weight:900}@media(max-width:700px){.slms-nav-badge{position:absolute;right:10px}.slms-nav-dot{right:16px}.slms-duty-card{grid-template-columns:38px minmax(0,1fr);align-items:start}.slms-duty-card button{grid-column:1/-1;width:100%}.slms-duty-modal{padding:18px;border-radius:16px}.slms-duty-actions{display:grid;grid-template-columns:1fr}.slms-duty-actions button{width:100%}}
    .slms-notes-page{display:grid;gap:14px}.slms-notes-hero{position:relative;overflow:hidden;border:1px solid #dce3f0;border-radius:16px;background:linear-gradient(135deg,#10192f 0%,#243d91 68%,#18a889 145%);color:#fff;min-height:132px;padding:22px;display:flex;align-items:center;justify-content:space-between;gap:16px}.slms-notes-hero:after{content:"";position:absolute;right:-42px;top:-60px;width:180px;height:180px;border-radius:999px;background:rgba(255,255,255,.08)}.slms-notes-hero small{display:block;color:#bfd0ff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.06em}.slms-notes-hero h2{margin:7px 0 5px;font-size:30px;line-height:36px}.slms-notes-hero p{margin:0;color:#dce5ff}.slms-notes-hero>span{position:relative;z-index:1;height:34px;border-radius:999px;background:rgba(255,255,255,.13);border:1px solid rgba(255,255,255,.18);display:inline-flex;align-items:center;padding:0 13px;font-size:12px;font-weight:900;white-space:nowrap}.slms-notes-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px}.slms-note-card{min-height:150px;border:1px solid #dce3f0;border-radius:16px;background:#fff;padding:16px;display:grid;grid-template-columns:46px minmax(0,1fr);gap:13px;align-items:start;box-shadow:0 1px 2px rgba(16,20,40,.04)}.slms-note-icon{width:46px;height:46px;border-radius:14px;background:#eef2ff;color:#536bff;display:grid;place-items:center}.slms-note-body{min-width:0}.slms-note-body small{display:block;color:#536bff;font-size:10.5px;font-weight:900;text-transform:uppercase;letter-spacing:.05em}.slms-note-body h3{margin:5px 0 5px;color:#061633;font-size:16px;line-height:21px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.slms-note-body p{margin:0 0 8px;color:#52607a;font-size:12.5px;line-height:18px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.slms-note-body div{color:#8f98b2;font-size:11.5px;line-height:17px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.slms-note-actions{grid-column:2;display:flex;align-items:center;gap:8px;flex-wrap:wrap}.slms-note-actions button{height:36px;width:max-content;border:1px solid #dce3f0;border-radius:10px;background:#fff;color:#3157f6;padding:0 12px;font-size:12px;font-weight:900;display:inline-flex;align-items:center;gap:7px}.slms-note-actions button:hover{background:#eef2ff;border-color:#cdd7ff}.slms-notes-empty{grid-column:1/-1;min-height:240px;display:grid;place-items:center;text-align:center;align-content:center;gap:8px}.slms-notes-empty span{width:56px;height:56px;border-radius:16px;background:#eef2ff;color:#536bff;display:grid;place-items:center}.slms-notes-empty h2{margin:4px 0 0;font-size:18px}.slms-notes-empty p{margin:0;max-width:360px;color:#8f98b2}@media(max-width:700px){.slms-notes-hero{min-height:0;border-radius:14px;padding:18px;align-items:flex-start;flex-direction:column}.slms-notes-hero h2{font-size:24px;line-height:30px}.slms-notes-grid{grid-template-columns:1fr}.slms-note-card{grid-template-columns:42px minmax(0,1fr);border-radius:14px;padding:14px}.slms-note-icon{width:42px;height:42px}.slms-note-actions{grid-column:1/-1}.slms-note-actions button{width:100%;justify-content:center}.slms-note-body h3{white-space:normal}.slms-note-body div{white-space:normal}}
      .slms-nps-overlay{z-index:1200;background:rgba(7,14,32,.62);backdrop-filter:blur(4px);padding:18px}.slms-nps-modal{width:min(720px,100%);max-height:calc(100vh - 36px);overflow:auto;scrollbar-width:none;background:#fff;border:1px solid #dce3f0;border-radius:22px;box-shadow:0 28px 90px rgba(6,15,40,.34);padding:0;display:grid}.slms-nps-modal::-webkit-scrollbar{display:none}.slms-nps-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;padding:24px 24px 20px;background:linear-gradient(135deg,#fbfcff 0%,#eef4ff 100%);border-bottom:1px solid #e5ebf6}.slms-nps-head small{display:block;color:#536bff;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.08em}.slms-nps-head h2{margin:6px 0 7px;font-size:25px;line-height:31px;color:#061633}.slms-nps-head p{margin:0;color:#52607a;font-size:13px;line-height:19px}.slms-nps-head>span{min-width:62px;height:38px;border-radius:999px;background:#fff;color:#536bff;font-weight:900;display:grid;place-items:center;box-shadow:0 8px 22px rgba(83,107,255,.14)}.slms-nps-score-wrap{padding:22px 24px 4px}.slms-nps-score-grid{display:grid;grid-template-columns:repeat(11,minmax(0,1fr));gap:8px}.slms-nps-score-grid button{height:46px;border:1px solid #dce3f0;border-radius:12px;background:#fff;color:#405070;font-weight:900;transition:.18s ease}.slms-nps-score-grid button:hover{transform:translateY(-1px);border-color:#536bff;box-shadow:0 8px 18px rgba(83,107,255,.14)}.slms-nps-score-grid button.low.active{background:#ffe8e8;border-color:#f7b9b9;color:#c62828}.slms-nps-score-grid button.mid.active{background:#fff4da;border-color:#f0cd7f;color:#a66b00}.slms-nps-score-grid button.high.active{background:#ddfbef;border-color:#abe8d0;color:#008060}.slms-nps-scale{display:flex;justify-content:space-between;margin-top:8px;color:#8b95ad;font-size:11.5px;font-weight:800}.slms-nps-section-title{display:flex;align-items:center;justify-content:space-between;padding:16px 24px 8px}.slms-nps-section-title b{font-size:13px;color:#061633}.slms-nps-section-title span{font-size:11.5px;font-weight:900;color:#536bff;background:#eef2ff;border-radius:999px;padding:6px 10px}.slms-nps-stars{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;padding:0 24px 18px}.slms-nps-stars>div{display:grid;gap:12px;border:1px solid #edf1f7;border-radius:16px;background:#fbfcff;padding:14px}.slms-nps-stars span{font-size:12.5px;font-weight:900;color:#405070}.slms-nps-stars div div{display:flex;gap:6px}.slms-nps-stars button{width:34px;height:34px;border:0;border-radius:10px;background:#eef2f8;color:#b7c1d4;display:grid;place-items:center;transition:.16s ease}.slms-nps-stars button:hover{color:#f5a623;background:#fff7e6}.slms-nps-stars button.active{background:#fff4da;color:#f5a623}.slms-nps-text{display:grid;gap:9px;color:#405070;font-size:12.5px;font-weight:900;padding:0 24px 18px}.slms-nps-text>span{display:flex;align-items:center;justify-content:space-between;gap:10px}.slms-nps-text>span b{font-size:11px;color:#9aa4b8}.slms-nps-text textarea{min-height:96px;border:1px solid #dce3f0;border-radius:14px;padding:12px 13px;font:inherit;resize:vertical;outline:none}.slms-nps-text textarea:focus{border-color:#536bff;box-shadow:0 0 0 3px rgba(83,107,255,.12)}.slms-nps-actions{position:sticky;bottom:0;padding:14px 24px 24px;background:linear-gradient(180deg,rgba(255,255,255,.78),#fff 35%)}.slms-nps-submit{width:100%;height:46px;border:0;border-radius:13px;background:#536bff;color:#fff;font-weight:900;box-shadow:0 10px 24px rgba(83,107,255,.24)}.slms-nps-submit:disabled{opacity:.55;cursor:not-allowed}.slms-pill.submitted,.slms-pill.done{background:#ddfbef;color:#008060}.slms-pill.required{background:#fff4da;color:#b77900}.slms-pill.awaiting{background:#eef2f8;color:#7c86a1}@media(max-width:720px){.slms-nps-overlay{padding:8px;align-items:flex-start}.slms-nps-modal{width:100%;max-height:calc(100dvh - 16px);border-radius:18px}.slms-nps-head{padding:16px 16px 14px;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:12px}.slms-nps-head>span{align-self:start;min-width:56px;height:34px;font-size:13px}.slms-nps-head h2{font-size:20px;line-height:25px;margin:6px 0}.slms-nps-head p{font-size:12.5px;line-height:18px}.slms-nps-score-wrap{padding:14px 16px 2px}.slms-nps-score-grid{grid-template-columns:repeat(6,1fr);gap:7px}.slms-nps-score-grid button{height:39px;border-radius:10px}.slms-nps-scale{margin-top:7px;font-size:11px}.slms-nps-section-title{padding:13px 16px 8px}.slms-nps-section-title span{padding:5px 9px;font-size:11px}.slms-nps-stars{grid-template-columns:1fr;padding:0 16px 12px;gap:10px}.slms-nps-stars>div{gap:10px;border-radius:14px;padding:12px}.slms-nps-stars div div{width:100%;justify-content:space-between}.slms-nps-stars button{width:36px;height:34px;border-radius:10px}.slms-nps-text{padding:0 16px 12px}.slms-nps-text>span{align-items:flex-start;flex-direction:column;gap:4px}.slms-nps-text textarea{min-height:76px}.slms-nps-actions{padding:10px 16px 14px}.slms-nps-submit{height:44px}}@media(max-width:390px){.slms-nps-overlay{padding:6px}.slms-nps-modal{max-height:calc(100dvh - 12px);border-radius:16px}.slms-nps-head{padding:14px}.slms-nps-score-wrap{padding:12px 14px 2px}.slms-nps-score-grid button{height:38px}.slms-nps-section-title{padding:12px 14px 7px}.slms-nps-stars{padding:0 14px 10px}.slms-nps-stars button{width:33px;height:32px}.slms-nps-head h2{font-size:19px;line-height:24px}.slms-nps-actions{padding:8px 14px 12px}}
  `}</style>;
}
