import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  RiCodeSSlashLine,
  RiHistoryLine,
  RiBookmarkLine,
  RiBarChartLine,
  RiArrowRightLine,
  RiBugLine,
  RiShieldLine,
  RiSparklingLine,
  RiFireLine,
  RiFlashlightLine,
  RiLineChartLine,
  RiRocketLine,
} from 'react-icons/ri';

import useAuth from '../hooks/useAuth';

import api from '../utils/api';

import {
  timeAgo,
  scoreColor,
  scoreColorClass,
  getError,
} from '../utils/helpers';

import Loader from '../components/Loader';

import toast from 'react-hot-toast';

// ========================================
// STAT CARD
// ========================================

const StatCard = ({
  icon: Icon,
  label,
  value,
  sub,
  color,
  delay = 0,
}) => (

  <motion.div

    initial={{
      opacity: 0,
      y: 20,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      delay,
    }}

    whileHover={{
      y: -5,
      scale: 1.02,
    }}

    className="
      relative overflow-hidden
      rounded-3xl
      border border-white/5
      bg-zinc-950/80
      backdrop-blur-xl
      p-4 sm:p-6
      shadow-2xl
    "
  >

    <div
      className="
        absolute inset-0 opacity-10
      "
      style={{
        background: `radial-gradient(circle at top right, ${color}, transparent 60%)`,
      }}
    />

    <div className="relative z-10">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-zinc-500 text-sm">
            {label}
          </p>

          <h2
            className="
              text-3xl sm:text-4xl font-black
              mt-3 text-white
            "
          >
            {value ?? '—'}
          </h2>

          {sub && (
            <p className="text-xs text-zinc-400 mt-2">
              {sub}
            </p>
          )}

        </div>

        <div
          className="
            w-12 h-12 sm:w-14 sm:h-14 rounded-2xl
            flex items-center justify-center
          "
          style={{
            background: `${color}20`,
            border: `1px solid ${color}30`,
          }}
        >

          <Icon
            size={26}
            style={{
              color,
            }}
          />

        </div>

      </div>

    </div>

  </motion.div>
);

// ========================================
// DASHBOARD
// ========================================

export default function DashboardPage() {

  const { user } =
    useAuth();

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ========================================
  // FETCH DATA
  // ========================================

  useEffect(() => {

    const fetchStats =
      async () => {

        try {

          setLoading(true);

          const { data } =
            await api.get(
              '/reviews/stats'
            );

          setStats(data.data);

        } catch (err) {

          toast.error(
            getError(err)
          );

        } finally {

          setLoading(false);

        }
      };

    fetchStats();

  }, []);

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (
      <Loader fullscreen />
    );
  }

  // ========================================
  // STREAK
  // ========================================

  const streak =
    stats?.recentReviews
      ?.length || 0;

  // ========================================
  // UI
  // ========================================

  return (

   <div
  className="
    max-w-7xl mx-auto
    overflow-x-hidden
    px-3 sm:px-4 md:px-6
    py-5 sm:py-8
    text-white
  "
>

      {/* ======================================== */}
      {/* HEADER */}
      {/* ======================================== */}

      <motion.div

        initial={{
          opacity: 0,
          y: -20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="mb-10"
      >

        <div
          className="
            rounded-[2rem]
            overflow-hidden
            border border-white/5
            bg-zinc-950/80
            backdrop-blur-xl
            p-5 sm:p-7 lg:p-10
            relative
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute inset-0 opacity-20
            "
            style={{
              background:
                'radial-gradient(circle at top right, #06b6d4, transparent 35%), radial-gradient(circle at bottom left, #7c3aed, transparent 35%)',
            }}
          />

          <div
            className="
              relative z-10
             flex flex-col lg:flex-row
lg:items-center
justify-between
gap-6 lg:gap-8
            "
          >

            <div>

              <div
                className="
                  inline-flex items-center gap-2
                  px-4 py-2 rounded-full
                  bg-cyan-500/10
                  border border-cyan-500/20
                  text-cyan-300
                  text-sm font-medium
                  mb-5
                "
              >

                <RiSparklingLine />

                Revynix AI Dashboard

              </div>

              <h1
                className="
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                  font-black
                  leading-tight
                "
              >

                Welcome back,

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-cyan-400
                    to-violet-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  {user?.name}
                </span>

              </h1>

              <p
                className="
                  text-zinc-400
                  mt-4
                  max-w-2xl
                  leading-6 sm:leading-8
                "
              >

                Analyze, optimize, and improve your code with AI-powered reviews, security analysis, and intelligent refactoring.

              </p>

            </div>

            {/* ACTIONS */}

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">

              <Link
                to="/review"
                className="
                  px-6 py-4 rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  to-cyan-500
                  text-white font-semibold
                  flex items-center gap-2
                  hover:scale-105
                  transition-all
                "
              >

                <RiRocketLine />

                New Review

              </Link>

              <Link
                to="/dashboard/history"
                className="
                  px-6 py-4 rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  font-semibold
                  flex items-center gap-2
                  hover:bg-white/[0.06]
                  transition-all
                "
              >

                <RiHistoryLine />

                History

              </Link>

            </div>

          </div>

        </div>

      </motion.div>

      {/* ======================================== */}
      {/* STATS */}
      {/* ======================================== */}

      <div
        className="
          grid grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-4 sm:gap-5
mb-8 sm:mb-10
        "
      >

        <StatCard
          icon={RiCodeSSlashLine}
          label="Total Reviews"
          value={stats?.totalReviews}
          color="#06b6d4"
          delay={0.1}
        />

        <StatCard
          icon={RiBookmarkLine}
          label="Saved Reviews"
          value={stats?.savedReviews}
          color="#60a5fa"
          delay={0.15}
        />

        <StatCard
          icon={RiLineChartLine}
          label="Average Score"
          value={`${stats?.avgScore || 0}/100`}
          color="#f59e0b"
          delay={0.2}
        />

        <StatCard
          icon={RiFireLine}
          label="Review Streak"
          value={`${streak}🔥`}
          sub="Recent activity"
          color="#ef4444"
          delay={0.25}
        />

      </div>

      {/* ======================================== */}
      {/* CONTENT GRID */}
      {/* ======================================== */}

      <div
        className="
          grid grid-cols-1
xl:grid-cols-3
gap-5 sm:gap-6
        "
      >

        {/* ======================================== */}
        {/* RECENT REVIEWS */}
        {/* ======================================== */}

        <div className="xl:col-span-2">

          <div
            className="
              rounded-[2rem]
              border border-white/5
              bg-zinc-950/80
              backdrop-blur-xl
              p-4 sm:p-6
            "
          >

            <div
              className="
                flex items-center justify-between
                mb-6
              "
            >

              <h2
                className="
                  text-2xl font-bold
                  flex items-center gap-3
                "
              >

                <RiHistoryLine
                  className="
                    text-cyan-400
                  "
                />

                Recent Reviews

              </h2>

              <Link
                to="/history"
                className="
                  text-cyan-400
                  text-sm font-medium
                  flex items-center gap-1
                "
              >

                View all

                <RiArrowRightLine />

              </Link>

            </div>

            {!stats?.recentReviews?.length ? (

              <div
                className="
                  py-20 text-center
                "
              >

                <RiCodeSSlashLine
                  size={60}
                  className="
                    text-zinc-600
                    mx-auto mb-5
                  "
                />

                <h3
                  className="
                    text-2xl font-bold mb-3
                  "
                >
                  No Reviews Yet
                </h3>

                <p className="text-zinc-500">
                  Start your first AI code review.
                </p>

              </div>

            ) : (

              <div className="space-y-4">

                {stats.recentReviews.map(
                  (review, i) => (

                    <Link
                      key={review._id}
                      to={`/review/${review._id}`}
                    >

                      <motion.div

                        initial={{
                          opacity: 0,
                          y: 10,
                        }}

                        animate={{
                          opacity: 1,
                          y: 0,
                        }}

                        transition={{
                          delay:
                            0.3 +
                            i * 0.05,
                        }}

                        whileHover={{
                          y: -2,
                        }}

                        className="
                          rounded-2xl
                          border border-white/5
                          bg-white/[0.02]
                          p-5
                          transition-all
                          hover:border-cyan-500/20
                        "
                      >

                        <div
                          className="
                            flex flex-col sm:flex-row
sm:items-center
justify-between
gap-4
                          "
                        >

                          <div
                            className="
                              flex items-center gap-4
                              min-w-0
                            "
                          >

                            <div
                              className="
                                w-12 h-12 rounded-2xl
                                bg-cyan-500/10
                                flex items-center justify-center
                                flex-shrink-0
                              "
                            >

                              <RiCodeSSlashLine
                                className="
                                  text-cyan-400
                                "
                              />

                            </div>

                            <div className="min-w-0">

                              <h3
                                className="
                                  font-semibold
truncate
text-sm sm:text-base
                                "
                              >
                                {review.title}
                              </h3>

                              <p
                                className="
                                  text-sm text-zinc-500
                                  mt-1
                                "
                              >

                                {review.language}
                                {' • '}
                                {timeAgo(
                                  review.createdAt
                                )}

                              </p>

                            </div>

                          </div>

                          <div
                            className={`
                              text-lg sm:text-xl font-black
                              ${scoreColorClass(
                                review.score
                              )}
                            `}
                            style={{
                              color:
                                scoreColor(
                                  review.score
                                ),
                            }}
                          >
                            {review.score}
                          </div>

                        </div>

                      </motion.div>

                    </Link>
                  )
                )}

              </div>

            )}

          </div>

        </div>

        {/* ======================================== */}
        {/* SIDE PANEL */}
        {/* ======================================== */}

        <div className="space-y-6">

          {/* AI INSIGHTS */}

          <div
            className="
              rounded-[2rem]
              border border-white/5
              bg-zinc-950/80
              backdrop-blur-xl
              p-4 sm:p-6
            "
          >

            <h2
              className="
                text-xl sm:text-2xl font-bold
                mb-6
                flex items-center gap-2
              "
            >

              <RiFlashlightLine
                className="
                  text-yellow-400
                "
              />

              AI Insights

            </h2>

            <div className="space-y-4 sm:space-y-5">

              <div
                className="
                  rounded-2xl
                  bg-cyan-500/5
                  border border-cyan-500/10
                  p-5
                "
              >

                <p className="text-zinc-400 text-sm mb-2">
                  Most Used Language
                </p>

                <h3 className="text-2xl font-bold capitalize">
                  {
                    stats
                      ?.languageBreakdown?.[0]
                      ?._id || 'N/A'
                  }
                </h3>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-violet-500/5
                  border border-violet-500/10
                  p-5
                "
              >

                <p className="text-zinc-400 text-sm mb-2">
                  AI Performance
                </p>

                <h3 className="text-2xl font-bold">
                  {
                    stats?.avgScore || 0
                  }
                  %
                </h3>

              </div>

            </div>

          </div>

          {/* LANGUAGE BREAKDOWN */}

          <div
            className="
              rounded-[2rem]
              border border-white/5
              bg-zinc-950/80
              backdrop-blur-xl
              p-4 sm:p-6
            "
          >

            <h2
              className="
                text-2xl font-bold
                mb-6
                flex items-center gap-2
              "
            >

              <RiBarChartLine
                className="
                  text-cyan-400
                "
              />

              Languages

            </h2>

            <div className="space-y-5">

              {stats
                ?.languageBreakdown
                ?.map(lang => {

                  const pct =
                    Math.round(
                      (
                        lang.count /
                        stats?.totalReviews || 0
                      ) * 100
                    );

                  return (

                    <div
                      key={lang._id}
                    >

                      <div
                        className="
                          flex items-center justify-between
                          mb-2
                        "
                      >

                        <span
                          className="
                            capitalize font-medium
                          "
                        >
                          {lang._id}
                        </span>

                        <span
                          className="
                            text-sm text-zinc-500
                          "
                        >
                          {pct}%
                        </span>

                      </div>

                      <div
                        className="
                          h-3 rounded-full
                          bg-white/5 overflow-hidden
                        "
                      >

                        <motion.div

                          initial={{
                            width: 0,
                          }}

                          animate={{
                            width: `${pct}%`,
                          }}

                          transition={{
                            duration: 1,
                          }}

                          className="
                            h-full rounded-full
                          "

                          style={{
                            background:
                              'linear-gradient(to right,#06b6d4,#7c3aed)',
                          }}
                        />

                      </div>

                    </div>
                  );
                })}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}