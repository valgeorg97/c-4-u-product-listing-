import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '../src/layout/Navigation/Navigation';
import ProductList from './components/ProductsList/ProductsList';
import  { useState } from 'react';


function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  return (
    <ChakraProvider>
      <Navigation
        setSelectedCategory={setSelectedCategory}
        setSelectedSubCategory={setSelectedSubCategory}
      />
      <ProductList 
      selectedCategory={selectedCategory}
      selectedSubCategory={selectedSubCategory}
      />
    </ChakraProvider>
  );
}

export default App;


