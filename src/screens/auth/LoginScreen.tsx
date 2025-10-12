import { Text, Pressable, Alert } from "react-native";
import AuthLayout from "./AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RootStackParamList } from "navigation/RootNavigator";
import { useAuth } from "context/AuthContext";
import { colors } from "@lib/theme/colors";
import { FormTextInput } from "@components/form/FormTextInput";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Login">) {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email.trim(), values.password);
    } catch (e: any) {
      Alert.alert("Login failed", e?.response?.data?.message || e.message);
    }
  };

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
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormTextInput
            ref={ref}
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormTextInput
            ref={ref}
            label="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.password?.message}
          />
        )}
      />
      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        style={{
          backgroundColor: isSubmitting ? colors.muted : colors.primary,
          padding: 14,
          borderRadius: 12,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors["primary-foreground"],
            fontWeight: "700",
          }}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Text>
      </Pressable>

      <Pressable
        style={{
          marginTop: 16,
        }}
        onPress={() => navigation.replace("Register")}
      >
        <Text style={{ color: colors.muted }}>No account? Register</Text>
      </Pressable>
    </AuthLayout>
  );
}
