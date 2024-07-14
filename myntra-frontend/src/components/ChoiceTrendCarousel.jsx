/* eslint-disable react/prop-types */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box } from '@chakra-ui/react';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const ChoiceTrendCarousel = ({trend}) => {

  return (
    <Carousel responsive={responsive} infinite={true} autoPlaySpeed={3000}>
        {trend.map((i, index) => (
        <Box mx={2} key={index}>
            <img src={i} alt={`Recommended ${index}`} />
        </Box>
        ))}

    </Carousel>
  );
};

export default ChoiceTrendCarousel;
