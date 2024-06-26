import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

export const SearchBar = ({filter,setFilter}) => {
  return (
    <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input placeholder='Search by title/description' type="text" value={filter} onChange={(e)=>setFilter(e.target.value)}></input>
            <button className="button">Search</button>
          </div>
  )
}
