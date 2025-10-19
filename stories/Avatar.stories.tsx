import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Avatar } from '../src/components/Avatar/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    name: {
      control: 'text',
      description: 'Name for fallback initials',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether avatar has border',
    },
  },
  args: {
    size: 'md',
    name: 'John Doe',
    bordered: false,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  render: (args) => <Avatar {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-end' }}>
      <Avatar size="sm" name="John Doe" />
      <Avatar size="md" name="John Doe" />
      <Avatar size="lg" name="John Doe" />
      <Avatar size="xl" name="John Doe" />
    </View>
  ),
};

export const WithImage: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" />
      <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane Smith" />
      <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob Johnson" />
    </View>
  ),
};

export const WithInitials: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <Avatar name="John Doe" />
      <Avatar name="Jane Smith" />
      <Avatar name="Bob Johnson" />
      <Avatar name="Alice Williams" />
      <Avatar name="Charlie Brown" />
    </View>
  ),
};

export const Bordered: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <Avatar name="John Doe" bordered />
      <Avatar
        src="https://i.pravatar.cc/150?img=1"
        name="Jane Smith"
        bordered
      />
      <Avatar name="Bob Johnson" bordered size="lg" />
    </View>
  ),
};
