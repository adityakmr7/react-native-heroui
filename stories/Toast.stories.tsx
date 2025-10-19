import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Button } from '../src/components/Button/Button';
import { toast } from '../src/components/Toast/Toast';

const meta: Meta = {
  title: 'Components/Toast',
  parameters: {
    docs: {
      description: {
        component:
          'Toast notifications with auto-dismiss and customizable duration.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button
        onPress={() =>
          toast.show({
            title: 'Toast',
            description: 'This is a toast message!',
          })
        }
      >
        Show Toast
      </Button>
    </View>
  ),
};

export const Types: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button
        colorScheme="primary"
        onPress={() =>
          toast.info({
            title: 'Info',
            description: 'This is an info message',
          })
        }
      >
        Info Toast
      </Button>
      <Button
        colorScheme="success"
        onPress={() =>
          toast.success({
            title: 'Success',
            description: 'Operation completed successfully!',
          })
        }
      >
        Success Toast
      </Button>
      <Button
        colorScheme="warning"
        onPress={() =>
          toast.warning({
            title: 'Warning',
            description: 'Please review this',
          })
        }
      >
        Warning Toast
      </Button>
      <Button
        colorScheme="danger"
        onPress={() =>
          toast.error({
            title: 'Error',
            description: 'An error occurred!',
          })
        }
      >
        Error Toast
      </Button>
    </View>
  ),
};

export const WithDuration: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button
        onPress={() =>
          toast.show({
            title: 'Quick toast',
            description: 'Disappears in 2 seconds',
            timeout: 2000,
          })
        }
      >
        Short Duration
      </Button>
      <Button
        onPress={() =>
          toast.show({
            title: 'Normal toast',
            description: 'Disappears in 3 seconds',
            timeout: 3000,
          })
        }
      >
        Normal Duration
      </Button>
      <Button
        onPress={() =>
          toast.show({
            title: 'Long toast',
            description: 'Disappears in 5 seconds',
            timeout: 5000,
          })
        }
      >
        Long Duration
      </Button>
    </View>
  ),
};

export const WithAction: Story = {
  render: () => (
    <View>
      <Button
        onPress={() =>
          toast.show({
            title: 'Item deleted',
            description: 'The item has been removed',
            endContent: (
              <Text style={{ color: '#0066FF', fontWeight: 'bold' }} onPress={() => console.log('Undo')}>
                Undo
              </Text>
            ),
          })
        }
      >
        Delete with Undo
      </Button>
    </View>
  ),
};
