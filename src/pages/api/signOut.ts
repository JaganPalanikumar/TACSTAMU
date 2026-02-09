import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
import { AuthError } from "@supabase/supabase-js";

// Sign out user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | AuthError | null>,
) {

  if (req.method !== "POST") {
    res.status(405).send("This endpoint only supports POST requests.");
  }
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out user: ", error.message);

    return res.status(error.status ?? 500).json(error);
  }

  res.status(200).json("Signed out successfully");
}
