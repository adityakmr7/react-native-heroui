import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type SpinnerColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'current';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant =
  | 'default'
  | 'simple'
  | 'gradient'
  | 'wave'
  | 'dots'
  | 'spinner';

export interface SpinnerProps extends Omit<ViewProps, 'style'> {
  /** Spinner color */
  color?: SpinnerColor;
  /** Spinner size */
  size?: SpinnerSize;
  /** Spinner variant */
  variant?: SpinnerVariant;
  /** Label text below spinner */
  label?: string;
  /** Label color */
  labelColor?: SpinnerColor;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
    circle1?: StyleProp<ViewStyle>;
    circle2?: StyleProp<ViewStyle>;
    circle?: StyleProp<ViewStyle>;
    dots?: StyleProp<ViewStyle>;
    spinnerBars?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
  };
}

export const Spinner = React.forwardRef<View, SpinnerProps>(
  (
    {
      color = 'primary',
      size = 'md',
      variant = 'default',
      label,
      labelColor = 'default',
      style,
      classNames,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const rotation = useSharedValue(0);
    const scale1 = useSharedValue(1);
    const scale2 = useSharedValue(1);
    const wave1 = useSharedValue(0.5);
    const wave2 = useSharedValue(0.5);
    const wave3 = useSharedValue(0.5);
    const dot1 = useSharedValue(0.5);
    const dot2 = useSharedValue(0.5);
    const dot3 = useSharedValue(0.5);

    const sizeMap = {
      sm: {
        spinner: 'small' as const,
        container: 20,
        circle: 16,
        label: theme.typography.fontSizes['text-small'],
        gap: theme.spacing['unit-2'],
      },
      md: {
        spinner: 'small' as const,
        container: 32,
        circle: 28,
        label: theme.typography.fontSizes['text-medium'],
        gap: theme.spacing['unit-2'],
      },
      lg: {
        spinner: 'large' as const,
        container: 44,
        circle: 40,
        label: theme.typography.fontSizes['text-large'],
        gap: theme.spacing['unit-3'],
      },
    };

    useEffect(() => {
      // Rotation animation for default, gradient, simple variants
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );

      // Pulse animation for gradient variant
      if (variant === 'gradient' || variant === 'default') {
        scale1.value = withRepeat(
          withSequence(
            withTiming(1.2, { duration: 500 }),
            withTiming(1, { duration: 500 })
          ),
          -1,
          false
        );

        scale2.value = withDelay(
          250,
          withRepeat(
            withSequence(
              withTiming(1.2, { duration: 500 }),
              withTiming(1, { duration: 500 })
            ),
            -1,
            false
          )
        );
      }

      // Wave animation
      if (variant === 'wave') {
        wave1.value = withRepeat(
          withSequence(
            withTiming(1.5, { duration: 400 }),
            withTiming(0.5, { duration: 400 })
          ),
          -1,
          false
        );

        wave2.value = withDelay(
          150,
          withRepeat(
            withSequence(
              withTiming(1.5, { duration: 400 }),
              withTiming(0.5, { duration: 400 })
            ),
            -1,
            false
          )
        );

        wave3.value = withDelay(
          300,
          withRepeat(
            withSequence(
              withTiming(1.5, { duration: 400 }),
              withTiming(0.5, { duration: 400 })
            ),
            -1,
            false
          )
        );
      }

      // Dots animation
      if (variant === 'dots') {
        dot1.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 400 }),
            withTiming(0.5, { duration: 400 })
          ),
          -1,
          false
        );

        dot2.value = withDelay(
          150,
          withRepeat(
            withSequence(
              withTiming(1, { duration: 400 }),
              withTiming(0.5, { duration: 400 })
            ),
            -1,
            false
          )
        );

        dot3.value = withDelay(
          300,
          withRepeat(
            withSequence(
              withTiming(1, { duration: 400 }),
              withTiming(0.5, { duration: 400 })
            ),
            -1,
            false
          )
        );
      }
    }, [
      variant,
      rotation,
      scale1,
      scale2,
      wave1,
      wave2,
      wave3,
      dot1,
      dot2,
      dot3,
    ]);

    const getColorValue = (colorKey: SpinnerColor): string => {
      if (colorKey === 'current') {
        return theme.colors.foreground;
      }
      if (colorKey === 'default') {
        return theme.colors['default-500'];
      }
      return theme.colors[colorKey];
    };

    const spinnerColor = getColorValue(color);
    const textColor = getColorValue(labelColor);

    const rotationAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const circle1AnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale1.value }],
    }));

    const circle2AnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }, { scale: scale2.value }],
    }));

    const wave1AnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scaleY: wave1.value }],
    }));

    const wave2AnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scaleY: wave2.value }],
    }));

    const wave3AnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scaleY: wave3.value }],
    }));

    const dot1AnimatedStyle = useAnimatedStyle(() => ({
      opacity: dot1.value,
    }));

    const dot2AnimatedStyle = useAnimatedStyle(() => ({
      opacity: dot2.value,
    }));

    const dot3AnimatedStyle = useAnimatedStyle(() => ({
      opacity: dot3.value,
    }));

    const styles = StyleSheet.create({
      container: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeMap[size].gap,
      },
      wrapper: {
        width: sizeMap[size].container,
        height: sizeMap[size].container,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      circle: {
        width: sizeMap[size].circle,
        height: sizeMap[size].circle,
        borderRadius: sizeMap[size].circle / 2,
        borderWidth: 3,
        borderColor: 'transparent',
        borderTopColor: spinnerColor,
        position: 'absolute',
      },
      circle2: {
        width: sizeMap[size].circle * 0.7,
        height: sizeMap[size].circle * 0.7,
        borderRadius: (sizeMap[size].circle * 0.7) / 2,
        borderWidth: 3,
        borderColor: 'transparent',
        borderTopColor: spinnerColor,
        opacity: 0.5,
        position: 'absolute',
      },
      waveContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        height: sizeMap[size].container,
      },
      waveBar: {
        width: 4,
        height: sizeMap[size].container * 0.6,
        backgroundColor: spinnerColor,
        borderRadius: 2,
      },
      dotsContainer: {
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
      },
      dot: {
        width: size === 'sm' ? 6 : size === 'md' ? 8 : 10,
        height: size === 'sm' ? 6 : size === 'md' ? 8 : 10,
        borderRadius: 10,
        backgroundColor: spinnerColor,
      },
      spinnerBarsContainer: {
        width: sizeMap[size].container,
        height: sizeMap[size].container,
        position: 'relative',
      },
      spinnerBar: {
        position: 'absolute',
        width: 2,
        height: sizeMap[size].container * 0.3,
        backgroundColor: spinnerColor,
        borderRadius: 1,
      },
      label: {
        fontSize: sizeMap[size].label,
        color: textColor,
        textAlign: 'center',
      },
    });

    const renderSpinner = () => {
      switch (variant) {
        case 'simple':
          return (
            <ActivityIndicator
              size={sizeMap[size].spinner}
              color={spinnerColor}
              style={classNames?.circle}
            />
          );

        case 'default':
        case 'gradient':
          return (
            <>
              <Animated.View
                style={[
                  styles.circle,
                  classNames?.circle1,
                  circle1AnimatedStyle,
                ]}
              />
              {variant === 'gradient' && (
                <Animated.View
                  style={[
                    styles.circle2,
                    classNames?.circle2,
                    circle2AnimatedStyle,
                  ]}
                />
              )}
            </>
          );

        case 'wave':
          return (
            <View style={[styles.waveContainer, classNames?.spinnerBars]}>
              <Animated.View style={[styles.waveBar, wave1AnimatedStyle]} />
              <Animated.View style={[styles.waveBar, wave2AnimatedStyle]} />
              <Animated.View style={[styles.waveBar, wave3AnimatedStyle]} />
            </View>
          );

        case 'dots':
          return (
            <View style={[styles.dotsContainer, classNames?.dots]}>
              <Animated.View style={[styles.dot, dot1AnimatedStyle]} />
              <Animated.View style={[styles.dot, dot2AnimatedStyle]} />
              <Animated.View style={[styles.dot, dot3AnimatedStyle]} />
            </View>
          );

        case 'spinner':
          return (
            <View
              style={[styles.spinnerBarsContainer, classNames?.spinnerBars]}
            >
              {[...Array(12)].map((_, index) => {
                const angle = index * 30 * (Math.PI / 180);
                const radius = sizeMap[size].container / 2 - 4;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <Animated.View
                    key={index}
                    style={[
                      styles.spinnerBar,
                      {
                        left: '50%',
                        top: '50%',
                        marginLeft: x - 1,
                        marginTop: y - sizeMap[size].container * 0.15,
                        transform: [{ rotate: `${index * 30}deg` }],
                        opacity: 0.2 + (index / 12) * 0.8,
                      },
                    ]}
                  />
                );
              })}
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  },
                  rotationAnimatedStyle,
                ]}
              />
            </View>
          );

        default:
          return (
            <Animated.View
              style={[
                styles.circle,
                classNames?.circle1,
                rotationAnimatedStyle,
              ]}
            />
          );
      }
    };

    return (
      <View
        ref={ref}
        style={[styles.container, classNames?.base, style]}
        accessibilityRole="progressbar"
        accessibilityLabel={label || 'Loading'}
        {...viewProps}
      >
        <View style={[styles.wrapper, classNames?.wrapper]}>
          {renderSpinner()}
        </View>
        {label && (
          <Text style={[styles.label, classNames?.label]}>{label}</Text>
        )}
      </View>
    );
  }
);

Spinner.displayName = 'Spinner';
