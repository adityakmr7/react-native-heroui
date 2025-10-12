# Tooltip Component

Display brief, informative messages when users interact with elements.

Based on [HeroUI Tooltip](https://www.heroui.com/docs/components/tooltip).

## Import

```tsx
import { Tooltip, Button } from 'react-native-heroui';
```

## Usage

### Basic

```tsx
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>
```

### With Arrow

```tsx
<Tooltip content="Tooltip with arrow" showArrow>
  <Button>Hover me</Button>
</Tooltip>
```

### Colors

```tsx
<Tooltip content="Default tooltip" color="default">
  <Button>Default</Button>
</Tooltip>

<Tooltip content="Primary tooltip" color="primary">
  <Button>Primary</Button>
</Tooltip>

<Tooltip content="Success tooltip" color="success">
  <Button>Success</Button>
</Tooltip>

<Tooltip content="Warning tooltip" color="warning">
  <Button>Warning</Button>
</Tooltip>

<Tooltip content="Danger tooltip" color="danger">
  <Button>Danger</Button>
</Tooltip>
```

### Placements

```tsx
<Tooltip content="Top" placement="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom" placement="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left" placement="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right" placement="right">
  <Button>Right</Button>
</Tooltip>
```

### Sizes

```tsx
<Tooltip content="Small" size="sm">
  <Button>Small</Button>
</Tooltip>

<Tooltip content="Medium" size="md">
  <Button>Medium</Button>
</Tooltip>

<Tooltip content="Large" size="lg">
  <Button>Large</Button>
</Tooltip>
```

### With Delay

```tsx
<Tooltip content="Opens after 500ms" delay={500}>
  <Button>With Delay</Button>
</Tooltip>

<Tooltip content="Closes after 1s" closeDelay={1000}>
  <Button>Close Delay</Button>
</Tooltip>
```

### Controlled

```tsx
function ControlledExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tooltip
        content="Controlled tooltip"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Button>Controlled</Button>
      </Tooltip>

      <Button onPress={() => setIsOpen(!isOpen)}>Toggle Tooltip</Button>
    </>
  );
}
```

### Custom Content

```tsx
<Tooltip
  content={
    <View>
      <Text style={{ fontWeight: 'bold' }}>Custom Content</Text>
      <Text>You can put anything here!</Text>
    </View>
  }
>
  <Button>Custom</Button>
</Tooltip>
```

### Disabled

```tsx
<Tooltip content="This won't show" isDisabled>
  <Button>Disabled Tooltip</Button>
</Tooltip>
```

## API

### Tooltip Props

| Prop             | Type                        | Default     | Description                       |
| ---------------- | --------------------------- | ----------- | --------------------------------- |
| content          | `ReactNode`                 | -           | Tooltip content (required)        |
| children         | `ReactElement`              | -           | Trigger element (required)        |
| color            | `TooltipColor`              | `"default"` | Tooltip color theme               |
| size             | `TooltipSize`               | `"md"`      | Tooltip size                      |
| placement        | `TooltipPlacement`          | `"top"`     | Where to position the tooltip     |
| showArrow        | `boolean`                   | `false`     | Show arrow pointing to trigger    |
| isOpen           | `boolean`                   | -           | Controlled open state             |
| defaultOpen      | `boolean`                   | `false`     | Default open state (uncontrolled) |
| delay            | `number`                    | `0`         | Delay before showing (ms)         |
| closeDelay       | `number`                    | `500`       | Delay before hiding (ms)          |
| offset           | `number`                    | `7`         | Distance from trigger element     |
| isDisabled       | `boolean`                   | `false`     | Disable the tooltip               |
| disableAnimation | `boolean`                   | `false`     | Disable animations                |
| onOpenChange     | `(isOpen: boolean) => void` | -           | Open state change callback        |
| onClose          | `() => void`                | -           | Close callback                    |
| classNames       | `object`                    | -           | Custom styles for slots           |

### TooltipColor

```typescript
type TooltipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
```

### TooltipSize

```typescript
type TooltipSize = 'sm' | 'md' | 'lg';
```

### TooltipPlacement

```typescript
type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';
```

## Accessibility

- Proper `aria-describedby` support
- Screen reader friendly
- Keyboard navigation support
- Press/hover interactions

## Notes

- Works on both iOS and Android
- Uses Modal for proper layering
- Animated with Reanimated for smooth transitions
- Auto-positions based on available space
- Supports custom content (not just text)

## Examples

See the example app for live demos:

```bash
cd example
yarn start
```

## Related Components

- [Button](./button.md)
- [IconButton](./iconbutton.md) (coming soon)
- [Badge](./badge.md)
- [Popover](./popover.md) (coming soon)
