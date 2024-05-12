import React from 'react';
import "./Contact.css";
import {MdCall} from 'react-icons/md';
import {BsFillChatDotsFill} from 'react-icons/bs';
import { IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


export const Contact = () => {
  const handleLinkedinButtonClick = () => {
   
    const username = 'adam-mulani';
    const linkedInChatUrl = `https://www.linkedin.com/in/${username}`;  //linkedin url
    
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
            <br/>
            You can reach out via email or connect with me on LinkedIn
          </span>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
                {/*first mode of contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdEmail size={27} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Send E-mail</span>
                    <span className='secondaryText'></span>
                  </div>
                </div>
                <div className="flexCenter button" >
                <a href="mailto:aadammulani11@gmail.com">Open Mail</a>
                </div>
              </div>

             {/*Second mode oc contact */}
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <IoLogoLinkedin size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className='primaryText'>Connect</span>
                    <span className='secondaryText'></span>
                  </div>
                </div>
                <div className="flexCenter button" onClick={handleLinkedinButtonClick}>
                    Linkedin
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Right side */}
        <div className="c-right">
          <div className="image-container ">
            <img src="contact.png" alt=""  />
          </div>
        </div>
      </div>
    </section>
  );
}
