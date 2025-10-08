# 🎨 React Native HeroUI

A beautiful, modern, and fully-featured React Native UI component library inspired by HeroUI. Built with TypeScript, accessibility-first, and highly customizable with a powerful theming system.

[![NPM Version](https://img.shields.io/npm/v/react-native-heroui)](https://www.npmjs.com/package/react-native-heroui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **9+ Production-Ready Components** - Button, Input, Card, Avatar, Badge, Chip, Switch, Accordion, and more
- 🌗 **Dark Mode Support** - Built-in light and dark themes
- 🎨 **Fully Customizable** - Comprehensive design token system
- ♿️ **Accessibility First** - ARIA support and screen reader friendly
- 📱 **React Native** - Works on iOS and Android
- 🔧 **TypeScript** - Full type safety
- 🎭 **Variants System** - Multiple variants for each component
- ⚡️ **Animations** - Smooth, performant animations
- 🏗️ **Factory Pattern** - Easily create your own styled components
- 📦 **Style Props** - Chakra UI-like style props system
- 🎨 **Primitives** - Box, Stack, HStack, VStack layout components
- 📱 **Responsive Design** - Built-in responsive hooks and values
- 🎛️ **Modern Hooks** - useColorMode, useResponsive, useDisclosure

## 📦 Installation

```bash
npm install react-native-heroui
# or
yarn add react-native-heroui
```

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

### Custom Theme

```tsx
import { ThemeProvider, lightTheme } from 'react-native-heroui';

const customTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
  },
};

<ThemeProvider initialTheme="light" customTheme={customTheme}>
  {/* Your app */}
</ThemeProvider>;
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
  ThemeProvider,
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

function App() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ThemeProvider initialTheme={darkMode ? 'dark' : 'light'}>
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
    </ThemeProvider>
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
