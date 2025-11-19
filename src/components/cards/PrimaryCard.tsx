import { ComponentType, ReactNode } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { radii, spacing } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

type PrimaryCardProps = {
  title: string;
  description: string;
  icon: ComponentType<{ size?: number; style?: any }>;
  onPress: () => void;
};

export const PrimaryCard = ({ description, icon: Icon, title, onPress }: PrimaryCardProps) => {
  const styles = usePrimaryCardStyles();

  return (
    <TouchableOpacity style={styles.primaryCard} onPress={onPress}>
      <Icon size={28} style={styles.primaryIcon} />
      <View>
        <Text style={styles.primaryTitle}>{title}</Text>
        <Text style={styles.primaryText}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const usePrimaryCardStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    primaryCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surfaceAlt,
      padding: spacing.md,
      borderRadius: radii.card,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
    },
    primaryIcon: {
      marginRight: spacing.md,
      color: colors.accent,
    },
    primaryTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    primaryText: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
  });
};
