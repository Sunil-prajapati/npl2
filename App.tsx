import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import "./global.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaView className='flex-1'>
        <View className='flex-1 bg-white items-center justify-center'>
          <Text className='text-black text-[26px] font-bold'>Nepal Global Lottery</Text>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

