import React, { useContext,  } from 'react'
import { useAuthCheck } from '../hooks/useAuthCheck'
import UserDetailContext from '../../context/userDetailContext'
import { useMutation } from 'react-query'
import { deleteTask } from '../../utils/api.js'
import { updateMyTasks } from '../../utils/common.js'
import { useAuth0 } from '@auth0/auth0-react'
import { MdDeleteOutline } from "react-icons/md";

export const DeleteCard = ({id}) => {
    const {validateLogin}=useAuthCheck()
    const {user}=useAuth0()

    const{userDetails:{myTasks,token},setUserDetails}=useContext(UserDetailContext);

  
    const {mutate}=useMutation({
        mutationFn:()=>deleteTask(id,token),
        onSuccess:()=>{
            setUserDetails((prev)=>(
                {
                    ...prev,
                    myTasks:updateMyTasks(id,prev.myTasks)
                }
            ))
        }
    })

   

    const handleDelete=()=>{
        if(validateLogin())
            {
                const confirmDelete = window.confirm("Delete this task ?");
                if (confirmDelete) {
                  mutate();
                }
            }
    }
  return (
    
        <MdDeleteOutline size={24}  onClick={(e)=>{
        e.stopPropagation()
        handleDelete()
     }}/>

  
     
  )
}
