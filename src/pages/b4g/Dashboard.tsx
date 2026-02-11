import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

export default function Dashboard() {
  const { profile, isLoading, reloadSession } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!profile) {
      router.push("/b4g");
    }
  }, [isLoading, profile, router]);

  async function changeParticipation() {
    if (!profile || updating) return;
    setUpdating(true);
    setError(null);

    try {
      const { error: postError } = await supabase
        .from("profile")
        .update({ participating: !profile.participating })
        .eq("id", profile.id);
      if (postError) throw postError;
      reloadSession();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setUpdating(false);
    }
  }

  // TODO Flush out this page
  return (
    <div className="flex flex-col gap-3 p-3 content-center justify-center text-center">
      <div className="flex flex-col gap-7 content-center justify-center">
        <h1 className="text-5xl w-fit m-auto">
          Welcome, {profile?.first_name}!
        </h1>
        <h2 className="text-3xl w-fit m-auto">
          You are{" "}
          {profile?.participating
            ? "participating in B4G2026!"
            : "not participating in B4G2026!"}
        </h2>
        <button
          className="border border-solid border-white rounded-full p-3 w-fit m-auto hover:scale-110 hover:text-[--blue] hover:border-[--blue]"
          disabled={updating}
          onClick={changeParticipation}
        >
          {!profile?.participating ? "Participate" : "Cancel Participation"}
        </button>
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
}
