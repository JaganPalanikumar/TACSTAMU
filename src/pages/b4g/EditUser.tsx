import { useEffect, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import { AnimatePresence, motion } from "framer-motion";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

export default function EditUser() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const currentYear = new Date().getFullYear();
  const gradYears = Array.from({ length: 10 }, (_, i) => currentYear + i - 2);

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [grad_year, setGradYear] = useState<number | "">("");
  const [shirtSize, setShirtSize] = useState<string>("");
  const [open, setOpen] = useState(false);

  const [diet_restrictions, setDietRestrictions] = useState<string[]>([]);
  const [customDiet, setCustomDiet] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const inputBubbles =
    "self-stretch h-14 px-6 py-2.5 bg-[--container-background] rounded-2xl text-white text-lg font-normal font-['Jost'] outline-none placeholder:text-white/50";

  const formText = "px-3 text-white text-2xl font-medium font-['Jost']";

  const errorText = "px-3 text-red-400 text-sm font-normal font-['Jost']";

  const successText = "px-3 text-green-400 text-sm font-normal font-['Jost']";

  const dropDownBubble =
    "self-stretch h-14 px-6 py-2.5 bg-[--container-background] rounded-2xl text-white text-lg font-normal font-['Jost'] outline-none appearance-none";

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
      if (email !== user.email) {
        const { error } = await supabase.auth.updateUser({ email });
        if (error) throw error;
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
          shirt_size: shirtSize,
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message ?? "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !profile) {
      router.push("/b4g");
      return;
    }

    if (profile && user?.email) {
      setFirstName(profile.first_name ?? "");
      setLastName(profile.last_name ?? "");
      setGradYear(profile.grad_year ?? "");
      setEmail(user.email);
      setShirtSize(profile.shirt_size ?? "");

      // ✅ Autofill dietary restrictions
      if (Array.isArray(profile.diet_restrictions)) {
        setDietRestrictions(profile.diet_restrictions);

        // If they previously entered a custom value (not in predefined list)
        const predefined = [
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
        ];

        const custom = profile.diet_restrictions.find(
          (item: string) => !predefined.includes(item),
        );

        if (custom) {
          setDietRestrictions([
            ...profile.diet_restrictions.filter((d: string) =>
              predefined.includes(d),
            ),
            "Other",
          ]);
          setCustomDiet(custom);
        }
      }
    }
  }, [user, profile, router]);

  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-3xl px-6 pt-24 pb-24">
        <h1 className="text-center text-white text-7xl font-semibold font-['Jost']">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
          {error && <div className={errorText}>{error}</div>}
          {success && (
            <div className={successText}>Profile updated successfully!</div>
          )}

          {/* First Name */}
          <div className="flex flex-col gap-2">
            <h2 className={formText}>First Name</h2>
            <input
              className={inputBubbles}
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-2">
            <h2 className={formText}>Last Name</h2>
            <input
              className={inputBubbles}
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <h2 className={formText}>Email</h2>
            <input
              type="email"
              className={inputBubbles}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Graduation Year */}
          <div className="flex flex-col gap-2">
            <h2 className={formText}>Graduation Year</h2>
            <select
              value={grad_year}
              onChange={(e) =>
                setGradYear(e.target.value === "" ? "" : Number(e.target.value))
              }
              className={dropDownBubble}
            >
              <option value="">Select graduation year</option>
              {gradYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Restrictions */}
          <div className="flex flex-col gap-4">
            <h2 className={formText}>Dietary Restrictions</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dietOptions.map((option) => {
                const checked = diet_restrictions.includes(option);

                return (
                  <label key={option} className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setDietRestrictions([...diet_restrictions, option]);
                        } else {
                          setDietRestrictions(
                            diet_restrictions.filter((d) => d !== option),
                          );
                          if (option === "Other") setCustomDiet("");
                        }
                      }}
                      className="sr-only"
                    />

                    <div
                      className={`w-full h-14 pl-6 pr-2.5 py-2.5 rounded-2xl inline-flex justify-start items-center gap-2.5
                          ${
                            checked
                              ? "bg-white/20 outline outline-[2.5px] outline-offset-[-2.5px] outline-purple-400"
                              : "bg-[--container-background]"
                          }`}
                    >
                      <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-white text-lg font-normal font-['Jost']">
                        {option}
                      </div>

                      <div
                        className={`w-8 h-8 relative rounded-xl overflow-hidden
                            ${
                              checked
                                ? "bg-purple-400 outline outline-1 outline-offset-[-1px] outline-purple-400"
                                : "outline outline-[2.5px] outline-offset-[-2.5px] outline-white/20"
                            }`}
                      >
                        {checked && (
                          <svg
                            viewBox="0 0 24 24"
                            className="absolute inset-0 m-auto h-5 w-5"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>

            {diet_restrictions.includes("Other") && (
              <input
                className={inputBubbles}
                placeholder="Specify other dietary restriction"
                value={customDiet}
                onChange={(e) => setCustomDiet(e.target.value)}
              />
            )}
          </div>

          <h2 className={formText}>What is your shirt size? *</h2>

          <div className="relative w-full">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className={`${dropDownBubble} flex justify-between w-full items-center ${
                shirtSize === "" ? "text-white/50" : "text-white"
              }`}
            >
              {shirtSize || "Select size"}
              <span className={`transition ${open ? "rotate-180" : ""}`}>
                <ExpandMoreRoundedIcon className="-translate-y-0.5 text-white" />
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute z-50 mt-2 w-full bg-[#24272D] outline outline-[2.5px] outline-offset-[-2.5px] outline-purple-400 rounded-[1.5rem] shadow-xl p-3"
                >
                  {["Small", "Medium", "Large", "X-Large"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setShirtSize(size);
                        setOpen(false);
                      }}
                      className="w-full text-left p-3 rounded-[1.125rem] text-white hover:bg-white/20 hover:scale-[1.02] transition"
                    >
                      {size}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-8 mx-auto w-full max-w-sm px-6 py-3
              bg-purple-400 rounded-[999px]
              outline outline-[3px] outline-offset-[-3px] outline-purple-400
              text-white text-2xl font-semibold font-['Jost']
              disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
