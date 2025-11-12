import React from "react";
import {View} from "react-native";
import styles from "./Auth.styles";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>{children}</View>
        </View>
    );
}