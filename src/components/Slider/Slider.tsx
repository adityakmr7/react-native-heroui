import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type LayoutChangeEvent,
  Text,
} from 'react-native';
// @ts-ignore - peer dependency
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withSpring,
  clamp,
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
    const getSteppedValue = (val: number) => {
      const clamped = Math.min(Math.max(val, minValue), maxValue);
      const steps = Math.round((clamped - minValue) / step);
      return minValue + steps * step;
    };

    const [internalValue, setInternalValue] = useState(
      getSteppedValue(defaultValue)
    );
    const [containerWidth, setContainerWidth] = useState(0);
    const translationX = useSharedValue<number>(0); // current translation x
    const prevTranslationX = useSharedValue(0); // previous translation x
    const thumbScale = useSharedValue(1);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled
      ? getSteppedValue(controlledValue!)
      : internalValue;

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

    const updateValueFromPosition = (
      translateX: number,
      containerW: number
    ) => {
      'worklet';
      const trackWidth = Math.max(containerW - sizeMap[size].thumb, 0);
      if (trackWidth === 0) {
        return isControlled ? (controlledValue ?? minValue) : internalValue;
      }

      const ratio = translateX / trackWidth;
      const rawValue = minValue + ratio * (maxValue - minValue);
      const clamped = Math.min(Math.max(rawValue, minValue), maxValue);
      const steps = Math.round((clamped - minValue) / step);
      const steppedValue = minValue + steps * step;

      if (!isControlled) {
        runOnJS(setInternalValue)(steppedValue);
      }
      if (onChange) {
        runOnJS(onChange)(steppedValue);
      }

      return steppedValue;
    };

    const updateThumbPositionForValue = (value: number, containerW: number) => {
      const trackWidth = Math.max(containerW - sizeMap[size].thumb, 0);
      if (trackWidth === 0) return;

      const clamped = Math.min(Math.max(value, minValue), maxValue);
      const ratio =
        maxValue === minValue
          ? 0
          : (clamped - minValue) / (maxValue - minValue);
      const newTranslateX = ratio * trackWidth;
      translationX.value = newTranslateX;
      prevTranslationX.value = newTranslateX;
    };

    // Combine gestures - Pan takes priority over Tap
    const panGesture = Gesture.Pan()
      .onStart(() => {
        thumbScale.value = withSpring(1.2, {
          damping: 20,
          stiffness: 200,
        });
        prevTranslationX.value = translationX.value;
      })
      .onUpdate((event) => {
        const maxTranslateX = Math.max(containerWidth - sizeMap[size].thumb, 0);
        const minTranslateX = 0;
        const nextTranslateX = clamp(
          prevTranslationX.value + event.translationX,
          minTranslateX,
          maxTranslateX
        );

        translationX.value = nextTranslateX;
        updateValueFromPosition(nextTranslateX, containerWidth);
      })
      .onEnd(() => {
        thumbScale.value = withSpring(1, {
          damping: 20,
          stiffness: 200,
        });

        const maxTranslateX = Math.max(containerWidth - sizeMap[size].thumb, 0);
        const minTranslateX = 0;
        const clampedTranslateX = clamp(
          translationX.value,
          minTranslateX,
          maxTranslateX
        );
        const finalValue = updateValueFromPosition(
          clampedTranslateX,
          containerWidth
        );

        if (onChangeEnd && finalValue !== undefined) {
          onChangeEnd(finalValue);
        }
      });

    const tapGesture = Gesture.Tap()
      .onStart(() => {
        thumbScale.value = withSpring(2, {
          damping: 20,
          stiffness: 200,
        });
      })
      .onEnd(() => {
        thumbScale.value = withSpring(1, {
          damping: 20,
          stiffness: 200,
        });
      });

    const composedGesture = Gesture.Exclusive(
      panGesture.enabled(!isDisabled),
      tapGesture.enabled(!isDisabled)
    );

    const animatedThumbStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateX: translationX.value },
          { scale: thumbScale.value },
        ],
      };
    });

    const filledTrackStyle = useAnimatedStyle(() => ({
      width: translationX.value + sizeMap[size].thumb / 2,
    }));

    // Animated styles

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
      stepsContainer: {
        position: 'absolute',
        left: sizeMap[size].thumb / 2,
        right: sizeMap[size].thumb / 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      stepMarker: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.colors['default-400'],
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
      <GestureHandlerRootView>
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
              onLayout={(e: LayoutChangeEvent) => {
                const width = e.nativeEvent.layout.width;
                setContainerWidth(width);
                updateThumbPositionForValue(currentValue, width);
              }}
            >
              <View style={styles.track} />
              {showSteps && maxValue > minValue && step > 0 && (
                <View style={styles.stepsContainer}>
                  {Array.from(
                    {
                      length: Math.floor((maxValue - minValue) / step) + 1,
                    },
                    (_, index) => (
                      <View key={index} style={styles.stepMarker} />
                    )
                  )}
                </View>
              )}
              <Animated.View
                style={[
                  styles.filledTrack,
                  classNames?.filledTrack,
                  filledTrackStyle,
                ]}
              />
              <Animated.View
                style={[styles.thumb, classNames?.thumb, animatedThumbStyle]}
              />
            </View>
          </GestureDetector>
        </View>
      </GestureHandlerRootView>
    );
  }
);

Slider.displayName = 'Slider';
