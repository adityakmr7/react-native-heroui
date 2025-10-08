import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
  Pressable,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { type InputVariants, getInputStyles } from '../../variants/input';

export interface InputProps
  extends Omit<TextInputProps, 'style'>,
    Partial<InputVariants> {
  /** Input label */
  label?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error text - when provided, input shows error state */
  errorText?: string;
  /** Left icon/component */
  startContent?: React.ReactNode;
  /** Right icon/component */
  endContent?: React.ReactNode;
  /** Container style override (alias for containerStyle) */
  style?: ViewStyle;
  /** Container style override */
  containerStyle?: ViewStyle;
  /** Input wrapper style override */
  wrapperStyle?: ViewStyle;
  /** Whether input is in error state */
  isInvalid?: boolean;
  /** Whether input is disabled */
  isDisabled?: boolean;
  /** Whether input is required */
  isRequired?: boolean;
  /** Whether input is read-only */
  isReadOnly?: boolean;
  /** Callback when clear button is pressed (shows clear button when provided) */
  onClear?: () => void;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      helperText,
      errorText,
      startContent,
      endContent,
      style,
      containerStyle,
      wrapperStyle,
      variant = 'outline',
      size = 'md',
      isInvalid = false,
      isDisabled = false,
      isRequired = false,
      isReadOnly = false,
      onClear,
      ...textInputProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState(false);

    const hasError = isInvalid || !!errorText;
    const inputStyles = getInputStyles(
      theme,
      variant,
      size,
      hasError,
      isFocused,
      isDisabled
    );

    const styles = StyleSheet.create({
      container: {
        width: '100%',
      },
      label: {
        fontSize: theme.typography.fontSizes.sm,
        fontWeight: theme.typography.fontWeights.medium,
        color: hasError
          ? theme.colors.danger
          : isDisabled
            ? theme.colors['default-400']
            : theme.colors.foreground,
        marginBottom: theme.spacing['unit-1'],
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        ...inputStyles,
      },
      input: {
        flex: 1,
        fontSize: inputStyles.fontSize,
        color: isDisabled
          ? theme.colors['default-400']
          : theme.colors.foreground,
        padding: 0,
      },
      startContent: {
        marginRight: theme.spacing['unit-2'],
      },
      endContent: {
        marginLeft: theme.spacing['unit-2'],
      },
      helperText: {
        fontSize: theme.typography.fontSizes['text-tiny'],
        color: hasError ? theme.colors.danger : theme.colors['default-500'],
        marginTop: theme.spacing['unit-1'],
      },
      clearButton: {
        marginLeft: theme.spacing['unit-2'],
        padding: theme.spacing['unit-1'],
      },
      clearButtonText: {
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors['default-400'],
      },
      requiredStar: {
        color: theme.colors.danger,
        marginLeft: 2,
      },
    });

    const handleFocus = (e: any) => {
      setIsFocused(true);
      textInputProps.onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      textInputProps.onBlur?.(e);
    };

    return (
      <View style={[styles.container, style, containerStyle]}>
        {label && (
          <Text style={styles.label}>
            {label}
            {isRequired && <Text style={styles.requiredStar}> *</Text>}
          </Text>
        )}
        <View style={[styles.inputWrapper, wrapperStyle]}>
          {startContent && (
            <View style={styles.startContent}>{startContent}</View>
          )}
          <TextInput
            ref={ref}
            style={styles.input}
            editable={!isDisabled && !isReadOnly}
            placeholderTextColor={theme.colors['default-400']}
            onFocus={handleFocus}
            onBlur={handleBlur}
            accessibilityLabel={label}
            accessibilityHint={helperText}
            accessibilityState={{
              disabled: isDisabled,
            }}
            {...textInputProps}
          />
          {onClear && textInputProps.value && (
            <Pressable
              style={styles.clearButton}
              onPress={onClear}
              accessibilityLabel="Clear input"
              accessibilityRole="button"
            >
              <Text style={styles.clearButtonText}>×</Text>
            </Pressable>
          )}
          {endContent && <View style={styles.endContent}>{endContent}</View>}
        </View>
        {(helperText || errorText) && (
          <Text style={styles.helperText}>{errorText || helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
