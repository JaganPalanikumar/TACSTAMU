import { useState } from "react";
import { useAuth } from "./context/authContext";
import { useRouter } from "next/router";

const Auth = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [customDietary, setCustomDietary] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (user) {
    router.push("/b4g/dashboard");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignup) {
        await axios.post(
          "/createUser",
          {
            email,
            password,
            firstName,
            lastName,
            gradYear: Number(gradYear),
            dietaryRestrictions: customDietary
              ? [
                  ...dietaryRestrictions.filter((d) => d !== "Other"),
                  customDietary,
                ]
              : dietaryRestrictions,
          },
          { withCredentials: true },
        );
      }

      // sets HTTP-only cookie
      const res = await axios.post("/auth", {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.user);
        navigate(from, { replace: true });
      } else {
        setError(res.data.error);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-3">
      <h1 className="text-4xl">{isSignup ? "Sign Up" : "Login"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
        {error && <p style={{ color: "red" }}>{error}</p>}

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
