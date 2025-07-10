import type { Theme } from '../theme/types';

export type StyledProps<T = {}> = T & {
  theme: Theme;
};

// Color utilities
export const getColor = (theme: Theme, colorKey: keyof Theme['colors']) => {
  return theme.colors[colorKey];
};

// Spacing utilities
export const getSpacing = (
  theme: Theme,
  spacingKey: keyof Theme['spacing']
) => {
  return theme.spacing[spacingKey];
};

// Typography utilities
export const getFontSize = (
  theme: Theme,
  sizeKey: keyof Theme['typography']['fontSizes']
) => {
  return theme.typography.fontSizes[sizeKey];
};
