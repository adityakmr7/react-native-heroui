import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type ProgressColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends Omit<ViewProps, 'style'> {
  /** Label text */
  label?: string;
  /** Current value (0-100) */
  value?: number;
  /** Min value */
  minValue?: number;
  /** Max value */
  maxValue?: number;
  /** Progress color */
  color?: ProgressColor;
  /** Progress size */
  size?: ProgressSize;
  /** Whether progress is indeterminate */
  isIndeterminate?: boolean;
  /** Whether progress is striped */
  isStriped?: boolean;
  /** Whether to show value label */
  showValueLabel?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    track?: StyleProp<ViewStyle>;
    indicator?: StyleProp<ViewStyle>;
    value?: StyleProp<TextStyle>;
  };
}

export const Progress = React.forwardRef<View, ProgressProps>(
  (
    {
      label,
      value = 0,
      minValue = 0,
      maxValue = 100,
      color = 'primary',
      size = 'md',
      isIndeterminate = false,
      // isStriped = false, // Reserved for future use
      showValueLabel = false,
      formatValue,
      disableAnimation = false,
      style,
      classNames,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const animatedValue = useRef(new Animated.Value(0)).current;
    const indeterminateAnim = useRef(new Animated.Value(0)).current;

    const percentage = Math.min(
      100,
      Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100)
    );

    useEffect(() => {
      if (isIndeterminate) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(indeterminateAnim, {
              toValue: 1,
              duration: 1500,
              useNativeDriver: true,
            }),
            Animated.timing(indeterminateAnim, {
              toValue: 0,
              duration: 1500,
              useNativeDriver: true,
            }),
          ])
        ).start();
      } else if (!disableAnimation) {
        Animated.timing(animatedValue, {
          toValue: percentage,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }, [
      percentage,
      isIndeterminate,
      disableAnimation,
      animatedValue,
      indeterminateAnim,
    ]);

    const sizeMap = {
      sm: 2,
      md: 4,
      lg: 6,
    };

    const getColorValue = () => {
      if (color === 'default') return theme.colors['default-500'];
      return theme.colors[color];
    };

    const colorValue = getColorValue();

    const displayValue = formatValue
      ? formatValue(value)
      : `${Math.round(percentage)}%`;

    const indicatorWidth = disableAnimation
      ? `${percentage}%`
      : animatedValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        });

    const indeterminateTranslate = indeterminateAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-100, 0, 100],
    });

    const styles = StyleSheet.create({
      base: {
        width: '100%',
      },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing['unit-2'],
      },
      label: {
        fontSize: theme.typography.fontSizes['text-medium'],
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.foreground,
      },
      valueText: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
      },
      track: {
        height: sizeMap[size],
        backgroundColor: theme.colors['default-200'],
        borderRadius: sizeMap[size] / 2,
        overflow: 'hidden',
      },
      indicator: {
        height: '100%',
        backgroundColor: colorValue,
        borderRadius: sizeMap[size] / 2,
      },
      indeterminate: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: colorValue,
      },
    });

    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        accessible
        accessibilityRole="progressbar"
        accessibilityValue={{
          min: minValue,
          max: maxValue,
          now: value,
        }}
        {...viewProps}
      >
        {(label || showValueLabel) && (
          <View style={styles.labelContainer}>
            {label && (
              <Text style={[styles.label, classNames?.label]}>{label}</Text>
            )}
            {showValueLabel && !isIndeterminate && (
              <Text style={[styles.valueText, classNames?.value]}>
                {displayValue}
              </Text>
            )}
          </View>
        )}
        <View style={[styles.track, classNames?.track]}>
          {isIndeterminate ? (
            <Animated.View
              style={[
                styles.indeterminate,
                {
                  transform: [
                    {
                      translateX: indeterminateTranslate.interpolate({
                        inputRange: [-100, 100],
                        outputRange: ['-100%', '100%'],
                      }),
                    },
                  ],
                },
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.indicator,
                classNames?.indicator,
                { width: indicatorWidth as any },
              ]}
            />
          )}
        </View>
      </View>
    );
  }
);

Progress.displayName = 'Progress';
