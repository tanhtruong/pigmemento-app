import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { radii, spacing, typography } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

type AvatarProps = {
  label: string;
  size?: number;
};

const getInitials = (name?: string) => {
  if (!name) return '?';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

export const Avatar = ({ label, size = 44 }: AvatarProps) => {
  const styles = useAvatarStyles();

  return (
    <View style={[styles.avatar, { height: size, width: size }]}>
      <Text style={styles.avatarInitials}>{getInitials(label)}</Text>
    </View>
  );
};

const useAvatarStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    avatar: {
      borderRadius: radii.full,
      backgroundColor: colors.background ?? colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.accent ?? colors.border,
    },

    avatarInitials: {
      ...typography.subtitle,
      color: colors.accent,
    },
  });
};
