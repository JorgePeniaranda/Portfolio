import tinycolor from 'tinycolor2';

/**
 * Adjusts the transparency of a hex color.
 *
 * @param color - The input color in any valid format (e.g., hex, rgb, hsl).
 * @param alpha - The transparency value (0 for fully transparent, 1 for fully opaque).
 * @returns The color as an RGBA string with the specified transparency.
 */
export function SetHexColorTransparency(color: string, alpha: number): string {
  return tinycolor(color).setAlpha(alpha).toRgbString();
}

/**
 * Determines the appropriate text color (black or white) based on the given background color.
 *
 * @param backgroundColor - The background color in any valid format.
 * @returns "white" if the background color is dark, "black" if it is light.
 */
export function GetTextColorForBackground(backgroundColor: string): 'black' | 'white' {
  return tinycolor(backgroundColor).isLight() ? 'black' : 'white';
}
