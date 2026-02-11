import { useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!profile) {
      router.push("/b4g");
    }
  }, []);

  // TODO Flush out this page
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1>Welcome, {profile?.first_name}!</h1>
    </div>
  );
}
