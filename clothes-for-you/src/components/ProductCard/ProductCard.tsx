import { useState, useRef } from 'react';
import { Box, Image, Heading, Text, VStack, Flex, IconButton, useToast } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import StarRating from '../StarsRating/StarsRating';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice: number | null;
    imageUrl1: string;
    imageUrl2: string;
    ratings: number; // Include the ratings field in the product type
    category: string;
    color: string;
    type: string;
  };
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [currentImage, setCurrentImage] = useState('imageUrl1');
  const imageRef = useRef(null);

  const toast = useToast(); 

  const toggleHeart = () => {
    setIsHeartFilled(!isHeartFilled);
    
    if (!isHeartFilled) {
      showToast('Product added to favorites!', 'success');
    } else {
      showToast('Product removed from favorites!', 'warning');
    }
  };
  const handleAddToCart = () => {
    showToast('Product successfully added to cart!', 'success'); 
  };

  const showToast = (message: string, status: string) => {
    toast({
      title: message,
      status: status,
      duration: 2000, 
      isClosable: true,
    });
  };



  const toggleImage = () => {
    setCurrentImage(currentImage === 'imageUrl1' ? 'imageUrl2' : 'imageUrl1');
  };

  return (
    <Box position="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Image
        src={product[currentImage]} 
        alt={product.name}
        boxSize="300px"
        maxW="150%"
        maxH="350px"
        borderRadius={'md'}
        boxShadow={'md'}
        _hover={{
          cursor: 'pointer',
        }}
        onClick={toggleImage}
        ref={imageRef}
      />
      <Box
        position="absolute"
        top={0}
        right={24}
        zIndex={1}
        transition="visibility 0s, opacity 0.2s linear"
      >
        <IconButton
          aria-label="Add to favorites"
          icon={isHeartFilled ? <AiFillHeart /> : <AiOutlineHeart />}
          variant="ghost"
          color="red.500"
          _hover={{
            color: 'red.600',
          }}
          onClick={toggleHeart}
        />
      </Box>
      {isHovered && (
        <Box
          position="absolute"
          bottom={8}
          left={0}
          right={0}
          p={2}
          bg="black"
          color="white"
          textAlign="center"
          width="300px"
          borderRadius={'md'}
          _hover={{cursor: 'pointer'}}
          onClick={handleAddToCart}
        >
          <Flex justify="center" align="center" >
            <FaShoppingCart style={{ marginRight: '8px' }} />
            Add to cart
          </Flex>
        </Box>
      )}
      <Box textAlign={"center"} w='300px'>
        <Heading as="h3" size="md" textAlign="center" mt={2}>
          {product.name}
        </Heading>
        <VStack align="start" spacing={2} visibility={isHovered ? 'hidden' : 'visible'}>
          <Text>{product.description}</Text>
          <StarRating rating={product.ratings} />
          <Text>Price: ${product.price}</Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
