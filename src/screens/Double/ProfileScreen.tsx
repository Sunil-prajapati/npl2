import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';

const ProfileScreen = () => (
  <ScreenWrapper>
    <View className="flex-1 items-center justify-center">
      <Text className="text-black text-lg">Double Screen</Text>
    </View>
  </ScreenWrapper>
);

export default ProfileScreen;