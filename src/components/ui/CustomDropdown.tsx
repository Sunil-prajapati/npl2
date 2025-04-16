import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList, 
  TouchableWithoutFeedback,
  Dimensions,
  LayoutChangeEvent
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Typography from '../Typography';
import Icon from 'react-native-vector-icons/Ionicons';

interface DropdownItem {
  key: string;
  value: string;
}

interface CustomDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  label?: string;
  onSelect: (key: string, value: string) => void;
  selectedKey?: string;
  disabled?: boolean;
  style?: object;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  data,
  placeholder = 'Select an option',
  label,
  onSelect,
  selectedKey,
  disabled = false,
  style = {},
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<DropdownItem | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<View>(null);
  const screenHeight = Dimensions.get('window').height;

  // Find the selected item when selectedKey changes
  useEffect(() => {
    if (selectedKey) {
      const selectedItem = data.find(item => item.key === selectedKey);
      if (selectedItem) {
        setSelected(selectedItem);
      }
    }
  }, [selectedKey, data]);

  const measureDropdownPosition = useCallback(() => {
    if (buttonRef.current) {
      buttonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const top = pageY + height;
        const left = pageX;
        
        // Ensure the dropdown doesn't go off the bottom of the screen
        const dropdownHeight = Math.min(300, data.length * 44 + 8); // Approximate height
        const bottomSpace = screenHeight - top;
        const finalTop = bottomSpace < dropdownHeight ? pageY - dropdownHeight : top;
        
        setDropdownPosition({ top: finalTop, left, width });
      });
    }
  }, [data.length, screenHeight]);

  const toggleDropdown = () => {
    if (!disabled) {
      if (!visible) {
        measureDropdownPosition();
      }
      setVisible(!visible);
    }
  };

  const onItemPress = (item: DropdownItem) => {
    setSelected(item);
    onSelect(item.key, item.value);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: DropdownItem }) => (
    <TouchableOpacity 
      style={[
        styles.item, 
        selected?.key === item.key && { backgroundColor: colors.background }
      ]} 
      onPress={() => onItemPress(item)}
    >
      <Typography 
        variant="body2" 
        color={colors.text}
      >
        {item.value}
      </Typography>
      {selected?.key === item.key && (
        <Icon name="checkmark" size={18} color={colors.activeIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Typography 
          variant="body2" 
          color={colors.text} 
          style={styles.label}
        >
          {label}
        </Typography>
      )}
      
      <View ref={buttonRef} collapsable={false}>
        <TouchableOpacity 
          style={[
            styles.button, 
            { 
              backgroundColor: colors.light,
              borderColor: colors.inactiveIcon,
              opacity: disabled ? 0.6 : 1
            }
          ]} 
          onPress={toggleDropdown}
          disabled={disabled}
        >
          <Typography 
            variant="body2" 
            color={selected ? colors.text : colors.inactiveIcon}
            numberOfLines={1}
          >
            {selected ? selected.value : placeholder}
          </Typography>
          <Icon 
            name={visible ? "chevron-up" : "chevron-down"} 
            size={20} 
            color={colors.activeIcon} 
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View 
              style={[
                styles.dropdown, 
                { 
                  backgroundColor: colors.light,
                  borderColor: colors.inactiveIcon,
                  position: 'absolute',
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width || '100%',
                }
              ]}
            >
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                nestedScrollEnabled
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  list: {
    paddingVertical: 4,
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
});

export default CustomDropdown;
