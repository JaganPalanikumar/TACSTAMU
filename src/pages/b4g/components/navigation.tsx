import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/authContext";

export function Navigation() {
  const { profile } = useAuth();
  return (
    <nav className="flex w-full items-center justify-between p-3 border-b">
      <Link className="group" href="/b4g">
        <Image
          src="/b4g/short logo.svg"
          width={373.47}
          height={228.67}
          alt=""
          className="inline-block h-14 w-auto group-hover:hidden"
        />
        <Image
          src="/b4g/long logo.svg"
          width={1072.48}
          height={229.37}
          alt=""
          className="hidden h-14 w-auto group-hover:inline-block"
        />
      </Link>

      <div className="flex flex-row gap-2 text-2xl">
        <Link
          className="p-2 hover:scale-110 hover:text-[--blue]"
          href="/b4g/Dashboard"
        >
          Dashboard
        </Link>
        {profile?.team_id ? (
          <Link
            className="p-2 hover:scale-110 hover:text-[--blue]"
            href="/b4g/TeamDashboard"
          >
            Team
          </Link>
        ) : (
          <Link
            className="p-2 hover:scale-110 hover:text-[--blue]"
            href="/b4g/TeamSearch"
          >
            Team Search
          </Link>
        )}
        <Link
          className="p-2 hover:scale-110 hover:text-[--blue]"
          href="/b4g/FAQ"
        >
          FAQ
        </Link>
        {profile?.id ? (
          <Link
            href="/b4g/User"
            className="p-2 hover:scale-110 hover:text-[--blue]"
          >
            {profile.first_name}
          </Link>
        ) : (
          <Link
            href="/b4g/Auth"
            className="p-2 hover:scale-110 hover:text-[--blue]"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
