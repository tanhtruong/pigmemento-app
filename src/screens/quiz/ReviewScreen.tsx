import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { api } from "../../lib/api";
import { CaseDetail, InferResponseDto } from "../../types";
import { colors } from "../../theme/colors";
import CameraOverlay from "../../components/CameraOverlay";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export default function ReviewScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, "Review">) {
  const { caseId } = route.params!;
  const [detail, setDetail] = useState<CaseDetail | null>(null);
  const [infer, setInfer] = useState<InferResponseDto | null>(null);

  useEffect(() => {
    (async () => {
      const caseRes = await api.get<CaseDetail>(`/cases/${caseId}`);
      setDetail(caseRes.data);
      const inferRes = await api.get<InferResponseDto>(
        `/infer/result?caseId=${caseId}`
      ); // or returned immediately from /infer
      setInfer(inferRes.data);
    })();
  }, [caseId]);

  if (!detail || !infer)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.bg,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text }}>Loading…</Text>
      </View>
    );

  const correct =
    infer.probs.malignant > infer.probs.benign ? "malignant" : "benign";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <CameraOverlay imageUrl={detail.imageUrl} camUrl={infer.camPngUrl} />
      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 8,
          }}
        >
          Model probabilities
        </Text>
        <Text style={{ color: colors.text }}>
          Benign: {(infer.probs.benign * 100).toFixed(1)}%
        </Text>
        <Text style={{ color: colors.text, marginBottom: 12 }}>
          Malignant: {(infer.probs.malignant * 100).toFixed(1)}%
        </Text>
        <Text style={{ color: colors.muted, marginBottom: 12 }}>
          Truth label:{" "}
          <Text style={{ color: colors.text, fontWeight: "700" }}>
            {detail.label || "hidden in quiz list"}
          </Text>
        </Text>
        <Text
          style={{ color: colors.text, fontWeight: "700", marginBottom: 8 }}
        >
          Teaching points
        </Text>
        <FlatList
          data={detail.teachingPoints || []}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({ item }) => (
            <Text style={{ color: colors.muted, marginBottom: 6 }}>
              • {item}
            </Text>
          )}
          ListEmptyComponent={
            <Text style={{ color: colors.muted }}>No teaching points.</Text>
          }
        />
      </View>
    </View>
  );
}
