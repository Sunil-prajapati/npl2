import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '../Box';
import Typography from '../Typography';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
  height?: number;
  iconColor?: string;
  borderColor?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  height,
  iconColor,
  borderColor,
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  return (
    <Box 
      bgColor={colors.light} 
      style={{ 
        height: height,
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: borderColor || colors.primary,
        borderRadius: 8,
        marginTop: 10
      }}
    >
      <Icon name="alert-circle" size={50} color={iconColor || colors.primary} />
      <Typography 
        variant="h6" 
        color={colors.text} 
        style={{ textAlign: 'center', marginTop: 10 }}
      >
        Error Loading Data
      </Typography>
      <Typography 
        variant="body1" 
        color={colors.text} 
        style={{ textAlign: 'center', marginTop: 5, paddingHorizontal: 20 }}
      >
        {error}
      </Typography>
      <TouchableOpacity
        style={{
          backgroundColor: colors.dark,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 20
        }}
        onPress={onRetry}
      >
        <Typography variant="button" color={colors.light}>
          Retry
        </Typography>
      </TouchableOpacity>
    </Box>
  );
};

export default ErrorDisplay;