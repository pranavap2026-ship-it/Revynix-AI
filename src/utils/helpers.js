// ========================================
// FORMAT DATE
// ========================================
export const formatDate =
  date => {
    return new Date(
      date
    ).toLocaleDateString();
  };

// ========================================
// COPY TO CLIPBOARD
// ========================================
export const copyToClipboard =
  async text => {
    try {
      await navigator.clipboard.writeText(
        text
      );

      return true;
    } catch {
      return false;
    }
  };

// ========================================
// TIME AGO
// ========================================
export const timeAgo = date => {
  const now = new Date();

  const seconds = Math.floor(
    (now - new Date(date)) / 1000
  );

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const key in intervals) {
    const value = Math.floor(
      seconds / intervals[key]
    );

    if (value >= 1) {
      return `${value} ${key}${
        value > 1 ? 's' : ''
      } ago`;
    }
  }

  return 'Just now';
};

// ========================================
// SCORE COLOR
// ========================================
export const scoreColor =
  score => {
    if (score >= 80)
      return '#22c55e';

    if (score >= 60)
      return '#f59e0b';

    return '#ef4444';
  };

// ========================================
// SCORE CLASS
// ========================================
export const scoreColorClass =
  score => {
    if (score >= 80)
      return 'text-green-400';

    if (score >= 60)
      return 'text-yellow-400';

    return 'text-red-400';
  };

// ========================================
// ERROR PARSER
// ========================================
export const getError =
  error => {
    return (
      error?.response?.data
        ?.message ||
      error.message ||
      'Something went wrong'
    );
  };