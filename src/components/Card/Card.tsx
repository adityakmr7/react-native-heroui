import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface CardProps extends Omit<ViewProps, 'style'> {
  /** Card content */
  children: React.ReactNode;
  /** Card variant */
  variant?: 'elevated' | 'flat' | 'bordered';
  /** Whether card is pressable */
  isPressable?: boolean;
  /** Press handler (makes card pressable) */
  onPress?: () => void;
  /** Disable default padding */
  disablePadding?: boolean;
  /** Custom card style */
  style?: StyleProp<ViewStyle>;
}

export const Card = React.forwardRef<View, CardProps>(
  (
    {
      children,
      variant = 'elevated',
      isPressable = false,
      onPress,
      disablePadding = false,
      style,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const isActuallyPressable = isPressable || !!onPress;

    const styles = StyleSheet.create({
      card: {
        borderRadius: theme.borderRadius['rounded-large'],
        backgroundColor: theme.colors.content1,
        padding: disablePadding ? 0 : theme.spacing['unit-4'],
        ...(variant === 'elevated' && theme.shadows['shadow-md']),
        ...(variant === 'bordered' && {
          borderWidth: 1,
          borderColor: theme.colors.divider,
        }),
      },
    });

    const content = <View style={[styles.card, style]}>{children}</View>;

    if (isActuallyPressable && onPress) {
      return (
        <Pressable
          ref={ref as any}
          onPress={onPress}
          accessibilityRole="button"
          {...viewProps}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View ref={ref} {...viewProps} style={[styles.card, style]}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    header: {
      marginBottom: theme.spacing['unit-2'],
    },
  });

  return <View style={[styles.header, style]}>{children}</View>;
};

export interface CardBodyProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    body: {
      marginVertical: theme.spacing['unit-1'],
    },
  });

  return <View style={[styles.body, style]}>{children}</View>;
};

export interface CardFooterProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      marginTop: theme.spacing['unit-2'],
    },
  });

  return <View style={[styles.footer, style]}>{children}</View>;
};
