# React Native HeroUI Documentation

Welcome to the React Native HeroUI documentation! This site provides comprehensive documentation for all **27 production-ready components** and a complete **design token system**.

## 🎨 Design System

### [Themes & Design Tokens](./themes.html)

Comprehensive theming system with 100+ design tokens:

- **Colors** - Semantic color scales (50-900) for light and dark modes
- **Typography** - Font sizes, line heights, and weights
- **Spacing** - Unit-based spacing with 4px base unit
- **Border Radius** - Consistent rounded corners
- **Shadows** - Elevation system for depth

[View Interactive Themes Preview →](./themes.html) | [Read Full Guide →](./themes.md)

---

## 📦 Components

### Form & Input (9)

- [Button](./components/button.html) - Versatile button with Reanimated animations ⚡
- [Input](./components/input.html) - Text input with validation
- [InputOtp](./components/inputotp.html) - OTP/PIN code input
- [Textarea](./components/textarea.html) - Multi-line text input
- [Checkbox](./components/checkbox.html) - Multi-selection control
- [Radio](./components/radio.html) - Single selection radio group
- [Switch](./components/switch.html) - Toggle switches
- [Slider](./components/slider.html) - Range slider with Gesture Handler ⚡
- [Select](./components/select.html) - Dropdown select

### Layout & Navigation (8)

- [Card](./components/card.html) - Container component
- [Divider](./components/divider.html) - Content separator
- [Spacer](./components/spacer.html) - Layout spacing helper
- [Modal](./components/modal.html) - Dialog with custom content
- [Accordion](./components/accordion.html) - Expandable content panels
- [Tabs](./components/tabs.html) - Tabbed navigation with animated cursor ⚡
- [BottomSheet](./components/bottomsheet.html) - Gesture-driven bottom panel ⚡ **NEW**
- [Drawer](./components/drawer.html) - Side navigation with 4 placements ⚡ **NEW**

### Feedback (5)

- [Alert](./components/alert.html) - Feedback and notifications
- [Toast](./components/toast.html) - Temporary notifications
- [Spinner](./components/spinner.html) - Loading indicator
- [Progress](./components/progress.html) - Progress indicator
- [Skeleton](./components/skeleton.html) - Loading placeholder

### Data Display (5)

- [Avatar](./components/avatar.html) - User profile images
- [Badge](./components/badge.html) - Status indicators
- [Chip](./components/chip.html) - Tag and category chips
- [Image](./components/image.html) - Image with loading & fallback
- [Tooltip](./components/tooltip.html) - Informative tooltips ⚡ **NEW**

## 🚀 Quick Start

### Step 1: Install the library

```bash
npm install react-native-heroui
# or
yarn add react-native-heroui
```

### Step 2: Install peer dependencies (for animations)

```bash
# For Expo projects
npx expo install react-native-reanimated react-native-gesture-handler

# For bare React Native projects
npm install react-native-reanimated react-native-gesture-handler
cd ios && pod install
```

### Step 3: Configure Babel

Add Reanimated plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'], // Must be last!
};
```

## 📖 Usage

```tsx
import { HeroUIProvider, Button, Tabs, Tab } from 'react-native-heroui';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUIProvider>
        <Button colorScheme="primary">Click Me</Button>

        <Tabs>
          <Tab tabKey="1" title="Tab 1">
            Content 1
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            Content 2
          </Tab>
        </Tabs>
      </HeroUIProvider>
    </GestureHandlerRootView>
  );
}
```

## ⚡ Animated Components

Components marked with ⚡ use **React Native Reanimated** for smooth 60fps+ animations:

- Button - Press scale animation
- Slider - Gesture Handler with scale feedback
- Tabs - Animated cursor with spring physics
- Tooltip - Fade and scale animations

## 🔗 Links

- [GitHub Repository](https://github.com/adityakmr7/react-native-heroui)
- [NPM Package](https://www.npmjs.com/package/react-native-heroui)
- [Report Issues](https://github.com/adityakmr7/react-native-heroui/issues)

---

Built with ❤️ for React Native
