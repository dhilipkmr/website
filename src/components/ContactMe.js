import React from 'react';
import PropTypes from 'prop-types';
import FadeIn from './FadeIn';
import { FaTwitter, FaMedium, FaGithub, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

let CONTACT_DETAILS = [];
CONTACT_DETAILS.push(['https://github.com/dhilipkmr',       <FaGithub/>,      'Github']);             // GITHUB_URL
CONTACT_DETAILS.push(['https://linkedin.com/in/dhilipkmr/', <FaLinkedinIn/>,  'LinkedIn']);           // LINKEDIN_URL
CONTACT_DETAILS.push(['https://medium.com/@dhilipkmr',      <FaMedium/>,      'Medium']);             // MEDIUM_URL
CONTACT_DETAILS.push(['https://twitter.com/dhilipkmr_',    <FaTwitter/>,     'Twitter']);            // TWITTER_URL
CONTACT_DETAILS.push(['https://dhilipkmr.surge.sh',         <FaGlobe/>,       'Website']);            // WEB_URL

const ContactMe = ({theme}) => {
  return(
    <div className="width100 textcenter padT10 oh ">
      <FadeIn style={{ animationDelay: '0.45s'}}>
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
      </FadeIn>
    </div>
  );
}

ContactMe.propTypes = {
  theme: PropTypes.string
};

export default ContactMe;