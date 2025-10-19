import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Alert } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '../src/components/Card/Card';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'bordered', 'flat'],
      description: 'Card variant style',
    },
    isPressable: {
      control: 'boolean',
      description: 'Whether card is pressable',
    },
  },
  args: {
    variant: 'elevated',
    isPressable: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'Container component with header, body, and footer sections.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// Playground
export const Playground: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Card Title</Text>
      </CardHeader>
      <CardBody>
        <Text>
          This is the card body content. You can put any content here.
        </Text>
      </CardBody>
      <CardFooter>
        <Button size="sm" colorScheme="primary">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Card variant="elevated">
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Elevated Card
          </Text>
        </CardHeader>
        <CardBody>
          <Text>Card with elevation shadow.</Text>
        </CardBody>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
            Bordered Card
          </Text>
        </CardHeader>
        <CardBody>
          <Text>Card with border.</Text>
        </CardBody>
      </Card>

      <Card variant="flat">
        <CardHeader>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Flat Card</Text>
        </CardHeader>
        <CardBody>
          <Text>Card without shadow or border.</Text>
        </CardBody>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card supports 3 variants: elevated, bordered, and flat.',
      },
    },
  },
};

// Simple Card
export const Simple: Story = {
  render: () => (
    <Card>
      <CardBody>
        <Text>A simple card with just body content.</Text>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal card with just body content.',
      },
    },
  },
};

// With Header and Footer
export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Product Card</Text>
        <Text style={{ fontSize: 14, opacity: 0.7 }}>Premium Quality</Text>
      </CardHeader>
      <CardBody>
        <Text style={{ marginBottom: 12 }}>
          This is an amazing product that will change your life.
        </Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>$99.99</Text>
      </CardBody>
      <CardFooter>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button size="sm" variant="outline" colorScheme="primary">
            Details
          </Button>
          <Button size="sm" colorScheme="primary">
            Buy Now
          </Button>
        </View>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card with all sections: header, body, and footer.',
      },
    },
  },
};

// Pressable Card
export const Pressable: Story = {
  render: () => (
    <Card
      isPressable
      onPress={() => Alert.alert('Card Pressed', 'You pressed the card!')}
    >
      <CardBody>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Click Me!</Text>
        <Text style={{ marginTop: 8, opacity: 0.7 }}>
          This card is pressable.
        </Text>
      </CardBody>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card can be made pressable.',
      },
    },
  },
};

// Profile Card
export const ProfileCard: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: '#0066FF',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              JD
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>John Doe</Text>
            <Text style={{ fontSize: 14, opacity: 0.7 }}>
              Software Engineer
            </Text>
          </View>
        </View>
      </CardHeader>
      <CardBody>
        <Text>
          Passionate developer building amazing mobile experiences with React
          Native.
        </Text>
      </CardBody>
      <CardFooter>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button size="sm" variant="outline" colorScheme="primary">
            Message
          </Button>
          <Button size="sm" colorScheme="primary">
            Follow
          </Button>
        </View>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example profile card with avatar and actions.',
      },
    },
  },
};

// Stats Card
export const StatsCard: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
      <Card variant="bordered" style={{ flex: 1, minWidth: 150 }}>
        <CardBody>
          <Text style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
            Total Users
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>12.5K</Text>
          <Text style={{ fontSize: 12, color: '#10B981', marginTop: 4 }}>
            ↑ 12% from last month
          </Text>
        </CardBody>
      </Card>

      <Card variant="bordered" style={{ flex: 1, minWidth: 150 }}>
        <CardBody>
          <Text style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
            Revenue
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>$45.2K</Text>
          <Text style={{ fontSize: 12, color: '#10B981', marginTop: 4 }}>
            ↑ 8% from last month
          </Text>
        </CardBody>
      </Card>

      <Card variant="bordered" style={{ flex: 1, minWidth: 150 }}>
        <CardBody>
          <Text style={{ fontSize: 14, opacity: 0.7, marginBottom: 4 }}>
            Active Now
          </Text>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>573</Text>
          <Text style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>
            ↓ 3% from last hour
          </Text>
        </CardBody>
      </Card>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example stats dashboard cards.',
      },
    },
  },
};
