import React, { useState, useEffect } from 'react';
import { Box, Button, Image, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Tabs, TabList, Tab, Spinner, Progress } from "@chakra-ui/react";
import axios from 'axios';
import top1 from "../assets/top1.jpeg";
import top2 from "../assets/top4.jpeg";
import top3 from "../assets/top3.jpeg";
import { useNavigate } from 'react-router-dom';

const VotingModal = ({ isOpen, onClose }) => {
  const [counts, setCounts] = useState({ A: 0, B: 0, C: 0 });
  const [totalVotes, setTotalVotes] = useState(0);
  const [winningImage, setWinningImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      const response = await axios.get('http://localhost:5000/counts');
      setCounts(response.data);
      setTotalVotes(response.data.A + response.data.B + response.data.C);
    };
    fetchCounts();
  }, []);

  const handleVote = async (option) => {
    try {
      await axios.post('http://localhost:5000/vote', { option });
      const response = await axios.get('http://localhost:5000/counts');
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
    'A': top1, // Assuming top1 is the image for option A
    'B': top2, // Replace with actual image for option B
    'C': top3  // Replace with actual image for option C
  };

  const getPercentage = (count) => (totalVotes > 0 ? (count / totalVotes) * 100 : 0);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg" className="modal">
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
          {winningImage ? (
            <Box textAlign="center" mt={5}>
              <Image src={winningImage} boxSize="200px" borderRadius="md" mb={5} />
              <Text className="inknut-antiqua-semibold" fontSize={28} mb={2}>Winning Image!</Text>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-around">
              <Box textAlign="center">
                <Image src={top1} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"} onClick={() => handleVote('A')}>A ({counts.A})</Button>
                <Progress value={getPercentage(counts.A)} size="xs" colorScheme="pink" mt={2} />
                <Text mt={1}>{getPercentage(counts.A).toFixed(1)}%</Text>
              </Box>
              <Box textAlign="center">
                <Image src={top2} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"} onClick={() => handleVote('B')}>B ({counts.B})</Button>
                <Progress value={getPercentage(counts.B)} size="xs" colorScheme="pink" mt={2} />
                <Text mt={1}>{getPercentage(counts.B).toFixed(1)}%</Text>
              </Box>
              <Box textAlign="center">
                <Image src={top3} boxSize="100px" borderRadius="md" mb={5} />
                <Button variant="outline" borderRadius="full" color={"black"} onClick={() => handleVote('C')}>C ({counts.C})</Button>
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
