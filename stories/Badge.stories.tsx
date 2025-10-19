import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Badge } from '../src/components/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'flat', 'dot'],
      description: 'Badge variant',
    },
    content: {
      control: 'text',
      description: 'Badge content (number or text)',
    },
    placement: {
      control: { type: 'select' },
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Badge placement',
    },
  },
  args: {
    content: '5',
    colorScheme: 'danger',
    variant: 'solid',
    placement: 'top-right',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  render: (args) => (
    <Badge {...args}>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#E5E7EB',
          borderRadius: 8,
        }}
      />
    </Badge>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
      <Badge content="5" colorScheme="primary">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="3" colorScheme="secondary">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="99+" colorScheme="success">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="!" colorScheme="warning">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="10" colorScheme="danger">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
    </View>
  ),
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <Badge content="5" variant="solid" colorScheme="danger">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="5" variant="flat" colorScheme="danger">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge variant="dot" colorScheme="danger">
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
    </View>
  ),
};

export const Placements: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 48, flexWrap: 'wrap' }}>
      <Badge content="TR" placement="top-right" colorScheme="danger">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="TL" placement="top-left" colorScheme="primary">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="BR" placement="bottom-right" colorScheme="success">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
      <Badge content="BL" placement="bottom-left" colorScheme="warning">
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: '#E5E7EB',
            borderRadius: 8,
          }}
        />
      </Badge>
    </View>
  ),
};

export const WithText: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24 }}>
      <Badge content="NEW" colorScheme="success">
        <Text style={{ fontSize: 16 }}>Feature</Text>
      </Badge>
      <Badge content="HOT" colorScheme="danger">
        <Text style={{ fontSize: 16 }}>Product</Text>
      </Badge>
      <Badge content="SALE" colorScheme="warning">
        <Text style={{ fontSize: 16 }}>Item</Text>
      </Badge>
    </View>
  ),
};
