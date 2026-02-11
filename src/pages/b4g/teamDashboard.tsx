import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import type { TeamType } from "./types/TeamTypes";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";

export default function TeamDashboard() {
  const { profile } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<TeamType>();
  const [loading, setLoading] = useState<boolean>(true);

  function leaveTeam(teamName: string | null | undefined) {
    if (!teamName) {
      return;
    }
    router.push({
      pathname: "/b4g/UpdateUserTeam",
      query: { joining: "false", teamName: teamName },
    });
  }

  useEffect(() => {
    if (!profile?.team_id) {
      router.push("/b4g");
    }
  }, [profile]);

  // FIXME Some members are not loading properly
  async function loadTeam() {
    if (!profile?.team_id) return;
    try {
      const { data: team, error: teamError } = await supabase
        .from("team_summary")
        .select()
        .eq("team_id", profile.team_id)
        .maybeSingle();

      if (teamError) {
        throw teamError;
      }

      const { data: users, error: userError } = await supabase
        .from("profile")
        .select(
          `
            id,
            first_name,
            last_name,
            grad_year,
            team_id
          `,
        )
        .eq("team_id", profile.team_id);

      if (userError) {
        throw userError;
      }

      if (team) {
        setTeam({ ...team, members: users });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTeam();
  }, [profile, router, team]);

  // If user is team leader then allow them to kick others, edit team name, and transfer ownership

  return (
    <div className="flex flex-col gap-3 p-3">
      {loading ? (
        <h1 className="text-4xl">Loading Team...</h1>
      ) : (
        <>
          <div className="flex flex-row gap-5 text-left items-end justify-between w-[40vw]">
            <h1 className="text-5xl">{team?.team_name}</h1>
            <h2 className="text-3xl">
              Leader: {team?.leader_first_name} {team?.leader_last_name}
            </h2>
          </div>

          <h2 className="text-3xl">Member Count: {team?.member_count}</h2>
          <div className="flex flex-col gap-5">
            {team?.members?.map((member) => (
              <div className="border-2 p-3" key={member.id}>
                <p className="text-2xl">
                  {member.first_name} {member.last_name}
                </p>
                <p>Grad Year: {member.grad_year}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-red-600 w-30 h-10"
            onClick={() => {
              leaveTeam(team?.team_name);
            }}
          >
            Leave Team
          </button>
        </>
      )}
    </div>
  );
}
