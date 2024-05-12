import React from "react";
import "./Hero.css";
import {motion} from 'framer-motion'
import { SearchBarHero } from "../SearchBarHero/SearchBarHero";
import { HeroRight } from "../HeroRight/HeroRight";
export const Hero = () => {
 
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left section */}

        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "spring",
              }}
            >
              Welcome <br /> to Task Master
            </motion.h1>
          </div>
          <div className="flexColStart hero-des wrap-it">
            <span className="secondaryText">
            Your all-in-one solution for organizing             </span>
            <span className="secondaryText">
            tasks and boosting productivity.
            </span>
          </div>
          <div className="search-bar-container">
            <SearchBarHero />
          </div>
         
          <div className="flexColStart hero-des wrap-it">
            <div className="featuresTitleHero">Features</div>
            <ul className="secondaryText">
              <li>
                View and manage all tasks, with the option to delete tasks.
              </li>
              <li>Access detailed information for each task.</li>
              <li>
                Utilize a user-friendly form to add new tasks or edit existing
                ones.
              </li>
            </ul>
          </div>
        </div>
        {/* right section */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
            
          >
            <HeroRight/>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
