import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  useTheme,
} from 'react-native-heroui';

export default function InputScreen() {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Input */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Input
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              helperText="We'll never share your email"
              onClear={() => setEmail('')}
            />
          </CardBody>
        </Card>

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
            <Input
              label="Bordered"
              placeholder="Bordered variant"
              variant="bordered"
              value={phone}
              onChangeText={setPhone}
            />
            <Input
              label="Flat"
              placeholder="Flat variant"
              variant="outline"
              value={description}
              onChangeText={setDescription}
              style={styles.inputSpacing}
            />
            <Input
              label="Faded"
              placeholder="Faded variant"
              variant="outline"
              style={styles.inputSpacing}
            />
            <Input
              label="Underlined"
              placeholder="Underlined variant"
              variant="underlined"
              style={styles.inputSpacing}
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
            <Input
              label="Password"
              placeholder="Enter password"
              secureTextEntry
              isRequired
              value={password}
              onChangeText={setPassword}
            />
            <Input
              label="Disabled Input"
              placeholder="Disabled"
              isDisabled
              defaultValue="Cannot edit this"
              style={styles.inputSpacing}
            />
            <Input
              label="Error State"
              placeholder="With error"
              isInvalid
              errorText="This field is required"
              style={styles.inputSpacing}
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
            <Input label="Small" placeholder="Small size" size="sm" />
            <Input
              label="Medium"
              placeholder="Medium size"
              size="md"
              style={styles.inputSpacing}
            />
            <Input
              label="Large"
              placeholder="Large size"
              size="lg"
              style={styles.inputSpacing}
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
            <Input label="Primary" placeholder="Primary color" />
            <Input
              label="Secondary"
              placeholder="Secondary color"
              style={styles.inputSpacing}
            />
            <Input
              label="Success"
              placeholder="Success color"
              style={styles.inputSpacing}
            />
            <Input
              label="Warning"
              placeholder="Warning color"
              style={styles.inputSpacing}
            />
            <Input
              label="Danger"
              placeholder="Danger color"
              style={styles.inputSpacing}
            />
          </CardBody>
        </Card>

        {/* With Helper Text */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Helper Text & Description
            </Text>
          </CardHeader>
          <CardBody style={styles.cardBody}>
            <Input
              label="Username"
              placeholder="Enter username"
              helperText="Must be at least 4 characters"
            />
            <Input
              label="Website"
              placeholder="https://example.com"
              startContent={<Text>https://</Text>}
              endContent={<Text>.com</Text>}
              style={styles.inputSpacing}
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
  inputSpacing: {
    marginTop: 16,
  },
});
