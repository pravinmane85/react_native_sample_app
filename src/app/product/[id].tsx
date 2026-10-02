import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { products } from '../../data/products';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={typography.body}>Product not found.</Text>
      </View>
    );
  }

  const favorite = isFavorite(product.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        <Pressable
          style={styles.favoriteButton}
          hitSlop={8}
          onPress={() => toggleFavorite(product.id)}
          accessibilityRole="button"
          accessibilityLabel={favorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
        >
          <Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text>
        </Pressable>
      </View>

      {product.badge ? (
        <View style={styles.badge}>
          <Text style={typography.badge}>{product.badge}</Text>
        </View>
      ) : null}

      <Text style={typography.brand}>{product.make}</Text>
      <Text style={typography.title}>{product.name}</Text>
      <Text style={styles.price}>
        {product.price}
        {product.pricePeriod ? <Text style={typography.brand}> {product.pricePeriod}</Text> : null}
      </Text>

      {product.colours && product.colours.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colours</Text>
          <View style={styles.swatchRow}>
            {product.colours.map((colour) => (
              <View key={colour.hex} style={styles.swatchItem}>
                <View style={[styles.swatch, { backgroundColor: colour.hex }]} />
                <Text style={typography.brand}>{colour.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {product.allowances ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan allowances</Text>
          <Text style={typography.body}>Data: {product.allowances.data}</Text>
          <Text style={typography.body}>Minutes: {product.allowances.minutes}</Text>
          <Text style={typography.body}>Texts: {product.allowances.texts}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this {product.category === 'sim' ? 'plan' : 'device'}</Text>
        <Text style={typography.body}>{product.description}</Text>
      </View>

      <Pressable style={styles.buyButton}>
        <Text style={styles.buyButtonLabel}>Buy {product.name}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  imageWrapper: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  favoriteIconActive: {
    color: colors.primary,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  swatchRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  swatchItem: {
    alignItems: 'center',
    gap: 4,
  },
  swatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  buyButton: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buyButtonLabel: {
    color: colors.badgeText,
    fontSize: 16,
    fontWeight: '700',
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
