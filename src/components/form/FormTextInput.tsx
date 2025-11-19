import React, { forwardRef, useState } from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet } from 'react-native';
import { inputTokens } from '@lib/theme/components/inputs';
import { borderWidths, radii, spacing } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

type Props = TextInputProps & { label: string; error?: string };

export const FormTextInput = forwardRef<TextInput, Props>(({ label, error, style, ...props }, ref) => {
  const styles = useFormTextInputStyles();

  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, focused && inputTokens.base.focused, error && inputTokens.base.error, style]}
        placeholderTextColor="rgba(255,255,255,0.5)"
        {...props}
      />

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
});

const useFormTextInputStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    label: {
      marginBottom: spacing.xs + 2, // ~6
      fontWeight: '600',
      color: colors.textPrimary,
      fontSize: 13,
    },
    input: {
      borderRadius: radii.sm,
      padding: spacing.md,
      backgroundColor: colors.inputBackground,
      color: colors.textPrimary,
      borderWidth: borderWidths.thin,
      borderColor: colors.border,
    },
    errorText: {
      color: colors.danger,
      marginTop: spacing.xs,
      fontSize: 12,
    },
  });
};
