import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/b4g/context/authContext";

export default function ResetPassword() {
  const router = useRouter();
  const { reloadSession } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingLink, setCheckingLink] = useState(true);
  const [linkInvalid, setLinkInvalid] = useState(false);

  useEffect(() => {
    const validateRecoveryLink = async () => {
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      if (hash.get("type") === "recovery") {
        sessionStorage.setItem("b4g_recovery_mode", "1");
        reloadSession();
      }
      const search = new URLSearchParams(window.location.search);

      const errorDescription =
        hash.get("error_description") || search.get("error_description");
      const errorCode = hash.get("error_code") || search.get("error_code");
      const errorValue = hash.get("error") || search.get("error");

      if (errorCode || errorValue || errorDescription) {
        const decodedDescription = errorDescription
          ? decodeURIComponent(errorDescription.replace(/\+/g, " "))
          : "This reset link is invalid or has expired.";
        setError(decodedDescription);
        setLinkInvalid(true);
        setCheckingLink(false);
        return;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setError(
          "This reset link is invalid or has expired. Please request a new one.",
        );
        setLinkInvalid(true);
      }

      setCheckingLink(false);
    };

    validateRecoveryLink();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (linkInvalid) {
      setError(
        "This reset link is invalid or has expired. Please request a new one.",
      );
      return;
    }

    // 🔒 Basic validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      sessionStorage.removeItem("b4g_recovery_mode");
      await supabase.auth.signOut();
      setTimeout(() => {
        router.push("/b4g/Auth");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 min-h-[70dvh]">
      <div className="w-full max-w-md flex flex-col gap-6 text-center">
        <h1 className="text-5xl font-semibold text-white">Set New Password</h1>

        {checkingLink ? (
          <p className="text-white/80 text-sm">Validating reset link...</p>
        ) : linkInvalid ? (
          <div className="flex flex-col gap-4 items-center">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="button"
              onClick={() => router.push("/b4g/ForgotPassword")}
              className="mt-2 px-6 py-3 rounded-full bg-[--pink] text-white font-semibold hover:scale-105 transition"
            >
              Request New Reset Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 px-5 rounded-2xl outline-none focus:border-[--pink] focus:border-[2.5px] bg-white/10"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 px-5 rounded-2xl outline-none focus:border-[--pink] focus:border-[2.5px] bg-white/10"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {success && (
              <p className="text-green-500 text-sm">
                Password updated successfully! Redirecting...
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 px-6 py-3 rounded-full bg-[--pink] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
