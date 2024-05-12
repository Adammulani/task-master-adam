import React from 'react'
import './Footer.css'

export const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/*left side */}
        <div className="flexColStart f-left">
          <img src="./logofooter.png" alt="" width={120} />
          <span className="secondaryText">
          Our mission is to empower users to efficiently manage 
            <br />
            their tasks and enhance productivity. With our 
            <br /> platform, you can effortlessly add, browse,
            <br/>
            edit, delete, and organize tasks.
          </span>
        </div>
        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Adam Mulani</span>
          <span className="secondaryText">Maharashtra, India</span>
          <div className="flexCenter copyright-text">
          <p>&copy; 2024 Task Master. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
