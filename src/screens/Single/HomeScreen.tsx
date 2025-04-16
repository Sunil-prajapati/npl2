import React, { useState, useEffect } from 'react';
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
import { API_ENDPOINTS } from '../../constants/ApiEndPoints';
import { Marquee } from '@animatereactnative/marquee';


const sampleTableData: TableData[] = [
  { id: 1, time: '09:30 AM', a: 4, b: 7, c: 1 },
  { id: 2, time: '10:15 AM', a: 5, b: 3, c: 8 },
  { id: 3, time: '11:45 AM', a: 9, b: 6, c: 4 },
  { id: 4, time: '01:30 PM', a: 2, b: 8, c: 7 },
  { id: 5, time: '03:00 PM', a: 7, b: 1, c: 3 },
  { id: 6, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 7, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 8, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 9, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 10, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 11, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 12, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 13, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 14, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 15, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 16, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 17, time: '10:15 AM', a: 5, b: 3, c: 8 },
  { id: 18, time: '11:45 AM', a: 9, b: 6, c: 4 },
  { id: 19, time: '01:30 PM', a: 2, b: 8, c: 7 },
  { id: 20, time: '03:00 PM', a: 7, b: 1, c: 3 },
  { id: 21, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 22, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 23, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 24, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 25, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 26, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 27, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 28, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 29, time: '04:45 PM', a: 1, b: 2, c: 5 },
  { id: 30, time: '04:45 PM', a: 6, b: 2, c: 5 },
  { id: 31, time: '08:50 PM', a: 1, b: 2, c: 5 },
];

const HomeScreen = () => {
  const { theme } = useTheme();
  // const { data, loading, error, sendData } = useApi();
  const colors = THEME_COLORS[theme];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const screenHeight = Dimensions.get('window').height;
  const tableHeight = screenHeight * 0.67;

  // useEffect(() => {
  //   sendData(API_ENDPOINTS.GET_SINGLE_DATA, { date: selectedDate }, false);
  // }, []);

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
  };


  const tableColumns: TableColumn[] = [
    {
      id: 'time', label: 'Time', sortable: true, widthRem: 6,
      renderCell: (value) => (
        <Typography variant="body2" color={colors.text} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
    },
    {
      id: 'a',
      label: 'A',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.A} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.A
    },
    {
      id: 'b',
      label: 'B',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.B} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.B
    },
    {
      id: 'c',
      label: 'C',
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

export default HomeScreen;



