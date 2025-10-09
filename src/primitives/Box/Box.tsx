import React from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
  type ViewProps,
  type TextProps,
  type PressableProps,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../theme/types';

/**
 * Style props interface - similar to Chakra UI's style props
 * Allows passing theme-aware style props directly to components
 */
export interface StyleProps {
  // Margin
  m?: keyof Theme['spacing'];
  mt?: keyof Theme['spacing'];
  mr?: keyof Theme['spacing'];
  mb?: keyof Theme['spacing'];
  ml?: keyof Theme['spacing'];
  mx?: keyof Theme['spacing'];
  my?: keyof Theme['spacing'];

  // Padding
  p?: keyof Theme['spacing'];
  pt?: keyof Theme['spacing'];
  pr?: keyof Theme['spacing'];
  pb?: keyof Theme['spacing'];
  pl?: keyof Theme['spacing'];
  px?: keyof Theme['spacing'];
  py?: keyof Theme['spacing'];

  // Colors
  bg?: keyof Theme['colors'];
  bgColor?: keyof Theme['colors'];
  color?: keyof Theme['colors'];

  // Border
  borderRadius?: keyof Theme['borderRadius'];
  borderColor?: keyof Theme['colors'];
  borderWidth?: number;

  // Layout
  w?: number | string;
  h?: number | string;
  width?: number | string;
  height?: number | string;
  minW?: number | string;
  minH?: number | string;
  maxW?: number | string;
  maxH?: number | string;

  // Flexbox
  flex?: number;
  flexDirection?: ViewStyle['flexDirection'];
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  flexWrap?: ViewStyle['flexWrap'];
  gap?: keyof Theme['spacing'];

  // Position
  position?: ViewStyle['position'];
  top?: number | string;
  right?: number | string;
  bottom?: number | string;
  left?: number | string;

  // Shadows
  shadow?: keyof Theme['shadows'];
}

/**
 * Convert style props to React Native styles
 */
const stylePropsToStyle = (
  props: StyleProps,
  theme: Theme
): ViewStyle | TextStyle => {
  const style: any = {};

  // Margin
  if (props.m !== undefined) style.margin = theme.spacing[props.m];
  if (props.mt !== undefined) style.marginTop = theme.spacing[props.mt];
  if (props.mr !== undefined) style.marginRight = theme.spacing[props.mr];
  if (props.mb !== undefined) style.marginBottom = theme.spacing[props.mb];
  if (props.ml !== undefined) style.marginLeft = theme.spacing[props.ml];
  if (props.mx !== undefined) style.marginHorizontal = theme.spacing[props.mx];
  if (props.my !== undefined) style.marginVertical = theme.spacing[props.my];

  // Padding
  if (props.p !== undefined) style.padding = theme.spacing[props.p];
  if (props.pt !== undefined) style.paddingTop = theme.spacing[props.pt];
  if (props.pr !== undefined) style.paddingRight = theme.spacing[props.pr];
  if (props.pb !== undefined) style.paddingBottom = theme.spacing[props.pb];
  if (props.pl !== undefined) style.paddingLeft = theme.spacing[props.pl];
  if (props.px !== undefined) style.paddingHorizontal = theme.spacing[props.px];
  if (props.py !== undefined) style.paddingVertical = theme.spacing[props.py];

  // Colors
  if (props.bg !== undefined) style.backgroundColor = theme.colors[props.bg];
  if (props.bgColor !== undefined)
    style.backgroundColor = theme.colors[props.bgColor];
  if (props.color !== undefined) style.color = theme.colors[props.color];

  // Border
  if (props.borderRadius !== undefined)
    style.borderRadius = theme.borderRadius[props.borderRadius];
  if (props.borderColor !== undefined)
    style.borderColor = theme.colors[props.borderColor];
  if (props.borderWidth !== undefined) style.borderWidth = props.borderWidth;

  // Layout
  if (props.w !== undefined) style.width = props.w;
  if (props.h !== undefined) style.height = props.h;
  if (props.width !== undefined) style.width = props.width;
  if (props.height !== undefined) style.height = props.height;
  if (props.minW !== undefined) style.minWidth = props.minW;
  if (props.minH !== undefined) style.minHeight = props.minH;
  if (props.maxW !== undefined) style.maxWidth = props.maxW;
  if (props.maxH !== undefined) style.maxHeight = props.maxH;

  // Flexbox
  if (props.flex !== undefined) style.flex = props.flex;
  if (props.flexDirection !== undefined)
    style.flexDirection = props.flexDirection;
  if (props.alignItems !== undefined) style.alignItems = props.alignItems;
  if (props.justifyContent !== undefined)
    style.justifyContent = props.justifyContent;
  if (props.flexWrap !== undefined) style.flexWrap = props.flexWrap;
  if (props.gap !== undefined) style.gap = theme.spacing[props.gap];

  // Position
  if (props.position !== undefined) style.position = props.position;
  if (props.top !== undefined) style.top = props.top;
  if (props.right !== undefined) style.right = props.right;
  if (props.bottom !== undefined) style.bottom = props.bottom;
  if (props.left !== undefined) style.left = props.left;

  // Shadows
  if (props.shadow !== undefined) {
    Object.assign(style, theme.shadows[props.shadow]);
  }

  return style;
};

/**
 * Filter out style props from other props
 */
const stylePropsKeys = new Set([
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'bg',
  'bgColor',
  'color',
  'borderRadius',
  'borderColor',
  'borderWidth',
  'w',
  'h',
  'width',
  'height',
  'minW',
  'minH',
  'maxW',
  'maxH',
  'flex',
  'flexDirection',
  'alignItems',
  'justifyContent',
  'flexWrap',
  'gap',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'shadow',
]);

const filterStyleProps = (props: any): [StyleProps, any] => {
  const styleProps: any = {};
  const otherProps: any = {};

  Object.keys(props).forEach((key) => {
    if (stylePropsKeys.has(key)) {
      styleProps[key] = props[key];
    } else {
      otherProps[key] = props[key];
    }
  });

  return [styleProps, otherProps];
};

/**
 * Box - A polymorphic primitive component
 * Can render as View, Text, or Pressable based on the 'as' prop
 */
export interface BoxProps extends StyleProps, ViewProps {
  /** Element to render as */
  as?: 'view' | 'text' | 'pressable';
  /** Children */
  children?: React.ReactNode;
  /** Press handler (only for pressable) */
  onPress?: () => void;
}

export const Box = React.forwardRef<any, BoxProps>(
  ({ as = 'view', children, style, onPress, ...props }, ref) => {
    const { theme } = useTheme();

    const [styleProps, otherProps] = filterStyleProps(props);
    const computedStyle = stylePropsToStyle(styleProps, theme);

    const finalStyle = StyleSheet.flatten([computedStyle, style]);

    if (as === 'pressable' || onPress) {
      return (
        <Pressable
          ref={ref}
          style={finalStyle}
          onPress={onPress}
          {...(otherProps as PressableProps)}
        >
          {children}
        </Pressable>
      );
    }

    if (as === 'text') {
      return (
        <Text ref={ref} style={finalStyle} {...(otherProps as TextProps)}>
          {children}
        </Text>
      );
    }

    return (
      <View ref={ref} style={finalStyle} {...otherProps}>
        {children}
      </View>
    );
  }
);

Box.displayName = 'Box';

/**
 * Convenience components built on Box
 */
export const Stack = React.forwardRef<any, BoxProps>((props, ref) => (
  <Box ref={ref} flexDirection="column" {...props} />
));
Stack.displayName = 'Stack';

export const HStack = React.forwardRef<any, BoxProps>((props, ref) => (
  <Box ref={ref} flexDirection="row" alignItems="center" {...props} />
));
HStack.displayName = 'HStack';

export const VStack = React.forwardRef<any, BoxProps>((props, ref) => (
  <Box ref={ref} flexDirection="column" {...props} />
));
VStack.displayName = 'VStack';

export const Center = React.forwardRef<any, BoxProps>((props, ref) => (
  <Box ref={ref} alignItems="center" justifyContent="center" {...props} />
));
Center.displayName = 'Center';
