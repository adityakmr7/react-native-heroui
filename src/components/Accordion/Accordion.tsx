import React, { createContext, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
      isDisabled = false,
      showDivider = true,
      hideIndicator = false,
      disableAnimation = false,
      disableIndicatorAnimation = false,
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
      if (!disableAnimation) {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            200,
            LayoutAnimation.Types.easeInEaseOut,
            LayoutAnimation.Properties.opacity
          )
        );
      }

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
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const isExpanded = context.expandedKeys.has(itemKey);
    const isDisabled = itemDisabled || context.disabledKeys.includes(itemKey);

    React.useEffect(() => {
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }, [isExpanded, rotateAnim]);

    const rotate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

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
              { transform: [{ rotate }] },
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
            { transform: [{ rotate }] },
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
          <View style={[styles.content, classNames?.content]}>{children}</View>
        )}
      </View>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
