import React, { useMemo, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { colors } from "../../theme/colors";
import { api } from "../../lib/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export default function QuizScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Quiz">) {
  const caseId = route.params?.caseId!;
  const [answer, setAnswer] = useState<"benign" | "malignant" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const { data } = await api.get(`/cases/${caseId}`); // returns case without truth
      setImageUrl(data.imageUrl);
    })();
  }, [caseId]);

  async function onSubmit() {
    if (!answer) return;
    setSubmitting(true);
    try {
      // Send to inference; backend proxies to ML service and returns probs + cam URL
      const { data } = await api.post("/infer", { caseId, answer });
      navigation.replace("Review", { caseId });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: 340 }}
          resizeMode="cover"
        />
      )}
      <View style={{ padding: 16 }}>
        <Text style={{ color: colors.text, fontSize: 18, marginBottom: 12 }}>
          Your impression?
        </Text>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            onPress={() => setAnswer("benign")}
            style={{
              flex: 1,
              backgroundColor:
                answer === "benign" ? colors.success : colors.card,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              Benign
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setAnswer("malignant")}
            style={{
              flex: 1,
              backgroundColor:
                answer === "malignant" ? colors.danger : colors.card,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              Malignant
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={onSubmit}
          disabled={!answer || submitting}
          style={{
            marginTop: 16,
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#0B1220", fontWeight: "700" }}>
            {submitting ? "Submitting…" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
