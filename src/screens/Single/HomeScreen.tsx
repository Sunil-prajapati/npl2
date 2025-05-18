import React, { useEffect } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Box from '../../components/Box';
import SharedCalendar from '../../components/SharedCalendar';
import TableList from '../../components/ui/TableList';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../../components/Typography';
import { MESSAGES, MOBILE_NUMBER, TABLE_COLUMNS_COLOR, WHATS_APP_MESSAGES } from '../../constants/enum';
import useApi from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../constants/ApiEndPoints';
import { Marquee } from '@animatereactnative/marquee';
import { isSameAsCurrentDate } from '../../helper/helper';
import { useDateContext } from '../../context/DateContext';
import { openWhatsApp } from '../../utils/whatsapp';

const HomeScreen = () => {
  const { theme } = useTheme();
  const { data, loading, error, sendData } = useApi(API_ENDPOINTS.GET_SINGLE_DATA);
  const colors = THEME_COLORS[theme];
  const { selectedDate } = useDateContext();
  const screenHeight = Dimensions.get('window').height;
  const tableHeight = screenHeight * 0.67;

  const fetchData = () => {
    let date;
    if(selectedDate && !isSameAsCurrentDate(selectedDate)){
      date = selectedDate;
    } else {
      date = null;
    }
    sendData(API_ENDPOINTS.GET_SINGLE_DATA, { date: date }, false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

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
          onPress={() => openWhatsApp(MOBILE_NUMBER.FIRST, WHATS_APP_MESSAGES.WANT_TO_PLAY)}
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
          onPress={() => openWhatsApp(MOBILE_NUMBER.FIRST, WHATS_APP_MESSAGES.WANT_TO_KNOW)}
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
        <SharedCalendar className="w-full" />
        {error ? (
          <ErrorDisplay 
            error={error}
            height={tableHeight}
            onRetry={fetchData}
          />
        ) : (
          <TableList
            columns={tableColumns}
            data={data}
            className="w-full"
            height={tableHeight}
            loading={loading}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default HomeScreen;






