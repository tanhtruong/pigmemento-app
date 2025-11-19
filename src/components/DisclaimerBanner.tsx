import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageCircleWarningIcon } from 'lucide-react-native';
import { radii, spacing } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

export default function DisclaimerBanner() {
  const styles = useDisclaimerBannerStyles();

  return (
    <View style={styles.disclaimerBox}>
      <MessageCircleWarningIcon size={16} style={styles.disclaimerIcon} />
      <Text style={styles.disclaimerText}>
        Pigmemento is for educational use only. It must not be used to diagnose or manage patients.
      </Text>
    </View>
  );
}

const useDisclaimerBannerStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    disclaimerBox: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: spacing.md,
      borderRadius: radii.md,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    disclaimerIcon: {
      marginRight: spacing.sm - 2, // ~6
      color: colors.accent,
      marginTop: 1,
    },
    disclaimerText: {
      fontSize: 9,
      color: colors.textSecondary,
      flex: 1,
    },
  });
};
