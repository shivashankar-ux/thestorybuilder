import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Read credentials from .env
const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [k, v] = line.split("=");
  if (k && v) envVars[k.trim()] = v.trim();
});

const url = envVars.VITE_SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function runUpload() {
  console.log("Connecting to Supabase project:", url);

  const docPath = "C:\\Users\\Kiran\\Downloads\\Astro6-for-Beginners.docx";
  if (!fs.existsSync(docPath)) {
    console.error("Document file not found at:", docPath);
    return;
  }

  const fileBuffer = fs.readFileSync(docPath);
  const storageFileName = `Astro6-for-Beginners.docx`;
  const bucketName = "ebooks-private";

  console.log(`Uploading ${storageFileName} (${fileBuffer.length} bytes) to Supabase Storage bucket '${bucketName}'...`);

  // Ensure bucket exists or create it as private
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some((b) => b.name === bucketName);

  if (!bucketExists) {
    console.log(`Creating private bucket '${bucketName}'...`);
    const { error: bErr } = await supabase.storage.createBucket(bucketName, { public: false });
    if (bErr) console.warn("Bucket creation warning:", bErr.message);
  }

  // Upload file (overwrite if exists)
  const { data: uploadData, error: uploadErr } = await supabase.storage
    .from(bucketName)
    .upload(storageFileName, fileBuffer, {
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      upsert: true,
    });

  if (uploadErr) {
    console.error("Upload error:", uploadErr.message);
    return;
  }

  console.log("SUCCESS! File uploaded to storage path:", uploadData.path);

  // Generate test signed URL
  const { data: signedData, error: signErr } = await supabase.storage
    .from(bucketName)
    .createSignedUrl(storageFileName, 3600);

  if (!signErr && signedData?.signedUrl) {
    console.log("Signed URL test generated successfully:", signedData.signedUrl.substring(0, 80) + "...");
  }

  // Update or Insert into ebooks table for '7-day-web-design-blueprint' AND new 'astrology-for-beginners'
  console.log("Updating database records in 'ebooks' table...");

  const ebookData = {
    title: "The 7-Day Web Design & Conversion Blueprint",
    slug: "7-day-web-design-blueprint",
    description: "The exact blueprint used by high-converting digital agencies to build, launch, and monetize premium custom websites in 7 days flat.",
    price_inr: 499,
    file_url: "ebooks-private/Astro6-for-Beginners.docx",
    cover_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  };

  const { data: upsertData, error: upsertErr } = await supabase
    .from("ebooks")
    .upsert(ebookData, { onConflict: "slug" })
    .select();

  if (upsertErr) {
    console.warn("Database upsert notice:", upsertErr.message);
  } else {
    console.log("SUCCESS! Database updated with new ebook record ID:", upsertData[0]?.id);
  }
}

runUpload();
