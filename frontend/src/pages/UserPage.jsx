import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import post1 from '../assets/post1.png'
import post2 from '../assets/post2.png'
import post3 from '../assets/post3.png'


const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost likes={377} replies={90} postImg={post1} postTitle="This picture was captured in an special Event"/>
      <UserPost likes={899} replies={40} postImg={post2} postTitle="This picture was captured in an special Event"/>
      <UserPost likes={896} replies={38} postImg={post3} postTitle="I love this guy"/>
      <UserPost likes={933} replies={199}  postTitle="Another title post from threads"/>
    </>
  )
}

export default UserPage
