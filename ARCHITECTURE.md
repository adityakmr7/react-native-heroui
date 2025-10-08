# 🏗️ Architecture Guide

## Design Philosophy

React Native HeroUI follows modern component library best practices while maintaining the flexibility and developer experience of cutting-edge tools like shadcn/ui, but adapted for React Native.

## Core Principles

### 1. **Composability First**

Components are designed to be composed together, not just used in isolation.

```tsx
// ✅ Good - Composable
<Card>
  <CardHeader>
    <Avatar />
    <Badge>New</Badge>
  </CardHeader>
  <CardBody>...</CardBody>
</Card>

// ❌ Avoid - Monolithic
<Card header={...} body={...} avatar={...} />
```

### 2. **Unstyled Primitives + Styled Components**

The library provides both:

- **Primitives**: Unstyled, accessible base components
- **Styled Components**: Pre-styled components ready to use

### 3. **Design Tokens > Hardcoded Values**

All styling comes from design tokens, making theming trivial.

```tsx
// ✅ Uses tokens
backgroundColor: theme.colors.primary;
padding: theme.spacing['unit-4'];

// ❌ Hardcoded
backgroundColor: '#0066FF';
padding: 16;
```

## Architecture Layers

```
┌─────────────────────────────────────────┐
│         Application Layer               │
│  (Your app uses the components)         │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      Component Layer (Public API)       │
│  Button, Input, Card, Avatar, etc.      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Variant System                  │
│  getButtonStyles, getInputStyles, etc.  │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Theme System                    │
│  ThemeProvider, useTheme, themes        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│         Design Tokens                   │
│  colors, spacing, typography, etc.      │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│      React Native Primitives            │
│  View, Text, Pressable, etc.            │
└─────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── components/          # All UI components
│   ├── Button/
│   │   └── Button.tsx   # Component + types + exports
│   ├── Input/
│   └── ...
├── primitives/          # [TODO] Unstyled base components
│   ├── Pressable/
│   └── Text/
├── hooks/               # Reusable hooks
│   ├── useTheme.ts
│   └── useMediaQuery.ts
├── providers/           # Context providers
│   └── ThemeProvider.tsx
├── theme/               # Theme configuration
│   ├── themes.ts
│   └── types.ts
├── tokens/              # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   └── ...
├── variants/            # Style variant functions
│   ├── button.ts
│   └── input.ts
├── utils/               # Utility functions
│   ├── styled.ts
│   └── styleProps.ts
├── factories/           # Component factories
│   └── createStyledComponent.tsx
└── index.tsx            # Public API exports
```

## Component Anatomy

Every component follows this structure:

```tsx
// 1. Imports
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getButtonStyles } from '../../variants/button';

// 2. Types (with JSDoc)
export interface ButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'solid' | 'outline';
  // ... more props
}

// 3. Component (with forwardRef for ref support)
export const Button = React.forwardRef<Pressable, ButtonProps>(
  ({ children, variant = 'solid', ...props }, ref) => {
    const { theme } = useTheme();
    const styles = getButtonStyles(theme, variant);

    return (
      <Pressable ref={ref} style={styles} {...props}>
        <Text>{children}</Text>
      </Pressable>
    );
  }
);

// 4. Display name for debugging
Button.displayName = 'Button';
```

## Variant System

Variants are pure functions that return styles based on props:

```tsx
export const getButtonStyles = (
  theme: Theme,
  variant: 'solid' | 'outline',
  size: 'sm' | 'md' | 'lg'
) => {
  const baseStyles = {
    /* ... */
  };
  const variantStyles = {
    /* ... */
  };
  const sizeStyles = {
    /* ... */
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };
};
```

## Theming

### Token-First Approach

1. Define tokens (primitives)
2. Create semantic tokens (mapped to primitives)
3. Components consume semantic tokens

### Theme Structure

```tsx
{
  mode: 'light' | 'dark',
  colors: {
    // Semantic tokens
    background: string,
    foreground: string,
    primary: string,
    // Scale tokens
    'primary-50': string,
    'primary-100': string,
    // ...
  },
  spacing: { /* ... */ },
  typography: { /* ... */ },
}
```

## Best Practices

### 1. Component Design

- **Single Responsibility**: Each component does one thing well
- **Composition over Configuration**: Prefer compound components over prop-heavy components
- **Accessible by Default**: All interactive components have proper ARIA attributes
- **Ref Support**: Use `forwardRef` for all components

### 2. Type Safety

- Export all prop types
- Use discriminated unions for variant props
- Leverage TypeScript for better DX

### 3. Performance

- Use `React.memo` for expensive components
- Avoid inline style objects
- Use `StyleSheet.create` for static styles
- Implement proper shouldComponentUpdate logic

### 4. Testing

- Unit tests for utility functions
- Component tests for user interactions
- Snapshot tests for visual regression

## Comparison to Other Architectures

### vs shadcn/ui

- **shadcn/ui**: Copy-paste, no runtime, Tailwind CSS
- **HeroUI**: NPM package, runtime theming, StyleSheet API
- **Why different**: React Native requires different approach (no CSS, native modules)

### vs Material UI / Chakra UI

- **Similar**: Token-based theming, variant system, TypeScript
- **Different**: React Native primitives, platform-specific styling

### vs React Native Paper

- **Similar**: NPM package, theme provider, component library
- **Better**: More modern API, better TypeScript, more flexible theming

## Future Enhancements

### Planned Improvements

1. **Unstyled Primitives** - Export unstyled components for full customization
2. **Animation System** - Reusable animation hooks and components
3. **Form Handling** - Form context and validation
4. **Layout Primitives** - Stack, Grid, Flex helpers
5. **CLI Tool** - Add components to project with customization
6. **Component Generator** - Scaffold new components following best practices
7. **Storybook Integration** - Visual component development
8. **Theme Builder** - GUI for creating custom themes

### Experimental Features

- **CSS-in-JS Alternative**: Exploring NativeWind/Tailwind approach
- **Zero Runtime**: Compile-time style extraction
- **Headless Components**: Fully unstyled behavior components

## Contributing

When adding new components:

1. Follow the component anatomy structure
2. Add comprehensive TypeScript types
3. Include JSDoc comments
4. Add accessibility props
5. Create variant functions
6. Export from index.tsx
7. Add examples to README
8. Write tests

## Resources

- [React Native Styling Best Practices](https://reactnative.dev/docs/style)
- [TypeScript React Best Practices](https://react-typescript-cheatsheet.netlify.app/)
- [Accessibility in React Native](https://reactnative.dev/docs/accessibility)
- [Design Tokens W3C Spec](https://design-tokens.github.io/community-group/format/)
