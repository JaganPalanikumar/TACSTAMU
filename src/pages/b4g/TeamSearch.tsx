import { useEffect, useState } from "react";
import { TeamsTable } from "@/b4g/components/teams/teamTable";
import { supabase } from "@/utils/supabase";
import type { TeamType } from "@/b4g/types/TeamTypes";
import Link from "next/link";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export default function TeamSearch() {
  const { profile, isLoading } = useAuth();
  const [team, setTeam] = useState<string>("");
  const [teams, setTeams] = useState<TeamType[]>([]);
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);

  // filter teams that still have space
  const filteredTeams = filterOpen
    ? teams.filter((t) => (t.member_count ?? 0) < (t.max_members ?? 4))
    : teams;

  async function handleSubmit(searchTerm?: string) {
    const term = searchTerm ?? team ?? "";

    try {
      const { data, error } = await supabase.rpc("search_teams", {
        search_term: term,
      });

      if (error) throw error;

      const formattedTeams = (data ?? []).map((team) => ({
        ...team,
        members: [],
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
    <div className="flex flex-col justify-center gap-4 max-w-5xl mx-auto py-20 px-6">
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
          className="bg-transparent px-4 flex-1 w-full min-w-0 outline-none"
          value={team}
          onChange={(e) => {
            setTeam(e.target.value);
            handleSubmit(e.target.value); // ← search on every keystroke
          }}
        />
        <button
          className="bg-[--pink] p-3 rounded-full flex gap-1 hover:scale-105 font-semibold"
          type="submit"
        >
          <SearchRoundedIcon className="my-auto" />
        </button>
      </form>
      <div className="flex">
        <h2 className="text-3xl my-auto">Results</h2>
        <div className="flex-grow justify-end flex flex-row gap-5 w-fit">
          <h2 className="text-3xl my-auto">Filter by</h2>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className={`flex flex-row gap-3 px-6 py-4 rounded-2xl duration-300 hover:scale-105 transition-transform text-white text-xl ${
              filterOpen ? "outline outline-2 outline-[--pink]" : ""
            }`}
          >
            <span className="my-auto">Needs Members</span>
            <div
              className={`border-[--gray] border-2 rounded-xl aspect-square ${filterOpen && "border-transparent bg-[--pink]"}`}
            >
              {<CheckRoundedIcon className={`${!filterOpen && "invisible"}`} />}
            </div>
          </button>
        </div>
      </div>

      {filteredTeams.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          <p className="text-3xl font-semibold text-center">No Results</p>
        </div>
      ) : (
        <TeamsTable teams={filteredTeams} />
      )}
    </div>
  );
}
