import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';

// ========================================
// PAGES
// ========================================

import Home from './pages/Home';

import Login from './pages/Login';

import Register from './pages/Register';

import Dashboard from './pages/Dashboard';

import Reviewer from './pages/Reviewer';

import History from './pages/History';

import Profile from './pages/Profile';

import AdminPanel from './pages/AdminPanel';

import ReviewDetails from './pages/ReviewDetails';

import NotFound from './pages/NotFound';

// ========================================
// COMPONENTS
// ========================================

import Navbar from './components/Navbar';

import ProtectedRoute from './components/ProtectedRoute';

import AdminRoute from './components/AdminRoute';

// ========================================
// APP
// ========================================

function App() {
  return (
    <>
      {/* ======================================== */}
      {/* TOASTER */}
      {/* ======================================== */}

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,

          style: {
            background:
              '#18181b',

            color: '#ffffff',

            border:
              '1px solid #27272a',

            borderRadius:
              '14px',

            fontSize: '14px',
          },

          success: {
            iconTheme: {
              primary:
                '#1aae9d',

              secondary:
                '#ffffff',
            },
          },

          error: {
            iconTheme: {
              primary:
                '#ef4444',

              secondary:
                '#ffffff',
            },
          },
        }}
      />

      {/* ======================================== */}
      {/* NAVBAR */}
      {/* ======================================== */}

      <Navbar />

      {/* ======================================== */}
      {/* ROUTES */}
      {/* ======================================== */}

      <Routes>
        {/* ======================================== */}
        {/* PUBLIC ROUTES */}
        {/* ======================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ======================================== */}
        {/* REVIEWER */}
        {/* ======================================== */}

        <Route
          path="/review"
          element={
            <ProtectedRoute>
              <Reviewer />
            </ProtectedRoute>
          }
        />

        {/* ======================================== */}
        {/* REVIEW DETAILS */}
        {/* ======================================== */}

        <Route
          path="/review/:id"
          element={
            <ProtectedRoute>
              <ReviewDetails />
            </ProtectedRoute>
          }
        />

        {/* ======================================== */}
        {/* USER DASHBOARD */}
        {/* ======================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ======================================== */}
        {/* HISTORY */}
        {/* ======================================== */}

        <Route
          path="/dashboard/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* ======================================== */}
        {/* PROFILE */}
        {/* ======================================== */}

        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ======================================== */}
        {/* ADMIN DASHBOARD */}
        {/* ======================================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        {/* ======================================== */}
        {/* LEGACY ADMIN REDIRECT */}
        {/* ======================================== */}

        <Route
          path="/dashboard/admin"
          element={
            <Navigate
              to="/admin"
              replace
            />
          }
        />

        {/* ======================================== */}
        {/* REDIRECTS */}
        {/* ======================================== */}

        <Route
          path="/home"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

        {/* ======================================== */}
        {/* 404 */}
        {/* ======================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </>
  );
}

export default App;