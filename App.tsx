import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import "./global.css"
const App: React.FC = () => {
  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 bg-white items-center justify-center'>
        <Text className='text-black text-[26px] font-bold'>Nepal Global Lottery</Text>
      </View>
    </SafeAreaView>
  )
}

export default App
