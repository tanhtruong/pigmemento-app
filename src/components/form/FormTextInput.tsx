import { colors } from "@lib/theme/colors";
import { forwardRef } from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";

type Props = TextInputProps & { label: string; error?: string };

export const FormTextInput = forwardRef<TextInput, Props>(
  ({ label, error, style, ...props }, ref) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ marginBottom: 6, fontWeight: "600", color: colors.text }}>
        {label}
      </Text>
      <TextInput
        ref={ref}
        style={[
          {
            borderRadius: 8,
            padding: 12,
            backgroundColor: colors["input-bg"],
            color: colors.text,
            marginBottom: 16,
          },
          style,
        ]}
        {...props}
      />
      {!!error && (
        <Text style={{ color: colors.danger, marginTop: 4 }}>{error}</Text>
      )}
    </View>
  )
);
