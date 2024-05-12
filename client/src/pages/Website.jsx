import React from "react";
import { Hero } from "../components/Hero/Hero";

import { Contact } from "../components/Contact/Contact";
import { GetStarted } from "../components/GetStarted/GetStarted";

export const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Hero />
      </div>

      <Contact />
      <GetStarted />
    </div>
  );
};
