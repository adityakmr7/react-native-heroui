import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  Avatar,
  useTheme,
} from 'react-native-heroui';

export default function BadgeScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Badge Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
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

        {/* Placements */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Badge Placements
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Badge content="5" color="danger" placement="top-right">
                <Avatar name="TR" size="lg" color="primary" />
              </Badge>
              <Badge content="5" color="danger" placement="top-left">
                <Avatar name="TL" size="lg" color="secondary" />
              </Badge>
              <Badge content="5" color="danger" placement="bottom-right">
                <Avatar name="BR" size="lg" color="success" />
              </Badge>
              <Badge content="5" color="danger" placement="bottom-left">
                <Avatar name="BL" size="lg" color="warning" />
              </Badge>
            </View>
          </CardBody>
        </Card>

        {/* Dot Badge */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Dot Badge
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.avatarRow}>
              <Badge isDot color="success" placement="top-right">
                <Avatar name="Online" size="lg" color="primary" />
              </Badge>
              <Badge isDot color="danger" placement="bottom-right">
                <Avatar name="Offline" size="lg" color="secondary" />
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
              <Badge content="New" color="primary" variant="solid">
                <Avatar name="P" size="lg" />
              </Badge>
              <Badge content="New" color="secondary" variant="solid">
                <Avatar name="S" size="lg" />
              </Badge>
              <Badge content="New" color="success" variant="solid">
                <Avatar name="Su" size="lg" />
              </Badge>
              <Badge content="New" color="warning" variant="solid">
                <Avatar name="W" size="lg" />
              </Badge>
              <Badge content="New" color="danger" variant="solid">
                <Avatar name="D" size="lg" />
              </Badge>
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
