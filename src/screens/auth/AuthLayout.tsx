import React from "react";
import { View } from "react-native";
import DisclaimerBanner from "../../components/DisclaimerBanner";
import { colors } from "../../theme/colors";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <DisclaimerBanner />
      <View style={{ flex: 1, padding: 20 }}>{children}</View>
    </View>
  );
}
