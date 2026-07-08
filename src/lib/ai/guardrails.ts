/**
 * AI Guardrails
 * Safety layer for AI-generated financial content.
 * Ensures responses comply with RBI/SEBI guidelines and bank policies.
 */

import { AI_DISCLAIMER } from '@/lib/utils/constants';

/** Patterns that indicate potentially unsafe financial advice */
const UNSAFE_PATTERNS = [
  /guaranteed\s+returns?/i,
  /sure\s+shot/i,
  /risk[\s-]*free\s+(?:investment|return)/i,
  /100%\s+safe/i,
  /double\s+your\s+money/i,
  /get\s+rich\s+quick/i,
  /no\s+risk/i,
  /assured\s+returns?/i,
];

/** Patterns that suggest recommending specific stocks */
const STOCK_TIP_PATTERNS = [
  /buy\s+(?:shares?|stock)\s+(?:of|in)\s+\w+/i,
  /sell\s+(?:shares?|stock)\s+(?:of|in)\s+\w+/i,
  /invest\s+in\s+(?:reliance|tcs|infosys|hdfc|sbi|icici)\s+(?:shares?|stock)/i,
];

/** Topics requiring human advisor escalation */
const ESCALATION_TRIGGERS = [
  /tax\s+evasion/i,
  /legal\s+(?:advice|matter)/i,
  /estate\s+planning/i,
  /will\s+(?:and|&)\s+trust/i,
  /divorce.*(?:assets?|property)/i,
  /bankruptcy/i,
  /insider\s+trading/i,
];

/**
 * Validates an AI response for safety and compliance.
 *
 * @param response - The AI-generated response text
 * @returns Validated and potentially modified response
 */
export function validateAIResponse(response: string): {
  content: string;
  isModified: boolean;
  flags: string[];
  suggestHumanAdvisor: boolean;
} {
  const flags: string[] = [];
  let content = response;
  let isModified = false;
  let suggestHumanAdvisor = false;

  // Check for unsafe financial advice patterns
  for (const pattern of UNSAFE_PATTERNS) {
    if (pattern.test(content)) {
      flags.push('unsafe_financial_claim');
      isModified = true;
    }
  }

  // Check for specific stock recommendations
  for (const pattern of STOCK_TIP_PATTERNS) {
    if (pattern.test(content)) {
      flags.push('specific_stock_tip');
      isModified = true;
    }
  }

  // Check for topics requiring human advisor
  for (const pattern of ESCALATION_TRIGGERS) {
    if (pattern.test(content)) {
      flags.push('requires_human_advisor');
      suggestHumanAdvisor = true;
    }
  }

  // Ensure disclaimer is present for investment-related responses
  const investmentKeywords = /invest|sip|mutual fund|stock|portfolio|returns?|fd|nps|gold/i;
  if (investmentKeywords.test(content) && !content.includes('financial advice')) {
    content += `\n\n---\n*${AI_DISCLAIMER}*`;
    isModified = true;
  }

  // Add human advisor suggestion if triggered
  if (suggestHumanAdvisor) {
    content += '\n\n💡 **This topic may benefit from professional guidance.** I recommend speaking with your IDBI Bank relationship manager or a certified financial advisor for detailed assistance.';
    isModified = true;
  }

  return {
    content,
    isModified,
    flags,
    suggestHumanAdvisor,
  };
}

/**
 * Validates user input before sending to the AI.
 *
 * @param message - User message
 * @returns Whether the message is safe to process
 */
export function validateUserInput(message: string): {
  isValid: boolean;
  reason: string | null;
} {
  if (!message || message.trim().length === 0) {
    return { isValid: false, reason: 'Message cannot be empty.' };
  }

  if (message.length > 2000) {
    return { isValid: false, reason: 'Message is too long. Please keep it under 2000 characters.' };
  }

  return { isValid: true, reason: null };
}

/**
 * Estimates the confidence level of the AI's response
 * based on the content and topic.
 *
 * @param response - AI response text
 * @param userMessage - Original user query
 * @returns Confidence score between 0 and 1
 */
export function estimateConfidence(response: string, userMessage: string): number {
  let confidence = 0.8; // base confidence

  // Lower confidence for speculative topics
  const speculativePatterns = /predict|forecast|will.*market|future.*price/i;
  if (speculativePatterns.test(userMessage)) {
    confidence -= 0.2;
  }

  // Higher confidence for data-backed responses
  const dataPatterns = /₹|%|score|balance|expense|saving/;
  if (dataPatterns.test(response)) {
    confidence += 0.1;
  }

  // Lower confidence for very short or very long responses
  if (response.length < 50) confidence -= 0.1;
  if (response.length > 2000) confidence -= 0.05;

  return Math.max(0.3, Math.min(1.0, confidence));
}
