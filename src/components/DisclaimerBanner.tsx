import React from "react";
import { View, Text } from "react-native";
import { colors } from "../theme/colors";

export default function DisclaimerBanner() {
  return (
    <View
      style={{
        backgroundColor: "#1F2937",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#374151",
      }}
    >
      <Text style={{ color: colors.warning, fontWeight: "700" }}>
        Educational use only - not for diagnosis.
      </Text>
    </View>
  );
}
