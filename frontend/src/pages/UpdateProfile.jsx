import { 
  Button, 
  Flex, 
  FormControl, 
  FormLabel, 
  Heading, 
  Input, 
  Stack, 
  useColorModeValue, 
  Center,
  Avatar
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import UploadImage from '../hooks/UploadImage';
import toastFun from '../hooks/showToast';
import axios from 'axios';

export default function UpdateProfile() {
  const toast = toastFun();
  const user = useRecoilValue(userAtom)
  console.log(user);
  const [input, setInput] = useState({
    name: user.name,
    userName: user.userName,
    email: user.email,
    bio: user.bio,
    password: "",
  });

  const { handelImageChange, imgUrl } = UploadImage();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("auth-token");

    if (!token) {
      toast("Error", "You are not authorized. Please log in.", "error");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/v1/user/updateuser/${user._id}`,
        { ...input, profilePic: imgUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = res.data;

      if (data.error) {
        toast("Error", data.error, "error");
        return;
      }

      toast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      toast("Error", error.message || error, "error");
    }
  };

  const fileRef = useRef(null);
  return (
    <form onSubmit={handelSubmit}>
      <Flex align={'center'} justify={'center'} my="6">
        <Stack spacing={4} w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.dark')} rounded={'xl'} boxShadow={'lg'} p={6}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>User Profile Edit</Heading>
          <FormControl>
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>Change Profile Picture</Button>
                <Input type='file' hidden ref={fileRef} onChange={handelImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder="Full Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.userName}
              onChange={(e) => setInput({ ...input, userName: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{ bg: 'red.500' }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{ bg: 'blue.500' }}
              type="submit">
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
