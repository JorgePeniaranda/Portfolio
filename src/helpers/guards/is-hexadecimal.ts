/**
 * Validates if a given string is a valid hexadecimal color code.
 * The function checks if the string matches the pattern of a valid hex color, which can either be in the format:
 * - Full 6-character format: `#RRGGBB`
 * - Shortened 3-character format: `#RGB`
 *
 * @param {string} value - The string to be validated as a hexadecimal color code.
 * @returns {boolean} - Returns `true` if the string is a valid hexadecimal color code, `false` otherwise.
 */
export function isHexadecimal(value: string): boolean {
  return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value);
}
