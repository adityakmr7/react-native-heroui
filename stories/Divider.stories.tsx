import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Divider } from '../src/components/Divider/Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Playground: Story = {
  render: (args) => <Divider {...args} />,
};

export const Horizontal: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text>Content above</Text>
      <Divider />
      <Text>Content below</Text>
    </View>
  ),
};

export const Vertical: Story = {
  render: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        height: 100,
      }}
    >
      <Text>Left</Text>
      <Divider orientation="vertical" />
      <Text>Middle</Text>
      <Divider orientation="vertical" />
      <Text>Right</Text>
    </View>
  ),
};

export const InCard: Story = {
  render: () => (
    <View
      style={{
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>
        Card Header
      </Text>
      <Divider />
      <Text style={{ marginVertical: 12 }}>Card body content goes here.</Text>
      <Divider />
      <View style={{ marginTop: 12, flexDirection: 'row', gap: 8 }}>
        <Text style={{ fontSize: 12, color: '#0066FF' }}>Action 1</Text>
        <Text style={{ fontSize: 12, color: '#0066FF' }}>Action 2</Text>
      </View>
    </View>
  ),
};
