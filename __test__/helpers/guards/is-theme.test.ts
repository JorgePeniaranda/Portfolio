import { describe, expect, it } from 'vitest';

import { isTheme } from '@/helpers/guards/is-theme';
import { themes } from '@/types/common.d';

describe('isTheme', () => {
  it('should return true for valid themes', () => {
    expect(isTheme(themes.light)).toBe(true);
    expect(isTheme(themes.dark)).toBe(true);
  });

  it('should return false for invalid themes', () => {
    expect(isTheme('blue')).toBe(false); // A value that is not 'light' or 'dark'
    expect(isTheme('')).toBe(false); // An empty string
    expect(isTheme(null)).toBe(false); // Null value
    expect(isTheme(undefined)).toBe(false); // Undefined value
    expect(isTheme(123)).toBe(false); // Non-string value
  });

  it('should return false for values not in themesArray', () => {
    expect(isTheme('blue')).toBe(false); // Not in the themes array
  });
});
