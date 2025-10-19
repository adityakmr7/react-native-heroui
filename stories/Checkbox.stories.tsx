import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Checkbox } from '../src/components/Checkbox/Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether checkbox is disabled',
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Initial checked state',
    },
  },
  args: {
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
    defaultSelected: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox {...args} isSelected={checked} onChange={setChecked}>
        Checkbox
      </Checkbox>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <View style={{ gap: 12 }}>
        <Checkbox
          colorScheme="primary"
          isSelected={checked}
          onChange={setChecked}
        >
          Primary
        </Checkbox>
        <Checkbox
          colorScheme="secondary"
          isSelected={checked}
          onChange={setChecked}
        >
          Secondary
        </Checkbox>
        <Checkbox
          colorScheme="success"
          isSelected={checked}
          onChange={setChecked}
        >
          Success
        </Checkbox>
        <Checkbox
          colorScheme="warning"
          isSelected={checked}
          onChange={setChecked}
        >
          Warning
        </Checkbox>
        <Checkbox
          colorScheme="danger"
          isSelected={checked}
          onChange={setChecked}
        >
          Danger
        </Checkbox>
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <View style={{ gap: 12 }}>
        <Checkbox size="sm" isSelected={checked} onChange={setChecked}>
          Small
        </Checkbox>
        <Checkbox size="md" isSelected={checked} onChange={setChecked}>
          Medium
        </Checkbox>
        <Checkbox size="lg" isSelected={checked} onChange={setChecked}>
          Large
        </Checkbox>
      </View>
    );
  },
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Checkbox defaultSelected={false}>Unchecked</Checkbox>
      <Checkbox defaultSelected={true}>Checked</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox defaultSelected={true} isDisabled>
        Disabled Checked
      </Checkbox>
    </View>
  ),
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState(['1']);

    const handleChange = (id: string) => {
      if (selected.includes(id)) {
        setSelected(selected.filter((item) => item !== id));
      } else {
        setSelected([...selected, id]);
      }
    };

    return (
      <View style={{ gap: 12 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
          Select options:
        </Text>
        <Checkbox
          isSelected={selected.includes('1')}
          onChange={() => handleChange('1')}
        >
          Option 1
        </Checkbox>
        <Checkbox
          isSelected={selected.includes('2')}
          onChange={() => handleChange('2')}
        >
          Option 2
        </Checkbox>
        <Checkbox
          isSelected={selected.includes('3')}
          onChange={() => handleChange('3')}
        >
          Option 3
        </Checkbox>
      </View>
    );
  },
};
