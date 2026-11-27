import { createClient } from "@supabase/supabase-js";

function getConsoleAdminClient() {
  const url = process.env.CONSOLE_SUPABASE_URL;
  const key = process.env.CONSOLE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

const HOUR = 36e5;
const DAY = 24 * HOUR;
const FOLLOWUP_STALE_DAYS = 3;
const APPROVAL_WINDOW_HOURS = 48;
const RENEWAL_WINDOW_DAYS = 14;

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "").trim();
  if (!token || token !== process.env.CRON_SECRET) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  const admin = getConsoleAdminClient();
  if (!admin) {
    return res.status(500).json({ ok: false, error: "Server misconfigured: console Supabase env vars not set." });
  }

  try {
    const now = Date.now();

    const [{ data: adminProfiles }, { data: leads }, { data: items }, { data: clients }, { data: invoices }] = await Promise.all([
      admin.from("profiles").select("email").eq("role", "admin"),
      admin.from("leads").select("*").is("client_id", null),
      admin.from("content_items").select("*"),
      admin.from("clients").select("*"),
      admin.from("invoices").select("*"),
    ]);

    const adminEmails = (adminProfiles || []).map((p) => p.email).filter(Boolean);
    if (!adminEmails.length) {
      return res.status(200).json({ ok: true, sent: false, reason: "No admin email on file." });
    }

    const clientName = (id) => (clients || []).find((c) => c.id === id)?.name || "(deleted client)";

    const staleLeads = (leads || []).filter((l) => {
      if (l.stage === "Plan signed" || l.stage === "Not interested") return false;
      const since = now - new Date(l.updated_at || l.created_at).getTime();
      return since > FOLLOWUP_STALE_DAYS * DAY;
    });

    const overdueApprovals = (items || []).filter((r) => {
      if (r.stage !== "script_sent" && r.stage !== "edit_sent") return false;
      if (!r.sent_at) return false;
      return new Date(r.sent_at).getTime() + APPROVAL_WINDOW_HOURS * HOUR < now;
    });

    const renewalsDue = (clients || []).filter((c) => {
      if (c.status !== "Active" || !c.months || !c.end_date) return false;
      const daysLeft = Math.ceil((new Date(c.end_date).getTime() - now) / DAY);
      return daysLeft >= 0 && daysLeft <= RENEWAL_WINDOW_DAYS;
    });

    const overdueInvoices = (invoices || []).filter((i) => !i.paid && new Date(i.due_date).getTime() < now);

    const totalIssues = staleLeads.length + overdueApprovals.length + renewalsDue.length + overdueInvoices.length;
    if (totalIssues === 0) {
      return res.status(200).json({ ok: true, sent: false, reason: "Nothing to report today." });
    }

    const section = (title, rows) =>
      rows.length
        ? `<h3 style="margin:18px 0 8px;color:#16181d">${title} (${rows.length})</h3><ul style="margin:0;padding-left:18px;color:#333">${rows.join("")}</ul>`
        : "";

    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
        <h2 style="color:#ff7a1a;margin-top:0">Story Builder Console — daily digest</h2>
        <p style="color:#666;font-size:13px">${new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
        ${section(
          "Leads gone quiet (3+ days with no update)",
          staleLeads.map((l) => `<li>${esc(l.name)} — still "${esc(l.stage)}"</li>`)
        )}
        ${section(
          "Approvals overdue (past 48h)",
          overdueApprovals.map((r) => `<li>${esc(r.title)} — ${esc(clientName(r.client_id))}</li>`)
        )}
        ${section(
          "Renewals due within 14 days",
          renewalsDue.map((c) => `<li>${esc(c.name)} — ends ${new Date(c.end_date).toLocaleDateString("en-IN")}</li>`)
        )}
        ${section(
          "Invoices overdue",
          overdueInvoices.map((i) => `<li>${esc(i.invoice_no)} — ${esc(clientName(i.client_id))} — ₹${Number(i.amount).toLocaleString("en-IN")}</li>`)
        )}
        <p style="margin-top:24px"><a href="https://thestorybuilder.in/db" style="background-color:#ff7a1a;color:white;padding:12px 22px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block">Open Story Builder Console</a></p>
      </div>
    `;

    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;
    if (!smtpUser || !smtpPass) {
      return res.status(200).json({ ok: true, sent: false, reason: "SMTP not configured." });
    }

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Story Builder Console" <${smtpUser}>`,
      to: adminEmails.join(","),
      subject: `Story Builder Console: ${totalIssues} item(s) need attention today`,
      html,
    });

    return res.status(200).json({
      ok: true,
      sent: true,
      counts: { staleLeads: staleLeads.length, overdueApprovals: overdueApprovals.length, renewalsDue: renewalsDue.length, overdueInvoices: overdueInvoices.length },
    });
  } catch (err) {
    console.error("console-reminders error:", err);
    return res.status(500).json({ ok: false, error: err.message || "Failed to run reminders job." });
  }
}
