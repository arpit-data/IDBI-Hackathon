/**
 * Health Score Engine — Unit Tests
 * Tests the financial health score calculation logic.
 */

import { calculateHealthScore } from '@/lib/engines/healthScore';
import type { UserProfile } from '@/lib/types/user';
import type { MonthlySummary } from '@/lib/types/banking';
import type { Portfolio } from '@/lib/types/investment';

/** Mock user profile */
const mockUser: UserProfile = {
  id: 'TEST-001',
  name: 'Test User',
  age: 28,
  occupation: 'Engineer',
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
  memberSince: '2022-01-01',
  personaType: 'Young Professional',
};

/** Mock monthly summaries */
const mockSummaries: MonthlySummary[] = [
  {
    month: '2026-06',
    totalIncome: 95000,
    totalExpenses: 68000,
    savings: 27000,
    savingsRate: 28.4,
    categoryBreakdown: [],
  },
  {
    month: '2026-05',
    totalIncome: 95000,
    totalExpenses: 63000,
    savings: 32000,
    savingsRate: 33.7,
    categoryBreakdown: [],
  },
];

/** Mock portfolio */
const mockPortfolio: Portfolio = {
  totalInvested: 1000000,
  totalCurrentValue: 1150000,
  totalReturns: 150000,
  totalReturnsPercentage: 15,
  overallXirr: 13,
  allocation: [],
  holdings: [],
  diversificationScore: 72,
  portfolioRiskLevel: 'moderate',
};

describe('calculateHealthScore', () => {
  it('should return a score between 0 and 100', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThanOrEqual(100);
  });

  it('should return exactly 5 categories', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    expect(result.categories).toHaveLength(5);
  });

  it('should classify score label correctly', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    if (result.overall >= 85) {
      expect(result.label).toBe('Excellent');
    } else if (result.overall >= 70) {
      expect(result.label).toBe('Good');
    } else if (result.overall >= 55) {
      expect(result.label).toBe('Fair');
    }
  });

  it('should generate action items for weak categories', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 50000);
    // Low savings balance should trigger emergency fund action
    expect(result.actionItems.length).toBeGreaterThan(0);
  });

  it('should handle empty monthly summaries', () => {
    const result = calculateHealthScore(mockUser, [], mockPortfolio, 187000);
    expect(result.overall).toBe(0);
    expect(result.label).toBe('Poor');
  });

  it('should assign correct colors based on score', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    expect(result.color).toBeTruthy();
    expect(result.color.startsWith('#')).toBe(true);
  });

  it('should generate history entries matching summary count', () => {
    const result = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    expect(result.history).toHaveLength(mockSummaries.length);
  });

  it('should give higher score for user with no debt', () => {
    const noDebtUser = { ...mockUser, existingLoans: [] };
    const withDebt = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 187000);
    const withoutDebt = calculateHealthScore(noDebtUser, mockSummaries, mockPortfolio, 187000);
    expect(withoutDebt.overall).toBeGreaterThanOrEqual(withDebt.overall);
  });

  it('should give higher emergency fund score for larger savings', () => {
    const lowSavings = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 50000);
    const highSavings = calculateHealthScore(mockUser, mockSummaries, mockPortfolio, 500000);

    const lowEF = lowSavings.categories.find(c => c.name === 'Emergency Fund');
    const highEF = highSavings.categories.find(c => c.name === 'Emergency Fund');

    expect(highEF!.score).toBeGreaterThan(lowEF!.score);
  });
});
