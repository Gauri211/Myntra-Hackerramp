import { useState, useEffect } from 'react';
import { Box, useDisclosure, Text, Spinner } from '@chakra-ui/react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import axios from 'axios';
import voicebg from "../assets/header.jpg";
import MultiCardCarousel from '../components/MultiCardCarousel';
import WeatherMultiCard from '../components/WeatherMultiCard';
import VotingModal from '../components/VotingModal';
import { useLocation } from "react-router-dom";
import ChoiceTrendCarousel from "../components/ChoiceTrendCarousel"

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { winningImage } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [trend, setTrend] = useState([]);
  const [newRec, setNewRec] = useState(false);

  useEffect(() => {
    if (winningImage) {
      fetchRecommendations(winningImage);
    }
  }, [winningImage]);

  const fetchRecommendations = async (imagePath) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  console.log(newRec);
  console.log(trend);

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

        <Box mt={3} h={300}>
          <Text mb={3} ml={3} className='inknut-antiqua-medium'>Cool Picks for you</Text>
          <MultiCardCarousel products={products} />
        </Box>
      <Box mt={10} h={300}>
        <WeatherMultiCard />
      </Box>
    </Box>
  );
};

export default Home;
