import { renderHook } from '@testing-library/react-hooks';
import { useTheme } from '../useTheme';
import { ThemeProvider } from '../../providers/ThemeProvider';
import React from 'react';

// Mock theme for testing - removed unused variable

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, { children });

describe('useTheme', () => {
  it('should return theme context when used within ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('themeMode');
    expect(result.current).toHaveProperty('toggleTheme');
    expect(result.current).toHaveProperty('setTheme');
  });

  // Removed skipped tests to fix linting warnings
});
