import { StyleSheet } from 'react-native';
import { spacing } from '@lib/theme/spacing';
import { useTypography } from '@lib/theme/use-typography';
import { useTheme } from '@lib/theme/ThemeProvider';

export const useHistoryStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    listContent: {
      padding: spacing.md, // ~12
    },

    emptyText: {
      ...typography.muted,
      textAlign: 'center',
      padding: spacing.lg,
    },
  });
};
