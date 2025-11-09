import { THEME_TYPE } from './ThemeTypes';

export const THEME_COLORS = {
  [THEME_TYPE.GOLD]: {
  light: "#E5F2FF", 
  primary: "#DA291C", 
  dark: "#A31B1B", 
  text: "#212121", 
  background: "#FFFFFF", 
  headerBg: "#FFFFFF", 
  tabBarBg: "#F0F0F0", 
  activeIcon: "#A31B1B", 
  inactiveIcon: "#A0A0A0",
  red: "#E53935" 
},
  [THEME_TYPE.SILVER]: {
    light: '#F5F5F5',
    primary: '#C0C0C0',
    dark: '#A9A9A9',
    text: '#333333',
    background: '#F5F5F5',
    headerBg: '#F5F5F5',
    tabBarBg: '#F5F5F5',
    activeIcon: '#A9A9A9',
    inactiveIcon: '#C0C0C0',
    red:'red'
  }
};
