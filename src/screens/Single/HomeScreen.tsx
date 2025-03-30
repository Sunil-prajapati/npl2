import React from 'react';
import { Text, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => (
  <ScreenWrapper>
    <View className="flex-1 items-center justify-center">
      <Text className="text-black text-lg">Single</Text>
      <Icon name="rocket" size={30} color="#900" />
    </View>
  </ScreenWrapper>
);

export default HomeScreen;