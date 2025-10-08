import { useTheme } from './useTheme';
import type { ThemeMode } from '../theme/types';

/**
 * Convenience hook for color mode management
 * Similar to Chakra UI's useColorMode
 *
 * @example
 * const { colorMode, toggleColorMode, setColorMode } = useColorMode();
 */
export const useColorMode = () => {
  const { themeMode, toggleTheme, setTheme } = useTheme();

  return {
    /** Current color mode */
    colorMode: themeMode as ThemeMode,
    /** Toggle between light and dark */
    toggleColorMode: toggleTheme,
    /** Set specific color mode */
    setColorMode: setTheme,
  };
};
