import { Product } from '../types/product';

export const phone: Product = {
  id: 'test-phone',
  name: 'Test Phone X',
  make: 'Acme',
  model: 'X',
  category: 'phone',
  price: '£500.00',
  image: 'https://example.com/phone.png',
  description: 'A phone for testing.',
  badge: 'New',
  colours: [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
  ],
};

export const sim: Product = {
  id: 'test-sim',
  name: 'Test SIM Plan',
  make: 'Acme',
  model: 'SIM',
  category: 'sim',
  price: '£10.00',
  pricePeriod: 'per month',
  image: 'https://example.com/sim.png',
  description: 'A SIM plan for testing.',
  allowances: { data: 'Unlimited', minutes: '500', texts: 'Unlimited' },
};
