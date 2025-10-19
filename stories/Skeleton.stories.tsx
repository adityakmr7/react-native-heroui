import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Skeleton } from '../src/components/Skeleton/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    width: {
      control: 'number',
      description: 'Skeleton width',
    },
    height: {
      control: 'number',
      description: 'Skeleton height',
    },
    borderRadius: {
      control: 'number',
      description: 'Border radius',
    },
  },
  args: {
    width: 200,
    height: 20,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  render: (args) => <Skeleton {...args} />,
};

export const Shapes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Skeleton width={200} height={20} />
      <Skeleton width={300} height={20} />
      <Skeleton width={250} height={20} />
      <Skeleton width={50} height={50} borderRadius={25} />
      <Skeleton width={100} height={100} borderRadius={8} />
    </View>
  ),
};

export const ProfileCardLoading: Story = {
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
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        <Skeleton width={50} height={50} borderRadius={25} />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton width="80%" height={16} />
          <Skeleton width="60%" height={14} />
        </View>
      </View>
      <Skeleton width="100%" height={12} style={{ marginBottom: 8 }} />
      <Skeleton width="90%" height={12} style={{ marginBottom: 8 }} />
      <Skeleton width="95%" height={12} />
    </View>
  ),
};

export const CardListLoading: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <View
          key={i}
          style={{
            padding: 16,
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <Skeleton width="70%" height={20} style={{ marginBottom: 12 }} />
          <Skeleton width="100%" height={14} style={{ marginBottom: 8 }} />
          <Skeleton width="85%" height={14} />
        </View>
      ))}
    </View>
  ),
};
