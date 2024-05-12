import React, { useContext } from 'react'
import { useAuthCheck } from '../hooks/useAuthCheck'
import UserDetailContext from '../../context/userDetailContext'
import { useMutation } from 'react-query'
import { deleteTask, toFavTask } from '../../utils/api.js'
import { updateMyTasks } from '../../utils/common.js'
import { useAuth0 } from '@auth0/auth0-react'
import { MdDelete } from 'react-icons/md'
import { useNavigate} from 'react-router-dom'

export const DeleteSingleTask = ({id}) => {
    const {validateLogin}=useAuthCheck()
    const {user}=useAuth0()
    const navigate = useNavigate();

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
            navigate(-1); // Navigate to previous page in history
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
    
        <MdDelete size={24}  onClick={(e)=>{
        e.stopPropagation()
        handleDelete()
     }}/>

  
     
  )
}
