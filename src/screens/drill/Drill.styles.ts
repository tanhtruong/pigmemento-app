import { useTheme } from '@lib/theme/ThemeProvider';
import { StyleSheet } from 'react-native';
import { radii, spacing, useTypography } from '@lib/theme';

const SP = 16;
const IMAGE_HEIGHT = 320;

export const useDrillStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    scrollContent: {
      paddingHorizontal: SP,
      paddingTop: SP,
      paddingBottom: SP + 8,
    },
    imageWrapper: {
      borderRadius: 18,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    image: {
      width: '100%',
      height: IMAGE_HEIGHT,
    },

    clinicalCard: {
      marginTop: 12,
      padding: 10,
      borderRadius: 14,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    clinicalLabel: {
      fontSize: 10,
      color: colors.textSecondary,
      marginBottom: 2,
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
      marginTop: 4,
    },

    questionTitle: {
      marginTop: 18,
      fontSize: 18,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    questionHelp: {
      marginTop: 4,
      fontSize: 11,
      color: colors.textSecondary,
    },

    choicesRow: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 14,
    },

    errorText: {
      marginTop: 6,
      fontSize: 11,
      color: colors.danger,
    },
    disclaimer: {
      marginTop: 16,
      fontSize: 9,
      color: colors.textSecondary,
    },

    submitButton: {
      marginTop: 18,
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: colors.accent,
      alignItems: 'center',
    },
    submitButtonDisabled: {
      opacity: 0.5,
    },
    submitText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.accentForeground,
    },

    loadingContainer: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: 6,
      fontSize: 11,
      color: colors.textSecondary,
    },

    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    title: {
      ...typography.title,
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.lg,
      marginBottom: spacing.lg,
    },
    accuracyRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    accuracyValue: {
      color: colors.accent,
    },
    accuracyLabel: {
      ...typography.subtitle,
      color: colors.accent,
    },
    accuracyDetails: {
      ...typography.subtitle,
      color: colors.accent,
      marginTop: spacing.sm,
    },
    statsRow: {
      flexDirection: 'row',
      columnGap: spacing.md,
      marginBottom: spacing.xl,
    },
    statPill: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    statLabel: {
      fontWeight: 'bold',
      color: colors.accent,
      marginBottom: spacing.xs,
    },
    statValue: {
      ...typography.subtitle,
      color: colors.textPrimary,
    },
    actions: {
      marginBottom: spacing.lg,
      rowGap: spacing.md,
    },
    primaryButton: {
      backgroundColor: colors.accent,
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primaryButtonText: {
      color: colors.textPrimary,
      fontWeight: 'bold',
    },
    secondaryButton: {
      borderRadius: radii.full,
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      color: colors.textPrimary,
    },
  });
};
