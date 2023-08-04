import React from 'react';
import { Box, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const validRating = Math.min(Math.max(rating, 0), 5); // Ensure rating is within the range of 0 to 5
  const fullStars = Math.floor(validRating);
  const hasHalfStar = validRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const starColor = useColorModeValue('yellow.500', 'yellow.300');

  return (
    <Box display="inline-flex">
      {[...Array(fullStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color={starColor} boxSize={4} />
      ))}
      {hasHalfStar && <Icon as={FaStarHalfAlt} color={starColor} boxSize={4} />}
      {[...Array(emptyStars)].map((_, index) => (
        <Icon key={index} as={FaStar} color="gray.300" boxSize={4} />
      ))}
    </Box>
  );
};

export default StarRating;
