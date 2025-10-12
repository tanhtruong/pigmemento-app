import { useCallback, useLayoutEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootNavigator";
import { useProgress } from "@features/dashboard/api/use-progress";
import { useDrillsDue } from "@features/dashboard/api/use-drills-due";
import { useRecentAttempts } from "@features/dashboard/api/use-recent-attempts";
import { useAuth } from "context/AuthContext";
import { colors } from "@lib/theme/colors";
import StatCard from "@components/StatCard";
import MiniTrendChart from "@components/MiniTrendChart";
import { Check, Dot, X } from "lucide-react-native";
import { useDailyAttempts } from "@features/dashboard/api/use-daily-attempts";

export default function DashboardScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Dashboard">) {
  const { data: progress } = useProgress();
  const { data: drills } = useDrillsDue();
  const { data: recent } = useRecentAttempts();
  const { data: dailyAttempts } = useDailyAttempts();

  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={handleLogout}
          style={{ paddingVertical: 4 }}
          hitSlop={8}
        >
          <Text style={{ color: colors.danger, fontWeight: "600" }}>
            Logout
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, handleLogout]);

  const accuracy = progress ? `${Math.round(progress.accuracy * 100)}%` : "—";
  const sens = progress ? `${Math.round(progress.sensitivity * 100)}%` : "—";
  const spec = progress ? `${Math.round(progress.specificity * 100)}%` : "—";
  const avgTime = progress ? `${Math.round(progress.avgTimeMs / 1000)}s` : "—";
  const trend = progress?.trend?.map((t) => t.sensitivity ?? 0.0) ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ padding: 16, gap: 12 }}>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>
          Dashboard
        </Text>
        <Text style={{ color: colors.muted }}>
          Welcome back - keep training your recognition skills.
        </Text>

        {/* Stats Grid */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <StatCard
            label="Accuracy"
            value={accuracy}
            hint={`${progress?.totalAttempts ?? 0} cases`}
          />
          <StatCard label="Sensitivity" value={sens} hint="Target ≥ 92%" />
        </View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <StatCard label="Specificity" value={spec} />
          <StatCard label="Avg time" value={avgTime} />
        </View>

        {/* Trend */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 14,
            borderRadius: 16,
          }}
        >
          <Text
            style={{ color: colors.text, fontWeight: "700", marginBottom: 8 }}
          >
            Sensitivity trend
          </Text>
          <MiniTrendChart
            data={
              trend.length ? trend : [0.7, 0.72, 0.74, 0.73, 0.76, 0.78, 0.8]
            }
          />
        </View>

        {/* Drills */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 14,
            borderRadius: 16,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: colors.text, fontWeight: "700" }}>
              Spaced repetition
            </Text>
            <Text style={{ color: colors.muted }}>
              {drills.count} cases due{" "}
              {drills.nextDueAt
                ? `· next ${new Date(drills.nextDueAt).toLocaleDateString()}`
                : ""}
            </Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("CaseList")}
            style={{
              backgroundColor: colors.primary,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "#0B1220", fontWeight: "700" }}>
              Start drill
            </Text>
          </Pressable>
        </View>

        {/* Recent Attempts */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 14,
            borderRadius: 16,
          }}
        >
          <Text
            style={{ color: colors.text, fontWeight: "700", marginBottom: 8 }}
          >
            Recent activity
          </Text>
          <FlatList
            data={recent.items}
            keyExtractor={(x) => x.id}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Review", { caseId: item.caseId })
                }
                style={{
                  backgroundColor: "#0F172A",
                  borderRadius: 12,
                  padding: 12,
                }}
              >
                <Text style={{ color: colors.text, fontWeight: "600" }}>
                  Case #{item.caseId.slice(0, 6)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {item.correct ? (
                    <>
                      <Check color={colors.success} />
                      <Text style={{ color: colors.success, marginLeft: 2 }}>
                        Correct
                      </Text>
                    </>
                  ) : (
                    <>
                      <X color={colors.danger} />
                      <Text style={{ color: colors.danger, marginLeft: 2 }}>
                        Incorrect
                      </Text>
                    </>
                  )}

                  <Dot color={colors.text} />

                  <Text style={{ color: colors.muted }}>{item.answer}</Text>

                  <Dot color={colors.text} />

                  <Text style={{ color: colors.muted }}>
                    {Math.round(item.timeToAnswerMs / 1000)}s
                  </Text>

                  <Dot color={colors.text} />

                  <Text style={{ color: colors.muted }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Text>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={{ color: colors.muted }}>
                No attempts yet. Try a quiz!
              </Text>
            }
          />
        </View>
      </View>
    </View>
  );
}
