import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useTheme } from '@lib/theme/ThemeProvider';

type ChoiceButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export const ChoiceButton = ({ label, selected, onPress }: ChoiceButtonProps) => {
  const styles = useChoiceButtonStyles();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={[styles.choiceButton, selected && styles.choiceButtonSelected]}
    >
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{label}</Text>
    </Pressable>
  );
};

const useChoiceButtonStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    choiceButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surfaceAlt,
      ...(Platform.OS === 'ios'
        ? {
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          }
        : { elevation: 0 }),
    },
    choiceButtonSelected: {
      borderColor: colors.accent,
      backgroundColor: colors.accentSoft,
    },
    choiceText: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.accent,
    },
    choiceTextSelected: {
      color: colors.textPrimary,
    },
  });
};
