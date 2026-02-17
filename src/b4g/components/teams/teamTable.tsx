import type { TeamType } from "../../types/TeamTypes";
import { Team } from "./team";

export const TeamsTable = ({ teams }: { teams: TeamType[] }) => {
  return (
    <table className="table-auto text-left border-collapse border-gray-300">
      <thead>
        <tr className="text-2xl">
          <th className="border-b border-gray-300 px-2">Team Name</th>
          <th className="border-b border-gray-300 px-2">Team Leader</th>
          <th className="border-b border-gray-300 px-2">Member Count</th>
          <th className="border-b border-gray-300 px-2">Members</th>
          <th className="border-b border-gray-300 px-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {teams.map((team) => (
          <Team key={team.team_name} team={team} />
        ))}
      </tbody>
    </table>
  );
};
