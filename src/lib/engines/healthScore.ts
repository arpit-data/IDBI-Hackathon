/**
 * Financial Health Score Engine
 * Calculates a composite financial health score (0-100) based on
 * multiple weighted factors from the user's financial data.
 */

import type { HealthScore, HealthCategory, ActionItem } from '@/lib/types/user';
import type { MonthlySummary } from '@/lib/types/banking';
import type { Portfolio } from '@/lib/types/investment';
import type { UserProfile } from '@/lib/types/user';
import {
  calculateSavingsRate,
  calculateDTI,
  calculateEmergencyFundCoverage,
} from '@/lib/utils/calculations';
import { HEALTH_SCORE_THRESHOLDS, FINANCIAL_CONSTANTS } from '@/lib/utils/constants';

/** Weight configuration for each health category */
const CATEGORY_WEIGHTS = {
  savingsRate: 0.25,
  debtToIncome: 0.20,
  emergencyFund: 0.20,
  investmentDiversification: 0.20,
  spendingDiscipline: 0.15,
} as const;

/**
 * Calculates the overall financial health score for a user.
 *
 * @param user - User profile data
 * @param monthlySummaries - Recent monthly financial summaries
 * @param portfolio - Investment portfolio data
 * @param savingsBalance - Current savings account balance
 * @returns Complete HealthScore object with breakdown and recommendations
 */
export function calculateHealthScore(
  user: UserProfile,
  monthlySummaries: MonthlySummary[],
  portfolio: Portfolio,
  savingsBalance: number
): HealthScore {
  const latestMonth = monthlySummaries[0];
  if (!latestMonth) {
    return createEmptyScore();
  }

  // Calculate individual category scores
  const savingsRateScore = scoreSavingsRate(latestMonth);
  const dtiScore = scoreDTI(user);
  const emergencyFundScore = scoreEmergencyFund(savingsBalance, latestMonth.totalExpenses);
  const diversificationScore = scoreDiversification(portfolio);
  const spendingScore = scoreSpendingDiscipline(monthlySummaries);

  const categories: HealthCategory[] = [
    {
      name: 'Savings Rate',
      score: savingsRateScore,
      maxScore: 100,
      weight: CATEGORY_WEIGHTS.savingsRate,
      icon: '💰',
      description: `You save ${latestMonth.savingsRate.toFixed(1)}% of your income`,
      status: savingsRateScore >= 70 ? 'good' : savingsRateScore >= 40 ? 'average' : 'poor',
    },
    {
      name: 'Debt Management',
      score: dtiScore,
      maxScore: 100,
      weight: CATEGORY_WEIGHTS.debtToIncome,
      icon: '🏦',
      description: `Debt-to-income ratio is ${calculateDTI(
        user.existingLoans.reduce((sum, l) => sum + l.emiAmount, 0),
        user.monthlySalary
      )}%`,
      status: dtiScore >= 70 ? 'good' : dtiScore >= 40 ? 'average' : 'poor',
    },
    {
      name: 'Emergency Fund',
      score: emergencyFundScore,
      maxScore: 100,
      weight: CATEGORY_WEIGHTS.emergencyFund,
      icon: '🛡️',
      description: `Covers ${calculateEmergencyFundCoverage(
        savingsBalance,
        latestMonth.totalExpenses
      )} months of expenses`,
      status: emergencyFundScore >= 70 ? 'good' : emergencyFundScore >= 40 ? 'average' : 'poor',
    },
    {
      name: 'Investment Diversification',
      score: diversificationScore,
      maxScore: 100,
      weight: CATEGORY_WEIGHTS.investmentDiversification,
      icon: '📊',
      description: `Portfolio diversification score: ${portfolio.diversificationScore}/100`,
      status: diversificationScore >= 70 ? 'good' : diversificationScore >= 40 ? 'average' : 'poor',
    },
    {
      name: 'Spending Discipline',
      score: spendingScore,
      maxScore: 100,
      weight: CATEGORY_WEIGHTS.spendingDiscipline,
      icon: '📋',
      description: 'Based on spending consistency and trends',
      status: spendingScore >= 70 ? 'good' : spendingScore >= 40 ? 'average' : 'poor',
    },
  ];

  // Calculate weighted overall score
  const overall = Math.round(
    categories.reduce((sum, cat) => sum + cat.score * cat.weight, 0)
  );

  // Determine label and color
  const { label, color } = getScoreLabel(overall);

  // Generate action items
  const actionItems = generateActionItems(categories, latestMonth, portfolio, savingsBalance);

  // Generate historical scores (simulated trend)
  const history = generateHistory(monthlySummaries, overall);

  // Calculate monthly change
  const monthlyChange = history.length >= 2 ? history[0].score - history[1].score : 0;

  return {
    overall,
    label,
    color,
    categories,
    monthlyChange,
    actionItems,
    history,
  };
}

/** Scores the savings rate (0-100) */
function scoreSavingsRate(month: MonthlySummary): number {
  const rate = calculateSavingsRate(month.totalIncome, month.totalExpenses);
  if (rate >= 35) return 95;
  if (rate >= 30) return 85;
  if (rate >= 25) return 75;
  if (rate >= 20) return 65;
  if (rate >= 15) return 50;
  if (rate >= 10) return 35;
  if (rate >= 5) return 20;
  return 10;
}

/** Scores the debt-to-income ratio (0-100) */
function scoreDTI(user: UserProfile): number {
  const totalEMI = user.existingLoans.reduce((sum, loan) => sum + loan.emiAmount, 0);
  const dti = calculateDTI(totalEMI, user.monthlySalary);
  if (dti === 0) return 100;
  if (dti <= 10) return 90;
  if (dti <= 20) return 80;
  if (dti <= 30) return 65;
  if (dti <= 40) return 50;
  if (dti <= 50) return 30;
  return 15;
}

/** Scores emergency fund coverage (0-100) */
function scoreEmergencyFund(savings: number, monthlyExpenses: number): number {
  const months = calculateEmergencyFundCoverage(savings, monthlyExpenses);
  if (months >= 6) return 100;
  if (months >= 5) return 85;
  if (months >= 4) return 70;
  if (months >= 3) return 55;
  if (months >= 2) return 40;
  if (months >= 1) return 25;
  return 10;
}

/** Scores investment diversification (0-100) */
function scoreDiversification(portfolio: Portfolio): number {
  return Math.min(100, portfolio.diversificationScore);
}

/** Scores spending discipline based on trends (0-100) */
function scoreSpendingDiscipline(summaries: MonthlySummary[]): number {
  if (summaries.length < 2) return 60;

  let score = 70; // baseline

  // Check if spending is increasing month over month
  for (let i = 0; i < summaries.length - 1; i++) {
    const current = summaries[i];
    const previous = summaries[i + 1];
    const expenseChange = ((current.totalExpenses - previous.totalExpenses) / previous.totalExpenses) * 100;

    if (expenseChange < -5) score += 5; // spending decreased — good
    else if (expenseChange > 10) score -= 8; // spending increased significantly — bad
    else if (expenseChange > 5) score -= 3; // spending increased moderately
  }

  // Check savings rate consistency
  const rates = summaries.map((s) => s.savingsRate);
  const avgRate = rates.reduce((a, b) => a + b, 0) / rates.length;
  if (avgRate >= FINANCIAL_CONSTANTS.MIN_SAVINGS_RATE) score += 10;

  return Math.max(0, Math.min(100, score));
}

/** Gets the label and color for a given score */
function getScoreLabel(score: number): { label: HealthScore['label']; color: string } {
  if (score >= HEALTH_SCORE_THRESHOLDS.EXCELLENT.min) return HEALTH_SCORE_THRESHOLDS.EXCELLENT;
  if (score >= HEALTH_SCORE_THRESHOLDS.GOOD.min) return HEALTH_SCORE_THRESHOLDS.GOOD;
  if (score >= HEALTH_SCORE_THRESHOLDS.FAIR.min) return HEALTH_SCORE_THRESHOLDS.FAIR;
  if (score >= HEALTH_SCORE_THRESHOLDS.NEEDS_IMPROVEMENT.min) return HEALTH_SCORE_THRESHOLDS.NEEDS_IMPROVEMENT;
  return HEALTH_SCORE_THRESHOLDS.POOR;
}

/** Generates action items based on the weakest categories */
function generateActionItems(
  categories: HealthCategory[],
  latestMonth: MonthlySummary,
  portfolio: Portfolio,
  savingsBalance: number
): ActionItem[] {
  const items: ActionItem[] = [];

  const sorted = [...categories].sort((a, b) => a.score - b.score);

  for (const cat of sorted.slice(0, 3)) {
    if (cat.score >= 80) continue;

    switch (cat.name) {
      case 'Savings Rate':
        items.push({
          id: 'AI-SR-001',
          title: 'Increase Monthly Savings',
          description: `Your savings rate is ${latestMonth.savingsRate.toFixed(1)}%. Try reducing discretionary spending by ₹4,000/month to reach the recommended 30% savings rate.`,
          impact: 'high',
          category: 'savings',
          estimatedScoreImprovement: 8,
        });
        break;
      case 'Emergency Fund':
        items.push({
          id: 'AI-EF-001',
          title: 'Build Emergency Fund to ₹3 Lakh',
          description: `Your emergency fund covers ${calculateEmergencyFundCoverage(savingsBalance, latestMonth.totalExpenses)} months. Build it to 6 months (₹${Math.round(latestMonth.totalExpenses * 6).toLocaleString('en-IN')}).`,
          impact: 'high',
          category: 'emergency',
          estimatedScoreImprovement: 12,
        });
        break;
      case 'Investment Diversification':
        items.push({
          id: 'AI-ID-001',
          title: 'Improve Portfolio Diversification',
          description: 'Consider adding international equity or more debt instruments to balance your portfolio.',
          impact: 'medium',
          category: 'investment',
          estimatedScoreImprovement: 6,
        });
        break;
      case 'Spending Discipline':
        items.push({
          id: 'AI-SD-001',
          title: 'Set Monthly Budget Limits',
          description: 'Create category-wise spending limits for dining, shopping, and entertainment to improve spending discipline.',
          impact: 'medium',
          category: 'spending',
          estimatedScoreImprovement: 5,
        });
        break;
      case 'Debt Management':
        items.push({
          id: 'AI-DM-001',
          title: 'Accelerate Loan Repayment',
          description: 'Consider making partial prepayments on your education loan to reduce interest burden and improve DTI ratio.',
          impact: 'medium',
          category: 'debt',
          estimatedScoreImprovement: 7,
        });
        break;
    }
  }

  return items;
}

/** Generates simulated historical scores */
function generateHistory(summaries: MonthlySummary[], currentScore: number): { month: string; score: number }[] {
  return summaries.map((s, i) => ({
    month: s.month,
    score: Math.max(30, Math.min(100, currentScore - i * 2 + Math.floor(Math.random() * 4 - 2))),
  }));
}

/** Creates a default empty score */
function createEmptyScore(): HealthScore {
  return {
    overall: 0,
    label: 'Poor',
    color: HEALTH_SCORE_THRESHOLDS.POOR.color,
    categories: [],
    monthlyChange: 0,
    actionItems: [],
    history: [],
  };
}
