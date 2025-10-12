import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type LayoutChangeEvent,
} from 'react-native';
// @ts-ignore - peer dependency
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  // @ts-ignore - peer dependency
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type SliderColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type SliderSize = 'sm' | 'md' | 'lg';

export interface SliderProps extends Omit<ViewProps, 'style'> {
  /** Label text */
  label?: string;
  /** Minimum value */
  minValue?: number;
  /** Maximum value */
  maxValue?: number;
  /** Current value (controlled) */
  value?: number;
  /** Default value (uncontrolled) */
  defaultValue?: number;
  /** Step increment */
  step?: number;
  /** Slider color */
  color?: SliderColor;
  /** Slider size */
  size?: SliderSize;
  /** Whether slider is disabled */
  isDisabled?: boolean;
  /** Show value label */
  showValue?: boolean;
  /** Show step markers */
  showSteps?: boolean;
  /** Custom value formatter */
  formatValue?: (value: number) => string;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    track?: StyleProp<ViewStyle>;
    filledTrack?: StyleProp<ViewStyle>;
    thumb?: StyleProp<ViewStyle>;
    value?: StyleProp<TextStyle>;
  };
  /** Value change handler */
  onChange?: (value: number) => void;
  /** Change end handler */
  onChangeEnd?: (value: number) => void;
}

export const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      label,
      minValue = 0,
      maxValue = 100,
      value: controlledValue,
      defaultValue = 0,
      step = 1,
      color = 'primary',
      size = 'md',
      isDisabled = false,
      showValue = false,
      showSteps = false,
      formatValue,
      style,
      classNames,
      onChange,
      onChangeEnd,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [containerWidth, setContainerWidth] = useState(0);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Shared values for smooth animations
    const thumbPosition = useSharedValue(0);
    const thumbScale = useSharedValue(1);
    const savedPosition = useSharedValue(0);

    const sizeMap = {
      sm: {
        track: 2,
        thumb: 12,
      },
      md: {
        track: 3,
        thumb: 16,
      },
      lg: {
        track: 4,
        thumb: 20,
      },
    };

    const getColorValue = () => {
      if (color === 'default') return theme.colors['default-500'];
      return theme.colors[color];
    };

    const colorValue = getColorValue();

    const valueToPosition = useCallback(
      (val: number) => {
        const percentage = (val - minValue) / (maxValue - minValue);
        return percentage * containerWidth;
      },
      [minValue, maxValue, containerWidth]
    );

    // Update thumb position when value changes
    useEffect(() => {
      if (containerWidth > 0) {
        const position = valueToPosition(currentValue);
        thumbPosition.value = withSpring(position, {
          damping: 20,
          stiffness: 200,
        });
        savedPosition.value = position;
      }
    }, [currentValue, containerWidth, valueToPosition]);

    // Callback to update value (runs on JS thread)
    const updateValue = useCallback(
      (newValue: number) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const handleChangeEnd = useCallback(
      (finalValue: number) => {
        onChangeEnd?.(finalValue);
      },
      [onChangeEnd]
    );

    // Pan gesture for dragging the thumb
    const panGesture = Gesture.Pan()
      .enabled(!isDisabled)
      .onStart(() => {
        'worklet';
        savedPosition.value = thumbPosition.value;
        // Scale up thumb for visual feedback
        thumbScale.value = withSpring(1.4, {
          damping: 15,
          stiffness: 200,
        });
      })
      .onUpdate((event: any) => {
        'worklet';
        const newPosition = Math.max(
          0,
          Math.min(containerWidth, savedPosition.value + event.translationX)
        );
        thumbPosition.value = newPosition;

        // Calculate value in worklet (avoid JS bridge)
        const percentage = newPosition / containerWidth;
        const rawValue = percentage * (maxValue - minValue) + minValue;
        const steppedValue = Math.round(rawValue / step) * step;
        const newValue = Math.max(minValue, Math.min(maxValue, steppedValue));

        runOnJS(updateValue)(newValue);
      })
      .onEnd(() => {
        'worklet';
        // Scale back to normal
        thumbScale.value = withSpring(1, {
          damping: 15,
          stiffness: 200,
        });
        savedPosition.value = thumbPosition.value;

        // Calculate final value in worklet
        const percentage = thumbPosition.value / containerWidth;
        const rawValue = percentage * (maxValue - minValue) + minValue;
        const steppedValue = Math.round(rawValue / step) * step;
        const finalValue = Math.max(minValue, Math.min(maxValue, steppedValue));

        runOnJS(handleChangeEnd)(finalValue);
      });

    // Tap gesture for jumping to position
    const tapGesture = Gesture.Tap()
      .enabled(!isDisabled)
      .onEnd((event: any) => {
        'worklet';
        const newPosition = Math.max(0, Math.min(containerWidth, event.x));

        // Smooth spring animation to new position
        thumbPosition.value = withSpring(newPosition, {
          damping: 20,
          stiffness: 200,
        });
        savedPosition.value = newPosition;

        // Briefly scale up for feedback
        thumbScale.value = withSpring(1.2, {
          damping: 10,
          stiffness: 300,
        });
        thumbScale.value = withSpring(1, {
          damping: 15,
          stiffness: 200,
        });

        // Calculate value in worklet
        const percentage = newPosition / containerWidth;
        const rawValue = percentage * (maxValue - minValue) + minValue;
        const steppedValue = Math.round(rawValue / step) * step;
        const newValue = Math.max(minValue, Math.min(maxValue, steppedValue));

        runOnJS(updateValue)(newValue);
        runOnJS(handleChangeEnd)(newValue);
      });

    // Combine gestures - Pan takes priority over Tap
    const composedGesture = Gesture.Race(panGesture, tapGesture);

    // Animated styles
    const animatedThumbStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: thumbPosition.value - sizeMap[size].thumb / 2 },
          { scale: thumbScale.value },
        ],
      };
    });

    const animatedFilledTrackStyle = useAnimatedStyle(() => {
      return {
        width: thumbPosition.value,
      };
    });

    const displayValue = formatValue
      ? formatValue(currentValue)
      : currentValue.toString();

    const styles = StyleSheet.create({
      base: {
        width: '100%',
        paddingVertical: theme.spacing['unit-2'],
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
      trackContainer: {
        height: sizeMap[size].thumb + 8,
        justifyContent: 'center',
        opacity: isDisabled ? 0.5 : 1,
      },
      track: {
        height: sizeMap[size].track,
        backgroundColor: theme.colors['default-300'],
        borderRadius: sizeMap[size].track / 2,
      },
      filledTrack: {
        position: 'absolute',
        height: sizeMap[size].track,
        backgroundColor: colorValue,
        borderRadius: sizeMap[size].track / 2,
      },
      thumb: {
        position: 'absolute',
        width: sizeMap[size].thumb,
        height: sizeMap[size].thumb,
        borderRadius: sizeMap[size].thumb / 2,
        backgroundColor: colorValue,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 4,
      },
    });

    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        {...viewProps}
      >
        {(label || showValue) && (
          <View style={styles.labelContainer}>
            {label && (
              <Text style={[styles.label, classNames?.label]}>{label}</Text>
            )}
            {showValue && (
              <Text style={[styles.valueText, classNames?.value]}>
                {displayValue}
              </Text>
            )}
          </View>
        )}
        <GestureDetector gesture={composedGesture}>
          <View
            style={[styles.trackContainer, classNames?.track]}
            onLayout={(e: LayoutChangeEvent) =>
              setContainerWidth(e.nativeEvent.layout.width)
            }
          >
            <View style={styles.track} />
            <Animated.View
              style={[
                styles.filledTrack,
                classNames?.filledTrack,
                animatedFilledTrackStyle,
              ]}
            />
            <Animated.View
              style={[styles.thumb, classNames?.thumb, animatedThumbStyle]}
            />
          </View>
        </GestureDetector>
      </View>
    );
  }
);

Slider.displayName = 'Slider';
