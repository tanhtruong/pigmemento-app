import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { api } from "../../lib/api";
import { CaseDto } from "../../types";
import { colors } from "../../theme/colors";
import DisclaimerBanner from "../../components/DisclaimerBanner";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export default function CaseListScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "CaseList">) {
  const [cases, setCases] = useState<CaseDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<CaseDto[]>("/cases?limit=50");
        setCases(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <DisclaimerBanner />
      <FlatList
        data={cases}
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
          !loading ? (
            <Text style={{ color: colors.muted, padding: 20 }}>
              No cases yet.
            </Text>
          ) : null
        }
      />
    </View>
  );
}
