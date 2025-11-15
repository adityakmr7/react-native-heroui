import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Switch,
  Divider,
  Chip,
  useTheme,
  toast,
} from 'react-native-heroui';

export default function DrawerScreen() {
  const { theme } = useTheme();
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isTopOpen, setIsTopOpen] = useState(false);
  const [drawerNotifications, setDrawerNotifications] = useState(true);
  const [drawerDarkMode, setDrawerDarkMode] = useState(false);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Left Drawer */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Left Drawer
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              colorScheme="primary"
              onPress={() => setIsLeftOpen(true)}
              fullWidth
            >
              Open Left Menu
            </Button>
          </CardBody>
        </Card>

        {/* Right Drawer */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Right Drawer
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              variant="outline"
              onPress={() => setIsRightOpen(true)}
              fullWidth
            >
              Open Right Settings
            </Button>
          </CardBody>
        </Card>

        {/* Top Drawer */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Top Drawer
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Button
              variant="ghost"
              onPress={() => setIsTopOpen(true)}
              fullWidth
            >
              Open Top Drawer
            </Button>
          </CardBody>
        </Card>

        {/* Left Navigation Drawer */}
        <Drawer
          isOpen={isLeftOpen}
          onClose={() => setIsLeftOpen(false)}
          placement="left"
          size="md"
        >
          <DrawerHeader showCloseButton>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.colors.foreground,
              }}
            >
              Navigation Menu
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <View style={styles.menuContainer}>
              {[
                { icon: '🏠', label: 'Home', color: 'primary' },
                { icon: '👤', label: 'Profile', color: 'secondary' },
                { icon: '⚙️', label: 'Settings', color: 'default' },
                { icon: '📊', label: 'Analytics', color: 'success' },
                { icon: '📱', label: 'Devices', color: 'warning' },
                { icon: '❓', label: 'Help & Support', color: 'default' },
              ].map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => {
                    toast.success(`Navigated to ${item.label}`);
                    setIsLeftOpen(false);
                  }}
                  style={[
                    styles.menuItem,
                    { backgroundColor: theme.colors.content2 },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: theme.colors.foreground,
                    }}
                  >
                    {item.icon} {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </DrawerBody>
          <DrawerFooter>
            <View
              style={[
                styles.footerBox,
                { backgroundColor: theme.colors.content2 },
              ]}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: theme.colors['default-500'],
                  textAlign: 'center',
                }}
              >
                React Native HeroUI v1.0.0
              </Text>
            </View>
          </DrawerFooter>
        </Drawer>

        {/* Right Settings Drawer */}
        <Drawer
          isOpen={isRightOpen}
          onClose={() => setIsRightOpen(false)}
          placement="right"
          size="sm"
          backdrop="blur"
        >
          <DrawerHeader showCloseButton>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: theme.colors.foreground,
              }}
            >
              Quick Settings
            </Text>
          </DrawerHeader>
          <DrawerBody scrollable={false}>
            <View style={styles.settingsContainer}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 12,
                    color: theme.colors.foreground,
                  }}
                >
                  Preferences
                </Text>
                <View style={styles.settingRow}>
                  <Text style={{ color: theme.colors.foreground }}>
                    Notifications
                  </Text>
                  <Switch
                    value={drawerNotifications}
                    onChange={setDrawerNotifications}
                    color="success"
                  />
                </View>
                <View style={[styles.settingRow, { marginTop: 12 }]}>
                  <Text style={{ color: theme.colors.foreground }}>
                    Dark Mode
                  </Text>
                  <Switch
                    value={drawerDarkMode}
                    onChange={setDrawerDarkMode}
                    color="primary"
                  />
                </View>
              </View>
              <Divider style={{ marginVertical: 20 }} />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    marginBottom: 12,
                    color: theme.colors.foreground,
                  }}
                >
                  Account
                </Text>
                <View style={styles.buttonContainer}>
                  <Button variant="ghost" size="sm" fullWidth>
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    colorScheme="danger"
                    fullWidth
                  >
                    Sign Out
                  </Button>
                </View>
              </View>
            </View>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="outline"
              onPress={() => setIsRightOpen(false)}
              fullWidth
            >
              Done
            </Button>
          </DrawerFooter>
        </Drawer>

        {/* Top Notifications Drawer */}
        <Drawer
          isOpen={isTopOpen}
          onClose={() => setIsTopOpen(false)}
          placement="top"
          size={300}
        >
          <DrawerHeader showCloseButton>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: theme.colors.foreground,
              }}
            >
              🔔 Notifications
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <View style={styles.notificationContainer}>
              {[
                {
                  title: 'New message',
                  desc: 'You have a new message from John',
                  time: '2m ago',
                  color: 'primary',
                },
                {
                  title: 'Update available',
                  desc: 'A new version is ready to install',
                  time: '1h ago',
                  color: 'success',
                },
                {
                  title: 'Storage full',
                  desc: 'Your storage is almost full',
                  time: '3h ago',
                  color: 'warning',
                },
              ].map((notif, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    toast.success(`Opened: ${notif.title}`);
                    setIsTopOpen(false);
                  }}
                  style={[
                    styles.notificationItem,
                    { backgroundColor: theme.colors.content2 },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '600',
                        color: theme.colors.foreground,
                      }}
                    >
                      {notif.title}
                    </Text>
                    <Chip size="sm" color={notif.color as any} variant="flat">
                      {notif.time}
                    </Chip>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors['default-600'],
                    }}
                  >
                    {notif.desc}
                  </Text>
                </Pressable>
              ))}
            </View>
          </DrawerBody>
          <DrawerFooter>
            <Button
              variant="ghost"
              onPress={() => setIsTopOpen(false)}
              fullWidth
              size="sm"
            >
              Clear All
            </Button>
          </DrawerFooter>
        </Drawer>

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
  cardBody: {
    gap: 12,
  },
  menuContainer: {
    gap: 4,
  },
  menuItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  footerBox: {
    padding: 12,
    borderRadius: 8,
  },
  settingsContainer: {
    gap: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  buttonContainer: {
    gap: 8,
  },
  notificationContainer: {
    gap: 12,
  },
  notificationItem: {
    padding: 12,
    borderRadius: 8,
  },
});
