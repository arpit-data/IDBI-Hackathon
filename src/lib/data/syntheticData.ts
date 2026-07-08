/**
 * Synthetic Banking Data
 * Realistic IDBI Bank customer data for demonstration.
 * Simulates a 28-year-old salaried professional's financial profile.
 */

import type { Transaction, Account, MonthlySummary } from '@/lib/types/banking';
import type { UserProfile, FinancialGoal } from '@/lib/types/user';
import type { Portfolio, Holding, InvestmentProduct } from '@/lib/types/investment';
import type { BehavioralInsight, ActionPlanItem, SuggestedQuestion } from '@/lib/types/ai';

// ─────────────────────────────────────────────────────────
// USER PROFILE
// ─────────────────────────────────────────────────────────

export const sampleUser: UserProfile = {
  id: 'USR-001',
  name: 'Arjun Mehta',
  age: 28,
  occupation: 'Software Engineer',
  monthlySalary: 95000,
  annualIncome: 1140000,
  city: 'Mumbai',
  riskAppetite: 'moderate',
  dependents: 0,
  existingLoans: [
    {
      type: 'education',
      principalAmount: 500000,
      outstandingAmount: 320000,
      emiAmount: 8500,
      interestRate: 8.5,
      remainingMonths: 42,
    },
  ],
  creditScore: 762,
  memberSince: '2022-03-15',
  personaType: 'Young Professional',
};

// ─────────────────────────────────────────────────────────
// ACCOUNT
// ─────────────────────────────────────────────────────────

export const sampleAccount: Account = {
  accountNumber: '0012345678901234',
  accountType: 'savings',
  balance: 187432,
  holderName: 'Arjun Mehta',
  ifscCode: 'IBKL0000123',
  branch: 'Mumbai - Andheri West',
  openedDate: '2022-03-15',
};

// ─────────────────────────────────────────────────────────
// TRANSACTIONS (6 months: Jan 2026 - Jun 2026)
// ─────────────────────────────────────────────────────────

export const sampleTransactions: Transaction[] = [
  // ── JUNE 2026 ──
  { id: 'TXN-180', date: '2026-06-30', description: 'Netflix Subscription', amount: 649, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Netflix', balance: 187432 },
  { id: 'TXN-179', date: '2026-06-29', description: 'Dinner at Bombay Canteen', amount: 3200, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Bombay Canteen', balance: 188081 },
  { id: 'TXN-178', date: '2026-06-28', description: 'Uber Rides', amount: 890, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Uber India', balance: 191281 },
  { id: 'TXN-177', date: '2026-06-27', description: 'Amazon Shopping', amount: 4599, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Amazon India', balance: 192171 },
  { id: 'TXN-176', date: '2026-06-26', description: 'Electricity Bill', amount: 2100, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Adani Electricity', balance: 196770 },
  { id: 'TXN-175', date: '2026-06-25', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 198870 },
  { id: 'TXN-174', date: '2026-06-24', description: 'Groceries - BigBasket', amount: 3450, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'BigBasket', balance: 208870 },
  { id: 'TXN-173', date: '2026-06-23', description: 'Weekend Brunch', amount: 1800, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Social BKC', balance: 212320 },
  { id: 'TXN-172', date: '2026-06-22', description: 'Movie - PVR', amount: 750, type: 'debit', category: 'entertainment', mode: 'card', merchant: 'PVR Cinemas', balance: 214120 },
  { id: 'TXN-171', date: '2026-06-20', description: 'Gym Membership', amount: 3000, type: 'debit', category: 'healthcare', mode: 'upi', merchant: 'Cult.fit', balance: 214870 },
  { id: 'TXN-170', date: '2026-06-18', description: 'Fuel', amount: 2500, type: 'debit', category: 'transport', mode: 'card', merchant: 'HP Petrol', balance: 217870 },
  { id: 'TXN-169', date: '2026-06-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 220370 },
  { id: 'TXN-168', date: '2026-06-12', description: 'Groceries - DMart', amount: 2800, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'DMart', balance: 225370 },
  { id: 'TXN-167', date: '2026-06-10', description: 'Mobile Recharge', amount: 599, type: 'debit', category: 'utilities', mode: 'upi', merchant: 'Jio', balance: 228170 },
  { id: 'TXN-166', date: '2026-06-08', description: 'Zomato Order', amount: 650, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Zomato', balance: 228769 },
  { id: 'TXN-165', date: '2026-06-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 229419 },
  { id: 'TXN-164', date: '2026-06-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 247419 },
  { id: 'TXN-163', date: '2026-06-03', description: 'Spotify Premium', amount: 179, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Spotify', balance: 255919 },
  { id: 'TXN-162', date: '2026-06-02', description: 'Swiggy Order', amount: 420, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Swiggy', balance: 256098 },
  { id: 'TXN-161', date: '2026-06-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 256518 },

  // ── MAY 2026 ──
  { id: 'TXN-160', date: '2026-05-30', description: 'Hotstar Subscription', amount: 299, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Disney+ Hotstar', balance: 161518 },
  { id: 'TXN-159', date: '2026-05-28', description: 'Shopping - Myntra', amount: 5200, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Myntra', balance: 161817 },
  { id: 'TXN-158', date: '2026-05-26', description: 'Dinner with friends', amount: 2800, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Cafe Leopold', balance: 167017 },
  { id: 'TXN-157', date: '2026-05-25', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 169817 },
  { id: 'TXN-156', date: '2026-05-22', description: 'Uber/Ola Rides', amount: 1200, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Ola', balance: 179817 },
  { id: 'TXN-155', date: '2026-05-20', description: 'Groceries - BigBasket', amount: 3100, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'BigBasket', balance: 181017 },
  { id: 'TXN-154', date: '2026-05-18', description: 'Electricity Bill', amount: 1950, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Adani Electricity', balance: 184117 },
  { id: 'TXN-153', date: '2026-05-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 186067 },
  { id: 'TXN-152', date: '2026-05-13', description: 'Medical Checkup', amount: 2500, type: 'debit', category: 'healthcare', mode: 'card', merchant: 'Apollo Clinic', balance: 191067 },
  { id: 'TXN-151', date: '2026-05-10', description: 'Groceries - DMart', amount: 2600, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'DMart', balance: 193567 },
  { id: 'TXN-150', date: '2026-05-08', description: 'Zomato Orders (weekly)', amount: 1200, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Zomato', balance: 196167 },
  { id: 'TXN-149', date: '2026-05-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 197367 },
  { id: 'TXN-148', date: '2026-05-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 215367 },
  { id: 'TXN-147', date: '2026-05-03', description: 'Spotify + Netflix', amount: 828, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Subscriptions', balance: 223867 },
  { id: 'TXN-146', date: '2026-05-02', description: 'Fuel', amount: 2000, type: 'debit', category: 'transport', mode: 'card', merchant: 'Indian Oil', balance: 224695 },
  { id: 'TXN-145', date: '2026-05-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 226695 },

  // ── APRIL 2026 ──
  { id: 'TXN-140', date: '2026-04-28', description: 'Weekend Trip - Lonavala', amount: 6500, type: 'debit', category: 'entertainment', mode: 'card', merchant: 'MakeMyTrip', balance: 131695 },
  { id: 'TXN-139', date: '2026-04-25', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 138195 },
  { id: 'TXN-138', date: '2026-04-22', description: 'Shopping - Zara', amount: 7800, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Zara India', balance: 148195 },
  { id: 'TXN-137', date: '2026-04-20', description: 'Groceries', amount: 5600, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'BigBasket', balance: 155995 },
  { id: 'TXN-136', date: '2026-04-18', description: 'Dining - multiple', amount: 4200, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Various', balance: 161595 },
  { id: 'TXN-135', date: '2026-04-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 165795 },
  { id: 'TXN-134', date: '2026-04-12', description: 'Electricity + Water', amount: 2800, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Utilities', balance: 170795 },
  { id: 'TXN-133', date: '2026-04-10', description: 'Uber Rides', amount: 1500, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Uber India', balance: 173595 },
  { id: 'TXN-132', date: '2026-04-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 175095 },
  { id: 'TXN-131', date: '2026-04-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 193095 },
  { id: 'TXN-130', date: '2026-04-03', description: 'Subscriptions', amount: 1127, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Various', balance: 201595 },
  { id: 'TXN-129', date: '2026-04-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 202722 },

  // ── MARCH 2026 ──
  { id: 'TXN-120', date: '2026-03-28', description: 'Tax Saving FD', amount: 25000, type: 'debit', category: 'investment', mode: 'neft', merchant: 'IDBI Bank FD', balance: 107722 },
  { id: 'TXN-119', date: '2026-03-25', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 132722 },
  { id: 'TXN-118', date: '2026-03-20', description: 'Groceries', amount: 4800, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'DMart', balance: 142722 },
  { id: 'TXN-117', date: '2026-03-18', description: 'Dining', amount: 3600, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Various', balance: 147522 },
  { id: 'TXN-116', date: '2026-03-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 151122 },
  { id: 'TXN-115', date: '2026-03-12', description: 'Shopping', amount: 3500, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Flipkart', balance: 156122 },
  { id: 'TXN-114', date: '2026-03-10', description: 'Transport', amount: 1800, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Various', balance: 159622 },
  { id: 'TXN-113', date: '2026-03-08', description: 'Utilities', amount: 3200, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Various', balance: 161422 },
  { id: 'TXN-112', date: '2026-03-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 164622 },
  { id: 'TXN-111', date: '2026-03-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 182622 },
  { id: 'TXN-110', date: '2026-03-03', description: 'Subscriptions', amount: 828, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Various', balance: 191122 },
  { id: 'TXN-109', date: '2026-03-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 191950 },

  // ── FEBRUARY 2026 ──
  { id: 'TXN-108', date: '2026-02-25', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 96950 },
  { id: 'TXN-107', date: '2026-02-22', description: 'Valentine Dinner', amount: 4500, type: 'debit', category: 'dining', mode: 'card', merchant: 'Wasabi', balance: 106950 },
  { id: 'TXN-106', date: '2026-02-20', description: 'Shopping - Myntra', amount: 6200, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Myntra', balance: 111450 },
  { id: 'TXN-105', date: '2026-02-18', description: 'Groceries', amount: 4200, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'BigBasket', balance: 117650 },
  { id: 'TXN-104', date: '2026-02-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 121850 },
  { id: 'TXN-103', date: '2026-02-12', description: 'Transport', amount: 1600, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Various', balance: 126850 },
  { id: 'TXN-102', date: '2026-02-10', description: 'Utilities', amount: 2400, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Various', balance: 128450 },
  { id: 'TXN-101', date: '2026-02-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 130850 },
  { id: 'TXN-100', date: '2026-02-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 148850 },
  { id: 'TXN-099', date: '2026-02-03', description: 'Subscriptions', amount: 828, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Various', balance: 157350 },
  { id: 'TXN-098', date: '2026-02-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 158178 },

  // ── JANUARY 2026 ──
  { id: 'TXN-097', date: '2026-01-28', description: 'SIP - IDBI Nifty 50 Fund', amount: 10000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 63178 },
  { id: 'TXN-096', date: '2026-01-25', description: 'New Year Shopping', amount: 8500, type: 'debit', category: 'shopping', mode: 'card', merchant: 'Various', balance: 73178 },
  { id: 'TXN-095', date: '2026-01-22', description: 'Dining', amount: 3800, type: 'debit', category: 'dining', mode: 'upi', merchant: 'Various', balance: 81678 },
  { id: 'TXN-094', date: '2026-01-20', description: 'Groceries', amount: 4500, type: 'debit', category: 'groceries', mode: 'upi', merchant: 'BigBasket', balance: 85478 },
  { id: 'TXN-093', date: '2026-01-15', description: 'SIP - IDBI Flexi Cap Fund', amount: 5000, type: 'debit', category: 'investment', mode: 'auto_debit', merchant: 'IDBI MF', balance: 89978 },
  { id: 'TXN-092', date: '2026-01-12', description: 'Health Insurance Premium', amount: 12000, type: 'debit', category: 'insurance', mode: 'auto_debit', merchant: 'HDFC Ergo', balance: 94978 },
  { id: 'TXN-091', date: '2026-01-10', description: 'Transport', amount: 2200, type: 'debit', category: 'transport', mode: 'upi', merchant: 'Various', balance: 106978 },
  { id: 'TXN-090', date: '2026-01-08', description: 'Utilities', amount: 2600, type: 'debit', category: 'utilities', mode: 'auto_debit', merchant: 'Various', balance: 109178 },
  { id: 'TXN-089', date: '2026-01-05', description: 'Rent Payment', amount: 18000, type: 'debit', category: 'rent', mode: 'neft', merchant: 'Landlord', balance: 111778 },
  { id: 'TXN-088', date: '2026-01-05', description: 'Education Loan EMI', amount: 8500, type: 'debit', category: 'emi', mode: 'auto_debit', merchant: 'IDBI Bank Loan', balance: 129778 },
  { id: 'TXN-087', date: '2026-01-03', description: 'Subscriptions', amount: 828, type: 'debit', category: 'subscriptions', mode: 'auto_debit', merchant: 'Various', balance: 138278 },
  { id: 'TXN-086', date: '2026-01-01', description: 'Salary Credit - TechCorp', amount: 95000, type: 'credit', category: 'salary', mode: 'neft', merchant: 'TechCorp Solutions', balance: 139106 },
];

// ─────────────────────────────────────────────────────────
// MONTHLY SUMMARIES
// ─────────────────────────────────────────────────────────

export const monthlySummaries: MonthlySummary[] = [
  {
    month: '2026-06', totalIncome: 95000, totalExpenses: 68587, savings: 26413, savingsRate: 27.8,
    categoryBreakdown: [
      { category: 'rent', amount: 18000, percentage: 26.2, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'investment', amount: 15000, percentage: 21.9, transactionCount: 2, monthOverMonthChange: 0 },
      { category: 'emi', amount: 8500, percentage: 12.4, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'dining', amount: 6070, percentage: 8.9, transactionCount: 4, monthOverMonthChange: 51.8 },
      { category: 'groceries', amount: 6250, percentage: 9.1, transactionCount: 2, monthOverMonthChange: 9.6 },
      { category: 'shopping', amount: 4599, percentage: 6.7, transactionCount: 1, monthOverMonthChange: -11.6 },
      { category: 'transport', amount: 3390, percentage: 4.9, transactionCount: 2, monthOverMonthChange: 5.9 },
      { category: 'healthcare', amount: 3000, percentage: 4.4, transactionCount: 1, monthOverMonthChange: 20 },
      { category: 'utilities', amount: 2699, percentage: 3.9, transactionCount: 2, monthOverMonthChange: 38.4 },
      { category: 'subscriptions', amount: 828, percentage: 1.2, transactionCount: 2, monthOverMonthChange: 0 },
      { category: 'entertainment', amount: 750, percentage: 1.1, transactionCount: 1, monthOverMonthChange: -88.5 },
    ],
  },
  {
    month: '2026-05', totalIncome: 95000, totalExpenses: 62977, savings: 32023, savingsRate: 33.7,
    categoryBreakdown: [
      { category: 'rent', amount: 18000, percentage: 28.6, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'investment', amount: 15000, percentage: 23.8, transactionCount: 2, monthOverMonthChange: 0 },
      { category: 'emi', amount: 8500, percentage: 13.5, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'shopping', amount: 5200, percentage: 8.3, transactionCount: 1, monthOverMonthChange: -33.3 },
      { category: 'groceries', amount: 5700, percentage: 9.0, transactionCount: 2, monthOverMonthChange: -1.7 },
      { category: 'dining', amount: 4000, percentage: 6.3, transactionCount: 2, monthOverMonthChange: -4.8 },
      { category: 'transport', amount: 3200, percentage: 5.1, transactionCount: 2, monthOverMonthChange: -3.0 },
      { category: 'healthcare', amount: 2500, percentage: 4.0, transactionCount: 1, monthOverMonthChange: null },
      { category: 'utilities', amount: 1950, percentage: 3.1, transactionCount: 1, monthOverMonthChange: -30.4 },
      { category: 'subscriptions', amount: 1127, percentage: 1.8, transactionCount: 2, monthOverMonthChange: 0 },
    ],
  },
  {
    month: '2026-04', totalIncome: 95000, totalExpenses: 71027, savings: 23973, savingsRate: 25.2,
    categoryBreakdown: [
      { category: 'rent', amount: 18000, percentage: 25.3, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'investment', amount: 15000, percentage: 21.1, transactionCount: 2, monthOverMonthChange: -62.5 },
      { category: 'emi', amount: 8500, percentage: 12.0, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'shopping', amount: 7800, percentage: 11.0, transactionCount: 1, monthOverMonthChange: 122.9 },
      { category: 'entertainment', amount: 6500, percentage: 9.2, transactionCount: 1, monthOverMonthChange: null },
      { category: 'groceries', amount: 5600, percentage: 7.9, transactionCount: 1, monthOverMonthChange: 16.7 },
      { category: 'dining', amount: 4200, percentage: 5.9, transactionCount: 1, monthOverMonthChange: 16.7 },
      { category: 'utilities', amount: 2800, percentage: 3.9, transactionCount: 1, monthOverMonthChange: -12.5 },
      { category: 'transport', amount: 1500, percentage: 2.1, transactionCount: 1, monthOverMonthChange: -16.7 },
      { category: 'subscriptions', amount: 1127, percentage: 1.6, transactionCount: 1, monthOverMonthChange: 36.1 },
    ],
  },
  {
    month: '2026-03', totalIncome: 95000, totalExpenses: 85228, savings: 9772, savingsRate: 10.3,
    categoryBreakdown: [
      { category: 'investment', amount: 40000, percentage: 46.9, transactionCount: 3, monthOverMonthChange: 166.7 },
      { category: 'rent', amount: 18000, percentage: 21.1, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'emi', amount: 8500, percentage: 10.0, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'groceries', amount: 4800, percentage: 5.6, transactionCount: 1, monthOverMonthChange: 14.3 },
      { category: 'dining', amount: 3600, percentage: 4.2, transactionCount: 1, monthOverMonthChange: -20 },
      { category: 'shopping', amount: 3500, percentage: 4.1, transactionCount: 1, monthOverMonthChange: -43.5 },
      { category: 'utilities', amount: 3200, percentage: 3.8, transactionCount: 1, monthOverMonthChange: 33.3 },
      { category: 'transport', amount: 1800, percentage: 2.1, transactionCount: 1, monthOverMonthChange: 12.5 },
      { category: 'subscriptions', amount: 828, percentage: 1.0, transactionCount: 1, monthOverMonthChange: 0 },
    ],
  },
  {
    month: '2026-02', totalIncome: 95000, totalExpenses: 61228, savings: 33772, savingsRate: 35.5,
    categoryBreakdown: [
      { category: 'rent', amount: 18000, percentage: 29.4, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'investment', amount: 15000, percentage: 24.5, transactionCount: 2, monthOverMonthChange: 0 },
      { category: 'emi', amount: 8500, percentage: 13.9, transactionCount: 1, monthOverMonthChange: 0 },
      { category: 'shopping', amount: 6200, percentage: 10.1, transactionCount: 1, monthOverMonthChange: -27.1 },
      { category: 'dining', amount: 4500, percentage: 7.3, transactionCount: 1, monthOverMonthChange: 18.4 },
      { category: 'groceries', amount: 4200, percentage: 6.9, transactionCount: 1, monthOverMonthChange: -6.7 },
      { category: 'utilities', amount: 2400, percentage: 3.9, transactionCount: 1, monthOverMonthChange: -7.7 },
      { category: 'transport', amount: 1600, percentage: 2.6, transactionCount: 1, monthOverMonthChange: -27.3 },
      { category: 'subscriptions', amount: 828, percentage: 1.4, transactionCount: 1, monthOverMonthChange: 0 },
    ],
  },
  {
    month: '2026-01', totalIncome: 95000, totalExpenses: 75928, savings: 19072, savingsRate: 20.1,
    categoryBreakdown: [
      { category: 'rent', amount: 18000, percentage: 23.7, transactionCount: 1, monthOverMonthChange: null },
      { category: 'investment', amount: 15000, percentage: 19.8, transactionCount: 2, monthOverMonthChange: null },
      { category: 'insurance', amount: 12000, percentage: 15.8, transactionCount: 1, monthOverMonthChange: null },
      { category: 'shopping', amount: 8500, percentage: 11.2, transactionCount: 1, monthOverMonthChange: null },
      { category: 'emi', amount: 8500, percentage: 11.2, transactionCount: 1, monthOverMonthChange: null },
      { category: 'groceries', amount: 4500, percentage: 5.9, transactionCount: 1, monthOverMonthChange: null },
      { category: 'dining', amount: 3800, percentage: 5.0, transactionCount: 1, monthOverMonthChange: null },
      { category: 'utilities', amount: 2600, percentage: 3.4, transactionCount: 1, monthOverMonthChange: null },
      { category: 'transport', amount: 2200, percentage: 2.9, transactionCount: 1, monthOverMonthChange: null },
      { category: 'subscriptions', amount: 828, percentage: 1.1, transactionCount: 1, monthOverMonthChange: null },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// PORTFOLIO & HOLDINGS
// ─────────────────────────────────────────────────────────

export const sampleHoldings: Holding[] = [
  {
    id: 'HLD-001', name: 'IDBI Nifty 50 Index Fund', assetClass: 'equity_mf',
    investedAmount: 240000, currentValue: 298800, returns: 58800, returnsPercentage: 24.5, xirr: 18.2,
    riskLevel: 'high', startDate: '2024-06-01', sipAmount: 10000, folioNumber: 'XXXX4521',
  },
  {
    id: 'HLD-002', name: 'IDBI Flexi Cap Fund', assetClass: 'equity_mf',
    investedAmount: 120000, currentValue: 141600, returns: 21600, returnsPercentage: 18.0, xirr: 15.8,
    riskLevel: 'high', startDate: '2024-06-01', sipAmount: 5000, folioNumber: 'XXXX4522',
  },
  {
    id: 'HLD-003', name: 'IDBI Tax Saver FD (5yr)', assetClass: 'fixed_deposit',
    investedAmount: 150000, currentValue: 163500, returns: 13500, returnsPercentage: 9.0, xirr: 7.1,
    riskLevel: 'low', startDate: '2024-03-28', sipAmount: null, folioNumber: 'FD-XXXX8901',
  },
  {
    id: 'HLD-004', name: 'IDBI Gold ETF', assetClass: 'gold',
    investedAmount: 50000, currentValue: 62500, returns: 12500, returnsPercentage: 25.0, xirr: 14.3,
    riskLevel: 'moderate', startDate: '2024-09-15', sipAmount: null, folioNumber: 'XXXX7890',
  },
  {
    id: 'HLD-005', name: 'NPS Tier-1 (Aggressive)', assetClass: 'nps',
    investedAmount: 100000, currentValue: 118000, returns: 18000, returnsPercentage: 18.0, xirr: 16.5,
    riskLevel: 'moderate', startDate: '2023-04-01', sipAmount: null, folioNumber: 'NPS-XXXX1234',
  },
  {
    id: 'HLD-006', name: 'IDBI Short Term Debt Fund', assetClass: 'debt_mf',
    investedAmount: 75000, currentValue: 80250, returns: 5250, returnsPercentage: 7.0, xirr: 6.8,
    riskLevel: 'low', startDate: '2025-01-10', sipAmount: null, folioNumber: 'XXXX5678',
  },
  {
    id: 'HLD-007', name: 'EPF Balance', assetClass: 'epf',
    investedAmount: 285000, currentValue: 310000, returns: 25000, returnsPercentage: 8.8, xirr: 8.1,
    riskLevel: 'low', startDate: '2022-03-15', sipAmount: null, folioNumber: 'EPF-XXXX5678',
  },
];

export const samplePortfolio: Portfolio = {
  totalInvested: 1020000,
  totalCurrentValue: 1174650,
  totalReturns: 154650,
  totalReturnsPercentage: 15.16,
  overallXirr: 13.2,
  allocation: [
    { assetClass: 'equity_mf', label: 'Equity Mutual Funds', amount: 440400, percentage: 37.5, color: '#3b82f6' },
    { assetClass: 'epf', label: 'EPF', amount: 310000, percentage: 26.4, color: '#059669' },
    { assetClass: 'fixed_deposit', label: 'Fixed Deposits', amount: 163500, percentage: 13.9, color: '#22c55e' },
    { assetClass: 'nps', label: 'NPS', amount: 118000, percentage: 10.0, color: '#f97316' },
    { assetClass: 'debt_mf', label: 'Debt Mutual Funds', amount: 80250, percentage: 6.8, color: '#06b6d4' },
    { assetClass: 'gold', label: 'Gold', amount: 62500, percentage: 5.3, color: '#eab308' },
  ],
  holdings: sampleHoldings,
  diversificationScore: 72,
  portfolioRiskLevel: 'moderate',
};

// ─────────────────────────────────────────────────────────
// FINANCIAL GOALS
// ─────────────────────────────────────────────────────────

export const sampleGoals: FinancialGoal[] = [
  {
    id: 'GOAL-001', name: 'Buy a Home', category: 'home',
    targetAmount: 5000000, currentAmount: 440400, targetDate: '2031-06-01',
    monthlyContribution: 15000, expectedReturn: 12, priority: 'high',
    status: 'on_track', progress: 8.8, icon: '🏠', color: '#3b82f6',
  },
  {
    id: 'GOAL-002', name: 'Emergency Fund', category: 'emergency_fund',
    targetAmount: 300000, currentAmount: 187432, targetDate: '2027-06-01',
    monthlyContribution: 10000, expectedReturn: 6, priority: 'high',
    status: 'on_track', progress: 62.5, icon: '🛡️', color: '#22c55e',
  },
  {
    id: 'GOAL-003', name: 'Retirement Corpus', category: 'retirement',
    targetAmount: 50000000, currentAmount: 1174650, targetDate: '2056-06-01',
    monthlyContribution: 15000, expectedReturn: 12, priority: 'medium',
    status: 'on_track', progress: 2.3, icon: '🏖️', color: '#f97316',
  },
  {
    id: 'GOAL-004', name: 'Europe Trip', category: 'vacation',
    targetAmount: 500000, currentAmount: 45000, targetDate: '2028-03-01',
    monthlyContribution: 5000, expectedReturn: 8, priority: 'low',
    status: 'behind', progress: 9.0, icon: '✈️', color: '#06b6d4',
  },
  {
    id: 'GOAL-005', name: 'New Car', category: 'car',
    targetAmount: 1200000, currentAmount: 80250, targetDate: '2029-12-01',
    monthlyContribution: 8000, expectedReturn: 7, priority: 'medium',
    status: 'behind', progress: 6.7, icon: '🚗', color: '#ef4444',
  },
];

// ─────────────────────────────────────────────────────────
// INVESTMENT PRODUCTS (IDBI Bank catalog)
// ─────────────────────────────────────────────────────────

export const investmentProducts: InvestmentProduct[] = [
  {
    id: 'PROD-001', name: 'IDBI Nifty 50 Index Fund', category: 'equity_mf',
    minInvestment: 500, expectedReturnLow: 10, expectedReturnHigh: 15, riskLevel: 'high',
    lockInMonths: 0, description: 'Passively managed index fund tracking the Nifty 50. Low expense ratio with broad market exposure.',
    suitabilityTags: ['long-term', 'equity', 'passive', 'wealth-creation'], isIDBIProduct: true,
  },
  {
    id: 'PROD-002', name: 'IDBI Flexi Cap Fund', category: 'equity_mf',
    minInvestment: 500, expectedReturnLow: 12, expectedReturnHigh: 18, riskLevel: 'high',
    lockInMonths: 0, description: 'Actively managed fund investing across market capitalizations for growth.',
    suitabilityTags: ['long-term', 'equity', 'active', 'growth'], isIDBIProduct: true,
  },
  {
    id: 'PROD-003', name: 'IDBI Tax Advantage (ELSS)', category: 'equity_mf',
    minInvestment: 500, expectedReturnLow: 10, expectedReturnHigh: 16, riskLevel: 'high',
    lockInMonths: 36, description: 'Tax-saving ELSS fund with 3-year lock-in. Eligible for Section 80C deduction up to ₹1.5L.',
    suitabilityTags: ['tax-saving', 'equity', 'long-term'], isIDBIProduct: true,
  },
  {
    id: 'PROD-004', name: 'IDBI Fixed Deposit', category: 'fixed_deposit',
    minInvestment: 10000, expectedReturnLow: 6.5, expectedReturnHigh: 7.5, riskLevel: 'low',
    lockInMonths: 12, description: 'Guaranteed returns with flexible tenure options. Senior citizens get 0.5% additional interest.',
    suitabilityTags: ['safe', 'guaranteed', 'short-term', 'debt'], isIDBIProduct: true,
  },
  {
    id: 'PROD-005', name: 'IDBI Recurring Deposit', category: 'recurring_deposit',
    minInvestment: 1000, expectedReturnLow: 6, expectedReturnHigh: 7, riskLevel: 'low',
    lockInMonths: 12, description: 'Monthly savings with guaranteed returns. Build discipline with automated monthly deposits.',
    suitabilityTags: ['safe', 'disciplined', 'short-term', 'beginners'], isIDBIProduct: true,
  },
  {
    id: 'PROD-006', name: 'IDBI Short Duration Debt Fund', category: 'debt_mf',
    minInvestment: 5000, expectedReturnLow: 6, expectedReturnHigh: 8, riskLevel: 'low',
    lockInMonths: 0, description: 'Low-risk debt fund ideal for parking surplus cash with better returns than savings account.',
    suitabilityTags: ['safe', 'liquidity', 'debt', 'emergency-fund'], isIDBIProduct: true,
  },
  {
    id: 'PROD-007', name: 'IDBI Gold ETF', category: 'gold',
    minInvestment: 1000, expectedReturnLow: 8, expectedReturnHigh: 14, riskLevel: 'moderate',
    lockInMonths: 0, description: 'Gold-backed ETF providing portfolio diversification and inflation hedge.',
    suitabilityTags: ['diversification', 'inflation-hedge', 'moderate-risk'], isIDBIProduct: true,
  },
  {
    id: 'PROD-008', name: 'National Pension System (NPS)', category: 'nps',
    minInvestment: 500, expectedReturnLow: 8, expectedReturnHigh: 12, riskLevel: 'moderate',
    lockInMonths: 0, description: 'Government-backed retirement scheme with additional tax benefits under Section 80CCD(1B).',
    suitabilityTags: ['retirement', 'tax-saving', 'long-term', 'pension'], isIDBIProduct: false,
  },
  {
    id: 'PROD-009', name: 'IDBI Hybrid Fund', category: 'hybrid_mf',
    minInvestment: 1000, expectedReturnLow: 8, expectedReturnHigh: 12, riskLevel: 'moderate',
    lockInMonths: 0, description: 'Balanced fund with equity and debt mix for moderate risk-takers.',
    suitabilityTags: ['balanced', 'moderate-risk', 'beginners', 'medium-term'], isIDBIProduct: true,
  },
  {
    id: 'PROD-010', name: 'Government Securities (G-Sec)', category: 'bonds',
    minInvestment: 10000, expectedReturnLow: 7, expectedReturnHigh: 7.5, riskLevel: 'low',
    lockInMonths: 0, description: 'Sovereign-guaranteed bonds with stable returns. Zero credit risk.',
    suitabilityTags: ['safe', 'sovereign', 'long-term', 'stable-income'], isIDBIProduct: false,
  },
];

// ─────────────────────────────────────────────────────────
// AI-GENERATED INSIGHTS
// ─────────────────────────────────────────────────────────

export const sampleInsights: BehavioralInsight[] = [
  {
    id: 'INS-001', title: 'Weekend Spending Spike',
    description: 'Your weekend spending is 43% higher than weekdays, primarily driven by dining and entertainment. Consider setting a weekend budget of ₹3,000 to save ₹2,000 more monthly.',
    category: 'spending', impact: 'negative', action: 'Set a weekend spending limit of ₹3,000',
    date: '2026-06-28', icon: '📊',
  },
  {
    id: 'INS-002', title: 'Great SIP Discipline',
    description: 'You have maintained 100% SIP consistency for the last 6 months. This discipline will compound significantly — your SIPs alone could grow to ₹45L in 10 years at 12% returns.',
    category: 'investing', impact: 'positive', action: null,
    date: '2026-06-25', icon: '🎯',
  },
  {
    id: 'INS-003', title: 'Dining Expenses Rising',
    description: 'Your dining expenses increased by 52% this month compared to last month. This is ₹2,070 more than your 3-month average of ₹4,000.',
    category: 'spending', impact: 'negative', action: 'Try meal-prepping on weekends to reduce dining out costs',
    date: '2026-06-30', icon: '🍽️',
  },
  {
    id: 'INS-004', title: 'Emergency Fund Progress',
    description: 'Your emergency fund covers 2.7 months of expenses. IDBI recommends building this to 6 months (₹3L). You are 62.5% of the way there!',
    category: 'saving', impact: 'neutral', action: 'Continue saving ₹10,000/month toward your emergency fund',
    date: '2026-06-20', icon: '🛡️',
  },
  {
    id: 'INS-005', title: 'Salary Day Pattern',
    description: 'You tend to spend 35% of your monthly discretionary budget in the first week after salary credit. Consider scheduling investments immediately after salary.',
    category: 'behavior', impact: 'negative', action: 'Set up auto-debit for investments on 2nd of each month',
    date: '2026-06-15', icon: '💡',
  },
  {
    id: 'INS-006', title: 'Portfolio Well-Diversified',
    description: 'Your portfolio diversification score is 72/100. Adding some international equity exposure could improve this to 85+.',
    category: 'investing', impact: 'neutral', action: 'Consider allocating 5-10% to an international equity fund',
    date: '2026-06-10', icon: '🌍',
  },
];

export const sampleActionPlan: ActionPlanItem[] = [
  { id: 'AP-001', title: 'Increase SIP by ₹5,000', description: 'Add ₹5,000 to your Nifty 50 SIP to accelerate home-buying goal', completed: false, dueDate: '2026-07-15', category: 'investing', priority: 'high' },
  { id: 'AP-002', title: 'Build Emergency Fund to ₹3L', description: 'Save ₹10,000 more this month toward your emergency fund target', completed: false, dueDate: '2026-07-31', category: 'saving', priority: 'high' },
  { id: 'AP-003', title: 'Review Subscriptions', description: 'You have 3 active subscriptions totaling ₹1,127/month. Check if all are being used.', completed: false, dueDate: '2026-07-10', category: 'spending', priority: 'medium' },
  { id: 'AP-004', title: 'Set Weekend Budget', description: 'Limit weekend spending to ₹3,000 to save an extra ₹2,000/month', completed: false, dueDate: '2026-07-07', category: 'spending', priority: 'medium' },
  { id: 'AP-005', title: 'Schedule Portfolio Review', description: 'Review your portfolio allocation and rebalance if needed', completed: true, dueDate: '2026-07-01', category: 'investing', priority: 'low' },
];

export const suggestedQuestions: SuggestedQuestion[] = [
  { id: 'SQ-001', text: 'Where does my money go each month?', category: 'spending', icon: '💸' },
  { id: 'SQ-002', text: 'Am I saving enough for my home?', category: 'goals', icon: '🏠' },
  { id: 'SQ-003', text: 'How can I improve my financial health score?', category: 'health', icon: '❤️' },
  { id: 'SQ-004', text: 'What should I invest in this month?', category: 'investing', icon: '📈' },
  { id: 'SQ-005', text: 'How much will my SIPs be worth in 10 years?', category: 'planning', icon: '🔮' },
  { id: 'SQ-006', text: 'Should I prepay my education loan?', category: 'debt', icon: '🎓' },
  { id: 'SQ-007', text: 'Is my portfolio well diversified?', category: 'portfolio', icon: '📊' },
  { id: 'SQ-008', text: 'Help me create a monthly budget', category: 'budgeting', icon: '📋' },
];

// ─────────────────────────────────────────────────────────
// UPI SPENDING DATA
// ─────────────────────────────────────────────────────────

export interface UPITransaction {
  id: string;
  merchantName: string;
  upiApp: 'gpay' | 'phonepe' | 'paytm' | 'idbi_upi';
  amount: number;
  category: string;
  date: string;
  type: 'essential' | 'impulse' | 'recurring';
  upiId: string;
}

export const upiTransactions: UPITransaction[] = [
  { id: 'UPI-001', merchantName: 'Swiggy', upiApp: 'gpay', amount: 587, category: 'dining', date: '2026-07-06', type: 'impulse', upiId: 'swiggy@axl' },
  { id: 'UPI-002', merchantName: 'DMart', upiApp: 'phonepe', amount: 2340, category: 'groceries', date: '2026-07-05', type: 'essential', upiId: 'dmart@ybl' },
  { id: 'UPI-003', merchantName: 'Uber', upiApp: 'gpay', amount: 342, category: 'transport', date: '2026-07-05', type: 'essential', upiId: 'uber@axl' },
  { id: 'UPI-004', merchantName: 'Zomato', upiApp: 'gpay', amount: 890, category: 'dining', date: '2026-07-04', type: 'impulse', upiId: 'zomato@paytm' },
  { id: 'UPI-005', merchantName: 'Netflix', upiApp: 'idbi_upi', amount: 649, category: 'subscriptions', date: '2026-07-03', type: 'recurring', upiId: 'netflix@axl' },
  { id: 'UPI-006', merchantName: 'Shell Petrol Pump', upiApp: 'phonepe', amount: 1500, category: 'transport', date: '2026-07-03', type: 'essential', upiId: 'shell@ybl' },
  { id: 'UPI-007', merchantName: 'Amazon', upiApp: 'gpay', amount: 1299, category: 'shopping', date: '2026-07-02', type: 'impulse', upiId: 'amazon@apl' },
  { id: 'UPI-008', merchantName: 'Starbucks', upiApp: 'phonepe', amount: 450, category: 'dining', date: '2026-07-02', type: 'impulse', upiId: 'starbucks@ybl' },
  { id: 'UPI-009', merchantName: 'BESCOM', upiApp: 'idbi_upi', amount: 1870, category: 'utilities', date: '2026-07-01', type: 'essential', upiId: 'bescom@ybl' },
  { id: 'UPI-010', merchantName: 'Gym Membership', upiApp: 'gpay', amount: 2000, category: 'health', date: '2026-07-01', type: 'recurring', upiId: 'cultfit@axl' },
  { id: 'UPI-011', merchantName: 'Myntra', upiApp: 'phonepe', amount: 2199, category: 'shopping', date: '2026-06-30', type: 'impulse', upiId: 'myntra@ybl' },
  { id: 'UPI-012', merchantName: 'Reliance Jio', upiApp: 'idbi_upi', amount: 299, category: 'subscriptions', date: '2026-06-28', type: 'recurring', upiId: 'jio@axl' },
];

export const upiSummary = {
  totalTransactions: 47,
  totalSpent: 32450,
  avgPerTransaction: 690,
  impulseSpend: 12800,
  essentialSpend: 14200,
  recurringSpend: 5450,
  topApp: 'gpay' as const,
  topAppPercent: 42,
  monthOverMonthChange: 8.5,
};

// ─────────────────────────────────────────────────────────
// GAMIFICATION — ACHIEVEMENTS & STREAKS
// ─────────────────────────────────────────────────────────

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'saving' | 'investing' | 'spending' | 'learning' | 'milestone';
  progress: number;
  target: number;
  unlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
}

export const achievements: Achievement[] = [
  { id: 'ACH-001', title: 'SIP Warrior', description: 'Complete 6 consecutive months of SIP investments', icon: '⚔️', category: 'investing', progress: 6, target: 6, unlocked: true, unlockedDate: '2026-07-01', xpReward: 500 },
  { id: 'ACH-002', title: 'Budget Boss', description: 'Stay within monthly budget for 3 months', icon: '👑', category: 'spending', progress: 2, target: 3, unlocked: false, xpReward: 300 },
  { id: 'ACH-003', title: 'First SIP', description: 'Start your first SIP investment', icon: '🌱', category: 'investing', progress: 1, target: 1, unlocked: true, unlockedDate: '2026-01-15', xpReward: 100 },
  { id: 'ACH-004', title: 'Tax Saver', description: 'Max out your 80C deductions', icon: '🛡️', category: 'saving', progress: 108000, target: 150000, unlocked: false, xpReward: 400 },
  { id: 'ACH-005', title: 'Emergency Ready', description: 'Build 6 months of emergency fund', icon: '🔒', category: 'saving', progress: 187432, target: 570000, unlocked: false, xpReward: 600 },
  { id: 'ACH-006', title: 'Portfolio Pro', description: 'Diversification score above 80', icon: '📊', category: 'investing', progress: 72, target: 80, unlocked: false, xpReward: 350 },
  { id: 'ACH-007', title: 'Savings Streak', description: 'Save 25%+ of income for 4 months', icon: '🔥', category: 'saving', progress: 4, target: 4, unlocked: true, unlockedDate: '2026-06-30', xpReward: 400 },
  { id: 'ACH-008', title: 'Health Champion', description: 'Reach 90+ financial health score', icon: '💪', category: 'milestone', progress: 82, target: 90, unlocked: false, xpReward: 800 },
];

export const streakData = {
  currentSIPStreak: 6,
  longestSIPStreak: 6,
  currentSavingsStreak: 4,
  budgetStreakDays: 18,
  totalXP: 1000,
  level: 3,
  levelTitle: 'Rising Investor',
  nextLevelXP: 1500,
  weeklyChallenge: {
    title: 'Save ₹2,000 extra this week',
    description: 'Reduce dining out by 50% to save ₹2,000',
    progress: 1200,
    target: 2000,
    daysLeft: 3,
    icon: '🎯',
  },
};

// ─────────────────────────────────────────────────────────
// SMART NUDGES & NOTIFICATIONS
// ─────────────────────────────────────────────────────────

export interface SmartNudge {
  id: string;
  type: 'salary_credit' | 'bill_due' | 'market_alert' | 'goal_milestone' | 'spending_alert' | 'tax_reminder' | 'sip_due' | 'achievement';
  title: string;
  message: string;
  icon: string;
  actionLabel?: string;
  actionHref?: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  read: boolean;
  category: 'money' | 'investment' | 'alert' | 'celebration';
}

export const smartNudges: SmartNudge[] = [
  {
    id: 'ND-001', type: 'salary_credit', title: 'Salary Credited! 💰',
    message: '₹95,000 credited to your IDBI account. Auto-invest ₹15,000 into your SIPs?',
    icon: '💰', actionLabel: 'Auto-Invest Now', actionHref: '/invest',
    priority: 'high', timestamp: '2026-07-07T09:30:00Z', read: false, category: 'money',
  },
  {
    id: 'ND-002', type: 'spending_alert', title: 'Dining Spend Alert ⚠️',
    message: 'You\'ve spent ₹4,200 on dining this week — 65% of your monthly dining budget already used. Consider cooking this weekend!',
    icon: '🍽️', actionLabel: 'View Spending', actionHref: '/spending',
    priority: 'high', timestamp: '2026-07-07T08:00:00Z', read: false, category: 'alert',
  },
  {
    id: 'ND-003', type: 'market_alert', title: 'Market Opportunity 📈',
    message: 'Nifty 50 dropped 2.3% today. Your SIP is set for July 10 — great timing! Consider a ₹5,000 top-up for extra units.',
    icon: '📉', actionLabel: 'Top-Up SIP', actionHref: '/invest',
    priority: 'medium', timestamp: '2026-07-06T16:00:00Z', read: false, category: 'investment',
  },
  {
    id: 'ND-004', type: 'goal_milestone', title: 'Goal Milestone! 🎉',
    message: 'Your Emergency Fund crossed ₹1.87L — that\'s 33% of your ₹5.7L target! Keep going, you\'ll reach it by March 2028.',
    icon: '🎯', actionLabel: 'View Goals', actionHref: '/goals',
    priority: 'medium', timestamp: '2026-07-05T12:00:00Z', read: true, category: 'celebration',
  },
  {
    id: 'ND-005', type: 'tax_reminder', title: 'Tax Deadline Approaching 📋',
    message: 'ITR filing deadline is July 31. You can save ₹42,000 more by investing ₹42,000 in ELSS before filing. Your IDBI Tax Saver ELSS is available.',
    icon: '📋', actionLabel: 'Optimize Tax', actionHref: '/tax',
    priority: 'high', timestamp: '2026-07-04T10:00:00Z', read: true, category: 'alert',
  },
  {
    id: 'ND-006', type: 'achievement', title: 'Badge Unlocked! 🏆',
    message: 'You\'ve earned the "SIP Warrior" badge — 6 months of uninterrupted SIP investments! You\'re in the top 15% of IDBI investors.',
    icon: '🏆', actionLabel: 'View Badges', actionHref: '/dashboard',
    priority: 'low', timestamp: '2026-07-01T09:00:00Z', read: true, category: 'celebration',
  },
];

// ─────────────────────────────────────────────────────────
// DIGITAL GOLD & SGB DATA
// ─────────────────────────────────────────────────────────

export interface GoldHolding {
  id: string;
  type: 'digital_gold' | 'sgb' | 'gold_etf';
  name: string;
  grams: number;
  investedAmount: number;
  currentValue: number;
  purchaseDate: string;
  maturityDate?: string;
  interestRate?: number;
}

export const goldData = {
  livePrice: 7245,  // per gram
  priceChange24h: 1.2,
  priceChangeWeek: 2.8,
  totalGrams: 15.4,
  totalInvested: 98500,
  totalCurrentValue: 111573,
  totalReturns: 13073,
  totalReturnsPercent: 13.3,
  goldSIP: {
    active: true,
    monthlyAmount: 2000,
    startDate: '2025-09-01',
    totalMonths: 10,
    gramsAccumulated: 2.8,
  },
  priceHistory: [
    { month: 'Jan', price: 6420 },
    { month: 'Feb', price: 6580 },
    { month: 'Mar', price: 6750 },
    { month: 'Apr', price: 6890 },
    { month: 'May', price: 7050 },
    { month: 'Jun', price: 7120 },
    { month: 'Jul', price: 7245 },
  ],
};

export const goldHoldings: GoldHolding[] = [
  { id: 'GLD-001', type: 'sgb', name: 'Sovereign Gold Bond 2025-II', grams: 8, investedAmount: 48000, currentValue: 57960, purchaseDate: '2025-03-15', maturityDate: '2033-03-15', interestRate: 2.5 },
  { id: 'GLD-002', type: 'digital_gold', name: 'IDBI Digital Gold', grams: 4.6, investedAmount: 30500, currentValue: 33327, purchaseDate: '2025-06-01' },
  { id: 'GLD-003', type: 'gold_etf', name: 'IDBI Gold ETF Fund', grams: 2.8, investedAmount: 20000, currentValue: 20286, purchaseDate: '2025-09-01' },
];

// ─────────────────────────────────────────────────────────
// FAMILY FINANCIAL DASHBOARD DATA
// ─────────────────────────────────────────────────────────

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent';
  age: number;
  avatar: string;
  color: string;
  goals: { name: string; target: number; current: number; icon: string }[];
  monthlyContribution: number;
  accounts: { type: string; balance: number }[];
}

export const familyMembers: FamilyMember[] = [
  {
    id: 'FAM-001', name: 'Arjun Mehta', relationship: 'self', age: 28,
    avatar: 'AM', color: '#00836c',
    goals: [
      { name: 'Home Down Payment', target: 1500000, current: 420000, icon: '🏠' },
      { name: 'Emergency Fund', target: 570000, current: 187432, icon: '🔒' },
    ],
    monthlyContribution: 25000,
    accounts: [{ type: 'Savings', balance: 187432 }, { type: 'FD', balance: 200000 }],
  },
  {
    id: 'FAM-002', name: 'Priya Mehta', relationship: 'spouse', age: 27,
    avatar: 'PM', color: '#8b5cf6',
    goals: [
      { name: 'Vacation Fund', target: 200000, current: 85000, icon: '✈️' },
      { name: 'Course (MBA)', target: 500000, current: 120000, icon: '📚' },
    ],
    monthlyContribution: 15000,
    accounts: [{ type: 'Savings', balance: 145000 }, { type: 'RD', balance: 95000 }],
  },
  {
    id: 'FAM-003', name: 'Aarav Mehta', relationship: 'child', age: 3,
    avatar: 'AA', color: '#f47920',
    goals: [
      { name: 'Education Fund', target: 2500000, current: 180000, icon: '🎓' },
      { name: 'Marriage Fund', target: 3000000, current: 50000, icon: '💍' },
    ],
    monthlyContribution: 10000,
    accounts: [{ type: 'Sukanya/PPF', balance: 180000 }],
  },
  {
    id: 'FAM-004', name: 'Suresh Mehta', relationship: 'parent', age: 58,
    avatar: 'SM', color: '#3b82f6',
    goals: [
      { name: 'Retirement Corpus', target: 5000000, current: 3200000, icon: '🏖️' },
      { name: 'Medical Fund', target: 1000000, current: 650000, icon: '🏥' },
    ],
    monthlyContribution: 20000,
    accounts: [{ type: 'Senior Savings', balance: 850000 }, { type: 'FD', balance: 1500000 }],
  },
];

export const familySummary = {
  totalNetWorth: 5892432,
  totalMonthlyContribution: 70000,
  totalGoals: 8,
  goalsOnTrack: 5,
  familyHealthScore: 78,
};
