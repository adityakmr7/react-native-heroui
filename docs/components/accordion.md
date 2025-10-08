# Accordion

Accordion displays a list of high-level options that can expand/collapse to reveal more information.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Accordion, AccordionItem } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Accordion, AccordionItem } from 'react-native-heroui';

export default function App() {
  return (
    <Accordion>
      <AccordionItem itemKey="1" title="Accordion 1">
        <Text>Content for Accordion 1</Text>
      </AccordionItem>
      <AccordionItem itemKey="2" title="Accordion 2">
        <Text>Content for Accordion 2</Text>
      </AccordionItem>
      <AccordionItem itemKey="3" title="Accordion 3">
        <Text>Content for Accordion 3</Text>
      </AccordionItem>
    </Accordion>
  );
}
```

### With Subtitle

```tsx
<Accordion variant="light" defaultExpandedKeys={['1']}>
  <AccordionItem
    itemKey="1"
    title="What is React Native HeroUI?"
    subtitle="Learn about this library"
  >
    <Text>
      React Native HeroUI is a modern, beautiful UI component library for React
      Native applications.
    </Text>
  </AccordionItem>
  <AccordionItem
    itemKey="2"
    title="How to get started?"
    subtitle="Installation guide"
  >
    <Text>Install the package and wrap your app with HeroUIProvider.</Text>
  </AccordionItem>
</Accordion>
```

### Expand Multiple Items

Set `selectionMode` to `"multiple"` to allow multiple items to be expanded simultaneously.

```tsx
<Accordion variant="bordered" selectionMode="multiple">
  <AccordionItem itemKey="1" title="Components">
    <Text>Button, Input, Card, Avatar, Badge, Chip, Switch, and more!</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Hooks">
    <Text>useTheme, useColorMode, useResponsive, useDisclosure</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Theming">
    <Text>Customizable theme system with light and dark mode support.</Text>
  </AccordionItem>
</Accordion>
```

### Compact Mode

```tsx
<Accordion variant="splitted" isCompact>
  <AccordionItem itemKey="1" title="Compact Item 1">
    <Text>Reduced padding for tighter layouts</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Compact Item 2">
    <Text>Compact content 2</Text>
  </AccordionItem>
</Accordion>
```

## Variants

Accordion supports 4 different visual variants.

### Light Variant (Default)

```tsx
<Accordion variant="light">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>
```

### Shadow Variant

```tsx
<Accordion variant="shadow">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content with shadow elevation</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>
```

### Bordered Variant

```tsx
<Accordion variant="bordered">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content with borders</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>
```

### Splitted Variant

```tsx
<Accordion variant="splitted">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Separated items with gaps</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
</Accordion>
```

## Default Expanded Keys

```tsx
<Accordion defaultExpandedKeys={['1', '3']}>
  <AccordionItem itemKey="1" title="Expanded by Default">
    <Text>This item is expanded on load</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Collapsed by Default">
    <Text>This item is collapsed</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Also Expanded">
    <Text>This is also expanded by default</Text>
  </AccordionItem>
</Accordion>
```

## Disabled Keys

```tsx
<Accordion disabledKeys={['2']}>
  <AccordionItem itemKey="1" title="Enabled Item">
    <Text>This item can be clicked</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Disabled Item">
    <Text>This item is disabled</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Another Enabled">
    <Text>This item can be clicked</Text>
  </AccordionItem>
</Accordion>
```

## Start Content

```tsx
import { View } from 'react-native';
import { useTheme } from 'react-native-heroui';

function AccordionWithIcons() {
  const { theme } = useTheme();

  return (
    <Accordion variant="splitted">
      <AccordionItem
        itemKey="1"
        title="💡 Installation"
        startContent={
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.colors.primary,
            }}
          />
        }
      >
        <Text>npm install react-native-heroui</Text>
      </AccordionItem>
      <AccordionItem
        itemKey="2"
        title="🎨 Customization"
        startContent={
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: theme.colors.secondary,
            }}
          />
        }
      >
        <Text>Customize themes, colors, and spacing</Text>
      </AccordionItem>
    </Accordion>
  );
}
```

## Custom Indicator

### Static Indicator

```tsx
<Accordion variant="shadow">
  <AccordionItem
    itemKey="1"
    title="Custom Indicator"
    indicator={<Text style={{ fontSize: 18 }}>→</Text>}
  >
    <Text>Content with custom indicator</Text>
  </AccordionItem>
</Accordion>
```

### Dynamic Indicator Function

```tsx
import { useTheme } from 'react-native-heroui';

function AccordionWithCustomIndicator() {
  const { theme } = useTheme();

  return (
    <Accordion variant="shadow">
      <AccordionItem
        itemKey="1"
        title="Premium Features"
        indicator={({ isOpen, isDisabled }) => (
          <Text
            style={{
              fontSize: 20,
              color: isDisabled
                ? theme.colors['default-300']
                : theme.colors.primary,
            }}
          >
            {isOpen ? '−' : '+'}
          </Text>
        )}
      >
        <Text>Get access to premium components and priority support.</Text>
      </AccordionItem>
    </Accordion>
  );
}
```

## Hide Indicator

```tsx
<Accordion hideIndicator>
  <AccordionItem itemKey="1" title="No Indicator">
    <Text>This accordion has no indicator</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Also No Indicator">
    <Text>Neither does this one</Text>
  </AccordionItem>
</Accordion>
```

## Controlled Accordion

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Accordion, AccordionItem, Button } from 'react-native-heroui';

export default function ControlledAccordion() {
  const [expandedKeys, setExpandedKeys] = useState(new Set(['1']));

  return (
    <View>
      <Button onPress={() => setExpandedKeys(new Set(['2']))}>
        Expand Item 2
      </Button>

      <Accordion
        expandedKeys={Array.from(expandedKeys)}
        onSelectionChange={(keys) => setExpandedKeys(keys)}
      >
        <AccordionItem itemKey="1" title="Item 1">
          <Text>Content 1</Text>
        </AccordionItem>
        <AccordionItem itemKey="2" title="Item 2">
          <Text>Content 2</Text>
        </AccordionItem>
        <AccordionItem itemKey="3" title="Item 3">
          <Text>Content 3</Text>
        </AccordionItem>
      </Accordion>
    </View>
  );
}
```

## Disable Animation

```tsx
<Accordion disableAnimation>
  <AccordionItem itemKey="1" title="No Animation">
    <Text>This accordion doesn't animate</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Instant Toggle">
    <Text>Items expand instantly</Text>
  </AccordionItem>
</Accordion>
```

---

## API Reference

### Accordion Props

| Prop                        | Type                                              | Default    | Description                             |
| --------------------------- | ------------------------------------------------- | ---------- | --------------------------------------- |
| `children`                  | `ReactNode`                                       | -          | AccordionItem components                |
| `variant`                   | `'light' \| 'shadow' \| 'bordered' \| 'splitted'` | `'light'`  | Visual style variant                    |
| `selectionMode`             | `'single' \| 'multiple' \| 'none'`                | `'single'` | Selection behavior                      |
| `isCompact`                 | `boolean`                                         | `false`    | Compact mode with reduced padding       |
| `isDisabled`                | `boolean`                                         | `false`    | Disable all accordion items             |
| `showDivider`               | `boolean`                                         | `true`     | Show dividers between items             |
| `hideIndicator`             | `boolean`                                         | `false`    | Hide expand/collapse indicators         |
| `disableAnimation`          | `boolean`                                         | `false`    | Disable expand/collapse animations      |
| `disableIndicatorAnimation` | `boolean`                                         | `false`    | Disable indicator rotation animation    |
| `defaultExpandedKeys`       | `string[]`                                        | `[]`       | Initially expanded items (uncontrolled) |
| `expandedKeys`              | `string[]`                                        | -          | Controlled expanded items               |
| `disabledKeys`              | `string[]`                                        | `[]`       | Keys of disabled items                  |
| `fullWidth`                 | `boolean`                                         | `true`     | Take full width of container            |
| `style`                     | `StyleProp<ViewStyle>`                            | -          | Custom container style                  |
| `onSelectionChange`         | `(keys: Set<string>) => void`                     | -          | Called when selection changes           |

### AccordionItem Props

| Prop           | Type                                                | Default | Description                                   |
| -------------- | --------------------------------------------------- | ------- | --------------------------------------------- |
| `itemKey`      | `string`                                            | -       | **Required.** Unique identifier for the item  |
| `title`        | `string \| ReactNode`                               | -       | **Required.** Title of the accordion item     |
| `children`     | `ReactNode`                                         | -       | **Required.** Content displayed when expanded |
| `subtitle`     | `string \| ReactNode`                               | -       | Optional subtitle text                        |
| `startContent` | `ReactNode`                                         | -       | Content before the title (icon, badge, etc.)  |
| `indicator`    | `ReactNode \| (props: IndicatorProps) => ReactNode` | -       | Custom expand/collapse indicator              |
| `isDisabled`   | `boolean`                                           | `false` | Disable this specific item                    |
| `style`        | `StyleProp<ViewStyle>`                              | -       | Custom item style                             |
| `classNames`   | `AccordionItemClassNames`                           | -       | Custom styles for item parts                  |

### IndicatorProps

Props passed to custom indicator functions:

```tsx
interface IndicatorProps {
  isOpen?: boolean; // Whether the item is expanded
  isDisabled?: boolean; // Whether the item is disabled
}
```

---

## Accessibility

- ✅ `accessibilityRole="button"` on triggers
- ✅ `accessibilityState.expanded` for open/closed state
- ✅ `accessibilityState.disabled` for disabled items
- ✅ Screen reader support

---

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Accordion,
  AccordionItem,
  HeroUIProvider,
  useTheme,
  Button,
} from 'react-native-heroui';

function AdvancedAccordionExample() {
  const { theme } = useTheme();
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1']);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.foreground }]}>
        Advanced Accordion Demo
      </Text>

      {/* Control buttons */}
      <View style={styles.controls}>
        <Button size="sm" onPress={() => setExpandedKeys(['1', '2', '3'])}>
          Expand All
        </Button>
        <Button size="sm" variant="outline" onPress={() => setExpandedKeys([])}>
          Collapse All
        </Button>
      </View>

      <Accordion
        variant="splitted"
        selectionMode="multiple"
        expandedKeys={expandedKeys}
        onSelectionChange={(keys) => setExpandedKeys(Array.from(keys))}
        disabledKeys={['4']}
      >
        <AccordionItem
          itemKey="1"
          title="🚀 Getting Started"
          subtitle="Quick start guide"
          startContent={
            <View
              style={[styles.dot, { backgroundColor: theme.colors.primary }]}
            />
          }
          indicator={({ isOpen }) => (
            <Text style={{ fontSize: 16, color: theme.colors.primary }}>
              {isOpen ? '▲' : '▼'}
            </Text>
          )}
        >
          <Text style={{ color: theme.colors['default-600'] }}>
            Install the package and wrap your app with HeroUIProvider.
          </Text>
        </AccordionItem>

        <AccordionItem
          itemKey="2"
          title="📚 Documentation"
          subtitle="Learn more about the API"
          startContent={
            <View
              style={[styles.dot, { backgroundColor: theme.colors.secondary }]}
            />
          }
        >
          <Text style={{ color: theme.colors['default-600'] }}>
            Comprehensive docs with examples and API references.
          </Text>
        </AccordionItem>

        <AccordionItem
          itemKey="3"
          title="⚡ Performance"
          subtitle="Optimized for mobile"
          startContent={
            <View
              style={[styles.dot, { backgroundColor: theme.colors.success }]}
            />
          }
        >
          <Text style={{ color: theme.colors['default-600'] }}>
            Built with performance in mind, minimal re-renders.
          </Text>
        </AccordionItem>

        <AccordionItem
          itemKey="4"
          title="🔒 Disabled Item"
          subtitle="This item is disabled"
        >
          <Text>This content cannot be accessed.</Text>
        </AccordionItem>
      </Accordion>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <AdvancedAccordionExample />
    </HeroUIProvider>
  );
}
```

---

## TypeScript

```tsx
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionVariant,
  SelectionMode,
  IndicatorProps,
} from 'react-native-heroui';

// Use the types in your components
const variant: AccordionVariant = 'shadow';
const selectionMode: SelectionMode = 'multiple';
```

---

Built with ❤️ for React Native
