/**
 * Application Constants
 * Centralized configuration values and magic strings.
 */

/** Application metadata */
export const APP_NAME = 'WealthWise AI';
export const APP_DESCRIPTION = 'AI-Powered Wealth Companion by IDBI Bank';
export const APP_VERSION = '1.0.0';

/** IDBI Bank branding */
export const IDBI_BRAND = {
  name: 'IDBI Bank',
  tagline: 'Banking for a Better Tomorrow',
  primaryColor: '#00836c',
  secondaryColor: '#f47920',
} as const;

/** Financial constants for India */
export const FINANCIAL_CONSTANTS = {
  /** Average inflation rate in India */
  INFLATION_RATE: 6,
  /** Risk-free rate (approximate govt bond yield) */
  RISK_FREE_RATE: 7,
  /** Recommended minimum savings rate */
  MIN_SAVINGS_RATE: 20,
  /** Recommended emergency fund months */
  RECOMMENDED_EMERGENCY_MONTHS: 6,
  /** Maximum recommended DTI ratio */
  MAX_DTI_RATIO: 40,
  /** Tax brackets FY 2025-26 (new regime) */
  TAX_BRACKETS: [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 5 },
    { min: 700000, max: 1000000, rate: 10 },
    { min: 1000000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: Infinity, rate: 30 },
  ],
} as const;

/** Health score thresholds */
export const HEALTH_SCORE_THRESHOLDS = {
  EXCELLENT: { min: 85, label: 'Excellent' as const, color: '#22c55e' },
  GOOD: { min: 70, label: 'Good' as const, color: '#84cc16' },
  FAIR: { min: 55, label: 'Fair' as const, color: '#eab308' },
  NEEDS_IMPROVEMENT: { min: 40, label: 'Needs Improvement' as const, color: '#f97316' },
  POOR: { min: 0, label: 'Poor' as const, color: '#ef4444' },
} as const;

/** Rate limiting configuration */
export const RATE_LIMITS = {
  CHAT_API: { maxRequests: 10, windowMs: 60000 },
  DATA_API: { maxRequests: 100, windowMs: 60000 },
} as const;

/** Navigation items */
export const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: 'home' },
  { href: '/avatar', label: 'AI Avatar', icon: 'bot' },
  { href: '/health', label: 'Health Score', icon: 'heart-pulse' },
  { href: '/spending', label: 'Spending', icon: 'pie-chart' },
  { href: '/portfolio', label: 'Portfolio', icon: 'briefcase' },
  { href: '/goals', label: 'Goals', icon: 'target' },
  { href: '/invest', label: 'Invest', icon: 'trending-up' },
  { href: '/retirement', label: 'Retirement', icon: 'sunset' },
  { href: '/tax', label: 'Tax Optimizer', icon: 'receipt' },
  { href: '/risk-profile', label: 'Risk Profile', icon: 'shield' },
  { href: '/insights', label: 'Insights', icon: 'lightbulb' },
  { href: '/gold', label: 'Digital Gold', icon: 'gem' },
  { href: '/family', label: 'Family', icon: 'users' },
  { href: '/notifications', label: 'Notifications', icon: 'bell' },
] as const;

/** Disclaimer text for AI-generated content */
export const AI_DISCLAIMER =
  'This is AI-generated guidance for informational purposes only. It does not constitute certified financial advice. Please consult a qualified financial advisor before making investment decisions. Past performance does not guarantee future returns.';

/** Consent text for data usage */
export const DATA_CONSENT_TEXT =
  'WealthWise AI analyzes your transaction data to provide personalized financial insights. Your data is processed securely and never shared with third parties. You can revoke consent at any time from Settings.';
