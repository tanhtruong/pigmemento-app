import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Library, LogOut, MessageCircleWarningIcon, PlayCircle, School } from 'lucide-react-native';
import styles from './DashboardScreen.styles';
import { colors } from '@lib/theme/colors';
import { PrimaryCard } from '@components/cards/PrimaryCard';
import { SecondaryCard } from '@components/cards/SecondaryCard';
import DisclaimerBanner from '@components/DisclaimerBanner';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // If your navigation tree is auth-conditional, this will kick back to Log in.
  };

  const startQuiz = () => {
    navigation.navigate('CaseList'); // make sure you have this screen wired
  };

  const openGuidedReview = () => {
    // For now this can be a simple screen, or you can wire it later.
    navigation.navigate('GuidedReview');
  };

  const openAttemptHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Pigmemento</Text>
          <Text style={styles.subtitle}>Train your melanoma recognition skills.</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={18} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Main actions */}
      <View style={styles.content}>
        <PrimaryCard
          title="Quiz Library"
          description="See a dermatoscopic case and choose benign vs malignant."
          icon={PlayCircle}
          onPress={startQuiz}
        />

        <SecondaryCard
          title="Attempt history"
          description="See all cases you’ve practiced and how you performed."
          icon={Library}
          onPress={openAttemptHistory}
        />

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Disclaimer */}
        <DisclaimerBanner />
      </View>
    </View>
  );
};

export default DashboardScreen;
