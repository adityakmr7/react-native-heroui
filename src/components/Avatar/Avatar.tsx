import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  type ImageSourcePropType,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export interface AvatarProps {
  /** Avatar image source */
  src?: ImageSourcePropType | string;
  /** Avatar alt text / accessibility label */
  alt?: string;
  /** Fallback text (usually initials) */
  name?: string;
  /** Avatar size */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Avatar color */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  /** Whether avatar is bordered */
  isBordered?: boolean;
  /** Border color */
  borderColor?: string;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
}

export const Avatar = React.forwardRef<View, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      color = 'default',
      isBordered = false,
      borderColor,
      style,
    },
    ref
  ) => {
    const { theme } = useTheme();

    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 56,
      xl: 80,
    };

    const fontSizeMap = {
      sm: theme.typography.fontSizes.xs,
      md: theme.typography.fontSizes.sm,
      lg: theme.typography.fontSizes.md,
      xl: theme.typography.fontSizes.xl,
    };

    const avatarSize = sizeMap[size];
    const fontSize = fontSizeMap[size];

    const getInitials = (name: string) => {
      const parts = name.trim().split(' ');
      if (parts.length >= 2) {
        return `${parts[0]?.[0] || ''}${parts[1]?.[0] || ''}`.toUpperCase();
      }
      return (parts[0]?.[0] || '').toUpperCase();
    };

    const styles = StyleSheet.create({
      container: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        backgroundColor: theme.colors[color],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        ...(isBordered && {
          borderWidth: 2,
          borderColor: borderColor || theme.colors.background,
        }),
      },
      image: {
        width: '100%',
        height: '100%',
      },
      text: {
        fontSize,
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.background,
      },
    });

    const imageSource =
      typeof src === 'string' ? { uri: src } : (src as ImageSourcePropType);

    return (
      <View ref={ref} style={[styles.container, style]}>
        {src ? (
          <Image
            source={imageSource}
            style={styles.image}
            accessibilityLabel={alt || name}
          />
        ) : name ? (
          <Text style={styles.text}>{getInitials(name)}</Text>
        ) : null}
      </View>
    );
  }
);

Avatar.displayName = 'Avatar';
