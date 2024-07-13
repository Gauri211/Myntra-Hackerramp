import { Box } from '@chakra-ui/react';
import VoicePopUp from '../components//VoicePopUp';
import voicebg from "../assets/header.jpg";
import MultiCardCarousel from '../components/MultiCardCarousel';
import { IoIosNotificationsOutline } from 'react-icons/io';

const VoiceChoice = () => {
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
      <IoIosNotificationsOutline />
      </Box>
      <VoicePopUp />
    </Box>
    <Box mt={3} h={300}>
        <MultiCardCarousel />
      </Box>
    </Box>
  );
};

export default VoiceChoice;
