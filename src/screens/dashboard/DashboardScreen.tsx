import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {useAuth} from "../../context/AuthContext";
import {LogOut, MessageCircleWarningIcon, PlayCircle, School} from "lucide-react-native";
import styles from "./DashboardScreen.styles";
import {colors} from "@lib/theme/colors";

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        // If your navigation tree is auth-conditional, this will kick back to Log in.
    };

    const startQuiz = () => {
        navigation.navigate("CaseList"); // make sure you have this screen wired
    };

    const openGuidedReview = () => {
        // For now this can be a simple screen, or you can wire it later.
        navigation.navigate("GuidedReview");
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
                <TouchableOpacity style={styles.primaryCard} onPress={startQuiz}>
                    <PlayCircle size={26} style={styles.primaryIcon} />
                    {/*<Ionicons name="play-circle-outline" size={26} style={styles.primaryIcon} />*/}
                    <View>
                        <Text style={styles.primaryTitle}>Start quiz</Text>
                        <Text style={styles.primaryText}>
                            See a dermatoscopic case and choose benign vs malignant.
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryCard} onPress={openGuidedReview}>
                    <School size={20} style={styles.secondaryIcon} />
                    {/*<Ionicons name="school-outline" size={20} style={styles.secondaryIcon} />*/}
                    <View>
                        <Text style={styles.secondaryTitle}>Guided review</Text>
                        <Text style={styles.secondaryText}>
                            Review past cases with explanations and attention maps.
                        </Text>
                        {/*<Text style={styles.tag}>You can stub this screen for now.</Text>*/}
                    </View>
                </TouchableOpacity>

                {/* Spacer */}
                <View style={{ flex: 1 }} />

                {/* Disclaimer */}
                <View style={styles.disclaimerBox}>
                    <MessageCircleWarningIcon size={16} style={styles.disclaimerIcon} />
                    {/*<Ionicons name="information-circle-outline" size={14} style={styles.disclaimerIcon} />*/}
                    <Text style={styles.disclaimerText}>
                        Pigmemento is for educational use only. It must not be used to diagnose or manage
                        patients.
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DashboardScreen;