import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Image, Input } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import headerImage from '../assets/Header.png'; // Replace with your actual image path
import MidImage from '../assets/Analyser.png'

const AnalyserPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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
      <Image src={headerImage} alt="Header Image" w="100%" h="100%"/>

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
        <Box>
          {/* Add more content here */}
          <Image src={MidImage} alt="Header Image" w="100%" h="100%" />
        </Box>
        {/* Modal for Try On */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Try On</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {image && <Image src={image} alt="Selected" mt={4} />}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' onClick={handleTry}>
                Try
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
