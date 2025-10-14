import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  type TextInputProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type TextareaVariant = 'flat' | 'bordered' | 'faded' | 'underlined';

export type TextareaColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<TextInputProps, 'style'> {
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Description text */
  description?: string;
  /** Error message */
  errorMessage?: string;
  /** Textarea variant */
  variant?: TextareaVariant;
  /** Textarea color */
  color?: TextareaColor;
  /** Textarea size */
  size?: TextareaSize;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Whether textarea is disabled */
  isDisabled?: boolean;
  /** Whether textarea is required */
  isRequired?: boolean;
  /** Whether textarea is invalid */
  isInvalid?: boolean;
  /** Disable resize */
  disableResize?: boolean;
  /** Custom style */
  style?: StyleProp<TextStyle>;
  /** Container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    inputWrapper?: StyleProp<ViewStyle>;
    input?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
    errorMessage?: StyleProp<TextStyle>;
  };
}

export const Textarea = React.forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      placeholder,
      description,
      errorMessage,
      variant = 'flat',
      // color = 'default', // Reserved for future use
      size = 'md',
      minRows = 3,
      maxRows,
      isDisabled = false,
      isRequired = false,
      isInvalid = false,
      // disableResize = false, // Reserved for future use
      style,
      containerStyle,
      classNames,
      ...textInputProps
    },
    ref
  ) => {
    const { theme } = useTheme();

    const sizeMap = {
      sm: {
        fontSize: theme.typography.fontSizes['text-small'],
        padding: theme.spacing['unit-2'],
        minHeight: 60,
      },
      md: {
        fontSize: theme.typography.fontSizes['text-medium'],
        padding: theme.spacing['unit-3'],
        minHeight: 80,
      },
      lg: {
        fontSize: theme.typography.fontSizes['text-medium'],
        padding: theme.spacing['unit-4'],
        minHeight: 100,
      },
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'bordered':
          return {
            borderWidth: 2,
            borderColor: isInvalid
              ? theme.colors.danger
              : theme.colors['default-300'],
            backgroundColor: 'transparent',
          };
        case 'faded':
          return {
            borderWidth: 2,
            borderColor: theme.colors['default-200'],
            backgroundColor: theme.colors['default-100'],
          };
        case 'underlined':
          return {
            borderBottomWidth: 2,
            borderBottomColor: isInvalid
              ? theme.colors.danger
              : theme.colors['default-300'],
            backgroundColor: 'transparent',
            borderRadius: 0,
          };
        case 'flat':
        default:
          return {
            backgroundColor: theme.colors['default-100'],
            borderWidth: 0,
          };
      }
    };

    const styles = StyleSheet.create({
      base: {
        width: '100%',
      },
      label: {
        fontSize: theme.typography.fontSizes['text-medium'],
        fontWeight: theme.typography.fontWeights.medium,
        color: isInvalid ? theme.colors.danger : theme.colors.foreground,
        marginBottom: theme.spacing['unit-2'],
      },
      required: {
        color: theme.colors.danger,
        marginLeft: 2,
      },
      inputWrapper: {
        borderRadius: theme.borderRadius.lg,
        ...getVariantStyles(),
      },
      input: {
        fontSize: sizeMap[size].fontSize,
        padding: sizeMap[size].padding,
        minHeight: sizeMap[size].minHeight,
        color: theme.colors.foreground,
        textAlignVertical: 'top',
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
      <View style={[styles.base, classNames?.base, containerStyle]}>
        {label && (
          <Text style={[styles.label, classNames?.label]}>
            {label}
            {isRequired && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        <View style={[styles.inputWrapper, classNames?.inputWrapper]}>
          <TextInput
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={theme.colors['default-400']}
            multiline
            numberOfLines={minRows}
            maxLength={maxRows ? maxRows * 80 : undefined}
            editable={!isDisabled}
            style={[
              styles.input,
              classNames?.input,
              style,
              isDisabled && { opacity: 0.5 },
            ]}
            {...textInputProps}
          />
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

Textarea.displayName = 'Textarea';
