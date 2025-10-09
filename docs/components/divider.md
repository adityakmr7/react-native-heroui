# Divider

Divider is a component that separates content in a page.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Divider } from 'react-native-heroui';
```

## Usage

### Basic Example (Horizontal)

```tsx
import { Divider } from 'react-native-heroui';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Content above</Text>
      <Divider />
      <Text>Content below</Text>
    </View>
  );
}
```

### Vertical Divider

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Right</Text>
</View>
```

---

## API Reference

### Divider Props

| Prop          | Type                         | Default        | Description         |
| ------------- | ---------------------------- | -------------- | ------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `style`       | `StyleProp<ViewStyle>`       | -              | Custom style        |
| `classNames`  | `{ base?: StyleProp }`       | -              | Custom slot styles  |

---

## Examples

### In Card Layout

```tsx
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from 'react-native-heroui';

<Card>
  <CardHeader>
    <Text>Header</Text>
  </CardHeader>
  <Divider />
  <CardBody>
    <Text>Body content</Text>
  </CardBody>
  <Divider />
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>;
```

### Between List Items

```tsx
<View style={{ padding: 16 }}>
  <Text>Item 1</Text>
  <Divider style={{ marginVertical: 12 }} />
  <Text>Item 2</Text>
  <Divider style={{ marginVertical: 12 }} />
  <Text>Item 3</Text>
</View>
```

### Vertical in Toolbar

```tsx
<View
  style={{ flexDirection: 'row', alignItems: 'center', gap: 12, height: 44 }}
>
  <Button size="sm">Save</Button>
  <Divider orientation="vertical" />
  <Button size="sm">Cancel</Button>
  <Divider orientation="vertical" />
  <Button size="sm">Delete</Button>
</View>
```

### Custom Styling

```tsx
<Divider style={{ backgroundColor: '#0066cc', height: 2 }} />

<Divider
  orientation="vertical"
  style={{ backgroundColor: '#ff0000', width: 2 }}
/>

<Divider classNames={{ base: { opacity: 0.5 } }} />
```

### Complete Example

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider, Card, CardBody, HeroUIProvider } from 'react-native-heroui';

function DividerExample() {
  return (
    <View style={styles.container}>
      {/* Horizontal dividers */}
      <Card>
        <CardBody>
          <Text style={styles.text}>Section 1</Text>
          <Divider style={{ marginVertical: 12 }} />
          <Text style={styles.text}>Section 2</Text>
          <Divider style={{ marginVertical: 12 }} />
          <Text style={styles.text}>Section 3</Text>
        </CardBody>
      </Card>

      {/* Vertical dividers */}
      <View style={styles.row}>
        <Text>Left</Text>
        <Divider orientation="vertical" style={{ marginHorizontal: 12 }} />
        <Text>Middle</Text>
        <Divider orientation="vertical" style={{ marginHorizontal: 12 }} />
        <Text>Right</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  text: {
    fontSize: 16,
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <DividerExample />
    </HeroUIProvider>
  );
}
```

---

## Accessibility

- ✅ `accessibilityRole="none"` (dividers are visual only)
- ✅ Supports both horizontal and vertical orientation
- ✅ Uses semantic separator styling

---

## TypeScript

```tsx
import type { DividerProps, DividerOrientation } from 'react-native-heroui';

const orientation: DividerOrientation = 'horizontal';
```

---

Built with ❤️ for React Native
