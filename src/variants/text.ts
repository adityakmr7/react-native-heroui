import type { Theme } from '../theme/types';

export interface TextVariants {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight: 'normal' | 'medium' | 'semibold' | 'bold';
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'foreground'
    | 'background';
}

export const getTextStyles = (
  theme: Theme,
  size: TextVariants['size'],
  weight: TextVariants['weight'],
  color: TextVariants['color']
) => {
  const sizeMap = {
    'xs': theme.typography.fontSizes.xs,
    'sm': theme.typography.fontSizes.sm,
    'md': theme.typography.fontSizes.md,
    'lg': theme.typography.fontSizes.lg,
    'xl': theme.typography.fontSizes.xl,
    '2xl': theme.typography.fontSizes['2xl'],
    '3xl': theme.typography.fontSizes['3xl'],
    '4xl': theme.typography.fontSizes['4xl'],
  };

  const weightMap = {
    normal: theme.typography.fontWeights.normal,
    medium: theme.typography.fontWeights.medium,
    semibold: theme.typography.fontWeights.semibold,
    bold: theme.typography.fontWeights.bold,
  };

  const colorMap: Record<TextVariants['color'], string> = {
    default: theme.colors['default-700'],
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
    foreground: theme.colors.foreground,
    background: theme.colors.background,
  };

  return {
    fontSize: sizeMap[size],
    fontWeight: weightMap[weight],
    color: colorMap[color],
  };
};
