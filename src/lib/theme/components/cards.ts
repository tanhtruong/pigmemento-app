import { colors } from '../colors';
import { radii } from '../radii';
import { spacing } from '../spacing';
import { borderWidths } from '../borders';
import { elevation } from '../elevation';

export const cardTokens = {
  base: {
    container: {
      backgroundColor: colors.surface,
      borderRadius: radii.lg,
      padding: spacing.md,
      borderWidth: borderWidths.thin,
      borderColor: colors.border,
      ...elevation.none,
    },
  },
};
