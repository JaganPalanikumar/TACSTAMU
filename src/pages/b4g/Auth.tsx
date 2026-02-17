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
    typeof router.query.from === "string" && router.query.from.length > 0
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

  const capitalize = (str: string) =>
    str.replace(/\b\w/g, (c) => c.toUpperCase());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
        });

        if (signUpError) throw signUpError;

        if (!data.user) {
          throw new Error("Signup failed. Please check your email.");
        }

        if (!data.user.id) {
          throw new Error("User ID missing.");
        }

        const { data: profile, error: profileError } = await supabase
          .from("profile")
          .insert({
            id: data.user.id,
            first_name: capitalize(firstName.trim()),
            last_name: capitalize(lastName.trim()),
            grad_year: Number(gradYear),
            diet_restrictions: [
              ...dietaryRestrictions.filter((d) => d !== "Other"),
              customDietary || null,
            ].filter(Boolean),
          })
          .select()
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) throw new Error("Did not recieve profile");

        login(data.user, profile as Profile);
        router.push(from || "/b4g/Dashboard");
      } else {
        const {
          data: { user },
          error: loginError,
        } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (loginError) throw loginError;
        if (!user) throw new Error("Login failed");

        const { data: profile, error: profileError } = await supabase
          .from("profile")
          .select()
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;
        if (!profile) throw new Error("Profile not found");

        login(user, profile as Profile);
        router.push(from);
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
              autoCapitalize="words"
              autoComplete="given-name"
              autoCorrect="off"
              spellCheck={false}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-3 border-3 text-[--gray]"
              required
            />
            <h2 className="text-xl">Last Name</h2>
            <input
              placeholder="Last Name"
              value={lastName}
              autoCapitalize="words"
              autoComplete="family-name"
              autoCorrect="off"
              spellCheck={false}
              onChange={(e) => setLastName(e.target.value)}
              className="p-3 border-3 text-[--gray]"
              required
            />
            <h2 className="text-xl">Graduation Year</h2>
            <input
              placeholder="Graduation Year"
              type="number"
              value={gradYear}
              onChange={(e) => setGradYear(e.target.value)}
              className="p-3 border-3 text-[--gray]"
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
                  className="p-3 border-3 text-[--gray]"
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
          className="p-3 border-3 text-[--gray]"
          required
        />
        <h2 className="text-xl">Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="p-3 border-3 text-[--gray]"
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
