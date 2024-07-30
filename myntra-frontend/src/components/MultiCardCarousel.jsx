import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from './ProductCard';
import whiteTop from "../assets/white-top.jpeg"
import orangeTop from "../assets/orange-top.jpeg"
import pinkTop from "../assets/pinkTop.jpg"
import blackTop from "../assets/black-top.jpeg"
import peachTop from "../assets/peach-top.jpeg"

const cards = [
  { id: 1, title: 'White Top', content: 'Content of Card 1', cardimage: whiteTop },
  { id: 2, title: 'Orange Top', content: 'Content of Card 2', cardimage: orangeTop},
  { id: 3, title: 'Pink Top', content: 'Content of Card 3', cardimage: pinkTop },
  { id: 4, title: 'Black Top', content: 'Content of Card 4', cardimage: blackTop },
  { id: 5, title: 'Peach Top', content: 'Content of Card 5', cardimage: peachTop },
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
    <Carousel responsive={responsive} infinite={true} autoPlaySpeed={3000}>
      {cards.map((card) => (
        <div className="product-card-wrapper" key={card.id}>
          <ProductCard title={card.title} cardimage={card.cardimage}/>
        </div>
      ))}
    </Carousel>
  );
};

export default MultiCardCarousel;
