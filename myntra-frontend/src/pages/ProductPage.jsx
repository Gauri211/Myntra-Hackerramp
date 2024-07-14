import { Box, Button, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";


const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, cardimage, content, price } = location.state || {};

  const getImage = () => {

  }
  
  return (
    <Box>
      <Flex justifyContent={'space-between'} p={2}>
        <HStack spacing={3}>
          <FaArrowLeft className="icons" onClick={() => navigate("/")}/>
          <Heading fontSize={'24px'}>{title || "Product Title"}</Heading>
        </HStack>
        <HStack spacing={3}>
          <GoShareAndroid className="icons"/>
          <GrFavorite className="icons"/>
          <HiOutlineShoppingBag className="icons"/>
        </HStack>
      </Flex>
      <Box h={450} mt={2}>
        <Image src={cardimage} alt={title} />
      </Box>
      <Flex p={4} mt={2} justifyContent={"space-between"}>
        <Box>
            <Heading size='md'>White Top</Heading>
            {/* <Text mt={2}>{content || "Product description goes here."}</Text> */}
            <Text mt={2} color='gray.400' fontSize='2xl'>{price ? `$${price}` : "$647"}</Text>
        </Box>
        <Box align={"center"}>
            {/* <Button variant="outline" onClick={() => navigate("/tryon", { state: { title } })}>Try On</Button> */}
            <Button variant="outline" onClick={getImage()}>Try On</Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default ProductPage;
