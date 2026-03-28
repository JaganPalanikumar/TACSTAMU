import Link from "next/link";

/* ─────────────────────────────────────────
   PokerBot Challenge Page
   Styling matches B4G2026 dashboard
───────────────────────────────────────── */

export default function PokerBot() {
  return (
    <div className="min-h-screen px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* ── Back ── */}
        <Link
          href="/b4g/Challenges?tab=poker-bot"
          className="w-fit text-[--pink] text-sm hover:underline flex items-center gap-1"
        >
          ← Back to Challenges
        </Link>

        {/* ── Header ── */}
        <div className="rounded-[3rem] p-12 flex flex-col gap-4">
          <span className="text-[--pink] font-mono text-xs tracking-[0.2em] uppercase">
            Build4Good 2026 — Challenge Brief
          </span>
          <h1 className="text-5xl md:text-6xl font-semibold text-white">
            PokerBots
          </h1>
          <p className="text-xl text-[--gray]">
            Build an autonomous poker bot in Python. Compete in a
            single-elimination tournament bracket.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              "Python only",
              "300 hands / match",
              "Single-elimination",
              "180s time limit",
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-1 rounded-full border border-[--pink] text-[--pink] text-sm"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-[--gray] text-sm pt-2">
            Sponsored by{" "}
            <span className="text-white font-medium">Jane Street</span> and{" "}
            <span className="text-white font-medium">Hudson River Trading</span>
          </p>
        </div>

        {/* ── Overview ── */}
        <Section title="Overview">
          <BulletList
            items={[
              "Two-player head-to-head poker competition",
              "All poker bots MUST be written in Python and strictly adhere to the provided API",
              "External Python libraries other than numpy, numba, cython, and pkrbot are NOT ALLOWED",
              "Each bot has a total time limit of 180 seconds per match",
              "Each match consists of 300 hands",
              "Team submissions compete in a single-elimination tournament bracket",
            ]}
          />
        </Section>

        <Section title="Github Repo">
          <a
            href="https://github.com/MontgomeryBohde/TACS-PokerBots-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[--pink] hover:underline transition"
          >
            https://github.com/MontgomeryBohde/TACS-PokerBots-2026
          </a>
        </Section>

        {/* ── Game Rules ── */}
        <Section title="Game Rules — Hold'em + Redraw">
          <P>
            This year's game is based on no-limit Texas Hold'em with one major
            twist: <span className="text-white font-medium">redraw</span>. Each
            player may redraw one card once per hand before the river.
          </P>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hand Structure */}
            <div className="flex flex-col gap-3 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-medium">Hand Structure</p>
              <ul className="flex flex-col gap-2">
                {[
                  ["Hole cards", "2 per player"],
                  ["Flop", "3 community cards"],
                  ["Turn", "1 community card"],
                  ["River", "1 community card"],
                  ["Small / Big blind", "1 / 2 chips"],
                  ["Starting chips", "400 per hand"],
                ].map(([k, v]) => (
                  <li key={k} className="flex justify-between text-sm">
                    <span className="text-[--gray]">{k}</span>
                    <span className="text-white font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Streets */}
            <div className="flex flex-col gap-3 border border-white/10 rounded-2xl p-6">
              <p className="text-white font-medium">Street IDs</p>
              <ul className="flex flex-col gap-2">
                {[
                  ["0", "Preflop"],
                  ["3", "Flop betting"],
                  ["4", "Turn betting"],
                  ["5", "River betting"],
                ].map(([id, label]) => (
                  <li key={id} className="flex items-center gap-3 text-sm">
                    <span className="w-8 h-8 rounded-full bg-[--pink]/10 border border-[--pink] text-[--pink] font-mono text-xs flex items-center justify-center shrink-0">
                      {id}
                    </span>
                    <span className="text-[--gray]">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Redraw Rules */}
          <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-white font-medium">Redraw Rules</p>
            <BulletList
              items={[
                "Each player may redraw once per hand, only before the river (street < 5)",
                "Redraw one of your hole cards (hole, index 0 or 1), OR one revealed board card (board, index depends on street)",
                "Redraw is combined with a betting action in a single move: check / call / raise / fold + redraw in one response",
                "The redrawn card is revealed to the opponent after the swap",
              ]}
            />
          </div>

          <Callout>
            Chips do not persist between hands — every hand starts with 400
            chips regardless of prior results. Net chip wins/losses across 300
            hands determine the match winner.
          </Callout>
        </Section>

        {/* ── Repository Layout ── */}
        <Section title="Repository Layout">
          <div className="flex flex-col gap-3">
            {[
              [
                "engine.py",
                "Core game engine and socket protocol implementation",
              ],
              ["config.py", "Local head-to-head match configuration"],
              [
                "python_skeleton/",
                "Reference bot scaffold — your code goes here",
              ],
              ["tournament.py", "Single-elimination tournament runner"],
              ["run_tournament.py", "Tournament entrypoint script"],
              [
                "tournament_config.json",
                "Tournament configuration and team list",
              ],
              ["results_directory/", "Tournament output JSON / log artifacts"],
              ["tests/", "Automated backend test suite"],
            ].map(([file, desc]) => (
              <div
                key={file}
                className="flex items-start gap-4 border border-white/10 rounded-xl p-4"
              >
                <code className="text-[--pink] text-sm font-mono shrink-0 mt-0.5">
                  {file}
                </code>
                <p className="text-[--gray] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Getting Started ── */}
        <Section title="Getting Started">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">
                1. Create environment & install dependencies
              </p>
              <CodeBlock>{`# Option A — venv
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# Option B — conda
conda create -y -n pkr python=3.10
conda activate pkr
pip install -r requirements.txt`}</CodeBlock>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-white font-medium">2. Run a local match</p>
              <CodeBlock>{`python3 engine.py`}</CodeBlock>
              <p className="text-[--gray] text-sm">
                Configure player paths and match parameters in{" "}
                <code className="text-[--pink] font-mono">config.py</code>. Two
                example strategies are included:{" "}
                <code className="text-[--pink] font-mono">all_in_bot/</code> and{" "}
                <code className="text-[--pink] font-mono">check_call_bot/</code>
                . At minimum your bot should beat both.
              </p>
            </div>
          </div>
        </Section>

        {/* ── Building Your Bot ── */}
        <Section title="Building Your Bot">
          <P>
            Each bot lives in its own directory and must include the following
            files:
          </P>
          <BulletList
            items={[
              "player.py — your strategy implementation",
              "commands.json — how to run your bot process",
              "skeleton/ — copied from python_skeleton/skeleton/",
            ]}
          />

          <div className="flex flex-col gap-3">
            <p className="text-white font-medium">commands.json format</p>
            <CodeBlock>{`{
  "build": [],
  "run": ["python3", "player.py"]
}`}</CodeBlock>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white font-medium">
              Implement these methods in your{" "}
              <code className="text-[--pink] font-mono">Player</code> class
            </p>
            <div className="flex flex-col gap-3">
              {[
                [
                  "handle_new_round(game_state, round_state, active)",
                  "Called at the start of each new hand. Use this to initialize per-hand state.",
                ],
                [
                  "handle_round_over(game_state, terminal_state, active)",
                  "Called at the end of each hand. Use this to track results and update strategy.",
                ],
                [
                  "get_action(game_state, round_state, active)",
                  "Called every time your bot must act. Must return a valid action. Always validate with round_state.legal_actions() before returning.",
                ],
              ].map(([sig, desc]) => (
                <div
                  key={sig}
                  className="border border-white/10 rounded-xl p-5 flex flex-col gap-2"
                >
                  <code className="text-[--pink] text-sm font-mono break-all">
                    {sig}
                  </code>
                  <p className="text-[--gray] text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Actions API ── */}
        <Section title="Actions API">
          <P>
            Available actions are defined in{" "}
            <code className="text-[--pink] font-mono">
              python_skeleton/skeleton/actions.py
            </code>
            :
          </P>
          <div className="flex flex-col gap-3">
            {[
              ["FoldAction()", "Fold your hand and forfeit the round."],
              ["CallAction()", "Call the current bet."],
              [
                "CheckAction()",
                "Check (only valid when no bet is outstanding).",
              ],
              ["RaiseAction(amount)", "Raise to the specified amount."],
              [
                "RedrawAction(target_type, target_index, action)",
                "Redraw a card and embed a betting action. target_type is 'hole' or 'board'. target_index is hole index (0–1) or board index (0–4, street-dependent). action is the embedded betting action.",
              ],
            ].map(([sig, desc]) => (
              <div
                key={sig}
                className="border border-white/10 rounded-xl p-5 flex flex-col gap-2"
              >
                <code className="text-[--pink] text-sm font-mono">{sig}</code>
                <p className="text-[--gray] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── What to Submit ── */}
        <Section title="What to Submit">
          <P>
            Fill in your poker bot strategy in{" "}
            <code className="text-[--pink] font-mono">
              python_skeleton/skeleton/bot.py
            </code>
            . At a minimum, implement the three required methods in the{" "}
            <code className="text-[--pink] font-mono">Bot</code> class.
          </P>
          <div className="border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
            <p className="text-white font-medium">Submission rules</p>
            <BulletList
              items={[
                "Submit a .zip file of the entire python_skeleton/ folder",
                "DO NOT change the method signatures in the Bot class",
                "DO NOT modify any existing files in the python_skeleton/ folder",
                "You may add new files as needed",
                "Only numpy, numba, cython, and pkrbot are permitted as external libraries",
              ]}
            />
          </div>
          <Callout>
            Your bot will be run against other teams' bots in a
            single-elimination bracket. Each matchup simulates thousands of
            games in parallel — the bot with the higher net chip count across
            300 hands advances.
          </Callout>
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
    <div className="rounded-[3rem] p-12 flex flex-col gap-6">
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

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-black/30 border border-white/10 rounded-xl p-5 text-sm font-mono text-[--gray] overflow-x-auto leading-relaxed whitespace-pre">
      {children}
    </pre>
  );
}
