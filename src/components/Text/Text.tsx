import React from 'react';
import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { type TextVariants, getTextStyles } from '../../variants/text';

export interface TextProps
  extends Partial<TextVariants>,
    Omit<RNTextProps, 'style'> {
  /** Text content */
  children: React.ReactNode;
  /** Text size */
  size?: TextVariants['size'];
  /** Font weight */
  weight?: TextVariants['weight'];
  /** Text color */
  color?: TextVariants['color'];
  /** Custom text style */
  style?: StyleProp<TextStyle>;
  /** Number of lines to show (truncates with ellipsis) */
  numberOfLines?: number;
  /** Whether text should be selectable */
  selectable?: boolean;
}

export const Text = React.forwardRef<RNText, TextProps>(
  (
    {
      children,
      size = 'md',
      weight = 'normal',
      color = 'foreground',
      style,
      numberOfLines,
      selectable,
      ...textProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const textStyles = getTextStyles(theme, size, weight, color);

    const styles = StyleSheet.create({
      text: {
        ...textStyles,
      },
    });

    return (
      <RNText
        ref={ref}
        style={[styles.text, style]}
        numberOfLines={numberOfLines}
        selectable={selectable}
        {...textProps}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';
