# Card

Container component with header, body, and footer sections for organized content display.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Card, CardHeader, CardBody, CardFooter } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
<Card>
  <CardBody>
    <Text>Card content goes here</Text>
  </CardBody>
</Card>
```

### With Header and Footer

```tsx
<Card>
  <CardHeader>
    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Card Title</Text>
  </CardHeader>
  <CardBody>
    <Text>Card content goes here</Text>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Variants

```tsx
<Card variant="elevated">
  <CardBody><Text>Elevated Card</Text></CardBody>
</Card>

<Card variant="flat">
  <CardBody><Text>Flat Card</Text></CardBody>
</Card>

<Card variant="bordered">
  <CardBody><Text>Bordered Card</Text></CardBody>
</Card>
```

### Pressable Card

```tsx
<Card isPressable onPress={() => console.log('Pressed')}>
  <CardBody>
    <Text>Click me!</Text>
  </CardBody>
</Card>
```

### Complete Example

```tsx
<Card variant="elevated">
  <CardHeader>
    <Text style={{ fontSize: 20, fontWeight: '600' }}>Profile Card</Text>
  </CardHeader>
  <CardBody>
    <Avatar name="John Doe" size="lg" />
    <Text>Software Engineer at Tech Co</Text>
  </CardBody>
  <CardFooter>
    <Button variant="ghost">View Profile</Button>
    <Button variant="solid">Message</Button>
  </CardFooter>
</Card>
```

---

## API Reference

### Card Props

| Prop             | Type                                 | Default      | Description               |
| ---------------- | ------------------------------------ | ------------ | ------------------------- |
| `children`       | `ReactNode`                          | -            | Card content              |
| `variant`        | `'elevated' \| 'flat' \| 'bordered'` | `'elevated'` | Card variant              |
| `isPressable`    | `boolean`                            | `false`      | Whether card is pressable |
| `onPress`        | `() => void`                         | -            | Press handler             |
| `disablePadding` | `boolean`                            | `false`      | Disable default padding   |
| `style`          | `StyleProp<ViewStyle>`               | -            | Custom card style         |

### CardHeader Props

| Prop       | Type                   | Description    |
| ---------- | ---------------------- | -------------- |
| `children` | `ReactNode`            | Header content |
| `style`    | `StyleProp<ViewStyle>` | Header style   |

### CardBody Props

| Prop       | Type                   | Description  |
| ---------- | ---------------------- | ------------ |
| `children` | `ReactNode`            | Body content |
| `style`    | `StyleProp<ViewStyle>` | Body style   |

### CardFooter Props

| Prop       | Type                   | Description    |
| ---------- | ---------------------- | -------------- |
| `children` | `ReactNode`            | Footer content |
| `style`    | `StyleProp<ViewStyle>` | Footer style   |

---

Built with ❤️ for React Native
