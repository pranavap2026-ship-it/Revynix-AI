import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

// ========================================
// PROTECTED ROUTE
// ========================================

const ProtectedRoute = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  // ========================================
  // DEBUG
  // ========================================

  console.log(
    'ProtectedRoute State:',
    {
      user,
      loading,
    }
  );

  // ========================================
  // LOADING STATE
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          {/* SPINNER */}

          <div className="w-12 h-12 border-4 border-zinc-700 border-t-teal-400 rounded-full animate-spin"></div>

          {/* TEXT */}

          <p className="text-zinc-400 text-sm">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // NOT LOGGED IN
  // ========================================

  if (!user) {
    console.log(
      'No user found → redirecting to login'
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ========================================
  // AUTHORIZED
  // ========================================

  console.log(
    'User authenticated'
  );

  return children;
};

export default ProtectedRoute;