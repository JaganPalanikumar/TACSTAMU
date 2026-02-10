import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useEffect } from "react";

export function UpdateUserTeam() {
  interface LocationState {
    joining: boolean;
    teamID: number;
    teamName: string;
  }

  const location = useLocation();
  const { user } = useAuth();
  const state = location.state as LocationState;
  const teamID = state?.teamID;
  const joining = state?.joining;

  // FIXME When team leader leaves either delete team or give team leader to another user
  useEffect(() => {
    const join = async () => {
      try {
        await axios.patch("/updateTeam", { userID: user?.id, teamID: teamID });
        // Update local context if necessary
        if (user) {
          user.teamID = teamID;
        }

        // Force full page reload to the new path
        if (teamID) {
          window.location.href = "/team";
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to update team", error);
      }
    };

    join();
  }, [user]);

  return (
    <div>
      <h1>
        {joining ? "Joining" : "Leaving"} {state?.teamName}...
      </h1>
    </div>
  );
}
