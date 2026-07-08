/**
 * Input Sanitization Utilities
 * Security utilities for input validation, XSS prevention, and PII masking.
 */

/** Characters that could be used in XSS attacks */
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /eval\s*\(/gi,
  /expression\s*\(/gi,
];

/** SQL injection patterns */
const SQL_PATTERNS = [
  /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\b)/gi,
  /(--|;|'|"|\b(OR|AND)\b\s+\d+\s*=\s*\d+)/gi,
];

/**
 * Sanitizes user input by removing potentially dangerous content.
 *
 * @param input - Raw user input string
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns Sanitized string
 */
export function sanitizeInput(input: string, maxLength = 1000): string {
  if (typeof input !== 'string') return '';

  let sanitized = input.trim();

  // Enforce length limit
  sanitized = sanitized.slice(0, maxLength);

  // Encode HTML entities to prevent XSS
  sanitized = encodeHTMLEntities(sanitized);

  return sanitized;
}

/**
 * Encodes HTML special characters to prevent XSS.
 *
 * @param str - Input string
 * @returns HTML-encoded string
 */
export function encodeHTMLEntities(str: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
  };
  return str.replace(/[&<>"']/g, (char) => entities[char] || char);
}

/**
 * Checks if input contains potential XSS payloads.
 *
 * @param input - String to check
 * @returns true if XSS pattern detected
 */
export function containsXSS(input: string): boolean {
  return XSS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Checks if input contains potential SQL injection patterns.
 *
 * @param input - String to check
 * @returns true if SQL injection pattern detected
 */
export function containsSQLInjection(input: string): boolean {
  return SQL_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Validates and sanitizes chat message input.
 *
 * @param message - User chat message
 * @returns Sanitized message or null if invalid
 */
export function sanitizeChatMessage(message: string): string | null {
  if (typeof message !== 'string' || message.trim().length === 0) return null;
  if (message.length > 2000) return null;

  // Don't encode HTML for chat since we render as text, but strip dangerous patterns
  let sanitized = message.trim();

  // Remove script tags and event handlers
  for (const pattern of XSS_PATTERNS) {
    sanitized = sanitized.replace(pattern, '');
  }

  return sanitized;
}

/**
 * Masks PII (Personally Identifiable Information) for logging.
 *
 * @param text - Text that may contain PII
 * @returns Text with PII masked
 */
export function maskPII(text: string): string {
  let masked = text;

  // Mask account numbers (10+ digit sequences)
  masked = masked.replace(/\b\d{10,}\b/g, (match) =>
    'X'.repeat(match.length - 4) + match.slice(-4)
  );

  // Mask PAN numbers (ABCDE1234F pattern)
  masked = masked.replace(/\b[A-Z]{5}\d{4}[A-Z]\b/g, 'XXXXX****X');

  // Mask Aadhaar numbers (12 digit sequences)
  masked = masked.replace(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, 'XXXX XXXX ****');

  // Mask phone numbers (10 digit Indian mobile numbers)
  masked = masked.replace(/\b[6-9]\d{9}\b/g, (match) =>
    'XXXXXX' + match.slice(-4)
  );

  // Mask email addresses
  masked = masked.replace(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    '***@***.***'
  );

  return masked;
}

/**
 * Generates a unique identifier for tracking purposes.
 * Uses crypto.randomUUID when available, falls back to timestamp-based ID.
 *
 * @returns Unique string identifier
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
