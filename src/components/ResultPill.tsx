import { StyleSheet, Text, View } from 'react-native';
import { radii, spacing, useTypography } from '@lib/theme';
import { Check, X } from 'lucide-react-native';
import { useTheme } from '@lib/theme/ThemeProvider';

type ResultPillProps = {
  isCorrect?: boolean;
  floating?: boolean;
};

export const ResultPill = ({ isCorrect, floating }: ResultPillProps) => {
  const { colors } = useTheme();
  const styles = useResultPillStyles();

  if (isCorrect === undefined) return null;

  const color = isCorrect ? colors.success : colors.danger;
  const label = isCorrect ? 'CORRECT' : 'INCORRECT';
  const Result = isCorrect ? Check : X;

  return (
    <View
      style={[
        styles.pill,
        floating ? styles.absolute : { borderColor: color, borderWidth: 1, alignSelf: 'flex-start' },
      ]}
    >
      <Result
        size={16}
        style={styles.icon}
        color={color}
      />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

export const useResultPillStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    pill: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.full,
      backgroundColor: colors.surfaceAlt,
    },
    absolute: {
      position: 'absolute',
      top: spacing.sm + 2,
      left: spacing.sm + 2,
    },
    icon: {
      marginRight: 4,
    },
    text: {
      ...typography.small,
      fontWeight: '600',
      letterSpacing: 0.5,
      color: colors.textPrimary,
    },
  });
};
