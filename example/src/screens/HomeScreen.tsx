import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Card, CardBody, useTheme } from 'react-native-heroui';
import type { RootStackParamList } from '../navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Card variant="elevated" style={styles.card}>
          <CardBody style={styles.cardBody}>
            <Button
              colorScheme="primary"
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('Theme')}
              style={styles.button}
            >
              Themes
            </Button>
            <Button
              colorScheme="secondary"
              size="lg"
              fullWidth
              onPress={() => navigation.navigate('ComponentsList')}
              style={styles.button}
            >
              Components
            </Button>
          </CardBody>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  cardBody: {
    padding: 24,
    gap: 16,
  },
  button: {
    marginVertical: 8,
  },
});
