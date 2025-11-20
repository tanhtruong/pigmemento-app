import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@lib/theme/ThemeProvider';
import { radii } from '@lib/theme';

type ProgressBarProps = {
  progress: number;
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 8,
        backgroundColor: colors.accent + '40',
        borderRadius: radii.full,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          height: 8,
          width: `${progress * 100}%`,
          backgroundColor: colors.accent,
        }}
      />
    </View>
  );
};
