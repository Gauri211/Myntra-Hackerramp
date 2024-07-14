import React, { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Box, Button, Flex, Heading, Image, Input, ChakraProvider } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import headerImage from '../assets/Header.png'; // Replace with your actual image path
import Analyser from '../assets/Analyser.png';
import ColorPalette from '../components/ColorPalette';
import SeasonImage from '../components/Season';
import voicebg from "../assets/header.jpg";
import colorwheel from "../assets/color-wheel.png"

const AnalyserPage = () => {
  const currentSeason = 'summer';
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [showAnalyser, setShowAnalyser] = useState(true); // State to manage visibility of Analyser image

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setShowAnalyser(false); // Hide Analyser image after setting the image
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
      <Box
        w="100%"
        h="6.5vh"
        bgImage={voicebg}
        bgSize="cover"
        bgPosition="top"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box position={"absolute"} top={2.5} right={"107px"} fontSize={"30px"} bgColor={"white"}>
          <IoIosNotificationsOutline />
        </Box>
        <Box position={"absolute"} top={0.1} right={"50px"} fontSize={"30px"}>
          <Image src={colorwheel} h={12} w={12} bgColor={"white"} />
        </Box>
      </Box>
     
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

        {/* Analyser Image Display Section */}
        {showAnalyser && (
          <Box mb={5}>
            <Image src={Analyser} alt="Analyser Image" w="100%" h="auto" />
          </Box>
        )}

        {/* Selected Image Display Section */}
        {image && !showAnalyser && (
          <Box mb={5}>
            <Image src={image} alt="Selected Image" w="100%" h="auto" />
          </Box>
        )}

        {/* SeasonImage and ColorPalette */}
        {!showAnalyser && (
          <Box>
            <SeasonImage season={currentSeason} />
          </Box>
        )}
        {!showAnalyser && (
          <Box mt={5}>
            <ColorPalette />
          </Box>
        )}

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
