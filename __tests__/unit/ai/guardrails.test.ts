/**
 * AI Guardrails — Unit Tests
 * Tests the AI safety and compliance layer.
 */

import {
  validateAIResponse,
  validateUserInput,
  estimateConfidence,
} from '@/lib/ai/guardrails';

describe('validateAIResponse', () => {
  it('should flag guaranteed returns claims', () => {
    const result = validateAIResponse('This fund offers guaranteed returns of 15%');
    expect(result.flags).toContain('unsafe_financial_claim');
    expect(result.isModified).toBe(true);
  });

  it('should flag specific stock tips', () => {
    const result = validateAIResponse('Buy shares of Reliance stock immediately');
    expect(result.flags).toContain('specific_stock_tip');
  });

  it('should trigger human advisor for legal topics', () => {
    const result = validateAIResponse('For estate planning, you should create a will and trust');
    expect(result.suggestHumanAdvisor).toBe(true);
    expect(result.content).toContain('relationship manager');
  });

  it('should add disclaimers to investment-related responses', () => {
    const result = validateAIResponse('I recommend starting a SIP in mutual funds');
    expect(result.content).toContain('financial advice');
  });

  it('should not modify safe responses', () => {
    const result = validateAIResponse('Your savings rate is 28%, which is above the recommended 20%.');
    // No unsafe patterns, no investment keywords
    expect(result.flags).toHaveLength(0);
  });
});

describe('validateUserInput', () => {
  it('should reject empty messages', () => {
    expect(validateUserInput('')).toEqual({ isValid: false, reason: 'Message cannot be empty.' });
  });

  it('should reject whitespace-only messages', () => {
    expect(validateUserInput('   ')).toEqual({ isValid: false, reason: 'Message cannot be empty.' });
  });

  it('should reject too-long messages', () => {
    const result = validateUserInput('a'.repeat(2001));
    expect(result.isValid).toBe(false);
  });

  it('should accept valid messages', () => {
    expect(validateUserInput('What is my savings rate?')).toEqual({ isValid: true, reason: null });
  });
});

describe('estimateConfidence', () => {
  it('should return lower confidence for speculative queries', () => {
    const conf = estimateConfidence('Market may go up', 'Will the market go up?');
    expect(conf).toBeLessThan(0.8);
  });

  it('should return higher confidence for data-backed responses', () => {
    const conf = estimateConfidence('Your savings rate is 28% with a balance of ₹1,87,000', 'What is my savings?');
    expect(conf).toBeGreaterThan(0.8);
  });

  it('should always be between 0.3 and 1.0', () => {
    const conf = estimateConfidence('x', 'predict the future market price forecast');
    expect(conf).toBeGreaterThanOrEqual(0.3);
    expect(conf).toBeLessThanOrEqual(1.0);
  });
});
