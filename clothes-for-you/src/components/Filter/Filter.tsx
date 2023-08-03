import React from 'react';
import { Box, Menu, Select, Text, VStack, HStack } from '@chakra-ui/react';

interface FilterProps {
  onFilterChange: (filteredResult: any[]) => void;
  products: any[]; 
  colorFilter: string;
  priceFilter: number[];
  onColorFilterChange: (selectedColor: string) => void;
  onPriceFilterChange: (newPriceFilter: number[]) => void;
}

const Filter: React.FC<FilterProps> = ({
  onFilterChange,
  products,
  colorFilter,
  priceFilter,
  onColorFilterChange,
  onPriceFilterChange,
}) => {
  const priceTicks = [
    { value: 0, label: 'Below 50$' },
    { value: 50, label: '50 - 100$' },
    { value: 100, label: '100 - 150$' },
    { value: 150, label: '150 - 200$' },
    { value: 200, label: 'Above 200$' },
  ];

  const availableColors = ['Blue', 'Red', 'Green', 'Black', 'White', 'Beige', 'Yellow'];

  const handleColorFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'default' || value === 'None') {
      onColorFilterChange('');
    } else {
      onColorFilterChange(value);
    }
  };

  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    if (value === 'None') {
      onPriceFilterChange([0, 150]);
    } else if (value === 'Above 200$') {
      onPriceFilterChange([200, Number.MAX_SAFE_INTEGER]);
    } else if (value === '50 - 100$') {
      onPriceFilterChange([50, 100]);
    } else if (value === '100 - 150$') {
      onPriceFilterChange([100, 150]);
    } else if (value === '150 - 200$') {
      onPriceFilterChange([150, 200]);
    } else {
      const priceRange = priceTicks.find((tick) => tick.label === value);
      onPriceFilterChange([priceRange!.value, priceRange!.value === 0 ? 50 : priceRange!.value]);
    }
  };

  return (
    <Box p={4} bg="gray.100" borderRadius="md">
      <Text fontWeight="bold" mb={2}>
        Filter
      </Text>
      <HStack spacing={4}>
        <VStack align="start" spacing={2}>
          <Menu>
            <Select defaultValue="default" cursor="pointer" onChange={handleColorFilterChange}>
              <option value="default" disabled>
                Color
              </option>
              <option value="None">None</option>
              {availableColors.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
          </Menu>
        </VStack>
        <VStack align="start" spacing={2}>
          <Menu>
            <Select defaultValue="default" cursor="pointer" onChange={handlePriceFilterChange}>
              <option value="default" disabled>
                Price
              </option>
              <option value="None">None</option>
              {priceTicks.map((tick) => (
                <option key={tick.value} value={tick.label} disabled={tick.value === 0}>
                  {tick.label}
                </option>
              ))}
            </Select>
          </Menu>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Filter;
