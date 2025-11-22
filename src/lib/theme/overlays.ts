import { useTheme } from '@lib/theme/ThemeProvider';

export const overlays = () => {
  const { colors } = useTheme();

  return {
    scrim: {
      backgroundColor: colors.overlay,
    },
    camHeatmapAlpha: 0.55, // default CAM overlay strength
    camBorder: {
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.25)',
    },
  };
};
