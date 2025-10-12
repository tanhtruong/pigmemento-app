import { colors } from "@lib/theme/colors";
import React from "react";
import { View, Text } from "react-native";

export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 16,
        flex: 1,
      }}
    >
      <Text style={{ color: colors.muted, fontSize: 12 }}>{label}</Text>
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          fontWeight: "800",
          marginTop: 2,
        }}
      >
        {value}
      </Text>
      {hint ? (
        <Text style={{ color: colors.muted, fontSize: 12, marginTop: 6 }}>
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
