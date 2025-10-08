import { useState, useEffect } from 'react';
import { Dimensions, type ScaledSize } from 'react-native';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

export interface ResponsiveValue<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

/**
 * Breakpoint values (in pixels)
 */
const BREAKPOINTS = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Get current breakpoint based on window width
 */
const getBreakpoint = (width: number): Breakpoint => {
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  return 'sm';
};

/**
 * Resolve responsive value based on current breakpoint
 */
export const resolveResponsiveValue = <T>(
  value: T | ResponsiveValue<T>,
  breakpoint: Breakpoint
): T => {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const responsive = value as ResponsiveValue<T>;

    // Try to get value for current breakpoint
    if (breakpoint === 'xl' && responsive.xl !== undefined)
      return responsive.xl;
    if (breakpoint === 'lg' && responsive.lg !== undefined)
      return responsive.lg;
    if (breakpoint === 'md' && responsive.md !== undefined)
      return responsive.md;
    if (breakpoint === 'sm' && responsive.sm !== undefined)
      return responsive.sm;

    // Fallback to base or first defined value
    if (responsive.base !== undefined) return responsive.base;

    // Find first defined value
    if (responsive.sm !== undefined) return responsive.sm;
    if (responsive.md !== undefined) return responsive.md;
    if (responsive.lg !== undefined) return responsive.lg;
    if (responsive.xl !== undefined) return responsive.xl;
  }

  return value as T;
};

/**
 * Hook to get current responsive breakpoint and window dimensions
 *
 * @example
 * const { breakpoint, width, height } = useResponsive();
 *
 * // Use with responsive values
 * const columns = resolveResponsiveValue({ base: 1, md: 2, lg: 3 }, breakpoint);
 */
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState<ScaledSize>(
    Dimensions.get('window')
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const breakpoint = getBreakpoint(dimensions.width);

  return {
    /** Current breakpoint */
    breakpoint,
    /** Window width */
    width: dimensions.width,
    /** Window height */
    height: dimensions.height,
    /** Check if at least a certain breakpoint */
    isAtLeast: (bp: Breakpoint) => dimensions.width >= BREAKPOINTS[bp],
    /** Check if exactly a certain breakpoint */
    is: (bp: Breakpoint) => breakpoint === bp,
  };
};

/**
 * Hook to use responsive values directly
 *
 * @example
 * const columns = useResponsiveValue({ base: 1, md: 2, lg: 3 });
 */
export const useResponsiveValue = <T>(value: T | ResponsiveValue<T>): T => {
  const { breakpoint } = useResponsive();
  return resolveResponsiveValue(value, breakpoint);
};
