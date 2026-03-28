import { useEffect, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { AccessAlarmRounded, LocationOnRounded } from "@mui/icons-material";
import QRCode from "react-qr-code";

export default function Dashboard() {
  const { user, profile, isLoading, reloadSession } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!isLoading && !profile) {
      router.push("/b4g");
    }
  }, [isLoading, profile, router]);

  async function changeParticipation() {
    if (!profile || updating) return;
    setUpdating(true);
    setError(null);

    try {
      const { error: postError } = await supabase.rpc("toggle_participation");
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

  const dietList = (() => {
    const d = profile?.diet_restrictions;
    if (!d) return "None";
    const arr = Array.isArray(d) ? d : JSON.parse(d as string);
    return arr.join(", ") || "None";
  })();

  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* ================= HEADER ================= */}
        <div className="text-center text-white flex flex-col gap-3">
          <h1 className="text-6xl font-semibold">
            Welcome, {profile?.first_name}!
          </h1>
          <p className="text-xl text-[--gray]">B4G2026 Dashboard</p>
        </div>

        {/* ================= REGISTRATION STATUS ================= */}
        <div className="p-12 flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold text-[--pink]">
            {profile?.participating
              ? "You're Registered 🎉"
              : "You are not participating 😔"}
          </h2>

          <p className="text-lg text-[--gray]">
            We’re excited to see you at B4G2026!
          </p>

          <div className="flex justify-center">
            {profile?.participating ? (
              <span className="px-6 py-2 rounded-full bg-green-100 text-green-600 font-medium">
                Registration Confirmed
              </span>
            ) : (
              <span className="px-6 py-2 rounded-full bg-red-100 text-red-600 font-medium">
                Confirm your registration below
              </span>
            )}
          </div>

          <div className="flex justify-center gap-10 text-[--pink] text-lg pt-4">
            <div className="flex gap-1">
              <CalendarMonthRoundedIcon className="my-auto" />{" "}
              <p>March 28–29, 2026</p>
            </div>
            <div className="flex gap-1 hover:scale-105 duration-300">
              <LocationOnRounded className="my-auto" />{" "}
              <a
                href="https://maps.app.goo.gl/cinzFi6V5J7yagip9"
                className="underline my-auto"
              >
                Innovative Learning Classroom Building (ILCB)
              </a>
            </div>
            <div className="flex gap-1">
              <AccessAlarmRounded className="my-auto" />{" "}
              <p className="my-auto">Check-in: 9:00 AM</p>
            </div>
          </div>
        </div>

        {/* ================= PROFILE SUMMARY ================= */}
        <div className="p-12 flex flex-col gap-8 text-[--gray]">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold text-[--pink]">
              Profile Information
            </h2>

            <Link
              href="/b4g/EditUser"
              className="px-6 py-2 rounded-full border border-[--pink] text-[--pink] hover:bg-[--pink]/10 transition"
            >
              Edit Profile
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div>
              <span className="font-medium">Email:</span> {user?.email}
            </div>
            <div>
              <span className="font-medium">Graduation Year:</span>{" "}
              {profile?.grad_year}
            </div>
            <div>
              <span className="font-medium">Shirt Size:</span>{" "}
              {profile?.shirt_size}
            </div>
            <div>
              <span className="font-medium">Dietary Restrictions:</span>{" "}
              {dietList}
            </div>
          </div>
        </div>

        {/* ================= EVENT INFO ================= */}
        <div className="p-12 flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold text-[--pink]">
            Event Information
          </h2>

          <div className="flex flex-col gap-3 text-lg text-[--gray]">
            <p>
              <span className="text-white">💬</span> Join our Discord for
              updates
            </p>
            <p>
              <span className="text-white">🍕</span> Meals and snacks provided
            </p>
            <p>
              <span className="text-white">🎒</span> Bring your laptop & charger
            </p>
            <p>
              <span className="text-white">🏆</span> Prizes for top teams
            </p>
          </div>

          <Link
            href="/b4g#Schedule"
            className="mx-auto mt-4 px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 transition"
          >
            View Full Schedule
          </Link>
        </div>

        {/* ================= Check in QRCode ================= */}
        {profile && (
          <div className="p-12 flex flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold text-[--pink]">
              {profile.checked_in ? "Food" : "Check in QR code"}
            </h2>
            <p className="text-lg text-[--gray]">
              Show this to an officer to get checked in, get food, and get a
              t-shirt
            </p>
            <QRCode
              value={profile?.id}
              className="mx-auto p-6 bg-[--container-background] rounded-xl w-full aspect-square"
            />
          </div>
        )}

        {/* ================= CANCEL REGISTRATION ================= */}
        <div className="p-12 flex flex-col gap-6 text-center">
          <h2
            className={`text-3xl font-semibold ${
              profile?.participating ? "text-red-500" : "text-green-600"
            }`}
          >
            {profile?.participating
              ? "Cancel Registration"
              : "Confirm Participation"}
          </h2>

          <p className="text-gray-600 text-lg">
            {profile?.participating
              ? "If you can no longer attend B4G2026, you may cancel your registration below."
              : "If you previously cancelled but can now attend, you may confirm your participation again."}
          </p>

          <button
            disabled={updating}
            onClick={() => {
              const confirmed = confirm(
                profile?.participating
                  ? "Are you sure you want to cancel your registration for B4G2026?"
                  : "Are you sure you want to confirm your participation for B4G2026?",
              );
              if (confirmed) changeParticipation();
            }}
            className={`mx-auto px-8 py-3 rounded-full transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
      ${
        profile?.participating
          ? "border border-red-400 text-red-500 hover:bg-red-50"
          : "bg-green-500 text-white hover:bg-green-600"
      }
    `}
          >
            {updating
              ? profile?.participating
                ? "Cancelling..."
                : "Confirming..."
              : profile?.participating
                ? "Cancel Registration"
                : "Confirm Participation"}
          </button>
        </div>
      </div>
    </div>
  );
}
