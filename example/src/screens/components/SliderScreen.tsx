import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Slider,
  useTheme,
} from 'react-native-heroui';

export default function SliderScreen() {
  const { theme } = useTheme();
  const [volume, setVolume] = useState(50);
  const [brightness, setBrightness] = useState(75);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Slider */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Slider
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Slider
              label="Volume"
              value={volume}
              onChange={setVolume}
              color="primary"
              showValue
              minValue={0}
              maxValue={100}
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
            <Slider
              label="Small"
              defaultValue={50}
              color="primary"
              showValue
              size="sm"
            />
            <Slider
              label="Medium"
              defaultValue={50}
              color="primary"
              showValue
              size="md"
            />
            <Slider
              label="Large"
              defaultValue={50}
              color="primary"
              showValue
              size="lg"
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
            <Slider
              label="Primary"
              defaultValue={50}
              color="primary"
              showValue
            />
            <Slider
              label="Success"
              defaultValue={50}
              color="success"
              showValue
            />
            <Slider
              label="Warning"
              defaultValue={50}
              color="warning"
              showValue
            />
            <Slider label="Danger" defaultValue={50} color="danger" showValue />
          </CardBody>
        </Card>

        {/* Custom Range */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Custom Range
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Slider
              label="Temperature (0-40°C)"
              defaultValue={20}
              color="danger"
              showValue
              minValue={0}
              maxValue={40}
              size="lg"
            />
            <Slider
              label="Brightness"
              value={brightness}
              onChange={setBrightness}
              color="success"
              showValue
              size="sm"
            />
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
