import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { THEME_COLORS } from '../constants/ThemeColors';
import ScreenWrapper from '../components/ScreenWrapper';
import Typography from '../components/Typography';
import Box from '../components/Box';

const NoNetworkScreen = () => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];

  const openNetworkSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('App-Prefs:root=WIFI');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Icon name="wifi-off" size={80} color={colors.dark} />
        
        <Box bgColor={colors.light} style={styles.contentBox}>
          <Typography variant="h4" color={colors.text} style={styles.title}>
            No Internet Connection
          </Typography>
          
          <Typography variant="body1" color={colors.text} style={styles.description}>
            Please check your internet connection and try again. You need an active internet connection to use this app.
          </Typography>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.dark }]}
            onPress={openNetworkSettings}
          >
            <Typography variant="button" color={colors.text}>
              Open Network Settings
            </Typography>
          </TouchableOpacity>
        </Box>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentBox: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoNetworkScreen;