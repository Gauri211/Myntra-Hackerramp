import { Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Heading, Text, Stack, Image } from '@chakra-ui/react'
import blackTop from "../assets/black-top.jpg"
import { useNavigate } from 'react-router-dom';

const ProductCard = () => {
    const navigate = useNavigate();

  return (
    <Card maxW='sm' h={280} borderRadius={0}>
        <CardBody>
            <Image
            src={blackTop}
            alt='Green double couch with wooden legs'
            onClick={() => navigate("/tryon")}
            />
            <Stack mt='4' spacing='0'>
            <Heading size='sm'>Dressberry</Heading>
            <Text>
                Shirts
            </Text>
            <Text color='blue.600' fontSize='2xl'>
                $450
            </Text>
            </Stack>
        </CardBody>
    </Card>
  )
}

export default ProductCard