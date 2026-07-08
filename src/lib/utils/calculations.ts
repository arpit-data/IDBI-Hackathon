/**
 * Financial Calculations
 * Pure functions for financial computations — SIP, EMI, CAGR, etc.
 * All functions are deterministic and side-effect-free for testability.
 */

/**
 * Calculates the future value of a Systematic Investment Plan (SIP).
 *
 * @param monthlyAmount - Monthly SIP contribution in INR
 * @param annualRate - Expected annual return rate (as percentage, e.g., 12 for 12%)
 * @param years - Investment duration in years
 * @returns Future value of the SIP
 *
 * @example
 * calculateSIPFutureValue(5000, 12, 10) // ~11,61,695
 */
export function calculateSIPFutureValue(
  monthlyAmount: number,
  annualRate: number,
  years: number
): number {
  if (monthlyAmount <= 0 || years <= 0) return 0;
  if (annualRate === 0) return monthlyAmount * years * 12;

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const futureValue =
    monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  return Math.round(futureValue);
}

/**
 * Calculates the monthly SIP required to reach a target amount.
 *
 * @param targetAmount - Desired future value
 * @param annualRate - Expected annual return rate (percentage)
 * @param years - Time horizon in years
 * @returns Required monthly SIP amount
 */
export function calculateRequiredSIP(
  targetAmount: number,
  annualRate: number,
  years: number
): number {
  if (targetAmount <= 0 || years <= 0) return 0;
  if (annualRate === 0) return Math.round(targetAmount / (years * 12));

  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  const sip =
    targetAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  return Math.round(sip);
}

/**
 * Calculates EMI (Equated Monthly Installment) for a loan.
 *
 * @param principal - Loan principal amount
 * @param annualRate - Annual interest rate (percentage)
 * @param tenureMonths - Loan tenure in months
 * @returns Monthly EMI amount
 *
 * @example
 * calculateEMI(5000000, 8.5, 240) // ~43,391
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRate === 0) return Math.round(principal / tenureMonths);

  const monthlyRate = annualRate / 100 / 12;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Math.round(emi);
}

/**
 * Calculates Compound Annual Growth Rate (CAGR).
 *
 * @param initialValue - Starting value
 * @param finalValue - Ending value
 * @param years - Time period in years
 * @returns CAGR as percentage
 *
 * @example
 * calculateCAGR(100000, 200000, 5) // ~14.87
 */
export function calculateCAGR(
  initialValue: number,
  finalValue: number,
  years: number
): number {
  if (initialValue <= 0 || finalValue <= 0 || years <= 0) return 0;
  const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100;
  return Math.round(cagr * 100) / 100;
}

/**
 * Calculates inflation-adjusted future value.
 *
 * @param currentAmount - Current value in today's rupees
 * @param inflationRate - Annual inflation rate (percentage)
 * @param years - Number of years
 * @returns Inflation-adjusted amount needed in future
 */
export function calculateInflationAdjusted(
  currentAmount: number,
  inflationRate: number,
  years: number
): number {
  if (years <= 0) return currentAmount;
  return Math.round(currentAmount * Math.pow(1 + inflationRate / 100, years));
}

/**
 * Calculates the real rate of return after inflation.
 *
 * @param nominalRate - Nominal annual return rate (percentage)
 * @param inflationRate - Annual inflation rate (percentage)
 * @returns Real rate of return (percentage)
 */
export function calculateRealReturn(nominalRate: number, inflationRate: number): number {
  const realReturn = ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
  return Math.round(realReturn * 100) / 100;
}

/**
 * Calculates the number of years to reach a target with monthly savings.
 *
 * @param currentSavings - Current savings balance
 * @param monthlyContribution - Monthly savings amount
 * @param targetAmount - Target amount
 * @param annualRate - Expected annual return rate (percentage)
 * @returns Number of years (decimal)
 */
export function calculateYearsToGoal(
  currentSavings: number,
  monthlyContribution: number,
  targetAmount: number,
  annualRate: number
): number {
  if (currentSavings >= targetAmount) return 0;
  if (monthlyContribution <= 0) return Infinity;

  // Binary search for the number of months
  let lo = 1;
  let hi = 600; // max 50 years
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    const monthlyRate = annualRate / 100 / 12;
    let futureValue: number;
    if (annualRate === 0) {
      futureValue = currentSavings + monthlyContribution * mid;
    } else {
      futureValue =
        currentSavings * Math.pow(1 + monthlyRate, mid) +
        monthlyContribution * ((Math.pow(1 + monthlyRate, mid) - 1) / monthlyRate);
    }
    if (futureValue >= targetAmount) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  return Math.round((lo / 12) * 10) / 10;
}

/**
 * Calculates savings rate as a percentage of income.
 *
 * @param income - Total monthly income
 * @param expenses - Total monthly expenses
 * @returns Savings rate percentage (0-100)
 */
export function calculateSavingsRate(income: number, expenses: number): number {
  if (income <= 0) return 0;
  const rate = ((income - expenses) / income) * 100;
  return Math.max(0, Math.round(rate * 10) / 10);
}

/**
 * Calculates debt-to-income ratio.
 *
 * @param totalEMIs - Total monthly EMI payments
 * @param monthlyIncome - Monthly gross income
 * @returns DTI ratio as percentage
 */
export function calculateDTI(totalEMIs: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;
  return Math.round((totalEMIs / monthlyIncome) * 100 * 10) / 10;
}

/**
 * Calculates emergency fund coverage in months.
 *
 * @param emergencyFund - Available emergency fund balance
 * @param monthlyExpenses - Average monthly expenses
 * @returns Number of months covered
 */
export function calculateEmergencyFundCoverage(
  emergencyFund: number,
  monthlyExpenses: number
): number {
  if (monthlyExpenses <= 0) return 0;
  return Math.round((emergencyFund / monthlyExpenses) * 10) / 10;
}
