import { Box, Flex, Heading, HStack } from "@chakra-ui/react"
import { FaArrowLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ModelViewer from "../components/ModelViewer";

const VirtualTryOn = () => {
  return (
    <Box>
        <Flex justifyContent={'space-between'} p={2}>
            <HStack spacing={3}>
                <FaArrowLeft className="icons"/>
                <Heading fontSize={'24px'}>Dressberry</Heading>
            </HStack>
            <HStack spacing={3}>
                <GoShareAndroid className="icons"/>
                <GrFavorite className="icons"/>
                <HiOutlineShoppingBag className="icons"/>
            </HStack>
        </Flex>
        <Box h={450} bgColor={'black'}>
          <ModelViewer />
        </Box>
    </Box>
  )
}

export default VirtualTryOn