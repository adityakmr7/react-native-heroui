import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Select,
  useTheme,
} from 'react-native-heroui';

export default function SelectScreen() {
  const { theme } = useTheme();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedFramework, setSelectedFramework] = useState('');

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
              Variants
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Select
              label="Bordered"
              placeholder="Select a country"
              value={selectedCountry}
              onChange={setSelectedCountry}
              items={[
                { label: 'United States', value: 'us' },
                { label: 'Canada', value: 'ca' },
                { label: 'United Kingdom', value: 'uk' },
                { label: 'Australia', value: 'au' },
                { label: 'Germany', value: 'de' },
              ]}
              variant="bordered"
            />
            <Select
              label="Flat"
              placeholder="Choose framework"
              value={selectedFramework}
              onChange={setSelectedFramework}
              items={[
                { label: 'React', value: 'react' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
              ]}
              variant="flat"
            />
          </CardBody>
        </Card>

        {/* With Descriptions */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Descriptions
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Select
              label="Framework"
              placeholder="Choose framework"
              defaultValue="react"
              items={[
                {
                  label: 'React',
                  value: 'react',
                  description: 'A JavaScript library',
                },
                {
                  label: 'Vue',
                  value: 'vue',
                  description: 'The Progressive Framework',
                },
                {
                  label: 'Angular',
                  value: 'angular',
                  description: 'Platform for building apps',
                },
              ]}
              variant="flat"
            />
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
          <CardBody style={styles.cardBody}>
            <Select
              label="Required"
              placeholder="Select option"
              isRequired
              items={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              variant="bordered"
            />
            <Select
              label="Disabled"
              placeholder="Disabled select"
              isDisabled
              defaultValue="disabled"
              items={[{ label: 'Disabled Option', value: 'disabled' }]}
              variant="bordered"
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
            <Select
              label="Primary"
              placeholder="Primary color"
              color="primary"
              items={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
            <Select
              label="Success"
              placeholder="Success color"
              color="success"
              items={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
            <Select
              label="Warning"
              placeholder="Warning color"
              color="warning"
              items={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
            <Select
              label="Danger"
              placeholder="Danger color"
              color="danger"
              items={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
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
