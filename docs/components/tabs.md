# Tabs Component

Tabs organize content into multiple sections and allow users to navigate between them with smooth animations.

Based on [HeroUI Tabs](https://www.heroui.com/docs/components/tabs).

## Import

```tsx
import { Tabs, Tab } from 'react-native-heroui';
```

## Usage

### Basic

```tsx
<Tabs>
  <Tab tabKey="profile" title="Profile">
    <Text>Profile content</Text>
  </Tab>
  <Tab tabKey="settings" title="Settings">
    <Text>Settings content</Text>
  </Tab>
  <Tab tabKey="notifications" title="Notifications">
    <Text>Notifications content</Text>
  </Tab>
</Tabs>
```

### Variants

```tsx
// Solid (default)
<Tabs variant="solid" color="primary">
  <Tab tabKey="1" title="Tab 1">Content 1</Tab>
  <Tab tabKey="2" title="Tab 2">Content 2</Tab>
</Tabs>

// Underlined
<Tabs variant="underlined" color="secondary">
  <Tab tabKey="1" title="Tab 1">Content 1</Tab>
  <Tab tabKey="2" title="Tab 2">Content 2</Tab>
</Tabs>

// Bordered
<Tabs variant="bordered" color="success">
  <Tab tabKey="1" title="Tab 1">Content 1</Tab>
  <Tab tabKey="2" title="Tab 2">Content 2</Tab>
</Tabs>

// Light
<Tabs variant="light" color="warning">
  <Tab tabKey="1" title="Tab 1">Content 1</Tab>
  <Tab tabKey="2" title="Tab 2">Content 2</Tab>
</Tabs>
```

### Colors

```tsx
<Tabs color="primary">...</Tabs>
<Tabs color="secondary">...</Tabs>
<Tabs color="success">...</Tabs>
<Tabs color="warning">...</Tabs>
<Tabs color="danger">...</Tabs>
```

### Sizes

```tsx
<Tabs size="sm">...</Tabs>
<Tabs size="md">...</Tabs>
<Tabs size="lg">...</Tabs>
```

### Controlled

```tsx
function ControlledTabs() {
  const [selected, setSelected] = useState('profile');

  return (
    <>
      <Tabs selectedKey={selected} onSelectionChange={setSelected}>
        <Tab tabKey="profile" title="Profile">
          <Text>Profile content</Text>
        </Tab>
        <Tab tabKey="settings" title="Settings">
          <Text>Settings content</Text>
        </Tab>
      </Tabs>

      <Text>Selected: {selected}</Text>
    </>
  );
}
```

### Disabled

```tsx
// Disable all tabs
<Tabs isDisabled>
  <Tab tabKey="1" title="Tab 1">Content</Tab>
  <Tab tabKey="2" title="Tab 2">Content</Tab>
</Tabs>

// Disable specific tabs
<Tabs disabledKeys={['tab2']}>
  <Tab tabKey="tab1" title="Enabled">Content</Tab>
  <Tab tabKey="tab2" title="Disabled">Content</Tab>
</Tabs>

// Disable individual tab
<Tabs>
  <Tab tabKey="1" title="Enabled">Content</Tab>
  <Tab tabKey="2" title="Disabled" isDisabled>Content</Tab>
</Tabs>
```

### With Icons

```tsx
<Tabs>
  <Tab tabKey="photos" title="Photos" icon={<Text>📷</Text>}>
    <Text>Photos content</Text>
  </Tab>
  <Tab tabKey="videos" title="Videos" icon={<Text>🎬</Text>}>
    <Text>Videos content</Text>
  </Tab>
  <Tab tabKey="music" title="Music" icon={<Text>🎵</Text>}>
    <Text>Music content</Text>
  </Tab>
</Tabs>
```

### Full Width

```tsx
<Tabs fullWidth>
  <Tab tabKey="1" title="Tab 1">
    Content 1
  </Tab>
  <Tab tabKey="2" title="Tab 2">
    Content 2
  </Tab>
  <Tab tabKey="3" title="Tab 3">
    Content 3
  </Tab>
</Tabs>
```

### Placement

```tsx
// Top (default)
<Tabs placement="top">...</Tabs>

// Bottom
<Tabs placement="bottom">...</Tabs>
```

### Dynamic Items

```tsx
const tabs = [
  { key: 'world', title: 'World', content: 'World news content' },
  { key: 'sports', title: 'Sports', content: 'Sports news content' },
  { key: 'tech', title: 'Tech', content: 'Tech news content' },
];

<Tabs items={tabs} />;
```

### Disable Animations

```tsx
// Disable cursor animation
<Tabs disableCursorAnimation>
  <Tab tabKey="1" title="Tab 1">Content</Tab>
  <Tab tabKey="2" title="Tab 2">Content</Tab>
</Tabs>

// Disable all animations
<Tabs disableAnimation>
  <Tab tabKey="1" title="Tab 1">Content</Tab>
  <Tab tabKey="2" title="Tab 2">Content</Tab>
</Tabs>
```

## API

### Tabs Props

| Prop                      | Type                    | Default     | Description                                  |
| ------------------------- | ----------------------- | ----------- | -------------------------------------------- |
| `items`                   | `TabItem[]`             | -           | Array of tab items (alternative to children) |
| `children`                | `ReactNode`             | -           | Tab components                               |
| `variant`                 | `TabsVariant`           | `"solid"`   | Visual variant                               |
| `color`                   | `TabsColor`             | `"primary"` | Color theme                                  |
| `size`                    | `TabsSize`              | `"md"`      | Size variant                                 |
| `radius`                  | `TabsRadius`            | `"md"`      | Border radius                                |
| `fullWidth`               | `boolean`               | `false`     | Make tabs full width                         |
| `placement`               | `TabsPlacement`         | `"top"`     | Position of tab list                         |
| `isVertical`              | `boolean`               | `false`     | Vertical orientation                         |
| `selectedKey`             | `string`                | -           | Controlled selected key                      |
| `defaultSelectedKey`      | `string`                | -           | Default selected key                         |
| `disabledKeys`            | `string[]`              | `[]`        | Array of disabled keys                       |
| `isDisabled`              | `boolean`               | `false`     | Disable all tabs                             |
| `disableCursorAnimation`  | `boolean`               | `false`     | Disable cursor animation                     |
| `disableAnimation`        | `boolean`               | `false`     | Disable all animations                       |
| `destroyInactiveTabPanel` | `boolean`               | `true`      | Unmount inactive panels                      |
| `onSelectionChange`       | `(key: string) => void` | -           | Selection change handler                     |
| `classNames`              | `object`                | -           | Custom styles                                |
| `style`                   | `StyleProp<ViewStyle>`  | -           | Custom style                                 |

### Tab Props

| Prop         | Type        | Default      | Description           |
| ------------ | ----------- | ------------ | --------------------- |
| `tabKey`     | `string`    | **required** | Unique tab identifier |
| `title`      | `ReactNode` | **required** | Tab title             |
| `children`   | `ReactNode` | **required** | Tab content           |
| `icon`       | `ReactNode` | -            | Tab icon              |
| `isDisabled` | `boolean`   | `false`      | Disable this tab      |

### TabsVariant

```typescript
type TabsVariant = 'solid' | 'bordered' | 'light' | 'underlined';
```

### TabsColor

```typescript
type TabsColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
```

### TabsSize

```typescript
type TabsSize = 'sm' | 'md' | 'lg';
```

### TabsPlacement

```typescript
type TabsPlacement = 'top' | 'bottom' | 'start' | 'end';
```

## Animations

The Tabs component includes smooth animations powered by Reanimated:

- **Cursor Animation**: Smoothly slides between tabs with spring physics
- **Instant Tab Switching**: Content changes immediately for best UX
- **60fps+ Performance**: Runs on UI thread

### Cursor Animation

The animated cursor that follows the selected tab uses:

- Spring physics for natural movement
- Smooth width transitions
- Fade in/out effects

```typescript
// Spring configuration
withSpring(targetPosition, {
  damping: 20,
  stiffness: 200,
});
```

## Accessibility

- Keyboard navigation support
- Screen reader friendly
- Proper ARIA attributes
- Focus management

## Examples

See the example app for live demos:

```bash
cd example
yarn start
```

## Related Components

- [Button](./button.md)
- [Card](./card.md)
- [Divider](./divider.md)
