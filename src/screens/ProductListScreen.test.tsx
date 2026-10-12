import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { getProducts } from '../services/productsService';
import { phone, sim } from '../test/test-products';
import ProductListScreen from './ProductListScreen';

const mockNavigate = jest.fn();

jest.mock('../services/productsService', () => ({
  ...jest.requireActual('../services/productsService'),
  getProducts: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (effect: () => void) => require('react').useEffect(effect, [effect]),
}));

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

const screenProps: any = { navigation: { navigate: mockNavigate } };

const renderScreen = () => render(<ProductListScreen {...screenProps} />);

describe('<ProductListScreen />', () => {
  beforeEach(async () => {
    mockNavigate.mockClear();
    mockGetProducts.mockResolvedValue([phone, sim]);
    await AsyncStorage.clear();
  });

  test('shows the products once they have loaded', async () => {
    await renderScreen();
    expect(await screen.findByText('Test Phone X')).toBeTruthy();
    expect(screen.getByText('Test SIM Plan')).toBeTruthy();
  });

  test('shows an error and a Retry button when loading fails', async () => {
    mockGetProducts.mockRejectedValueOnce(new Error('Network down'));
    await renderScreen();
    expect(await screen.findByText('Could not load products.')).toBeTruthy();
    await fireEvent.press(screen.getByText('Retry'));
    expect(await screen.findByText('Test Phone X')).toBeTruthy();
  });

  test('filters the list by the search text', async () => {
    await renderScreen();
    await screen.findByText('Test Phone X');
    await fireEvent.changeText(screen.getByPlaceholderText('Search phones & SIM cards'), 'sim');
    expect(screen.queryByText('Test Phone X')).toBeNull();
    expect(screen.getByText('Test SIM Plan')).toBeTruthy();
  });

  test('shows a message when no products match the search', async () => {
    await renderScreen();
    await screen.findByText('Test Phone X');
    await fireEvent.changeText(screen.getByPlaceholderText('Search phones & SIM cards'), 'zzz');
    expect(screen.getByText('No products match your search.')).toBeTruthy();
  });

  test('opens the product details when a tile is pressed', async () => {
    await renderScreen();
    await fireEvent.press(await screen.findByText('Test Phone X'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', { id: phone.id });
  });

  test('shows favourites that were saved earlier', async () => {
    await AsyncStorage.setItem('favouriteProductIds', JSON.stringify([phone.id]));
    await renderScreen();
    expect(await screen.findByLabelText('Favourite Test Phone X')).toBeSelected();
  });

  test('saves a favourite when the heart is tapped', async () => {
    await renderScreen();
    await fireEvent.press(await screen.findByLabelText('Favourite Test Phone X'));
    await waitFor(async () =>
      expect(JSON.parse((await AsyncStorage.getItem('favouriteProductIds')) ?? '[]')).toEqual([phone.id])
    );
  });

  test('favourites a product with the screen reader action on the card', async () => {
    await renderScreen();
    const card = await screen.findByLabelText('View details for Test Phone X');
    expect(card).toHaveProp('accessibilityActions', [{ name: 'favourite', label: 'Add Test Phone X to favourites' }]);

    await fireEvent(card, 'accessibilityAction', { nativeEvent: { actionName: 'favourite' } });

    await waitFor(async () =>
      expect(JSON.parse((await AsyncStorage.getItem('favouriteProductIds')) ?? '[]')).toEqual([phone.id])
    );
    expect(screen.getByLabelText('Favourite Test Phone X')).toBeSelected();
  });
});
