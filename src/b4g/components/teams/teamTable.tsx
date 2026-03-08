import type { TeamType } from "../../types/TeamTypes";
import { Team } from "./team";

export const TeamsTable = ({ teams }: { teams: TeamType[] }) => {
  return (
    <div className="text-xl grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
      {teams.map((team) => (
        <Team key={team.team_name} team={team} />
      ))}
    </div>
  );
};
