import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Select } from '../src/components/Select/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['flat', 'bordered', 'faded', 'underlined'],
      description: 'Select variant',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Select size',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
    label: {
      control: 'text',
      description: 'Select label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    placeholder: 'Select an option',
    variant: 'flat',
    size: 'md',
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const items = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
];

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select {...args} value={value} onValueChange={setValue} items={items} />
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <Select
          variant="flat"
          placeholder="Flat variant"
          value={value}
          onValueChange={setValue}
          items={items}
        />
        <Select
          variant="bordered"
          placeholder="Bordered variant"
          value={value}
          onValueChange={setValue}
          items={items}
        />
        <Select
          variant="underlined"
          placeholder="Underlined variant"
          value={value}
          onValueChange={setValue}
          items={items}
        />
      </View>
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    return (
      <Select
        label="Country"
        placeholder="Select your country"
        value={country}
        onValueChange={setCountry}
        items={[
          { label: 'United States', value: 'us' },
          { label: 'Canada', value: 'ca' },
          { label: 'United Kingdom', value: 'uk' },
          { label: 'Germany', value: 'de' },
          { label: 'France', value: 'fr' },
        ]}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <View style={{ gap: 16 }}>
        <Select
          size="sm"
          placeholder="Small"
          value={value}
          onValueChange={setValue}
          items={items}
        />
        <Select
          size="md"
          placeholder="Medium"
          value={value}
          onValueChange={setValue}
          items={items}
        />
        <Select
          size="lg"
          placeholder="Large"
          value={value}
          onValueChange={setValue}
          items={items}
        />
      </View>
    );
  },
};
