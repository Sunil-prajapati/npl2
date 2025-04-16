import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../Typography';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
  containerStyle?: ViewStyle;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  color,
  containerStyle,
  text,
  fullScreen = false,
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  
  const loaderColor = color || colors.primary;

  return (
    <View style={[
      styles.container, 
      fullScreen && styles.fullScreen,
      containerStyle
    ]}>
      <ActivityIndicator size={size} color={loaderColor} />
      {text && (
        <Typography 
          variant="body2" 
          color={colors.text} 
          style={styles.text}
        >
          {text}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 999,
  },
  text: {
    marginTop: 10,
  }
});

export default Loader;