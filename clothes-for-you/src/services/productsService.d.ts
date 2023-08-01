import { Product } from '../types/types';

declare module './productsService' {
  function getProducts(): Product[];
}

export {};
