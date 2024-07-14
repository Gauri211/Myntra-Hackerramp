/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Heading, Text, Stack, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ title, cardimage, content, price }) => {
  const navigate = useNavigate();

  return (
    <Card maxW='sm' h={280} borderRadius={0}>
      <CardBody mt={-5}>
        <Image
          src={cardimage}
          alt={title}
          onClick={() => navigate("/product", { state: { title, cardimage, content, price } })}
        />
        <Stack mt='1' spacing='0'>
          <Heading size='sm'>{title}</Heading>
          <Text>Shirts</Text>
          <Text color='red.600' fontSize='xl'>$450</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default ProductCard;
