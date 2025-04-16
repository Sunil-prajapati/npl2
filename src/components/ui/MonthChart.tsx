import React, {useMemo} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {THEME_COLORS} from '../../constants/ThemeColors';
import Typography from '../Typography';

interface MonthChartProps {
  month?: Date; // Optional: defaults to current month
  className?: string;
}

const MonthChart: React.FC<MonthChartProps> = ({
  month = new Date(),
  className = '',
}) => {
  const {theme} = useTheme();
  const colors = THEME_COLORS[theme];

  // Generate time slots from 08:30 AM to 03:00 PM in 15-minute increments
  const timeSlots = useMemo(() => {
    const slots = [];
    const startHour = 8;
    const startMinute = 30;
    const endHour = 15;
    const endMinute = 0;
    
    for (let h = startHour; h <= endHour; h++) {
      for (let m = h === startHour ? startMinute : 0; m < 60; m += 15) {
        if (h === endHour && m > endMinute) break;
        
        const hour = h % 12 === 0 ? 12 : h % 12;
        const period = h < 12 ? 'AM' : 'PM';
        slots.push(`${hour}:${m.toString().padStart(2, '0')} ${period}`);
      }
    }
    return slots;
  }, []);

  // Generate dates for the current month
  const dates = useMemo(() => {
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0,
    ).getDate();
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      dates.push(date);
    }
    return dates;
  }, [month]);

  // Generate random data for the heatmap
  const generateRandomData = () => {
    return Math.floor(Math.random() * 10); // Random number from 0 to 9
  };

  // Get color based on value
  const getColorForValue = (value: number) => {
    if (value === 0) return '#f5f5f5'; // Light gray for 0
    if (value <= 3) return '#c8e6c9'; // Light green for 1-3
    if (value <= 6) return '#81c784'; // Medium green for 4-6
    return '#4caf50'; // Dark green for 7-9
  };

  return (
    <View className={`${className}`} style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {/* Header row with dates */}
          <View style={styles.headerRow}>
            <View style={styles.timeHeaderCell}>
              <Typography variant="caption" color={colors.text}>
                Time / Date
              </Typography>
            </View>
            {dates.map((date, index) => (
              <View key={`date-${index}`} style={styles.dateHeaderCell}>
                <Typography variant="caption" color={colors.text}>
                  {date.getDate()}
                </Typography>
                <Typography variant="caption" color={colors.text}>
                  {date.toLocaleString('default', {weekday: 'short'})}
                </Typography>
              </View>
            ))}
          </View>

          {/* Scrollable grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {timeSlots.map((timeSlot, timeIndex) => (
              <View key={`time-${timeIndex}`} style={styles.row}>
                <View style={styles.timeCell}>
                  <Typography variant="caption" color={colors.text}>
                    {timeSlot}
                  </Typography>
                </View>
                {dates.map((_, dateIndex) => {
                  const value = generateRandomData();
                  return (
                    <View
                      key={`cell-${timeIndex}-${dateIndex}`}
                      style={[
                        styles.dataCell,
                        {backgroundColor: getColorForValue(value)},
                      ]}>
                      <Text style={styles.cellText}>{value}</Text>
                    </View>
                  );
                })}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  timeHeaderCell: {
    width: 80,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  dateHeaderCell: {
    width: 50,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  timeCell: {
    width: 80,
    padding: 8,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  dataCell: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  cellText: {
    fontWeight: 'bold',
  },
});

export default MonthChart;