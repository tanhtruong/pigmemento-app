import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useCaseHistory } from '@features/cases/api/use-case-history';
import { FlatList, Text, View } from 'react-native';
import { CaseListItemCard } from '@features/cases/components/CaseListItemCard';
import styles from './HistoryScreen.styles';

export default function HistoryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'History'>) {
  const { data, isLoading } = useCaseHistory();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CaseListItemCard
            item={item}
            onPress={() => navigation.navigate('Review', { caseId: item.id })}
            floatingPill
          />
        )}
        ListEmptyComponent={!isLoading ? <Text style={styles.emptyText}>No cases.</Text> : null}
      />
    </View>
  );
}
