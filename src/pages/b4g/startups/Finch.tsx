import Link from "next/link";

/* ─────────────────────────────────────────
   Finch — Startup Brief Page
   Brand: Dark Navy #24364C / Gray #D4D4D4 / Red #D43C33 / Orange #E09643
   Tone: Playful, Innovative, Approachable
───────────────────────────────────────── */

export default function Finch() {
  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col">
        {/* ── Back ── */}
        <Link
          href="/b4g/Challenges?tab=aggiex"
          className="w-fit text-[--pink] text-sm hover:underline flex items-center gap-1"
        >
          ← Back to AggieX Challenge
        </Link>

        {/* ── Header ── */}
        <div className="p-12 flex flex-col gap-4">
          <span className="text-[--pink] font-mono text-xs tracking-[0.2em] uppercase">
            Startup Brief — AggieX Challenge
          </span>
          <img
            src="/b4g/finch/Logo&Icon-Light.png"
            alt="Finch Logo"
            className="w-full p-6"
          />

          <h1 className="text-5xl md:text-6xl font-semibold text-white">
            Finch
          </h1>
          <p className="text-xl text-[--gray]">
            Fewer Applications. More Interviews.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["Playful", "Innovative", "Approachable"].map((t) => (
              <span
                key={t}
                className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[--gray] text-sm mt-2">
            Sponsored by AggieX, Aggies Create, and Meloy Entrepreneurship
          </p>
        </div>

        {/* ── About ── */}
        <Section title="About Finch">
          <P>
            Finch (Easy Apply) is an intentional internship platform built for
            engineering, computer science, and high-volume student applicants
            who are tired of mass applying with little return. Instead of
            helping students submit more applications, Finch optimizes for
            interview probability — matching them to high-signal roles,
            tailoring their materials, and integrating structured networking to
            increase recruiter visibility.
          </P>
          <P>
            Finch streamlines the internship application process by combining
            AI-powered resume tailoring with automated form-filling. Users sign
            up, connect their LinkedIn profile, and the system generates a rich
            candidate profile. When browsing job postings on major ATS platforms
            (Greenhouse, Lever, Workday), the Chrome extension detects the
            application, generates a tailored resume and cover letter in
            seconds, and autofills the entire form — turning what takes 20–30
            minutes into under 60 seconds.
          </P>
        </Section>

        {/* ── Problem & Solution ── */}
        <div className="p-12 grid md:grid-cols-2 gap-6">
          <InfoCard title="The Problem">
            Students are encouraged to mass apply without guidance on improving
            their odds. High-volume applicants submit 100–200 applications with
            minimal response, face frequent ghosting, and receive no feedback.
            The advice is always "apply more" and "network more" — but with no
            system to actually improve outcomes.
          </InfoCard>
          <InfoCard title="The Solution">
            Finch replaces volume-based strategies with an intentional,
            optimized approach. It's not an auto-apply tool — it's a
            response-optimization platform. Target high-signal roles, tailor
            materials strategically, and increase visibility with
            decision-makers. Fewer applications. More interviews.
          </InfoCard>
          <InfoCard title="Mission">
            To transform the internship application process from a frustrating
            numbers game into an intentional, data-driven strategy that helps
            students earn the opportunities they deserve — while Finch
            streamlines, optimizes, and strengthens their path to interviews.
          </InfoCard>
          <InfoCard title="Vision">
            To become the default infrastructure for intentional early-career
            recruiting — replacing cold, volume-based application systems with a
            smarter, outcome-driven approach where students are evaluated more
            efficiently and the path from education to experience is transparent
            and merit-based.
          </InfoCard>
        </div>

        {/* ── Target Audience ── */}
        <Section title="Target Audience">
          <BulletList
            items={[
              "Ages 19–23, undergraduate students",
              "Engineering, Computer Science, or quantitative business majors",
              "Actively applying for competitive internships",
              "Digitally native, time-constrained, and outcome-driven",
              "Submitting 50–200 applications per recruiting cycle with low response rates",
            ]}
          />
        </Section>

        {/* ── How It Works ── */}
        <Section title="How It Works">
          <ol className="flex flex-col gap-4">
            {[
              [
                "Sign up & connect LinkedIn",
                "Users sign up and connect their LinkedIn profile. Advanced AI analysis generates a rich candidate profile automatically.",
              ],
              [
                "Browse jobs on major ATS platforms",
                "The Chrome extension works across Greenhouse, Lever, Workday, and other major platforms — detecting applications as you browse.",
              ],
              [
                "Tailored resume & cover letter in seconds",
                "For each job, Finch generates a tailored resume and cover letter matched to that specific role in seconds.",
              ],
              [
                "Autofill the entire application",
                "The extension fills the entire form including file uploads — stopping at the final review page so the user stays in control.",
              ],
              [
                "Submit with confidence",
                "What normally takes 20–30 minutes now takes under 60 seconds — without sacrificing the quality that gets candidates past ATS filters.",
              ],
            ].map(([step, desc], i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[--pink]/10 border border-[--pink] text-[--pink] text-sm font-semibold flex items-center justify-center mt-1">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium">{step}</p>
                  <p className="text-[--gray] text-sm leading-relaxed mt-1">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Products / Pricing ── */}
        <Section title="Pricing Model">
          <BulletList
            items={[
              "B2C2B — Student Freemium and Premium tiers",
              "University Partnerships",
            ]}
          />
          <Callout>
            Pricing details TBD — design the product page to accommodate
            freemium vs premium tier comparison.
          </Callout>
        </Section>

        {/* ── Our Story ── */}
        <Section title="Origin Story">
          <P>
            Carlos was trying to apply to internships as a CS major and was not
            getting any responses from mass applications. He understood his own
            pain points and thought of a more efficient way to approach the
            process. He built a functioning backend that minimized the number of
            applications he had to fill out while maximizing his success rate
            for interviews. That's how Finch was born.
          </P>
        </Section>

        {/* ── Team ── */}
        <Section title="The Team">
          <div className="flex flex-col gap-4">
            <FounderCard
              name="Nicanor Garza-Zazueta"
              role="CEO & Co-founder"
              email="nicanor14gz@tamu.edu"
              bio="An Industrial Distribution Engineering student at Texas A&M focused on building ventures that create measurable, lasting impact. A Meloy Fellows Grant recipient, he operates at the intersection of entrepreneurship, strategy, and execution. Known for assembling high-performing teams and driving growth through relationship-building and disciplined sales leadership."
            />
            <FounderCard
              name="Jose Tirado"
              role="CTO & Co-founder"
              email="jmtirador@tamu.edu"
              bio="An Industrial Engineering student at Texas A&M who enjoys solving problems and improving how systems operate. Driven by analytical thinking to create practical, measurable impact. Thrives best when encountering nuanced problems that need outside-the-box solutions — focused on streamlining all people and operations within Finch."
            />
            <FounderCard
              name="Carlos Luna Pena"
              role="CTO & Co-founder"
              email="carlunpen@tamu.edu"
              bio="A junior Computer Science student at Texas A&M with a cybersecurity minor and statistics emphasis. Technical Lead for AIPHRODITE (a computer vision project built with FastAPI, PostgreSQL, and Hugging Face) and co-founder of Finch. His work spans Python, LangChain, LaTeX resume generation, LinkedIn scraping, and automated outreach systems. Placed 2nd in the Accenture Case Competition leading his team's AI operations research."
            />
          </div>
        </Section>

        {/* ── Brand Guidelines ── */}
        <Section title="Brand Guidelines">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">Color Palette</p>
              <div className="flex gap-3 flex-wrap">
                {[
                  { name: "Dark Navy", hex: "#24364C" },
                  { name: "Light Gray", hex: "#D4D4D4" },
                  { name: "Red", hex: "#D43C33" },
                  { name: "Orange", hex: "#E09643" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-12 h-12 rounded-xl border border-white/20"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[--gray] text-xs text-center">
                      {c.name}
                    </span>
                    <span className="text-[--gray] text-xs font-mono">
                      {c.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">Typography</p>
              <p className="text-[--gray] text-sm">
                Preferably fonts that match the logo. Not Times New Roman or
                Arial. The logo uses a modern, rounded sans-serif — match that
                energy.
              </p>
              <p className="text-white font-medium mt-2">Desired Feel</p>
              <p className="text-[--gray] text-sm">
                Playful, Innovative, Approachable
              </p>
            </div>
          </div>
          <Callout>
            Logo files available via the provided Google Drive links. Use colors
            that match the gradient logo (navy to red to orange). Avoid Times
            New Roman or Arial entirely.
          </Callout>
        </Section>

        {/* ── Pages ── */}
        <Section title="Pages to Build">
          <BulletList items={["Home", "About", "Product / How It Works"]} />
        </Section>

        {/* ── Requested Features ── */}
        <Section title="Requested Features">
          <BulletList
            items={[
              "Email capture form",
              "Contact form",
              "FAQ section",
              "Animations",
              "Dark mode",
            ]}
          />
        </Section>

        {/* ── CTAs ── */}
        <Section title="Primary Call-to-Actions">
          <BulletList
            items={[
              "Sign up",
              "Purchase / subscribe",
              "Download app / Chrome extension",
              "Follow on social",
              "Share with friends",
            ]}
          />
          <Callout>
            Hero headline: "Turn Applications Into Interviews." — Stop guessing
            and start applying with strategy. Finch helps you target the right
            internships, tailor your applications intelligently, and increase
            your interview rate without spending more time applying.
          </Callout>
        </Section>

        {/* ── Inspiration ── */}
        <Section title="Design Inspiration Sites">
          <div className="flex flex-col gap-2">
            {[
              "https://cluely.com",
              "https://www.duolingo.com",
              "https://www.swift.org",
            ].map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--pink] hover:underline text-md break-all"
              >
                {url}
              </a>
            ))}
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section title="Contact">
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                Nicanor's Email:{" "}
                <a
                  href="mailto:nicanor14gz@tamu.edu"
                  className="text-[--pink] hover:underline"
                  target="_blank"
                >
                  nicanor14gz@tamu.edu
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                Jose's Email:{" "}
                <a
                  href="mailto:jmtirador@tamu.edu"
                  className="text-[--pink] hover:underline"
                  target="_blank"
                >
                  jmtirador@tamu.edu
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                Carlos's Email:{" "}
                <a
                  href="mailto:carlunpen@tamu.edu"
                  className="text-[--pink] hover:underline"
                  target="_blank"
                >
                  carlunpen@tamu.edu
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                Current Website:{" "}
                <Link
                  href="https://applyfinch.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--pink] hover:underline"
                >
                  applyfinch.com
                </Link>
              </span>
            </li>
          </ul>
        </Section>

        {/* ── Brand Images ── */}
        <Section title="Brand Images">
          <p className="text-lg text-[--gray]">
            Placeholder images for the build. Replace these with real brand
            assets provided by the startup. Click any image to download.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Product Image 1.png", w: 1600, h: 722 },
              { label: "Product Image 2.png", w: 1600, h: 722 },
              { label: "Product Image 3.png", w: 1600, h: 721 },
              { label: "Product Image 4.png", w: 1600, h: 716 },
              { label: "Product Image 5.png", w: 1600, h: 726 },
              { label: "Pricing Strat.png", w: 1600, h: 726 },
              { label: "Carlos Luna Headshot.jpeg", w: 1600, h: 726 },
              { label: "Jose Tirado Headshot.jpeg", w: 1600, h: 726 },
              { label: "Nicanor Garza-Zazueta headshot.png", w: 1600, h: 726 },
              { label: "Logo.png", w: 1340, h: 385 },
              { label: "Logo Dark.png", w: 1340, h: 385 },
              { label: "Logo&Icon Light.png", w: 1340, h: 385 },
              { label: "Icons.png", w: 1701, h: 2200 },
              { label: "Additional Colors.png", w: 1701, h: 2200 },
            ].map((img) => (
              <a
                key={img.label}
                href={`/b4g/finch/${img.label.replace(/ /g, "-")}`}
                download={`/b4g/finch/${img.label.replace(/ /g, "-")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 hover:border-[--pink] transition duration-300"
              >
                <div className="relative w-full aspect-video bg-white/5 overflow-hidden rounded-t-2xl">
                  <img
                    src={`/b4g/finch/${img.label.replace(/ /g, "-")}`}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 text-xs font-mono bg-black/50 text-white/60 group-hover:text-white/80 px-2 py-0.5 rounded-md transition">
                    {img.w}×{img.h}
                  </span>
                </div>
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
                  <span className="text-[--gray] text-sm">{img.label}</span>
                  <span className="text-[--pink] text-xs group-hover:underline">
                    ↓ Download
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

/* ── Shared components ── */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-12 flex flex-col gap-6">
      <h2 className="text-3xl font-semibold text-[--pink]">{title}</h2>
      {children}
    </div>
  );
}

function InfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[3rem] border border-white/10 p-8 shadow-xl flex flex-col gap-4">
      <h2 className="text-2xl font-semibold text-[--pink]">{title}</h2>
      <p className="text-[--gray] text-base leading-relaxed">{children}</p>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-[--gray] leading-relaxed">{children}</p>;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-lg text-[--gray]">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[--gray] text-base italic border-l-2 border-[--pink] pl-4 mt-2 leading-relaxed">
      {children}
    </p>
  );
}

function FounderCard({
  name,
  role,
  email,
  bio,
}: {
  name: string;
  role: string;
  email: string;
  bio: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div className="flex gap-5 items-start border border-white/10 rounded-2xl p-6">
      <div className="w-12 h-12 shrink-0 rounded-full bg-[--pink]/10 border border-[--pink] flex items-center justify-center text-[--pink] font-semibold text-sm">
        {initials}
      </div>
      <div>
        <p className="text-white font-semibold text-lg">{name}</p>
        <p className="text-[--pink] text-sm mb-2">{role}</p>
        <p className="text-[--gray] text-sm leading-relaxed mb-2">{bio}</p>
        <p className="text-[--pink] text-sm mb-2">
          Email:{" "}
          <a className="hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      </div>
    </div>
  );
}
