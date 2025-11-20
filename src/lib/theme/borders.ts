import { useTheme } from '@lib/theme/ThemeProvider';

export const borderWidths = {
  hairline: 0.5,
  thin: 1,
  thick: 2,
};
export const defaultBorder = () => {
  const { colors } = useTheme();

  return {
    borderWidth: borderWidths.thin,
    borderColor: colors.border,
  };
};
