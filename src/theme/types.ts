import { SPACING } from '../tokens/spacing';
import { TYPOGRAPHY } from '../tokens/typography';
import { BORDER_RADIUS } from '../tokens/borderRadius';
import { SHADOWS } from '../tokens/shadows';

export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  foreground: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  // Add all your color properties
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  spacing: typeof SPACING;
  typography: typeof TYPOGRAPHY;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
}
