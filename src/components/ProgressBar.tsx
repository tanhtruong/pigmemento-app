import { StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@lib/theme/ThemeProvider';
import { radii } from '@lib/theme';

type ProgressBarProps = {
  progress: number; // between 0 and 1
};

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  const { colors } = useTheme();

  // Holds the animated progress value (0 → progress)
  const animated = useRef(new Animated.Value(0)).current;

  // Animate whenever progress changes
  useEffect(() => {
    Animated.timing(animated, {
      toValue: progress,
      duration: 800,
      useNativeDriver: false, // width animation can't use native driver
    }).start();
  }, [progress]);

  // Interpolate animated value into width %
  const width = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View
      style={{
        height: 8,
        backgroundColor: colors.accent + '40',
        borderRadius: radii.full,
        overflow: 'hidden',
      }}
    >
      <Animated.View
        style={{
          height: 8,
          backgroundColor: colors.accent,
          width,
        }}
      />
    </View>
  );
};
