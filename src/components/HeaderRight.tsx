import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import Options from './Options';
import useShare from '../hooks/useShare';

const HeaderRight = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [optionsVisible, setOptionsVisible] = useState(false);
  const { handleShare } = useShare();
  
  const toggleOptions = () => {
    setOptionsVisible(!optionsVisible);
  };
  
  const onSharePress = () => {
    handleShare({
      message: 'Check out NglGold app!',
      title: 'NglGold'
    });
  };
  
  return (
    <View className='flex flex-row justify-between px-[5%] w-[60%]'>
      <TouchableOpacity className="px-2" onPress={() => console.log('Refresh')}>
        <Icon name="refresh" size={24} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={onSharePress}>
        <Icon name="share-outline" size={24} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Notification')}>
        <Icon name="notifications-outline" size={24} color={colors.activeIcon} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={toggleOptions}>
        <Icon name="options-outline" size={24} color={colors.activeIcon} />
      </TouchableOpacity>
      
      <Options visible={optionsVisible} onClose={toggleOptions} />
    </View>
  );
};

export default HeaderRight;


