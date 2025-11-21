import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ThemeScreen from './screens/ThemeScreen';
import ComponentsListScreen from './screens/ComponentsListScreen';
import ButtonScreen from './screens/components/ButtonScreen';
import InputScreen from './screens/components/InputScreen';
import AccordionScreen from './screens/components/AccordionScreen';
import AlertScreen from './screens/components/AlertScreen';
import AvatarScreen from './screens/components/AvatarScreen';
import BadgeScreen from './screens/components/BadgeScreen';
import BottomSheetScreen from './screens/components/BottomSheetScreen';
import CardScreen from './screens/components/CardScreen';
import CheckboxScreen from './screens/components/CheckboxScreen';
import ChipScreen from './screens/components/ChipScreen';
import DividerScreen from './screens/components/DividerScreen';
import DrawerScreen from './screens/components/DrawerScreen';
import ImageScreen from './screens/components/ImageScreen';
import InputOtpScreen from './screens/components/InputOtpScreen';
import ModalScreen from './screens/components/ModalScreen';
import ProgressScreen from './screens/components/ProgressScreen';
import RadioScreen from './screens/components/RadioScreen';
import SelectScreen from './screens/components/SelectScreen';
import SkeletonScreen from './screens/components/SkeletonScreen';
import SliderScreen from './screens/components/SliderScreen';
import SpacerScreen from './screens/components/SpacerScreen';
import SpinnerScreen from './screens/components/SpinnerScreen';
import SwitchScreen from './screens/components/SwitchScreen';
import TabsScreen from './screens/components/TabsScreen';
import TextareaScreen from './screens/components/TextareaScreen';
import ToastScreen from './screens/components/ToastScreen';
import TooltipScreen from './screens/components/TooltipScreen';

export type RootStackParamList = {
  Home: undefined;
  Theme: undefined;
  ComponentsList: undefined;
  Button: undefined;
  Input: undefined;
  Accordion: undefined;
  Alert: undefined;
  Avatar: undefined;
  Badge: undefined;
  BottomSheet: undefined;
  Card: undefined;
  Checkbox: undefined;
  Chip: undefined;
  Divider: undefined;
  Drawer: undefined;
  Image: undefined;
  InputOtp: undefined;
  Modal: undefined;
  Progress: undefined;
  Radio: undefined;
  Select: undefined;
  Skeleton: undefined;
  Slider: undefined;
  Spacer: undefined;
  Spinner: undefined;
  Switch: undefined;
  Tabs: undefined;
  Textarea: undefined;
  Toast: undefined;
  Tooltip: undefined;
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
          name="Button"
          component={ButtonScreen}
          options={{ title: 'Button' }}
        />
        <Stack.Screen
          name="Input"
          component={InputScreen}
          options={{ title: 'Input' }}
        />
        <Stack.Screen
          name="Accordion"
          component={AccordionScreen}
          options={{ title: 'Accordion' }}
        />
        <Stack.Screen
          name="Alert"
          component={AlertScreen}
          options={{ title: 'Alert' }}
        />
        <Stack.Screen
          name="Avatar"
          component={AvatarScreen}
          options={{ title: 'Avatar' }}
        />
        <Stack.Screen
          name="Badge"
          component={BadgeScreen}
          options={{ title: 'Badge' }}
        />
        <Stack.Screen
          name="BottomSheet"
          component={BottomSheetScreen}
          options={{ title: 'BottomSheet' }}
        />
        <Stack.Screen
          name="Card"
          component={CardScreen}
          options={{ title: 'Card' }}
        />
        <Stack.Screen
          name="Checkbox"
          component={CheckboxScreen}
          options={{ title: 'Checkbox' }}
        />
        <Stack.Screen
          name="Chip"
          component={ChipScreen}
          options={{ title: 'Chip' }}
        />
        <Stack.Screen
          name="Divider"
          component={DividerScreen}
          options={{ title: 'Divider' }}
        />
        <Stack.Screen
          name="Drawer"
          component={DrawerScreen}
          options={{ title: 'Drawer' }}
        />
        <Stack.Screen
          name="Image"
          component={ImageScreen}
          options={{ title: 'Image' }}
        />
        <Stack.Screen
          name="InputOtp"
          component={InputOtpScreen}
          options={{ title: 'InputOtp' }}
        />
        <Stack.Screen
          name="Modal"
          component={ModalScreen}
          options={{ title: 'Modal' }}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{ title: 'Progress' }}
        />
        <Stack.Screen
          name="Radio"
          component={RadioScreen}
          options={{ title: 'Radio' }}
        />
        <Stack.Screen
          name="Select"
          component={SelectScreen}
          options={{ title: 'Select' }}
        />
        <Stack.Screen
          name="Skeleton"
          component={SkeletonScreen}
          options={{ title: 'Skeleton' }}
        />
        <Stack.Screen
          name="Slider"
          component={SliderScreen}
          options={{ title: 'Slider' }}
        />
        <Stack.Screen
          name="Spacer"
          component={SpacerScreen}
          options={{ title: 'Spacer' }}
        />
        <Stack.Screen
          name="Spinner"
          component={SpinnerScreen}
          options={{ title: 'Spinner' }}
        />
        <Stack.Screen
          name="Switch"
          component={SwitchScreen}
          options={{ title: 'Switch' }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabsScreen}
          options={{ title: 'Tabs' }}
        />
        <Stack.Screen
          name="Textarea"
          component={TextareaScreen}
          options={{ title: 'Textarea' }}
        />
        <Stack.Screen
          name="Toast"
          component={ToastScreen}
          options={{ title: 'Toast' }}
        />
        <Stack.Screen
          name="Tooltip"
          component={TooltipScreen}
          options={{ title: 'Tooltip' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
