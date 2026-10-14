import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { id: string };
};

export type ProductListScreenProps = Pick<NativeStackScreenProps<RootStackParamList, 'ProductList'>, 'navigation'>;
export type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;
