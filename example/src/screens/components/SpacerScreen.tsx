import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Spacer,
  Chip,
  useTheme,
} from 'react-native-heroui';

export default function SpacerScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Horizontal Spacing */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Horizontal Spacing (x)
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[{ color: theme.colors['default-600'], marginBottom: 12 }]}
            >
              Spacer adds horizontal space between components:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Chip color="primary">Item 1</Chip>
              <Spacer x={2} />
              <Chip color="secondary">Item 2</Chip>
              <Spacer x={4} />
              <Chip color="success">Item 3</Chip>
              <Spacer x={6} />
              <Chip color="warning">Item 4</Chip>
            </View>
          </CardBody>
        </Card>

        {/* Vertical Spacing */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Vertical Spacing (y)
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[{ color: theme.colors['default-600'], marginBottom: 12 }]}
            >
              Spacer adds vertical space between components:
            </Text>
            <Chip color="primary">Row 1</Chip>
            <Spacer y={2} />
            <Chip color="secondary">Row 2</Chip>
            <Spacer y={4} />
            <Chip color="success">Row 3</Chip>
            <Spacer y={6} />
            <Chip color="warning">Row 4</Chip>
          </CardBody>
        </Card>

        {/* Combined Spacing */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Combined Horizontal & Vertical
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[{ color: theme.colors['default-600'], marginBottom: 12 }]}
            >
              Using both x and y spacing:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Chip color="primary">A</Chip>
              <Spacer x={2} />
              <Chip color="secondary">B</Chip>
            </View>
            <Spacer y={4} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Chip color="success">C</Chip>
              <Spacer x={2} />
              <Chip color="warning">D</Chip>
            </View>
          </CardBody>
        </Card>

        {/* Different Spacing Values */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Different Spacing Values
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[{ color: theme.colors['default-600'], marginBottom: 12 }]}
            >
              Horizontal spacing examples:
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Chip color="primary">x=1</Chip>
              <Spacer x={1} />
              <Chip color="secondary">x=2</Chip>
              <Spacer x={2} />
              <Chip color="success">x=4</Chip>
              <Spacer x={4} />
              <Chip color="warning">x=8</Chip>
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
});
