import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type InputOtpVariant = 'flat' | 'bordered' | 'faded' | 'underlined';
export type InputOtpColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type InputOtpSize = 'sm' | 'md' | 'lg';
export type InputOtpRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface InputOtpProps extends Omit<ViewProps, 'style'> {
  /** Number of OTP segments */
  length?: number;
  /** Regex pattern for allowed keys */
  allowedKeys?: string;
  /** Current value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Input variant */
  variant?: InputOtpVariant;
  /** Input color */
  color?: InputOtpColor;
  /** Input size */
  size?: InputOtpSize;
  /** Input radius */
  radius?: InputOtpRadius;
  /** Input type (text or password) */
  type?: 'text' | 'password';
  /** Description text */
  description?: string;
  /** Error message */
  errorMessage?: string;
  /** Whether input is disabled */
  isDisabled?: boolean;
  /** Whether input is read-only */
  isReadOnly?: boolean;
  /** Whether input is required */
  isRequired?: boolean;
  /** Whether input is invalid */
  isInvalid?: boolean;
  /** Auto focus first input */
  autoFocus?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    wrapper?: StyleProp<ViewStyle>;
    segmentWrapper?: StyleProp<ViewStyle>;
    segment?: StyleProp<ViewStyle>;
    description?: StyleProp<TextStyle>;
    errorMessage?: StyleProp<TextStyle>;
  };
  /** Value change handler */
  onChange?: (value: string) => void;
  /** Complete handler (when all segments filled) */
  onComplete?: (value: string) => void;
}

export const InputOtp = React.forwardRef<View, InputOtpProps>(
  (
    {
      length = 4,
      allowedKeys = '^[0-9]*$',
      value: controlledValue,
      defaultValue = '',
      variant = 'flat',
      color = 'default',
      size = 'md',
      radius = 'md',
      type = 'text',
      description,
      errorMessage,
      isDisabled = false,
      isReadOnly = false,
      isRequired = false,
      isInvalid = false,
      autoFocus = false,
      style,
      classNames,
      onChange,
      onComplete,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState(
      defaultValue.slice(0, length)
    );
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;
    const segments = currentValue.split('');

    const sizeMap = {
      sm: {
        width: 32,
        height: 40,
        fontSize: theme.typography.fontSizes['text-small'],
      },
      md: {
        width: 40,
        height: 48,
        fontSize: theme.typography.fontSizes['text-medium'],
      },
      lg: {
        width: 48,
        height: 56,
        fontSize: theme.typography.fontSizes['text-large'],
      },
    };

    const radiusMap = {
      none: 0,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: 999,
    };

    const getColorValue = () => {
      if (isInvalid) return theme.colors.danger;
      if (color === 'default') return theme.colors['default-500'];
      return theme.colors[color];
    };

    const colorValue = getColorValue();

    const getVariantStyles = (isFocused: boolean) => {
      const baseStyles = {
        width: sizeMap[size].width,
        height: sizeMap[size].height,
        borderRadius: radiusMap[radius],
      };

      switch (variant) {
        case 'bordered':
          return {
            ...baseStyles,
            borderWidth: 2,
            borderColor: isFocused
              ? colorValue
              : isInvalid
                ? theme.colors.danger
                : theme.colors['default-300'],
            backgroundColor: 'transparent',
          };
        case 'faded':
          return {
            ...baseStyles,
            borderWidth: 2,
            borderColor: isFocused ? colorValue : theme.colors['default-200'],
            backgroundColor: theme.colors['default-100'],
          };
        case 'underlined':
          return {
            ...baseStyles,
            borderBottomWidth: 2,
            borderBottomColor: isFocused
              ? colorValue
              : isInvalid
                ? theme.colors.danger
                : theme.colors['default-300'],
            backgroundColor: 'transparent',
            borderRadius: 0,
          };
        case 'flat':
        default:
          return {
            ...baseStyles,
            backgroundColor: isFocused
              ? theme.colors['default-200']
              : theme.colors['default-100'],
            borderWidth: 0,
          };
      }
    };

    const handleChangeText = (text: string, index: number) => {
      if (isDisabled || isReadOnly) return;

      // Validate against allowed keys
      const regex = new RegExp(allowedKeys);
      if (text && !regex.test(text)) {
        return;
      }

      const newSegments = [...segments];
      while (newSegments.length < length) {
        newSegments.push('');
      }

      // Handle paste (multiple characters)
      if (text.length > 1) {
        const pastedChars = text.slice(0, length - index).split('');
        pastedChars.forEach((char, i) => {
          if (regex.test(char)) {
            newSegments[index + i] = char;
          }
        });
        const newValue = newSegments.join('').slice(0, length);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // Focus last filled input or next empty
        const nextIndex = Math.min(index + pastedChars.length, length - 1);
        inputRefs.current[nextIndex]?.focus();

        // Check if complete
        if (newValue.length === length) {
          onComplete?.(newValue);
        }
        return;
      }

      // Handle single character
      if (text) {
        newSegments[index] = text;
        const newValue = newSegments.join('').slice(0, length);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // Move to next input
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus();
        }

        // Check if complete
        if (newValue.length === length) {
          onComplete?.(newValue);
        }
      } else {
        // Backspace pressed
        newSegments[index] = '';
        const newValue = newSegments.join('').slice(0, length);
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);

        // Move to previous input
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    };

    const handleKeyPress = (e: any, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !segments[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const styles = StyleSheet.create({
      base: {
        width: '100%',
      },
      segmentWrapper: {
        flexDirection: 'row',
        gap: sizeMap[size].width / 4,
        justifyContent: 'center',
      },
      segment: {
        textAlign: 'center',
        fontSize: sizeMap[size].fontSize,
        color: theme.colors.foreground,
      },
      description: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
        marginTop: theme.spacing['unit-1'],
      },
      errorMessage: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors.danger,
        marginTop: theme.spacing['unit-1'],
      },
    });

    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        {...viewProps}
      >
        <View style={[styles.segmentWrapper, classNames?.segmentWrapper]}>
          {Array.from({ length }).map((_, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              value={segments[index] || ''}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              maxLength={1}
              editable={!isDisabled && !isReadOnly}
              secureTextEntry={type === 'password'}
              autoFocus={autoFocus && index === 0}
              selectTextOnFocus
              keyboardType={allowedKeys === '^[0-9]*$' ? 'numeric' : 'default'}
              style={[
                getVariantStyles(false),
                styles.segment,
                classNames?.segment,
                isDisabled && { opacity: 0.5 },
              ]}
              accessibilityLabel={`OTP digit ${index + 1}`}
              accessibilityHint={`Enter digit ${index + 1} of ${length}`}
            />
          ))}
        </View>

        {description && !isInvalid && (
          <Text style={[styles.description, classNames?.description]}>
            {description}
          </Text>
        )}

        {isInvalid && errorMessage && (
          <Text style={[styles.errorMessage, classNames?.errorMessage]}>
            {errorMessage}
          </Text>
        )}
      </View>
    );
  }
);

InputOtp.displayName = 'InputOtp';
