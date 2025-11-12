import { Text, Pressable, Alert } from "react-native";
import AuthLayout from "./AuthLayout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { RootStackParamList } from "navigation/RootNavigator";
import { useAuth } from "context/AuthContext";
import { FormTextInput } from "@components/form/FormTextInput";
import styles from "./Auth.styles";
import { states } from "@lib/theme/states";

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
        defaultValues: { email: "", password: "" },
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
            <Text style={styles.title}>Welcome back</Text>

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
                style={({ pressed }) => [
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled,
                    pressed && !isSubmitting && states.pressed,
                    isSubmitting && states.disabled,
                ]}
            >
                <Text style={styles.submitText}>
                    {isSubmitting ? "Signing in…" : "Sign in"}
                </Text>
            </Pressable>

            <Pressable style={styles.link} onPress={() => navigation.replace("Register")}>
                <Text style={styles.linkText}>No account? Register</Text>
            </Pressable>
        </AuthLayout>
    );
}