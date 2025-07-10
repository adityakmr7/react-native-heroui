export const TYPOGRAPHY = {
  fontSizes: {
    'text-tiny': 12, // 0.75rem
    'text-small': 14, // 0.875rem
    'text-medium': 16, // 1rem
    'text-large': 18, // 1.125rem
    // Legacy naming
    'xs': 12,
    'sm': 14,
    'md': 16,
    'lg': 18,
    'xl': 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeights: {
    'text-tiny': 16, // 1rem
    'text-small': 20, // 1.25rem
    'text-medium': 24, // 1.5rem
    'text-large': 28, // 1.75rem
    // Legacy naming
    'tight': 1.2,
    'normal': 1.5,
    'relaxed': 1.75,
  },
  fontWeights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;
