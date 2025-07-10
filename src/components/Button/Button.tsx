import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { type ButtonVariants, getButtonStyles } from '../../variants/button';

interface ButtonProps extends Partial<ButtonVariants> {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  variant = 'solid',
  size = 'md',
  colorScheme = 'primary',
}) => {
  const { theme } = useTheme();

  const buttonStyles = getButtonStyles(theme, variant, size, colorScheme);

  const styles = StyleSheet.create({
    button: {
      ...buttonStyles,
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      color: buttonStyles.color,
      fontSize: buttonStyles.fontSize,
      fontWeight: theme.typography.fontWeights.medium,
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};
