import React from 'react';
import { Pressable, ActivityIndicator, Text, ViewStyle } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';
import { radii, spacing, useTypography } from '@lib/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button = ({
  title,
  variant = 'primary',
  onPress,
  disabled = false,
  loading = false,
  style,
}: ButtonProps) => {
  const styles = getButtonStyles({ variant, disabled, radii, spacing });

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && !disabled && styles.pressed, style]}
      onPress={!disabled && !loading ? onPress : undefined}
    >
      {loading ? <ActivityIndicator color={styles.text.color} /> : <Text style={styles.text}>{title}</Text>}
    </Pressable>
  );
};

const getButtonStyles = ({ variant, disabled, radii, spacing }: any) => {
  const { colors } = useTheme();
  const typography = useTypography();

  const base = {
    button: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    } as ViewStyle,
    text: {
      ...typography.button,
    },
    pressed: {
      opacity: 0.7,
    } as ViewStyle,
  };

  if (disabled) {
    return {
      button: {
        ...base.button,
        backgroundColor: colors.textDisabled,
      },
      text: {
        ...base.text,
        color: colors.accentForeground,
      },
      pressed: base.pressed,
    };
  }

  switch (variant) {
    case 'primary':
      return {
        button: {
          ...base.button,
          backgroundColor: colors.accent,
        },
        text: {
          ...base.text,
          fontWeight: '600' as const,
          color: colors.accentForeground,
        },
        pressed: base.pressed,
      };

    case 'secondary':
      return {
        button: {
          ...base.button,
          borderWidth: 1,
          borderColor: colors.border,
        },
        text: {
          ...base.text,
          color: colors.textPrimary,
        },
        pressed: base.pressed,
      };

    case 'ghost':
      return {
        button: {
          ...base.button,
          backgroundColor: 'transparent',
        },
        text: {
          ...base.text,
          color: colors.textPrimary,
        },
        pressed: base.pressed,
      };

    case 'danger':
      return {
        button: {
          ...base.button,
          backgroundColor: colors.danger,
        },
        text: {
          ...base.text,
          color: colors.accentForeground,
        },
        pressed: base.pressed,
      };

    default:
      return {
        button: base.button,
        text: base.text,
        pressed: base.pressed,
      };
  }
};
