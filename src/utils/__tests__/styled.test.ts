import { getColor, getSpacing, getFontSize } from '../styled';
import type { Theme } from '../../theme/types';

const mockTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    danger: '#FF3B30',
    background: '#FFFFFF',
    foreground: '#000000',
  },
  spacing: {
    'unit-1': 4,
    'unit-2': 8,
    'unit-3': 12,
    'unit-4': 16,
    'unit-5': 20,
    'unit-6': 24,
    'unit-8': 32,
    'unit-10': 40,
    'unit-12': 48,
    'unit-16': 64,
    'unit-20': 80,
    'unit-24': 96,
  },
  typography: {
    fontSizes: {
      'xs': 12,
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  borderRadius: {
    'none': 0,
    'sm': 2,
    'base': 4,
    'md': 6,
    'lg': 8,
    'xl': 12,
    '2xl': 16,
    '3xl': 24,
    'full': 9999,
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

describe('styled utilities', () => {
  describe('getColor', () => {
    it('should return correct color value', () => {
      expect(getColor(mockTheme, 'primary')).toBe('#007AFF');
      expect(getColor(mockTheme, 'secondary')).toBe('#5856D6');
      expect(getColor(mockTheme, 'success')).toBe('#34C759');
      expect(getColor(mockTheme, 'warning')).toBe('#FF9500');
      expect(getColor(mockTheme, 'danger')).toBe('#FF3B30');
    });

    it('should return background and foreground colors', () => {
      expect(getColor(mockTheme, 'background')).toBe('#FFFFFF');
      expect(getColor(mockTheme, 'foreground')).toBe('#000000');
    });
  });

  describe('getSpacing', () => {
    it('should return correct spacing values', () => {
      expect(getSpacing(mockTheme, 'unit-1')).toBe(4);
      expect(getSpacing(mockTheme, 'unit-2')).toBe(8);
      expect(getSpacing(mockTheme, 'unit-4')).toBe(16);
      expect(getSpacing(mockTheme, 'unit-8')).toBe(32);
      expect(getSpacing(mockTheme, 'unit-16')).toBe(64);
    });

    it('should return larger spacing values', () => {
      expect(getSpacing(mockTheme, 'unit-20')).toBe(80);
      expect(getSpacing(mockTheme, 'unit-24')).toBe(96);
    });
  });

  describe('getFontSize', () => {
    it('should return correct font sizes', () => {
      expect(getFontSize(mockTheme, 'xs')).toBe(12);
      expect(getFontSize(mockTheme, 'sm')).toBe(14);
      expect(getFontSize(mockTheme, 'base')).toBe(16);
      expect(getFontSize(mockTheme, 'lg')).toBe(18);
      expect(getFontSize(mockTheme, 'xl')).toBe(20);
    });

    it('should return larger font sizes', () => {
      expect(getFontSize(mockTheme, '2xl')).toBe(24);
      expect(getFontSize(mockTheme, '3xl')).toBe(30);
      expect(getFontSize(mockTheme, '4xl')).toBe(36);
      expect(getFontSize(mockTheme, '5xl')).toBe(48);
      expect(getFontSize(mockTheme, '6xl')).toBe(60);
    });
  });
});
