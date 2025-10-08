# Calendar

A calendar component for selecting dates with month/year navigation, min/max ranges, and unavailable dates support.

---

## Installation

```bash
npm install react-native-heroui
```

## Import

```tsx
import { Calendar, type CalendarDate } from 'react-native-heroui';
```

## Usage

### Basic Example

```tsx
import { Calendar, getToday } from 'react-native-heroui';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(getToday());

  return <Calendar value={selectedDate} onChange={setSelectedDate} />;
}
```

### Uncontrolled (Default Value)

```tsx
import { getToday } from 'react-native-heroui';

<Calendar defaultValue={getToday()} />;
```

### Disabled

```tsx
<Calendar isDisabled />
```

### Read Only

```tsx
<Calendar value={selectedDate} onChange={setSelectedDate} isReadOnly />
```

### Min Date Value

Only allow selecting dates after today.

```tsx
import { getToday } from 'react-native-heroui';

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  minValue={getToday()}
/>;
```

### Max Date Value

Only allow selecting dates before today.

```tsx
import { getToday } from 'react-native-heroui';

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  maxValue={getToday()}
/>;
```

### Unavailable Dates

Mark weekends as unavailable.

```tsx
const isWeekend = (date: CalendarDate): boolean => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const day = jsDate.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  isDateUnavailable={isWeekend}
/>;
```

### Invalid Date

Show validation error for invalid selections.

```tsx
const isWeekday = (date: CalendarDate): boolean => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const day = jsDate.getDay();
  return day !== 0 && day !== 6;
};

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  isInvalid={selectedDate && !isWeekday(selectedDate)}
  errorMessage="Please select a weekday"
  showHelper
/>;
```

### With Presets (Top/Bottom Content)

```tsx
import { View, Button } from 'react-native';

const today = getToday();
const tomorrow = {
  ...today,
  day: today.day + 1,
};

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  topContent={
    <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
      <Button size="sm" onPress={() => setSelectedDate(today)}>
        Today
      </Button>
      <Button size="sm" onPress={() => setSelectedDate(tomorrow)}>
        Tomorrow
      </Button>
    </View>
  }
/>;
```

### Custom First Day of Week

```tsx
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  firstDayOfWeek="mon"
/>
```

### Weekday Style

```tsx
<Calendar weekdayStyle="narrow" />  {/* S M T W T F S */}
<Calendar weekdayStyle="short" />   {/* Sun Mon Tue... */}
<Calendar weekdayStyle="long" />    {/* Sunday Monday... */}
```

### With Shadow

```tsx
<Calendar value={selectedDate} onChange={setSelectedDate} showShadow />
```

### Hide Disabled Dates

```tsx
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  minValue={getToday()}
  hideDisabledDates
/>
```

---

## API Reference

### Calendar Props

| Prop                      | Type                                                          | Default     | Description                          |
| ------------------------- | ------------------------------------------------------------- | ----------- | ------------------------------------ |
| `value`                   | `CalendarDate \| null`                                        | -           | Selected date (controlled)           |
| `defaultValue`            | `CalendarDate \| null`                                        | -           | Default selected date (uncontrolled) |
| `focusedValue`            | `CalendarDate`                                                | -           | Focused date (controlled)            |
| `defaultFocusedValue`     | `CalendarDate`                                                | -           | Default focused date                 |
| `minValue`                | `CalendarDate`                                                | -           | Minimum selectable date              |
| `maxValue`                | `CalendarDate`                                                | -           | Maximum selectable date              |
| `visibleMonths`           | `number`                                                      | `1`         | Number of months to display (1-3)    |
| `firstDayOfWeek`          | `'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `'sun'`     | First day of the week                |
| `pageBehavior`            | `'single' \| 'visible'`                                       | `'visible'` | Page navigation behavior             |
| `weekdayStyle`            | `'narrow' \| 'short' \| 'long'`                               | `'narrow'`  | Weekday label style                  |
| `isDisabled`              | `boolean`                                                     | `false`     | Whether calendar is disabled         |
| `isReadOnly`              | `boolean`                                                     | `false`     | Whether calendar is read-only        |
| `isInvalid`               | `boolean`                                                     | `false`     | Whether selection is invalid         |
| `showMonthAndYearPickers` | `boolean`                                                     | `false`     | Show month/year pickers              |
| `hideDisabledDates`       | `boolean`                                                     | `false`     | Hide disabled dates                  |
| `disableAnimation`        | `boolean`                                                     | `false`     | Disable animations                   |
| `showHelper`              | `boolean`                                                     | `false`     | Show helper/error message            |
| `showShadow`              | `boolean`                                                     | `false`     | Show shadow                          |
| `topContent`              | `ReactNode`                                                   | -           | Content above calendar               |
| `bottomContent`           | `ReactNode`                                                   | -           | Content below calendar               |
| `errorMessage`            | `ReactNode \| ((isInvalid: boolean) => ReactNode)`            | -           | Error message                        |
| `isDateUnavailable`       | `(date: CalendarDate) => boolean`                             | -           | Check if date is unavailable         |
| `style`                   | `StyleProp<ViewStyle>`                                        | -           | Custom container style               |
| `classNames`              | `CalendarClassNames`                                          | -           | Custom styles for slots              |

### Calendar Events

| Prop            | Type                                   | Description               |
| --------------- | -------------------------------------- | ------------------------- |
| `onChange`      | `(date: CalendarDate \| null) => void` | Called when date changes  |
| `onFocusChange` | `(date: CalendarDate) => void`         | Called when focus changes |

### CalendarDate Type

```tsx
type CalendarDate = {
  year: number;
  month: number; // 1-12 (January = 1)
  day: number;
};
```

### Helper Functions

```tsx
// Convert Date to CalendarDate
import { dateToCalendarDate } from 'react-native-heroui';
const calDate = dateToCalendarDate(new Date());

// Convert CalendarDate to Date
import { calendarDateToDate } from 'react-native-heroui';
const jsDate = calendarDateToDate({ year: 2025, month: 10, day: 8 });

// Get today's date as CalendarDate
import { getToday } from 'react-native-heroui';
const today = getToday();
```

---

## Accessibility

- ✅ Each cell has `accessibilityRole="button"`
- ✅ Selected state announced via `accessibilityState.selected`
- ✅ Disabled dates have `accessibilityState.disabled`
- ✅ Dates announced as "Month Day, Year"
- ✅ Navigation buttons have clear labels

---

## Examples

### Date Range with Min/Max

```tsx
import React, { useState } from 'react';
import { Calendar, getToday, type CalendarDate } from 'react-native-heroui';

export default function DateRangeExample() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const today = getToday();

  // Allow dates from today to 30 days in the future
  const maxDate: CalendarDate = {
    ...today,
    day: today.day + 30,
  };

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      minValue={today}
      maxValue={maxDate}
      showHelper
      errorMessage={
        selectedDate
          ? `Selected: ${selectedDate.month}/${selectedDate.day}/${selectedDate.year}`
          : 'Please select a date'
      }
    />
  );
}
```

### Booking Calendar (Block Booked Dates)

```tsx
import React, { useState } from 'react';
import { Calendar, type CalendarDate } from 'react-native-heroui';

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  // Example: Already booked dates
  const bookedDates = [
    { year: 2025, month: 10, day: 15 },
    { year: 2025, month: 10, day: 16 },
    { year: 2025, month: 10, day: 20 },
  ];

  const isBooked = (date: CalendarDate): boolean => {
    return bookedDates.some(
      (booked) =>
        booked.year === date.year &&
        booked.month === date.month &&
        booked.day === date.day
    );
  };

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      isDateUnavailable={isBooked}
      minValue={getToday()}
    />
  );
}
```

### Calendar with Presets

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Calendar,
  Button,
  getToday,
  type CalendarDate,
} from 'react-native-heroui';

export default function CalendarWithPresets() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  const today = getToday();
  const nextWeek = { ...today, day: today.day + 7 };
  const nextMonth = { ...today, month: today.month + 1 };

  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      topContent={
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setSelectedDate(today)}
          >
            Today
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setSelectedDate(nextWeek)}
          >
            Next Week
          </Button>
          <Button
            size="sm"
            variant="outline"
            onPress={() => setSelectedDate(nextMonth)}
          >
            Next Month
          </Button>
        </View>
      }
      bottomContent={
        selectedDate && (
          <Text style={{ textAlign: 'center', marginTop: 12 }}>
            Selected: {selectedDate.month}/{selectedDate.day}/
            {selectedDate.year}
          </Text>
        )
      }
    />
  );
}
```

### Weekday-Only Calendar

```tsx
const isWeekend = (date: CalendarDate): boolean => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const day = jsDate.getDay();
  return day === 0 || day === 6;
};

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  isDateUnavailable={isWeekend}
  errorMessage="Only weekdays can be selected"
  isInvalid={selectedDate && isWeekend(selectedDate)}
  showHelper
/>;
```

### Complete Example with Validation

```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Calendar,
  Button,
  HeroUIProvider,
  getToday,
  type CalendarDate,
} from 'react-native-heroui';

function CalendarDemo() {
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const today = getToday();

  const isWeekend = (date: CalendarDate): boolean => {
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const day = jsDate.getDay();
    return day === 0 || day === 6;
  };

  const handleConfirm = () => {
    if (selectedDate) {
      console.log('Confirmed:', selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date</Text>

      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        minValue={today}
        isDateUnavailable={isWeekend}
        showShadow
        showHelper
        errorMessage={
          selectedDate && isWeekend(selectedDate)
            ? 'Weekends are not available'
            : undefined
        }
        isInvalid={selectedDate ? isWeekend(selectedDate) : false}
        topContent={
          <View style={styles.presets}>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setSelectedDate(today)}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant="outline"
              onPress={() => setSelectedDate({ ...today, day: today.day + 1 })}
            >
              Tomorrow
            </Button>
          </View>
        }
        bottomContent={
          selectedDate &&
          !isWeekend(selectedDate) && (
            <Button
              colorScheme="primary"
              fullWidth
              onPress={handleConfirm}
              style={{ marginTop: 12 }}
            >
              Confirm Selection
            </Button>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  presets: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
});

export default function App() {
  return (
    <HeroUIProvider>
      <CalendarDemo />
    </HeroUIProvider>
  );
}
```

---

## Helper Functions

### getToday()

Returns today's date as a CalendarDate.

```tsx
import { getToday } from 'react-native-heroui';

const today = getToday();
// { year: 2025, month: 10, day: 8 }
```

### dateToCalendarDate(date: Date)

Convert JavaScript Date to CalendarDate.

```tsx
import { dateToCalendarDate } from 'react-native-heroui';

const jsDate = new Date();
const calDate = dateToCalendarDate(jsDate);
```

### calendarDateToDate(calendarDate: CalendarDate)

Convert CalendarDate to JavaScript Date.

```tsx
import { calendarDateToDate } from 'react-native-heroui';

const calDate = { year: 2025, month: 10, day: 8 };
const jsDate = calendarDateToDate(calDate);
```

---

## Custom Styling

```tsx
<Calendar
  classNames={{
    base: { backgroundColor: '#f5f5f5' },
    title: { color: '#0066cc', fontSize: 20 },
    cellButton: { borderRadius: 8 },
    gridHeaderCell: { color: '#666' },
  }}
/>
```

---

## Accessibility

- ✅ `accessibilityRole="button"` on date cells
- ✅ Date announced as "Month Day, Year"
- ✅ Selected state indicated
- ✅ Disabled state indicated
- ✅ Navigation buttons labeled
- ✅ Screen reader friendly

---

## TypeScript

```tsx
import type {
  CalendarProps,
  CalendarDate,
  WeekDay,
  PageBehavior,
  WeekdayStyle,
} from 'react-native-heroui';

// Create a date
const date: CalendarDate = {
  year: 2025,
  month: 10,
  day: 8,
};

// Check if weekend
const isWeekend = (date: CalendarDate): boolean => {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  return jsDate.getDay() === 0 || jsDate.getDay() === 6;
};
```

---

## Common Use Cases

### Event Calendar

```tsx
const eventDates = [
  { year: 2025, month: 10, day: 15 },
  { year: 2025, month: 10, day: 22 },
];

const hasEvent = (date: CalendarDate): boolean => {
  return eventDates.some(
    (e) => e.year === date.year && e.month === date.month && e.day === date.day
  );
};

<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  // Highlight event dates by making them "unavailable" with custom styling
/>;
```

### Date Range Picker (Future Enhancement)

For date ranges, you can maintain two Calendar instances or wait for RangeCalendar component.

---

## Limitations

**React Native Specific:**

- No keyboard navigation (mobile touch-based)
- Single month view recommended for mobile
- International calendars not yet supported
- Month/year pickers simplified for mobile

**Planned Enhancements:**

- Range selection
- International calendar systems
- Enhanced month/year pickers
- Multi-month mobile layouts

---

Built with ❤️ for React Native
