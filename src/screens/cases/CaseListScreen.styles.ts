import { StyleSheet } from "react-native";
import { colors } from "@lib/theme/colors";
import { spacing } from "@lib/theme/spacing";
import { radii } from "@lib/theme/radii";
import { typography } from "@lib/theme/typography";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    listContent: {
        padding: spacing.md, // ~12
    },

    caseCard: {
        backgroundColor: colors.surface,
        borderRadius: radii.lg, // ~16
        marginBottom: spacing.md,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.border,
    },

    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
    },

    caseInfo: {
        padding: spacing.md,
    },

    caseTitle: {
        ...typography.body,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    caseMeta: {
        ...typography.muted,
        color: colors.textSecondary,
        marginTop: 2,
    },

    emptyText: {
        ...typography.muted,
        textAlign: "center",
        padding: spacing.lg,
    },
});