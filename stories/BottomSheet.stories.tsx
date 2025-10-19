import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { BottomSheet } from '../src/components/BottomSheet/BottomSheet';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Components/BottomSheet',
  component: BottomSheet,
  parameters: {
    docs: {
      description: {
        component:
          'Gesture-driven bottom sheet with snap points. Note: Gestures work best on mobile devices.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Open Bottom Sheet</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <View style={{ padding: 24 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              Bottom Sheet
            </Text>
            <Text style={{ marginBottom: 20 }}>
              This is a bottom sheet component. On mobile, you can swipe down to
              close.
            </Text>
            <Button onPress={() => setIsOpen(false)}>Close</Button>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

export const WithSnapPoints: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Open with Snap Points</Button>
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          snapPoints={['25%', '50%', '75%']}
        >
          <View style={{ padding: 24 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              Snap Points Demo
            </Text>
            <Text>Try dragging the sheet to different heights on mobile.</Text>
            <View style={{ marginTop: 100, opacity: 0.3 }}>
              <Text>Snap points: 25%, 50%, 75%</Text>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  },
};

export const ActionSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Show Actions</Button>
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}
            >
              Choose an action
            </Text>
            <View style={{ gap: 12 }}>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                📷 Take Photo
              </Button>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                🖼️ Choose from Library
              </Button>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                📁 Browse Files
              </Button>
              <Button
                variant="ghost"
                colorScheme="danger"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </View>
          </View>
        </BottomSheet>
      </View>
    );
  },
};
