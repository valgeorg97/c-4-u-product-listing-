import { useState, useRef } from 'react';
import { Box, Image, Heading, Text, VStack, Flex, IconButton, useToast, useBreakpointValue } from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import StarRating from '../StarsRating/StarsRating';
import { ProductCardProps } from '../../types/types';


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [currentImage, setCurrentImage] = useState<'imageUrl1' | 'imageUrl2'>('imageUrl1');
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

  const showToast = (message: string, status: "success" | "warning" | "info" | "error" | "loading" | undefined) => {
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
  const heartPosition = useBreakpointValue({ base: 'center', md: 'top-right' });

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
        right={heartPosition === 'top-right' ? 24 : 'auto'}
        left={heartPosition === 'center' ? '92%' : 'auto'}
        transform={heartPosition === 'center' ? 'translateX(-50%)' : 'none'}
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
          {product.type === 'Shoes' && product.discountedPrice ? (
            <Flex align="center">
              <Text as="s" color="gray.400" mr={2}>
                ${product.price.toFixed(2)}
              </Text>
              <Text color="orange.500" fontWeight="bold">
                ${product.discountedPrice.toFixed(2)}
              </Text>
            </Flex>
          ) : (
            <Text>Price: ${product.price.toFixed(2)}</Text>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
