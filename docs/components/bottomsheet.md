# BottomSheet Component

A high-performance, gesture-driven bottom sheet component with smooth animations built on React Native Reanimated and Gesture Handler.

## Features

- ✅ **Smooth 60fps Animations** - Powered by Reanimated 3
- ✅ **Pan Gesture Support** - Natural drag-to-dismiss interactions
- ✅ **Snap Points** - Multiple snap positions (pixels or percentage)
- ✅ **Backdrop Control** - Transparent, opaque, or blur variants
- ✅ **Drag Handle** - Optional visual drag indicator
- ✅ **Keyboard Aware** - Automatically adjusts for keyboard
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
  BottomSheet,
  BottomSheetHeader,
  BottomSheetBody,
  BottomSheetFooter,
  Button,
} from 'react-native-heroui';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Sheet</Button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        snapPoints={['40%', '80%']}
      >
        <BottomSheetHeader showCloseButton>
          <Text>Bottom Sheet Title</Text>
        </BottomSheetHeader>

        <BottomSheetBody>
          <Text>Content goes here...</Text>
        </BottomSheetBody>

        <BottomSheetFooter>
          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </BottomSheetFooter>
      </BottomSheet>
    </>
  );
}
```

## Snap Points

Define multiple snap positions for the sheet:

```tsx
// Percentage-based (relative to screen height)
<BottomSheet snapPoints={['30%', '60%', '90%']} initialSnapIndex={0}>
  {/* Content */}
</BottomSheet>

// Pixel-based (absolute height)
<BottomSheet snapPoints={[300, 500, 700]} initialSnapIndex={1}>
  {/* Content */}
</BottomSheet>

// Mixed (percentage and pixels)
<BottomSheet snapPoints={['50%', 600, '95%']}>
  {/* Content */}
</BottomSheet>
```

## Backdrop Variants

```tsx
// Opaque backdrop (default)
<BottomSheet backdrop="opaque">
  {/* Content */}
</BottomSheet>

// Transparent backdrop
<BottomSheet backdrop="transparent">
  {/* Content */}
</BottomSheet>

// Blur backdrop (iOS style)
<BottomSheet backdrop="blur">
  {/* Content */}
</BottomSheet>

// No backdrop
<BottomSheet showBackdrop={false}>
  {/* Content */}
</BottomSheet>
```

## Gesture Control

```tsx
// Enable all gestures (default)
<BottomSheet
  closeOnSwipeDown={true}
  closeOnBackdropPress={true}
  showDragHandle={true}
>
  {/* Content */}
</BottomSheet>

// Disable gestures (controlled only)
<BottomSheet
  disablePanGesture={true}
  closeOnSwipeDown={false}
  closeOnBackdropPress={false}
  showDragHandle={false}
>
  {/* Content */}
</BottomSheet>
```

## Callbacks

```tsx
<BottomSheet
  isOpen={isOpen}
  onClose={() => console.log('Sheet closed')}
  onSnapChange={(index) => console.log(`Snapped to index: ${index}`)}
  onAnimationEnd={() => console.log('Animation completed')}
>
  {/* Content */}
</BottomSheet>
```

## Header Options

```tsx
// With close button (right side)
<BottomSheetHeader showCloseButton>
  <Text>Title</Text>
</BottomSheetHeader>

// Close button on left
<BottomSheetHeader showCloseButton closeButtonPosition="left">
  <Text>Title</Text>
</BottomSheetHeader>

// Custom header
<BottomSheetHeader>
  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <Text>Custom Title</Text>
    <Badge>New</Badge>
  </View>
</BottomSheetHeader>
```

## Body Options

```tsx
// Scrollable body (default)
<BottomSheetBody scrollable={true}>
  <Text>Long content that scrolls...</Text>
</BottomSheetBody>

// Non-scrollable body
<BottomSheetBody scrollable={false}>
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <Text>Fixed content</Text>
  </View>
</BottomSheetBody>
```

## Advanced Examples

### Dynamic Content

```tsx
function DynamicSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      snapPoints={['50%', '90%']}
      onSnapChange={(index) => {
        console.log('Current snap:', index === 0 ? 'Half' : 'Full');
      }}
    >
      <BottomSheetHeader showCloseButton>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Choose Option</Text>
      </BottomSheetHeader>

      <BottomSheetBody>
        {options.map((option) => (
          <Pressable key={option.id} onPress={() => setSelectedOption(option)}>
            <View style={{ padding: 16, borderBottomWidth: 1 }}>
              <Text>{option.label}</Text>
            </View>
          </Pressable>
        ))}
      </BottomSheetBody>

      <BottomSheetFooter>
        <Button
          onPress={() => {
            handleConfirm(selectedOption);
            setIsOpen(false);
          }}
          fullWidth
        >
          Confirm
        </Button>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
```

### Form in BottomSheet

```tsx
function FormSheet() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      snapPoints={['70%']}
      closeOnBackdropPress={false} // Prevent accidental close
    >
      <BottomSheetHeader showCloseButton>
        <Text>User Information</Text>
      </BottomSheetHeader>

      <BottomSheetBody scrollable={false}>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 16 }}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </BottomSheetBody>

      <BottomSheetFooter>
        <Button onPress={handleSubmit} fullWidth>
          Submit
        </Button>
      </BottomSheetFooter>
    </BottomSheet>
  );
}
```

### Share Sheet Pattern

```tsx
function ShareSheet() {
  const shareOptions = [
    { icon: '📱', label: 'SMS', action: () => {} },
    { icon: '📧', label: 'Email', action: () => {} },
    { icon: '🔗', label: 'Copy Link', action: () => {} },
    { icon: '💾', label: 'Save', action: () => {} },
  ];

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      snapPoints={[280]}
      showDragHandle={true}
    >
      <BottomSheetHeader>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600' }}>
          Share via
        </Text>
      </BottomSheetHeader>

      <BottomSheetBody scrollable={false}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {shareOptions.map((option) => (
            <Pressable
              key={option.label}
              onPress={() => {
                option.action();
                setIsOpen(false);
              }}
              style={{
                width: '22%',
                alignItems: 'center',
                padding: 12,
              }}
            >
              <Text style={{ fontSize: 32, marginBottom: 8 }}>
                {option.icon}
              </Text>
              <Text style={{ fontSize: 12, textAlign: 'center' }}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetBody>
    </BottomSheet>
  );
}
```

## Custom Styling

```tsx
<BottomSheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  classNames={{
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    container: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: '#1a1a1a',
    },
    content: {
      paddingHorizontal: 20,
    },
    dragHandle: {
      width: 60,
      height: 6,
      backgroundColor: '#666',
    },
  }}
>
  {/* Content */}
</BottomSheet>
```

## Props Reference

### BottomSheet Props

| Prop                   | Type                                  | Default          | Description              |
| ---------------------- | ------------------------------------- | ---------------- | ------------------------ |
| `isOpen`               | `boolean`                             | required         | Controls visibility      |
| `onClose`              | `() => void`                          | required         | Close handler            |
| `snapPoints`           | `BottomSheetSnapPoint[]`              | `['50%', '90%']` | Snap positions (px or %) |
| `initialSnapIndex`     | `number`                              | `0`              | Initial snap point index |
| `showBackdrop`         | `boolean`                             | `true`           | Enable backdrop          |
| `backdrop`             | `'transparent' \| 'opaque' \| 'blur'` | `'opaque'`       | Backdrop variant         |
| `closeOnBackdropPress` | `boolean`                             | `true`           | Close on backdrop tap    |
| `closeOnSwipeDown`     | `boolean`                             | `true`           | Close on swipe down      |
| `showDragHandle`       | `boolean`                             | `true`           | Show drag handle         |
| `disablePanGesture`    | `boolean`                             | `false`          | Disable pan gesture      |
| `disableAnimation`     | `boolean`                             | `false`          | Disable animations       |
| `classNames`           | `object`                              | `{}`             | Custom styles            |
| `onSnapChange`         | `(index: number) => void`             | -                | Snap change callback     |
| `onAnimationEnd`       | `() => void`                          | -                | Animation end callback   |

### BottomSheetHeader Props

| Prop                  | Type                   | Default   | Description           |
| --------------------- | ---------------------- | --------- | --------------------- |
| `children`            | `ReactNode`            | required  | Header content        |
| `showCloseButton`     | `boolean`              | `false`   | Show close button     |
| `closeButtonPosition` | `'left' \| 'right'`    | `'right'` | Close button position |
| `style`               | `StyleProp<ViewStyle>` | -         | Custom style          |

### BottomSheetBody Props

| Prop         | Type                   | Default  | Description      |
| ------------ | ---------------------- | -------- | ---------------- |
| `children`   | `ReactNode`            | required | Body content     |
| `scrollable` | `boolean`              | `true`   | Enable scrolling |
| `style`      | `StyleProp<ViewStyle>` | -        | Custom style     |

### BottomSheetFooter Props

| Prop       | Type                   | Default  | Description    |
| ---------- | ---------------------- | -------- | -------------- |
| `children` | `ReactNode`            | required | Footer content |
| `style`    | `StyleProp<ViewStyle>` | -        | Custom style   |

## Performance Tips

1. **Use initialSnapIndex** - Start at appropriate height
2. **Disable animations** during development for faster iteration
3. **Memoize callbacks** - Use `useCallback` for event handlers
4. **Optimize snap points** - Fewer snap points = smoother gestures
5. **Non-scrollable for forms** - Use `scrollable={false}` for form sheets

## Accessibility

The BottomSheet includes built-in accessibility support:

```tsx
<BottomSheet
  isOpen={isOpen}
  onClose={onClose}
  // Automatically adds:
  // - accessible={true}
  // - accessibilityRole="dialog"
  // - accessibilityModal={true}
>
  {/* Content */}
</BottomSheet>
```

## Common Patterns

### Filter/Sort Sheet

```tsx
<BottomSheet snapPoints={['40%']}>
  <BottomSheetHeader>Filter & Sort</BottomSheetHeader>
  <BottomSheetBody>
    <RadioGroup value={sortBy} onChange={setSortBy}>
      <Radio value="price">Price</Radio>
      <Radio value="date">Date</Radio>
    </RadioGroup>
  </BottomSheetBody>
</BottomSheet>
```

### Action Menu

```tsx
<BottomSheet snapPoints={[250]}>
  <BottomSheetBody scrollable={false}>
    <Button variant="ghost" onPress={handleEdit}>
      Edit
    </Button>
    <Button variant="ghost" onPress={handleShare}>
      Share
    </Button>
    <Button variant="ghost" onPress={handleDelete}>
      Delete
    </Button>
  </BottomSheetBody>
</BottomSheet>
```

### Media Picker

```tsx
<BottomSheet snapPoints={['30%', '90%']}>
  <BottomSheetHeader>Select Media</BottomSheetHeader>
  <BottomSheetBody>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {media.map((item) => (
        <Image key={item.id} source={item.uri} />
      ))}
    </View>
  </BottomSheetBody>
</BottomSheet>
```

## Troubleshooting

### Sheet not appearing

- Ensure `isOpen` is `true`
- Check that `GestureHandlerRootView` wraps your app
- Verify Reanimated is properly configured in `babel.config.js`

### Gesture not working

- Make sure `disablePanGesture` is `false`
- Check that `react-native-gesture-handler` is installed
- On Android, ensure `MainActivity` is properly configured

### Animation stuttering

- Reduce number of snap points
- Disable animations during development
- Check for expensive renders in child components

## Related Components

- [Modal](./modal.md) - Full-screen dialogs
- [Toast](./toast.md) - Temporary notifications
- [Tooltip](./tooltip.md) - Contextual information

## Links

- [Component Source](../../src/components/BottomSheet/BottomSheet.tsx)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
