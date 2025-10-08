# Chip

Compact element for displaying tags, categories, or interactive selections.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Chip } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
<Chip>React Native</Chip>
```

### Variants

```tsx
<Chip variant="solid">Solid</Chip>
<Chip variant="flat">Flat</Chip>
<Chip variant="bordered">Bordered</Chip>
<Chip variant="dot">Dot</Chip>
```

### Colors

```tsx
<Chip color="primary">Primary</Chip>
<Chip color="secondary">Secondary</Chip>
<Chip color="success">Success</Chip>
<Chip color="warning">Warning</Chip>
<Chip color="danger">Danger</Chip>
```

### Closeable

```tsx
<Chip color="primary" onClose={() => console.log('Closed')}>
  Closeable Chip
</Chip>
```

### With Dot Variant

```tsx
<Chip variant="dot" color="success">
  Active
</Chip>
```

### Sizes

```tsx
<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>
```

---

## API Reference

### Chip Props

| Prop       | Type                                                             | Default     | Description                        |
| ---------- | ---------------------------------------------------------------- | ----------- | ---------------------------------- |
| `children` | `ReactNode`                                                      | -           | **Required.** Chip content         |
| `variant`  | `'solid' \| 'flat' \| 'bordered' \| 'dot'`                       | `'solid'`   | Chip variant                       |
| `color`    | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Chip color                         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                           | `'md'`      | Chip size                          |
| `onClose`  | `() => void`                                                     | -           | Close handler (shows close button) |
| `style`    | `StyleProp<ViewStyle>`                                           | -           | Custom style                       |

---

## Examples

### Tag List

```tsx
<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  <Chip color="primary">React Native</Chip>
  <Chip color="secondary">TypeScript</Chip>
  <Chip color="success">UI Library</Chip>
  <Chip color="warning">Beta</Chip>
</View>
```

### Status Chips

```tsx
<Chip variant="dot" color="success">Online</Chip>
<Chip variant="dot" color="warning">Away</Chip>
<Chip variant="dot" color="danger">Busy</Chip>
```

### Removable Tags

```tsx
const [tags, setTags] = useState(['React', 'Native', 'UI']);

<View style={{ flexDirection: 'row', gap: 8 }}>
  {tags.map((tag) => (
    <Chip key={tag} onClose={() => setTags(tags.filter((t) => t !== tag))}>
      {tag}
    </Chip>
  ))}
</View>;
```

---

Built with ❤️ for React Native
