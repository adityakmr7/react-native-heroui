import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  useTheme,
} from 'react-native-heroui';

export default function DividerScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Horizontal Dividers */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Horizontal Dividers
            </Text>
          </CardHeader>
          <CardBody>
            <Text style={{ color: theme.colors.foreground, marginBottom: 12 }}>
              Basic horizontal divider:
            </Text>
            <Divider />
            <Text
              style={{
                color: theme.colors.foreground,
                marginTop: 24,
                marginBottom: 12,
              }}
            >
              With custom styles:
            </Text>
            <Divider style={{ marginVertical: 16, height: 2 }} />
          </CardBody>
        </Card>

        {/* Vertical Dividers */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Vertical Dividers
            </Text>
          </CardHeader>
          <CardBody>
            <Text style={{ color: theme.colors.foreground, marginBottom: 12 }}>
              Basic vertical divider:
            </Text>
            <View style={styles.verticalContainer}>
              <Text style={{ color: theme.colors.foreground }}>Left</Text>
              <Divider
                orientation="vertical"
                style={{ height: 32, marginHorizontal: 16 }}
              />
              <Text style={{ color: theme.colors.foreground }}>Right</Text>
            </View>
            <View
              style={[
                styles.verticalContainer,
                { marginTop: 24, alignItems: 'flex-start' },
              ]}
            >
              <Text style={{ color: theme.colors.foreground }}>Top</Text>
              <Divider
                orientation="vertical"
                style={{ height: 60, marginHorizontal: 16 }}
              />
              <Text style={{ color: theme.colors.foreground }}>Bottom</Text>
            </View>
          </CardBody>
        </Card>

        {/* With Content */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Dividers with Content
            </Text>
          </CardHeader>
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              Section 1 content goes here.
            </Text>
            <Divider style={{ marginVertical: 16 }} />
            <Text style={{ color: theme.colors['default-600'] }}>
              Section 2 content goes here.
            </Text>
            <Divider style={{ marginVertical: 16 }} />
            <Text style={{ color: theme.colors['default-600'] }}>
              Section 3 content goes here.
            </Text>
          </CardBody>
        </Card>

        {/* Spacing Examples */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Spacing Examples
            </Text>
          </CardHeader>
          <CardBody>
            <Text style={{ color: theme.colors.foreground, marginBottom: 8 }}>
              Small spacing:
            </Text>
            <Text style={{ color: theme.colors['default-600'] }}>
              Content 1
            </Text>
            <Divider style={{ marginVertical: 8 }} />
            <Text style={{ color: theme.colors['default-600'] }}>
              Content 2
            </Text>
            <Text
              style={{
                color: theme.colors.foreground,
                marginTop: 24,
                marginBottom: 8,
              }}
            >
              Large spacing:
            </Text>
            <Text style={{ color: theme.colors['default-600'] }}>
              Content 1
            </Text>
            <Divider style={{ marginVertical: 24 }} />
            <Text style={{ color: theme.colors['default-600'] }}>
              Content 2
            </Text>
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
  verticalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
});
