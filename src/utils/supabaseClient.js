import { createClient } from "@supabase/supabase-js";

// Read Supabase environment variables
// Vite only exposes variables with VITE_ prefix (or those listed in envPrefix in vite.config.js)
// NEXT_PUBLIC_ is also supported via vite.config.js envPrefix setting
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://prxgbhxjdesjsybrskhx.supabase.co";

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.SUPABASE_ANON_KEY ||
  "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "https://placeholder-url.supabase.co" &&
    supabaseAnonKey !== "placeholder-anon-key"
  );
};
