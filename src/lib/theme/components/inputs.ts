import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';
import { borderWidths } from '../borders';

export const inputTokens = {
  base: {
    container: {
      marginBottom: spacing.md,
    },
    field: {
      backgroundColor: colors.inputBackground,
      color: colors.textPrimary,
      padding: spacing.md,
      borderRadius: radii.sm,
      borderWidth: borderWidths.thin,
      borderColor: colors.border,
    },
    placeholder: 'rgba(255,255,255,0.5)',
    focused: {
      borderColor: colors.accent,
    },
    error: {
      borderColor: colors.danger,
    },
    helper: {
      color: colors.textSecondary,
      marginTop: spacing.xs,
      fontSize: 12,
    },
  },
};
