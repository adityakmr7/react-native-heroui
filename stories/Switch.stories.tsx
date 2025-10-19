import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Switch } from '../src/components/Switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether switch is disabled',
    },
  },
  args: {
    colorScheme: 'primary',
    size: 'md',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} value={checked} onValueChange={setChecked} />;
  },
};

export const Colors: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <View style={{ gap: 12 }}>
        <Switch
          colorScheme="primary"
          value={checked}
          onValueChange={setChecked}
        />
        <Switch
          colorScheme="secondary"
          value={checked}
          onValueChange={setChecked}
        />
        <Switch
          colorScheme="success"
          value={checked}
          onValueChange={setChecked}
        />
        <Switch
          colorScheme="warning"
          value={checked}
          onValueChange={setChecked}
        />
        <Switch
          colorScheme="danger"
          value={checked}
          onValueChange={setChecked}
        />
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <View style={{ gap: 12, alignItems: 'flex-start' }}>
        <Switch size="sm" value={checked} onValueChange={setChecked} />
        <Switch size="md" value={checked} onValueChange={setChecked} />
        <Switch size="lg" value={checked} onValueChange={setChecked} />
      </View>
    );
  },
};

export const States: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Switch value={false} />
      <Switch value={true} />
      <Switch value={false} isDisabled />
      <Switch value={true} isDisabled />
    </View>
  ),
};

export const WithLabels: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <View style={{ gap: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Enable Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            colorScheme="secondary"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Auto Save</Text>
          <Switch
            value={autoSave}
            onValueChange={setAutoSave}
            colorScheme="success"
          />
        </View>
      </View>
    );
  },
};
