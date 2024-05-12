import React from 'react'
import "./TaskCard.css"
import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom'
          
import { Heart } from '../Heart/Heart'
import { DeleteCard } from '../DeleteCard/DeleteCard'
import { NavigateEdit } from '../NavigateEdit/NavigateEdit'


export const TaskCard = ({task}) => {

  const navigate=useNavigate();
  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../tasks/${task?.id}`)} >
          
      <span className="primaryText text">{truncate(task.title,{length:30})}</span>
      <span className="secondaryText text-description text">{truncate( task.description,{length:100})}</span>
      <span className="secondaryText r-bottom">
      <span><div className='secondaryText deadlineText'>Deadline:</div>{task.deadline}</span>
        <span><div className='SecondaryText deadlineText'>Status:</div>{task.status}</span>
        
      </span>
      
      <div className="r-bottom-buttons ">
      <Heart id={task?.id} />
       <DeleteCard id={task?.id}/>
      <NavigateEdit id={task?.id}/>
      </div>
     
    </div>
  );
}
