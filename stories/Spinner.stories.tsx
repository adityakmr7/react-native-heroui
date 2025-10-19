import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Spinner } from '../src/components/Spinner/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size',
    },
    colorScheme: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'default',
        'white',
      ],
      description: 'Color scheme from theme',
    },
    label: {
      control: 'text',
      description: 'Loading label text',
    },
  },
  args: {
    size: 'md',
    colorScheme: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {
  render: (args) => <Spinner {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </View>
  ),
};

export const Colors: Story = {
  render: () => (
    <View
      style={{
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Spinner colorScheme="default" />
      <Spinner colorScheme="primary" />
      <Spinner colorScheme="secondary" />
      <Spinner colorScheme="success" />
      <Spinner colorScheme="warning" />
      <Spinner colorScheme="danger" />
    </View>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Spinner label="Loading..." colorScheme="primary" />
      <Spinner label="Please wait" colorScheme="secondary" />
      <Spinner label="Processing" colorScheme="success" size="lg" />
    </View>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View
        style={{
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
        }}
      >
        <Spinner colorScheme="primary" />
        <Text style={{ marginTop: 12 }}>Loading content...</Text>
      </View>

      <View
        style={{
          alignItems: 'center',
          padding: 20,
          backgroundColor: '#F3F4F6',
          borderRadius: 8,
        }}
      >
        <Spinner colorScheme="success" size="lg" />
        <Text style={{ marginTop: 12, fontWeight: 'bold' }}>
          Processing payment
        </Text>
        <Text style={{ marginTop: 4, fontSize: 12, opacity: 0.7 }}>
          Please do not close this window
        </Text>
      </View>
    </View>
  ),
};
