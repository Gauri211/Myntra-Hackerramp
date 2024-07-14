import { Box, Flex, Heading, HStack } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ModelViewer from "../components/ModelViewer";
import MultiCardCarousel from "../components/MultiCardCarousel";
import { useNavigate, useLocation } from "react-router-dom";

const VirtualTryOn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};

  return (
    <Box>
        <Flex justifyContent={'space-between'} p={2}>
            <HStack spacing={3}>
                <FaArrowLeft className="icons" onClick={() => navigate("/")}/>
                <Heading fontSize={'24px'}>Dressberry</Heading>
            </HStack>
            <HStack spacing={3}>
                <GoShareAndroid className="icons"/>
                <GrFavorite className="icons"/>
                <HiOutlineShoppingBag className="icons"/>
            </HStack>
        </Flex>
        <Box h={450} bgColor={'black'}>
          <ModelViewer title={title}/>
        </Box>
        <Box
        // mt={2}
        // bgGradient="linear(to-r, #e0c3fc, #8ec5fc)" // Light purple to pink gradient
        p={4}
        borderRadius="md"
      >
        <Heading size="sm" mb={3}>More like this</Heading>
        <MultiCardCarousel />
      </Box>
    </Box>
  )
}

export default VirtualTryOn