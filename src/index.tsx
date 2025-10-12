// Primitives
export {
  Box,
  Stack,
  HStack,
  VStack,
  Center,
  type BoxProps,
  type StyleProps,
} from './primitives/Box/Box';

// Components
export { Button, type ButtonProps } from './components/Button/Button';
export { Input, type InputProps } from './components/Input/Input';
export {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardBodyProps,
  type CardFooterProps,
} from './components/Card/Card';
export { Avatar, type AvatarProps } from './components/Avatar/Avatar';
export {
  Badge,
  type BadgeProps,
  type BadgeColor,
  type BadgeVariant,
  type BadgeSize,
  type BadgeShape,
  type BadgePlacement,
} from './components/Badge/Badge';
export { Chip, type ChipProps } from './components/Chip/Chip';
export { Switch, type SwitchProps } from './components/Switch/Switch';
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
} from './components/Divider/Divider';
export {
  Spinner,
  type SpinnerProps,
  type SpinnerColor,
  type SpinnerSize,
  type SpinnerVariant,
} from './components/Spinner/Spinner';
export {
  Checkbox,
  type CheckboxProps,
  type CheckboxColor,
  type CheckboxSize,
  type CheckboxRadius,
  type CheckboxIconProps,
} from './components/Checkbox/Checkbox';
export {
  Radio,
  RadioGroup,
  type RadioProps,
  type RadioGroupProps,
  type RadioColor,
  type RadioSize,
  type RadioOrientation,
} from './components/Radio/Radio';
export { Skeleton, type SkeletonProps } from './components/Skeleton/Skeleton';
export {
  Image,
  type ImageProps,
  type ImageRadius,
} from './components/Image/Image';
export {
  Textarea,
  type TextareaProps,
  type TextareaVariant,
  type TextareaColor,
  type TextareaSize,
} from './components/Textarea/Textarea';
export {
  Slider,
  type SliderProps,
  type SliderColor,
  type SliderSize,
} from './components/Slider/Slider';
export {
  Select,
  type SelectProps,
  type SelectItem,
  type SelectVariant,
  type SelectColor,
  type SelectSize,
} from './components/Select/Select';
export {
  Progress,
  type ProgressProps,
  type ProgressColor,
  type ProgressSize,
} from './components/Progress/Progress';
export {
  Spacer,
  type SpacerProps,
  type SpacerValue,
} from './components/Spacer/Spacer';
export {
  InputOtp,
  type InputOtpProps,
  type InputOtpVariant,
  type InputOtpColor,
  type InputOtpSize,
  type InputOtpRadius,
} from './components/InputOtp/InputOtp';
export {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  type ModalProps,
  type ModalContentProps,
  type ModalHeaderProps,
  type ModalBodyProps,
  type ModalFooterProps,
  type ModalSize,
  type ModalRadius,
  type ModalShadow,
  type ModalBackdrop,
  type ModalPlacement,
  type ModalScrollBehavior,
} from './components/Modal/Modal';
export {
  Accordion,
  AccordionItem,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionVariant,
  type SelectionMode,
  type IndicatorProps,
} from './components/Accordion/Accordion';
export {
  Alert,
  type AlertProps,
  type AlertColor,
  type AlertVariant,
  type AlertRadius,
} from './components/Alert/Alert';
export {
  ToastProvider,
  toast,
  useToast,
  type ToastOptions,
  type ToastColor,
  type ToastVariant,
  type ToastRadius,
  type ToastPlacement,
  type ToastProviderProps,
} from './components/Toast/Toast';
export {
  Tooltip,
  type TooltipProps,
  type TooltipColor,
  type TooltipSize,
  type TooltipPlacement,
  type TooltipActionType,
} from './components/Tooltip/Tooltip';

// Providers
export {
  HeroUIProvider,
  ThemeProvider, // Backward compatibility alias
  ThemeContext,
  type ThemeContextType,
  type HeroUIProviderProps,
  type ThemeProviderProps, // Backward compatibility alias
} from './providers/ThemeProvider';

// Hooks
export { useTheme } from './hooks/useTheme';
export { useColorMode } from './hooks/useColorMode';
export {
  useResponsive,
  useResponsiveValue,
  resolveResponsiveValue,
  type ResponsiveValue,
  type Breakpoint,
} from './hooks/useResponsive';
export {
  useDisclosure,
  type UseDisclosureProps,
  type UseDisclosureReturn,
} from './hooks/useDisclosure';

// Theme
export { lightTheme, darkTheme } from './theme/themes';
export type { Theme, ThemeMode, ThemeColors } from './theme/types';

// Tokens
export { LIGHT_COLORS, DARK_COLORS } from './tokens/colors';
export { SPACING } from './tokens/spacing';
export { TYPOGRAPHY } from './tokens/typography';
export { BORDER_RADIUS } from './tokens/borderRadius';
export { SHADOWS } from './tokens/shadows';

// Factories
export {
  createStyledView,
  createStyledText,
} from './factories/createStyledComponent';

// Utils
export { getColor, getSpacing, getFontSize } from './utils/styled';
export { getSpacingStyles } from './utils/styleProps';

// Variants
export { getButtonStyles, type ButtonVariants } from './variants/button';
export { getInputStyles, type InputVariants } from './variants/input';
