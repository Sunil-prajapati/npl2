import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import MonthlyChartScreen from '../screens/MonthlyChartScreen';
import NoNetworkScreen from '../screens/NoNetworkScreen';
import { APP_SCREEN_NAME } from '../constants/AppScreenName';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import { DateProvider } from '../context/DateContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  return (
    <NavigationContainer>
      <DateProvider>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: colors.headerBg },
            headerTintColor: colors.activeIcon,
          }}
        >
          <Stack.Screen 
            name="Main" 
            component={BottomTabNavigator} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name={APP_SCREEN_NAME.PRIVACY_POLICY}
            component={PrivacyPolicyScreen} 
            options={{ title: APP_SCREEN_NAME.PRIVACY_POLICY }}
          />
          <Stack.Screen 
            name={APP_SCREEN_NAME.MONTHLY_CHART}
            component={MonthlyChartScreen} 
            options={{ title: APP_SCREEN_NAME.MONTHLY_CHART }}
          />
          <Stack.Screen 
            name="NoNetwork"
            component={NoNetworkScreen} 
            options={{ title: "No Internet Connection" }}
          />
        </Stack.Navigator>
      </DateProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;

