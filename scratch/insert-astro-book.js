import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [k, v] = line.split("=");
  if (k && v) envVars[k.trim()] = v.trim();
});

const url = envVars.VITE_SUPABASE_URL || "https://prxgbhxjdesjsybrskhx.supabase.co";
const serviceKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, serviceKey);

async function insertAstroBook() {
  console.log("Upserting Astro6 ebook record into Supabase ebooks table...");

  const booksToUpsert = [
    {
      title: "Astrology for Beginners: Astro 6 Playbook",
      slug: "astro6-for-beginners",
      description: "Master planetary positions, natal charts, zodiac house alignments, and practical horoscopes step-by-step with this complete playbook.",
      price_inr: 499,
      file_url: "ebooks-private/Astro6-for-Beginners.docx",
      cover_image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Astrology for Beginners: Astro 6 Playbook",
      slug: "astrology-for-beginners",
      description: "Master planetary positions, natal charts, zodiac house alignments, and practical horoscopes step-by-step with this complete playbook.",
      price_inr: 499,
      file_url: "ebooks-private/Astro6-for-Beginners.docx",
      cover_image_url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "The 7-Day Web Design & Conversion Blueprint",
      slug: "7-day-web-design-blueprint",
      description: "The exact blueprint used by high-converting digital agencies to build, launch, and monetize premium custom websites in 7 days flat.",
      price_inr: 499,
      file_url: "ebooks-private/Astro6-for-Beginners.docx",
      cover_image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    }
  ];

  for (const b of booksToUpsert) {
    const { data, error } = await supabase
      .from("ebooks")
      .upsert(b, { onConflict: "slug" })
      .select();

    if (error) {
      console.error(`Error upserting ${b.slug}:`, error.message);
    } else {
      console.log(`SUCCESS! Upserted '${b.title}' (slug: ${b.slug}) ID:`, data[0]?.id);
    }
  }
}

insertAstroBook();
