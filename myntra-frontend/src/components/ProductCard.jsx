import { Card, CardHeader, CardBody, CardFooter, ButtonGroup, Button, Divider, Heading, Text, Stack, Image } from '@chakra-ui/react'
import blackTop from "../assets/black-top.jpg"

const ProductCard = () => {
  return (
    <Card maxW='sm'>
        <CardBody>
            <Image
            src={blackTop}
            alt='Green double couch with wooden legs'
            />
            <Stack mt='6' spacing='3'>
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