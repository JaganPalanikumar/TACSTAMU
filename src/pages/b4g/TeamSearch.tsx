import { useEffect, useState } from "react";
import TeamsTable from "./components/teams/teamTable";
import { supabase } from "@/utils/supabase";
import type { TeamMember, TeamType } from "./types/TeamTypes";

export default function TeamSearch() {
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);

  async function handleSubmit(searchTerm?: string) {
    const term = searchTerm ?? team ?? "";

    const { data: teams, error: teamError } = await supabase
      .from("team_summary")
      .select(
        `
        team_name,
        team_leader,
        leader_first_name,
        leader_last_name,
        member_count
      `,
      )
      .ilike("team_name", `%${term}%`);

    if (teamError) {
      throw teamError;
    }
    if (!teams || teams.length === 0) {
      setTeams([]);
      return;
    }

    const teamNames = teams.map((t) => t.team_name);

    const { data: users, error: userError } = await supabase
      .from("profile")
      .select(
        `
      id,
      first_name,
      last_name,
      grad_year,
      team_name
    `,
      )
      .in("team_name", teamNames);

    if (userError) {
      throw userError;
    }

    const usersByTeam: Record<string, TeamMember[]> = {};

    for (const user of users ?? []) {
      if (!user.team_name) continue;
      if (!usersByTeam[user.team_name]) {
        usersByTeam[user.team_name] = [];
      }

      usersByTeam[user.team_name].push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        grad_year: user.grad_year,
      });
    }

    // 4️⃣ Attach members to each team
    const teamsWithMembers = teams.map((team) => ({
      team_name: team.team_name,
      team_leader: team.team_leader,
      leader_first_name: team.leader_first_name,
      leader_last_name: team.leader_last_name,
      member_count: team.member_count,
      members: team.team_name ? usersByTeam[team.team_name] : [],
    }));
    setTeams(teamsWithMembers);
  }

  useEffect(() => {
    handleSubmit("");
  }, []);

  return (
    <div className="flex flex-col justify-center p-3 gap-4">
      <h1 className="text-4xl">Search Teams</h1>
      <div className="text-xl">
        <input
          id="teamSearch"
          type="text"
          placeholder="Search for a team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button onClick={() => handleSubmit(team)}>Search</button>
      </div>
      <TeamsTable teams={teams} />
    </div>
  );
}
