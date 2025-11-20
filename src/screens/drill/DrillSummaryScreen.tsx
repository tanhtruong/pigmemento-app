import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useDrillStyles } from './Drill.styles';
import { useTheme } from '@lib/theme/ThemeProvider';
import { ProgressBar } from '@components/ProgressBar';
import { CheckCheck, CheckCircle } from 'lucide-react-native';
import { Button } from '@components/buttons/Button';

export default function DrillSummaryScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'DrillSummary'>) {
  const { total, correct, averageTimeMs } = route.params as { total: number; correct: number; averageTimeMs: number };
  const styles = useDrillStyles();

  const { colors } = useTheme();

  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const avgTimeSec = averageTimeMs > 0 ? (averageTimeMs / 1000).toFixed(1) : null;

  const accuracyLabel = accuracy >= 90 ? 'Excellent' : accuracy >= 75 ? 'Nice work' : 'Good practice';

  const onStartNewDrill = () => {
    navigation.replace('Drill', { limit: total }); // reuse same length
  };

  const onBackHome = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <CheckCircle size={64} />
          <Text style={styles.title}>Drill complete</Text>
          <Text style={styles.subtitle}>{accuracyLabel} session</Text>
        </View>

        {/* Accuracy card */}
        <View style={styles.card}>
          <View style={styles.accuracyRow}>
            <Text style={styles.accuracyValue}>{accuracy}%</Text>
            <Text style={styles.accuracyLabel}>Accuracy</Text>
          </View>

          <ProgressBar progress={total > 0 ? correct / total : 0} />

          <Text style={styles.accuracyDetails}>
            {correct} of {total} cases answered correctly
          </Text>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statPill}>
            <Text style={styles.statLabel}>Correct</Text>
            <Text style={styles.statValue}>
              {correct}/{total}
            </Text>
          </View>

          {avgTimeSec && (
            <View style={styles.statPill}>
              <Text style={styles.statLabel}>Avg. time</Text>
              <Text style={styles.statValue}>{avgTimeSec}s</Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title="Start another drill"
            onPress={onStartNewDrill}
          />

          <Button
            title="Back to home"
            onPress={onBackHome}
            variant="secondary"
          />
        </View>

        <View style={{ flex: 1 }} />

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          Pigmemento is for educational training only. Do not use this app to diagnose or manage patients.
        </Text>
      </ScrollView>
    </View>
  );
}
