import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
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
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (!isLoaded && !disableAnimation) {
        // Create shimmer animation
        Animated.loop(
          Animated.sequence([
            Animated.timing(shimmerAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(shimmerAnim, {
              toValue: 0,
              duration: 0,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else {
        shimmerAnim.setValue(0);
      }
    }, [isLoaded, disableAnimation, shimmerAnim]);

    const shimmerTranslate = shimmerAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-300, 300],
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
        transform: [{ translateX: shimmerTranslate }, { skewX: '-20deg' }],
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
              <Animated.View style={styles.shimmer} />
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
            <Animated.View style={styles.shimmer} />
          </View>
        )}
      </View>
    );
  }
);

Skeleton.displayName = 'Skeleton';
