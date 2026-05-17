import { useState } from 'react';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { motion } from 'framer-motion';

import {
  RiCodeSSlashLine,
  RiEyeLine,
  RiEyeOffLine,
  RiMailLine,
  RiLockPasswordLine,
  RiUserLine,
} from 'react-icons/ri';

import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';

import { getError } from '../utils/helpers';

// ========================================
// REGISTER PAGE
// ========================================

export default function RegisterPage() {
  const { register } =
    useAuth();

  const navigate =
    useNavigate();

  // ========================================
  // FORM STATE
  // ========================================

  const [form, setForm] =
    useState({
      name: '',
      email: '',
      password: '',
      confirm: '',
    });

  const [showPw, setShowPw] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = e => {
    setForm(prev => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  // ========================================
  // HANDLE SUBMIT
  // ========================================

  const handleSubmit =
    async e => {
      e.preventDefault();

      // VALIDATION

      if (
        !form.name.trim() ||
        !form.email.trim() ||
        !form.password.trim() ||
        !form.confirm.trim()
      ) {
        return toast.error(
          'Please fill in all fields'
        );
      }

      // PASSWORD LENGTH

      if (
        form.password.length < 6
      ) {
        return toast.error(
          'Password must be at least 6 characters'
        );
      }

      // PASSWORD MATCH

      if (
        form.password !==
        form.confirm
      ) {
        return toast.error(
          'Passwords do not match'
        );
      }

      try {
        setLoading(true);

        // REGISTER

        const response =
          await register(
            form.name,
            form.email,
            form.password
          );

        const user =
          response?.user ||
          response?.data?.user;

        // SUCCESS

        toast.success(
          `Welcome ${
            user?.name || ''
          }`
        );

        navigate('/dashboard', {
          replace: true,
        });
      } catch (error) {
        console.error(
          'REGISTER ERROR:',
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
          right-[-150px]
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
                tracking-tight
                text-white
              "
            >
              Create Account
            </h2>

            <p
              className="
                text-zinc-400
                text-lg
                mt-3
              "
            >
              Start reviewing code
              with AI
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
            {/* FULL NAME */}

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
                Full Name
              </label>

              <div className="relative">
                <RiUserLine
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
                  type="text"
                  name="name"
                  value={
                    form.name
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="John Doe"
                  autoComplete="name"
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
                  placeholder="Minimum 6 characters"
                  autoComplete="new-password"
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

            {/* CONFIRM PASSWORD */}

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
                Confirm Password
              </label>

              <input
                type={
                  showPw
                    ? 'text'
                    : 'password'
                }
                name="confirm"
                value={
                  form.confirm
                }
                onChange={
                  handleChange
                }
                placeholder="Repeat password"
                autoComplete="new-password"
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
                  px-4
                  transition-all
                  duration-300
                "
              />
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
                ? 'Creating Account...'
                : 'Create Account'}
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
            Already have an
            account?{' '}

            <Link
              to="/login"
              className="
                text-[#1aae9d]
                hover:text-[#27d8c2]
                font-semibold
                transition-colors
              "
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}