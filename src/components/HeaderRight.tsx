import React, { useState, useMemo } from 'react';
import { TouchableOpacity, View, Platform, Linking, PixelRatio, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import Options from './Options';
import useShare from '../hooks/useShare';
import useApi from '../hooks/useApi';
import { API_ENDPOINTS } from '../constants/ApiEndPoints';
import { useDateContext } from '../context/DateContext';
import { isSameAsCurrentDate } from '../helper/helper';

const HeaderRight = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { handleShare } = useShare();
  const { sendData } = useApi(API_ENDPOINTS.GET_SINGLE_DATA);
  const { selectedDate } = useDateContext();
  
  const getResponsiveIconSize = useMemo(() => {
    const baseSize = Platform.OS === 'ios' ? 24 : 20;
    return Math.round(baseSize * Dimensions.get('window').width / 375);
  }, []);
  
  const handleRefresh = () => {
    let date;
    if(selectedDate && !isSameAsCurrentDate(selectedDate)){
      date = selectedDate;
    } else {
      date = null;
    }
    sendData(API_ENDPOINTS.GET_SINGLE_DATA, { date: date }, false);
    sendData(API_ENDPOINTS.GET_DOUBLE_DATA, { date: date }, false);
  };
  
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  
  const onSharePress = () => {
    handleShare({
      message: 'Check out NPL2 app! https://play.google.com/store/apps/details?id=com.nplsilver',
      title: 'NPL 2'
    });
  };

  const openAppNotificationSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };
  
  return (
    <View className='flex flex-row justify-between'>
      <TouchableOpacity className="px-1" onPress={handleRefresh}>
        <Icon name="refresh" size={getResponsiveIconSize} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-1" onPress={onSharePress}>
        <Icon name="share-outline" size={getResponsiveIconSize} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-1" onPress={openAppNotificationSettings}>
        <Icon name="notifications-outline" size={getResponsiveIconSize} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-1" onPress={toggleOptions}>
        <Icon name="options-outline" size={getResponsiveIconSize} color={colors.activeIcon} />
      </TouchableOpacity>
      
      <Options visible={optionsVisible} onClose={toggleOptions} />
    </View>
  );
};

export default HeaderRight;








