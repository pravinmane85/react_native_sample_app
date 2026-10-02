import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';
import { colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <FavoritesProvider>
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
    </FavoritesProvider>
  );
}
