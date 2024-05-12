import React from 'react';
import "./Contact.css";
import {MdCall} from 'react-icons/md';
import {BsFillChatDotsFill} from 'react-icons/bs';
import { IoLogoLinkedin } from "react-icons/io5";

export const Contact = () => {
  const handleChatButtonClick = () => {
   
    const username = 'adam-mulani';
    const linkedInChatUrl = `https://www.linkedin.com/in/${username}`;
    
    // Open LinkedIn chat URL in a new tab
    window.open(linkedInChatUrl, '_blank');

  };

  const handleCallNowClick = () => {
    const phoneNumber = '0000000000';
    const telUrl = `tel:${phoneNumber}`;
    
    // Open phone call dialog 
    window.open(telUrl);
  };
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <span className="greenText">Reach Out to Us</span>
          <span className="primaryText">Seamless Contact Experience</span>
          <span className="secondaryText">
            We're here to help! Whether you have questions, feedback, or
            inquiries,
            <br /> feel free to reach out to us using the contact information
            provided below.
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
                {/*first mode of contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Call</span>
                    <span className='secondaryText'>0000000000</span>
                  </div>
                </div>
                <div className="flexCenter button" onClick={handleCallNowClick}>
                    Call Now
                </div>
              </div>

             {/*Second mode oc contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <IoLogoLinkedin size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Chat</span>
                    <span className='secondaryText'>Linkedin</span>
                  </div>
                </div>
                <div className="flexCenter button" onClick={handleChatButtonClick}>
                    Chat Now
                </div>
              </div>
            </div>

            {/*Second row */}
            <div className="flexStart row">
                {/*Third mode of contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Video Call</span>
                    <span className='secondaryText'>0000000000</span>
                  </div>
                </div>
                <div className="flexCenter button" onClick={handleCallNowClick}>
                    Video Call Now
                </div>
              </div>

             {/*Fourth mode oc contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <IoLogoLinkedin size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Message</span>
                    <span className='secondaryText'>Linkedin</span>
                  </div>
                </div>
                <div className="flexCenter button" onClick={handleChatButtonClick}>
                    Message Now
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="c-right">
          <div className="image-container ">
            <img src="contact.jpeg" alt=""  />
          </div>
        </div>
      </div>
    </section>
  );
}
