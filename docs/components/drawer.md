# Drawer Component

A high-performance side navigation panel with smooth gesture-driven animations built on React Native Reanimated and Gesture Handler.

## Features

- ✅ **Smooth 60fps Animations** - Powered by Reanimated 3
- ✅ **Pan Gesture Support** - Natural swipe-to-close interactions
- ✅ **4 Placements** - Left, Right, Top, Bottom
- ✅ **Multiple Sizes** - xs, sm, md, lg, xl, full, or custom pixels
- ✅ **Backdrop Control** - Transparent, opaque, or blur variants
- ✅ **Gesture-Driven** - Swipe from edge to dismiss
- ✅ **Nested Components** - Header, Body, Footer structure
- ✅ **Theme Integration** - Respects light/dark themes
- ✅ **TypeScript** - Fully typed with autocomplete
- ✅ **Accessibility** - Screen reader friendly

## Installation

```bash
# Peer dependencies (if not installed)
npm install react-native-reanimated react-native-gesture-handler

# Configure babel.config.js
module.exports = {
  plugins: ['react-native-reanimated/plugin'], // Must be last!
};
```

## Basic Usage

```tsx
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from 'react-native-heroui';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Menu</Button>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="left"
        size="md"
      >
        <DrawerHeader showCloseButton>
          <Text>Navigation</Text>
        </DrawerHeader>

        <DrawerBody>
          <Text>Menu items go here...</Text>
        </DrawerBody>

        <DrawerFooter>
          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
}
```

## Placements

Control which edge the drawer slides from:

```tsx
// Left drawer (default)
<Drawer placement="left" isOpen={isOpen} onClose={onClose}>
  {/* Content */}
</Drawer>

// Right drawer
<Drawer placement="right" isOpen={isOpen} onClose={onClose}>
  {/* Content */}
</Drawer>

// Top drawer
<Drawer placement="top" isOpen={isOpen} onClose={onClose}>
  {/* Content */}
</Drawer>

// Bottom drawer (similar to BottomSheet)
<Drawer placement="bottom" isOpen={isOpen} onClose={onClose}>
  {/* Content */}
</Drawer>
```

## Sizes

```tsx
// Preset sizes (percentage of screen)
<Drawer size="xs">    {/* 50% */}
<Drawer size="sm">    {/* 65% */}
<Drawer size="md">    {/* 75% */}
<Drawer size="lg">    {/* 85% */}
<Drawer size="xl">    {/* 95% */}
<Drawer size="full">  {/* 100% */}

// Custom size in pixels
<Drawer size={300}>   {/* 300px */}
</Drawer>
```

## Backdrop Variants

```tsx
// Opaque backdrop (default)
<Drawer backdrop="opaque">
  {/* Content */}
</Drawer>

// Transparent backdrop
<Drawer backdrop="transparent">
  {/* Content */}
</Drawer>

// Blur backdrop (iOS style)
<Drawer backdrop="blur">
  {/* Content */}
</Drawer>

// No backdrop
<Drawer showBackdrop={false}>
  {/* Content */}
</Drawer>
```

## Gesture Control

```tsx
// Enable all gestures (default)
<Drawer
  closeOnSwipe={true}
  closeOnBackdropPress={true}
>
  {/* Content */}
</Drawer>

// Disable gestures (controlled only)
<Drawer
  disablePanGesture={true}
  closeOnSwipe={false}
  closeOnBackdropPress={false}
>
  {/* Content */}
</Drawer>
```

## Advanced Examples

### Navigation Menu

```tsx
function NavigationDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  const menuItems = [
    { label: 'Home', icon: '🏠', route: 'Home' },
    { label: 'Profile', icon: '👤', route: 'Profile' },
    { label: 'Settings', icon: '⚙️', route: 'Settings' },
    { label: 'Help', icon: '❓', route: 'Help' },
  ];

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      placement="left"
      size="md"
    >
      <DrawerHeader showCloseButton>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Menu</Text>
      </DrawerHeader>

      <DrawerBody>
        {menuItems.map((item) => (
          <Pressable
            key={item.route}
            onPress={() => {
              navigation.navigate(item.route);
              setIsOpen(false);
            }}
            style={{ padding: 16, borderBottomWidth: 1 }}
          >
            <Text style={{ fontSize: 16 }}>
              {item.icon} {item.label}
            </Text>
          </Pressable>
        ))}
      </DrawerBody>

      <DrawerFooter>
        <Text style={{ fontSize: 12, opacity: 0.6 }}>Version 1.0.0</Text>
      </DrawerFooter>
    </Drawer>
  );
}
```

### Settings Drawer

```tsx
function SettingsDrawer() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm">
      <DrawerHeader showCloseButton>
        <Text>Settings</Text>
      </DrawerHeader>

      <DrawerBody scrollable={false}>
        <View style={{ gap: 16 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>Notifications</Text>
            <Switch value={notifications} onChange={setNotifications} />
          </View>
          <Divider />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>Dark Mode</Text>
            <Switch value={darkMode} onChange={setDarkMode} />
          </View>
        </View>
      </DrawerBody>

      <DrawerFooter>
        <Button onPress={onClose} fullWidth>
          Done
        </Button>
      </DrawerFooter>
    </Drawer>
  );
}
```

### Filter Drawer

```tsx
function FilterDrawer() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(50);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      size="lg"
      backdrop="blur"
    >
      <DrawerHeader showCloseButton>
        <Text>Filters</Text>
      </DrawerHeader>

      <DrawerBody>
        <View style={{ gap: 20 }}>
          <View>
            <Text style={{ fontWeight: '600', marginBottom: 12 }}>
              Category
            </Text>
            <RadioGroup value={selectedCategory} onChange={setSelectedCategory}>
              <Radio value="all">All Products</Radio>
              <Radio value="electronics">Electronics</Radio>
              <Radio value="clothing">Clothing</Radio>
              <Radio value="books">Books</Radio>
            </RadioGroup>
          </View>

          <Divider />

          <View>
            <Text style={{ fontWeight: '600', marginBottom: 12 }}>
              Price Range: ${priceRange}
            </Text>
            <Slider
              value={priceRange}
              onChange={setPriceRange}
              minValue={0}
              maxValue={100}
              showValue
            />
          </View>
        </View>
      </DrawerBody>

      <DrawerFooter>
        <View style={{ gap: 8 }}>
          <Button onPress={handleApply} fullWidth>
            Apply Filters
          </Button>
          <Button variant="ghost" onPress={handleReset} fullWidth>
            Reset
          </Button>
        </View>
      </DrawerFooter>
    </Drawer>
  );
}
```

## Custom Styling

{% raw %}

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  classNames={{
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
      backgroundColor: '#1a1a1a',
    },
    content: {
      paddingHorizontal: 20,
    },
  }}
>
  {/* Content */}
</Drawer>
```

{% endraw %}

## Props Reference

### Drawer Props

| Prop                   | Type                                     | Default    | Description            |
| ---------------------- | ---------------------------------------- | ---------- | ---------------------- |
| `isOpen`               | `boolean`                                | required   | Controls visibility    |
| `onClose`              | `() => void`                             | required   | Close handler          |
| `placement`            | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'`   | Edge to slide from     |
| `size`                 | `DrawerSize \| number`                   | `'md'`     | Drawer size (% or px)  |
| `showBackdrop`         | `boolean`                                | `true`     | Enable backdrop        |
| `backdrop`             | `'transparent' \| 'opaque' \| 'blur'`    | `'opaque'` | Backdrop variant       |
| `closeOnBackdropPress` | `boolean`                                | `true`     | Close on backdrop tap  |
| `closeOnSwipe`         | `boolean`                                | `true`     | Close on swipe         |
| `disablePanGesture`    | `boolean`                                | `false`    | Disable pan gesture    |
| `disableAnimation`     | `boolean`                                | `false`    | Disable animations     |
| `classNames`           | `object`                                 | `{}`       | Custom styles          |
| `onAnimationEnd`       | `() => void`                             | -          | Animation end callback |

### DrawerHeader Props

| Prop              | Type                   | Default  | Description       |
| ----------------- | ---------------------- | -------- | ----------------- |
| `children`        | `ReactNode`            | required | Header content    |
| `showCloseButton` | `boolean`              | `false`  | Show close button |
| `style`           | `StyleProp<ViewStyle>` | -        | Custom style      |

### DrawerBody Props

| Prop         | Type                   | Default  | Description      |
| ------------ | ---------------------- | -------- | ---------------- |
| `children`   | `ReactNode`            | required | Body content     |
| `scrollable` | `boolean`              | `true`   | Enable scrolling |
| `style`      | `StyleProp<ViewStyle>` | -        | Custom style     |

### DrawerFooter Props

| Prop       | Type                   | Default  | Description    |
| ---------- | ---------------------- | -------- | -------------- |
| `children` | `ReactNode`            | required | Footer content |
| `style`    | `StyleProp<ViewStyle>` | -        | Custom style   |

## Common Patterns

### Hamburger Menu

```tsx
<Button onPress={() => setDrawerOpen(true)}>☰</Button>

<Drawer placement="left" isOpen={isDrawerOpen} onClose={onClose}>
  <DrawerBody>
    <NavigationLinks />
  </DrawerBody>
</Drawer>
```

### Settings Panel

```tsx
<Drawer placement="right" size="sm">
  <DrawerHeader>Settings</DrawerHeader>
  <DrawerBody>
    <SettingsForm />
  </DrawerBody>
</Drawer>
```

### Notifications Panel

```tsx
<Drawer placement="right" size={350}>
  <DrawerHeader>Notifications</DrawerHeader>
  <DrawerBody>
    <NotificationList />
  </DrawerBody>
</Drawer>
```

## Accessibility

```tsx
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  // Automatically adds:
  // - accessible={true}
  // - accessibilityRole="menu"
  // - accessibilityModal={true}
>
  {/* Content */}
</Drawer>
```

## Performance Tips

1. **Use appropriate size** - Don't make drawers too large
2. **Lazy load content** - Load drawer content only when needed
3. **Memoize components** - Use React.memo for heavy content
4. **Disable animations** during development for faster iteration
5. **Non-scrollable for simple menus** - Use `scrollable={false}`

## Troubleshooting

### Drawer not appearing

- Ensure `isOpen` is `true`
- Check that `GestureHandlerRootView` wraps your app
- Verify Reanimated is properly configured in `babel.config.js`

### Gesture not working

- Make sure `disablePanGesture` is `false`
- Check that `react-native-gesture-handler` is installed
- On Android, ensure `MainActivity` is properly configured

### Animation stuttering

- Check for expensive renders in drawer content
- Memoize child components
- Reduce drawer size if too large

## Related Components

- [BottomSheet](./bottomsheet.md) - Bottom sliding panel
- [Modal](./modal.md) - Full-screen dialogs
- [Tooltip](./tooltip.md) - Contextual information

## Links

- [Component Source](../../src/components/Drawer/Drawer.tsx)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
