# Badge

Badges are used as a small numerical value or status descriptor for UI elements.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Badge } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Badge, Avatar } from 'react-native-heroui';

export default function App() {
  return (
    <Badge content="5">
      <Avatar name="John Doe" />
    </Badge>
  );
}
```

### Sizes

Badge supports 3 sizes: `sm`, `md`, and `lg`.

```tsx
<Badge content="5" size="sm">
  <Avatar name="JD" size="sm" />
</Badge>

<Badge content="5" size="md">
  <Avatar name="JD" size="md" />
</Badge>

<Badge content="5" size="lg">
  <Avatar name="JD" size="lg" />
</Badge>
```

### Colors

Badge comes with 6 color options.

```tsx
<Badge content="5" color="default"><Avatar name="JD" /></Badge>
<Badge content="5" color="primary"><Avatar name="JD" /></Badge>
<Badge content="5" color="secondary"><Avatar name="JD" /></Badge>
<Badge content="5" color="success"><Avatar name="JD" /></Badge>
<Badge content="5" color="warning"><Avatar name="JD" /></Badge>
<Badge content="5" color="danger"><Avatar name="JD" /></Badge>
```

### Variants

Badge supports 4 visual variants.

```tsx
<Badge content="5" variant="solid" color="primary">
  <Avatar name="JD" />
</Badge>

<Badge content="5" variant="flat" color="primary">
  <Avatar name="JD" />
</Badge>

<Badge content="5" variant="faded" color="primary">
  <Avatar name="JD" />
</Badge>

<Badge content="5" variant="shadow" color="primary">
  <Avatar name="JD" />
</Badge>
```

### Placements

Badge can be positioned in 4 different locations around the wrapped content.

```tsx
<Badge content="5" placement="top-right">
  <Avatar name="JD" />
</Badge>

<Badge content="5" placement="top-left">
  <Avatar name="JD" />
</Badge>

<Badge content="5" placement="bottom-right">
  <Avatar name="JD" />
</Badge>

<Badge content="5" placement="bottom-left">
  <Avatar name="JD" />
</Badge>
```

### Shapes

Badge supports two shapes: `circle` and `rectangle`.

```tsx
<Badge content="5" shape="circle" color="danger">
  <Avatar name="JD" />
</Badge>

<Badge content="5" shape="rectangle" color="danger">
  <Avatar name="JD" />
</Badge>
```

### Badge Visibility

Control badge visibility with `isInvisible`.

```tsx
const [isVisible, setIsVisible] = useState(true);

<Badge content="5" isInvisible={!isVisible}>
  <Avatar name="JD" />
</Badge>

<Button onPress={() => setIsVisible(!isVisible)}>
  Toggle Badge
</Button>
```

### Content Examples

Badge content can be a string, number, or React component.

```tsx
<Badge content="5"><Avatar name="JD" /></Badge>
<Badge content="99+"><Avatar name="JD" /></Badge>
<Badge content="NEW"><Avatar name="JD" /></Badge>
<Badge content={<Text>★</Text>}><Avatar name="JD" /></Badge>
```

### Dot Badge

Display badge as a simple dot indicator.

```tsx
<Badge isDot color="success">
  <Avatar name="John Doe" />
</Badge>

<Badge isDot color="danger">
  <Avatar name="Jane Smith" />
</Badge>
```

### Disable Outline

By default, badges have an outline when placed over children. Disable it with `disableOutline` or `showOutline={false}`.

```tsx
<Badge content="5" disableOutline>
  <Avatar name="JD" />
</Badge>

<Badge content="5" showOutline={false}>
  <Avatar name="JD" />
</Badge>
```

### One Character Optimization

Optimize display for single character content with `isOneChar`.

```tsx
<Badge content="1" isOneChar shape="circle">
  <Avatar name="JD" />
</Badge>
```

---

## API Reference

### Badge Props

| Prop               | Type                                                                          | Default       | Description                  |
| ------------------ | ----------------------------------------------------------------------------- | ------------- | ---------------------------- |
| `children`         | `ReactNode`                                                                   | -             | Content to wrap with badge   |
| `content`          | `string \| number \| ReactNode`                                               | -             | Badge content                |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'`   | Badge color                  |
| `variant`          | `'solid' \| 'flat' \| 'faded' \| 'shadow'`                                    | `'solid'`     | Badge variant                |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | `'md'`        | Badge size                   |
| `shape`            | `'circle' \| 'rectangle'`                                                     | `'rectangle'` | Badge shape                  |
| `placement`        | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'`                | `'top-right'` | Badge position               |
| `isInvisible`      | `boolean`                                                                     | `false`       | Hide badge                   |
| `isDot`            | `boolean`                                                                     | `false`       | Show as dot                  |
| `showOutline`      | `boolean`                                                                     | `true`        | Show outline                 |
| `disableOutline`   | `boolean`                                                                     | `false`       | Disable outline (deprecated) |
| `disableAnimation` | `boolean`                                                                     | `false`       | Disable animations           |
| `isOneChar`        | `boolean`                                                                     | `false`       | Optimize for single char     |
| `style`            | `StyleProp<ViewStyle>`                                                        | -             | Custom badge style           |
| `classNames`       | `{ base?: StyleProp; badge?: StyleProp }`                                     | -             | Custom styles for slots      |

---

## Accessibility

### Best Practices

Don't rely solely on badge content for announcements. Provide descriptive labels:

```tsx
<View accessibilityLabel="5 unread notifications">
  <Badge content="5" color="danger">
    <Icon name="bell" />
  </Badge>
</View>
```

Or use the badge with accessible children:

```tsx
<Badge content="3" color="primary">
  <Button accessibilityLabel="Messages, 3 unread">Messages</Button>
</Badge>
```

---

## Examples

### Notification Badge

```tsx
import React from 'react';
import { View } from 'react-native';
import { Badge, Avatar, Button } from 'react-native-heroui';

export default function NotificationBadge() {
  const unreadCount = 5;

  return (
    <View style={{ flexDirection: 'row', gap: 20, padding: 20 }}>
      <Badge content={unreadCount} color="danger">
        <Avatar name="John Doe" />
      </Badge>

      <Badge content="99+" color="danger" size="md">
        <Button variant="outline">Inbox</Button>
      </Badge>
    </View>
  );
}
```

### Status Indicators with Dot

```tsx
import { Badge, Avatar } from 'react-native-heroui';

<View style={{ flexDirection: 'row', gap: 16 }}>
  <Badge isDot color="success" placement="bottom-right">
    <Avatar name="Online User" />
  </Badge>

  <Badge isDot color="warning" placement="bottom-right">
    <Avatar name="Away User" />
  </Badge>

  <Badge isDot color="danger" placement="bottom-right">
    <Avatar name="Busy User" />
  </Badge>

  <Badge isDot color="default" placement="bottom-right">
    <Avatar name="Offline User" />
  </Badge>
</View>;
```

### All Variants

```tsx
<View style={{ flexDirection: 'row', gap: 16 }}>
  <Badge content="5" variant="solid" color="primary">
    <Avatar name="Solid" />
  </Badge>

  <Badge content="5" variant="flat" color="primary">
    <Avatar name="Flat" />
  </Badge>

  <Badge content="5" variant="faded" color="primary">
    <Avatar name="Faded" />
  </Badge>

  <Badge content="5" variant="shadow" color="primary">
    <Avatar name="Shadow" />
  </Badge>
</View>
```

### All Shapes and Sizes

```tsx
<View style={{ gap: 16 }}>
  {/* Circle shapes */}
  <View style={{ flexDirection: 'row', gap: 16 }}>
    <Badge content="5" shape="circle" size="sm">
      <Avatar />
    </Badge>
    <Badge content="5" shape="circle" size="md">
      <Avatar />
    </Badge>
    <Badge content="5" shape="circle" size="lg">
      <Avatar />
    </Badge>
  </View>

  {/* Rectangle shapes */}
  <View style={{ flexDirection: 'row', gap: 16 }}>
    <Badge content="5" shape="rectangle" size="sm">
      <Avatar />
    </Badge>
    <Badge content="5" shape="rectangle" size="md">
      <Avatar />
    </Badge>
    <Badge content="5" shape="rectangle" size="lg">
      <Avatar />
    </Badge>
  </View>
</View>
```

### Complete Example

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge, Avatar, Button, HeroUIProvider } from 'react-native-heroui';

function BadgeExample() {
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [showBadge, setShowBadge] = useState(true);

  return (
    <View style={styles.container}>
      {/* Notification count */}
      <Badge content={unreadMessages} color="danger">
        <Avatar name="John Doe" size="lg" />
      </Badge>

      {/* Status dot */}
      <Badge isDot color="success" placement="bottom-right">
        <Avatar name="Jane Smith" size="lg" />
      </Badge>

      {/* With button */}
      <Badge content="NEW" color="primary" shape="rectangle">
        <Button variant="outline">Features</Button>
      </Badge>

      {/* Controlled visibility */}
      <View>
        <Badge content="3" isInvisible={!showBadge}>
          <Avatar name="Bob" />
        </Badge>
        <Button onPress={() => setShowBadge(!showBadge)} size="sm">
          Toggle Badge
        </Button>
      </View>

      {/* All placements */}
      <View style={styles.row}>
        <Badge content="↗" placement="top-right">
          <Avatar name="TR" />
        </Badge>
        <Badge content="↖" placement="top-left">
          <Avatar name="TL" />
        </Badge>
        <Badge content="↘" placement="bottom-right">
          <Avatar name="BR" />
        </Badge>
        <Badge content="↙" placement="bottom-left">
          <Avatar name="BL" />
        </Badge>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <BadgeExample />
    </HeroUIProvider>
  );
}
```

---

## TypeScript

```tsx
import type {
  BadgeProps,
  BadgeColor,
  BadgeVariant,
  BadgeSize,
  BadgeShape,
  BadgePlacement,
} from 'react-native-heroui';

const color: BadgeColor = 'danger';
const variant: BadgeVariant = 'solid';
const size: BadgeSize = 'md';
const shape: BadgeShape = 'circle';
const placement: BadgePlacement = 'top-right';
```

---

Built with ❤️ for React Native
