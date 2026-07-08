/**
 * Financial Formatters
 * Utility functions for formatting currency, dates, and percentages
 * in Indian locale conventions.
 */

/**
 * Formats a number as Indian Rupee currency.
 * Uses the Indian numbering system (lakhs, crores).
 *
 * @param amount - The amount in INR
 * @param showDecimal - Whether to show decimal places (default: true)
 * @returns Formatted currency string, e.g., "₹1,23,456.00"
 *
 * @example
 * formatCurrency(123456) // "₹1,23,456.00"
 * formatCurrency(123456, false) // "₹1,23,456"
 */
export function formatCurrency(amount: number, showDecimal = true): string {
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });
  return formatter.format(amount);
}

/**
 * Formats a number as compact Indian notation.
 *
 * @param num - The number to format
 * @returns Compact string, e.g., "1.2L", "45K", "2.5Cr"
 *
 * @example
 * formatCompactNumber(50000) // "50K"
 * formatCompactNumber(1500000) // "15L"
 * formatCompactNumber(25000000) // "2.5Cr"
 */
export function formatCompactNumber(num: number): string {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 10000000) {
    return `${sign}${(absNum / 10000000).toFixed(1).replace(/\.0$/, '')}Cr`;
  }
  if (absNum >= 100000) {
    return `${sign}${(absNum / 100000).toFixed(1).replace(/\.0$/, '')}L`;
  }
  if (absNum >= 1000) {
    return `${sign}${(absNum / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${sign}${absNum}`;
}

/**
 * Formats a percentage value with a sign indicator.
 *
 * @param value - The percentage value
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string, e.g., "+12.5%", "-3.2%"
 *
 * @example
 * formatPercentage(12.5) // "+12.5%"
 * formatPercentage(-3.2) // "-3.2%"
 * formatPercentage(0) // "0.0%"
 */
export function formatPercentage(value: number, decimals = 1): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Formats a date in a user-friendly format.
 *
 * @param dateStr - ISO date string
 * @param format - 'short' | 'medium' | 'long' | 'relative'
 * @returns Formatted date string
 *
 * @example
 * formatDate('2026-07-07', 'short') // "7 Jul"
 * formatDate('2026-07-07', 'medium') // "7 Jul 2026"
 * formatDate('2026-07-07', 'relative') // "Today" or "2 days ago"
 */
export function formatDate(
  dateStr: string,
  format: 'short' | 'medium' | 'long' | 'relative' = 'medium'
): string {
  const date = new Date(dateStr);

  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    case 'medium':
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    case 'long':
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    case 'relative':
      return getRelativeTime(date);
    default:
      return date.toLocaleDateString('en-IN');
  }
}

/**
 * Returns a relative time string for a given date.
 * @param date - The date to compare against now
 * @returns Relative time string, e.g., "Today", "Yesterday", "3 days ago"
 */
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Masks an account number for secure display.
 *
 * @param accountNumber - Full account number
 * @returns Masked string, e.g., "XXXX XXXX 1234"
 */
export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  const lastFour = accountNumber.slice(-4);
  const masked = accountNumber.slice(0, -4).replace(/./g, 'X');
  return `${masked}${lastFour}`.replace(/(.{4})/g, '$1 ').trim();
}

/**
 * Formats a month string (YYYY-MM) into a readable label.
 * @param monthStr - Month in YYYY-MM format
 * @returns Readable month label, e.g., "Jul 2026"
 */
export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}
