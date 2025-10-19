// Mock for react-native-gesture-handler on web
import { View as RNView, ScrollView as RNScrollView } from 'react-native';

// Mock gesture components
export const GestureHandlerRootView = RNView;
export const PanGestureHandler = RNView;
export const TapGestureHandler = RNView;
export const LongPressGestureHandler = RNView;
export const RotationGestureHandler = RNView;
export const PinchGestureHandler = RNView;
export const FlingGestureHandler = RNView;
export const ForceTouchGestureHandler = RNView;
export const NativeViewGestureHandler = RNView;
export const ScrollView = RNScrollView;
export const Swipeable = RNView;
export const DrawerLayout = RNView;

// Mock gesture state
export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

// Mock directions
export const Directions = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

// Create a chainable gesture mock
const createChainableGesture = () => {
  const gesture = {
    onStart: () => gesture,
    onUpdate: () => gesture,
    onEnd: () => gesture,
    onFinalize: () => gesture,
    onChange: () => gesture,
    onBegin: () => gesture,
    onTouchesDown: () => gesture,
    onTouchesMove: () => gesture,
    onTouchesUp: () => gesture,
    onTouchesCancelled: () => gesture,
    enabled: () => gesture,
    shouldCancelWhenOutside: () => gesture,
    simultaneousWithExternalGesture: () => gesture,
    requireExternalGestureToFail: () => gesture,
    withRef: () => gesture,
    withTestId: () => gesture,
    runOnJS: () => gesture,
    minDistance: () => gesture,
    minPointers: () => gesture,
    maxPointers: () => gesture,
    activeOffsetX: () => gesture,
    activeOffsetY: () => gesture,
    failOffsetX: () => gesture,
    failOffsetY: () => gesture,
  };
  return gesture;
};

// Mock gesture
export const Gesture = {
  Pan: () => createChainableGesture(),
  Tap: () => createChainableGesture(),
  LongPress: () => createChainableGesture(),
  Rotation: () => createChainableGesture(),
  Pinch: () => createChainableGesture(),
  Fling: () => createChainableGesture(),
  Hover: () => createChainableGesture(),
  Native: () => createChainableGesture(),
  Race: (...gestures) => createChainableGesture(),
  Simultaneous: (...gestures) => createChainableGesture(),
  Exclusive: (...gestures) => createChainableGesture(),
};

// Mock GestureDetector
export const GestureDetector = RNView;
