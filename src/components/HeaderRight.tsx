import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { THEME_TYPE } from '../constants/ThemeTypes';
import { THEME_COLORS } from '../constants/ThemeColors';

const HeaderRight = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = THEME_COLORS[theme];
  
  return (
    <View className='flex flex-row justify-between px-[5%] w-[60%]'>
      <TouchableOpacity className="px-2" onPress={() => console.log('Refresh')}>
        <Icon name="refresh" size={24} color={theme === THEME_TYPE.GOLD ? '#B8860B' : '#A9A9A9'} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Share')}>
        <Icon name="share-outline" size={24} color={theme === THEME_TYPE.GOLD ? '#B8860B' : '#A9A9A9'} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Notification')}>
        <Icon name="notifications-outline" size={24} color={theme === THEME_TYPE.GOLD ? '#B8860B' : '#A9A9A9'} />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={toggleTheme}>
        <Icon 
          name={theme === THEME_TYPE.GOLD ? 'sunny' : 'moon'} 
          size={24} 
          color={colors.activeIcon} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;


