import { fireEvent, render, screen } from '@testing-library/react-native';
import App from './App';
import { products } from './data/products';

describe('<App />', () => {
  test('opens product details from the list and shows the product', async () => {
    await render(<App />);
    const product = products[0];
    // The products api waits 2 seconds, longer than the default 1 second wait.
    await fireEvent.press(await screen.findByText(product.name, {}, { timeout: 5000 }));
    expect(await screen.findByText(product.description)).toBeTruthy();
  });
});
