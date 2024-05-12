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
        queryFn:()=>getAllFavTask(user?.email,userDetails?.token),
        onSuccess:(data)=>setUserDetails((prev)=>({...prev,favourites:data})),
        enabled:user!==undefined,
        staleTime:30000
    })

    queryRef.current=refetch;
    useEffect(()=>{

      queryRef.current && queryRef.current()
    },[userDetails?.token])


  return {data,isError,isLoading,refetch};
}
