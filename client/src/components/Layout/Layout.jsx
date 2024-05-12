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

  useFavourites()
  useMyTaskIDs()
  
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUsert(user?.email,token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {

      const res = await getAccessTokenSilently({
        authorizationParams: {
          audience: "http://localhost:3001/task",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
     mutate(res)
    };

  
      isAuthenticated && getTokenAndRegister();
   
  }, [isAuthenticated]);
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
