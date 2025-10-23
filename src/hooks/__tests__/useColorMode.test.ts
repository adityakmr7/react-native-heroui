import { renderHook, act } from '@testing-library/react-hooks';
import { useColorMode } from '../useColorMode';
import { ThemeProvider } from '../../providers/ThemeProvider';
import React from 'react';

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, {}, children);

describe('useColorMode', () => {
  it('should return color mode from theme context', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current).toHaveProperty('colorMode');
    expect(result.current).toHaveProperty('toggleColorMode');
    expect(result.current).toHaveProperty('setColorMode');
  });

  it('should return current color mode', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.colorMode).toBe('light');
  });

  it('should provide toggle function', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(typeof result.current.toggleColorMode).toBe('function');
  });

  it('should provide set color mode function', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(typeof result.current.setColorMode).toBe('function');
  });

  it('should toggle color mode when toggleColorMode is called', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    expect(result.current.colorMode).toBe('light');

    act(() => {
      result.current.toggleColorMode();
    });

    expect(result.current.colorMode).toBe('dark');

    act(() => {
      result.current.toggleColorMode();
    });

    expect(result.current.colorMode).toBe('light');
  });

  it('should set specific color mode when setColorMode is called', () => {
    const { result } = renderHook(() => useColorMode(), { wrapper });

    act(() => {
      result.current.setColorMode('dark');
    });

    expect(result.current.colorMode).toBe('dark');

    act(() => {
      result.current.setColorMode('light');
    });

    expect(result.current.colorMode).toBe('light');
  });
});
