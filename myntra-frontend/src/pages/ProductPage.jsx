import { useState } from 'react';
import { Box, Button, Flex, Heading, HStack, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa6";
import { GoShareAndroid } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";
import MultiCardCarousel from '../components/MultiCardCarousel';

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, cardimage, price } = location.state || {};
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTry = () => {
    navigate("/try-on", { state: { title } });
  };

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
          <Text mt={2} color='gray.400' fontSize='2xl'>{price ? `$${price}` : "$647"}</Text>
        </Box>
        <Box alignSelf={"center"}>
          <Button variant="outline" colorScheme='pink' onClick={onOpen}>Try On</Button>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Try On</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <Image src={image} alt="Selected" mt={4} />}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='pink' onClick={handleTry}>
              Try
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box p={4}>
      <Heading size="sm" mb={3}>More like this</Heading>
        <MultiCardCarousel />
      </Box>
    </Box>
  );
};

export default ProductPage;
