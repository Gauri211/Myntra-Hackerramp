import React from 'react';
import { Box, Grid } from '@chakra-ui/react';

const ColorPalette = () => {
  const colors = ['#FF6347', '#7FFFD4', '#6495ED', '#FFD700', '#8A2BE2', '#32CD32'];

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"  // 3 columns
      gap={1}  // gap between items
      maxWidth="300px"  // adjust as needed for mobile view
      margin="auto"  // center align
    >
      {colors.map((color, index) => (
        <Box
          key={index}
          bg={color}
          height="65px"  // adjust height as needed
          borderRadius="md"  // rounded corners
        />
      ))}
    </Grid>
  );
};

export default ColorPalette;
