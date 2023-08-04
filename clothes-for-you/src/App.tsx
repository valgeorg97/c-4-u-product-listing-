import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '../src/layout/Navigation/Navigation';
import ProductList from './components/ProductsList/ProductsList';
import  { useState } from 'react';
import Footer from './components/Footer/Footer';
import DiscountAlert from './components/DiscountAlert/DiscountAlert';


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  return (
    <ChakraProvider>
      <Navigation
        setSelectedCategory={setSelectedCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
      <DiscountAlert/>
      <ProductList 
      selectedCategory={selectedCategory}
      selectedSubCategory={selectedSubCategory}
      />
      <Footer />
    </ChakraProvider>
  );
}

export default App;


