import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Radio,
  RadioGroup,
  useTheme,
  Divider,
} from 'react-native-heroui';

export default function RadioScreen() {
  const { theme } = useTheme();
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedSize, setSelectedSize] = useState('md');
  const [selectedPlan, setSelectedPlan] = useState('free');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Radio Group */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Radio Group
            </Text>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Select your favorite framework"
              description="Choose the one you use most often"
              value={selectedFramework}
              onValueChange={setSelectedFramework}
              style={styles.radioSpacing}
            >
              <Radio value="react">React</Radio>
              <Radio value="vue">Vue.js</Radio>
              <Radio value="angular">Angular</Radio>
              <Radio value="svelte">Svelte</Radio>
            </RadioGroup>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'] },
              ]}
            >
              Selected: {selectedFramework}
            </Text>
          </CardBody>
        </Card>

        {/* Horizontal Orientation */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Horizontal Orientation
            </Text>
          </CardHeader>
          <CardBody>
            <RadioGroup
              orientation="horizontal"
              label="Size"
              value={selectedSize}
              onValueChange={setSelectedSize}
              color="secondary"
              style={styles.radioSpacing}
            >
              <Radio value="sm">Small</Radio>
              <Radio value="md">Medium</Radio>
              <Radio value="lg">Large</Radio>
            </RadioGroup>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'] },
              ]}
            >
              Selected: {selectedSize}
            </Text>
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
          <CardBody>
            <RadioGroup
              label="Choose your plan"
              value={selectedPlan}
              onValueChange={setSelectedPlan}
              color="success"
            >
              <Radio value="free" description="Best for personal projects">
                Free
              </Radio>
              <Radio value="pro" description="For professional developers">
                Pro ($10/month)
              </Radio>
              <Radio value="team" description="For teams and organizations">
                Team ($50/month)
              </Radio>
            </RadioGroup>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-500'], marginTop: 12 },
              ]}
            >
              Selected plan: {selectedPlan}
            </Text>
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
          <CardBody style={styles.cardBody}>
            <RadioGroup color="primary" defaultValue="1" label="Primary">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
            <Divider style={{ marginVertical: 16 }} />
            <RadioGroup color="success" defaultValue="1" label="Success">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
            <Divider style={{ marginVertical: 16 }} />
            <RadioGroup color="warning" defaultValue="1" label="Warning">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
            <Divider style={{ marginVertical: 16 }} />
            <RadioGroup color="danger" defaultValue="1" label="Danger">
              <Radio value="1">Option 1</Radio>
              <Radio value="2">Option 2</Radio>
            </RadioGroup>
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
            <RadioGroup
              label="Small"
              size="sm"
              defaultValue="sm1"
              color="primary"
            >
              <Radio value="sm1">Small 1</Radio>
              <Radio value="sm2">Small 2</Radio>
            </RadioGroup>
            <Divider style={{ marginVertical: 16 }} />
            <RadioGroup
              label="Medium"
              size="md"
              defaultValue="md1"
              color="primary"
            >
              <Radio value="md1">Medium 1</Radio>
              <Radio value="md2">Medium 2</Radio>
            </RadioGroup>
            <Divider style={{ marginVertical: 16 }} />
            <RadioGroup
              label="Large"
              size="lg"
              defaultValue="lg1"
              color="primary"
            >
              <Radio value="lg1">Large 1</Radio>
              <Radio value="lg2">Large 2</Radio>
            </RadioGroup>
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
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  radioSpacing: {
    marginBottom: 20,
  },
  cardBody: {
    gap: 16,
  },
});
