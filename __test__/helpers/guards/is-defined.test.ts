import { describe, it, expect } from 'vitest';

import { isDefined, isNotDefined } from '@/helpers/guards/is-defined';

describe('isDefined', () => {
  it('should return true for defined values', () => {
    expect(isDefined(42)).toBe(true); // Number
    expect(isDefined('Hello')).toBe(true); // String
    expect(isDefined({})).toBe(true); // Object
    expect(isDefined([])).toBe(true); // Array
    expect(isDefined(true)).toBe(true); // Boolean
  });

  it('should return false for null or undefined', () => {
    expect(isDefined(null)).toBe(false); // null
    expect(isDefined(undefined)).toBe(false); // undefined
  });
});

describe('isNotDefined', () => {
  it('should return true for null or undefined', () => {
    expect(isNotDefined(null)).toBe(true); // null
    expect(isNotDefined(undefined)).toBe(true); // undefined
  });

  it('should return false for defined values', () => {
    expect(isNotDefined(42)).toBe(false); // Number
    expect(isNotDefined('Hello')).toBe(false); // String
    expect(isNotDefined({})).toBe(false); // Object
    expect(isNotDefined([])).toBe(false); // Array
    expect(isNotDefined(true)).toBe(false); // Boolean
  });
});
