import { Link } from 'react-router-dom';
import {
  RiCodeSSlashLine,
  RiGithubLine,
  RiTwitterXLine
} from 'react-icons/ri';

const Footer = () => (
  <footer className="border-t border-white/5 bg-[var(--color-surface)] mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* TOP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">

            {/* LOGO */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background:
                  'linear-gradient(135deg, #7C3AED, #06B6D4)'
              }}
            >
              <RiCodeSSlashLine
                size={20}
                className="text-white"
              />
            </div>

            {/* BRAND NAME */}
            <h2 className="font-display font-bold text-xl tracking-wide">
              Revy<span className="text-cyan-400">nix</span> AI
            </h2>
          </div>

          {/* DESCRIPTION */}
          <p className="text-sm text-[var(--color-text-muted)] max-w-md leading-relaxed">
            Revynix AI helps developers review, optimize,
            and secure code using advanced AI-powered analysis.
            Detect bugs, improve performance, and ship cleaner
            production-ready applications faster.
          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-3 mt-6">

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/5
              hover:bg-white/5 text-[var(--color-text-muted)]
              hover:text-white transition-all duration-300"
            >
              <RiGithubLine size={18} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-white/5
              hover:bg-white/5 text-[var(--color-text-muted)]
              hover:text-white transition-all duration-300"
            >
              <RiTwitterXLine size={18} />
            </a>

          </div>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em]
          text-[var(--color-text-muted)] mb-5">
            Product
          </h4>

          <ul className="space-y-3">
            {[
              ['/', 'Home'],
              ['/review', 'AI Review'],
              ['/dashboard', 'Dashboard'],
              ['/history', 'History'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-[var(--color-text-muted)]
                  hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em]
          text-[var(--color-text-muted)] mb-5">
            Account
          </h4>

          <ul className="space-y-3">
            {[
              ['/login', 'Login'],
              ['/register', 'Register'],
              ['/profile', 'Profile'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-sm text-[var(--color-text-muted)]
                  hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="w-full h-px bg-gradient-to-r
      from-transparent via-white/10 to-transparent mt-10 mb-6" />

      {/* BOTTOM */}
      <div
        className="flex flex-col sm:flex-row items-center
        justify-between gap-3 text-xs
        text-[var(--color-text-muted)]"
      >
        <span>
          © {new Date().getFullYear()} Revynix AI.
          All rights reserved.
        </span>

        <span>
          Built with React, Node.js, MongoDB &amp; Gemini AI
        </span>
      </div>

    </div>
  </footer>
);

export default Footer;