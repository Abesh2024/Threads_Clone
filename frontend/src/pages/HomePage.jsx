import { Button, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toastFun from '../hooks/showToast'
import Post from '../components/Post'

const HomePage = () => {
  const toast = toastFun()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getFeedPost = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:10000/api/post/feed`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        })
        const data = await res.json()
        // console.log(data);
        if(data.error) {
          toast("error", data.error , "error")
          return;
        }
        setPosts(data)
      } catch (error) {
        toast ("error", error.message, "error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPost()
  }, [toast])

  return (
    <>
      {!loading && posts.length === 0 && <h1>Follow some users to sees feed Posts</h1>}

      {loading && (
        <Flex justify="center">
          <Spinner size="xl"/>
        </Flex>
      )}

      {posts.map ( (post)=> (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  )
}

export default HomePage
