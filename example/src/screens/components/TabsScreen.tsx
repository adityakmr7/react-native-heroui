import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Tabs,
  Tab,
  useTheme,
  Spacer,
} from 'react-native-heroui';

export default function TabsScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Solid Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Solid Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Tabs defaultSelectedKey="profile" color="primary" variant="solid">
              <Tab tabKey="profile" title="Profile">
                <View style={styles.tabContent}>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Profile Settings
                  </Text>
                  <Spacer y={2} />
                  <Text style={{ color: theme.colors['default-600'] }}>
                    Manage your profile information and preferences here.
                  </Text>
                </View>
              </Tab>
              <Tab tabKey="settings" title="Settings">
                <View style={styles.tabContent}>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Application Settings
                  </Text>
                  <Spacer y={2} />
                  <Text style={{ color: theme.colors['default-600'] }}>
                    Configure your application preferences and options.
                  </Text>
                </View>
              </Tab>
              <Tab tabKey="notifications" title="Notifications">
                <View style={styles.tabContent}>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Notification Preferences
                  </Text>
                  <Spacer y={2} />
                  <Text style={{ color: theme.colors['default-600'] }}>
                    Control what notifications you receive and how.
                  </Text>
                </View>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Underlined Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Underlined Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Tabs variant="underlined" color="secondary">
              <Tab tabKey="photos" title="Photos">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Your photo gallery
                </Text>
              </Tab>
              <Tab tabKey="videos" title="Videos">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Your video collection
                </Text>
              </Tab>
              <Tab tabKey="music" title="Music">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Your music library
                </Text>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Bordered Variant */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Bordered Variant
            </Text>
          </CardHeader>
          <CardBody>
            <Tabs variant="bordered" color="success">
              <Tab tabKey="all" title="All">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  All items
                </Text>
              </Tab>
              <Tab tabKey="active" title="Active">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Active items only
                </Text>
              </Tab>
              <Tab tabKey="archived" title="Archived">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Archived items
                </Text>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

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
            <Tabs variant="light" color="warning">
              <Tab tabKey="inbox" title="Inbox">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Your inbox messages
                </Text>
              </Tab>
              <Tab tabKey="sent" title="Sent">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Sent messages
                </Text>
              </Tab>
              <Tab tabKey="drafts" title="Drafts">
                <Text
                  style={{
                    color: theme.colors['default-600'],
                    marginTop: 12,
                  }}
                >
                  Draft messages
                </Text>
              </Tab>
            </Tabs>
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
  tabContent: {
    padding: 16,
  },
});
