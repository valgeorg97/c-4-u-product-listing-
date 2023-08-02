import React from 'react';
import { getProducts } from '../../services/productsService';
import { Product } from '../../types/types';
import { Grid, Box, Text} from '@chakra-ui/react';
import { ProductListProps } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';


const ProductList: React.FC<ProductListProps> = ({ selectedCategory, selectedSubCategory }) => {
  
  const products: Product[] = getProducts(); 

  console.log('Selected Category:', selectedCategory); 
  console.log('Selected Subcategory:', selectedSubCategory); 

  const filteredProducts = products.filter((product) => {
    if (selectedSubCategory === 'Show All') {
      
      return product.category === selectedCategory;
    } else if (selectedCategory === '' && selectedSubCategory === '') {
      
      return true;
    } else if (selectedCategory !== '' && selectedSubCategory === '') {
     
      return product.category === selectedCategory;
    } else if (selectedCategory === '' && selectedSubCategory !== '') {
      
      return product.type === selectedSubCategory;
    } else {
      
      return product.category === selectedCategory && product.type === selectedSubCategory;
    }
  });

  return (
    <Box>
      <Box mb={4}>
      <Text fontWeight="bold">
        {selectedCategory} {selectedSubCategory}
      </Text>
    </Box>
      <Text mb={2} fontWeight="bold">
        Showing {filteredProducts.length} out of {products.length} items
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;