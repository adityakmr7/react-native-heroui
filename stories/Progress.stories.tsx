import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Progress } from '../src/components/Progress/Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Progress value (0-100)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar size',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme',
    },
    showValueLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
  },
  args: {
    value: 60,
    size: 'md',
    colorScheme: 'primary',
    showValueLabel: false,
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  render: (args) => <Progress {...args} />,
};

export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Progress value={70} colorScheme="primary" />
      <Progress value={70} colorScheme="secondary" />
      <Progress value={70} colorScheme="success" />
      <Progress value={70} colorScheme="warning" />
      <Progress value={70} colorScheme="danger" />
    </View>
  ),
};

export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </View>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Text>Download Progress</Text>
          <Text style={{ fontWeight: 'bold' }}>75%</Text>
        </View>
        <Progress value={75} colorScheme="primary" />
      </View>

      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
          }}
        >
          <Text>Upload Complete</Text>
          <Text style={{ fontWeight: 'bold' }}>100%</Text>
        </View>
        <Progress value={100} colorScheme="success" />
      </View>
    </View>
  ),
};

export const ProgressSteps: Story = {
  render: () => (
    <View style={{ gap: 24 }}>
      <View>
        <Text style={{ marginBottom: 8 }}>Step 1 of 4 - Profile Info</Text>
        <Progress value={25} colorScheme="primary" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Step 2 of 4 - Contact Details</Text>
        <Progress value={50} colorScheme="primary" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Step 3 of 4 - Verification</Text>
        <Progress value={75} colorScheme="primary" />
      </View>
      <View>
        <Text style={{ marginBottom: 8 }}>Step 4 of 4 - Complete!</Text>
        <Progress value={100} colorScheme="success" />
      </View>
    </View>
  ),
};
