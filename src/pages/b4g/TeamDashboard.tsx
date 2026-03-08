import { useEffect, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import type { TeamType } from "@/b4g/types/TeamTypes";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Link from "next/link";

export default function TeamDashboard() {
  const { profile, isLoading, reloadSession } = useAuth();
  const router = useRouter();
  const [team, setTeam] = useState<TeamType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [kickingId, setKickingId] = useState<string | null>(null);

  // Edit state
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editMaxMembers, setEditMaxMembers] = useState<number>(4);
  const [editError, setEditError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function leaveTeam(teamName: string | null | undefined) {
    if (!teamName) return;
    router.push({
      pathname: "/b4g/UpdateUserTeam",
      query: { joining: "false", teamName: teamName },
    });
  }

  function startEditing() {
    setEditName(team?.team_name ?? "");
    setEditMaxMembers(team?.max_members ?? 4);
    setEditError(null);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setEditError(null);
  }

  async function saveTeamEdits() {
    if (!profile?.team_id) return;
    if (!editName.trim()) {
      setEditError("Team name cannot be empty.");
      return;
    }
    const currentMemberCount = team?.members?.length ?? 0;
    if (editMaxMembers < currentMemberCount) {
      setEditError(
        `Max members can't be less than current member count (${currentMemberCount}).`,
      );
      return;
    }

    setSaving(true);
    setEditError(null);
    try {
      const { error } = await supabase
        .from("team")
        .update({
          team_name: editName.trim(),
          max_members: editMaxMembers,
        })
        .eq("team_id", profile.team_id)
        .eq("team_leader", profile.id);

      if (error) {
        if (error.code === "23505") {
          setEditError("A team with that name already exists.");
        } else {
          throw error;
        }
        return;
      }

      setEditing(false);
      await loadTeam();
    } catch (error) {
      console.log(error);
      setEditError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function transferLeadership(memberId: string) {
    if (!profile?.team_id) return;
    try {
      const { error } = await supabase
        .from("team")
        .update({ team_leader: memberId })
        .eq("team_id", profile.team_id)
        .eq("team_leader", profile.id);

      if (error) throw error;
      await reloadSession();
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
    if (isLoading) return;
    if (!profile?.team_id) router.push("/b4g");
  }, [profile, isLoading]);

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
          `id, first_name, last_name, grad_year, team_id, first_hackathon`,
        )
        .eq("team_id", profile.team_id);

      if (userError) throw userError;

      const { data: emails } = await supabase.rpc("get_team_emails", {
        p_team_id: profile.team_id,
      });

      const membersWithEmail = users.map((u) => ({
        ...u,
        email:
          emails?.find((e: { id: string; email: string }) => e.id === u.id)
            ?.email ?? "?",
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
  }, [profile]);

  const isLeader = team?.team_leader === profile?.id;

  return (
    <div className="flex flex-col px-6 py-20 gap-3 max-w-5xl mx-auto">
      {loading ? (
        <h1 className="text-4xl mx-auto">Loading Team...</h1>
      ) : (
        <>
          {/* Team Header */}
          <div className="flex flex-col gap-3 mb-10 mx-auto w-full max-w-sm">
            <h1 className="text-2xl mx-auto">Your Team</h1>

            {editing ? (
              <div className="flex flex-col gap-3 bg-[--container-background] p-5 rounded-3xl">
                {/* Team Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Team Name</label>
                  <input
                    type="text"
                    value={editName}
                    maxLength={40}
                    onChange={(e) => {
                      setEditName(e.target.value);
                      setEditError(null);
                    }}
                    className="bg-transparent border-2 border-gray-600 focus:border-[--pink] outline-none rounded-xl px-4 py-2 text-white transition-colors"
                  />
                </div>

                {/* Max Members */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-gray-400">Max Members</label>
                  <div className="flex gap-2">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setEditMaxMembers(n)}
                        className={`flex-1 py-2 rounded-xl border-2 font-medium transition-colors ${
                          editMaxMembers === n
                            ? "border-[--pink] text-[--pink]"
                            : "border-gray-600 text-gray-400 hover:border-gray-400"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {editError && (
                  <p className="text-red-400 text-sm">{editError}</p>
                )}

                {/* Save / Cancel */}
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={cancelEditing}
                    className="flex-1 flex items-center justify-center gap-1 border-2 border-gray-600 text-gray-400 py-2 rounded-full hover:scale-105 duration-300"
                  >
                    <CloseRoundedIcon fontSize="small" />
                    Cancel
                  </button>
                  <button
                    onClick={saveTeamEdits}
                    disabled={saving}
                    className="flex-1 flex items-center justify-center gap-1 bg-[--pink] text-white py-2 rounded-full hover:scale-105 duration-300 disabled:opacity-50"
                  >
                    <CheckRoundedIcon fontSize="small" />
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 mx-auto">
                <h1 className="text-5xl font-semibold text-[--pink]">
                  {team?.team_name}
                </h1>
                {isLeader && (
                  <button
                    onClick={startEditing}
                    className="text-gray-400 hover:text-[--pink] hover:scale-110 duration-300"
                  >
                    <EditRoundedIcon />
                  </button>
                )}
              </div>
            )}

            {!editing && (
              <p className="text-gray-400 text-sm mx-auto">
                {team?.members?.length ?? 0} / {team?.max_members ?? 4} members
              </p>
            )}
          </div>

          {/* Members */}
          <h2 className="text-3xl">Team Members</h2>
          <div className="gap-3 grid grid-flow-row lg:grid-cols-2">
            {team?.members?.map((member) => (
              <div
                className="flex flex-col p-5 gap-3 rounded-3xl bg-[--container-background]"
                key={member.id}
              >
                <h2 className="text-2xl text-[--pink] font-medium">
                  {member.first_name} {member.last_name}{" "}
                  {profile?.id == member.id ? "(You)" : ""}
                  {team.team_leader == member.id ? " 👑" : ""}
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
                    className="text-[--pink] hover:scale-105 duration-300 w-fit ml-auto border-2 px-4 py-2 border-[--pink] rounded-full"
                  >
                    Edit Profile
                  </Link>
                ) : isLeader ? (
                  <div className="flex gap-3 ml-auto">
                    <button
                      className="text-blue-400 hover:scale-105 duration-300 w-fit border-2 px-4 py-2 border-blue-400 rounded-full disabled:opacity-50"
                      onClick={() => transferLeadership(member.id)}
                    >
                      Make Leader
                    </button>
                    <button
                      className="text-red-400 hover:scale-105 duration-300 w-fit ml-auto border-2 px-4 py-2 border-red-400 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => kickMember(member.id)}
                      disabled={kickingId === member.id}
                    >
                      {kickingId === member.id ? "Kicking..." : "Kick Member"}
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Leave Team */}
          {profile?.team_id == team?.team_id && (
            <button
              className="w-fit p-3 hover:scale-105 duration-300 bg-red-400 rounded-full mt-10 mx-auto flex gap-1"
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
