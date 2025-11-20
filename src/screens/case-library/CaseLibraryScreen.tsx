import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootNavigator';
import { useCases } from '@features/cases/api/use-cases';
import { useCaseLibraryStyles } from './CaseLibraryScreen.styles';
import { CaseListItemCard } from '@features/cases/components/CaseListItemCard';

export default function CaseLibraryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'CaseLibrary'>) {
  const { data, isLoading } = useCases();
  const styles = useCaseLibraryStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CaseListItemCard
            item={item}
            onPress={() => navigation.navigate('CaseAttempt', { caseId: item.id })}
          />
        )}
        ListEmptyComponent={!isLoading ? <Text style={styles.emptyText}>No cases yet.</Text> : null}
      />
    </View>
  );
}
