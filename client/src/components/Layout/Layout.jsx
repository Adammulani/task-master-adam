import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/userDetailContext";
import { useMutation } from "react-query";
import { createUsert } from "../../utils/api";
import { useFavourites } from "../hooks/useFavourites";
import { useMyTaskIDs } from "../hooks/useMyTaskIDs";

export const Layout = () => {
  useFavourites();
  useMyTaskIDs();

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUsert(user?.email, token),
  });

  useEffect(() => {

    //function to check whether popup permission is given or not, if not then display alert message
    const checkPopupPermission = () => {
      if (window && window.document && window.document.createElement) {
        const popup = window.open("", "", "width=100,height=100");
        if (!popup || popup.closed || typeof popup.closed === "undefined") {
          // Popup blocked
          window.alert("You're seeing this message because you haven't enabled popups yet. To log in successfully, please enable popups when prompted or manually. This website utilizes Auth0 for authentication, and without enabling popups, access to website features will be restricted.");
        } else {
          // Popup allowed
          popup.close();
        }
      } else {
        console.error(
          "Popup permission check failed: Window or document object not found."
        );
      }
    };

    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({   //get JWTtoken with popup
        authorizationParams: {
          audience: "http://localhost:3001/task",
          scope: "openid profile email",
          prompt: "none",
        },
      });

      localStorage.setItem("access_token", res);  //store token to local storage
      setUserDetails((prev) => ({ ...prev, token: res }));  //assign token to token state variable
      mutate(res);
    };

    checkPopupPermission();

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);   //whenever is authenticate state variable changes get access token
  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
