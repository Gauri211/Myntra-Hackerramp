import { ChakraProvider, Image } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VoiceChoice from './pages/VoiceChoice';
import VirtualTryOn from './pages/VirtualTryOn';
import Weather from './pages/Weather';
import bottomImage from "./assets/bottom-bar.jpg"

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VoiceChoice />} />
          <Route path='/tryon' element={<VirtualTryOn />} />
          <Route path='/weather' element={<Weather />} />
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
