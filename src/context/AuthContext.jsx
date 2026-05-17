import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import api from '../utils/api';

import toast from 'react-hot-toast';

// ========================================
// AUTH CONTEXT
// ========================================

const AuthContext =
  createContext(null);

// ========================================
// AUTH PROVIDER
// ========================================

export const AuthProvider = ({
  children,
}) => {
  // ====================================
  // STATES
  // ====================================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ====================================
  // LOAD AUTH
  // ====================================

  useEffect(() => {
    const loadAuth =
      async () => {
        try {
          const storedUser =
            localStorage.getItem(
              'devlens_user'
            );

          const storedToken =
            localStorage.getItem(
              'devlens_token'
            );

          // NO TOKEN

          if (
            !storedToken ||
            !storedUser
          ) {
            setLoading(false);

            return;
          }

          // SET TOKEN

          api.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${storedToken}`;

          // PARSE USER

          const parsedUser =
            JSON.parse(
              storedUser
            );

          setUser(
            parsedUser
          );

          // OPTIONAL VERIFY USER

          try {
            const {
              data,
            } =
              await api.get(
                '/auth/me'
              );

            if (
              data?.user
            ) {
              setUser(
                data.user
              );

              localStorage.setItem(
                'devlens_user',

                JSON.stringify(
                  data.user
                )
              );
            }
          } catch (error) {
            console.log(
              'TOKEN VERIFY FAILED'
            );

            logout();
          }
        } catch (error) {
          console.error(
            'AUTH LOAD ERROR:',
            error
          );

          clearAuth();
        } finally {
          setLoading(false);
        }
      };

    loadAuth();
  }, []);

  // ====================================
  // CLEAR AUTH
  // ====================================

  const clearAuth =
    useCallback(() => {
      setUser(null);

      localStorage.removeItem(
        'devlens_user'
      );

      localStorage.removeItem(
        'devlens_token'
      );

      delete api.defaults
        .headers.common[
        'Authorization'
      ];
    }, []);

  // ====================================
  // SAVE AUTH
  // ====================================

  const saveAuth =
    useCallback(
      (
        userData,
        token
      ) => {
        // SAVE USER

        setUser(userData);

        // LOCAL STORAGE

        localStorage.setItem(
          'devlens_user',

          JSON.stringify(
            userData
          )
        );

        localStorage.setItem(
          'devlens_token',
          token
        );

        // AXIOS TOKEN

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
      },

      []
    );

  // ====================================
  // REGISTER
  // ====================================

  const register =
    useCallback(
      async (
        name,
        email,
        password
      ) => {
        try {
          const {
            data,
          } =
            await api.post(
              '/auth/register',
              {
                name,
                email,
                password,
              }
            );

          // SAVE AUTH

          saveAuth(
            data.user,
            data.token
          );

          toast.success(
            `Welcome to Revynix AI, ${data.user.name}!`
          );

          return data;
        } catch (error) {
          console.error(
            'REGISTER ERROR:',
            error
          );

          throw error;
        }
      },

      [saveAuth]
    );

  // ====================================
  // LOGIN
  // ====================================

  const login =
    useCallback(
      async (
        email,
        password
      ) => {
        try {
          const {
            data,
          } =
            await api.post(
              '/auth/login',
              {
                email,
                password,
              }
            );

          // SAVE AUTH

          saveAuth(
            data.user,
            data.token
          );

          toast.success(
            `Welcome back, ${data.user.name}!`
          );

          return data;
        } catch (error) {
          console.error(
            'LOGIN ERROR:',
            error
          );

          throw error;
        }
      },

      [saveAuth]
    );

  // ====================================
  // LOGOUT
  // ====================================

  const logout =
    useCallback(() => {
      clearAuth();

      toast.success(
        'Logged out successfully'
      );

      window.location.href =
        '/login';
    }, [clearAuth]);

  // ====================================
  // UPDATE USER
  // ====================================

  const updateUser =
    useCallback(
      async updates => {
        try {
          const {
            data,
          } =
            await api.put(
              '/users/profile',
              updates
            );

          const updatedUser =
            {
              ...user,
              ...data.user,
            };

          // UPDATE STATE

          setUser(
            updatedUser
          );

          // UPDATE STORAGE

          localStorage.setItem(
            'devlens_user',

            JSON.stringify(
              updatedUser
            )
          );

          toast.success(
            'Profile updated successfully'
          );

          return data.user;
        } catch (error) {
          console.error(
            'UPDATE USER ERROR:',
            error
          );

          throw error;
        }
      },

      [user]
    );

  // ====================================
  // MEMO VALUE
  // ====================================

  const value =
    useMemo(
      () => ({
        // USER

        user,

        setUser,

        // STATUS

        loading,

        isAuthenticated:
          !!user,

        isAdmin:
          user?.role ===
          'admin',

        // METHODS

        register,

        login,

        logout,

        updateUser,
      }),

      [
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
      ]
    );

  // ====================================
  // PROVIDER
  // ====================================

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// CUSTOM HOOK
// ========================================

function useAuth() {

  const context =
    useContext(
      AuthContext
    );

  if (!context) {

    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}

export {
  useAuth
};