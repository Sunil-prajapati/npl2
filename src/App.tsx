import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { ThemeProvider } from './src/context/ThemeContext';
import { NetworkProvider } from './src/context/NetworkContext';
import * as RNLocalize from 'react-native-localize';
import { refreshRegion } from './src/utils/regionUtils';
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
        <NetworkProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </NetworkProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
