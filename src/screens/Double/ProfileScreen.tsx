import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import SharedCalendar from '../../components/SharedCalendar';
import TableList, { TableColumn } from '../../components/ui/TableList';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../../components/Typography';
import {TABLE_COLUMNS_COLOR} from '../../constants/enum';
import useApi from '../../hooks/useApi';
import { API_ENDPOINTS } from '../../constants/ApiEndPoints';
import ErrorDisplay from '../../components/ui/ErrorDisplay';
import { isSameAsCurrentDate } from '../../helper/helper';
import { useDateContext } from '../../context/DateContext';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const ProfileScreen = () => {
  const { theme } = useTheme();
  const { data, loading, error, sendData } = useApi(API_ENDPOINTS.GET_DOUBLE_DATA);
  const colors = THEME_COLORS[theme];
  const { selectedDate } = useDateContext();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const availableHeight = Dimensions.get('window').height - headerHeight - tabBarHeight;

  const fetchData = async () => {
    let date;
    if (selectedDate && !isSameAsCurrentDate(selectedDate)) {
      date = selectedDate;
    } else {
      date = null;
    }
    await sendData(API_ENDPOINTS.GET_DOUBLE_DATA, { date }, false);
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
      id: 'aa',
      label: 'A',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.A} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.A
    },
    {
      id: 'bb',
      label: 'B',
      renderCell: (value) => (
        <Typography variant="body2" color={TABLE_COLUMNS_COLOR.B} style={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      ),
      headerTextColor: TABLE_COLUMNS_COLOR.B
    },
    {
      id: 'cc',
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
      <View className="items-center justify-start p-2">
        <SharedCalendar className="w-full" />
        {error ? (
          <ErrorDisplay
            error={error}
            onRetry={fetchData}
          />
        ) : (
          <TableList
            columns={tableColumns}
            data={data}
            className="w-full"
            loading={loading}
            height={availableHeight}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;







