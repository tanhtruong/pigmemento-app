import React, {forwardRef, useState} from "react";
import {TextInput, View, Text, TextInputProps} from "react-native";
import styles from "./FormTextInput.styles";
import {colors} from "@lib/theme/colors";
import {ThemeContext} from "@react-navigation/native";
import {inputTokens} from "@lib/theme/components/inputs";

type Props = TextInputProps & { label: string; error?: string };

export const FormTextInput = forwardRef<TextInput, Props>(
    ({label, error, style, ...props}, ref) => {
        const [focused, setFocused] = useState(false);
        
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>

                <TextInput
                    ref={ref}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={[
                        styles.input,
                        focused && inputTokens.base.focused,
                        error && inputTokens.base.error,
                        style,
                    ]}
                    placeholderTextColor="rgba(255,255,255,0.5)"
                    {...props}
                />

                {!!error && <Text style={styles.errorText}>{error}</Text>}
            </View>
        );
    }
);