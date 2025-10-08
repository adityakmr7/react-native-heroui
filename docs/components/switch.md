# Switch

Toggle switch component for on/off states with smooth animations.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Switch } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
<Switch value={isOn} onChange={setIsOn} />
```

### Uncontrolled

```tsx
<Switch defaultValue={true} />
```

### Colors

```tsx
<Switch value={true} color="primary" />
<Switch value={true} color="secondary" />
<Switch value={true} color="success" />
<Switch value={true} color="warning" />
<Switch value={true} color="danger" />
```

### Sizes

```tsx
<Switch size="sm" value={true} />
<Switch size="md" value={true} />
<Switch size="lg" value={true} />
```

### Disabled

```tsx
<Switch value={true} isDisabled />
```

### With Label

```tsx
<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
  <Switch value={enabled} onChange={setEnabled} />
  <Text>Enable Notifications</Text>
</View>
```

---

## API Reference

### Switch Props

| Prop           | Type                                                             | Default     | Description                  |
| -------------- | ---------------------------------------------------------------- | ----------- | ---------------------------- |
| `value`        | `boolean`                                                        | -           | Switch value (controlled)    |
| `defaultValue` | `boolean`                                                        | `false`     | Default value (uncontrolled) |
| `onChange`     | `(value: boolean) => void`                                       | -           | Change handler               |
| `color`        | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Switch color                 |
| `size`         | `'sm' \| 'md' \| 'lg'`                                           | `'md'`      | Switch size                  |
| `isDisabled`   | `boolean`                                                        | `false`     | Whether switch is disabled   |
| `style`        | `StyleProp<ViewStyle>`                                           | -           | Custom style                 |

---

## Examples

### Settings Toggle

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-heroui';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontWeight: '600' }}>Notifications</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            Receive push notifications
          </Text>
        </View>
        <Switch
          value={notifications}
          onChange={setNotifications}
          color="success"
        />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontWeight: '600' }}>Dark Mode</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>
            Switch to dark theme
          </Text>
        </View>
        <Switch value={darkMode} onChange={setDarkMode} color="primary" />
      </View>
    </View>
  );
}
```

---

Built with ❤️ for React Native
