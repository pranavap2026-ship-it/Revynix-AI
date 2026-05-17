import axios from 'axios';

import toast from 'react-hot-toast';

// ========================================
// API URL
// ========================================

const API_URL =

  import.meta.env.VITE_API_URL ||

  'http://localhost:5000/api';

// ========================================
// AXIOS INSTANCE
// ========================================

const API = axios.create({

  baseURL: API_URL,

  withCredentials: true,

  timeout: 30000,

  headers: {

    'Content-Type':
      'application/json',
  },
});

// ========================================
// REQUEST INTERCEPTOR
// ========================================

API.interceptors.request.use(

  config => {

    const token =
      localStorage.getItem(
        'revynix_token'
      ) ||

      localStorage.getItem(
        'devlens_token'
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  error =>
    Promise.reject(error)
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

API.interceptors.response.use(

  response => response,

  error => {

    // ====================================
    // NETWORK ERROR
    // ====================================

    if (!error.response) {

      console.error(
        'SERVER CONNECTION FAILED'
      );

      toast.error(
        'Backend server unavailable'
      );

      return Promise.reject(
        error
      );
    }

    const {
      status,
      data,
    } = error.response;

    // ====================================
    // 401
    // ====================================

    if (
      status === 401
    ) {

      localStorage.removeItem(
        'revynix_token'
      );

      localStorage.removeItem(
        'revynix_user'
      );

      localStorage.removeItem(
        'devlens_token'
      );

      localStorage.removeItem(
        'devlens_user'
      );

      if (
        window.location.pathname !==
        '/login'
      ) {

        toast.error(
          'Session expired'
        );

        window.location.href =
          '/login';
      }
    }

    // ====================================
    // 403
    // ====================================

    else if (
      status === 403
    ) {

      toast.error(

        data?.message ||

        'Access denied'
      );
    }

    // ====================================
    // 404
    // ====================================

    else if (
      status === 404
    ) {

      toast.error(

        data?.message ||

        'API route not found'
      );
    }

    // ====================================
    // 429
    // ====================================

    else if (
      status === 429
    ) {

      toast.error(

        data?.message ||

        'Too many requests'
      );
    }

    // ====================================
    // 500
    // ====================================

    else if (
      status >= 500
    ) {

      toast.error(

        data?.message ||

        'Internal server error'
      );
    }

    return Promise.reject(
      error
    );
  }
);

// ========================================
// AUTH API
// ========================================

export const AuthAPI = {

  register: data =>
    API.post(
      '/auth/register',
      data
    ),

  login: data =>
    API.post(
      '/auth/login',
      data
    ),

  getMe: () =>
    API.get('/auth/me'),

  logout: () =>
    API.post(
      '/auth/logout'
    ),

  updateProfile: data =>
    API.put(
      '/auth/profile',
      data
    ),
};

// ========================================
// USER API
// ========================================

export const UserAPI = {

  updateProfile: data =>
    API.put(
      '/users/profile',
      data
    ),

  changePassword: data =>
    API.put(
      '/users/change-password',
      data
    ),
};

// ========================================
// REVIEW API
// ========================================

export const ReviewAPI = {

  createReview: data =>
    API.post(
      '/reviews',
      data
    ),

  getReviews: params =>
    API.get(
      '/reviews',
      {
        params,
      }
    ),

  getReview: id =>
    API.get(
      `/reviews/${id}`
    ),

  getReviewById: id =>
    API.get(
      `/reviews/${id}`
    ),

  getMyReviews: () =>
    API.get(
      '/reviews/my'
    ),

  deleteReview: id =>
    API.delete(
      `/reviews/${id}`
    ),

  toggleSave: id =>
    API.patch(
      `/reviews/${id}/save`
    ),

  toggleStar: id =>
    API.patch(
      `/reviews/${id}/star`
    ),

  getStats: () =>
    API.get(
      '/reviews/stats'
    ),
};

// ========================================
// ADMIN API
// ========================================

export const AdminAPI = {

  // USERS

  getUsers: params =>
    API.get(
      '/admin/users',
      {
        params,
      }
    ),

  deleteUser: id =>
    API.delete(
      `/admin/users/${id}`
    ),

  updateUserRole:
    (
      id,
      role
    ) =>
      API.patch(
        `/admin/users/${id}/role`,
        { role }
      ),

  blockUser: id =>
    API.patch(
      `/admin/users/${id}/block`
    ),

  unblockUser: id =>
    API.patch(
      `/admin/users/${id}/unblock`
    ),

  // STATS

  getPlatformStats:
    () =>
      API.get(
        '/admin/stats'
      ),

  // REVIEWS

  getAllReviews:
    () =>
      API.get(
        '/admin/reviews'
      ),

  deleteReview: id =>
    API.delete(
      `/admin/reviews/${id}`
    ),

  // SETTINGS

  getSettings:
    () =>
      API.get(
        '/admin/settings'
      ),

  updateSettings:
    data =>
      API.put(
        '/admin/settings',
        data
      ),

  // HOMEPAGE CMS

  getHomePageContent:
    () =>
      API.get(
        '/admin/home-content'
      ),

  updateHomePageContent:
    data =>
      API.put(
        '/admin/home-content',
        data
      ),
};

// ========================================
// GENERAL API
// ========================================

export const GeneralAPI = {

  healthCheck: () =>
    API.get('/health'),

  getApiInfo: () =>
    API.get('/info'),
};

// ========================================
// EXPORT
// ========================================

export default API;