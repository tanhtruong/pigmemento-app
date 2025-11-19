import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootNavigator';
import { useCases } from '@features/cases/api/use-cases';
import { useCasesStyles } from './CasesScreen.styles';
import { CaseListItemCard } from '@features/cases/components/CaseListItemCard';

export default function CasesScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CaseList'>) {
  const { data, isLoading } = useCases();
  const styles = useCasesStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CaseListItemCard
            item={item}
            onPress={() => navigation.navigate('Quiz', { caseId: item.id })}
          />
        )}
        ListEmptyComponent={!isLoading ? <Text style={styles.emptyText}>No cases yet.</Text> : null}
      />
    </View>
  );
}
