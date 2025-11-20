import React, { useCallback } from 'react';
import { View, Text, Image, Pressable, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/RootNavigator';
import { Label, labelSchema } from '@lib/types/case';
import { useAnswerTimer } from '@features/cases/hooks/use-answer-timer';
import { useCase } from '@features/cases/api/use-case';
import { useSubmitAnswer } from '@features/cases/api/use-submit-answer';
import { colors } from '@lib/theme/colors'; // uses your new palette
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { isAxiosError } from 'axios';
import { useRandomCase } from '@features/cases/api/use-random-case';
import { useQuizStyles } from './CaseAttemptScreen.styles';
import { ChoiceButton } from '@components/buttons/ChoiceButton';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@lib/query-keys';

export const attemptSchema = z.object({
  chosenLabel: labelSchema,
  timeToAnswerMs: z.number(),
});

type Props = NativeStackScreenProps<RootStackParamList, 'CaseAttempt'>;

export default function CaseAttemptScreen({ route, navigation }: Props) {
  const paramCaseId = route.params?.caseId;
  const styles = useQuizStyles();
  const queryClient = useQueryClient();

  // If no caseId provided -> get random unseen case
  const { data: randomCase, isLoading: isRandomLoading, isError: isRandomError } = useRandomCase(!paramCaseId);

  const caseId = paramCaseId ?? randomCase?.id;

  const { data, isLoading: isCaseLoading, isError: isCaseError } = useCase(caseId!);

  const { start, stop, reset } = useAnswerTimer();
  const { mutate: submitAttempt, isPending } = useSubmitAnswer();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(attemptSchema),
    defaultValues: {
      chosenLabel: undefined as unknown as Label,
      timeToAnswerMs: 0,
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (!caseId) return;
      start();
      return () => reset();
    }, [start, reset, caseId]),
  );

  const selected = watch('chosenLabel');
  const disabled = isPending || isSubmitting || !selected;

  const onPressSubmit = async () => {
    await handleSubmit(onSubmit)();
  };

  const onSubmit = async (values: z.infer<typeof attemptSchema>) => {
    if (!caseId) return;
    const timeToAnswerMs = stop();

    submitAttempt(
      {
        caseId,
        attempt: {
          chosenLabel: values.chosenLabel,
          timeToAnswerMs, // include if your API expects it
        },
      },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.cases,
          });
          navigation.replace('CaseReview', { caseId });
        },
        onError: (e) => {
          if (isAxiosError(e)) {
            Alert.alert(e.response?.data?.error ?? 'Something went wrong. Try again.');
          } else {
            Alert.alert('Something went wrong. Try again.');
          }
        },
      },
    );
  };

  if (isRandomError || isCaseError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Couldn’t load a new case. Try again later.</Text>
      </View>
    );
  }

  if (!caseId || isRandomLoading || isCaseLoading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.accent} />
        <Text style={styles.loadingText}>Loading case…</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        bounces={false}
      >
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: data.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Clinical context */}
        <View style={styles.clinicalCard}>
          <Text style={styles.clinicalLabel}>Clinical context</Text>
          <Text style={styles.clinicalMain}>
            {data.patientAge}-year-old · {data.site}
          </Text>
          {!!data.clinicalNote && <Text style={styles.clinicalNote}>{data.clinicalNote}</Text>}
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
