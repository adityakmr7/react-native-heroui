// Mock for react-native-reanimated on web
import { View as RNView, Text as RNText } from 'react-native';

// Mock Animated components
const Animated = {
  View: RNView,
  Text: RNText,
  ScrollView: RNView,
  Image: RNView,
  createAnimatedComponent: (component) => component,
};

// Mock hooks
export const useSharedValue = (initialValue) => ({ value: initialValue });
export const useAnimatedStyle = (cb) => cb();
export const withSpring = (value) => value;
export const withTiming = (value) => value;
export const withDelay = (delay, value) => value;
export const withSequence = (...values) => values[values.length - 1];
export const withRepeat = (value) => value;
export const useDerivedValue = (cb) => ({ value: cb() });
export const useAnimatedGestureHandler = (handlers) => handlers;
export const useAnimatedProps = (cb) => cb();
export const useAnimatedReaction = () => {};
export const useAnimatedScrollHandler = () => ({});
export const runOnJS = (fn) => fn;
export const runOnUI = (fn) => fn;
export const interpolate = (value, inputRange, outputRange) => value;
export const interpolateColor = (value, inputRange, outputRange) => {
  // Return the last color from outputRange for web
  return outputRange[outputRange.length - 1] || '#000000';
};
export const Extrapolate = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

export const Extrapolation = {
  CLAMP: 'clamp',
  EXTEND: 'extend',
  IDENTITY: 'identity',
};

// Mock Easing functions
export const Easing = {
  linear: (t) => t,
  ease: (t) => t,
  quad: (t) => t * t,
  cubic: (t) => t * t * t,
  poly: (n) => (t) => Math.pow(t, n),
  sin: (t) => 1 - Math.cos((t * Math.PI) / 2),
  circle: (t) => 1 - Math.sqrt(1 - t * t),
  exp: (t) => Math.pow(2, 10 * (t - 1)),
  elastic: (bounciness = 1) => (t) => t,
  back: (s = 1.70158) => (t) => t,
  bounce: (t) => t,
  bezier: (x1, y1, x2, y2) => (t) => t,
  in: (easing) => easing,
  out: (easing) => (t) => 1 - easing(1 - t),
  inOut: (easing) => (t) => t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
};

// Attach everything to Animated object for default import
Animated.Extrapolate = Extrapolate;
Animated.Extrapolation = Extrapolation;
Animated.Easing = Easing;
Animated.interpolate = interpolate;
Animated.interpolateColor = interpolateColor;
Animated.useSharedValue = useSharedValue;
Animated.useAnimatedStyle = useAnimatedStyle;
Animated.withSpring = withSpring;
Animated.withTiming = withTiming;
Animated.withDelay = withDelay;
Animated.withSequence = withSequence;
Animated.withRepeat = withRepeat;

export default Animated;
