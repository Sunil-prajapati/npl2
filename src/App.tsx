import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './context/ThemeContext';
import { NetworkProvider } from './context/NetworkContext';
import { DateProvider } from './context/DateContext';
import * as RNLocalize from 'react-native-localize';
import { refreshRegion } from './utils/regionUtils';
import "./global.css";
import './gesture-handler';

enableScreens();

const App: React.FC = () => {
  useEffect(() => {
    const localizationListener = RNLocalize.addEventListener('change', () => {
      refreshRegion();
    });
    return () => {
      localizationListener.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <DateProvider>
          <NetworkProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </NetworkProvider>
        </DateProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
