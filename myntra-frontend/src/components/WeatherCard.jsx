import { Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Heading, Text, Stack, Image } from '@chakra-ui/react'
import Dresses from "../assets/Summer.png"
import { useNavigate } from 'react-router-dom';

const WeatherCard = () => {
    const navigate = useNavigate();

  return (
    <Card maxW='sm' h={280} borderRadius={0}>
        <CardBody>
            <Image
            src={Dresses}
            alt='Green double couch with wooden legs'
            onClick={() => navigate("/tryon")}
            />
            <Stack mt='4' spacing='0'>
            <Heading size='sm'>Dressberry</Heading>
            <Text>
                Dresses
            </Text>
            <Text color='blue.600' fontSize='2xl'>
                $450
            </Text>
            </Stack>
        </CardBody>
    </Card>
  )
}

export default WeatherCard