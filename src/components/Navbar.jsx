import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import {
  motion,
  AnimatePresence,
} from 'framer-motion';

import {
  useEffect,
  useState,
} from 'react';

import useAuth from '../hooks/useAuth';

import {
  RiCodeSSlashLine,
  RiDashboardLine,
  RiHistoryLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiMenu4Line,
  RiCloseLine,
  RiShieldLine,
  RiSparklingLine,
  RiHome5Line,
} from 'react-icons/ri';

// ========================================
// NAV LINK
// ========================================

const NavLink = ({
  to,
  icon: Icon,
  label,
  onClick,
}) => {

  const location =
    useLocation();

  const active =
    location.pathname === to ||

    location.pathname.startsWith(
      `${to}/`
    );

  return (

    <Link
      to={to}
      onClick={onClick}
      className={`
        relative
        flex items-center gap-2

        px-4 py-2.5

        rounded-xl

        text-sm font-medium

        transition-all duration-300

        overflow-hidden

        ${
          active

            ? `
              text-cyan-400
              bg-cyan-500/10
            `

            : `
              text-zinc-400
              hover:text-white
              hover:bg-white/5
            `
        }
      `}
    >

      <Icon size={17} />

      <span>
        {label}
      </span>

      {active && (

        <motion.div
          layoutId="active-nav"

          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}

          className="
            absolute inset-0
            rounded-xl
            border border-cyan-400/20
            bg-cyan-500/5
          "
        />

      )}

    </Link>
  );
};

// ========================================
// NAVBAR
// ========================================

const Navbar = () => {

  const {
    user,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [open,
    setOpen] =
    useState(false);

  // ========================================
  // CLOSE MOBILE MENU
  // ========================================

  useEffect(() => {

    setOpen(false);

  }, [location.pathname]);

  // ========================================
  // LOGOUT
  // ========================================

  const handleLogout =
    async () => {

      await logout();

      localStorage.removeItem(
        'revynix_user'
      );

      localStorage.removeItem(
        'revynix_token'
      );

      navigate('/');
    };

  return (

    <>
      {/* ======================================== */}
      {/* NAVBAR */}
      {/* ======================================== */}

      <header
        className="
          fixed top-0 left-0 right-0
          z-50

          backdrop-blur-2xl

          bg-black/40

          border-b border-white/5

          shadow-lg
        "
      >

        <div
          className="
            max-w-7xl mx-auto

            px-4

            h-14

            flex items-center justify-between
          "
        >

          {/* ======================================== */}
          {/* LOGO */}
          {/* ======================================== */}

          <Link
            to="/"

            className="
              flex items-center gap-3
              group
            "
          >

            <motion.div

              whileHover={{
                rotate: 8,
                scale: 1.05,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                w-9 h-9
                rounded-xl

                flex items-center justify-center

                shadow-xl
              "

              style={{
                background:
                  'linear-gradient(135deg,#7C3AED,#06B6D4)',
              }}
            >

              <RiCodeSSlashLine
                size={18}
                className="text-white"
              />

            </motion.div>

            <div>

              <h1
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  leading-none
                "
              >

                Revy
                <span className="text-cyan-400">
                  nix
                </span>{' '}
                AI

              </h1>

              <p
                className="
                  text-[9px]
                  tracking-[0.25em]
                  text-zinc-500
                  mt-1
                "
              >
                AI CODE REVIEWER
              </p>

            </div>

          </Link>

          {/* ======================================== */}
          {/* DESKTOP NAV */}
          {/* ======================================== */}

          <nav
            className="
              hidden lg:flex
              items-center gap-2
            "
          >

            <NavLink
              to="/"
              icon={RiHome5Line}
              label="Home"
            />

            {user && (

              <>
                <NavLink
                  to="/dashboard"
                  icon={RiDashboardLine}
                  label="Dashboard"
                />

                <NavLink
                  to="/review"
                  icon={RiSparklingLine}
                  label="AI Review"
                />

                <NavLink
                  to="/dashboard/history"
                  icon={RiHistoryLine}
                  label="History"
                />

                <NavLink
                  to="/dashboard/profile"
                  icon={RiUserLine}
                  label="Profile"
                />

                {user?.role === 'admin' && (

                  <NavLink
                    to="/dashboard/admin"
                    icon={RiShieldLine}
                    label="Admin"
                  />

                )}
              </>
            )}

          </nav>

          {/* ======================================== */}
          {/* RIGHT SIDE */}
          {/* ======================================== */}

          <div
            className="
              flex items-center gap-3
            "
          >

            {user ? (

              <>
                {/* USER */}

                <div
                  className="
                    hidden md:flex
                    items-center gap-3
                  "
                >

                  {/* AVATAR */}

                  <motion.div

                    whileHover={{
                      scale: 1.08,
                    }}

                    className="
                      w-9 h-9
                      rounded-full

                      flex items-center justify-center

                      text-sm
                      font-bold
                      text-white

                      shadow-lg
                    "

                    style={{
                      background:
                        'linear-gradient(135deg,#7C3AED,#06B6D4)',
                    }}
                  >

                    {
                      user?.name?.[0]?.toUpperCase()
                    }

                  </motion.div>

                  {/* LOGOUT */}

                  <button
                    onClick={
                      handleLogout
                    }

                    className="
                      flex items-center gap-2

                      px-4 py-2

                      rounded-xl

                      bg-red-500/10

                      hover:bg-red-500/20

                      text-red-400

                      text-sm

                      transition-all duration-300
                    "
                  >

                    <RiLogoutBoxLine
                      size={16}
                    />

                    Logout

                  </button>

                </div>

                {/* MOBILE MENU */}

                <button

                  onClick={() =>
                    setOpen(!open)
                  }

                  className="
                    lg:hidden

                    w-10 h-10

                    rounded-xl

                    flex items-center justify-center

                    hover:bg-white/5

                    transition-all
                  "
                >

                  <AnimatePresence
                    mode="wait"
                  >

                    <motion.div

                      key={open ? 'close' : 'menu'}

                      initial={{
                        opacity: 0,
                        rotate: -90,
                      }}

                      animate={{
                        opacity: 1,
                        rotate: 0,
                      }}

                      exit={{
                        opacity: 0,
                        rotate: 90,
                      }}

                      transition={{
                        duration: 0.2,
                      }}
                    >

                      {open ? (

                        <RiCloseLine
                          size={22}
                        />

                      ) : (

                        <RiMenu4Line
                          size={22}
                        />

                      )}

                    </motion.div>

                  </AnimatePresence>

                </button>
              </>

            ) : (

              <div
                className="
                  flex items-center gap-2
                "
              >

                <Link
                  to="/login"

                  className="
                    px-4 py-2

                    rounded-xl

                    border border-white/10

                    hover:bg-white/5

                    text-sm

                    transition-all
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"

                  className="
                    px-4 py-2

                    rounded-xl

                    text-sm
                    font-medium

                    text-white

                    shadow-lg

                    transition-all duration-300

                    hover:scale-[1.03]
                  "

                  style={{
                    background:
                      'linear-gradient(135deg,#7C3AED,#06B6D4)',
                  }}
                >
                  Get Started
                </Link>

              </div>

            )}

          </div>

        </div>

        {/* ======================================== */}
        {/* MOBILE MENU */}
        {/* ======================================== */}

        <AnimatePresence>

          {open && (

            <motion.div

              initial={{
                opacity: 0,
                y: -15,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                y: -15,
              }}

              transition={{
                duration: 0.25,
              }}

              className="
                lg:hidden

                border-t border-white/5

                bg-zinc-950/95

                backdrop-blur-2xl
              "
            >

              <div
                className="
                  px-4 py-4

                  flex flex-col gap-2
                "
              >

                <NavLink
                  to="/"
                  icon={RiHome5Line}
                  label="Home"
                />

                {user && (

                  <>
                    <NavLink
                      to="/dashboard"
                      icon={RiDashboardLine}
                      label="Dashboard"
                    />

                    <NavLink
                      to="/review"
                      icon={RiSparklingLine}
                      label="AI Review"
                    />

                    <NavLink
                      to="/dashboard/history"
                      icon={RiHistoryLine}
                      label="History"
                    />

                    <NavLink
                      to="/dashboard/profile"
                      icon={RiUserLine}
                      label="Profile"
                    />

                    {user?.role === 'admin' && (

                      <NavLink
                        to="/dashboard/admin"
                        icon={RiShieldLine}
                        label="Admin"
                      />

                    )}

                    {/* MOBILE USER */}

                    <div
                      className="
                        mt-4

                        pt-4

                        border-t border-white/5
                      "
                    >

                      <div
                        className="
                          flex items-center gap-3

                          mb-4
                        "
                      >

                        <div
                          className="
                            w-10 h-10
                            rounded-full

                            flex items-center justify-center

                            font-bold
                            text-white
                          "

                          style={{
                            background:
                              'linear-gradient(135deg,#7C3AED,#06B6D4)',
                          }}
                        >

                          {
                            user?.name?.[0]?.toUpperCase()
                          }

                        </div>

                        <div>

                          <h3 className="font-semibold">
                            {user?.name}
                          </h3>

                          <p
                            className="
                              text-xs
                              text-zinc-500
                            "
                          >
                            {user?.email}
                          </p>

                        </div>

                      </div>

                      <button

                        onClick={
                          handleLogout
                        }

                        className="
                          w-full

                          flex items-center justify-center gap-2

                          px-4 py-3

                          rounded-xl

                          bg-red-500/10

                          hover:bg-red-500/20

                          text-red-400

                          transition-all
                        "
                      >

                        <RiLogoutBoxLine
                          size={16}
                        />

                        Logout

                      </button>

                    </div>
                  </>

                )}

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </header>

      {/* SPACER */}

      <div className="h-14" />
    </>
  );
};

export default Navbar;