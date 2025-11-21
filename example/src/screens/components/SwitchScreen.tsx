import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Switch,
  useTheme,
} from 'react-native-heroui';

export default function SwitchScreen() {
  const { theme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Switches */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Switches
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
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Email Marketing
              </Text>
              <Switch defaultValue={false} color="primary" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Dark Mode
              </Text>
              <Switch
                value={darkModeEnabled}
                onChange={setDarkModeEnabled}
                color="secondary"
              />
            </View>
          </CardBody>
        </Card>

        {/* Color Schemes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Color Schemes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.switchRow}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Primary
              </Text>
              <Switch defaultValue={true} color="primary" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Secondary
              </Text>
              <Switch defaultValue={true} color="secondary" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Success
              </Text>
              <Switch defaultValue={true} color="success" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Warning
              </Text>
              <Switch defaultValue={true} color="warning" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Danger
              </Text>
              <Switch defaultValue={true} color="danger" />
            </View>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Sizes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.switchRow}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Small
              </Text>
              <Switch defaultValue={true} color="primary" size="sm" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Medium
              </Text>
              <Switch defaultValue={true} color="primary" size="md" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Large
              </Text>
              <Switch defaultValue={true} color="primary" size="lg" />
            </View>
          </CardBody>
        </Card>

        {/* Disabled */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Disabled State
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.switchRow}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Disabled (Off)
              </Text>
              <Switch defaultValue={false} isDisabled color="primary" />
            </View>
            <View style={[styles.switchRow, styles.switchSpacing]}>
              <Text style={[styles.label, { color: theme.colors.foreground }]}>
                Disabled (On)
              </Text>
              <Switch defaultValue={true} isDisabled color="primary" />
            </View>
          </CardBody>
        </Card>

        <View style={{ height: 40 }} />
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
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchSpacing: {
    marginTop: 16,
  },
  flex: {
    flex: 1,
  },
});
