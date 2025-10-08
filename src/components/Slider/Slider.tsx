import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
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

    const valueToPosition = (val: number) => {
      const percentage = (val - minValue) / (maxValue - minValue);
      return percentage * containerWidth;
    };

    const positionToValue = (position: number) => {
      const percentage = position / containerWidth;
      const rawValue = percentage * (maxValue - minValue) + minValue;
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.max(minValue, Math.min(maxValue, steppedValue));
    };

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !isDisabled,
      onMoveShouldSetPanResponder: () => !isDisabled,
      onPanResponderGrant: (_, gestureState) => {
        const newValue = positionToValue(gestureState.x0);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      onPanResponderMove: (_, gestureState) => {
        const newValue = positionToValue(
          gestureState.moveX - gestureState.x0 + valueToPosition(currentValue)
        );
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      onPanResponderRelease: () => {
        onChangeEnd?.(currentValue);
      },
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
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
    });

    const thumbPosition =
      valueToPosition(currentValue) - sizeMap[size].thumb / 2;
    const filledWidth = valueToPosition(currentValue);

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
        <View
          style={[styles.trackContainer, classNames?.track]}
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
          {...panResponder.panHandlers}
        >
          <View style={styles.track} />
          <View
            style={[
              styles.filledTrack,
              classNames?.filledTrack,
              { width: filledWidth },
            ]}
          />
          <View
            style={[styles.thumb, classNames?.thumb, { left: thumbPosition }]}
          />
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';
