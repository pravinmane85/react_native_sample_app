import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ProductDetailsScreen from './ProductDetailsScreen';
import type { ProductDetailsScreenProps } from '../types/navigation';
import { products } from '../data/products';

const mockSetOptions = jest.fn();

const renderScreen = (id: string) =>
  render(
    <ProductDetailsScreen
      {...({ navigation: { setOptions: mockSetOptions }, route: { params: { id } } } as unknown as ProductDetailsScreenProps)}
    />
  );

const phone = products.find((product) => product.category === 'phone')!;
const sim = products.find((product) => product.category === 'sim')!;

describe('<ProductDetailsScreen />', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  test('shows a not found message for an unknown id', async () => {
    await renderScreen('does-not-exist');
    expect(screen.getByText('Product not found.')).toBeTruthy();
  });

  test('sets the header title to the product name', async () => {
    await renderScreen(phone.id);
    expect(mockSetOptions).toHaveBeenCalledWith({ title: phone.name });
  });

  test('shows phone details', async () => {
    await renderScreen(phone.id);
    expect(screen.getByText(phone.name)).toBeTruthy();
    expect(screen.getByText(phone.description)).toBeTruthy();
    expect(screen.getByText('About this device')).toBeTruthy();
    expect(screen.getByText(`Buy ${phone.name}`)).toBeTruthy();
  });

  test('shows plan allowances for SIM products', async () => {
    await renderScreen(sim.id);
    expect(screen.getByText('Plan allowances')).toBeTruthy();
    expect(screen.getByText('About this plan')).toBeTruthy();
  });

  test('toggles favourite', async () => {
    await renderScreen(phone.id);
    await fireEvent.press(screen.getByLabelText(`Favourite ${phone.name}`));
    await waitFor(() => expect(screen.getByLabelText(`Favourite ${phone.name}`)).toBeSelected());
  });

  test('tells the user buying is not available when Buy is pressed', async () => {
    const alert = jest.spyOn(Alert, 'alert');
    await renderScreen(phone.id);
    await fireEvent.press(screen.getByText(`Buy ${phone.name}`));
    expect(alert).toHaveBeenCalledWith('Not available', 'Buying is not part of this demo.');
  });
});
