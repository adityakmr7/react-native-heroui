# Input

Text input component with label, validation, helper text, and icon support.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Input } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
<Input label="Email" placeholder="Enter your email" />
```

### With Value Control

```tsx
const [email, setEmail] = useState('');

<Input
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter your email"
/>;
```

### Variants

```tsx
<Input variant="outline" label="Outline" />
<Input variant="flat" label="Flat" />
<Input variant="bordered" label="Bordered" />
```

### With Helper Text

```tsx
<Input
  label="Email"
  helperText="We'll never share your email"
  placeholder="Enter your email"
/>
```

### With Validation

```tsx
<Input
  label="Email"
  isInvalid
  errorText="Invalid email address"
  placeholder="Enter your email"
/>
```

### With Icons

```tsx
<Input
  label="Email"
  startContent={<Icon name="mail" />}
  placeholder="Enter your email"
/>
```

### With Clear Button

```tsx
<Input
  label="Search"
  value={search}
  onChangeText={setSearch}
  onClear={() => setSearch('')}
  placeholder="Search..."
/>
```

### Password Input

```tsx
<Input label="Password" secureTextEntry placeholder="Enter password" />
```

### Required Field

```tsx
<Input label="Username" isRequired placeholder="Enter username" />
```

### Disabled

```tsx
<Input label="Disabled" isDisabled placeholder="Disabled input" />
```

### Sizes

```tsx
<Input size="sm" label="Small" />
<Input size="md" label="Medium" />
<Input size="lg" label="Large" />
```

---

## API Reference

### Input Props

| Prop           | Type                                | Default     | Description                         |
| -------------- | ----------------------------------- | ----------- | ----------------------------------- |
| `label`        | `string`                            | -           | Input label                         |
| `placeholder`  | `string`                            | -           | Placeholder text                    |
| `value`        | `string`                            | -           | Input value (controlled)            |
| `onChangeText` | `(text: string) => void`            | -           | Change handler                      |
| `helperText`   | `string`                            | -           | Helper text below input             |
| `errorText`    | `string`                            | -           | Error text (shows error state)      |
| `startContent` | `ReactNode`                         | -           | Content before input (icon)         |
| `endContent`   | `ReactNode`                         | -           | Content after input (icon)          |
| `variant`      | `'outline' \| 'flat' \| 'bordered'` | `'outline'` | Input variant                       |
| `size`         | `'sm' \| 'md' \| 'lg'`              | `'md'`      | Input size                          |
| `isInvalid`    | `boolean`                           | `false`     | Whether input is in error state     |
| `isDisabled`   | `boolean`                           | `false`     | Whether input is disabled           |
| `isRequired`   | `boolean`                           | `false`     | Whether input is required           |
| `isReadOnly`   | `boolean`                           | `false`     | Whether input is read-only          |
| `onClear`      | `() => void`                        | -           | Clear button handler (shows button) |
| `style`        | `StyleProp<ViewStyle>`              | -           | Container style                     |

---

## Examples

### Complete Form Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-heroui';

export default function FormExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{ padding: 20, gap: 16 }}>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        helperText="We'll never share your email"
        onClear={() => setEmail('')}
      />

      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        isRequired
        placeholder="Enter password"
      />

      <Button colorScheme="primary" fullWidth>
        Submit
      </Button>
    </View>
  );
}
```

---

Built with ❤️ for React Native
