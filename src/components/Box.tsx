import React, { ReactNode } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import Typography from './Typography';
import { TypographyVariant } from './Typography';

interface BoxProps {
  children: ReactNode;
  bgColor?: string;
  textColor?: string;
  style?: ViewStyle;
  variant?: TypographyVariant;
  className?: string;
  padding?: number;
}

const Box: React.FC<BoxProps> = ({
  children,
  bgColor,
  textColor,
  style,
  variant = 'body1',
  className = '',
  padding = 16,
}) => {
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: bgColor, padding },
        style,
      ]}
      className={className}
    >
      {typeof children === 'string' ? (
        <Typography variant={variant} color={textColor}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default Box;