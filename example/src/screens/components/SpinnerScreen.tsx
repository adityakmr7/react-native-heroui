import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Button,
  Divider,
  useTheme,
} from 'react-native-heroui';

export default function SpinnerScreen() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

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
              Spinner Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.chipContainer}>
              <Spinner variant="default" color="primary" label="Default" />
              <Spinner variant="simple" color="success" label="Simple" />
              <Spinner variant="gradient" color="secondary" label="Gradient" />
            </View>
            <Divider style={{ marginVertical: 12 }} />
            <View style={styles.chipContainer}>
              <Spinner variant="wave" color="warning" label="Wave" />
              <Spinner variant="dots" color="danger" label="Dots" />
              <Spinner variant="spinner" color="primary" label="Spinner" />
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
              <Spinner
                variant="default"
                color="primary"
                size="sm"
                label="Small"
              />
              <Spinner
                variant="default"
                color="primary"
                size="md"
                label="Medium"
              />
              <Spinner
                variant="default"
                color="primary"
                size="lg"
                label="Large"
              />
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
              <Spinner variant="default" color="primary" label="Primary" />
              <Spinner variant="default" color="secondary" label="Secondary" />
              <Spinner variant="default" color="success" label="Success" />
              <Spinner variant="default" color="warning" label="Warning" />
              <Spinner variant="default" color="danger" label="Danger" />
            </View>
          </CardBody>
        </Card>

        {/* Interactive */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Interactive Loading
            </Text>
          </CardHeader>
          <CardBody>
            <View style={{ alignItems: 'center' }}>
              {isLoading ? (
                <Spinner
                  size="lg"
                  color="primary"
                  variant="gradient"
                  label="Loading data..."
                />
              ) : (
                <Button
                  onPress={() => {
                    setIsLoading(true);
                    setTimeout(() => setIsLoading(false), 3000);
                  }}
                  colorScheme="primary"
                >
                  Simulate Loading
                </Button>
              )}
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
    alignItems: 'center',
  },
});
