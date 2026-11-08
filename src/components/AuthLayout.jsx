import { Link } from 'react-router-dom';
import { RiGitPullRequestLine } from 'react-icons/ri';

// Save as src/components/AuthLayout.jsx (default export only).
// The input component now lives in AuthField.jsx.
// It uses the `rv` font classes defined in Navbar.jsx. If the navbar is
// hidden on login and register, move FONT_CSS into index.css.

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-4 py-12 lg:grid-cols-2">
        {/* Left: a small sample of what a review looks like */}
        <div className="hidden lg:block">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <RiGitPullRequestLine size={24} className="text-[#4B3FFF]" />
            Revynix AI
          </Link>
          <h2 className="mt-10 max-w-md text-5xl font-extrabold leading-[1.05] tracking-tight">
            Reviews that point at the exact line.
          </h2>
          <div className="mt-8 max-w-md overflow-hidden rounded-xl border border-[#D9DDE8] bg-white">
            <div className="rv-code bg-[#FDE8E6] px-4 py-2 text-[13px]">- user.password = req.body.password;</div>
            <div className="rv-code overflow-x-auto bg-[#E2F6E8] px-4 py-2 text-[13px] whitespace-nowrap">
              + user.password = await bcrypt.hash(pw, 10);
            </div>
            <p className="border-t border-[#E8CF73] bg-[#FFF6D6] px-4 py-3 text-sm">
              The password was saved as plain text. Hash it before saving.
            </p>
          </div>
        </div>

        {/* Right: the form */}
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2 text-lg font-extrabold tracking-tight lg:hidden">
            <RiGitPullRequestLine size={22} className="text-[#4B3FFF]" />
            Revynix AI
          </Link>
          <div className="rounded-2xl border border-[#D9DDE8] bg-white p-6 sm:p-9">
            <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-2 text-[#4A5068]">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
          <p className="mt-6 text-center text-sm text-[#4A5068]">{footer}</p>
        </div>
      </div>
    </div>
  );
}