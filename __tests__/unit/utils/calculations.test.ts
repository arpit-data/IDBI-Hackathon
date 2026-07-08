/**
 * Financial Calculations — Unit Tests
 * Tests all pure financial calculation functions.
 */

import {
  calculateSIPFutureValue,
  calculateRequiredSIP,
  calculateEMI,
  calculateCAGR,
  calculateInflationAdjusted,
  calculateSavingsRate,
  calculateDTI,
  calculateEmergencyFundCoverage,
  calculateYearsToGoal,
} from '@/lib/utils/calculations';

describe('calculateSIPFutureValue', () => {
  it('should calculate future value correctly', () => {
    const result = calculateSIPFutureValue(5000, 12, 10);
    // Expected ~11.6L at 12% for 10 years
    expect(result).toBeGreaterThan(1100000);
    expect(result).toBeLessThan(1200000);
  });

  it('should return 0 for zero monthly amount', () => {
    expect(calculateSIPFutureValue(0, 12, 10)).toBe(0);
  });

  it('should return 0 for zero years', () => {
    expect(calculateSIPFutureValue(5000, 12, 0)).toBe(0);
  });

  it('should handle zero interest rate', () => {
    const result = calculateSIPFutureValue(5000, 0, 10);
    expect(result).toBe(600000); // 5000 * 12 * 10
  });
});

describe('calculateRequiredSIP', () => {
  it('should calculate required SIP correctly', () => {
    const result = calculateRequiredSIP(5000000, 12, 5);
    expect(result).toBeGreaterThan(40000);
    expect(result).toBeLessThan(80000);
  });

  it('should return 0 for zero target', () => {
    expect(calculateRequiredSIP(0, 12, 10)).toBe(0);
  });
});

describe('calculateEMI', () => {
  it('should calculate EMI for home loan correctly', () => {
    const result = calculateEMI(5000000, 8.5, 240);
    expect(result).toBeGreaterThan(43000);
    expect(result).toBeLessThan(44000);
  });

  it('should return 0 for zero principal', () => {
    expect(calculateEMI(0, 8.5, 240)).toBe(0);
  });

  it('should handle zero interest rate', () => {
    expect(calculateEMI(120000, 0, 12)).toBe(10000);
  });
});

describe('calculateCAGR', () => {
  it('should calculate CAGR for doubling in 5 years', () => {
    const result = calculateCAGR(100000, 200000, 5);
    expect(result).toBeCloseTo(14.87, 0);
  });

  it('should return 0 for invalid inputs', () => {
    expect(calculateCAGR(0, 200000, 5)).toBe(0);
    expect(calculateCAGR(100000, 0, 5)).toBe(0);
    expect(calculateCAGR(100000, 200000, 0)).toBe(0);
  });
});

describe('calculateInflationAdjusted', () => {
  it('should calculate inflation-adjusted value', () => {
    const result = calculateInflationAdjusted(1000000, 6, 10);
    expect(result).toBeGreaterThan(1700000);
    expect(result).toBeLessThan(1800000);
  });

  it('should return same amount for 0 years', () => {
    expect(calculateInflationAdjusted(1000000, 6, 0)).toBe(1000000);
  });
});

describe('calculateSavingsRate', () => {
  it('should calculate correct savings rate', () => {
    expect(calculateSavingsRate(100000, 70000)).toBe(30);
  });

  it('should return 0 for zero income', () => {
    expect(calculateSavingsRate(0, 50000)).toBe(0);
  });

  it('should cap at 0 for overspending', () => {
    expect(calculateSavingsRate(50000, 80000)).toBe(0);
  });
});

describe('calculateDTI', () => {
  it('should calculate debt-to-income ratio', () => {
    expect(calculateDTI(20000, 100000)).toBe(20);
  });

  it('should return 0 for zero income', () => {
    expect(calculateDTI(20000, 0)).toBe(0);
  });
});

describe('calculateEmergencyFundCoverage', () => {
  it('should calculate months of coverage', () => {
    expect(calculateEmergencyFundCoverage(300000, 50000)).toBe(6);
  });

  it('should return 0 for zero expenses', () => {
    expect(calculateEmergencyFundCoverage(300000, 0)).toBe(0);
  });
});

describe('calculateYearsToGoal', () => {
  it('should return 0 if goal already achieved', () => {
    expect(calculateYearsToGoal(1000000, 10000, 500000, 12)).toBe(0);
  });

  it('should return Infinity for zero contribution', () => {
    expect(calculateYearsToGoal(0, 0, 500000, 12)).toBe(Infinity);
  });

  it('should calculate reasonable years for typical goal', () => {
    const years = calculateYearsToGoal(100000, 15000, 5000000, 12);
    expect(years).toBeGreaterThan(5);
    expect(years).toBeLessThan(20);
  });
});
