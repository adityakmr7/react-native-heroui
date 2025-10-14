import React, { useEffect } from 'react';
import {
  View,
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
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
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
    const progress = useSharedValue(0);
    const indeterminateProgress = useSharedValue(0);

    const percentage = Math.min(
      100,
      Math.max(0, ((value - minValue) / (maxValue - minValue)) * 100)
    );

    useEffect(() => {
      if (isIndeterminate) {
        indeterminateProgress.value = withRepeat(
          withSequence(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
        );
      } else if (disableAnimation) {
        progress.value = percentage;
      } else {
        progress.value = withTiming(percentage, { duration: 300 });
      }
    }, [percentage, isIndeterminate, disableAnimation, progress, indeterminateProgress]);

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

    const indicatorAnimatedStyle = useAnimatedStyle(() => ({
      width: `${progress.value}%`,
    }));

    const indeterminateAnimatedStyle = useAnimatedStyle(() => {
      const translateX = interpolate(
        indeterminateProgress.value,
        [0, 0.5, 1],
        [-100, 0, 100],
        Extrapolation.CLAMP
      );
      return {
        transform: [{ translateX: `${translateX}%` }],
      };
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
                indeterminateAnimatedStyle,
              ]}
            />
          ) : (
            <Animated.View
              style={[
                styles.indicator,
                classNames?.indicator,
                indicatorAnimatedStyle,
              ]}
            />
          )}
        </View>
      </View>
    );
  }
);

Progress.displayName = 'Progress';
