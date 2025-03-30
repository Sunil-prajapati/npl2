import React, { ReactNode } from 'react';
import { SafeAreaView, View, StatusBar, Platform } from 'react-native';

interface ScreenWrapperProps {
  children: ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  withPadding?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = 'white',
  barStyle = 'dark-content',
  withPadding = true,
}) => {
  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <SafeAreaView className={`flex-1 ${backgroundColor !== 'white' ? `bg-[${backgroundColor}]` : 'bg-white'}`}>
        <View 
          className={`flex-1 ${withPadding ? 'px-4' : ''}`}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;