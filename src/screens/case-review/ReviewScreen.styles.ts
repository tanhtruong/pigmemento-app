import { StyleSheet } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';
import { radii, spacing, useTypography } from '@lib/theme';

export const useReviewStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loading: {
      color: colors.textSecondary,
    },
    image: {
      width: '100%',
      height: 260,
    },
    body: {
      padding: 16,
      gap: 14,
    },

    heading: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    clinicalCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    clinicalLabel: {
      fontSize: 9,
      color: colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.6,
    },
    clinicalMain: {
      fontSize: 13,
      color: colors.textPrimary,
      fontWeight: '600',
    },
    clinicalNote: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    answerRow: {
      flexDirection: 'row',
      gap: 10,
    },
    answerBlock: {
      flex: 1,
      backgroundColor: colors.surfaceAlt,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    answerLabel: {
      fontSize: 10,
      color: colors.textSecondary,
    },
    answerValue: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    teachingCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    subheading: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    bullet: {
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    muted: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    actionsRow: {
      flexDirection: 'row',
      gap: 10,
    },
    secondaryButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    secondaryText: {
      fontSize: 13,
      color: colors.textSecondary,
      fontWeight: '500',
    },
    primaryButton: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryText: {
      fontSize: 13,
      color: colors.accentForeground,
      fontWeight: '600',
    },
    disclaimer: {
      fontSize: 8,
      color: colors.textSecondary,
    },

    // Model Card
    modelCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
    },
    modelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    modelTitle: {
      ...typography.subtitle,
      color: colors.textPrimary,
      fontWeight: '600',
    },
    modelText: {
      ...typography.small,
      color: colors.textPrimary,
    },
    modelBarRow: {
      marginTop: spacing.sm,
      marginBottom: spacing.sm,
    },
    modelBarLabel: {
      ...typography.caption,
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
  });
};
