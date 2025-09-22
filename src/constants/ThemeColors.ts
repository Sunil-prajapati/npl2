import { THEME_TYPE } from './ThemeTypes';

export const THEME_COLORS = {
  [THEME_TYPE.GOLD]: {
   light: '#FFE4EC',         
    primary: '#FF69B4',       
    dark: '#C2185B',         
    text: '#212121',          
    background: '#FFE4EC',    
    headerBg: '#FFE4EC',      
    tabBarBg: '#FFE4EC',      
    activeIcon: '#C2185B',    
    inactiveIcon: '#FF69B4',
    red: 'red'      
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
