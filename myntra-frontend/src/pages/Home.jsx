import { useState, useEffect } from 'react';
import { Box, useDisclosure, Text, Image } from '@chakra-ui/react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import axios from 'axios';
import voicebg from "../assets/header.jpg";
import MultiCardCarousel from '../components/MultiCardCarousel';
import WeatherMultiCard from '../components/WeatherMultiCard';
import VotingModal from '../components/VotingModal';
import { useLocation, useNavigate } from "react-router-dom";
import ChoiceTrendCarousel from "../components/ChoiceTrendCarousel"
import colorwheel from "../assets/color-wheel.png"

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { winningImage } = location.state || {};
  const [trend, setTrend] = useState([]);
  const [newRec, setNewRec] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (winningImage) {
      fetchRecommendations(winningImage);
    }
  }, [winningImage]);

  const fetchRecommendations = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const file = new File([blob], 'winningImage.jpg', { type: blob.type });
      const formData = new FormData();
      formData.append('file', file);

      const recommendationsResponse = await axios.post('http://localhost:5001/recommend', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const { recommended_images } = recommendationsResponse.data;
      setTrend(recommended_images);
      setNewRec(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } 
  };


  return (
    <Box bgGradient="linear(to-r, #e0c3fc, #8ec5fc)">
      <Box
        w="100%"
        h="35vh"
        bgImage={voicebg}
        bgSize="cover"
        bgPosition="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box position={"absolute"} top={2.5} right={"107px"} fontSize={"30px"} bgColor={"white"}>
          <IoIosNotificationsOutline onClick={onOpen} />
        </Box>
        <Box position={"absolute"} top={0.1} right={"50px"} fontSize={"30px"}>
          <Image src={colorwheel} h={12} w={12} bgColor={"white"} onClick={() => navigate("/analyser")}/>
        </Box>
        <VotingModal isOpen={isOpen} onClose={onClose} fetchRecommendations={fetchRecommendations} />
      </Box>
      {newRec ? (
        <>
        <Text my={3} ml={3} className='inknut-antiqua-medium'>Trends</Text>
        <Box>
          <ChoiceTrendCarousel trend={trend} />
        </Box>
        </>
      ) : null }

        <Box mt={3} h={400}>
          <Text mb={3} ml={3} className='inknut-antiqua-semibold'>Cool Picks for you</Text>
          <MultiCardCarousel />
        </Box>
    </Box>
  );
};

export default Home;
