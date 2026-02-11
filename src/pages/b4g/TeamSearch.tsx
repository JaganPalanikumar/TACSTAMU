import { useEffect, useState } from "react";
import TeamsTable from "./components/teams/teamTable";
import { supabase } from "@/utils/supabase";
import type { TeamMember, TeamType } from "./types/TeamTypes";
import Link from "next/link";

export default function TeamSearch() {
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);

  // FIXME Some members are not loading properly
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
          member_count,
          profile (
            id,
            first_name,
            last_name,
            grad_year
          )
        `,
        )
        .ilike("team_name", `%${term}%`);

      if (error) {
        throw error;
      }

      if (!data) {
        setTeams([]);
        return;
      }

      const formattedTeams = data.map((team) => ({
        team_id: team.team_id,
        team_name: team.team_name,
        team_leader: team.team_leader,
        leader_first_name: team.leader_first_name,
        leader_last_name: team.leader_last_name,
        member_count: team.member_count,
        members: team.profile ?? [],
      }));

      setTeams(formattedTeams);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    handleSubmit("");
  }, []);

  return (
    <div className="flex flex-col justify-center p-3 gap-4">
      <div className="flex gap-5">
        <h1 className="text-4xl">Search Teams</h1>
        <Link className="m-0" href="/b4g/CreateTeam">
          Create Team
        </Link>
      </div>

      <form className="text-xl flex gap-3" onSubmit={() => handleSubmit(team)}>
        <input
          id="teamSearch"
          type="text"
          placeholder="Search for a team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <TeamsTable teams={teams} />
    </div>
  );
}
