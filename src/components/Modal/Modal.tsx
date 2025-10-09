import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  Modal as RNModal,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type ModalSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full';

export type ModalRadius = 'none' | 'sm' | 'md' | 'lg';
export type ModalShadow = 'none' | 'sm' | 'md' | 'lg';
export type ModalBackdrop = 'transparent' | 'opaque' | 'blur';
export type ModalPlacement = 'auto' | 'top' | 'center' | 'bottom';
export type ModalScrollBehavior = 'normal' | 'inside' | 'outside';

// Modal Context
interface ModalContextType {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal');
  }
  return context;
};

// Modal Props
export interface ModalProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Children (ModalContent) */
  children: React.ReactNode;
  /** Modal size */
  size?: ModalSize;
  /** Border radius */
  radius?: ModalRadius;
  /** Shadow size */
  shadow?: ModalShadow;
  /** Backdrop type */
  backdrop?: ModalBackdrop;
  /** Scroll behavior */
  scrollBehavior?: ModalScrollBehavior;
  /** Placement */
  placement?: ModalPlacement;
  /** Whether modal can be dismissed by clicking backdrop */
  isDismissable?: boolean;
  /** Whether Esc key dismisses modal */
  isKeyboardDismissDisabled?: boolean;
  /** Hide close button */
  hideCloseButton?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Custom class names */
  classNames?: {
    wrapper?: StyleProp<ViewStyle>;
    backdrop?: StyleProp<ViewStyle>;
    base?: StyleProp<ViewStyle>;
  };
  /** Open change handler */
  onOpenChange?: (isOpen: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  radius = 'lg',
  shadow = 'lg',
  backdrop = 'opaque',
  scrollBehavior: _scrollBehavior = 'normal',
  placement = 'center',
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  hideCloseButton: _hideCloseButton = false,
  disableAnimation = false,
  classNames,
  onOpenChange,
}) => {
  const { theme } = useTheme();

  const sizeMap = {
    'xs': 300,
    'sm': 350,
    'md': 400,
    'lg': 500,
    'xl': 600,
    '2xl': 700,
    '3xl': 800,
    '4xl': 900,
    '5xl': 1000,
    'full': '95%',
  };

  const radiusMap = {
    none: 0,
    sm: theme.borderRadius.sm,
    md: theme.borderRadius.md,
    lg: theme.borderRadius.lg,
  };

  const getBackdropColor = () => {
    switch (backdrop) {
      case 'transparent':
        return 'rgba(0, 0, 0, 0.2)';
      case 'blur':
        return 'rgba(0, 0, 0, 0.6)';
      case 'opaque':
      default:
        return 'rgba(0, 0, 0, 0.5)';
    }
  };

  const getPlacementStyles = () => {
    switch (placement) {
      case 'top':
        return { justifyContent: 'flex-start' as const, paddingTop: 40 };
      case 'bottom':
        return { justifyContent: 'flex-end' as const, paddingBottom: 40 };
      case 'center':
        return { justifyContent: 'center' as const };
      case 'auto':
      default:
        return { justifyContent: 'center' as const };
    }
  };

  const handleBackdropPress = () => {
    if (isDismissable) {
      onClose();
      onOpenChange?.(false);
    }
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: getBackdropColor(),
      padding: 20,
      ...getPlacementStyles(),
    },
    modalContainer: {
      backgroundColor: theme.colors.content1,
      borderRadius: radiusMap[radius],
      maxWidth: typeof sizeMap[size] === 'number' ? sizeMap[size] : undefined,
      width:
        typeof sizeMap[size] === 'string' ? (sizeMap[size] as any) : undefined,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height:
          shadow === 'sm' ? 2 : shadow === 'md' ? 4 : shadow === 'lg' ? 8 : 0,
      },
      shadowOpacity: shadow === 'none' ? 0 : 0.25,
      shadowRadius:
        shadow === 'sm' ? 3.84 : shadow === 'md' ? 6 : shadow === 'lg' ? 10 : 0,
      elevation:
        shadow === 'sm' ? 5 : shadow === 'md' ? 10 : shadow === 'lg' ? 15 : 0,
    },
  });

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType={disableAnimation ? 'none' : 'fade'}
      onRequestClose={() => {
        if (!isKeyboardDismissDisabled) {
          onClose();
          onOpenChange?.(false);
        }
      }}
    >
      <ModalContext.Provider value={{ onClose }}>
        <Pressable
          style={[styles.modalOverlay, classNames?.backdrop]}
          onPress={handleBackdropPress}
        >
          <Pressable
            style={[styles.modalContainer, classNames?.base]}
            onPress={(e) => e.stopPropagation()}
          >
            {children}
          </Pressable>
        </Pressable>
      </ModalContext.Provider>
    </RNModal>
  );
};

Modal.displayName = 'Modal';

// ModalContent
export interface ModalContentProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
};

ModalContent.displayName = 'ModalContent';

// ModalHeader
export interface ModalHeaderProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Hide close button */
  hideCloseButton?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  style,
  hideCloseButton = false,
  ...props
}) => {
  const { theme } = useTheme();
  const modalContext = useModalContext();

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.spacing['unit-4'],
      borderBottomWidth: 1,
      borderBottomColor: theme.colors['default-200'],
    },
    title: {
      fontSize: theme.typography.fontSizes['text-large'],
      fontWeight: theme.typography.fontWeights.semibold,
      color: theme.colors.foreground,
      flex: 1,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors['default-100'],
    },
    closeButtonText: {
      fontSize: 18,
      color: theme.colors['default-500'],
    },
  });

  return (
    <View style={[styles.header, style]} {...props}>
      {typeof children === 'string' ? (
        <Text style={styles.title}>{children}</Text>
      ) : (
        children
      )}
      {!hideCloseButton && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={modalContext.onClose}
          accessibilityLabel="Close modal"
          accessibilityRole="button"
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

ModalHeader.displayName = 'ModalHeader';

// ModalBody
export interface ModalBodyProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Whether body should be scrollable */
  scrollable?: boolean;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  style,
  scrollable = true,
  ...props
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    body: {
      padding: theme.spacing['unit-4'],
    },
    scrollView: {
      maxHeight: 400,
    },
  });

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollView, style]}
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={true}
        {...props}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[styles.body, style]} {...props}>
      {children}
    </View>
  );
};

ModalBody.displayName = 'ModalBody';

// ModalFooter
export interface ModalFooterProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: theme.spacing['unit-2'],
      padding: theme.spacing['unit-4'],
      borderTopWidth: 1,
      borderTopColor: theme.colors['default-200'],
    },
  });

  return (
    <View style={[styles.footer, style]} {...props}>
      {children}
    </View>
  );
};

ModalFooter.displayName = 'ModalFooter';
