import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/RootNavigator';
import { useAuth } from '../../context/AuthContext';
import { colors, radii, spacing, typography } from '@lib/theme';
import DisclaimerBanner from '@components/DisclaimerBanner';
import { StatCard } from '@components/cards/StatCard';
import { useProfile } from '@features/profile/api/use-profile';
import { Avatar } from '@components/Avatar';
import { useProfileStats } from '@features/profile/api/use-profile-stats';
import { useDeleteAccount } from '@features/profile/api/use-delete-account';
import { useTheme } from '@lib/theme/ThemeProvider';
import { LogOut } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({}: Props) {
  const { logout } = useAuth();
  const styles = useProfileStyles();

  const { data: user, isLoading: isProfileLoading } = useProfile();
  const { data: stats, isLoading: isStatsLoading } = useProfileStats();

  const { mutateAsync: deleteAccount, isPending: isDeleting } = useDeleteAccount();

  const handleLogout = async () => {
    Alert.alert('Log out', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: async () => await logout() },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      "This will delete your account and anonymise your training history. This action can't be undone.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete account',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
              await logout(); // clear local auth state after backend deletion
            } catch (error) {
              console.error(error);
              Alert.alert('Something went wrong', 'We could not delete your account. Please try again.');
            }
          },
        },
      ],
    );
  };

  const formatPercent = (value: number | null | undefined) => {
    if (value == null) return '—';
    return `${Math.round(value * 100)}%`;
  };

  if (isProfileLoading || !user) {
    return (
      <View>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Account section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={styles.accountHeader}>
              <Avatar label={user.name} />

              <View style={styles.accountText}>
                <Text style={styles.accountName}>{user.name ?? 'Clinician'}</Text>
                <Text style={styles.accountEmail}>{user.email}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut
              size={18}
              color={colors.accent}
            />
          </TouchableOpacity>
        </View>
        {user.createdAt && (
          <Text style={styles.metaText}>Member since {new Date(user.createdAt).toLocaleDateString()}</Text>
        )}
      </View>

      {/* Training stats (placeholder for now) */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Training stats</Text>

        {isStatsLoading && !stats ? (
          <View style={styles.centerRow}>
            <ActivityIndicator color={colors.accent} />
          </View>
        ) : !stats || stats.totalAttempts === 0 ? (
          <Text style={styles.bodyText}>No stats yet. Do a few quizzes and we'll show your performance here.</Text>
        ) : (
          <>
            <View style={styles.statsGrid}>
              <StatCard
                label="Cases attempted"
                value={stats.totalAttempts}
              />
              <StatCard
                label="Unique cases"
                value={stats.uniqueCasesAttempted}
              />
              <StatCard
                label="Sensitivity (melanoma)"
                value={formatPercent(stats.sensitivity)}
              />
              <StatCard
                label="Specificity"
                value={formatPercent(stats.specificity)}
              />
              <StatCard
                label="Overall accuracy"
                value={formatPercent(stats.accuracy)}
              />
            </View>

            <Text style={styles.mutedText}>
              These numbers are for educational use only and should not guide clinical decisions.
            </Text>
          </>
        )}
      </View>

      <View style={{ flex: 1 }} />
      <View style={styles.dangerCard}>
        <Text style={styles.dangerTitle}>Danger zone</Text>
        <Text style={styles.dangerText}>
          Deleting your account will remove your personal information and anonymise your training history. This cannot
          be undone.
        </Text>

        <Pressable
          style={[styles.dangerButton, isDeleting && styles.dangerButtonDisabled]}
          onPress={handleDeleteAccount}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator color={colors.danger} />
          ) : (
            <Text style={styles.dangerButtonText}>Delete account</Text>
          )}
        </Pressable>
      </View>

      <DisclaimerBanner />
    </ScrollView>
  );
}

const useProfileStyles = () => {
  const { colors } = useTheme();

  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
      backgroundColor: colors.background,
      flexGrow: 1,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.card,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },

    sectionTitle: {
      ...typography.subtitle,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },

    accountHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },

    accountText: {
      flex: 1,
    },

    accountName: {
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: spacing.xs,
    },

    accountEmail: {
      ...typography.small,
      color: colors.textSecondary,
    },

    metaText: {
      ...typography.small,
      color: colors.accent,
      marginBottom: spacing.sm,
    },

    logoutButton: {
      padding: spacing.sm,
      borderRadius: radii.full,
      backgroundColor: colors.background,
    },

    logoutButtonText: {
      fontWeight: '600',
      color: colors.textPrimary,
    },

    statsGrid: {
      flexDirection: 'row',
      gap: spacing.sm,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginVertical: spacing.sm,
    },

    centerRow: {
      marginTop: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },

    bodyText: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },

    mutedText: {
      ...typography.small,
      color: colors.accent,
      marginTop: spacing.xs,
    },

    // Danger zone styles
    dangerCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.card,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.danger,
    },
    dangerTitle: {
      ...typography.subtitle,
      color: colors.danger,
      marginBottom: spacing.sm,
    },
    dangerText: {
      ...typography.small,
      color: colors.textSecondary,
      marginBottom: spacing.md,
    },
    dangerButton: {
      alignSelf: 'flex-start',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: radii.full,
      backgroundColor: colors.danger,
    },
    dangerButtonDisabled: {
      opacity: 0.7,
    },
    dangerButtonText: {
      color: colors.accentForeground,
      fontWeight: '600',
    },
  });
};
