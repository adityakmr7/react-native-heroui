import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  useTheme,
  toast,
} from 'react-native-heroui';

export default function ToastScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Toast Types */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Toast Types
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                colorScheme="success"
                onPress={() => toast.success('Operation successful!')}
              >
                Success
              </Button>
              <Button
                size="sm"
                colorScheme="danger"
                onPress={() => toast.error('Error occurred!')}
              >
                Error
              </Button>
              <Button
                size="sm"
                colorScheme="warning"
                onPress={() => toast.warning('Warning message!')}
              >
                Warning
              </Button>
              <Button
                size="sm"
                colorScheme="primary"
                onPress={() => toast.info('Information message')}
              >
                Info
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* With Title and Description */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Title and Description
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="primary"
                onPress={() =>
                  toast.show({
                    title: 'Success',
                    description: 'This toast has both title and description',
                    color: 'success',
                  })
                }
              >
                Detailed Toast
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="secondary"
                onPress={() =>
                  toast.show({
                    title: 'Upload Complete',
                    description: 'Your file has been uploaded successfully',
                    color: 'success',
                  })
                }
              >
                Upload Toast
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* With Progress Bar */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Progress Bar
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                variant="outline"
                colorScheme="secondary"
                onPress={() =>
                  toast.show({
                    description: 'Auto-dismiss in 5s',
                    timeout: 5000,
                    shouldShowTimeoutProgress: true,
                  })
                }
              >
                Progress Bar
              </Button>
              <Button
                size="sm"
                variant="outline"
                colorScheme="primary"
                onPress={() =>
                  toast.show({
                    title: 'Processing',
                    description: 'This will dismiss in 3 seconds',
                    timeout: 3000,
                    shouldShowTimeoutProgress: true,
                    color: 'primary',
                  })
                }
              >
                Timed Progress
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* Custom Duration */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Custom Duration
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="primary"
                onPress={() =>
                  toast.show({
                    description: 'Short toast (2s)',
                    timeout: 2000,
                  })
                }
              >
                Short (2s)
              </Button>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="primary"
                onPress={() =>
                  toast.show({
                    description: 'Default toast (4s)',
                    timeout: 4000,
                  })
                }
              >
                Default (4s)
              </Button>
              <Button
                size="sm"
                variant="ghost"
                colorScheme="primary"
                onPress={() =>
                  toast.show({
                    description: 'Long toast (8s)',
                    timeout: 8000,
                  })
                }
              >
                Long (8s)
              </Button>
            </View>
          </CardBody>
        </Card>

        {/* Color Variants */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Color Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Button
                size="sm"
                variant="outline"
                onPress={() =>
                  toast.show({
                    description: 'Primary toast',
                    color: 'primary',
                  })
                }
              >
                Primary
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() =>
                  toast.show({
                    description: 'Secondary toast',
                    color: 'secondary',
                  })
                }
              >
                Secondary
              </Button>
              <Button
                size="sm"
                variant="outline"
                onPress={() =>
                  toast.show({
                    description: 'Success toast',
                    color: 'success',
                  })
                }
              >
                Success
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
});
