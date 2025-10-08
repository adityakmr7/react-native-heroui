import React from 'react';
import {
  View,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends Omit<ViewProps, 'style'> {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    base?: StyleProp<ViewStyle>;
  };
}

export const Divider = React.forwardRef<View, DividerProps>(
  ({ orientation = 'horizontal', style, classNames, ...viewProps }, ref) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
      horizontal: {
        height: 1,
        width: '100%',
        backgroundColor: theme.colors.divider,
      },
      vertical: {
        width: 1,
        height: '100%',
        backgroundColor: theme.colors.divider,
      },
    });

    return (
      <View
        ref={ref}
        style={[
          orientation === 'horizontal' ? styles.horizontal : styles.vertical,
          classNames?.base,
          style,
        ]}
        accessibilityRole="none"
        {...viewProps}
      />
    );
  }
);

Divider.displayName = 'Divider';
