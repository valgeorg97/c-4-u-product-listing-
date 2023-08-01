
import productsData from '../data/products';

export const getProducts = () => {
  console.log('Fetched products:', productsData);
  return productsData;
};
