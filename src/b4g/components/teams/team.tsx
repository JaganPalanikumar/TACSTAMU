import type { TeamType } from "../../types/TeamTypes";
import { useRouter } from "next/router";

type TeamProps = {
  team: TeamType;
};

export function Team({ team }: TeamProps) {
  const router = useRouter();

  function onJoin(teamName: string | null, teamID: string | null) {
    if (!teamName) return;
    router.push({
      pathname: "/b4g/UpdateUserTeam",
      query: { joining: true, teamName: teamName, teamID: teamID },
    });
  }

  if (!team.max_members || !team.member_count) return;

  return (
    <div className="flex flex-col justify-between bg-[--container-background] rounded-3xl p-6">
      <div>
        <h1 className="text-[--pink] text-2xl font-semibold">
          {team.team_name}
        </h1>

        <div className="flex flex-row justify-between w-fill max-w-[250px]">
          <div className="w-fit">
            <h2>Team Leader</h2>
            <p>Members</p>
          </div>
          <div className="w-fit text-[--gray]">
            <h2>{team.leader_first_name + " " + team.leader_last_name}</h2>
            <p>
              {team.member_count} out of {team.max_members}{" "}
              {team.max_members <= team.member_count && "(Full)"}
            </p>
          </div>
        </div>
      </div>

      <button
        className="ml-auto border-4 border-30 border-[--pink] rounded-full px-6 py-3 text-[--pink] disabled:border-[--gray] disabled:text-[--gray]"
        onClick={() => {
          onJoin(team.team_name, team.team_id);
        }}
        disabled={team.max_members <= team.member_count}
      >
        Join Team
      </button>
    </div>
  );
}
