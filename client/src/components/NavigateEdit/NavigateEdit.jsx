import React from 'react'
import { useAuthCheck } from '../hooks/useAuthCheck'

import { CiEdit } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'

export const NavigateEdit = ({id}) => {
    const {validateLogin}=useAuthCheck()
    const navigate=useNavigate()


   

    const handleEdit=()=>{
        if(validateLogin())    //if user is logged in then only navigate to edit task page
            {
                navigate(`/edit-task/${id}`)
            }
    }
  return (
    
        <CiEdit size={24}  onClick={(e)=>{
        e.stopPropagation()
        handleEdit()
     }}/>

  
     
  )
}
