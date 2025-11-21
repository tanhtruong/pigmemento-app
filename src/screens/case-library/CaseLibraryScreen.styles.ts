import { StyleSheet } from 'react-native';
import { spacing } from '@lib/theme/spacing';
import { useTypography } from '@lib/theme/use-typography';
import { useTheme } from '@lib/theme/ThemeProvider';

export const useCaseLibraryStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    listContent: {
      padding: spacing.lg,
    },

    emptyText: {
      ...typography.muted,
      textAlign: 'center',
      padding: spacing.lg,
    },
  });
};
