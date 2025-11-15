import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Alert,
  Button,
  useTheme,
} from 'react-native-heroui';

export default function AlertScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Color Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Alert Colors
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.alertContainer}>
              <Alert
                title="Success"
                description="Your changes have been saved successfully."
                color="success"
                isClosable
              />
              <Alert
                title="Warning"
                description="Your storage is almost full."
                color="warning"
              />
              <Alert
                title="Info"
                description="New features are now available!"
                color="primary"
              />
              <Alert
                title="Error"
                description="Unable to connect to the server."
                color="danger"
              />
            </View>
          </CardBody>
        </Card>

        {/* Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Alert Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.alertContainer}>
              <Alert
                title="Flat"
                description="This is a flat variant alert."
                color="primary"
                variant="flat"
              />
              <Alert
                title="Bordered"
                description="This is a bordered variant alert."
                color="secondary"
                variant="bordered"
                isClosable
              />
              <Alert
                title="Solid"
                description="This is a solid variant alert."
                color="success"
                variant="solid"
              />
            </View>
          </CardBody>
        </Card>

        {/* With Actions */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Actions
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.alertContainer}>
              <Alert
                title="Info"
                description="New features are now available!"
                color="primary"
                endContent={
                  <Button size="sm" variant="ghost" colorScheme="primary">
                    View
                  </Button>
                }
              />
              <Alert
                title="Update Available"
                description="A new version is ready to install."
                color="success"
                endContent={
                  <Button size="sm" variant="ghost" colorScheme="success">
                    Update
                  </Button>
                }
              />
            </View>
          </CardBody>
        </Card>

        {/* Closable */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Closable Alerts
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.alertContainer}>
              <Alert
                title="Success"
                description="Operation completed successfully."
                color="success"
                isClosable
              />
              <Alert
                title="Error"
                description="Something went wrong. Please try again."
                color="danger"
                variant="bordered"
                isClosable
              />
            </View>
          </CardBody>
        </Card>

        {/* Title Only */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Title Only
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.alertContainer}>
              <Alert title="Important Notice" color="warning" />
              <Alert title="System Alert" color="danger" />
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
  alertContainer: {
    gap: 12,
  },
});
