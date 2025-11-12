// DashboardScreen.styles.ts
import { StyleSheet } from "react-native";
import { colors } from "@lib/theme/colors";
import { typography } from "@lib/theme/typography";
import { radii } from "@lib/theme/radii";
import { spacing } from "@lib/theme/spacing";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    // Header
    header: {
        paddingTop: 36,
        paddingHorizontal: 20,
        paddingBottom: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    appTitle: {
        ...typography.title,
        color: colors.textPrimary,
    },
    subtitle: {
        ...typography.subtitle,
        color: colors.textSecondary,
    },
    logoutButton: {
        padding: spacing.sm,
        borderRadius: radii.full,
        backgroundColor: colors.inputBackground,
    },

    // Content area
    content: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.xl,
    },

    // Primary card (Start quiz)
    primaryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.surfaceAlt,
        padding: spacing.lg + 2, // ~14
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.md,
    },
    primaryIcon: {
        marginRight: spacing.md - 2, // ~10
        color: colors.accent,
    },
    primaryTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    primaryText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 2,
    },

    // Secondary card (Guided review)
    secondaryCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
    },
    secondaryIcon: {
        marginRight: spacing.sm,
        color: colors.purpleAccent ?? "#A78BFA",
        marginTop: 2,
    },
    secondaryTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
    },
    secondaryText: {
        fontSize: 11,
        color: colors.textSecondary,
        marginTop: 2,
    },
    tag: {
        fontSize: 9,
        color: colors.textSecondary,
        marginTop: 4,
    },

    // Disclaimer
    disclaimerBox: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: spacing.md - 2, // ~10
        borderRadius: radii.md,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.border,
    },
    disclaimerIcon: {
        marginRight: spacing.sm - 2, // ~6
        color: colors.accent,
        marginTop: 1,
    },
    disclaimerText: {
        fontSize: 9,
        color: colors.textSecondary,
        flex: 1,
    },

    // Optional spacer
    spacer: {
        flex: 1,
    },
});