import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Library, LogOut, PlayCircle, UserCircle } from 'lucide-react-native';
import { useDashboardStyles } from './DashboardScreen.styles';
import { colors } from '@lib/theme/colors';
import { PrimaryCard } from '@components/cards/PrimaryCard';
import { SecondaryCard } from '@components/cards/SecondaryCard';
import DisclaimerBanner from '@components/DisclaimerBanner';
import { Avatar } from '@components/Avatar';
import { useProfile } from '@features/profile/api/use-profile';

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { data: user } = useProfile();

  const styles = useDashboardStyles();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => navigation.navigate('Profile')}>
          {user ? <Avatar label={user.name} size={24} /> : <UserCircle color={colors.textPrimary} size={20} />}
        </Pressable>
      ),
    });
  }, [navigation, user]);

  const handleLogout = async () => {
    // If you have a logout() function from context, call it here:
    Alert.alert('Log out', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: async () => await logout() },
    ]);
  };

  const startQuiz = () => {
    navigation.navigate('CaseList');
  };

  const openGuidedReview = () => {
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
          title="Attempt History"
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
