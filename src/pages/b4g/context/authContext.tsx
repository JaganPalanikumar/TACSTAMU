import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/utils/supabase";
import { User } from "@supabase/supabase-js";
import type { AuthContextType } from "../types/AuthContextTypes";
import { Profile } from "../types/DatabaseTypes";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/footer";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user: User, profile: Profile) => {
    setUser(user); // Adds user info to state
    setProfile(profile);
  };

  const logout = () => {
    setUser(null); // Removes user info from state
    setProfile(null);
    supabase.auth.signOut();
  };

  // On page open and reloadsd check if a user is currently signed in or not
  const restoreSession = async () => {
    try {
      // Get user data
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (user?.id) {
        setUser(user);
      } else {
        throw userError;
      }

      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select()
        .eq("id", user.id)
        .maybeSingle();
      if (profile?.id) {
        setProfile(profile as Profile);
      } else {
        throw profileError;
      }
    } catch (e) {
      setUser(null);
      setProfile(null);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, login, logout, isLoading }}>
      <Navigation />
      {children}
      <Footer />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
