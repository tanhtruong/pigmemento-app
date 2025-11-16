import { Text, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { ComponentType } from 'react';
import { colors, radii, spacing } from '@lib/theme';

type SecondaryCardProps = {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; style?: any }>;
  onPress: () => void;
};

export const SecondaryCard = ({ icon: Icon, title, description, onPress }: SecondaryCardProps) => {
  return (
    <TouchableOpacity style={styles.secondaryCard} onPress={onPress}>
      <Icon size={20} style={styles.secondaryIcon} />
      <View>
        <Text style={styles.secondaryTitle}>{title}</Text>
        <Text style={styles.secondaryText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  secondaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryIcon: {
    marginRight: spacing.sm,
    color: colors.purpleAccent ?? '#A78BFA',
    marginTop: 2,
  },
  secondaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  secondaryText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
