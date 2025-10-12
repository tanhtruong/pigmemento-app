import React, { useCallback, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "navigation/RootNavigator";
import { Label, labelSchema } from "@lib/types/case";
import { useAnswerTimer } from "@features/cases/hooks/use-answer-timer";
import { useCase } from "@features/cases/api/use-case";
import { useSubmitAnswer } from "@features/cases/api/use-submit-answer";
import { colors } from "@lib/theme/colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const quizSchema = z.object({
  caseId: z.string().uuid(),
  answer: labelSchema,
  timeToAnswerMs: z.number(),
});

export default function QuizScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Quiz">) {
  const caseId = route.params?.caseId!;
  const { data } = useCase(caseId);

  const { start, stop, reset } = useAnswerTimer();
  const { mutate: submitAttempt, isPending } = useSubmitAnswer();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      caseId,
      answer: undefined as unknown as Label,
      timeToAnswerMs: 0,
    },
  });

  useFocusEffect(
    useCallback(() => {
      start();
      return () => reset();
    }, [start, reset])
  );

  const selected = watch("answer");

  const onSubmit = async (values: z.infer<typeof quizSchema>) => {
    const timeToAnswerMs = stop();

    submitAttempt(
      {
        caseId: values.caseId,
        answer: values.answer,
        timeToAnswerMs: values.timeToAnswerMs,
      },
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

        <Controller
          control={control}
          name="answer"
          render={({ field: { value, onChange } }) => (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => onChange("benign")}
                accessibilityRole="button"
                accessibilityState={{ selected: value === "benign" }}
                style={{
                  flex: 1,
                  backgroundColor:
                    value === "benign" ? colors.success : colors.card,
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
                onPress={() => onChange("malignant")}
                accessibilityRole="button"
                accessibilityState={{ selected: value === "malignant" }}
                style={{
                  flex: 1,
                  backgroundColor:
                    value === "malignant" ? colors.danger : colors.card,
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
          )}
        />

        {!!errors.answer && (
          <Text style={{ color: colors.danger, marginTop: 8 }}>
            {errors.answer.message}
          </Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
          style={{
            marginTop: 16,
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 12,
            alignItems: "center",
            opacity: !selected || isSubmitting ? 0.7 : 1,
          }}
        >
          <Text
            style={{ color: colors["primary-foreground"], fontWeight: "700" }}
          >
            {isPending ? "Submitting…" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
