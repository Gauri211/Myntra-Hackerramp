/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Button, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Progress, Flex } from "@chakra-ui/react";
import axios from 'axios';
import top1 from "../assets/top1.jpeg";
import top2 from "../assets/top4.jpeg";
import top3 from "../assets/top3.jpeg";
import { useNavigate } from 'react-router-dom';
import genderTabs from "../assets/gender-tabs.jpg"
import { FaCrown } from 'react-icons/fa';

const VotingModal = ({ isOpen, onClose }) => {
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0 });
  const [totalVotes, setTotalVotes] = useState(0);
  const [winningImage, setWinningImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const response = await axios.get('http://127.0.0.1:5001/counts');
      setCounts(response.data);
      setTotalVotes(response.data.A + response.data.B + response.data.C);
    };
    fetchCounts();
  }, []);

  const handleVote = async (option) => {
    try {
      await axios.post('http://127.0.0.1:5001/vote', { option });
      const response = await axios.get('http://127.0.0.1:5001/counts');
      setCounts(response.data);
      setTotalVotes(response.data.A + response.data.B + response.data.C);

      // Check if any option has exceeded 2 votes
      if (response.data[option] > 2) {
        setWinningImage(winningOptionImages[option]);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleClose = async () => {
    if (winningImage) {
      navigate("/",  { state: { winningImage } })
    }
    onClose();
  };

  const winningOptionImages = {
    'A': top1, 
    'B': top2, 
    'C': top3  
  };

  const getPercentage = (count) => (totalVotes > 0 ? (count / totalVotes) * 100 : 0);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="md" className="modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Image mt={4} src={genderTabs} align={"center"}/>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={10} mt={-3}>
          <Box textAlign="center" mb={7}>
            <Text className="inknut-antiqua-semibold" fontSize={28} mb={2}>Voice your choice</Text>
            <Text className="inknut-antiqua-light" fontSize={15}>Choose and make it the next trend!</Text>
          </Box>
          {winningImage ? (
            <Box textAlign="center" mt={5}>
              <Box align={"center"}>
              <Image align={"center"} src={winningImage} boxSize="200px" borderRadius="md" mb={5} />
              </Box>
              <Flex align="center" justifyContent={"center"}><FaCrown fontSize={30} /><Text className="inknut-antiqua-semibold" fontSize={28} mx={3}>Winner!</Text><FaCrown fontSize={30} /></Flex>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-between">
              <Box textAlign="center" mr={2}>
                <Image src={top1} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" colorScheme={"black"} onClick={() => handleVote('A')}>A</Button>
                <Progress value={getPercentage(counts.A)} size="xs" colorScheme="pink" mt={2} />
                <Text mt={1}>{getPercentage(counts.A).toFixed(1)}%</Text>
              </Box>
              <Box textAlign="center">
                <Image src={top2} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" colorScheme={"black"} onClick={() => handleVote('B')}>B </Button>
                <Progress value={getPercentage(counts.B)} size="xs" colorScheme="pink" mt={2} />
                <Text mt={1}>{getPercentage(counts.B).toFixed(1)}%</Text>
              </Box>
              <Box textAlign="center">
                <Image src={top3} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" colorScheme={"black"} onClick={() => handleVote('C')}>C</Button>
                <Progress value={getPercentage(counts.C)} size="xs" colorScheme="pink" mt={2} />
                <Text mt={1}>{getPercentage(counts.C).toFixed(1)}%</Text>
              </Box>
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VotingModal;
