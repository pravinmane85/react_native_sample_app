import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { CategoryFilter, CategoryFilterValue } from '../components/CategoryFilter';
import { ProductTile } from '../components/ProductTile';
import { SearchBar } from '../components/SearchBar';
import { products } from '../data/products';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ProductListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilterValue>('all');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.make.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChangeText={setQuery} />
      <CategoryFilter value={category} onChange={setCategory} />
      <Text style={styles.itemCount}>{filteredProducts.length} items</Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <ProductTile product={item} onPress={() => router.push(`/product/${item.id}`)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={typography.body}>No products match your search.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemCount: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    color: colors.textSecondary,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
});
