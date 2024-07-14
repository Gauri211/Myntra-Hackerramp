import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import whiteTop from "../assets/white-top.jpeg"
import orangeTop from "../assets/orange-top.jpeg"
import blackTop from "../assets/black-top.jpg"
import { Box } from '@chakra-ui/react';

const cards = [
  { id: 1, title: 'White Top', content: 'Content of Card 1', cardimage: whiteTop },
  { id: 2, title: 'Orange Top', content: 'Content of Card 2', cardimage: orangeTop},
  { id: 3, title: 'Black Top', content: 'Content of Card 3', cardimage: blackTop },
  { id: 4, title: 'Card 4', content: 'Content of Card 4', cardimage: whiteTop },
  { id: 5, title: 'Card 5', content: 'Content of Card 5', cardimage: orangeTop },
  // Add more cards as needed
];

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