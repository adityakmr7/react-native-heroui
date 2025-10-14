import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  Pressable,
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
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type RadioColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioOrientation = 'horizontal' | 'vertical';

// RadioGroup Context
interface RadioGroupContextType {
  value: string;
  onChange: (value: string) => void;
  color: RadioColor;
  size: RadioSize;
  isDisabled: boolean;
  isReadOnly: boolean;
  isInvalid: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

const useRadioGroupContext = () => {
  return useContext(RadioGroupContext);
};

// RadioGroup Props
export interface RadioGroupProps extends Omit<ViewProps, 'style'> {
  /** Radio group label */
  label?: string | React.ReactNode;
  /** Radio group description */
  description?: string | React.ReactNode;
  /** Error message */
  errorMessage?: string | React.ReactNode;
  /** Children (Radio components) */
  children: React.ReactNode;
  /** Selected value (controlled) */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Radio group name */
  name?: string;
  /** Orientation */
  orientation?: RadioOrientation;
  /** Color for all radios */
  color?: RadioColor;
  /** Size for all radios */
  size?: RadioSize;
  /** Whether group is disabled */
  isDisabled?: boolean;
  /** Whether group is required */
  isRequired?: boolean;
  /** Whether group is read-only */
  isReadOnly?: boolean;
  /** Whether group is invalid */
  isInvalid?: boolean;
  /** Validation state */
  validationState?: 'valid' | 'invalid';
  /** Disable animations */
  disableAnimation?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
    errorMessage?: StyleProp<TextStyle>;
  };
  /** Value change handler */
  onValueChange?: (value: string) => void;
}

// RadioGroup Component
export const RadioGroup = React.forwardRef<View, RadioGroupProps>(
  (
    {
      label,
      description,
      errorMessage,
      children,
      value: controlledValue,
      defaultValue = '',
      name: _name, // Reserved for future use
      orientation = 'vertical',
      color = 'primary',
      size = 'md',
      isDisabled = false,
      isRequired = false,
      isReadOnly = false,
      isInvalid = false,
      validationState,
      // disableAnimation = false, // Reserved for future use
      style,
      classNames,
      onValueChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const isActuallyInvalid = isInvalid || validationState === 'invalid';

    const handleChange = (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onValueChange?.(value);
    };

    const styles = StyleSheet.create({
      base: {
        gap: theme.spacing['unit-2'],
      },
      label: {
        fontSize: theme.typography.fontSizes['text-medium'],
        fontWeight: theme.typography.fontWeights.medium,
        color: isActuallyInvalid
          ? theme.colors.danger
          : theme.colors.foreground,
        marginBottom: description
          ? theme.spacing['unit-1']
          : theme.spacing['unit-2'],
      },
      description: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
        marginBottom: theme.spacing['unit-2'],
      },
      wrapper: {
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        gap:
          orientation === 'horizontal'
            ? theme.spacing['unit-4']
            : theme.spacing['unit-3'],
        flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
      },
      errorMessage: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors.danger,
        marginTop: theme.spacing['unit-1'],
      },
      required: {
        color: theme.colors.danger,
        marginLeft: 2,
      },
    });

    return (
      <RadioGroupContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          color,
          size,
          isDisabled,
          isReadOnly,
          isInvalid: isActuallyInvalid,
        }}
      >
        <View
          ref={ref}
          style={[styles.base, classNames?.base, style]}
          accessibilityRole="radiogroup"
          {...viewProps}
        >
          {label && (
            <Text style={[styles.label, classNames?.label]}>
              {label}
              {isRequired && <Text style={styles.required}> *</Text>}
            </Text>
          )}
          {description && (
            <Text style={[styles.description, classNames?.description]}>
              {description}
            </Text>
          )}
          <View style={[styles.wrapper, classNames?.wrapper]}>{children}</View>
          {isActuallyInvalid && errorMessage && (
            <Text style={[styles.errorMessage, classNames?.errorMessage]}>
              {errorMessage}
            </Text>
          )}
        </View>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// Radio Props
export interface RadioProps extends Omit<ViewProps, 'style'> {
  /** Radio value */
  value: string;
  /** Radio label */
  children?: React.ReactNode;
  /** Radio description */
  description?: string | React.ReactNode;
  /** Whether radio is disabled */
  isDisabled?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
    labelWrapper?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    control?: StyleProp<ViewStyle>;
    description?: StyleProp<TextStyle>;
  };
}

// Radio Component
export const Radio = React.forwardRef<View, RadioProps>(
  (
    {
      value,
      children,
      description,
      isDisabled: radioDisabled = false,
      style,
      classNames,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const context = useRadioGroupContext();
    const scale = useSharedValue(1);

    if (!context) {
      throw new Error('Radio must be used within RadioGroup');
    }

    const isSelected = context.value === value;
    const isDisabled = context.isDisabled || radioDisabled;
    const isReadOnly = context.isReadOnly;

    const sizeMap = {
      sm: {
        control: 16,
        dot: 6,
        label: theme.typography.fontSizes['text-small'],
        gap: theme.spacing['unit-2'],
      },
      md: {
        control: 20,
        dot: 8,
        label: theme.typography.fontSizes['text-medium'],
        gap: theme.spacing['unit-2'],
      },
      lg: {
        control: 24,
        dot: 10,
        label: theme.typography.fontSizes['text-medium'],
        gap: theme.spacing['unit-3'],
      },
    };

    const handlePress = () => {
      if (isDisabled || isReadOnly) return;

      scale.value = withSequence(
        withTiming(0.85, { duration: 100 }),
        withSpring(1, { damping: 3, stiffness: 100 })
      );

      context.onChange(value);
    };

    const getColorValue = () => {
      if (context.isInvalid) return theme.colors.danger;
      return context.color === 'default'
        ? theme.colors['default-500']
        : theme.colors[context.color];
    };

    const colorValue = getColorValue();

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const styles = StyleSheet.create({
      base: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: sizeMap[context.size].gap,
        opacity: isDisabled ? 0.5 : 1,
      },
      wrapper: {
        width: sizeMap[context.size].control,
        height: sizeMap[context.size].control,
        borderRadius: sizeMap[context.size].control / 2,
        borderWidth: 2,
        borderColor: isSelected ? colorValue : theme.colors['default-300'],
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      control: {
        width: sizeMap[context.size].dot,
        height: sizeMap[context.size].dot,
        borderRadius: sizeMap[context.size].dot / 2,
        backgroundColor: colorValue,
        transform: [{ scale: isSelected ? 1 : 0 }],
      },
      labelWrapper: {
        flex: 1,
        gap: theme.spacing['unit-1'],
      },
      label: {
        fontSize: sizeMap[context.size].label,
        color: context.isInvalid
          ? theme.colors.danger
          : theme.colors.foreground,
      },
      description: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
      },
    });

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={isDisabled || isReadOnly}
        style={[styles.base, classNames?.base, style]}
        accessibilityRole="radio"
        accessibilityState={{
          checked: isSelected,
          disabled: isDisabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
        {...viewProps}
      >
        <Animated.View
          style={[styles.wrapper, classNames?.wrapper, animatedStyle]}
        >
          <Animated.View style={[styles.control, classNames?.control]} />
        </Animated.View>

        {(children || description) && (
          <View style={[styles.labelWrapper, classNames?.labelWrapper]}>
            {children && (
              <Text style={[styles.label, classNames?.label]}>{children}</Text>
            )}
            {description && (
              <Text style={[styles.description, classNames?.description]}>
                {description}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    );
  }
);

Radio.displayName = 'Radio';
