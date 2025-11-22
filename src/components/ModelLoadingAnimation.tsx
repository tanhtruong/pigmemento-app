import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { MODEL_NAME } from '@lib/constants/model';
import { spacing, useTypography } from '@lib/theme';
import { useTheme } from '@lib/theme/ThemeProvider';

export const ModelLoadingAnimation = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -4,
            duration: 250,
            useNativeDriver: true,
            delay,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.delay(150),
        ]),
      );

    const anim1 = createAnimation(dot1, 0);
    const anim2 = createAnimation(dot2, 100);
    const anim3 = createAnimation(dot3, 200);

    anim1.start();
    anim2.start();
    anim3.start();

    return () => {
      anim1.stop();
      anim2.stop();
      anim3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View
      style={{
        alignItems: 'flex-start',
        gap: spacing.xs,
      }}
    >
      <Text
        style={{
          ...typography.subtitle,
          color: colors.textPrimary,
          fontWeight: '600',
        }}
      >
        {MODEL_NAME} is analysing this case...
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: spacing.xs,
          paddingVertical: spacing.md,
        }}
      >
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: colors.accent,
              transform: [{ translateY: dot }],
            }}
          />
        ))}
      </View>
    </View>
  );
};
