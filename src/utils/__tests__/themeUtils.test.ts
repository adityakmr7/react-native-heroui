import {
  createColorScale,
  isValidColor,
  mergeCustomColors,
  createCustomTheme,
  createBrandColors,
  PRESET_THEMES,
} from '../themeUtils';
import type { ThemeColors } from '../../theme/types';

describe('themeUtils', () => {
  describe('createColorScale', () => {
    it('should create a color scale from base color', () => {
      const scale = createColorScale('#FF0000', 'primary');

      expect(scale).toHaveProperty('primary');
      expect(scale.primary).toBe('#FF0000');
      expect(scale).toHaveProperty('primary-50');
      expect(scale).toHaveProperty('primary-100');
      expect(scale).toHaveProperty('primary-500');
      expect(scale).toHaveProperty('primary-900');
    });

    it('should generate all scale values from 50 to 900', () => {
      const scale = createColorScale('#0000FF', 'secondary');

      // Check that all expected scale values exist
      for (let i = 50; i <= 900; i += 50) {
        expect(scale).toHaveProperty(`secondary-${i}`);
      }
    });
  });

  describe('isValidColor', () => {
    it('should validate hex colors correctly', () => {
      expect(isValidColor('#FF0000')).toBe(true);
      expect(isValidColor('#ff0000')).toBe(true);
      expect(isValidColor('#F00')).toBe(true);
      expect(isValidColor('#f00')).toBe(true);
    });

    it('should reject invalid colors', () => {
      expect(isValidColor('red')).toBe(false);
      expect(isValidColor('rgb(255,0,0)')).toBe(false);
      expect(isValidColor('#GG0000')).toBe(false);
      expect(isValidColor('FF0000')).toBe(false);
      expect(isValidColor('')).toBe(false);
    });
  });

  describe('mergeCustomColors', () => {
    it('should merge custom colors with defaults', () => {
      const defaultColors: ThemeColors = {
        primary: '#0000FF',
        secondary: '#00FF00',
        success: '#00FF00',
        warning: '#FFFF00',
        danger: '#FF0000',
      };

      const customColors = {
        primary: '#FF0000',
        custom: '#123456',
      };

      const result = mergeCustomColors(defaultColors, customColors);

      expect(result.primary).toBe('#FF0000');
      expect(result.secondary).toBe('#00FF00');
      expect(result.custom).toBe('#123456');
    });

    it('should preserve all default colors when no custom colors provided', () => {
      const defaultColors: ThemeColors = {
        primary: '#0000FF',
        secondary: '#00FF00',
        success: '#00FF00',
        warning: '#FFFF00',
        danger: '#FF0000',
      };

      const result = mergeCustomColors(defaultColors, {});

      expect(result).toEqual(defaultColors);
    });
  });

  describe('createCustomTheme', () => {
    it('should create custom theme with overrides', () => {
      const baseColors: ThemeColors = {
        primary: '#0000FF',
        secondary: '#00FF00',
        success: '#00FF00',
        warning: '#FFFF00',
        danger: '#FF0000',
      };

      const overrides = {
        primary: '#FF0000',
        custom: '#123456',
      };

      const result = createCustomTheme(baseColors, overrides);

      expect(result.primary).toBe('#FF0000');
      expect(result.custom).toBe('#123456');
      expect(result.secondary).toBe('#00FF00');
    });
  });

  describe('createBrandColors', () => {
    it('should create brand colors with primary color only', () => {
      const result = createBrandColors('#FF0000');

      expect(result.primary).toBe('#FF0000');
      expect(result).toHaveProperty('primary-50');
      expect(result).toHaveProperty('primary-500');
      expect(result).toHaveProperty('primary-900');
    });

    it('should create brand colors with all colors provided', () => {
      const result = createBrandColors(
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FFFF00',
        '#FF00FF'
      );

      expect(result.primary).toBe('#FF0000');
      expect(result.secondary).toBe('#00FF00');
      expect(result.success).toBe('#0000FF');
      expect(result.warning).toBe('#FFFF00');
      expect(result.danger).toBe('#FF00FF');
    });

    it('should create brand colors with partial colors', () => {
      const result = createBrandColors('#FF0000', '#00FF00', '#0000FF');

      expect(result.primary).toBe('#FF0000');
      expect(result.secondary).toBe('#00FF00');
      expect(result.success).toBe('#0000FF');
      expect(result.warning).toBeUndefined();
      expect(result.danger).toBeUndefined();
    });
  });

  describe('PRESET_THEMES', () => {
    it('should have modernBlue theme with light and dark variants', () => {
      expect(PRESET_THEMES.modernBlue).toHaveProperty('light');
      expect(PRESET_THEMES.modernBlue).toHaveProperty('dark');
      expect(PRESET_THEMES.modernBlue.light.primary).toBe('#3B82F6');
      expect(PRESET_THEMES.modernBlue.dark.primary).toBe('#60A5FA');
    });

    it('should have purple theme with light and dark variants', () => {
      expect(PRESET_THEMES.purple).toHaveProperty('light');
      expect(PRESET_THEMES.purple).toHaveProperty('dark');
      expect(PRESET_THEMES.purple.light.primary).toBe('#8B5CF6');
      expect(PRESET_THEMES.purple.dark.primary).toBe('#A78BFA');
    });

    it('should have green theme with light and dark variants', () => {
      expect(PRESET_THEMES.green).toHaveProperty('light');
      expect(PRESET_THEMES.green).toHaveProperty('dark');
      expect(PRESET_THEMES.green.light.primary).toBe('#10B981');
      expect(PRESET_THEMES.green.dark.primary).toBe('#34D399');
    });
  });
});
