# Badge

Small status indicator for displaying notifications, counts, and status dots.

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

### With Content (Number)

```tsx
<Badge content="5" color="danger">
  <Icon name="bell" />
</Badge>
```

### Dot Variant

```tsx
<Badge showDot color="success">
  <Avatar name="John Doe" />
</Badge>
```

### With Avatar

```tsx
<Badge content="99+" color="danger" placement="top-right">
  <Avatar name="John Doe" size="lg" />
</Badge>
```

### Colors

```tsx
<Badge content="3" color="primary"><Icon name="mail" /></Badge>
<Badge content="5" color="secondary"><Icon name="bell" /></Badge>
<Badge content="10" color="success"><Icon name="check" /></Badge>
<Badge content="2" color="warning"><Icon name="alert" /></Badge>
<Badge content="1" color="danger"><Icon name="error" /></Badge>
```

### Placement

```tsx
<Badge content="5" placement="top-right"><Icon /></Badge>
<Badge content="5" placement="top-left"><Icon /></Badge>
<Badge content="5" placement="bottom-right"><Icon /></Badge>
<Badge content="5" placement="bottom-left"><Icon /></Badge>
```

---

## API Reference

### Badge Props

| Prop        | Type                                                             | Default       | Description                    |
| ----------- | ---------------------------------------------------------------- | ------------- | ------------------------------ |
| `children`  | `ReactNode`                                                      | -             | **Required.** Content to wrap  |
| `content`   | `string \| number`                                               | -             | Badge content (number/text)    |
| `showDot`   | `boolean`                                                        | `false`       | Show as dot instead of content |
| `color`     | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'danger'`    | Badge color                    |
| `placement` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'`   | `'top-right'` | Badge position                 |
| `style`     | `StyleProp<ViewStyle>`                                           | -             | Custom style                   |

---

## Examples

### Notification Badge

```tsx
<Badge content={notifications.length} color="danger">
  <IconButton icon="bell" />
</Badge>
```

### Status Indicator

```tsx
<Badge showDot color={user.online ? 'success' : 'default'}>
  <Avatar name={user.name} src={user.avatar} />
</Badge>
```

---

Built with ❤️ for React Native
