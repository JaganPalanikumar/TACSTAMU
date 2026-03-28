import { useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/router";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function CreateTeam() {
  const { profile, reloadSession } = useAuth();
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateTeam() {
    if (!profile?.id) return;
    if (!teamName.trim()) {
      setError("Team name cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.rpc("create_team", {
        p_team_name: teamName.trim(),
        p_max_members: maxMembers,
      });

      if (error) {
        if (error.code === "23505") {
          setError("A team with that name already exists. Try another name.");
        } else {
          throw error;
        }
        return;
      }

      await reloadSession();
      router.push("/b4g/TeamDashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 gap-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="p-4 rounded-full bg-[--container-background]">
          <GroupsRoundedIcon
            className="text-[--pink]"
            style={{ fontSize: "2.5rem" }}
          />
        </div>
        <h1 className="text-4xl font-semibold">Create a Team</h1>
        <p className="text-gray-400 text-sm max-w-xs">
          You'll be set as team leader. Invite others once your team is created.
        </p>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-5 w-full max-w-sm bg-[--container-background] rounded-2xl p-6">
        {/* Team Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleCreateTeam()}
            placeholder="e.g. Bit Bandits"
            maxLength={40}
            className="bg-transparent border-2 border-gray-600 focus:border-[--pink] outline-none rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors"
          />
          <span className="text-xs text-gray-600 text-right">
            {teamName.length}/40
          </span>
        </div>

        {/* Max Members */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Max Members</label>
          <div className="flex gap-2">
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setMaxMembers(n)}
                className={`flex-1 py-3 rounded-xl border-2 font-medium transition-colors ${
                  maxMembers === n
                    ? "border-[--pink] text-[--pink]"
                    : "border-gray-600 text-gray-400 hover:border-gray-400"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        {/* Submit */}
        <button
          onClick={handleCreateTeam}
          disabled={loading || !teamName.trim()}
          className="flex items-center justify-center gap-2 mt-2 w-full py-3 bg-[--pink] text-white font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
        >
          {loading ? (
            "Creating..."
          ) : (
            <>
              Create Team
              <ArrowForwardRoundedIcon fontSize="small" />
            </>
          )}
        </button>
      </div>

      {/* Back link */}
      <button
        onClick={() => router.back()}
        className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
      >
        ← Go back
      </button>
    </div>
  );
}
