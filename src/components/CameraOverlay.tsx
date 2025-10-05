import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function CameraOverlay({
  imageUrl,
  camUrl,
}: {
  imageUrl: string;
  camUrl?: string;
}) {
  return (
    <View style={{ width: "100%", aspectRatio: 1, position: "relative" }}>
      <Image
        source={{ uri: imageUrl }}
        style={StyleSheet.absoluteFillObject as any}
        resizeMode="cover"
      />
      {camUrl && (
        <Image
          source={{ uri: camUrl }}
          style={StyleSheet.absoluteFillObject as any}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
