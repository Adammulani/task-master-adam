import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { getAllTasks } from '../../utils/api.js';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/userDetailContext.js';


 const useTasks = () => {
    const {user}=useAuth0()
    const {userDetails}=useContext(UserDetailContext)
     const{userDetails:{token}}=useContext(UserDetailContext);
    // console.log(token)


  const {data,isLoading,isError,refetch}=useQuery(
      "allTasks",   // this is the name/key
      ()=>getAllTasks(user?.email,token),   //get all the tasks created by current user, pass token to prevent unauthorized token
      {refetchOnWindowFocus:false}
  );
  
  return {
    data,
    isError,
    isLoading,
    refetch,
  };
}

export default useTasks;