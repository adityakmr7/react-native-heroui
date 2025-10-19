import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Chip } from '../src/components/Chip/Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'bordered', 'flat', 'dot'],
      description: 'Chip variant',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Chip size',
    },
    closable: {
      control: 'boolean',
      description: 'Whether chip can be closed',
    },
  },
  args: {
    children: 'Chip',
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    closable: false,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {
  render: (args) => <Chip {...args} />,
};

export const Variants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Chip variant="solid" colorScheme="primary">
        Solid
      </Chip>
      <Chip variant="bordered" colorScheme="primary">
        Bordered
      </Chip>
      <Chip variant="flat" colorScheme="primary">
        Flat
      </Chip>
      <Chip variant="dot" colorScheme="primary">
        Dot
      </Chip>
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Chip colorScheme="primary">Primary</Chip>
      <Chip colorScheme="secondary">Secondary</Chip>
      <Chip colorScheme="success">Success</Chip>
      <Chip colorScheme="warning">Warning</Chip>
      <Chip colorScheme="danger">Danger</Chip>
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </View>
  ),
};

export const Closable: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Chip closable colorScheme="primary">
        Closable
      </Chip>
      <Chip closable colorScheme="secondary">
        Click X to close
      </Chip>
      <Chip closable colorScheme="success">
        Removable
      </Chip>
    </View>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      <Chip colorScheme="primary" startContent={<Text>⭐</Text>}>
        Featured
      </Chip>
      <Chip colorScheme="success" startContent={<Text>✓</Text>}>
        Verified
      </Chip>
      <Chip colorScheme="warning" startContent={<Text>⚡</Text>}>
        Premium
      </Chip>
    </View>
  ),
};

export const Tags: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Text style={{ fontWeight: 'bold' }}>Product Tags:</Text>
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <Chip size="sm" colorScheme="primary">
          React Native
        </Chip>
        <Chip size="sm" colorScheme="secondary">
          TypeScript
        </Chip>
        <Chip size="sm" colorScheme="success">
          UI Library
        </Chip>
        <Chip size="sm" variant="bordered" colorScheme="primary">
          Open Source
        </Chip>
        <Chip size="sm" variant="flat" colorScheme="warning">
          New
        </Chip>
      </View>
    </View>
  ),
};
