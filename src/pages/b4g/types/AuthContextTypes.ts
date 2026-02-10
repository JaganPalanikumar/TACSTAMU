import { User } from "@supabase/supabase-js";
import { Profile } from "./DatabaseTypes";

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  login: (user: User, profile: Profile) => void;
  logout: () => void;
  isLoading: boolean;
}
