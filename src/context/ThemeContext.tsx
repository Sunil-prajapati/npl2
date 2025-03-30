import React, { createContext, useState, useContext, ReactNode } from 'react';
import { THEME_TYPE } from '../constants/ThemeTypes';

type ThemeType = THEME_TYPE.GOLD | THEME_TYPE.SILVER;

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(THEME_TYPE.GOLD);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === THEME_TYPE.GOLD ? THEME_TYPE.SILVER : THEME_TYPE.GOLD);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
