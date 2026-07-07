/**
 * Banking Domain Types
 * Core type definitions for IDBI Bank transaction and account data.
 */

/** Supported transaction categories for spending analysis */
export type TransactionCategory =
  | 'salary'
  | 'rent'
  | 'groceries'
  | 'dining'
  | 'transport'
  | 'shopping'
  | 'utilities'
  | 'subscriptions'
  | 'healthcare'
  | 'education'
  | 'entertainment'
  | 'emi'
  | 'insurance'
  | 'investment'
  | 'transfer'
  | 'atm'
  | 'miscellaneous';

/** Transaction type: credit or debit */
export type TransactionType = 'credit' | 'debit';

/** Payment mode used for the transaction */
export type PaymentMode = 'upi' | 'neft' | 'imps' | 'card' | 'cash' | 'auto_debit' | 'cheque';

/** A single banking transaction */
export interface Transaction {
  /** Unique transaction identifier */
  readonly id: string;
  /** Transaction date in ISO format */
  readonly date: string;
  /** Description/narration of the transaction */
  readonly description: string;
  /** Transaction amount in INR */
  readonly amount: number;
  /** Credit or debit */
  readonly type: TransactionType;
  /** Spending category */
  readonly category: TransactionCategory;
  /** Payment mode */
  readonly mode: PaymentMode;
  /** Merchant or counterparty name */
  readonly merchant: string;
  /** Running balance after this transaction */
  readonly balance: number;
}

/** Bank account summary */
export interface Account {
  /** Account number (masked for display) */
  readonly accountNumber: string;
  /** Account type */
  readonly accountType: 'savings' | 'current' | 'fd' | 'rd';
  /** Current balance in INR */
  readonly balance: number;
  /** Account holder name */
  readonly holderName: string;
  /** IFSC code */
  readonly ifscCode: string;
  /** Branch name */
  readonly branch: string;
  /** Account opening date */
  readonly openedDate: string;
}

/** Monthly financial summary */
export interface MonthlySummary {
  /** Month in YYYY-MM format */
  readonly month: string;
  /** Total income for the month */
  readonly totalIncome: number;
  /** Total expenses for the month */
  readonly totalExpenses: number;
  /** Net savings */
  readonly savings: number;
  /** Savings rate as percentage */
  readonly savingsRate: number;
  /** Breakdown by category */
  readonly categoryBreakdown: CategoryBreakdown[];
}

/** Spending by category */
export interface CategoryBreakdown {
  readonly category: TransactionCategory;
  readonly amount: number;
  readonly percentage: number;
  readonly transactionCount: number;
  /** Change compared to previous month (percentage) */
  readonly monthOverMonthChange: number | null;
}

/** Category display metadata */
export interface CategoryMeta {
  readonly label: string;
  readonly icon: string;
  readonly color: string;
}

/** Map of categories to their display metadata */
export const CATEGORY_META: Record<TransactionCategory, CategoryMeta> = {
  salary: { label: 'Salary', icon: '💰', color: '#22c55e' },
  rent: { label: 'Rent', icon: '🏠', color: '#ef4444' },
  groceries: { label: 'Groceries', icon: '🛒', color: '#f97316' },
  dining: { label: 'Dining', icon: '🍽️', color: '#eab308' },
  transport: { label: 'Transport', icon: '🚗', color: '#3b82f6' },
  shopping: { label: 'Shopping', icon: '🛍️', color: '#a855f7' },
  utilities: { label: 'Utilities', icon: '💡', color: '#06b6d4' },
  subscriptions: { label: 'Subscriptions', icon: '📱', color: '#ec4899' },
  healthcare: { label: 'Healthcare', icon: '🏥', color: '#14b8a6' },
  education: { label: 'Education', icon: '📚', color: '#6366f1' },
  entertainment: { label: 'Entertainment', icon: '🎬', color: '#f43f5e' },
  emi: { label: 'EMI', icon: '🏦', color: '#dc2626' },
  insurance: { label: 'Insurance', icon: '🛡️', color: '#0ea5e9' },
  investment: { label: 'Investment', icon: '📈', color: '#10b981' },
  transfer: { label: 'Transfer', icon: '↔️', color: '#8b5cf6' },
  atm: { label: 'ATM', icon: '🏧', color: '#64748b' },
  miscellaneous: { label: 'Other', icon: '📋', color: '#94a3b8' },
};
