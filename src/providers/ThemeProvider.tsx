import React, { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';
import type { Theme, ThemeMode, ThemeColors } from '../theme/types';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Partial type for custom colors - allows overriding any color
export type CustomColors = Partial<ThemeColors>;

export interface HeroUIProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
  customColors?: {
    light?: CustomColors;
    dark?: CustomColors;
  };
}

// Utility function to merge custom colors with default colors
const mergeColors = (
  defaultColors: ThemeColors,
  customColors?: CustomColors
): ThemeColors => {
  if (!customColors) return defaultColors;

  return {
    ...defaultColors,
    ...customColors,
  };
};

export const HeroUIProvider: React.FC<HeroUIProviderProps> = ({
  children,
  initialTheme = 'light',
  customColors,
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);

  const theme = useMemo(() => {
    const baseTheme = themeMode === 'light' ? lightTheme : darkTheme;
    const customThemeColors =
      themeMode === 'light' ? customColors?.light : customColors?.dark;

    if (!customThemeColors) {
      return baseTheme;
    }

    return {
      ...baseTheme,
      colors: mergeColors(baseTheme.colors, customThemeColors),
    };
  }, [themeMode, customColors]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Backward compatibility alias
export const ThemeProvider = HeroUIProvider;

// Type alias for backward compatibility
export type ThemeProviderProps = HeroUIProviderProps;
