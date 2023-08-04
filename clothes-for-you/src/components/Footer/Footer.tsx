import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box
      bg="transparent"
      color="black"
      py={6}
      textAlign="center"
      position="relative"
      bottom={0}
      width="100%" 
    >
      <Text fontSize="sm">
        &copy; {new Date().getFullYear()} Clothes for you (C4Y) - All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
