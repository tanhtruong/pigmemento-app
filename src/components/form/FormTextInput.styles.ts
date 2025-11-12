import { StyleSheet } from "react-native";
import { colors } from "@lib/theme/colors";
import { spacing } from "@lib/theme/spacing";
import { radii } from "@lib/theme/radii";
import { borderWidths } from "@lib/theme/borders";

export default StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        marginBottom: spacing.xs + 2, // ~6
        fontWeight: "600",
        color: colors.textPrimary,
        fontSize: 13,
    },
    input: {
        borderRadius: radii.sm,
        padding: spacing.md,
        backgroundColor: colors.inputBackground,
        color: colors.textPrimary,
        borderWidth: borderWidths.thin,
        borderColor: colors.border,
    },
    errorText: {
        color: colors.danger,
        marginTop: spacing.xs,
        fontSize: 12,
    },
});