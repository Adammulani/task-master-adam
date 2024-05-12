import React, { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useAuthCheck } from '../hooks/useAuthCheck'

export const SearchBarHero = () => {
  const {validateLogin}=useAuthCheck()
  const navigate=useNavigate()
    const [searchFilter,setSearchFilter]=useState("");

  const handleSearch=()=>{

    if(validateLogin()){
      navigate(`/herosearch/${searchFilter}`)
    }
  }
  
    
  return (
    <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input placeholder='Search by title/description' type="text" value={searchFilter} onChange={(e)=>setSearchFilter(e.target.value)}></input>
            <button className="button" onClick={handleSearch}>Search</button>
          </div>
  )
}
