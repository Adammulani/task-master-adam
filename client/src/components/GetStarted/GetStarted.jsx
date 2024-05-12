import React from "react";
import "./GetStarted.css";
import { useAuth0 } from "@auth0/auth0-react";

export const GetStarted = () => {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  return (
    <section className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get Started with Task Master</span>

          {!isAuthenticated ? (
            <>
            <span className="secondaryText">
                Sign in and use all the cool stuff like adding new tasks, seeing
                all your tasks, changing one task, removing a task, adding tasks
                to your favorites, and searching through all your tasks.
              </span>
              <button className="button" onClick={loginWithRedirect}>
                Login
              </button>
              
            </>
          ) : (
            <span className="secondaryText">
            Explore all the cool stuff like adding new tasks, seeing
            all your tasks, changing one task, removing a task, adding tasks
            to your favorites, and searching through all your tasks.
          </span>
            
          )}
        </div>
      </div>
    </section>
  );
};
