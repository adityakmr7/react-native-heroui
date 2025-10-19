import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView } from 'react-native';
import { Button } from '../src/components/Button/Button';

const WelcomeComponent = () => {
  return (
    <ScrollView>
      <View style={{ padding: 40, maxWidth: 800 }}>
        <Text style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 16 }}>
          React Native HeroUI
        </Text>
        <Text style={{ fontSize: 20, opacity: 0.7, marginBottom: 32 }}>
          Beautiful, fast and modern React Native UI library
        </Text>

        <View style={{ gap: 24 }}>
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}
            >
              🎨 Interactive Playground
            </Text>
            <Text style={{ marginBottom: 16, lineHeight: 24 }}>
              Welcome to the React Native HeroUI Storybook! Here you can explore
              all 27+ components interactively. Use the sidebar to navigate
              between components and the Controls panel to modify props in
              real-time.
            </Text>
          </View>

          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              🚀 Features
            </Text>
            <View style={{ gap: 8 }}>
              <Text>✓ 27+ production-ready components</Text>
              <Text>✓ Full TypeScript support</Text>
              <Text>✓ Light & dark mode</Text>
              <Text>✓ 60fps animations with Reanimated</Text>
              <Text>✓ Fully accessible</Text>
              <Text>✓ Tree-shakeable</Text>
              <Text>✓ Comprehensive theming system</Text>
            </View>
          </View>

          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              📦 Installation
            </Text>
            <View
              style={{
                backgroundColor: '#F3F4F6',
                padding: 16,
                borderRadius: 8,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontFamily: 'monospace' }}>
                npm install react-native-heroui
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#F3F4F6',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: 'monospace' }}>
                yarn add react-native-heroui
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              🎯 Quick Start
            </Text>
            <View
              style={{
                backgroundColor: '#F3F4F6',
                padding: 16,
                borderRadius: 8,
              }}
            >
              <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
                {`import { HeroUIProvider, Button } from 'react-native-heroui';

function App() {
  return (
    <HeroUIProvider>
      <Button colorScheme="primary">
        Click Me
      </Button>
    </HeroUIProvider>
  );
}`}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}
            >
              📚 Component Categories
            </Text>
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  Form & Input (9)
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.7 }}>
                  Button, Input, Textarea, Checkbox, Radio, Switch, Slider,
                  Select, InputOtp
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  Layout & Navigation (8)
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.7 }}>
                  Card, Divider, Spacer, Modal, Accordion, Tabs, BottomSheet,
                  Drawer
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  Feedback (5)
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.7 }}>
                  Alert, Toast, Spinner, Progress, Skeleton
                </Text>
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  Data Display (5)
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.7 }}>
                  Avatar, Badge, Chip, Image, Tooltip
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              padding: 20,
              backgroundColor: '#EFF6FF',
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
              💡 Pro Tip
            </Text>
            <Text>
              Use the theme toggle (🎨 icon) in the toolbar to switch between
              light and dark modes and see how components adapt automatically!
            </Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <Button colorScheme="primary">Get Started</Button>
            <Button variant="outline">View Docs</Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const meta: Meta = {
  title: 'Welcome',
  parameters: {
    docs: {
      description: {
        component: 'Welcome to React Native HeroUI Storybook!',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  render: () => <WelcomeComponent />,
};
