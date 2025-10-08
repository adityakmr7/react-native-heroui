// Primitives
export {
  Box,
  Stack,
  HStack,
  VStack,
  Center,
  Spacer,
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
export { Badge, type BadgeProps } from './components/Badge/Badge';
export { Chip, type ChipProps } from './components/Chip/Chip';
export { Switch, type SwitchProps } from './components/Switch/Switch';
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
  Calendar,
  dateToCalendarDate,
  calendarDateToDate,
  getToday,
  type CalendarProps,
  type CalendarDate,
  type WeekDay,
  type PageBehavior,
  type WeekdayStyle,
} from './components/Calendar/Calendar';

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
