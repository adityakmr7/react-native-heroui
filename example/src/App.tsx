import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HeroUIProvider, ToastProvider } from 'react-native-heroui';
import Navigation from './navigation';

function App() {
  // Example: Using a custom theme
  const customTheme = {
    light: {
      primary: '#FF6B35', // Orange primary
      secondary: '#004E89', // Navy secondary
      success: '#28A745',
      warning: '#FFC107',
      danger: '#DC3545',
    },
    dark: {
      primary: '#FF8A65', // Lighter orange for dark mode
      secondary: '#1976D2', // Lighter navy
      success: '#4CAF50',
      warning: '#FFB74D',
      danger: '#F44336',
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUIProvider initialTheme="light" customColors={customTheme}>
        <ToastProvider placement="bottom-right" maxVisibleToasts={3}>
          <Navigation />
        </ToastProvider>
      </HeroUIProvider>
    </GestureHandlerRootView>
  );
}

let AppEntryPoint = App;

// Storybook integration - disabled by default
// To enable, set STORYBOOK_ENABLED=true in your environment
// if (Constants?.expoConfig?.extra?.storybookEnabled === 'true') {
//   AppEntryPoint = require('../.storybook').default;
// }

export default AppEntryPoint;
