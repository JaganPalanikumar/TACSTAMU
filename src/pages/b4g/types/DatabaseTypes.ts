import { Json } from "@/utils/supabase_types";

export type Profile = {
  created_at: string;
  diet_restrictions: Json;
  first_name: string;
  grad_year: number;
  has_eaten: boolean;
  id: string;
  last_name: string;
  participating: boolean;
  team_name: string | null;
};