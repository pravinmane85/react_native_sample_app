import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

interface PlaceholderScreenProps {
  title: string;
}

// A dummy screen for the tabs that have no real content yet.
export default function PlaceholderScreen({ title }: Readonly<PlaceholderScreenProps>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">{title}</Text>
      <Text style={styles.text}>This is a placeholder screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.background,
  },
  title: { fontSize: 22, fontWeight: '700', color: colors.textPrimary },
  text: { fontSize: 16, color: colors.textSecondary },
});
