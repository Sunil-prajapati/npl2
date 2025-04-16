import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { Alert, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { THEME_COLORS } from '../constants/ThemeColors';
import { useTheme } from './ThemeContext';
import { APP_SCREEN_NAME } from 'constants/AppScreenName';

interface NetworkContextType {
  isConnected: boolean | null;
  showNoNetworkScreen: () => void;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  const showNoNetworkScreen = () => {
    navigation.navigate(APP_SCREEN_NAME.NO_NETWORK);
  };

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      
      // Show toast when connection changes
      if (state.isConnected === false) {
        Toast.show({
          type: 'error',
          text1: 'No Internet Connection',
          text2: 'Please check your network settings',
          position: 'bottom',
          visibilityTime: 4000,
          autoHide: false,
          topOffset: 30,
          bottomOffset: 40,
          props: {
            onPress: showNoNetworkScreen
          }
        });
      } else if (state.isConnected === true) {
        Toast.hide();
      }
    });

    // Initial check
    NetInfo.fetch().then((state: NetInfoState) => {
      setIsConnected(state.isConnected);
      if (state.isConnected === false) {
        Alert.alert(
          "No Internet Connection",
          "You are currently offline. Some features may not be available.",
          [
            { text: "Dismiss", style: "cancel" },
            { text: "Network Settings", onPress: showNoNetworkScreen }
          ]
        );
      }
    });

    // Cleanup
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected, showNoNetworkScreen }}>
      {children}
      <Toast 
        config={{
          error: ({ text1, text2, props }) => (
            <TouchableOpacity 
              onPress={props.onPress}
              style={{
                height: 60,
                width: '90%',
                backgroundColor: colors.dark,
                borderRadius: 8,
                padding: 10,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>{text1}</Text>
              <Text style={{ color: colors.text }}>{text2}</Text>
            </TouchableOpacity>
          )
        }}
      />
    </NetworkContext.Provider>
  );
};

export const useNetwork = (): NetworkContextType => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};