import React, { useState } from 'react';
import { View, Alert, TouchableOpacity, Linking, Dimensions } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Box from '../../components/Box';
import Calendar from '../../components/ui/Calendar';
import TableList, { TableColumn, TableData } from '../../components/ui/TableList';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import { DateData } from 'react-native-calendars';
import Typography from '../../components/Typography';
import { MESSAGES, TABLE_COLUMNS_COLOR } from '../../constants/enum';
import useApi from '../../hooks/useApi';
import { Marquee } from '@animatereactnative/marquee';

const sampleTableData: TableData[] = [
  { id: 1, time: '09:30 AM', a: 42, b: 78, c: 12 },
  { id: 2, time: '10:15 AM', a: 56, b: 34, c: 89 },
  { id: 3, time: '11:45 AM', a: 91, b: 67, c: 45 },
  { id: 4, time: '01:30 PM', a: 23, b: 88, c: 76 },
  { id: 5, time: '03:00 PM', a: 77, b: 12, c: 39 },
  { id: 6, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 7, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 8, time: '04:45 PM', a: 15, b: 29, c: 51 },
  { id: 12, time: '09:30 AM', a: 42, b: 78, c: 12 },
  { id: 22, time: '10:15 AM', a: 56, b: 34, c: 89 },
  { id: 34, time: '11:45 AM', a: 91, b: 67, c: 45 },
  { id: 47, time: '01:30 PM', a: 23, b: 88, c: 76 },
  { id: 57, time: '03:00 PM', a: 77, b: 12, c: 39 },
  { id: 62, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 76, time: '04:45 PM', a: 65, b: 29, c: 51 },
  { id: 83, time: '05:45 PM', a: 15, b: 29, c: 51 },
];

const ProfileScreen = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const screenHeight = Dimensions.get('window').height;
  const tableHeight = screenHeight * 0.67;
  
  const openWhatsApp = async (phoneNumber: string) => {
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        Alert.alert(
          "WhatsApp Not Installed",
          "WhatsApp is not installed on your device"
        );
      }
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
    }
  };
  
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

  const tableColumns: TableColumn[] = [
    { id: 'time', label: 'Time', sortable: true, widthRem: 6,
      renderCell: (value) => (
        <Typography variant="body2" color={colors.text} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
    },
    { 
      id: 'a', 
      label: 'AA',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.A} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.A
    },    
    { 
      id: 'b', 
      label: 'BB',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.B} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.B
    },
    { 
      id: 'c', 
      label: 'CC',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.C} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.C
    },
  ];

  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-start gap-1 p-2">
        <TouchableOpacity 
          onPress={() => openWhatsApp('918054116220')} 
          activeOpacity={0.7}
          style={{ width: '100%' }}
        >
          <Box
            bgColor={colors.primary}
            padding={0}
            style={{ paddingVertical: 4, paddingHorizontal: 0 }}
          >
            <Marquee spacing={20} speed={1}>
              <Typography variant="subtitle2" color={colors.text}>{MESSAGES.WHATS_APP_TEXT}</Typography>
            </Marquee>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openWhatsApp('918054116220')}
          activeOpacity={0.7}
          style={{ width: '100%' }}
        >
          <Box
            bgColor={colors.primary}
            padding={0}
            style={{ paddingVertical: 4, paddingHorizontal: 0, marginTop: 10 }}
          >
            <Marquee spacing={20} speed={1}>
              <Typography variant="subtitle2" color={colors.text}>{MESSAGES.URDU_TEXT}</Typography>
            </Marquee>
          </Box>
        </TouchableOpacity>
       
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            initialDate={new Date().toISOString().split('T')[0]}
            className="w-full"
          />
      
          <TableList
            columns={tableColumns}
            data={sampleTableData}
            className="w-full"
            height={tableHeight}
          />
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;


