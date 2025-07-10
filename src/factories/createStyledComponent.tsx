import React from 'react';
import { useTheme } from '../hooks/useTheme';
import type { Theme } from '../theme/types';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { View, Text } from 'react-native';

export const createStyledView = <T extends object>(
  defaultStyles: (theme: Theme) => ViewStyle,
  variants?: (theme: Theme, props: T) => ViewStyle
) => {
  type StyledViewProps = T & {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
  };

  return React.forwardRef<View, StyledViewProps>((props, ref) => {
    const { theme } = useTheme();

    const baseStyles = defaultStyles(theme);
    const variantStyles = variants ? variants(theme, props as T) : {};

    return (
      <View
        ref={ref}
        {...(props as any)}
        style={[baseStyles, variantStyles, props.style]}
      />
    );
  });
};

export const createStyledText = <T extends object>(
  defaultStyles: (theme: Theme) => TextStyle,
  variants?: (theme: Theme, props: T) => TextStyle
) => {
  type StyledTextProps = T & {
    style?: StyleProp<TextStyle>;
    children?: React.ReactNode;
  };

  return React.forwardRef<Text, StyledTextProps>((props, ref) => {
    const { theme } = useTheme();

    const baseStyles = defaultStyles(theme);
    const variantStyles = variants ? variants(theme, props as T) : {};

    return (
      <Text
        ref={ref}
        {...(props as any)}
        style={[baseStyles, variantStyles, props.style]}
      />
    );
  });
};
