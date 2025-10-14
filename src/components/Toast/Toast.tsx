import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  type ViewStyle,
  type StyleProp,
  type TextStyle,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type ToastColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type ToastVariant = 'solid' | 'bordered' | 'flat';
export type ToastRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastOptions {
  /** Toast title */
  title?: string | React.ReactNode;
  /** Toast description/message */
  description?: string | React.ReactNode;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Color scheme */
  color?: ToastColor;
  /** Visual variant */
  variant?: ToastVariant;
  /** Border radius */
  radius?: ToastRadius;
  /** End content (actions, buttons) */
  endContent?: React.ReactNode;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Auto-dismiss timeout in ms (0 = no auto-dismiss) */
  timeout?: number;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Hide close button */
  hideCloseButton?: boolean;
  /** Show timeout progress bar */
  shouldShowTimeoutProgress?: boolean;
  /** Placement on screen */
  placement?: ToastPlacement;
  /** Custom styles */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    description?: StyleProp<TextStyle>;
    icon?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    closeButton?: StyleProp<ViewStyle>;
    closeIcon?: StyleProp<TextStyle>;
    progressTrack?: StyleProp<ViewStyle>;
    progressIndicator?: StyleProp<ViewStyle>;
  };
  /** Close callback */
  onClose?: () => void;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextType {
  toasts: ToastItem[];
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  placement: ToastPlacement;
  maxVisibleToasts: number;
}

const ToastContext = createContext<ToastContextType | null>(null);

const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Toast components must be used within ToastProvider');
  }
  return context;
};

// Global toast manager for function-based API
let globalAddToast: ((options: ToastOptions) => string) | null = null;

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Maximum visible toasts */
  maxVisibleToasts?: number;
  /** Default placement for toasts */
  placement?: ToastPlacement;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Offset from screen edge */
  toastOffset?: number;
  /** Default props for all toasts */
  toastProps?: Partial<ToastOptions>;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  maxVisibleToasts = 3,
  placement = 'bottom-right',
  disableAnimation = false,
  toastOffset = 16,
  toastProps = {},
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const toast: ToastItem = { ...toastProps, ...options, id };
      setToasts((prev) => [...prev, toast]);
      return id;
    },
    [toastProps]
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Set global toast function
  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);

  const visibleToasts = toasts.slice(-maxVisibleToasts);

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, placement, maxVisibleToasts }}
    >
      {children}
      <ToastContainer
        toasts={visibleToasts}
        placement={placement}
        offset={toastOffset}
        disableAnimation={disableAnimation}
      />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: ToastItem[];
  placement: ToastPlacement;
  offset: number;
  disableAnimation: boolean;
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  placement,
  offset,
  disableAnimation,
}) => {
  const getContainerPosition = (): ViewStyle => {
    const isTop = placement.startsWith('top');
    const isBottom = placement.startsWith('bottom');
    const isLeft = placement.includes('left');
    const isRight = placement.includes('right');
    const isCenter = placement.includes('center');

    return {
      position: 'absolute',
      ...(isTop && { top: offset }),
      ...(isBottom && { bottom: offset }),
      ...(isLeft && { left: offset }),
      ...(isRight && { right: offset }),
      ...(isCenter && {
        left: 0,
        right: 0,
        alignItems: 'center',
      }),
      gap: 8,
      pointerEvents: 'box-none',
      zIndex: 9999,
    };
  };

  if (toasts.length === 0) return null;

  return (
    <View style={getContainerPosition()}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          disableAnimation={disableAnimation}
        />
      ))}
    </View>
  );
};

interface ToastItemProps {
  toast: ToastItem;
  disableAnimation: boolean;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, disableAnimation }) => {
  const { theme } = useTheme();
  const context = useToastContext();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const progress = useSharedValue(0);

  const {
    id,
    title,
    description,
    icon,
    color = 'default',
    variant = 'flat',
    radius = 'md',
    endContent,
    closeIcon,
    timeout = 6000,
    hideIcon = false,
    hideCloseButton = false,
    shouldShowTimeoutProgress = false,
    classNames,
    onClose,
  } = toast;

  useEffect(() => {
    // Enter animation
    if (disableAnimation) {
      opacity.value = 1;
      translateY.value = 0;
    } else {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, {
        damping: 10,
        stiffness: 100,
      });
    }

    // Auto-dismiss
    if (timeout > 0) {
      if (shouldShowTimeoutProgress) {
        progress.value = withTiming(1, { duration: timeout });
      }

      const timer = setTimeout(() => {
        handleClose();
      }, timeout);

      return () => clearTimeout(timer);
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opacity, translateY, progress, disableAnimation, timeout, shouldShowTimeoutProgress]);

  const handleCloseComplete = () => {
    context.removeToast(id);
    onClose?.();
  };

  const handleClose = () => {
    if (disableAnimation) {
      handleCloseComplete();
    } else {
      opacity.value = withTiming(0, { duration: 200 }, (finished) => {
        'worklet';
        if (finished) {
          runOnJS(handleCloseComplete)();
        }
      });
      translateY.value = withTiming(50, { duration: 200 });
    }
  };

  const getDefaultIcon = (): string => {
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

  const getColorStyles = () => {
    const colorMap = {
      default: {
        text: theme.colors.foreground,
        bg: theme.colors['default-100'],
        border: theme.colors['default-300'],
        icon: theme.colors['default-500'],
      },
      primary: {
        text: variant === 'solid' ? '#ffffff' : theme.colors['primary-700'],
        bg:
          variant === 'solid'
            ? theme.colors.primary
            : theme.colors['primary-50'],
        border: theme.colors['primary-300'],
        icon: variant === 'solid' ? '#ffffff' : theme.colors.primary,
      },
      secondary: {
        text: variant === 'solid' ? '#ffffff' : theme.colors['secondary-700'],
        bg:
          variant === 'solid'
            ? theme.colors.secondary
            : theme.colors['secondary-50'],
        border: theme.colors['secondary-300'],
        icon: variant === 'solid' ? '#ffffff' : theme.colors.secondary,
      },
      success: {
        text: variant === 'solid' ? '#ffffff' : theme.colors['success-700'],
        bg:
          variant === 'solid'
            ? theme.colors.success
            : theme.colors['success-50'],
        border: theme.colors['success-300'],
        icon: variant === 'solid' ? '#ffffff' : theme.colors.success,
      },
      warning: {
        text: variant === 'solid' ? '#ffffff' : theme.colors['warning-700'],
        bg:
          variant === 'solid'
            ? theme.colors.warning
            : theme.colors['warning-50'],
        border: theme.colors['warning-300'],
        icon: variant === 'solid' ? '#ffffff' : theme.colors.warning,
      },
      danger: {
        text: variant === 'solid' ? '#ffffff' : theme.colors['danger-700'],
        bg:
          variant === 'solid' ? theme.colors.danger : theme.colors['danger-50'],
        border: theme.colors['danger-300'],
        icon: variant === 'solid' ? '#ffffff' : theme.colors.danger,
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
  const screenWidth = Dimensions.get('window').width;
  const maxWidth = Math.min(screenWidth - 32, 400);

  const styles = StyleSheet.create({
    container: {
      minWidth: 280,
      maxWidth,
      padding: theme.spacing['unit-4'],
      borderRadius: getRadiusValue(),
      backgroundColor: variant === 'bordered' ? 'transparent' : colorStyles.bg,
      borderWidth: variant === 'bordered' ? 1 : 0,
      borderColor: colorStyles.border,
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: theme.spacing['unit-3'],
      ...theme.shadows['shadow-lg'],
      marginHorizontal: 16,
    },
    iconWrapper: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconText: {
      fontSize: 18,
      color: colorStyles.icon,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
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
    },
    closeButtonText: {
      fontSize: 20,
      color: colorStyles.text,
      fontWeight: 'bold',
    },
    progressTrack: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderBottomLeftRadius: getRadiusValue(),
      borderBottomRightRadius: getRadiusValue(),
      overflow: 'hidden',
    },
    progressIndicator: {
      height: '100%',
      backgroundColor: colorStyles.icon,
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      progress.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
    return {
      width: `${width}%`,
    };
  });

  const defaultIconComponent = icon || getDefaultIcon();

  return (
    <Animated.View
      style={[styles.container, classNames?.base, animatedStyle]}
      accessibilityRole="alert"
    >
      {!hideIcon && (
        <View style={[styles.iconWrapper, classNames?.icon]}>
          {typeof defaultIconComponent === 'string' ? (
            <Text style={styles.iconText}>{defaultIconComponent}</Text>
          ) : (
            defaultIconComponent
          )}
        </View>
      )}

      <View style={[styles.content, classNames?.content]}>
        {title && (
          <Text style={[styles.title, classNames?.title]}>{title}</Text>
        )}
        {description && (
          <Text style={[styles.description, classNames?.description]}>
            {description}
          </Text>
        )}
      </View>

      {endContent}

      {!hideCloseButton && (
        <Pressable
          onPress={handleClose}
          style={[styles.closeButton, classNames?.closeButton]}
          accessibilityRole="button"
          accessibilityLabel="Close"
        >
          {closeIcon || (
            <Text style={[styles.closeButtonText, classNames?.closeIcon]}>
              ×
            </Text>
          )}
        </Pressable>
      )}

      {shouldShowTimeoutProgress && timeout > 0 && (
        <View style={[styles.progressTrack, classNames?.progressTrack]}>
          <Animated.View
            style={[
              styles.progressIndicator,
              classNames?.progressIndicator,
              progressAnimatedStyle,
            ]}
          />
        </View>
      )}
    </Animated.View>
  );
};

// Global Toast API - can be called from anywhere
export const toast = {
  /** Show a default toast */
  show: (message: string | ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    const options: ToastOptions =
      typeof message === 'string' ? { description: message } : message;
    return globalAddToast(options);
  },

  /** Show a success toast */
  success: (message: string | ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    const options: ToastOptions =
      typeof message === 'string'
        ? { description: message, color: 'success' }
        : { ...message, color: 'success' };
    return globalAddToast(options);
  },

  /** Show an error toast */
  error: (message: string | ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    const options: ToastOptions =
      typeof message === 'string'
        ? { description: message, color: 'danger' }
        : { ...message, color: 'danger' };
    return globalAddToast(options);
  },

  /** Show a warning toast */
  warning: (message: string | ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    const options: ToastOptions =
      typeof message === 'string'
        ? { description: message, color: 'warning' }
        : { ...message, color: 'warning' };
    return globalAddToast(options);
  },

  /** Show an info toast */
  info: (message: string | ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    const options: ToastOptions =
      typeof message === 'string'
        ? { description: message, color: 'primary' }
        : { ...message, color: 'primary' };
    return globalAddToast(options);
  },

  /** Custom toast with options */
  custom: (options: ToastOptions) => {
    if (!globalAddToast) {
      console.warn(
        'ToastProvider not found. Wrap your app with ToastProvider.'
      );
      return '';
    }
    return globalAddToast(options);
  },
};

// Hook to use toast in components
export const useToast = () => {
  const context = useToastContext();
  return {
    addToast: context.addToast,
    toasts: context.toasts,
  };
};
