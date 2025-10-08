import React from 'react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../theme/types';
import type {
  StyleProp,
  ViewStyle,
  TextStyle,
  ViewProps,
  TextProps,
} from 'react-native';
import { View, Text } from 'react-native';

export const createStyledView = <T extends object>(
  defaultStyles: (theme: Theme) => ViewStyle,
  variants?: (theme: Theme, props: T) => ViewStyle
) => {
  type StyledViewProps = T &
    Omit<ViewProps, keyof T | 'style' | 'children'> & {
      style?: StyleProp<ViewStyle>;
      children?: React.ReactNode;
    };

  return React.forwardRef<View, StyledViewProps>((props, ref) => {
    const { theme } = useTheme();
    const { style, children, ...restProps } = props as StyledViewProps;

    const baseStyles = defaultStyles(theme);
    const variantStyles = variants ? variants(theme, props as T) : {};

    return (
      <View
        ref={ref}
        {...(restProps as ViewProps)}
        style={[baseStyles, variantStyles, style]}
      >
        {children}
      </View>
    );
  });
};

export const createStyledText = <T extends object>(
  defaultStyles: (theme: Theme) => TextStyle,
  variants?: (theme: Theme, props: T) => TextStyle
) => {
  type StyledTextProps = T &
    Omit<TextProps, keyof T | 'style' | 'children'> & {
      style?: StyleProp<TextStyle>;
      children?: React.ReactNode;
    };

  return React.forwardRef<Text, StyledTextProps>((props, ref) => {
    const { theme } = useTheme();
    const { style, children, ...restProps } = props as StyledTextProps;

    const baseStyles = defaultStyles(theme);
    const variantStyles = variants ? variants(theme, props as T) : {};

    return (
      <Text
        ref={ref}
        {...(restProps as TextProps)}
        style={[baseStyles, variantStyles, style]}
      >
        {children}
      </Text>
    );
  });
};
