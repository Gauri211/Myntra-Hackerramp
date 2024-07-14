import { ChakraProvider, Image } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VirtualTryOn from './pages/VirtualTryOn';
import bottomImage from "./assets/bottom-bar.jpg"
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tryon' element={<VirtualTryOn />} />
          <Route path='/product' element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
      <Image
        src={bottomImage}
        position="fixed"
        bottom="0"
        width="100%"
        zIndex="9999" // Ensure the image is on top of other content
      />
    </ChakraProvider>
  );
}

export default App;
