import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Drawer } from '../src/components/Drawer/Drawer';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Drawer placement',
    },
  },
  args: {
    placement: 'left',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Side navigation drawer with 4 placement options and gesture support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <View style={{ padding: 24 }}>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              Drawer Menu
            </Text>
            <View style={{ gap: 12 }}>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                🏠 Home
              </Button>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                👤 Profile
              </Button>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                ⚙️ Settings
              </Button>
              <Button variant="ghost" onPress={() => setIsOpen(false)}>
                ℹ️ About
              </Button>
            </View>
          </View>
        </Drawer>
      </View>
    );
  },
};

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = useState<
      'left' | 'right' | 'top' | 'bottom' | null
    >(null);
    return (
      <View style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Button size="sm" onPress={() => setPlacement('left')}>
            Left
          </Button>
          <Button size="sm" onPress={() => setPlacement('right')}>
            Right
          </Button>
          <Button size="sm" onPress={() => setPlacement('top')}>
            Top
          </Button>
          <Button size="sm" onPress={() => setPlacement('bottom')}>
            Bottom
          </Button>
        </View>

        {placement && (
          <Drawer
            isOpen={true}
            onClose={() => setPlacement(null)}
            placement={placement}
          >
            <View style={{ padding: 24 }}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
              >
                {placement.charAt(0).toUpperCase() + placement.slice(1)} Drawer
              </Text>
              <Text style={{ marginBottom: 20 }}>
                Drawer opens from: {placement}
              </Text>
              <Button onPress={() => setPlacement(null)}>Close</Button>
            </View>
          </Drawer>
        )}
      </View>
    );
  },
};

export const NavigationMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View>
        <Button onPress={() => setIsOpen(true)}>☰ Menu</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placement="left"
        >
          <View style={{ padding: 24, flex: 1 }}>
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 24 }}
            >
              Navigation
            </Text>
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
                  MAIN
                </Text>
                <Button variant="ghost" onPress={() => setIsOpen(false)}>
                  Dashboard
                </Button>
                <Button variant="ghost" onPress={() => setIsOpen(false)}>
                  Projects
                </Button>
                <Button variant="ghost" onPress={() => setIsOpen(false)}>
                  Team
                </Button>
              </View>
              <View>
                <Text style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
                  ACCOUNT
                </Text>
                <Button variant="ghost" onPress={() => setIsOpen(false)}>
                  Settings
                </Button>
                <Button variant="ghost" onPress={() => setIsOpen(false)}>
                  Logout
                </Button>
              </View>
            </View>
          </View>
        </Drawer>
      </View>
    );
  },
};
