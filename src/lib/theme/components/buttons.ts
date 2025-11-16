import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';

export const buttonTokens = {
  primary: {
    container: {
      backgroundColor: colors.accent,
      borderRadius: radii.md,
      padding: spacing.lg - 2,
    },
    text: {
      color: colors.accentForeground,
      fontWeight: '700' as const,
    },
  },
  secondary: {
    container: {
      backgroundColor: colors.accentSoft,
      borderRadius: radii.md,
      padding: spacing.lg - 2,
    },
    text: {
      color: colors.accent,
      fontWeight: '700' as const,
    },
  },
};
