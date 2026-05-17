import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import {
  RiDashboardLine,
  RiUser3Line,
  RiBarChartBoxLine,
  RiSettings4Line,
  RiDeleteBinLine,
  RiEyeLine,
} from 'react-icons/ri';

import { AdminAPI } from '../utils/api';

// ========================================
// ADMIN PANEL
// ========================================

export default function AdminPanel() {

  // ========================================
  // STATES
  // ========================================

  const [loading, setLoading] =
    useState(true);

  const [activeSection, setActiveSection] =
    useState('dashboard');

  const [reviews, setReviews] =
    useState([]);

  const [users, setUsers] =
    useState([]);

  const [stats, setStats] =
    useState({
      totalUsers: 0,
      totalReviews: 0,
      totalAdmins: 0,
      usersThisWeek: 0,
      reviewsThisWeek: 0,
    });

    const [settings,
  setSettings] =
  useState({

    allowRegistration: true,

    allowAIReviews: true,

    maintenanceMode: false,

    publicProfiles: true,
  });

  // ========================================
  // FETCH DATA
  // ========================================

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

     const [

  statsRes,

  usersRes,

  reviewsRes,

  settingsRes,

] = await Promise.all([

        AdminAPI.getPlatformStats(),

AdminAPI.getUsers(),

AdminAPI.getAllReviews(),

AdminAPI.getSettings(),

      ]);

      // STATS

      setStats(
        statsRes.data?.data || {}
      );

      // USERS

      setUsers(

        usersRes.data?.data?.users ||

        usersRes.data?.data ||

        []
      );

      // REVIEWS

      setReviews(

        reviewsRes.data?.data ||

        []
      );

      // SETTINGS

setSettings(
  settingsRes.data?.data
);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||

        'Failed to load admin data'
      );

    } finally {

      setLoading(false);

    }
  };

  // ========================================
  // DELETE USER
  // ========================================

  const handleDeleteUser =
    async id => {

      try {

        await AdminAPI.deleteUser(id);

        setUsers(prev =>
          prev.filter(
            user =>
              user._id !== id
          )
        );

        toast.success(
          'User deleted successfully'
        );

      } catch (error) {

        console.log(error);

        toast.error(
          'Failed to delete user'
        );
      }
    };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-black
          flex
          items-center
          justify-center
          text-white
        "
      >

        <div
          className="
            text-2xl
            font-bold
            animate-pulse
          "
        >
          Loading Admin Panel...
        </div>

      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (

    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
      "
    >

      {/* ======================================== */}
      {/* SIDEBAR */}
      {/* ======================================== */}

      <aside
        className="
          hidden
          lg:flex
          w-[280px]
          bg-zinc-950
          border-r
          border-white/5
          p-6
          flex-col
        "
      >

        {/* LOGO */}

        <div className="mb-12">

          <h1
            className="
              text-4xl
              font-black
            "
          >
            Admin
          </h1>

          <p className="text-zinc-500 mt-2">
            Platform Management
          </p>

        </div>

        {/* MENU */}

        <div className="space-y-3">

          {[
            [
              'dashboard',
              'Dashboard',
              <RiDashboardLine />,
            ],

            [
              'users',
              'Users',
              <RiUser3Line />,
            ],

            [
              'analytics',
              'Analytics',
              <RiBarChartBoxLine />,
            ],

            [
              'settings',
              'Settings',
              <RiSettings4Line />,
            ],

          ].map(item => (

            <button
              key={item[0]}

              onClick={() =>
                setActiveSection(
                  item[0]
                )
              }

              className={`
                h-14
                w-full
                rounded-2xl
                px-5
                flex
                items-center
                gap-3
                transition-all

                ${
                  activeSection ===
                  item[0]

                    ? `
                      bg-gradient-to-r
                      from-cyan-500
                      to-violet-500
                      text-white
                    `

                    : `
                      bg-black
                      text-zinc-400
                      hover:bg-zinc-900
                    `
                }
              `}
            >

              {item[2]}

              {item[1]}

            </button>

          ))}

        </div>

      </aside>

      {/* ======================================== */}
      {/* MAIN */}
      {/* ======================================== */}

      <main className="flex-1 p-6">

        {/* HEADER */}

        <div className="mb-10">

          <h1
            className="
              text-5xl
              font-black
            "
          >
            Admin Panel
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage users, analytics,
            and platform settings
          </p>

        </div>

        {/* ======================================== */}
        {/* DASHBOARD */}
        {/* ======================================== */}

        {
          activeSection ===
            'dashboard' && (

            <div
              className="
                grid
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
              "
            >

              <StatCard
                title="Total Users"
                value={
                  stats.totalUsers || 0
                }
              />

              <StatCard
                title="AI Reviews"
                value={
                  stats.totalReviews || 0
                }
              />

              <StatCard
                title="Admins"
                value={
                  stats.totalAdmins || 0
                }
              />

              <StatCard
                title="Users This Week"
                value={
                  stats.usersThisWeek || 0
                }
              />

            </div>
          )
        }

        {/* ======================================== */}
        {/* USERS */}
        {/* ======================================== */}

        {
          activeSection ===
            'users' && (

            <SectionCard
              title="Users Management"
            >

              <div className="space-y-5">

                {users.length === 0 && (

                  <div
                    className="
                      text-zinc-500
                      text-center
                      py-10
                    "
                  >
                    No users found
                  </div>

                )}

                {users.map(user => (

                  <motion.div
                    key={user._id}

                    initial={{
                      opacity: 0,
                      y: 10,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    className="
                      rounded-3xl
                      border
                      border-white/5
                      bg-zinc-950
                      p-6
                    "
                  >

                    <div
                      className="
                        flex
                        flex-col
                        xl:flex-row
                        xl:items-center
                        xl:justify-between
                        gap-6
                      "
                    >

                      {/* USER LEFT */}

                      <div
                        className="
                          flex
                          items-start
                          gap-5
                        "
                      >

                        {/* AVATAR */}

                        <div
                          className="
                            w-16
                            h-16
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            text-2xl
                            font-black
                            text-white
                          "
                          style={{
                            background:
                              'linear-gradient(135deg,#06b6d4,#8b5cf6)',
                          }}
                        >
                          {
                            user?.name?.[0]
                              ?.toUpperCase()
                          }
                        </div>

                        {/* DETAILS */}

                        <div className="space-y-2">

                          <div
                            className="
                              flex
                              items-center
                              gap-3
                              flex-wrap
                            "
                          >

                            <h2
                              className="
                                text-2xl
                                font-bold
                              "
                            >
                              {user.name}
                            </h2>

                            <span
                              className={`
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold

                                ${
                                  user.role ===
                                  'admin'

                                    ? `
                                      bg-cyan-500/20
                                      text-cyan-400
                                    `

                                    : `
                                      bg-zinc-800
                                      text-zinc-400
                                    `
                                }
                              `}
                            >
                              {user.role}
                            </span>

                          </div>

                          <p
                            className="
                              text-zinc-400
                              text-sm
                            "
                          >
                            {user.email}
                          </p>

                          {/* GRID */}

                          <div
                            className="
                              grid
                              md:grid-cols-2
                              gap-3
                              mt-4
                            "
                          >

                            <InfoItem
                              label="GitHub"
                              value={
                                user.github ||
                                'Not added'
                              }
                            />

                            <InfoItem
                              label="Bio"
                              value={
                                user.bio ||
                                'No bio'
                              }
                            />

                            <InfoItem
                              label="User ID"
                              value={
                                user._id
                              }
                            />

                            <InfoItem
                              label="Joined"
                              value={
                                user.createdAt

                                  ? new Date(
                                      user.createdAt
                                    ).toLocaleDateString()

                                  : 'Unknown'
                              }
                            />

                            <InfoItem
                              label="Reviews"
                              value={
                                user.reviewCount || 0
                              }
                            />

                            <InfoItem
                              label="Updated"
                              value={
                                user.updatedAt

                                  ? new Date(
                                      user.updatedAt
                                    ).toLocaleDateString()

                                  : 'Unknown'
                              }
                            />

                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <button
                          className="
                            h-12
                            px-5
                            rounded-2xl
                            bg-cyan-500/10
                            text-cyan-400
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <RiEyeLine />

                          View

                        </button>

                        <button
                          onClick={() =>
                            handleDeleteUser(
                              user._id
                            )
                          }
                          className="
                            h-12
                            px-5
                            rounded-2xl
                            bg-red-500/10
                            text-red-400
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <RiDeleteBinLine />

                          Delete

                        </button>

                      </div>

                    </div>

                  </motion.div>

                ))}

              </div>

            </SectionCard>
          )
        }

        {/* ======================================== */}
        {/* ANALYTICS */}
        {/* ======================================== */}

        {
          activeSection ===
            'analytics' && (

            <SectionCard
              title="Reviews Analytics"
            >

              <div className="space-y-4">

                {reviews.length === 0 && (

                  <div
                    className="
                      text-zinc-500
                      text-center
                      py-10
                    "
                  >
                    No reviews found
                  </div>

                )}

                {reviews.map(review => (

                  <div
                    key={review._id}

                    className="
                      rounded-2xl
                      border
                      border-white/5
                      bg-black
                      p-5
                    "
                  >

                    <div
                      className="
                        flex
                        justify-between
                      "
                    >

                      <div>

                        <h3 className="font-semibold">

                          {
                            review.title ||

                            'Untitled Review'
                          }

                        </h3>

                        <p
                          className="
                            text-zinc-500
                            text-sm
                            mt-1
                          "
                        >

                          {
                            review.language ||

                            'Unknown'
                          }

                        </p>

                      </div>

                      <div
                        className="
                          text-cyan-400
                          font-bold
                          text-xl
                        "
                      >

                        {
                          review.score || 0
                        }

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </SectionCard>
          )
        }

        {/* ======================================== */}
        {/* SETTINGS */}
        {/* ======================================== */}

        {
          activeSection ===
            'settings' && (

            <SectionCard
              title="Platform Settings"
            >

              <div className="space-y-8">

                {/* GENERAL */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/5
                    bg-black
                    p-6
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mb-6
                    "
                  >
                    General Settings
                  </h3>

                  <div
                    className="
                      grid
                      md:grid-cols-2
                      gap-5
                    "
                  >

                    <div>

                      <label className="block mb-2 text-sm text-zinc-400">
                        Platform Name
                      </label>

                      <input
                        type="text"
                        placeholder="DevLens AI"
                        className={inputClass}
                      />

                    </div>

                    <div>

                      <label className="block mb-2 text-sm text-zinc-400">
                        Support Email
                      </label>

                      <input
                        type="email"
                        placeholder="support@devlens.ai"
                        className={inputClass}
                      />

                    </div>

                    <div>

                      <label className="block mb-2 text-sm text-zinc-400">
                        Contact Number
                      </label>

                      <input
                        type="text"
                        placeholder="+91 XXXXX XXXXX"
                        className={inputClass}
                      />

                    </div>

                    <div>

                      <label className="block mb-2 text-sm text-zinc-400">
                        Platform Version
                      </label>

                      <input
                        type="text"
                        value="v1.0.0"
                        disabled
                        className={`${inputClass} opacity-70 cursor-not-allowed`}
                      />

                    </div>

                  </div>

                </div>

                {/* SECURITY */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/5
                    bg-black
                    p-6
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mb-6
                    "
                  >
                    Security Settings
                  </h3>

                  <div className="space-y-5">

                   <SettingToggle
  title="Enable User Registration"
  description="Allow users to create accounts"

  value={
    settings.allowRegistration
  }

  onChange={async value => {

    try {

      const updated = {

        ...settings,

        allowRegistration:
          value,
      };

      setSettings(updated);

      await AdminAPI.updateSettings(
        updated
      );

      toast.success(
        'Registration setting updated'
      );

    } catch (error) {

      toast.error(
        'Failed to update setting'
      );
    }
  }}
/>

                   <SettingToggle
  title="Enable AI Reviews"
  description="Enable AI code review generation"

  value={
    settings.allowAIReviews
  }

  onChange={async value => {

    try {

      const updated = {

        ...settings,

        allowAIReviews:
          value,
      };

      setSettings(updated);

      await AdminAPI.updateSettings(
        updated
      );

      toast.success(
        'AI reviews setting updated'
      );

    } catch (error) {

      toast.error(
        'Failed to update setting'
      );
    }
  }}
/>

                    <SettingToggle
  title="Maintenance Mode"
  description="Temporarily disable platform"

  value={
    settings.maintenanceMode
  }

  onChange={async value => {

    try {

      const updated = {

        ...settings,

        maintenanceMode:
          value,
      };

      setSettings(updated);

      await AdminAPI.updateSettings(
        updated
      );

      toast.success(
        'Maintenance mode updated'
      );

    } catch (error) {

      toast.error(
        'Failed to update setting'
      );
    }
  }}
/>

                    <SettingToggle
  title="Public Profiles"
  description="Allow public profiles"

  value={
    settings.publicProfiles
  }

  onChange={async value => {

    try {

      const updated = {

        ...settings,

        publicProfiles:
          value,
      };

      setSettings(updated);

      await AdminAPI.updateSettings(
        updated
      );

      toast.success(
        'Profile setting updated'
      );

    } catch (error) {

      toast.error(
        'Failed to update setting'
      );
    }
  }}
/>

                  </div>

                </div>

                {/* SYSTEM */}

                <div
                  className="
                    rounded-3xl
                    border
                    border-white/5
                    bg-black
                    p-6
                  "
                >

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mb-6
                    "
                  >
                    System Information
                  </h3>

                  <div
                    className="
                      grid
                      md:grid-cols-3
                      gap-5
                    "
                  >

                    <SystemCard
                      title="Frontend"
                      value="React + Vite"
                    />

                    <SystemCard
                      title="Backend"
                      value="Node.js + Express"
                    />

                    <SystemCard
                      title="Database"
                      value="MongoDB"
                    />

                    <SystemCard
                      title="Authentication"
                      value="JWT"
                    />

                    <SystemCard
                      title="AI Engine"
                      value="Gemini AI"
                    />

                    <SystemCard
                      title="Deployment"
                      value="Production"
                    />

                  </div>

                </div>

              </div>

            </SectionCard>
          )
        }

      </main>

    </div>
  );
}

// ========================================
// SECTION CARD
// ========================================

function SectionCard({
  title,
  children,
}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        rounded-[2rem]
        border
        border-white/5
        bg-zinc-950
        p-8
      "
    >

      <h2
        className="
          text-4xl
          font-black
          mb-8
        "
      >
        {title}
      </h2>

      {children}

    </motion.div>
  );
}

// ========================================
// STAT CARD
// ========================================

function StatCard({
  title,
  value,
}) {

  return (

    <motion.div

      whileHover={{
        y: -4,
      }}

      className="
        rounded-[2rem]
        border
        border-white/5
        bg-zinc-950
        p-8
      "
    >

      <p className="text-zinc-500">
        {title}
      </p>

      <h2
        className="
          text-5xl
          font-black
          mt-4
        "
      >
        {value}
      </h2>

    </motion.div>
  );
}

// ========================================
// INFO ITEM
// ========================================

function InfoItem({
  label,
  value,
}) {

  return (

    <div
      className="
        rounded-2xl
        bg-black
        border
        border-white/5
        p-4
      "
    >

      <p
        className="
          text-zinc-500
          text-xs
          mb-2
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          break-all
        "
      >
        {value}
      </p>

    </div>
  );
}

// ========================================
// SETTING TOGGLE
// ========================================

function SettingToggle({

  title,

  description,

  value,

  onChange,

}) {

  return (

    <div
      className="
        flex
        items-center
        justify-between
        gap-5
        border
        border-white/5
        rounded-2xl
        p-5
      "
    >

      <div>

        <h4 className="font-semibold">
          {title}
        </h4>

        <p
          className="
            text-zinc-500
            text-sm
            mt-1
          "
        >
          {description}
        </p>

      </div>

      <button
        onClick={() =>
          onChange(!value)
        }
        className={`
          w-16
          h-9
          rounded-full
          relative
          transition-all

          ${
            value

              ? 'bg-cyan-500'

              : 'bg-zinc-700'
          }
        `}
      >

        <div
          className={`
            absolute
            top-1
            w-7
            h-7
            rounded-full
            bg-white
            transition-all

            ${
              value

                ? 'left-8'

                : 'left-1'
            }
          `}
        />

      </button>

    </div>
  );
}

// ========================================
// SYSTEM CARD
// ========================================

function SystemCard({
  title,
  value,
}) {

  return (

    <div
      className="
        rounded-2xl
        border
        border-white/5
        bg-zinc-950
        p-5
      "
    >

      <p
        className="
          text-zinc-500
          text-sm
        "
      >
        {title}
      </p>

      <h3
        className="
          text-xl
          font-bold
          mt-3
        "
      >
        {value}
      </h3>

    </div>
  );
}

// ========================================
// CLASSES
// ========================================

const inputClass = `
  w-full
  h-14
  rounded-2xl
  bg-black
  border
  border-white/5
  px-5
  outline-none
  text-white
`;