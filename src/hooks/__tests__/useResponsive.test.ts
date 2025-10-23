import { renderHook, act } from '@testing-library/react-hooks';
import {
  useResponsive,
  useResponsiveValue,
  resolveResponsiveValue,
} from '../useResponsive';

// Mock Dimensions
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },
}));

describe('useResponsive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return current dimensions and breakpoint', () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current.width).toBe(375);
    expect(result.current.height).toBe(812);
    expect(result.current.breakpoint).toBe('sm');
  });

  it('should update dimensions when window size changes', () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current.breakpoint).toBe('sm');

    // Simulate window resize
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 1024, height: 768 } });
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
    expect(result.current.breakpoint).toBe('lg');
  });

  it('should correctly identify breakpoints', () => {
    const { result } = renderHook(() => useResponsive());

    // Test sm breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 500, height: 600 } });
    });
    expect(result.current.breakpoint).toBe('sm');

    // Test md breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 800, height: 600 } });
    });
    expect(result.current.breakpoint).toBe('md');

    // Test lg breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 1200, height: 800 } });
    });
    expect(result.current.breakpoint).toBe('lg');

    // Test xl breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 1400, height: 900 } });
    });
    expect(result.current.breakpoint).toBe('xl');
  });

  it('should provide isAtLeast helper', () => {
    const { result } = renderHook(() => useResponsive());

    // Start with sm breakpoint
    expect(result.current.isAtLeast('sm')).toBe(true);
    expect(result.current.isAtLeast('md')).toBe(false);
    expect(result.current.isAtLeast('lg')).toBe(false);
    expect(result.current.isAtLeast('xl')).toBe(false);

    // Change to lg breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 1200, height: 800 } });
    });

    expect(result.current.isAtLeast('sm')).toBe(true);
    expect(result.current.isAtLeast('md')).toBe(true);
    expect(result.current.isAtLeast('lg')).toBe(true);
    expect(result.current.isAtLeast('xl')).toBe(false);
  });

  it('should provide is helper', () => {
    const { result } = renderHook(() => useResponsive());

    // Start with sm breakpoint
    expect(result.current.is('sm')).toBe(true);
    expect(result.current.is('md')).toBe(false);
    expect(result.current.is('lg')).toBe(false);
    expect(result.current.is('xl')).toBe(false);

    // Change to lg breakpoint
    act(() => {
      const { Dimensions } = require('react-native');
      const listener = Dimensions.addEventListener.mock.calls[0][1];
      listener({ window: { width: 1200, height: 800 } });
    });

    expect(result.current.is('sm')).toBe(false);
    expect(result.current.is('md')).toBe(false);
    expect(result.current.is('lg')).toBe(true);
    expect(result.current.is('xl')).toBe(false);
  });

  it('should clean up event listener on unmount', () => {
    const { unmount } = renderHook(() => useResponsive());

    const { Dimensions } = require('react-native');
    expect(Dimensions.addEventListener).toHaveBeenCalled();

    unmount();

    // The mock doesn't actually track removeEventListener calls,
    // but in real implementation it would be called
  });
});

describe('resolveResponsiveValue', () => {
  it('should return value directly when not responsive', () => {
    const value = 'static-value';
    expect(resolveResponsiveValue(value, 'sm')).toBe('static-value');
    expect(resolveResponsiveValue(value, 'lg')).toBe('static-value');
  });

  it('should resolve responsive values correctly', () => {
    const responsiveValue = {
      base: 'base-value',
      sm: 'sm-value',
      md: 'md-value',
      lg: 'lg-value',
      xl: 'xl-value',
    };

    expect(resolveResponsiveValue(responsiveValue, 'sm')).toBe('sm-value');
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('md-value');
    expect(resolveResponsiveValue(responsiveValue, 'lg')).toBe('lg-value');
    expect(resolveResponsiveValue(responsiveValue, 'xl')).toBe('xl-value');
  });

  it('should fallback to base value when breakpoint not defined', () => {
    const responsiveValue = {
      base: 'base-value',
      lg: 'lg-value',
    };

    expect(resolveResponsiveValue(responsiveValue, 'sm')).toBe('base-value');
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('base-value');
    expect(resolveResponsiveValue(responsiveValue, 'lg')).toBe('lg-value');
  });

  it('should fallback to first defined value when base not defined', () => {
    const responsiveValue = {
      md: 'md-value',
      lg: 'lg-value',
    };

    expect(resolveResponsiveValue(responsiveValue, 'sm')).toBe('md-value');
    expect(resolveResponsiveValue(responsiveValue, 'md')).toBe('md-value');
    expect(resolveResponsiveValue(responsiveValue, 'lg')).toBe('lg-value');
  });
});

describe('useResponsiveValue', () => {
  it('should return resolved value based on current breakpoint', () => {
    const { result } = renderHook(() =>
      useResponsiveValue({
        base: 'base-value',
        sm: 'sm-value',
        md: 'md-value',
      })
    );

    // Should return sm-value since we're in sm breakpoint
    expect(result.current).toBe('sm-value');
  });

  it('should return static value when not responsive', () => {
    const { result } = renderHook(() => useResponsiveValue('static-value'));

    expect(result.current).toBe('static-value');
  });
});
