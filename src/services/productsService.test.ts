import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFavouriteIds, getProducts, toggleFavourite } from './productsService';

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
    expect(await getFavouriteIds()).toEqual([]);
  });

  test('toggleFavourite adds then removes a product', async () => {
    expect(await toggleFavourite('a')).toEqual(['a']);
    expect(await toggleFavourite('b')).toEqual(['a', 'b']);
    expect(await toggleFavourite('a')).toEqual(['b']);
    expect(await getFavouriteIds()).toEqual(['b']);
  });

  test('saves favourites as JSON', async () => {
    await toggleFavourite('a');
    expect(JSON.parse((await AsyncStorage.getItem('favouriteProductIds')) ?? '[]')).toEqual(['a']);
  });

  test('rejects when saved data is corrupt, for the screen to handle', async () => {
    await AsyncStorage.setItem('favouriteProductIds', '{not json');
    await expect(getFavouriteIds()).rejects.toThrow();
  });
});
