import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  HeroUIProvider,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Badge,
  Checkbox,
  Chip,
  Switch,
  Accordion,
  AccordionItem,
  Alert,
  useTheme,
} from 'react-native-heroui';
import Constants from 'expo-constants';

function ComponentShowcase() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const [email, setEmail] = React.useState('');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [tasks, setTasks] = React.useState([
    { id: 1, text: 'Review documentation', done: false },
    { id: 2, text: 'Test components', done: true },
    { id: 3, text: 'Deploy to production', done: false },
  ]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.foreground }]}>
            React Native HeroUI
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors['default-500'] }]}
          >
            Component Library Showcase
          </Text>
        </View>

        {/* Theme Toggle */}
        <Card variant="bordered" style={styles.section}>
          <CardBody>
            <View style={styles.row}>
              <View style={styles.flex}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.colors.foreground },
                  ]}
                >
                  Theme: {themeMode}
                </Text>
                <Text
                  style={[
                    styles.helperText,
                    { color: theme.colors['default-500'] },
                  ]}
                >
                  Toggle between light and dark mode
                </Text>
              </View>
              <Switch
                value={themeMode === 'dark'}
                onChange={toggleTheme}
                color="primary"
              />
            </View>
          </CardBody>
        </Card>

        {/* Buttons */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Buttons
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary" size="sm">
                Solid
              </Button>
              <Button variant="outline" colorScheme="secondary" size="sm">
                Outline
              </Button>
              <Button variant="ghost" colorScheme="success" size="sm">
                Ghost
              </Button>
              <Button variant="link" colorScheme="danger" size="sm">
                Link
              </Button>
            </View>
            <Button
              variant="solid"
              colorScheme="primary"
              fullWidth
              style={{ marginTop: 12 }}
            >
              Full Width Button
            </Button>
            <Button
              variant="solid"
              colorScheme="secondary"
              isLoading
              fullWidth
              style={{ marginTop: 12 }}
            >
              Loading Button
            </Button>
          </CardBody>
        </Card>

        {/* Input */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Input
            </Text>
          </CardHeader>
          <CardBody>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              helperText="We'll never share your email"
              onClear={() => setEmail('')}
            />
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              isRequired
              style={{ marginTop: 16 }}
            />
            <Input
              label="Disabled Input"
              placeholder="Disabled"
              isDisabled
              style={{ marginTop: 16 }}
            />
          </CardBody>
        </Card>

        {/* Avatars & Badges */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Avatars & Badges
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Badge content="5" color="danger" placement="top-right">
                <Avatar name="John Doe" size="lg" color="primary" />
              </Badge>
              <Badge isDot color="success" placement="bottom-right">
                <Avatar name="Jane Smith" size="lg" color="secondary" />
              </Badge>
              <Badge content="99+" color="primary" variant="flat">
                <Avatar name="Bob Wilson" size="lg" color="warning" />
              </Badge>
              <Badge content="NEW" color="secondary" shape="rectangle">
                <Avatar name="Alice Brown" size="lg" color="danger" />
              </Badge>
            </View>
            <View style={[styles.avatarRow, { marginTop: 16 }]}>
              <Badge content="1" variant="solid" color="danger">
                <Avatar name="Solid" size="lg" />
              </Badge>
              <Badge content="2" variant="flat" color="primary">
                <Avatar name="Flat" size="lg" />
              </Badge>
              <Badge content="3" variant="faded" color="success">
                <Avatar name="Faded" size="lg" />
              </Badge>
              <Badge content="4" variant="shadow" color="warning">
                <Avatar name="Shadow" size="lg" />
              </Badge>
            </View>
          </CardBody>
        </Card>

        {/* Checkboxes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Checkboxes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ gap: 12 }}>
              <Checkbox
                radius="sm"
                isSelected={agreedToTerms}
                onValueChange={setAgreedToTerms}
                color="primary"
              >
                I agree to the terms and conditions
              </Checkbox>

              {/* Todo list with line-through */}
              {tasks.map((task) => (
                <Checkbox
                  key={task.id}
                  isSelected={task.done}
                  onValueChange={() =>
                    setTasks(
                      tasks.map((t) =>
                        t.id === task.id ? { ...t, done: !t.done } : t
                      )
                    )
                  }
                  lineThrough
                  color="success"
                >
                  {task.text}
                </Checkbox>
              ))}

              {/* Different colors and states */}
              <View style={styles.chipContainer}>
                <Checkbox defaultSelected color="primary" size="sm">
                  Primary
                </Checkbox>
                <Checkbox defaultSelected color="secondary" size="sm">
                  Secondary
                </Checkbox>
                <Checkbox isIndeterminate color="warning" size="sm">
                  Partial
                </Checkbox>
                <Checkbox isDisabled size="sm">
                  Disabled
                </Checkbox>
              </View>
            </View>
          </CardBody>
        </Card>

        {/* Chips */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Chips
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Chip color="primary" variant="solid">
                React Native
              </Chip>
              <Chip color="secondary" variant="flat">
                TypeScript
              </Chip>
              <Chip color="success" variant="dot">
                Active
              </Chip>
              <Chip color="warning" variant="bordered">
                Warning
              </Chip>
              <Chip color="danger" onClose={() => console.log('Closed')}>
                Closeable
              </Chip>
            </View>
          </CardBody>
        </Card>

        {/* Switches */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Switches
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.switchRow}>
              <View style={styles.flex}>
                <Text
                  style={[styles.label, { color: theme.colors.foreground }]}
                >
                  Push Notifications
                </Text>
                <Text
                  style={[
                    styles.helperText,
                    { color: theme.colors['default-500'] },
                  ]}
                >
                  Receive notifications about updates
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onChange={setNotificationsEnabled}
                color="success"
              />
            </View>
            <View style={[styles.switchRow, { marginTop: 16 }]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Email Marketing
              </Text>
              <Switch defaultValue={false} color="primary" />
            </View>
          </CardBody>
        </Card>

        {/* Card Examples */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Interactive Card
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[styles.bodyText, { color: theme.colors['default-600'] }]}
            >
              This is a card with header, body, and footer sections. Cards can
              be elevated, flat, or bordered.
            </Text>
          </CardBody>
          <CardFooter>
            <View style={styles.cardFooter}>
              <Button variant="ghost" colorScheme="danger" size="sm">
                Cancel
              </Button>
              <Button variant="solid" colorScheme="primary" size="sm">
                Confirm
              </Button>
            </View>
          </CardFooter>
        </Card>

        {/* Accordion - Light Variant (Default) */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Light Variant
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
              <AccordionItem
                itemKey="2"
                title="How to get started?"
                subtitle="Installation guide"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Install the package using npm or yarn and wrap your app with
                  ThemeProvider to get started.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="3"
                title="Key Features"
                subtitle="What makes it special"
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Built-in dark mode, TypeScript support, customizable themes,
                  and a wide range of beautiful components.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Accordion - Multiple Selection & Bordered Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Bordered & Multiple
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

        {/* Accordion - Splitted Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Splitted Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="splitted" isCompact>
              <AccordionItem
                itemKey="s1"
                title="💡 Installation"
                startContent={
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.primary,
                    }}
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
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.secondary,
                    }}
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
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.success,
                    }}
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

        {/* Accordion - Shadow Variant with Custom Indicator */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Accordion - Custom Indicator
            </Text>
          </CardHeader>
          <CardBody>
            <Accordion variant="shadow">
              <AccordionItem
                itemKey="c1"
                title="Premium Features"
                indicator={({ isOpen }) => (
                  <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                    {isOpen ? '−' : '+'}
                  </Text>
                )}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Get access to premium components, priority support, and
                  advanced features.
                </Text>
              </AccordionItem>
              <AccordionItem
                itemKey="c2"
                title="Documentation"
                indicator={({ isOpen }) => (
                  <Text style={{ fontSize: 16, color: theme.colors.primary }}>
                    {isOpen ? '−' : '+'}
                  </Text>
                )}
              >
                <Text style={{ color: theme.colors['default-600'] }}>
                  Comprehensive documentation with examples and API references.
                </Text>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Alerts */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Alerts
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ gap: 12 }}>
              <Alert
                title="Success"
                description="Your changes have been saved successfully."
                color="success"
                isClosable
              />
              <Alert
                title="Warning"
                description="Your storage is almost full."
                color="warning"
              />
              <Alert
                title="Info"
                description="New features are now available!"
                color="primary"
                endContent={
                  <Button size="sm" variant="ghost" colorScheme="primary">
                    View
                  </Button>
                }
              />
              <Alert
                title="Error"
                description="Unable to connect to the server."
                color="danger"
                variant="bordered"
                isClosable
              />
            </View>
          </CardBody>
        </Card>

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

function App() {
  return (
    <HeroUIProvider initialTheme="light">
      <ComponentShowcase />
    </HeroUIProvider>
  );
}

let AppEntryPoint = App;

// Storybook integration - disabled by default
// To enable, set STORYBOOK_ENABLED=true in your environment
// if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
//   AppEntryPoint = require('../.storybook').default;
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    marginVertical: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
});

export default AppEntryPoint;
