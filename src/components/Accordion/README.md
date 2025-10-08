# Accordion

Accordion displays a list of high-level options that can expand/collapse to reveal more information.

---

## Installation

```bash
npm install react-native-heroui
# or
yarn add react-native-heroui
# or
pnpm add react-native-heroui
```

## Import

```tsx
import { Accordion, AccordionItem } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import React from 'react';
import { Text } from 'react-native';
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

Add descriptive subtitles to provide more context for each accordion item.

```tsx
<Accordion variant="light" defaultExpandedKeys={['1']}>
  <AccordionItem
    itemKey="1"
    title="What is React Native HeroUI?"
    subtitle="Learn about this library"
  >
    <Text>
      React Native HeroUI is a modern, beautiful UI component library for React
      Native applications, inspired by NextUI.
    </Text>
  </AccordionItem>
  <AccordionItem
    itemKey="2"
    title="How to get started?"
    subtitle="Installation guide"
  >
    <Text>
      Install the package using npm or yarn and wrap your app with ThemeProvider
      to get started.
    </Text>
  </AccordionItem>
</Accordion>
```

### Expand Multiple Items

Set `selectionMode` to `"multiple"` to allow multiple items to be expanded at the same time.

```tsx
<Accordion variant="bordered" selectionMode="multiple">
  <AccordionItem itemKey="1" title="Components">
    <Text>
      Button, Input, Card, Avatar, Badge, Chip, Switch, Accordion, and more!
    </Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Hooks">
    <Text>
      useTheme, useColorMode, useResponsive, useDisclosure for powerful
      functionality.
    </Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Theming">
    <Text>
      Fully customizable theme system with light and dark mode support.
    </Text>
  </AccordionItem>
</Accordion>
```

### Compact

Use `isCompact` to display the accordion in a more condensed style with reduced padding.

```tsx
<Accordion variant="splitted" isCompact>
  <AccordionItem itemKey="1" title="Item 1">
    <Text>Compact content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Item 2">
    <Text>Compact content 2</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Item 3">
    <Text>Compact content 3</Text>
  </AccordionItem>
</Accordion>
```

## Variants

Accordion supports 4 different visual variants: `light`, `shadow`, `bordered`, and `splitted`.

### Light Variant (Default)

The light variant has a transparent background with dividers between items.

```tsx
<Accordion variant="light">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">
    <Text>Content 3</Text>
  </AccordionItem>
</Accordion>
```

### Shadow Variant

The shadow variant adds elevation with box shadows to each accordion item.

```tsx
<Accordion variant="shadow">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">
    <Text>Content 3</Text>
  </AccordionItem>
</Accordion>
```

### Bordered Variant

The bordered variant adds borders around each accordion item.

```tsx
<Accordion variant="bordered">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">
    <Text>Content 3</Text>
  </AccordionItem>
</Accordion>
```

### Splitted Variant

The splitted variant displays items separated with gaps and subtle shadows.

```tsx
<Accordion variant="splitted">
  <AccordionItem itemKey="1" title="Accordion 1">
    <Text>Content 1</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Accordion 2">
    <Text>Content 2</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Accordion 3">
    <Text>Content 3</Text>
  </AccordionItem>
</Accordion>
```

## Default Expanded Keys

Use `defaultExpandedKeys` to set which items are expanded by default (uncontrolled mode).

```tsx
<Accordion defaultExpandedKeys={['1', '3']}>
  <AccordionItem itemKey="1" title="Expanded by Default">
    <Text>This item is expanded when the accordion loads.</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Collapsed by Default">
    <Text>This item is collapsed when the accordion loads.</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Also Expanded">
    <Text>This item is also expanded by default.</Text>
  </AccordionItem>
</Accordion>
```

## Disabled Keys

Disable specific accordion items using the `disabledKeys` prop.

```tsx
<Accordion disabledKeys={['2']}>
  <AccordionItem itemKey="1" title="Enabled Item">
    <Text>This item can be clicked.</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Disabled Item">
    <Text>This item is disabled.</Text>
  </AccordionItem>
  <AccordionItem itemKey="3" title="Another Enabled Item">
    <Text>This item can also be clicked.</Text>
  </AccordionItem>
</Accordion>
```

## Start Content

Add icons, badges, or other content before the accordion title using `startContent`.

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
        <Text>Customize themes, colors, and spacing.</Text>
      </AccordionItem>
    </Accordion>
  );
}
```

## Custom Indicator

Customize the expand/collapse indicator using the `indicator` prop.

### Static Custom Indicator

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

### Dynamic Custom Indicator (Function)

The indicator can be a function that receives `isOpen` and `isDisabled` props.

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

Use `hideIndicator` to remove the expand/collapse indicator completely.

```tsx
<Accordion hideIndicator>
  <AccordionItem itemKey="1" title="No Indicator">
    <Text>This accordion has no indicator.</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Also No Indicator">
    <Text>Neither does this one.</Text>
  </AccordionItem>
</Accordion>
```

## Controlled Accordion

Control the expanded state externally using `expandedKeys` and `onSelectionChange`.

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

Disable expand/collapse animations using `disableAnimation`.

```tsx
<Accordion disableAnimation>
  <AccordionItem itemKey="1" title="No Animation">
    <Text>This accordion doesn't animate.</Text>
  </AccordionItem>
  <AccordionItem itemKey="2" title="Instant Toggle">
    <Text>Items expand instantly.</Text>
  </AccordionItem>
</Accordion>
```

## Custom Styles

Customize the appearance of accordion items using the `classNames` prop.

```tsx
<Accordion variant="bordered">
  <AccordionItem
    itemKey="1"
    title="Custom Styled Item"
    classNames={{
      base: { backgroundColor: '#f0f0f0' },
      title: { color: '#0066cc', fontWeight: 'bold' },
      content: { backgroundColor: '#ffffff', padding: 20 },
    }}
  >
    <Text>This item has custom styles applied.</Text>
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

### AccordionItem ClassNames

The `classNames` prop allows you to customize different parts of an accordion item:

```tsx
interface AccordionItemClassNames {
  base?: StyleProp<ViewStyle>; // Root container
  heading?: StyleProp<ViewStyle>; // Heading container
  trigger?: StyleProp<ViewStyle>; // Clickable trigger area
  titleWrapper?: StyleProp<ViewStyle>; // Title and subtitle wrapper
  title?: StyleProp<TextStyle>; // Title text
  subtitle?: StyleProp<TextStyle>; // Subtitle text
  startContent?: StyleProp<ViewStyle>; // Start content container
  indicator?: StyleProp<ViewStyle>; // Indicator container
  content?: StyleProp<ViewStyle>; // Expanded content area
}
```

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

The Accordion component includes built-in accessibility features:

- ✅ **Screen Reader Support**: Proper `accessibilityRole` and `accessibilityState` attributes
- ✅ **Expanded State**: `accessibilityState.expanded` indicates open/closed state
- ✅ **Disabled State**: `accessibilityState.disabled` for disabled items
- ✅ **Touch Targets**: Adequate touch target sizes for mobile
- ✅ **Visual Feedback**: Pressed state indication for touch interactions

---

## Advanced Examples

### Complete Example with All Features

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Accordion,
  AccordionItem,
  ThemeProvider,
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
            Install the package and wrap your app with ThemeProvider.
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
          indicator={({ isOpen }) => (
            <Text style={{ fontSize: 16, color: theme.colors.secondary }}>
              {isOpen ? '▲' : '▼'}
            </Text>
          )}
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
          indicator={({ isOpen }) => (
            <Text style={{ fontSize: 16, color: theme.colors.success }}>
              {isOpen ? '▲' : '▼'}
            </Text>
          )}
        >
          <Text style={{ color: theme.colors['default-600'] }}>
            Built with performance in mind, minimal re-renders.
          </Text>
        </AccordionItem>

        <AccordionItem
          itemKey="4"
          title="🔒 Disabled Item"
          subtitle="This item is disabled"
          startContent={
            <View
              style={[
                styles.dot,
                { backgroundColor: theme.colors['default-300'] },
              ]}
            />
          }
        >
          <Text style={{ color: theme.colors['default-600'] }}>
            This content cannot be accessed.
          </Text>
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
    <ThemeProvider>
      <AdvancedAccordionExample />
    </ThemeProvider>
  );
}
```

---

## TypeScript Support

The Accordion component is fully typed with TypeScript:

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

## Theme Integration

The Accordion component automatically integrates with the HeroUI theme system:

- Uses theme colors for backgrounds, text, and borders
- Respects theme spacing for padding and margins
- Supports light and dark modes automatically
- Uses theme border radius and shadows

Example with theme customization:

```tsx
import { ThemeProvider } from 'react-native-heroui';

const customTheme = {
  colors: {
    primary: '#0066cc',
    // ... other colors
  },
};

<ThemeProvider theme={customTheme}>
  <Accordion variant="bordered">
    {/* Accordion items will use custom theme colors */}
  </Accordion>
</ThemeProvider>;
```

---

## FAQ

### How do I expand multiple items by default?

Use `defaultExpandedKeys` with an array of item keys:

```tsx
<Accordion defaultExpandedKeys={['1', '2', '3']}>{/* items */}</Accordion>
```

### Can I disable individual items?

Yes, use the `isDisabled` prop on `AccordionItem`:

```tsx
<AccordionItem itemKey="1" title="Disabled" isDisabled>
  <Text>This item is disabled</Text>
</AccordionItem>
```

Or disable multiple items using `disabledKeys` on the Accordion:

```tsx
<Accordion disabledKeys={['1', '3']}>{/* items */}</Accordion>
```

### How do I prevent any item from being collapsed?

Set `selectionMode` to `"none"` to disable toggling, or maintain control via the controlled `expandedKeys` prop.

### Can I use custom animations?

Currently, the component uses React Native's `LayoutAnimation`. For custom animations, you can disable the built-in animation with `disableAnimation` and implement your own using the controlled mode.

### Does it work with React Native Web?

Yes! The Accordion component is compatible with React Native Web.

---

## License

MIT © [Your Name/Organization]

## Contributing

Contributions are welcome! Please read our [contributing guidelines](../../CONTRIBUTING.md) first.

---

**Built with ❤️ for React Native**
