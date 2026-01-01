import React from 'react';
import { View } from 'react-native';
import { useAuthStyles } from './Auth.styles';
import DisclaimerBanner from '@components/DisclaimerBanner';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const styles = useAuthStyles();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={{ flex: 1 }}>{children}</View>
        <DisclaimerBanner />
      </View>
    </View>
  );
}
