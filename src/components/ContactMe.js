import React from 'react';
import githubIcon from '../assets/github-icon.png'
import linkedinIcon from '../assets/linkedin-icon.png'
import mediumIcon from '../assets/medium-icon.png'
import twitterIcon from '../assets/twitter-icon.png'
import websiteIcon from '../assets/website-icon.png'
import FadeIn from './FadeIn';
const IMG_HEIGHT = 30;
const IMG_WIDTH = 30;
const GITHUB_URL = 'https://github.com/dhilipkmr';
const LINKEDIN_URL = 'https://linkedin.com/in/dhilipkmr/';
const MEDIUM_URL = 'https://medium.com/@dhilipkmr';
const TWITTER_URL = 'https://twitter.com/dhilipkmr_';
const WEB_URL = 'https://dhilipkmr.surge.sh';


const ContactMe = () => {
  return(
    <FadeIn wrapHeight={40} style={{ animationDelay: '1.1s'}}>
    <div className="textcenter">
      <div className="contactIconBg marginR10 inbl">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><img src={githubIcon} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="" alt="github"/></a>
      </div>
      <div className="contactIconBg marginR10 inbl">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="" alt="linkedin"/></a>
      </div>
      <div className="contactIconBg marginR10 inbl">
        <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer"><img src={mediumIcon} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="" alt="medium"/></a>
      </div>
      <div className="contactIconBg marginR10 inbl">
        <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer"><img src={twitterIcon} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="" alt="twitter"/></a>
      </div>
      <div className="contactIconBg marginR10 inbl">
        <a href={WEB_URL} target="_blank" rel="noopener noreferrer"><img src={websiteIcon} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="" alt="website"/></a>
      </div>
    </div>
    </FadeIn>
  );
}
export default ContactMe;