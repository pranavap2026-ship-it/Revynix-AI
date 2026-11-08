import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  RiBugLine,
  RiShieldCheckLine,
  RiSpeedLine,
  RiCodeSSlashLine,
  RiLineChartLine,
  RiUserSettingsLine,
  RiGitPullRequestLine,
} from 'react-icons/ri';

import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

// Fonts: Bricolage Grotesque for text, JetBrains Mono for code only.
// (If you prefer, move this @import into index.css.)
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;600&display=swap');
.rv { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
.rv-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rv :focus-visible { outline: 3px solid #4B3FFF; outline-offset: 2px; }
`;

// ---------- DATA ----------

const DIFF = [
  { t: 'ctx', n: 12, c: "app.post('/register', async (req, res) => {" },
  { t: 'del', n: 13, c: '  user.password = req.body.password;' },
  { t: 'add', n: 13, c: '  user.password = await bcrypt.hash(req.body.password, 10);' },
  { t: 'ctx', n: 14, c: "  const token = jwt.sign({ id: user._id }, 'secret123');" },
  { t: 'ctx', n: 15, c: '  res.json({ token });' },
];

// comments appear under the diff line at that index
const NOTES = {
  1: { tag: 'Security', color: '#B3261E', text: 'This saves the password as plain text. Anyone with database access can read it.' },
  2: { tag: 'Fix applied', color: '#1F7A45', text: 'Hashed with bcrypt before saving.' },
  3: { tag: 'Bug risk', color: '#9A5B00', text: 'The JWT secret is written in the code. Read it from process.env instead.' },
};

const CHECKS = [
  {
    id: 'bugs', label: 'Bugs', icon: RiBugLine, tone: '#B3261E',
    title: 'Crashes caught before they ship',
    before: 'const city = user.address.city;',
    after: "const city = user.address?.city ?? 'Unknown';",
    note: 'New accounts have no address, so this line throws.',
  },
  {
    id: 'security', label: 'Security', icon: RiShieldCheckLine, tone: '#9A5B00',
    title: 'Unsafe patterns, explained',
    before: 'db.query("SELECT * FROM users WHERE id=" + id);',
    after: "db.query('SELECT * FROM users WHERE id = $1', [id]);",
    note: 'User input goes straight into the query. That allows SQL injection.',
  },
  {
    id: 'performance', label: 'Performance', icon: RiSpeedLine, tone: '#0B6BCB',
    title: 'Slow code, sped up',
    before: 'for (const id of ids) { await fetchPrice(id); }',
    after: 'await Promise.all(ids.map(fetchPrice));',
    note: 'Each request waits for the one before it. Run them together.',
  },
  {
    id: 'refactor', label: 'Refactor', icon: RiCodeSSlashLine, tone: '#4B3FFF',
    title: 'Cleaner code you can paste in',
    before: "if (u.role === 'a' || u.role === 'b' || u.role === 'c')",
    after: 'if (EDITOR_ROLES.includes(u.role))',
    note: 'The same check appears in four files. Name it once.',
  },
];

// ---------- SMALL PIECES ----------

function DiffLine({ line, note, delay, reduce }) {
  const bg = line.t === 'add' ? 'bg-[#E2F6E8]' : line.t === 'del' ? 'bg-[#FDE8E6]' : 'bg-white';
  const sign = line.t === 'add' ? '+' : line.t === 'del' ? '-' : ' ';
  return (
    <>
      <div className={`rv-code flex text-[13px] leading-7 ${bg}`}>
        <span className="w-10 shrink-0 select-none pr-3 text-right text-[#8A90A6]">{line.n}</span>
        <span className="w-4 shrink-0 select-none text-[#5A6078]">{sign}</span>
        <span className="whitespace-pre pr-4 text-[#14182B]">{line.c}</span>
      </div>
      {note && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduce ? 0 : delay, duration: 0.4 }}
          className="mx-3 my-2 rounded-lg border border-[#E8CF73] bg-[#FFF6D6] p-3 text-sm text-[#14182B] sm:ml-14"
        >
          <span
            className="mr-2 inline-block rounded px-2 py-0.5 text-xs font-semibold text-white"
            style={{ background: note.color }}
          >
            {note.tag}
          </span>
          {note.text}
        </motion.div>
      )}
    </>
  );
}

function CodeSwap({ check }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#D9DDE8] bg-white">
      <div className="overflow-x-auto">
        <div className="rv-code min-w-max bg-[#FDE8E6] px-4 py-2 text-[13px] text-[#14182B]">
          <span className="mr-3 text-[#5A6078]">-</span>{check.before}
        </div>
        <div className="rv-code min-w-max bg-[#E2F6E8] px-4 py-2 text-[13px] text-[#14182B]">
          <span className="mr-3 text-[#5A6078]">+</span>{check.after}
        </div>
      </div>
      <p className="border-t border-[#E8CF73] bg-[#FFF6D6] px-4 py-3 text-sm text-[#14182B]">
        {check.note}
      </p>
    </div>
  );
}

// ---------- PAGE ----------

export default function HomePage() {
  const { user } = useAuth();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(CHECKS[0].id);
  const check = CHECKS.find(c => c.id === active);

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <style>{FONT_CSS}</style>

      {/* TOP BAR (all screen sizes) */}
      <header className="sticky top-0 z-50 border-b border-[#D9DDE8] bg-[#F3F5F9]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <RiGitPullRequestLine className="text-[#4B3FFF]" size={22} />
            Revynix AI
          </Link>
          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link
              to={user ? '/dashboard' : '/login'}
              className="rounded-lg px-3 py-2 hover:bg-[#E6E9F2]"
            >
              {user ? 'Dashboard' : 'Log in'}
            </Link>
            <Link
              to={user ? '/review' : '/register'}
              className="rounded-lg bg-[#4B3FFF] px-4 py-2 text-white hover:bg-[#3A2FE0]"
            >
              {user ? 'New review' : 'Sign up'}
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO: the page opens as a real review */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 sm:pt-20">
        <div className="max-w-3xl">
          <h1 className="text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            A code reviewer that reads every line, every time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4A5068]">
            Paste your code. Revynix AI points out bugs, security holes and slow spots,
            and shows you the fix right next to the line.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={user ? '/review' : '/register'}
              className="rounded-xl bg-[#4B3FFF] px-7 py-3.5 text-center font-semibold text-white hover:bg-[#3A2FE0]"
            >
              Review my code
            </Link>
            <Link
              to="/review"
              className="rounded-xl border border-[#BFC5D6] px-7 py-3.5 text-center font-semibold hover:bg-white"
            >
              Try the demo
            </Link>
          </div>
        </div>

        {/* The one memorable moment: review comments land on the diff */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white shadow-[0_20px_50px_-30px_rgba(20,24,43,0.35)]">
          <div className="flex items-center justify-between border-b border-[#D9DDE8] bg-[#F8F9FC] px-4 py-3 text-sm">
            <span className="rv-code font-semibold">routes/auth.js</span>
            <span className="text-[#5A6078]">3 comments from Revynix AI</span>
          </div>
          <div className="overflow-x-auto py-2">
            <div className="min-w-[34rem]">
              {DIFF.map((line, i) => (
                <DiffLine
                  key={i}
                  line={line}
                  note={NOTES[i]}
                  delay={0.9 + i * 0.9}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT CHECKS: tabs the visitor can click */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          Four kinds of problems it looks for
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr]">
          <div role="tablist" aria-label="Review checks" className="flex gap-2 overflow-x-auto lg:flex-col">
            {CHECKS.map(c => {
              const Icon = c.icon;
              const on = c.id === active;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left font-semibold transition-colors ${
                    on ? 'border-[#14182B] bg-[#14182B] text-white' : 'border-[#D9DDE8] bg-white hover:border-[#14182B]'
                  }`}
                >
                  <Icon size={20} style={{ color: on ? '#fff' : c.tone }} />
                  {c.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={check.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            role="tabpanel"
          >
            <h3 className="mb-4 text-2xl font-bold">{check.title}</h3>
            <CodeSwap check={check} />
          </motion.div>
        </div>
      </section>

      {/* AFTER THE REVIEW */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#D9DDE8] bg-[#D9DDE8] md:grid-cols-2">
          <div className="bg-white p-7">
            <RiLineChartLine size={26} className="text-[#4B3FFF]" />
            <h3 className="mt-4 text-xl font-bold">Your review history</h3>
            <p className="mt-2 leading-relaxed text-[#4A5068]">
              Every review is saved with its score and language, so you can see whether
              your code is getting better over time.
            </p>
          </div>
          <div className="bg-white p-7">
            <RiUserSettingsLine size={26} className="text-[#4B3FFF]" />
            <h3 className="mt-4 text-xl font-bold">Admin tools for teams</h3>
            <p className="mt-2 leading-relaxed text-[#4A5068]">
              Manage users and roles, look through reviews and handle reports from one place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#14182B] p-8 text-white sm:p-14">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Open your first review in under a minute.
          </h2>
          <p className="mt-4 max-w-lg text-[#B8BED3]">
            Create a free account, paste a file and read what Revynix AI finds.
          </p>
          <Link
            to={user ? '/review' : '/register'}
            className="mt-8 inline-block rounded-xl bg-white px-7 py-3.5 font-semibold text-[#14182B] hover:bg-[#E6E9F2]"
          >
            {user ? 'Start a review' : 'Create free account'}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}