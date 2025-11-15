import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Divider,
  useTheme,
} from 'react-native-heroui';

export default function CardScreen() {
  const { theme } = useTheme();

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
              Card Variants
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.cardRow}>
              <Card variant="flat" style={styles.miniCard}>
                <CardBody>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    Flat
                  </Text>
                </CardBody>
              </Card>
              <Card variant="bordered" style={styles.miniCard}>
                <CardBody>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    Bordered
                  </Text>
                </CardBody>
              </Card>
              <Card variant="elevated" style={styles.miniCard}>
                <CardBody>
                  <Text
                    style={{
                      color: theme.colors.foreground,
                      fontSize: 12,
                      textAlign: 'center',
                    }}
                  >
                    Elevated
                  </Text>
                </CardBody>
              </Card>
            </View>
          </CardBody>
        </Card>

        {/* Full Card with All Sections */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Card with Header, Body & Footer
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              This is a card with header, body, and footer sections. Cards can
              be elevated, flat, or bordered.
            </Text>
            <Divider style={{ marginVertical: 12 }} />
            <Text style={{ color: theme.colors['default-500'] }}>
              Dividers help separate content sections clearly.
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <View style={styles.cardFooter}>
              <Button variant="ghost" colorScheme="danger" size="sm">
                Cancel
              </Button>
              <Divider
                orientation="vertical"
                style={{ height: 32, marginHorizontal: 8 }}
              />
              <Button variant="solid" colorScheme="primary" size="sm">
                Confirm
              </Button>
            </View>
          </CardFooter>
        </Card>

        {/* Card with Header Only */}
        <Card variant="bordered" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Card with Header Only
            </Text>
          </CardHeader>
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              This card has a header section. You can add titles, subtitles, or
              any header content here.
            </Text>
          </CardBody>
        </Card>

        {/* Card with Footer Only */}
        <Card variant="elevated" style={styles.section}>
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              This card has a footer section with action buttons.
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <View style={styles.cardFooter}>
              <Button variant="ghost" colorScheme="secondary" size="sm">
                Learn More
              </Button>
              <Button variant="solid" colorScheme="primary" size="sm">
                Get Started
              </Button>
            </View>
          </CardFooter>
        </Card>

        {/* Simple Card */}
        <Card variant="flat" style={styles.section}>
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              This is a simple flat card with just body content. Perfect for
              displaying information without borders or elevation.
            </Text>
          </CardBody>
        </Card>

        {/* Card with Dividers */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Interactive Card with Dividers
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text style={{ color: theme.colors['default-600'] }}>
              This card demonstrates how dividers can be used to separate
              different sections within a card.
            </Text>
          </CardBody>
          <Divider />
          <CardBody>
            <Text style={{ color: theme.colors['default-500'] }}>
              This is another body section separated by a divider.
            </Text>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button variant="solid" colorScheme="primary" size="sm" fullWidth>
              Action Button
            </Button>
          </CardFooter>
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
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  miniCard: {
    flex: 1,
    minWidth: 80,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
