import { StyleSheet } from 'react-native';
import { colors } from '@lib/theme/colors';
import { spacing } from '@lib/theme/spacing';
import { typography } from '@lib/theme/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContent: {
    padding: spacing.md, // ~12
  },

  emptyText: {
    ...typography.muted,
    textAlign: 'center',
    padding: spacing.lg,
  },
});
