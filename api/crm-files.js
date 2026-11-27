import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const BUCKET = "crm-private";
const LINK_EXPIRY_SECONDS = 300;

const FILES = [
  { id: "onboarding-form", label: "Gym Client Onboarding Form", file: "1_Gym_Client_Onboarding_Form.pdf" },
  { id: "content-calendar", label: "Monthly Content Calendar", file: "2_Monthly_Content_Calendar.xlsx" },
  { id: "script-approval", label: "Script Approval Process", file: "3_Script_Approval_Process.pdf" },
  { id: "shoot-day-checklist", label: "Shoot Day Checklist", file: "4_Shoot_Day_Checklist.pdf" },
  { id: "editor-checklist", label: "Editor Checklist", file: "5_Editor_Checklist.pdf" },
  { id: "monthly-report-template", label: "Monthly Report Template", file: "6_Monthly_Report_Template.pdf" },
  { id: "content-services-agreement", label: "Content Services Agreement", file: "7_Content_Services_Agreement.pdf" },
];

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function parseCookies(req) {
  if (req.cookies) return req.cookies;
  const header = req.headers.cookie || "";
  const out = {};
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

function isSessionValid(token, secret) {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [payload, signature] = token.split(".");
  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(signature || "", "utf8");
  const expBuf = Buffer.from(expected, "utf8");
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed. Use GET." });
  }

  const CRM_SESSION_SECRET = process.env.CRM_SESSION_SECRET;
  if (!CRM_SESSION_SECRET) {
    return res.status(500).json({ ok: false, error: "Server misconfigured: CRM_SESSION_SECRET not set." });
  }

  const cookies = parseCookies(req);
  if (!isSessionValid(cookies.crm_session, CRM_SESSION_SECRET)) {
    return res.status(401).json({ ok: false, error: "Not authenticated or session expired." });
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return res.status(500).json({ ok: false, error: "Server misconfigured: Supabase credentials missing." });
  }

  const supabase = createClient(url, key);

  try {
    const files = await Promise.all(
      FILES.map(async (entry) => {
        const { data, error } = await supabase.storage
          .from(BUCKET)
          .createSignedUrl(entry.file, LINK_EXPIRY_SECONDS);
        if (error) throw error;
        return { id: entry.id, label: entry.label, url: data.signedUrl };
      })
    );

    return res.status(200).json({ ok: true, files });
  } catch (err) {
    console.error("CRM Files API Error:", err);
    return res.status(500).json({ ok: false, error: err?.message || "Failed to generate download links." });
  }
}
