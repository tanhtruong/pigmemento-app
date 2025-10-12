import { colors } from "@lib/theme/colors";
import React from "react";
import { View } from "react-native";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1, padding: 20 }}>{children}</View>
    </View>
  );
}
