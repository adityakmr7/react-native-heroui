import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Textarea,
  useTheme,
} from 'react-native-heroui';

export default function TextareaScreen() {
  const { theme } = useTheme();
  const [message, setMessage] = useState('');

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
            <Textarea
              label="Bordered"
              placeholder="Enter your message"
              value={message}
              onChangeText={setMessage}
              variant="bordered"
              minRows={3}
            />
            <Textarea
              label="Flat"
              placeholder="Enter description"
              variant="flat"
              description="Maximum 500 characters"
              minRows={4}
            />
            <Textarea
              label="Faded"
              placeholder="Faded variant"
              variant="faded"
              minRows={3}
            />
            <Textarea
              label="Underlined"
              placeholder="Underlined variant"
              variant="underlined"
              minRows={3}
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
            <Textarea
              label="Required"
              placeholder="This field is required"
              isRequired
              variant="bordered"
              minRows={3}
            />
            <Textarea
              label="Disabled"
              placeholder="Disabled textarea"
              isDisabled
              defaultValue="Cannot edit this"
              variant="bordered"
              minRows={3}
            />
            <Textarea
              label="Error State"
              placeholder="With error"
              isInvalid
              errorMessage="This field is required"
              variant="bordered"
              minRows={3}
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
            <Textarea
              label="Small"
              placeholder="Small size"
              size="sm"
              minRows={2}
            />
            <Textarea
              label="Medium"
              placeholder="Medium size"
              size="md"
              minRows={3}
            />
            <Textarea
              label="Large"
              placeholder="Large size"
              size="lg"
              minRows={4}
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
            <Textarea
              label="Primary"
              placeholder="Primary color"
              color="primary"
            />
            <Textarea
              label="Secondary"
              placeholder="Secondary color"
              color="secondary"
            />
            <Textarea
              label="Success"
              placeholder="Success color"
              color="success"
            />
            <Textarea
              label="Warning"
              placeholder="Warning color"
              color="warning"
            />
            <Textarea
              label="Danger"
              placeholder="Danger color"
              color="danger"
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
