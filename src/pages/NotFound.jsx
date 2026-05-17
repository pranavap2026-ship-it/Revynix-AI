import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  RiErrorWarningLine,
  RiArrowLeftLine,
  RiHome5Line,
} from 'react-icons/ri';

// ========================================
// NOT FOUND PAGE
// ========================================
const NotFound = () => {
  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        px-4
        relative overflow-hidden
        bg-[#080c10]
        text-white
      "
    >
      {/* ======================================== */}
      {/* BACKGROUND GLOW */}
      {/* ======================================== */}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute top-[-120px] left-[-120px]
            w-[400px] h-[400px]
            rounded-full blur-3xl opacity-20
          "
          style={{
            background:
              'radial-gradient(circle,#1aae9d,transparent 70%)',
          }}
        />

        <div
          className="
            absolute bottom-[-150px] right-[-100px]
            w-[450px] h-[450px]
            rounded-full blur-3xl opacity-10
          "
          style={{
            background:
              'radial-gradient(circle,#3b82f6,transparent 70%)',
          }}
        />
      </div>

      {/* ======================================== */}
      {/* CONTENT */}
      {/* ======================================== */}

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
          duration: 0.6,
        }}
        className="
          relative z-10
          max-w-xl w-full
          text-center
        "
      >
        {/* ICON */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            w-28 h-28
            mx-auto mb-8
            rounded-3xl
            flex items-center justify-center
          "
          style={{
            background:
              'linear-gradient(135deg,#1aae9d20,#3b82f620)',

            border:
              '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <RiErrorWarningLine
            size={54}
            className="text-brand-400"
          />
        </motion.div>

        {/* 404 */}

        <h1
          className="
            text-7xl md:text-8xl
            font-black
            mb-4
            glow-text
          "
        >
          404
        </h1>

        {/* TITLE */}

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Page Not Found
        </h2>

        {/* DESC */}

        <p className="text-zinc-400 leading-relaxed mb-10 max-w-md mx-auto">
          The page you are
          looking for does not
          exist or may have been
          moved.
        </p>

        {/* BUTTONS */}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="
              btn-primary
              px-6 py-3
            "
          >
            <RiHome5Line
              size={18}
            />

            Go Home
          </Link>

          <button
            onClick={() =>
              window.history.back()
            }
            className="
              btn-secondary
              px-6 py-3
            "
          >
            <RiArrowLeftLine
              size={18}
            />

            Go Back
          </button>
        </div>

        {/* FOOTER */}

        <p className="text-xs text-zinc-600 mt-12">
          DevLens AI • Smart Code
          Reviews
        </p>
      </motion.div>
    </div>
  );
};

export default NotFound;