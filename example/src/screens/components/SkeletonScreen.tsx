import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  CardBody,
  Skeleton,
  Avatar,
  Button,
  useTheme,
} from 'react-native-heroui';

export default function SkeletonScreen() {
  const { theme } = useTheme();
  const [contentLoaded, setContentLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        {/* Standalone Skeleton */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Standalone Skeleton
            </Text>
          </CardHeader>
          <CardBody>
            <Skeleton style={{ width: '100%', height: 20, marginBottom: 8 }} />
            <Skeleton style={{ width: '80%', height: 20, marginBottom: 8 }} />
            <Skeleton style={{ width: '60%', height: 20 }} />
          </CardBody>
        </Card>

        {/* Loading Card */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Loading Card Skeleton
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.loadingCard}>
              <Skeleton style={{ width: 60, height: 60, borderRadius: 30 }} />
              <View style={styles.loadingCardContent}>
                <Skeleton style={{ width: '80%', height: 16 }} />
                <Skeleton style={{ width: '60%', height: 16 }} />
              </View>
            </View>
            <Skeleton
              style={{
                width: '100%',
                height: 100,
                borderRadius: 8,
                marginTop: 16,
              }}
            />
          </CardBody>
        </Card>

        {/* With isLoaded - Auto Load */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              With isLoaded (Auto Load)
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.profileRow}>
              <Skeleton isLoaded={contentLoaded}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  size="lg"
                />
              </Skeleton>
              <View style={styles.profileContent}>
                <Skeleton isLoaded={contentLoaded}>
                  <Text
                    style={[
                      { fontSize: 18, fontWeight: 'bold' },
                      { color: theme.colors.foreground },
                    ]}
                  >
                    Jane Smith
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={contentLoaded}>
                  <Text style={{ color: theme.colors['default-500'] }}>
                    Product Designer
                  </Text>
                </Skeleton>
              </View>
            </View>
            <Skeleton isLoaded={contentLoaded} style={{ marginTop: 16 }}>
              <Text style={{ color: theme.colors.foreground }}>
                Creating delightful user experiences with attention to detail.
              </Text>
            </Skeleton>
          </CardBody>
        </Card>

        {/* Interactive Reload */}
        <Card variant="elevated" style={styles.section}>
          <CardHeader>
            <Text
              style={[styles.sectionTitle, { color: theme.colors.foreground }]}
            >
              Interactive Reload
            </Text>
          </CardHeader>
          <CardBody>
            <View style={styles.profileRow}>
              <Skeleton isLoaded={profileLoaded}>
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  size="lg"
                />
              </Skeleton>
              <View style={styles.profileContent}>
                <Skeleton isLoaded={profileLoaded}>
                  <Text
                    style={[
                      { fontSize: 18, fontWeight: 'bold' },
                      { color: theme.colors.foreground },
                    ]}
                  >
                    Alex Johnson
                  </Text>
                </Skeleton>
                <Skeleton isLoaded={profileLoaded}>
                  <Text style={{ color: theme.colors['default-500'] }}>
                    Full Stack Developer
                  </Text>
                </Skeleton>
              </View>
            </View>
            <Skeleton
              isLoaded={profileLoaded}
              style={{ marginTop: 16, marginBottom: 16 }}
            >
              <Text style={{ color: theme.colors.foreground }}>
                Building scalable applications with modern technologies.
              </Text>
            </Skeleton>
            <Button
              variant="solid"
              colorScheme="primary"
              onPress={() => {
                setProfileLoaded(false);
                setTimeout(() => setProfileLoaded(true), 2000);
              }}
              style={{ marginTop: 16 }}
            >
              Reload Profile
            </Button>
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
  loadingCard: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  loadingCardContent: {
    flex: 1,
    gap: 8,
  },
  profileRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  profileContent: {
    flex: 1,
    gap: 4,
  },
});
