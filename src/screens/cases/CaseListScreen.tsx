import { View, Text, FlatList, Pressable, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootNavigator";
import { colors } from "@lib/theme/colors";
import { useCases } from "@features/cases/api/use-cases";
import { useDailyAttempts } from "@features/dashboard/api/use-daily-attempts";
import { useEffect } from "react";

export default function CaseListScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CaseList">) {
  const { data, isLoading } = useCases();
  const { data: dailyAttempts } = useDailyAttempts();

  useEffect(() => {
    if (dailyAttempts.remaining === 0) {
      navigation.navigate("Dashboard");
    }
  }, [dailyAttempts]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Quiz", { caseId: item.id })}
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              marginBottom: 12,
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View style={{ padding: 12 }}>
              <Text style={{ color: colors.text, fontWeight: "700" }}>
                Case #{item.id.slice(0, 6)}
              </Text>
              <Text style={{ color: colors.muted }}>
                Difficulty: {item.difficulty} · Site:{" "}
                {item.patient?.site || "—"}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={{ color: colors.muted, padding: 20 }}>
              No cases yet.
            </Text>
          ) : null
        }
      />
    </View>
  );
}
