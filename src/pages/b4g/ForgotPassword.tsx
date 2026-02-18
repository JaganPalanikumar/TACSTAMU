import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { div } from "framer-motion/client";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/b4g/ResetPassword`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col max-w-lg w-full px-6 mx-auto gap-6">
      <h1 className="text-4xl font-semibold text-white">
        Forgot Your Password
      </h1>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-5 rounded-2xl outline-none focus:border-[--pink] focus:border-[2.5px] bg-white/10"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-3 rounded-full bg-[--pink] text-white font-semibold hover:scale-105 transition disabled:opacity-50"
        >
          Send Reset Email
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">
            Check your email for a reset link.
          </p>
        )}
      </form>
    </div>
  );
}
