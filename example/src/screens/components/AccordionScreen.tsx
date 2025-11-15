import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionItem,
  useTheme,
} from 'react-native-heroui';

// Indicator component extracted outside render
function CustomIndicator({
  isOpen,
  color,
}: {
  isOpen: boolean | undefined;
  color: string;
}) {
  return (
    <Text style={[styles.indicator, { color }]}>
      {(isOpen ?? false) ? '−' : '+'}
    </Text>
  );
}

// Factory function to create indicator function
function createIndicator(color: string) {
  return ({ isOpen }: { isOpen?: boolean }) => (
    <CustomIndicator isOpen={isOpen} color={color} />
  );
}

export default function AccordionScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Light Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Light Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="light" defaultExpandedKeys={['1']}>
              <AccordionItem
                itemKey="1"
                title="What is React Native HeroUI?"
                subtitle="Learn about this library"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  React Native HeroUI is a modern, beautiful UI component
                  library for React Native applications, inspired by NextUI.
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="2" title="How to get started?">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Install the package and wrap your app with ThemeProvider.
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="3" title="Key Features">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Built-in dark mode, TypeScript support, customizable themes,
                  and a wide range of beautiful components.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Bordered Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Bordered Variant (Multiple Selection)
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="bordered" selectionMode="multiple">
              <AccordionItem itemKey="a1" title="Components">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Button, Input, Card, Avatar, Badge, Chip, Switch, Accordion,
                  and more!
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="a2" title="Hooks">
                <Text style={{ color: theme.colors['default-600'] }}>
                  useTheme, useColorMode, useResponsive, useDisclosure for
                  powerful functionality.
                </Text>
              </AccordionItem>
              <AccordionItem itemKey="a3" title="Theming">
                <Text style={{ color: theme.colors['default-600'] }}>
                  Fully customizable theme system with light and dark mode
                  support out of the box.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Splitted Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Splitted Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="splitted" isCompact>
              <AccordionItem
                itemKey="s1"
                title="💡 Installation"
                startContent={
                  <View
                    style={[
                      styles.indicatorDot,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  npm install react-native-heroui
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="s2"
                title="🎨 Customization"
                startContent={
                  <View
                    style={[
                      styles.indicatorDot,
                      { backgroundColor: theme.colors.secondary },
                    ]}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Customize themes, colors, spacing, and more to match your
                  brand.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="s3"
                title="🚀 Performance"
                startContent={
                  <View
                    style={[
                      styles.indicatorDot,
                      { backgroundColor: theme.colors.success },
                    ]}
                  />
                }
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Optimized for performance with minimal re-renders and smooth
                  animations.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Shadow Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Shadow Variant (Custom Indicator)
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="shadow">
              <AccordionItem
                itemKey="c1"
                title="Premium Features"
                indicator={createIndicator(theme.colors.primary)}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Get access to premium components, priority support, and
                  advanced features.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="c2"
                title="Documentation"
                indicator={createIndicator(theme.colors.primary)}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Comprehensive documentation with examples and API references.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  indicator: {
    fontSize: 16,
  },
  bottomSpacer: {
    height: 40,
  },
});
