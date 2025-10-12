import React from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./src/lib/theme/colors";
import DisclaimerBanner from "./src/components/DisclaimerBanner";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar style="light" />
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
          <DisclaimerBanner />
          <View style={{ flex: 1 }}>
            <RootNavigator />
          </View>
        </SafeAreaView>
      </AuthProvider>
    </QueryClientProvider>
  );
}
