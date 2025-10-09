import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';

export type SpacerValue =
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96;

export interface SpacerProps extends ViewProps {
  /** Horizontal spacing (width) */
  x?: SpacerValue;
  /** Vertical spacing (height) */
  y?: SpacerValue;
}

export const Spacer = React.forwardRef<View, SpacerProps>(
  ({ x = 1, y = 1, ...viewProps }, ref) => {
    // Map spacer values to theme spacing (unit is 4px)
    const getSpacing = (value: SpacerValue): number => {
      return value * 4;
    };

    const styles = StyleSheet.create({
      spacer: {
        width: x ? getSpacing(x) : undefined,
        height: y ? getSpacing(y) : undefined,
      },
    });

    return (
      <View
        ref={ref}
        style={styles.spacer}
        accessibilityElementsHidden
        importantForAccessibility="no"
        {...viewProps}
      />
    );
  }
);

Spacer.displayName = 'Spacer';
