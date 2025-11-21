import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  useTheme,
} from 'react-native-heroui';

export default function ImageScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Images */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Images
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.imageRow}>
              <Image
                src="https://i.pravatar.cc/300?u=a042581f4e29026024d"
                width={150}
                height={150}
                radius="lg"
                alt="Avatar"
              />
              <Image
                src="https://picsum.photos/300"
                width={150}
                height={150}
                radius="full"
                alt="Random"
              />
            </View>
          </CardBody>
        </Card>

        {/* Radius Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Radius Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.imageRow}>
              <Image
                src="https://picsum.photos/200"
                width={100}
                height={100}
                radius="none"
                alt="None"
              />
              <Image
                src="https://picsum.photos/200"
                width={100}
                height={100}
                radius="sm"
                alt="Small"
              />
              <Image
                src="https://picsum.photos/200"
                width={100}
                height={100}
                radius="md"
                alt="Medium"
              />
              <Image
                src="https://picsum.photos/200"
                width={100}
                height={100}
                radius="lg"
                alt="Large"
              />
              <Image
                src="https://picsum.photos/200"
                width={100}
                height={100}
                radius="full"
                alt="Full"
              />
            </View>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Different Sizes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.imageRow}>
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                width={80}
                height={80}
                radius="full"
                alt="Small"
              />
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                width={120}
                height={120}
                radius="full"
                alt="Medium"
              />
              <Image
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                width={160}
                height={160}
                radius="full"
                alt="Large"
              />
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
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
