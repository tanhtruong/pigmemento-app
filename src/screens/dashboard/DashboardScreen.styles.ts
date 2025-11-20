import { StyleSheet } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';
import { typography } from '@lib/theme/typography';
import { radii } from '@lib/theme/radii';
import { spacing } from '@lib/theme/spacing';

export const useDashboardStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    header: {
      paddingTop: 36,
      paddingHorizontal: 20,
      paddingBottom: 14,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    appTitle: {
      ...typography.title,
      color: colors.textPrimary,
    },

    subtitle: {
      ...typography.subtitle,
      color: colors.textSecondary,
    },

    logoutButton: {
      padding: spacing.sm,
      borderRadius: radii.full,
      backgroundColor: colors.inputBackground,
    },

    content: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xl,
      gap: 5,
    },

    spacer: {
      flex: 1,
    },
  });
};
