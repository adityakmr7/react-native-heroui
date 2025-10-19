import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../src/hooks/useTheme';
import { Button } from '../src/components/Button/Button';
import { Input } from '../src/components/Input/Input';
import { Card, CardHeader, CardBody } from '../src/components/Card/Card';

// Component to display theme colors
const ThemeColors = () => {
  const { theme, themeMode, toggleTheme } = useTheme();

  const colorGroups = [
    {
      title: 'Semantic Colors',
      colors: [
        { name: 'primary', value: theme.colors.primary },
        { name: 'secondary', value: theme.colors.secondary },
        { name: 'success', value: theme.colors.success },
        { name: 'warning', value: theme.colors.warning },
        { name: 'danger', value: theme.colors.danger },
      ],
    },
    {
      title: 'Layout Colors',
      colors: [
        { name: 'background', value: theme.colors.background },
        { name: 'foreground', value: theme.colors.foreground },
        { name: 'divider', value: theme.colors.divider },
      ],
    },
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 20, gap: 24 }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>
            Current Theme: {themeMode}
          </Text>
          <Button onPress={toggleTheme} colorScheme="primary">
            Toggle Theme
          </Button>
        </View>

        {colorGroups.map((group) => (
          <View key={group.title}>
            <Text
              style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
            >
              {group.title}
            </Text>
            <View style={{ gap: 8 }}>
              {group.colors.map((color) => (
                <View
                  key={color.name}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    padding: 12,
                    backgroundColor: theme.colors.content1,
                    borderRadius: 8,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: color.value,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: theme.colors.divider,
                    }}
                  />
                  <View>
                    <Text style={{ fontWeight: '600', fontSize: 14 }}>
                      {color.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        opacity: 0.6,
                        fontFamily: 'monospace',
                      }}
                    >
                      {color.value}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

// Component to show themed components
const ThemedComponents = () => {
  const { theme } = useTheme();

  return (
    <View style={{ padding: 20, gap: 24 }}>
      <Card variant="elevated">
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Themed Components
          </Text>
        </CardHeader>
        <CardBody>
          <View style={{ gap: 12 }}>
            <Text>All components automatically use theme colors:</Text>

            <View style={{ gap: 8 }}>
              <Button colorScheme="primary">Primary Button</Button>
              <Button colorScheme="secondary">Secondary Button</Button>
              <Button colorScheme="success">Success Button</Button>
            </View>

            <Input placeholder="Themed input" />
          </View>
        </CardBody>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Spacing Tokens
          </Text>
        </CardHeader>
        <CardBody>
          <View style={{ gap: theme.spacing['unit-2'] }}>
            <Text>unit-2: {theme.spacing['unit-2']}px</Text>
            <Text>unit-4: {theme.spacing['unit-4']}px</Text>
            <Text>unit-6: {theme.spacing['unit-6']}px</Text>
            <Text>unit-8: {theme.spacing['unit-8']}px</Text>
          </View>
        </CardBody>
      </Card>

      <Card variant="bordered">
        <CardHeader>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Typography</Text>
        </CardHeader>
        <CardBody>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: theme.typography.fontSizes['text-tiny'] }}>
              Tiny Text ({theme.typography.fontSizes['text-tiny']}px)
            </Text>
            <Text
              style={{ fontSize: theme.typography.fontSizes['text-small'] }}
            >
              Small Text ({theme.typography.fontSizes['text-small']}px)
            </Text>
            <Text
              style={{ fontSize: theme.typography.fontSizes['text-medium'] }}
            >
              Medium Text ({theme.typography.fontSizes['text-medium']}px)
            </Text>
            <Text
              style={{ fontSize: theme.typography.fontSizes['text-large'] }}
            >
              Large Text ({theme.typography.fontSizes['text-large']}px)
            </Text>
          </View>
        </CardBody>
      </Card>
    </View>
  );
};

const meta: Meta = {
  title: 'Theme/Theming System',
  parameters: {
    docs: {
      description: {
        component:
          'React Native HeroUI provides a comprehensive theming system with colors, spacing, typography, and more.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const ColorPalette: Story = {
  render: () => <ThemeColors />,
  parameters: {
    docs: {
      description: {
        story:
          'Visual display of all theme colors. Toggle between light and dark mode to see the differences.',
      },
    },
  },
};

export const ThemedComponentsExample: Story = {
  render: () => <ThemedComponents />,
  parameters: {
    docs: {
      description: {
        story: 'Examples of how components automatically use theme values.',
      },
    },
  },
};

export const CustomStyles: Story = {
  render: () => {
    const { theme } = useTheme();

    return (
      <View style={{ padding: 20, gap: 16 }}>
        <Card>
          <CardHeader>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Using Theme in Custom Styles
            </Text>
          </CardHeader>
          <CardBody>
            <View
              style={{
                backgroundColor: theme.colors['primary-50'],
                padding: theme.spacing['unit-4'],
                borderRadius: theme.borderRadius['rounded-medium'],
                borderWidth: 1,
                borderColor: theme.colors.primary,
              }}
            >
              <Text style={{ color: theme.colors.primary, fontWeight: '600' }}>
                Custom styled view using theme tokens
              </Text>
              <Text style={{ color: theme.colors.foreground, marginTop: 8 }}>
                This demonstrates using theme.colors, theme.spacing, and
                theme.borderRadius in custom components.
              </Text>
            </View>
          </CardBody>
        </Card>

        <View
          style={{
            padding: theme.spacing['unit-6'],
            backgroundColor: theme.colors.content1,
            borderRadius: theme.borderRadius['rounded-large'],
            ...theme.shadows['shadow-md'],
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>
            Another Example
          </Text>
          <Text style={{ opacity: 0.7 }}>
            Using shadow-md from theme.shadows
          </Text>
        </View>
      </View>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'How to use theme tokens in custom component styles.',
      },
    },
  },
};

export const AllColorScales: Story = {
  render: () => {
    const { theme } = useTheme();
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const colorFamilies = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
    ];

    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 20, gap: 24 }}>
          {colorFamilies.map((family) => (
            <View key={family}>
              <Text
                style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}
              >
                {family.charAt(0).toUpperCase() + family.slice(1)} Scale
              </Text>
              <View style={{ gap: 4 }}>
                {shades.map((shade) => {
                  const colorKey =
                    `${family}-${shade}` as keyof typeof theme.colors;
                  const color = theme.colors[colorKey];
                  return (
                    <View
                      key={shade}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <View
                        style={{
                          width: 60,
                          height: 40,
                          backgroundColor: color,
                          borderRadius: 4,
                          borderWidth: 1,
                          borderColor: theme.colors.divider,
                        }}
                      />
                      <Text style={{ fontFamily: 'monospace', fontSize: 12 }}>
                        {colorKey}: {color}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete color scales (50-900) for all color families.',
      },
    },
  },
};
