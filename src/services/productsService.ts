import { products } from '../data/products';
import { Product } from '../types/product';

export function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 2000);
  });
}

export function getFavoriteIds(): Promise<string[]> {
  return loadFavoriteIds();
}

export async function toggleFavorite(productId: string): Promise<string[]> {
  const current = await loadFavoriteIds();
  const next = current.includes(productId)
    ? current.filter((id) => id !== productId)
    : [...current, productId];
  await saveFavoriteIds(next);
  return next;
}

// TODO (Storage): use AsyncStorage from '@react-native-async-storage/async-storage'.
// Store the ids as JSON under the key 'favoriteProductIds'.

// TODO: return the saved ids. Return [] if nothing is saved or the data is corrupt.
async function loadFavoriteIds(): Promise<string[]> {
  return [];
}

// TODO: save the ids. Do not throw if saving fails.
async function saveFavoriteIds(ids: string[]): Promise<void> {}
