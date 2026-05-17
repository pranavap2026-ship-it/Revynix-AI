import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  RiBugLine,
  RiShieldCheckLine,
  RiSpeedLine,
  RiCodeSSlashLine,
  RiArrowRightLine,
  RiStarFill,
  RiDashboardLine,
  RiUserSettingsLine,
  RiRocketLine,
  RiFlashlightLine,
  RiLineChartLine,
  RiTerminalBoxLine,
} from 'react-icons/ri';

import Footer from '../components/Footer';

import useAuth from '../hooks/useAuth';

// ========================================
// ANIMATION
// ========================================

const fadeUp = (
  delay = 0
) => ({
  initial: {
    opacity: 0,
    y: 30,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
  },

  transition: {
    duration: 0.7,
    delay,
  },
});

// ========================================
// FEATURES
// ========================================

const FEATURES = [
  {
    icon: RiBugLine,
    color: '#ef4444',

    title:
      'Bug Detection',

    desc:
      'Detect hidden logic issues, runtime crashes, and edge-case failures instantly.',
  },

  {
    icon:
      RiShieldCheckLine,

    color:
      '#f59e0b',

    title:
      'Security Analysis',

    desc:
      'Identify XSS, SQL injection, unsafe auth flows, and vulnerable code patterns.',
  },

  {
    icon:
      RiSpeedLine,

    color:
      '#3b82f6',

    title:
      'Performance Review',

    desc:
      'Optimize rendering, memory usage, API calls, and expensive operations.',
  },

  {
    icon:
      RiCodeSSlashLine,

    color:
      '#14b8a6',

    title:
      'AI Refactoring',

    desc:
      'Generate cleaner, production-ready, scalable code automatically.',
  },

  {
    icon:
      RiDashboardLine,

    color:
      '#8b5cf6',

    title:
      'Advanced Dashboard',

    desc:
      'Track analytics, scores, history, saved reviews, and language insights.',
  },

  {
    icon:
      RiUserSettingsLine,

    color:
      '#10b981',

    title:
      'Admin Control',

    desc:
      'Manage users, reviews, reports, roles, analytics, and moderation.',
  },
];

// ========================================
// TESTIMONIALS
// ========================================

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',

    role:
      'Senior Frontend Engineer',

    text:
      'Revynix AI found a critical XSS vulnerability our team missed for weeks.',

    stars: 5,
  },

  {
    name: 'Marcus Webb',

    role:
      'Backend Developer',

    text:
      'The AI refactoring suggestions are genuinely production-ready and clean.',

    stars: 5,
  },

  {
    name: 'Priya Nair',

    role:
      'Full Stack Developer',

    text:
      'This platform saves hours during reviews and dramatically improves code quality.',

    stars: 5,
  },
];

// ========================================
// HOMEPAGE
// ========================================

export default function HomePage() {

  const { user } =
    useAuth();

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        overflow-hidden
      "
    >

      {/* ======================================== */}
      {/* BACKGROUND */}
      {/* ======================================== */}

      <div
        className="
          fixed inset-0
          pointer-events-none
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-[-200px]
            left-[-150px]
            w-[500px]
            h-[500px]
            rounded-full
            blur-3xl
            opacity-20
          "
          style={{
            background:
              'radial-gradient(circle,#06b6d4,transparent 70%)',
          }}
        />

        <div
          className="
            absolute
            bottom-[-200px]
            right-[-100px]
            w-[500px]
            h-[500px]
            rounded-full
            blur-3xl
            opacity-10
          "
          style={{
            background:
              'radial-gradient(circle,#8b5cf6,transparent 70%)',
          }}
        />

      </div>

      {/* ======================================== */}
      {/* HERO */}
      {/* ======================================== */}

      <section
        className="
          relative
          min-h-screen
          flex items-center
          justify-center
          px-4
          py-20
        "
      >

        <div
          className="
            relative z-10
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-2
            gap-14
            items-center
          "
        >

          {/* LEFT */}

          <motion.div

            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.7,
            }}
          >

            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/10
                text-cyan-300
                text-sm
                font-medium
                mb-8
              "
            >

              <RiFlashlightLine />

              Powered by AI

            </div>

            {/* TITLE */}

            <h1
              className="
                text-5xl
                md:text-7xl
                font-black
                leading-tight
              "
            >

              AI Powered

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

                Code Reviews

              </span>

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                text-zinc-400
                text-lg
                mt-8
                leading-8
                max-w-2xl
              "
            >

              Analyze bugs, security vulnerabilities, performance bottlenecks, and refactor your code instantly with Revynix AI.

            </p>

            {/* BUTTONS */}

            <div
              className="
                flex flex-wrap
                gap-4
                mt-10
              "
            >

              <Link
                to={
                  user
                    ? '/review'
                    : '/register'
                }
                className="
                  px-8 py-4
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-violet-500
                  font-semibold
                  flex items-center
                  gap-2
                  hover:scale-105
                  transition-all
                "
              >

                <RiRocketLine />

                Start Reviewing

              </Link>

              <Link
                to="/review"
                className="
                  px-8 py-4
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  font-semibold
                  hover:bg-white/[0.06]
                  transition-all
                "
              >

                Live Demo

              </Link>

            </div>

            {/* STATS */}

            <div
              className="
                flex flex-wrap
                gap-8
                mt-12
              "
            >

              {[
                ['10K+', 'Reviews'],
                ['99%', 'Accuracy'],
                ['50+', 'Languages'],
              ].map(
                item => (

                  <div
                    key={item[1]}
                  >

                    <h3
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {item[0]}
                    </h3>

                    <p
                      className="
                        text-zinc-500
                        text-sm
                        mt-1
                      "
                    >
                      {item[1]}
                    </p>

                  </div>
                )
              )}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div

            initial={{
              opacity: 0,
              y: 40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              delay: 0.2,
            }}

            className="
              relative
            "
          >

            <div
              className="
                rounded-[2rem]
                border border-white/10
                bg-zinc-950/80
                backdrop-blur-xl
                overflow-hidden
                shadow-2xl
              "
            >

              {/* HEADER */}

              <div
                className="
                  border-b border-white/5
                  px-6 py-4
                  flex items-center
                  justify-between
                "
              >

                <div className="flex gap-2">

                  <div className="w-3 h-3 rounded-full bg-red-500" />

                  <div className="w-3 h-3 rounded-full bg-yellow-500" />

                  <div className="w-3 h-3 rounded-full bg-green-500" />

                </div>

                <div
                  className="
                    text-sm
                    text-zinc-500
                  "
                >
                  review.js
                </div>

              </div>

              {/* CODE */}

              <div
                className="
                  p-6
                  font-mono
                  text-sm
                  overflow-auto
                "
              >

                <div className="text-cyan-400">
                  const password = req.body.password
                </div>

                <div className="text-zinc-500 mt-2">
                  // Security Issue
                </div>

                <div className="text-red-400 mt-2">
                  ❌ Password stored without hashing
                </div>

                <div className="text-green-400 mt-4">
                  ✅ Fix Suggested:
                </div>

                <div className="text-zinc-300 mt-2">
                  const hashed = await bcrypt.hash(password, 10)
                </div>

              </div>

            </div>

            {/* FLOATING CARD */}

            <motion.div

              animate={{
                y: [0, -8, 0],
              }}

              transition={{
                repeat: Infinity,
                duration: 4,
              }}

              className="
                absolute
                -top-6
                -right-6
                rounded-2xl
                bg-cyan-500/10
                border border-cyan-500/20
                px-5 py-4
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex items-center
                  gap-3
                "
              >

                <RiShieldCheckLine
                  className="
                    text-cyan-400
                  "
                />

                <div>

                  <p
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    Security Risk
                  </p>

                  <p
                    className="
                      text-xs
                      text-zinc-400
                    "
                  >
                    High Severity
                  </p>

                </div>

              </div>

            </motion.div>

          </motion.div>

        </div>

      </section>

      {/* ======================================== */}
      {/* FEATURES */}
      {/* ======================================== */}

      <section
        className="
          py-28
          px-4
          max-w-7xl
          mx-auto
        "
      >

        <motion.div
          {...fadeUp()}
          className="
            text-center
            mb-16
          "
        >

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
            "
          >

            Everything You Need

          </h2>

          <p
            className="
              text-zinc-400
              max-w-2xl
              mx-auto
              mt-6
              text-lg
            "
          >

            Professional AI-powered developer tools designed for modern software teams.

          </p>

        </motion.div>

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >

          {FEATURES.map(
            (
              feature,
              i
            ) => (

              <motion.div

                key={
                  feature.title
                }

                {...fadeUp(
                  i * 0.08
                )}

                whileHover={{
                  y: -6,
                }}

                className="
                  rounded-[2rem]
                  border border-white/5
                  bg-zinc-950/70
                  backdrop-blur-xl
                  p-7
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                  style={{
                    background:
                      `${feature.color}15`,
                  }}
                >

                  {
                    feature.icon &&
                    <feature.icon
                      size={26}
                      style={{
                        color:
                          feature.color,
                      }}
                    />
                  }

                </div>

                <h3
                  className="
                    text-2xl
                    font-bold
                    mb-3
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    text-zinc-400
                    leading-8
                  "
                >
                  {feature.desc}
                </p>

              </motion.div>
            )
          )}

        </div>

      </section>

      {/* ======================================== */}
      {/* ANALYTICS */}
      {/* ======================================== */}

      <section
        className="
          py-24
          px-4
        "
      >

        <div
          className="
            max-w-6xl
            mx-auto
            grid
            lg:grid-cols-3
            gap-6
          "
        >

          <motion.div
            {...fadeUp()}
            className="
              lg:col-span-2
              rounded-[2rem]
              border border-white/10
              bg-gradient-to-br
              from-cyan-500/10
              to-violet-500/10
              p-10
            "
          >

            <RiLineChartLine
              size={42}
              className="
                text-cyan-400
                mb-6
              "
            />

            <h3
              className="
                text-4xl
                font-black
              "
            >

              AI Analytics Dashboard

            </h3>

            <p
              className="
                text-zinc-400
                leading-8
                mt-6
              "
            >

              Track performance trends, security risks, bug frequency, and project quality insights.

            </p>

          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="
              rounded-[2rem]
              border border-white/10
              bg-zinc-950/70
              p-10
            "
          >

            <h2
              className="
                text-5xl
                font-black
                text-cyan-400
              "
            >
              98%
            </h2>

            <p
              className="
                text-zinc-400
                mt-4
              "
            >
              Detection Accuracy
            </p>

          </motion.div>

        </div>

      </section>

      {/* ======================================== */}
      {/* TESTIMONIALS */}
      {/* ======================================== */}

      <section
        className="
          py-24
          px-4
          max-w-6xl
          mx-auto
        "
      >

        <motion.div
          {...fadeUp()}
          className="
            text-center
            mb-16
          "
        >

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
            "
          >

            Trusted by Developers

          </h2>

        </motion.div>

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {TESTIMONIALS.map(
            (
              t,
              i
            ) => (

              <motion.div

                key={t.name}

                {...fadeUp(
                  i * 0.08
                )}

                className="
                  rounded-[2rem]
                  border border-white/5
                  bg-zinc-950/70
                  p-7
                "
              >

                <div
                  className="
                    flex gap-1
                    mb-5
                  "
                >

                  {Array(t.stars)
                    .fill(0)
                    .map(
                      (_, j) => (

                        <RiStarFill
                          key={j}
                          className="
                            text-yellow-400
                          "
                        />
                      )
                    )}

                </div>

                <p
                  className="
                    text-zinc-300
                    leading-8
                    mb-6
                  "
                >
                  "{t.text}"
                </p>

                <div>

                  <h3 className="font-bold">
                    {t.name}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-zinc-500
                    "
                  >
                    {t.role}
                  </p>

                </div>

              </motion.div>
            )
          )}

        </div>

      </section>

      {/* ======================================== */}
      {/* CTA */}
      {/* ======================================== */}

      <section
        className="
          py-28
          px-4
        "
      >

        <motion.div

          {...fadeUp()}

          className="
            max-w-5xl
            mx-auto
            rounded-[3rem]
            border border-cyan-500/20
            bg-gradient-to-br
            from-cyan-500/10
            to-violet-500/10
            p-12
            text-center
            backdrop-blur-xl
          "
        >

          <div
            className="
              w-20
              h-20
              rounded-3xl
              bg-cyan-500/10
              flex
              items-center
              justify-center
              mx-auto
              mb-8
            "
          >

            <RiTerminalBoxLine
              size={40}
              className="
                text-cyan-400
              "
            />

          </div>

          <h2
            className="
              text-4xl
              md:text-6xl
              font-black
              leading-tight
            "
          >

            Build Better Software

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

              With AI

            </span>

          </h2>

          <p
            className="
              text-zinc-400
              max-w-2xl
              mx-auto
              mt-6
              text-lg
              leading-8
            "
          >

            Join thousands of developers using Revynix AI to ship faster, cleaner, and safer code.

          </p>

          <div
            className="
              flex
              justify-center
              gap-4
              mt-10
            "
          >

            <Link
              to="/register"
              className="
                px-8 py-4
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-violet-500
                font-semibold
                flex
                items-center
                gap-2
              "
            >

              Start Free

              <RiArrowRightLine />

            </Link>

          </div>

        </motion.div>

      </section>

      <Footer />

    </div>
  );
}