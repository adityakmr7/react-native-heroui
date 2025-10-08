# Button

Versatile button component with multiple variants, sizes, color schemes, and loading states.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Button } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Button } from 'react-native-heroui';

export default function App() {
  return <Button onPress={() => console.log('Pressed')}>Click Me</Button>;
}
```

### Variants

Button supports 4 variants: `solid`, `outline`, `ghost`, and `link`.

```tsx
<Button variant="solid" colorScheme="primary">Solid</Button>
<Button variant="outline" colorScheme="secondary">Outline</Button>
<Button variant="ghost" colorScheme="success">Ghost</Button>
<Button variant="link" colorScheme="danger">Link</Button>
```

### Sizes

Available sizes: `sm`, `md`, `lg`.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Color Schemes

```tsx
<Button colorScheme="primary">Primary</Button>
<Button colorScheme="secondary">Secondary</Button>
<Button colorScheme="success">Success</Button>
<Button colorScheme="warning">Warning</Button>
<Button colorScheme="danger">Danger</Button>
```

### Loading State

```tsx
<Button isLoading colorScheme="primary">
  Loading...
</Button>
```

### Full Width

```tsx
<Button fullWidth colorScheme="primary">
  Full Width Button
</Button>
```

### With Icons

```tsx
<Button
  startContent={<Icon name="star" />}
  colorScheme="primary"
>
  With Start Icon
</Button>

<Button
  endContent={<Icon name="arrow-right" />}
  colorScheme="secondary"
>
  With End Icon
</Button>
```

### Disabled

```tsx
<Button isDisabled colorScheme="primary">
  Disabled Button
</Button>
```

---

## API Reference

### Button Props

| Prop                 | Type                                                             | Default     | Description                             |
| -------------------- | ---------------------------------------------------------------- | ----------- | --------------------------------------- |
| `children`           | `ReactNode`                                                      | -           | **Required.** Button content            |
| `onPress`            | `() => void`                                                     | -           | Press handler                           |
| `variant`            | `'solid' \| 'outline' \| 'ghost' \| 'link'`                      | `'solid'`   | Button variant                          |
| `size`               | `'sm' \| 'md' \| 'lg'`                                           | `'md'`      | Button size                             |
| `colorScheme`        | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme                            |
| `isDisabled`         | `boolean`                                                        | `false`     | Whether button is disabled              |
| `isLoading`          | `boolean`                                                        | `false`     | Whether button shows loading state      |
| `fullWidth`          | `boolean`                                                        | `false`     | Whether button takes full width         |
| `startContent`       | `ReactNode`                                                      | -           | Content before button text (icon, etc.) |
| `endContent`         | `ReactNode`                                                      | -           | Content after button text (icon, etc.)  |
| `style`              | `StyleProp<ViewStyle>`                                           | -           | Custom button style                     |
| `accessibilityLabel` | `string`                                                         | -           | Accessibility label                     |

---

## Accessibility

- ✅ `accessibilityRole="button"`
- ✅ `accessibilityState.disabled` when disabled
- ✅ `accessibilityState.busy` when loading
- ✅ Screen reader support

---

## Examples

### Complete Example

```tsx
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-heroui';

export default function ButtonExample() {
  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Button variant="solid" colorScheme="primary">
        Solid Primary
      </Button>

      <Button variant="outline" colorScheme="secondary">
        Outline Secondary
      </Button>

      <Button variant="ghost" colorScheme="success">
        Ghost Success
      </Button>

      <Button isLoading colorScheme="primary" fullWidth>
        Loading Button
      </Button>
    </View>
  );
}
```

---

## TypeScript

```tsx
import type { ButtonProps } from 'react-native-heroui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

Built with ❤️ for React Native
