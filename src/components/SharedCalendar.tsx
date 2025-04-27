import React from 'react';
import { View } from 'react-native';
import Calendar from './ui/Calendar';
import { DateData } from 'react-native-calendars';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import { useDateContext } from '../context/DateContext';

interface SharedCalendarProps {
  className?: string;
}

const SharedCalendar: React.FC<SharedCalendarProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const { selectedDate, setSelectedDate } = useDateContext();

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const markedDates = {
    ...(selectedDate ? { [selectedDate]: { selected: true } } : {}),
    '2024-06-15': { marked: true, dotColor: colors.dark },
    '2024-06-20': { marked: true, dotColor: 'red' },
    '2024-06-25': { marked: true, dotColor: 'green' },
  };

  return (
    <View className={className}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={markedDates}
        initialDate={new Date().toISOString().split('T')[0]}
        className="w-full"
      />
    </View>
  );
};

export default SharedCalendar;