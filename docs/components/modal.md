# Modal

Displays a dialog with custom content that requires attention or provides additional information.

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'react-native-heroui';
```

## Usage

### Basic Modal

```tsx
import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'react-native-heroui';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
            <Text>This is the modal content.</Text>
          </ModalBody>
          <ModalFooter>
            <Button onPress={() => setIsOpen(false)}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Sizes

Modal supports 10 different sizes.

```tsx
<Modal size="xs" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="sm" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="md" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="lg" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="2xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="3xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="4xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="5xl" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal size="full" isOpen={isOpen} onClose={onClose}>...</Modal>
```

### Placement

Control where the modal appears on screen.

```tsx
<Modal placement="top" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal placement="center" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal placement="bottom" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal placement="auto" isOpen={isOpen} onClose={onClose}>...</Modal>
```

### Backdrop

Customize the modal backdrop appearance.

```tsx
<Modal backdrop="transparent" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>...</Modal>
<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>...</Modal>
```

### Non-Dismissible

Prevent modal from closing when clicking backdrop or pressing Esc.

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  isDismissable={false}
  isKeyboardDismissDisabled={true}
>
  <ModalContent>
    <ModalHeader>Important Notice</ModalHeader>
    <ModalBody>
      <Text>You must read and accept the terms to continue.</Text>
    </ModalBody>
    <ModalFooter>
      <Button onPress={onClose}>Accept</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### With Form

```tsx
function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({ email, password });
    setIsOpen(false);
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Sign In</Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalBody>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoFocus
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              style={{ marginTop: 12 }}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button colorScheme="primary" onPress={handleSubmit}>
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Scrollable Body

When content is long, the modal body becomes scrollable.

```tsx
<Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
  <ModalContent>
    <ModalHeader>Terms and Conditions</ModalHeader>
    <ModalBody>
      {/* Long content here */}
      <Text>Lorem ipsum dolor sit amet...</Text>
      {/* ... more content ... */}
    </ModalBody>
    <ModalFooter>
      <Button onPress={onClose}>Accept</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Hide Close Button

```tsx
<ModalHeader hideCloseButton>No Close Button</ModalHeader>
```

### Custom Styles

```tsx
<Modal
  isOpen={isOpen}
  onClose={onClose}
  classNames={{
    backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
    base: { borderWidth: 2, borderColor: '#0070f3' },
  }}
>
  <ModalContent>
    <ModalHeader style={{ backgroundColor: '#f5f5f5' }}>
      Custom Styled Header
    </ModalHeader>
    <ModalBody>
      <Text>Custom styled modal</Text>
    </ModalBody>
  </ModalContent>
</Modal>
```

## API

### Modal Props

| Prop                        | Type                                                                                 | Default    | Description                        |
| --------------------------- | ------------------------------------------------------------------------------------ | ---------- | ---------------------------------- |
| `isOpen`                    | `boolean`                                                                            | -          | Whether modal is open (required)   |
| `onClose`                   | `() => void`                                                                         | -          | Close handler (required)           |
| `children`                  | `ReactNode`                                                                          | -          | Modal content                      |
| `size`                      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| 'full'` | `'md'`     | Modal size                         |
| `radius`                    | `'none' \| 'sm' \| 'md' \| 'lg'`                                                     | `'lg'`     | Border radius                      |
| `shadow`                    | `'none' \| 'sm' \| 'md' \| 'lg'`                                                     | `'lg'`     | Shadow size                        |
| `backdrop`                  | `'transparent' \| 'opaque' \| 'blur'`                                                | `'opaque'` | Backdrop type                      |
| `scrollBehavior`            | `'normal' \| 'inside' \| 'outside'`                                                  | `'normal'` | Scroll behavior                    |
| `placement`                 | `'auto' \| 'top' \| 'center' \| 'bottom'`                                            | `'center'` | Modal placement                    |
| `isDismissable`             | `boolean`                                                                            | `true`     | Can close by clicking backdrop     |
| `isKeyboardDismissDisabled` | `boolean`                                                                            | `false`    | Disable Esc key to close           |
| `hideCloseButton`           | `boolean`                                                                            | `false`    | Hide close button (not used in RN) |
| `disableAnimation`          | `boolean`                                                                            | `false`    | Disable animations                 |
| `classNames`                | `ModalClassNames`                                                                    | -          | Custom slot styles                 |
| `onOpenChange`              | `(isOpen: boolean) => void`                                                          | -          | Open change handler                |

### ModalClassNames

```tsx
interface ModalClassNames {
  wrapper?: StyleProp<ViewStyle>;
  backdrop?: StyleProp<ViewStyle>;
  base?: StyleProp<ViewStyle>;
}
```

### ModalHeader Props

| Prop              | Type                   | Default | Description       |
| ----------------- | ---------------------- | ------- | ----------------- |
| `children`        | `ReactNode`            | -       | Header content    |
| `hideCloseButton` | `boolean`              | `false` | Hide close button |
| `style`           | `StyleProp<ViewStyle>` | -       | Custom style      |

### ModalBody Props

| Prop         | Type                   | Default | Description                |
| ------------ | ---------------------- | ------- | -------------------------- |
| `children`   | `ReactNode`            | -       | Body content               |
| `scrollable` | `boolean`              | `true`  | Whether body is scrollable |
| `style`      | `StyleProp<ViewStyle>` | -       | Custom style               |

### ModalFooter Props

| Prop       | Type                   | Default | Description    |
| ---------- | ---------------------- | ------- | -------------- |
| `children` | `ReactNode`            | -       | Footer content |
| `style`    | `StyleProp<ViewStyle>` | -       | Custom style   |

## Accessibility

- ✅ Content outside modal is hidden from assistive technologies
- ✅ Modal can be closed by clicking overlay (if `isDismissable`)
- ✅ Focus is contained within modal
- ✅ Focus returns to trigger element on close
- ✅ Proper ARIA attributes for screen readers
- ✅ Scrolling prevented behind modal

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from 'react-native-heroui';

export default function ModalExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');

  return (
    <View style={{ padding: 16 }}>
      <Button onPress={onOpen} colorScheme="primary">
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalContent>
          <ModalHeader>Contact Us</ModalHeader>
          <ModalBody>
            <Text style={{ marginBottom: 12 }}>
              Send us a message and we'll respond within 24 hours.
            </Text>
            <Input
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              label="Message"
              placeholder="How can we help?"
              style={{ marginTop: 12 }}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="primary"
              onPress={() => {
                console.log('Submitted:', email);
                onClose();
              }}
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </View>
  );
}
```

## Use Cases

Perfect for:

- Confirmation dialogs
- Forms and data entry
- Image galleries
- Terms and conditions
- Authentication flows
- Alerts and notifications
- Multi-step wizards

## Notes

- Modal uses React Native's built-in Modal component
- Focus management is handled automatically
- Backdrop press closes modal by default (configurable)
- Body is scrollable by default for long content
- Works with `useDisclosure` hook for easy state management

## Related Components

- [Alert](./alert.md) - For inline notifications
- [Toast](./toast.md) - For temporary messages
- [Card](./card.md) - For content containers
