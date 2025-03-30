import React, { useState, useMemo } from 'react';
import { View, Alert } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Box from '../../components/Box';
import Calendar from '../../components/ui/Calendar';
import TableList, { TableColumn, TableData } from '../../components/ui/TableList';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import { DateData } from 'react-native-calendars';
import Typography from '../../components/Typography';
import { MESSAGES, TABLE_COLUMNS_COLOR } from '../../constants/enum';

// Sample data for the table
const sampleTableData: TableData[] = [
  { id: 1, time: '09:30 AM', a: 42, b: 78, c: 12 },
  { id: 2, time: '10:15 AM', a: 56, b: 34, c: 89 },
  { id: 3, time: '11:45 AM', a: 91, b: 67, c: 45 },
  { id: 4, time: '01:30 PM', a: 23, b: 88, c: 76 },
  { id: 5, time: '03:00 PM', a: 77, b: 12, c: 39 },
  { id: 6, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 7, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 8, time: '04:45 PM', a: 15, b: 29, c: 51 },
];

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

  // Define table columns
  const tableColumns: TableColumn[] = [
    { id: 'time', label: 'Time', sortable: true, widthRem: 6 },
    { 
      id: 'a', 
      label: 'A',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.A}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.A
    },    
    { 
      id: 'b', 
      label: 'B',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.B}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.B
    },
    { 
      id: 'c', 
      label: 'C',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.C}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.C
    },
  ];

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-start gap-6 p-4">
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
        
        <Box 
          bgColor={colors.light}
          style={{ width: '100%' }}
          padding={8}
        >
          <TableList
            columns={tableColumns}
            data={sampleTableData}
            className="w-full"
          />
        </Box>
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;









