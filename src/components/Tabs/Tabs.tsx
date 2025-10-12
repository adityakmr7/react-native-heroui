import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  // @ts-ignore - peer dependency
} from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

export type TabsVariant = 'solid' | 'bordered' | 'light' | 'underlined';
export type TabsColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type TabsPlacement = 'top' | 'bottom' | 'start' | 'end';

export interface TabItem {
  key: string;
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isDisabled?: boolean;
}

export interface TabsProps {
  /** Tab items */
  items?: TabItem[];
  /** Children (Tab components) */
  children?: React.ReactNode;
  /** Visual variant */
  variant?: TabsVariant;
  /** Color theme */
  color?: TabsColor;
  /** Size */
  size?: TabsSize;
  /** Border radius */
  radius?: TabsRadius;
  /** Full width tabs */
  fullWidth?: boolean;
  /** Placement */
  placement?: TabsPlacement;
  /** Vertical orientation */
  isVertical?: boolean;
  /** Selected tab key (controlled) */
  selectedKey?: string;
  /** Default selected key (uncontrolled) */
  defaultSelectedKey?: string;
  /** Disabled tab keys */
  disabledKeys?: string[];
  /** Disable all tabs */
  isDisabled?: boolean;
  /** Disable cursor animation */
  disableCursorAnimation?: boolean;
  /** Disable all animations */
  disableAnimation?: boolean;
  /** Destroy inactive panels */
  destroyInactiveTabPanel?: boolean;
  /** Selection change handler */
  onSelectionChange?: (key: string) => void;
  /** Custom styles */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    tabList?: StyleProp<ViewStyle>;
    tab?: StyleProp<ViewStyle>;
    tabContent?: StyleProp<TextStyle>;
    cursor?: StyleProp<ViewStyle>;
    panel?: StyleProp<ViewStyle>;
  };
  /** Custom style */
  style?: StyleProp<ViewStyle>;
}

export interface TabProps {
  /** Tab key */
  tabKey: string;
  /** Tab title */
  title: React.ReactNode;
  /** Tab content */
  children: React.ReactNode;
  /** Icon */
  icon?: React.ReactNode;
  /** Disabled */
  isDisabled?: boolean;
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

Tab.displayName = 'Tab';

export const Tabs: React.FC<TabsProps> = ({
  items,
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  radius = 'md',
  fullWidth = false,
  placement = 'top',
  isVertical = false,
  selectedKey: controlledKey,
  defaultSelectedKey,
  disabledKeys = [],
  isDisabled = false,
  disableCursorAnimation = false,
  disableAnimation = false,
  destroyInactiveTabPanel = true,
  onSelectionChange,
  classNames,
  style,
}) => {
  const { theme } = useTheme();

  // Extract tabs from children or items
  const tabs = React.useMemo(() => {
    if (items) {
      return items;
    }

    const childArray = React.Children.toArray(children);
    return childArray
      .filter((child) => React.isValidElement(child))
      .map((child: any) => ({
        key: child.props.tabKey,
        title: child.props.title,
        children: child.props.children,
        icon: child.props.icon,
        isDisabled: child.props.isDisabled,
      }));
  }, [items, children]);

  const firstEnabledKey =
    tabs.find((tab) => !tab.isDisabled)?.key || tabs[0]?.key;
  const [internalKey, setInternalKey] = useState(
    defaultSelectedKey || firstEnabledKey
  );

  const isControlled = controlledKey !== undefined;
  const selectedKey = isControlled ? controlledKey : internalKey;

  // Animated values for cursor
  const cursorX = useSharedValue(0);
  const cursorWidth = useSharedValue(0);
  const cursorOpacity = useSharedValue(0);

  // Tab layouts for cursor animation
  const [tabLayouts, setTabLayouts] = useState<
    Map<string, { x: number; width: number }>
  >(new Map());

  const sizeMap = {
    sm: {
      height: 32,
      fontSize: theme.typography.fontSizes['text-tiny'],
      padding: theme.spacing['unit-3'],
    },
    md: {
      height: 40,
      fontSize: theme.typography.fontSizes['text-small'],
      padding: theme.spacing['unit-4'],
    },
    lg: {
      height: 48,
      fontSize: theme.typography.fontSizes['text-medium'],
      padding: theme.spacing['unit-5'],
    },
  };

  const radiusMap = {
    none: 0,
    sm: theme.borderRadius.sm,
    md: theme.borderRadius.md,
    lg: theme.borderRadius.lg,
    full: 999,
  };

  const getColorValue = () => {
    if (color === 'default') return theme.colors['default-500'];
    return theme.colors[color];
  };

  const colorValue = getColorValue();

  // Update cursor position when selection changes
  useEffect(() => {
    const layout = tabLayouts.get(selectedKey);
    if (layout && !disableCursorAnimation) {
      cursorX.value = withSpring(layout.x, {
        damping: 20,
        stiffness: 200,
      });
      cursorWidth.value = withSpring(layout.width, {
        damping: 20,
        stiffness: 200,
      });
      cursorOpacity.value = withTiming(1, { duration: 200 });
    } else if (layout) {
      cursorX.value = layout.x;
      cursorWidth.value = layout.width;
      cursorOpacity.value = 1;
    }
  }, [selectedKey, tabLayouts, disableCursorAnimation]);

  const handleTabPress = useCallback(
    (key: string) => {
      if (isDisabled || disabledKeys.includes(key)) return;

      if (!isControlled) {
        setInternalKey(key);
      }
      onSelectionChange?.(key);
    },
    [isDisabled, disabledKeys, isControlled, onSelectionChange]
  );

  const handleTabLayout = useCallback(
    (key: string, x: number, width: number) => {
      setTabLayouts((prev) => {
        const newMap = new Map(prev);
        newMap.set(key, { x, width });
        return newMap;
      });
    },
    []
  );

  const cursorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: cursorX.value }],
    width: cursorWidth.value,
    opacity: cursorOpacity.value,
  }));

  const getTabStyles = (isSelected: boolean, isDisabledTab: boolean) => {
    const baseStyle: ViewStyle = {
      height: sizeMap[size].height,
      paddingHorizontal: sizeMap[size].padding,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing['unit-2'],
      borderRadius: radiusMap[radius],
      opacity: isDisabledTab ? 0.5 : 1,
    };

    if (variant === 'solid') {
      return {
        ...baseStyle,
        backgroundColor: isSelected ? colorValue : 'transparent',
      };
    }

    if (variant === 'bordered') {
      return {
        ...baseStyle,
        borderWidth: 2,
        borderColor: isSelected ? colorValue : theme.colors['default-200'],
      };
    }

    if (variant === 'light') {
      return {
        ...baseStyle,
        backgroundColor: isSelected ? `${colorValue}20` : 'transparent',
      };
    }

    // underlined
    return {
      ...baseStyle,
      borderBottomWidth: 2,
      borderBottomColor: isSelected ? colorValue : 'transparent',
      borderRadius: 0,
    };
  };

  const getTextColor = (isSelected: boolean) => {
    if (variant === 'solid' && isSelected) {
      return '#ffffff';
    }
    return isSelected ? colorValue : theme.colors['default-500'];
  };

  const styles = StyleSheet.create({
    base: {
      width: '100%',
    },
    tabList: {
      flexDirection: isVertical ? 'column' : 'row',
      backgroundColor:
        variant === 'solid' ? theme.colors['default-100'] : 'transparent',
      borderRadius: radiusMap[radius],
      padding: variant === 'solid' ? 4 : 0,
      gap: variant === 'underlined' ? 0 : 4,
    },
    cursor: {
      position: 'absolute',
      height: '100%',
      backgroundColor: colorValue,
      borderRadius: radiusMap[radius],
      zIndex: 0,
    },
    tabWrapper: {
      position: 'relative',
      zIndex: 1,
      flex: fullWidth ? 1 : 0,
    },
    panelContainer: {
      marginTop: placement === 'top' ? theme.spacing['unit-4'] : 0,
      marginBottom: placement === 'bottom' ? theme.spacing['unit-4'] : 0,
    },
  });

  return (
    <View style={[styles.base, classNames?.base, style]}>
      {placement === 'top' && (
        <View style={[styles.tabList, classNames?.tabList]}>
          {variant === 'solid' && !disableCursorAnimation && (
            <Animated.View
              style={[styles.cursor, classNames?.cursor, cursorStyle]}
            />
          )}
          {tabs.map((tab, index) => {
            const isSelected = tab.key === selectedKey;
            const isTabDisabled =
              tab.isDisabled || disabledKeys.includes(tab.key);

            return (
              <View
                key={tab.key}
                style={styles.tabWrapper}
                onLayout={(e: LayoutChangeEvent) => {
                  const { x, width } = e.nativeEvent.layout;
                  handleTabLayout(tab.key, x, width);
                }}
              >
                <Pressable
                  onPress={() => handleTabPress(tab.key)}
                  disabled={isDisabled || isTabDisabled}
                  style={[
                    getTabStyles(isSelected, isTabDisabled),
                    classNames?.tab,
                  ]}
                >
                  {tab.icon && tab.icon}
                  {typeof tab.title === 'string' ? (
                    <Text
                      style={[
                        {
                          color: getTextColor(isSelected),
                          fontSize: sizeMap[size].fontSize,
                          fontWeight: isSelected ? '600' : '400',
                        },
                        classNames?.tabContent,
                      ]}
                    >
                      {tab.title}
                    </Text>
                  ) : (
                    tab.title
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      {/* Panel Content */}
      <View style={[styles.panelContainer, classNames?.panel]}>
        {tabs.map((tab) => {
          const isSelected = tab.key === selectedKey;

          if (!isSelected && destroyInactiveTabPanel) {
            return null;
          }

          return (
            <View
              key={tab.key}
              style={{
                display: isSelected ? 'flex' : 'none',
              }}
            >
              {tab.children}
            </View>
          );
        })}
      </View>

      {placement === 'bottom' && (
        <View style={[styles.tabList, classNames?.tabList]}>
          {variant === 'solid' && !disableCursorAnimation && (
            <Animated.View
              style={[styles.cursor, classNames?.cursor, cursorStyle]}
            />
          )}
          {tabs.map((tab) => {
            const isSelected = tab.key === selectedKey;
            const isTabDisabled =
              tab.isDisabled || disabledKeys.includes(tab.key);

            return (
              <View
                key={tab.key}
                style={styles.tabWrapper}
                onLayout={(e: LayoutChangeEvent) => {
                  const { x, width } = e.nativeEvent.layout;
                  handleTabLayout(tab.key, x, width);
                }}
              >
                <Pressable
                  onPress={() => handleTabPress(tab.key)}
                  disabled={isDisabled || isTabDisabled}
                  style={[
                    getTabStyles(isSelected, isTabDisabled),
                    classNames?.tab,
                  ]}
                >
                  {tab.icon && tab.icon}
                  {typeof tab.title === 'string' ? (
                    <Text
                      style={[
                        {
                          color: getTextColor(isSelected),
                          fontSize: sizeMap[size].fontSize,
                          fontWeight: isSelected ? '600' : '400',
                        },
                        classNames?.tabContent,
                      ]}
                    >
                      {tab.title}
                    </Text>
                  ) : (
                    tab.title
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

Tabs.displayName = 'Tabs';
