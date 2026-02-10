import type { TeamType } from "../../types/TeamTypes";
import { useRouter } from "next/router";

type TeamProps = {
  team: TeamType;
};

export function Team({ team }: TeamProps) {
  const router = useRouter();

  function onJoin(teamName: string) {
    router.push({
      pathname: "/b4g/UpdateUserTeam",
      query: { joining: "true", teamName: teamName },
    });
  }

  return (
    <tr>
      <td className="p-3 border-b border-gray-300">{team.team_name}</td>
      <td className="p-3 border-b border-gray-300">
        {team.leader_first_name} {team.leader_last_name}
      </td>
      <td className="p-3 border-b border-gray-300">{team.member_count}</td>
      <td className="p-3 border-b border-gray-300">
        {team.member_count > 0 ? (
          <ul className="flex flex-col">
            {team.members.map((member) => (
              <li key={member.userID}>
                {member.firstName} {member.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <em>No members</em>
        )}
      </td>
      <td className="p-3 border-b border-gray-300">
        <button
          onClick={() => onJoin(team.team_name)}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-105"
        >
          Join Team
        </button>
      </td>
    </tr>
  );
}
