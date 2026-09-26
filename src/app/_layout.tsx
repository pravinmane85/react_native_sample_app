import { Stack } from 'expo-router';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.badgeText,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Phones & SIM cards' }} />
      <Stack.Screen name="product/[id]" options={{ title: '' }} />
    </Stack>
  );
}
