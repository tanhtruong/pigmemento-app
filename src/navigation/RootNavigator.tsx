import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CasesScreen from '../screens/cases/CasesScreen';
import QuizScreen from '../screens/quiz/QuizScreen';
import ReviewScreen from '../screens/review/ReviewScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import { AttemptResponse } from '@lib/types/attempt';
import HistoryScreen from '../screens/history/HistoryScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { useTheme } from '@lib/theme/ThemeProvider';
import DrillScreen from '../screens/drill/DrillScreen';
import DrillSummaryScreen from '../screens/drill/DrillSummaryScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CaseList: undefined;
  Drill: { limit: number } | undefined;
  DrillSummary: { total: number; correct: number; averageTimeMs: number } | undefined;
  History: undefined;
  Quiz: { caseId: string } | undefined;
  Review: { caseId: string; attempt?: AttemptResponse } | undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();
  const { colors, isDark } = useTheme();
  const { screenOptions, styles } = useRootNavigatorStyles();

  const navTheme: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    dark: isDark,
    colors: {
      ...colors,
      primary: colors.accent,
      background: colors.background,
      text: colors.textPrimary,
      card: colors.surface,
      border: colors.border,
      notification: colors.accent,
    },
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={screenOptions}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                title: 'Dashboard',
                headerBackVisible: false, // no back button here
              }}
            />
            <Stack.Screen
              name="CaseList"
              component={CasesScreen}
              options={{ title: 'Cases' }}
            />
            <Stack.Screen
              name="Drill"
              component={DrillScreen}
              options={{ title: 'Drill' }}
            />
            <Stack.Screen
              name="DrillSummary"
              component={DrillSummaryScreen}
              options={{ title: 'Drill Summary' }}
            />
            <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{ title: 'History' }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ title: 'Quiz' }}
            />
            <Stack.Screen
              name="Review"
              component={ReviewScreen}
              options={{ title: 'Guided Review' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
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

const useRootNavigatorStyles = () => {
  const { colors } = useTheme();

  const screenOptions: NativeStackNavigationOptions = {
    headerStyle: { backgroundColor: colors.surface },
    headerTitleStyle: { color: colors.textPrimary, fontWeight: '700' },
    headerTintColor: colors.accent, // back arrow & action color
    contentStyle: { backgroundColor: colors.background },
    animation: 'slide_from_right',
  };

  const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      color: colors.textPrimary,
    },
  });

  return { screenOptions, styles };
};
