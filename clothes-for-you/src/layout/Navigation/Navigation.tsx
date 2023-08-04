

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons'
import { FaShoppingCart } from 'react-icons/fa';
import {AiOutlineHeart} from 'react-icons/ai'
import Logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom';
import { NavItem } from '../../types/types';
import { DesktopSubNavProps } from '../../types/types';



export default function WithSubnavigation({
  setSelectedCategory,
  setSelectedSubCategory
}: {
  setSelectedCategory: (label: string) => void;
  setSelectedSubCategory: (subLabel: string) => void;
}) {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box
      position="sticky"
      top="0"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      zIndex="sticky"
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            <img src={Logo} alt="Logo" style={{ height: '90px' }} />
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav setSelectedCategory={setSelectedCategory} setSelectedSubCategory={setSelectedSubCategory}/>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <AiOutlineHeart size={28} />
          <FaShoppingCart size={28} />
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav setSelectedSubCategory={setSelectedSubCategory} setSelectedCategory={setSelectedCategory} />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({ setSelectedCategory, setSelectedSubCategory }: { setSelectedCategory: (label: string) => void; setSelectedSubCategory: (subLabel: string) => void }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const handleCategoryHover = (categoryLabel: string) => {
    setSelectedCategory(categoryLabel);
  };

  return (
    <Stack direction={'row'} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as={Link}
                p={2}
                to={`/${navItem.label.toLowerCase()}`}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                onMouseEnter={() => handleCategoryHover(navItem.label)}
                onClick={() => {
                  setSelectedCategory(navItem.label);
                  setSelectedSubCategory(''); 
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                    
                      key={child.subLabel}
                      {...child}
                      setSelectedSubCategory={setSelectedSubCategory} 
                      navItem={navItem}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};



const DesktopSubNav = ({ description, subLabel, setSelectedSubCategory, navItem }: DesktopSubNavProps) => {
  return (
    <Box
      as={Link}
      to={`/${navItem.label.toLowerCase()}/${subLabel.toLowerCase()}`}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
      onClick={() => setSelectedSubCategory(subLabel ?? '')}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {subLabel}
          </Text>
          <Text fontSize={'sm'}>{description}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ setSelectedSubCategory, setSelectedCategory }: { setSelectedSubCategory: (label: string) => void; setSelectedCategory: (label: string) => void }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          label={navItem.label}
          href={navItem.href}
          children={navItem.children}
          setSelectedSubCategory={setSelectedSubCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, setSelectedCategory, setSelectedSubCategory }: NavItem & { setSelectedCategory: (label: string) => void; setSelectedSubCategory: (label: string) => void }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
        onClick={() => setSelectedCategory(label)}
      >
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.subLabel} py={2} href={child.href} onClick={() => setSelectedSubCategory(child.subLabel)}>
                {child.subLabel}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}


const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Men',
    href: '#',
    children: [
      {
        subLabel: 'Shoes',
        description: 'Explore stylish shoes for men',
        href: '#',
      },
      {
        subLabel: 'Clothes',
        description: 'Discover trendy clothes for men',
        href: '#',
      },
      {
        subLabel: 'Show All', 
        description: 'Show all men fashion',
        href: '#',
      },
    ],
  },
  {
    label: 'Women',
    href: '#',
    children: [
      {
        subLabel: 'Shoes',
        description: 'Find fashionable shoes for women',
        href: '#',
      },
      {
        subLabel: 'Clothes',
        description: 'Browse stylish clothes for women',
        href: '#',
      },
      {
        subLabel: 'Show All', 
        description: 'Show all women fashion',
        href: '#',
      },
    ],
  },
];

