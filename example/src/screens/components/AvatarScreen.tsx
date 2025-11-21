import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Badge,
  useTheme,
} from 'react-native-heroui';

export default function AvatarScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Avatars */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Avatars
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Avatar name="John Doe" size="sm" color="primary" />
              <Avatar name="Jane Smith" size="md" color="secondary" />
              <Avatar name="Bob Wilson" size="lg" color="success" />
              <Avatar name="Alice Brown" size="xl" color="warning" />
            </View>
          </CardBody>
        </Card>

        {/* With Images */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Images
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                size="lg"
                name="User 1"
              />
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                size="lg"
                name="User 2"
              />
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026702d"
                size="lg"
                name="User 3"
              />
            </View>
          </CardBody>
        </Card>

        {/* With Badges */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Badges
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
          </CardBody>
        </Card>

        {/* Colors */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Color Schemes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Avatar name="Primary" size="lg" color="primary" />
              <Avatar name="Secondary" size="lg" color="secondary" />
              <Avatar name="Success" size="lg" color="success" />
              <Avatar name="Warning" size="lg" color="warning" />
              <Avatar name="Danger" size="lg" color="danger" />
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
  avatarRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
