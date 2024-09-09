import { Box, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import toastFun from '../hooks/showToast';
import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
    const [loading, setLoading] = useState(true);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const toast = toastFun()

    useEffect(()=> {
        const getSuggestedUsers = async () => {
			setLoading(true);
			try {
				const res = await fetch("https://threads-clone-m8if.onrender.com/v1/user/suggested");
				// console.log(res, "abeshhhhhhhhhh");
				const data = await res.json();
				
				if (data.error) {
					toast("Error", data.error, "error");
					// console.log(data.error);
					return;
				}
				setSuggestedUsers(data);
			} catch (error) {
				toast("Error", error.message, "error");
				// console.log("error message");
			} finally {
				setLoading(false);
			}
		};
        getSuggestedUsers();
    }, [toast])

  return (
    <div>
        <h1>Suggested User</h1>
      <Flex direction={"column"} gap={4}>
				{!loading && suggestedUsers.map((user) => <SuggestedUser key={user._id} user={user} />)}
				{loading &&
					[0, 1, 2, 3, 4].map((_, idx) => (
						<Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
							{/* avatar skeleton */}
							<Box>
								<SkeletonCircle size={"10"} />
							</Box>
							{/* username and fullname skeleton */}
							<Flex w={"full"} flexDirection={"column"} gap={2}>
								<Skeleton h={"8px"} w={"80px"} />
								<Skeleton h={"8px"} w={"90px"} />
							</Flex>
							{/* follow button skeleton */}
							<Flex>
								<Skeleton h={"20px"} w={"60px"} />
							</Flex>
						</Flex>
					))}
			</Flex>
    </div>
  )
}

export default SuggestedUsers
