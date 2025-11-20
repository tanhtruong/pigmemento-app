import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing } from '@lib/theme/spacing';
import { radii } from '@lib/theme/radii';
import { useTheme } from '@lib/theme/ThemeProvider';

type StatCardProps = {
  label: string;
  value: string | number;
};

export const StatCard = ({ label, value }: StatCardProps) => {
  const styles = useStatCardStyles();

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const useStatCardStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    card: {
      width: '48%',
      backgroundColor: colors.background,
      borderRadius: radii.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      borderWidth: 0,
    },
    label: {
      fontWeight: '600',
      color: colors.accent,
      marginBottom: spacing.xs,
    },
    value: {
      fontWeight: 'bold',
    },
  });
};
