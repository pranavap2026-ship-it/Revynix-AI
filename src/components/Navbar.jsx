import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  RiDashboardLine,
  RiHistoryLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiMenu4Line,
  RiCloseLine,
  RiShieldLine,
  RiSparklingLine,
  RiHome5Line,
  RiGitPullRequestLine,
} from 'react-icons/ri';

import useAuth from '../hooks/useAuth';

// Loads the font once for the whole app. Remove the copies in the pages
// if you use this, or move this @import into index.css.
const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=JetBrains+Mono:wght@400;600&display=swap');
.rv { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
.rv-code { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.rv :focus-visible { outline: 3px solid #4B3FFF; outline-offset: 2px; }
`;

// ---------- NAV LINK ----------
// `end` makes /dashboard match only itself, so it is not highlighted
// together with /dashboard/history.

const NavLink = ({ to, icon: Icon, label, end = false, mobile = false }) => {
  const { pathname } = useLocation();
  const active = end ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  if (mobile) {
    return (
      <Link
        to={to}
        aria-current={active ? 'page' : undefined}
        className={`flex items-center gap-3 rounded-lg px-3 py-3 font-semibold ${
          active ? 'bg-[#E9E7FF] text-[#4B3FFF]' : 'text-[#14182B] hover:bg-[#E6E9F2]'
        }`}
      >
        <Icon size={18} />
        {label}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={`relative flex items-center gap-2 px-3 py-4 text-sm font-semibold ${
        active ? 'text-[#14182B]' : 'text-[#5A6078] hover:text-[#14182B]'
      }`}
    >
      <Icon size={16} />
      {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
          className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#4B3FFF]"
        />
      )}
    </Link>
  );
};

// ---------- NAVBAR ----------

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // close the mobile menu after navigating
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('revynix_user');
    localStorage.removeItem('revynix_token');
    navigate('/');
  };

  const links = [
    { to: '/', icon: RiHome5Line, label: 'Home', end: true },
    ...(user
      ? [
          { to: '/dashboard', icon: RiDashboardLine, label: 'Dashboard', end: true },
          { to: '/review', icon: RiSparklingLine, label: 'AI Review' },
          { to: '/dashboard/history', icon: RiHistoryLine, label: 'History' },
          { to: '/dashboard/profile', icon: RiUserLine, label: 'Profile' },
          ...(user.role === 'admin'
            ? [{ to: '/dashboard/admin', icon: RiShieldLine, label: 'Admin' }]
            : []),
        ]
      : []),
  ];

  const initial = user?.name?.[0]?.toUpperCase();

  return (
    <>
      <style>{FONT_CSS}</style>

      <header className="rv fixed inset-x-0 top-0 z-50 border-b border-[#D9DDE8] bg-[#F3F5F9]/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-[#14182B]">
            <RiGitPullRequestLine size={22} className="text-[#4B3FFF]" />
            Revynix AI
          </Link>

          {/* DESKTOP LINKS */}
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map(l => (
              <NavLink key={l.to} {...l} />
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="hidden items-center gap-3 md:flex">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14182B] text-sm font-bold text-white"
                    title={user.name}
                  >
                    {initial}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 rounded-lg border border-[#BFC5D6] px-4 py-2 text-sm font-semibold text-[#14182B] hover:border-[#B3261E] hover:text-[#B3261E]"
                  >
                    <RiLogoutBoxLine size={16} />
                    Log out
                  </button>
                </div>

                <button
                  onClick={() => setOpen(!open)}
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[#14182B] hover:bg-[#E6E9F2] lg:hidden"
                >
                  {open ? <RiCloseLine size={22} /> : <RiMenu4Line size={22} />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Link to="/login" className="rounded-lg px-3 py-2 hover:bg-[#E6E9F2]">
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-[#4B3FFF] px-4 py-2 text-white hover:bg-[#3A2FE0]"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {open && user && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="border-t border-[#D9DDE8] bg-[#F3F5F9] lg:hidden"
            >
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3">
                {links.map(l => (
                  <NavLink key={l.to} {...l} mobile />
                ))}
              </nav>

              <div className="border-t border-[#D9DDE8] px-4 py-4">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14182B] font-bold text-white">
                    {initial}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#14182B]">{user.name}</p>
                    <p className="truncate text-xs text-[#5A6078]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#BFC5D6] px-4 py-3 font-semibold text-[#B3261E] hover:bg-[#FDE8E6]"
                >
                  <RiLogoutBoxLine size={16} />
                  Log out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* keeps page content below the fixed bar */}
      <div className="h-14" />
    </>
  );
};

export default Navbar;