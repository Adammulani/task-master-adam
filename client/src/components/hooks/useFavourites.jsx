import React, { useContext, useEffect, useRef } from 'react'
import UserDetailContext from '../../context/userDetailContext'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { getAllFavTask } from '../../utils/api.js'

export const useFavourites = () => {

    const {userDetails,setUserDetails}=useContext(UserDetailContext)
    const queryRef=useRef()
    const {user}=useAuth0()

    const {data,isLoading,isError,refetch}=useQuery({
        queryKey:"AllFavourites",
        queryFn:()=>getAllFavTask(user?.email,userDetails?.token),     //query function to make api call to get all the tasks marked as favourite
        onSuccess:(data)=>setUserDetails((prev)=>({...prev,favourites:data})),
        enabled:user!==undefined,
        staleTime:30000
    })

    queryRef.current=refetch; //you do not lose the reference to the refetch function when the component re-renders.
    //refetch function stored in queryRef.current
    
    useEffect(()=>{

      queryRef.current && queryRef.current()
    },[userDetails?.token])  //whenever token changes, execute queryFn


  return {data,isError,isLoading,refetch};
}
