# Theming Guide

React Native HeroUI provides a powerful and flexible theming system that allows you to customize every aspect of your application's appearance. This guide will walk you through the theming capabilities and show you how to create custom themes.

## Table of Contents

- [Understanding the Theme System](#understanding-the-theme-system)
- [Using the Default Themes](#using-the-default-themes)
- [Color Palettes](#color-palettes)
- [Creating Custom Themes](#creating-custom-themes)
- [Theme Tokens](#theme-tokens)
- [Using Theme Values in Components](#using-theme-values-in-components)
- [Dark Mode](#dark-mode)
- [Best Practices](#best-practices)

## Understanding the Theme System

React Native HeroUI uses a token-based theming system that includes:

- **Colors**: A comprehensive color palette with semantic naming
- **Spacing**: Consistent spacing units based on a 4px grid
- **Typography**: Font sizes, line heights, and weights
- **Border Radius**: Predefined border radius values
- **Shadows**: Elevation styles for depth perception

## Using the Default Themes

React Native HeroUI comes with two built-in themes: `light` and `dark`.

### Setting Up the Theme Provider

Wrap your app with the `HeroUIProvider` to enable theming:

```tsx
import { HeroUIProvider } from 'react-native-heroui';

function App() {
  return (
    <HeroUIProvider initialTheme="light">
      {/* Your app content */}
    </HeroUIProvider>
  );
}
```

### Toggling Between Light and Dark Mode

Use the `useTheme` hook to access theme functionality:

```tsx
import { useTheme } from 'react-native-heroui';
import { View, Button } from 'react-native';

function ThemeToggle() {
  const { theme, themeMode, toggleTheme, setTheme } = useTheme();

  return (
    <View>
      {/* Toggle between light and dark */}
      <Button title="Toggle Theme" onPress={toggleTheme} />

      {/* Set specific theme */}
      <Button title="Set Light" onPress={() => setTheme('light')} />
      <Button title="Set Dark" onPress={() => setTheme('dark')} />
    </View>
  );
}
```

## Color Palettes

React Native HeroUI provides extensive color palettes for both light and dark modes. Each color family includes 10 shades (50-900) for maximum flexibility.

### Light Theme Colors

#### Layout Colors

- `background`: `#FFFFFF` - Main background color
- `foreground`: `#111827` - Main text color
- `divider`: `#E5E7EB` - Divider/border color
- `accent`: `#0066FF` - Accent/focus color

#### Content Colors

- `content1`: `#FFFFFF` - Elevated content backgrounds
- `content2`: `#F3F4F6` - Secondary content backgrounds
- `content3`: `#E5E7EB` - Tertiary content backgrounds
- `content4`: `#D1D5DB` - Quaternary content backgrounds

#### Semantic Colors

- `default`: `#9CA3AF` - Default/neutral actions
- `primary`: `#0066FF` - Primary actions
- `secondary`: `#7C3AED` - Secondary actions
- `success`: `#10B981` - Success states
- `warning`: `#F59E0B` - Warning states
- `danger`: `#EF4444` - Error/danger states

#### Color Scales

Each semantic color has a full scale from 50 (lightest) to 900 (darkest):

**Default Scale (Gray)**

- 50: `#F9FAFB`
- 100: `#F3F4F6`
- 200: `#E5E7EB`
- 300: `#D1D5DB`
- 400: `#9CA3AF`
- 500: `#6B7280`
- 600: `#4B5563`
- 700: `#374151`
- 800: `#1F2937`
- 900: `#111827`

**Primary Scale (Blue)**

- 50: `#EFF6FF`
- 100: `#DBEAFE`
- 200: `#BFDBFE`
- 300: `#93C5FD`
- 400: `#60A5FA`
- 500: `#3B82F6`
- 600: `#2563EB`
- 700: `#1D4ED8`
- 800: `#1E40AF`
- 900: `#1E3A8A`

**Secondary Scale (Purple)**

- 50: `#F5F3FF`
- 100: `#EDE9FE`
- 200: `#DDD6FE`
- 300: `#C4B5FD`
- 400: `#A78BFA`
- 500: `#8B5CF6`
- 600: `#7C3AED`
- 700: `#6D28D9`
- 800: `#5B21B6`
- 900: `#4C1D95`

**Success Scale (Green)**

- 50: `#ECFDF5`
- 100: `#D1FAE5`
- 200: `#A7F3D0`
- 300: `#6EE7B7`
- 400: `#34D399`
- 500: `#10B981`
- 600: `#059669`
- 700: `#047857`
- 800: `#065F46`
- 900: `#064E3B`

**Warning Scale (Orange)**

- 50: `#FFFBEB`
- 100: `#FEF3C7`
- 200: `#FDE68A`
- 300: `#FCD34D`
- 400: `#FBBF24`
- 500: `#F59E0B`
- 600: `#D97706`
- 700: `#B45309`
- 800: `#92400E`
- 900: `#78350F`

**Danger Scale (Red)**

- 50: `#FEF2F2`
- 100: `#FEE2E2`
- 200: `#FECACA`
- 300: `#FCA5A5`
- 400: `#F87171`
- 500: `#EF4444`
- 600: `#DC2626`
- 700: `#B91C1C`
- 800: `#991B1B`
- 900: `#7F1D1D`

### Dark Theme Colors

#### Layout Colors

- `background`: `#000000` - Main background color
- `foreground`: `#E5E7EB` - Main text color
- `divider`: `#374151` - Divider/border color
- `focus`: `#0066FF` - Focus indicator color

#### Content Colors

- `content1`: `#111827` - Elevated content backgrounds
- `content2`: `#1F2937` - Secondary content backgrounds
- `content3`: `#374151` - Tertiary content backgrounds
- `content4`: `#52525B` - Quaternary content backgrounds

#### Semantic Colors

- `default`: `#52525B` - Default/neutral actions
- `primary`: `#0066FF` - Primary actions
- `secondary`: `#A855F7` - Secondary actions
- `success`: `#10B981` - Success states
- `warning`: `#F59E0B` - Warning states
- `danger`: `#EF4444` - Error/danger states

#### Dark Color Scales

**Default Scale (Gray)**

- 50: `#111827`
- 100: `#1F2937`
- 200: `#374151`
- 300: `#52525B`
- 400: `#71717A`
- 500: `#A1A1AA`
- 600: `#D4D4D8`
- 700: `#E4E4E7`
- 800: `#F4F4F5`
- 900: `#FAFAFA`

**Primary Scale (Blue)**

- 50: `#001731`
- 100: `#002662`
- 200: `#0045D3`
- 300: `#0058C4`
- 400: `#0066FF`
- 500: `#3B82F6`
- 600: `#60A5FA`
- 700: `#93C5FD`
- 800: `#BFDBFE`
- 900: `#DBEAFE`

**Secondary Scale (Purple)**

- 50: `#1F0A50`
- 100: `#4C1D95`
- 200: `#5B21B6`
- 300: `#6D28D9`
- 400: `#7C3AED`
- 500: `#8B5CF6`
- 600: `#A78BFA`
- 700: `#C4B5FD`
- 800: `#DDD6FE`
- 900: `#EDE9FE`

**Success Scale (Green)**

- 50: `#052814`
- 100: `#065028`
- 200: `#09753C`
- 300: `#12A150`
- 400: `#16C464`
- 500: `#45D483`
- 600: `#74E2A2`
- 700: `#A3EBC1`
- 800: `#D1FAE5`
- 900: `#F0FDF4`

**Warning Scale (Orange)**

- 50: `#332107`
- 100: `#663E0E`
- 200: `#995C16`
- 300: `#CC791E`
- 400: `#FF9625`
- 500: `#FFB54D`
- 600: `#FFC974`
- 700: `#FFDD9C`
- 800: `#FFF1C3`
- 900: `#FFFCEB`

**Danger Scale (Red)**

- 50: `#310413`
- 100: `#610726`
- 200: `#920A39`
- 300: `#C20E4D`
- 400: `#F31260`
- 500: `#F54180`
- 600: `#F871A0`
- 700: `#FAA0BF`
- 800: `#FDD0DF`
- 900: `#FEE7EF`

## Creating Custom Themes

You can create custom themes by extending or overriding the default theme values.

### Method 1: Extending Default Themes

```tsx
import { lightTheme, darkTheme } from 'react-native-heroui';
import type { Theme } from 'react-native-heroui';

// Custom light theme
const customLightTheme: Theme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    'primary': '#FF6B6B',
    'secondary': '#4ECDC4',
    'success': '#95E1D3',
    'warning': '#F38181',
    'danger': '#AA4465',

    // Override primary scale
    'primary-50': '#FFE5E5',
    'primary-100': '#FFB8B8',
    'primary-200': '#FF8A8A',
    'primary-300': '#FF5C5C',
    'primary-400': '#FF6B6B', // Main
    'primary-500': '#FF3838',
    'primary-600': '#E60000',
    'primary-700': '#B80000',
    'primary-800': '#8A0000',
    'primary-900': '#5C0000',
  },
};

// Custom dark theme
const customDarkTheme: Theme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    background: '#1A1A2E',
    foreground: '#EAEAEA',
    primary: '#0F3460',
    secondary: '#16213E',
  },
};
```

### Method 2: Creating Theme from Scratch

```tsx
import {
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
  SHADOWS,
} from 'react-native-heroui';
import type { Theme } from 'react-native-heroui';

const brandTheme: Theme = {
  mode: 'light',
  colors: {
    // Layout
    'background': '#F8F9FA',
    'foreground': '#212529',
    'divider': '#DEE2E6',
    'accent': '#0D6EFD',

    // Content
    'content1': '#FFFFFF',
    'content2': '#F8F9FA',
    'content3': '#E9ECEF',
    'content4': '#DEE2E6',

    // Semantic colors
    'default': '#6C757D',
    'primary': '#0D6EFD',
    'secondary': '#6610F2',
    'success': '#198754',
    'warning': '#FFC107',
    'danger': '#DC3545',

    // Default scale
    'default-50': '#F8F9FA',
    'default-100': '#E9ECEF',
    'default-200': '#DEE2E6',
    'default-300': '#CED4DA',
    'default-400': '#ADB5BD',
    'default-500': '#6C757D',
    'default-600': '#495057',
    'default-700': '#343A40',
    'default-800': '#212529',
    'default-900': '#000000',

    // Primary scale (add similar scales for other colors)
    'primary-50': '#E7F1FF',
    'primary-100': '#C2DDFF',
    'primary-200': '#9DC9FF',
    'primary-300': '#78B4FF',
    'primary-400': '#53A0FF',
    'primary-500': '#0D6EFD',
    'primary-600': '#0A58CA',
    'primary-700': '#084298',
    'primary-800': '#052C65',
    'primary-900': '#031633',

    // Add other color scales...
    'secondary-50': '#F3E9FF',
    'secondary-100': '#E0C5FF',
    'secondary-200': '#CDA0FF',
    'secondary-300': '#BA7CFF',
    'secondary-400': '#A758FF',
    'secondary-500': '#6610F2',
    'secondary-600': '#520DC2',
    'secondary-700': '#3D0A91',
    'secondary-800': '#290661',
    'secondary-900': '#140330',

    'success-50': '#E8F5E9',
    'success-100': '#C3E6CB',
    'success-200': '#9ED7AC',
    'success-300': '#79C98E',
    'success-400': '#54BA6F',
    'success-500': '#198754',
    'success-600': '#146C43',
    'success-700': '#0F5132',
    'success-800': '#0A3622',
    'success-900': '#051B11',

    'warning-50': '#FFF8E1',
    'warning-100': '#FFECB3',
    'warning-200': '#FFE082',
    'warning-300': '#FFD54F',
    'warning-400': '#FFCA28',
    'warning-500': '#FFC107',
    'warning-600': '#FFB300',
    'warning-700': '#FFA000',
    'warning-800': '#FF8F00',
    'warning-900': '#FF6F00',

    'danger-50': '#FFEBEE',
    'danger-100': '#FFCDD2',
    'danger-200': '#EF9A9A',
    'danger-300': '#E57373',
    'danger-400': '#EF5350',
    'danger-500': '#DC3545',
    'danger-600': '#C62828',
    'danger-700': '#B71C1C',
    'danger-800': '#8B0000',
    'danger-900': '#5C0000',
  },
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  shadows: SHADOWS,
};
```

### Using Custom Themes

#### Option 1: With Provider (Recommended for global themes)

```tsx
import { ThemeContext } from 'react-native-heroui';

function App() {
  return (
    <ThemeContext.Provider
      value={{
        theme: customLightTheme,
        themeMode: 'light',
        toggleTheme: () => {},
        setTheme: () => {},
      }}
    >
      {/* Your app content */}
    </ThemeContext.Provider>
  );
}
```

#### Option 2: Direct Theme Object (For component-level customization)

Components that support theme customization can accept theme objects directly:

```tsx
import { Button } from 'react-native-heroui';

<Button
  color="primary"
  // Component uses theme context automatically
>
  Click Me
</Button>;
```

## Theme Tokens

### Spacing

Based on a 4px grid system:

```tsx
import { SPACING } from 'react-native-heroui';

// Unit-based spacing
SPACING['unit-1']; // 4px
SPACING['unit-2']; // 8px
SPACING['unit-3']; // 12px
SPACING['unit-4']; // 16px
// ... up to unit-96 (384px)

// T-shirt sizes
SPACING['unit-xs']; // 8px
SPACING['unit-sm']; // 12px
SPACING['unit-md']; // 16px
SPACING['unit-lg']; // 22px
SPACING['unit-xl']; // 36px
// ... up to unit-9xl (640px)

// Legacy naming
SPACING['xs']; // 4px
SPACING['sm']; // 8px
SPACING['md']; // 16px
SPACING['lg']; // 24px
SPACING['xl']; // 32px
```

### Typography

```tsx
import { TYPOGRAPHY } from 'react-native-heroui';

// Font sizes
TYPOGRAPHY.fontSizes['text-tiny']; // 12
TYPOGRAPHY.fontSizes['text-small']; // 14
TYPOGRAPHY.fontSizes['text-medium']; // 16
TYPOGRAPHY.fontSizes['text-large']; // 18

// Line heights
TYPOGRAPHY.lineHeights['text-tiny']; // 16
TYPOGRAPHY.lineHeights['text-small']; // 20
TYPOGRAPHY.lineHeights['text-medium']; // 24
TYPOGRAPHY.lineHeights['text-large']; // 28

// Font weights
TYPOGRAPHY.fontWeights.normal; // '400'
TYPOGRAPHY.fontWeights.medium; // '500'
TYPOGRAPHY.fontWeights.semibold; // '600'
TYPOGRAPHY.fontWeights.bold; // '700'
```

### Border Radius

```tsx
import { BORDER_RADIUS } from 'react-native-heroui';

BORDER_RADIUS['none']; // 0
BORDER_RADIUS['rounded-small']; // 8
BORDER_RADIUS['rounded-medium']; // 12
BORDER_RADIUS['rounded-large']; // 14
BORDER_RADIUS['rounded-full']; // '50%'
BORDER_RADIUS['full']; // 9999
```

### Shadows

```tsx
import { SHADOWS } from 'react-native-heroui';

SHADOWS['shadow-sm']; // Subtle shadow
SHADOWS['shadow']; // Default shadow
SHADOWS['shadow-md']; // Medium shadow
SHADOWS['shadow-lg']; // Large shadow
SHADOWS['shadow-xl']; // Extra large shadow
SHADOWS['shadow-2xl']; // 2X large shadow
```

## Using Theme Values in Components

### Using the useTheme Hook

```tsx
import { useTheme } from 'react-native-heroui';
import { View, Text, StyleSheet } from 'react-native';

function CustomComponent() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.content1,
          borderRadius: theme.borderRadius['rounded-medium'],
          padding: theme.spacing['unit-4'],
        },
      ]}
    >
      <Text
        style={{
          color: theme.colors.foreground,
          fontSize: theme.typography.fontSizes['text-large'],
        }}
      >
        Themed Component
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
});
```

### Using Color Scales

```tsx
import { useTheme } from 'react-native-heroui';

function GradientButton() {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={[theme.colors['primary-500'], theme.colors['primary-700']]}
      // ... rest of props
    />
  );
}
```

## Dark Mode

### Automatic Dark Mode

React Native HeroUI can automatically detect the system color scheme:

```tsx
import { useColorScheme } from 'react-native';
import { HeroUIProvider } from 'react-native-heroui';

function App() {
  const colorScheme = useColorScheme();

  return (
    <HeroUIProvider initialTheme={colorScheme === 'dark' ? 'dark' : 'light'}>
      {/* Your app */}
    </HeroUIProvider>
  );
}
```

### Responding to System Theme Changes

```tsx
import { useColorScheme } from 'react-native';
import { useTheme } from 'react-native-heroui';
import { useEffect } from 'react';

function ThemedApp() {
  const systemColorScheme = useColorScheme();
  const { setTheme } = useTheme();

  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme, setTheme]);

  return (
    // Your app content
  );
}
```

### Persisting Theme Preference

```tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { HeroUIProvider } from 'react-native-heroui';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load saved theme
    AsyncStorage.getItem('theme').then((savedTheme) => {
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      }
    });
  }, []);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };

  return (
    <HeroUIProvider initialTheme={theme}>
      {/* Pass handleThemeChange to your components */}
    </HeroUIProvider>
  );
}
```

## Best Practices

### 1. Use Semantic Color Names

Instead of using color scales directly, prefer semantic colors for better maintainability:

```tsx
// ✅ Good - Semantic and clear intent
<Button color="primary">Submit</Button>
<Alert color="danger">Error occurred</Alert>

// ❌ Avoid - Hard to understand intent
<Button style={{ backgroundColor: '#0066FF' }}>Submit</Button>
```

### 2. Leverage Color Scales for Variations

Use color scales for hover states, disabled states, and variations:

```tsx
const { theme } = useTheme();

// Normal state
backgroundColor: theme.colors['primary-500'];

// Hover state
backgroundColor: theme.colors['primary-600'];

// Disabled state
backgroundColor: theme.colors['primary-200'];
```

### 3. Maintain Consistency with Spacing

Use the spacing tokens for consistent spacing throughout your app:

```tsx
const { theme } = useTheme();

// ✅ Good
padding: theme.spacing['unit-4'];
margin: theme.spacing['unit-2'];

// ❌ Avoid magic numbers
padding: 17;
margin: 9;
```

### 4. Consider Accessibility

Ensure sufficient color contrast between text and backgrounds:

```tsx
// Light mode: dark text on light background
color: theme.colors.foreground;
backgroundColor: theme.colors.background;

// Dark mode: automatically adapts
```

### 5. Test in Both Themes

Always test your custom components in both light and dark modes:

```tsx
// Create a theme switcher in your development environment
function DevThemeToggle() {
  const { toggleTheme, themeMode } = useTheme();

  return <Button onPress={toggleTheme}>Current: {themeMode}</Button>;
}
```

### 6. Use Type Safety

Leverage TypeScript for type-safe theme access:

```tsx
import type { Theme, ThemeColors } from 'react-native-heroui';

// Type-safe color access
function getColor(colorKey: keyof ThemeColors): string {
  const { theme } = useTheme();
  return theme.colors[colorKey];
}
```

### 7. Create Theme Presets

For different app sections or branding needs:

```tsx
export const themes = {
  brand: {
    light: customLightTheme,
    dark: customDarkTheme,
  },
  kids: {
    light: kidsLightTheme,
    dark: kidsDarkTheme,
  },
  business: {
    light: businessLightTheme,
    dark: businessDarkTheme,
  },
};
```

## Advanced Examples

### Multi-Theme Application

```tsx
import { createContext, useState, useContext } from 'react';

type ThemePreset = 'default' | 'ocean' | 'forest' | 'sunset';

const ThemePresetContext = createContext<{
  preset: ThemePreset;
  setPreset: (preset: ThemePreset) => void;
}>({
  preset: 'default',
  setPreset: () => {},
});

const themePresets = {
  default: defaultLightTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
};

function MultiThemeProvider({ children }: { children: React.ReactNode }) {
  const [preset, setPreset] = useState<ThemePreset>('default');

  return (
    <ThemePresetContext.Provider value={{ preset, setPreset }}>
      <ThemeContext.Provider
        value={{
          theme: themePresets[preset],
          // ... other theme context values
        }}
      >
        {children}
      </ThemeContext.Provider>
    </ThemePresetContext.Provider>
  );
}
```

### Dynamic Theme Generation

```tsx
function generateTheme(primaryColor: string, secondaryColor: string): Theme {
  // Use a color manipulation library like tinycolor2 or polished
  // to generate color scales from base colors

  return {
    mode: 'light',
    colors: {
      // ... generated colors
    },
    spacing: SPACING,
    typography: TYPOGRAPHY,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
  };
}

// Usage
const customTheme = generateTheme('#FF6B6B', '#4ECDC4');
```

## Conclusion

React Native HeroUI's theming system provides everything you need to create beautiful, consistent, and accessible applications. Whether you're using the default themes or creating custom ones, the token-based approach ensures maintainability and scalability.

For visual examples and interactive demos, check out the [Theming Demo Page](./theming.html).

## Related Resources

- [Component Documentation](./components/summary.md)
- [Accessibility Guide](./index.html#accessibility)
- [GitHub Repository](https://github.com/adityakmr7/react-native-heroui)
