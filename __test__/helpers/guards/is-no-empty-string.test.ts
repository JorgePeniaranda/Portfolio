import { describe, it, expect } from 'vitest';

import { isNoEmptyString } from '@/helpers/guards/is-no-empty-string';

describe('isNoEmptyString', () => {
  it('should return true for non-empty strings that are not just whitespace', () => {
    expect(isNoEmptyString('Hello')).toBe(true); // Non-empty string
    expect(isNoEmptyString('   Hello   ')).toBe(true); // String with spaces around
    expect(isNoEmptyString('123')).toBe(true); // Numeric string
    expect(isNoEmptyString('!@#')).toBe(true); // Special characters string
  });

  it('should return false for empty strings or strings composed only of whitespace', () => {
    expect(isNoEmptyString('')).toBe(false); // Empty string
    expect(isNoEmptyString('   ')).toBe(false); // String with only spaces
    expect(isNoEmptyString('\t\n')).toBe(false); // String with only tabs and newlines
    expect(isNoEmptyString('     ')).toBe(false); // String with only spaces
  });
});
