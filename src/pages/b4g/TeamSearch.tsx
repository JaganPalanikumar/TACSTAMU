import { useEffect, useState } from "react";
import { TeamsTable } from "@/b4g/components/teams/teamTable";
import { supabase } from "@/utils/supabase";
import type { TeamType } from "@/b4g/types/TeamTypes";
import Link from "next/link";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

export default function TeamSearch() {
  const { profile, isLoading } = useAuth();
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);
  const router = useRouter();

  async function handleSubmit(searchTerm?: string) {
    const term = searchTerm ?? team ?? "";

    try {
      const { data, error } = await supabase
        .from("team_summary")
        .select(
          `
    team_id,
    team_name,
    team_leader,
    leader_first_name,
    leader_last_name,
    member_count
  `,
        )
        .ilike("team_name", `%${term}%`)
        .limit(20);

      if (error) {
        throw error;
      }

      if (!data) {
        setTeams([]);
        return;
      }

      const formattedTeams = data.map((team) => ({
        ...team,
        members: [], // load lazily if TeamsTable needs to expand a row
      }));

      setTeams(formattedTeams);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isLoading) return;
    if (!profile?.first_name) {
      router.push("/b4g");
    }
    if (profile?.team_id) {
      router.push("/b4g/TeamDashboard");
    }
  }, [profile, isLoading]);

  useEffect(() => {
    handleSubmit("");
  }, []);

  return (
    <div className="flex flex-col justify-center gap-4 py-20 px-6">
      <div className="flex flex-col gap-5 mx-auto">
        <h1 className="text-6xl font-semibold mx-auto">Team Search</h1>
        <Link
          className="mx-auto flex items-center gap-2 border-4 border-[--pink] text-[--pink] font-semibold px-6 py-2 rounded-full hover:scale-105 transition-transform"
          href="/b4g/CreateTeam"
        >
          <GroupsRoundedIcon fontSize="small" />
          Create Team
        </Link>
      </div>

      <form
        className="text-xl flex gap-3 bg-[--container-background] rounded-full p-3 justify-between  "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(team);
        }}
      >
        <input
          id="teamSearch"
          type="text"
          placeholder="Search for a team"
          className="bg-transparent px-4"
          value={team}
          onChange={(e) => {
            setTeam(e.target.value);
            if (e.target.value === "") handleSubmit("");
          }}
        />
        <button
          className="bg-[--pink] p-3 rounded-full flex gap-1 hover:scale-105 font-semibold"
          type="submit"
        >
          <SearchRoundedIcon className="my-auto" />
          <span className="my-auto">Search</span>
        </button>
      </form>
      <TeamsTable teams={teams} />
    </div>
  );
}
