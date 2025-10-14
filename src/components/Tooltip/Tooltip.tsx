import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  type LayoutChangeEvent,
  Platform,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  // @ts-ignore - peer dependency
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export type TooltipColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type TooltipSize = 'sm' | 'md' | 'lg';

export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end'
  | 'right-start'
  | 'right-end';

export type TooltipActionType = 'press' | 'longPress';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  color?: TooltipColor;
  size?: TooltipSize;
  placement?: TooltipPlacement;
  showArrow?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  delay?: number;
  closeDelay?: number;
  offset?: number;
  isDisabled?: boolean;
  disableAnimation?: boolean;
  actionType?: TooltipActionType;
  withOverlay?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onClose?: () => void;
  classNames?: {
    base?: StyleProp<ViewStyle>;
    content?: StyleProp<TextStyle>;
    arrow?: StyleProp<ViewStyle>;
  };
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  color = 'default',
  size = 'md',
  placement = 'top',
  showArrow = false,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  // delay = 0, // Not used in current implementation
  // closeDelay = 300, // Not used in current implementation
  offset = 7,
  isDisabled = false,
  disableAnimation = false,
  actionType = 'longPress',
  withOverlay = true,
  onOpenChange,
  onClose,
  classNames,
}) => {
  const { theme } = useTheme();
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

  const renderedElement = useRef<View>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const sizeMap = {
    sm: {
      padding: theme.spacing['unit-2'],
      fontSize: theme.typography.fontSizes['text-tiny'],
    },
    md: {
      padding: theme.spacing['unit-3'],
      fontSize: theme.typography.fontSizes['text-small'],
    },
    lg: {
      padding: theme.spacing['unit-4'],
      fontSize: theme.typography.fontSizes['text-medium'],
    },
  };

  const colorStyles = {
    default: {
      bg: theme.colors['default-100'],
      text: theme.colors['default-900'],
    },
    primary: {
      bg: theme.colors.primary,
      text: '#ffffff',
    },
    secondary: {
      bg: theme.colors.secondary,
      text: '#ffffff',
    },
    success: {
      bg: theme.colors.success,
      text: '#ffffff',
    },
    warning: {
      bg: theme.colors.warning,
      text: '#ffffff',
    },
    danger: {
      bg: theme.colors.danger,
      text: '#ffffff',
    },
  }[color];

  // Get element position
  const getElementPosition = useCallback(() => {
    renderedElement.current?.measureInWindow((x, y, width, height) => {
      setTriggerLayout({ x, y, width, height });
    });
  }, []);

  // Calculate tooltip position
  const calculatePosition = useCallback(() => {
    const { x, y, width, height } = triggerLayout;
    const { width: tooltipWidth, height: tooltipHeight } = tooltipSize;
    const arrowSize = showArrow ? 8 : 0;
    const totalOffset = offset + arrowSize;

    let calcX = x;
    let calcY = y;

    if (placement.startsWith('top')) {
      calcY = y - tooltipHeight - totalOffset;
      if (placement === 'top') calcX = x + width / 2 - tooltipWidth / 2;
      else if (placement === 'top-start') calcX = x;
      else if (placement === 'top-end') calcX = x + width - tooltipWidth;
    } else if (placement.startsWith('bottom')) {
      calcY = y + height + totalOffset;
      if (placement === 'bottom') calcX = x + width / 2 - tooltipWidth / 2;
      else if (placement === 'bottom-start') calcX = x;
      else if (placement === 'bottom-end') calcX = x + width - tooltipWidth;
    } else if (placement.startsWith('left')) {
      calcX = x - tooltipWidth - totalOffset;
      if (placement === 'left') calcY = y + height / 2 - tooltipHeight / 2;
      else if (placement === 'left-start') calcY = y;
      else if (placement === 'left-end') calcY = y + height - tooltipHeight;
    } else if (placement.startsWith('right')) {
      calcX = x + width + totalOffset;
      if (placement === 'right') calcY = y + height / 2 - tooltipHeight / 2;
      else if (placement === 'right-start') calcY = y;
      else if (placement === 'right-end') calcY = y + height - tooltipHeight;
    }

    // Keep within screen bounds
    calcX = Math.max(8, Math.min(SCREEN_WIDTH - tooltipWidth - 8, calcX));
    calcY = Math.max(8, Math.min(SCREEN_HEIGHT - tooltipHeight - 8, calcY));

    return { x: calcX, y: calcY };
  }, [triggerLayout, tooltipSize, placement, showArrow, offset]);

  const toggleTooltip = useCallback(() => {
    getElementPosition();

    const newState = !isOpen;

    if (!isControlled) {
      setInternalIsOpen(newState);
    }
    onOpenChange?.(newState);

    if (!newState) {
      onClose?.();
    }

    // Animate
    if (!disableAnimation) {
      if (newState) {
        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      } else {
        opacity.value = withTiming(0, { duration: 150 });
        scale.value = withTiming(0.95, { duration: 150 });
      }
    } else {
      opacity.value = newState ? 1 : 0;
      scale.value = newState ? 1 : 0.95;
    }
  }, [
    isOpen,
    isControlled,
    disableAnimation,
    getElementPosition,
    onOpenChange,
    onClose,
    opacity,
    scale,
  ]);

  // Wrap with action
  const wrapWithAction = (child: React.ReactElement) => {
    if (isDisabled) return child;

    // Clone the child to add tooltip handlers while preserving original handlers
    const enhancedChild = React.cloneElement(child, {
      // @ts-ignore - dynamically adding handlers
      onPress: (e: any) => {
        // Call original onPress if exists
        // @ts-ignore
        child.props?.onPress?.(e);

        // Show tooltip on press if actionType is 'press'
        if (actionType === 'press') {
          toggleTooltip();
        }
      },
      // @ts-ignore - dynamically adding handlers
      onLongPress: (e: any) => {
        // Call original onLongPress if exists
        // @ts-ignore
        child.props?.onLongPress?.(e);

        // Show tooltip on longPress if actionType is 'longPress'
        if (actionType === 'longPress') {
          toggleTooltip();
        }
      },
    });

    return enhancedChild;
  };

  useEffect(() => {
    // Get initial position
    const timeout = setTimeout(getElementPosition, 500);
    const closeTimeout = closeTimeoutRef.current;
    return () => {
      clearTimeout(timeout);
      if (closeTimeout) clearTimeout(closeTimeout);
    };
  }, [getElementPosition]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getArrowStyle = (): ViewStyle => {
    const base: ViewStyle = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    };

    if (placement.startsWith('top'))
      return {
        ...base,
        bottom: -6,
        left: '50%',
        marginLeft: -6,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colorStyles.bg,
      };
    if (placement.startsWith('bottom'))
      return {
        ...base,
        top: -6,
        left: '50%',
        marginLeft: -6,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderBottomWidth: 6,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colorStyles.bg,
      };
    if (placement.startsWith('left'))
      return {
        ...base,
        right: -6,
        top: '50%',
        marginTop: -6,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 6,
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: colorStyles.bg,
      };
    return {
      ...base,
      left: -6,
      top: '50%',
      marginTop: -6,
      borderTopWidth: 6,
      borderBottomWidth: 6,
      borderRightWidth: 6,
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: colorStyles.bg,
    };
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: withOverlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      flex: 1,
    },
    highlightContainer: {
      position: 'absolute',
      backgroundColor: 'transparent',
      overflow: 'visible',
    },
    tooltipContainer: {
      position: 'absolute',
      zIndex: 9999,
    },
    tooltip: {
      backgroundColor: colorStyles.bg,
      borderRadius: theme.borderRadius.md,
      padding: sizeMap[size].padding,
      maxWidth: 250,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        android: { elevation: 4 },
      }),
    },
    content: {
      color: colorStyles.text,
      fontSize: sizeMap[size].fontSize,
    },
  });

  const position = calculatePosition();

  // Render content - either normal or with tooltip
  const renderContent = (withTooltip: boolean) => {
    if (!withTooltip) {
      return wrapWithAction(children);
    }

    const { x, y, width, height } = triggerLayout;

    return (
      <>
        {/* Render trigger at its original position */}
        <View
          style={[
            styles.highlightContainer,
            {
              top: y,
              left: x,
              width,
              height,
            },
          ]}
        >
          {children}
        </View>

        {/* Arrow */}
        {showArrow && (
          <View
            style={{
              position: 'absolute',
              top: placement.startsWith('top') ? y - 6 : y + height - 2,
              left: x + width / 2 - 7.5,
            }}
          >
            <View style={getArrowStyle()} />
          </View>
        )}

        {/* Tooltip content */}
        <Animated.View
          style={[
            styles.tooltipContainer,
            { left: position.x, top: position.y },
            animatedStyle,
            classNames?.base,
          ]}
          onLayout={(e: LayoutChangeEvent) => {
            const { width, height } = e.nativeEvent.layout;
            if (tooltipSize.width !== width || tooltipSize.height !== height) {
              setTooltipSize({ width, height });
            }
          }}
        >
          <View style={[styles.tooltip, classNames?.content]}>
            {typeof content === 'string' ? (
              <Text style={styles.content}>{content}</Text>
            ) : (
              content
            )}
          </View>
        </Animated.View>
      </>
    );
  };

  return (
    <View collapsable={false} ref={renderedElement}>
      {/* Normal render - trigger only */}
      {renderContent(false)}

      {/* Modal render - trigger + tooltip */}
      <Modal
        animationType="fade"
        visible={isOpen}
        transparent
        onRequestClose={toggleTooltip}
        onShow={() => {
          if (!disableAnimation) {
            opacity.value = 0;
            scale.value = 0.95;
            opacity.value = withTiming(1, { duration: 200 });
            scale.value = withSpring(1, { damping: 15, stiffness: 200 });
          }
        }}
        statusBarTranslucent
      >
        <TouchableOpacity
          style={styles.container}
          onPress={toggleTooltip}
          activeOpacity={1}
        >
          {renderContent(true)}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

Tooltip.displayName = 'Tooltip';
