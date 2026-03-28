import { useAuth } from "@/b4g/context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const startups = [
  {
    name: "Thewconverts LLC",
    tagline: "Your #1 source for OEM Parts, Upgrades, Conversion Kits & More!",
    href: "/b4g/startups/Thewconverts",
  },
  {
    name: "Finch",
    tagline: "Fewer Applications. More Interviews.",
    href: "/b4g/startups/Finch",
  },
];

const challenges = [
  { id: "best-overall", label: "BEST OVERALL" },
  { id: "poker-bot", label: "POKER BOT" },
  { id: "figma", label: "FIGMA (UI/UX)" },
  { id: "aggiex", label: "AGGIEX" },
  { id: "space-data", label: "SPACE DATA VISUALIZATION" },
];

const DEFAULT_TAB = "best-overall";

export default function Challenges() {
  const router = useRouter();

  const { profile, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !profile) {
      router.push("/b4g");
    }
  }, [isLoading, profile, router]);

  // Read tab from query; fall back to default
  const tab =
    typeof router.query.tab === "string" &&
    challenges.some((c) => c.id === router.query.tab)
      ? router.query.tab
      : DEFAULT_TAB;

  function setTab(id: string) {
    router.push({ pathname: router.pathname, query: { tab: id } }, undefined, {
      shallow: true,
    });
  }

  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* ================= HEADER ================= */}
        <div className="text-center text-white flex flex-col gap-3">
          <h1 className="text-6xl font-semibold">Challenges</h1>
          <p className="text-xl text-[--gray]">B4G2026 — Choose your track</p>
        </div>

        {/* ================= TAB NAV ================= */}
        <div className="flex flex-wrap justify-center gap-2">
          {challenges.map((c) => (
            <button
              key={c.id}
              onClick={() => setTab(c.id)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium tracking-wider transition
                hover:scale-105 active:scale-95 duration-300
                ${
                  tab === c.id
                    ? "bg-[--pink] text-white"
                    : "border border-[--pink] text-[--pink] hover:bg-[--pink]/10"
                }
              `}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ================= PANELS ================= */}
        <BestOverall hidden={tab !== "best-overall"} />
        <PokerBot hidden={tab !== "poker-bot"} />
        <Figma hidden={tab !== "figma"} />
        <AggieX hidden={tab !== "aggiex"} />
        <SpaceData hidden={tab !== "space-data"} />

        {/* ================= SUBMISSION ================= */}
        {tab === "poker-bot" ? (
          <div className="p-12 flex flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold text-[--pink]">
              Submit Your Bot
            </h2>
            <p className="text-lg text-[--gray]">
              Poker Bot submissions are collected via Google Forms. Upload your{" "}
              <code className="text-white font-mono text-sm">.zip</code> file of
              the{" "}
              <code className="text-white font-mono text-sm">
                python_skeleton/
              </code>{" "}
              folder and fill in your team member names.
            </p>
            <div className="flex flex-col gap-2 text-[--gray] text-sm">
              {[
                "Team Name",
                "Team Member 1 (required)",
                "Team Member 2",
                "Team Member 3",
                "Team Member 4",
              ].map((field) => (
                <div key={field} className="flex items-center gap-2 mx-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
                  <span>{field}</span>
                </div>
              ))}
            </div>
            <a
              href="https://forms.gle/hUxpKj1M5EEBK6Rv8"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-2 px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 active:scale-95 transition text-sm font-medium"
            >
              Submit Bot via Google Forms →
            </a>
          </div>
        ) : (
          <div className="p-12 flex flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold text-[--pink]">
              Submit Your Project
            </h2>
            <p className="text-lg text-[--gray]">
              All projects must be submitted on Devpost before the deadline.
              Make sure your submission includes a project description, demo
              video, and links to your code or prototype.
            </p>
            <a
              href="https://build4good-2026.devpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-2 px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 active:scale-95 transition text-sm font-medium"
            >
              Submit on Devpost →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Shared card wrapper ─── */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className=" rounded-[3rem] p-12 flex flex-col gap-6">{children}</div>
  );
}

/* ─── Section heading ─── */
function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-semibold text-[--pink]">{children}</h2>;
}

/* ─── Bullet list ─── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-lg text-[--gray]">
          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type Prize = { place: string; items: string[] };
function PrizesCard({ prizes }: { prizes: Prize[] }) {
  return (
    <Card>
      <CardTitle>Prizes</CardTitle>
      <div className="flex flex-col gap-4">
        {prizes.map((p) => (
          <div
            key={p.place}
            className="flex items-start gap-5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex flex-col gap-1">
              <p className="text-white font-semibold">{p.place}</p>
              <div className="grid grid-flow-col md:auto-cols-auto gap-2 mt-1">
                {p.items.map((item) => (
                  <div
                    key={item}
                    className="px-3 py-1 rounded-[10px] bg-white/5 border border-white/10 flex flex-col gap-2"
                  >
                    <span className="text-[--gray] text-sm">{item}</span>
                    <img
                      src={"/b4g/prizes/" + item.replace(/ /g, "-") + ".png"}
                      alt={item}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ════════════════════════════════════════
   Challenge panels
════════════════════════════════════════ */

function BestOverall({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col">
      <Card>
        <CardTitle>Best Overall</CardTitle>
        <p className="text-lg text-[--gray]">
          There are no rules here — just results. Build whatever you want: a web
          app, a game, a tool, a data visualization, a CLI, a mobile experience.
          If you can code it, it counts. You're not limited to a website, and
          you're not required to follow any particular theme.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {["Any stack", "Any format", "Open-ended", "Theme optional"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </Card>

      <Card>
        <CardTitle>Optional Theme — Space</CardTitle>
        <p className="text-lg text-[--gray]">
          This year's optional theme is{" "}
          <span className="text-white font-medium">Space</span>. You don't have
          to use it, but teams that find a compelling, unexpected way to weave
          it in may find it elevates their project. Think broadly — space as
          exploration, as isolation, as the unknown, as infrastructure, as awe.
        </p>
      </Card>

      <Card>
        <CardTitle>Judging Criteria</CardTitle>
        <BulletList
          items={[
            "Impact & Ambition — Did you attempt something bold and meaningful?",
            "Technical Execution — Is it functional, stable, and polished?",
            "Creativity — Does it surprise or delight the judges?",
            "Presentation — Can you communicate your vision clearly?",
          ]}
        />
      </Card>

      <PrizesCard
        prizes={[
          { place: "1st Place", items: ["Electric Scooter"] },
          { place: "2nd Place", items: ["JBL Speaker"] },
          { place: "3rd Place", items: ["Polaroid Camera"] },
        ]}
      />
    </div>
  );
}

function PokerBot({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col">
      <Card>
        <CardTitle>Poker Bot</CardTitle>
        <p className="text-lg text-[--gray]">
          Design an algorithm to play a custom variant of Texas Hold'em with a
          redraw twist. After a full day of hacking, teams submit their Python
          bots to compete in a head-to-head single-elimination tournament.
          Thousands of hands are simulated per matchup to crown a champion.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {[
            "Python only",
            "300 hands / match",
            "Single-elimination",
            "180s time limit",
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>Github Repo</CardTitle>
        <a
          href="https://github.com/MontgomeryBohde/TACS-PokerBots-2026"
          target="_blank"
        >
          https://github.com/MontgomeryBohde/TACS-PokerBots-2026
        </a>
      </Card>

      <Card>
        <CardTitle>What to Expect</CardTitle>
        <BulletList
          items={[
            "Hold'em + Redraw variant — swap one card per hand before the river",
            "Head-to-head single-elimination bracket tournament",
            "300 hands per match — net chip count determines the winner",
            "Sponsored by Jane Street and Hudson River Trading",
          ]}
        />
        <Link
          href="/b4g/PokerBot"
          className="w-fit mt-2 px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 transition text-sm font-medium"
        >
          View Full Challenge Brief →
        </Link>
      </Card>

      <PrizesCard
        prizes={[
          {
            place: "1st Place",

            items: ["Automatic Shuffler & Card Dealer"],
          },
          { place: "2nd Place", items: ["Poker Set"] },
        ]}
      />
    </div>
  );
}

function Figma({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col">
      <Card>
        <CardTitle>Figma UX Challenge — Design for an Astronaut</CardTitle>

        <p className="text-[--gray] text-sm">
          In partnership with the{" "}
          <a
            href="https://www.figma.com/education/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-[--pink] transition"
          >
            Figma Education Program
          </a>
        </p>
        <p className="text-lg text-[--gray]">
          Design a mobile or tablet app experience that helps astronauts manage
          the psychological and behavioral effects of long-duration isolation
          and confinement. Address real problem areas NASA researchers are
          actively studying — from sleep disruption to crew cohesion.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {["UI/UX Design", "Figma", "Space Theme", "Mobile / Tablet"].map(
            (tag) => (
              <span
                key={tag}
                className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </Card>

      <Card>
        <CardTitle>Problem Areas</CardTitle>
        <p className="text-lg text-[--gray]">
          Your design must address{" "}
          <span className="text-white font-medium">at least one</span>:
        </p>
        <BulletList
          items={[
            "Behavioral health monitoring — detect early signs of psychological stress",
            "Sleep & circadian support — manage sleep disruption and light therapy",
            "Connection & communication — crew cohesion despite communication delays",
            "Cognitive workload management — reduce fatigue during high-demand phases",
            "Mindfulness & mental restoration — journaling, nature simulation, space gardening",
          ]}
        />
        <Link
          href="/b4g/Figma UX Challenge Description.pdf"
          download="/b4g/Figma UX Challenge Description.pdf"
          target="_blank"
          className="w-fit mt-2 px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 transition text-sm font-medium"
        >
          View Full Challenge Brief →
        </Link>
      </Card>

      <PrizesCard
        prizes={[
          {
            place: "1st Place",

            items: [
              "Figma Hoodie",
              "Figma Crewneck",
              "Figma Water Bottle",
              "Figma Cap",
            ],
          },
        ]}
      />
    </div>
  );
}

function AggieX({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col">
      <Card>
        <CardTitle>AggieX — Startup Challenge</CardTitle>
        <p className="text-lg text-[--gray]">
          You are a design team at a web agency. A student-founded startup has
          trusted you to build their website — and first impressions matter.
          Browse the participating startups,{" "}
          <span className="text-white font-medium">
            choose the one that excites your team most
          </span>
          , and use their provided content, branding assets, and product details
          to design and develop a compelling website.
        </p>
        <p className="text-lg text-[--gray]">
          This challenge is{" "}
          <span className="text-white font-medium">design-first</span>. Focus on
          creating something clean, creative, and visually memorable. You don't
          need complex backend functionality — a well-crafted static or
          front-end-only site is perfectly valid.
        </p>
      </Card>

      {/* ── Startup cards ── */}
      <Card>
        <CardTitle>Choose a Startup</CardTitle>
        <p className="text-lg text-[--gray]">
          Click a startup below to view their full brief, branding assets, and
          content.
        </p>
        <div className="grid md:grid-cols-3 gap-4 pt-2">
          {startups.map((s) => (
            <Link
              key={s.name}
              href={s.href}
              className="group flex flex-col gap-3 border border-white/10 hover:border-[--pink] rounded-2xl p-6 transition duration-300 hover:bg-[--pink]/5"
            >
              <p className="text-white font-semibold text-lg group-hover:text-[--pink] transition duration-300">
                {s.name}
              </p>
              <p className="text-[--gray] text-sm leading-relaxed">
                {s.tagline}
              </p>
              <span className="mt-auto text-[--pink] text-sm font-medium">
                View Brief →
              </span>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <CardTitle>What to Build</CardTitle>
        <BulletList
          items={[
            "A homepage that communicates the startup's mission at a glance",
            "Clear sections for the product, team, and/or problem being solved",
            "A visual identity that reflects the startup's branding",
            "Thoughtful layout, typography, and user experience",
          ]}
        />
      </Card>

      <Card>
        <CardTitle>What You'll Receive</CardTitle>
        <BulletList
          items={[
            "A written overview of their product and mission",
            "Branding assets — logo, color palette, preferred imagery",
            "Key content such as team bios, feature descriptions, and taglines",
            "Any specific tone or design direction they'd like you to follow",
          ]}
        />
        <p className="text-[--gray] text-base italic border-l-2 border-[--pink] pl-4 mt-2">
          Remember — you are building for a real founder. If your site stands
          out, they may reach out to you directly.
        </p>
      </Card>

      <PrizesCard
        prizes={[
          {
            place: "1st Place",

            items: ["Fellow Products Carter Slide Mug"],
          },
          { place: "2nd Place", items: ["Charging Station"] },
        ]}
      />
    </div>
  );
}

function SpaceData({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div className="flex flex-col gap-6">
      {/* ── Overview ── */}
      <Card>
        <CardTitle>Space Data Visualization</CardTitle>
        <p className="text-lg text-[--gray]">
          NASA has spent decades collecting data on everything from distant
          galaxies to Earth's own atmosphere — and most of it is freely
          available to the public. Your challenge is to take one of these real
          datasets and turn it into something{" "}
          <span className="text-white font-medium">
            people haven't seen before
          </span>
          .
        </p>
        <p className="text-lg text-[--gray]">
          Don't just display the data — tell a story with it. Find a pattern,
          draw a conclusion, or reframe something complex so that someone
          completely new to space can understand and appreciate it.
        </p>
        <a
          href="https://data.nasa.gov/dataset"
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit px-6 py-2 rounded-full border border-[--pink] hover:scale-105 active:scale-95 text-[--pink] text-sm hover:bg-[--pink]/10 transition"
        >
          Browse NASA Datasets →
        </a>
      </Card>

      {/* ── What to do ── */}
      <Card>
        <CardTitle>The Challenge</CardTitle>
        <BulletList
          items={[
            "Choose any dataset from NASA's open data portal",
            "Analyze it — find something interesting, unexpected, or underreported",
            "Build a visual representation that communicates your finding clearly",
            "Make it accessible to someone with no background in space or science",
            "Your output can be a web app, interactive chart, animation, dashboard, or anything else — if it shows the data compellingly, it counts",
          ]}
        />
      </Card>

      {/* ── Dataset ideas ── */}
      <Card>
        <CardTitle>Dataset Ideas to Get You Started</CardTitle>
        <p className="text-lg text-[--gray]">
          Not sure where to begin? These are just starting points — you're free
          to use any dataset on the portal.
        </p>
        <div className="grid md:grid-cols-2 gap-4 pt-2">
          {[
            {
              title: "Exoplanet Archive",
              desc: "Thousands of confirmed planets outside our solar system. Visualize habitability, size comparisons, or discovery trends over time.",
            },
            {
              title: "Meteorite Landings",
              desc: "Every recorded meteorite fall on Earth. Map them geographically or analyze mass distribution and frequency by region.",
            },
            {
              title: "Near-Earth Objects",
              desc: "Asteroids and comets that pass close to Earth. Show proximity, size, and risk in a way that's intuitive rather than alarming.",
            },
            {
              title: "NASA Astronaut Records",
              desc: "Biographical and mission data for every NASA astronaut. Find patterns in backgrounds, mission duration, or demographic shifts over the decades.",
            },
            {
              title: "Earth Surface Temperature",
              desc: "Long-term climate data from NASA's GISS. Reframe the numbers at a human scale — what does a 1.2°C rise actually mean?",
            },
            {
              title: "Space Mission Archives",
              desc: "Launch history, mission types, and outcomes across decades of exploration. Visualize humanity's journey outward over time.",
            },
          ].map((d) => (
            <div
              key={d.title}
              className="border border-white/10 rounded-2xl p-5 flex flex-col gap-2"
            >
              <p className="text-white font-medium">{d.title}</p>
              <p className="text-[--gray] text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Judging ── */}
      <Card>
        <CardTitle>Judging Criteria</CardTitle>
        <BulletList
          items={[
            "Insight — did you find something genuinely interesting or surprising in the data?",
            "Clarity — can someone with no space background understand your visualization?",
            "Creativity — does your approach feel fresh and unexpected?",
            "Execution — is the visual polished, functional, and well-presented?",
            "Storytelling — does it feel like a discovery, not just a chart?",
          ]}
        />
      </Card>

      <PrizesCard prizes={[{ place: "1st Place", items: ["AirPods"] }]} />
    </div>
  );
}

// TODO Add devpost and prizes sections
