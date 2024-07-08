import { useEffect, useState } from 'react';
import toastFun from './showToast';
import { useParams } from 'react-router-dom';

const useGetUserProf = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = toastFun();


  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`https://threads-clone-m8if.onrender.com/v1/user/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        const data = await res.json();

        if (data.error) {
          toast("error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        toast("error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getUser();
    }
  }, [userId, toast]);

  return { loading, user };
};

export default useGetUserProf;
