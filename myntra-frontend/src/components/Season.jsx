import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import Ses1 from '../assets/Spring.png';
import Ses2 from '../assets/Summ.png';
import Ses3 from '../assets/Autumn.png';
import Ses4 from '../assets/Winter.png';

const SeasonImage = ({ season }) => {
  let seasonImage;

  if (season === 'spring') {
    seasonImage = (
      <Image src={Ses1} alt="Spring" style={{ width: '100%', height: 'auto', padding: '10px' }} />
    );
  } else if (season === 'summer') {
    seasonImage = (
      <Image src={Ses2} alt="Summer" style={{ width: '100%', height: 'auto', padding: '10px' }} />
    );
  } else if (season === 'autumn') {
    seasonImage = (
      <Image src={Ses3} alt="Autumn" style={{ width: '100%', height: 'auto', padding: '10px' }} />
    );
  } else if (season === 'winter') {
    seasonImage = (
      <Image src={Ses4} alt="Winter" style={{ width: '100%', height: 'auto', padding: '10px' }} />
    );
  } else {
    seasonImage = (
      <Box>No season selected</Box>
    );
  }

  return (
    <Box>
      {seasonImage}
    </Box>
  );
};

export default SeasonImage;
