import crypto from "crypto";

const SESSION_HOURS = 12;

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
  }

  const CRM_PASSWORD = process.env.CRM_PASSWORD;
  const CRM_SESSION_SECRET = process.env.CRM_SESSION_SECRET;

  if (!CRM_PASSWORD || !CRM_SESSION_SECRET) {
    return res.status(500).json({ ok: false, error: "Server misconfigured: CRM_PASSWORD or CRM_SESSION_SECRET not set." });
  }

  const { password } = req.body || {};
  if (typeof password !== "string" || password !== CRM_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Incorrect password." });
  }

  const exp = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = Buffer.from(JSON.stringify({ exp })).toString("base64url");
  const signature = sign(payload, CRM_SESSION_SECRET);
  const token = `${payload}.${signature}`;

  res.setHeader(
    "Set-Cookie",
    `crm_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${SESSION_HOURS * 3600}`
  );

  return res.status(200).json({ ok: true });
}
