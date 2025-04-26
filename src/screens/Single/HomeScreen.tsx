import React, { useEffect } from 'react';
import { View, Alert, TouchableOpacity, Linking, Dimensions } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Box from '../../components/Box';
import SharedCalendar from '../../components/SharedCalendar';
import TableList from '../../components/ui/TableList';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../../components/Typography';
import { MESSAGES, TABLE_COLUMNS_COLOR } from '../../constants/enum';
import useApi from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../constants/ApiEndPoints';
import { Marquee } from '@animatereactnative/marquee';
import { isSameAsCurrentDate } from '../../helper/helper';
import { useDateContext } from '../../context/DateContext';

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





