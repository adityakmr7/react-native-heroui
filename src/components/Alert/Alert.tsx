import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type AlertColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type AlertVariant = 'solid' | 'bordered' | 'flat' | 'faded';

export type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface AlertProps extends Omit<ViewProps, 'style'> {
  /** Alert title */
  title?: string | React.ReactNode;
  /** Alert description/message */
  description?: string | React.ReactNode;
  /** Custom icon (overrides default) */
  icon?: React.ReactNode;
  /** Color scheme */
  color?: AlertColor;
  /** Visual variant */
  variant?: AlertVariant;
  /** Border radius */
  radius?: AlertRadius;
  /** Content at the start */
  startContent?: React.ReactNode;
  /** Content at the end (actions, buttons) */
  endContent?: React.ReactNode;
  /** Controlled visibility */
  isVisible?: boolean;
  /** Whether alert can be closed */
  isClosable?: boolean;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Hide the icon wrapper background */
  hideIconWrapper?: boolean;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for different parts */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
    mainWrapper?: StyleProp<ViewStyle>;
    iconWrapper?: StyleProp<ViewStyle>;
    alertIcon?: StyleProp<TextStyle>;
    closeButton?: StyleProp<ViewStyle>;
  };
  /** Close button props */
  closeButtonProps?: {
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
  };
  /** Close callback */
  onClose?: () => void;
  /** Visibility change callback */
  onVisibleChange?: (isVisible: boolean) => void;
}

const getDefaultIcon = (color: AlertColor): string => {
  switch (color) {
    case 'success':
      return '✓';
    case 'warning':
      return '⚠';
    case 'danger':
      return '✕';
    case 'primary':
      return 'ℹ';
    case 'secondary':
      return '●';
    default:
      return 'ℹ';
  }
};

export const Alert = React.forwardRef<View, AlertProps>(
  (
    {
      title,
      description,
      icon,
      color = 'default',
      variant = 'flat',
      radius = 'md',
      startContent,
      endContent,
      isVisible: controlledVisible,
      isClosable = false,
      hideIcon = false,
      hideIconWrapper = false,
      style,
      classNames,
      closeButtonProps,
      onClose,
      onVisibleChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalVisible, setInternalVisible] = useState(true);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(-20);

    const isControlled = controlledVisible !== undefined;
    const isVisible = isControlled ? controlledVisible : internalVisible;

    // Entrance animation
    React.useEffect(() => {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    }, [opacity, translateY]);

    const handleCloseComplete = () => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
      onClose?.();
    };

    const handleClose = () => {
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        'worklet';
        if (finished) {
          runOnJS(handleCloseComplete)();
        }
      });
      translateY.value = withTiming(-10, { duration: 200 });
    };

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }));

    if (!isVisible) {
      return null;
    }

    const getColorStyles = () => {
      const colorMap = {
        default: {
          text: theme.colors.foreground,
          bg: theme.colors['default-100'],
          border: theme.colors['default-300'],
          icon: theme.colors['default-500'],
          iconBg: theme.colors['default-200'],
        },
        primary: {
          text: variant === 'solid' ? '#ffffff' : theme.colors['primary-700'],
          bg:
            variant === 'solid'
              ? theme.colors.primary
              : theme.colors['primary-50'],
          border: theme.colors['primary-300'],
          icon: variant === 'solid' ? '#ffffff' : theme.colors.primary,
          iconBg:
            variant === 'solid'
              ? 'rgba(255,255,255,0.2)'
              : theme.colors['primary-100'],
        },
        secondary: {
          text: variant === 'solid' ? '#ffffff' : theme.colors['secondary-700'],
          bg:
            variant === 'solid'
              ? theme.colors.secondary
              : theme.colors['secondary-50'],
          border: theme.colors['secondary-300'],
          icon: variant === 'solid' ? '#ffffff' : theme.colors.secondary,
          iconBg:
            variant === 'solid'
              ? 'rgba(255,255,255,0.2)'
              : theme.colors['secondary-100'],
        },
        success: {
          text: variant === 'solid' ? '#ffffff' : theme.colors['success-700'],
          bg:
            variant === 'solid'
              ? theme.colors.success
              : theme.colors['success-50'],
          border: theme.colors['success-300'],
          icon: variant === 'solid' ? '#ffffff' : theme.colors.success,
          iconBg:
            variant === 'solid'
              ? 'rgba(255,255,255,0.2)'
              : theme.colors['success-100'],
        },
        warning: {
          text: variant === 'solid' ? '#ffffff' : theme.colors['warning-700'],
          bg:
            variant === 'solid'
              ? theme.colors.warning
              : theme.colors['warning-50'],
          border: theme.colors['warning-300'],
          icon: variant === 'solid' ? '#ffffff' : theme.colors.warning,
          iconBg:
            variant === 'solid'
              ? 'rgba(255,255,255,0.2)'
              : theme.colors['warning-100'],
        },
        danger: {
          text: variant === 'solid' ? '#ffffff' : theme.colors['danger-700'],
          bg:
            variant === 'solid'
              ? theme.colors.danger
              : theme.colors['danger-50'],
          border: theme.colors['danger-300'],
          icon: variant === 'solid' ? '#ffffff' : theme.colors.danger,
          iconBg:
            variant === 'solid'
              ? 'rgba(255,255,255,0.2)'
              : theme.colors['danger-100'],
        },
      };

      return colorMap[color];
    };

    const getRadiusValue = () => {
      const radiusMap = {
        none: 0,
        sm: theme.borderRadius['rounded-small'],
        md: theme.borderRadius['rounded-medium'],
        lg: theme.borderRadius['rounded-large'],
        full: 9999,
      };
      return radiusMap[radius];
    };

    const colorStyles = getColorStyles();
    const radiusValue = getRadiusValue();

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: theme.spacing['unit-4'],
        borderRadius: radiusValue,
        backgroundColor:
          variant === 'bordered' || variant === 'faded'
            ? 'transparent'
            : colorStyles.bg,
        borderWidth: variant === 'bordered' ? 1 : 0,
        borderColor: colorStyles.border,
        opacity: variant === 'faded' ? 0.5 : 1,
        gap: theme.spacing['unit-3'],
      },
      iconWrapper: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: hideIconWrapper ? 'transparent' : colorStyles.iconBg,
        alignItems: 'center',
        justifyContent: 'center',
      },
      alertIcon: {
        fontSize: 18,
        color: colorStyles.icon,
        fontWeight: 'bold',
      },
      mainWrapper: {
        flex: 1,
        justifyContent: 'center',
      },
      title: {
        fontSize: theme.typography.fontSizes['text-medium'],
        fontWeight: theme.typography.fontWeights.semibold,
        color: colorStyles.text,
        marginBottom: description ? theme.spacing['unit-1'] : 0,
      },
      description: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: colorStyles.text,
        opacity: 0.8,
        lineHeight: 20,
      },
      closeButton: {
        padding: theme.spacing['unit-1'],
        borderRadius: theme.borderRadius['rounded-small'],
        marginLeft: theme.spacing['unit-2'],
      },
      closeButtonText: {
        fontSize: 20,
        color: colorStyles.text,
        fontWeight: 'bold',
      },
      endContentWrapper: {
        marginLeft: theme.spacing['unit-2'],
      },
    });

    const defaultIcon = icon || getDefaultIcon(color);

    return (
      <Animated.View
        ref={ref}
        style={[styles.container, classNames?.base, style, animatedStyle]}
        accessibilityRole="alert"
        {...viewProps}
      >
        {startContent}

        {!hideIcon && (
          <View style={[styles.iconWrapper, classNames?.iconWrapper]}>
            {typeof defaultIcon === 'string' ? (
              <Text style={[styles.alertIcon, classNames?.alertIcon]}>
                {defaultIcon}
              </Text>
            ) : (
              defaultIcon
            )}
          </View>
        )}

        <View style={[styles.mainWrapper, classNames?.mainWrapper]}>
          {title && (
            <Text style={[styles.title, classNames?.title]}>{title}</Text>
          )}
          {description && (
            <Text style={[styles.description, classNames?.description]}>
              {description}
            </Text>
          )}
        </View>

        {endContent && (
          <View style={styles.endContentWrapper}>{endContent}</View>
        )}

        {isClosable && (
          <Pressable
            onPress={handleClose}
            style={[
              styles.closeButton,
              classNames?.closeButton,
              closeButtonProps?.style,
            ]}
            accessibilityRole="button"
            accessibilityLabel={closeButtonProps?.accessibilityLabel || 'Close'}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </Pressable>
        )}
      </Animated.View>
    );
  }
);

Alert.displayName = 'Alert';
