/**
 * Type guard function that checks if a value is neither null nor undefined.
 *
 * @param value - The value to check.
 * @returns True if the value is neither null nor undefined; otherwise, false.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Type guard function that checks if a value is either null or undefined.
 *
 * @param value - The value to check.
 * @returns True if the value is either null or undefined; otherwise, false.
 */
export function isNotDefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}
