import React, { useEffect, useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
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

    const translateX = useRef(new Animated.Value(value ? 1 : 0)).current;
    const backgroundColor = useRef(new Animated.Value(value ? 1 : 0)).current;

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
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: value ? 1 : 0,
          useNativeDriver: true,
          friction: 8,
        }),
        Animated.timing(backgroundColor, {
          toValue: value ? 1 : 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }, [value, translateX, backgroundColor]);

    const handlePress = () => {
      if (isDisabled) return;

      const newValue = !value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const interpolatedColor = backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: [theme.colors['default-400'], theme.colors[color]],
    });

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
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor: interpolatedColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [
                  {
                    translateX: translateX.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, maxTranslateX],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
