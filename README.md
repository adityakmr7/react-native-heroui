# 🎨 React Native HeroUI

A beautiful, modern, and fully-featured React Native UI component library inspired by HeroUI. Built with TypeScript, accessibility-first, and highly customizable with a powerful theming system.

[![NPM Version](https://img.shields.io/npm/v/react-native-heroui)](https://www.npmjs.com/package/react-native-heroui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **27+ Production-Ready Components** - Button, Input, InputOtp, Textarea, Modal, BottomSheet, Drawer, Card, Avatar, Badge, Chip, Switch, Spinner, Skeleton, Radio, Slider, Select, Progress, Image, Spacer, Accordion, Alert, Toast, Tooltip, Tabs, and more
- 🌗 **Dark Mode Support** - Built-in light and dark themes
- 🎨 **Complete Custom Color Theming** - Override any color with your brand colors
- 🎨 **Preset Themes** - Professional pre-built themes (Modern Blue, Purple, Green)
- 🎨 **Brand Color Helpers** - Easy brand color generation with complete color scales
- 🎨 **Fully Customizable** - Comprehensive design token system
- ♿️ **Accessibility First** - ARIA support and screen reader friendly
- 📱 **React Native** - Works on iOS and Android
- 🔧 **TypeScript** - Full type safety with autocomplete for custom colors
- 🎭 **Variants System** - Multiple variants for each component
- ⚡️ **Animations** - Smooth, performant animations
- 🏗️ **Factory Pattern** - Easily create your own styled components
- 📦 **Style Props** - Chakra UI-like style props system
- 🌳 **Tree-Shakeable** - Only bundle what you use (~5-8 KB per component)
- 🎨 **Primitives** - Box, Stack, HStack, VStack layout components
- 📱 **Responsive Design** - Built-in responsive hooks and values
- 🎛️ **Modern Hooks** - useColorMode, useResponsive, useDisclosure

## 📦 Installation

```bash
# Install the library and required peer dependencies
npm install react-native-heroui react-native-reanimated react-native-gesture-handler

# or with yarn
yarn add react-native-heroui react-native-reanimated react-native-gesture-handler

# or with Expo
npx expo install react-native-heroui react-native-reanimated react-native-gesture-handler
```

### ⚙️ Setup

**1. Update `babel.config.js`:**

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be last!
  ],
};
```

**2. Wrap your app with GestureHandlerRootView:**

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeroUIProvider } from 'react-native-heroui';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUIProvider>
        <YourApp />
      </HeroUIProvider>
    </GestureHandlerRootView>
  );
}
```

**3. Clear cache and start:**

```bash
npx expo start -c
```

## 🌳 Tree-Shaking & Bundle Size

**Great news!** React Native HeroUI is **fully tree-shakeable**, meaning you only bundle the components you actually use. Modern bundlers like Metro (React Native), Webpack, and Vite automatically remove unused code from your final bundle.

### How It Works

When you import components:

```tsx
import { Button, Card, Avatar } from 'react-native-heroui';
```

✅ **Only** `Button`, `Card`, and `Avatar` are included in your final bundle  
❌ The other 18+ components are automatically removed

### Bundle Size Optimization

| What You Import                                             | What Gets Bundled            |
| ----------------------------------------------------------- | ---------------------------- |
| Just `Button`                                               | ~5-8 KB (minified + gzipped) |
| 5 components (`Button`, `Input`, `Card`, `Avatar`, `Badge`) | ~20-25 KB                    |
| All 21 components                                           | ~60-80 KB                    |

> **Note**: These are approximate sizes. Actual sizes depend on which specific components you use and your bundler configuration.

### Best Practices

#### ✅ **DO**: Import only what you need

```tsx
// Good - Tree-shakeable
import { Button, Card } from 'react-native-heroui';

// Also good - Named imports
import { Button } from 'react-native-heroui';
import { Card } from 'react-native-heroui';
```

#### ❌ **DON'T**: Import the entire module

```tsx
// Bad - Defeats tree-shaking in some bundlers
import * as HeroUI from 'react-native-heroui';
const { Button, Card } = HeroUI;
```

### Component Dependencies

Each component only imports what it needs:

- **Core utilities**: `useTheme`, `ThemeProvider` (~2 KB)
- **Individual components**: Self-contained with minimal dependencies
- **No transitive bloat**: Components don't import other components unnecessarily

### Zero Configuration

Tree-shaking works **out of the box** with:

- ✅ Metro (React Native CLI)
- ✅ Expo
- ✅ Next.js (React Native Web)
- ✅ Webpack 5+
- ✅ Vite

**No configuration needed!** Just import and build as usual.

### Verify Bundle Size

Want to see exactly what's in your bundle?

**For React Native:**

```bash
# Analyze your bundle
npx react-native-bundle-visualizer
```

**For Web (React Native Web):**

```bash
# Using webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### Why Not Separate Packages?

Some libraries like `@material-ui/core` offer individual component packages (`@material-ui/button`, etc.). We chose **not** to do this because:

1. **Tree-shaking is automatic** - Modern bundlers handle this perfectly
2. **Better DX** - One package to install and manage
3. **Simpler versioning** - No version mismatches between component packages
4. **Industry standard** - Most modern React Native libraries (React Native Paper, NativeBase) use this approach

### FAQ

**Q: Do I need to configure anything for tree-shaking?**  
A: No! It works automatically with Metro and other modern bundlers.

**Q: Can I import from subpaths like `react-native-heroui/button`?**  
A: Not currently, but it's not needed. Named imports already provide optimal tree-shaking.

**Q: How do I reduce my bundle size?**  
A: Only import the components you use. The bundler automatically excludes everything else.

**Q: Are there any peer dependencies?**  
A: Only `react` and `react-native` which you already have. No bloat!

## 🚀 Quick Start

Wrap your app with the `ThemeProvider`:

```tsx
import { ThemeProvider } from 'react-native-heroui';

export default function App() {
  return (
    <ThemeProvider initialTheme="light">{/* Your app content */}</ThemeProvider>
  );
}
```

## 📚 Components

### Button

A versatile button component with multiple variants and states.

```tsx
import { Button } from 'react-native-heroui';

<Button onPress={() => console.log('Pressed!')}>
  Click Me
</Button>

// With variants
<Button variant="outline" colorScheme="primary" size="lg">
  Outline Button
</Button>

// Loading state
<Button isLoading>
  Loading...
</Button>

// With icons
<Button
  startContent={<Icon name="plus" />}
  endContent={<Icon name="arrow-right" />}
>
  Click Me
</Button>
```

**Props:**

- `variant`: `solid` | `outline` | `ghost` | `link`
- `size`: `sm` | `md` | `lg`
- `colorScheme`: `primary` | `secondary` | `success` | `warning` | `danger`
- `isDisabled`, `isLoading`, `fullWidth`
- `startContent`, `endContent`

### Input

A flexible input component with label, helper text, and error states.

```tsx
import { Input } from 'react-native-heroui';

<Input
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With validation
<Input
  label="Password"
  isInvalid={hasError}
  errorText="Password is too short"
/>

// With icons
<Input
  startContent={<Icon name="search" />}
  endContent={<Icon name="filter" />}
/>

// With clear button
<Input
  value={text}
  onClear={() => setText('')}
/>
```

**Props:**

- `variant`: `outline` | `filled` | `underlined` | `bordered`
- `size`: `sm` | `md` | `lg`
- `label`, `helperText`, `errorText`
- `isInvalid`, `isDisabled`, `isRequired`, `isReadOnly`
- `startContent`, `endContent`, `onClear`

### Card

A container component for grouping related content.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from 'react-native-heroui';

<Card variant="elevated">
  <CardHeader>
    <Text>Card Title</Text>
  </CardHeader>
  <CardBody>
    <Text>Card content goes here</Text>
  </CardBody>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>

// Pressable card
<Card isPressable onPress={() => console.log('Card pressed')}>
  <Text>Tap me!</Text>
</Card>
```

**Props:**

- `variant`: `elevated` | `flat` | `bordered`
- `isPressable`, `onPress`
- `disablePadding`

### Avatar

Display user profile pictures or initials.

```tsx
import { Avatar } from 'react-native-heroui';

<Avatar src="https://i.pravatar.cc/150?img=1" alt="John Doe" />

// With initials
<Avatar name="John Doe" />

// Different sizes and colors
<Avatar
  name="Jane Smith"
  size="lg"
  color="secondary"
  isBordered
/>
```

**Props:**

- `src`: Image source (URL or require())
- `name`: Name for initials
- `size`: `sm` | `md` | `lg` | `xl`
- `color`: `primary` | `secondary` | `success` | `warning` | `danger` | `default`
- `isBordered`, `borderColor`

### Badge

Small numerical or status indicators.

```tsx
import { Badge } from 'react-native-heroui';

// Standalone badge
<Badge content="5" color="danger" />

// Wrapping content
<Badge content="99+" color="danger">
  <Icon name="notification" />
</Badge>

// Dot badge
<Badge showDot color="success">
  <Avatar src="..." />
</Badge>
```

**Props:**

- `content`: Number or string
- `color`: `primary` | `secondary` | `success` | `warning` | `danger` | `default`
- `variant`: `solid` | `flat` | `bordered`
- `size`: `sm` | `md` | `lg`
- `showDot`, `isInvisible`
- `placement`: `top-right` | `top-left` | `bottom-right` | `bottom-left`

### Chip

Compact elements for tags, categories, or selections.

```tsx
import { Chip } from 'react-native-heroui';

<Chip>Default Chip</Chip>

// With variants
<Chip variant="dot" color="success">Active</Chip>

// Closeable
<Chip onClose={() => console.log('Closed')}>
  Closeable
</Chip>

// Pressable
<Chip onPress={() => console.log('Pressed')}>
  Click Me
</Chip>
```

**Props:**

- `variant`: `solid` | `flat` | `bordered` | `dot`
- `color`: `primary` | `secondary` | `success` | `warning` | `danger` | `default`
- `size`: `sm` | `md` | `lg`
- `startContent`, `endContent`
- `onClose`, `onPress`

### Switch

Toggle switch for boolean inputs.

```tsx
import { Switch } from 'react-native-heroui';

// Uncontrolled
<Switch defaultValue={false} onChange={(value) => console.log(value)} />

// Controlled
<Switch value={isEnabled} onChange={setIsEnabled} />

// Different colors and sizes
<Switch
  value={true}
  color="success"
  size="lg"
/>
```

**Props:**

- `value`: Controlled value
- `defaultValue`: Uncontrolled default
- `onChange`: Change handler
- `color`: `primary` | `secondary` | `success` | `warning` | `danger`
- `size`: `sm` | `md` | `lg`
- `isDisabled`

## 🎨 Theming

### Using the Theme Hook

```tsx
import { useTheme } from 'react-native-heroui';

function MyComponent() {
  const { theme, themeMode, toggleTheme, setTheme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Button onPress={toggleTheme}>
        Switch to {themeMode === 'light' ? 'Dark' : 'Light'} Mode
      </Button>
    </View>
  );
}
```

### 🎨 Custom Colors (NEW!)

React Native HeroUI now supports **complete custom color theming**! You can override any color in the theme system.

#### Basic Custom Colors

```tsx
import { HeroUIProvider } from 'react-native-heroui';

const customColors = {
  light: {
    primary: '#FF6B35', // Your custom primary color
    secondary: '#004E89', // Your custom secondary color
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
  },
  dark: {
    primary: '#FF8A65', // Dark mode variant
    secondary: '#1976D2',
    success: '#4CAF50',
    warning: '#FFB74D',
    danger: '#F44336',
  },
};

function App() {
  return (
    <HeroUIProvider customColors={customColors}>
      <YourApp />
    </HeroUIProvider>
  );
}
```

#### Complete Color Override

```tsx
const myBrandTheme = {
  light: {
    // Layout colors
    'background': '#F9FAFB',
    'foreground': '#0F172A',
    'divider': '#E2E8F0',

    // Base colors
    'primary': '#4F46E5',
    'secondary': '#7C3AED',
    'success': '#16A34A',
    'warning': '#EAB308',
    'danger': '#F43F5E',

    // Complete color scales
    'primary-50': '#EEF2FF',
    'primary-100': '#E0E7FF',
    'primary-200': '#C7D2FE',
    'primary-300': '#A5B4FC',
    'primary-400': '#818CF8',
    'primary-500': '#6366F1',
    'primary-600': '#4F46E5',
    'primary-700': '#4338CA',
    'primary-800': '#3730A3',
    'primary-900': '#312E81',
  },
  dark: {
    // Your dark mode colors...
  },
};
```

#### Using Preset Themes

```tsx
import { PRESET_THEMES } from 'react-native-heroui/utils/themeUtils';

// Use pre-built professional themes
<HeroUIProvider customColors={PRESET_THEMES.modernBlue}>
  <YourApp />
</HeroUIProvider>;

// Available presets: modernBlue, purple, green
```

#### Brand Color Helper

```tsx
import { createBrandColors } from 'react-native-heroui/utils/themeUtils';

const brandColors = createBrandColors(
  '#FF6B6B', // Primary brand color
  '#4ECDC4', // Secondary brand color
  '#45B7D1', // Success color
  '#FFA726', // Warning color
  '#EF5350' // Danger color
);

const customColors = {
  light: brandColors,
  dark: {
    ...brandColors,
    // Adjust for dark mode
    primary: '#FF8E8E',
    secondary: '#6ED5CD',
  },
};
```

#### Partial Color Override

```tsx
// Override only specific colors
const partialTheme = {
  light: {
    'primary': '#4F46E5', // Only change primary
    'primary-500': '#4F46E5', // And its 500 variant
    'success': '#16A34A', // And success color
    // Everything else stays default
  },
};
```

### Available Color Properties

You can customize any of these color properties:

#### Layout Colors

- `background` - Main background color
- `foreground` - Main text color
- `divider` - Divider color
- `accent` - Accent color (light mode)
- `focus` - Focus color (dark mode)

#### Content Colors

- `content1` - Primary content background
- `content2` - Secondary content background
- `content3` - Tertiary content background
- `content4` - Quaternary content background

#### Base Colors

- `default` - Default color
- `primary` - Primary brand color
- `secondary` - Secondary brand color
- `success` - Success color
- `warning` - Warning color
- `danger` - Danger color

#### Color Scales

Each base color has a complete scale from 50 to 900:

- `primary-50` to `primary-900`
- `secondary-50` to `secondary-900`
- `success-50` to `success-900`
- `warning-50` to `warning-900`
- `danger-50` to `danger-900`
- `default-50` to `default-900`

### Advanced Theming

#### Dynamic Theme Switching

```tsx
import { useState } from 'react';
import { HeroUIProvider, PRESET_THEMES } from 'react-native-heroui';

function App() {
  const [currentTheme, setCurrentTheme] = useState('modernBlue');

  const themes = {
    modernBlue: PRESET_THEMES.modernBlue,
    purple: PRESET_THEMES.purple,
    green: PRESET_THEMES.green,
  };

  return (
    <HeroUIProvider customColors={themes[currentTheme]}>
      <Button onPress={() => setCurrentTheme('purple')}>
        Switch to Purple Theme
      </Button>
    </HeroUIProvider>
  );
}
```

#### App-Specific Themes

```tsx
// E-commerce theme
const ecommerceTheme = {
  light: {
    primary: '#FF6B35', // Orange
    secondary: '#004E89', // Navy
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
  },
  dark: {
    primary: '#FF8A65',
    secondary: '#1976D2',
    success: '#4CAF50',
    warning: '#FFB74D',
    danger: '#F44336',
  },
};

// Healthcare theme
const healthcareTheme = {
  light: {
    primary: '#2196F3', // Medical blue
    secondary: '#4CAF50', // Health green
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
  },
  dark: {
    primary: '#64B5F6',
    secondary: '#81C784',
    success: '#81C784',
    warning: '#FFB74D',
    danger: '#EF5350',
  },
};
```

### TypeScript Support

Full TypeScript support with autocomplete:

```tsx
import type { CustomColors } from 'react-native-heroui';

const myColors: CustomColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  // TypeScript will autocomplete all available color properties
};
```

### Legacy Custom Theme (Deprecated)

> **Note**: The old `customTheme` prop is deprecated. Use `customColors` instead for better performance and type safety.

```tsx
// ❌ Old way (deprecated)
<ThemeProvider customTheme={customTheme}>

// ✅ New way (recommended)
<ThemeProvider customColors={customColors}>
```

### Design Tokens

Access design tokens directly:

```tsx
import {
  SPACING,
  TYPOGRAPHY,
  BORDER_RADIUS,
  SHADOWS,
} from 'react-native-heroui';

const styles = StyleSheet.create({
  container: {
    padding: SPACING['unit-4'],
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS['shadow-lg'],
  },
  text: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
});
```

## 🏗️ Creating Custom Components

Use the factory functions to create your own styled components:

```tsx
import { createStyledView, createStyledText } from 'react-native-heroui';

const CustomBox = createStyledView(
  (theme) => ({
    padding: theme.spacing['unit-4'],
    backgroundColor: theme.colors.content1,
    borderRadius: theme.borderRadius.md,
  }),
  (theme, props: { variant?: 'primary' | 'secondary' }) => ({
    backgroundColor: props.variant
      ? theme.colors[props.variant]
      : theme.colors.content1,
  })
);

<CustomBox variant="primary">
  <Text>Custom styled component!</Text>
</CustomBox>;
```

## 🎨 Modern Features (NEW!)

### Style Props (Chakra UI-like)

Pass theme-aware style props directly to components:

```tsx
import { Box, VStack, HStack } from 'react-native-heroui';

<Box bg="primary" p="unit-4" borderRadius="md" shadow="shadow-lg">
  <VStack gap="unit-2">
    <HStack gap="unit-2" alignItems="center">
      <Icon />
      <Text>Fast styling!</Text>
    </HStack>
  </VStack>
</Box>;
```

### Layout Primitives

Pre-configured components for common layouts:

```tsx
import { Box, Stack, HStack, VStack, Center, Spacer } from 'react-native-heroui';

// Vertical stack
<VStack gap="unit-2">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>

// Horizontal stack
<HStack gap="unit-2" alignItems="center">
  <Avatar />
  <VStack flex={1}>
    <Text>Username</Text>
    <Text>Subtitle</Text>
  </VStack>
  <Badge>New</Badge>
</HStack>

// Centered content
<Center h="100%">
  <Text>Perfectly centered!</Text>
</Center>
```

### Responsive Design

```tsx
import { useResponsive, useResponsiveValue } from 'react-native-heroui';

// Get current breakpoint
const { breakpoint, width, isAtLeast } = useResponsive();

// Use responsive values
const columns = useResponsiveValue({
  base: 1,
  md: 2,
  lg: 3,
  xl: 4,
});

// Conditional rendering
{
  isAtLeast('md') && <Sidebar />;
}
```

### Modern Hooks

```tsx
import {
  useColorMode,
  useDisclosure,
  useResponsive
} from 'react-native-heroui';

// Color mode management
const { colorMode, toggleColorMode } = useColorMode();

// Disclosure state (for modals, drawers, etc.)
const { isOpen, onOpen, onClose, getDisclosureProps } = useDisclosure();

<Button {...getDisclosureProps()}>Toggle</Button>
<Modal isOpen={isOpen} onClose={onClose}>...</Modal>

// Responsive breakpoints
const { breakpoint, isAtLeast } = useResponsive();
```

## 🔧 Utilities

### Color Utilities

```tsx
import { getColor, useTheme } from 'react-native-heroui';

const { theme } = useTheme();
const primaryColor = getColor(theme, 'primary');
```

### Spacing Utilities

```tsx
import { getSpacing, getSpacingStyles, useTheme } from 'react-native-heroui';

const { theme } = useTheme();
const spacing = getSpacing(theme, 'unit-4');
const spacingStyles = getSpacingStyles(theme, { mx: 'md', py: 'lg' });
```

## 📱 Example

```tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  HeroUIProvider,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Badge,
  Chip,
  Switch,
  useTheme,
} from 'react-native-heroui';

// Custom brand colors
const brandColors = {
  light: {
    primary: '#FF6B35', // Orange primary
    secondary: '#004E89', // Navy secondary
    success: '#28A745',
    warning: '#FFC107',
    danger: '#DC3545',
  },
  dark: {
    primary: '#FF8A65', // Lighter orange for dark mode
    secondary: '#1976D2', // Lighter navy
    success: '#4CAF50',
    warning: '#FFB74D',
    danger: '#F44336',
  },
};

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <HeroUIProvider
      initialTheme={darkMode ? 'dark' : 'light'}
      customColors={brandColors}
    >
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Card variant="elevated">
            <CardHeader>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Welcome to HeroUI
              </Text>
            </CardHeader>
            <CardBody>
              <Badge content="3" color="danger">
                <Avatar name="John Doe" size="lg" />
              </Badge>

              <Input
                label="Email"
                placeholder="Enter your email"
                style={{ marginTop: 20 }}
              />

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 20 }}>
                <Chip color="primary">React Native</Chip>
                <Chip color="secondary">TypeScript</Chip>
                <Chip color="success">HeroUI</Chip>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Text>Dark Mode</Text>
                <Switch value={darkMode} onChange={setDarkMode} />
              </View>

              <Button
                variant="solid"
                colorScheme="primary"
                fullWidth
                style={{ marginTop: 20 }}
              >
                Get Started
              </Button>
            </CardBody>
          </Card>
        </View>
      </ScrollView>
    </HeroUIProvider>
  );
}

export default App;
```

## 🤝 Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository.

## 📄 License

MIT © [adityakmr7](https://github.com/adityakmr7)

---

Made with ❤️ using [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
