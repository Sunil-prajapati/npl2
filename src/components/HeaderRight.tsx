import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderRight = () => {
  return (
    <View className='flex flex-row justify-between px-[5%] w-[60%]'>
      <TouchableOpacity className="px-2" onPress={() => console.log('Refresh')}>
        <Icon name="refresh" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Share')}>
        <Icon name="share-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Notification')}>
        <Icon name="notifications-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity className="px-2" onPress={() => console.log('Options')}>
        <Icon name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;
