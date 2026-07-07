/**
 * AI Interaction Types
 * Type definitions for AI chat, responses, and insights.
 */

/** Chat message role */
export type MessageRole = 'user' | 'assistant' | 'system';

/** Chat message */
export interface ChatMessage {
  /** Unique message identifier */
  readonly id: string;
  /** Message role */
  readonly role: MessageRole;
  /** Message content */
  readonly content: string;
  /** Timestamp */
  readonly timestamp: string;
  /** Whether the message is still streaming */
  readonly isStreaming?: boolean;
}

/** AI response metadata */
export interface AIResponseMeta {
  /** Confidence level (0-1) */
  readonly confidence: number;
  /** Whether disclaimers were added */
  readonly hasDisclaimers: boolean;
  /** Topics covered in the response */
  readonly topics: string[];
  /** Whether escalation to human advisor is suggested */
  readonly suggestHumanAdvisor: boolean;
}

/** Behavioral insight from AI */
export interface BehavioralInsight {
  /** Unique identifier */
  readonly id: string;
  /** Insight title */
  readonly title: string;
  /** Detailed description */
  readonly description: string;
  /** Insight category */
  readonly category: 'spending' | 'saving' | 'investing' | 'planning' | 'behavior';
  /** Impact level */
  readonly impact: 'positive' | 'neutral' | 'negative';
  /** Suggested action */
  readonly action: string | null;
  /** Date generated */
  readonly date: string;
  /** Icon */
  readonly icon: string;
}

/** Monthly action plan item */
export interface ActionPlanItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly dueDate: string;
  readonly category: string;
  readonly priority: 'high' | 'medium' | 'low';
}

/** Suggested chat question */
export interface SuggestedQuestion {
  readonly id: string;
  readonly text: string;
  readonly category: string;
  readonly icon: string;
}

/** Chat API request payload */
export interface ChatRequest {
  readonly message: string;
  readonly conversationHistory: ChatMessage[];
}

/** Chat API response */
export interface ChatResponse {
  readonly message: string;
  readonly meta: AIResponseMeta;
}
