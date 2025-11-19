import { colors } from './colors';

export const typography = {
  title: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  body: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  muted: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  small: {
    fontSize: 11,
    color: colors.textSecondary,
  },
};
