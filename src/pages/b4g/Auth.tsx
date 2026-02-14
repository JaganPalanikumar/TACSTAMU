import { useEffect, useState } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { Profile } from "./types/DatabaseTypes";

const Auth = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const from =
    typeof router.query.from === "string" && router.query.from.length < 0
      ? router.query.from
      : "/b4g/Dashboard";

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [customDietary, setCustomDietary] = useState("");

  const [error, setError] = useState<AuthError | PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/b4g/Dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({ email: email, password: password });

        if (user?.id) {
          const { data: profile, error } = await supabase
            .from("profile")
            .insert({
              diet_restrictions: [
                ...dietaryRestrictions.filter((d) => d !== "Other"),
                customDietary || null,
              ].filter(Boolean),
              first_name: firstName,
              grad_year: Number(gradYear),
              id: user.id,
              last_name: lastName,
            })
            .select()
            .maybeSingle();
          if (error) {
            throw error;
          }
          if (!profile) {
            throw new Error("Did not recieve profile");
          }
          console.log(from, "Hello");
          login(user, profile as Profile);
          router.push(from || "/b4g/Dashboard");
        } else {
          throw error;
        }
      } else {
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (user?.id) {
          const { data: profile, error } = await supabase
            .from("profile")
            .select()
            .eq("id", user.id)
            .maybeSingle();
          if (!profile) {
            throw error;
          }
          login(user, profile as Profile);
        } else {
          throw error;
        }
        router.push(from ?? "/b4g/Dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-4xl">{isSignup ? "Sign Up" : "Login"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {isSignup && (
          <>
            <h2 className="text-xl">First Name</h2>
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border-3"
              required
            />
            <h2 className="text-xl">Last Name</h2>
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border-3"
              required
            />
            <h2 className="text-xl">Graduation Year</h2>
            <input
              placeholder="Graduation Year"
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="p-3 border-3"
              required
            />
            <h2 className="text-xl">Dietary Restrictions</h2>
            <div className="flex flex-col gap-2">
              {[
                "Vegetarian",
                "Vegan",
                "Gluten-Free",
                "Dairy-Free",
                "Nut-Free",
                "Halal",
                "Kosher",
                "No beef",
                "No pork",
                "Only chicken",
                "Other",
              ].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={dietaryRestrictions.includes(option)}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (e.target.checked) {
                        setDietaryRestrictions([...dietaryRestrictions, value]);
                      } else {
                        setDietaryRestrictions(
                          dietaryRestrictions.filter((d) => d !== value),
                        );
                      }
                    }}
                  />
                  {option}
                </label>
              ))}

              {dietaryRestrictions.includes("Other") && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={customDietary}
                  onChange={(e) => setCustomDietary(e.target.value)}
                  className="p-3 border-3"
                />
              )}
            </div>
          </>
        )}
        <h2 className="text-xl">Email</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          className="p-3 border-3"
          required
        />
        <h2 className="text-xl">Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="p-3 border-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="p-3 border rounded-xl"
        >
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: 10 }}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          style={{
            background: "none",
            border: "none",
            color: "blue",
            cursor: "pointer",
            padding: 0,
          }}
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </p>
    </div>
  );
};

export default Auth;
