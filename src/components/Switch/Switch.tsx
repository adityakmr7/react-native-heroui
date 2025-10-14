import React, { useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export interface SwitchProps {
  /** Whether switch is on */
  value?: boolean;
  /** Default value (uncontrolled) */
  defaultValue?: boolean;
  /** Change handler */
  onChange?: (value: boolean) => void;
  /** Switch color */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether switch is disabled */
  isDisabled?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
}

export const Switch = React.forwardRef<View, SwitchProps>(
  (
    {
      value: controlledValue,
      defaultValue = false,
      onChange,
      color = 'primary',
      size = 'md',
      isDisabled = false,
      style,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const progress = useSharedValue(value ? 1 : 0);

    const sizeMap = {
      sm: {
        width: 40,
        height: 24,
        thumbSize: 18,
        padding: 3,
      },
      md: {
        width: 48,
        height: 28,
        thumbSize: 22,
        padding: 3,
      },
      lg: {
        width: 56,
        height: 32,
        thumbSize: 26,
        padding: 3,
      },
    };

    const dimensions = sizeMap[size];
    const maxTranslateX =
      dimensions.width - dimensions.thumbSize - dimensions.padding * 2;

    useEffect(() => {
      progress.value = withSpring(value ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    }, [value, progress]);

    const handlePress = () => {
      if (isDisabled) return;

      const newValue = !value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const containerAnimatedStyle = useAnimatedStyle(() => ({
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [theme.colors['default-400'], theme.colors[color]]
      ),
    }));

    const thumbAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: interpolate(
            progress.value,
            [0, 1],
            [0, maxTranslateX],
            Extrapolation.CLAMP
          ),
        },
      ],
    }));

    const styles = StyleSheet.create({
      container: {
        width: dimensions.width,
        height: dimensions.height,
        borderRadius: dimensions.height / 2,
        padding: dimensions.padding,
        justifyContent: 'center',
        opacity: isDisabled ? 0.5 : 1,
      },
      thumb: {
        width: dimensions.thumbSize,
        height: dimensions.thumbSize,
        borderRadius: dimensions.thumbSize / 2,
        backgroundColor: theme.colors.background,
        ...theme.shadows['shadow-sm'],
      },
    });

    return (
      <Pressable
        ref={ref as any}
        onPress={handlePress}
        disabled={isDisabled}
        accessibilityRole="switch"
        accessibilityState={{
          checked: value,
          disabled: isDisabled,
        }}
        style={style}
      >
        <Animated.View style={[styles.container, containerAnimatedStyle]}>
          <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
        </Animated.View>
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
