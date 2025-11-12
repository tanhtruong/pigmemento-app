import React from "react";
import {StatusBar} from "expo-status-bar";
import {initialWindowMetrics, SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {View} from "react-native";
import {AuthProvider} from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";
import styles from "./App.styles";

const queryClient = new QueryClient();

export default function App() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <StatusBar style="light"/>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.container}>
                            <RootNavigator/>
                        </View>
                    </SafeAreaView>
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaProvider>
    );
}