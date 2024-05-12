import React, { useState } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

export const SearchBarHero = () => {
    const navigate=useNavigate()
    const [searchFilter,setSearchFilter]=useState("");
  return (
    <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input placeholder='Search by title/description' type="text" value={searchFilter} onChange={(e)=>setSearchFilter(e.target.value)}></input>
            <button className="button" onClick={()=>navigate(`/herosearch/${searchFilter}`)}>Search</button>
          </div>
  )
}
