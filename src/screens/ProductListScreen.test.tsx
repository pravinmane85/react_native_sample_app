import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { getProducts } from '../services/productsService';
import { phone, sim } from '../../test-utils/fixtures';
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

// The test passes a fake `navigation`. `any` keeps this file valid before and after the screen takes props.
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

  test('opens the product details when a tile is pressed', async () => {
    await renderScreen();
    await fireEvent.press(await screen.findByText('Test Phone X'));
    expect(mockNavigate).toHaveBeenCalledWith('ProductDetails', { id: phone.id });
  });

  test('shows favourites that were saved earlier', async () => {
    await AsyncStorage.setItem('favoriteProductIds', JSON.stringify([phone.id]));
    await renderScreen();
    expect(await screen.findByLabelText('Remove Test Phone X from favorites')).toBeTruthy();
  });

  test('saves a favourite when the heart is tapped', async () => {
    await renderScreen();
    await fireEvent.press(await screen.findByLabelText('Add Test Phone X to favorites'));
    await waitFor(async () =>
      expect(JSON.parse((await AsyncStorage.getItem('favoriteProductIds')) ?? '[]')).toEqual([phone.id])
    );
  });
});
