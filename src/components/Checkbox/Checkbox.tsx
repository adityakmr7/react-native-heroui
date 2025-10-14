import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type CheckboxColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface CheckboxIconProps {
  isSelected?: boolean;
  isIndeterminate?: boolean;
  disableAnimation?: boolean;
}

export interface CheckboxProps extends Omit<ViewProps, 'style'> {
  /** Checkbox label */
  children?: React.ReactNode;
  /** Custom check icon */
  icon?: React.ReactNode | ((props: CheckboxIconProps) => React.ReactNode);
  /** Value for checkbox (for checkbox groups) */
  value?: string;
  /** Name attribute */
  name?: string;
  /** Checkbox size */
  size?: CheckboxSize;
  /** Color scheme */
  color?: CheckboxColor;
  /** Border radius */
  radius?: CheckboxRadius;
  /** Strike through label when checked */
  lineThrough?: boolean;
  /** Controlled selected state */
  isSelected?: boolean;
  /** Default selected state (uncontrolled) */
  defaultSelected?: boolean;
  /** Whether checkbox is required */
  isRequired?: boolean;
  /** Whether checkbox is read-only */
  isReadOnly?: boolean;
  /** Whether checkbox is disabled */
  isDisabled?: boolean;
  /** Indeterminate state (partial check) */
  isIndeterminate?: boolean;
  /** Whether checkbox is invalid */
  isInvalid?: boolean;
  /** Validation state */
  validationState?: 'valid' | 'invalid';
  /** Disable animations */
  disableAnimation?: boolean;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Custom class names for slots */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
    icon?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
  };
  /** Change handler */
  onChange?: (isSelected: boolean) => void;
  /** Value change handler */
  onValueChange?: (isSelected: boolean) => void;
}

const CheckIcon: React.FC<{ style?: StyleProp<TextStyle> }> = ({ style }) => (
  <Text style={style}>✓</Text>
);

const IndeterminateIcon: React.FC<{ style?: StyleProp<TextStyle> }> = ({
  style,
}) => <Text style={style}>−</Text>;

export const Checkbox = React.forwardRef<View, CheckboxProps>(
  (
    {
      children,
      icon,
      value: _value, // Reserved for future use
      name: _name, // Reserved for future use
      size = 'md',
      color = 'primary',
      radius = 'md',
      lineThrough = false,
      isSelected: controlledSelected,
      defaultSelected = false,
      isRequired = false,
      isReadOnly = false,
      isDisabled = false,
      isIndeterminate = false,
      isInvalid = false,
      validationState,
      disableAnimation = false,
      style,
      classNames,
      onChange,
      onValueChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalSelected, setInternalSelected] = useState(defaultSelected);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const isControlled = controlledSelected !== undefined;
    const isSelected = isControlled ? controlledSelected : internalSelected;
    const isActuallyInvalid = isInvalid || validationState === 'invalid';

    const sizeMap = {
      sm: {
        wrapper: 16,
        icon: 10,
        label: theme.typography.fontSizes['text-small'],
        gap: theme.spacing['unit-2'],
      },
      md: {
        wrapper: 20,
        icon: 12,
        label: theme.typography.fontSizes['text-medium'],
        gap: theme.spacing['unit-2'],
      },
      lg: {
        wrapper: 24,
        icon: 14,
        label: theme.typography.fontSizes['text-medium'],
        gap: theme.spacing['unit-3'],
      },
    };

    const getRadiusValue = () => {
      const radiusMap = {
        none: 0,
        sm: theme.borderRadius['rounded-small'],
        md: theme.borderRadius['rounded-medium'],
        lg: theme.borderRadius['rounded-large'],
        full: 9999,
      };
      return radiusMap[radius];
    };

    const getColorValue = () => {
      if (isActuallyInvalid) return theme.colors.danger;
      return color === 'default'
        ? theme.colors['default-500']
        : theme.colors[color];
    };

    const handlePress = () => {
      if (isDisabled || isReadOnly) return;

      if (!disableAnimation) {
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.85,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
        ]).start();
      }

      const newValue = !isSelected;
      if (!isControlled) {
        setInternalSelected(newValue);
      }
      onChange?.(newValue);
      onValueChange?.(newValue);
    };

    const colorValue = getColorValue();

    const styles = StyleSheet.create({
      base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: sizeMap[size].gap,
        opacity: isDisabled ? 0.5 : 1,
      },
      wrapper: {
        width: sizeMap[size].wrapper,
        height: sizeMap[size].wrapper,
        borderRadius: getRadiusValue(),
        borderWidth: 2,
        borderColor:
          isSelected || isIndeterminate
            ? colorValue
            : isActuallyInvalid
              ? theme.colors.danger
              : theme.colors['default-300'],
        backgroundColor:
          isSelected || isIndeterminate ? colorValue : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        fontSize: sizeMap[size].icon,
        color: '#ffffff',
        fontWeight: 'bold',
      },
      label: {
        fontSize: sizeMap[size].label,
        color: isActuallyInvalid
          ? theme.colors.danger
          : theme.colors.foreground,
        ...(lineThrough &&
          isSelected && {
            textDecorationLine: 'line-through',
            color: theme.colors['default-400'],
          }),
      },
      required: {
        color: theme.colors.danger,
        marginLeft: 2,
      },
    });

    const renderIcon = () => {
      if (icon) {
        if (typeof icon === 'function') {
          return icon({ isSelected, isIndeterminate, disableAnimation });
        }
        return icon;
      }

      if (isIndeterminate) {
        return <IndeterminateIcon style={styles.icon} />;
      }

      if (isSelected) {
        return <CheckIcon style={styles.icon} />;
      }

      return null;
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={isDisabled || isReadOnly}
        style={[styles.base, classNames?.base, style]}
        accessibilityRole="checkbox"
        accessibilityState={{
          checked: isIndeterminate ? 'mixed' : isSelected,
          disabled: isDisabled,
        }}
        accessibilityLabel={typeof children === 'string' ? children : undefined}
        {...viewProps}
      >
        <Animated.View
          style={[
            styles.wrapper,
            classNames?.wrapper,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <View style={[styles.iconContainer, classNames?.icon]}>
            {renderIcon()}
          </View>
        </Animated.View>

        {children && (
          <Text style={[styles.label, classNames?.label]}>
            {children}
            {isRequired && <Text style={styles.required}> *</Text>}
          </Text>
        )}
      </Pressable>
    );
  }
);

Checkbox.displayName = 'Checkbox';
