import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Textarea } from '../src/components/Textarea/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['flat', 'bordered', 'faded', 'underlined'],
      description: 'Textarea variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Textarea label',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether textarea is disabled',
    },
  },
  args: {
    placeholder: 'Enter your message...',
    variant: 'flat',
    color: 'primary',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Textarea {...args} value={value} onChangeText={setValue} />;
  },
};

export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <Textarea
          variant="flat"
          placeholder="Flat variant"
          value={value}
          onChangeText={setValue}
        />
        <Textarea
          variant="bordered"
          placeholder="Bordered variant"
          value={value}
          onChangeText={setValue}
        />
        <Textarea
          variant="underlined"
          placeholder="Underlined variant"
          value={value}
          onChangeText={setValue}
        />
      </View>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Textarea
        label="Message"
        placeholder="Enter your message"
        value={value}
        onChangeText={setValue}
      />
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 200;
    return (
      <View>
        <Textarea
          label="Description"
          placeholder="Enter description"
          value={value}
          onChangeText={setValue}
          maxLength={maxLength}
        />
        <Text
          style={{
            textAlign: 'right',
            fontSize: 12,
            opacity: 0.6,
            marginTop: 4,
          }}
        >
          {value.length}/{maxLength}
        </Text>
      </View>
    );
  },
};
