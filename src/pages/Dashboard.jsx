import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  RiCodeSSlashLine,
  RiHistoryLine,
  RiArrowRightLine,
  RiGitPullRequestLine,
} from 'react-icons/ri';
import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';
import api from '../utils/api';
import { timeAgo, getError } from '../utils/helpers';
import Loader from '../components/Loader';

// Same fonts as the homepage. Move to index.css to avoid repeating.
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;600&display=swap');
.rv { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
.rv-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rv :focus-visible { outline: 3px solid #4B3FFF; outline-offset: 2px; }
`;

// Score colours that stay readable on a light background
const scoreTone = score =>
  score >= 80
    ? { fg: '#1F7A45', bg: '#E2F6E8' }
    : score >= 60
    ? { fg: '#8A5300', bg: '#FFF1CC' }
    : { fg: '#B3261E', bg: '#FDE8E6' };

const Stat = ({ label, value, note }) => (
  <div className="bg-white p-5 sm:p-6">
    <p className="text-sm text-[#5A6078]">{label}</p>
    <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{value ?? '-'}</p>
    {note && <p className="mt-1 text-xs text-[#5A6078]">{note}</p>}
  </div>
);

export default function DashboardPage() {
  const { user } = useAuth();
  const reduce = useReducedMotion();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/reviews/stats');
        setStats(data.data);
      } catch (err) {
        toast.error(getError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader fullscreen />;

  const recent = stats?.recentReviews || [];
  const languages = stats?.languageBreakdown || [];
  const total = stats?.totalReviews || 0;

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <style>{FONT_CSS}</style>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        {/* HEADER */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-3 max-w-xl text-[#4A5068]">
              {recent.length
                ? 'Here is where your recent reviews stand.'
                : 'Paste a file to get your first review.'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/review"
              className="flex items-center gap-2 rounded-xl bg-[#4B3FFF] px-6 py-3 font-semibold text-white hover:bg-[#3A2FE0]"
            >
              <RiGitPullRequestLine size={18} />
              New review
            </Link>
            <Link
              to="/dashboard/history"
              className="flex items-center gap-2 rounded-xl border border-[#BFC5D6] px-5 py-3 font-semibold hover:bg-white"
            >
              <RiHistoryLine size={18} />
              History
            </Link>
          </div>
        </div>

        {/* STATS: one strip instead of four separate cards */}
        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#D9DDE8] bg-[#D9DDE8] lg:grid-cols-4">
          <Stat label="Total reviews" value={stats?.totalReviews} />
          <Stat label="Saved reviews" value={stats?.savedReviews} />
          <Stat label="Average score" value={`${stats?.avgScore || 0}/100`} />
          <Stat label="Latest reviews" value={recent.length} note="Shown below" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          {/* RECENT REVIEWS: laid out like a pull request list */}
          <section className="overflow-hidden rounded-2xl border border-[#D9DDE8] bg-white">
            <div className="flex items-center justify-between border-b border-[#D9DDE8] bg-[#F8F9FC] px-5 py-4">
              <h2 className="text-lg font-bold">Recent reviews</h2>
              <Link
                to="/history"
                className="flex items-center gap-1 text-sm font-semibold text-[#4B3FFF] hover:underline"
              >
                View all <RiArrowRightLine />
              </Link>
            </div>

            {!recent.length ? (
              <div className="px-6 py-16 text-center">
                <RiCodeSSlashLine size={40} className="mx-auto text-[#8A90A6]" />
                <h3 className="mt-4 text-xl font-bold">No reviews yet</h3>
                <p className="mt-2 text-[#4A5068]">Paste a file and Revynix AI will review it.</p>
                <Link
                  to="/review"
                  className="mt-6 inline-block rounded-xl bg-[#4B3FFF] px-6 py-3 font-semibold text-white hover:bg-[#3A2FE0]"
                >
                  Start your first review
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-[#E6E9F2]">
                {recent.map(review => {
                  const tone = scoreTone(review.score);
                  return (
                    <li key={review._id}>
                      <Link
                        to={`/review/${review._id}`}
                        className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#F8F9FC]"
                      >
                        <div className="flex min-w-0 items-center gap-4">
                          <RiGitPullRequestLine size={20} className="shrink-0 text-[#4B3FFF]" />
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{review.title}</p>
                            <p className="mt-0.5 text-sm text-[#5A6078]">
                              <span className="rv-code">{review.language}</span>
                              {' · '}
                              {timeAgo(review.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span
                          className="rv-code shrink-0 rounded-md px-2.5 py-1 text-sm font-semibold"
                          style={{ color: tone.fg, background: tone.bg }}
                          title="Review score out of 100"
                        >
                          {review.score}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* LANGUAGES */}
          <section className="h-fit rounded-2xl border border-[#D9DDE8] bg-white p-5">
            <h2 className="text-lg font-bold">Languages you review</h2>
            {languages.length ? (
              <ul className="mt-5 space-y-4">
                {languages.map(lang => {
                  const pct = total ? Math.round((lang.count / total) * 100) : 0;
                  return (
                    <li key={lang._id}>
                      <div className="mb-1.5 flex justify-between text-sm">
                        <span className="rv-code capitalize">{lang._id}</span>
                        <span className="text-[#5A6078]">
                          {lang.count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#E6E9F2]">
                        <motion.div
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full bg-[#4B3FFF]"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[#4A5068]">
                Your language breakdown shows up after your first review.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}