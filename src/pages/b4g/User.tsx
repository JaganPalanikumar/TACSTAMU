import { useEffect } from "react";
import { useAuth } from "./context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function User() {
  const { profile, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!profile) {
      router.push("/b4g");
    }
  });
  // TODO Make it so that user can edit this page
  return (
    <div className="flex flex-col gap-3 p-3">
      <h1>
        Hello {profile?.first_name} {profile?.last_name}
      </h1>
      <Link href="/b4g/EditUser" className="bg-blue-600 p-2 w-30">
        Edit User
      </Link>
      <button onClick={logout} className="bg-red-600 w-30 h-10">
        Log Out
      </button>
    </div>
  );
}
