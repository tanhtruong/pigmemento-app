import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useCaseHistory } from '@features/cases/api/use-case-history';
import { FlatList, Text, View } from 'react-native';
import { CaseListItemCard } from '@features/cases/components/CaseListItemCard';
import { useHistoryStyles } from './HistoryScreen.styles';

export default function CaseHistoryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CaseHistory'>) {
  const { data, isLoading } = useCaseHistory();
  const styles = useHistoryStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CaseListItemCard
            item={item}
            onPress={() => navigation.navigate('CaseReview', { caseId: item.id })}
            floatingPill
          />
        )}
        ListEmptyComponent={!isLoading ? <Text style={styles.emptyText}>No cases.</Text> : null}
      />
    </View>
  );
}
