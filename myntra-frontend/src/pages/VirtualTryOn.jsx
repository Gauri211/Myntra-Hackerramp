import { useState } from "react";
import { Box, Flex, Heading, HStack, Image } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ModelViewer from "../components/ModelViewer";
import MultiCardCarousel from "../components/MultiCardCarousel";
import { useNavigate, useLocation } from "react-router-dom";
import roomBg from "../assets/roombg.jpeg";
import plantBg from "../assets/plant.jpeg";
import brownBg from "../assets/brown.jpg";
import interiorBg from "../assets/abcd.png";

const backgrounds = [
  { src: plantBg, name: "Plant" },
  { src: roomBg, name: "Room" },
  { src: brownBg, name: "Brown" },
  { src: interiorBg, name: "Interior" },
];

const VirtualTryOn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};
  const [selectedBg, setSelectedBg] = useState(plantBg);

  return (
    <Box>
      <Flex justifyContent={"space-between"} p={2}>
        <HStack spacing={3}>
          <FaArrowLeft className="icons" onClick={() => navigate("/")} />
          <Heading fontSize={"24px"}>{title}</Heading>
        </HStack>
        <HStack spacing={3}>
          <GoShareAndroid className="icons" />
          <GrFavorite className="icons" />
          <HiOutlineShoppingBag className="icons" />
        </HStack>
      </Flex>
      <Box h={450} backgroundImage={`url(${selectedBg})`} backgroundSize="cover" backgroundPosition="center">
        <ModelViewer title={title} />
      </Box>
      <Flex justifyContent="center" p={4}>
        {backgrounds.map((bg) => (
          <Box
            key={bg.name}
            onClick={() => setSelectedBg(bg.src)}
            cursor="pointer"
            border={selectedBg === bg.src ? "3px solid #FF69B4" : "2px solid transparent"}
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            mx={2}
          >
            <Image src={bg.src} boxSize={16} objectFit="cover" />
          </Box>
        ))}
      </Flex>
      <Box p={4} borderRadius="md">
        <Heading size="sm" mb={3}>
          More like this
        </Heading>
        <MultiCardCarousel />
      </Box>
    </Box>
  );
};

export default VirtualTryOn;
