import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useMistakeCases } from '@features/cases/api/use-mistake-cases';
import { FlatList, Text, View } from 'react-native';
import { Loader } from '@components/Loader';
import { CaseListItemCard } from '@features/cases/components/CaseListItemCard';
import { spacing, useTypography } from '@lib/theme';

type MistakeReviewScreenProps = NativeStackScreenProps<RootStackParamList, 'MissedCaseReview'>;

export const MissedCaseReviewScreen = ({ route, navigation }: MistakeReviewScreenProps) => {
  const { data = [], isLoading } = useMistakeCases();
  const typography = useTypography();

  if (isLoading) {
    return <Loader label="Loading missed cases…" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.lg }}
        renderItem={({ item }) => (
          <CaseListItemCard
            item={item}
            onPress={() => navigation.navigate('CaseAttempt', { caseId: item.id })}
          />
        )}
        ListEmptyComponent={<Text>No missed cases yet. Keep training!</Text>}
      />
    </View>
  );
};
