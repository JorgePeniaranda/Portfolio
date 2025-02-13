import { themesArray, type theme } from '@/types/common.d';

/**
 * Type guard to check if a value is a valid theme.
 * @param value - The value to check.
 * @returns `true` if the value is a valid theme; otherwise, `false`.
 */
export function isTheme(value: unknown): value is theme {
  // @ts-expect-error: this is a custom type guard
  return themesArray.includes(value);
}
