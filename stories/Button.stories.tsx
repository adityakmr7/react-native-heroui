import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import { Button } from '../src/components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost', 'link'],
      description: 'Button variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    colorScheme: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Color scheme from theme',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether button is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether button shows loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether button takes full width',
    },
    children: {
      control: 'text',
      description: 'Button label',
    },
  },
  args: {
    children: 'Button',
    variant: 'solid',
    size: 'md',
    colorScheme: 'primary',
    isDisabled: false,
    isLoading: false,
    fullWidth: false,
  },
  parameters: {
    docs: {
      description: {
        component:
          'A versatile button component with multiple variants, sizes, and color schemes.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Playground
export const Playground: Story = {
  render: (args) => <Button {...args} />,
};

// Variants
export const Variants: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button variant="solid" colorScheme="primary">
        Solid
      </Button>
      <Button variant="outline" colorScheme="primary">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="primary">
        Ghost
      </Button>
      <Button variant="link" colorScheme="primary">
        Link
      </Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button supports 4 variants: solid, outline, ghost, and link.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <View style={{ gap: 12, alignItems: 'flex-start' }}>
      <Button size="sm" colorScheme="primary">
        Small
      </Button>
      <Button size="md" colorScheme="primary">
        Medium
      </Button>
      <Button size="lg" colorScheme="primary">
        Large
      </Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: sm, md, lg.',
      },
    },
  },
};

// Colors
export const Colors: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="secondary">Secondary</Button>
      <Button colorScheme="success">Success</Button>
      <Button colorScheme="warning">Warning</Button>
      <Button colorScheme="danger">Danger</Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button supports multiple color schemes from the theme.',
      },
    },
  },
};

// States
export const States: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button colorScheme="primary">Normal</Button>
      <Button colorScheme="primary" isLoading>
        Loading
      </Button>
      <Button colorScheme="primary" isDisabled>
        Disabled
      </Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button supports loading and disabled states.',
      },
    },
  },
};

// Full Width
export const FullWidth: Story = {
  render: () => (
    <View style={{ width: '100%' }}>
      <Button colorScheme="primary" fullWidth>
        Full Width Button
      </Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Button can take full width of its container.',
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <View style={{ gap: 12 }}>
      <Button
        colorScheme="primary"
        startContent={<Text style={{ fontSize: 16 }}>⭐</Text>}
      >
        Start Icon
      </Button>
      <Button
        colorScheme="primary"
        endContent={<Text style={{ fontSize: 16 }}>→</Text>}
      >
        End Icon
      </Button>
      <Button
        colorScheme="primary"
        startContent={<Text style={{ fontSize: 16 }}>⭐</Text>}
        endContent={<Text style={{ fontSize: 16 }}>→</Text>}
      >
        Both Icons
      </Button>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons can have start and end content (icons, etc.).',
      },
    },
  },
};

// Color Matrix
export const ColorMatrix: Story = {
  render: () => {
    const variants = ['solid', 'outline', 'ghost', 'link'] as const;
    const colors = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
    ] as const;

    return (
      <View style={{ gap: 24 }}>
        {variants.map((variant) => (
          <View key={variant}>
            <Text
              style={{ fontWeight: 'bold', marginBottom: 12, fontSize: 16 }}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Text>
            <View style={{ gap: 8 }}>
              {colors.map((color) => (
                <Button key={color} variant={variant} colorScheme={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </Button>
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All combinations of variants and color schemes.',
      },
    },
  },
};
