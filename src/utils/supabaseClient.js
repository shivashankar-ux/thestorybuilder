import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables (supporting Vite VITE_ prefix and standard NEXT_PUBLIC_ / SUPABASE_ prefixes)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://prxgbhxjdesjsybrskhx.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "https://placeholder-url.supabase.co" &&
    supabaseAnonKey !== "placeholder-anon-key"
  );
};
