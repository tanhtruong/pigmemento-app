import {View, Text, FlatList, Image, StyleSheet, Pressable} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "navigation/RootNavigator";
import {useCase} from "@features/cases/api/use-case";
import {colors} from "@lib/theme/colors";
import {AttemptResponse} from "@lib/types/attempt";
import {Label} from "@lib/types/case";
import {styles} from "./ReviewScreen.styles"

type Props = NativeStackScreenProps<RootStackParamList, "Review">;

export default function ReviewScreen({route, navigation}: Props) {
    const {caseId, attempt} = route.params as {
        caseId: string;
        attempt: AttemptResponse & { chosenLabel: Label };
    };

    const {data: detail} = useCase(caseId);

    if (!detail) {
        return (
            <View style={styles.center}>
                <Text style={styles.loading}>Loading…</Text>
            </View>
        );
    }

    const isCorrect = attempt.correct;
    const primaryLabel = isCorrect ? "Correct" : "Incorrect";
    const primaryColor = isCorrect ? colors.success : colors.danger;

    const handleBack = () => navigation.navigate("Dashboard");
    const handleNext = () => navigation.navigate("Quiz");

    return (
        <View style={styles.root}>
            {/* Case image */}
            <Image
                source={{uri: detail.imageUrl}}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.body}>
                {/* Result pill */}
                <View style={[styles.resultPill, {borderColor: primaryColor}]}>
                    <View style={[styles.dot, {backgroundColor: primaryColor}]}/>
                    <Text style={[styles.resultText, {color: primaryColor}]}>
                        {primaryLabel}
                    </Text>
                </View>

                {/* Clinical context */}
                <View style={styles.clinicalCard}>
                    <Text style={styles.clinicalLabel}>Clinical context</Text>
                    <Text style={styles.clinicalMain}>
                        {detail.patientAge ? `${detail.patientAge}-year-old` : "Age not specified"} ·{" "}
                        {detail.site || "Site not specified"}
                    </Text>
                    {!!detail.clinicalNote && (
                        <Text style={styles.clinicalNote}>{detail.clinicalNote}</Text>
                    )}
                </View>

                {/* Answer vs truth */}
                <View style={styles.answerRow}>
                    <View style={styles.answerBlock}>
                        <Text style={styles.answerLabel}>Your answer</Text>
                        <Text
                            style={[
                                styles.answerValue,
                                {color: isCorrect ? colors.success : colors.danger},
                            ]}
                        >
                            {attempt.chosenLabel}
                        </Text>
                    </View>
                    <View style={styles.answerBlock}>
                        <Text style={styles.answerLabel}>Correct label</Text>
                        <Text style={styles.answerValue}>{attempt.correctLabel}</Text>
                    </View>
                </View>

                {/* Teaching points */}
                <View style={styles.teachingCard}>
                    <Text style={styles.subheading}>Teaching points</Text>
                    <FlatList
                        data={attempt.teachingPoints}
                        keyExtractor={(_, i) => i.toString()}
                        renderItem={({item}) => <Text style={styles.bullet}>• {item}</Text>}
                        ListEmptyComponent={
                            <Text style={styles.muted}>
                                No case-specific teaching points yet. Focus on matching your reasoning to
                                the ground truth pattern.
                            </Text>
                        }
                    />
                </View>

                {/* Navigation actions */}
                <View style={styles.actionsRow}>
                    <Pressable style={styles.secondaryButton} onPress={handleBack}>
                        <Text style={styles.secondaryText}>Back to dashboard</Text>
                    </Pressable>
                    <Pressable style={styles.primaryButton} onPress={handleNext}>
                        <Text style={styles.primaryText}>Next case</Text>
                    </Pressable>
                </View>

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    {attempt.disclaimer ??
                        "Educational use only — not for diagnosis or patient management."}
                </Text>
            </View>
        </View>
    );
}
