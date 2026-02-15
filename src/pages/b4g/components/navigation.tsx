import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/authContext";

export function Navigation() {
  const { profile } = useAuth();
  return (
    <nav className="flex w-full items-center justify-between p-3 text-[--gray] rounded-full z-50">
      <div className="flex w-full items-center justify-between p-3 px-6 rounded-full bg-white text-center">
        <Link className="group" href="/b4g">
          <Image
            src="/b4g/bordered short logo.svg"
            width={373.47}
            height={228.67}
            alt=""
            className="inline-block h-14 w-auto lg:hidden group-hover:scale-110"
          />
          <Image
            src="/b4g/bordered long logo.svg"
            width={1072.48}
            height={229.37}
            alt=""
            className="hidden h-14 w-auto lg:inline-block group-hover:scale-110"
          />
        </Link>

        <div className="flex flex-row gap-3 text-2xl max-w-[70dvw]">
          <Link className="p-2 hover:scale-110 my-auto" href="/b4g/Dashboard">
            Dashboard
          </Link>
          <Link className="p-2 hover:scale-110 my-auto" href="/b4g/Tracks">
            Tracks
          </Link>
          {/* {profile?.team_id ? (
          <Link
            className="p-2 hover:scale-110 "
            href="/b4g/TeamDashboard"
          >
            Team
          </Link>
        ) : (
          <Link
            className="p-2 hover:scale-110 "
            href="/b4g/TeamSearch"
          >
            Team Search
          </Link>
        )} */}
          <Link className="p-2 hover:scale-110 my-auto" href="/b4g/FAQ">
            FAQ
          </Link>
          <Link
            className="flex gap-5 p-2 px-5 hover:scale-110 border-[--pink] text-[--pink] border-4 rounded-full my-auto"
            href="/b4g/FAQ"
          >
            <svg
              fill="#D594DC"
              strokeWidth="0"
              viewBox="0 0 640 512"
              height="2rem"
              width="2rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"></path>
            </svg>
            <h1 className="w-fit whitespace-nowrap">Join our Discord</h1>
          </Link>
          {profile?.id ? (
            <Link
              href="/b4g/User"
              className="p-2 px-5 hover:scale-110 bg-[--pink] text-white rounded-full my-auto min-w-0 truncate"
            >
              {profile.first_name}
            </Link>
          ) : (
            <Link
              href="/b4g/Auth"
              className="p-2 px-5 hover:scale-110 bg-[--pink] text-white rounded-full my-auto"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
