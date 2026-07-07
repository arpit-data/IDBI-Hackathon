/**
 * Type Index
 * Re-exports all domain types for convenient imports.
 */
export type {
  Transaction,
  TransactionCategory,
  TransactionType,
  PaymentMode,
  Account,
  MonthlySummary,
  CategoryBreakdown,
  CategoryMeta,
} from './banking';

export { CATEGORY_META } from './banking';

export type {
  AssetClass,
  RiskLevel,
  Holding,
  Portfolio,
  AssetAllocation,
  InvestmentProduct,
  Recommendation,
  RecommendationFactor,
} from './investment';

export { ASSET_CLASS_META } from './investment';

export type {
  RiskAppetite,
  GoalCategory,
  GoalPriority,
  GoalStatus,
  UserProfile,
  LoanInfo,
  FinancialGoal,
  RiskProfile,
  RiskFactor,
  HealthScore,
  HealthCategory,
  ActionItem,
} from './user';

export { GOAL_CATEGORY_META } from './user';

export type {
  MessageRole,
  ChatMessage,
  AIResponseMeta,
  BehavioralInsight,
  ActionPlanItem,
  SuggestedQuestion,
  ChatRequest,
  ChatResponse,
} from './ai';
