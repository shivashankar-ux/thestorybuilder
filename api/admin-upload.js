import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
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

  if (ADMIN_PASSWORD && token !== ADMIN_PASSWORD) {
    return res.status(401).json({ ok: false, error: "Unauthorized. Incorrect Admin Password." });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ ok: false, error: "Supabase configuration missing on server." });
  }

  try {
    const { bucket = "public-assets", filename, fileBase64, contentType } = req.body || {};
    if (!filename) {
      throw new Error("Missing filename in request body");
    }

    // Ensure bucket exists
    try {
      const { data: buckets } = await supabase.storage.listBuckets();
      const exists = buckets?.some(b => b.name === bucket);
      if (!exists) {
        await supabase.storage.createBucket(bucket, { public: bucket === "public-assets" });
      }
    } catch (bErr) {
      console.warn("Bucket check/creation warning:", bErr.message);
    }

    // Clean path name
    const path = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // 1. Direct Base64 Upload (Recommended & CORS-Proof)
    if (fileBase64) {
      const base64Data = fileBase64.replace(/^data:.*?;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");

      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(path, buffer, {
          contentType: contentType || "application/octet-stream",
          upsert: true
        });

      if (uploadErr) throw uploadErr;

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
      const fileStoragePath = `${bucket}/${path}`;

      return res.status(200).json({
        ok: true,
        path: fileStoragePath,
        publicUrl,
        filename: path
      });
    }

    // 2. Signed Upload URL (Fallback)
    const { data: signedData, error: signedErr } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (signedErr) throw signedErr;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";

    return res.status(200).json({ 
      ok: true, 
      signedUrl: signedData.signedUrl, 
      path: `${bucket}/${path}`,
      publicUrl: `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
    });

  } catch (err) {
    console.error("Admin Upload API Error:", err);
    return res.status(400).json({ ok: false, error: err.message || "Upload failed." });
  }
}
