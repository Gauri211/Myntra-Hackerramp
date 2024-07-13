import { Box } from '@chakra-ui/react';
import VoicePopUp from '../components//VoicePopUp';
import voicebg from "../assets/voice-bg.jpg";

const VoiceChoice = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage={voicebg}
      bgSize="cover"
      bgPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VoicePopUp />
    </Box>
  );
};

export default VoiceChoice;
