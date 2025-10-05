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
import { useAuth } from "../../context/AuthContext";

export default function DashboardScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Dashboard">) {
  const [cases, setCases] = useState<CaseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    void logout();
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<CaseDto[]>("/cases?limit=10");
        setCases(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <DisclaimerBanner />
      <Text style={{ color: colors.muted, padding: 20 }}>Dashboard.</Text>
    </View>
  );
}
