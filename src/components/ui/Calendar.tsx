import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Calendar as RNCalendar, DateData, CalendarTheme } from 'react-native-calendars';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../Typography';


interface CalendarProps {
  onDayPress?: (day: DateData) => void;
  markedDates?: {
    [date: string]: {
      selected?: boolean;
      marked?: boolean;
      dotColor?: string;
      disabled?: boolean;
    };
  };
  initialDate?: string;
  minDate?: string;
  maxDate?: string;
  title?: string;
  className?: string;
  showControls?: boolean;
  onMonthChange?: (month: DateData) => void;
  headerStyle?: object;
}

const Calendar: React.FC<CalendarProps> = ({
  onDayPress,
  markedDates = {},
  initialDate,
  minDate,
  maxDate,
  title,
  className = '',
  showControls = true,
  onMonthChange,
  headerStyle = {},
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string | null>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    initialDate || today
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [localMarkedDates, setLocalMarkedDates] = useState(markedDates);
  
  // Calculate the first day of current year to use as minDate if not provided
  const currentYear = new Date().getFullYear();
  const firstDayOfCurrentYear = `${currentYear}-01-01`;
  const effectiveMinDate = minDate || firstDayOfCurrentYear;
  
  // Use today as the maxDate if not provided to prevent selecting future dates
  const effectiveMaxDate = maxDate || today;

  // Initialize with today's date selected
  useEffect(() => {
    // Create initial marked dates with today selected
    const initialMarkedDates = {
      ...markedDates,
      [today]: {
        ...(markedDates[today] || {}),
        selected: true,
      },
    };
    setLocalMarkedDates(initialMarkedDates);
    
    // Notify parent component if onDayPress is provided
    if (onDayPress) {
      const dayData: DateData = {
        dateString: today,
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        timestamp: new Date().getTime()
      };
      onDayPress(dayData);
    }
  }, []);

  const handleDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    
    // Create a new object with only the current selection
    const updatedMarkedDates = {};
    
    // Add any marked dates (dots) from props
    Object.keys(markedDates).forEach(date => {
      if (markedDates[date].marked) {
        updatedMarkedDates[date] = {
          ...markedDates[date],
          selected: date === dateString,
        };
      }
    });
    
    // Ensure the selected date is marked as selected
    updatedMarkedDates[dateString] = {
      ...(markedDates[dateString] || {}),
      selected: true,
    };
    
    setLocalMarkedDates(updatedMarkedDates);
    
    // Call the parent's onDayPress if provided
    if (onDayPress) {
      onDayPress(day);
    }
    
    // Close the calendar after selection
    setIsCalendarOpen(false);
  };

  const handleMonthChange = (month: DateData) => {
    setCurrentMonth(month.dateString);
    if (onMonthChange) {
      onMonthChange(month);
    }
  };

  // Define calendar theme based on app theme
  const calendarTheme: CalendarTheme = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    textSectionTitleColor: colors.text,
    selectedDayBackgroundColor: colors.dark,
    selectedDayTextColor: colors.light,
    todayTextColor: colors.dark,
    dayTextColor: colors.text,
    textDisabledColor: colors.inactiveIcon,
    dotColor: colors.dark,
    selectedDotColor: colors.light,
    arrowColor: colors.activeIcon,
    monthTextColor: colors.text,
    indicatorColor: colors.activeIcon,
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
  };

  // Custom header component with controls
  const renderHeader = (date: string) => {
    const dateObj = new Date(date);
    const monthName = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    
    return (
      <View style={[styles.customHeader, headerStyle]}>
        <Typography variant="subtitle1" color={colors.text}>
          {`${monthName} ${year}`}
        </Typography>
        
        {showControls && (
          <View style={styles.controls}>
            <TouchableOpacity 
              onPress={() => {
                setCurrentMonth(today);
                // Force calendar to update to today's month
                if (onMonthChange) {
                  onMonthChange({ dateString: today, day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear(), timestamp: new Date().getTime() });
                }
              }}
              style={styles.todayButton}
            >
              <Typography variant="button" color={colors.activeIcon}>
                Today
              </Typography>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  // Format the selected date for display
  const getDisplayDate = () => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return today ? new Date(today).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date';
  };

  return (
    <View className={`rounded-lg overflow-hidden ${className}`} style={styles.container}>
      {title && (
        <View style={styles.titleContainer}>
          <Typography variant="h6" color={colors.text}>
            {title}
          </Typography>
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.dateSelector}
        onPress={() => setIsCalendarOpen(!isCalendarOpen)}
      >
        <Typography variant="body1" color={colors.text}>
          {getDisplayDate()}
        </Typography>
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={isCalendarOpen}
        animationType="fade"
        onRequestClose={() => setIsCalendarOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsCalendarOpen(false)}
        >
          <View style={styles.calendarContainer}>
            <RNCalendar
              theme={calendarTheme}
              onDayPress={handleDayPress}
              markedDates={localMarkedDates}
              initialDate={initialDate || today}
              minDate={effectiveMinDate}
              maxDate={effectiveMaxDate}
              enableSwipeMonths={true}
              hideExtraDays={false}
              onMonthChange={handleMonthChange}
              renderHeader={renderHeader}
              current={currentMonth}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  customHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todayButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  dateSelector: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
});

export default Calendar;









