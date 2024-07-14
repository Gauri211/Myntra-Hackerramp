import { Box, Heading, useDisclosure } from '@chakra-ui/react';
// import VoicePopUp from '../components//VoicePopUp';
import voicebg from "../assets/header.jpg";
import MultiCardCarousel from '../components/MultiCardCarousel';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, Tabs, Text } from "@chakra-ui/react"
import top from '../assets/black-top.jpg'
import WeatherMultiCard from '../components/WeatherMultiCard';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bgGradient="linear(to-r, #e0c3fc, #8ec5fc)">
    <Box
      w="100%"
      h="35vh"
      bgImage={voicebg}
      bgSize="cover"
      bgPosition="center"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box position={"absolute"} top={2.5} right={"107px"} fontSize={"30px"} bgColor={"white"}>
      <IoIosNotificationsOutline onClick={onOpen}/>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg" className="modal">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Tabs variant="soft-rounded" colorScheme="pink">
              <TabList justifyContent="center">
                <Tab>Men</Tab>
                <Tab>Women</Tab>
              </TabList>
            </Tabs>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Box textAlign="center" mb={7}>
              <Text className="inknut-antiqua-semibold" fontSize={28} mb={2}>Voice your choice</Text>
              <Text className="inknut-antiqua-light" fontSize={15}>Choose and make it the next trend!</Text>
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Box textAlign="center">
                <Image src={top} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"}>A</Button>
              </Box>
              <Box textAlign="center">
                <Image src={top} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"}>B</Button>
              </Box>
              <Box textAlign="center">
                <Image src={top} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"}>C</Button>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    <Box mt={3} h={300}>
      <Text mb={3} ml={3} className='inknut-antiqua-medium'>Cool Picks for you</Text>
        <MultiCardCarousel />
      </Box>
      <Box mt={10} h={300}>
        <WeatherMultiCard/>
      </Box>
    </Box>
  );
};

export default Home;
