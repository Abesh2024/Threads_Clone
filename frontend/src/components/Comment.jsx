import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import zuc from '../assets/post1.png'
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

const Comment = ({comment, createdAt, likes, avater, userName}) => {
    const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex gap="4" py="2" my="2">
        <Avatar src={avater} size="sm"/>
            <Flex gap="1" w="full" flexDirection="column">
                <Flex w="full" justifyContent="space-between" alignItems="center">
                    <Text fontSize="sm" fontWeight="bpld">{userName}</Text>
                    <Flex gap="2" alignItems="center">
                        <Text fontSize="sm" color="gray.lught">{createdAt}</Text>
                        <BsThreeDots />
                    </Flex>
                </Flex>
                <Text>{comment}</Text>
                <Actions liked={liked} setLiked={setLiked} />
                <Text fontSize="sm" color="gray.lught">
                    { likes + (liked ? 1 : 0)}
                </Text>
            </Flex>
      </Flex>

      <Divider />
    </>
  )
}

export default Comment
