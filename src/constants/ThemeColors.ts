import { THEME_TYPE } from './ThemeTypes';

export const THEME_COLORS = {
  [THEME_TYPE.GOLD]: {
    light: '#FFF6E0',
    primary: '#FFD700',
    dark: '#B8860B',
    text: '#000000',
    background: '#FFF6E0',
    headerBg: '#FFF6E0',
    tabBarBg: '#FFF6E0',
    activeIcon: '#B8860B',
    inactiveIcon: '#FFD700',
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
  }
};
