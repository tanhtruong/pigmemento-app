import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import { colors } from "../theme/colors";
import { Text, View } from "react-native";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import CaseListScreen from "../screens/cases/CaseListScreen";
import QuizScreen from "../screens/quiz/QuizScreen";
import ReviewScreen from "../screens/quiz/ReviewScreen";
import DashboardScreen from "../screens/dashboard/DashboardScreen";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CaseList: undefined;
  Quiz: { caseId: string } | undefined;
  Review: { caseId: string; inferId?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const PigmementoTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    text: colors.text,
    primary: colors.primary,
    card: colors.card,
  },
};

export default function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.bg,
        }}
      >
        <Text style={{ color: colors.text }}>Loading…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={PigmementoTheme}>
      <Stack.Navigator>
        {token ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Dashboard" }}
            />
            <Stack.Screen
              name="CaseList"
              component={CaseListScreen}
              options={{ title: "Cases" }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ title: "Quiz" }}
            />
            <Stack.Screen
              name="Review"
              component={ReviewScreen}
              options={{ title: "Guided Review" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
