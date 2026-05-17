import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import Loader from './Loader';

// ========================================
// ADMIN ROUTE
// ========================================
const AdminRoute = ({
  children,
}) => {
  const {
    user,
    loading,
  } = useAuth();

  // LOADING

  if (loading) {
    return <Loader />;
  }

  // NO USER

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // NOT ADMIN

  if (
    user.role !== 'admin'
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;