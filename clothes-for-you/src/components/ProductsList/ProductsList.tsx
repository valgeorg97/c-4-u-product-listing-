import React from 'react';
import { getProducts } from '../../services/productsService';
import { Product } from '../../types/types';
import { Grid, Box, Image, Heading, Text, VStack } from '@chakra-ui/react';
import { ProductListProps } from '../../types/types';


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
    <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
      {filteredProducts.map((product) => (
        <Box key={product.id}>
          <Image
            src={product.imageUrl1}
            alt={product.name}
            boxSize="300px" 
            maxW="100%"    
            maxH="300px"    
          />
          <VStack align="start" spacing={2}>
            <Heading as="h3" size="md">
              {product.name}
            </Heading>
            <Text>{product.description}</Text>
            <Text>Price: ${product.price}</Text>
         
          </VStack>
        </Box>
      ))}
    </Grid>
  );
};

export default ProductList;