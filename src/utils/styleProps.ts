import type { Theme } from '../theme/types';
import { getSpacing } from '../utils/styled';

interface SpacingProps {
  m?: keyof Theme['spacing'];
  mt?: keyof Theme['spacing'];
  mr?: keyof Theme['spacing'];
  mb?: keyof Theme['spacing'];
  ml?: keyof Theme['spacing'];
  mx?: keyof Theme['spacing'];
  my?: keyof Theme['spacing'];
  p?: keyof Theme['spacing'];
  pt?: keyof Theme['spacing'];
  pr?: keyof Theme['spacing'];
  pb?: keyof Theme['spacing'];
  pl?: keyof Theme['spacing'];
  px?: keyof Theme['spacing'];
  py?: keyof Theme['spacing'];
}

export const getSpacingStyles = (theme: Theme, props: SpacingProps) => {
  const styles: any = {};

  if (props.m) styles.margin = getSpacing(theme, props.m);
  if (props.mt) styles.marginTop = getSpacing(theme, props.mt);
  if (props.mr) styles.marginRight = getSpacing(theme, props.mr);
  if (props.mb) styles.marginBottom = getSpacing(theme, props.mb);
  if (props.ml) styles.marginLeft = getSpacing(theme, props.ml);
  if (props.mx) {
    styles.marginHorizontal = getSpacing(theme, props.mx);
  }
  if (props.my) {
    styles.marginVertical = getSpacing(theme, props.my);
  }

  // Similar for padding...

  return styles;
};
