import React from 'react';
import FadeIn from './FadeIn';
import { FaTwitter, FaMedium, FaGithub, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

let CONTACT_DETAILS = [];
CONTACT_DETAILS.push(['https://github.com/dhilipkmr',       <FaGithub/>,      'Github']);             // GITHUB_URL
CONTACT_DETAILS.push(['https://linkedin.com/in/dhilipkmr/', <FaLinkedinIn/>,  'LinkedIn']);           // LINKEDIN_URL
CONTACT_DETAILS.push(['https://medium.com/@dhilipkmr',      <FaMedium/>,      'Medium']);             // MEDIUM_URL
CONTACT_DETAILS.push(['https://twitter.com/dhilipkmr_r',    <FaTwitter/>,     'Twitter']);            // TWITTER_URL
CONTACT_DETAILS.push(['https://dhilipkmr.surge.sh',         <FaGlobe/>,       'Website']);            // WEB_URL

const ContactMe = ({theme}) => {
  return(
    <FadeIn wrapHeight={45} style={{ animationDelay: '1.1s'}}>
    <div className="textcenter padT10">
      {CONTACT_DETAILS.map((contactItem) => {
        const url = contactItem[0];
        const ICON = contactItem[1];
        const title = contactItem[2];
        return (
          <div key={title} className=" marginLR15 inbl scaleOnHover ico25">
            <a href={url} title={title} target="_blank" rel="noopener noreferrer">
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