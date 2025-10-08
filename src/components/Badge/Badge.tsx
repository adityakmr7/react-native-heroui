import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type BadgeColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type BadgeVariant = 'solid' | 'flat' | 'faded' | 'shadow';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'circle' | 'rectangle';
export type BadgePlacement =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left';

export interface BadgeProps {
  /** Badge content */
  content?: string | number | React.ReactNode;
  /** Badge color */
  color?: BadgeColor;
  /** Badge variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
  /** Badge shape */
  shape?: BadgeShape;
  /** Whether badge is visible */
  isInvisible?: boolean;
  /** Whether badge shows a dot instead of content */
  isDot?: boolean;
  /** Show outline around badge */
  showOutline?: boolean;
  /** Disable outline (deprecated, use showOutline) */
  disableOutline?: boolean;
  /** Disable animation */
  disableAnimation?: boolean;
  /** Optimize for single character content */
  isOneChar?: boolean;
  /** Children to wrap badge around */
  children?: React.ReactNode;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names for slots */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    badge?: StyleProp<ViewStyle>;
  };
  /** Badge placement when wrapping children */
  placement?: BadgePlacement;
}

export const Badge = React.forwardRef<View, BadgeProps>(
  (
    {
      content,
      color = 'default',
      variant = 'solid',
      size = 'md',
      shape = 'rectangle',
      isInvisible = false,
      isDot = false,
      showOutline = true,
      disableOutline = false,
      disableAnimation: _disableAnimation = false, // Reserved for future animation features
      isOneChar = false,
      children,
      style,
      classNames,
      placement = 'top-right',
    },
    ref
  ) => {
    const { theme } = useTheme();

    // showOutline takes precedence over disableOutline
    const hasOutline = disableOutline ? false : showOutline;

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

    const getColorValue = (colorKey: BadgeColor) => {
      return colorKey === 'default'
        ? theme.colors['default-500']
        : theme.colors[colorKey];
    };

    const getVariantStyles = () => {
      const colorValue = getColorValue(color);

      switch (variant) {
        case 'solid':
          return {
            backgroundColor: colorValue,
            borderWidth: 0,
          };
        case 'flat':
          return {
            backgroundColor:
              color === 'default'
                ? theme.colors['default-100']
                : `${colorValue}20`,
            borderWidth: 0,
          };
        case 'faded':
          return {
            backgroundColor:
              color === 'default'
                ? theme.colors['default-100']
                : `${colorValue}15`,
            borderWidth: 1,
            borderColor:
              color === 'default'
                ? theme.colors['default-300']
                : `${colorValue}40`,
          };
        case 'shadow':
          return {
            backgroundColor: colorValue,
            borderWidth: 0,
            ...theme.shadows['shadow-md'],
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

    const getTextColor = () => {
      if (variant === 'solid' || variant === 'shadow') {
        return '#ffffff';
      }
      return getColorValue(color);
    };

    const styles = StyleSheet.create({
      container: {
        position: children ? 'relative' : undefined,
      },
      badge: {
        ...(isDot
          ? {
              width: dotSize,
              height: dotSize,
              minWidth: dotSize,
            }
          : isOneChar
            ? {
                width: sizeMap[size].height,
                height: sizeMap[size].height,
                minWidth: sizeMap[size].height,
                paddingHorizontal: 0,
              }
            : sizeMap[size]),
        borderRadius:
          shape === 'circle' ? 100 : theme.borderRadius['rounded-medium'],
        justifyContent: 'center',
        alignItems: 'center',
        ...getVariantStyles(),
        ...(hasOutline &&
          children && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
            elevation: 4,
            borderWidth: 2,
            borderColor: theme.colors.background,
          }),
        ...(children && {
          position: 'absolute',
          ...getPlacementStyles(),
        }),
      },
      text: {
        fontSize: sizeMap[size].fontSize,
        fontWeight: theme.typography.fontWeights.semibold,
        color: getTextColor(),
        textAlign: 'center',
      },
    });

    const badgeElement = !isInvisible && (
      <View
        style={[styles.badge, classNames?.badge, style]}
        accessibilityRole="text"
        accessibilityLabel={
          isDot
            ? 'Notification indicator'
            : content
              ? `${content} notifications`
              : undefined
        }
      >
        {!isDot && content !== undefined && (
          <Text style={styles.text}>
            {typeof content === 'string' || typeof content === 'number'
              ? content
              : content}
          </Text>
        )}
      </View>
    );

    if (children) {
      return (
        <View ref={ref} style={[styles.container, classNames?.base]}>
          {children}
          {badgeElement}
        </View>
      );
    }

    return badgeElement;
  }
);

Badge.displayName = 'Badge';
