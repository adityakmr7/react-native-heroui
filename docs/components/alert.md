# Alert

Alerts are temporary notifications that provide concise feedback about an action or event.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Alert } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Alert } from 'react-native-heroui';

export default function App() {
  return (
    <Alert
      title="Success"
      description="Your action was completed successfully."
      color="success"
    />
  );
}
```

### Colors

Alert comes with 6 color variants to convey different meanings.

```tsx
<Alert
  title="Default Alert"
  description="This is a default alert"
  color="default"
/>

<Alert
  title="Primary Alert"
  description="This is a primary alert"
  color="primary"
/>

<Alert
  title="Secondary Alert"
  description="This is a secondary alert"
  color="secondary"
/>

<Alert
  title="Success Alert"
  description="Your operation was successful"
  color="success"
/>

<Alert
  title="Warning Alert"
  description="Please review this warning"
  color="warning"
/>

<Alert
  title="Danger Alert"
  description="An error occurred"
  color="danger"
/>
```

### Variants

Alert supports 4 visual variants.

```tsx
<Alert
  title="Flat Variant"
  description="This is the default flat variant"
  variant="flat"
  color="primary"
/>

<Alert
  title="Solid Variant"
  description="Solid background with white text"
  variant="solid"
  color="primary"
/>

<Alert
  title="Bordered Variant"
  description="Bordered with transparent background"
  variant="bordered"
  color="primary"
/>

<Alert
  title="Faded Variant"
  description="Faded with reduced opacity"
  variant="faded"
  color="primary"
/>
```

### Radius

Customize the border radius of the alert.

```tsx
<Alert title="No Radius" radius="none" color="primary" />
<Alert title="Small Radius" radius="sm" color="primary" />
<Alert title="Medium Radius" radius="md" color="primary" />
<Alert title="Large Radius" radius="lg" color="primary" />
<Alert title="Full Radius" radius="full" color="primary" />
```

### Custom Icon

Override the default icon with a custom one.

```tsx
<Alert
  title="Custom Icon"
  description="Alert with a custom icon"
  color="success"
  icon={<Text style={{ fontSize: 20 }}>🎉</Text>}
/>

<Alert
  title="Another Custom Icon"
  description="You can use any component as an icon"
  color="warning"
  icon={<Text style={{ fontSize: 20 }}>⚡</Text>}
/>
```

### Without Icon

Hide the icon completely.

```tsx
<Alert
  title="No Icon"
  description="This alert has no icon"
  color="primary"
  hideIcon
/>
```

### Without Icon Wrapper

Hide the icon wrapper background.

```tsx
<Alert
  title="No Icon Wrapper"
  description="Icon without background wrapper"
  color="success"
  hideIconWrapper
/>
```

### With Action

Add action buttons or custom content at the end.

```tsx
import { Button } from 'react-native-heroui';

<Alert
  title="Action Required"
  description="Please review and take action"
  color="warning"
  endContent={
    <Button size="sm" variant="solid" colorScheme="warning">
      Review
    </Button>
  }
/>;
```

### Closable Alert

Make the alert closable with a close button.

```tsx
<Alert
  title="Closable Alert"
  description="You can close this alert"
  color="primary"
  isClosable
  onClose={() => console.log('Alert closed')}
/>
```

### Controlled Visibility

Control the alert visibility externally.

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Alert, Button } from 'react-native-heroui';

export default function ControlledAlert() {
  const [visible, setVisible] = useState(true);

  return (
    <View>
      <Button onPress={() => setVisible(!visible)}>Toggle Alert</Button>

      <Alert
        title="Controlled Alert"
        description="This alert's visibility is controlled"
        color="success"
        isVisible={visible}
        isClosable
        onVisibleChange={setVisible}
      />
    </View>
  );
}
```

### With Start Content

Add custom content before the icon.

```tsx
<Alert
  title="With Start Content"
  description="Alert with custom start content"
  color="primary"
  startContent={
    <View style={{ marginRight: 8 }}>
      <Text>👋</Text>
    </View>
  }
/>
```

### Title Only

Alert with just a title.

```tsx
<Alert title="Simple alert message" color="success" />
```

### Description Only

Alert with just a description.

```tsx
<Alert description="This is a simple alert without a title" color="primary" />
```

---

## API Reference

### Alert Props

| Prop               | Type                                                                          | Default     | Description                       |
| ------------------ | ----------------------------------------------------------------------------- | ----------- | --------------------------------- |
| `title`            | `string \| ReactNode`                                                         | -           | Alert title                       |
| `description`      | `string \| ReactNode`                                                         | -           | Alert description/message         |
| `icon`             | `ReactNode`                                                                   | -           | Custom icon (overrides default)   |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color scheme                      |
| `variant`          | `'solid' \| 'bordered' \| 'flat' \| 'faded'`                                  | `'flat'`    | Visual variant                    |
| `radius`           | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                    | `'md'`      | Border radius                     |
| `startContent`     | `ReactNode`                                                                   | -           | Content at the start              |
| `endContent`       | `ReactNode`                                                                   | -           | Content at the end (actions)      |
| `isVisible`        | `boolean`                                                                     | `true`      | Controlled visibility             |
| `isClosable`       | `boolean`                                                                     | `false`     | Whether alert can be closed       |
| `hideIcon`         | `boolean`                                                                     | `false`     | Hide the icon                     |
| `hideIconWrapper`  | `boolean`                                                                     | `false`     | Hide icon wrapper background      |
| `style`            | `StyleProp<ViewStyle>`                                                        | -           | Custom container style            |
| `classNames`       | `AlertClassNames`                                                             | -           | Custom styles for different parts |
| `closeButtonProps` | `{ accessibilityLabel?: string; style?: StyleProp<ViewStyle> }`               | -           | Props for close button            |

### Alert Events

| Prop              | Type                           | Description                 |
| ----------------- | ------------------------------ | --------------------------- |
| `onClose`         | `() => void`                   | Called when alert closes    |
| `onVisibleChange` | `(isVisible: boolean) => void` | Called on visibility change |

### AlertClassNames

```tsx
interface AlertClassNames {
  base?: StyleProp<ViewStyle>; // Main container
  title?: StyleProp<TextStyle>; // Title text
  description?: StyleProp<TextStyle>; // Description text
  mainWrapper?: StyleProp<ViewStyle>; // Content wrapper
  iconWrapper?: StyleProp<ViewStyle>; // Icon wrapper
  alertIcon?: StyleProp<TextStyle>; // Icon styles
  closeButton?: StyleProp<ViewStyle>; // Close button
}
```

---

## Default Icons

Alert automatically displays an appropriate icon based on the color:

| Color     | Default Icon |
| --------- | ------------ |
| default   | ℹ           |
| primary   | ℹ           |
| secondary | ●            |
| success   | ✓            |
| warning   | ⚠           |
| danger    | ✕            |

---

## Accessibility

- ✅ Alert has `accessibilityRole="alert"`
- ✅ Close button has `accessibilityLabel="Close"` by default
- ✅ When closed, alert is removed from the DOM
- ✅ Screen reader support

---

## Examples

### Complete Example with All Features

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert, Button } from 'react-native-heroui';

export default function AlertExample() {
  const [visible1, setVisible1] = useState(true);
  const [visible2, setVisible2] = useState(true);

  return (
    <View style={styles.container}>
      {/* Success Alert */}
      <Alert
        title="Payment Successful"
        description="Your payment has been processed successfully."
        color="success"
        variant="solid"
        isClosable
        onClose={() => console.log('Success alert closed')}
      />

      {/* Warning with Action */}
      <Alert
        title="Storage Almost Full"
        description="Your storage is 90% full. Consider upgrading."
        color="warning"
        endContent={
          <Button size="sm" variant="solid" colorScheme="warning">
            Upgrade
          </Button>
        }
      />

      {/* Error Alert */}
      <Alert
        title="Connection Error"
        description="Unable to connect to the server. Please try again."
        color="danger"
        variant="bordered"
        isClosable
      />

      {/* Controlled Alert */}
      <Button onPress={() => setVisible1(!visible1)}>
        Toggle Controlled Alert
      </Button>
      <Alert
        title="Controlled Alert"
        description="This alert's visibility is controlled"
        color="primary"
        isVisible={visible1}
        isClosable
        onVisibleChange={setVisible1}
      />

      {/* Custom Icon */}
      <Alert
        title="New Feature Available"
        description="Check out our new feature!"
        color="primary"
        icon={<Text style={{ fontSize: 20 }}>🎉</Text>}
        endContent={
          <Button size="sm" variant="ghost">
            Learn More
          </Button>
        }
      />

      {/* Different Variants */}
      <Alert
        title="Flat Variant"
        description="Default flat variant"
        variant="flat"
        color="secondary"
      />

      <Alert
        title="Solid Variant"
        description="Solid background variant"
        variant="solid"
        color="secondary"
      />

      <Alert
        title="Bordered Variant"
        description="Bordered variant"
        variant="bordered"
        color="secondary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
});
```

### Form Validation Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Alert, Input, Button } from 'react-native-heroui';

export default function FormWithAlert() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setSuccess(false);
    } else {
      setError('');
      setSuccess(true);
    }
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      {error && (
        <Alert
          title="Validation Error"
          description={error}
          color="danger"
          isClosable
          onClose={() => setError('')}
        />
      )}

      {success && (
        <Alert
          title="Success"
          description="Your email has been saved!"
          color="success"
        />
      )}

      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
      />

      <Button onPress={handleSubmit} colorScheme="primary">
        Submit
      </Button>
    </View>
  );
}
```

---

## TypeScript

```tsx
import type {
  AlertProps,
  AlertColor,
  AlertVariant,
  AlertRadius,
} from 'react-native-heroui';

const color: AlertColor = 'success';
const variant: AlertVariant = 'solid';
const radius: AlertRadius = 'md';
```

---

Built with ❤️ for React Native
