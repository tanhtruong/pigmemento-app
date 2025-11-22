import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import CaseLibraryScreen from '../screens/case-library/CaseLibraryScreen';
import DrillScreen from '../screens/drill/DrillScreen';
import DrillSummaryScreen from '../screens/drill/DrillSummaryScreen';
import { useTheme } from '@lib/theme/ThemeProvider';
import CaseAttemptScreen from '../screens/case-attempt/CaseAttemptScreen';
import CaseReviewScreen from '../screens/case-review/CaseReviewScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { MissedCaseReviewScreen } from '../screens/case-review/MissedCaseReviewScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CaseHistoryScreen from '../screens/case-history/CaseHistoryScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CaseLibrary: undefined;
  CaseAttempt: { caseId: string } | undefined;
  CaseReview: { caseId: string } | undefined;
  CaseHistory: undefined;
  MissedCaseReview: undefined;
  Drill: { limit: number } | undefined;
  DrillSummary: { total: number; correct: number; averageTimeMs: number } | undefined;
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
              name="CaseLibrary"
              component={CaseLibraryScreen}
              options={{ title: 'Case Library' }}
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
              name="CaseHistory"
              component={CaseHistoryScreen}
              options={{ title: 'Case History' }}
            />
            <Stack.Screen
              name="CaseAttempt"
              component={CaseAttemptScreen}
              options={{ title: 'Case Attempt' }}
            />
            <Stack.Screen
              name="CaseReview"
              component={CaseReviewScreen}
              options={{ title: 'Case Review' }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen
              name="MissedCaseReview"
              component={MissedCaseReviewScreen}
              options={{ title: 'Missed Case Reviews' }}
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
