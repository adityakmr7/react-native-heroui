# Spinner

Spinner is a loading indicator used to show the loading state of a component or page.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Spinner } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Spinner } from 'react-native-heroui';

export default function App() {
  return <Spinner />;
}
```

### Sizes

Spinner supports 3 sizes: `sm`, `md`, and `lg`.

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Colors

Spinner comes with 7 color options.

```tsx
<Spinner color="default" />
<Spinner color="primary" />
<Spinner color="secondary" />
<Spinner color="success" />
<Spinner color="warning" />
<Spinner color="danger" />
<Spinner color="current" /> {/* Uses current text color */}
```

### With Label

```tsx
<Spinner label="Loading..." />

<Spinner label="Please wait" color="primary" size="lg" />
```

### Label Color

```tsx
<Spinner label="Loading data..." color="primary" labelColor="secondary" />
```

### Variants

Spinner supports 6 different animation styles.

```tsx
<Spinner variant="default" color="primary" />   {/* Rotating circle */}
<Spinner variant="simple" color="primary" />    {/* Native spinner */}
<Spinner variant="gradient" color="primary" />  {/* Double circle with pulse */}
<Spinner variant="wave" color="primary" />      {/* Wave bars */}
<Spinner variant="dots" color="primary" />      {/* Pulsing dots */}
<Spinner variant="spinner" color="primary" />   {/* Clock-like bars */}
```

---

## API Reference

### Spinner Props

| Prop         | Type                                                                                       | Default     | Description              |
| ------------ | ------------------------------------------------------------------------------------------ | ----------- | ------------------------ |
| `color`      | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'current'` | `'primary'` | Spinner color            |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                                     | `'md'`      | Spinner size             |
| `variant`    | `'default' \| 'simple' \| 'gradient' \| 'wave' \| 'dots' \| 'spinner'`                     | `'default'` | Spinner animation style  |
| `label`      | `string`                                                                                   | -           | Label text below spinner |
| `labelColor` | `SpinnerColor`                                                                             | `'default'` | Label text color         |
| `style`      | `StyleProp<ViewStyle>`                                                                     | -           | Custom container style   |
| `classNames` | `SpinnerClassNames`                                                                        | -           | Custom slot styles       |

### SpinnerClassNames

```tsx
interface SpinnerClassNames {
  base?: StyleProp<ViewStyle>; // Container
  wrapper?: StyleProp<ViewStyle>; // Spinner wrapper
  circle1?: StyleProp<ViewStyle>; // First circle (default/gradient)
  circle2?: StyleProp<ViewStyle>; // Second circle (gradient)
  circle?: StyleProp<ViewStyle>; // Circle (simple)
  dots?: StyleProp<ViewStyle>; // Dots container (dots variant)
  spinnerBars?: StyleProp<ViewStyle>; // Bars container (wave/spinner)
  label?: StyleProp<TextStyle>; // Label text
}
```

---

## Accessibility

- ✅ `accessibilityRole="progressbar"`
- ✅ `accessibilityLabel` announces loading state
- ✅ Screen reader announces "Loading" by default
- ✅ Custom labels announced to screen readers

---

## Examples

### Loading Button

```tsx
import { Button, Spinner } from 'react-native-heroui';

<Button isLoading startContent={<Spinner size="sm" color="current" />}>
  Loading...
</Button>;
```

### Full Screen Loader

```tsx
import { View, Spinner } from 'react-native-heroui';

<View
  style={{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Spinner size="lg" label="Loading app..." color="primary" />
</View>;
```

### Inline Spinner

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Spinner size="sm" color="primary" />
  <Text>Fetching data...</Text>
</View>
```

### All Variants

```tsx
<View style={{ gap: 16 }}>
  <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
    <Spinner variant="default" label="Default" />
    <Spinner variant="simple" label="Simple" />
    <Spinner variant="gradient" label="Gradient" />
  </View>
  <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
    <Spinner variant="wave" label="Wave" />
    <Spinner variant="dots" label="Dots" />
    <Spinner variant="spinner" label="Spinner" />
  </View>
</View>
```

### All Colors

```tsx
<View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
  <Spinner color="default" label="Default" />
  <Spinner color="primary" label="Primary" />
  <Spinner color="secondary" label="Secondary" />
  <Spinner color="success" label="Success" />
  <Spinner color="warning" label="Warning" />
  <Spinner color="danger" label="Danger" />
</View>
```

### Loading States

```tsx
import React, { useState } from 'react';
import { View, Spinner, Button } from 'react-native-heroui';

export default function LoadingExample() {
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  return (
    <View>
      {loading ? (
        <Spinner label="Loading data..." color="primary" size="lg" />
      ) : (
        <Button onPress={handleLoad}>Load Data</Button>
      )}
    </View>
  );
}
```

### Complete Example

```tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Spinner,
  Card,
  CardBody,
  Button,
  HeroUIProvider,
} from 'react-native-heroui';

function SpinnerDemo() {
  const [loading, setLoading] = useState(false);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <View style={styles.container}>
      {/* Sizes */}
      <Card>
        <CardBody>
          <Text style={styles.sectionTitle}>Sizes</Text>
          <View style={styles.row}>
            <Spinner size="sm" label="Small" />
            <Spinner size="md" label="Medium" />
            <Spinner size="lg" label="Large" />
          </View>
        </CardBody>
      </Card>

      {/* Colors */}
      <Card>
        <CardBody>
          <Text style={styles.sectionTitle}>Colors</Text>
          <View style={styles.row}>
            <Spinner color="primary" />
            <Spinner color="secondary" />
            <Spinner color="success" />
            <Spinner color="warning" />
            <Spinner color="danger" />
          </View>
        </CardBody>
      </Card>

      {/* Loading State */}
      <Card>
        <CardBody>
          <Text style={styles.sectionTitle}>Loading State</Text>
          {loading ? (
            <Spinner label="Loading..." color="primary" size="lg" />
          ) : (
            <Button onPress={simulateLoading} colorScheme="primary">
              Start Loading
            </Button>
          )}
        </CardBody>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <SpinnerDemo />
    </HeroUIProvider>
  );
}
```

---

## Custom Styling

```tsx
<Spinner
  classNames={{
    wrapper: { borderWidth: 2, borderColor: '#0066cc' },
    label: { fontSize: 18, fontWeight: 'bold' },
  }}
  label="Custom Styled"
/>
```

---

## TypeScript

```tsx
import type {
  SpinnerProps,
  SpinnerColor,
  SpinnerSize,
} from 'react-native-heroui';

const color: SpinnerColor = 'primary';
const size: SpinnerSize = 'md';
```

---

Built with ❤️ for React Native
