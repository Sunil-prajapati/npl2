import React, { useState } from 'react';
import { View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Box from '../../components/Box';
import Calendar from '../../components/ui/Calendar';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import { DateData } from 'react-native-calendars';
import Typography from '../../components/Typography';
import { MESSAGES } from '../../constants/enum';

const HomeScreen = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  
  // Example marked dates
  const markedDates = {
    ...(selectedDate ? { [selectedDate]: { selected: true } } : {}),
    '2024-06-15': { marked: true, dotColor: colors.dark },
    '2024-06-20': { marked: true, dotColor: 'red' },
    '2024-06-25': { marked: true, dotColor: 'green' },
  };
  
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    console.log('Selected day:', day.dateString);
  };

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center gap-6 p-4">
        <Box bgColor={colors.dark}>
          <Typography variant="h6" color={colors.text}>
            {MESSAGES.WHATS_APP_TEXT}
          </Typography>
        </Box>
        <Box 
          bgColor={colors.light}
          style={{ width: '100%' }}
          padding={0}
        >
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            initialDate={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
        </Box>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;

