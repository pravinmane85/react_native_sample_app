import { ImageSourcePropType } from 'react-native';
import { Product } from '../types/product';
import data from './products.json';

// Metro needs a literal path in every require(), so each local image is listed here.
// The keys match the localImage values in products.json.
const localImages: Record<string, ImageSourcePropType> = {
  'assets/images/Apple_iPhone_15_blue.png': require('../../assets/images/Apple_iPhone_15_blue.png'),
  'assets/images/Apple_iPhone_16_Pro.png': require('../../assets/images/Apple_iPhone_16_Pro.png'),
  'assets/images/Doro_8100_grey.png': require('../../assets/images/Doro_8100_grey.png'),
  'assets/images/Google_Pixel_11_frost.png': require('../../assets/images/Google_Pixel_11_frost.png'),
  'assets/images/HONOR_Magic_V6.png': require('../../assets/images/HONOR_Magic_V6.png'),
  'assets/images/Motorola_Edge_70_pantone.png': require('../../assets/images/Motorola_Edge_70_pantone.png'),
  'assets/images/Samsung_Galaxy_S25_FE_icyblue.png': require('../../assets/images/Samsung_Galaxy_S25_FE_icyblue.png'),
  'assets/images/Vodafone-SIM.png': require('../../assets/images/Vodafone-SIM.png'),
};

export const products: Product[] = data.map((product) => ({
  ...product,
  image: localImages[product.localImage],
})) as Product[];
