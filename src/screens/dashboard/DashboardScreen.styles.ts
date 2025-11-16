// DashboardScreen.styles.ts
import { StyleSheet } from 'react-native';
import { colors } from '@lib/theme/colors';
import { typography } from '@lib/theme/typography';
import { radii } from '@lib/theme/radii';
import { spacing } from '@lib/theme/spacing';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
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

  // Content area
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },

  // Optional spacer
  spacer: {
    flex: 1,
  },
});
