import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@lib/theme';
import { Check, X } from 'lucide-react-native';

type ResultPillProps = {
  isCorrect?: boolean;
  floating?: boolean;
};

export const ResultPill = ({ isCorrect, floating }: ResultPillProps) => {
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
      <Result size={16} style={styles.icon} color={color} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 50,
    backgroundColor: 'rgba(7, 12, 24, 0.7)',
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
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
