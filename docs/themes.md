# Themes & Design Tokens

React Native HeroUI provides a comprehensive theming system built on design tokens. This system includes colors, typography, spacing, border radius, and shadows - all fully customizable and available in both light and dark modes.

## Overview

The theme system is designed to:

- Provide consistent design tokens across your app
- Support light and dark mode out of the box
- Allow easy customization
- Maintain type safety with TypeScript

## Installation

```bash
npm install react-native-heroui
# or
yarn add react-native-heroui
```

## Basic Usage

```tsx
import { ThemeProvider, lightTheme, darkTheme } from 'react-native-heroui';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>{/* Your app content */}</ThemeProvider>
  );
}
```

## Design Tokens

### Colors

React Native HeroUI includes a comprehensive color system with semantic color scales.

#### Layout Colors

- `background` - Main background color
- `foreground` - Main text color
- `divider` - Divider and border color
- `accent` / `focus` - Accent/focus color

#### Semantic Colors

Each semantic color includes a 10-step scale (50-900):

- **default** - Gray scale for neutral elements
- **primary** - Primary brand color
- **secondary** - Secondary brand color
- **success** - Success states
- **warning** - Warning states
- **danger** - Error/danger states

#### Light Theme Colors

**Default Scale**

```tsx
'default-50': '#F9FAFB'   // Lightest
'default-100': '#F3F4F6'
'default-200': '#E5E7EB'
'default-300': '#D1D5DB'
'default-400': '#9CA3AF'
'default-500': '#6B7280'
'default-600': '#4B5563'
'default-700': '#374151'
'default-800': '#1F2937'
'default-900': '#111827'  // Darkest
```

**Primary Scale**

```tsx
'primary-50': '#EFF6FF'
'primary-100': '#DBEAFE'
'primary-200': '#BFDBFE'
'primary-300': '#93C5FD'
'primary-400': '#60A5FA'
'primary-500': '#3B82F6'   // Base
'primary-600': '#2563EB'
'primary-700': '#1D4ED8'
'primary-800': '#1E40AF'
'primary-900': '#1E3A8A'
```

Similar scales exist for `secondary`, `success`, `warning`, and `danger`.

#### Dark Theme Colors

Dark theme uses inverted scales for better readability:

```tsx
'default-50': '#111827'   // Darkest
'default-100': '#1F2937'
// ... inverted scale
'default-900': '#FAFAFA'  // Lightest
```

#### Usage

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors['primary-500'] }}>
      <Text style={{ color: theme.colors.foreground }}>Themed Text</Text>
    </View>
  );
}
```

### Typography

Typography tokens define font sizes, line heights, and weights.

#### Font Sizes

```tsx
'text-tiny': 12     // 0.75rem
'text-small': 14    // 0.875rem
'text-medium': 16   // 1rem (base)
'text-large': 18    // 1.125rem

// Additional sizes
'xs': 12
'sm': 14
'md': 16
'lg': 18
'xl': 20
'2xl': 24
'3xl': 30
'4xl': 36
```

#### Line Heights

```tsx
'text-tiny': 16     // 1rem
'text-small': 20    // 1.25rem
'text-medium': 24   // 1.5rem
'text-large': 28    // 1.75rem

// Relative line heights
'tight': 1.2
'normal': 1.5
'relaxed': 1.75
```

#### Font Weights

```tsx
'normal': '400'
'medium': '500'
'semibold': '600'
'bold': '700'
```

#### Usage

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <Text
      style={{
        fontSize: theme.typography.fontSizes['text-large'],
        lineHeight: theme.typography.lineHeights['text-large'],
        fontWeight: theme.typography.fontWeights.semibold,
      }}
    >
      Themed Typography
    </Text>
  );
}
```

### Spacing

Unit-based spacing system with a 4px base unit.

#### Base Units

```tsx
'unit-0': 0      // 0px
'unit-1': 4      // 4px
'unit-2': 8      // 8px
'unit-3': 12     // 12px
'unit-4': 16     // 16px (base)
'unit-5': 20     // 20px
'unit-6': 24     // 24px
'unit-8': 32     // 32px
'unit-10': 40    // 40px
'unit-12': 48    // 48px
'unit-16': 64    // 64px
'unit-20': 80    // 80px
'unit-24': 96    // 96px
// ... and more
```

#### T-shirt Sizes

```tsx
'unit-xs': 8      // 8px
'unit-sm': 12     // 12px
'unit-md': 16     // 16px
'unit-lg': 22     // 22px
'unit-xl': 36     // 36px
'unit-2xl': 48    // 48px
'unit-3xl': 80    // 80px
```

#### Usage

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        padding: theme.spacing['unit-4'],
        marginBottom: theme.spacing['unit-md'],
        gap: theme.spacing['unit-2'],
      }}
    >
      {/* Content */}
    </View>
  );
}
```

### Border Radius

Predefined border radius values for consistent rounded corners.

```tsx
'none': 0
'rounded-small': 8      // 8px
'rounded-medium': 12    // 12px (base)
'rounded-large': 14     // 14px
'rounded-full': '50%'   // Circular

// Legacy naming
'sm': 8
'md': 12
'lg': 14
'full': 9999
```

#### Usage

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        borderRadius: theme.borderRadius['rounded-medium'],
      }}
    >
      {/* Content */}
    </View>
  );
}
```

### Shadows

Elevation system using shadows (optimized for both iOS and Android).

```tsx
'shadow-sm': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
}

'shadow': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
}

'shadow-md': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 6,
  elevation: 4,
}

'shadow-lg': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.15,
  shadowRadius: 15,
  elevation: 8,
}

'shadow-xl': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.25,
  shadowRadius: 25,
  elevation: 12,
}

'shadow-2xl': {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 25 },
  shadowOpacity: 0.25,
  shadowRadius: 50,
  elevation: 16,
}
```

#### Usage

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        ...theme.shadows['shadow-md'],
      }}
    >
      {/* Content */}
    </View>
  );
}
```

## Custom Themes

Create your own custom theme:

```tsx
import { Theme } from 'react-native-heroui';

const myCustomTheme: Theme = {
  mode: 'light',
  colors: {
    // Override colors
    'primary': '#FF6B6B',
    'primary-500': '#FF6B6B',
    // ... other colors
  },
  spacing: {
    // Use default or override
    'unit-custom': 42,
  },
  typography: {
    // Use default or override
    fontSizes: {
      'text-hero': 64,
    },
  },
  borderRadius: {
    // Use default or override
  },
  shadows: {
    // Use default or override
  },
};

// Use custom theme
<ThemeProvider theme={myCustomTheme}>
  <App />
</ThemeProvider>;
```

## Theme Hooks

### useTheme

Access the current theme:

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Content */}
    </View>
  );
}
```

### useColorMode

Manage color mode (light/dark):

```tsx
import { useColorMode } from 'react-native-heroui';

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onPress={toggleColorMode}>
      Switch to {colorMode === 'light' ? 'dark' : 'light'} mode
    </Button>
  );
}
```

## Best Practices

1. **Use semantic colors** - Prefer `primary`, `success`, etc. over specific color values
2. **Consistent spacing** - Use the spacing scale instead of arbitrary values
3. **Typography hierarchy** - Use defined font sizes for consistency
4. **Elevation** - Use shadow tokens for consistent depth
5. **Type safety** - Leverage TypeScript for autocomplete and validation

## TypeScript Support

All tokens are fully typed:

```tsx
import { Theme, ColorKey, SpacingKey } from 'react-native-heroui';

// Theme is fully typed
const theme: Theme = useTheme();

// Color keys are typed
const color: ColorKey = 'primary-500';

// Spacing keys are typed
const spacing: SpacingKey = 'unit-4';
```

## Examples

### Themed Card Component

```tsx
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-heroui';

function ThemedCard({ title, content }) {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.content1,
        borderRadius: theme.borderRadius['rounded-medium'],
        padding: theme.spacing['unit-4'],
        ...theme.shadows['shadow-md'],
      }}
    >
      <Text
        style={{
          fontSize: theme.typography.fontSizes['text-large'],
          fontWeight: theme.typography.fontWeights.semibold,
          color: theme.colors.foreground,
          marginBottom: theme.spacing['unit-2'],
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: theme.typography.fontSizes['text-medium'],
          color: theme.colors.foreground,
          opacity: 0.7,
        }}
      >
        {content}
      </Text>
    </View>
  );
}
```

### Responsive Spacing

```tsx
import { useResponsive, useTheme } from 'react-native-heroui';

function ResponsiveLayout() {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const padding = isMobile ? theme.spacing['unit-4'] : theme.spacing['unit-8'];

  return <View style={{ padding }}>{/* Content */}</View>;
}
```

## Resources

- [GitHub Repository](https://github.com/adityakmr7/react-native-heroui)
- [NPM Package](https://www.npmjs.com/package/react-native-heroui)
- [Component Documentation](./components/summary.md)

## Related

- [Button Component](./components/button.md)
- [Card Component](./components/card.md)
- [All Components](./components/summary.md)
