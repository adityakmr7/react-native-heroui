import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type SelectVariant = 'flat' | 'bordered' | 'faded' | 'underlined';
export type SelectColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectItem {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<ViewProps, 'style'> {
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Description text */
  description?: string;
  /** Error message */
  errorMessage?: string;
  /** Select items */
  items: SelectItem[];
  /** Selected value (controlled) */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Select variant */
  variant?: SelectVariant;
  /** Select color */
  color?: SelectColor;
  /** Select size */
  size?: SelectSize;
  /** Whether select is disabled */
  isDisabled?: boolean;
  /** Whether select is required */
  isRequired?: boolean;
  /** Whether select is invalid */
  isInvalid?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
    trigger?: StyleProp<ViewStyle>;
    value?: StyleProp<TextStyle>;
    listbox?: StyleProp<ViewStyle>;
    item?: StyleProp<ViewStyle>;
    description?: StyleProp<TextStyle>;
    errorMessage?: StyleProp<TextStyle>;
  };
  /** Value change handler */
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<View, SelectProps>(
  (
    {
      label,
      placeholder = 'Select an option',
      description,
      errorMessage,
      items,
      value: controlledValue,
      defaultValue,
      variant = 'flat',
      color = 'default',
      size = 'md',
      isDisabled = false,
      isRequired = false,
      isInvalid = false,
      style,
      classNames,
      onChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const selectedItem = items.find((item) => item.value === currentValue);

    const sizeMap = {
      sm: {
        height: 32,
        fontSize: theme.typography.fontSizes['text-small'],
        padding: theme.spacing['unit-2'],
      },
      md: {
        height: 40,
        fontSize: theme.typography.fontSizes['text-medium'],
        padding: theme.spacing['unit-3'],
      },
      lg: {
        height: 48,
        fontSize: theme.typography.fontSizes['text-medium'],
        padding: theme.spacing['unit-4'],
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

    const handleSelect = (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onChange?.(value);
      setIsOpen(false);
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
      trigger: {
        height: sizeMap[size].height,
        paddingHorizontal: sizeMap[size].padding,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...getVariantStyles(),
      },
      valueText: {
        fontSize: sizeMap[size].fontSize,
        color: selectedItem
          ? theme.colors.foreground
          : theme.colors['default-400'],
      },
      arrow: {
        fontSize: 16,
        color: theme.colors['default-500'],
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      listbox: {
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.lg,
        maxHeight: 300,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      item: {
        padding: theme.spacing['unit-3'],
        borderBottomWidth: 1,
        borderBottomColor: theme.colors['default-200'],
      },
      itemSelected: {
        backgroundColor: theme.colors['default-100'],
      },
      itemText: {
        fontSize: theme.typography.fontSizes['text-medium'],
        color: theme.colors.foreground,
      },
      itemDescription: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
        marginTop: 2,
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
        {label && (
          <Text style={[styles.label, classNames?.label]}>
            {label}
            {isRequired && <Text style={styles.required}> *</Text>}
          </Text>
        )}
        <TouchableOpacity
          style={[
            styles.trigger,
            classNames?.trigger,
            isDisabled && { opacity: 0.5 },
          ]}
          onPress={() => !isDisabled && setIsOpen(true)}
          disabled={isDisabled}
        >
          <Text style={[styles.valueText, classNames?.value]}>
            {selectedItem?.label || placeholder}
          </Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

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

        <Modal visible={isOpen} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View style={[styles.listbox, classNames?.listbox]}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      classNames?.item,
                      item.value === currentValue && styles.itemSelected,
                    ]}
                    onPress={() => !item.disabled && handleSelect(item.value)}
                    disabled={item.disabled}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        item.disabled && { opacity: 0.5 },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {item.description && (
                      <Text style={styles.itemDescription}>
                        {item.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
);

Select.displayName = 'Select';
