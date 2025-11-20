import { useTheme } from '@lib/theme/ThemeProvider';

export const useTypography = () => {
  const { colors } = useTheme();

  return {
    title: {
      fontSize: 28,
      fontWeight: '800' as const,
      color: colors.accent,
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

    // New suggestions
    heading1: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: colors.textPrimary,
    },
    heading2: {
      fontSize: 24,
      fontWeight: '700' as const,
      color: colors.textPrimary,
    },
    heading3: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: colors.textPrimary,
    },
    label: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: colors.textPrimary,
      letterSpacing: 0.5,
    },
    caption: {
      fontSize: 10,
      color: colors.textSecondary,
    },
    button: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.accent,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.8,
    },
  };
};
