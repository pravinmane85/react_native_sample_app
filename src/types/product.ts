export type Category = 'phone' | 'sim';

export interface Colour {
  name: string;
  hex: string;
}

export interface Allowances {
  data: string;
  minutes: string;
  texts: string;
}

export interface Product {
  id: string;
  name: string;
  make: string;
  model: string;
  category: Category;
  price: string;
  pricePeriod?: string;
  image: string;
  description: string;
  badge?: string;
  supports5G?: boolean;
  colours?: Colour[];
  allowances?: Allowances;
}
