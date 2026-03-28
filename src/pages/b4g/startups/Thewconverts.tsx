import Link from "next/link";

/* ─────────────────────────────────────────
   Thewconverts LLC — Startup Brief Page
   Brand: Black / White / Grey, Minimal, Premium, Bold
───────────────────────────────────────── */

export default function Thewconverts() {
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
        <div className="p-12 flex flex-col gap-6">
          <span className="text-[--pink] font-mono text-xs tracking-[0.2em] uppercase">
            Startup Brief — AggieX Challenge
          </span>

          <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
            <img
              src="/b4g/thewconverts/Logo.png"
              alt="Thewconverts Logo"
              className="w-full rounded-[10px]"
            />
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold text-white">
            Thewconverts LLC
          </h1>
          <p className="text-xl text-[--gray]">
            Your #1 source for OEM Parts, Upgrades, Conversion Kits & More!
          </p>
          <div className="flex flex-wrap gap-3">
            {["Professional", "Bold", "Minimal", "Innovative", "Premium"].map(
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
        </div>

        {/* ── About ── */}
        <Section title="About the Business">
          <P>
            Thewconverts LLC provides OEM parts and factory-style upgrades for
            truck owners who want to transform their vehicle's appearance and
            features without sacrificing reliability or fitment. Services are
            ideal for enthusiasts building a head-turning show truck as well as
            everyday drivers looking to elevate their ride.
          </P>
          <P>
            Single-cab trucks are rarely offered in higher trim levels, leaving
            owners with limited options for personalization and premium
            features. Thewconverts solves this by providing OEM upgrades and
            conversion kits using genuine factory parts — allowing owners to add
            high-end styling and functionality the manufacturer never offered on
            these models.
          </P>
        </Section>

        {/* ── Mission & Vision ── */}
        <div className="grid md:grid-cols-2 gap-6 p-12">
          <InfoCard title="Mission">
            To transform ordinary trucks into exceptional builds by delivering
            authentic OEM upgrades that look, fit, and perform exactly as the
            factory intended — providing enthusiasts and everyday drivers a
            trusted path to premium features, bold styling, and higher value
            while keeping their original truck.
          </InfoCard>
          <InfoCard title="Vision">
            To become the go-to destination for OEM truck upgrades and full
            factory-style conversions, setting the standard for quality,
            authenticity, and innovation in the aftermarket industry — making
            fully loaded, head-turning builds accessible to enthusiasts
            everywhere.
          </InfoCard>
        </div>

        {/* ── Target Audience ── */}
        <Section title="Target Audience">
          <BulletList
            items={[
              "Ages 18–40",
              "Business Owners or Blue Collar Workers",
              "Car & Truck Enthusiasts",
              "Single-cab and base-model truck owners seeking premium upgrades",
            ]}
          />
        </Section>

        {/* ── Key Features / Why Us ── */}
        <Section title="Key Differentiators">
          <BulletList
            items={[
              "Genuine OEM Parts Only — factory-original components ensuring perfect fitment, durability, and long-term reliability",
              "Factory-Style Fit & Finish — every upgrade looks like it came straight from the assembly line",
              "Complete Conversion Solutions — from single parts to full high-trim transformations",
              "Built for Enthusiasts & Daily Drivers — style and functionality for show builds and everyday rides",
              "Expert Platform Knowledge — specialized experience ensuring compatibility and proper functionality",
            ]}
          />
        </Section>

        {/* ── Products ── */}
        <Section title="Products & Services">
          <P>
            Pricing depends on the conversion the customer wants — DIY or
            installed by the team.
          </P>
          <BulletList
            items={[
              "Conversion Kits",
              "Genuine OEM Parts",
              "Plug-and-Play Harness Solutions",
              "Full factory-style high-trim transformations",
            ]}
          />
          <Callout>
            Product page should be easily modified after launch so new products,
            harnesses, and conversion kits can be added as stock arrives.
            Include a few dummy listings based on product examples.
          </Callout>
        </Section>

        {/* ── How It Works ── */}
        <Section title="How It Works">
          <ol className="flex flex-col gap-4">
            {[
              [
                "Choose your upgrade goal",
                "Tell us what you want to change — higher-trim look, lighting upgrade, interior swap, tech upgrades, or a full conversion.",
              ],
              [
                "Verify fitment & build your plan",
                "Confirm your truck's year/trim/options and match with the correct OEM parts, conversion kit, and harness so everything is compatible.",
              ],
              [
                "Source genuine OEM components",
                "Receive factory-original parts selected for your exact build, plus any necessary brackets, trim pieces, and supporting hardware.",
              ],
              [
                "Plug-and-play harnesses simplify the install",
                "If wiring is involved, a plug-and-play harness solution connects cleanly and keeps the install looking factory.",
              ],
              [
                "Install your kit",
                "DIY or have the team install it. The kit is organized to make installation straightforward and minimize downtime.",
              ],
              [
                "Confirm operation & enjoy",
                "After installation, a clean OEM fit and finish with the features and look you wanted — without buying a new truck.",
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

        {/* ── Founder ── */}
        <Section title="The Team">
          <FounderCard
            name="Matthew Garza"
            role="Founder & CEO"
            email="matt81503@gmail.com"
            bio="A truck enthusiast and hands-on builder with a deep understanding of OEM platforms and factory upgrade pathways. After experiencing firsthand how limited base-model and single-cab trucks are from the factory, he began sourcing genuine OEM parts and developing reliable conversion solutions to achieve high-trim features without buying a new vehicle."
          />
        </Section>

        {/* ── Brand Guidelines ── */}
        <Section title="Brand Guidelines">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">Color Palette</p>
              <div className="flex gap-3">
                {[
                  { name: "Black", hex: "#000000", text: "white" },
                  { name: "White", hex: "#FFFFFF", text: "black" },
                  { name: "Grey", hex: "#888888", text: "white" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-14 h-14 rounded-xl border border-white/10"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[--gray] text-xs">{c.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-[--gray] text-sm">
                Black, White & Grey — very minimalistic. Optional pop color for
                flair.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">Typography</p>
              <p className="text-[--gray] text-sm">
                No font preference — minimalistic and clean. Avoid decorative or
                script fonts.
              </p>
              <p className="text-white font-medium mt-2">Desired Feel</p>
              <p className="text-[--gray] text-sm">
                Professional, Bold, Minimal, Innovative, Premium
              </p>
            </div>
          </div>
        </Section>

        {/* ── Pages ── */}
        <Section title="Pages to Build">
          <BulletList items={["Home", "About", "Product / Shop"]} />
        </Section>

        {/* ── Features Requested ── */}
        <Section title="Requested Features">
          <BulletList
            items={[
              "Email capture form",
              "Contact form",
              "FAQ section",
              "Animations",
              "Dark mode",
              "Customer Builds gallery (pulled from Instagram)",
            ]}
          />
        </Section>

        {/* ── Suggested CTA ── */}
        <Section title="Primary Call-to-Actions">
          <BulletList
            items={[
              "Purchase",
              "Follow on social (Instagram / TikTok @thewconverts)",
              "Check out Work & Book Appointments",
            ]}
          />
          <Callout>
            Headline: "Your #1 Source for OEM Parts & Factory-Style Conversion
            Kits" — Upgrade your truck with genuine OEM parts and factory-style
            conversion kits designed for perfect fit, full functionality, and a
            clean, high-end finish.
          </Callout>
        </Section>

        {/* ── Inspiration ── */}
        <Section title="Design Inspiration Sites">
          <div className="flex flex-col gap-2">
            {[
              "https://midnightoem.com",
              "https://www.revampedcustoms.com",
              "https://coyotestruckparts.com",
              "https://www.built2specplus.com",
            ].map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[--pink] hover:underline text-sm break-all"
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
                Matthew's Email:{" "}
                <a
                  href="mailto:matt81503@gmail.com"
                  className="text-[--pink] hover:underline"
                  target="_blank"
                >
                  matt81503@gmail.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/thewconverts"
                  className="text-[--pink] hover:underline"
                  target="_blank"
                >
                  @thewconverts
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3 text-lg text-[--gray]">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
              <span>
                TikTok:{" "}
                <Link
                  href="https://www.tiktok.com/@thewconverts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[--pink] hover:underline"
                >
                  @thewconverts
                </Link>
              </span>
            </li>
          </ul>
        </Section>

        {/* ── Legal & Disclaimers ── */}
        <Section title="Legal & Disclaimers">
          <p className="text-[--gray] text-sm leading-relaxed">
            The following disclaimers should be included in the website footer
            or a dedicated legal/terms page.
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                title: "Fitment & Compatibility",
                body: "Compatibility depends on the customer's specific vehicle configuration. Buyers must verify fitment before purchase. We are not responsible if a part does not work due to undocumented factory options or prior modifications.",
              },
              {
                title: "Installation & Use",
                body: "Professional installation is recommended. We are not responsible for damage, injury, or malfunctions resulting from improper installation or misuse of our products.",
              },
              {
                title: "No Manufacturer Affiliation",
                body: "Thewconverts LLC is not affiliated with, endorsed by, or sponsored by Ford or any other vehicle manufacturer. All manufacturer names and trademarks are used for identification purposes only.",
              },
              {
                title: "Warranty",
                body: "All parts are inspected and tested prior to shipment. Items that arrive defective or non-functional are eligible for warranty consideration. Proof of failure may be required. Warranty does not cover damage caused by improper installation, misuse, modification, or failure to follow provided instructions. Professional installation is strongly recommended for complex components. Except for verified defective items, all sales are final and non-returnable.",
              },
              {
                title: "Limitation of Liability",
                body: "To the fullest extent permitted by law, Thewconverts LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of, inability to use, or installation of our products — including but not limited to loss of use, loss of income, vehicle downtime, property damage, or personal injury. Our total liability shall not exceed the original purchase price of the product in question.",
              },
              {
                title: "Programming & Electronic Modifications",
                body: "Some upgrades for modern trucks may require programming, calibration, or additional modules. These are not included unless explicitly specified in the product listing.",
              },
              {
                title: "Confidentiality & Privacy",
                body: "We do not publicly disclose sensitive business information including supplier identities, sourcing channels, wholesale pricing, proprietary processes, or custom harness designs. All customer information — including personal details, VINs, addresses, and payment data — is used solely for order fulfillment and support, and will not be shared without consent except as required by law.",
              },
            ].map((d) => (
              <div
                key={d.title}
                className="border border-white/10 rounded-2xl p-6 flex flex-col gap-2"
              >
                <p className="text-white font-medium">{d.title}</p>
                <p className="text-[--gray] text-sm leading-relaxed">
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Brand Images ── */}
        <Section title="Brand Images">
          <p className="text-lg text-[--gray]">
            Placeholder images for the build. Replace these with real brand
            assets provided by the startup. Click any image to download.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Product Image 1.jpeg", w: 4284, h: 5712 },
              { label: "Product Image 2.jpeg", w: 4284, h: 5712 },
              { label: "Product Image 3.jpeg", w: 4284, h: 5712 },
              { label: "Product Image 4.jpeg", w: 4284, h: 5712 },
              { label: "Product Image 5.jpeg", w: 4284, h: 5712 },
              { label: "Logo.png", w: 500, h: 500 },
            ].map((img) => (
              <a
                key={img.label}
                href={`/b4g/thewconverts/${img.label.replace(/ /g, "-")}`}
                download={`/b4g/thewconverts/${img.label.replace(/ /g, "-")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 hover:border-[--pink] transition duration-300"
              >
                <div className="relative w-full aspect-video bg-white/5 overflow-hidden rounded-t-2xl">
                  <img
                    src={`/b4g/thewconverts/${img.label.replace(/ /g, "-")}`}
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
    <div className="border border-white/10 rounded-2xl p-10 flex flex-col gap-4">
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
          <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[--pink] shrink-0" />
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
  email: string | null;
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
        <p className="text-[--pink] text-sm mb-2" hidden={!email}>
          Email:{" "}
          <a className="hover:underline" href={`mailto:${email}`}>
            {email}
          </a>
        </p>
      </div>
    </div>
  );
}
