import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import { THEME_TYPE } from '../constants/ThemeTypes';
import { THEME_COLORS } from '../constants/ThemeColors';
import Typography from './Typography';

interface OptionsProps {
  visible: boolean;
  onClose: () => void;
}

const Options: React.FC<OptionsProps> = ({ visible, onClose }) => {
  const { theme, toggleTheme } = useTheme();
  const colors = THEME_COLORS[theme];

  const handleThemeToggle = () => {
    toggleTheme();
    onClose();
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={[styles.optionsContainer, { backgroundColor: colors.light }]}>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={handleThemeToggle}
          >
            <Icon 
              name={theme === THEME_TYPE.GOLD ? 'sunny' : 'moon'} 
              size={24} 
              color={colors.activeIcon} 
            />
            <Typography 
              variant="body1" 
              color={colors.text} 
              style={styles.optionText}
            >
              {theme === THEME_TYPE.GOLD ? 'Light Theme' : 'Dark Theme'}
            </Typography>
          </TouchableOpacity>
          
          {/* Add more options here as needed */}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optionsContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 150,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  optionText: {
    marginLeft: 10,
  }
});

export default Options;