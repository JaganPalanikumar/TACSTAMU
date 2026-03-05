import { useEffect, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import type { TeamType } from "@/b4g/types/TeamTypes";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Link from "next/link";

export default function TeamDashboard() {
  const { profile, user } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<TeamType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [kickingId, setKickingId] = useState<string | null>(null);

  function leaveTeam(teamName: string | null | undefined) {
    if (!teamName) return;
    router.push({
      pathname: "/b4g/UpdateUserTeam",
      query: { joining: "false", teamName: teamName },
    });
  }

  async function transferLeadership(memberId: string) {
    if (!profile?.team_id) return;
    try {
      const { error } = await supabase
        .from("team")
        .update({ team_leader: memberId })
        .eq("team_id", profile.team_id)
        .eq("team_leader", profile.id); // only current leader can do this

      if (error) throw error;
      await loadTeam();
    } catch (error) {
      console.log(error);
    }
  }

  async function kickMember(memberId: string) {
    if (!profile?.team_id) return;
    setKickingId(memberId);
    try {
      const { error } = await supabase
        .from("profile")
        .update({ team_id: null })
        .eq("id", memberId)
        .eq("team_id", profile.team_id);

      if (error) throw error;
      await loadTeam();
    } catch (error) {
      console.log(error);
    } finally {
      setKickingId(null);
    }
  }

  useEffect(() => {
    if (profile && !profile.team_id) {
      router.push("/b4g");
    }
  }, [profile, user]);

  async function loadTeam() {
    if (!profile?.team_id) return;
    try {
      const { data: team, error: teamError } = await supabase
        .from("team_summary")
        .select()
        .eq("team_id", profile.team_id)
        .maybeSingle();

      if (teamError) throw teamError;

      const { data: users, error: userError } = await supabase
        .from("profile")
        .select(
          `
            id,
            first_name,
            last_name,
            grad_year,
            team_id,
            first_hackathon
          `,
        )
        .eq("team_id", profile.team_id);

      if (userError) throw userError;

      const { data: emails } = await supabase.rpc("get_team_emails", {
        p_team_id: profile.team_id,
      });

      // merge into members
      const membersWithEmail = users.map((u) => ({
        ...u,
        email: emails?.find((e) => e.id === u.id)?.email ?? "?",
      }));

      if (team) {
        setTeam({ ...team, members: membersWithEmail });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadTeam();
  }, [profile, router]);

  return (
    <div className="flex flex-col gap-3 p-3">
      {loading ? (
        <h1 className="text-4xl">Loading Team...</h1>
      ) : (
        <>
          <div className="flex flex-col gap-5 text-left items-end justify-between w-fit mb-10 mx-auto">
            <h1 className="text-2xl mx-auto">Your Team</h1>
            <h1 className="text-5xl mx-auto font-semibold text-[--pink]">
              {team?.team_name}
            </h1>
          </div>

          <h2 className="text-3xl">Team Members</h2>
          <div className="gap-3 grid grid-flow-row lg:grid-cols-2">
            {team?.members?.map((member) => (
              <div
                className="flex flex-col p-3 gap-3 rounded-2xl bg-[--container-background]"
                key={member.id}
              >
                <h2 className="text-2xl text-[--pink] font-medium">
                  {member.first_name} {member.last_name}{" "}
                  {profile?.id == member.id ? "(You)" : ""}
                </h2>
                <div className="flex flex-row justify-between max-w-[300px]">
                  <div className="flex flex-col gap-2">
                    <p>Name</p>
                    <p>Contact</p>
                    <p>Graduating Class</p>
                    <p>First Time Hacking</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>
                      {member.first_name} {member.last_name}
                    </p>
                    <p>{member.email}</p>
                    <p>{member.grad_year}</p>
                    <p>{member.first_hackathon ? "True" : "False"}</p>
                  </div>
                </div>
                {profile?.id == member.id ? (
                  <Link
                    href={"/b4g/EditUser"}
                    className="text-[--pink] w-fit ml-auto border-4 px-4 py-2 border-[--pink] rounded-full"
                  >
                    Edit Profile
                  </Link>
                ) : team.team_leader == profile?.id ? (
                  <div className="flex gap-2 ml-auto">
                    <button
                      className="text-blue-400 w-fit border-4 px-4 py-2 border-blue-400 rounded-full disabled:opacity-50"
                      onClick={() => transferLeadership(member.id)}
                    >
                      Make Leader
                    </button>
                    <button
                      className="text-red-400 w-fit ml-auto border-4 px-4 py-2 border-red-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => kickMember(member.id)}
                      disabled={kickingId === member.id}
                    >
                      {kickingId === member.id ? "Kicking..." : "Kick Member"}
                    </button>
                  </div>
                ) : (
                  <h1></h1>
                )}
              </div>
            ))}
          </div>
          {profile?.team_id == team?.team_id && (
            <button
              className="w-fit p-3 bg-red-400 rounded-full mx-auto flex gap-1"
              onClick={() => leaveTeam(team?.team_name)}
            >
              <LogoutRoundedIcon />
              Leave Team
            </button>
          )}
        </>
      )}
    </div>
  );
}
