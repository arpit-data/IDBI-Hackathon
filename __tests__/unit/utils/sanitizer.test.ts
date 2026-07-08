/**
 * Sanitizer — Unit Tests
 * Tests input sanitization and security utilities.
 */

import {
  sanitizeInput,
  encodeHTMLEntities,
  containsXSS,
  containsSQLInjection,
  sanitizeChatMessage,
  maskPII,
} from '@/lib/utils/sanitizer';

describe('sanitizeInput', () => {
  it('should trim whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello');
  });

  it('should enforce max length', () => {
    const long = 'a'.repeat(2000);
    expect(sanitizeInput(long, 100).length).toBe(100);
  });

  it('should encode HTML entities', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toContain('&lt;');
    expect(sanitizeInput('<script>alert("xss")</script>')).not.toContain('<script>');
  });

  it('should handle non-string input', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(sanitizeInput(null as any)).toBe('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(sanitizeInput(undefined as any)).toBe('');
  });
});

describe('encodeHTMLEntities', () => {
  it('should encode angle brackets', () => {
    expect(encodeHTMLEntities('<div>')).toBe('&lt;div&gt;');
  });

  it('should encode ampersand', () => {
    expect(encodeHTMLEntities('a & b')).toBe('a &amp; b');
  });

  it('should encode quotes', () => {
    expect(encodeHTMLEntities('"hello"')).toBe('&quot;hello&quot;');
  });
});

describe('containsXSS', () => {
  it('should detect script tags', () => {
    expect(containsXSS('<script>alert(1)</script>')).toBe(true);
  });

  it('should detect javascript: protocol', () => {
    expect(containsXSS('javascript:void(0)')).toBe(true);
  });

  it('should detect event handlers', () => {
    expect(containsXSS('onload=alert(1)')).toBe(true);
  });

  it('should not flag normal text', () => {
    expect(containsXSS('Hello, how are you?')).toBe(false);
  });
});

describe('containsSQLInjection', () => {
  it('should detect SELECT statements', () => {
    expect(containsSQLInjection('SELECT * FROM users')).toBe(true);
  });

  it('should detect DROP TABLE', () => {
    expect(containsSQLInjection('DROP TABLE users')).toBe(true);
  });

  it('should not flag normal text', () => {
    expect(containsSQLInjection('What is my spending?')).toBe(false);
  });
});

describe('sanitizeChatMessage', () => {
  it('should return null for empty message', () => {
    expect(sanitizeChatMessage('')).toBeNull();
    expect(sanitizeChatMessage('   ')).toBeNull();
  });

  it('should return null for too-long message', () => {
    expect(sanitizeChatMessage('a'.repeat(2001))).toBeNull();
  });

  it('should strip script tags', () => {
    const result = sanitizeChatMessage('Hello <script>alert(1)</script> world');
    expect(result).not.toContain('<script>');
    expect(result).toContain('Hello');
  });

  it('should preserve normal messages', () => {
    expect(sanitizeChatMessage('Where does my money go?')).toBe('Where does my money go?');
  });
});

describe('maskPII', () => {
  it('should mask account numbers', () => {
    const result = maskPII('Account: 1234567890');
    expect(result).toContain('XXXXXX7890');
  });

  it('should mask PAN numbers', () => {
    const result = maskPII('PAN: ABCDE1234F');
    expect(result).toBe('PAN: XXXXX****X');
  });

  it('should mask phone numbers', () => {
    const result = maskPII('Phone: 9876543210');
    expect(result).toContain('XXXXXX3210');
  });

  it('should mask email addresses', () => {
    const result = maskPII('Email: test@example.com');
    expect(result).toContain('***@***.***');
  });

  it('should preserve non-PII text', () => {
    const result = maskPII('Hello world');
    expect(result).toBe('Hello world');
  });
});
