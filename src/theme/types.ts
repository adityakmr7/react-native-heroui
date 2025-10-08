import { SPACING } from '../tokens/spacing';
import { TYPOGRAPHY } from '../tokens/typography';
import { BORDER_RADIUS } from '../tokens/borderRadius';
import { SHADOWS } from '../tokens/shadows';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  // Layout
  'background': string;
  'foreground': string;
  'divider': string;
  'accent'?: string;
  'focus'?: string;

  // Content
  'content1': string;
  'content2': string;
  'content3': string;
  'content4': string;

  // Base colors
  'default': string;
  'primary': string;
  'secondary': string;
  'success': string;
  'warning': string;
  'danger': string;

  // Default scale
  'default-50': string;
  'default-100': string;
  'default-200': string;
  'default-300': string;
  'default-400': string;
  'default-500': string;
  'default-600': string;
  'default-700': string;
  'default-800': string;
  'default-900': string;

  // Primary scale
  'primary-50': string;
  'primary-100': string;
  'primary-200': string;
  'primary-300': string;
  'primary-400': string;
  'primary-500': string;
  'primary-600': string;
  'primary-700': string;
  'primary-800': string;
  'primary-900': string;

  // Secondary scale
  'secondary-50': string;
  'secondary-100': string;
  'secondary-200': string;
  'secondary-300': string;
  'secondary-400': string;
  'secondary-500': string;
  'secondary-600': string;
  'secondary-700': string;
  'secondary-800': string;
  'secondary-900': string;

  // Success scale
  'success-50': string;
  'success-100': string;
  'success-200': string;
  'success-300': string;
  'success-400': string;
  'success-500': string;
  'success-600': string;
  'success-700': string;
  'success-800': string;
  'success-900': string;

  // Warning scale
  'warning-50': string;
  'warning-100': string;
  'warning-200': string;
  'warning-300': string;
  'warning-400': string;
  'warning-500': string;
  'warning-600': string;
  'warning-700': string;
  'warning-800': string;
  'warning-900': string;

  // Danger scale
  'danger-50': string;
  'danger-100': string;
  'danger-200': string;
  'danger-300': string;
  'danger-400': string;
  'danger-500': string;
  'danger-600': string;
  'danger-700': string;
  'danger-800': string;
  'danger-900': string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof SPACING;
  typography: typeof TYPOGRAPHY;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
}
