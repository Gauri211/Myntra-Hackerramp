import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import VoiceChoice from './pages/VoiceChoice';
import VirtualTryOn from './pages/VirtualTryOn';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<VoiceChoice />} />
          <Route path='/tryon' element={<VirtualTryOn />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
