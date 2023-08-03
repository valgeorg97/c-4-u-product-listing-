import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box bg="white" color="black" py={6} textAlign="center" mt={10}>
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} Clothes for you (C4U) - All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
