export const LIGHT_COLORS = {
  // Layout
  'background': '#FFFFFF',
  'foreground': '#111827',
  'divider': '#E5E7EB',
  'accent': '#0066FF',

  // Content
  'content1': '#FFFFFF',
  'content2': '#F3F4F6',
  'content3': '#E5E7EB',
  'content4': '#D1D5DB',

  // Base Colors
  'default': '#9CA3AF',
  'primary': '#0066FF',
  'secondary': '#7C3AED',
  'success': '#10B981',
  'warning': '#F59E0B',
  'danger': '#EF4444',

  // Default Scale
  'default-50': '#F9FAFB',
  'default-100': '#F3F4F6',
  'default-200': '#E5E7EB',
  'default-300': '#D1D5DB',
  'default-400': '#9CA3AF',
  'default-500': '#6B7280',
  'default-600': '#4B5563',
  'default-700': '#374151',
  'default-800': '#1F2937',
  'default-900': '#111827',

  // Primary Scale
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

  // Secondary Scale
  'secondary-50': '#F5F3FF',
  'secondary-100': '#EDE9FE',
  'secondary-200': '#DDD6FE',
  'secondary-300': '#C4B5FD',
  'secondary-400': '#A78BFA',
  'secondary-500': '#8B5CF6',
  'secondary-600': '#7C3AED',
  'secondary-700': '#6D28D9',
  'secondary-800': '#5B21B6',
  'secondary-900': '#4C1D95',

  // Success Scale
  'success-50': '#ECFDF5',
  'success-100': '#D1FAE5',
  'success-200': '#A7F3D0',
  'success-300': '#6EE7B7',
  'success-400': '#34D399',
  'success-500': '#10B981',
  'success-600': '#059669',
  'success-700': '#047857',
  'success-800': '#065F46',
  'success-900': '#064E3B',

  // Warning Scale
  'warning-50': '#FFFBEB',
  'warning-100': '#FEF3C7',
  'warning-200': '#FDE68A',
  'warning-300': '#FCD34D',
  'warning-400': '#FBBF24',
  'warning-500': '#F59E0B',
  'warning-600': '#D97706',
  'warning-700': '#B45309',
  'warning-800': '#92400E',
  'warning-900': '#78350F',

  // Danger Scale
  'danger-50': '#FEF2F2',
  'danger-100': '#FEE2E2',
  'danger-200': '#FECACA',
  'danger-300': '#FCA5A5',
  'danger-400': '#F87171',
  'danger-500': '#EF4444',
  'danger-600': '#DC2626',
  'danger-700': '#B91C1C',
  'danger-800': '#991B1B',
  'danger-900': '#7F1D1D',
} as const;

// Dark Colors
export const DARK_COLORS = {
  // Layout
  'background': '#000000',
  'foreground': '#E5E7EB',
  'divider': '#374151',
  'focus': '#0066FF',

  // Content
  'content1': '#111827',
  'content2': '#1F2937',
  'content3': '#374151',
  'content4': '#52525B',

  // Base Colors
  'default': '#52525B',
  'primary': '#0066FF',
  'secondary': '#A855F7',
  'success': '#10B981',
  'warning': '#F59E0B',
  'danger': '#EF4444',

  // Default Scale
  'default-50': '#111827',
  'default-100': '#1F2937',
  'default-200': '#374151',
  'default-300': '#52525B',
  'default-400': '#71717A',
  'default-500': '#A1A1AA',
  'default-600': '#D4D4D8',
  'default-700': '#E4E4E7',
  'default-800': '#F4F4F5',
  'default-900': '#FAFAFA',

  // Primary Scale
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

  // Secondary Scale
  'secondary-50': '#1F0A50',
  'secondary-100': '#4C1D95',
  'secondary-200': '#5B21B6',
  'secondary-300': '#6D28D9',
  'secondary-400': '#7C3AED',
  'secondary-500': '#8B5CF6',
  'secondary-600': '#A78BFA',
  'secondary-700': '#C4B5FD',
  'secondary-800': '#DDD6FE',
  'secondary-900': '#EDE9FE',

  // Success Scale
  'success-50': '#052814',
  'success-100': '#065028',
  'success-200': '#09753C',
  'success-300': '#12A150',
  'success-400': '#16C464',
  'success-500': '#45D483',
  'success-600': '#74E2A2',
  'success-700': '#A3EBC1',
  'success-800': '#D1FAE5',
  'success-900': '#F0FDF4',

  // Warning Scale
  'warning-50': '#332107',
  'warning-100': '#663E0E',
  'warning-200': '#995C16',
  'warning-300': '#CC791E',
  'warning-400': '#FF9625',
  'warning-500': '#FFB54D',
  'warning-600': '#FFC974',
  'warning-700': '#FFDD9C',
  'warning-800': '#FFF1C3',
  'warning-900': '#FFFCEB',

  // Danger Scale
  'danger-50': '#310413',
  'danger-100': '#610726',
  'danger-200': '#920A39',
  'danger-300': '#C20E4D',
  'danger-400': '#F31260',
  'danger-500': '#F54180',
  'danger-600': '#F871A0',
  'danger-700': '#FAA0BF',
  'danger-800': '#FDD0DF',
  'danger-900': '#FEE7EF',
} as const;

// Type for all available color keys
export type LightColorKey = keyof typeof LIGHT_COLORS;
export type DarkColorKey = keyof typeof DARK_COLORS;

// Helper functions to get color values
export const getLightColor = (key: LightColorKey): string => {
  return LIGHT_COLORS[key];
};

export const getDarkColor = (key: DarkColorKey): string => {
  return DARK_COLORS[key];
};

// Color scale type for individual color families
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

// Organized color scales for Light theme
export const LIGHT_COLOR_SCALES = {
  default: {
    50: LIGHT_COLORS['default-50'],
    100: LIGHT_COLORS['default-100'],
    200: LIGHT_COLORS['default-200'],
    300: LIGHT_COLORS['default-300'],
    400: LIGHT_COLORS['default-400'],
    500: LIGHT_COLORS['default-500'],
    600: LIGHT_COLORS['default-600'],
    700: LIGHT_COLORS['default-700'],
    800: LIGHT_COLORS['default-800'],
    900: LIGHT_COLORS['default-900'],
  },
  primary: {
    50: LIGHT_COLORS['primary-50'],
    100: LIGHT_COLORS['primary-100'],
    200: LIGHT_COLORS['primary-200'],
    300: LIGHT_COLORS['primary-300'],
    400: LIGHT_COLORS['primary-400'],
    500: LIGHT_COLORS['primary-500'],
    600: LIGHT_COLORS['primary-600'],
    700: LIGHT_COLORS['primary-700'],
    800: LIGHT_COLORS['primary-800'],
    900: LIGHT_COLORS['primary-900'],
  },
  secondary: {
    50: LIGHT_COLORS['secondary-50'],
    100: LIGHT_COLORS['secondary-100'],
    200: LIGHT_COLORS['secondary-200'],
    300: LIGHT_COLORS['secondary-300'],
    400: LIGHT_COLORS['secondary-400'],
    500: LIGHT_COLORS['secondary-500'],
    600: LIGHT_COLORS['secondary-600'],
    700: LIGHT_COLORS['secondary-700'],
    800: LIGHT_COLORS['secondary-800'],
    900: LIGHT_COLORS['secondary-900'],
  },
  success: {
    50: LIGHT_COLORS['success-50'],
    100: LIGHT_COLORS['success-100'],
    200: LIGHT_COLORS['success-200'],
    300: LIGHT_COLORS['success-300'],
    400: LIGHT_COLORS['success-400'],
    500: LIGHT_COLORS['success-500'],
    600: LIGHT_COLORS['success-600'],
    700: LIGHT_COLORS['success-700'],
    800: LIGHT_COLORS['success-800'],
    900: LIGHT_COLORS['success-900'],
  },
  warning: {
    50: LIGHT_COLORS['warning-50'],
    100: LIGHT_COLORS['warning-100'],
    200: LIGHT_COLORS['warning-200'],
    300: LIGHT_COLORS['warning-300'],
    400: LIGHT_COLORS['warning-400'],
    500: LIGHT_COLORS['warning-500'],
    600: LIGHT_COLORS['warning-600'],
    700: LIGHT_COLORS['warning-700'],
    800: LIGHT_COLORS['warning-800'],
    900: LIGHT_COLORS['warning-900'],
  },
  danger: {
    50: LIGHT_COLORS['danger-50'],
    100: LIGHT_COLORS['danger-100'],
    200: LIGHT_COLORS['danger-200'],
    300: LIGHT_COLORS['danger-300'],
    400: LIGHT_COLORS['danger-400'],
    500: LIGHT_COLORS['danger-500'],
    600: LIGHT_COLORS['danger-600'],
    700: LIGHT_COLORS['danger-700'],
    800: LIGHT_COLORS['danger-800'],
    900: LIGHT_COLORS['danger-900'],
  },
} as const;

// Organized color scales for Dark theme
export const DARK_COLOR_SCALES = {
  default: {
    50: DARK_COLORS['default-50'],
    100: DARK_COLORS['default-100'],
    200: DARK_COLORS['default-200'],
    300: DARK_COLORS['default-300'],
    400: DARK_COLORS['default-400'],
    500: DARK_COLORS['default-500'],
    600: DARK_COLORS['default-600'],
    700: DARK_COLORS['default-700'],
    800: DARK_COLORS['default-800'],
    900: DARK_COLORS['default-900'],
  },
  primary: {
    50: DARK_COLORS['primary-50'],
    100: DARK_COLORS['primary-100'],
    200: DARK_COLORS['primary-200'],
    300: DARK_COLORS['primary-300'],
    400: DARK_COLORS['primary-400'],
    500: DARK_COLORS['primary-500'],
    600: DARK_COLORS['primary-600'],
    700: DARK_COLORS['primary-700'],
    800: DARK_COLORS['primary-800'],
    900: DARK_COLORS['primary-900'],
  },
  secondary: {
    50: DARK_COLORS['secondary-50'],
    100: DARK_COLORS['secondary-100'],
    200: DARK_COLORS['secondary-200'],
    300: DARK_COLORS['secondary-300'],
    400: DARK_COLORS['secondary-400'],
    500: DARK_COLORS['secondary-500'],
    600: DARK_COLORS['secondary-600'],
    700: DARK_COLORS['secondary-700'],
    800: DARK_COLORS['secondary-800'],
    900: DARK_COLORS['secondary-900'],
  },
  success: {
    50: DARK_COLORS['success-50'],
    100: DARK_COLORS['success-100'],
    200: DARK_COLORS['success-200'],
    300: DARK_COLORS['success-300'],
    400: DARK_COLORS['success-400'],
    500: DARK_COLORS['success-500'],
    600: DARK_COLORS['success-600'],
    700: DARK_COLORS['success-700'],
    800: DARK_COLORS['success-800'],
    900: DARK_COLORS['success-900'],
  },
  warning: {
    50: DARK_COLORS['warning-50'],
    100: DARK_COLORS['warning-100'],
    200: DARK_COLORS['warning-200'],
    300: DARK_COLORS['warning-300'],
    400: DARK_COLORS['warning-400'],
    500: DARK_COLORS['warning-500'],
    600: DARK_COLORS['warning-600'],
    700: DARK_COLORS['warning-700'],
    800: DARK_COLORS['warning-800'],
    900: DARK_COLORS['warning-900'],
  },
  danger: {
    50: DARK_COLORS['danger-50'],
    100: DARK_COLORS['danger-100'],
    200: DARK_COLORS['danger-200'],
    300: DARK_COLORS['danger-300'],
    400: DARK_COLORS['danger-400'],
    500: DARK_COLORS['danger-500'],
    600: DARK_COLORS['danger-600'],
    700: DARK_COLORS['danger-700'],
    800: DARK_COLORS['danger-800'],
    900: DARK_COLORS['danger-900'],
  },
} as const;

// // Import both light and dark colors
// import { LIGHT_COLORS, DARK_COLORS, getLightColor, getDarkColor } from './colors';

// // Access dark colors directly
// const darkBackground = DARK_COLORS.background; // '#000000'
// const darkPrimary = DARK_COLORS.primary; // '#0066FF'

// // Use helper functions
// const darkAccent = getDarkColor('focus'); // '#0066FF'
// const lightAccent = getLightColor('accent'); // '#0066FF'

// // Theme switching example
// const getThemeColors = (isDark: boolean) => {
//   return isDark ? DARK_COLORS : LIGHT_COLORS;
// };

// // Access organized scales
// import { LIGHT_COLOR_SCALES, DARK_COLOR_SCALES } from './colors';
// const primaryScale = isDark ? DARK_COLOR_SCALES.primary : LIGHT_COLOR_SCALES.primary;
