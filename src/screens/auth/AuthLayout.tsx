import React from 'react';
import { View } from 'react-native';
import { useAuthStyles } from './Auth.styles';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const styles = useAuthStyles();

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
