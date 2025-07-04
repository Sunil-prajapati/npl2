import React, { ReactNode } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { THEME_TYPE } from '../constants/ThemeTypes';
import { THEME_COLORS } from '../constants/ThemeColors';

interface ScreenWrapperProps {
  children: ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  withPadding?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor,
  barStyle = 'dark-content',
  withPadding = true,
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  
  const bgColor = backgroundColor || (theme === THEME_TYPE.GOLD ? 'bg-gold-light' : 'bg-silver-light');
  
  return (
    <>
      <StatusBar 
        barStyle={barStyle} 
        backgroundColor={theme === THEME_TYPE.GOLD ? colors.light : colors.light} 
      />
      <SafeAreaView className={`flex-1 pb-4 ${bgColor}`}>
        <View className={` ${withPadding ? 'px-4' : ''}`}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;

