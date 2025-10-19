import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Tabs, Tab } from '../src/components/Tabs/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'bordered', 'light', 'underlined'],
      description: 'Tabs variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Tabs size',
    },
  },
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: (args) => {
    const [selectedTab, setSelectedTab] = useState('1');
    return (
      <Tabs {...args} selectedKey={selectedTab} onSelectionChange={setSelectedTab}>
        <Tab tabKey="1" title="Tab 1">
          <View style={{ padding: 20 }}>
            <Text>Content for Tab 1</Text>
          </View>
        </Tab>
        <Tab tabKey="2" title="Tab 2">
          <View style={{ padding: 20 }}>
            <Text>Content for Tab 2</Text>
          </View>
        </Tab>
        <Tab tabKey="3" title="Tab 3">
          <View style={{ padding: 20 }}>
            <Text>Content for Tab 3</Text>
          </View>
        </Tab>
      </Tabs>
    );
  },
};

export const Variants: Story = {
  render: () => {
    const [selectedKey, setActiveTab] = useState('1');
    return (
      <View style={{ gap: 24 }}>
        <Tabs variant="solid" selectedKey={selectedKey} onSelectionChange={setActiveTab}>
          <Tab tabKey="1" title="Solid">
            <View style={{ padding: 20 }}>
              <Text>Solid variant</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Content 2</Text>
            </View>
          </Tab>
        </Tabs>

        <Tabs
          variant="bordered"
          selectedKey={selectedKey}
          onSelectionChange={setActiveTab}
        >
          <Tab tabKey="1" title="Bordered">
            <View style={{ padding: 20 }}>
              <Text>Bordered variant</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Content 2</Text>
            </View>
          </Tab>
        </Tabs>

        <Tabs
          variant="underlined"
          selectedKey={selectedKey}
          onSelectionChange={setActiveTab}
        >
          <Tab tabKey="1" title="Underlined">
            <View style={{ padding: 20 }}>
              <Text>Underlined variant</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Content 2</Text>
            </View>
          </Tab>
        </Tabs>
      </View>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [selectedKey, setActiveTab] = useState('home');
    return (
      <Tabs selectedKey={selectedKey} onSelectionChange={setActiveTab}>
        <Tab tabKey="home" title="🏠 Home">
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Home Tab
            </Text>
            <Text>Welcome to the home tab!</Text>
          </View>
        </Tab>
        <Tab tabKey="profile" title="👤 Profile">
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Profile Tab
            </Text>
            <Text>Your profile information here.</Text>
          </View>
        </Tab>
        <Tab tabKey="settings" title="⚙️ Settings">
          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              Settings Tab
            </Text>
            <Text>App settings and preferences.</Text>
          </View>
        </Tab>
      </Tabs>
    );
  },
};

export const Colors: Story = {
  render: () => {
    const [selectedKey, setActiveTab] = useState('1');
    return (
      <View style={{ gap: 24 }}>
        <Tabs
          color="primary"
          selectedKey={selectedKey}
          onSelectionChange={setActiveTab}
        >
          <Tab tabKey="1" title="Primary">
            <View style={{ padding: 20 }}>
              <Text>Primary content</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Tab 2 content</Text>
            </View>
          </Tab>
        </Tabs>
        <Tabs
          color="secondary"
          selectedKey={selectedKey}
          onSelectionChange={setActiveTab}
        >
          <Tab tabKey="1" title="Secondary">
            <View style={{ padding: 20 }}>
              <Text>Secondary content</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Tab 2 content</Text>
            </View>
          </Tab>
        </Tabs>
        <Tabs
          color="success"
          selectedKey={selectedKey}
          onSelectionChange={setActiveTab}
        >
          <Tab tabKey="1" title="Success">
            <View style={{ padding: 20 }}>
              <Text>Success content</Text>
            </View>
          </Tab>
          <Tab tabKey="2" title="Tab 2">
            <View style={{ padding: 20 }}>
              <Text>Tab 2 content</Text>
            </View>
          </Tab>
        </Tabs>
      </View>
    );
  },
};
