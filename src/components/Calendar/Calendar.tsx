import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewProps,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export type CalendarDate = {
  year: number;
  month: number; // 1-12
  day: number;
};

export type WeekDay = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';
export type PageBehavior = 'single' | 'visible';
export type WeekdayStyle = 'narrow' | 'short' | 'long';

export interface CalendarProps extends Omit<ViewProps, 'style'> {
  /** Selected date value (controlled) */
  value?: CalendarDate | null;
  /** Default selected date (uncontrolled) */
  defaultValue?: CalendarDate | null;
  /** Focused date value (controlled) */
  focusedValue?: CalendarDate;
  /** Default focused date */
  defaultFocusedValue?: CalendarDate;
  /** Minimum selectable date */
  minValue?: CalendarDate;
  /** Maximum selectable date */
  maxValue?: CalendarDate;
  /** Number of months to display (1-3) */
  visibleMonths?: number;
  /** First day of the week */
  firstDayOfWeek?: WeekDay;
  /** Page behavior when navigating */
  pageBehavior?: PageBehavior;
  /** Weekday display style */
  weekdayStyle?: WeekdayStyle;
  /** Whether calendar is disabled */
  isDisabled?: boolean;
  /** Whether calendar is read-only */
  isReadOnly?: boolean;
  /** Whether selection is invalid */
  isInvalid?: boolean;
  /** Show month and year pickers */
  showMonthAndYearPickers?: boolean;
  /** Hide disabled dates */
  hideDisabledDates?: boolean;
  /** Disable animations */
  disableAnimation?: boolean;
  /** Show helper text */
  showHelper?: boolean;
  /** Show shadow */
  showShadow?: boolean;
  /** Top content */
  topContent?: React.ReactNode;
  /** Bottom content */
  bottomContent?: React.ReactNode;
  /** Error message */
  errorMessage?: React.ReactNode | ((isInvalid: boolean) => React.ReactNode);
  /** Check if date is unavailable */
  isDateUnavailable?: (date: CalendarDate) => boolean;
  /** Custom style */
  style?: StyleProp<ViewStyle>;
  /** Custom class names for slots */
  classNames?: {
    base?: StyleProp<ViewStyle>;
    prevButton?: StyleProp<ViewStyle>;
    nextButton?: StyleProp<ViewStyle>;
    headerWrapper?: StyleProp<ViewStyle>;
    header?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
    gridWrapper?: StyleProp<ViewStyle>;
    grid?: StyleProp<ViewStyle>;
    gridHeader?: StyleProp<ViewStyle>;
    gridHeaderRow?: StyleProp<ViewStyle>;
    gridHeaderCell?: StyleProp<TextStyle>;
    gridBody?: StyleProp<ViewStyle>;
    gridBodyRow?: StyleProp<ViewStyle>;
    cell?: StyleProp<ViewStyle>;
    cellButton?: StyleProp<ViewStyle>;
    helperWrapper?: StyleProp<ViewStyle>;
    errorMessage?: StyleProp<TextStyle>;
  };
  /** Change handler */
  onChange?: (date: CalendarDate | null) => void;
  /** Focus change handler */
  onFocusChange?: (date: CalendarDate) => void;
}

const WEEKDAY_LABELS = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
};

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month - 1, 1).getDay();
};

const isSameDate = (
  date1: CalendarDate | null,
  date2: CalendarDate | null
): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.year === date2.year &&
    date1.month === date2.month &&
    date1.day === date2.day
  );
};

const isDateBefore = (date1: CalendarDate, date2: CalendarDate): boolean => {
  if (date1.year < date2.year) return true;
  if (date1.year > date2.year) return false;
  if (date1.month < date2.month) return true;
  if (date1.month > date2.month) return false;
  return date1.day < date2.day;
};

const isDateAfter = (date1: CalendarDate, date2: CalendarDate): boolean => {
  if (date1.year > date2.year) return true;
  if (date1.year < date2.year) return false;
  if (date1.month > date2.month) return true;
  if (date1.month < date2.month) return false;
  return date1.day > date2.day;
};

const getTodayDate = (): CalendarDate => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
};

export const Calendar = React.forwardRef<View, CalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      focusedValue: controlledFocusedValue,
      defaultFocusedValue,
      minValue,
      maxValue,
      visibleMonths = 1,
      firstDayOfWeek = 'sun',
      pageBehavior = 'visible',
      weekdayStyle = 'narrow',
      isDisabled = false,
      isReadOnly = false,
      isInvalid = false,
      showMonthAndYearPickers = false,
      hideDisabledDates = false,
      disableAnimation = false,
      showHelper = false,
      showShadow = false,
      topContent,
      bottomContent,
      errorMessage,
      isDateUnavailable,
      style,
      classNames,
      onChange,
      onFocusChange,
      ...viewProps
    },
    ref
  ) => {
    const { theme } = useTheme();

    // State management
    const [internalValue, setInternalValue] = useState<CalendarDate | null>(
      defaultValue || null
    );
    const [currentMonth, setCurrentMonth] = useState(
      controlledFocusedValue || defaultFocusedValue || getTodayDate()
    );

    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : internalValue;

    // Generate calendar grid
    const generateCalendarDays = (year: number, month: number) => {
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);

      // Adjust for custom first day of week
      const firstDayOffset = firstDayOfWeek === 'mon' ? 1 : 0;
      const adjustedFirstDay = (firstDay - firstDayOffset + 7) % 7;

      const days: (CalendarDate | null)[] = [];

      // Add empty cells for days before month starts
      for (let i = 0; i < adjustedFirstDay; i++) {
        days.push(null);
      }

      // Add all days in month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push({ year, month, day });
      }

      return days;
    };

    const calendarDays = useMemo(
      () => generateCalendarDays(currentMonth.year, currentMonth.month),
      [currentMonth.year, currentMonth.month]
    );

    // Weekday labels
    const weekdayLabels = useMemo(() => {
      const labels = WEEKDAY_LABELS[weekdayStyle];
      if (firstDayOfWeek === 'mon') {
        return [...labels.slice(1), labels[0]];
      }
      return labels;
    }, [weekdayStyle, firstDayOfWeek]);

    // Navigation
    const goToPreviousMonth = () => {
      const increment = pageBehavior === 'single' ? 1 : visibleMonths;
      setCurrentMonth((prev) => {
        if (prev.month - increment < 1) {
          return {
            year: prev.year - 1,
            month: 12 - (increment - prev.month),
            day: 1,
          };
        }
        return { ...prev, month: prev.month - increment };
      });
    };

    const goToNextMonth = () => {
      const increment = pageBehavior === 'single' ? 1 : visibleMonths;
      setCurrentMonth((prev) => {
        if (prev.month + increment > 12) {
          return {
            year: prev.year + 1,
            month: prev.month + increment - 12,
            day: 1,
          };
        }
        return { ...prev, month: prev.month + increment };
      });
    };

    // Date selection
    const handleDateSelect = (date: CalendarDate) => {
      if (isDisabled || isReadOnly) return;

      // Check if date is disabled
      if (minValue && isDateBefore(date, minValue)) return;
      if (maxValue && isDateAfter(date, maxValue)) return;
      if (isDateUnavailable?.(date)) return;

      if (!isControlled) {
        setInternalValue(date);
      }
      onChange?.(date);
      onFocusChange?.(date);
    };

    // Check if date is disabled
    const isDateDisabled = (date: CalendarDate): boolean => {
      if (minValue && isDateBefore(date, minValue)) return true;
      if (maxValue && isDateAfter(date, maxValue)) return true;
      return false;
    };

    const styles = StyleSheet.create({
      base: {
        backgroundColor: theme.colors.content1,
        borderRadius: theme.borderRadius['rounded-large'],
        padding: theme.spacing['unit-4'],
        ...(showShadow && theme.shadows['shadow-md']),
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: theme.spacing['unit-4'],
      },
      title: {
        fontSize: theme.typography.fontSizes['text-large'],
        fontWeight: theme.typography.fontWeights.semibold,
        color: theme.colors.foreground,
      },
      navButton: {
        padding: theme.spacing['unit-2'],
        borderRadius: theme.borderRadius['rounded-medium'],
        backgroundColor: theme.colors['default-100'],
      },
      navButtonText: {
        fontSize: 18,
        color: theme.colors.foreground,
        fontWeight: 'bold',
      },
      navButtonDisabled: {
        opacity: 0.4,
      },
      gridWrapper: {
        marginTop: theme.spacing['unit-2'],
      },
      gridHeader: {
        flexDirection: 'row',
        marginBottom: theme.spacing['unit-2'],
      },
      gridHeaderCell: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing['unit-2'],
      },
      gridHeaderText: {
        fontSize: theme.typography.fontSizes['text-small'],
        fontWeight: theme.typography.fontWeights.medium,
        color: theme.colors['default-500'],
      },
      gridBody: {
        gap: theme.spacing['unit-1'],
      },
      gridBodyRow: {
        flexDirection: 'row',
        gap: theme.spacing['unit-1'],
      },
      cell: {
        flex: 1,
        aspectRatio: 1,
      },
      cellButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius['rounded-small'],
        backgroundColor: 'transparent',
      },
      cellButtonText: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors.foreground,
      },
      cellSelected: {
        backgroundColor: theme.colors.primary,
      },
      cellSelectedText: {
        color: '#ffffff',
        fontWeight: theme.typography.fontWeights.semibold,
      },
      cellToday: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
      cellDisabled: {
        opacity: 0.3,
      },
      cellUnavailable: {
        backgroundColor: theme.colors['danger-50'],
      },
      cellUnavailableText: {
        color: theme.colors.danger,
        textDecorationLine: 'line-through',
      },
      cellPressed: {
        backgroundColor: theme.colors['default-100'],
      },
      helperWrapper: {
        marginTop: theme.spacing['unit-2'],
      },
      errorMessage: {
        fontSize: theme.typography.fontSizes['text-small'],
        color: theme.colors.danger,
        marginTop: theme.spacing['unit-1'],
      },
      topContent: {
        marginBottom: theme.spacing['unit-3'],
      },
      bottomContent: {
        marginTop: theme.spacing['unit-3'],
      },
    });

    const today = getTodayDate();

    const renderDay = (date: CalendarDate | null, index: number) => {
      if (!date) {
        return <View key={`empty-${index}`} style={styles.cell} />;
      }

      const isSelected = isSameDate(date, selectedDate);
      const isToday = isSameDate(date, today);
      const isDisabled = isDateDisabled(date);
      const isUnavailable = isDateUnavailable?.(date) ?? false;
      const shouldHide = hideDisabledDates && (isDisabled || isUnavailable);

      if (shouldHide) {
        return <View key={`hidden-${index}`} style={styles.cell} />;
      }

      return (
        <View
          key={`${date.year}-${date.month}-${date.day}`}
          style={styles.cell}
        >
          <Pressable
            onPress={() => handleDateSelect(date)}
            disabled={isDisabled || isUnavailable || isDisabled || isReadOnly}
            style={({ pressed }) => [
              styles.cellButton,
              classNames?.cellButton,
              isSelected && styles.cellSelected,
              isToday && !isSelected && styles.cellToday,
              (isDisabled || isUnavailable) && styles.cellDisabled,
              isUnavailable && !isDisabled && styles.cellUnavailable,
              pressed && !isSelected && styles.cellPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${MONTH_NAMES[date.month - 1]} ${date.day}, ${date.year}`}
            accessibilityState={{
              selected: isSelected,
              disabled: isDisabled || isUnavailable,
            }}
          >
            <Text
              style={[
                styles.cellButtonText,
                isSelected && styles.cellSelectedText,
                isUnavailable && !isDisabled && styles.cellUnavailableText,
              ]}
            >
              {date.day}
            </Text>
          </Pressable>
        </View>
      );
    };

    const renderWeekdayHeader = () => (
      <View style={[styles.gridHeader, classNames?.gridHeader]}>
        {weekdayLabels.map((label, index) => (
          <View
            key={`weekday-${index}`}
            style={[styles.gridHeaderCell, classNames?.gridHeaderCell]}
          >
            <Text style={[styles.gridHeaderText, classNames?.gridHeaderCell]}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    );

    const renderCalendarGrid = () => {
      const weeks: (CalendarDate | null)[][] = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
      }

      return (
        <View style={[styles.gridWrapper, classNames?.gridWrapper]}>
          {renderWeekdayHeader()}
          <View style={[styles.gridBody, classNames?.gridBody]}>
            {weeks.map((week, weekIndex) => (
              <View
                key={`week-${weekIndex}`}
                style={[styles.gridBodyRow, classNames?.gridBodyRow]}
              >
                {week.map((day, dayIndex) =>
                  renderDay(day, weekIndex * 7 + dayIndex)
                )}
              </View>
            ))}
          </View>
        </View>
      );
    };

    const errorMessageContent =
      typeof errorMessage === 'function'
        ? errorMessage(isInvalid)
        : errorMessage;

    return (
      <View
        ref={ref}
        style={[styles.base, classNames?.base, style]}
        {...viewProps}
      >
        {topContent && (
          <View style={[styles.topContent, classNames?.helperWrapper]}>
            {topContent}
          </View>
        )}

        <View style={[styles.header, classNames?.headerWrapper]}>
          <Pressable
            onPress={goToPreviousMonth}
            style={[styles.navButton, classNames?.prevButton]}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityLabel="Previous month"
          >
            <Text style={styles.navButtonText}>‹</Text>
          </Pressable>

          <Text style={[styles.title, classNames?.title]}>
            {MONTH_NAMES[currentMonth.month - 1]} {currentMonth.year}
          </Text>

          <Pressable
            onPress={goToNextMonth}
            style={[styles.navButton, classNames?.nextButton]}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityLabel="Next month"
          >
            <Text style={styles.navButtonText}>›</Text>
          </Pressable>
        </View>

        {renderCalendarGrid()}

        {showHelper && errorMessageContent && (
          <View style={[styles.helperWrapper, classNames?.helperWrapper]}>
            <Text style={[styles.errorMessage, classNames?.errorMessage]}>
              {errorMessageContent}
            </Text>
          </View>
        )}

        {bottomContent && (
          <View style={[styles.bottomContent, classNames?.helperWrapper]}>
            {bottomContent}
          </View>
        )}
      </View>
    );
  }
);

Calendar.displayName = 'Calendar';

// Helper function to create a CalendarDate from Date object
export const dateToCalendarDate = (date: Date): CalendarDate => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

// Helper function to convert CalendarDate to Date object
export const calendarDateToDate = (calendarDate: CalendarDate): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
};

// Helper to get today as CalendarDate
export const getToday = getTodayDate;
