import { Box, Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, Tabs, Text, useDisclosure } from "@chakra-ui/react"
import top from '../assets/black-top.jpg'

const VoicePopUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

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
            <Box textAlign="center" mb={7}>Okay
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
    </>
  );
};

export default VoicePopUp