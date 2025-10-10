import React, { useCallback, useMemo, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { colors } from "../../theme/colors";
import { api } from "../../lib/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import { AttemptPostRequest, Label } from "../../types";
import { useAnswerTimer } from "../../features/answers/hooks/use-answer-timer";
import { useFocusEffect } from "@react-navigation/native";
import { useCase } from "../../features/cases/api/use-case";
import { useSubmitAnswer } from "../../features/answers/api/use-submit-answer";

export default function QuizScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Quiz">) {
  const caseId = route.params?.caseId!;
  const [answer, setAnswer] = useState<Label | null>(null);
  const { start, stop, reset } = useAnswerTimer();

  const { data } = useCase(caseId);
  const { mutate: submitAttempt, isPending } = useSubmitAnswer();

  useFocusEffect(
    useCallback(() => {
      start();
      return () => reset();
    }, [start, reset])
  );

  const onSubmit = async () => {
    if (!answer) return;
    const timeToAnswerMs = stop();

    submitAttempt(
      { caseId, answer, timeToAnswerMs },
      {
        onSuccess: () => {
          navigation.replace("Review", { caseId });
        },
      }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {data?.imageUrl && (
        <Image
          source={{ uri: data.imageUrl }}
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
          disabled={!answer || isPending}
          style={{
            marginTop: 16,
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#0B1220", fontWeight: "700" }}>
            {isPending ? "Submitting…" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
