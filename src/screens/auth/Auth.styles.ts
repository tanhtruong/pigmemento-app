import { StyleSheet } from 'react-native';
import { colors } from '@lib/theme/colors';
import { spacing } from '@lib/theme/spacing';
import { radii } from '@lib/theme/radii';
import { typography } from '@lib/theme/typography';

export default StyleSheet.create({
  // Layout (used by AuthLayout)
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.lg + 4, // 20
  },

  // Titles
  title: {
    ...typography.title,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg, // 16
  },

  // Primary action button
  submitButton: {
    backgroundColor: colors.accent,
    padding: spacing.lg - 2, // 14
    borderRadius: radii.md, // 12
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.textSecondary,
  },
  submitText: {
    fontWeight: '700',
    color: colors.accentForeground,
  },

  // Secondary link
  link: {
    marginTop: spacing.lg, // 16
  },
  linkText: {
    color: colors.textSecondary,
  },
});
