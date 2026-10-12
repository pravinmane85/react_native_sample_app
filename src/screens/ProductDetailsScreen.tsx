import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getFavouriteIds, toggleFavourite } from '../services/productsService';
import type { ProductDetailsScreenProps } from '../types/navigation';
import { products } from '../data/products';
import type { Product } from '../types/product';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ProductDetailsScreen({ navigation, route }: Readonly<ProductDetailsScreenProps>) {
  const { id } = route.params;
  const product = products.find((item) => item.id === id);
  const [favouriteIds, setFavouriteIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      navigation.setOptions({ title: product.name });
    }
  }, [navigation, product]);

  useEffect(() => {
    getFavouriteIds()
      .then(setFavouriteIds)
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleFavouritePress(product: Product) {
    const updatedFavouriteIds = await toggleFavourite(product.id);
    setFavouriteIds(updatedFavouriteIds);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          style={styles.loader}
          accessibilityLabel="Loading product"
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={typography.body} accessibilityRole="alert">
          Could not load favourite status.
        </Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={typography.body} accessibilityRole="alert">
          Product not found.
        </Text>
      </View>
    );
  }

  const isFavourite = favouriteIds.includes(product.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
          accessible
          accessibilityLabel={`Photo of ${product.name}`}
        />
        <Pressable
          style={styles.favouriteButton}
          hitSlop={8}
          onPress={() => handleFavouritePress(product)}
          accessibilityRole="button"
          accessibilityLabel={`Favourite ${product.name}`}
          accessibilityState={{ selected: isFavourite }}
        >
          <Text style={[
            styles.favouriteIcon, 
            isFavourite && styles.favouriteIconActive]
          }>
              {isFavourite ? '♥' : '♡'}
          </Text>
        </Pressable>
      </View>

      {product.badge ? (
        <View style={styles.badge}>
          <Text style={typography.badge}>{product.badge}</Text>
        </View>
      ) : null}

      <Text style={typography.brand}>{product.make}</Text>
      <Text style={typography.title} accessibilityRole="header">
        {product.name}
      </Text>
      <Text style={styles.price}>
        {product.price}
        {
          product.pricePeriod ?
            <Text style={typography.brand}> {product.pricePeriod}</Text> :
            null
        }
      </Text>

      {product.colours && product.colours.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle} accessibilityRole="header">Colours</Text>
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
          <Text style={styles.sectionTitle} accessibilityRole="header">
            Plan allowances
          </Text>
          <Text style={typography.body}>Data: {product.allowances.data}</Text>
          <Text style={typography.body}>Minutes: {product.allowances.minutes}</Text>
          <Text style={typography.body}>Texts: {product.allowances.texts}</Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          About this {product.category === 'sim' ? 'plan' : 'device'}
        </Text>
        <Text style={typography.body}>{product.description}</Text>
      </View>

      <Pressable
        style={styles.buyButton}
        accessibilityRole="button"
        onPress={() => Alert.alert('Not available', 'Buying is not part of this demo.')}
      >
        <Text style={styles.buyButtonLabel}>Buy {product.name}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
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
  favouriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    minWidth: 36,
    minHeight: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favouriteIcon: {
    fontSize: 20,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  favouriteIconActive: {
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
