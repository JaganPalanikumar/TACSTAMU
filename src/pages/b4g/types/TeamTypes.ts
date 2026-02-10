export interface TeamMember {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  gradYear: number;
}

export interface TeamType {
  teamID: number;
  teamName: string;
  leaderID: number;
  leaderFirstName: string;
  leaderLastName: string;
  memberCount: number;
  members: Array<TeamMember>;
}
