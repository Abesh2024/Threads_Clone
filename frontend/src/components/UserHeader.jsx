import { Box, Flex, VStack, Text, Avatar, Link, Menu, MenuButton, Portal, MenuList, MenuItem } from "@chakra-ui/react"
import zuckAvater from '../assets/zuck-avatar.png'
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from '@chakra-ui/react'


const UserHeader = () => {

    const toast = useToast()

    const copyURL = (e) => {
        // e.preventDefault()
        const url = window.location.href;
        console.log(url);
        navigator.clipboard.writeText(url)
        toast({
            description: "URL copied to clipboard",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    return (
        <>
            <VStack gap={4} alignItems={"start"}>
                <Flex justify={"space-between"} w={"full"}>
                    <Box>
                        <Text fontSize={"2xl"} fontWeight="bold">Mark Zuckerberg</Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"}>markzuckerberg</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads</Text>
                        </Flex>
                    </Box>
                    <Box>
                        <Avatar src={zuckAvater} size={"xl"} />
                    </Box>
                </Flex>
                <Text>Co-founder executove CEO of meta, facebook, Mark</Text>

                <Flex width="full" justify="space-between">
                    <Flex gap="2" align="center">
                        <Text color="gray.light"> 1 M follower </Text>
                        <Box w="1" h="1" borderRadius="full" bg="gray.light"></Box>
                        <Link color="gray.light">instagram.com</Link>
                    </Flex>
                    <Flex>
                        <Box className='icon-container'>
                            <BsInstagram size="24" cursor="pointer" />
                        </Box>
                        <Box className='icon-container'>
                            <Menu>
                                <MenuButton><CgMoreO size="24" cursor="pointer" /></MenuButton>
                                <Portal>
                                    <MenuList>
                                        <MenuItem onClick={copyURL}>Copy link</MenuItem>
                                    </MenuList>
                                </Portal>
                            </Menu>
                        </Box>
                    </Flex>
                </Flex>

                <Flex w="full">
                    <Flex flex="1" borderBottom="1.5px solid white" justifyContent="center" cursor="pointer" pb="4">
                        <Text fontWeight="bold">Threads</Text>
                    </Flex>
                    <Flex flex="1" borderBottom="1.5px solid gray" justifyContent="center" color="gray.light" cursor="pointer" pb="4">
                        <Text fontWeight="bold">Replies</Text>
                    </Flex>
                </Flex>
            </VStack>
        </>
    )
}

export default UserHeader
