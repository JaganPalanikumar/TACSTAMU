// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
import { AuthError, User } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | AuthError | null>,
) {
  const { data, error } = await supabase.auth.getUser(req.body);

  const user = data.user;

  if(error) {
    return res.status(error.status ?? 500).json(error);
  }
  if(!user){
    return res.status(404).json(null);
  }
  res.status(200).json(user);
}
