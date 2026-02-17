import { useEffect, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";

export default function EditUser() {
  const { user, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !profile) {
      router.push("/b4g");
    }
  }, [user, profile, router]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    if (!user?.email) {
      return;
    }
    setEmail(user.email);

    const known = new Set(dietOptions.filter((o) => o !== "Other"));
    const stored = profile.diet_restrictions ?? [];

    const standard: string[] = [];
    let custom = "";

    for (const item of stored) {
      if (known.has(item)) {
        standard.push(item);
      } else {
        custom = item;
      }
    }

    if (custom) {
      standard.push("Other");
      setCustomDiet(custom);
    } else {
      setCustomDiet("");
    }

    setDietRestrictions(standard);
    setFirstName(profile.first_name ?? "");
    setLastName(profile.last_name ?? "");
    setGradYear(profile.grad_year ?? "");
  }, [profile, user]);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [grad_year, setGradYear] = useState<number | "">("");

  const [diet_restrictions, setDietRestrictions] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const dietOptions = [
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
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!user) return;

    try {
      // If email changed, require current password
      if (email !== user?.email) {
        const { error: authError } = await supabase.auth.updateUser({ email });
        if (authError) throw authError;
      }

      const finalDietary = customDiet
        ? [...diet_restrictions.filter((d) => d !== "Other"), customDiet]
        : diet_restrictions.filter((d) => d !== "Other");

      const { error: profileError } = await supabase
        .from("profile")
        .update({
          first_name,
          last_name,
          grad_year: grad_year === "" ? undefined : Number(grad_year),
          diet_restrictions: finalDietary,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      setSuccess(true);
      router.push(""); // Reload page
    } catch (err: any) {
      setError(err?.message ?? "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7 p-4 max-w-md">
      <h1 className="text-3xl font-semibold">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">Profile updated!</p>}

        <input
          className="p-2 border rounded text-black text-lg"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input
          className="p-2 border rounded text-black text-lg"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />

        <input
          className="p-2 border rounded text-black text-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="p-2 border rounded text-black text-lg"
          type="number"
          placeholder="Graduation Year"
          value={grad_year}
          onChange={(e) =>
            setGradYear(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <div className="flex flex-col gap-2">
          <p className="font-medium text-2xl">Dietary Restrictions</p>

          {dietOptions.map((option) => {
            if (option === "Other") {
              return (
                <label key={option} className="flex items-center gap-2 text-lg">
                  <input
                    type="checkbox"
                    checked={diet_restrictions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDietRestrictions([...diet_restrictions, option]);
                      } else {
                        setDietRestrictions(
                          diet_restrictions.filter((d) => d !== option),
                        );
                        setCustomDiet("");
                      }
                    }}
                  />
                  {option}
                </label>
              );
            } else {
              return (
                <label key={option} className="flex items-center gap-2 text-lg">
                  <input
                    type="checkbox"
                    checked={diet_restrictions.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDietRestrictions([...diet_restrictions, option]);
                      } else {
                        setDietRestrictions(
                          diet_restrictions.filter((d) => d !== option),
                        );
                      }
                    }}
                  />
                  {option}
                </label>
              );
            }
          })}

          {diet_restrictions.includes("Other") && (
            <input
              className="p-2 border rounded text-black text-lg"
              placeholder="Specify other dietary restriction"
              value={customDiet}
              onChange={(e) => setCustomDiet(e.target.value)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
