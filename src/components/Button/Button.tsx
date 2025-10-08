import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Animated,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { type ButtonVariants, getButtonStyles } from '../../variants/button';

export interface ButtonProps
  extends Partial<ButtonVariants>,
    Omit<PressableProps, 'style' | 'children'> {
  /** Button content */
  children: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Whether button is disabled */
  isDisabled?: boolean;
  /** Whether button shows loading state */
  isLoading?: boolean;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Left icon/component */
  startContent?: React.ReactNode;
  /** Right icon/component */
  endContent?: React.ReactNode;
  /** Custom button style */
  style?: StyleProp<ViewStyle>;
  /** Accessibility label */
  accessibilityLabel?: string;
}

export const Button = React.forwardRef<any, ButtonProps>(
  (
    {
      children,
      onPress,
      isDisabled = false,
      isLoading = false,
      fullWidth = false,
      variant = 'solid',
      size = 'md',
      colorScheme = 'primary',
      startContent,
      endContent,
      style,
      accessibilityLabel,
      ...pressableProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const buttonStyles = getButtonStyles(theme, variant, size, colorScheme);

    const styles = StyleSheet.create({
      button: {
        ...buttonStyles,
        opacity: isDisabled || isLoading ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing['unit-2'],
      },
      text: {
        color: buttonStyles.color,
        fontSize: buttonStyles.fontSize,
        fontWeight: theme.typography.fontWeights.medium,
      },
      spinner: {
        marginRight: theme.spacing['unit-2'],
      },
    });

    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          ref={ref}
          style={[styles.button, style]}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled || isLoading}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel || String(children)}
          accessibilityState={{
            disabled: isDisabled || isLoading,
            busy: isLoading,
          }}
          {...pressableProps}
        >
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={buttonStyles.color}
              style={styles.spinner}
            />
          )}
          {!isLoading && startContent}
          <Text style={styles.text}>{children}</Text>
          {!isLoading && endContent}
        </Pressable>
      </Animated.View>
    );
  }
);

Button.displayName = 'Button';
