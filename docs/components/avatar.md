# Avatar

User profile image component with automatic fallback to initials.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Avatar } from 'react-native-heroui';
```

## Usage

### With Name (Shows Initials)

```tsx
<Avatar name="John Doe" />
```

### With Image

```tsx
<Avatar name="John Doe" src="https://example.com/avatar.jpg" />
```

### Sizes

```tsx
<Avatar name="JD" size="sm" />
<Avatar name="JD" size="md" />
<Avatar name="JD" size="lg" />
<Avatar name="JD" size="xl" />
```

### Colors

```tsx
<Avatar name="JD" color="primary" />
<Avatar name="JD" color="secondary" />
<Avatar name="JD" color="success" />
<Avatar name="JD" color="warning" />
<Avatar name="JD" color="danger" />
```

### Bordered

```tsx
<Avatar name="John Doe" isBordered />
```

### With Badge

```tsx
import { Avatar, Badge } from 'react-native-heroui';

<Badge showDot color="success" placement="bottom-right">
  <Avatar name="John Doe" size="lg" />
</Badge>;
```

---

## API Reference

### Avatar Props

| Prop         | Type                                                             | Default     | Description                          |
| ------------ | ---------------------------------------------------------------- | ----------- | ------------------------------------ |
| `name`       | `string`                                                         | -           | **Required.** Full name for initials |
| `src`        | `string`                                                         | -           | Image URL                            |
| `size`       | `'sm' \| 'md' \| 'lg' \| 'xl'`                                   | `'md'`      | Avatar size                          |
| `color`      | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Background color                     |
| `isBordered` | `boolean`                                                        | `false`     | Show border                          |
| `style`      | `StyleProp<ViewStyle>`                                           | -           | Custom style                         |

---

## Examples

### Avatar Group

```tsx
<View style={{ flexDirection: 'row', gap: -10 }}>
  <Avatar name="John Doe" size="md" isBordered />
  <Avatar name="Jane Smith" size="md" isBordered />
  <Avatar name="Bob Wilson" size="md" isBordered />
</View>
```

### With Status Badge

```tsx
<Badge showDot color="success" placement="bottom-right">
  <Avatar
    name="John Doe"
    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
    size="lg"
  />
</Badge>
```

---

Built with ❤️ for React Native
