// Jest setup file for React Native testing
import '@testing-library/jest-native/extend-expect';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  default: {
    call: jest.fn(),
  },
  useSharedValue: jest.fn((value) => ({ value })),
  useAnimatedStyle: jest.fn((fn) => fn()),
  withSpring: jest.fn((value) => value),
  withTiming: jest.fn((value) => value),
  withSequence: jest.fn((value) => value),
  withDelay: jest.fn((value) => value),
  withRepeat: jest.fn((value) => value),
  runOnJS: jest.fn((fn) => fn),
  interpolate: jest.fn((value) => value),
  Extrapolate: {
    CLAMP: 'clamp',
    EXTEND: 'extend',
    IDENTITY: 'identity',
  },
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    Touchable: View,
    TouchableBounce: View,
    TouchableHighlight: View,
    TouchableOpacity: View,
    TouchableWithoutFeedback: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Mock react-native with essential components
jest.mock('react-native', () => ({
  // Basic components
  View: 'View',
  Text: 'Text',
  Pressable: 'Pressable',
  TouchableOpacity: 'TouchableOpacity',
  TouchableHighlight: 'TouchableHighlight',
  TouchableWithoutFeedback: 'TouchableWithoutFeedback',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  ActivityIndicator: 'ActivityIndicator',
  Image: 'Image',
  TextInput: 'TextInput',
  Switch: 'Switch',
  Slider: 'Slider',
  Modal: 'Modal',

  // StyleSheet
  StyleSheet: {
    create: () => ({}),
    flatten: jest.fn((style) => style),
    absoluteFill: {},
    absoluteFillObject: {},
    hairlineWidth: 1,
  },

  // Platform
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios || obj.default),
  },

  // Dimensions
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 812 })),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  },

  // PixelRatio
  PixelRatio: {
    get: jest.fn(() => 2),
    getFontScale: jest.fn(() => 1),
    getPixelSizeForLayoutSize: jest.fn((size) => size * 2),
    roundToNearestPixel: jest.fn((size) => Math.round(size)),
  },

  // Animated
  Animated: {
    View: 'Animated.View',
    Text: 'Animated.Text',
    Image: 'Animated.Image',
    ScrollView: 'Animated.ScrollView',
    timing: jest.fn(() => ({
      start: jest.fn(),
      stop: jest.fn(),
    })),
    spring: jest.fn(() => ({
      start: jest.fn(),
      stop: jest.fn(),
    })),
  },

  // Easing
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    quad: jest.fn(),
    cubic: jest.fn(),
  },
}));

// Mock react-native Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default),
}));

// Mock react-native Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock react-native PixelRatio
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: jest.fn(() => 2),
  getFontScale: jest.fn(() => 1),
  getPixelSizeForLayoutSize: jest.fn((size) => size * 2),
  roundToNearestPixel: jest.fn((size) => Math.round(size)),
}));

// Mock Animated API
jest.mock('react-native/Libraries/Animated/Animated', () => ({
  ...jest.requireActual('react-native/Libraries/Animated/Animated'),
  timing: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
  spring: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
  })),
}));
