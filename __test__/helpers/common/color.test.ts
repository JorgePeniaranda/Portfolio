import { describe, it, expect } from 'vitest';

import { SetHexColorTransparency, GetTextColorForBackground } from '@/helpers/common/color';

describe('color utility functions', () => {
  describe('SetHexColorTransparency', () => {
    it('should adjust transparency of hex color correctly', () => {
      const result = SetHexColorTransparency('#ff0000', 0.5); // Red with 50% transparency

      expect(result).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('should handle transparency on RGB color correctly', () => {
      const result = SetHexColorTransparency('rgb(255, 0, 0)', 0.3); // Red with 30% transparency

      expect(result).toBe('rgba(255, 0, 0, 0.3)');
    });

    it('should handle transparency on HSL color correctly', () => {
      const result = SetHexColorTransparency('hsl(0, 100%, 50%)', 0.7); // Red with 70% transparency

      expect(result).toBe('rgba(255, 0, 0, 0.7)');
    });

    it('should return fully transparent color with alpha 0', () => {
      const result = SetHexColorTransparency('#00ff00', 0); // Green with 0% transparency

      expect(result).toBe('rgba(0, 255, 0, 0)');
    });
  });

  describe('GetTextColorForBackground', () => {
    it('should return black for light background colors', () => {
      const result = GetTextColorForBackground('#ffffff'); // White is light

      expect(result).toBe('black');
    });

    it('should return white for dark background colors', () => {
      const result = GetTextColorForBackground('#000000'); // Black is dark

      expect(result).toBe('white');
    });

    it('should return black for slightly light background color', () => {
      const result = GetTextColorForBackground('#d3d3d3'); // Light grey

      expect(result).toBe('black');
    });

    it('should return white for slightly dark background color', () => {
      const result = GetTextColorForBackground('#333333'); // Dark grey

      expect(result).toBe('white');
    });

    it('should correctly detect text color for color with alpha transparency', () => {
      const result = GetTextColorForBackground('rgba(255, 0, 0, 0.5)'); // Semi-transparent red

      expect(result).toBe('white'); // Red is dark, so white text
    });

    it('should correctly detect text color for color with HSL format', () => {
      const result = GetTextColorForBackground('hsl(240, 100%, 30%)'); // Dark blue

      expect(result).toBe('white');
    });
  });
});
