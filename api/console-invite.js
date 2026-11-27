import { createClient } from "@supabase/supabase-js";

function getConsoleAdminClient() {
  const url = process.env.CONSOLE_SUPABASE_URL;
  const key = process.env.CONSOLE_SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method not allowed" });

  const admin = getConsoleAdminClient();
  if (!admin) {
    return res.status(500).json({ ok: false, error: "Server misconfigured: console Supabase env vars not set." });
  }

  try {
    const authHeader = req.headers.authorization || "";
    const callerToken = authHeader.replace("Bearer ", "").trim();
    if (!callerToken) return res.status(401).json({ ok: false, error: "Missing access token" });

    // Verify the caller is a logged-in admin on this console before letting them invite anyone
    const { data: callerData, error: callerErr } = await admin.auth.getUser(callerToken);
    if (callerErr || !callerData?.user) {
      return res.status(401).json({ ok: false, error: "Invalid or expired session. Please log in again." });
    }

    const { data: callerProfile } = await admin
      .from("profiles")
      .select("role")
      .eq("id", callerData.user.id)
      .single();

    if (!callerProfile || callerProfile.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Only the admin can invite people." });
    }

    const { email, name, role, clientId } = req.body || {};
    if (!email || !name || !role) {
      return res.status(400).json({ ok: false, error: "Missing email, name or role" });
    }
    if (!["manager", "client"].includes(role)) {
      return res.status(400).json({ ok: false, error: "Invalid role" });
    }

    const redirectTo = "https://thestorybuilder.in/db";

    // Try to invite a brand-new login; if that email already has an account, send a reset link instead
    let actionLink, newUser;
    const { data: inviteData, error: inviteError } = await admin.auth.admin.generateLink({
      type: "invite",
      email,
      options: { redirectTo },
    });

    if (inviteError && /already registered|already been registered/i.test(inviteError.message || "")) {
      const { data: recoverData, error: recoverError } = await admin.auth.admin.generateLink({
        type: "recovery",
        email,
        options: { redirectTo },
      });
      if (recoverError) throw recoverError;
      actionLink = recoverData.properties.action_link;
      newUser = recoverData.user;
    } else if (inviteError) {
      throw inviteError;
    } else {
      actionLink = inviteData.properties.action_link;
      newUser = inviteData.user;
    }

    // Link this login to its role (and client record, for a client login)
    const { error: profileError } = await admin.from("profiles").upsert({
      id: newUser.id,
      email,
      role,
      client_id: role === "client" ? clientId || null : null,
    });
    if (profileError) throw profileError;

    // Email the set-password link
    let emailed = false;
    const smtpUser = process.env.SMTP_EMAIL;
    const smtpPass = process.env.SMTP_PASSWORD;
    if (smtpUser && smtpPass) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Story Builder Console" <${smtpUser}>`,
          to: email,
          subject: "Set your password — Story Builder Console",
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px;">
              <h2 style="color: #ff7a1a;">You've been added to Story Builder Console</h2>
              <p>Hi ${name},</p>
              <p>You've been given access as ${role === "client" ? "a client" : "a team member"}. Click below to set your password and log in.</p>
              <div style="margin: 30px 0; text-align: center;">
                <a href="${actionLink}" style="background-color: #ff7a1a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Set your password</a>
              </div>
              <p style="font-size: 13px; color: #666;">If the button doesn't work, copy and paste this link into your browser:<br><br>${actionLink}</p>
            </div>
          `,
        });
        emailed = true;
      } catch (emailErr) {
        console.error("console-invite email failed:", emailErr);
      }
    }

    return res.status(200).json({ ok: true, emailed, actionLink });
  } catch (err) {
    console.error("console-invite error:", err);
    return res.status(400).json({ ok: false, error: err.message || "Failed to send invite." });
  }
}
