# Toast

Toasts are temporary notifications that provide concise feedback about an action or event.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { ToastProvider, toast } from 'react-native-heroui';
```

## Requirement

The `ToastProvider` must be added to your application root before using toasts.

```tsx
import { HeroUIProvider, ToastProvider } from 'react-native-heroui';

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider>{/* Your app content */}</ToastProvider>
    </HeroUIProvider>
  );
}
```

## Usage

### Basic Example

```tsx
import { toast, Button } from 'react-native-heroui';

export default function App() {
  return <Button onPress={() => toast.show('Hello World!')}>Show Toast</Button>;
}
```

### Using Toast Methods

Toast provides convenient methods for different types of notifications:

```tsx
import { toast, Button } from 'react-native-heroui';

<Button onPress={() => toast.success('Operation successful!')}>
  Success
</Button>

<Button onPress={() => toast.error('An error occurred')}>
  Error
</Button>

<Button onPress={() => toast.warning('Warning message')}>
  Warning
</Button>

<Button onPress={() => toast.info('Information')}>
  Info
</Button>
```

### Colors

Toast comes with 6 color variants:

```tsx
toast.show({ description: 'Default toast', color: 'default' });
toast.show({ description: 'Primary toast', color: 'primary' });
toast.show({ description: 'Secondary toast', color: 'secondary' });
toast.success('Success toast'); // color: 'success'
toast.warning('Warning toast'); // color: 'warning'
toast.error('Error toast'); // color: 'danger'
```

### Variants

```tsx
toast.show({
  title: 'Flat Variant',
  description: 'Default flat variant',
  variant: 'flat',
  color: 'primary',
});

toast.show({
  title: 'Solid Variant',
  description: 'Solid background',
  variant: 'solid',
  color: 'primary',
});

toast.show({
  title: 'Bordered Variant',
  description: 'With border',
  variant: 'bordered',
  color: 'primary',
});
```

### Radius

```tsx
toast.show({ description: 'No radius', radius: 'none' });
toast.show({ description: 'Small radius', radius: 'sm' });
toast.show({ description: 'Medium radius', radius: 'md' });
toast.show({ description: 'Large radius', radius: 'lg' });
toast.show({ description: 'Full radius', radius: 'full' });
```

### Toast Placement

Control where toasts appear on the screen:

```tsx
// Configure in ToastProvider
<ToastProvider placement="top-right">{/* Your app */}</ToastProvider>;

// Or per toast
toast.show({
  description: 'Top right toast',
  placement: 'top-right',
});

// Available placements:
// 'top-left', 'top-center', 'top-right'
// 'bottom-left', 'bottom-center', 'bottom-right'
```

### With Title and Description

```tsx
toast.success({
  title: 'Payment Successful',
  description: 'Your payment has been processed.',
});
```

### Custom Timeout

```tsx
// Auto-dismiss after 3 seconds
toast.show({
  description: 'Quick message',
  timeout: 3000,
});

// Never auto-dismiss
toast.show({
  description: 'Permanent toast',
  timeout: 0,
});

// With progress bar
toast.show({
  description: 'With progress',
  timeout: 5000,
  shouldShowTimeoutProgress: true,
});
```

### With Actions

```tsx
import { Button } from 'react-native-heroui';

toast.show({
  title: 'Update Available',
  description: 'A new version is ready',
  color: 'primary',
  endContent: (
    <Button size="sm" variant="ghost">
      Update
    </Button>
  ),
});
```

### Custom Icon

```tsx
toast.show({
  title: 'Custom Icon',
  description: 'Toast with emoji',
  icon: <Text style={{ fontSize: 20 }}>🎉</Text>,
  color: 'success',
});
```

### Hide Icon

```tsx
toast.show({
  description: 'No icon toast',
  hideIcon: true,
});
```

### Hide Close Button

```tsx
toast.show({
  description: 'Cannot be manually closed',
  hideCloseButton: true,
  timeout: 3000,
});
```

### Using useToast Hook

For more control within components:

```tsx
import { useToast } from 'react-native-heroui';

function MyComponent() {
  const { addToast, toasts } = useToast();

  const handleClick = () => {
    addToast({
      title: 'Success',
      description: 'Task completed!',
      color: 'success',
    });
  };

  return (
    <View>
      <Button onPress={handleClick}>Add Toast</Button>
      <Text>Active toasts: {toasts.length}</Text>
    </View>
  );
}
```

---

## API Reference

### toast API

The global `toast` object provides convenience methods:

```tsx
// Show default toast
toast.show(message: string | ToastOptions): string

// Show success toast
toast.success(message: string | ToastOptions): string

// Show error toast
toast.error(message: string | ToastOptions): string

// Show warning toast
toast.warning(message: string | ToastOptions): string

// Show info toast
toast.info(message: string | ToastOptions): string

// Custom toast with full options
toast.custom(options: ToastOptions): string
```

### ToastOptions

| Prop                        | Type                                                                          | Default     | Description                         |
| --------------------------- | ----------------------------------------------------------------------------- | ----------- | ----------------------------------- |
| `title`                     | `string \| ReactNode`                                                         | -           | Toast title                         |
| `description`               | `string \| ReactNode`                                                         | -           | Toast description/message           |
| `icon`                      | `ReactNode`                                                                   | -           | Custom icon                         |
| `color`                     | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color scheme                        |
| `variant`                   | `'solid' \| 'bordered' \| 'flat'`                                             | `'flat'`    | Visual variant                      |
| `radius`                    | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                    | `'md'`      | Border radius                       |
| `endContent`                | `ReactNode`                                                                   | -           | End content (actions)               |
| `closeIcon`                 | `ReactNode`                                                                   | -           | Custom close icon                   |
| `timeout`                   | `number`                                                                      | `6000`      | Auto-dismiss timeout (ms)           |
| `hideIcon`                  | `boolean`                                                                     | `false`     | Hide the icon                       |
| `hideCloseButton`           | `boolean`                                                                     | `false`     | Hide close button                   |
| `shouldShowTimeoutProgress` | `boolean`                                                                     | `false`     | Show timeout progress bar           |
| `placement`                 | `ToastPlacement`                                                              | -           | Toast position (overrides provider) |
| `classNames`                | `ToastClassNames`                                                             | -           | Custom styles                       |
| `onClose`                   | `() => void`                                                                  | -           | Close callback                      |

### ToastProvider Props

| Prop               | Type             | Default          | Description                  |
| ------------------ | ---------------- | ---------------- | ---------------------------- |
| `children`         | `ReactNode`      | -                | App content                  |
| `maxVisibleToasts` | `number`         | `3`              | Max visible toasts           |
| `placement`        | `ToastPlacement` | `'bottom-right'` | Default toast placement      |
| `disableAnimation` | `boolean`        | `false`          | Disable all animations       |
| `toastOffset`      | `number`         | `16`             | Offset from screen edge      |
| `toastProps`       | `ToastOptions`   | `{}`             | Default props for all toasts |

---

## Examples

### Complete Toast Examples

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  toast,
  Button,
  HeroUIProvider,
  ToastProvider,
} from 'react-native-heroui';

function ToastExample() {
  return (
    <View style={styles.container}>
      {/* Quick methods */}
      <Button onPress={() => toast.success('Success!')} colorScheme="success">
        Success Toast
      </Button>

      <Button
        onPress={() => toast.error('Error occurred')}
        colorScheme="danger"
      >
        Error Toast
      </Button>

      <Button onPress={() => toast.warning('Warning!')} colorScheme="warning">
        Warning Toast
      </Button>

      <Button onPress={() => toast.info('Information')} colorScheme="primary">
        Info Toast
      </Button>

      {/* With title and description */}
      <Button
        onPress={() =>
          toast.success({
            title: 'Payment Complete',
            description: 'Your order has been confirmed.',
          })
        }
      >
        Detailed Toast
      </Button>

      {/* With action */}
      <Button
        onPress={() =>
          toast.show({
            title: 'New Message',
            description: 'You have a new message from John',
            color: 'primary',
            endContent: (
              <Button size="sm" variant="ghost">
                View
              </Button>
            ),
          })
        }
      >
        Toast with Action
      </Button>

      {/* With progress bar */}
      <Button
        onPress={() =>
          toast.show({
            description: 'Auto-dismissing in 5 seconds',
            timeout: 5000,
            shouldShowTimeoutProgress: true,
            color: 'secondary',
          })
        }
      >
        Toast with Progress
      </Button>

      {/* Custom icon */}
      <Button
        onPress={() =>
          toast.show({
            title: 'Achievement Unlocked!',
            description: 'You completed all tasks',
            icon: <Text style={{ fontSize: 24 }}>🏆</Text>,
            color: 'warning',
          })
        }
      >
        Custom Icon Toast
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-right" maxVisibleToasts={3}>
        <ToastExample />
      </ToastProvider>
    </HeroUIProvider>
  );
}
```

### From Async Operations

```tsx
const handleSubmit = async () => {
  try {
    await submitForm();
    toast.success({
      title: 'Submitted',
      description: 'Form submitted successfully',
    });
  } catch (error) {
    toast.error({
      title: 'Error',
      description: error.message,
    });
  }
};
```

### Trigger from Anywhere

The beauty of the `toast` API is that you can call it from anywhere:

```tsx
// In event handlers
<Button onPress={() => toast.success('Saved!')}>Save</Button>;

// In utility functions
export const saveData = async (data) => {
  try {
    await api.save(data);
    toast.success('Data saved successfully');
  } catch (error) {
    toast.error('Failed to save data');
  }
};

// In network callbacks
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error('Network error occurred');
    return Promise.reject(error);
  }
);

// Anywhere in your app!
setTimeout(() => {
  toast.info('Reminder: Check your settings');
}, 5000);
```

---

## Accessibility

- ✅ Toast has `accessibilityRole="alert"`
- ✅ Toasts are announced by screen readers
- ✅ Close button has `accessibilityLabel="Close"`
- ✅ Toast region removed from DOM when empty

---

## TypeScript

```tsx
import type {
  ToastOptions,
  ToastColor,
  ToastVariant,
  ToastRadius,
  ToastPlacement,
  ToastProviderProps,
} from 'react-native-heroui';

const options: ToastOptions = {
  title: 'Success',
  description: 'Operation completed',
  color: 'success',
  timeout: 5000,
};

toast.custom(options);
```

---

## Advanced Usage

### Global Configuration

```tsx
<ToastProvider
  placement="top-center"
  maxVisibleToasts={5}
  toastOffset={20}
  toastProps={{
    variant: 'solid',
    shouldShowTimeoutProgress: true,
  }}
>
  {/* All toasts will inherit these props */}
</ToastProvider>
```

### Custom Styled Toasts

```tsx
toast.show({
  description: 'Custom styled toast',
  classNames: {
    base: { backgroundColor: '#1a1a1a' },
    title: { color: '#ffffff', fontSize: 18 },
    description: { color: '#cccccc' },
  },
});
```

---

Built with ❤️ for React Native
