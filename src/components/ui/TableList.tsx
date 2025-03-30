import React, { useState, useMemo, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import Typography from '../Typography';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { remToPixels } from '../../utils/typography';

export interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  width?: number | string;
  widthRem?: number;
  renderCell?: (value: any, rowData: any) => React.ReactNode;
  headerTextColor?: string;
}

export interface TableData {
  id: string | number;
  [key: string]: any;
}

interface TableListProps {
  columns: TableColumn[];
  data: TableData[];
  className?: string;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

type SortDirection = 'asc' | 'desc' | null;

const TableList: React.FC<TableListProps> = ({
  columns,
  data,
  className = '',
  onEndReached,
  onEndReachedThreshold = 0.5,
}) => {
  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: '', direction: null });

  const handleSort = (columnId: string) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === columnId) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key: columnId, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.direction) {
      return [...data];
    }

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const getSortIcon = (columnId: string) => {
    if (sortConfig.key !== columnId) {
      return 'swap-vertical-outline';
    }
    return sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down';
  };

  // Calculate flexible widths for columns
  const getColumnWidth = (column: TableColumn) => {
    if (column.widthRem) {
      return remToPixels(column.widthRem);
    } else if (column.width) {
      return column.width;
    }
    
    // If no width specified, distribute evenly
    const totalSpecifiedWidth = columns.reduce((sum, col) => {
      if (col.widthRem) {
        return sum + remToPixels(col.widthRem);
      } else if (typeof col.width === 'number') {
        return sum + col.width;
      }
      return sum;
    }, 0);
    
    const unspecifiedColumns = columns.filter(col => !col.width && !col.widthRem).length;
    if (unspecifiedColumns === 0) return 'auto';
    
    const remainingWidth = containerWidth - totalSpecifiedWidth;
    return Math.max(80, remainingWidth / unspecifiedColumns); // Minimum 80px width
  };

  const renderItem = ({ item, index }: { item: TableData; index: number }) => (
    <View
      key={item.id}
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? colors.light : colors.primary + '30' },
      ]}
    >
      {columns.map((column) => (
        <View
          key={`${item.id}-${column.id}`}
          style={[styles.cell, { width: getColumnWidth(column) }]}
        >
          {column.renderCell ? (
            column.renderCell(item[column.id], item)
          ) : (
            <Typography variant="body2" color={colors.text}>
              {item[column.id]}
            </Typography>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <View 
      className={`rounded-lg overflow-hidden ${className}`} 
      style={styles.container}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      <View>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow, { backgroundColor: colors.dark }]}>
          {columns.map((column) => (
            <TouchableOpacity
              key={column.id}
              style={[styles.cell, { width: getColumnWidth(column) }]}
              onPress={() => column.sortable && handleSort(column.id)}
              disabled={!column.sortable}
            >
              <View style={styles.headerContent}>
                <Typography variant="subtitle2" color={column.headerTextColor || colors.light}>
                  {column.label}
                </Typography>
                {column.sortable && (
                  <Icon
                    name={getSortIcon(column.id)}
                    size={16}
                    color={column.headerTextColor || colors.light}
                    style={styles.sortIcon}
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  cell: {
    padding: 10,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIcon: {
    marginLeft: 4,
  },
});

export default TableList;





