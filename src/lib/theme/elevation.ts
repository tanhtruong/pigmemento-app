import { Platform } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';

const ios = (y: number, blur: number, alpha = 0.25) => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: y,
  },
  shadowOpacity: alpha,
  shadowRadius: blur,
});
const android = (y: number, blur: number, alpha = 0.25) => ({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: y,
  },
  shadowOpacity: alpha,
  shadowRadius: blur,
});
export const elevation = () => {
  const { colors } = useTheme();

  return {
    none: Platform.select({
      ios: ios(0, 0),
      android: android(0, 0),
    }),
    sm: Platform.select({
      ios: ios(1, 2),
      android: android(1, 2),
    }),
    md: Platform.select({
      ios: ios(2, 4),
      android: android(2, 4),
    }),
    lg: Platform.select({
      ios: ios(4, 12),
      android: android(4, 12),
    }),
    overlayScrim: {
      backgroundColor: colors.overlay,
    },
  };
};
