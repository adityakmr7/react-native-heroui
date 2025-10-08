import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  ThemeProvider,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Badge,
  Chip,
  Switch,
  useTheme,
} from 'react-native-heroui';
import Constants from 'expo-constants';

function ComponentShowcase() {
  const { theme, themeMode, toggleTheme } = useTheme();
  const [email, setEmail] = React.useState('');
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

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
              <Badge showDot color="success" placement="bottom-right">
                <Avatar name="Jane Smith" size="lg" color="secondary" />
              </Badge>
              <Avatar name="Bob Wilson" size="lg" color="warning" />
              <Avatar name="Alice Brown" size="lg" color="danger" isBordered />
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

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="light">
      <ComponentShowcase />
    </ThemeProvider>
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
