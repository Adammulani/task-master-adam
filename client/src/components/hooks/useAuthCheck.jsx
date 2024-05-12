import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import { toast } from 'react-toastify'

export const useAuthCheck = () =>{
    const {isAuthenticated}=useAuth0()

    const validateLogin=()=>{   //return true if user is logged in else false
        if(!isAuthenticated){
            toast.error("You must be logged in",{position:"top-right"})
            return false
        }
        else return true
    }
  return (
      {
        validateLogin
      }
  )
}
