import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './src/context/ThemeContext';
import "./global.css";
import './gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import { useNotification } from './src/hooks/useNotification';
import messaging from '@react-native-firebase/messaging';

enableScreens();
if (__DEV__) {
  require("./ReactotronConfig");
}
const App: React.FC = () => {
  useEffect(() => {
    // SplashScreen.hide();
    
    // Foreground message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', JSON.stringify(remoteMessage));
      // Handle the notification display here
    });

    return () => unsubscribe();
  }, []);

  useNotification()

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
