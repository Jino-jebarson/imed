import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import imedLogo from "../HomePage/imedLogoTMTag.svg";
import { BRAC_LOGO } from "./logos";

function GPayIcon() {
  return (
    <img
      src="/upi/gpay.png"
      alt="Google Pay"
      width={32}
      height={32}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

function PhonePeIcon() {
  return (
    <img
      src="/upi/phonepe.png"
      alt="PhonePe"
      width={32}
      height={32}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

function PaytmIcon() {
  return (
    <img
      src="/upi/paytm.png"
      alt="Paytm"
      width={32}
      height={32}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
      }}
    />
  );
}

const API_BASE_URL = import.meta.env.PROD
  ? ((import.meta.env.VITE_PROD_API_BASE_URL as string | undefined) || "")
  : ((import.meta.env.VITE_API_BASE_URL as string | undefined) || "");

const CONFIG = {
  endpoint: `${API_BASE_URL}/api/public/college-registration`,
  college: "Dr. Bhim Rao Ambedkar College",
  campaign: "BRAC Seminar Oct 2026",
  source: "Dr. Bhim Rao Ambedkar College",
  stage: "New Lead",
  gstNote: "",
  regFee: 1499,
  upiId: "imed1@idfcbank",
  payee: "Imed Healthcare Academy LLP",
  whatsapp: "919818211746",
};

const COURSES = [
  {
    id: "c1",
    title: "Foundation Certificate in Healthcare",
    sub: "Course 1",
    fee: 4999,
    value: "Foundation Certificate in Healthcare - BRAC",
    code: "FCH-BRAC",
  },
  {
    id: "c2",
    title: "Certificate in Hospital Operations",
    sub: "Course 2 · placement assistance begins",
    fee: 7999,
    value: "Certificate in Hospital Operations - BRAC",
    code: "CHO-BRAC",
  },
  {
    id: "c3",
    title: "Certificate in Hospital Administration",
    sub: "Course 3",
    fee: 9999,
    value: "Certificate in Hospital Administration - BRAC",
    code: "CHA-BRAC",
  },
  {
    id: "c4",
    title: "Advanced Certificate in Healthcare Management",
    sub: "Courses 1 + 2 + 3 · save ₹3,998",
    badge: "All 3 courses",
    fee: 18999,
    value: "Advanced Certificate in Healthcare Management - BRAC",
    code: "ACHM-BRAC",
    best: true,
  },
];

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function BracRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    section: "",
    stream: "",
    phone: "",
    email: "",
    course: "",
    courseFee: 0,
    parentName: "",
    parentPhone: "",
    consent: false,
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isSubmitted]);

  const handleTextChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePhoneChange = (field: "phone" | "parentPhone", val: string) => {
    const clean = val.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, [field]: clean }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCourseSelect = (c: (typeof COURSES)[0]) => {
    setFormData((prev) => ({ ...prev, course: c.value, courseFee: c.fee }));
    if (errors.course) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.course;
        return next;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (formData.name.trim().length < 2) {
      errs.name = "Enter your full name.";
    }
    if (!formData.rollNo.trim()) {
      errs.rollNo = "Enter your college roll number.";
    }
    if (!formData.stream) {
      errs.stream = "Choose B.A. or B.Com.";
    }
    if (!MOBILE_REGEX.test(formData.phone)) {
      errs.phone = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
    }
    if (!EMAIL_REGEX.test(formData.email.trim())) {
      errs.email = "Enter a valid email address.";
    }
    if (!formData.course) {
      errs.course = "Choose the course you're registering for.";
    }
    if (formData.parentName.trim().length < 2) {
      errs.parentName = "Enter your parent or guardian's name.";
    }
    if (!MOBILE_REGEX.test(formData.parentPhone)) {
      errs.parentPhone = "Enter a 10-digit mobile number.";
    } else if (formData.parentPhone === formData.phone) {
      errs.parentPhone = "This must be your parent's number, not yours.";
    }
    if (!formData.consent) {
      errs.consent = "Tick the declaration to register.";
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (formData.website) return; // honeypot caught a bot

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      const firstField = Object.keys(errs)[0];
      const el = document.querySelector(`[data-f="${firstField}"] input`) as HTMLElement | null;
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    const qs = new URLSearchParams(window.location.search);
    const payload = {
      student: {
        name: formData.name.trim(),
        rollNo: formData.rollNo.trim(),
        section: formData.section.trim(),
        stream: formData.stream,
        phone: "+91" + formData.phone.trim(),
        email: formData.email.trim().toLowerCase(),
      },
      parent: {
        name: formData.parentName.trim(),
        phone: "+91" + formData.parentPhone.trim(),
      },
      course: {
        name: formData.course,
        code: COURSES.find((c) => c.value === formData.course)?.code || "",
        fee: formData.courseFee,
      },
      meta: {
        source: CONFIG.source,
        college: CONFIG.college,
        campaign: CONFIG.campaign,
        stage: CONFIG.stage,
        consent: true,
        consentText:
          "I confirm my registration for the selected iMED Academy programme and agree to be contacted by iMED Academy on WhatsApp, phone and email about it.",
        submittedAt: new Date().toISOString(),
        utm_source: qs.get("utm_source") || "qr",
        utm_medium: qs.get("utm_medium") || "seminar-flyer",
      },
    };

    if (!CONFIG.endpoint) {
      // PREVIEW MODE: simulate network latency and show the success screen
      console.log("PREVIEW payload →", payload);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 600);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);

    try {
      const res = await fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(String(res.status));
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch {
      clearTimeout(timer);
      setFormError(
        "Your registration didn't go through. Check your internet connection and tap Register again."
      );
      setIsSubmitting(false);
    }
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.upiId);
      setCopiedUpi(true);
    } catch {
      const r = document.createRange();
      const node = document.getElementById("upiText");
      if (node) {
        r.selectNodeContents(node);
        const s = window.getSelection();
        if (s) {
          s.removeAllRanges();
          s.addRange(r);
        }
      }
      setCopiedUpi(true);
    }
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const note = `iMED BRAC Reg ${formData.rollNo}`.slice(0, 50);
  const upiQuery = `pa=${encodeURIComponent(CONFIG.upiId)}&pn=${encodeURIComponent(
    CONFIG.payee
  )}&am=${CONFIG.regFee}.00&cu=INR&tn=${encodeURIComponent(note)}`;

  const gpayLink = `gpay://upi/pay?${upiQuery}`;
  const phonepeLink = `phonepe://pay?${upiQuery}`;
  const paytmLink = `paytmmp://pay?${upiQuery}`;
  const upiLink = `upi://pay?${upiQuery}`;

  const waMsg = `Hi, I have paid the ₹${CONFIG.regFee.toLocaleString(
    "en-IN"
  )} registration fee for the iMED programme.\nName: ${formData.name}\nRoll no.: ${formData.rollNo
    }\nCollege: ${CONFIG.college}\nCourse: ${formData.course}\n(Payment screenshot attached)`;

  const waLink = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="brac-page-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Instrument+Sans:wght@400;500;600;700&display=swap');

        .brac-page-root {
          --navy: #13254F;
          --teal: #22A087;
          --sky: #E6ECF8;
          --mint: #E0F5F2;
          --white: #FFFFFF;
          --ink: #1B2440;
          --muted: #5A6482;
          --line: #D3DAEA;
          --error: #C0392B;
          --display: "Fraunces", Georgia, "Times New Roman", serif;
          --body: "Instrument Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
          background: var(--white);
          color: var(--ink);
          font-family: var(--body);
          font-size: 16px;
          line-height: 1.5;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        .brac-page-root * {
          box-sizing: border-box;
        }

        .brac-wrap {
          max-width: 560px;
          margin: 0 auto;
          padding: 20px 16px 48px;
        }

        /* Header */
        .brac-brand {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
          padding-block: 4px 18px;
        }
        .brac-brand .imed {
          height: 38px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
          display: block;
        }
        .brac-with {
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 100%;
          padding-top: 12px;
          border-top: 1px solid var(--line);
        }
        .brac-with span {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--muted);
        }
        .brac-brand .brac {
          height: 46px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          object-position: left center;
        }

        .brac-preview {
          background: #FFF4D6;
          color: #7A5A00;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .5px;
          text-align: center;
          padding: 8px 12px;
          border-radius: 10px;
          margin-bottom: 14px;
        }

        .brac-hero {
          background: var(--sky);
          border-radius: 20px;
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .brac-tag {
          align-self: flex-start;
          background: var(--navy);
          color: var(--white);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 999px;
        }
        .brac-hero h1 {
          font-family: var(--display);
          font-weight: 700;
          font-size: 28px;
          line-height: 1.12;
          color: var(--navy);
          margin: 4px 0 0;
          text-wrap: balance;
        }
        .brac-hero p {
          margin: 0;
          color: var(--muted);
          font-size: 15px;
        }

        /* Form */
        .brac-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
          margin-top: 24px;
        }
        .brac-form fieldset {
          border: 0;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-width: 0;
        }
        .brac-form legend {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 4px;
          padding: 0;
        }
        .brac-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 420px) {
          .brac-row { grid-template-columns: 1fr; }
        }
        .brac-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .brac-field label, .brac-field .label {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
        }
        .brac-opt {
          font-weight: 400;
          color: var(--muted);
        }
        .brac-field input[type=text],
        .brac-field input[type=tel],
        .brac-field input[type=email] {
          width: 100%;
          font: inherit;
          font-size: 16px;
          color: var(--ink);
          background: var(--white);
          border: 1.5px solid var(--line);
          border-radius: 12px;
          padding: 12px 14px;
          transition: border-color .15s;
        }
        .brac-field input:focus {
          outline: none;
          border-color: var(--teal);
          box-shadow: 0 0 0 3px var(--mint);
        }
        .brac-phone {
          display: flex;
          align-items: stretch;
        }
        .brac-phone .cc {
          display: flex;
          align-items: center;
          padding: 0 12px;
          border: 1.5px solid var(--line);
          border-right: 0;
          border-radius: 12px 0 0 12px;
          background: var(--sky);
          font-weight: 600;
          color: var(--navy);
          font-size: 15px;
        }
        .brac-phone input {
          border-radius: 0 12px 12px 0;
        }
        .brac-hint {
          font-size: 13px;
          color: var(--muted);
        }
        .brac-err {
          font-size: 13px;
          color: var(--error);
          font-weight: 500;
        }
        .brac-field.invalid input,
        .brac-field.invalid .choice {
          border-color: var(--error);
        }

        /* Stream pills */
        .brac-pills {
          display: flex;
          gap: 10px;
        }
        .brac-pill {
          flex: 1;
          position: relative;
        }
        .brac-pill input {
          position: absolute;
          opacity: 0;
          inset: 0;
          cursor: pointer;
        }
        .brac-pill span {
          display: block;
          text-align: center;
          padding: 12px;
          border: 1.5px solid var(--line);
          border-radius: 12px;
          font-weight: 600;
          color: var(--navy);
          cursor: pointer;
          transition: all 0.15s;
        }
        .brac-pill input:checked + span {
          background: var(--navy);
          border-color: var(--navy);
          color: var(--white);
        }
        .brac-pill input:focus-visible + span {
          box-shadow: 0 0 0 3px var(--mint);
        }

        /* Course cards */
        .brac-courses {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .brac-choice {
          position: relative;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border: 1.5px solid var(--line);
          border-radius: 14px;
          cursor: pointer;
          background: var(--white);
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .brac-choice input {
          position: absolute;
          opacity: 0;
        }
        .brac-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--line);
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .brac-choice .name {
          font-weight: 600;
          color: var(--navy);
          font-size: 15px;
          line-height: 1.3;
        }
        .brac-choice .sub {
          display: block;
          font-weight: 400;
          font-size: 13px;
          color: var(--muted);
          margin-top: 2px;
        }
        .brac-choice .fee {
          font-weight: 700;
          color: var(--navy);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .brac-choice.best {
          background: var(--mint);
          border-color: var(--mint);
        }
        .brac-badge {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--white);
          background: var(--teal);
          padding: 3px 7px;
          border-radius: 999px;
          margin-bottom: 4px;
        }
        .brac-choice.selected {
          border-color: var(--teal);
          box-shadow: 0 0 0 1px var(--teal);
        }
        .brac-choice.selected .brac-dot {
          border-color: var(--teal);
          background: radial-gradient(circle, var(--teal) 45%, transparent 50%);
        }
        .brac-choice:focus-within {
          box-shadow: 0 0 0 3px var(--mint);
        }
        .brac-gst {
          font-size: 13px;
          color: var(--muted);
        }

        /* Declaration */
        .brac-declare {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 12px;
          align-items: start;
          background: var(--sky);
          border-radius: 14px;
          padding: 14px 16px;
          font-size: 14px;
          cursor: pointer;
        }
        .brac-declare input {
          width: 20px;
          height: 20px;
          margin: 2px 0 0;
          accent-color: var(--teal);
        }

        .brac-hp {
          position: absolute;
          left: -9999px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        }

        .brac-submit-btn {
          font: inherit;
          font-size: 17px;
          font-weight: 700;
          color: var(--white);
          background: var(--teal);
          border: 0;
          border-radius: 14px;
          padding: 16px;
          cursor: pointer;
          transition: background .15s;
          width: 100%;
        }
        .brac-submit-btn:hover:not(:disabled) {
          background: #1C8B75;
        }
        .brac-submit-btn:focus-visible {
          outline: 3px solid var(--navy);
          outline-offset: 2px;
        }
        .brac-submit-btn:disabled {
          opacity: .6;
          cursor: wait;
        }
        .brac-formerr {
          background: #FBEAE8;
          color: var(--error);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          font-weight: 500;
        }

        /* Success screen */
        .brac-done {
          margin-top: 24px;
          background: var(--mint);
          border-radius: 20px;
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .brac-done h2 {
          font-family: var(--display);
          font-size: 26px;
          line-height: 1.15;
          color: var(--navy);
          margin: 0;
        }
        .brac-done p {
          margin: 0;
        }
        .brac-summary {
          background: var(--white);
          border-radius: 14px;
          padding: 14px 16px;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 6px 14px;
          font-size: 14px;
          margin: 6px 0;
        }
        .brac-summary dt {
          color: var(--muted);
        }
        .brac-summary dd {
          margin: 0;
          font-weight: 600;
          color: var(--navy);
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .brac-pay {
          background: var(--white);
          border-radius: 16px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: stretch;
          margin-top: 4px;
        }
        .brac-step {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--navy);
          font-size: 16px;
          margin-top: 4px;
        }
        .brac-step .n {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--navy);
          color: var(--white);
          display: grid;
          place-items: center;
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .brac-btn {
          display: block;
          text-align: center;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
          padding: 14px;
          border-radius: 12px;
          transition: opacity 0.15s;
        }
        .brac-btn:hover {
          opacity: 0.92;
        }
        .brac-btn.upi {
          background: var(--navy);
          color: var(--white);
        }
        .brac-btn.wa {
          background: var(--teal);
          color: var(--white);
        }
        .brac-btn:focus-visible {
          outline: 3px solid var(--mint);
          outline-offset: 2px;
        }
        .brac-upi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          width: 100%;
        }
        .brac-upi-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          background: #FFFFFF;
          color: var(--navy);
          padding: 12px 10px;
          border-radius: 12px;
          border: 1.5px solid #E2E8F0;
          font-family: inherit;
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(19, 37, 79, 0.06);
          transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s;
        }
        .brac-upi-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(19, 37, 79, 0.12);
          border-color: #CBD5E1;
          background: #F8FAFC;
          color: var(--navy);
        }
        .brac-upi-btn:active {
          transform: translateY(0);
        }
        .brac-other-upi-link {
          display: inline-block;
          margin: 2px auto 0;
          text-align: center;
          color: var(--navy);
          font-size: 13.5px;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          transition: color 0.15s;
        }
        .brac-other-upi-link:hover {
          color: var(--teal);
        }
        @media (max-width: 520px) {
          .brac-upi-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .brac-upi-btn {
            padding: 14px 14px;
            font-size: 14.5px;
          }
        }
        .brac-or {
          text-align: center;
          font-size: 13px;
          color: var(--muted);
        }
        .brac-qr {
          align-self: center;
          width: 240px;
          max-width: 100%;
          height: auto;
          border: 1.5px solid var(--line);
          border-radius: 12px;
          padding: 8px;
          background: #fff;
        }
        .brac-upiid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 15px;
          color: var(--ink);
        }
        .brac-upiid b {
          color: var(--navy);
          user-select: all;
        }
        .brac-copy {
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          color: var(--navy);
          background: var(--sky);
          border: 0;
          border-radius: 8px;
          padding: 6px 12px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .brac-copy:hover {
          background: #D5E1F7;
        }
        .brac-payee {
          text-align: center;
          font-size: 13px;
          color: var(--muted);
        }
        .brac-fine {
          font-size: 13px;
          color: var(--muted);
          text-align: center;
        }
        .brac-footer {
          margin-top: 32px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
          font-size: 12px;
          color: var(--muted);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .brac-footer b {
          color: var(--navy);
        }

        .brac-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid #13254F;
          color: #13254F;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 999px;
          margin-bottom: 16px;
          box-shadow: 0 2px 5px rgba(19, 37, 79, 0.08);
          transition: all 0.2s ease;
        }
        .brac-back-btn:hover {
          background: #13254F;
          color: #FFFFFF;
          transform: translateX(-3px);
          box-shadow: 0 4px 10px rgba(19, 37, 79, 0.18);
        }
        .brac-secondary-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px 20px;
          border-radius: 12px;
          border: 2px solid #13254F;
          background: #FFFFFF;
          color: #13254F;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 18px;
          box-shadow: 0 2px 6px rgba(19, 37, 79, 0.08);
          transition: all 0.2s ease;
        }
        .brac-secondary-btn:hover {
          background: #13254F;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(19, 37, 79, 0.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .brac-page-root * { transition: none !important; }
        }
      `}</style>

      <div className="brac-wrap">
        {!CONFIG.endpoint && (
          <div className="brac-preview">
            PREVIEW MODE · registrations are not saved until the CRM endpoint is set
          </div>
        )}

        <header className="brac-brand">
          <img className="imed" src={imedLogo} alt="iMED Academy" />
          <div className="brac-with">
            <span>In partnership with</span>
            <img
              className="brac"
              src={BRAC_LOGO}
              alt="Dr. Bhim Rao Ambedkar College, University of Delhi, Accredited by NAAC"
            />
          </div>
        </header>

        {!isSubmitted ? (
          <>
            <section className="brac-hero">
              <span className="brac-tag">Final-year B.A. &amp; B.Com</span>
              <h1>Register for the Healthcare Career Programme</h1>
              <p>On campus, alongside your degree. 2 days a week, 2 hours per session.</p>
            </section>

            <form className="brac-form" onSubmit={handleSubmit} noValidate>
              <fieldset>
                <legend>Your details</legend>
                <div className={`brac-field ${errors.name ? "invalid" : ""}`} data-f="name">
                  <label htmlFor="name">
                    Full name <span className="brac-opt">(as on college ID)</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => handleTextChange("name", e.target.value)}
                    required
                  />
                  {errors.name && <span className="brac-err">{errors.name}</span>}
                </div>

                <div className="brac-row">
                  <div className={`brac-field ${errors.rollNo ? "invalid" : ""}`} data-f="rollNo">
                    <label htmlFor="rollNo">College roll number</label>
                    <input
                      id="rollNo"
                      name="rollNo"
                      type="text"
                      value={formData.rollNo}
                      onChange={(e) => handleTextChange("rollNo", e.target.value)}
                      required
                    />
                    {errors.rollNo && <span className="brac-err">{errors.rollNo}</span>}
                  </div>
                  <div className="brac-field" data-f="section">
                    <label htmlFor="section">
                      Section <span className="brac-opt">(optional)</span>
                    </label>
                    <input
                      id="section"
                      name="section"
                      type="text"
                      value={formData.section}
                      onChange={(e) => handleTextChange("section", e.target.value)}
                    />
                  </div>
                </div>

                <div className={`brac-field ${errors.stream ? "invalid" : ""}`} data-f="stream">
                  <span className="label" id="streamLbl">
                    Stream
                  </span>
                  <div className="brac-pills" role="radiogroup" aria-labelledby="streamLbl">
                    <label className="brac-pill">
                      <input
                        type="radio"
                        name="stream"
                        id="streamBA"
                        value="B.A."
                        checked={formData.stream === "B.A."}
                        onChange={(e) => handleTextChange("stream", e.target.value)}
                        required
                      />
                      <span>B.A.</span>
                    </label>
                    <label className="brac-pill">
                      <input
                        type="radio"
                        name="stream"
                        id="streamBCom"
                        value="B.Com"
                        checked={formData.stream === "B.Com"}
                        onChange={(e) => handleTextChange("stream", e.target.value)}
                      />
                      <span>B.Com</span>
                    </label>
                  </div>
                  {errors.stream && <span className="brac-err">{errors.stream}</span>}
                </div>

                <div className={`brac-field ${errors.phone ? "invalid" : ""}`} data-f="phone">
                  <label htmlFor="phone">WhatsApp number</label>
                  <div className="brac-phone">
                    <span className="cc">+91</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      autoComplete="tel-national"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  <span className="brac-hint">Your confirmation and next steps come here.</span>
                  {errors.phone && <span className="brac-err">{errors.phone}</span>}
                </div>

                <div className={`brac-field ${errors.email ? "invalid" : ""}`} data-f="email">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => handleTextChange("email", e.target.value)}
                    required
                  />
                  {errors.email && <span className="brac-err">{errors.email}</span>}
                </div>
              </fieldset>

              <fieldset>
                <legend>Course</legend>
                <div className={`brac-field ${errors.course ? "invalid" : ""}`} data-f="course">
                  <span className="label" id="courseLbl">
                    I'm registering for
                  </span>
                  <div className="brac-courses" role="radiogroup" aria-labelledby="courseLbl">
                    {COURSES.map((c) => {
                      const isChecked = formData.course === c.value;
                      return (
                        <label
                          key={c.id}
                          className={`brac-choice ${c.best ? "best" : ""} ${isChecked ? "selected" : ""
                            }`}
                          onClick={() => handleCourseSelect(c)}
                        >
                          <input
                            type="radio"
                            name="course"
                            id={c.id}
                            value={c.value}
                            checked={isChecked}
                            onChange={() => handleCourseSelect(c)}
                            required
                          />
                          <span className="brac-dot"></span>
                          <span className="name">
                            {c.badge && (
                              <>
                                <span className="brac-badge">{c.badge}</span>
                                <br />
                              </>
                            )}
                            {c.title}
                            <span className="sub">{c.sub}</span>
                          </span>
                          <span className="fee">₹{c.fee.toLocaleString("en-IN")}</span>
                        </label>
                      );
                    })}
                  </div>
                  {CONFIG.gstNote && <span className="brac-gst">{CONFIG.gstNote}</span>}
                  {errors.course && <span className="brac-err">{errors.course}</span>}
                </div>
              </fieldset>

              <fieldset>
                <legend>Parent / guardian</legend>
                <div className="brac-row">
                  <div
                    className={`brac-field ${errors.parentName ? "invalid" : ""}`}
                    data-f="parentName"
                  >
                    <label htmlFor="parentName">Name</label>
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => handleTextChange("parentName", e.target.value)}
                      required
                    />
                    {errors.parentName && <span className="brac-err">{errors.parentName}</span>}
                  </div>
                  <div
                    className={`brac-field ${errors.parentPhone ? "invalid" : ""}`}
                    data-f="parentPhone"
                  >
                    <label htmlFor="parentPhone">Phone</label>
                    <div className="brac-phone">
                      <span className="cc">+91</span>
                      <input
                        id="parentPhone"
                        name="parentPhone"
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={formData.parentPhone}
                        onChange={(e) => handlePhoneChange("parentPhone", e.target.value)}
                        required
                      />
                    </div>
                    {errors.parentPhone && <span className="brac-err">{errors.parentPhone}</span>}
                  </div>
                </div>
              </fieldset>

              <div className={`brac-field ${errors.consent ? "invalid" : ""}`} data-f="consent">
                <label className="brac-declare" htmlFor="consent">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, consent: e.target.checked }))
                    }
                    required
                  />
                  <span>
                    I confirm my registration for the selected iMED Academy programme and agree to be
                    contacted by iMED Academy on WhatsApp, phone and email about it.
                  </span>
                </label>
                {errors.consent && <span className="brac-err">{errors.consent}</span>}
              </div>

              {/* Honeypot field for bot protection */}
              <div className="brac-hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => handleTextChange("website", e.target.value)}
                />
              </div>

              {formError && (
                <div className="brac-formerr" role="alert">
                  {formError}
                </div>
              )}

              <button type="submit" className="brac-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Registering…" : "Register now"}
              </button>
            </form>
          </>
        ) : (
          <section className="brac-done" aria-live="polite">
            <button
              type="button"
              className="brac-back-btn"
              onClick={() => {
                setIsSubmitted(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>Back to Form & Edit Details</span>
            </button>
            <h2>Registration received.</h2>
            <p>
              One last step to confirm your seat: pay the{" "}
              <b>₹{CONFIG.regFee.toLocaleString("en-IN")} registration fee</b> and send us the
              screenshot.
            </p>

            <dl className="brac-summary">
              <dt>Name</dt>
              <dd>{formData.name}</dd>
              <dt>Roll no.</dt>
              <dd>{formData.rollNo}</dd>
              <dt>Course</dt>
              <dd>{formData.course}</dd>
              <dt>Course fee</dt>
              <dd>₹{formData.courseFee.toLocaleString("en-IN")}</dd>
              <dt>WhatsApp</dt>
              <dd>+91 {formData.phone}</dd>
            </dl>

            <div className="brac-pay">
              <div className="brac-step">
                <span className="n">1</span>
                <b>Pay ₹{CONFIG.regFee.toLocaleString("en-IN")}</b>
              </div>

              <div className="brac-upi-grid">
                <a className="brac-upi-btn" href={gpayLink} title="Pay with Google Pay">
                  <GPayIcon />
                  <span>Google Pay</span>
                </a>
                <a className="brac-upi-btn" href={phonepeLink} title="Pay with PhonePe">
                  <PhonePeIcon />
                  <span>PhonePe</span>
                </a>
                <a className="brac-upi-btn" href={paytmLink} title="Pay with Paytm">
                  <PaytmIcon />
                  <span>Paytm</span>
                </a>
              </div>

              <a className="brac-other-upi-link" href={upiLink}>
                Pay with another UPI app
              </a>

              <div className="brac-or">or scan this QR from another phone</div>

              <div
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1.5px solid var(--line)",
                  maxWidth: "240px",
                  margin: "0 auto",
                }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    upiLink
                  )}`}
                  alt="UPI QR Code"
                  className="brac-qr"
                  style={{ border: "none", padding: 0, width: "190px", height: "190px" }}
                />
              </div>

              <div className="brac-upiid">
                <span>
                  UPI ID: <b id="upiText">{CONFIG.upiId}</b>
                </span>
                <button type="button" className="brac-copy" onClick={handleCopyUpi}>
                  {copiedUpi ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="brac-payee">Paid to: {CONFIG.payee}</div>

              <div className="brac-step">
                <span className="n">2</span>
                <b>Send the payment screenshot</b>
              </div>

              <a className="brac-btn wa" href={waLink} target="_blank" rel="noopener noreferrer">
                Send screenshot on WhatsApp
              </a>

              <div className="brac-payee">
                WhatsApp: <b>+91 98182 11746</b> · mention your name and roll number
              </div>

              <p className="brac-fine">
                Your seat is confirmed once we verify the payment. You'll get a confirmation on
                WhatsApp.
              </p>

              <button
                type="button"
                className="brac-secondary-btn"
                onClick={() => {
                  setIsSubmitted(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
                <span>Back to Registration Form</span>
              </button>
            </div>
          </section>
        )}

        <footer className="brac-footer">
          <div>
            Questions? <b>Shekhar Chandra</b>, Business Head · +91 98182 11746 · contact@imedacademy.in
          </div>
          <div>
            Certificate by iMED Academy, an NSDC-Approved Training Partner.
          </div>
        </footer>
      </div>
    </div>
  );
}
