import React from 'react';
import type { ViewProps, StyleProp, ViewStyle, TextStyle } from 'react-native';

/**
 * Visual variant of the accordion
 */
export type AccordionVariant = 'default' | 'shadow' | 'bordered' | 'splitted';

/**
 * Selection mode for accordion items
 */
export type SelectionMode = 'single' | 'multiple' | 'none';

/**
 * Context type for Accordion component
 */
export interface AccordionContextType {
  expandedKeys: Set<string>;
  toggleItem: (key: string) => void;
  variant: AccordionVariant;
  isCompact: boolean;
  hideIndicator: boolean;
  disableAnimation: boolean;
  disabledKeys: string[];
}

/**
 * Props for the Accordion component
 */
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

/**
 * Props for the indicator component
 */
export interface IndicatorProps {
  isOpen?: boolean;
  isDisabled?: boolean;
}

/**
 * Props for the AccordionItem component
 */
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
