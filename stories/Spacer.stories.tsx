import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Spacer } from '../src/components/Spacer/Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'Components/Spacer',
  component: Spacer,
  argTypes: {
    x: {
      control: 'number',
      description: 'Horizontal spacing',
    },
    y: {
      control: 'number',
      description: 'Vertical spacing',
    },
  },
  args: {
    y: 16,
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

export const Playground: Story = {
  render: (args) => (
    <View>
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>Element 1</Text>
      </View>
      <Spacer {...args} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>Element 2</Text>
      </View>
    </View>
  ),
};

export const VerticalSpacing: Story = {
  render: () => (
    <View>
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>y=8</Text>
      </View>
      <Spacer y={8} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>y=16</Text>
      </View>
      <Spacer y={16} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>y=24</Text>
      </View>
      <Spacer y={24} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>y=32</Text>
      </View>
    </View>
  ),
};

export const HorizontalSpacing: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>x=8</Text>
      </View>
      <Spacer x={8} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>x=16</Text>
      </View>
      <Spacer x={16} />
      <View
        style={{ padding: 12, backgroundColor: '#E5E7EB', borderRadius: 8 }}
      >
        <Text>x=24</Text>
      </View>
    </View>
  ),
};

export const FlexSpacing: Story = {
  render: () => (
    <View>
      <Text style={{ marginBottom: 12 }}>Using Spacer for flex layouts:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Left</Text>
        <Spacer x={1} style={{ flex: 1 }} />
        <Text>Right</Text>
      </View>
    </View>
  ),
};
