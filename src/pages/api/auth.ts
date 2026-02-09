import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";
import type { User } from "@supabase/supabase-js";

// Sign in user
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | {error:string} | null>,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: "This endpoint only supports POST requests" });
  }

  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
      return res.status(error.status ?? 401).json({ error: error.message });
    }

    if (!data.user) {
      return res.status(401).json({ error: "User not found" });
    }

    return res.status(200).json(data.user);
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
