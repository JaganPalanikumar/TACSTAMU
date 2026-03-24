import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = (user: User, profile: Profile) => {
    setUser(user); // Adds user info to state
    setProfile(profile);
    return;
  };

  const logout = () => {
    setUser(null); // Removes user info from state
    setProfile(null);
    supabase.auth.signOut();
    return;
  };

  const RECOVERY_MODE_KEY = "b4g_recovery_mode";

  // On page open and reloadsd check if a user is currently signed in or not
  const reloadSession = async () => {
    try {
      // CRITICAL: Capture type=recovery from URL BEFORE any Supabase call.
      // Supabase clears the hash after processing tokens, so we must read it first.
      if (typeof window !== "undefined") {
        const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        if (hash.get("type") === "recovery") {
          sessionStorage.setItem(RECOVERY_MODE_KEY, "1");
        }
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      // If no session, clear recovery mode and bail
      if (!user?.id) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem(RECOVERY_MODE_KEY);
        }
        setUser(null);
        setProfile(null);
        return;
      }

      // Security: If we're in recovery mode, don't grant access until password is set.
      if (typeof window !== "undefined" && sessionStorage.getItem(RECOVERY_MODE_KEY) === "1") {
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(user);

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
    reloadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      reloadSession();
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isLoading || typeof window === "undefined") return;
    if (
      sessionStorage.getItem(RECOVERY_MODE_KEY) === "1" &&
      !router.pathname.endsWith("/ResetPassword")
    ) {
      router.replace("/b4g/ResetPassword");
    }
  }, [isLoading, router.pathname]);

  return (
    <AuthContext.Provider
      value={{ user, profile, login, logout, isLoading, reloadSession }}
    >
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
