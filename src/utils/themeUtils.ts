import type { ThemeColors } from '../theme/types';

// Partial type for custom colors - allows overriding any color
export type CustomColors = Partial<ThemeColors>;

/**
 * Utility functions for theme customization
 */

/**
 * Creates a complete color scale from a base color
 * @param baseColor - The base color (e.g., '#FF0000')
 * @param colorName - The name of the color (e.g., 'primary', 'secondary')
 * @returns A complete color scale object
 */
export const createColorScale = (
  baseColor: string,
  colorName: string
): Record<string, string> => {
  // This is a simplified version - in a real implementation,
  // you'd want to use a color manipulation library like chroma-js
  // to generate proper color scales

  const scale: Record<string, string> = {};

  // Generate scale from 50 to 900
  for (let i = 50; i <= 900; i += 50) {
    const intensity = i / 1000;
    const adjustedColor = adjustColorIntensity(baseColor, intensity);
    scale[`${colorName}-${i}`] = adjustedColor;
  }

  // Add the base color
  scale[colorName] = baseColor;

  return scale;
};

/**
 * Adjusts color intensity (simplified version)
 * @param color - The base color
 * @param intensity - Intensity from 0 to 1
 * @returns Adjusted color
 */
const adjustColorIntensity = (color: string, intensity: number): string => {
  // This is a very basic implementation
  // For production, use a proper color manipulation library
  if (intensity === 0.5) return color;

  // Simple opacity adjustment for demonstration
  const opacity = Math.max(0.1, Math.min(1, intensity * 2));
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, '0')}`;
};

/**
 * Validates if a color string is valid
 * @param color - Color string to validate
 * @returns True if valid, false otherwise
 */
export const isValidColor = (color: string): boolean => {
  // Basic validation for hex colors
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexPattern.test(color);
};

/**
 * Merges custom colors with default colors
 * @param defaultColors - Default theme colors
 * @param customColors - Custom colors to merge
 * @returns Merged colors object
 */
export const mergeCustomColors = (
  defaultColors: ThemeColors,
  customColors: CustomColors
): ThemeColors => {
  return {
    ...defaultColors,
    ...customColors,
  };
};

/**
 * Creates a custom theme with specific color overrides
 * @param baseColors - Base colors to start with
 * @param overrides - Color overrides
 * @returns Custom theme colors
 */
export const createCustomTheme = (
  baseColors: ThemeColors,
  overrides: CustomColors
): ThemeColors => {
  return mergeCustomColors(baseColors, overrides);
};

/**
 * Helper to create brand colors
 * @param primaryColor - Primary brand color
 * @param secondaryColor - Secondary brand color
 * @param successColor - Success color
 * @param warningColor - Warning color
 * @param dangerColor - Danger color
 * @returns Custom colors object
 */
export const createBrandColors = (
  primaryColor: string,
  secondaryColor?: string,
  successColor?: string,
  warningColor?: string,
  dangerColor?: string
): CustomColors => {
  const brandColors: CustomColors = {
    primary: primaryColor,
    ...createColorScale(primaryColor, 'primary'),
  };

  if (secondaryColor) {
    brandColors.secondary = secondaryColor;
    Object.assign(brandColors, createColorScale(secondaryColor, 'secondary'));
  }

  if (successColor) {
    brandColors.success = successColor;
    Object.assign(brandColors, createColorScale(successColor, 'success'));
  }

  if (warningColor) {
    brandColors.warning = warningColor;
    Object.assign(brandColors, createColorScale(warningColor, 'warning'));
  }

  if (dangerColor) {
    brandColors.danger = dangerColor;
    Object.assign(brandColors, createColorScale(dangerColor, 'danger'));
  }

  return brandColors;
};

/**
 * Preset color themes
 */
export const PRESET_THEMES = {
  // Modern blue theme
  modernBlue: {
    light: {
      'primary': '#3B82F6',
      'primary-50': '#EFF6FF',
      'primary-100': '#DBEAFE',
      'primary-200': '#BFDBFE',
      'primary-300': '#93C5FD',
      'primary-400': '#60A5FA',
      'primary-500': '#3B82F6',
      'primary-600': '#2563EB',
      'primary-700': '#1D4ED8',
      'primary-800': '#1E40AF',
      'primary-900': '#1E3A8A',
    },
    dark: {
      'primary': '#60A5FA',
      'primary-50': '#001731',
      'primary-100': '#002662',
      'primary-200': '#0045D3',
      'primary-300': '#0058C4',
      'primary-400': '#0066FF',
      'primary-500': '#3B82F6',
      'primary-600': '#60A5FA',
      'primary-700': '#93C5FD',
      'primary-800': '#BFDBFE',
      'primary-900': '#DBEAFE',
    },
  },

  // Purple theme
  purple: {
    light: {
      'primary': '#8B5CF6',
      'secondary': '#A855F7',
      'primary-50': '#F5F3FF',
      'primary-100': '#EDE9FE',
      'primary-200': '#DDD6FE',
      'primary-300': '#C4B5FD',
      'primary-400': '#A78BFA',
      'primary-500': '#8B5CF6',
      'primary-600': '#7C3AED',
      'primary-700': '#6D28D9',
      'primary-800': '#5B21B6',
      'primary-900': '#4C1D95',
    },
    dark: {
      'primary': '#A78BFA',
      'secondary': '#C4B5FD',
      'primary-50': '#1F0A50',
      'primary-100': '#4C1D95',
      'primary-200': '#5B21B6',
      'primary-300': '#6D28D9',
      'primary-400': '#7C3AED',
      'primary-500': '#8B5CF6',
      'primary-600': '#A78BFA',
      'primary-700': '#C4B5FD',
      'primary-800': '#DDD6FE',
      'primary-900': '#EDE9FE',
    },
  },

  // Green theme
  green: {
    light: {
      'primary': '#10B981',
      'success': '#059669',
      'primary-50': '#ECFDF5',
      'primary-100': '#D1FAE5',
      'primary-200': '#A7F3D0',
      'primary-300': '#6EE7B7',
      'primary-400': '#34D399',
      'primary-500': '#10B981',
      'primary-600': '#059669',
      'primary-700': '#047857',
      'primary-800': '#065F46',
      'primary-900': '#064E3B',
    },
    dark: {
      'primary': '#34D399',
      'success': '#6EE7B7',
      'primary-50': '#052814',
      'primary-100': '#065028',
      'primary-200': '#09753C',
      'primary-300': '#12A150',
      'primary-400': '#16C464',
      'primary-500': '#45D483',
      'primary-600': '#74E2A2',
      'primary-700': '#A3EBC1',
      'primary-800': '#D1FAE5',
      'primary-900': '#F0FDF4',
    },
  },
} as const;

export type PresetThemeName = keyof typeof PRESET_THEMES;
