import React from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useTheme } from '@lib/theme/ThemeProvider';
import { radii, spacing, useTypography } from '@lib/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Sources'>;

type SourceItem = {
  title: string;
  subtitle?: string;
  url: string;
};

const SOURCES: SourceItem[] = [
  {
    title: 'American Academy of Dermatology (AAD)',
    subtitle: 'Melanoma overview and ABCDE rule',
    url: 'https://www.aad.org/public/diseases/skin-cancer/melanoma',
  },
  {
    title: 'DermNet NZ',
    subtitle: 'Melanoma',
    url: 'https://dermnetnz.org/topics/melanoma',
  },
  {
    title: 'NCCN',
    subtitle: 'Guidelines (Category 1)',
    url: 'https://www.nccn.org/guidelines/category_1',
  },
  {
    title: 'International Skin Imaging Collaboration (ISIC)',
    subtitle: 'ISIC Archive',
    url: 'https://www.isic-archive.com',
  },
  {
    title: 'Esteva et al., Nature (2017)',
    subtitle: 'Dermatologist-level classification of skin cancer with deep neural networks',
    url: 'https://www.nature.com/articles/nature21056',
  },
];

export default function SourcesScreen({}: Props) {
  const styles = useStyles();

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Cannot open link', 'This link could not be opened on this device.');
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Something went wrong', 'We could not open this link. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Educational use only — not for diagnosis</Text>
        </View>

        <Text style={styles.body}>
          Pigmemento includes educational medical content about skin lesions and melanoma recognition training. Teaching
          points and educational summaries are based on publicly available guidelines and peer-reviewed sources listed
          below.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>References</Text>

        {SOURCES.map((s) => (
          <TouchableOpacity
            key={s.url}
            style={styles.sourceRow}
            onPress={() => openUrl(s.url)}
          >
            <View style={styles.sourceTextWrap}>
              <Text style={styles.sourceTitle}>{s.title}</Text>
              {s.subtitle ? <Text style={styles.sourceSubtitle}>{s.subtitle}</Text> : null}
              <Text
                style={styles.sourceUrl}
                numberOfLines={1}
              >
                {s.url}
              </Text>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <Text style={styles.body}>
          If you believe any information in the app is inaccurate or outdated, contact us at{' '}
          <Text
            style={styles.sourceUrl}
            onPress={() => Linking.openURL('mailto:contact@pigmemento.app?subject=Pigmemento%20App%20Feedback')}
          >
            contact@pigmemento.app
          </Text>
          .
        </Text>
      </View>
    </ScrollView>
  );
}

const useStyles = () => {
  const { colors } = useTheme();
  const typography = useTypography();

  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingBottom: spacing.xl,
      backgroundColor: colors.background,
      flexGrow: 1,
      gap: spacing.md,
    },

    headerCard: {
      backgroundColor: colors.surface,
      borderRadius: radii.card,
      padding: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },

    card: {
      backgroundColor: colors.surface,
      borderRadius: radii.card,
      padding: spacing.md,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
    },

    title: {
      ...typography.title,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },

    sectionTitle: {
      ...typography.subtitle,
      color: colors.textPrimary,
      marginBottom: spacing.sm,
    },

    body: {
      ...typography.body,
      color: colors.textSecondary,
    },

    badge: {
      alignSelf: 'flex-start',
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
      borderRadius: 999,
      backgroundColor: colors.background,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border,
      marginBottom: spacing.sm,
    },

    badgeText: {
      ...typography.small,
      color: colors.accent,
      fontWeight: '600',
    },

    sourceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.card,
      backgroundColor: colors.background,
      marginBottom: spacing.sm,
      gap: spacing.sm,
    },

    sourceTextWrap: {
      flex: 1,
    },

    sourceTitle: {
      ...typography.body,
      color: colors.textPrimary,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },

    sourceSubtitle: {
      ...typography.small,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },

    sourceUrl: {
      ...typography.small,
      color: colors.accent,
    },

    chevron: {
      ...typography.body,
      color: colors.textSecondary,
      fontSize: 18,
      paddingLeft: spacing.sm,
    },
  });
};
