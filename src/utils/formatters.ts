/**
 * Centralized Indian Rupee Currency Formatter
 * Complies with specification: Indian number grouping (lakhs/crores) e.g. TP 2,500, TP 18,000, TP 1,25,000
 */
export const formatINR = (amount: number | null | undefined): string => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return 'TP 0';
  }

  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  // Format using Indian locale grouping
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(absAmount);

  return `${isNegative ? '-' : ''}TP ${formatted}`;
};

/**
 * Standard & Relative Date Formatter
 */
export const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '--';

  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return '--';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  // Relative cases
  if (diffHours >= 0 && diffHours < 1) {
    const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
    return `${diffMinutes} min ago`;
  }
  if (diffHours >= 1 && diffHours < 24) {
    return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }

  // Standard format: "17 Aug 2026"
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
