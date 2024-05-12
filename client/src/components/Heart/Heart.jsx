import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useAuthCheck } from '../hooks/useAuthCheck'
import UserDetailContext from '../../context/userDetailContext'
import { useMutation } from 'react-query'
import { toFavTask } from '../../utils/api.js'
import { checkFavourites, updateFavourites } from '../../utils/common.js'
import { useAuth0 } from '@auth0/auth0-react'
import "./Heart.css"

export const Heart = ({id}) => {
    const [heartColor,setHeartColor]=useState("#6c757d")
    const {validateLogin}=useAuthCheck()
    const {user}=useAuth0()

    const{userDetails:{favourites,token},setUserDetails}=useContext(UserDetailContext);

    useEffect(()=>{
        setHeartColor(()=>checkFavourites(id,favourites))  //function to check if it was already in favourites array or not
    },[favourites])

    const {mutate}=useMutation({
        mutationFn:()=>toFavTask(id,user?.email,token),   //api call function to update favtasks
        onSuccess:()=>{
            setUserDetails((prev)=>(
                {
                    ...prev,
                    favourites:updateFavourites(id,prev.favourites)   //function to update favourites array, if task was already present in it then remove else add to array
                }
            ))
        }
    })

   

    const handleLike=()=>{
        if(validateLogin())
            {
                mutate()
                setHeartColor((prev)=>(prev==="#fa3e5f") ? "#6c757d" : "#fa3e5f")
            }
    }
  return (
    
        <AiFillHeart size={24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleLike()
     }}/>

  
     
  )
}
