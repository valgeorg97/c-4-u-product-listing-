

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    discountedPrice: number | null;
    imageUrl1: string;
    imageUrl2: string;
    ratings: number;
    category: string;
    color: string;
    type: string;
  }

  export interface ProductListProps {
    selectedCategory: string;
    selectedSubCategory: string; 
  }

  export interface StarRatingProps {
    rating: number;
  }
  
  export interface NavItem {
    label: string;
    description?: string;
    href?: string;
    children?: Array<SubNavItem>;
  }
  
  export interface SubNavItem {
    subLabel: string;
    description?: string;
    href?: string;
  }

  export interface DesktopSubNavProps extends SubNavItem {
    setSelectedSubCategory: (subLabel: string) => void;
    navItem: NavItem;
  }

  export interface SortProps {
    onSortChange: (value: string) => void;
  }

  export interface ProductCardProps {
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      discountedPrice: number | null;
      imageUrl1: string;
      imageUrl2: string;
      ratings: number; 
      category: string;
      color: string;
      type: string;
    };
  }

  export interface FilterProps {
    onColorFilterChange: (selectedColor: string) => void;
    onPriceFilterChange: (newPriceFilter: [number, number]) => void;
  
  }