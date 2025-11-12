import {StyleSheet} from "react-native";
import {colors} from "@lib/theme/colors";

export default StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
    },
    loadingText: {
        color: colors.textPrimary,
    },
});