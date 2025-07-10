import { View, StyleSheet } from 'react-native';
import { Button, ThemeProvider } from 'react-native-heroui';

export default function App() {
  const handleBtnPress = () => {
    console.log('Button pressed!');
  };
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Button onPress={handleBtnPress}>Press me</Button>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
