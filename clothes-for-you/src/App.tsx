import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '../src/layout/Navigation/Navigation'

function App() {
  return (
    <ChakraProvider>
      <Navigation/>
    </ChakraProvider>
  );
}

export default App;

