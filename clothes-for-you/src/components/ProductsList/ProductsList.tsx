import React, { useState } from 'react';
import { getProducts } from '../../services/productsService';
import { Product } from '../../types/types';
import { Grid, Box, Text, Flex, Center } from '@chakra-ui/react';
import { ProductListProps } from '../../types/types';
import ProductCard from '../ProductCard/ProductCard';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';

const ProductList: React.FC<ProductListProps> = ({ selectedCategory, selectedSubCategory }) => {
  const products: Product[] = getProducts();
  const [sortBy, setSortBy] = useState('default');
  const [colorFilter, setColorFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 150]);


  const filterProducts = () => {
    let filteredResult = products.filter((product) => {
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
  
    if (colorFilter.length > 0) {
      filteredResult = filteredResult.filter((product) => colorFilter.includes(product.color));
    }

    const [minPrice, maxPrice] = priceFilter;
    if (minPrice !== 0 || maxPrice !== 0) {
      filteredResult = filteredResult.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }
  
    return filteredResult;
  };
  


  const sortProducts = (productsToSort) => {
    let sortedResult = [...productsToSort]; 

    if (sortBy === 'az') {
      sortedResult.sort((a, b) => a.name.localeCompare(b.name)); 
    } else if (sortBy === 'za') {
      sortedResult.sort((a, b) => b.name.localeCompare(a.name)); 
    } else if (sortBy === 'priceAsc') {
      sortedResult.sort((a, b) => a.price - b.price); 
    } else if (sortBy === 'priceDesc') {
      sortedResult.sort((a, b) => b.price - a.price); 
    }

    return sortedResult;
  };
  let filteredProducts = filterProducts()

  const handleFilterChange = (filteredResult) => {
    console.log('Filter Change:', filteredResult);
    setFilteredProducts(filteredResult);
  };

  const handleSortChange = (value) => {
    console.log('Sort Change:', value);
    setSortBy(value);
  };

  const handleColorFilterChange = (selectedColor) => {
    console.log('Color Filter Change:', selectedColor); 
    setColorFilter(selectedColor); 
  };
  
  const handlePriceFilterChange = (newPriceFilter) => {
    console.log('Price Filter Change:', newPriceFilter); 
    setPriceFilter(newPriceFilter);
  };
  return (
    <Box>
      <Flex mb={4} direction="column">
        <Center>
          <Filter
            onFilterChange={handleFilterChange}
            products={filteredProducts}
            colorFilter={colorFilter}
            priceFilter={priceFilter}
            onColorFilterChange={handleColorFilterChange} 
            onPriceFilterChange={handlePriceFilterChange} 
          />
          <Sort onSortChange={handleSortChange} />
        </Center>
      </Flex>
      <Box mb={4}>
        <Text fontWeight="bold">
          {selectedCategory} {selectedSubCategory}
        </Text>
      </Box>
      {filteredProducts.length === 0 ? 
        <Text mb={2} fontWeight="bold">No items matching the criteria</Text>
        :
        <>
          <Text mb={2} fontWeight="bold">
            Showing {filteredProducts.length} out of {products.length} items
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
            {sortProducts(filteredProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </>
      }
    </Box>
  );
};

export default ProductList;
