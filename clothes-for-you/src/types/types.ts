

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
    selectedCategory: string; // Add selectedCategory property
    selectedSubCategory: string; // Add selectedSubCategory property
  }
  