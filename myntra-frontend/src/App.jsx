import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VoiceChoice from './pages/VoiceChoice';
import VirtualTryOn from './pages/VirtualTryOn';
import Weather from './pages/Weather';

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
    </ChakraProvider>
  );
}

export default App;
