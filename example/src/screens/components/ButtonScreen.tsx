import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useTheme,
} from 'react-native-heroui';

export default function ButtonScreen() {
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
              Button Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary" size="sm">
                Solid
              </Button>
              <Button variant="outline" colorScheme="primary" size="sm">
                Outline
              </Button>
              <Button variant="ghost" colorScheme="primary" size="sm">
                Ghost
              </Button>
              <Button variant="link" colorScheme="primary" size="sm">
                Link
              </Button>
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
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary">
                Primary
              </Button>
              <Button variant="solid" colorScheme="secondary">
                Secondary
              </Button>
              <Button variant="solid" colorScheme="success">
                Success
              </Button>
              <Button variant="solid" colorScheme="warning">
                Warning
              </Button>
              <Button variant="solid" colorScheme="danger">
                Danger
              </Button>
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
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary" size="sm">
                Small
              </Button>
              <Button variant="solid" colorScheme="primary" size="md">
                Medium
              </Button>
              <Button variant="solid" colorScheme="primary" size="lg">
                Large
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* States */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              States
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button variant="solid" colorScheme="primary">
                Normal
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                isLoading={isLoading}
              >
                {isLoading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button variant="solid" colorScheme="primary" isDisabled>
                Disabled
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                onPress={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 2000);
                }}
              >
                Simulate Loading
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* Full Width */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Full Width
            </Text>
          </CardHeader>
          <CardBody>
            <Button
              variant="solid"
              colorScheme="primary"
              fullWidth
              style={styles.fullWidthButton}
            >
              Full Width Button
            </Button>
            <Button
              variant="outline"
              colorScheme="secondary"
              fullWidth
              style={styles.fullWidthButton}
            >
              Full Width Outline
            </Button>
          </CardBody>
        </Card>

        {/* With Icons */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Icons
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                variant="solid"
                colorScheme="primary"
                startContent={<Text>←</Text>}
              >
                Back
              </Button>
              <Button
                variant="solid"
                colorScheme="primary"
                endContent={<Text>→</Text>}
              >
                Next
              </Button>
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
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fullWidthButton: {
    marginVertical: 8,
  },
});
