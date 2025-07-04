import React from 'react';
import { Text } from 'react-native';
import Box from '../Box';
import { THEME_COLORS } from '../../constants/ThemeColors';
import { useTheme } from '../../context/ThemeContext';
import { Marquee } from '@animatereactnative/marquee';
import Typography from '../Typography';
import { MESSAGES } from '../../constants/enum';

const renderTextWithGreenNPLGold = (text: string): React.ReactNode => {
  const parts: string[] = text.split(/(NPL Gold)/g);
  return parts.map((part: string, index: number) => {
    if (part === 'NPL Gold') {
      return <Text key={index} style={{ color: '#32CD32' }}>{part}</Text>;
    }
    return part;
  });
};

const MarqueeBox: React.FC = () => {
    const { theme } = useTheme();
    const colors = THEME_COLORS[theme];
    
    return (
        <Box
            bgColor={colors.primary}
            padding={0}
            style={{ paddingVertical: 4, paddingHorizontal: 0 }}
        >
            <Marquee spacing={20} speed={1}>
                <Typography variant="subtitle2" color={colors.red}>
                    {renderTextWithGreenNPLGold(MESSAGES.WHATS_APP_TEXT)}
                </Typography>
            </Marquee>
        </Box>
    );
};

export default MarqueeBox;