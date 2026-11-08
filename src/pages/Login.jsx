import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri';
import toast from 'react-hot-toast';

import useAuth from '../hooks/useAuth';
import { getError } from '../utils/helpers';
import AuthLayout from '../components/AuthLayout';
import AuthField from '../components/AuthField';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // where the user was trying to go before being sent to login
  const from = location.state?.from?.pathname || null;

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return toast.error('Please fill in all fields');
    }

    try {
      setLoading(true);
      const response = await login(form.email, form.password);
      const user = response?.user || response?.data?.user;

      toast.success(`Welcome back ${user?.name || ''}`);

      if (from) {
        navigate(from, { replace: true });
        return;
      }
      if (user?.role === 'admin') {
        navigate('/admin', { replace: true });
        return;
      }
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('LOGIN ERROR:', error);
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Pick up where your last review left off."
      footer={
        <>
          New to Revynix AI?{' '}
          <Link to="/register" className="font-semibold text-[#4B3FFF] hover:underline">
            Create a free account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="Your password"
          autoComplete="current-password"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#4B3FFF] font-semibold text-white hover:bg-[#3A2FE0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;