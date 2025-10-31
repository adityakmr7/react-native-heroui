import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ThemeScreen from './screens/ThemeScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ComponentDetailScreen from './screens/ComponentDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Theme: undefined;
  ComponentsList: undefined;
  ComponentDetail: { componentName: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'HeroUI Example' }}
        />
        <Stack.Screen
          name="Theme"
          component={ThemeScreen}
          options={{ title: 'Themes' }}
        />
        <Stack.Screen
          name="ComponentsList"
          component={ComponentsListScreen}
          options={{ title: 'Components' }}
        />
        <Stack.Screen
          name="ComponentDetail"
          component={ComponentDetailScreen}
          options={({ route }) => ({ title: route.params.componentName })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
