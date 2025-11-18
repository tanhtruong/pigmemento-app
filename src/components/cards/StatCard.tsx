import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@lib/theme/colors';
import { spacing } from '@lib/theme/spacing';
import { radii } from '@lib/theme/radii';
import { typography } from '@lib/theme/typography';

type StatCardProps = {
  label: string;
  value: string | number;
};

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
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
    ...typography.body,
    fontWeight: 'bold',
  },
});
