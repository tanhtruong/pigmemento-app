import { colors } from "@lib/theme/colors";
import { AnswerListItemDto } from "@lib/types/attempt";
import { CaseListItem } from "@lib/types/case";
import { Check, Dot, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

interface ListItemProps {
  item: AnswerListItemDto;
  onPressItem?: (id: string) => void;
}

export const ListItem = ({ item, onPressItem: onItemPress }: ListItemProps) => {
  return (
    <Pressable
      onPress={() => onItemPress?.(item.caseId)}
      style={{
        backgroundColor: colors["activity-card-bg"],
        borderRadius: 12,
        padding: 12,
      }}
    >
      <Text style={{ color: colors.text, fontWeight: "600" }}>
        Case #{item.caseId.slice(0, 6)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {item.correct ? (
          <>
            <Check color={colors.success} />
            <Text style={{ color: colors.success, marginLeft: 2 }}>
              Correct
            </Text>
          </>
        ) : (
          <>
            <X color={colors.danger} />
            <Text style={{ color: colors.danger, marginLeft: 2 }}>
              Incorrect
            </Text>
          </>
        )}

        <Dot color={colors.text} />

        <Text style={{ color: colors.muted }}>{item.answer}</Text>

        <Dot color={colors.text} />

        <Text style={{ color: colors.muted }}>
          {Math.round(item.timeToAnswerMs / 1000)}s
        </Text>

        <Dot color={colors.text} />

        <Text style={{ color: colors.muted }}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </Pressable>
  );
};
