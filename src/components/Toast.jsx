import { Toaster, toast } from 'react-hot-toast';

import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiInformationFill,
  RiLoader4Line,
} from 'react-icons/ri';

// ========================================
// CUSTOM TOAST COMPONENT
// ========================================

const Toast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      toastOptions={{
        duration: 3500,

        style: {
          background:
            'rgba(24,24,27,0.95)',

          color: '#ffffff',

          border:
            '1px solid rgba(255,255,255,0.08)',

          borderRadius: '18px',

          padding:
            '14px 16px',

          backdropFilter:
            'blur(14px)',

          boxShadow:
            '0 10px 40px rgba(0,0,0,0.35)',

          fontSize: '14px',

          fontWeight: '500',

          maxWidth: '380px',
        },

        success: {
          iconTheme: {
            primary:
              '#14b8a6',

            secondary:
              '#ffffff',
          },

          style: {
            border:
              '1px solid rgba(20,184,166,0.25)',
          },
        },

        error: {
          iconTheme: {
            primary:
              '#ef4444',

            secondary:
              '#ffffff',
          },

          style: {
            border:
              '1px solid rgba(239,68,68,0.25)',
          },
        },

        loading: {
          iconTheme: {
            primary:
              '#60a5fa',

            secondary:
              '#ffffff',
          },
        },
      }}
    />
  );
};

// ========================================
// CUSTOM TOAST HELPERS
// ========================================

export const showSuccess = (
  message
) => {
  toast.success(message, {
    icon: (
      <RiCheckboxCircleFill
        size={18}
        className="text-teal-400"
      />
    ),
  });
};

export const showError = (
  message
) => {
  toast.error(message, {
    icon: (
      <RiCloseCircleFill
        size={18}
        className="text-red-400"
      />
    ),
  });
};

export const showInfo = (
  message
) => {
  toast(message, {
    icon: (
      <RiInformationFill
        size={18}
        className="text-blue-400"
      />
    ),
  });
};

export const showLoading = (
  message = 'Loading...'
) => {
  return toast.loading(message, {
    icon: (
      <RiLoader4Line
        size={18}
        className="animate-spin text-blue-400"
      />
    ),
  });
};

export const dismissToast = (
  id
) => {
  toast.dismiss(id);
};

// ========================================
// EXPORT
// ========================================

export default Toast;