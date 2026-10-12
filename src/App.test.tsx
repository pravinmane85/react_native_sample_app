import { render, screen } from '@testing-library/react-native';
import App from './App';

describe('<App />', () => {
  test('loads and shows the header title', async () => {
    await render(<App />);
    // The native stack header is a native component with a `title` prop, not a Text element,
    // so text and role queries can't find it. Check the rendered tree instead.
    expect(JSON.stringify(screen.toJSON())).toContain('"title":"Phones & SIM cards"');
  });
});
