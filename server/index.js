import "dotenv/config";
import express from "express";
import cors from "cors";
import compression from "compression";
import multer from "multer";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(compression());
app.use(express.json({ limit: "2mb" }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const toAddress = process.env.MAIL_TO || process.env.SMTP_USER;

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { fullName, phone, qualification, preferredProgram, mode, message } = req.body || {};

    if (!fullName || !phone || !preferredProgram) {
      return res.status(400).json({ ok: false, error: "Missing required fields." });
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toAddress,
      replyTo: process.env.SMTP_USER,
      subject: `New Contact Lead - ${preferredProgram}`,
      text: [
        `Name: ${fullName}`,
        `Phone: ${phone}`,
        `Qualification: ${qualification || "-"}`,
        `Preferred Program: ${preferredProgram}`,
        `Mode: ${mode || "-"}`,
        `Message: ${message || "-"}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
          <div style="background:#1f3471;color:#fff;padding:16px 20px">
            <h2 style="margin:0;font-size:20px">New Contact Lead</h2>
          </div>
          <div style="padding:18px 20px;color:#111827;line-height:1.6">
            <p style="margin:0 0 10px"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
            <p style="margin:0 0 10px"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
            <p style="margin:0 0 10px"><strong>Qualification:</strong> ${escapeHtml(qualification || "-")}</p>
            <p style="margin:0 0 10px"><strong>Preferred Program:</strong> ${escapeHtml(preferredProgram)}</p>
            <p style="margin:0 0 10px"><strong>Mode:</strong> ${escapeHtml(mode || "-")}</p>
            <p style="margin:0"><strong>Message:</strong><br/>${escapeHtml(message || "-")}</p>
          </div>
        </div>
      `,
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Failed to send contact email." });
  }
});

app.post("/api/careers", upload.single("resume"), async (req, res) => {
  try {
    const { name, mobile, email, interestedRole } = req.body || {};

    if (!name || !mobile || !email || !interestedRole) {
      return res.status(400).json({ ok: false, error: "Missing required fields." });
    }

    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toAddress,
      replyTo: email,
      subject: `New Careers Application - ${interestedRole}`,
      text: [
        `Name: ${name}`,
        `Mobile: ${mobile}`,
        `Email: ${email}`,
        `Interested Role: ${interestedRole}`,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden">
          <div style="background:#1f3471;color:#fff;padding:16px 20px">
            <h2 style="margin:0;font-size:20px">New Careers Application</h2>
          </div>
          <div style="padding:18px 20px;color:#111827;line-height:1.6">
            <p style="margin:0 0 10px"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 10px"><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>
            <p style="margin:0 0 10px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin:0"><strong>Interested Role:</strong> ${escapeHtml(interestedRole)}</p>
          </div>
        </div>
      `,
      attachments,
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Failed to send careers email." });
  }
});

app.listen(port, () => {
  console.log(`Mail server running on http://localhost:${port}`);
});
