import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface BadgeProps {
  /** Badge content */
  content?: string | number;
  /** Badge color */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  /** Badge variant */
  variant?: 'solid' | 'flat' | 'bordered';
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether badge is visible */
  isInvisible?: boolean;
  /** Whether badge shows a dot instead of content */
  showDot?: boolean;
  /** Children to wrap badge around */
  children?: React.ReactNode;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Badge placement when wrapping children */
  placement?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      content,
      color = 'primary',
      variant = 'solid',
      size = 'md',
      isInvisible = false,
      showDot = false,
      children,
      style,
      placement = 'top-right',
    },
    ref
  ) => {
    const { theme } = useTheme();

    const sizeMap = {
      sm: {
        minWidth: 16,
        height: 16,
        fontSize: theme.typography.fontSizes.xs,
        padding: theme.spacing['unit-1'],
      },
      md: {
        minWidth: 20,
        height: 20,
        fontSize: theme.typography.fontSizes.xs,
        padding: theme.spacing['unit-1.5'],
      },
      lg: {
        minWidth: 24,
        height: 24,
        fontSize: theme.typography.fontSizes.sm,
        padding: theme.spacing['unit-2'],
      },
    };

    const dotSize = size === 'sm' ? 8 : size === 'md' ? 10 : 12;

    const getVariantStyles = () => {
      switch (variant) {
        case 'solid':
          return {
            backgroundColor: theme.colors[color],
            borderWidth: 0,
          };
        case 'flat':
          return {
            backgroundColor: `${theme.colors[color]}20`,
            borderWidth: 0,
          };
        case 'bordered':
          return {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: theme.colors[color],
          };
        default:
          return {};
      }
    };

    const getPlacementStyles = (): ViewStyle => {
      const offset = -4;
      switch (placement) {
        case 'top-right':
          return { top: offset, right: offset };
        case 'top-left':
          return { top: offset, left: offset };
        case 'bottom-right':
          return { bottom: offset, right: offset };
        case 'bottom-left':
          return { bottom: offset, left: offset };
      }
    };

    const styles = StyleSheet.create({
      container: {
        position: children ? 'relative' : undefined,
      },
      badge: {
        ...(showDot
          ? {
              width: dotSize,
              height: dotSize,
              minWidth: dotSize,
            }
          : sizeMap[size]),
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        ...getVariantStyles(),
        ...(children && {
          position: 'absolute',
          ...getPlacementStyles(),
        }),
      },
      text: {
        fontSize: sizeMap[size].fontSize,
        fontWeight: theme.typography.fontWeights.semibold,
        color:
          variant === 'solid' ? theme.colors.background : theme.colors[color],
      },
    });

    const badgeElement = !isInvisible && (
      <View style={[styles.badge, style]}>
        {!showDot && content !== undefined && (
          <Text style={styles.text}>{content}</Text>
        )}
      </View>
    );

    if (children) {
      return (
        <View ref={ref} style={styles.container}>
          {children}
          {badgeElement}
        </View>
      );
    }

    return badgeElement;
  }
);

Badge.displayName = 'Badge';
