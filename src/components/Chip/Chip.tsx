import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface ChipProps {
  /** Chip content */
  children: React.ReactNode;
  /** Chip color */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  /** Chip variant */
  variant?: 'solid' | 'flat' | 'bordered' | 'dot';
  /** Chip size */
  size?: 'sm' | 'md' | 'lg';
  /** Start icon/element */
  startContent?: React.ReactNode;
  /** End icon/element */
  endContent?: React.ReactNode;
  /** Whether chip is closeable */
  onClose?: () => void;
  /** Press handler */
  onPress?: () => void;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
}

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      children,
      color = 'default',
      variant = 'solid',
      size = 'md',
      startContent,
      endContent,
      onClose,
      onPress,
      style,
    },
    ref
  ) => {
    const { theme } = useTheme();

    const sizeMap = {
      sm: {
        paddingHorizontal: theme.spacing['unit-2'],
        paddingVertical: theme.spacing['unit-1'],
        fontSize: theme.typography.fontSizes.xs,
        gap: theme.spacing['unit-1'],
        dotSize: 6,
      },
      md: {
        paddingHorizontal: theme.spacing['unit-3'],
        paddingVertical: theme.spacing['unit-1.5'],
        fontSize: theme.typography.fontSizes.sm,
        gap: theme.spacing['unit-1.5'],
        dotSize: 8,
      },
      lg: {
        paddingHorizontal: theme.spacing['unit-4'],
        paddingVertical: theme.spacing['unit-2'],
        fontSize: theme.typography.fontSizes.md,
        gap: theme.spacing['unit-2'],
        dotSize: 10,
      },
    };

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
        case 'dot':
          return {
            backgroundColor: theme.colors.content2,
            borderWidth: 0,
          };
        default:
          return {};
      }
    };

    const styles = StyleSheet.create({
      chip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: theme.borderRadius.full,
        ...sizeMap[size],
        ...getVariantStyles(),
      },
      text: {
        fontSize: sizeMap[size].fontSize,
        fontWeight: theme.typography.fontWeights.medium,
        color:
          variant === 'solid' ? theme.colors.background : theme.colors[color],
      },
      closeButton: {
        padding: 2,
        marginLeft: theme.spacing['unit-1'],
      },
      closeText: {
        fontSize: sizeMap[size].fontSize,
        fontWeight: theme.typography.fontWeights.bold,
        color:
          variant === 'solid' ? theme.colors.background : theme.colors[color],
      },
      dot: {
        width: sizeMap[size].dotSize,
        height: sizeMap[size].dotSize,
        borderRadius: sizeMap[size].dotSize / 2,
        backgroundColor: theme.colors[color],
      },
    });

    const chipContent = (
      <>
        {variant === 'dot' && <View style={styles.dot} />}
        {startContent}
        <Text style={styles.text}>{children}</Text>
        {endContent}
        {onClose && (
          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close"
          >
            <Text style={styles.closeText}>×</Text>
          </Pressable>
        )}
      </>
    );

    if (onPress) {
      return (
        <Pressable
          ref={ref as any}
          style={[styles.chip, style]}
          onPress={onPress}
          accessibilityRole="button"
        >
          {chipContent}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[styles.chip, style]}>
        {chipContent}
      </View>
    );
  }
);

Chip.displayName = 'Chip';
