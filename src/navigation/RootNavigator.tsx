import React from 'react';
import { NavigationContainer, DarkTheme, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import CaseListScreen from '../screens/cases/CaseListScreen';
import QuizScreen from '../screens/quiz/QuizScreen';
import ReviewScreen from '../screens/quiz/ReviewScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import styles from './RootNavigator.styles';
import { colors } from '@lib/theme/colors';
import { AttemptResponse } from '@lib/types/attempt';
import HistoryScreen from '../screens/cases/HistoryScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  CaseList: undefined;
  History: undefined;
  Quiz: { caseId: string } | undefined;
  Review: { caseId: string; attempt?: AttemptResponse } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Theme for @react-navigation using your tokens
const PigmementoTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    text: colors.textPrimary,
    primary: colors.accent, // used for links/ripples and header tint fallback
    card: colors.surface, // header background
    border: colors.border,
    notification: colors.accent, // snackbars/toasts
  },
};

export default function RootNavigator() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={PigmementoTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTitleStyle: { color: colors.textPrimary, fontWeight: '700' },
          headerTintColor: colors.accent, // back arrow & action color
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
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
            <Stack.Screen name="CaseList" component={CaseListScreen} options={{ title: 'Cases' }} />
            <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
            <Stack.Screen name="Review" component={ReviewScreen} options={{ title: 'Guided Review' }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
