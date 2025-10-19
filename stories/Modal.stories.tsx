import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Modal } from '../src/components/Modal/Modal';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        'full',
      ],
      description: 'Modal size',
    },
    placement: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom'],
      description: 'Modal placement',
    },
  },
  args: {
    size: 'md',
    placement: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              Modal Title
            </Text>
            <Text style={{ marginBottom: 20 }}>
              This is the modal content. You can put any content here.
            </Text>
            <Button onPress={() => setIsOpen(false)}>Close</Button>
          </View>
        </Modal>
      </View>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm" onPress={() => setSize('sm')}>
            Small
          </Button>
          <Button size="sm" onPress={() => setSize('md')}>
            Medium
          </Button>
          <Button size="sm" onPress={() => setSize('lg')}>
            Large
          </Button>
          <Button size="sm" onPress={() => setSize('xl')}>
            Extra Large
          </Button>
        </View>

        {size && (
          <Modal isOpen={true} onClose={() => setSize(null)} size={size}>
            <View style={{ padding: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
              >
                {size.toUpperCase()} Modal
              </Text>
              <Text style={{ marginBottom: 20 }}>
                This modal has size: {size}
              </Text>
              <Button onPress={() => setSize(null)}>Close</Button>
            </View>
          </Modal>
        )}
      </View>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<
      'center' | 'top' | 'bottom' | null
    >(null);
    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button size="sm" onPress={() => setPlacement('top')}>
            Top
          </Button>
          <Button size="sm" onPress={() => setPlacement('center')}>
            Center
          </Button>
          <Button size="sm" onPress={() => setPlacement('bottom')}>
            Bottom
          </Button>
        </View>

        {placement && (
          <Modal
            isOpen={true}
            onClose={() => setPlacement(null)}
            placement={placement}
          >
            <View style={{ padding: 20 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
              >
                {placement} Modal
              </Text>
              <Text>Placed at: {placement}</Text>
              <Button
                onPress={() => setPlacement(null)}
                style={{ marginTop: 16 }}
              >
                Close
              </Button>
            </View>
          </Modal>
        )}
      </View>
    );
  },
};

export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Open Form</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
          <View style={{ padding: 24 }}>
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}
            >
              Create Account
            </Text>
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ marginBottom: 4 }}>Name</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <Text style={{ opacity: 0.5 }}>Enter your name</Text>
                </View>
              </View>
              <View>
                <Text style={{ marginBottom: 4 }}>Email</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  <Text style={{ opacity: 0.5 }}>Enter your email</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <Button variant="outline" onPress={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="primary" onPress={() => setIsOpen(false)}>
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  },
};
