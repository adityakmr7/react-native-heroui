# Radio & Radio Group

Radio Group allows users to select a single option from a list of mutually exclusive options.

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Radio, RadioGroup } from 'react-native-heroui';
```

## Usage

### Basic

```tsx
import { RadioGroup, Radio } from 'react-native-heroui';

function App() {
  return (
    <RadioGroup defaultValue="option1">
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  );
}
```

### With Label & Description

```tsx
<RadioGroup
  label="Select your favorite framework"
  description="Choose the one you use most often"
  defaultValue="react"
>
  <Radio value="react">React</Radio>
  <Radio value="vue">Vue.js</Radio>
  <Radio value="angular">Angular</Radio>
  <Radio value="svelte">Svelte</Radio>
</RadioGroup>
```

### Horizontal Orientation

```tsx
<RadioGroup orientation="horizontal" defaultValue="sm">
  <Radio value="sm">Small</Radio>
  <Radio value="md">Medium</Radio>
  <Radio value="lg">Large</Radio>
</RadioGroup>
```

### Colors

```tsx
<RadioGroup color="primary" defaultValue="1">
  <Radio value="1">Primary</Radio>
  <Radio value="2">Secondary</Radio>
</RadioGroup>

<RadioGroup color="success" defaultValue="1">
  <Radio value="1">Success</Radio>
  <Radio value="2">Success Alt</Radio>
</RadioGroup>

<RadioGroup color="warning" defaultValue="1">
  <Radio value="1">Warning</Radio>
  <Radio value="2">Warning Alt</Radio>
</RadioGroup>

<RadioGroup color="danger" defaultValue="1">
  <Radio value="1">Danger</Radio>
  <Radio value="2">Danger Alt</Radio>
</RadioGroup>
```

### Sizes

```tsx
<RadioGroup size="sm" defaultValue="1">
  <Radio value="1">Small</Radio>
  <Radio value="2">Small Alt</Radio>
</RadioGroup>

<RadioGroup size="md" defaultValue="1">
  <Radio value="1">Medium</Radio>
  <Radio value="2">Medium Alt</Radio>
</RadioGroup>

<RadioGroup size="lg" defaultValue="1">
  <Radio value="1">Large</Radio>
  <Radio value="2">Large Alt</Radio>
</RadioGroup>
```

### Disabled

```tsx
<RadioGroup defaultValue="1" isDisabled>
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
  <Radio value="3">Option 3</Radio>
</RadioGroup>;

{
  /* Or disable individual radios */
}
<RadioGroup defaultValue="1">
  <Radio value="1">Enabled</Radio>
  <Radio value="2" isDisabled>
    Disabled
  </Radio>
  <Radio value="3">Enabled</Radio>
</RadioGroup>;
```

### With Description (Individual Radios)

```tsx
<RadioGroup label="Select a plan" defaultValue="free">
  <Radio value="free" description="Best for personal projects">
    Free
  </Radio>
  <Radio value="pro" description="For professional developers">
    Pro ($10/month)
  </Radio>
  <Radio value="team" description="For teams and organizations">
    Team ($50/month)
  </Radio>
</RadioGroup>
```

### Controlled

```tsx
import { useState } from 'react';
import { RadioGroup, Radio } from 'react-native-heroui';

function App() {
  const [selected, setSelected] = useState('react');

  return (
    <>
      <RadioGroup value={selected} onValueChange={setSelected}>
        <Radio value="react">React</Radio>
        <Radio value="vue">Vue</Radio>
        <Radio value="angular">Angular</Radio>
      </RadioGroup>

      <Text>Selected: {selected}</Text>
    </>
  );
}
```

### Invalid State

```tsx
<RadioGroup
  label="Select an option"
  isRequired
  isInvalid
  errorMessage="Please select an option"
  defaultValue=""
>
  <Radio value="1">Option 1</Radio>
  <Radio value="2">Option 2</Radio>
  <Radio value="3">Option 3</Radio>
</RadioGroup>
```

### Custom Styles

```tsx
<RadioGroup
  defaultValue="1"
  classNames={{
    base: { padding: 16, backgroundColor: '#f5f5f5' },
    label: { fontSize: 18, fontWeight: 'bold' },
  }}
>
  <Radio
    value="1"
    classNames={{
      base: { padding: 12 },
      label: { color: '#0070f3' },
    }}
  >
    Custom Styled Radio
  </Radio>
</RadioGroup>
```

## API

### RadioGroup Props

| Prop               | Type                                                                          | Default      | Description                           |
| ------------------ | ----------------------------------------------------------------------------- | ------------ | ------------------------------------- |
| `children`         | `ReactNode`                                                                   | -            | Radio components                      |
| `label`            | `string \| ReactNode`                                                         | -            | Radio group label                     |
| `description`      | `string \| ReactNode`                                                         | -            | Radio group description               |
| `errorMessage`     | `string \| ReactNode`                                                         | -            | Error message                         |
| `value`            | `string`                                                                      | -            | Selected value (controlled)           |
| `defaultValue`     | `string`                                                                      | `''`         | Default selected value (uncontrolled) |
| `name`             | `string`                                                                      | -            | Radio group name                      |
| `orientation`      | `'horizontal' \| 'vertical'`                                                  | `'vertical'` | Orientation                           |
| `color`            | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger'` | `'primary'`  | Color for all radios                  |
| `size`             | `'sm' \| 'md' \| 'lg'`                                                        | `'md'`       | Size for all radios                   |
| `isDisabled`       | `boolean`                                                                     | `false`      | Whether group is disabled             |
| `isRequired`       | `boolean`                                                                     | `false`      | Whether group is required             |
| `isReadOnly`       | `boolean`                                                                     | `false`      | Whether group is read-only            |
| `isInvalid`        | `boolean`                                                                     | `false`      | Whether group is invalid              |
| `validationState`  | `'valid' \| 'invalid'`                                                        | -            | Validation state                      |
| `disableAnimation` | `boolean`                                                                     | `false`      | Disable animations                    |
| `style`            | `StyleProp<ViewStyle>`                                                        | -            | Custom container style                |
| `classNames`       | `RadioGroupClassNames`                                                        | -            | Custom slot styles                    |
| `onValueChange`    | `(value: string) => void`                                                     | -            | Value change handler                  |

### RadioGroupClassNames

```tsx
interface RadioGroupClassNames {
  base?: StyleProp<ViewStyle>;
  wrapper?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  description?: StyleProp<TextStyle>;
  errorMessage?: StyleProp<TextStyle>;
}
```

### Radio Props

| Prop          | Type                   | Default | Description               |
| ------------- | ---------------------- | ------- | ------------------------- |
| `value`       | `string`               | -       | Radio value (required)    |
| `children`    | `ReactNode`            | -       | Radio label               |
| `description` | `string \| ReactNode`  | -       | Radio description         |
| `isDisabled`  | `boolean`              | `false` | Whether radio is disabled |
| `style`       | `StyleProp<ViewStyle>` | -       | Custom container style    |
| `classNames`  | `RadioClassNames`      | -       | Custom slot styles        |

### RadioClassNames

```tsx
interface RadioClassNames {
  base?: StyleProp<ViewStyle>;
  wrapper?: StyleProp<ViewStyle>;
  labelWrapper?: StyleProp<ViewStyle>;
  label?: StyleProp<TextStyle>;
  control?: StyleProp<ViewStyle>;
  description?: StyleProp<TextStyle>;
}
```

## Accessibility

- ✅ Radio groups are exposed to assistive technology via ARIA
- ✅ Each radio is built with native accessibility support
- ✅ Full support for keyboard navigation
- ✅ Group and radio labeling support for screen readers
- ✅ Required and invalid states are properly announced

## Complete Example

```tsx
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import {
  RadioGroup,
  Radio,
  Card,
  CardBody,
  CardHeader,
} from 'react-native-heroui';

export default function RadioExample() {
  const [framework, setFramework] = useState('react');
  const [plan, setPlan] = useState('free');

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Basic Radio Group */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Basic Radio Group
          </Text>
        </CardHeader>
        <CardBody>
          <RadioGroup defaultValue="option1">
            <Radio value="option1">Option 1</Radio>
            <Radio value="option2">Option 2</Radio>
            <Radio value="option3">Option 3</Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* With Description */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            With Description
          </Text>
        </CardHeader>
        <CardBody>
          <RadioGroup
            label="Select your favorite framework"
            description="Choose the one you use most often"
            value={framework}
            onValueChange={setFramework}
          >
            <Radio value="react">React</Radio>
            <Radio value="vue">Vue.js</Radio>
            <Radio value="angular">Angular</Radio>
            <Radio value="svelte">Svelte</Radio>
          </RadioGroup>
          <Text style={{ marginTop: 12 }}>Selected: {framework}</Text>
        </CardBody>
      </Card>

      {/* Horizontal Orientation */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Horizontal Orientation
          </Text>
        </CardHeader>
        <CardBody>
          <RadioGroup orientation="horizontal" defaultValue="md" label="Size">
            <Radio value="sm">Small</Radio>
            <Radio value="md">Medium</Radio>
            <Radio value="lg">Large</Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* Colors */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Colors</Text>
        </CardHeader>
        <CardBody style={{ gap: 16 }}>
          <RadioGroup color="primary" defaultValue="1" label="Primary">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
          </RadioGroup>

          <RadioGroup color="success" defaultValue="1" label="Success">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
          </RadioGroup>

          <RadioGroup color="warning" defaultValue="1" label="Warning">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
          </RadioGroup>

          <RadioGroup color="danger" defaultValue="1" label="Danger">
            <Radio value="1">Option 1</Radio>
            <Radio value="2">Option 2</Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      {/* With Radio Descriptions */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Select a Plan
          </Text>
        </CardHeader>
        <CardBody>
          <RadioGroup
            label="Pricing Plans"
            value={plan}
            onValueChange={setPlan}
          >
            <Radio value="free" description="Best for personal projects">
              Free
            </Radio>
            <Radio value="pro" description="For professional developers">
              Pro ($10/month)
            </Radio>
            <Radio value="team" description="For teams and organizations">
              Team ($50/month)
            </Radio>
          </RadioGroup>
          <Text style={{ marginTop: 12 }}>Selected plan: {plan}</Text>
        </CardBody>
      </Card>

      {/* Invalid State */}
      <Card style={{ marginBottom: 16 }}>
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Validation</Text>
        </CardHeader>
        <CardBody>
          <RadioGroup
            label="Terms and Conditions"
            isRequired
            isInvalid
            errorMessage="You must accept the terms to continue"
            defaultValue=""
          >
            <Radio value="accept">I accept the terms</Radio>
            <Radio value="decline">I decline</Radio>
          </RadioGroup>
        </CardBody>
      </Card>
    </ScrollView>
  );
}
```

## Notes

- Radio must be used within a RadioGroup
- Only one radio can be selected at a time within a group
- Use `value` and `onValueChange` for controlled components
- Use `defaultValue` for uncontrolled components
- Individual radios can be disabled while others remain enabled
- The group's color and size apply to all child radios

## Related Components

- [Checkbox](./checkbox.md) - For multi-selection
- [Switch](./switch.md) - For binary on/off states
- [Button](./button.md) - For action triggers
