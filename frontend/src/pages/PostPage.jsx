import { Flex, Text, Avatar, Image, Box, Divider, Button } from '@chakra-ui/react';
import zuckAvatar from '../assets/zuck-avatar.png';
import verified from '../assets/verified.png';
import { BsThreeDots } from 'react-icons/bs';
import post1 from '../assets/post1.png'
import Actions from '../components/Actions';
import { useState } from 'react';
import Comment from '../components/Comment';

const PostPage = () => {
  const [liked, setLiked] = useState(false)

  return (
    <>
      <Flex>
        <Flex alignItems="center" gap="3" width="full">
          <Avatar src={zuckAvatar} size="md" name="Mark Zuckerberg" />
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold">Mark Zuckerberg</Text>
            <Image src={verified} w="4" h="4" ml="2" />
          </Flex>
        </Flex>
        <Flex gap="4" alignItems="center">
          <Text fontSize="sm" color="gray.light">1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Text my="3">Lets talk about the Threads platform</Text>
      <Box position="relative" borderRadius="6" overflow="hidden" border="1px solid gray.light">
        <Image src={post1} w="full" />
      </Box>

      <Flex gap='3' my="3">
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>

      <Flex gap="2" alignItems="center">
          <Text color="gray.light" fontSize="sm">100 replies</Text>
          <Box w="0.5" borderRadius="full" bg="gray.light" ></Box>
          <Text color="gray.light" fontSize="sm">
             {200 + (liked ? 1 : 0)}
            </Text>
      </Flex>
      <Divider my="3" />

      <Flex justifyContent="space-between">
        <Flex gap="2" alignItems="center">
          <Text fontSize="2xl">👋</Text>
          <Text color="gray.light">Get the app to like and post.</Text>
        </Flex>
          <Button>Get</Button>
      </Flex>

      <Divider my="3" />
      
      <Comment 
        comment="hello, how is it going, hope its alright"
        createdAt = "2d"
        likes={200}
        userName="Ramesh"
        avater='https://bit.ly/tioluwani-kolawole'
      />
      <Comment 
      comment="hello, how is it going, hope its alright"
      createdAt = "1d"
      likes={200}
      userName="Kent Dodds"
      avater='https://bit.ly/kent-c-dodds'
      />
      <Comment 
        comment="hello, how is it going, hope its alright"
        createdAt = "2d"
        likes={100}
        userName="Suresh"
        avater='https://bit.ly/ryan-florence'
      />
      <Comment 
        comment="hello, how is it going, hope its alright"
        createdAt = "2d"
        likes={200}
        userName="Segun"
        avater='https://bit.ly/sage-adebayo'
      />
    </>
  );
};

export default PostPage;
