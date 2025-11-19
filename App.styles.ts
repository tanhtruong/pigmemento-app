import { StyleSheet } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';

export const useAppStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
    },
  });
};
