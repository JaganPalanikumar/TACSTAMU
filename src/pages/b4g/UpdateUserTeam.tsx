import { useSearchParams } from "next/navigation";
import { useAuth } from "@/b4g/context/authContext";
import { useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

export default function UpdateUserTeam() {
  const { profile, reloadSession } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const joining = searchParams.get("joining") === "true";
  const teamName = searchParams.get("teamName") ?? null;
  const teamID = searchParams.get("teamID") ?? null;

  useEffect(() => {
    if (joining && profile?.team_id === teamID) return; // already on this team
    if (!joining && profile?.team_id === null) return; // already not on a team

    const joinOrLeave = async () => {
      if (!profile) return;

      try {
        const { error } = await supabase
          .from("profile")
          .update({ team_id: joining ? teamID : null })
          .eq("id", profile.id);

        if (error) throw error;

        await reloadSession();
        router.push(joining ? "/b4g/TeamDashboard" : "/b4g");
      } catch (error) {
        console.error("Failed to update team", error);
      }
    };

    joinOrLeave();
  }, [profile, teamID, joining]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">
        {joining ? "Joining" : "Leaving"} {teamName ?? "team"}...
      </h1>
    </div>
  );
}
