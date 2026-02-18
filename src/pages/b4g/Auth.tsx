import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/b4g/context/authContext";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabase";
import { AuthError, PostgrestError } from "@supabase/supabase-js";
import { Profile } from "@/b4g/types/DatabaseTypes";

const Auth = () => {
  const { user, login } = useAuth();
  const router = useRouter();
  const from =
    typeof router.query.from === "string" && router.query.from.length > 0
      ? router.query.from
      : "/b4g/Dashboard";

  const [isSignup, setIsSignup] = useState(false);

  const currentYear = new Date().getFullYear();
  const gradYears = Array.from({ length: 10 }, (_, i) => currentYear + i - 2); // current year - 2 + next 10 years

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [customDietary, setCustomDietary] = useState("");
  const [firstHackathon, setFirstHackathon] = useState<string>("");
  const [shirtSize, setShirtSize] = useState("");
  const [heardAbout, setHeardAbout] = useState("");
  const [helpfulLinks, setHelpfulLinks] = useState("");

  const [error, setError] = useState<AuthError | PostgrestError | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const gradYearRef = useRef<HTMLSelectElement>(null);
  const firstHackathonRef = useRef<HTMLDivElement>(null);
  const shirtSizeRef = useRef<HTMLSelectElement>(null);
  const heardAboutRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    if (user) {
      router.push("/b4g/Dashboard");
    }
  }, [user, router]);

  const validate = () => {
    const e: Record<string, string> = {};
  
    if (isSignup) {
      if (!firstName.trim()) e.firstName = "This is a required field.";
      if (!lastName.trim()) e.lastName = "This is a required field.";
      if (!gradYear) e.gradYear = "Please select a graduation year.";
      if (!firstHackathon) e.firstHackathon = "This is a required field.";
      if (!shirtSize) e.shirtSize = "Please select a size.";
      if (!heardAbout.trim()) e.heardAbout = "This is a required field.";
    }
  
    if (!email.trim()) e.email = "This is a required field.";
    if (!password) e.password = "This is a required field.";
  
    setFieldErrors(e);
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      const order = isSignup
        ? ["firstName","lastName","gradYear","firstHackathon","shirtSize","heardAbout","email","password"]
        : ["email","password"];

      const firstKey = order.find((k) => errs[k]);
      const map: Record<string, HTMLElement | null> = {
        firstName: firstNameRef.current,
        lastName: lastNameRef.current,
        gradYear: gradYearRef.current,
        firstHackathon: firstHackathonRef.current,
        shirtSize: shirtSizeRef.current,
        heardAbout: heardAboutRef.current,
        email: emailRef.current,
        password: passwordRef.current,
      };

      const el = firstKey ? map[firstKey] : null;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as any)?.focus?.();

      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);

    const capitalize = (str: string) =>
      str.replace(/\b\w/g, (c) => c.toUpperCase());

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
            first_hackathon: firstHackathon === "yes",
            shirt_size: shirtSize,
            heard_about: heardAbout.trim(),
            helpful_links: helpfulLinks.trim() || null,
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

  const inputBubbles = "self-stretch h-14 px-6 py-2.5 bg-white/10 rounded-2xl inline-flex items-center gap-2.5 text-white text-lg font-normal font-['Jost'] outline-none placeholder:text-white/50 placeholder:text-lg placeholder:font-normal placeholder:font-['Jost']";
  const formText = "px-3 text-white text-2xl font-medium font-['Jost'] whitespace-nowrap";
  const dropDownBubble = "self-stretch h-14 px-6 py-2.5 bg-white/10 rounded-2xl inline-flex items-center gap-2.5 text-lg font-normal font-['Jost'] outline-none appearance-none cursor-pointer";
  const qWrap = "w-full max-w-3xl mx-auto flex flex-col gap-6"; 
  const qText = "px-3 text-white text-2xl font-medium font-['Jost']"; 
  const optStack = "w-full flex flex-col gap-4";
  const optBase = "w-full h-16 px-6 py-2 rounded-2xl inline-flex justify-between items-center gap-4";
  const optOn = "bg-white/20 outline outline-[2.5px] outline-offset-[-2.5px] outline-purple-400";
  const optOff = "bg-white/10";
  const toggleOn = "w-8 h-8 relative rounded-[999px] outline outline-4 outline-offset-[-4px] outline-purple-400 overflow-hidden";
  const toggleOff = "w-8 h-8 relative rounded-[999px] border-[2.5px] border-white/20";
  const dot = "w-4 h-4 left-[8px] top-[8px] absolute bg-purple-400 rounded-full";

  const errorBubble =
  "outline outline-[2.5px] outline-offset-[-2.5px] outline-red-400";
const errorText =
  "px-3 text-red-400 text-sm font-normal font-['Jost']";
const errorWrap = "self-stretch flex flex-col gap-2";

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B0F17] via-[#070A10] to-black">
      <div className="mx-auto w-full max-w-3xl px-6 pt-24 pb-24">
      <h1 className="self-stretch text-center justify-center text-white text-7xl font-semibold font-['Jost']">{isSignup ? "Sign Up" : "Login"}</h1>

      <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5 p-3">
        {error && <p style={{ color: "red" }}>{error.message}</p>}

        {isSignup && (
          <>
            <div className={errorWrap}>
              <h2 className={formText}>First Name *</h2>
              <input ref={firstNameRef}
                placeholder="First Name"
                value={firstName}
                autoCapitalize="words"
                autoComplete="given-name"
                autoCorrect="off"
                spellCheck={false}
                onChange={(e) => setFirstName(e.target.value)}
                className={`${inputBubbles} ${
                  submitAttempted && fieldErrors.firstName ? errorBubble : ""
                }`}
                required
              />
              {submitAttempted && fieldErrors.firstName && (
                <div className={errorText}>{fieldErrors.firstName}</div>
              )}
            </div>

            <div className="self-stretch flex flex-col gap-2">
              <h2 className={formText}>Last Name *</h2>
              <input ref= {lastNameRef}
                placeholder="Last Name"
                value={lastName}
                autoCapitalize="words"
                autoComplete="family-name"
                autoCorrect="off"
                spellCheck={false}
                onChange={(e) => setLastName(e.target.value)}
                className={`${inputBubbles} ${
                  submitAttempted && fieldErrors.lastName ? "outline outline-[2.5px] outline-offset-[-2.5px] outline-red-400" : ""
                }`}
              />
              {submitAttempted && fieldErrors.lastName && (
                <div className="px-3 text-red-400 text-sm font-normal font-['Jost']">
                  {fieldErrors.lastName}
                </div>
              )}
            </div>

            <div className={errorWrap}>
              <h2 className={formText}>Graduation Year *</h2>

              <select ref={gradYearRef}
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className={`${dropDownBubble} ${gradYear === "" ? "text-white/50" : "text-white"} ${
                  submitAttempted && fieldErrors.gradYear ? errorBubble : ""
                }`}
                // remove required if using form noValidate + validate()
              >
                <option value="">Select graduation year</option>
                {gradYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {submitAttempted && fieldErrors.gradYear && (
                <div className={errorText}>{fieldErrors.gradYear}</div>
              )}
            </div>

            <div className={errorWrap}>
            <div ref={firstHackathonRef} className={qWrap}>
              <div className={qText}>Will this be your first time at a hackathon? *</div>

              <div className={optStack}>
                <label className="w-full cursor-pointer">
                  <input
                    className="sr-only"
                    type="radio"
                    name="firstHackathon"
                    value="yes"
                    checked={firstHackathon === "yes"}
                    onChange={(e) => setFirstHackathon(e.target.value)}
                  />
                  <div
                    className={`${optBase} ${
                      firstHackathon === "yes" ? optOn : optOff
                    } ${submitAttempted && fieldErrors.firstHackathon ? errorBubble : ""}`}
                  >
                    <div className="text-white text-2xl font-normal font-['Jost']">Yes</div>
                    <div className={firstHackathon === "yes" ? toggleOn : toggleOff}>
                      {firstHackathon === "yes" && <div className={dot} />}
                    </div>
                  </div>
                </label>

                <label className="w-full cursor-pointer">
                  <input
                    className="sr-only"
                    type="radio"
                    name="firstHackathon"
                    value="no"
                    checked={firstHackathon === "no"}
                    onChange={(e) => setFirstHackathon(e.target.value)}
                  />
                  <div
                    className={`${optBase} ${
                      firstHackathon === "no" ? optOn : optOff
                    } ${submitAttempted && fieldErrors.firstHackathon ? errorBubble : ""}`}
                  >
                    <div className="text-white text-2xl font-normal font-['Jost']">No</div>
                    <div className={firstHackathon === "no" ? toggleOn : toggleOff}>
                      {firstHackathon === "no" && <div className={dot} />}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {submitAttempted && fieldErrors.firstHackathon && (
              <div className={errorText}>{fieldErrors.firstHackathon}</div>
            )}
          </div>

            <div className="self-stretch inline-flex flex-col justify-center items-start gap-1.5">
              <div className="px-3 inline-flex justify-center items-center gap-2.5">
                <div className="justify-center text-white text-2xl font-medium font-['Jost']">
                  Dietary restrictions (if any)
                </div>
              </div>

              <div className="self-stretch grid grid-cols-1 md:grid-cols-2 gap-3">
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
                ].map((option) => {
                  const checked = dietaryRestrictions.includes(option);

                  return (
                    <label key={option} className="w-full cursor-pointer">
                      <input
                        type="checkbox"
                        value={option}
                        checked={checked}
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
                        className="sr-only"
                      />

                      <div
                        className={`w-full h-14 pl-6 pr-2.5 py-2.5 rounded-2xl inline-flex justify-start items-center gap-2.5
                          ${
                            checked
                              ? "bg-white/20 outline outline-[2.5px] outline-offset-[-2.5px] outline-purple-400"
                              : "bg-white/10"
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

              {dietaryRestrictions.includes("Other") && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={customDietary}
                  onChange={(e) => setCustomDietary(e.target.value)}
                  className={`${inputBubbles} mt-3`}
                />
              )}
            </div>


            <div className={errorWrap}>
            <h2 className={formText}>What is your shirt size? *</h2>

            <select ref={shirtSizeRef}
              value={shirtSize}
              onChange={(e) => setShirtSize(e.target.value)}
              className={`${dropDownBubble} ${shirtSize === "" ? "text-white/50" : "text-white"} ${
                submitAttempted && fieldErrors.shirtSize ? errorBubble : ""
              }`}
              // remove required if using form noValidate + validate()
            >
              <option value="">Select size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>

            {submitAttempted && fieldErrors.shirtSize && (
              <div className={errorText}>{fieldErrors.shirtSize}</div>
            )}
          </div>


            <h2 className={formText}>How did you hear about this?</h2>
            <input
              type="text"
              value={heardAbout}
              onChange={(e) => setHeardAbout(e.target.value)}
              placeholder="Canvas, Instagram, email, etc."
              className={inputBubbles}
              required
            />

            <h2 className={formText}>Any links/info that would be helpful?</h2>
            <textarea
              value={helpfulLinks}
              onChange={(e) => setHelpfulLinks(e.target.value)}
              placeholder="GitHub, portfolio, LinkedIn, etc."
              rows={4}
              className="self-stretch h-40 px-6 py-2.5 bg-white/10 rounded-2xl inline-flex items-center gap-2.5 text-white text-lg font-normal font-['Jost'] outline-none placeholder:text-white/50 placeholder:text-lg placeholder:font-normal placeholder:font-['Jost']"
            />
          </>
        )}
        <div className={errorWrap}>
          <h2 className={formText}>Email *</h2>
          <input ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className={`${inputBubbles} ${
              submitAttempted && fieldErrors.email ? errorBubble : ""
            }`}
          />
          {submitAttempted && fieldErrors.email && (
            <div className={errorText}>{fieldErrors.email}</div>
          )}
        </div>

        <div className={errorWrap}>
          <h2 className={formText}>Password *</h2>
          <input ref={passwordRef}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className={`${inputBubbles} ${
              submitAttempted && fieldErrors.password ? errorBubble : ""
            }`}
          />
          {submitAttempted && fieldErrors.password && (
            <div className={errorText}>{fieldErrors.password}</div>
          )}
        </div>


        <button
          type="submit"
          disabled={loading}
          className="mt-5 mx-auto w-full max-w-sm px-6 py-2.5
          bg-purple-400 rounded-[999px]
          outline outline-[3px] outline-offset-[-3px] outline-purple-400
          inline-flex justify-center items-center gap-2.5
          text-center text-white text-2xl font-semibold font-['Jost']
          disabled:opacity-60"
        >
          {loading ? "Please wait..." : isSignup ? "Create Account" : "Login"}
        </button> 
      </form>

      <div className="mt-6 mb-12 w-full text-center">
        <span className={"text-white/80 text-lg font-normal font-['Jost']"}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        </span>

        <button
          type="button"
          onClick={() => setIsSignup(!isSignup)}
          className={"text-lg px-0 w-auto h-auto align-baseline text-purple-400 hover:text-purple-300"}
        >
          {isSignup ? "Login" : "Sign up"}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Auth;
