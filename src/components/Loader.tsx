import { ActivityIndicator, Text, View } from 'react-native';
import { useTheme } from '@lib/theme/ThemeProvider';

type LoaderProps = {
  label?: string;
};

export const Loader = ({ label }: LoaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color={colors.accent} />
      {label && <Text>{label}</Text>}
    </View>
  );
};
