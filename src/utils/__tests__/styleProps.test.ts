import { getSpacingStyles } from '../styleProps';
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

describe('styleProps', () => {
  describe('getSpacingStyles', () => {
    it('should return empty object when no spacing props provided', () => {
      const result = getSpacingStyles(mockTheme, {});
      expect(result).toEqual({});
    });

    it('should apply margin styles correctly', () => {
      const props = { m: 'unit-4' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        margin: 16,
      });
    });

    it('should apply margin top correctly', () => {
      const props = { mt: 'unit-2' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginTop: 8,
      });
    });

    it('should apply margin right correctly', () => {
      const props = { mr: 'unit-6' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginRight: 24,
      });
    });

    it('should apply margin bottom correctly', () => {
      const props = { mb: 'unit-8' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginBottom: 32,
      });
    });

    it('should apply margin left correctly', () => {
      const props = { ml: 'unit-1' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginLeft: 4,
      });
    });

    it('should apply horizontal margin correctly', () => {
      const props = { mx: 'unit-3' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginHorizontal: 12,
      });
    });

    it('should apply vertical margin correctly', () => {
      const props = { my: 'unit-5' };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginVertical: 20,
      });
    });

    it('should apply multiple margin styles', () => {
      const props = {
        mt: 'unit-2',
        mr: 'unit-4',
        mb: 'unit-6',
        ml: 'unit-8',
      };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginTop: 8,
        marginRight: 16,
        marginBottom: 24,
        marginLeft: 32,
      });
    });

    it('should apply horizontal and vertical margins', () => {
      const props = {
        mx: 'unit-4',
        my: 'unit-2',
      };
      const result = getSpacingStyles(mockTheme, props);

      expect(result).toEqual({
        marginHorizontal: 16,
        marginVertical: 8,
      });
    });
  });
});
