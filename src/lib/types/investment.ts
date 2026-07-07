/**
 * Investment Domain Types
 * Type definitions for portfolio, holdings, and investment products.
 */

/** Asset class categories */
export type AssetClass =
  | 'equity_mf'
  | 'debt_mf'
  | 'hybrid_mf'
  | 'fixed_deposit'
  | 'recurring_deposit'
  | 'stocks'
  | 'gold'
  | 'nps'
  | 'ppf'
  | 'epf'
  | 'bonds'
  | 'insurance'
  | 'real_estate'
  | 'savings';

/** Risk level classification */
export type RiskLevel = 'low' | 'moderate' | 'high' | 'very_high';

/** Investment holding */
export interface Holding {
  /** Unique identifier */
  readonly id: string;
  /** Name of the investment */
  readonly name: string;
  /** Asset class */
  readonly assetClass: AssetClass;
  /** Amount invested */
  readonly investedAmount: number;
  /** Current market value */
  readonly currentValue: number;
  /** Absolute returns */
  readonly returns: number;
  /** Returns percentage */
  readonly returnsPercentage: number;
  /** XIRR (annualized returns) */
  readonly xirr: number;
  /** Risk level */
  readonly riskLevel: RiskLevel;
  /** Investment start date */
  readonly startDate: string;
  /** Monthly SIP amount (if applicable) */
  readonly sipAmount: number | null;
  /** Folio/account number (masked) */
  readonly folioNumber: string;
}

/** Portfolio summary */
export interface Portfolio {
  /** Total invested amount */
  readonly totalInvested: number;
  /** Total current value */
  readonly totalCurrentValue: number;
  /** Overall returns */
  readonly totalReturns: number;
  /** Overall returns percentage */
  readonly totalReturnsPercentage: number;
  /** Portfolio XIRR */
  readonly overallXirr: number;
  /** Asset allocation breakdown */
  readonly allocation: AssetAllocation[];
  /** Individual holdings */
  readonly holdings: Holding[];
  /** Diversification score (0-100) */
  readonly diversificationScore: number;
  /** Risk level of overall portfolio */
  readonly portfolioRiskLevel: RiskLevel;
}

/** Asset allocation entry */
export interface AssetAllocation {
  readonly assetClass: AssetClass;
  readonly label: string;
  readonly amount: number;
  readonly percentage: number;
  readonly color: string;
}

/** IDBI Bank investment product */
export interface InvestmentProduct {
  /** Product identifier */
  readonly id: string;
  /** Product name */
  readonly name: string;
  /** Product category */
  readonly category: AssetClass;
  /** Minimum investment amount */
  readonly minInvestment: number;
  /** Expected return range (low) */
  readonly expectedReturnLow: number;
  /** Expected return range (high) */
  readonly expectedReturnHigh: number;
  /** Risk level */
  readonly riskLevel: RiskLevel;
  /** Lock-in period in months (0 if none) */
  readonly lockInMonths: number;
  /** Brief description */
  readonly description: string;
  /** Suitability tags */
  readonly suitabilityTags: string[];
  /** Whether this is an IDBI-branded product */
  readonly isIDBIProduct: boolean;
}

/** Investment recommendation from AI */
export interface Recommendation {
  /** Recommended product */
  readonly product: InvestmentProduct;
  /** Match score (0-100) */
  readonly matchScore: number;
  /** Why this product is recommended */
  readonly reasoning: string;
  /** Which goal this helps achieve */
  readonly alignedGoal: string | null;
  /** Suggested monthly investment */
  readonly suggestedMonthly: number;
  /** Factors that contributed to this recommendation */
  readonly factors: RecommendationFactor[];
}

/** Factor contributing to a recommendation */
export interface RecommendationFactor {
  readonly factor: string;
  readonly weight: number;
  readonly description: string;
}

/** Asset class display metadata */
export const ASSET_CLASS_META: Record<AssetClass, { label: string; color: string }> = {
  equity_mf: { label: 'Equity Mutual Funds', color: '#3b82f6' },
  debt_mf: { label: 'Debt Mutual Funds', color: '#06b6d4' },
  hybrid_mf: { label: 'Hybrid Mutual Funds', color: '#8b5cf6' },
  fixed_deposit: { label: 'Fixed Deposits', color: '#22c55e' },
  recurring_deposit: { label: 'Recurring Deposits', color: '#14b8a6' },
  stocks: { label: 'Direct Equity', color: '#ef4444' },
  gold: { label: 'Gold', color: '#eab308' },
  nps: { label: 'NPS', color: '#f97316' },
  ppf: { label: 'PPF', color: '#10b981' },
  epf: { label: 'EPF', color: '#059669' },
  bonds: { label: 'Bonds', color: '#6366f1' },
  insurance: { label: 'Insurance', color: '#ec4899' },
  real_estate: { label: 'Real Estate', color: '#78716c' },
  savings: { label: 'Savings Account', color: '#94a3b8' },
};
