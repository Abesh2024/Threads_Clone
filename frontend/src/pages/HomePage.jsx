import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Link to="/mark">
      <Flex w="full" justifyContent="center">
        <Button mx="auto">Visit Our Profile</Button>
      </Flex>
    </Link>
  )
}

export default HomePage
