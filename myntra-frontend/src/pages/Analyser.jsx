import { useState } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Box, Button, Flex, Image, Input, Spinner, Text, Grid, HStack } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import axios from 'axios';
import Analyser from '../assets/Analyser.png';
import SeasonImage from '../components/Season';
import voicebg from "../assets/header.jpg";
import colorwheel from "../assets/color-wheel.png";
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ChoiceTrendCarousel from '../components/ChoiceTrendCarousel';

const AnalyserPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [showAnalyser, setShowAnalyser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hexColors, setHexColors] = useState([]);
  const [season, setSeason] = useState('');
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImage(reader.result);
        setShowAnalyser(false);

        // Create FormData and append the file
        const formData = new FormData();
        formData.append('file', file);

        try {
          // Send the image to the backend
          const response = await axios.post('http://127.0.0.1:5001/colorrec', formData);
          
          // Extract hex colors and season from the response
          const { "Hex Colors": hexColors, Season: season, Links: links } = response.data;
          setHexColors(hexColors);
          setSeason(season);
          setLinks(links);
          setLoading(false);
          onClose();
        } catch (error) {
          console.error('Error analyzing image:', error);
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTry = () => {
    alert('Try On clicked!');
    onClose();
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
            <HStack ml={-3}>
            <FaArrowLeft className="icons" onClick={() => navigate("/")}/>
            <Text as="h1" className='inknut-antiqua-bold' fontSize="18px"> COLOR ANALYSIS </Text>
            </HStack>
            
          </Box>

          {/* Right Section (Try On Button) */}
          <Box>
            <Button variant="outline" colorScheme='orange' px={4} onClick={onOpen}>
              Try It!
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
          <Box mb={3}>
            <Image src={image} alt="Selected Image" w="100%" h="auto" />
          </Box>
        )}

        {/* Loading Spinner */}
        {loading && (
          <Box textAlign="center">
            <Spinner size="xl" />
          </Box>
        )}

        {/* SeasonImage and ColorPalette */}
        {!showAnalyser && !loading && (
          <>
            <Box>
              <Text fontSize="xl" align={"center"} className='inknut-antiqua-semibold'>{season}</Text>
              <SeasonImage season={season} />
            </Box>
            <Box mt={1}>
              <Text fontSize="lg" align={"center"} className='inknut-antiqua-semibold' mb={4}>Curated Color Spectrum Just for You!</Text>
              <Grid
                templateColumns="repeat(3, 1fr)"  // 3 columns
                gap={1}  // gap between items
                maxWidth="300px"  // adjust as needed for mobile view
                margin="auto"  // center align
              >
                {hexColors.map((color, index) => (
                  <Box
                    key={index}
                    bg={color}
                    height="65px"  // adjust height as needed
                    borderRadius="md"  // rounded corners
                  />
                ))}
              </Grid>
            </Box>
            <Box mt={5}>
              <Text fontSize="lg" align={"center"} mb={3} className='inknut-antiqua-semibold'>Color Sync Recommendations</Text>
              <ChoiceTrendCarousel trend={links} />
            </Box>
          </>
        )}

        {/* Modal for Try On */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Try On</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="file" accept="image/*" onChange={handleImageChange} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='pink' onClick={handleTry}>
                Okay
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default AnalyserPage;
