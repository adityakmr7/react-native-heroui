import type { Theme } from '../theme/types';
import { getColor } from '../utils/styled';

export interface InputVariants {
  variant: 'outline' | 'filled' | 'underlined' | 'bordered';
  size: 'sm' | 'md' | 'lg';
}

export const getInputStyles = (
  theme: Theme,
  variant: InputVariants['variant'],
  size: InputVariants['size'],
  hasError: boolean = false,
  isFocused: boolean = false,
  isDisabled: boolean = false
) => {
  const baseStyles = {
    borderRadius: theme.borderRadius.md,
  };

  const sizeStyles = {
    sm: {
      paddingHorizontal: theme.spacing['unit-3'],
      paddingVertical: theme.spacing['unit-2'],
      fontSize: theme.typography.fontSizes.sm,
      minHeight: 32,
    },
    md: {
      paddingHorizontal: theme.spacing['unit-3'],
      paddingVertical: theme.spacing['unit-2.5'],
      fontSize: theme.typography.fontSizes.md,
      minHeight: 40,
    },
    lg: {
      paddingHorizontal: theme.spacing['unit-4'],
      paddingVertical: theme.spacing['unit-3'],
      fontSize: theme.typography.fontSizes.lg,
      minHeight: 48,
    },
  };

  const getBorderColor = () => {
    if (hasError) return getColor(theme, 'danger');
    if (isFocused) return getColor(theme, 'primary');
    return theme.colors['default-300'];
  };

  const variantStyles = {
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: getBorderColor(),
    },
    filled: {
      backgroundColor: theme.colors['content2'],
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: getBorderColor(),
      borderRadius: theme.borderRadius.md,
    },
    underlined: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderBottomWidth: 2,
      borderBottomColor: getBorderColor(),
      borderRadius: 0,
      paddingHorizontal: 0,
    },
    bordered: {
      backgroundColor: theme.colors.background,
      borderWidth: 2,
      borderColor: getBorderColor(),
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
    opacity: isDisabled ? 0.5 : 1,
  };
};
