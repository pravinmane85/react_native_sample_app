import AsyncStorage from '@react-native-async-storage/async-storage';
import { products } from '../data/products';
import { Product } from '../types/product';

const FAVOURITES_KEY = 'favouriteProductIds';

export function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 2000);
  });
}

export function getFavouriteIds(): Promise<string[]> {
  return loadFavouriteIds();
}

export async function toggleFavourite(productId: string): Promise<string[]> {
  const current = await loadFavouriteIds();
  const next = current.includes(productId)
    ? current.filter((id) => id !== productId)
    : [...current, productId];
  await saveFavouriteIds(next);
  return next;
}

async function loadFavouriteIds(): Promise<string[]> {
  return [];
}

async function saveFavouriteIds(ids: string[]): Promise<void> {}
