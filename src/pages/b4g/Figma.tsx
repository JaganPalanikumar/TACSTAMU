import Link from "next/link";

/* ─────────────────────────────────────────
   Figma UX Challenge Page
   Styling matches B4G2026 dashboard
───────────────────────────────────────── */

export default function Figma() {
  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col">
        {/* ── Back ── */}
        <Link
          href="/b4g/Challenges?tab=figma"
          className="w-fit text-[--pink] text-sm hover:underline flex items-center gap-1"
        >
          ← Back to Challenges
        </Link>

        {/* ── Header ── */}
        <div className="p-12 flex flex-col gap-4">
          <span className="text-[--pink] font-mono text-xs tracking-[0.2em] uppercase">
            Build4Good 2026 — Challenge Brief
          </span>
          <h1 className="text-5xl md:text-6xl font-semibold text-white">
            Figma UX Challenge
          </h1>
          <p className="text-xl text-[--gray]">Design for an Astronaut</p>
          <div className="flex flex-wrap gap-3 pt-2">
            {["UI/UX Design", "Figma", "Space Theme", "Mobile / Tablet"].map(
              (t) => (
                <span
                  key={t}
                  className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <p className="text-[--gray] text-sm pt-2">
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
        </div>

        {/* ── The Challenge ── */}
        <Section title="The Challenge">
          <P>
            Astronauts on deep space missions will face one of the most
            psychologically demanding environments ever endured by humans —
            isolated and confined in a small spacecraft, potentially for years,
            far from Earth. Sleep loss, circadian disruption, and heavy
            workloads compound the mental strain, threatening crew performance,
            health, and mission success.
          </P>
          <P>
            Design a{" "}
            <span className="text-white font-medium">
              mobile or tablet app experience
            </span>{" "}
            that helps astronauts manage the psychological and behavioral
            effects of long-duration isolation and confinement. Your solution
            should address at least one of the real problem areas NASA
            researchers are actively studying.
          </P>
        </Section>

        {/* ── Problem Areas ── */}
        <Section title="Problem Areas">
          <p className="text-lg text-[--gray]">
            Your design must address{" "}
            <span className="text-white font-medium">at least one</span> of the
            following NASA-researched challenges:
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: "Behavioral Health Monitoring",
                desc: "Help crews or mission control detect early signs of psychological stress before they escalate.",
                icon: "🧠",
              },
              {
                title: "Sleep & Circadian Support",
                desc: "Tools for managing sleep disruption and light therapy during irregular mission schedules.",
                icon: "🌙",
              },
              {
                title: "Connection & Communication",
                desc: "Maintain crew cohesion and Earth-contact despite significant communication delays.",
                icon: "📡",
              },
              {
                title: "Cognitive Workload Management",
                desc: "Reduce fatigue and prevent burnout during high-demand mission phases.",
                icon: "⚡",
              },
              {
                title: "Mindfulness & Mental Restoration",
                desc: "Journaling, nature simulation, space gardening, or other restorative experiences.",
                icon: "🌱",
              },
            ].map((area) => (
              <div
                key={area.title}
                className="border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-[--pink]/40 transition duration-300"
              >
                <span className="text-2xl">{area.icon}</span>
                <p className="text-white font-medium">{area.title}</p>
                <p className="text-[--gray] text-sm leading-relaxed">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Figma Tools ── */}
        <Section title="Figma Tools — Free for Students">
          <p className="text-lg text-[--gray]">
            Access all Figma tools for free as a student at{" "}
            <a
              href="https://www.figma.com/education/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--pink] hover:underline"
            >
              figma.com/education
            </a>
            .
          </p>
          <div className="flex flex-col gap-3">
            {[
              [
                "Figma Design",
                "Wireframe layouts, create interactive prototypes, design logos and visual assets.",
              ],
              [
                "DevMode",
                "Translate designs into code with developer tools built into Figma Design.",
              ],
              [
                "FigJam",
                "Collaborative brainstorming with advanced diagramming tools — great for research and problem framing.",
              ],
              [
                "Figma Slides",
                "Co-create visually stunning presentations with embedded interactive prototypes.",
              ],
              [
                "Figma Make",
                "Prompt to code — turn any design idea into a working implementation.",
              ],
            ].map(([tool, desc]) => (
              <div
                key={tool}
                className="flex items-start gap-4 border border-white/10 rounded-xl p-4"
              >
                <code className="text-[--pink] text-sm font-mono shrink-0 mt-0.5 min-w-[110px]">
                  {tool}
                </code>
                <p className="text-[--gray] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Submission Deliverables ── */}
        <Section title="Submission Deliverables">
          <P>Teams must deliver all of the following:</P>
          <ol className="flex flex-col gap-4">
            {[
              [
                "Research & Problem Framing",
                "A brainstorm using FigJam documenting your research process and problem framing.",
              ],
              [
                "Core User Flow",
                "At least 3–5 connected screens covering the primary use case of your app, built in FigJam or Figma Design.",
              ],
              [
                "Design System Starter",
                "A consistent visual language purpose-built for the space context. Consider legibility in low light, glove-friendly touch targets, and low-distraction interfaces — built in Figma Design.",
              ],
              [
                "Final Prototype",
                "Created with at least one of: Figma Design, Figma Make, or fully/partially developed in code.",
              ],
              [
                "Video Presentation",
                "A video walking through all process steps and demoing your final prototype, plus shareable Figma links to all of your work.",
              ],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="shrink-0 w-8 h-8 rounded-full bg-[--pink]/10 border border-[--pink] text-[--pink] text-sm font-semibold flex items-center justify-center mt-1">
                  {i + 1}
                </span>
                <div>
                  <p className="text-white font-medium">{title}</p>
                  <p className="text-[--gray] text-sm leading-relaxed mt-1">
                    {desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Design Considerations ── */}
        <Section title="Design Considerations">
          <P>
            Keep these constraints in mind — your interface must work in a real
            space environment:
          </P>
          <BulletList
            items={[
              "Legibility in low light — astronauts may be in dimly lit cabin environments",
              "Glove-friendly touch targets — controls must be large enough to use with thick gloves",
              "Low-distraction interfaces — minimize cognitive load during high-stress mission phases",
              "Communication delay awareness — Earth comms can have delays of up to 20+ minutes",
              "Offline-first design — connectivity to Earth is not guaranteed",
            ]}
          />
        </Section>

        {/* ── Get Started ── */}
        <div className="p-12 flex flex-col gap-6 text-center">
          <h2 className="text-3xl font-semibold text-[--pink]">
            Get Started with Figma
          </h2>
          <p className="text-lg text-[--gray]">
            Sign up for free student access and start designing your astronaut
            app experience.
          </p>
          <a
            href="https://www.figma.com/education/"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto px-8 py-3 rounded-full bg-[--pink] text-white hover:scale-105 transition text-sm font-medium"
          >
            Activate Student Access →
          </a>
        </div>
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-lg text-[--gray] leading-relaxed">{children}</p>;
}

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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[--gray] text-base italic border-l-2 border-[--pink] pl-4 leading-relaxed">
      {children}
    </p>
  );
}
