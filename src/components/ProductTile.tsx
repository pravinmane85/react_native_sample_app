import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { Product } from '../types/product';

interface ProductTileProps {
  product: Product;
  onPress: () => void;
}

export function ProductTile({ product, onPress }: ProductTileProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        {product.badge ? (
          <View style={styles.badge}>
            <Text style={[typography.badge, styles.badgeText]} numberOfLines={2}>
              {product.badge}
            </Text>
          </View>
        ) : null}
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
      <View style={styles.info}>
        <Text style={typography.brand}>{product.make}</Text>
        <Text style={typography.productName} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={typography.price}>
          {product.price}
          {product.pricePeriod ? <Text style={typography.brand}> {product.pricePeriod}</Text> : null}
        </Text>
        {product.colours && product.colours.length > 0 ? (
          <View style={styles.swatchRow}>
            {product.colours.slice(0, 4).map((colour) => (
              <View
                key={colour.hex}
                style={[styles.swatch, { backgroundColor: colour.hex }]}
              />
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: 110,
    height: 110,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    maxWidth: 98,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 12,
  },
  favoriteButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  favoriteIconActive: {
    color: colors.primary,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  swatchRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 6,
  },
  swatch: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
