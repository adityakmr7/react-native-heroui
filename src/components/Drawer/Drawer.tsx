import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Dimensions,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  // @ts-ignore - peer dependency
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  // @ts-ignore - peer dependency
} from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DrawerBackdrop = 'transparent' | 'opaque' | 'blur';
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Context for child components
interface DrawerContextType {
  onClose: () => void;
  placement: DrawerPlacement;
}

const DrawerContext = createContext<DrawerContextType | null>(null);

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within Drawer');
  }
  return context;
};

// Drawer Props
export interface DrawerProps extends Omit<ViewProps, 'children'> {
  /** Controls visibility */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Drawer placement */
  placement?: DrawerPlacement;
  /** Drawer size */
  size?: DrawerSize | number; // number for custom width/height in pixels
  /** Enable backdrop */
  showBackdrop?: boolean;
  /** Backdrop variant */
  backdrop?: DrawerBackdrop;
  /** Close on backdrop press */
  closeOnBackdropPress?: boolean;
  /** Close on swipe */
  closeOnSwipe?: boolean;
  /** Disable pan gesture */
  disablePanGesture?: boolean;
  /** Disable animation */
  disableAnimation?: boolean;
  /** Custom styles */
  classNames?: {
    backdrop?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
  };
  /** Content */
  children: React.ReactNode;
  /** Callback when animation ends */
  onAnimationEnd?: () => void;
}

// Child Components Props
export interface DrawerHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
}

export interface DrawerBodyProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Utility: Get drawer dimension based on size
const getDrawerSize = (
  size: DrawerSize | number,
  isHorizontal: boolean
): number => {
  if (typeof size === 'number') return size;

  const dimension = isHorizontal ? SCREEN_WIDTH : SCREEN_HEIGHT;

  const sizeMap = {
    xs: dimension * 0.5,
    sm: dimension * 0.65,
    md: dimension * 0.75,
    lg: dimension * 0.85,
    xl: dimension * 0.95,
    full: dimension,
  };

  return sizeMap[size];
};

// Main Drawer Component
export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'left',
  size = 'md',
  showBackdrop = true,
  backdrop = 'opaque',
  closeOnBackdropPress = true,
  closeOnSwipe = true,
  disablePanGesture = false,
  disableAnimation = false,
  classNames,
  children,
  onAnimationEnd,
  style,
  ...viewProps
}) => {
  const { theme } = useTheme();

  const isHorizontal = placement === 'left' || placement === 'right';
  const drawerSize = getDrawerSize(size, isHorizontal);

  // Animated values
  const translateX = useSharedValue(
    placement === 'left' ? -drawerSize : placement === 'right' ? drawerSize : 0
  );
  const translateY = useSharedValue(
    placement === 'top' ? -drawerSize : placement === 'bottom' ? drawerSize : 0
  );
  const backdropOpacity = useSharedValue(0);

  // Spring config
  const springConfig = useMemo(
    () => ({
      damping: 30,
      stiffness: 300,
      mass: 0.5,
    }),
    []
  );

  // Get closed position based on placement
  const getClosedPosition = useCallback(() => {
    switch (placement) {
      case 'left':
        return { x: -drawerSize, y: 0 };
      case 'right':
        return { x: drawerSize, y: 0 };
      case 'top':
        return { x: 0, y: -drawerSize };
      case 'bottom':
        return { x: 0, y: drawerSize };
      default:
        return { x: -drawerSize, y: 0 };
    }
  }, [placement, drawerSize]);

  // Open/close animations
  useEffect(() => {
    if (isOpen) {
      if (disableAnimation) {
        translateX.value = 0;
        translateY.value = 0;
        backdropOpacity.value = 1;
      } else {
        translateX.value = withSpring(0, springConfig, () => {
          if (onAnimationEnd) {
            runOnJS(onAnimationEnd)();
          }
        });
        translateY.value = withSpring(0, springConfig);
        backdropOpacity.value = withTiming(1, { duration: 300 });
      }
    } else {
      const closedPos = getClosedPosition();
      if (disableAnimation) {
        translateX.value = closedPos.x;
        translateY.value = closedPos.y;
        backdropOpacity.value = 0;
      } else {
        translateX.value = withSpring(closedPos.x, springConfig);
        translateY.value = withSpring(closedPos.y, springConfig);
        backdropOpacity.value = withTiming(0, { duration: 200 });
      }
    }
  }, [
    isOpen,
    disableAnimation,
    translateX,
    translateY,
    backdropOpacity,
    springConfig,
    getClosedPosition,
    onAnimationEnd,
  ]);

  // Pan gesture handler
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      'worklet';
      if (placement === 'left') {
        const newX = startX.value + event.translationX;
        translateX.value = Math.min(0, newX); // Don't go beyond 0
      } else if (placement === 'right') {
        const newX = startX.value + event.translationX;
        translateX.value = Math.max(0, newX); // Don't go beyond 0
      } else if (placement === 'top') {
        const newY = startY.value + event.translationY;
        translateY.value = Math.min(0, newY);
      } else if (placement === 'bottom') {
        const newY = startY.value + event.translationY;
        translateY.value = Math.max(0, newY);
      }

      // Update backdrop opacity based on drag progress
      const progress =
        placement === 'left' || placement === 'right'
          ? Math.abs(translateX.value / drawerSize)
          : Math.abs(translateY.value / drawerSize);
      backdropOpacity.value = 1 - Math.min(1, progress);
    })
    .onEnd((event) => {
      'worklet';
      const velocity =
        placement === 'left' || placement === 'right'
          ? event.velocityX
          : event.velocityY;
      const position =
        placement === 'left' || placement === 'right'
          ? translateX.value
          : translateY.value;

      // Determine if should close based on velocity or position
      const threshold = drawerSize * 0.4;
      const shouldClose =
        closeOnSwipe &&
        ((placement === 'left' && (velocity < -500 || position < -threshold)) ||
          (placement === 'right' && (velocity > 500 || position > threshold)) ||
          (placement === 'top' && (velocity < -500 || position < -threshold)) ||
          (placement === 'bottom' && (velocity > 500 || position > threshold)));

      if (shouldClose) {
        const closedPos = getClosedPosition();
        translateX.value = withSpring(closedPos.x, springConfig);
        translateY.value = withSpring(closedPos.y, springConfig);
        backdropOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(onClose)();
      } else {
        // Snap back to open position
        translateX.value = withSpring(0, springConfig);
        translateY.value = withSpring(0, springConfig);
        backdropOpacity.value = withTiming(1, { duration: 200 });
      }
    });

  // Animated styles
  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // Get backdrop color
  const getBackdropColor = () => {
    if (backdrop === 'transparent') return 'transparent';
    if (backdrop === 'blur') return theme.colors.background + 'E6'; // 90% opacity
    return theme.colors.background + '99'; // 60% opacity
  };

  // Get drawer position styles
  const getDrawerPositionStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'absolute',
      backgroundColor: theme.colors.content1,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    };

    switch (placement) {
      case 'left':
        return {
          ...baseStyle,
          left: 0,
          top: 0,
          bottom: 0,
          width: drawerSize,
          shadowOffset: { width: 2, height: 0 },
        };
      case 'right':
        return {
          ...baseStyle,
          right: 0,
          top: 0,
          bottom: 0,
          width: drawerSize,
          shadowOffset: { width: -2, height: 0 },
        };
      case 'top':
        return {
          ...baseStyle,
          left: 0,
          right: 0,
          top: 0,
          height: drawerSize,
          shadowOffset: { width: 0, height: 2 },
        };
      case 'bottom':
        return {
          ...baseStyle,
          left: 0,
          right: 0,
          bottom: 0,
          height: drawerSize,
          shadowOffset: { width: 0, height: -2 },
        };
      default:
        return baseStyle;
    }
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getBackdropColor(),
    },
    contentWrapper: {
      flex: 1,
    },
  });

  if (!isOpen) return null;

  return (
    <RNModal
      transparent
      visible={isOpen}
      onRequestClose={onClose}
      animationType="none"
      statusBarTranslucent
    >
      <DrawerContext.Provider value={{ onClose, placement }}>
        <View style={styles.overlay}>
          {/* Backdrop */}
          {showBackdrop && (
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={closeOnBackdropPress ? onClose : undefined}
            >
              <Animated.View
                style={[
                  styles.backdrop,
                  backdropAnimatedStyle,
                  classNames?.backdrop,
                ]}
              />
            </Pressable>
          )}

          {/* Drawer */}
          <GestureDetector
            gesture={
              disablePanGesture ? Gesture.Pan().enabled(false) : panGesture
            }
          >
            <Animated.View
              style={[
                getDrawerPositionStyle(),
                drawerAnimatedStyle,
                classNames?.container,
                style,
              ]}
              {...viewProps}
            >
              <View style={[styles.contentWrapper, classNames?.content]}>
                {children}
              </View>
            </Animated.View>
          </GestureDetector>
        </View>
      </DrawerContext.Provider>
    </RNModal>
  );
};

// Drawer Header
export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  style,
  showCloseButton = false,
}) => {
  const { theme } = useTheme();
  const { onClose, placement } = useDrawerContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['unit-4'],
      paddingVertical: theme.spacing['unit-4'],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    content: {
      flex: 1,
    },
    closeButton: {
      padding: theme.spacing['unit-2'],
      marginLeft: placement === 'left' ? 0 : theme.spacing['unit-2'],
      marginRight: placement === 'right' ? 0 : theme.spacing['unit-2'],
    },
    closeButtonText: {
      fontSize: 24,
      color: theme.colors['default-500'],
    },
  });

  return (
    <View style={[styles.header, style]}>
      {showCloseButton && placement === 'left' && (
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
      <View style={styles.content}>{children}</View>
      {showCloseButton && placement === 'right' && (
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

// Drawer Body
export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  style,
  scrollable = true,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    body: {
      flex: 1,
      paddingHorizontal: theme.spacing['unit-4'],
      paddingVertical: theme.spacing['unit-3'],
    },
  });

  if (scrollable) {
    const { ScrollView } = require('react-native');
    return (
      <ScrollView
        style={[styles.body, style]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.body, style]}>{children}</View>;
};

// Drawer Footer
export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  style,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      paddingHorizontal: theme.spacing['unit-4'],
      paddingVertical: theme.spacing['unit-3'],
      borderTopWidth: 1,
      borderTopColor: theme.colors.divider,
    },
  });

  return <View style={[styles.footer, style]}>{children}</View>;
};

Drawer.displayName = 'Drawer';
DrawerHeader.displayName = 'DrawerHeader';
DrawerBody.displayName = 'DrawerBody';
DrawerFooter.displayName = 'DrawerFooter';
