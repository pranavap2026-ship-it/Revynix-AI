import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMailLine, RiLockPasswordLine, RiUserLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';
import { getError } from '../utils/helpers';
import AuthLayout from '../components/AuthLayout';
import AuthField from '../components/AuthField';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirm.trim()) {
      return toast.error('Please fill in all fields');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);
      const response = await register(form.name, form.email, form.password);
      const user = response?.user || response?.data?.user;

      toast.success(`Welcome ${user?.name || ''}`);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free to start. Your first review takes about a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#4B3FFF] hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField
          id="name"
          label="Full name"
          icon={RiUserLine}
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          autoComplete="name"
        />
        <AuthField
          id="email"
          label="Email"
          icon={RiMailLine}
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="Password"
          icon={RiLockPasswordLine}
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <AuthField
          id="confirm"
          label="Confirm password"
          icon={RiLockPasswordLine}
          type="password"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Type it again"
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#4B3FFF] font-semibold text-white hover:bg-[#3A2FE0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </AuthLayout>
  );
}