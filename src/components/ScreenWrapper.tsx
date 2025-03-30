import React, { ReactNode } from 'react';
import { SafeAreaView, View, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';

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
  
  const bgColor = backgroundColor || (theme === 'gold' ? 'bg-gold-light' : 'bg-silver-light');
  
  return (
    <>
      <StatusBar 
        barStyle={barStyle} 
        backgroundColor={theme === 'gold' ? '#FFF6E0' : '#F5F5F5'} 
      />
      <SafeAreaView className={`flex-1 ${bgColor}`}>
        <View className={`flex-1 ${withPadding ? 'px-4' : ''}`}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;
