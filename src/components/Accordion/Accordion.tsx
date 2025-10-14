import React, { createContext, useContext, useState } from 'react';
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
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type AccordionVariant = 'light' | 'shadow' | 'bordered' | 'splitted';
export type SelectionMode = 'single' | 'multiple' | 'none';

export interface AccordionContextType {
  expandedKeys: Set<string>;
  toggleItem: (key: string) => void;
  variant: AccordionVariant;
  isCompact: boolean;
  hideIndicator: boolean;
  disableAnimation: boolean;
  disabledKeys: string[];
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion component');
  }
  return context;
};

export interface AccordionProps extends Omit<ViewProps, 'style'> {
  /** Accordion content (AccordionItem components) */
  children: React.ReactNode;
  /** Visual variant of the accordion */
  variant?: AccordionVariant;
  /** Selection mode */
  selectionMode?: SelectionMode;
  /** Compact mode */
  isCompact?: boolean;
  /** Disable all items */
  isDisabled?: boolean;
  /** Show divider between items */
  showDivider?: boolean;
  /** Hide indicator */
  hideIndicator?: boolean;
  /** Disable animation */
  disableAnimation?: boolean;
  /** Disable indicator animation */
  disableIndicatorAnimation?: boolean;
  /** Keys of items that should be expanded by default */
  defaultExpandedKeys?: string[];
  /** Controlled expanded keys */
  expandedKeys?: string[];
  /** Keys of disabled items */
  disabledKeys?: string[];
  /** Full width */
  fullWidth?: boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Callback when selection changes */
  onSelectionChange?: (keys: Set<string>) => void;
}

export const Accordion = React.forwardRef<View, AccordionProps>(
  (
    {
      children,
      variant = 'light',
      selectionMode = 'single',
      isCompact = false,
      // isDisabled = false, // Reserved for future use
      // showDivider = true, // Reserved for future use
      hideIndicator = false,
      disableAnimation = false,
      // disableIndicatorAnimation = false, // Reserved for future use
      defaultExpandedKeys = [],
      expandedKeys: controlledExpandedKeys,
      disabledKeys = [],
      fullWidth = true,
      style,
      onSelectionChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [internalExpandedKeys, setInternalExpandedKeys] = useState<
      Set<string>
    >(new Set(defaultExpandedKeys));

    const isControlled = controlledExpandedKeys !== undefined;
    const expandedKeys = isControlled
      ? new Set(controlledExpandedKeys)
      : internalExpandedKeys;

    const toggleItem = (key: string) => {
      const newExpandedKeys = new Set(expandedKeys);

      if (selectionMode === 'single') {
        // Single mode: close all others and toggle the clicked one
        if (newExpandedKeys.has(key)) {
          newExpandedKeys.delete(key);
        } else {
          newExpandedKeys.clear();
          newExpandedKeys.add(key);
        }
      } else if (selectionMode === 'multiple') {
        // Multiple mode: toggle the clicked one
        if (newExpandedKeys.has(key)) {
          newExpandedKeys.delete(key);
        } else {
          newExpandedKeys.add(key);
        }
      }

      if (!isControlled) {
        setInternalExpandedKeys(newExpandedKeys);
      }

      onSelectionChange?.(newExpandedKeys);
    };

    const styles = StyleSheet.create({
      container: {
        width: fullWidth ? '100%' : 'auto',
        ...(variant === 'splitted' && {
          gap: theme.spacing['unit-2'],
        }),
      },
    });

    return (
      <AccordionContext.Provider
        value={{
          expandedKeys,
          toggleItem,
          variant,
          isCompact,
          hideIndicator,
          disableAnimation,
          disabledKeys,
        }}
      >
        <View ref={ref} style={[styles.container, style]} {...viewProps}>
          {children}
        </View>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';

export interface IndicatorProps {
  isOpen?: boolean;
  isDisabled?: boolean;
}

export interface AccordionItemProps extends Omit<ViewProps, 'style'> {
  /** Unique key for the item */
  itemKey: string;
  /** Title of the accordion item */
  title: string | React.ReactNode;
  /** Subtitle (optional) */
  subtitle?: string | React.ReactNode;
  /** Content to display when expanded */
  children: React.ReactNode;
  /** Start content (icon, image, etc.) */
  startContent?: React.ReactNode;
  /** Custom indicator or function */
  indicator?: React.ReactNode | ((props: IndicatorProps) => React.ReactNode);
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /** Custom styles */
  style?: StyleProp<ViewStyle>;
  /** Custom class names for different parts */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    heading?: StyleProp<ViewStyle>;
    trigger?: StyleProp<ViewStyle>;
    titleWrapper?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    subtitle?: StyleProp<TextStyle>;
    startContent?: StyleProp<ViewStyle>;
    indicator?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
  };
}

export const AccordionItem = React.forwardRef<View, AccordionItemProps>(
  (
    {
      itemKey,
      title,
      subtitle,
      children,
      startContent,
      indicator,
      isDisabled: itemDisabled = false,
      style,
      classNames,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();
    const context = useAccordionContext();
    const rotation = useSharedValue(0);
    const contentHeight = useSharedValue(0);
    const contentOpacity = useSharedValue(0);

    const isExpanded = context.expandedKeys.has(itemKey);
    const isDisabled = itemDisabled || context.disabledKeys.includes(itemKey);

    React.useEffect(() => {
      if (context.disableAnimation) {
        rotation.value = isExpanded ? 1 : 0;
        contentHeight.value = isExpanded ? 1 : 0;
        contentOpacity.value = isExpanded ? 1 : 0;
      } else {
        rotation.value = withSpring(isExpanded ? 1 : 0, {
          damping: 15,
          stiffness: 150,
        });
        contentHeight.value = withTiming(isExpanded ? 1 : 0, {
          duration: 250,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
        contentOpacity.value = withTiming(isExpanded ? 1 : 0, {
          duration: 200,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      }
    }, [isExpanded, context.disableAnimation, rotation, contentHeight, contentOpacity]);

    const indicatorAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: `${rotation.value * 180}deg`,
        },
      ],
    }));

    const contentAnimatedStyle = useAnimatedStyle(() => ({
      opacity: contentOpacity.value,
      transform: [
        {
          scaleY: contentHeight.value,
        },
      ],
    }));

    const handlePress = () => {
      if (!isDisabled) {
        context.toggleItem(itemKey);
      }
    };

    const getVariantStyles = () => {
      const baseStyle: ViewStyle = {
        borderRadius: theme.borderRadius['rounded-medium'],
        overflow: 'hidden',
      };

      switch (context.variant) {
        case 'shadow':
          return {
            ...baseStyle,
            backgroundColor: theme.colors.content1,
            ...theme.shadows['shadow-md'],
            marginBottom: theme.spacing['unit-2'],
          };
        case 'bordered':
          return {
            ...baseStyle,
            backgroundColor: theme.colors.content1,
            borderWidth: 1,
            borderColor: theme.colors.divider,
            marginBottom: theme.spacing['unit-2'],
          };
        case 'splitted':
          return {
            ...baseStyle,
            backgroundColor: theme.colors.content1,
            ...theme.shadows['shadow-sm'],
          };
        case 'light':
        default:
          return {
            backgroundColor: 'transparent',
            borderBottomWidth: isExpanded ? 0 : 1,
            borderBottomColor: theme.colors.divider,
          };
      }
    };

    const styles = StyleSheet.create({
      base: {
        ...getVariantStyles(),
      },
      trigger: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: context.isCompact
          ? theme.spacing['unit-2']
          : theme.spacing['unit-4'],
        backgroundColor:
          context.variant === 'light' ? 'transparent' : theme.colors.content1,
        opacity: isDisabled ? 0.5 : 1,
      },
      triggerPressed: {
        opacity: 0.7,
      },
      startContent: {
        marginRight: theme.spacing['unit-3'],
      },
      titleWrapper: {
        flex: 1,
      },
      title: {
        fontSize: theme.typography.fontSizes['text-medium'],
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors.foreground,
      },
      subtitle: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors['default-500'],
        marginTop: theme.spacing['unit-1'],
      },
      indicatorContainer: {
        marginLeft: theme.spacing['unit-2'],
      },
      content: {
        padding: context.isCompact
          ? theme.spacing['unit-2']
          : theme.spacing['unit-4'],
        paddingTop: 0,
        backgroundColor:
          context.variant === 'light' ? 'transparent' : theme.colors.content1,
      },
      defaultIndicator: {
        fontSize: 20,
        color: theme.colors['default-500'],
      },
    });

    const renderIndicator = () => {
      if (context.hideIndicator) {
        return null;
      }

      if (typeof indicator === 'function') {
        return (
          <View style={[styles.indicatorContainer, classNames?.indicator]}>
            {indicator({ isOpen: isExpanded, isDisabled })}
          </View>
        );
      }

      if (indicator) {
        return (
          <Animated.View
            style={[
              styles.indicatorContainer,
              classNames?.indicator,
              indicatorAnimatedStyle,
            ]}
          >
            {indicator}
          </Animated.View>
        );
      }

      // Default indicator
      return (
        <Animated.View
          style={[
            styles.indicatorContainer,
            classNames?.indicator,
            indicatorAnimatedStyle,
          ]}
        >
          <Text style={styles.defaultIndicator}>▼</Text>
        </Animated.View>
      );
    };

    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        {...viewProps}
      >
        <Pressable
          onPress={handlePress}
          disabled={isDisabled}
          style={({ pressed }) => [
            styles.trigger,
            classNames?.trigger,
            pressed && styles.triggerPressed,
          ]}
          accessibilityRole="button"
          accessibilityState={{
            expanded: isExpanded,
            disabled: isDisabled,
          }}
        >
          {startContent && (
            <View style={[styles.startContent, classNames?.startContent]}>
              {startContent}
            </View>
          )}
          <View style={[styles.titleWrapper, classNames?.titleWrapper]}>
            {typeof title === 'string' ? (
              <Text style={[styles.title, classNames?.title]}>{title}</Text>
            ) : (
              title
            )}
            {subtitle &&
              (typeof subtitle === 'string' ? (
                <Text style={[styles.subtitle, classNames?.subtitle]}>
                  {subtitle}
                </Text>
              ) : (
                subtitle
              ))}
          </View>
          {renderIndicator()}
        </Pressable>
        {isExpanded && (
          <Animated.View
            style={[styles.content, classNames?.content, contentAnimatedStyle]}
          >
            {children}
          </Animated.View>
        )}
      </View>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
