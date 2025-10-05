import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme/colors";
import AuthLayout from "./AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login failed", e?.response?.data?.message || e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <Text
        style={{
          color: colors.text,
          fontSize: 24,
          fontWeight: "700",
          marginBottom: 16,
        }}
      >
        Welcome back
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor={colors.muted}
        style={{
          backgroundColor: "#111827",
          color: colors.text,
          padding: 12,
          borderRadius: 12,
          marginBottom: 12,
        }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={colors.muted}
        style={{
          backgroundColor: "#111827",
          color: colors.text,
          padding: 12,
          borderRadius: 12,
          marginBottom: 16,
        }}
      />
      <Pressable
        onPress={onSubmit}
        disabled={loading}
        style={{
          backgroundColor: colors.primary,
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0B1220", fontWeight: "700" }}>
          {loading ? "Signing in…" : "Sign in"}
        </Text>
      </Pressable>

      <Pressable
        style={{ marginTop: 16 }}
        onPress={() => navigation.replace("Register")}
      >
        <Text style={{ color: colors.muted }}>No account? Register</Text>
      </Pressable>
    </AuthLayout>
  );
}
