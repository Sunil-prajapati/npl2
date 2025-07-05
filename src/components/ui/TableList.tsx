import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../Typography';
import { useTheme } from '../../context/ThemeContext';
import { THEME_COLORS } from '../../constants/ThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { remToPixels } from '../../utils/typography';
import { MESSAGES } from '../../constants/enum';
import Loader from './Loader';

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
  height?: number;
  title?: string;
  loading?: boolean;
  autoHeight?: boolean;
  heightOffset?: number;
}

type SortDirection = 'asc' | 'desc' | null;

const TableList: React.FC<TableListProps> = ({
  columns,
  data,
  className = '',
  onEndReached,
  onEndReachedThreshold = 0.5,
  height,
  title,
  loading = false,
  autoHeight = false,
  heightOffset = 0,
}) => {

  const { theme } = useTheme();
  const colors = THEME_COLORS[theme];
  const insets = useSafeAreaInsets();
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);
  const [internalData, setInternalData] = useState<TableData[]>([]);

  useEffect(() => {
    setInternalData(data);
  }, [data]);
  
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: SortDirection;
  }>({ key: '', direction: null });

  const getTableHeight = () => {
    if (height) return height;
    if (autoHeight) {
      const screenHeight = Dimensions.get('window').height;
      const availableHeight = screenHeight - insets.top - insets.bottom;
      const titleHeight = title ? 90 : 50;
      return availableHeight - titleHeight - heightOffset;
    }
    
    return undefined;
  };

  const handleSort = (columnId: string) => {
    let direction: SortDirection = 'asc';

    if (sortConfig.key === columnId) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = 'asc';
      }
    }

    setSortConfig({ key: columnId, direction });

    if (!direction) {
      setInternalData(data);
      return;
    }
    const sorted = [...internalData].sort((a, b) => {
      if (columnId === 'time') {
        const aId = a.id;
        const bId = b.id;
        return direction === 'asc' ? 
          (aId < bId ? -1 : aId > bId ? 1 : 0) :
          (bId < aId ? -1 : bId > aId ? 1 : 0);
      }

      const aValue = a[columnId];
      const bValue = b[columnId];

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setInternalData(sorted);
  };

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
      {columns.map((column, colIndex) => (
        <View
          key={`${item.id}-${column.id}`}
          style={[
            styles.cell, 
            { width: getColumnWidth(column) },
            colIndex === 0 ? { paddingLeft: 12 } : {}
          ]}
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

  const calculatedHeight = getTableHeight();

  return (
    <View 
      className={`rounded-lg ${className}`} 
      style={[
        styles.container,
        calculatedHeight ? { height: calculatedHeight - 170 } : {}
      ]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
      }}
    >
      {title && (
        <View style={[styles.titleContainer, { backgroundColor: colors.dark }]}>
          <Typography variant="h6" color={colors.light} style={styles.title}>
            {title}
          </Typography>
        </View>
      )}
      <View style={{ flex: 1 }}>
        {/* Header Row */}
        <View style={[styles.row, styles.headerRow, { backgroundColor: colors.dark }]}>
          {columns.map((column, colIndex) => (
            <TouchableOpacity
              key={column.id}
              style={[
                styles.cell, 
                { width: getColumnWidth(column) },
                colIndex === 0 ? { paddingLeft: 12 } : {}
              ]}
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
        {internalData?.length > 0 ? (
          <FlatList
            data={internalData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={onEndReached}
            onEndReachedThreshold={onEndReachedThreshold}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            nestedScrollEnabled={true}
          />
        ) : loading ? (
          <View style={[
            styles.noDataContainer, 
            { height: calculatedHeight ? calculatedHeight - (title ? 90 : 50) : 150 }
          ]}>
            <Loader size="small" text="Loading data..." />
          </View>
        ) : (
          <View style={[
            styles.noDataContainer, 
            { height: calculatedHeight ? calculatedHeight - (title ? 90 : 50) : 150 }
          ]}>
            <Typography variant="body1" color={colors.text}>
              {MESSAGES.DATA_NOT_FOUND}
            </Typography>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#ddd',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
  },
  headerRow: {
    borderBottomWidth: 2,
  },
  cell: {
    padding: 4,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortIcon: {
    marginLeft: 4,
  },
  titleContainer: {
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  noDataContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100, 
    width: '100%',
  },
});

export default TableList;