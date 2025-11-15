import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Tooltip,
  Button,
  useTheme,
} from 'react-native-heroui';

export default function TooltipScreen() {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Basic Tooltips */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Basic Tooltips
            </Text>
          </CardHeader>
          <CardBody>
            <Text
              style={[
                styles.helperText,
                { color: theme.colors['default-600'], marginBottom: 16 },
              ]}
            >
              Long press buttons to see tooltips
            </Text>
            <View style={styles.buttonGrid}>
              <Tooltip content="Click to save your work" placement="top">
                <Button size="sm" colorScheme="primary">
                  Save
                </Button>
              </Tooltip>
              <Tooltip
                content="Delete this item"
                placement="top"
                color="danger"
              >
                <Button size="sm" colorScheme="danger">
                  Delete
                </Button>
              </Tooltip>
              <Tooltip content="Edit your profile" placement="bottom">
                <Button size="sm" colorScheme="secondary">
                  Edit
                </Button>
              </Tooltip>
            </View>
          </CardBody>
        </Card>

        {/* Placements */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Placements
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.placementGrid}>
              <Tooltip content="Top placement" placement="top" showArrow>
                <Button size="sm" colorScheme="primary">
                  Top
                </Button>
              </Tooltip>
              <Tooltip content="Bottom placement" placement="bottom" showArrow>
                <Button size="sm" colorScheme="secondary">
                  Bottom
                </Button>
              </Tooltip>
              <Tooltip content="Left placement" placement="left" showArrow>
                <Button size="sm" colorScheme="success">
                  Left
                </Button>
              </Tooltip>
              <Tooltip content="Right placement" placement="right" showArrow>
                <Button size="sm" colorScheme="warning">
                  Right
                </Button>
              </Tooltip>
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
            <View style={styles.buttonGrid}>
              <Tooltip
                content="Primary tooltip"
                placement="top"
                color="primary"
              >
                <Button size="sm" colorScheme="primary">
                  Primary
                </Button>
              </Tooltip>
              <Tooltip
                content="Success tooltip"
                placement="top"
                color="success"
              >
                <Button size="sm" colorScheme="success">
                  Success
                </Button>
              </Tooltip>
              <Tooltip
                content="Warning tooltip"
                placement="top"
                color="warning"
              >
                <Button size="sm" colorScheme="warning">
                  Warning
                </Button>
              </Tooltip>
              <Tooltip content="Danger tooltip" placement="top" color="danger">
                <Button size="sm" colorScheme="danger">
                  Danger
                </Button>
              </Tooltip>
            </View>
          </CardBody>
        </Card>

        {/* With Arrow */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With Arrow
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Tooltip
                content="Tooltip with arrow"
                placement="top"
                showArrow
                color="primary"
              >
                <Button size="sm" colorScheme="primary">
                  With Arrow
                </Button>
              </Tooltip>
              <Tooltip
                content="Tooltip without arrow"
                placement="top"
                color="secondary"
              >
                <Button size="sm" colorScheme="secondary">
                  No Arrow
                </Button>
              </Tooltip>
            </View>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Tooltip Sizes
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.buttonGrid}>
              <Tooltip
                content="Small tooltip"
                placement="top"
                size="sm"
                color="primary"
              >
                <Button size="sm" colorScheme="primary">
                  Small
                </Button>
              </Tooltip>
              <Tooltip
                content="Medium tooltip"
                placement="top"
                size="md"
                color="primary"
              >
                <Button size="sm" colorScheme="primary">
                  Medium
                </Button>
              </Tooltip>
              <Tooltip
                content="Large tooltip with more content"
                placement="top"
                size="lg"
                color="primary"
              >
                <Button size="sm" colorScheme="primary">
                  Large
                </Button>
              </Tooltip>
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
  helperText: {
    fontSize: 14,
    marginTop: 4,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  placementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
});
