import React from 'react';
import githubIcon from '../assets/github-icon.png';
import githubIconDark from '../assets/github-light.png';
import linkedinIcon from '../assets/linkedin-icon.png';
import linkedinIconDark from '../assets/linkedin-light.png';
import mediumIcon from '../assets/medium-icon.png';
import mediumIconDark from '../assets/medium-light.png';
import twitterIcon from '../assets/twitter-icon.png';
import twitterIconDark from '../assets/twitter-light.png';
import websiteIcon from '../assets/website-icon.png';
import websiteIconDark from '../assets/website-light.png';
import FadeIn from './FadeIn';
const IMG_HEIGHT = 30;
const IMG_WIDTH = 30;
const GITHUB_URL = 'https://github.com/dhilipkmr';
const LINKEDIN_URL = 'https://linkedin.com/in/dhilipkmr/';
const MEDIUM_URL = 'https://medium.com/@dhilipkmr';
const TWITTER_URL = 'https://twitter.com/dhilipkmr_';
const WEB_URL = 'https://dhilipkmr.surge.sh';


const ContactMe = ({theme}) => {
  let GIT_IMG = githubIcon;
  let LINKEDIN_IMG = linkedinIcon;
  let MEDIUM_IMG = mediumIcon;
  let TWITTER_IMG = twitterIcon;
  let WEB_IMG = websiteIcon;
  if (theme && theme === 'dark') {
    GIT_IMG = githubIconDark;
    LINKEDIN_IMG = linkedinIconDark;
    MEDIUM_IMG = mediumIconDark;
    TWITTER_IMG = twitterIconDark;
    WEB_IMG = websiteIconDark;
  }
  return(
    <FadeIn wrapHeight={45} style={{ animationDelay: '1.1s'}}>
    <div className="textcenter padT10">
      <div className=" marginR30 inbl">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><img src={GIT_IMG} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="scaleOnHover" alt="github"/></a>
      </div>
      <div className=" marginR30 inbl">
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><img style={{ 'marginBottom': '2px'}}src={LINKEDIN_IMG} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="scaleOnHover" alt="linkedin"/></a>
      </div>
      <div className=" marginR30 inbl">
        <a href={MEDIUM_URL} target="_blank" rel="noopener noreferrer"><img src={MEDIUM_IMG} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="scaleOnHover" alt="medium"/></a>
      </div>
      <div className=" marginR30 inbl">
        <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer"><img src={TWITTER_IMG} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="scaleOnHover" alt="twitter"/></a>
      </div>
      <div className=" marginR30 inbl">
        <a href={WEB_URL} target="_blank" rel="noopener noreferrer"><img src={WEB_IMG} type="text/png" width={IMG_WIDTH} height={IMG_HEIGHT} className="scaleOnHover" alt="website"/></a>
      </div>
    </div>
    </FadeIn>
  );
}
export default ContactMe;