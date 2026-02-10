import { useEffect, useState } from "react";
import TeamsTable from "./components/teams/teamTable";
import type { TeamType } from "./types/TeamTypes";

export function TeamSearch() {
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);

  async function handleSubmit(searchTerm?: string) {
    const query = searchTerm ?? team ?? "";
    const res = await axios.get("/teamSearch", { params: { team: query } });
    setTeams(res.data.teams);
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
