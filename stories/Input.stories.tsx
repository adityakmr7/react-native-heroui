import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Input } from '../src/components/Input/Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bordered', 'underlined'],
      description: 'Input variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether input is disabled',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether input is in error state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Input label',
    },
  },
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'md',
    colorScheme: 'primary',
    isDisabled: false,
    isInvalid: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Text input component with validation, labels, and multiple styles.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// Playground
export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Input {...args} value={value} onChangeText={setValue} />;
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <View style={{ gap: 16 }}>
        <Input
          variant="default"
          placeholder="Default variant"
          value={value1}
          onChangeText={setValue1}
        />
        <Input
          variant="bordered"
          placeholder="Bordered variant"
          value={value2}
          onChangeText={setValue2}
        />
        <Input
          variant="underlined"
          placeholder="Underlined variant"
          value={value3}
          onChangeText={setValue3}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input supports 3 variants: default, bordered, and underlined.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <View style={{ gap: 16 }}>
        <Input
          size="sm"
          placeholder="Small input"
          value={value1}
          onChangeText={setValue1}
        />
        <Input
          size="md"
          placeholder="Medium input"
          value={value2}
          onChangeText={setValue2}
        />
        <Input
          size="lg"
          placeholder="Large input"
          value={value3}
          onChangeText={setValue3}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: sm, md, lg.',
      },
    },
  },
};

// With Label
export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="Email"
        placeholder="Enter your email"
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input can have a label above it.',
      },
    },
  },
};

// With Helper Text
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Input
        label="Username"
        placeholder="Choose a username"
        helperText="Must be 3-20 characters"
        value={value}
        onChangeText={setValue}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input can display helper text below.',
      },
    },
  },
};

// Error State
export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState('invalid@');
    return (
      <Input
        label="Email"
        placeholder="Enter your email"
        value={value}
        onChangeText={setValue}
        isInvalid
        errorMessage="Please enter a valid email address"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input can show error state with error message.',
      },
    },
  },
};

// Disabled
export const Disabled: Story = {
  render: () => {
    return (
      <Input placeholder="Disabled input" value="Cannot edit this" isDisabled />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input can be disabled.',
      },
    },
  },
};

// Password Input
export const PasswordInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Input
        label="Password"
        placeholder="Enter password"
        value={value}
        onChangeText={setValue}
        secureTextEntry={!showPassword}
        endContent={
          <Text
            onPress={() => setShowPassword(!showPassword)}
            style={{ fontSize: 16, cursor: 'pointer' }}
          >
            {showPassword ? '👁️' : '🙈'}
          </Text>
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Example password input with show/hide toggle.',
      },
    },
  },
};

// Colors
export const Colors: Story = {
  render: () => {
    const [value1, setValue1] = useState('Primary');
    const [value2, setValue2] = useState('Secondary');
    const [value3, setValue3] = useState('Success');
    const [value4, setValue4] = useState('Warning');
    const [value5, setValue5] = useState('Danger');

    return (
      <View style={{ gap: 16 }}>
        <Input
          colorScheme="primary"
          placeholder="Primary"
          value={value1}
          onChangeText={setValue1}
        />
        <Input
          colorScheme="secondary"
          placeholder="Secondary"
          value={value2}
          onChangeText={setValue2}
        />
        <Input
          colorScheme="success"
          placeholder="Success"
          value={value3}
          onChangeText={setValue3}
        />
        <Input
          colorScheme="warning"
          placeholder="Warning"
          value={value4}
          onChangeText={setValue4}
        />
        <Input
          colorScheme="danger"
          placeholder="Danger"
          value={value5}
          onChangeText={setValue5}
        />
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Input supports multiple color schemes.',
      },
    },
  },
};
