import { useState } from 'react';

import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  RiCodeSSlashLine,
  RiEyeLine,
  RiEyeOffLine,
  RiMailLine,
  RiLockPasswordLine,
} from 'react-icons/ri';

import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';

import { getError } from '../utils/helpers';

// ========================================
// LOGIN PAGE
// ========================================

const LoginPage = () => {
  const { login } =
    useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  // ========================================
  // REDIRECT PATH
  // ========================================

  const from =
    location.state?.from
      ?.pathname || null;

  // ========================================
  // FORM STATE
  // ========================================

  const [form, setForm] =
    useState({
      email: '',
      password: '',
    });

  const [showPw, setShowPw] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = e => {
    setForm(prev => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  // ========================================
  // HANDLE LOGIN
  // ========================================

  const handleSubmit =
    async e => {
      e.preventDefault();

      // VALIDATION

      if (
        !form.email.trim() ||
        !form.password.trim()
      ) {
        return toast.error(
          'Please fill in all fields'
        );
      }

      try {
        setLoading(true);

        // LOGIN

        const response =
          await login(
            form.email,
            form.password
          );

        const user =
          response?.user ||
          response?.data?.user;

        // SUCCESS

        toast.success(
          `Welcome back ${
            user?.name || ''
          }`
        );

        // PREVIOUS ROUTE

        if (from) {
          navigate(from, {
            replace: true,
          });

          return;
        }

        // ADMIN

        if (
          user?.role ===
          'admin'
        ) {
          navigate('/admin', {
            replace: true,
          });

          return;
        }

        // USER

        navigate('/dashboard', {
          replace: true,
        });
      } catch (error) {
        console.error(
          'LOGIN ERROR:',
          error
        );

        toast.error(
          getError(error)
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-4
        py-12
        bg-[#050816]
      "
    >
      {/* ======================================== */}
      {/* BACKGROUND */}
      {/* ======================================== */}

      <div className="absolute inset-0 bg-mesh-1 pointer-events-none" />

      {/* GLOW */}

      <div
        className="
          absolute
          top-[-150px]
          left-[-150px]
          w-[400px]
          h-[400px]
          rounded-full
          blur-3xl
          opacity-20
        "
        style={{
          background:
            'radial-gradient(circle,#1aae9d,transparent 70%)',
        }}
      />

      {/* ======================================== */}
      {/* CARD */}
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
          duration: 0.45,
        }}
        className="
          relative
          w-full
          max-w-md
          z-10
        "
      >
        <div
          className="
            bg-[#0b1120]/95
            backdrop-blur-2xl
            border
            border-white/5
            rounded-[32px]
            p-10
            shadow-[0_0_80px_rgba(0,0,0,0.6)]
          "
        >
          {/* ======================================== */}
          {/* LOGO */}
          {/* ======================================== */}

          <div className="text-center mb-10">
            <div
              className="
                inline-flex
                items-center
                gap-4
                mb-6
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
                  shadow-lg
                  shadow-[#1aae9d]/20
                "
                style={{
                  background:
                    'linear-gradient(135deg,#1aae9d,#12917f)',
                }}
              >
                <RiCodeSSlashLine
                  size={28}
                  className="text-white"
                />
              </div>

              <h1
                className="
                  text-5xl
                  font-bold
                  tracking-tight
                  text-white
                "
              >
                Revynix
                <span className="glow-text">
                  AI
                </span>
              </h1>
            </div>

            <h2
              className="
                text-4xl
                font-bold
                text-white
                tracking-tight
              "
            >
              Welcome Back
            </h2>

            <p
              className="
                text-zinc-400
                text-lg
                mt-3
              "
            >
              Login to continue
            </p>
          </div>

          {/* ======================================== */}
          {/* FORM */}
          {/* ======================================== */}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-6"
          >
            {/* EMAIL */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-zinc-300
                  mb-3
                "
              >
                Email
              </label>

              <div className="relative">
                <RiMailLine
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    pointer-events-none
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={
                    form.email
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-[#121a2b]
                    border
                    border-white/5
                    focus:border-[#1aae9d]
                    focus:ring-4
                    focus:ring-[#1aae9d]/10
                    outline-none
                    text-white
                    placeholder:text-zinc-500
                    pl-12
                    pr-4
                    transition-all
                    duration-300
                  "
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                className="
                  block
                  text-sm
                  font-medium
                  text-zinc-300
                  mb-3
                "
              >
                Password
              </label>

              <div className="relative">
                <RiLockPasswordLine
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    pointer-events-none
                  "
                />

                <input
                  type={
                    showPw
                      ? 'text'
                      : 'password'
                  }
                  name="password"
                  value={
                    form.password
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-[#121a2b]
                    border
                    border-white/5
                    focus:border-[#1aae9d]
                    focus:ring-4
                    focus:ring-[#1aae9d]/10
                    outline-none
                    text-white
                    placeholder:text-zinc-500
                    pl-12
                    pr-12
                    transition-all
                    duration-300
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPw(
                      !showPw
                    )
                  }
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    hover:text-white
                    transition-colors
                  "
                >
                  {showPw ? (
                    <RiEyeOffLine
                      size={18}
                    />
                  ) : (
                    <RiEyeLine
                      size={18}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-14
                rounded-2xl
                font-semibold
                text-white
                bg-gradient-to-r
                from-[#1aae9d]
                to-[#12917f]
                hover:scale-[1.01]
                hover:shadow-[0_0_30px_rgba(26,174,157,0.25)]
                active:scale-[0.99]
                transition-all
                duration-300
                mt-2
              "
            >
              {loading
                ? 'Signing In...'
                : 'Sign In'}
            </button>
          </form>

          {/* ======================================== */}
          {/* FOOTER */}
          {/* ======================================== */}

          <p
            className="
              text-center
              text-sm
              text-zinc-400
              mt-8
            "
          >
            Don&apos;t have an
            account?{' '}

            <Link
              to="/register"
              className="
                text-[#1aae9d]
                hover:text-[#27d8c2]
                font-semibold
                transition-colors
              "
            >
              Create one free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;