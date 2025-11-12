import {StyleSheet} from "react-native";
import {colors} from "@lib/theme";

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: colors.background,
    },
    center: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: "center",
        alignItems: "center",
    },
    loading: {
        color: colors.textSecondary,
    },
    image: {
        width: "100%",
        height: 260,
    },
    body: {
        padding: 16,
    },
    resultPill: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        marginBottom: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 999,
        marginRight: 6,
    },
    resultText: {
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.6,
    },
    heading: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.textPrimary,
        marginBottom: 10,
    },
    clinicalCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 14,
    },
    clinicalLabel: {
        fontSize: 9,
        color: colors.textSecondary,
        textTransform: "uppercase",
        letterSpacing: 0.6,
        marginBottom: 2,
    },
    clinicalMain: {
        fontSize: 13,
        color: colors.textPrimary,
        fontWeight: "600",
    },
    clinicalNote: {
        fontSize: 11,
        color: colors.textSecondary,
        marginTop: 4,
    },
    answerRow: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 12,
    },
    answerBlock: {
        flex: 1,
        backgroundColor: colors.surfaceAlt,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    answerLabel: {
        fontSize: 10,
        color: colors.textSecondary,
        marginBottom: 2,
    },
    answerValue: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.textPrimary,
        textTransform: "capitalize",
    },
    teachingCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 10,
        borderWidth: 1,
        borderColor: colors.border,
    },
    subheading: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
        marginBottom: 6,
    },
    bullet: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    muted: {
        fontSize: 11,
        color: colors.textSecondary,
    },
    actionsRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 14,
    },
    secondaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryText: {
        fontSize: 13,
        color: colors.textSecondary,
        fontWeight: "500",
    },
    primaryButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: colors.accent,
        alignItems: "center",
        justifyContent: "center",
    },
    primaryText: {
        fontSize: 13,
        color: colors.accentForeground,
        fontWeight: "600",
    },
    disclaimer: {
        marginTop: 14,
        fontSize: 9,
        color: colors.textSecondary,
    },
});