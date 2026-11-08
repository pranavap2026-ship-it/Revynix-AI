import { useEffect, useState } from 'react';
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

const inputCls =
  'h-12 w-full rounded-xl border border-[#BFC5D6] bg-white pl-11 pr-4 text-[#14182B] placeholder:text-[#8A90A6] outline-none focus:border-[#4B3FFF] focus:ring-2 focus:ring-[#4B3FFF]/20 disabled:cursor-not-allowed disabled:bg-[#E6E9F2] disabled:text-[#5A6078]';

const Field = ({ id, label, icon: Icon, children }) => (
  <div>
    <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
      {label}
    </label>
    <div className="relative">
      <Icon
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8A90A6]"
      />
      {children}
    </div>
  </div>
);

const PasswordField = ({ id, label, name, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <Field id={id} label={label} icon={RiLockPasswordLine}>
      <input
        id={id}
        name={name}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="At least 6 characters"
        autoComplete={name === 'currentPassword' ? 'current-password' : 'new-password'}
        className={`${inputCls} pr-12`}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#5A6078] hover:bg-[#E6E9F2]"
      >
        {show ? <RiEyeOffLine /> : <RiEyeLine />}
      </button>
    </Field>
  );
};

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        github: user.github || '',
        bio: user.bio || '',
        currentPassword: '',
        newPassword: '',
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.newPassword && !formData.currentPassword) {
      toast.error('Enter your current password');
      return false;
    }
    return true;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        github: formData.github.trim(),
        bio: formData.bio.trim(),
      };
      if (formData.currentPassword && formData.newPassword) {
        payload.currentPassword = formData.currentPassword;
        payload.newPassword = formData.newPassword;
      }

      const { data } = await api.put('/auth/profile', payload);

      localStorage.setItem('user', JSON.stringify(data.data));
      setUser(data.data);
      setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '' }));
      toast.success('Profile updated');
    } catch (error) {
      console.error(error);
      toast.error(getError(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  const since = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : null;

  return (
    <div className="rv min-h-screen bg-[#F3F5F9] text-[#14182B]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Profile settings</h1>

        {/* WHO YOU ARE */}
        <div className="mt-8 flex items-center gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#14182B] text-3xl font-bold text-white">
            {user?.name?.[0]?.toUpperCase()}
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-bold">{user?.name}</h2>
              {user?.role === 'admin' && (
                <span className="flex items-center gap-1 rounded-md bg-[#E9E7FF] px-2.5 py-1 text-xs font-semibold text-[#4B3FFF]">
                  <RiShieldCheckLine size={14} />
                  Admin
                </span>
              )}
            </div>
            <p className="truncate text-[#4A5068]">{user?.email}</p>
            {since && <p className="text-sm text-[#5A6078]">Member since {since}</p>}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* ACCOUNT */}
          <section className="space-y-5 rounded-2xl border border-[#D9DDE8] bg-white p-5 sm:p-7">
            <h3 className="text-lg font-bold">Account</h3>

            <Field id="name" label="Full name" icon={RiUser3Line}>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={inputCls}
              />
            </Field>

            <Field id="email" label="Email address (cannot be changed)" icon={RiMailLine}>
              <input id="email" type="email" value={formData.email} disabled className={inputCls} />
            </Field>

            <Field id="github" label="GitHub profile" icon={RiGithubLine}>
              <input
                id="github"
                name="github"
                type="url"
                value={formData.github}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className={inputCls}
              />
            </Field>

            <div>
              <label htmlFor="bio" className="mb-1.5 block text-sm font-semibold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself"
                className="w-full resize-none rounded-xl border border-[#BFC5D6] bg-white px-4 py-3 outline-none placeholder:text-[#8A90A6] focus:border-[#4B3FFF] focus:ring-2 focus:ring-[#4B3FFF]/20"
              />
            </div>
          </section>

          {/* PASSWORD */}
          <section className="rounded-2xl border border-[#D9DDE8] bg-white p-5 sm:p-7">
            <h3 className="text-lg font-bold">Change password</h3>
            <p className="mt-1 text-sm text-[#5A6078]">Leave both fields empty to keep your current password.</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <PasswordField
                id="currentPassword"
                label="Current password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <PasswordField
                id="newPassword"
                label="New password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
          </section>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-[#4B3FFF] px-7 py-3.5 font-semibold text-white hover:bg-[#3A2FE0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RiSaveLine size={18} />
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;