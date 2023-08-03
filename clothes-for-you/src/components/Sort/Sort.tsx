import React from 'react';
import { Box, Select, Text } from '@chakra-ui/react';

const Sort = ({ onSortChange }) => {
  const handleSortChange = (event) => {
    const value = event.target.value;
    onSortChange(value);
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        Sort
      </Text>
      <Select defaultValue="default" onChange={handleSortChange}>
        <option value="default" disabled>
          Choose an option
        </option>
        <option value="az">Alphabetical a-z</option>
        <option value="za">Alphabetical z-a</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </Select>
    </Box>
  );
};

export default Sort;
