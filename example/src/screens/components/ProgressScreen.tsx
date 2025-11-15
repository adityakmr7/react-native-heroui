import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Progress,
  useTheme,
} from 'react-native-heroui';

export default function ProgressScreen() {
  const { theme } = useTheme();
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Progress */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Progress
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Progress
              label="Loading"
              value={progressValue}
              color="primary"
              showValueLabel
            />
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
          <CardBody style={styles.cardBody}>
            <Progress
              label="Small"
              value={65}
              color="primary"
              size="sm"
              showValueLabel
            />
            <Progress
              label="Medium"
              value={65}
              color="primary"
              size="md"
              showValueLabel
            />
            <Progress
              label="Large"
              value={65}
              color="primary"
              size="lg"
              showValueLabel
            />
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
          <CardBody style={styles.cardBody}>
            <Progress
              label="Primary"
              value={75}
              color="primary"
              showValueLabel
            />
            <Progress
              label="Success"
              value={75}
              color="success"
              showValueLabel
            />
            <Progress
              label="Warning"
              value={75}
              color="warning"
              showValueLabel
            />
            <Progress label="Danger" value={75} color="danger" showValueLabel />
          </CardBody>
        </Card>

        {/* Indeterminate */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Indeterminate Progress
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Progress
              label="Processing"
              isIndeterminate
              color="primary"
              size="md"
            />
            <Progress
              label="Uploading"
              isIndeterminate
              color="success"
              size="lg"
            />
            <Progress
              label="Loading"
              isIndeterminate
              color="secondary"
              size="sm"
            />
          </CardBody>
        </Card>

        {/* Different Values */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Different Values
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Progress label="25%" value={25} color="warning" showValueLabel />
            <Progress label="50%" value={50} color="primary" showValueLabel />
            <Progress label="75%" value={75} color="success" showValueLabel />
            <Progress label="100%" value={100} color="success" showValueLabel />
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
  cardBody: {
    gap: 16,
  },
});
