import React, { useEffect, useState } from 'react'
import {  useQuery } from 'react-query'
import { useLocation, useNavigate} from 'react-router-dom'
import { getTask } from '../../utils/api';
import {PuffLoader} from 'react-spinners'


import "./Task.css"
import { useAuthCheck } from '../../components/hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import UserDetailContext from '../../context/userDetailContext';
import { Heart } from '../../components/Heart/Heart';
import { DeleteSingleTask } from '../../components/DeleteSingleTask/DeleteSingleTask';
import { GrLinkPrevious } from "react-icons/gr";


export const Task = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const{userDetails:{token}}=useContext(UserDetailContext);

  

  const {data:task, isLoading, isError } = useQuery(["task", id],  () =>
   (
        
            getTask(id,token)
          
   ) 
  );

  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();
  const navigate=useNavigate()

  const {
    userDetails: { myTasks, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  useEffect(() => {}, [myTasks]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the task details</span>
        </div>
      </div>
    );
  }
  return (
   

    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <div className="paddings flexCenter single-properties">
          {
            task ?
          (
          <div className="flexColStart ">
            <div className="primaryText text">{task.title}</div>
            <div className="divider"></div>
            <div className="secondaryText text">{task.description}</div>
          
            <div className="flexStart taskProp">
                <div className="flexStart taskDeadline  primaryText">
                    <div >Deadline: </div>

                    <div className='deadlineDate'>{task.deadline}</div>
                </div>
                <div className="flexStart primaryText taskStatus">
                    <div>Status:</div>
                    <div className='statusText'>{task.status}</div>
                </div>
            </div>
            <div className="bottom-buttons ">
                <GrLinkPrevious  size={24} onClick={()=>navigate(-1)}/>
              <Heart id={task?.id} />
              <DeleteSingleTask id={task?.id} />
            </div>
          </div>):
          <div className='primaryText'></div>

           }
        </div>
      </div>
    </div>
  );
}
