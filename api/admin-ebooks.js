import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default async function handler(req, res) {
  // CORS setup
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
    if (req.method === "GET") {
      const { data, error } = await supabase.from("ebooks").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return res.status(200).json({ ok: true, ebooks: data });
    }

    if (req.method === "POST") {
      const payload = req.body;
      const { data, error } = await supabase.from("ebooks").insert(payload).select().single();
      if (error) throw error;
      return res.status(200).json({ ok: true, ebook: data });
    }

    if (req.method === "PUT") {
      const { id, ...payload } = req.body;
      if (!id) throw new Error("Missing ID for update");
      const { data, error } = await supabase.from("ebooks").update(payload).eq("id", id).select().single();
      if (error) throw error;
      return res.status(200).json({ ok: true, ebook: data });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) throw new Error("Missing ID for deletion");
      const { error } = await supabase.from("ebooks").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error("Admin API Error:", err);
    return res.status(400).json({ ok: false, error: err.message });
  }
}
