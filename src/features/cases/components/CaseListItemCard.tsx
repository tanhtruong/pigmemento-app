import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CaseListItem } from '@lib/types/case';
import { ResultPill } from '@components/ResultPill';
import { radii, spacing, useTypography } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

type CaseListItemCardProps = {
  item: CaseListItem;
  onPress: () => void;
  floatingPill?: boolean;
};

export function CaseListItemCard({ item, onPress, floatingPill = false }: CaseListItemCardProps) {
  const styles = useCaseListItemCardStyles();
  return (
    <Pressable
      onPress={onPress}
      style={styles.card}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
      />
      <ResultPill
        isCorrect={item.lastAttempt?.correct}
        floating={floatingPill}
      />

      <View style={styles.info}>
        <Text style={styles.title}>Case #{item.id.slice(0, 6)}</Text>

        <Text style={styles.meta}>
          Difficulty: {item.difficulty} · Site: {item.site || '—'}
        </Text>
      </View>
    </Pressable>
  );
}

const useCaseListItemCardStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'cover',
    },

    info: {
      padding: spacing.md,
    },

    title: {
      ...useTypography.body,
      fontWeight: '700',
      color: colors.textPrimary,
    },

    meta: {
      ...useTypography.muted,
      color: colors.textSecondary,
      marginTop: 2,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.card,
      marginBottom: spacing.md,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
      position: 'relative',
    },
  });
};
