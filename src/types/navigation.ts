import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { id: string };
};

export type ProductListScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductList'>;
export type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;
