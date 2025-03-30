import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import "./global.css";

enableScreens();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomTabNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;