import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

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
      setTimeout(() => {
        router.push("/b4g/Auth");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 min-h-[70dvh]">
      <div className="w-full max-w-md flex flex-col gap-6 text-center">
        <h1 className="text-5xl font-semibold text-white">Set New Password</h1>

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
      </div>
    </div>
  );
}
