import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase_types.ts";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
        