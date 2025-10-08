# 🚀 Modern Features

This document highlights the modern features and patterns implemented in React Native HeroUI that align with cutting-edge UI libraries like shadcn/ui, Chakra UI, and Radix UI.

## 🎯 Feature Comparison

| Feature                    | HeroUI | shadcn/ui | Chakra UI | RN Paper | Status      |
| -------------------------- | ------ | --------- | --------- | -------- | ----------- |
| **Style Props**            | ✅     | N/A       | ✅        | ❌       | ✅ Complete |
| **Polymorphic Components** | ✅     | ✅        | ✅        | ❌       | ✅ Complete |
| **Compound Components**    | ✅     | ✅        | ✅        | ✅       | ✅ Complete |
| **Responsive Values**      | ✅     | ✅        | ✅        | ❌       | ✅ Complete |
| **Design Tokens**          | ✅     | ✅        | ✅        | ✅       | ✅ Complete |
| **Dark Mode**              | ✅     | ✅        | ✅        | ✅       | ✅ Complete |
| **TypeScript**             | ✅     | ✅        | ✅        | ✅       | ✅ Complete |
| **Accessibility**          | ✅     | ✅        | ✅        | ✅       | ✅ Complete |
| **Animations**             | ✅     | N/A       | ✅        | ✅       | ✅ Complete |
| **Headless Components**    | 🚧     | ✅        | ✅        | ❌       | 🚧 Planned  |
| **CLI Tool**               | ❌     | ✅        | ❌        | ❌       | 🚧 Planned  |

## ✨ Modern Patterns Implemented

### 1. **Style Props (Chakra UI Pattern)**

Pass theme-aware style props directly to components:

```tsx
<Box bg="primary" p="unit-4" borderRadius="md" shadow="shadow-lg">
  <Text>Styled with props!</Text>
</Box>
```

**Why it's modern:**

- Faster development (no StyleSheet needed)
- Theme-aware out of the box
- Type-safe with autocomplete
- Similar to Tailwind's utility-first approach

### 2. **Polymorphic Box Primitive**

A single component that can render as different elements:

```tsx
// As View
<Box>Content</Box>

// As Text
<Box as="text">Text content</Box>

// As Pressable
<Box as="pressable" onPress={() => {}}>
  Clickable
</Box>
```

**Why it's modern:**

- Reduces API surface (one component, many uses)
- Pattern used by Chakra UI, Radix UI
- Flexible and composable

### 3. **Layout Primitives**

Pre-configured Box components for common layouts:

```tsx
// Vertical stack
<VStack gap="unit-2">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</VStack>

// Horizontal stack
<HStack gap="unit-2" alignItems="center">
  <Icon />
  <Text>Label</Text>
</HStack>

// Centered content
<Center h="100%">
  <Text>Centered</Text>
</Center>
```

**Why it's modern:**

- Common pattern in modern UI libraries
- Reduces boilerplate
- Semantic HTML-like components

### 4. **Responsive Hook System**

React hooks for responsive design:

```tsx
const { breakpoint, width, isAtLeast } = useResponsive();

// Use responsive values
const columns = useResponsiveValue({
  base: 1,
  md: 2,
  lg: 3,
  xl: 4,
});

// Conditional rendering
{
  isAtLeast('md') && <SidePanel />;
}
```

**Why it's modern:**

- Hook-based (React best practice)
- Type-safe responsive values
- Similar to Tailwind breakpoints

### 5. **Disclosure Hook**

Manage open/close state like a pro:

```tsx
const { isOpen, onOpen, onClose, onToggle, getDisclosureProps } =
  useDisclosure();

return (
  <>
    <Button {...getDisclosureProps()}>Toggle</Button>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent />
    </Modal>
  </>
);
```

**Why it's modern:**

- Headless pattern (logic separated from UI)
- Reusable across components
- Chakra UI / Reach UI pattern

### 6. **Color Mode Hook**

Simplified theme management:

```tsx
const { colorMode, toggleColorMode, setColorMode } = useColorMode();

<Button onPress={toggleColorMode}>{colorMode === 'dark' ? '☀️' : '🌙'}</Button>;
```

**Why it's modern:**

- Separation of concerns
- Convenience wrapper
- Common pattern in theme-aware libraries

### 7. **Compound Components**

Components that work together:

```tsx
<Card>
  <CardHeader>
    <Avatar />
    <Text>Title</Text>
  </CardHeader>
  <CardBody>Content here</CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

**Why it's modern:**

- Flexible composition
- Better than prop-heavy APIs
- Used by: shadcn/ui, Radix UI, Reach UI

### 8. **Variant System**

CVA (Class Variance Authority) inspired variants:

```tsx
// Components support variants
<Button variant="solid" size="lg" colorScheme="primary">
  Click Me
</Button>;

// Variants are pure functions
const styles = getButtonStyles(theme, variant, size, colorScheme);
```

**Why it's modern:**

- Similar to CVA (used by shadcn/ui)
- Type-safe
- Composable variants
- Separation of logic and UI

### 9. **Factory Pattern**

Create custom components easily:

```tsx
const CustomBox = createStyledView(
  (theme) => ({
    padding: theme.spacing['unit-4'],
    backgroundColor: theme.colors.content1,
  }),
  (theme, props: { highlighted?: boolean }) => ({
    backgroundColor: props.highlighted
      ? theme.colors.primary
      : theme.colors.content1,
  })
);

<CustomBox highlighted>Content</CustomBox>;
```

**Why it's modern:**

- Reusable component creation
- Theme-aware by default
- Similar to styled-components pattern

### 10. **Full TypeScript Support**

Everything is typed:

```tsx
// Props are fully typed
interface ButtonProps extends Partial<ButtonVariants> {
  children: React.ReactNode;
  onPress?: () => void;
  // ...
}

// Theme tokens are typed
theme.colors['primary-500']; // ✅ Autocomplete
theme.spacing['unit-4']; // ✅ Autocomplete
theme.colors['invalid']; // ❌ TypeScript error
```

**Why it's modern:**

- Best DX (Developer Experience)
- Catch errors at compile time
- IDE autocomplete

## 🆚 Architecture Comparison

### shadcn/ui Philosophy

```
1. Copy component code into your project
2. Modify directly in your codebase
3. Full ownership and control
4. No runtime dependency
```

**Why HeroUI is different:**

- React Native requires native dependencies
- Mobile development benefits from stable packages
- Updates via npm are easier for teams
- **But we provide similar flexibility via:**
  - Exported primitives (Box, Stack, etc.)
  - Factory functions
  - Style props system
  - Theme customization

### Chakra UI Philosophy

```
1. Style props for rapid development
2. Accessible by default
3. Composable components
4. Theme-driven design
```

**How HeroUI aligns:**

- ✅ Style props system
- ✅ Accessibility built-in
- ✅ Compound components
- ✅ Comprehensive theming

## 📊 Modern vs Traditional

### Traditional React Native Library

```tsx
// Lots of StyleSheet.create
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0066FF',
    padding: 16,
    borderRadius: 8,
  },
});

<TouchableOpacity style={styles.button}>
  <Text>Button</Text>
</TouchableOpacity>;
```

### HeroUI Modern Approach

```tsx
// Style props + theme-aware
<Box
  as="pressable"
  bg="primary"
  p="unit-4"
  borderRadius="md"
  onPress={handlePress}
>
  <Text>Button</Text>
</Box>

// Or use pre-built component
<Button variant="solid" colorScheme="primary">
  Button
</Button>
```

## 🎯 Best Practices

### 1. **Composition over Configuration**

❌ **Bad** (Configuration-heavy):

```tsx
<Card
  header="Title"
  headerAvatar="..."
  body="Content"
  footer={<Button />}
  variant="elevated"
/>
```

✅ **Good** (Composition):

```tsx
<Card variant="elevated">
  <CardHeader>
    <Avatar />
    <Text>Title</Text>
  </CardHeader>
  <CardBody>
    <Text>Content</Text>
  </CardBody>
  <CardFooter>
    <Button />
  </CardFooter>
</Card>
```

### 2. **Use Primitives for Custom UI**

❌ **Bad** (Fighting the framework):

```tsx
<View style={StyleSheet.create({...})}>
  <View style={StyleSheet.create({...})}>
    ...
  </View>
</View>
```

✅ **Good** (Using primitives):

```tsx
<Box bg="background" p="unit-4">
  <VStack gap="unit-2">
    <Text>Item 1</Text>
    <Text>Item 2</Text>
  </VStack>
</Box>
```

### 3. **Responsive Design**

❌ **Bad** (Manual breakpoints):

```tsx
const { width } = useWindowDimensions();
const columns = width > 768 ? 3 : width > 480 ? 2 : 1;
```

✅ **Good** (Responsive hook):

```tsx
const columns = useResponsiveValue({
  base: 1,
  md: 2,
  lg: 3,
});
```

## 🚧 Future Enhancements

### Planned Features (v0.2.0)

- [ ] **Headless Components** - Unstyled behavior components
- [ ] **Animation Hooks** - `useAnimation`, `useTransition`
- [ ] **Form System** - Form context and validation
- [ ] **Portal/Overlay** - Modal, Drawer, Tooltip
- [ ] **CLI Tool** - `npx heroui add button`
- [ ] **Storybook** - Interactive component documentation

### Experimental (v0.3.0)

- [ ] **NativeWind Integration** - Tailwind CSS for React Native
- [ ] **Zero Runtime** - Compile-time style extraction
- [ ] **Server Components** - React Native Web support
- [ ] **CSS Variables** - Dynamic theming

## 📚 Learn More

- [Architecture Guide](./ARCHITECTURE.md)
- [Contributing](./CONTRIBUTING.md)
- [API Reference](./README.md)

## 💬 Comparison Summary

**Is HeroUI like shadcn/ui?**

- **Philosophy**: Similar (customizable, developer-first)
- **Distribution**: Different (npm vs copy-paste)
- **Reason**: React Native ecosystem needs npm packages

**Is HeroUI like Chakra UI?**

- **Very similar!** Both have:
  - Style props system
  - Theme-driven design
  - Compound components
  - Accessibility focus

**Is HeroUI modern?**

- ✅ **Yes!** Implements latest React patterns:
  - Hooks-based API
  - TypeScript-first
  - Composable primitives
  - Design tokens
  - Responsive design
  - Accessibility-first

**For React Native, HeroUI's architecture is state-of-the-art!** 🎉
