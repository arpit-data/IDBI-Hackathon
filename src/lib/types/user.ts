/**
 * User Domain Types
 * Type definitions for user profiles, risk profiles, and financial goals.
 */

import type { RiskLevel } from './investment';

/** Risk appetite profile */
export type RiskAppetite = 'conservative' | 'moderate' | 'aggressive';

/** Financial goal category */
export type GoalCategory =
  | 'home'
  | 'retirement'
  | 'education'
  | 'emergency_fund'
  | 'vacation'
  | 'car'
  | 'wedding'
  | 'wealth_creation'
  | 'debt_free'
  | 'custom';

/** Goal priority level */
export type GoalPriority = 'high' | 'medium' | 'low';

/** Goal status */
export type GoalStatus = 'on_track' | 'behind' | 'ahead' | 'completed' | 'at_risk';

/** User profile */
export interface UserProfile {
  /** User identifier */
  readonly id: string;
  /** Full name */
  readonly name: string;
  /** Age */
  readonly age: number;
  /** Occupation */
  readonly occupation: string;
  /** Monthly salary (gross) */
  readonly monthlySalary: number;
  /** Annual income */
  readonly annualIncome: number;
  /** City */
  readonly city: string;
  /** Risk appetite */
  readonly riskAppetite: RiskAppetite;
  /** Dependents count */
  readonly dependents: number;
  /** Existing loans */
  readonly existingLoans: LoanInfo[];
  /** Credit score (300-900) */
  readonly creditScore: number;
  /** Member since date */
  readonly memberSince: string;
  /** Persona type for the demo */
  readonly personaType: string;
}

/** Loan information */
export interface LoanInfo {
  readonly type: 'home' | 'car' | 'personal' | 'education';
  readonly principalAmount: number;
  readonly outstandingAmount: number;
  readonly emiAmount: number;
  readonly interestRate: number;
  readonly remainingMonths: number;
}

/** Financial goal */
export interface FinancialGoal {
  /** Unique identifier */
  readonly id: string;
  /** Goal name */
  readonly name: string;
  /** Goal category */
  readonly category: GoalCategory;
  /** Target amount */
  readonly targetAmount: number;
  /** Amount saved so far */
  readonly currentAmount: number;
  /** Target completion date */
  readonly targetDate: string;
  /** Monthly contribution */
  readonly monthlyContribution: number;
  /** Expected annual return rate (percentage) */
  readonly expectedReturn: number;
  /** Priority level */
  readonly priority: GoalPriority;
  /** Goal status */
  readonly status: GoalStatus;
  /** Progress percentage (0-100) */
  readonly progress: number;
  /** Goal icon */
  readonly icon: string;
  /** Goal color */
  readonly color: string;
}

/** Risk profile assessment result */
export interface RiskProfile {
  /** Overall risk score (1-10) */
  readonly score: number;
  /** Risk level classification */
  readonly level: RiskLevel;
  /** Risk appetite label */
  readonly appetite: RiskAppetite;
  /** Assessment factors */
  readonly factors: RiskFactor[];
  /** Recommended asset allocation */
  readonly recommendedAllocation: {
    equity: number;
    debt: number;
    gold: number;
    alternatives: number;
  };
}

/** Individual risk assessment factor */
export interface RiskFactor {
  readonly name: string;
  readonly value: string;
  readonly score: number;
  readonly maxScore: number;
}

/** Financial health score */
export interface HealthScore {
  /** Overall score (0-100) */
  readonly overall: number;
  /** Score label */
  readonly label: 'Excellent' | 'Good' | 'Fair' | 'Needs Improvement' | 'Poor';
  /** Score color */
  readonly color: string;
  /** Category-wise breakdown */
  readonly categories: HealthCategory[];
  /** Month-over-month change */
  readonly monthlyChange: number;
  /** AI-generated action items */
  readonly actionItems: ActionItem[];
  /** Historical scores (last 6 months) */
  readonly history: { month: string; score: number }[];
}

/** Health score category */
export interface HealthCategory {
  readonly name: string;
  readonly score: number;
  readonly maxScore: number;
  readonly weight: number;
  readonly icon: string;
  readonly description: string;
  readonly status: 'good' | 'average' | 'poor';
}

/** AI-suggested action item */
export interface ActionItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly impact: 'high' | 'medium' | 'low';
  readonly category: string;
  readonly estimatedScoreImprovement: number;
}

/** Goal category display metadata */
export const GOAL_CATEGORY_META: Record<GoalCategory, { label: string; icon: string; color: string }> = {
  home: { label: 'Buy Home', icon: '🏠', color: '#3b82f6' },
  retirement: { label: 'Retirement', icon: '🏖️', color: '#f97316' },
  education: { label: 'Education', icon: '🎓', color: '#8b5cf6' },
  emergency_fund: { label: 'Emergency Fund', icon: '🛡️', color: '#22c55e' },
  vacation: { label: 'Vacation', icon: '✈️', color: '#06b6d4' },
  car: { label: 'Buy Car', icon: '🚗', color: '#ef4444' },
  wedding: { label: 'Wedding', icon: '💍', color: '#ec4899' },
  wealth_creation: { label: 'Wealth Creation', icon: '💎', color: '#eab308' },
  debt_free: { label: 'Become Debt-Free', icon: '🆓', color: '#14b8a6' },
  custom: { label: 'Custom Goal', icon: '🎯', color: '#64748b' },
};
