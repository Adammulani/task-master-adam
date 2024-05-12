import React, { useState } from 'react'
import './Header.css'
import {BiMenuAltRight} from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import { Link, NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';
import { useAuthCheck } from '../hooks/useAuthCheck.jsx';

const Header = () => {
  const [menuOpened,setMenuOpened]=useState(false);
  const {loginWithRedirect,isAuthenticated,user,logout}=useAuth0()
  const [modalOpened,setModalOpened]=useState(false);
  const {validateLogin}=useAuthCheck()


  const handleAddPropertyClick=()=>{
      if(validateLogin()){
        setModalOpened(true)
      }
  }

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

        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/">Add Task</NavLink>
            <NavLink to="/">All Task</NavLink>
            <a href="mailto:aadammulani12@gmail.com">Contact</a>

        
            {/* login button */}
            {
              !isAuthenticated?
              (<button className="button" onClick={loginWithRedirect}>
                Login
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