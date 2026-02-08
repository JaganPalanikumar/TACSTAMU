// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

type Team = {
  max_members: number;
  team_leader: string;
  team_name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team | String>,
) {
  const { data: teams, error } = await supabase.from("Team").select();

  if (error) {
    console.error("Error fetching data: ", error.message);
    throw error;
  }

  res.status(200).json(teams[0] as Team);
}
