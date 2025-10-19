import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Radio, RadioGroup } from '../src/components/Radio/Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Radio size',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether radio is disabled',
    },
  },
  args: {
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('1');
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <Radio {...args} value="1">
          Option 1
        </Radio>
      </RadioGroup>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [selected, setSelected] = useState('primary');
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <View style={{ gap: 12 }}>
          <Radio value="primary" colorScheme="primary">
            Primary
          </Radio>
          <Radio value="secondary" colorScheme="secondary">
            Secondary
          </Radio>
          <Radio value="success" colorScheme="success">
            Success
          </Radio>
          <Radio value="warning" colorScheme="warning">
            Warning
          </Radio>
          <Radio value="danger" colorScheme="danger">
            Danger
          </Radio>
        </View>
      </RadioGroup>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [selected, setSelected] = useState('md');
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <View style={{ gap: 12 }}>
          <Radio value="sm" size="sm">
            Small
          </Radio>
          <Radio value="md" size="md">
            Medium
          </Radio>
          <Radio value="lg" size="lg">
            Large
          </Radio>
        </View>
      </RadioGroup>
    );
  },
};

export const States: Story = {
  render: () => {
    const [selected, setSelected] = useState('1');
    return (
      <RadioGroup value={selected} onChange={setSelected}>
        <View style={{ gap: 12 }}>
          <Radio value="1">Normal</Radio>
          <Radio value="2">Option 2</Radio>
          <Radio value="disabled" isDisabled>
            Disabled
          </Radio>
        </View>
      </RadioGroup>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [plan, setPlan] = useState('pro');
    return (
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
          Choose your plan:
        </Text>
        <RadioGroup value={plan} onChange={setPlan}>
          <View style={{ gap: 12 }}>
            <Radio value="free" colorScheme="primary">
              Free - $0/month
            </Radio>
            <Radio value="pro" colorScheme="primary">
              Pro - $9/month
            </Radio>
            <Radio value="enterprise" colorScheme="primary">
              Enterprise - Contact us
            </Radio>
          </View>
        </RadioGroup>
        <Text style={{ marginTop: 12, opacity: 0.7 }}>Selected: {plan}</Text>
      </View>
    );
  },
};
