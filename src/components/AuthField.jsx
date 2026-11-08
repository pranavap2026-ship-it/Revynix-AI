import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';

// Save as src/components/AuthField.jsx

export default function AuthField({ id, label, icon: Icon, type = 'text', ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A90A6]"
        />
        <input
          id={id}
          name={id}
          type={isPassword && show ? 'text' : type}
          className={`h-12 w-full rounded-xl border border-[#BFC5D6] bg-white pl-11 text-[#14182B] outline-none placeholder:text-[#8A90A6] focus:border-[#4B3FFF] focus:ring-2 focus:ring-[#4B3FFF]/20 ${
            isPassword ? 'pr-12' : 'pr-4'
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#5A6078] hover:bg-[#E6E9F2]"
          >
            {show ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        )}
      </div>
    </div>
  );
}