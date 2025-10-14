import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export interface SkeletonProps extends Omit<ViewProps, 'style'> {
  /** Whether the content is loaded */
  isLoaded?: boolean;
  /** Disable shimmer animation */
  disableAnimation?: boolean;
  /** Children to wrap (will determine skeleton shape) */
  children?: React.ReactNode;
  /** Custom style for the container */
  style?: StyleProp<ViewStyle>;
  /** Custom class names for slots */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
  };
}

export const Skeleton = React.forwardRef<View, SkeletonProps>(
  (
    {
      isLoaded = false,
      disableAnimation = false,
      children,
      style,
      classNames,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const shimmer = useSharedValue(0);

    useEffect(() => {
      if (!isLoaded && !disableAnimation) {
        shimmer.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1500, easing: Easing.linear }),
            withTiming(0, { duration: 0 })
          ),
          -1,
          false
        );
      } else {
        shimmer.value = 0;
      }
    }, [isLoaded, disableAnimation, shimmer]);

    const shimmerAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        shimmer.value,
        [0, 1],
        [-300, 300],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateX }, { skewX: '-20deg' }],
      };
    });

    const styles = StyleSheet.create({
      base: {
        backgroundColor: theme.colors['default-200'],
        borderRadius: theme.borderRadius.lg,
        overflow: 'hidden',
        position: 'relative',
      },
      standalone: {
        width: '100%',
        height: 20,
      },
      shimmerContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
      },
      shimmer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      },
      content: {
        opacity: isLoaded ? 1 : 0,
      },
      loadingContent: {
        opacity: 0,
      },
    });

    // If loaded, just show the content
    if (isLoaded && children) {
      return (
        <View
          ref={ref}
          style={[styles.content, classNames?.content, style]}
          {...viewProps}
        >
          {children}
        </View>
      );
    }

    // If no children and not loaded, show standalone skeleton
    if (!children && !isLoaded) {
      return (
        <View
          ref={ref}
          style={[styles.base, styles.standalone, classNames?.base, style]}
          accessibilityRole="progressbar"
          accessibilityLabel="Loading"
          accessibilityState={{ busy: true }}
          {...viewProps}
        >
          {!disableAnimation && (
            <View style={styles.shimmerContainer}>
              <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]} />
            </View>
          )}
        </View>
      );
    }

    // Show children wrapped in skeleton
    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        accessibilityRole="progressbar"
        accessibilityLabel="Loading"
        accessibilityState={{ busy: !isLoaded }}
        {...viewProps}
      >
        {/* Invisible content to maintain shape */}
        <View style={styles.loadingContent}>{children}</View>

        {/* Shimmer overlay */}
        {!disableAnimation && (
          <View style={styles.shimmerContainer}>
            <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]} />
          </View>
        )}
      </View>
    );
  }
);

Skeleton.displayName = 'Skeleton';
