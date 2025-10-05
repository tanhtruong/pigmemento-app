import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { colors } from "../../theme/colors";
import AuthLayout from "./AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";

export default function RegisterScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Register">) {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      await register(email.trim(), password);
    } catch (e: any) {
      Alert.alert(
        "Registration failed",
        e?.response?.data?.message || e.message
      );
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
        Create account
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
          {loading ? "Creating…" : "Register"}
        </Text>
      </Pressable>
      <Pressable
        style={{ marginTop: 16 }}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={{ color: colors.muted }}>Have an account? Sign in</Text>
      </Pressable>
    </AuthLayout>
  );
}
