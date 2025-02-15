/**
 * Checks if a given string is not empty or composed only of whitespace.
 * @param value - The string to check
 * @returns True if the string is not empty and does not consist solely of whitespace; otherwise, false
 */
export function isNoEmptyString(value: string): boolean {
  return value.trim().length > 0;
}
