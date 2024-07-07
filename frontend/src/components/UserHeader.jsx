import { Box, Flex, VStack, Text, Avatar, Link, Menu, MenuButton, Portal, MenuList, MenuItem, Button } from "@chakra-ui/react"
import zuckAvater from '../assets/zuck-avatar.png'
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from '@chakra-ui/react'
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as routerLink } from "react-router-dom";
import { useState } from "react";
import toastFun from "../hooks/showToast";

const UserHeader = ({user}) => {

    // const toast = useToast()
    const toast = toastFun()
    const currentUser = useRecoilValue(userAtom);  //loggedin user
    const [following, setFollowing] = useState(user.followers.includes(currentUser?._id))
    const [updating, setUpdating] = useState(false)

    const copyURL = (e) => {
        // e.preventDefault()
        const url = window.location.href;
        console.log(url);
        navigator.clipboard.writeText(url)
       toast("success", "URL copied to clipard", "success")
    }

    // console.log(user);

    const handelFollowUnfolloow = async() => {
        if(!currentUser) {
            toast("error", "Register as an user first", "error")
            return;
        }
        if(updating) return
        setUpdating(true)
        try {
            const res = await fetch(`http://localhost:10000/v1/user/follow/${user._id}`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })

            const data = await res.json()
            console.log(data);
            // console.log(user._id);
            if(data.error){
                toast("error", data.error, "error")
                return;
            }

            if(following) {
                toast("success", `unfollowed ${user.name}`, "success")
                user.followers.pop()
            } else {
                toast("success", `Followed ${user.name}`, "success")
                user.followers.push(currentUser?._id)
            }

            setFollowing(!following)

        } catch (error) {
        toast("error", error, "error")
        } finally {
            setUpdating(false)
        }
    }

    return (
        <>
            <VStack gap={4} alignItems={"start"}>
                <Flex justify={"space-between"} w={"full"}>
                    <Box>
                        <Text fontSize={"2xl"} fontWeight="bold"> {user.name} </Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"}>{user.userName}</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads</Text>
                        </Flex>
                    </Box>
                    <Box>
                        {user.profilePic && (
                        <Avatar name={user.name} src={user.profilePic} size={"xl"} />
                        )}
                        {!user.profilePic && (
                        <Avatar src="https://bit.ly/broken-link" size={"xl"} />
                        )}
                    </Box>
                </Flex>
                <Text>{user.bio}</Text>
                        {user._id === currentUser?._id && (
                            <Link as={routerLink} to="/update">
                                <Button>Update Profile</Button>
                            </Link>
                        )}
                        {user._id !== currentUser?._id && (
                            <Button onClick={handelFollowUnfolloow} isLoading={updating}>
                                {following ? "Unfollow" : "Follow"}
                            </Button>
                        )}
                <Flex width="full" justify="space-between">
                    <Flex gap="2" align="center">
                        <Text color="gray.light"> {user.followers.length} follower </Text>
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
