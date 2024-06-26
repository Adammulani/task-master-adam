import React, { useState } from 'react'
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';

const Header = () => {
  const [menuOpened,setMenuOpened]=useState(false);
  const {loginWithRedirect,isAuthenticated,user,logout}=useAuth0()
  



  const getMenuStyles=(menuOpened)=>{
    if(document.documentElement.clientWidth <=800){
      return {right: !menuOpened && "-100%"}  //-100% means we are pushing element out of the view
    }
  }
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        <Link to="/">
          <img src="./logoheader.png" alt="logo" width={100}></img>
        </Link>

        <OutsideClickHandler           //outside click handler to manage Profile Menu
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
          <NavLink to="/">Home</NavLink>
           {isAuthenticated && <> <NavLink to="/add-task">Add Task</NavLink>
            <NavLink to="/tasks">All Task</NavLink></>
            
            //if user is authenticated then only show Add task and All task
            }


            
            <a href="mailto:aadammulani11@gmail.com">Contact</a>

        
            {/* login button */}
            {
              !isAuthenticated?    //if user is not logged in then only show login button
              (<button className="button" onClick={loginWithRedirect}>
                Login / SignUp
              </button> ):
              (
                
               <ProfileMenu user={user} logout={logout}/>
                
              )
            }
          </div>
        </OutsideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
}

export default Header