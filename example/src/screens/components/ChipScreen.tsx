import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  useTheme,
} from 'react-native-heroui';

export default function ChipScreen() {
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
              Chip Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Chip color="primary" variant="solid">
                Solid
              </Chip>
              <Chip color="primary" variant="flat">
                Flat
              </Chip>
              <Chip color="primary" variant="bordered">
                Bordered
              </Chip>
              <Chip color="primary" variant="flat">
                Light
              </Chip>
              <Chip color="primary" variant="dot">
                Dot
              </Chip>
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
            <View style={styles.chipContainer}>
              <Chip color="primary" variant="solid">
                Primary
              </Chip>
              <Chip color="secondary" variant="solid">
                Secondary
              </Chip>
              <Chip color="success" variant="solid">
                Success
              </Chip>
              <Chip color="warning" variant="solid">
                Warning
              </Chip>
              <Chip color="danger" variant="solid">
                Danger
              </Chip>
            </View>
          </CardBody>
        </Card>

        {/* Closeable */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Closeable Chips
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Chip color="primary" onClose={() => console.log('Closed')}>
                React Native
              </Chip>
              <Chip color="secondary" onClose={() => console.log('Closed')}>
                TypeScript
              </Chip>
              <Chip color="success" onClose={() => console.log('Closed')}>
                HeroUI
              </Chip>
              <Chip color="warning" onClose={() => console.log('Closed')}>
                Mobile
              </Chip>
              <Chip color="danger" onClose={() => console.log('Closed')}>
                Awesome
              </Chip>
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
            <View style={styles.chipContainer}>
              <Chip color="primary" size="sm">
                Small
              </Chip>
              <Chip color="primary" size="md">
                Medium
              </Chip>
              <Chip color="primary" size="lg">
                Large
              </Chip>
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
