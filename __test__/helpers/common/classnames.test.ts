import { describe, it, expect } from 'vitest';

import { cn } from '@/helpers/common/classnames';

describe('cn utility function', () => {
  it('should combine class names with clsx', () => {
    const result = cn('bg-red-500', 'text-white');

    expect(result).toBe('bg-red-500 text-white');
  });

  it('should conditionally combine class names', () => {
    const result = cn('bg-red-500', { 'text-white': true });

    expect(result).toBe('bg-red-500 text-white');
  });

  it('should merge conflicting Tailwind class names using twMerge', () => {
    const result = cn('bg-red-500', 'bg-blue-500');

    expect(result).toBe('bg-blue-500'); // twMerge should prioritize the last one
  });

  it('should ignore falsy values', () => {
    const result = cn('bg-red-500', '', false, 'text-white');

    expect(result).toBe('bg-red-500 text-white');
  });

  it('should work with empty input', () => {
    const result = cn();

    expect(result).toBe('');
  });

  it('should handle dynamic class names from objects', () => {
    const result = cn({ 'bg-red-500': true, 'text-white': false });

    expect(result).toBe('bg-red-500');
  });

  it('should merge classes correctly when both twMerge and clsx are used', () => {
    const result = cn('bg-red-500', 'bg-blue-500', 'text-white');

    expect(result).toBe('bg-blue-500 text-white'); // twMerge should resolve bg-blue-500
  });
});
