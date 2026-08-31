import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ccxldrupmrblqmcfzzji.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_YduiblgAFe4-Q-kWFD603Q_AXrcblj1";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
