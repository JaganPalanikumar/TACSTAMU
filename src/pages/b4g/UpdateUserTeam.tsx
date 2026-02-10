import { useSearchParams } from "next/navigation";
import { useAuth } from "./context/authContext";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";

export default function UpdateUserTeam() {
  const { profile } = useAuth();
  const searchParams = useSearchParams();

  const joining = searchParams.get("joining") === "true";
  const teamName = searchParams.get("teamName") ?? null;

  // FIXME When team leader leaves either delete team or give team leader to another user
  useEffect(() => {
    const joinOrLeave = async () => {
      if (!profile) return;

      try {
        const { error } = await supabase
          .from("profile")
          .update({ team_name: teamName })
          .eq("id", profile.id);

        if (error) throw error;
        // Update local context if necessary
        if (profile) {
          profile.team_name = teamName;
        }

        // Force full page reload to the new path
        window.location.href = joining ? "/b4g/TeamDashboard" : "/b4g";
      } catch (error) {
        console.error("Failed to update team", error);
      }
    };

    joinOrLeave();
  }, [profile, teamName, joining]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">
        {joining ? "Joining" : "Leaving"} {teamName ?? "team"}...
      </h1>
    </div>
  );
}
