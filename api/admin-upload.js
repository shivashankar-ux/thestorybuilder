import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ ok: false, error: "ADMIN_PASSWORD not configured on server" });
  }

  if (token !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Unauthorized. Incorrect Admin Password." });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ ok: false, error: "Supabase Service Role Key missing on server." });
  }

  try {
    const { bucket, filename } = req.body;
    if (!bucket || !filename) {
      throw new Error("Missing bucket or filename in request body");
    }

    // Generate a unique path to avoid collisions
    const path = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { data, error } = await supabase.storage.from(bucket).createSignedUploadUrl(path);

    if (error) throw error;

    return res.status(200).json({ 
      ok: true, 
      signedUrl: data.signedUrl, 
      path: `${bucket}/${path}` // Note: Supabase createSignedUploadUrl returns the URL. The path to save in DB is bucket/path. Actually for file_url in DB we just save the 'bucket/path' or 'path' depending on how our app consumes it. The app consumes 'ebooks-private/filename.pdf' so returning `${bucket}/${path}` is perfect.
    });
  } catch (err) {
    console.error("Admin Upload API Error:", err);
    return res.status(400).json({ ok: false, error: err.message });
  }
}
