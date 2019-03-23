import React from 'react';
import FadeIn from './FadeIn';
import { FaTwitter, FaMedium, FaGithub, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

let CONTACT_DETAILS = [];
CONTACT_DETAILS.push(['https://github.com/dhilipkmr',       <FaGithub/>]);            // GITHUB_URL
CONTACT_DETAILS.push(['https://linkedin.com/in/dhilipkmr/', <FaLinkedinIn/>]);  // LINKEDIN_URL
CONTACT_DETAILS.push(['https://medium.com/@dhilipkmr',      <FaMedium/>]);           // MEDIUM_URL
CONTACT_DETAILS.push(['https://twitter.com/dhilipkmr_r',    <FaTwitter/>]);        // TWITTER_URL
CONTACT_DETAILS.push(['https://dhilipkmr.surge.sh',         <FaGlobe/>]);               // WEB_URL

const ContactMe = ({theme}) => {
  return(
    <FadeIn wrapHeight={45} style={{ animationDelay: '1.1s'}}>
    <div className="textcenter padT10">
      {CONTACT_DETAILS.map((contactItem) => {
        const url = contactItem[0];
        const ICON = contactItem[1];
        return (
          <div className=" marginR30 inbl scaleOnHover">
            <a href={url} target="_blank" rel="noopener noreferrer">
            {ICON}
            </a>
          </div>
        )
      })}
    </div>
    </FadeIn>
  );
}
export default ContactMe;