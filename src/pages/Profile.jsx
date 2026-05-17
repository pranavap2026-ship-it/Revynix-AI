import {
  useEffect,
  useState,
} from 'react';

import {
  motion,
} from 'framer-motion';

import toast from 'react-hot-toast';

import {
  RiUser3Line,
  RiMailLine,
  RiGithubLine,
  RiLockPasswordLine,
  RiSaveLine,
  RiShieldCheckLine,
  RiEyeLine,
  RiEyeOffLine,
} from 'react-icons/ri';

import api from '../utils/api';

import Loader from '../components/Loader';

import useAuth from '../hooks/useAuth';

import { getError } from '../utils/helpers';

// ========================================
// PROFILE PAGE
// ========================================

const Profile = () => {
  const {
    user,
    setUser,
  } = useAuth();

  // ========================================
  // STATES
  // ========================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showCurrentPassword,
    setShowCurrentPassword] =
    useState(false);

  const [showNewPassword,
    setShowNewPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      github: '',
      bio: '',
      currentPassword: '',
      newPassword: '',
    });

  // ========================================
  // LOAD USER DATA
  // ========================================

  useEffect(() => {
    if (user) {
      setFormData({
        name:
          user.name || '',

        email:
          user.email || '',

        github:
          user.github || '',

        bio:
          user.bio || '',

        currentPassword: '',

        newPassword: '',
      });

      setLoading(false);
    }
  }, [user]);

  // ========================================
  // HANDLE CHANGE
  // ========================================

  const handleChange = e => {
    const {
      name,
      value,
    } = e.target;

    setFormData(prev => ({
      ...prev,

      [name]:
        value,
    }));
  };

  // ========================================
  // VALIDATION
  // ========================================

  const validateForm = () => {

    // NAME

    if (
      !formData.name.trim()
    ) {
      toast.error(
        'Name is required'
      );

      return false;
    }

    // PASSWORD VALIDATION

    if (
      formData.newPassword &&
      formData.newPassword.length < 6
    ) {
      toast.error(
        'Password must be at least 6 characters'
      );

      return false;
    }

    if (
      formData.newPassword &&
      !formData.currentPassword
    ) {
      toast.error(
        'Enter current password'
      );

      return false;
    }

    return true;
  };

  // ========================================
  // UPDATE PROFILE
  // ========================================

  const handleSubmit =
    async e => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      try {
        setSaving(true);

        const payload = {
          name:
            formData.name.trim(),

          github:
            formData.github.trim(),

          bio:
            formData.bio.trim(),
        };

        // PASSWORD UPDATE

        if (
          formData.currentPassword &&
          formData.newPassword
        ) {
          payload.currentPassword =
            formData.currentPassword;

          payload.newPassword =
            formData.newPassword;
        }

        const { data } =
          await api.put(
            '/auth/profile',
            payload
          );

        // UPDATE LOCAL STORAGE

        localStorage.setItem(
          'user',
          JSON.stringify(
            data.data
          )
        );

        // UPDATE CONTEXT

        setUser(data.data);

        // RESET PASSWORDS

        setFormData(prev => ({
          ...prev,

          currentPassword: '',

          newPassword: '',
        }));

        toast.success(
          'Profile updated successfully'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          getError(error)
        );

      } finally {

        setSaving(false);
      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return <Loader />;
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* HEADER */}

      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="mb-8"
      >
        <h1 className="
          text-4xl
          font-bold
          text-white
          mb-2
        ">
          Profile Settings
        </h1>

        <p className="text-zinc-400">
          Manage your account
          information and security.
        </p>
      </motion.div>

      {/* CARD */}

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
          duration: 0.4,
        }}
        className="
          card
          border border-white/10
          bg-zinc-900/70
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-2xl
        "
      >

        {/* PROFILE TOP */}

        <div className="
          flex flex-col md:flex-row
          md:items-center
          gap-6
          mb-10
        ">

          {/* AVATAR */}

          <div
            className="
              w-28 h-28
              rounded-full
              flex items-center
              justify-center
              text-4xl
              font-bold
              text-white
              shadow-xl
            "
            style={{
              background:
                'linear-gradient(135deg,#14b8a6,#0f766e)',
            }}
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>

          {/* USER INFO */}

          <div>

            <div className="
              flex items-center
              gap-3
              mb-2
            ">
              <h2 className="
                text-2xl
                font-bold
                text-white
              ">
                {user?.name}
              </h2>

              {user?.role ===
                'admin' && (
                <span className="
                  flex items-center
                  gap-1
                  text-xs
                  bg-cyan-500/20
                  text-cyan-400
                  px-3 py-1
                  rounded-full
                ">
                  <RiShieldCheckLine
                    size={14}
                  />

                  Admin
                </span>
              )}
            </div>

            <p className="text-zinc-400 mb-1">
              {user?.email}
            </p>

            <p className="
              text-sm
              text-zinc-500
            ">
              Member since{' '}
              {new Date(
                user?.createdAt
              ).toLocaleDateString()}
            </p>

          </div>
        </div>

        {/* FORM */}

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* NAME */}

          <div>
            <label className="label">
              Full Name
            </label>

            <div className="relative">

              <RiUser3Line
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <input
                type="text"
                name="name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="
  w-full
  bg-zinc-900/80
  border border-white/10
  rounded-2xl
  h-14
  px-14
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  focus:border-cyan-500/50
  focus:ring-2
  focus:ring-cyan-500/20
"
                placeholder="Your name"
                required
              />
            </div>
          </div>

          {/* EMAIL */}

          <div>
            <label className="label">
              Email Address
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
                "
              />

              <input
                type="email"
                value={
                  formData.email
                }
                disabled
                className="
  w-full
  bg-zinc-900/60
  border border-white/10
  rounded-2xl
  h-14
  px-14
  text-zinc-400
  opacity-70
  cursor-not-allowed
"
              />
            </div>
          </div>

          {/* GITHUB */}

          <div>
            <label className="label">
              GitHub Profile
            </label>

            <div className="relative">

              <RiGithubLine
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-zinc-500
                "
              />

              <input
                type="url"
                name="github"
                value={
                  formData.github
                }
                onChange={
                  handleChange
                }
                className="
  w-full
  bg-zinc-900/80
  border border-white/10
  rounded-2xl
  h-14
  px-14
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  focus:border-cyan-500/50
  focus:ring-2
  focus:ring-cyan-500/20
"
                placeholder="https://github.com/username"
              />
            </div>
          </div>

          {/* BIO */}

          <div>
            <label className="label">
              Bio
            </label>

            <textarea
              name="bio"
              rows="4"
              value={
                formData.bio
              }
              onChange={
                handleChange
              }
             className="
  w-full
  bg-zinc-900/80
  border border-white/10
  rounded-2xl
  px-5 py-4
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  focus:border-cyan-500/50
  focus:ring-2
  focus:ring-cyan-500/20
  resize-none
"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* PASSWORD SECTION */}

          <div className="
            pt-6
            border-t
            border-white/10
          ">

            <h3 className="
              text-lg
              font-semibold
              mb-5
              text-white
            ">
              Change Password
            </h3>

            <div className="
              grid
              md:grid-cols-2
              gap-5
            ">

              {/* CURRENT PASSWORD */}

              <div>

                <label className="label">
                  Current Password
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
                    "
                  />

                  <input
                    type={
                      showCurrentPassword
                        ? 'text'
                        : 'password'
                    }
                    name="currentPassword"
                    value={
                      formData.currentPassword
                    }
                    onChange={
                      handleChange
                    }
                   className="
  w-full
  bg-zinc-900/80
  border border-white/10
  rounded-2xl
  h-14
  pl-14
  pr-14
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  focus:border-cyan-500/50
  focus:ring-2
  focus:ring-cyan-500/20
"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowCurrentPassword(
                        !showCurrentPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    "
                  >
                    {showCurrentPassword
                      ? <RiEyeOffLine />
                      : <RiEyeLine />
                    }
                  </button>

                </div>
              </div>

              {/* NEW PASSWORD */}

              <div>

                <label className="label">
                  New Password
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
                    "
                  />

                  <input
                    type={
                      showNewPassword
                        ? 'text'
                        : 'password'
                    }
                    name="newPassword"
                    value={
                      formData.newPassword
                    }
                    onChange={
                      handleChange
                    }
                   className="
  w-full
  bg-zinc-900/80
  border border-white/10
  rounded-2xl
  h-14
  pl-14
  pr-14
  text-white
  placeholder:text-zinc-500
  outline-none
  transition-all
  focus:border-cyan-500/50
  focus:ring-2
  focus:ring-cyan-500/20
"
                    placeholder="••••••••"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        !showNewPassword
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-zinc-500
                    "
                  >
                    {showNewPassword
                      ? <RiEyeOffLine />
                      : <RiEyeLine />
                    }
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* BUTTON */}

          <div className="pt-4">

            <button
              type="submit"
              disabled={saving}
              className="
                btn-primary
                px-6 py-3
                flex items-center
                gap-2
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              <RiSaveLine
                size={18}
              />

              {saving
                ? 'Saving...'
                : 'Save Changes'}

            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Profile;