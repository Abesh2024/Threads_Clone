import { Flex, Text, Avatar, Image, Box, Divider, Button, Spinner } from '@chakra-ui/react';
import verified from '../assets/verified.png';
import Actions from '../components/Actions';
import { useEffect, useState } from 'react';
import Comment from '../components/Comment';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toastFun from '../hooks/showToast';
import useGetUserProf from '../hooks/useGetUserProf';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom';
import {formatDistanceToNow} from "date-fns"
import { DeleteIcon } from '@chakra-ui/icons';
import postsAtom from '../atoms/postsAtom';


const PostPage = () => {
  const { user, loading } = useGetUserProf()
  const { pid } = useParams()
  // const [post, setPost] = useState(null)
  const [posts, setPosts] = useRecoilState(postsAtom);
  const toast = toastFun()
  const currentUser = useRecoilValue(userAtom)
  const navigate = useNavigate()

  const currentPost = posts[0];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`https://threads-clone-m8if.onrender.com/api/post/${pid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        });
        const data = await res.json();
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }

        setPosts([data]);
      } catch (error) {
        toast("Error", error.message, "error");
      }
    };
    getPost();
  }, [toast, pid, setPosts]);


  const deletePost = async () => {
    try {
        if(!window.confirm("this post will be deleated")) return;

        const res = await fetch(`https://threads-clone-m8if.onrender.com/api/post/${currentPost._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            credentials: 'include'
        })

        const data = await res.json();

        if(data.error) {
            toast("error", data.error, "error")
            return;
        }

        toast("success", "post deleated", "success")
        navigate(`/${user.userName}`)

    } catch (error) {
        toast("error", error, "error")
    }
}



  if (!user && loading) {
    return (
      <Flex justifyContent="center">
        <Spinner s="sl" />
      </Flex>
    )
  }

  if (!currentPost) return null;

  return (
    <>
      <Flex>
        <Flex alignItems="center" gap="3" width="full">
          <Avatar src={user?.profilePic} size="md" name="Mark Zuckerberg" />
          <Flex alignItems="center">
            <Text fontSize="sm" fontWeight="bold">{user?.userName}</Text>
            <Image src={verified} w="4" h="4" ml="2" />
          </Flex>
        </Flex>
        <Flex gap='4' alignContent="center">
          <Text fontSize="xs" textAlign="right" color="gray.light">
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>

          {currentUser?._id === currentPost.postedBy && <DeleteIcon onClick={deletePost} />}
        </Flex>
      </Flex>

      <Text my="3">{currentPost.text}</Text>
      {currentPost.img && (
        <Box position="relative" borderRadius="6" overflow="hidden" border="1px solid gray.light">
          <Image src={currentPost.img} w="full" />
        </Box>
      )}

      <Flex gap='3' my="3">
        <Actions post={currentPost} />
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

      {currentPost.replies.map((reply => (
        <Comment 
        key={reply._id}
        reply={reply}
        lastReply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
      />
      )))}
      
    </>
  );
};

export default PostPage;
