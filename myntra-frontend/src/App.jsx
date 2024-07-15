import { Box, ChakraProvider, Image } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VirtualTryOn from './pages/VirtualTryOn';
import Analyser from './pages/Analyser';
import bottomImage from "./assets/bottom-bar.jpg"
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/try-on' element={<VirtualTryOn />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/analyser' element={<Analyser />} />
        </Routes>
      </BrowserRouter>
      <Box pt={"40px"}>
      <Image
        src={bottomImage}
        position="fixed"
        bottom="0"
        width="100%"
        zIndex="9999" 
        mt={50}
      /> 
      </Box>
    </ChakraProvider>
  );
}

export default App;
