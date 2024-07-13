import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';

const cards = [
  { id: 1, title: 'Card 1', content: 'Content of Card 1' },
  { id: 2, title: 'Card 2', content: 'Content of Card 2' },
  { id: 3, title: 'Card 3', content: 'Content of Card 3' },
  { id: 4, title: 'Card 4', content: 'Content of Card 4' },
  { id: 5, title: 'Card 5', content: 'Content of Card 5' },
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

const MultiCardCarousel = () => {

  return (
    <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={3000}>
      {cards.map((card) => (
        <div className="product-card-wrapper" key={card.id}>
          <ProductCard title={card.title} content={card.content} />
        </div>
      ))}
    </Carousel>
  );
};

export default MultiCardCarousel;
