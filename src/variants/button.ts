import type { Theme } from '../theme/types';
import { getColor } from '../utils/styled';

export interface ButtonVariants {
  variant: 'solid' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg';
  colorScheme: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const getButtonStyles = (
  theme: Theme,
  variant: ButtonVariants['variant'],
  size: ButtonVariants['size'],
  colorScheme: ButtonVariants['colorScheme']
) => {
  const baseStyles = {
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      fontSize: theme.typography.fontSizes.sm,
    },
    md: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      fontSize: theme.typography.fontSizes.md,
    },
    lg: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      fontSize: theme.typography.fontSizes.lg,
    },
  };

  const variantStyles = {
    solid: {
      backgroundColor: getColor(theme, colorScheme),
      color: getColor(theme, 'background'),
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: getColor(theme, colorScheme),
      color: getColor(theme, colorScheme),
    },
    ghost: {
      backgroundColor: 'transparent',
      color: getColor(theme, colorScheme),
    },
    link: {
      backgroundColor: 'transparent',
      color: getColor(theme, colorScheme),
      textDecorationLine: 'underline' as const,
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
