import React, { useState } from 'react';
import {
  Image as RNImage,
  View,
  ActivityIndicator,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
  type ImageStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export interface ImageProps {
  /** Image source */
  src?: string | { uri: string } | number;
  /** Alt text for accessibility */
  alt?: string;
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Border radius */
  radius?: ImageRadius;
  /** Whether image should cover the container */
  isBlurred?: boolean;
  /** Whether to show loading indicator */
  isLoading?: boolean;
  /** Fallback component when image fails to load */
  fallbackSrc?: string | { uri: string } | number;
  /** Disable skeleton loading */
  disableSkeleton?: boolean;
  /** Resize mode */
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  /** Custom style */
  style?: StyleProp<ImageStyle>;
  /** Container style */
  containerStyle?: StyleProp<ViewStyle>;
  /** Custom class names */
  classNames?: {
    wrapper?: StyleProp<ViewStyle>;
    img?: StyleProp<ImageStyle>;
  };
}

export const Image = React.forwardRef<View, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      radius = 'none',
      isBlurred = false,
      isLoading = false,
      fallbackSrc,
      disableSkeleton = false,
      resizeMode = 'cover',
      style,
      containerStyle,
      classNames,
    },
    ref
  ) => {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const radiusMap = {
      none: 0,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: 9999,
    };

    const imageSource =
      error && fallbackSrc
        ? typeof fallbackSrc === 'string'
          ? { uri: fallbackSrc }
          : fallbackSrc
        : typeof src === 'string'
          ? { uri: src }
          : src;

    const styles = StyleSheet.create({
      wrapper: {
        position: 'relative',
        width: width || 300,
        height: height || 200,
        borderRadius: radiusMap[radius],
        overflow: 'hidden',
        backgroundColor: theme.colors['default-100'],
      },
      image: {
        width: '100%',
        height: '100%',
      },
      blurred: {
        opacity: 0.5,
      },
      loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors['default-100'],
      },
      skeleton: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors['default-200'],
      },
    });

    return (
      <View
        ref={ref}
        style={[styles.wrapper, classNames?.wrapper, containerStyle]}
        accessible
        accessibilityLabel={alt}
        accessibilityRole="image"
      >
        {imageSource && (
          <RNImage
            source={imageSource}
            resizeMode={resizeMode}
            style={[
              styles.image,
              isBlurred && styles.blurred,
              classNames?.img,
              style,
            ]}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => {
              setError(true);
              setLoading(false);
            }}
          />
        )}

        {(loading || isLoading) && !disableSkeleton && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
      </View>
    );
  }
);

Image.displayName = 'Image';
