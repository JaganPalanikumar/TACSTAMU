export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  grad_year: number;
}

export interface TeamType {
  team_id: string | null;
  leader_first_name: string | null;
  leader_last_name: string | null;
  member_count: number | null;
  team_leader: string | null;
  team_name: string | null;
  members: TeamMember[] | null
}

