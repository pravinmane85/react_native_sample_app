import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavoriteIds, getProducts, toggleFavorite } from './productsService';

describe('productsService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('getProducts resolves with the products after a delay', async () => {
    jest.useFakeTimers();
    const promise = getProducts();
    jest.advanceTimersByTime(2000);
    expect((await promise).length).toBeGreaterThan(0);
    jest.useRealTimers();
  });

  test('starts with no favourites', async () => {
    expect(await getFavoriteIds()).toEqual([]);
  });

  test('toggleFavorite adds then removes a product', async () => {
    expect(await toggleFavorite('a')).toEqual(['a']);
    expect(await toggleFavorite('b')).toEqual(['a', 'b']);
    expect(await toggleFavorite('a')).toEqual(['b']);
    expect(await getFavoriteIds()).toEqual(['b']);
  });

  test('saves favourites as JSON', async () => {
    await toggleFavorite('a');
    expect(JSON.parse((await AsyncStorage.getItem('favoriteProductIds')) ?? '[]')).toEqual(['a']);
  });

  test('ignores corrupt saved data', async () => {
    await AsyncStorage.setItem('favoriteProductIds', '{not json');
    expect(await getFavoriteIds()).toEqual([]);
  });
});
