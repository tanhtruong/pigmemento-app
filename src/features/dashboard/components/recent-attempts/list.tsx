import { View, Text, FlatList } from "react-native";
import { useRecentAttempts } from "@features/dashboard/api/use-recent-attempts";
import { colors } from "@lib/theme/colors";
import { ListItem } from "./list-item";

interface ListProps {
  onItemPress?: (id: string) => void;
}

export const List = ({ onItemPress }: ListProps) => {
  const { data: recent } = useRecentAttempts();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 16,
      }}
    >
      <Text style={{ color: colors.text, fontWeight: "700", marginBottom: 8 }}>
        Recent activity
      </Text>
      <FlatList
        data={recent.items}
        keyExtractor={(x) => x.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            item={item}
            onPressItem={(id) => onItemPress?.(id)}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: colors.muted }}>
            No attempts yet. Try a quiz!
          </Text>
        }
      />
    </View>
  );
};
