# Checkbox

Checkboxes allow users to select multiple items from a list or mark an individual item as selected.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Checkbox } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Checkbox } from 'react-native-heroui';

export default function App() {
  return <Checkbox>Accept terms and conditions</Checkbox>;
}
```

### Controlled

```tsx
import React, { useState } from 'react';
import { Checkbox } from 'react-native-heroui';

export default function ControlledCheckbox() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
      Subscribe to newsletter
    </Checkbox>
  );
}
```

### Disabled

```tsx
<Checkbox isDisabled>Disabled checkbox</Checkbox>
<Checkbox isSelected isDisabled>
  Disabled and checked
</Checkbox>
```

### Sizes

Checkbox supports 3 sizes: `sm`, `md`, and `lg`.

```tsx
<Checkbox size="sm">Small</Checkbox>
<Checkbox size="md">Medium</Checkbox>
<Checkbox size="lg">Large</Checkbox>
```

### Colors

Checkbox comes with 6 color options.

```tsx
<Checkbox color="default">Default</Checkbox>
<Checkbox color="primary">Primary</Checkbox>
<Checkbox color="secondary">Secondary</Checkbox>
<Checkbox color="success">Success</Checkbox>
<Checkbox color="warning">Warning</Checkbox>
<Checkbox color="danger">Danger</Checkbox>
```

### Radius

Customize the border radius.

```tsx
<Checkbox radius="none">No radius</Checkbox>
<Checkbox radius="sm">Small radius</Checkbox>
<Checkbox radius="md">Medium radius</Checkbox>
<Checkbox radius="lg">Large radius</Checkbox>
<Checkbox radius="full">Full radius</Checkbox>
```

### Indeterminate

The indeterminate state represents a partially checked state.

```tsx
<Checkbox isIndeterminate>Indeterminate</Checkbox>
```

### Line Through

Strike through the label when checked.

```tsx
<Checkbox lineThrough>Complete task</Checkbox>
```

### Custom Check Icon

Provide a custom icon for the checked state.

```tsx
<Checkbox
  icon={({ isSelected }) =>
    isSelected ? <Text style={{ fontSize: 14 }}>★</Text> : null
  }
  color="warning"
>
  Favorite
</Checkbox>

<Checkbox
  icon={<Text style={{ fontSize: 12, color: '#fff' }}>✓✓</Text>}
  color="success"
>
  Double Check
</Checkbox>
```

### Read Only

```tsx
<Checkbox isReadOnly isSelected>
  Read only checked
</Checkbox>
```

### Required

```tsx
<Checkbox isRequired>Required field *</Checkbox>
```

### Invalid State

```tsx
<Checkbox isInvalid>Invalid checkbox</Checkbox>
```

---

## API Reference

### Checkbox Props

| Prop               | Type                                                                          | Default     | Description                       |
| ------------------ | ----------------------------------------------------------------------------- | ----------- | --------------------------------- |
| `children`         | `ReactNode`                                                                   | -           | Checkbox label                    |
| `icon`             | `ReactNode \| ((props: CheckboxIconProps) => ReactNode)`                      | -           | Custom check icon                 |
| `value`            | `string`                                                                      | -           | Value for checkbox groups         |
| `name`             | `string`                                                                      | -           | Name attribute                    |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | `'md'`      | Checkbox size                     |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'` | Color scheme                      |
| `radius`           | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                                    | `'md'`      | Border radius                     |
| `lineThrough`      | `boolean`                                                                     | `false`     | Strike through label when checked |
| `isSelected`       | `boolean`                                                                     | -           | Controlled selected state         |
| `defaultSelected`  | `boolean`                                                                     | `false`     | Default selected (uncontrolled)   |
| `isRequired`       | `boolean`                                                                     | `false`     | Whether checkbox is required      |
| `isReadOnly`       | `boolean`                                                                     | `false`     | Whether checkbox is read-only     |
| `isDisabled`       | `boolean`                                                                     | `false`     | Whether checkbox is disabled      |
| `isIndeterminate`  | `boolean`                                                                     | `false`     | Indeterminate state               |
| `isInvalid`        | `boolean`                                                                     | `false`     | Whether checkbox is invalid       |
| `validationState`  | `'valid' \| 'invalid'`                                                        | -           | Validation state                  |
| `disableAnimation` | `boolean`                                                                     | `false`     | Disable animations                |
| `style`            | `StyleProp<ViewStyle>`                                                        | -           | Custom container style            |
| `classNames`       | `CheckboxClassNames`                                                          | -           | Custom styles for slots           |

### Checkbox Events

| Prop            | Type                            | Description               |
| --------------- | ------------------------------- | ------------------------- |
| `onChange`      | `(isSelected: boolean) => void` | Called when state changes |
| `onValueChange` | `(isSelected: boolean) => void` | Called when value changes |

### CheckboxIconProps

Props passed to custom icon functions:

```tsx
interface CheckboxIconProps {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  disableAnimation?: boolean;
}
```

---

## Accessibility

- ✅ `accessibilityRole="checkbox"`
- ✅ `accessibilityState.checked` for selected state
- ✅ `accessibilityState.checked="mixed"` for indeterminate state
- ✅ `accessibilityState.disabled` for disabled state
- ✅ Label text used for accessibility label
- ✅ Screen reader support

---

## Examples

### Todo List with Line Through

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-heroui';

export default function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', done: false },
    { id: 2, text: 'Walk the dog', done: false },
    { id: 3, text: 'Read a book', done: true },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {tasks.map((task) => (
        <Checkbox
          key={task.id}
          isSelected={task.done}
          onValueChange={() => toggleTask(task.id)}
          lineThrough
          color="success"
        >
          {task.text}
        </Checkbox>
      ))}
    </View>
  );
}
```

### Select All with Indeterminate

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-heroui';

export default function SelectAllExample() {
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);

  const allChecked = items.every((item) => item.checked);
  const someChecked = items.some((item) => item.checked) && !allChecked;

  const toggleAll = () => {
    setItems(items.map((item) => ({ ...item, checked: !allChecked })));
  };

  const toggleItem = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Checkbox
        isSelected={allChecked}
        isIndeterminate={someChecked}
        onValueChange={toggleAll}
        color="primary"
      >
        Select All
      </Checkbox>

      <View style={{ marginLeft: 20, gap: 8 }}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            isSelected={item.checked}
            onValueChange={() => toggleItem(item.id)}
            color="primary"
          >
            {item.label}
          </Checkbox>
        ))}
      </View>
    </View>
  );
}
```

### Form with Validation

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Checkbox, Button } from 'react-native-heroui';

export default function FormWithCheckbox() {
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    if (agreed) {
      console.log('Form submitted');
    }
  };

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Checkbox
        isRequired
        isSelected={agreed}
        onValueChange={setAgreed}
        isInvalid={submitted && !agreed}
        color="primary"
      >
        I agree to the terms and conditions
      </Checkbox>

      <Button colorScheme="primary" onPress={handleSubmit}>
        Submit
      </Button>
    </View>
  );
}
```

### All Colors and Sizes

```tsx
<View style={{ gap: 16 }}>
  {/* Small */}
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Checkbox size="sm" color="default" defaultSelected>
      Default
    </Checkbox>
    <Checkbox size="sm" color="primary" defaultSelected>
      Primary
    </Checkbox>
    <Checkbox size="sm" color="secondary" defaultSelected>
      Secondary
    </Checkbox>
  </View>

  {/* Medium */}
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Checkbox size="md" color="success" defaultSelected>
      Success
    </Checkbox>
    <Checkbox size="md" color="warning" defaultSelected>
      Warning
    </Checkbox>
    <Checkbox size="md" color="danger" defaultSelected>
      Danger
    </Checkbox>
  </View>

  {/* Large */}
  <View style={{ flexDirection: 'row', gap: 12 }}>
    <Checkbox size="lg" color="primary" defaultSelected>
      Large
    </Checkbox>
  </View>
</View>
```

### Complete Example

```tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Checkbox, HeroUIProvider } from 'react-native-heroui';

function CheckboxDemo() {
  const [selections, setSelections] = useState({
    newsletter: false,
    sms: false,
    email: true,
  });

  return (
    <View style={styles.container}>
      {/* Basic checkboxes */}
      <Checkbox
        isSelected={selections.newsletter}
        onValueChange={(val) =>
          setSelections({ ...selections, newsletter: val })
        }
        color="primary"
      >
        Newsletter subscription
      </Checkbox>

      <Checkbox
        isSelected={selections.sms}
        onValueChange={(val) => setSelections({ ...selections, sms: val })}
        color="secondary"
      >
        SMS notifications
      </Checkbox>

      <Checkbox
        isSelected={selections.email}
        onValueChange={(val) => setSelections({ ...selections, email: val })}
        color="success"
        lineThrough
      >
        Email updates
      </Checkbox>

      {/* Special states */}
      <Checkbox isIndeterminate color="warning">
        Partially selected
      </Checkbox>

      <Checkbox isDisabled>Disabled checkbox</Checkbox>

      <Checkbox isRequired color="danger">
        Required field
      </Checkbox>
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
      <CheckboxDemo />
    </HeroUIProvider>
  );
}
```

---

## Custom Styling

```tsx
<Checkbox
  classNames={{
    base: { padding: 8 },
    wrapper: { borderWidth: 3 },
    label: { fontSize: 18, fontWeight: 'bold' },
  }}
>
  Custom styled checkbox
</Checkbox>
```

---

## TypeScript

```tsx
import type {
  CheckboxProps,
  CheckboxColor,
  CheckboxSize,
  CheckboxRadius,
  CheckboxIconProps,
} from 'react-native-heroui';

const color: CheckboxColor = 'primary';
const size: CheckboxSize = 'md';
const radius: CheckboxRadius = 'md';

// Custom icon with types
const customIcon = (props: CheckboxIconProps) => {
  if (props.isIndeterminate) return <Text>-</Text>;
  if (props.isSelected) return <Text>✓</Text>;
  return null;
};
```

---

Built with ❤️ for React Native
