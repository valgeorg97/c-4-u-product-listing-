
import React from 'react';
import { Box } from '@chakra-ui/react';

const DiscountAlert: React.FC = () => {
  return (
    <Box
      bg="orange"
      color="white"
      py={2}
      px={{ base: 4, md: 6 }}
      mt={0}
      mb={2}
      textAlign="center"
      fontSize="sm"
    >
      Discount on ALL Men and Women Shoes!
    </Box>
  );
};

export default DiscountAlert;

