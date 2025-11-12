import {Text, Pressable, Alert} from "react-native";
import AuthLayout from "./AuthLayout";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {RootStackParamList} from "navigation/RootNavigator";
import {useAuth} from "context/AuthContext";
import {FormTextInput} from "@components/form/FormTextInput";
import styles from "./Auth.styles";
import {states} from "@lib/theme/states";

const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
});

export default function RegisterScreen({
                                           navigation,
                                       }: NativeStackScreenProps<RootStackParamList, "Register">) {
    const {register} = useAuth();

    const {
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {name: "", email: "", password: ""},
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        try {
            await register(values.name.trim(), values.email.trim(), values.password);
        } catch (e: any) {
            Alert.alert("Registration failed", e?.response?.data?.message || e.message);
        }
    };

    return (
        <AuthLayout>
            <Text style={styles.title}>Create account</Text>

            <Controller
                control={control}
                name="name"
                render={({field: {onChange, onBlur, value, ref}}) => (
                    <FormTextInput
                        ref={ref}
                        label="Name"
                        autoCapitalize="words"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={errors.name?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({field: {onChange, onBlur, value, ref}}) => (
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
                render={({field: {onChange, onBlur, value, ref}}) => (
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
                style={({pressed}) => [
                    styles.submitButton,
                    isSubmitting && styles.submitButtonDisabled,
                    pressed && !isSubmitting && states.pressed,
                    isSubmitting && states.disabled,
                ]}
            >
                <Text style={styles.submitText}>
                    {isSubmitting ? "Creating…" : "Register"}
                </Text>
            </Pressable>

            <Pressable style={styles.link} onPress={() => navigation.replace("Login")}>
                <Text style={styles.linkText}>Have an account? Sign in</Text>
            </Pressable>
        </AuthLayout>
    );
}