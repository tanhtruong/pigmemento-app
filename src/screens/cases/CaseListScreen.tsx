import React from "react";
import {View, Text, FlatList, Pressable, Image} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "navigation/RootNavigator";
import {useCases} from "@features/cases/api/use-cases";
import styles from "./CaseListScreen.styles";

export default function CaseListScreen({
                                           navigation,
                                       }: NativeStackScreenProps<RootStackParamList, "CaseList">) {
    const {data, isLoading} = useCases();

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({item}) => (
                    <Pressable
                        onPress={() => navigation.navigate("Quiz", {caseId: item.id})}
                        style={styles.caseCard}
                    >
                        <Image source={{uri: item.imageUrl}} style={styles.image}/>
                        <View style={styles.caseInfo}>
                            <Text style={styles.caseTitle}>
                                Case #{item.id.slice(0, 6)}
                            </Text>
                            <Text style={styles.caseMeta}>
                                Difficulty: {item.difficulty} · Site: {item?.site || "—"}
                            </Text>
                        </View>
                    </Pressable>
                )}
                ListEmptyComponent={
                    !isLoading ? (
                        <Text style={styles.emptyText}>No cases yet.</Text>
                    ) : null
                }
            />
        </View>
    );
}