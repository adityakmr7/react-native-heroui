import React, { useEffect, useRef } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Animated,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
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
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim1 = useRef(new Animated.Value(1)).current;
    const scaleAnim2 = useRef(new Animated.Value(1)).current;
    const waveAnims = useRef(
      [0, 1, 2].map(() => new Animated.Value(0))
    ).current;
    const dotAnims = useRef(
      [0, 1, 2].map(() => new Animated.Value(0.5))
    ).current;

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
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();

      // Pulse animation for gradient variant
      if (variant === 'gradient' || variant === 'default') {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim1, {
              toValue: 1.2,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim1, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();

        Animated.loop(
          Animated.sequence([
            Animated.delay(250),
            Animated.timing(scaleAnim2, {
              toValue: 1.2,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim2, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }

      // Wave animation
      if (variant === 'wave') {
        const createWaveAnim = (anim: Animated.Value, delay: number) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(delay),
              Animated.timing(anim, {
                toValue: 1.5,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 0.5,
                duration: 400,
                useNativeDriver: true,
              }),
            ])
          );

        waveAnims.forEach((anim, index) => {
          createWaveAnim(anim, index * 150).start();
        });
      }

      // Dots animation
      if (variant === 'dots') {
        const createDotAnim = (anim: Animated.Value, delay: number) =>
          Animated.loop(
            Animated.sequence([
              Animated.delay(delay),
              Animated.timing(anim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 0.5,
                duration: 400,
                useNativeDriver: true,
              }),
            ])
          );

        dotAnims.forEach((anim, index) => {
          createDotAnim(anim, index * 150).start();
        });
      }
    }, [variant, rotateAnim, scaleAnim1, scaleAnim2, waveAnims, dotAnims]);

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

    const rotation = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

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
                  { transform: [{ rotate: rotation }, { scale: scaleAnim1 }] },
                ]}
              />
              {variant === 'gradient' && (
                <Animated.View
                  style={[
                    styles.circle2,
                    classNames?.circle2,
                    {
                      transform: [{ rotate: rotation }, { scale: scaleAnim2 }],
                    },
                  ]}
                />
              )}
            </>
          );

        case 'wave':
          return (
            <View style={[styles.waveContainer, classNames?.spinnerBars]}>
              {waveAnims.map((anim, index) => (
                <Animated.View
                  key={index}
                  style={[styles.waveBar, { transform: [{ scaleY: anim }] }]}
                />
              ))}
            </View>
          );

        case 'dots':
          return (
            <View style={[styles.dotsContainer, classNames?.dots]}>
              {dotAnims.map((anim, index) => (
                <Animated.View
                  key={index}
                  style={[styles.dot, { opacity: anim }]}
                />
              ))}
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
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  transform: [{ rotate: rotation }],
                }}
              />
            </View>
          );

        default:
          return (
            <Animated.View
              style={[
                styles.circle,
                classNames?.circle1,
                { transform: [{ rotate: rotation }] },
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
