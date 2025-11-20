import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import React, { useCallback, useEffect, useState } from 'react';
import { useDrillCases } from '@features/cases/api/use-drill-cases';
import { useFocusEffect } from '@react-navigation/native';
import { useAnswerTimer } from '@features/cases/hooks/use-answer-timer';
import { useSubmitAnswer } from '@features/cases/api/use-submit-answer';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { useCase } from '@features/cases/api/use-case';
import { useDrillStyles } from './Drill.styles';
import { Controller, useForm } from 'react-hook-form';
import { ChoiceButton } from '@components/buttons/ChoiceButton';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@lib/types/case';
import { attemptSchema } from '../quiz/QuizScreen';
import { colors } from '@lib/theme';
import z from 'zod';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';
import { ProgressBar } from '@components/ProgressBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Drill'>;

export default function DrillScreen({ route, navigation }: Props) {
  const { limit } = route.params as { limit?: number };
  const styles = useDrillStyles();
  const queryClient = useQueryClient();

  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<{ caseId: string; correct: boolean; timeToAnswerMs: number }[]>([]);

  const { data: cases = [], isLoading } = useDrillCases(limit);
  const { mutate: submitAttempt, isPending } = useSubmitAnswer();

  const { start, stop, reset } = useAnswerTimer();

  useFocusEffect(
    useCallback(() => {
      reset();
      start();
      return () => {
        stop();
        reset();
      };
    }, [start, reset, stop]),
  );

  useEffect(() => {
    if (cases.length === 0) return;
    reset();
    start();
  }, [index, cases.length, reset, start]);

  const {
    control,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(attemptSchema),
    defaultValues: {
      chosenLabel: undefined as unknown as Label,
      timeToAnswerMs: 0,
    },
  });

  const selected = watch('chosenLabel');
  const disabled = isPending || isSubmitting || !selected;

  const onPressSubmit = async () => {
    await handleSubmit(onSubmit)();
  };

  const onSubmit = async (values: z.infer<typeof attemptSchema>) => {
    const current = cases[index];
    if (!current) return;

    // this is the per-case time in ms
    const timeToAnswerMs = stop();

    if (timeToAnswerMs === 0) {
      // Timer never started or something weird; restart and bail
      reset();
      start();
      return;
    }

    submitAttempt(
      {
        caseId: current.id,
        attempt: {
          chosenLabel: values.chosenLabel,
          timeToAnswerMs,
        },
      },
      {
        onSuccess: (result) => {
          const correct = result.correct;

          setAnswers((prev) => [
            ...prev,
            {
              caseId: current.id,
              correct,
              timeToAnswerMs,
            },
          ]);

          resetForm();

          const nextCorrectCount = correct ? correctCount + 1 : correctCount;
          setCorrectCount(nextCorrectCount);

          const isLast = index + 1 >= cases.length;

          if (isLast) {
            const totalTimeMs = answers.reduce((sum, a) => sum + a.timeToAnswerMs, 0) + timeToAnswerMs;
            const averageTimeMs = totalTimeMs / (answers.length + 1);

            queryClient.invalidateQueries({ queryKey: queryKeys['drill-cases'] });
            navigation.replace('DrillSummary', {
              total: cases.length,
              correct: nextCorrectCount,
              averageTimeMs,
            });
          } else {
            setIndex((prev) => prev + 1);
          }
        },
        onError: () => {
          reset();
          start();
        },
      },
    );
  };

  if (isLoading && cases.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} />
        <Text style={styles.loadingText}>Loading cases…</Text>
      </View>
    );
  }

  const current = cases[index];
  if (!current) return null;

  const progress = (index + 1) / cases.length;

  return (
    <View style={{ flex: 1 }}>
      {/* simple progress bar */}

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        <View style={{ marginBottom: 10, gap: 5 }}>
          <ProgressBar progress={progress} />

          <Text style={styles.clinicalLabel}>
            Case {index + 1} / {cases.length}
          </Text>
        </View>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: cases[index].imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Clinical context */}
        <View style={styles.clinicalCard}>
          <Text style={styles.clinicalLabel}>Clinical context</Text>
          <Text style={styles.clinicalMain}>
            {cases[index].patientAge}-year-old · {cases[index].site}
          </Text>
          {!!cases[index].clinicalNote && <Text style={styles.clinicalNote}>{cases[index].clinicalNote}</Text>}
        </View>

        {/* Question */}
        <Text style={styles.questionTitle}>Your impression?</Text>
        <Text style={styles.questionHelp}>
          Choose the single best option based on dermatoscopic appearance and minimal clinical info.
        </Text>

        {/* Choices */}
        <Controller
          control={control}
          name="chosenLabel"
          render={({ field: { value, onChange } }) => (
            <View style={styles.choicesRow}>
              <ChoiceButton
                label="Benign"
                selected={value === 'benign'}
                onPress={() => onChange('benign')}
              />
              <ChoiceButton
                label="Malignant"
                selected={value === 'malignant'}
                onPress={() => onChange('malignant')}
              />
            </View>
          )}
        />

        {!!errors.chosenLabel && <Text style={styles.errorText}>{errors.chosenLabel.message}</Text>}

        {/* Submit */}
        <Pressable
          onPress={onPressSubmit}
          disabled={disabled}
          style={[styles.submitButton, disabled && styles.submitButtonDisabled]}
        >
          <Text style={styles.submitText}>{isPending || isSubmitting ? 'Submitting…' : 'Submit answer'}</Text>
        </Pressable>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Pigmemento is for educational training only. Do not use this app to diagnose or manage patients.
        </Text>
      </ScrollView>
    </View>
  );
}
