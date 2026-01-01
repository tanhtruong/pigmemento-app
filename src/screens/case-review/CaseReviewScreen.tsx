import { View, Text, FlatList, Image, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useCase } from '@features/cases/api/use-case';
import { useReviewStyles } from './ReviewScreen.styles';
import { useLatestAttempt } from '@features/cases/api/use-latest-attempt';
import { formatMsSmart } from '@lib/helpers/time';
import { useInference } from '@features/inference/api/use-inference';
import { ProgressBar } from '@components/ProgressBar';
import { ModelLoadingAnimation } from '@components/ModelLoadingAnimation';
import { MODEL_NAME } from '@lib/constants/model';
import { getDermLensSummary } from '@lib/helpers/model/dermlens-summary';
import { Check, X } from 'lucide-react-native';
import { useTheme } from '@lib/theme/ThemeProvider';
import { Button } from '@components/buttons/Button';
import { useEffect, useState } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'CaseReview'>;

export default function CaseReviewScreen({ route, navigation }: Props) {
  const { caseId } = route.params as { caseId: string };
  const styles = useReviewStyles();
  const { colors } = useTheme();

  const { data: detail, isLoading: isCaseLoading } = useCase(caseId);
  const { data: attempt, isLoading: isAttemptLoading } = useLatestAttempt(caseId);
  // const { data: inference, isLoading: isInferenceLoading } = useInference(caseId);
  const inferenceMutation = useInference();

  const [showCam, setShowCam] = useState(false);

  // useEffect(() => {
  //   if (!caseId) return;
  //   inferenceMutation.mutate(caseId);
  // }, [caseId]);

  if (isCaseLoading || (!attempt && isAttemptLoading)) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Loading…</Text>
      </View>
    );
  }

  if (!detail || !attempt) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Could not load review for this case.</Text>
      </View>
    );
  }

  const isCorrect = attempt.correct;
  const Result = isCorrect ? Check : X;

  // const inference = inferenceMutation.data;
  // const isInferenceLoading = inferenceMutation.isPending;

  // const hasCam = !!inference?.camPngUrl;
  // const malignantProb = inference?.probs.malignant ?? 0;
  // const benignProb = inference?.probs.benign ?? 0;

  const handleBack = () => navigation.navigate('Dashboard');
  const handleNext = () => navigation.navigate('CaseAttempt');

  return (
    <ScrollView style={styles.root}>
      {/* Case image */}
      <Image
        // source={{ uri: showCam && hasCam ? inference.camPngUrl : detail.imageUrl }}
        source={{ uri: detail.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {/*{hasCam && (
        <View style={styles.camToggleRow}>
          <Text style={styles.camToggleLabel}>{showCam ? 'Model attention map' : 'Original image'}</Text>
          <Button
            title={showCam ? 'Show original' : 'Show heatmap'}
            onPress={() => setShowCam((prev) => !prev)}
            variant="secondary"
            style={styles.camToggleButton}
          />
        </View>
      )}*/}
      {/*<View style={styles.modelCard}>
        {isInferenceLoading && <ModelLoadingAnimation />}
        {!isInferenceLoading && inference && (
          <>
            <View style={styles.modelHeader}>
              <Text style={styles.modelTitle}>{MODEL_NAME}</Text>
            </View>
            <Text style={styles.modelText}>{getDermLensSummary({ benign: benignProb, malignant: malignantProb })}</Text>

            <View style={styles.modelBarRow}>
              <Text style={styles.modelBarLabel}>Malignant probability: {Math.round(malignantProb * 100)}%</Text>
              <ProgressBar progress={malignantProb} />
            </View>
          </>
        )}
      </View>*/}

      <View style={styles.body}>
        {/* Clinical context */}
        <View style={styles.clinicalCard}>
          <Text style={styles.clinicalLabel}>Clinical context</Text>
          {!!detail.clinicalNote && <Text style={styles.clinicalNote}>{detail.clinicalNote}</Text>}
        </View>

        {/* Answer vs truth */}
        <View style={styles.answerRow}>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Your answer</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={[
                  styles.answerValue,
                  { color: isCorrect ? colors.success : colors.danger, textTransform: 'capitalize' },
                ]}
              >
                {attempt.chosenLabel}
              </Text>
              <Result
                size={16}
                style={{ marginLeft: 4 }}
                color={isCorrect ? colors.success : colors.danger}
              />
            </View>
          </View>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Time to Answer</Text>
            <Text style={styles.answerValue}>{formatMsSmart(attempt.timeToAnswerMs)}</Text>
          </View>
        </View>

        {/* Teaching points */}
        <View style={styles.teachingCard}>
          <Text style={styles.clinicalLabel}>Teaching points</Text>

          {attempt.teachingPoints && attempt.teachingPoints.length > 0 ? (
            attempt.teachingPoints.map((tp, idx) => (
              <Text
                key={idx}
                style={styles.bullet}
              >
                • {tp}
              </Text>
            ))
          ) : (
            <Text style={styles.muted}>
              No case-specific teaching points yet. Focus on matching your reasoning to the ground truth pattern.
            </Text>
          )}
        </View>

        <View style={{ flex: 1 }} />

        {/* Navigation actions */}
        <View style={styles.actionsRow}>
          <Button
            title="Back to dashboard"
            onPress={handleBack}
            variant="secondary"
            style={{ flex: 1 }}
          />
          <Button
            title="Next case"
            onPress={handleNext}
            style={{ flex: 1 }}
          />
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          {attempt.disclaimer ?? 'Educational use only — not for diagnosis or patient management.'}
        </Text>
      </View>
    </ScrollView>
  );
}
