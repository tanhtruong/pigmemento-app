import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useCase } from '@features/cases/api/use-case';
import { colors } from '@lib/theme/colors';
import { useReviewStyles } from './ReviewScreen.styles';
import { useLatestAttempt } from '@features/cases/api/use-latest-attempt';
import { ResultPill } from '@components/ResultPill';
import { formatMsSmart } from '@lib/helpers/time';

type Props = NativeStackScreenProps<RootStackParamList, 'CaseReview'>;

export default function CaseReviewScreen({ route, navigation }: Props) {
  const { caseId } = route.params as { caseId: string };
  const styles = useReviewStyles();

  const { data: detail, isLoading: isCaseLoading } = useCase(caseId);
  const { data: attempt, isLoading: isAttemptLoading } = useLatestAttempt(caseId);

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

  const handleBack = () => navigation.navigate('Dashboard');
  const handleNext = () => navigation.navigate('CaseAttempt');

  return (
    <View style={styles.root}>
      {/* Case image */}
      <Image
        source={{ uri: detail.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.body}>
        {/* Result pill */}
        <ResultPill isCorrect={isCorrect} />

        {/* Clinical context */}
        <View style={styles.clinicalCard}>
          <Text style={styles.clinicalLabel}>Clinical context</Text>
          <Text style={styles.clinicalMain}>
            {detail.patientAge ? `${detail.patientAge}-year-old` : 'Age not specified'} ·{' '}
            {detail.site || 'Site not specified'}
          </Text>
          {!!detail.clinicalNote && <Text style={styles.clinicalNote}>{detail.clinicalNote}</Text>}
        </View>

        {/* Answer vs truth */}
        <View style={styles.answerRow}>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Your answer</Text>
            <Text style={[styles.answerValue, { color: isCorrect ? colors.success : colors.danger }]}>
              {attempt.chosenLabel}
            </Text>
          </View>
          <View style={styles.answerBlock}>
            <Text style={styles.answerLabel}>Correct label</Text>
            <Text style={styles.answerValue}>{attempt.correctLabel}</Text>
          </View>
        </View>
        <View style={styles.clinicalCard}>
          <Text style={styles.clinicalLabel}>Time to Answer</Text>
          <Text style={styles.clinicalMain}>{formatMsSmart(attempt.timeToAnswerMs)}</Text>
        </View>

        {/* Teaching points */}
        <View style={styles.teachingCard}>
          <Text style={styles.subheading}>Teaching points</Text>
          <FlatList
            data={attempt.teachingPoints}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item }) => <Text style={styles.bullet}>• {item}</Text>}
            ListEmptyComponent={
              <Text style={styles.muted}>
                No case-specific teaching points yet. Focus on matching your reasoning to the ground truth pattern.
              </Text>
            }
          />
        </View>

        <View style={{ flex: 1 }} />

        {/* Navigation actions */}
        <View style={styles.actionsRow}>
          <Pressable
            style={styles.secondaryButton}
            onPress={handleBack}
          >
            <Text style={styles.secondaryText}>Back to dashboard</Text>
          </Pressable>
          <Pressable
            style={styles.primaryButton}
            onPress={handleNext}
          >
            <Text style={styles.primaryText}>Next case</Text>
          </Pressable>
        </View>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          {attempt.disclaimer ?? 'Educational use only — not for diagnosis or patient management.'}
        </Text>
      </View>
    </View>
  );
}
