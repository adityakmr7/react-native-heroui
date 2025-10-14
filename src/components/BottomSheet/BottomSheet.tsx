import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
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
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  // @ts-ignore - peer dependency
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
  // @ts-ignore - peer dependency
} from 'react-native-gesture-handler';
import { useTheme } from '../../hooks/useTheme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export type BottomSheetSnapPoint = number | string; // number (px) or string (%)
export type BottomSheetBackdrop = 'transparent' | 'opaque' | 'blur';

// Context for child components
interface BottomSheetContextType {
  onClose: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('BottomSheet components must be used within BottomSheet');
  }
  return context;
};

// BottomSheet Props
export interface BottomSheetProps extends Omit<ViewProps, 'children'> {
  /** Controls visibility */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Snap points - can be pixels (300) or percentage ("50%") */
  snapPoints?: BottomSheetSnapPoint[];
  /** Initial snap point index */
  initialSnapIndex?: number;
  /** Enable backdrop */
  showBackdrop?: boolean;
  /** Backdrop variant */
  backdrop?: BottomSheetBackdrop;
  /** Close on backdrop press */
  closeOnBackdropPress?: boolean;
  /** Close on swipe down */
  closeOnSwipeDown?: boolean;
  /** Enable drag handle */
  showDragHandle?: boolean;
  /** Disable pan gesture */
  disablePanGesture?: boolean;
  /** Disable animation */
  disableAnimation?: boolean;
  /** Custom styles */
  classNames?: {
    backdrop?: StyleProp<ViewStyle>;
    container?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    dragHandle?: StyleProp<ViewStyle>;
  };
  /** Content */
  children: React.ReactNode;
  /** Callback when snap changes */
  onSnapChange?: (index: number) => void;
  /** Callback when animation ends */
  onAnimationEnd?: () => void;
}

// Child Components Props
export interface BottomSheetHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showCloseButton?: boolean;
  closeButtonPosition?: 'left' | 'right';
}

export interface BottomSheetBodyProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}

export interface BottomSheetFooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

// Utility function to convert snap point to pixels
const snapPointToPixels = (snapPoint: BottomSheetSnapPoint): number => {
  if (typeof snapPoint === 'number') {
    return snapPoint;
  }
  // Handle percentage strings like "50%"
  const percentage = parseFloat(snapPoint);
  return (percentage / 100) * SCREEN_HEIGHT;
};

// Main BottomSheet Component
export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  snapPoints = ['50%', '90%'],
  initialSnapIndex = 0,
  showBackdrop = true,
  backdrop = 'opaque',
  closeOnBackdropPress = true,
  closeOnSwipeDown = true,
  showDragHandle = true,
  disablePanGesture = false,
  disableAnimation = false,
  classNames,
  children,
  onSnapChange,
  onAnimationEnd,
  style,
  ...viewProps
}) => {
  const { theme } = useTheme();
  const [currentSnapIndex, setCurrentSnapIndex] = useState(initialSnapIndex);

  // Convert snap points to pixels
  const snapPointsInPixels = snapPoints.map(snapPointToPixels);
  const maxSnapPoint = Math.max(...snapPointsInPixels);

  // Animated values
  const translateY = useSharedValue(SCREEN_HEIGHT);
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

  // Open/close animations
  useEffect(() => {
    if (isOpen) {
      const targetY =
        SCREEN_HEIGHT - (snapPointsInPixels[currentSnapIndex] || 0);
      if (disableAnimation) {
        translateY.value = targetY;
        backdropOpacity.value = 1;
      } else {
        translateY.value = withSpring(targetY, springConfig, () => {
          if (onAnimationEnd) {
            runOnJS(onAnimationEnd)();
          }
        });
        backdropOpacity.value = withTiming(1, { duration: 300 });
      }
    } else {
      if (disableAnimation) {
        translateY.value = SCREEN_HEIGHT;
        backdropOpacity.value = 0;
      } else {
        translateY.value = withSpring(SCREEN_HEIGHT, springConfig);
        backdropOpacity.value = withTiming(0, { duration: 200 });
      }
    }
  }, [
    isOpen,
    currentSnapIndex,
    disableAnimation,
    translateY,
    backdropOpacity,
    snapPointsInPixels,
    springConfig,
    onAnimationEnd,
  ]);

  // Find nearest snap point
  const findNearestSnapPoint = useCallback(
    (y: number) => {
      'worklet';
      const distances = snapPointsInPixels.map((point) =>
        Math.abs(SCREEN_HEIGHT - point - y)
      );
      const minDistance = Math.min(...distances);
      return distances.indexOf(minDistance);
    },
    [snapPointsInPixels]
  );

  // Handle snap change
  const handleSnapChange = useCallback(
    (index: number) => {
      setCurrentSnapIndex(index);
      if (onSnapChange) {
        onSnapChange(index);
      }
    },
    [onSnapChange]
  );

  // Pan gesture handler
  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { y: number }
  >({
    onStart: (_event: any, ctx: { y: number }) => {
      ctx.y = translateY.value;
    },
    onActive: (event: any, ctx: { y: number }) => {
      const newY = ctx.y + event.translationY;
      const minY = SCREEN_HEIGHT - maxSnapPoint;

      // Allow some overscroll at top
      if (newY < minY - 50) {
        translateY.value = minY - 50 + (newY - (minY - 50)) * 0.3;
      } else {
        translateY.value = Math.max(minY - 50, newY);
      }
    },
    onEnd: (event: any) => {
      const velocityY = event.velocityY;
      const currentY = translateY.value;

      // Check if should close (swipe down with velocity or below threshold)
      if (
        closeOnSwipeDown &&
        (velocityY > 500 || currentY > SCREEN_HEIGHT - 100)
      ) {
        translateY.value = withSpring(SCREEN_HEIGHT, springConfig);
        backdropOpacity.value = withTiming(0, { duration: 200 });
        runOnJS(onClose)();
        return;
      }

      // Snap to nearest point
      const nearestIndex = findNearestSnapPoint(currentY);
      const targetY = SCREEN_HEIGHT - (snapPointsInPixels[nearestIndex] || 0);

      translateY.value = withSpring(targetY, springConfig);

      if (nearestIndex !== currentSnapIndex) {
        runOnJS(handleSnapChange)(nearestIndex);
      }
    },
  });

  // Animated styles
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
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

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: getBackdropColor(),
    },
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: SCREEN_HEIGHT,
      backgroundColor: theme.colors.content1,
      borderTopLeftRadius: theme.borderRadius.lg,
      borderTopRightRadius: theme.borderRadius.lg,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 8,
    },
    dragHandleContainer: {
      width: '100%',
      alignItems: 'center',
      paddingVertical: theme.spacing['unit-3'],
    },
    dragHandle: {
      width: 40,
      height: 5,
      backgroundColor: theme.colors['default-300'],
      borderRadius: 3,
    },
    contentWrapper: {
      flex: 1,
      overflow: 'hidden',
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
      <BottomSheetContext.Provider value={{ onClose }}>
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

          {/* Bottom Sheet */}
          <PanGestureHandler
            onGestureEvent={disablePanGesture ? undefined : gestureHandler}
            enabled={!disablePanGesture}
          >
            <Animated.View
              style={[
                styles.container,
                sheetAnimatedStyle,
                classNames?.container,
                style,
              ]}
              {...viewProps}
            >
              {/* Drag Handle */}
              {showDragHandle && (
                <View style={styles.dragHandleContainer}>
                  <View style={[styles.dragHandle, classNames?.dragHandle]} />
                </View>
              )}

              {/* Content */}
              <View style={[styles.contentWrapper, classNames?.content]}>
                {children}
              </View>
            </Animated.View>
          </PanGestureHandler>
        </View>
      </BottomSheetContext.Provider>
    </RNModal>
  );
};

// BottomSheet Header
export const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({
  children,
  style,
  showCloseButton = false,
  closeButtonPosition = 'right',
}) => {
  const { theme } = useTheme();
  const { onClose } = useBottomSheetContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing['unit-4'],
      paddingVertical: theme.spacing['unit-3'],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    content: {
      flex: 1,
    },
    closeButton: {
      padding: theme.spacing['unit-2'],
    },
    closeButtonText: {
      fontSize: 24,
      color: theme.colors['default-500'],
    },
  });

  return (
    <View style={[styles.header, style]}>
      {showCloseButton && closeButtonPosition === 'left' && (
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
      <View style={styles.content}>{children}</View>
      {showCloseButton && closeButtonPosition === 'right' && (
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

// BottomSheet Body
export const BottomSheetBody: React.FC<BottomSheetBodyProps> = ({
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

// BottomSheet Footer
export const BottomSheetFooter: React.FC<BottomSheetFooterProps> = ({
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

BottomSheet.displayName = 'BottomSheet';
BottomSheetHeader.displayName = 'BottomSheetHeader';
BottomSheetBody.displayName = 'BottomSheetBody';
BottomSheetFooter.displayName = 'BottomSheetFooter';
