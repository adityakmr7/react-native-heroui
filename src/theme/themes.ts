import { LIGHT_COLORS, DARK_COLORS } from '../tokens/colors';
import { SPACING } from '../tokens/spacing';
import { TYPOGRAPHY } from '../tokens/typography';
import { BORDER_RADIUS } from '../tokens/borderRadius';
import { SHADOWS } from '../tokens/shadows';
import type { Theme } from './types';

export const lightTheme: Theme = {
  mode: 'light',
  colors: LIGHT_COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};

export const darkTheme: Theme = {
  mode: 'dark',
  colors: DARK_COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};
