import { Box, CardFooter } from '@chakra-ui/react';
import Weatherbg from "../assets/Weather_bg.jpg";
import GradientBox from '../components/GradientBox';
import footer from "../assets/footer.jpg";

const Weather = () => {
  return (
    <Box
      w="100vw"
      h="30vh"
      bgImage={Weatherbg}
      bgSize="cover"
      bgPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
     <GradientBox />
    </Box>
  );
};

export default Weather;
