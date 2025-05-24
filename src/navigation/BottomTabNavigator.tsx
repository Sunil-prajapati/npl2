import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions, Platform, View, Image } from 'react-native';

import HomeScreen from '../screens/Single/HomeScreen';
import ProfileScreen from '../screens/Double/ProfileScreen';
import SettingsScreen from '../screens/Choose/SettingsScreen';
import HeaderRight from '../components/HeaderRight';
import { APP_SCREEN_NAME } from '../constants/AppScreenName';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import Typography from '../components/Typography';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  
  const getResponsiveIconSize = useMemo(() => {
    const baseSize = Platform.OS === 'ios' ? 24 : 20;
    return Math.round(baseSize * Dimensions.get('window').width / 375);
  }, []);
  
  const getResponsiveFontSize = useMemo(() => {
    const baseSize = 12;
    return Math.round(baseSize * Dimensions.get('window').width / 375);
  }, []);
  
  const getResponsiveHeaderFontSize = useMemo(() => {
    const baseSize = 14
    return Math.round(baseSize * Dimensions.get('window').width / 375);
  }, []);

  const CustomHeaderTitle = ({ title }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
      <View style={{ flexDirection: 'column', alignItems: 'start',width:'48%' }}>
        <Typography 
          variant="h6" 
          color={colors.activeIcon}
          style={{ 
            fontSize: getResponsiveHeaderFontSize, 
            fontWeight: 'bold',
            lineHeight: getResponsiveHeaderFontSize * 1.2
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2"
          color={colors.primary}
          style={{ 
            fontSize: getResponsiveHeaderFontSize * 0.9,
            lineHeight: getResponsiveHeaderFontSize * 0.9,
            fontWeight: 'bold',
          }}
        >
          Gold
        </Typography>
      </View>
      <Image 
        source={require('../../assets/images/logo.jpg')}
        style={{ 
          width: getResponsiveIconSize * 2, 
          height: getResponsiveIconSize * 2,
        }} 
        resizeMode="contain"
      />
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === APP_SCREEN_NAME.SINGLE) {
            iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
          } else if (route.name === APP_SCREEN_NAME.DOUBLE) {
            iconName = focused ? 'checkmark-done' : 'checkmark-done-outline';
          } 
          // else if (route.name === APP_SCREEN_NAME.CHOOSE) {
          //   iconName = focused ? 'options' : 'options-outline';
          // }
          return <Icon name={iconName} size={getResponsiveIconSize} color={color} />;
        },
        tabBarActiveTintColor: colors.activeIcon,
        tabBarInactiveTintColor: colors.inactiveIcon,
        tabBarStyle: { backgroundColor: colors.tabBarBg },
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: colors.activeIcon,
        tabBarLabelStyle: { fontSize: getResponsiveFontSize },
        headerRight: () => <HeaderRight />,
        headerRightContainerStyle: { paddingRight: 16 },
      })}
    >
      <Tab.Screen 
        name={APP_SCREEN_NAME.SINGLE} 
        component={HomeScreen} 
        options={{ 
          tabBarLabel: "Single",
          headerTitle: () => <CustomHeaderTitle title={APP_SCREEN_NAME.SINGLE} />
        }}
      />
      <Tab.Screen 
        name={APP_SCREEN_NAME.DOUBLE}
        component={ProfileScreen} 
        options={{ 
          tabBarLabel: "Double",
          headerTitle: () => <CustomHeaderTitle title={APP_SCREEN_NAME.DOUBLE} />
        }}
      />
      {/* <Tab.Screen 
        name={APP_SCREEN_NAME.CHOOSE} 
        component={SettingsScreen} 
        options={{ 
          tabBarLabel: APP_SCREEN_NAME.CHOOSE,
          headerTitle: () => <CustomHeaderTitle title={APP_SCREEN_NAME.CHOOSE} />
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;


