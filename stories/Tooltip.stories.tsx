import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Tooltip } from '../src/components/Tooltip/Tooltip';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
    },
  },
  args: {
    content: 'This is a tooltip',
    placement: 'top',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  render: (args) => (
    <View style={{ padding: 60, alignItems: 'center' }}>
      <Tooltip {...args}>
        <Button>Hover or Press Me</Button>
      </Tooltip>
    </View>
  ),
};

export const Placements: Story = {
  render: () => (
    <View style={{ gap: 80, padding: 40 }}>
      <View style={{ alignItems: 'center' }}>
        <Tooltip content="Tooltip on top" placement="top">
          <Button size="sm">Top</Button>
        </Tooltip>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Tooltip content="Tooltip on left" placement="left">
          <Button size="sm">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip on right" placement="right">
          <Button size="sm">Right</Button>
        </Tooltip>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Tooltip content="Tooltip on bottom" placement="bottom">
          <Button size="sm">Bottom</Button>
        </Tooltip>
      </View>
    </View>
  ),
};

export const WithText: Story = {
  render: () => (
    <View style={{ padding: 40 }}>
      <Text>
        Hover over{' '}
        <Tooltip content="This is helpful information!">
          <Text style={{ color: '#0066FF', fontWeight: 'bold' }}>
            this text
          </Text>
        </Tooltip>{' '}
        to see the tooltip.
      </Text>
    </View>
  ),
};

export const LongContent: Story = {
  render: () => (
    <View style={{ padding: 60, alignItems: 'center' }}>
      <Tooltip content="This is a longer tooltip with more information that helps explain what this button does in detail.">
        <Button colorScheme="primary">Show Details</Button>
      </Tooltip>
    </View>
  ),
};
