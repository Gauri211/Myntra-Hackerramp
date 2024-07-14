import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input, ChakraProvider } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import headerImage from '../assets/Header.png'; // Replace with your actual image path
import Analyser from '../assets/Analyser.png';
import ColorPalette from '../components/ColorPalette';
import SeasonImage from '../components/Season';

const AnalyserPage = () => {
  const currentSeason = 'summer';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onClose(); // Close the modal after setting the image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTry = () => {
    // Handle Try On functionality
    alert('Try On clicked!');
    onClose(); // Close the modal after handling try on
  };

  return (
    <Box>
      {/* Header Image */}
      <Image src={Analyser} alt="Selected Image" w="100%" h="auto" />
      {/* Content Box */}
      <Box p={5}>
        <Flex justifyContent="space-between" alignItems="center" mb={3}>
          {/* Left Section (Seasonal Color Analysis) */}
          <Box>
            <Heading as="h1" size="md" fontWeight="bold" fontFamily="Jaldi" fontSize="20px" pl={5}>
              COLOR ANALYSIS
            </Heading>
          </Box>

          {/* Right Section (Try On Button) */}
          <Box>
            <Button variant="outline" colorScheme='pink' pr={6} onClick={onOpen}>
              Try On
            </Button>
          </Box>
        </Flex>

        {/* Selected Image Display Section */}
        {image && (
          <Box mb={5}>
            <Image src={image} alt="Selected Image" w="100%" h="auto" />
          </Box>
        )}

        {/* SeasonImage and ColorPalette */}
        <Box>
          <SeasonImage season={currentSeason} />
        </Box>
        <Box mt={5}>
          <ColorPalette />
        </Box>

        {/* Modal for Try On */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Try On</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {/* {image && <Image src={image} alt="Selected" mt={4} />} */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' onClick={handleTry}>
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Additional Content */}
      </Box>
    </Box>
  );
};

export default AnalyserPage;