import React from 'react'

import { IoMdAdd } from "react-icons/io";

import { FaTasks } from "react-icons/fa";

import "./HeroRight.css"
import { toast } from 'react-toastify';
import { useAuthCheck } from '../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
export const HeroRight = () => {
    const {validateLogin}=useAuthCheck()
    const {user}=useAuth0()
    const navigate=useNavigate()

    const handleAllTasksBtn=()=>{
        if(!validateLogin()){
            toast.error(" You must be logged in",{position:"top-right"})
        }
        else{
                   navigate("/tasks")
        }
    }

    const handleAddTaskBtn=()=>{
        if(!validateLogin()){
            toast.error(" You must be logged in",{position:"top-right"})
        }
        else{
          navigate("/add-task")
        }
    }
    
    
    
  return (
    <div className="right-container">
        <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        <div className="flexColStart c-left">
          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexCenter row">
              {/*first button */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <FaTasks size={25} />
                  </div>
                  <div className="flexCenter button" onClick={handleAllTasksBtn}>
                   See All Tasks
                </div>
                </div>
                
              </div>

              {/*Second button */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <IoMdAdd size={25} />
                  </div>
                  
                  <div
                  className="flexCenter button"
                  onClick={handleAddTaskBtn}
                >
                  Add Task
                </div>
                </div>
                
              </div>
            </div>

            {/*Second row */}
          
          </div>
        </div>
      </div>
    </section>
    </div>
    
  );
}
