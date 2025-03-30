import React, { ReactNode } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import { remToPixels } from '../utils/typography';

export type TypographyVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'h5' 
  | 'h6' 
  | 'subtitle1' 
  | 'subtitle2' 
  | 'body1' 
  | 'body2' 
  | 'button' 
  | 'caption' 
  | 'overline';

interface TypographyProps {
  variant?: TypographyVariant;
  style?: TextStyle;
  children: ReactNode;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  style,
  children,
  color,
  align = 'auto',
  className = '',
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const variantStyle = styles[variant];
  const textColor = color || colors.text;
  
  return (
    <Text 
      style={[
        variantStyle, 
        { color: textColor, textAlign: align },
        style
      ]}
      className={className}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: remToPixels(2), // 2rem = 32px
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 8,
  },
  h2: {
    fontSize: remToPixels(1.75), // 1.75rem = 28px
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 8,
  },
  h3: {
    fontSize: remToPixels(1.5), // 1.5rem = 24px
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 8,
  },
  h4: {
    fontSize: remToPixels(1.25), // 1.25rem = 20px
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 4,
  },
  h5: {
    fontSize: remToPixels(1.125), // 1.125rem = 18px
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 4,
  },
  h6: {
    fontSize: remToPixels(1), // 1rem = 16px
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle1: {
    fontSize: remToPixels(1), // 1rem = 16px
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 4,
  },
  subtitle2: {
    fontSize: remToPixels(0.875), // 0.875rem = 14px
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: 4,
  },
  body1: {
    fontSize: remToPixels(1), // 1rem = 16px
    fontWeight: 'normal',
    lineHeight: 24,
  },
  body2: {
    fontSize: remToPixels(0.875), // 0.875rem = 14px
    fontWeight: 'normal',
    lineHeight: 22,
  },
  button: {
    fontSize: remToPixels(0.875), // 0.875rem = 14px
    fontWeight: '500',
    lineHeight: 22,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: remToPixels(0.75), // 0.75rem = 12px
    fontWeight: 'normal',
    lineHeight: 20,
  },
  overline: {
    fontSize: remToPixels(0.625), // 0.625rem = 10px
    fontWeight: 'normal',
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Typography;
