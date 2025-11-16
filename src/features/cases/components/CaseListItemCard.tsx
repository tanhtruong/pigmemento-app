import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CaseListItem } from '@lib/types/case';
import { ResultPill } from '@components/ResultPill';
import { colors, radii, spacing, typography } from '@lib/theme';

type CaseListItemCardProps = {
  item: CaseListItem;
  onPress: () => void;
  floatingPill?: boolean;
};

export function CaseListItemCard({ item, onPress, floatingPill = false }: CaseListItemCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <ResultPill isCorrect={item.lastAttempt?.correct} floating={floatingPill} />

      <View style={styles.info}>
        <Text style={styles.title}>Case #{item.id.slice(0, 6)}</Text>

        <Text style={styles.meta}>
          Difficulty: {item.difficulty} · Site: {item.site || '—'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },

  info: {
    padding: spacing.md,
  },

  title: {
    ...typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  meta: {
    ...typography.muted,
    color: colors.textSecondary,
    marginTop: 2,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg, // ~16
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
});
