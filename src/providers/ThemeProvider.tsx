import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import { lightTheme, darkTheme } from '../theme/themes';
import type { Theme, ThemeMode } from '../theme/types';

export interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'light',
}) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

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
